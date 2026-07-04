# Client work content 🌸

Each project's page pulls from its own folder here — edit JSON + drop files
into `media/`, **no code changes needed.**

```
client-work/
  <project-slug>/
    index.json                  ← that project's page (text, links, sections)
    media/                      ← drop your images/videos here
```

These pages aren't in their own desktop folder — each one opens from where it
already lives: **the dock icon** for that organization (Dippin' Daisys,
Purdue Brand Studio, Northeast School of Dance, Purdue Pre-Pharmacy Club), or
an item inside the **"personal projects"** folder (Personal Project). See the
`projectSlug` field on dock apps / folder items in `src/content.ts` — that's
what points a dock icon or folder item at a project slug here.

## Adding media to a project

1. Drop your files into that project's `media/` folder
   (e.g. `dippin-daisies/media/mockup1.png`, `story1.mp4`).
2. In that project's `index.json`, list them under the right **section**.

## Section types (mix and match per project)

Each section has a `type` and a `title`.

- **`"gallery"`** — your own designs / mockups / photos / video. The main event.
  `items`: `{ "src": "media/mockup1.png", "caption": "optional" }`
  (a `.mp4`/`.mov` src renders as a video)

- **`"grid"`** — Instagram-profile-style grid of square thumbnails (for feed posts).
  `items`: `{ "src": "media/post1.jpg", "caption": "optional" }`

- **`"stories"`** — Stories/Reels shown as a **row of phone mockups**, one per
  group, each with a caption underneath (like flipping through a camera roll).
  `groups`: `{ "caption": "Just Add Water", "items": [{ "src": "media/jaw-1.jpg" }, ...] }`
  Each group's `items` scroll vertically inside that one phone.
  (a `.mp4`/`.mov` src plays inline in the phone)

- **`"embeds"`** — **real, live** Instagram posts/reels via Instagram's official
  embed (pulls the actual post).
  `items`: `{ "url": "https://www.instagram.com/p/XXXXXXXXX/" }`

## Links (site / deck)

`index.json` → `links`: shown as buttons (e.g. "View full site", "View deck").
These open in a new tab — they never take over your own content.

```json
"links": [
  { "label": "View full site", "url": "https://dippindaisys.com" }
]
```
