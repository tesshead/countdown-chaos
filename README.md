# Countdown Chaos

A static, goofy, obnoxious GitHub Pages countdown hub for upcoming chaos. No frameworks, build step, paid APIs, or auth. Just plain HTML, CSS, and JavaScript.

## Pages

- Landing page: `https://tesshead.github.io/countdown-chaos/`
- Destin Girls Trip / Operation Beach Please: `https://tesshead.github.io/countdown-chaos/destin-2026/`
- Chattanooga Renaissance Faire: `https://tesshead.github.io/countdown-chaos/ren-faire-2026/`

## How to add a new countdown

1. Copy one of the existing event folders, such as `ren-faire-2026/`.
2. Rename the folder for the new event.
3. Update the date near the top of the copied `script.js`.
4. Update the page title, headline, copy, and location in `index.html`.
5. Add a new card to the root `index.html` with a relative link like `./new-event/`.
6. Add the new card's target date to its `data-countdown` attribute.

Use timezone-aware ISO strings for dates, for example:

```js
new Date("2026-08-07T12:00:00-04:00")
```

## Deploy with GitHub Pages

1. Push changes to the repository's default branch.
2. In GitHub, open **Settings -> Pages**.
3. Choose **Deploy from a branch**.
4. Select the default branch and `/root`.
5. Save.

The `.nojekyll` file is kept at the repo root so GitHub Pages serves the static files directly.
