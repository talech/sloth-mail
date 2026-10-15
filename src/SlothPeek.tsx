import { useEffect, useRef, useState, type CSSProperties } from 'react';

const PEEK_KEY = 'slothmail-peek-last-shown-v1';
const COOLDOWN_MS = 30 * 60 * 1000;
const previewMotion = () => import.meta.env.DEV && new URLSearchParams(window.location.search).get('peekMotion') === '1';

export const getPeekDateKey = () => (
  (import.meta.env.DEV && new URLSearchParams(window.location.search).get('peekDate'))
  || new Date().toLocaleDateString('en-CA')
);
export const isPeekSeason = () => {
  const date = getPeekDateKey();
  return date >= '2026-10-15' && date <= '2026-10-24';
};

// Keep the first frame's paws on the registered ledge while the final head
// rises continuously behind them. Intermediate drawings remain available as
// source artwork, but are no longer swapped during the motion.
const peekImages = ['./sloth/sloth-peek-01.png', './sloth/sloth-peek-06.png'];
const RISE_MS = 2400;
const SETTLE_MS = 300;
const LOWER_MS = 1500;
const hearts = Array.from({ length: 16 }, (_, index) => ({
  x: Math.sin(index * 2.4) * (70 + index * 5),
  y: -85 - (index % 5) * 25,
  delay: (index % 4) * 65,
}));
type PeekPhase = 'hidden' | 'waiting' | 'playing' | 'finished' | 'hearts' | 'lowering' | 'down';

export default function SlothPeek() {
  const dialogRef = useRef<HTMLElement>(null);
  const pawsRef = useRef<HTMLCanvasElement>(null);
  const loadedImages = useRef<HTMLImageElement[]>([]);
  const [hasPeeked, setHasPeeked] = useState(false);
  const [showHearts, setShowHearts] = useState(false);
  const [ready, setReady] = useState(false);
  const [phase, setPhase] = useState<PeekPhase>('hidden');
  const [reducedMotion, setReducedMotion] = useState(() => !previewMotion() && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  useEffect(() => {
    if (!isPeekSeason()) return;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(!previewMotion() && preference.matches);
    preference.addEventListener('change', update);
    let cancelled = false;
    Promise.all(peekImages.map((src, index) => new Promise<void>((resolve, reject) => {
      const image = new Image();
      image.onload = () => image.decode().then(() => { loadedImages.current[index] = image; resolve(); }, reject);
      image.onerror = reject;
      image.src = src;
    }))).then(() => { if (!cancelled) setReady(true); }).catch(() => {});
    return () => { cancelled = true; preference.removeEventListener('change', update); };
  }, []);

  useEffect(() => {
    if (!ready) return;
    const check = () => {
      if (!isPeekSeason() || document.visibilityState !== 'visible') return;
      const last = Number(localStorage.getItem(PEEK_KEY));
      const preview = import.meta.env.DEV && new URLSearchParams(window.location.search).get('peek') === '1';
      if (preview || !last || !Number.isFinite(last) || Date.now() - last >= COOLDOWN_MS) {
        localStorage.setItem(PEEK_KEY, String(Date.now()));
        setPhase(current => current === 'hidden' ? 'waiting' : current);
      }
    };
    check();
    // Preview forces only the initial appearance; regular checks still use the cooldown.
    const checkNormally = () => {
      const last = Number(localStorage.getItem(PEEK_KEY));
      if (!last || Date.now() - last >= COOLDOWN_MS) check();
    };
    const timer = window.setInterval(checkNormally, 15_000);
    window.addEventListener('focus', checkNormally);
    document.addEventListener('visibilitychange', checkNormally);
    return () => {
      window.clearInterval(timer);
      window.removeEventListener('focus', checkNormally);
      document.removeEventListener('visibilitychange', checkNormally);
    };
  }, [ready]);

  useEffect(() => {
    if (phase !== 'playing' && phase !== 'lowering') return;
    const complete = () => {
      if (phase === 'playing') {
        setHasPeeked(true);
        setPhase('finished');
      } else setPhase('down');
    };
    if (reducedMotion) { complete(); return; }
    const timer = window.setTimeout(complete, (phase === 'playing' ? RISE_MS : LOWER_MS) + SETTLE_MS);
    return () => window.clearTimeout(timer);
  }, [phase, reducedMotion]);

  useEffect(() => {
    if (!showHearts) return;
    const timer = window.setTimeout(() => setShowHearts(false), 1800);
    return () => window.clearTimeout(timer);
  }, [showHearts]);

  const visible = phase !== 'hidden';
  useEffect(() => {
    if (!visible) return;
    const canvas = pawsRef.current;
    const context = canvas?.getContext('2d');
    const image = loadedImages.current[0];
    if (!canvas || !context || !image) return;
    context.drawImage(image, 0, 0);
    const pixels = context.getImageData(0, 0, canvas.width, canvas.height);
    // Make only the paper background transparent. The painted paws stay opaque
    // so the moving face cannot show through them as it would with multiply.
    for (let i = 0; i < pixels.data.length; i += 4) {
      const darkest = Math.min(pixels.data[i], pixels.data[i + 1], pixels.data[i + 2]);
      pixels.data[i + 3] = Math.min(255, Math.max(0, (245 - darkest) / 20 * 255));
    }
    context.putImageData(pixels, 0, 0);
  }, [visible]);

  useEffect(() => {
    if (!visible) return;
    const previous = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (event: KeyboardEvent) => {
      // Dismissal belongs exclusively to the close button after playback.
      if (event.key === 'Escape') { event.preventDefault(); return; }
      if (event.key === 'Tab') {
        event.preventDefault();
        const controls = Array.from(dialogRef.current?.querySelectorAll<HTMLButtonElement>('button') ?? []);
        const current = controls.indexOf(document.activeElement as HTMLButtonElement);
        const next = (current + (event.shiftKey ? -1 : 1) + controls.length) % controls.length;
        (controls[next] ?? dialogRef.current)?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKey);
      previous?.focus();
    };
  }, [visible]);

  useEffect(() => {
    if (!visible) return;
    const control = dialogRef.current?.querySelector<HTMLButtonElement>('button');
    (control ?? dialogRef.current)?.focus();
  }, [phase, visible, hasPeeked]);

  const play = () => {
    if (phase === 'waiting' || phase === 'down') setPhase('playing');
  };

  const interact = () => {
    if (phase === 'waiting' || phase === 'down') play();
    else if (phase === 'finished') {
      setShowHearts(true);
      setPhase('hearts');
    } else if (phase === 'hearts') {
      setShowHearts(false);
      setPhase('lowering');
    }
  };
  const canInteract = ['waiting', 'down', 'finished', 'hearts'].includes(phase);
  const actionLabel = phase === 'finished' ? 'Send purple hearts from Sloth'
    : phase === 'hearts' ? 'Let Sloth peek down' : 'Play Sloth’s peekaboo';

  if (!visible) return null;
  return (
    <div className="welcome-back-backdrop sloth-peek-backdrop" onClick={play}>
      <section ref={dialogRef} className={`welcome-back-modal sloth-peek-modal ${reducedMotion ? 'sloth-peek-reduced' : ''}`}
        role="dialog" aria-modal="true" aria-label="Sloth peeking up to say hello"
        tabIndex={-1}>
        <div className={`sloth-peek ${['playing', 'finished', 'hearts'].includes(phase) ? 'is-revealed' : ''} ${phase === 'lowering' || phase === 'down' ? 'is-lowering' : ''}`} aria-hidden="true">
          <div className="sloth-peek-head-window">
            <img className="sloth-peek-head" src={peekImages[1]} alt="" />
          </div>
          <canvas ref={pawsRef} className="sloth-peek-paws" width={1536} height={1024} />
        </div>
        {showHearts && (
          <div className="sloth-peek-hearts" aria-hidden="true">
            {hearts.map((heart, index) => (
              <span key={index} style={{ '--heart-x': `${heart.x}px`, '--heart-y': `${heart.y}px`,
                '--heart-delay': `${heart.delay}ms` } as CSSProperties}>💜</span>
            ))}
          </div>
        )}
        {canInteract && (
          <button type="button" className="sloth-peek-play" aria-label={actionLabel}
            onClick={event => { event.stopPropagation(); interact(); }} />
        )}
        {hasPeeked && (
          <button type="button" className="sloth-peek-close" aria-label="Close Sloth’s peekaboo"
            onClick={event => { event.stopPropagation(); setShowHearts(false); setHasPeeked(false); setPhase('hidden'); }}>×</button>
        )}
      </section>
    </div>
  );
}
