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

- **`"grid"`** — Instagram-feed-style grid of 3:4 thumbnails (for feed posts).
  `items`: `{ "src": "media/post1.jpg", "caption": "optional" }` for a
  single-image post, or `{ "slides": ["media/post1-1.jpg", "media/post1-2.jpg", ...], "caption": "optional" }`
  for a multi-slide carousel post (the grid tile shows `slides[0]` as the
  cover, with a "1/4" badge). Clicking any tile opens a full-screen lightbox —
  the arrows (or ← / → / Esc) first page through that post's own slides, then
  continue on to the next post, one continuous swipe through everything, no
  new tab. If a post has already gone live, add
  `"url": "https://www.instagram.com/p/XXXXXXXXX/"` and the lightbox shows a
  "View on Instagram" link for it; leave `url` off for unpublished work.

- **`"stories"`** — Stories/Reels shown as a **row of phone mockups**, one per
  group, each with a caption underneath (like flipping through a camera roll).
  `groups`: `{ "caption": "Just Add Water", "items": [{ "src": "media/jaw-1.jpg" }, ...] }`
  Each group's `items` scroll vertically inside that one phone.
  (a `.mp4`/`.mov` src plays inline in the phone, muted by default with a
  tap-to-unmute speaker icon). Add `"url"` to a group (a real reel/post link)
  to show a small "View on Instagram" link below its caption — omit it for
  reels/posts that haven't gone live yet.

- **`"embeds"`** — **real, live** Instagram posts/reels via Instagram's official
  embed (pulls the actual post).
  `items`: `{ "url": "https://www.instagram.com/p/XXXXXXXXX/" }`

- **`"profile"`** — a coded Instagram-desktop-style profile card (avatar, stats,
  bio, highlights, post grid) styled in the site's own brand colors — not a
  screenshot. `profile`: `{ "avatar": "app-icons/xyz.png", "username": "...",
  "displayName": "...", "stats": { "posts": "4,860", "followers": "387K",
  "following": "942" }, "bio": ["line one", "line two"], "link": "site.com",
  "highlights": [{ "label": "..." }] }`. Note: `avatar` is a path from the
  **site root** (e.g. an existing dock icon in `app-icons/`), not
  project-relative like other media. The post grid below the card uses this
  section's own `items` (same shape as `"grid"`).

## Links (site / deck)

`index.json` → `links`: shown as buttons (e.g. "View full site", "View deck").
These open in a new tab — they never take over your own content.

```json
"links": [
  { "label": "View full site", "url": "https://dippindaisys.com" }
]
```
