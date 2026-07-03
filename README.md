# Maggie's Portfolio 🖥️🌸

A personal portfolio styled as an interactive **macOS desktop** — clickable
folders that open Finder-style windows, a dock of flagship "apps", and a
pastel Y2K-scrapbook vibe.

Built with **React + Vite + TypeScript + Tailwind CSS + Framer Motion**
(with a tiny Zustand store managing the open windows).

---

## Run it locally

You need [Node.js](https://nodejs.org) (already installed on Maggie's machine).

```bash
npm install     # first time only — downloads dependencies
npm run dev      # start the local preview
```

Then open the URL it prints (usually **http://localhost:5173/maggie-portfolio/**)
in your browser. The page live-reloads as files change.

Other commands:

```bash
npm run build     # production build into dist/
npm run preview   # preview the production build locally
npm run typecheck # optional: check for TypeScript mistakes
```

---

## Where to edit content

**Almost everything you'll want to change lives in one file:**
[`src/content.ts`](src/content.ts).

- Folder names, positions, and the items inside each folder
- The dock "apps" (flagship projects) and their live/code links
- Text for the postcard and iPod widgets

To add real images, drop files into the `public/` folder (e.g.
`public/photos/beach.jpg`) and set an item's `image` to `photos/beach.jpg`.
Items without an image show a tasteful colored placeholder, so nothing
ever looks broken.

---

## Project structure

```
src/
  content.ts            ← ✏️ edit me: all folders, apps, and widget text
  types.ts              shapes for the content (helps catch typos)
  App.tsx               desktop vs. mobile switch
  store/windowStore.ts  which windows are open + which is on top
  lib/                  small helpers (asset paths, mobile detection)
  components/
    Desktop.tsx         the full-screen desktop
    MenuBar.tsx         the top macOS menu bar + live clock
    FolderIcon.tsx      a clickable desktop folder
    Window.tsx          reusable Finder-style window chrome
    FolderWindow.tsx    grid of items shown inside a folder
    ItemTile.tsx        a single photo / note / link tile
    Dock.tsx            the bottom dock
    MobileView.tsx      simplified phone layout
    widgets/            camera, postcard, polaroids, iPod (decorative)
```

---

## Deployment

Pushing to `main` triggers the GitHub Actions workflow in
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), which builds
the site and publishes it to **GitHub Pages** at:

> https://maggieslen.github.io/maggie-portfolio/

(One-time setup: in the repo, go to **Settings → Pages → Build and
deployment → Source** and choose **GitHub Actions**.)
