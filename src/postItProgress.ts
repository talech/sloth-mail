import { type StickySlot } from './stickyPile';
export const OPEN_WHEN_KEY = 'slothmail-open-when-v1';
export type OpenWhenSave = {
  opened: string[];
  favorites: string[];
  discoveryDate: string | null;
  discoveriesToday: number;
  stickySlots?: StickySlot[];
};
export function loadOpenWhenSave(): OpenWhenSave {
  try {
    const saved = JSON.parse(localStorage.getItem(OPEN_WHEN_KEY) ?? '');
    return {
      opened: Array.isArray(saved.opened) ? saved.opened.filter((id: unknown) => typeof id === 'string') : [],
      favorites: Array.isArray(saved.favorites) ? saved.favorites.filter((id: unknown) => typeof id === 'string') : [],
      stickySlots: Array.isArray(saved.stickySlots) ? saved.stickySlots.filter((slot: unknown): slot is StickySlot => {
        if (!slot || typeof slot !== 'object') return false;
        const value = slot as Partial<StickySlot>;
        return typeof value.id === 'string' && (value.readAt === null || (typeof value.readAt === 'number' && Number.isFinite(value.readAt) && value.readAt >= 0));
      }).filter((slot: StickySlot, index: number, slots: StickySlot[]) => slots.findIndex(other => other.id === slot.id) === index) : [],
      discoveryDate: typeof saved.discoveryDate === 'string' ? saved.discoveryDate : null,
      discoveriesToday: typeof saved.discoveriesToday === 'number' ? saved.discoveriesToday : 0,
    };
  } catch { return { opened: [], favorites: [], discoveryDate: null, discoveriesToday: 0 }; }
}
