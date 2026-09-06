# SlothMail agent guide

## Project purpose

SlothMail is a small, affectionate browser experience built around comforting
messages, collectible notes, and date-based surprises. Preserve its gentle,
playful voice and its intentionally personal feel. Product context lives in
[`docs/product.md`](docs/product.md); technical context lives in
[`docs/architecture.md`](docs/architecture.md).

## Repository map

- `src/App.tsx` contains nearly all application data, state, behavior, and UI.
- `src/styles.css` contains Tailwind's import plus the custom visual system and
  animation rules.
- `src/main.tsx` mounts the React application.
- `public/` contains the illustrations, icons, and other static assets.
- `.github/workflows/deploy.yml` builds and deploys `main` to GitHub Pages.

## Development commands

- Install dependencies: `npm install` (use `npm ci` in CI or from a clean
  lockfile).
- Start the local server: `npm run dev`.
- Create a production build and run TypeScript checks: `npm run build`.
- Preview the production build: `npm run preview`.

There is currently no separate lint or automated test command. Do not claim
that either has run.

## Implementation conventions

- Use TypeScript and functional React components.
- Follow the existing component and naming patterns before introducing a new
  abstraction. This app is intentionally small; avoid dependencies or
  architectural layers that do not clearly reduce complexity.
- Keep user-facing copy warm, concise, and consistent with the sloth-and-mouse
  vocabulary already in the app.
- Preserve mobile-friendly sizing, keyboard focus styles, semantic controls,
  image alternative text, and `prefers-reduced-motion` behavior.
- Put imported source assets in `public/` and reference them with relative URLs
  such as `./banff/example.png`. Vite uses `base: './'` so the build works from
  a GitHub Pages repository subpath.
- Treat date-dependent content carefully. Dates use local browser time and
  `en-CA` date keys in `YYYY-MM-DD` form. Check boundary dates as well as the
  ordinary current-date path.
- Development-only URL parameters such as `comfortDate` and `banffDay` exist to
  preview scheduled experiences. Keep preview behavior out of production.
- Keep browser storage backward-compatible. Do not rename a local-storage key
  or change its stored shape without a migration or an explicit decision to
  reset visitor progress.
- Do not commit generated `dist/` output.

## Working safely

- The working tree may contain edits or assets created by the user. Inspect
  `git status` and preserve unrelated work.
- Do not rewrite personal copy, dates, artwork, or progression rules unless the
  requested change requires it.
- When behavior changes, update the relevant project documentation in the same
  change. Record consequential or hard-to-reverse architecture decisions under
  `docs/decisions/`.

## Verification

For code or styling changes:

1. Run `npm run build`.
2. Exercise the affected flow in the browser at a narrow mobile viewport and a
   wider desktop viewport.
3. For scheduled content, check the supported development preview parameter and
   the dates immediately before and after its active window.
4. For persistence changes, reload the page and confirm existing progress is
   retained.
5. For animation changes, check both normal motion and reduced-motion mode.

For documentation-only changes, review links and commands; a production build
is unnecessary unless the documentation describes changed runtime behavior.
