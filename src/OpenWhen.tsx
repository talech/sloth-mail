import { useMemo, useState } from 'react';
import { ChevronLeft, Pin, Sparkles, StickyNote } from 'lucide-react';
import { companyNeeds, openWhenLetters, type OpenWhenLetter } from './content/openWhenLetters';

const OPEN_WHEN_KEY = 'slothmail-open-when-v1';
const DAILY_DISCOVERY_LIMIT = 2;
// The content workshop accepts simple emphasis without rendering raw HTML.
const renderNoteText = (text: string) => text.split(/(\*\*_[^_]+_\*\*|\*\*[^*]+\*\*|_[^_]+_)/g).map((part, index) => {
  if (part.startsWith('**_') && part.endsWith('_**')) return <strong key={index}><em>{part.slice(3, -3)}</em></strong>;
  if (part.startsWith('**') && part.endsWith('**')) return <strong key={index}>{part.slice(2, -2)}</strong>;
  if (part.startsWith('_') && part.endsWith('_')) return <em key={index}>{part.slice(1, -1)}</em>;
  return part;
});
const getTodayKey = () => new Date().toLocaleDateString('en-CA');

const shouldPreviewLibrary = () => (
  import.meta.env.DEV && new URLSearchParams(window.location.search).get('openWhenPreview') === '1'
);

type OpenWhenSave = {
  opened: string[];
  favorites: string[];
  discoveryDate: string | null;
  discoveriesToday: number;
};

const loadOpenWhenSave = (): OpenWhenSave => {
  try {
    const saved = JSON.parse(localStorage.getItem(OPEN_WHEN_KEY) ?? '');
    const today = getTodayKey();
    const discoveryDate = typeof saved.discoveryDate === 'string' ? saved.discoveryDate : null;
    return {
      opened: Array.isArray(saved.opened) ? saved.opened.filter((id: unknown) => typeof id === 'string') : [],
      favorites: Array.isArray(saved.favorites) ? saved.favorites.filter((id: unknown) => typeof id === 'string') : [],
      discoveryDate,
      discoveriesToday: discoveryDate === today && typeof saved.discoveriesToday === 'number' ? saved.discoveriesToday : 0,
    };
  } catch {
    return { opened: [], favorites: [], discoveryDate: null, discoveriesToday: 0 };
  }
};

const pickUndiscoveredLetter = (needId: string, opened: string[]) => {
  const pool = openWhenLetters.filter(letter => letter.needs.includes(needId) && !opened.includes(letter.id));
  return pool[Math.floor(Math.random() * pool.length)];
};

export default function OpenWhen() {
  const [saved, setSaved] = useState(loadOpenWhenSave);
  const [selectedNeed, setSelectedNeed] = useState<string | null>(null);
  const [activeLetter, setActiveLetter] = useState<OpenWhenLetter | null>(null);
  const [showLibrary, setShowLibrary] = useState(shouldPreviewLibrary);
  const [libraryNeed, setLibraryNeed] = useState<string | null>(null);
  const isPreview = shouldPreviewLibrary();
  const discoveriesToday = saved.discoveryDate === getTodayKey() ? saved.discoveriesToday : 0;
  const discoveriesLeft = isPreview ? DAILY_DISCOVERY_LIMIT : Math.max(DAILY_DISCOVERY_LIMIT - discoveriesToday, 0);

  const persist = (next: OpenWhenSave) => {
    setSaved(next);
    localStorage.setItem(OPEN_WHEN_KEY, JSON.stringify(next));
  };

  const resetPostIts = () => {
    const fresh = { opened: [], favorites: [], discoveryDate: null, discoveriesToday: 0 };
    persist(fresh);
    setActiveLetter(null);
    setLibraryNeed(null);
    setSelectedNeed(null);
    setShowLibrary(false);
  };

  const openLetter = (letter: OpenWhenLetter, needId?: string, discover = false) => {
    if (needId) setSelectedNeed(needId);
    setActiveLetter(letter);
    setShowLibrary(false);
    if (discover && !saved.opened.includes(letter.id)) {
      persist({
        ...saved,
        opened: [...saved.opened, letter.id],
        discoveryDate: getTodayKey(),
        discoveriesToday: isPreview ? saved.discoveriesToday : discoveriesToday + 1,
      });
    }
  };

  const chooseNeed = (needId: string) => {
    if (discoveriesLeft === 0) return;
    const letter = pickUndiscoveredLetter(needId, saved.opened);
    if (letter) {
      openLetter(letter, needId, true);
    } else {
      setLibraryNeed(needId);
      setShowLibrary(true);
    }
  };

  const discoverAnother = () => {
    if (!selectedNeed || discoveriesLeft === 0) return;
    const letter = pickUndiscoveredLetter(selectedNeed, saved.opened);
    if (letter) openLetter(letter, selectedNeed, true);
  };

  const toggleFavorite = () => {
    if (!activeLetter) return;
    const favorites = saved.favorites.includes(activeLetter.id)
      ? saved.favorites.filter(id => id !== activeLetter.id)
      : [...saved.favorites, activeLetter.id];
    persist({ ...saved, favorites });
  };

  const visibleLetters = isPreview ? openWhenLetters : openWhenLetters.filter(letter => saved.opened.includes(letter.id));
  const favoriteLetters = openWhenLetters.filter(letter => saved.favorites.includes(letter.id));
  const libraryNeedDetails = companyNeeds.find(need => need.id === libraryNeed);
  const groupedLetters = useMemo(() => companyNeeds.map(need => ({
    ...need,
    letters: visibleLetters.filter(letter => (
      libraryNeed
        ? letter.needs.includes(need.id)
        : letter.needs[0] === need.id && !saved.favorites.includes(letter.id)
    )),
  })).filter(group => group.letters.length > 0 && (!libraryNeed || group.id === libraryNeed)), [visibleLetters, libraryNeed, saved.favorites]);

  return (
    <section className={`open-when ${activeLetter ? 'is-showing-post-it' : ''}`} aria-labelledby="open-when-title">
      {!activeLetter && !showLibrary && (
        <>
          <div className="open-when-sky" aria-hidden="true"><span>✦</span><span>♡</span><span>✧</span></div>
          <div className="open-when-heading">
            <span className="open-when-emblem" aria-hidden="true">🦥<i>💜</i></span>
            <span className="open-when-kicker">from Sloth</span>
            <h1 id="open-when-title">What do you need?</h1>
            {discoveriesLeft > 0 && (
              <>
                <p>Pick one. No explaining.</p>
                <div className="open-when-allowance">
                  <span className={discoveriesToday >= 1 ? 'is-opened' : ''}><StickyNote size={15} /></span>
                  <span className={discoveriesToday >= 2 ? 'is-opened' : ''}><StickyNote size={15} /></span>
                  <strong>{discoveriesLeft} left today</strong>
                </div>
              </>
            )}
          </div>
          {discoveriesLeft > 0 ? (
            <div className="company-choices">
              {companyNeeds.map(need => {
                const hasUndiscovered = openWhenLetters.some(letter => letter.needs.includes(need.id) && !saved.opened.includes(letter.id));
                return (
                  <button key={need.id} type="button" onClick={() => chooseNeed(need.id)} className={`company-choice ${!hasUndiscovered ? 'is-complete' : ''}`}>
                    <span aria-hidden="true">{need.emoji}</span>
                    <span><strong>{need.label}</strong><small>{hasUndiscovered ? need.description : 'All found · tap to reread'}</small></span>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="open-when-resting">
              <StickyNote size={26} aria-hidden="true" />
              <strong>More tomorrow.</strong>
              <p>You can still revisit your collection.</p>
            </div>
          )}
          <button type="button" className="open-when-library-button" onClick={() => { setLibraryNeed(null); setShowLibrary(true); }}>
            <StickyNote size={14} /> collection {saved.opened.length > 0 && `(${saved.opened.length})`}
          </button>
          {import.meta.env.DEV && <button type="button" className="open-when-reset" onClick={resetPostIts}>reset test post-its</button>}
        </>
      )}

      {activeLetter && (
        <article className="open-letter" aria-live="polite">
          <button type="button" className="open-letter-back" onClick={() => setActiveLetter(null)}>
            <ChevronLeft size={15} /> back
          </button>
          <div className="post-it-sheet">
            <p className="open-letter-kicker">a post-it for…</p>
            <h2>{activeLetter.title}</h2>
            {activeLetter.artwork && <img className="open-letter-artwork" src={activeLetter.artwork.src} alt={activeLetter.artwork.alt} />}
            <div className="open-letter-copy">
              {activeLetter.message.map(paragraph => <p key={paragraph}>{renderNoteText(paragraph)}</p>)}
            </div>
            <p className="open-letter-closing">{renderNoteText(activeLetter.closing)}</p>
          </div>
          <div className="open-letter-actions">
            {selectedNeed && discoveriesLeft > 0 && pickUndiscoveredLetter(selectedNeed, saved.opened) && (
              <button type="button" onClick={discoverAnother}><Sparkles size={14} /> another</button>
            )}
            <button
              type="button"
              className={saved.favorites.includes(activeLetter.id) ? 'is-favorite' : ''}
              onClick={toggleFavorite}
              aria-pressed={saved.favorites.includes(activeLetter.id)}
            >
              <Pin size={14} className={saved.favorites.includes(activeLetter.id) ? 'fill-current' : ''} />
              {saved.favorites.includes(activeLetter.id) ? 'pinned' : 'pin this'}
            </button>
          </div>
          {saved.favorites.includes(activeLetter.id) && <p className="heart-pocket-note" role="status">Pinned. 💜</p>}
        </article>
      )}

      {showLibrary && (
        <div className="open-when-library">
          <div className="open-when-library-heading">
            <button type="button" onClick={() => { setLibraryNeed(null); setShowLibrary(false); }}><ChevronLeft size={14} /> back</button>
            <div><h2>{libraryNeedDetails ? libraryNeedDetails.label : 'Your post-its'}</h2></div>
          </div>
          {libraryNeedDetails && <p className="open-when-library-intro">Every note in this set is yours to revisit.</p>}
          <div className="open-when-groups">
            {favoriteLetters.length > 0 && !libraryNeed && (
              <section className="heart-pocket">
                <h3><span aria-hidden="true">📌</span> Super sticky notes</h3>
                <div>
                  {favoriteLetters.map(letter => (
                    <button key={`favorite-${letter.id}`} type="button" onClick={() => openLetter(letter)}>
                      {letter.artwork ? <img className="open-when-thumbnail" src={letter.artwork.src} alt="" loading="lazy" /> : <span aria-hidden="true">📌</span>}<span>{letter.title}</span>
                    </button>
                  ))}
                </div>
              </section>
            )}
            {groupedLetters.length === 0 && (libraryNeed || favoriteLetters.length === 0) && (
              <div className="open-when-empty"><StickyNote size={26} /><strong>Nothing here yet.</strong><p>Your first note will appear here.</p></div>
            )}
            {groupedLetters.map(group => (
              <section key={group.id}>
                <h3><span aria-hidden="true">{group.emoji}</span> {group.label}</h3>
                <div>
                  {group.letters.map(letter => (
                    <button key={`${group.id}-${letter.id}`} type="button" onClick={() => openLetter(letter, group.id)}>
                      {letter.artwork ? <img className="open-when-thumbnail" src={letter.artwork.src} alt="" loading="lazy" /> : <span aria-hidden="true">{saved.favorites.includes(letter.id) ? '📌' : <StickyNote size={13} />}</span>}
                      <span>{letter.title}</span>
                    </button>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
