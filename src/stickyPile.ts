import { openWhenLetters } from './content/openWhenLetters';
import { pileNoteIds } from './content/notePlacements';
export const STICKY_REFRESH_MS = 8 * 60 * 60 * 1000;
export type StickySlot = { id: string; readAt: number | null };
const notes = openWhenLetters.filter(note => pileNoteIds.has(note.id));
const firstFinds = ['blanket-science', 'pocket-love-letter', 'blanket-apology', 'tiny-smirk', 'theodore-teaspoon', 'harlito-command'];
export function refreshStickyPile(slots: StickySlot[], known: string[], now: number): StickySlot[] {
  const next = slots.filter(slot => pileNoteIds.has(slot.id)).slice(0, 3).map(slot => ({ ...slot }));
  const originalIds = next.map(slot => slot.id);
  // Preserve the first existing artwork slot; repair extra artwork without losing discoveries.
  const existingArtIndex = next.findIndex(slot => notes.find(note => note.id === slot.id)?.artwork);
  const artIndex = existingArtIndex < 0 ? 0 : existingArtIndex;
  for (let index = 0; index < 3; index++) {
    const current = next[index];
    const needsArt = index === artIndex;
    const matchesRole = current && Boolean(notes.find(note => note.id === current.id)?.artwork) === needsArt;
    if (matchesRole && (current.readAt === null || now < current.readAt + STICKY_REFRESH_MS)) continue;
    const candidates = notes.filter(note => !next.some(slot => slot.id === note.id) && (Boolean(note.artwork) === needsArt));
    const unseen = candidates.filter(note => !known.includes(note.id));
    const preferred = firstFinds.map(id => unseen.find(note => note.id === id)).find(Boolean);
    const fresh = unseen.filter(note => !originalIds.includes(note.id));
    const pool = fresh.length ? fresh : candidates;
    const choice = preferred ?? pool[Math.floor(Math.random() * pool.length)];
    if (choice) next[index] = { id: choice.id, readAt: known.includes(choice.id) ? now : null };
  }
  return next;
}
