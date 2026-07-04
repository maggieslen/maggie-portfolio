import { asset } from './asset'

/* Types for the /public/client-work data files. */

export interface CwProjectEntry {
  slug: string
  name: string
  blurb: string
  accent?: string
  cover?: string
}

export interface CwManifest {
  projects: CwProjectEntry[]
}

export interface CwLink {
  label: string
  url: string
}

export interface CwItem {
  /** media path relative to the project folder, e.g. "media/mockup1.png" */
  src?: string
  /** poster image for a video story */
  poster?: string
  caption?: string
  /** for embeds: a public Instagram post/reel URL */
  url?: string
}

export type CwSectionType = 'gallery' | 'grid' | 'stories' | 'embeds'

export interface CwSection {
  type: CwSectionType
  title: string
  items: CwItem[]
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
