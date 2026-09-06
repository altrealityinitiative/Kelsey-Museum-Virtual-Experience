# Kelsey Museum Virtual Experience

A React museum guide layered over an exported 8th Wall ECS experience. React owns the museum pages and navigation; 8th Wall owns camera tracking, scene spaces, models, and gestures.

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
  ui/components/            Shared UI (sidebar)
  ui/pages/                 Museum and exhibit pages
  content/                  Museum records and their TypeScript interfaces
  ar/
    components/             Registered 8th Wall ECS components
    configureImageTargets.ts  XR8 image-target setup
    spaces.ts               Artifact-to-exhibit mapping
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

1. `index.html` loads the ECS runtime and starts loading XR8.
2. The generated webpack entry imports `src/app.ts`. It configures tracking immediately if XR8 is ready, otherwise on `xrloaded`; registers the ECS components; and schedules React mounting on `DOMContentLoaded`.
3. The entry initializes `src/.expanse.json` after component registration. Development scene updates retain the export's existing hot-update behavior.
4. `ChangeSceneModelHook` dispatches `AR_MODEL_CLICKED` with `{ targetScene }`. React normalizes the scene name, unlocks known artifacts for the current session, and opens the detail page.
5. The ECS hook exposes `window.load8thWallSpace`. `ExhibitPage` calls it when mounted and returns to `AR Camera Page` when unmounted. This bridge is optional until the ECS component has been added.

New executable modules must be imported explicitly. Adding a helper, declaration, or test file no longer causes it to execute at startup. Register new ECS components through `src/app.ts` before scene initialization. Keep registration names and schemas aligned with `.expanse.json`; moving a TypeScript file does not require renaming its registered component.

## Extending the experience

- Edit museum content in `src/content/museum.ts`; record shapes live in `types.ts`. Artifact dictionary keys are integration identifiers and differ from display IDs such as `ARF-203`.
- Add pages under `src/ui/pages/` and wire navigation in `src/app/App.tsx`. Keep state ownership in the app unless a feature needs its own state.
- Update exhibit routing in `src/ar/spaces.ts` using exact scene-space names.
- Add tracking definitions under `image-targets/` and include them in `configureImageTargets.ts`.
- Keep model and image filenames stable: the scene and content refer to them. The asset loader exports public URLs rather than embedding files.
- Styles remain in their original order, with the original public stylesheet names. `overlay.css` is copied but is not linked by the current HTML.
- Treat `external/` and scene export metadata as vendor/export inputs. Do not casually format or rewrite them.

## Verification checklist

Run type checking and the production build after changes. For camera-enabled device validation:

- Open the camera; scan each configured target and verify model visibility.
- Tap each model, check its detail page and collection unlock, and repeat scans without duplicate unlocks.
- Browse characters, character details, comics, and artifacts through the sidebar.
- Enter every exhibit, rotate models, use scene rotation controls, then return using Back and sidebar navigation.
- Verify leaving an exhibit restores the camera space and UI controls remain clickable over the canvas.
- Check legacy scene scrolling, text wrapping, target-found/target-lost UI, and reload behavior.
- During development, edit an imported page and the scene export to verify rebuilding and scene updates.
