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
  /** for embeds: a public Instagram post/reel URL */
  url?: string
}

/** All slides for a grid post, whether it's a single image or a carousel. */
export function cwSlides(item: CwItem): string[] {
  return item.slides && item.slides.length > 0 ? item.slides : [item.src!]
}

export type CwSectionType = 'gallery' | 'grid' | 'stories' | 'embeds' | 'profile'

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
  /** Used by gallery / grid / embeds sections, and as the grid under a profile card. */
  items?: CwItem[]
  /** Used by "stories" sections — one phone mockup per group. */
  groups?: CwStoryGroup[]
  /** Used by "profile" sections. */
  profile?: CwProfile
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
