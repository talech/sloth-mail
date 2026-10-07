# Post-it pile and library migration

Date: 2026-10-07

## Decision

Replace need-based, two-per-day discovery with a replenishing three-scrap pile. The approved content sort assigns 77 notes to the pile, 72 to the library, and retires two from future discovery. All 25 illustrated entries belong in the pile.

Keep original content IDs and the `slothmail-open-when-v1` key. Preserve the legacy discoveryDate and discoveriesToday fields, but ignore their allowance. Add optional `stickySlots` containing explicit IDs and nullable first-read timestamps. Existing saves initialize three slots without losing discoveries or favorites. Source entries remain archived so previously discovered or pinned content is always readable.

The numeric library journal requires an explicit immutable mapping, published as IDs 1001–1072 in `notePlacements.ts`. On initialization, union transferred discoveries and favorites with the saved journal. Preserve balances and existing journal IDs. Persist through the normal main save effect. This is repeatable and requires no one-time migration flag.

Pins remain in the original post-it save and visible in kept notes. Retired entries do not appear in new discovery or the main message bank. Transferred entries retain paragraphs, closings, and authored emphasis. Existing collected messages become clickable for free rereading.

## Consequences

Future content must receive an explicit placement. Never reassign published numeric IDs or remove archived entries needed by old discoveries. Progress remains browser-local. The pile has no date window. The optional slot field extends the existing save compatibly. It keeps three slots visible, replacing read slots after eight elapsed hours and retaining unread ones. Exactly one slot always has artwork, reusing known art when needed. It shows a next-arrival countdown and the number of unseen pile notes in kept notes.
