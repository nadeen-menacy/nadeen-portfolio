# Nadeen Menacy — Portfolio

## Run locally

1. Install Node.js (LTS).
2. Open this folder in a terminal.
3. Run:

```bash
npm install
npm run dev
```

4. Open the local URL printed by Vite (usually http://localhost:5173).

To create a production build:

```bash
npm run build
```

## Project images

All project images are in `public/assets/`. Keep that folder in place.

## Add one video to any project

1. Put the MP4 file in `public/assets/videos/`.
2. Open `src/App.jsx`.
3. Find the project object in the `projects` array.
4. Set its `videoUrl` to the path below, using the correct filename:

```js
videoUrl: "/assets/videos/your-video-name.mp4"
```

Each project has its own `videoUrl` field. Leave it as `null` when there is no video. The video player appears automatically when a URL is set.

For example, for the Sonder demo:

```js
videoUrl: "/assets/videos/sonder-demo.mp4"
```

Then place `sonder-demo.mp4` inside `public/assets/videos/`.

## Résumé

The My CV window downloads `public/assets/Nadeen-Menacy-Resume.pdf` directly. Replace that file if the résumé is updated, keeping the same filename.
