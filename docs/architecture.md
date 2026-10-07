# SlothMail architecture

## System summary

SlothMail is a static single-page application. React renders the interface,
browser APIs provide time and persistence, and Vite produces files that GitHub
Pages can serve. There is no backend, database, authentication system, or
runtime API dependency.

```text
src/App.tsx + src/styles.css + public assets
                    |
                 Vite build
                    |
                  dist/
                    |
               GitHub Pages

Browser local time --------> scheduled content
Browser localStorage ------> visitor progress
```

## Runtime structure

`src/main.tsx` mounts the root React component in strict mode and loads the
global stylesheet.

`src/App.tsx` currently acts as both the content store and application layer. It
contains:

- message, treat, postcard, and comfort-kit content;
- TypeScript types for stored and displayed data;
- date-selection and preview helpers;
- local-storage loading, validation, and saving;
- React state and event handlers; and
- the rendered views, dialogs, and controls.

`src/styles.css` combines Tailwind CSS with custom component styles, responsive
rules, and animation keyframes. The more bespoke experiences—postcards,
welcome overlays, mouse reactions, and comfort-kit scenes—are primarily styled
through named CSS classes.

The Open When experience is a small self-contained exception to the root
component: `src/OpenWhen.tsx` owns its interaction and persistence, while its
editable catalog lives in `src/content/openWhenLetters.ts`.
`src/content/notePlacements.ts` records the explicit pile IDs and stable numeric library IDs (1001–1072). `src/postItProgress.ts` loads the unchanged post-it save; `src/NoteText.tsx` safely renders authored emphasis in both experiences.
Catalog entries can include optional artwork paths and alternative text. The
component displays uncropped note artwork, lazy-loaded collection thumbnails,
and simple authored emphasis without injecting HTML. Artwork and new catalog
entries do not change the persisted save shape or existing content IDs.

`public/` contains assets copied directly into the build. Source code uses
relative asset URLs because `vite.config.ts` sets `base` to `./`.

## Persistence

All durable state is stored in `window.localStorage`. The main save tracks the
star balance and rate, maximum stars, unlocked journal message IDs, the most
recent daily claim, and the last-opened timestamp. Separate keys track one-time
notices, postcard views, comfort-kit progress, and Open When discoveries,
favorites, and the current local day's discovery count. Legacy daily-limit fields remain readable but no longer limit discovery. An optional `stickySlots` array records three stable note IDs and each first-read timestamp (`null` for unread). Read slots refresh after eight elapsed hours; unread slots remain. Refresh runs on load, window focus, and every 15 seconds while the pile is mounted. Rereading does not restart timers. Selection guarantees exactly one illustrated slot, using known artwork when unseen illustrations run out. Older Open When saves without these fields still load.

On app initialization, discovered or favorited library-transfer IDs are unioned into the existing journal. The ordinary save effect persists that union, making repeat loads idempotent and leaving balances unchanged. The original post-it save is retained for pins and keepsakes, including retired notes. The two retired entries stay in the source archive but are excluded from both active catalogs. See [the migration decision](decisions/post-it-pile-migration.md).

Loaders defensively parse stored JSON and supply defaults. Any storage schema
change should continue accepting the previous shape or deliberately migrate it.
Changing a key is equivalent to resetting that part of the experience.

Storage is not synchronized across browsers or devices and is not recoverable
after local browser data is cleared.

## Date-dependent behavior

Date keys are generated from the visitor's local time with
`toLocaleDateString('en-CA')`, producing `YYYY-MM-DD` values. Several features
compare those keys against fixed dates or windows.

Development builds support query-string overrides for scheduled content. These
are useful for manual verification while keeping production tied to real local
time. Test active dates and both sides of every boundary when changing this
logic.

## Build and deployment

- `npm run build` runs the TypeScript project build and then Vite.
- Build output is written to `dist/`.
- `.github/workflows/deploy.yml` runs on pushes to `main` or by manual dispatch.
- CI uses Node 22, installs with `npm ci`, builds, and publishes `dist/` through
  GitHub Pages.

## Current tradeoffs

Keeping most behavior in one component makes this personal app easy to browse
and edit, but `src/App.tsx` is large and couples content, state, persistence,
and rendering. Extract code when a change has a clear boundary—for example, a
self-contained feature, reusable persistence helper, or content catalog—not
solely to reduce line count.

The client-only design minimizes operational complexity and protects the app's
casual feel. It also rules out cross-device progress, remote content editing,
notifications, and server-enforced schedules unless the architecture changes.

## When to record a decision

Add a short record under `docs/decisions/` when a change introduces a backend,
changes persistence semantics, replaces the deployment target, adds a major
dependency or state-management system, or otherwise creates a constraint future
contributors need to understand.
