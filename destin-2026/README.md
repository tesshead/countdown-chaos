# Countdown Chaos Hub

A tiny static GitHub Pages countdown hub. Right now it has one big girls-trip countdown, but the repo can grow into a landing page for more countdowns later.

## Edit the trip details

Open `script.js` and change:

```js
const trip = {
  title: "Girls Trip Countdown",
  date: "2026-08-07T10:00:00-04:00",
  tagline: "Hydration optional. Dramatic beach entrance mandatory."
};
```

Use the destination's date/time if you want the countdown to hit zero at arrival/check-in time.

## Publish with GitHub Pages

1. Create a new public GitHub repository, for example `countdown-chaos`.
2. Upload these files to the repo root:
   - `index.html`
   - `style.css`
   - `script.js`
   - `.nojekyll`
   - `README.md`
3. Go to repo **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Choose `main` and `/root`, then save.

Your site will publish at something like:

`https://YOUR-GITHUB-USERNAME.github.io/countdown-chaos/`
