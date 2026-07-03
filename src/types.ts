/* ------------------------------------------------------------------ *
 * Shared content types.
 *
 * These describe the shape of everything in `content.ts`. You normally
 * only need to edit `content.ts` — these types just help your editor
 * catch typos and keep the data consistent.
 * ------------------------------------------------------------------ */

/** Where a folder icon sits on the desktop (pixels from an edge). */
export interface DesktopPosition {
  top: number
  /** Anchor from the left edge (use this OR `right`). */
  left?: number
  /** Anchor from the right edge (use this OR `left`). */
  right?: number
}

/** A single thing shown inside an opened folder. */
export interface FolderItem {
  id: string
  title: string
  /** How to render this item. */
  kind: 'image' | 'note' | 'link'
  /** Public image path, e.g. "photos/beach.jpg" (file lives in /public). Optional. */
  image?: string
  /** Short caption / write-up. */
  description?: string
  /** External link (for kind: 'link', or an optional link on any item). */
  href?: string
}

/** A desktop folder (photos!, ugc content, about me!, personal projects). */
export interface Folder {
  id: string
  /** Text shown under the icon. */
  label: string
  position: DesktopPosition
  /** A tint used for placeholder tiles inside this folder. */
  accent: string
  items: FolderItem[]
}

/** A flagship project shown as an "app" in the dock. */
export interface AppProject {
  id: string
  name: string
  /** Emoji (or later, an image path) used as the dock icon. */
  icon: string
  tagline: string
  description: string
  liveUrl?: string
  codeUrl?: string
  image?: string
  /** Tint used for the app window header + placeholder art. */
  accent: string
}
