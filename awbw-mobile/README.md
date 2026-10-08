# Field Command — AWBW browser harness

Everything for this project lives in this folder. Other storage projects are untouched.

A first integration scaffold for a new interface **on top of your existing Advance Wars By Web account**. This does not create a separate game service.

## What exists

- Responsive operations dashboard and Your Turn filter.
- Self-contained userscript that runs on AWBW’s origin and reads `/yourgames.php` and `/yourgames.php?yourTurn=1` using the existing browser session.
- Real game links in a focused wrapper. **The battlefield and all multiplayer actions still use the original AWBW interface**, inside a same-origin frame. Full Page and Original AWBW remain available.
- Static installation site with clearly labeled sample design data. It does not display your account; install the userscript to connect on AWBW.
- No dependencies, password capture, session export, external assets, or remote proxy.

## Run

```sh
cd /workspace/storage/awbw-mobile
npm run build
npm run dev
```

Open http://localhost:5173. Install instructions: `/#connect`.

## Install

1. Sign in normally at https://awbw.amarriner.com/.
2. Install a userscript manager (Tampermonkey on desktop or compatible Android browsers; Userscripts for Safari on iOS).
3. Install `field-command.user.js` from the hosted site. For Userscripts on iOS, save the file in its configured script folder and enable the extension for AWBW.
4. Visit https://awbw.amarriner.com/yourgames.php. Subframes are excluded, so original game controls are not recursively modified.
5. Disable the userscript to uninstall. “Original AWBW” removes the overlay for the current page without changing game data.

## Netlify

Create a site from this repository with **base directory `awbw-mobile`**. `netlify.toml` defines build command `npm run build` and publish directory `dist`. No secrets or environment variables are required. The deployment hosts the installer/preview, not an AWBW session proxy. No Netlify account connection was available in this development session, so no deployment was performed.

## Limits and next work

The development environment cannot reach AWBW (outbound requests return 403). Real-site HTML and mutation endpoints have **not been verified**. The adapter recognizes same-origin `/game.php?games_id=<number>` links and deduplicates them. Turn ownership comes from AWBW’s filtered list; opponent names, map data, funds, and unit state are not invented. Unexpected page structures produce empty/error states with the original-page escape route.

Before a full live replacement:

1. Validate parsing on an authenticated AWBW page and add pagination if needed. Currently only games in the returned page are shown.
2. Verify frame compatibility. If framing is disallowed, Full Page remains available.
3. Inspect the real state/action contracts and any supported API with an authenticated local browser. Confirm AWBW’s third-party client expectations before replacing its controls.
4. Build terrain/unit rendering and touch controls against verified state. Preserve turn versions to prevent stale moves. Implement movement, attack, capture, purchases, undo (if supported), end turn, replays, chat, and settings against verified server behavior.
5. Test real iOS/Android devices. A compatible userscript browser/extension is required; this is not a zero-install standalone client.

`harness.js` is the readable adapter. `npm run build` embeds `styles.css` into `field-command.user.js`. Do not edit the generated bundle directly.

## Browser checks

With Python Playwright and Chromium installed, run the dev server in one terminal and `npm test` in another. Tests intercept AWBW with local HTML fixtures and never submit game actions. They check mobile overflow, filters, same-origin extraction, deduplication, escaped titles, original frame controls, no recursive injection, restoration, and network errors. Screenshot artifacts are ignored by Git.

## Original asset collection and handheld workbench

The supplied AWBW asset pack is imported and included in the build: 530 unique files from 557 source records, including 219 animated images. Visitors load the bundled artwork automatically; friends do not need the collector or a ZIP. Source URLs and hashes remain in `assets/catalog.json`. AWBW backend access from this environment is still blocked.

Install `asset-collector.user.js` using your userscript manager. On an AWBW game/map/CO page, open the Field Command Asset Pack panel and choose **Capture this page**. Captured public images accumulate in IndexedDB across pages. Choose **Export ZIP** to download original image bytes and a source-tracked manifest. Requests omit credentials; account/session data is not exported. GIF animation bytes are preserved. Files larger than 2 MB or total packs over 64 MB are skipped and reported. Discovery covers loaded images/resources and readable CSS, not assets the browser has never loaded.

Open `asset-library.html` to use the bundled artwork immediately. **Add another pack** optionally loads an additional exported ZIP in a GBA-style sprite workbench. Place terrain and transparent unit sprites on a 16×10 screen, use the D-pad and A/B controls, or fill the map with a terrain tile. This is an art sandbox, not a live match. No game actions are sent.

To persist the files inside this isolated project:

```sh
npm run import-assets -- /path/to/awbw-assets.zip
npm run build
```

The importer validates manifest paths and SHA-256 before writing original files to `assets/`. Source URLs and attribution are recorded in `assets/catalog.json`. The build includes this local catalog and pack for the workbench. Authorship/reuse terms remain unverified; asset presence on AWBW is not treated as a license.
