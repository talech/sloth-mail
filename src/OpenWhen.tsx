import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, Heart, Pin } from 'lucide-react';
import { openWhenLetters, type OpenWhenLetter } from './content/openWhenLetters';
import { pileNoteIds } from './content/notePlacements';
import { loadOpenWhenSave, OPEN_WHEN_KEY, type OpenWhenSave } from './postItProgress';
import { refreshStickyPile, STICKY_REFRESH_MS } from './stickyPile';
import { NoteText } from './NoteText';

const pileLetters = openWhenLetters.filter(note => pileNoteIds.has(note.id));
const outerLabel = (note: OpenWhenLetter) => note.title.replace(/^when (?:you need |you want |you |)/, '').replace(/^for /, '');

export default function OpenWhen() {
  const [saved, setSaved] = useState(() => {
    const old = loadOpenWhenSave();
    return { ...old, stickySlots: refreshStickyPile(old.stickySlots ?? [], [...old.opened, ...old.favorites], Date.now()) };
  });
  const [active, setActive] = useState<OpenWhenLetter | null>(null);
  const [keeps, setKeeps] = useState(() => import.meta.env.DEV && new URLSearchParams(location.search).get('openWhenPreview') === '1');
  const preview = import.meta.env.DEV && new URLSearchParams(location.search).get('openWhenPreview') === '1';
  const [now, setNow] = useState(Date.now);
  const slots = saved.stickySlots ?? [];
  const scraps = slots.map(slot => pileLetters.find(note => note.id === slot.id)!);
  const known = [...new Set([...saved.opened, ...saved.favorites])];
  const unseenCount = pileLetters.filter(note => !known.includes(note.id)).length;
  const nextArrival = slots.filter(slot => slot.readAt !== null).map(slot => slot.readAt! + STICKY_REFRESH_MS).sort((a, b) => a - b)[0];
  const minutesLeft = nextArrival ? Math.max(1, Math.ceil((nextArrival - now) / 60_000)) : 0;
  const arrivalText = minutesLeft >= 60 ? `${Math.ceil(minutesLeft / 60)} hrs` : `${minutesLeft} min`;
  useEffect(() => {
    const refresh = () => {
      const time = Date.now();
      setNow(time);
      setSaved(current => {
        const stickySlots = refreshStickyPile(current.stickySlots ?? [], [...current.opened, ...current.favorites], time);
        if (JSON.stringify(stickySlots) === JSON.stringify(current.stickySlots)) return current;
        const next = { ...current, stickySlots };
        if (!preview) localStorage.setItem(OPEN_WHEN_KEY, JSON.stringify(next));
        return next;
      });
    };
    const timer = window.setInterval(refresh, 15_000);
    window.addEventListener('focus', refresh);
    return () => { window.clearInterval(timer); window.removeEventListener('focus', refresh); };
  }, [preview]);
  useEffect(() => { if (!preview) localStorage.setItem(OPEN_WHEN_KEY, JSON.stringify(saved)); }, [saved, preview]);
  const heading = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) { firstRender.current = false; return; }
    heading.current?.focus();
  }, [active, keeps]);
  const persist = (next: OpenWhenSave) => setSaved({ ...next, stickySlots: next.stickySlots ?? [] });
  const open = (note: OpenWhenLetter) => {
    setActive(note);
    if (!preview) {
      const time = Date.now();
      setSaved(current => ({
        ...current,
        opened: current.opened.includes(note.id) ? current.opened : [...current.opened, note.id],
        stickySlots: current.stickySlots.map(slot => slot.id === note.id && slot.readAt === null ? { ...slot, readAt: time } : slot),
      }));
      setNow(time);
    }
  };
  const back = () => setActive(null);
  // Old finds remain available even when moved to the library or retired.
  const found = preview ? openWhenLetters : openWhenLetters.filter(note => saved.opened.includes(note.id) || saved.favorites.includes(note.id));
  const pinned = found.filter(note => saved.favorites.includes(note.id));
  const unpinned = found.filter(note => !saved.favorites.includes(note.id));
  const renderKept = (notes: OpenWhenLetter[]) => notes.map(note => <button type="button" key={note.id} onClick={() => open(note)}>
    {note.artwork ? <img className="open-when-thumbnail" src={note.artwork.src} alt="" loading="lazy" /> : <Heart size={16} aria-hidden="true" />}
    <span>{note.title}</span>
  </button>);
  return <section className={`open-when post-it-pile ${active ? 'is-showing-post-it' : ''}`} aria-labelledby="post-it-title">
    {!active && !keeps && <>
      <div className="pile-heading"><span className="pile-kicker">from your Sloth ♡</span><h1 id="post-it-title" ref={heading} tabIndex={-1}>I left these here.</h1><p>for my cute little mouse 💜</p></div>
      <div className="pile-scraps" aria-label="Pick a post-it to unfold">{scraps.map((note, index) => {
        const read = slots[index].readAt !== null;
        return <button type="button" className={`pile-scrap scrap-${index} ${read ? 'is-read' : ''}`} key={note.id} onClick={() => open(note)} aria-label={`${read ? 'Reread' : 'Unfold'} ${outerLabel(note)}`}>
          <span className="scrap-kicker">{note.artwork ? 'a little drawing' : note.id === 'pocket-love-letter' ? 'Dear Mouse…' : 'psst, Mouse…'}</span>
          {note.artwork ? <img src={note.artwork.src} alt="" /> : <span className="scrap-title">{outerLabel(note)}</span>}
          <span className="scrap-state">{read ? 'read ♡' : 'unread'}</span>
          <span className="scrap-peel" aria-hidden="true">↗</span>
        </button>;
      })}</div>
      <p className="pile-arrival" role="status">{nextArrival ? `New stickies arriving in ${arrivalText}. ♡` : 'Fresh stickies arrive 8 hours after you read them. ♡'}</p>
      <div className="pile-footer"><span>a little sticky pile from Slothy.</span><button type="button" onClick={() => setKeeps(true)}>My kept notes ♡</button></div>
    </>}
    {active && <article className="open-letter">
      <button type="button" className="open-letter-back" onClick={back}><ChevronLeft size={16} aria-hidden="true" /> {keeps ? 'back to kept notes' : 'back to the pile'}</button>
      <div className="post-it-sheet"><p className="open-letter-kicker">a post-it from Sloth</p><h2 id="post-it-title" ref={heading} tabIndex={-1}>{active.title}</h2>
        {active.artwork && <img className="open-letter-artwork" src={active.artwork.src} alt={active.artwork.alt} />}
        <div className="open-letter-copy">{active.message.map((text, index) => <p key={index}><NoteText text={text} /></p>)}</div>
        <p className="open-letter-closing"><NoteText text={active.closing} /></p>
      </div>
      <div className="open-letter-actions"><button type="button" aria-pressed={saved.favorites.includes(active.id)} className={saved.favorites.includes(active.id) ? 'is-favorite' : ''} onClick={() => persist({ ...saved, favorites: saved.favorites.includes(active.id) ? saved.favorites.filter(id => id !== active.id) : [...saved.favorites, active.id] })}><Pin size={16} aria-hidden="true" />{saved.favorites.includes(active.id) ? 'Super sticky ♡' : 'Make super sticky ♡'}</button><button type="button" onClick={() => { setKeeps(false); back(); }}>Back to the pile →</button></div>
      <p className="pile-save-status" role="status">{saved.favorites.includes(active.id) ? 'Pinned for safekeeping. 💜' : 'Tucked into your kept notes. ♡'}</p>
    </article>}
    {!active && keeps && <div className="open-when-library">
      <div className="open-when-library-heading"><button type="button" onClick={() => setKeeps(false)}><ChevronLeft size={16} aria-hidden="true" /> back to the pile</button><h2 id="post-it-title" ref={heading} tabIndex={-1}>My kept notes</h2></div>
      {unseenCount > 0 && <p className="pile-anticipation" role="status">Sloth still has {unseenCount} little {unseenCount === 1 ? 'surprise' : 'surprises'} tucked away. ♡</p>}
      <div className="open-when-groups">{pinned.length > 0 && <section className="heart-pocket"><h3>📌 Super sticky notes</h3><div>{renderKept(pinned)}</div></section>}{unpinned.length > 0 && <section><h3>Little things from Sloth</h3><div>{renderKept(unpinned)}</div></section>}{found.length === 0 && <div className="open-when-empty"><p>Pick a scrap from the pile. It’ll be waiting here afterward.</p></div>}</div>
    </div>}
  </section>;
}
