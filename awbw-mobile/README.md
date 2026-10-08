# Field Command

A handheld-style browser client project for Advance Wars By Web. All files, artwork, tests, and deployment configuration are isolated in `awbw-mobile/`.

## Current behavior

Opening the site starts **River Crossing**, a local hotseat practice match rendered with the collected AWBW pixel art. It includes tap selection, movement previews, Wait/Attack/Capture commands, purchases at friendly bases, alternating turns, income, zoom/pan, keyboard/D-pad controls, optional synthesized UI sound, and optional full-screen mode. Practice progress is saved only in browser local storage. Rules are simplified and do not claim full Advance Wars or AWBW parity. No AWBW game is changed by practice.

The supplied art pack is bundled: **530 unique files, 557 source records, 219 animated files**. Friends do not collect or upload artwork. Original bytes, source URLs, and SHA-256 hashes remain in `assets/catalog.json`. Authorship and reuse terms are not yet verified; asset presence on AWBW is not treated as a license.

## Live AWBW status

`awbw-bridge.user.js` runs on the original AWBW game page and can:

- Send a read-only rendering of visible map sprites to the hosted Field Command client in another tab, with source/origin-checked `postMessage` communication.
- Export a rendered map snapshot for manual loading from the client’s Menu.
- Observe requests the official interface already makes: method, path, parameter names, and JSON response types. Only whitelisted numeric/enum game-state and action examples are retained. Authentication values, arbitrary strings, cookies, headers, full HTML, inline scripts, and account credentials are not exported.
- Export inspection data with public `.js`/`.css` source files retrieved without credentials, for implementing the real backend adapter.

The bridge **does not submit game orders**. The live viewer is a DOM mirror, not a verified game-state API. HP, ownership, terrain semantics, fog logic, player identity, and turn permissions are not inferred. Unknown tiles/assets are visibly marked. Sprite container detection is heuristic and may fail on real AWBW markup; inspection exports still contain diagnostic information and public source when possible. The development environment cannot reach AWBW, so real-site integration and mutation contracts remain unverified. Use the original AWBW page for real orders.

A full replacement still needs the actual state/action contracts, verified stale-turn protection, capture/purchase rules, action acknowledgments, reconnect behavior, fog handling, and real-device tests. Actions are intentionally disabled in the live viewer until those requirements are met.

## Run and test

```sh
cd /workspace/storage/awbw-mobile
npm run build
npm run dev
```

Open http://localhost:5173. Run `npm test` in a second terminal. Engine tests use Node; browser tests require Python Playwright and Chromium. Tests use intercepted HTML/network fixtures and never submit real AWBW actions. They cover practice validation, combat/capture/purchases/turns, touch interaction and persistence, mobile layouts, image integrity, export/import, DOM capture, redacted request contracts, disabled live commands, and actual cross-origin window handshakes. Screenshot artifacts are ignored by Git.

## Share with your friend

Deploy the static site once. Both players use that URL; artwork is included. Local practice requires no extension. To view each player's real AWBW game, each installs the read-only bridge and signs into their own AWBW account. This is not yet a zero-install standalone AWBW client.

### Netlify through Git

Create a Netlify site from `alphastack1/storage`, using branch `field-command-awbw` and **base directory `awbw-mobile`**. The folder's `netlify.toml` defines command `npm run build`, output `dist`, and response headers. No environment variables or AWBW credentials are required.

### Netlify through drag-and-drop

`npm run package` builds `field-command-site.zip` in this project. Extract it and drag the resulting folder containing `index.html` onto https://app.netlify.com/drop while logged into your Netlify account. The resulting URL is usable by both players. This development session has no authenticated Netlify connection; no remote deployment has been performed.

## Connect an actual match

1. Install `awbw-bridge.user.js` in Tampermonkey (or a compatible userscript manager). Allow user scripts and AWBW site access.
2. Open/reload a game on AWBW. In **Field Command · Read-only bridge**, choose **Open handheld view** and enter the deployed Field Command site URL.
3. Keep the original AWBW tab open. The new tab receives visible sprites only; use the original site to issue actual orders.
4. To help finish the adapter, choose **Export inspection** and provide that JSON to the developer. It includes public source plus observed request structure. If desired, use the official controls normally first so their requests can be observed. No need to take game actions solely for collection.
5. If cross-tab communication is blocked, choose **Export snapshot**, then load it through Menu → Load AWBW snapshot in Field Command.

Mobile support depends on the browser's userscript and popup support (for example, compatible Android browsers or Userscripts in Safari on iOS). Safari popup relationships and background tabs require real-device verification. The read-only viewer does not promise continuous polling when the browser suspends AWBW.

## Files

- `index.html`, `play.html`, `play.js`, `play.css`: main handheld client.
- `tactics.js`: simplified local-only practice engine.
- `snapshot.js`: strict read-only snapshot validation.
- `awbw-bridge.user.js`, `bridge.html`: live bridge, inspection and installation.
- `operations.html`, `app.js`, `harness.js`: earlier dashboard prototype and optional dashboard userscript.
- `asset-library.html`: optional sprite workbench.
- `asset-collector.user.js`, `scripts/import_assets.py`: developer asset collection/import tools, unnecessary for regular players.
- `netlify.toml`: static deployment configuration.

## Adding more artwork

The collector captures publicly accessible images loaded by AWBW pages. It stores images locally in IndexedDB and exports a source-tracked ZIP. GIFs stay unchanged. Images over 2 MB or packs over 64 MB are skipped and reported. Discovery covers loaded resources and readable styles, not every asset on the site.

```sh
npm run import-assets -- /path/to/awbw-assets.zip
npm run build
```

The importer validates all manifest paths and SHA-256 before writing inside `assets/`. Source URLs and attribution remain recorded. This is a developer maintenance step, not a setup requirement for friends.

## Pre-deployment integration review

Netlify deployment is on hold until the live integration is inspected. You can run the bridge directly on your logged-in AWBW game **without a Field Command site or Netlify**. Install the read-only bridge, reload the game, expand its panel, and choose Export inspection. Using the official controls normally while the inspector is installed can add state/order examples; no extra game action is necessary solely for collection.

Version 0.2 exports whitelisted numeric/enum game-state and action values (for example unit IDs, x/y, HP, funds, and explicit success/failure), plus type schemas and public client source. Sensitive fields and arbitrary strings are excluded. Exported outcomes are observations of AWBW's official client, not evidence that independent orders have been tested. No password is needed; the original browser session stays on AWBW.

Review an export locally:

```sh
npm run review-inspection -- /path/to/awbw-inspection-123.json
```

This prints evidence coverage and missing live-order checks. It does not contact AWBW or submit commands. Independent live orders remain disabled until exact contracts, active-player permissions, stale/duplicate request behavior, server acknowledgments, and designated test-match operations are verified against the real site.
