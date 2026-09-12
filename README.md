# Kelsey Museum Virtual Experience

A React museum guide layered over an exported 8th Wall ECS experience. React owns the museum pages, saved visitor progress, navigation, quizzes, and inline GLB viewer; 8th Wall owns camera tracking and recognized target interactions.

## Development

Install dependencies using the package manager and lockfile chosen by your team, then run:

```sh
npm run serve
npm run typecheck
npm run build
```

`serve` starts webpack-dev-server; use its printed URL. `build` writes the deployable site to `dist/`, including the bundled runtime, models, and image targets. Camera testing requires a browser secure context (localhost or HTTPS) and camera permission. The repository currently contains both npm and pnpm lockfiles; avoid alternating package managers or regenerating both in the same change.

## Project layout

```text
src/
  app.ts                    Explicit application startup imports
  app/                      React root, navigation, discovery state
  ui/components/            Shared UI (viewer, dialogs, quiz, audio)
  ui/pages/                 Museum and visitor pages
  content/                  Museum records and their TypeScript interfaces
  ar/
    components/             Registered 8th Wall ECS components
    configureImageTargets.ts  XR8 image-target setup
    camera.ts               Camera lifecycle and permission states
  styles/                   React and legacy overlay stylesheets
  types/                    Asset and browser integration declarations
  assets/                   Models and museum images (stable public paths)
  .expanse.json             Exported scene, spaces, entities, component schemas
  .dependencies/            Exported Studio dependency metadata
  index.html                Runtime scripts, stylesheet, React mount point
config/                     Webpack, asset loader, generated entry
external/                   Vendored 8th Wall runtime and resources
image-targets/              Tracking definitions and source images
```

## Startup and integration

1. `index.html` loads the ECS runtime and begins loading the XR8 library.
2. The generated webpack entry imports `src/app.ts`, configures image targets, registers ECS components, and exposes a guarded `initializeMuseumScene` function before mounting React.
3. The app starts at character selection. The first Scan action initializes the exported scene and camera; leaving Scan pauses XR8 while pages and the inline viewer remain usable.
4. `ChangeSceneModelHook` dispatches `AR_MODEL_CLICKED` with `{ targetScene }`. React maps the exact exported exhibit name to an artifact, saves the discovery locally, and opens its detail page.
5. Artifact details use `@google/model-viewer` with the repository's GLB assets. The viewer is separate from 8th Wall scanning, so model rotation and zoom do not require camera access.

New executable modules must be imported explicitly. Adding a helper, declaration, or test file no longer causes it to execute at startup. Register new ECS components through `src/app.ts` before scene initialization. Keep registration names and schemas aligned with `.expanse.json`; moving a TypeScript file does not require renaming its registered component.

## Extending the experience

- Edit museum content in `src/content/museum.ts`; record shapes live in `types.ts`. Artifact dictionary keys are integration identifiers and differ from display IDs such as `ARF-203`.
- Add pages under `src/ui/pages/` and wire navigation in `src/app/App.tsx`. Keep state ownership in the app unless a feature needs its own state.
- Keep exact exported scene names in `src/app/progress.ts` when changing scan mappings.
- Add tracking definitions under `image-targets/` and include them in `configureImageTargets.ts`.
- Keep model and image filenames stable: the scene and content refer to them. The asset loader exports public URLs rather than embedding files.
- Visitor styles are bundled through `styles/ReactApp.css`; `overlay.css` remains available for the exported runtime.
- Treat `external/` and scene export metadata as vendor/export inputs. Do not casually format or rewrite them.

## Verification checklist

Run type checking and the production build after changes. For camera-enabled device validation:

- Open the camera; scan each configured target and verify model visibility.
- Tap each model, check its detail page and collection unlock, and repeat scans without duplicate unlocks.
- Browse characters, character details, comics, and artifacts through the sidebar.
- Open each discovered artifact, load its inline GLB, rotate, zoom, reset, expand, retry, and return with Back.
- Verify leaving Scan pauses the camera and returning to Scan resumes it without duplicate discoveries.
- Check saved favorites, discoveries, selected character, filters, quizzes, maps, text size, contrast, audio fallback, keyboard focus, and reload behavior.
- During development, edit an imported page and the scene export to verify rebuilding and scene updates.
