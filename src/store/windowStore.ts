import { create } from 'zustand'

/* ------------------------------------------------------------------ *
 * Window manager.
 *
 * A tiny global store that tracks which "windows" (opened folders and
 * apps) are on screen, and which one is on top (focused). This is the
 * brain behind the desktop metaphor: click a folder/app -> open a
 * window; click a window -> bring it to front; click its red dot ->
 * close it.
 * ------------------------------------------------------------------ */

export type WindowKind = 'folder' | 'app'

export interface OpenWindow {
  /** Unique id for this specific open window. */
  id: string
  kind: WindowKind
  /** The folder id or app id this window is showing. */
  refId: string
  /** Stacking order — higher is closer to the front. */
  zIndex: number
}

interface WindowState {
  windows: OpenWindow[]
  topZ: number
  openWindow: (kind: WindowKind, refId: string) => void
  closeWindow: (id: string) => void
  focusWindow: (id: string) => void
}

const BASE_Z = 10

export const useWindowStore = create<WindowState>((set, get) => ({
  windows: [],
  topZ: BASE_Z,

  openWindow: (kind, refId) => {
    // If this folder/app is already open, just bring it to the front.
    const existing = get().windows.find(
      (w) => w.kind === kind && w.refId === refId,
    )
    if (existing) {
      get().focusWindow(existing.id)
      return
    }
    const zIndex = get().topZ + 1
    set((s) => ({
      topZ: zIndex,
      windows: [
        ...s.windows,
        { id: `${kind}-${refId}-${Date.now()}`, kind, refId, zIndex },
      ],
    }))
  },

  closeWindow: (id) =>
    set((s) => ({ windows: s.windows.filter((w) => w.id !== id) })),

  focusWindow: (id) =>
    set((s) => {
      // Already on top? Nothing to do.
      if (s.windows.find((w) => w.id === id)?.zIndex === s.topZ) return s
      const zIndex = s.topZ + 1
      return {
        topZ: zIndex,
        windows: s.windows.map((w) => (w.id === id ? { ...w, zIndex } : w)),
      }
    }),
}))
