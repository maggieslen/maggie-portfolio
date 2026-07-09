import { asset } from './asset'

/* Types for the /public/client-work data files. */

export interface CwLink {
  label: string
  url: string
}

export interface CwItem {
  /** media path relative to the project folder, e.g. "media/mockup1.png" */
  src?: string
  /**
   * For a multi-slide carousel post: every slide's path, in order. When set,
   * this takes priority over `src` — the grid cover is `slides[0]`, and the
   * lightbox lets you click/swipe through all of them before moving on to
   * the next post.
   */
  slides?: string[]
  /** poster image for a video story */
  poster?: string
  caption?: string
  /** for embeds, or a published post: its public Instagram URL. */
  url?: string
  /**
   * Set this instead of `url` when this design wasn't the one published —
   * it just inspired a later post (designed/posted by someone else). Shows
   * a "Inspired this Instagram post" link instead of "View on Instagram".
   */
  inspiredUrl?: string
}

/** All slides for a grid post, whether it's a single image or a carousel. */
export function cwSlides(item: CwItem): string[] {
  return item.slides && item.slides.length > 0 ? item.slides : [item.src!]
}

export type CwSectionType = 'gallery' | 'grid' | 'stories' | 'embeds' | 'profile' | 'cards' | 'creator'

/** A greeting card — front + inside, opened like the real thing. */
export interface CwCard {
  title: string
  front: string
  inside: string
}

/** One phone mockup's worth of Stories/Reels frames, with a caption below it. */
export interface CwStoryGroup {
  caption?: string
  items: CwItem[]
  /** If set (a published post), shows a small "View on Instagram" link below the caption. */
  url?: string
}

/** A highlight bubble on an Instagram-style profile card. */
export interface CwHighlight {
  label: string
  /** Optional image (relative to the project folder); shows a plain circle without one. */
  image?: string
}

/** A headshot + contact-info block ("creator" section type) — like a mini media-kit intro. */
export interface CwCreator {
  /** Photo, relative to the project folder, e.g. "media/headshot.jpg" */
  photo: string
  name: string
  tagline?: string
  /** Contact buttons, e.g. {label:"Email Me", url:"mailto:..."} */
  links?: CwLink[]
}

/** Data for an Instagram-desktop-style profile card ("profile" section type). */
export interface CwProfile {
  /** Public path from the site root, e.g. "app-icons/dippin-daisys.png" (NOT project-relative). */
  avatar?: string
  username: string
  displayName?: string
  stats: { posts: string; followers: string; following: string }
  bio?: string[]
  link?: string
  highlights?: CwHighlight[]
  /** The real Instagram profile URL — makes the username open it in a new tab. */
  instagramUrl?: string
}

export interface CwSection {
  type: CwSectionType
  title: string
  /** When set to "side", this section sits beside the previous one (a narrow sidebar) instead of stacking below it full-width. */
  layout?: 'side'
  /** Used by gallery / grid / embeds sections, and as the grid under a profile card. */
  items?: CwItem[]
  /** Used by "stories" sections — one phone mockup per group. */
  groups?: CwStoryGroup[]
  /** Used by "profile" sections. */
  profile?: CwProfile
  /** Used by "cards" sections. */
  cards?: CwCard[]
  /** Used by "creator" sections. */
  creator?: CwCreator
}

export interface CwProject {
  name: string
  tagline: string
  description: string
  links: CwLink[]
  sections: CwSection[]
}

/** URL for a media file inside a project folder. */
export function cwMedia(slug: string, src: string): string {
  return asset(`client-work/${slug}/${src}`)
}

/** Is this media path a video? */
export function isVideo(src?: string): boolean {
  return !!src && /\.(mp4|mov|webm|m4v)$/i.test(src)
}

/** Turn a normal Instagram post/reel URL into its official embed URL. */
export function igEmbedUrl(url: string): string {
  const clean = url.split('?')[0].replace(/\/+$/, '')
  return `${clean}/embed`
}
