# Client work content 🌸

This folder powers the **"client work"** folder on the desktop. Each project has
its own folder here. To add your work, you edit JSON + drop files into `media/`
— **no code changes needed.**

```
client-work/
  manifest.json                 ← the list of projects shown in the grid
  <project-slug>/
    index.json                  ← that project's page (text, links, sections)
    media/                      ← drop your images/videos here
```

## Adding media to a project

1. Drop your files into that project's `media/` folder
   (e.g. `dippin-daisies/media/mockup1.png`, `story1.mp4`).
2. In that project's `index.json`, list them under the right **section**.

## Section types (mix and match per project)

Each section has a `type`, a `title`, and `items`:

- **`"gallery"`** — your own designs / mockups / photos / video. The main event.
  `items`: `{ "src": "media/mockup1.png", "caption": "optional" }`
  (a `.mp4`/`.mov` src renders as a video)

- **`"grid"`** — Instagram-profile-style grid of square thumbnails (for feed posts).
  `items`: `{ "src": "media/post1.jpg", "caption": "optional" }`

- **`"stories"`** — vertical Stories/Reels shown inside a **phone frame** you can
  scroll through.
  `items`: `{ "src": "media/story1.mp4", "poster": "media/story1-cover.jpg" }`
  (image stories: just `src`)

- **`"embeds"`** — **real, live** Instagram posts/reels via Instagram's official
  embed (pulls the actual post).
  `items`: `{ "url": "https://www.instagram.com/p/XXXXXXXXX/" }`

## Links (site / deck)

`index.json` → `links`: shown as buttons (e.g. "View full site", "View deck").
These open in a new tab — they never take over your own content.

```json
"links": [
  { "label": "View full site", "url": "https://dippindaisies.com" }
]
```
