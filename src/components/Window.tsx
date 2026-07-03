import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import type { OpenWindow } from '../store/windowStore'
import { useWindowStore } from '../store/windowStore'
import { apps, folders } from '../content'

function titleFor(win: OpenWindow): string {
  if (win.kind === 'folder')
    return folders.find((f) => f.id === win.refId)?.label ?? 'Folder'
  return apps.find((a) => a.id === win.refId)?.name ?? 'App'
}

interface WindowProps {
  win: OpenWindow
  /** Position of this window in the open list — used to cascade stacks. */
  index: number
  /** Bigger windows for "apps", cozier ones for folders. */
  size?: { width: number; height: number }
  children: ReactNode
}

export function Window({ win, index, size, children }: WindowProps) {
  const closeWindow = useWindowStore((s) => s.closeWindow)
  const focusWindow = useWindowStore((s) => s.focusWindow)

  const width = size?.width ?? 620
  const height = size?.height ?? 460
  const offset = index * 26 // gentle diagonal cascade for stacked windows

  return (
    // Full-screen, click-through layer per window; the card inside catches clicks.
    <div
      className="pointer-events-none absolute inset-0 flex items-center justify-center px-4 pb-28 pt-10"
      style={{ zIndex: win.zIndex }}
    >
      <motion.div
        className="mac-window pointer-events-auto flex max-h-full max-w-full flex-col overflow-hidden rounded-xl border border-black/10 bg-white shadow-2xl"
        style={{
          width,
          height,
          marginLeft: offset,
          marginTop: offset,
          transformOrigin: 'center center',
        }}
        initial={{ scale: 0.88, opacity: 0, y: 8 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 6 }}
        transition={{ type: 'spring', stiffness: 420, damping: 32 }}
        onMouseDown={() => focusWindow(win.id)}
      >
        {/* title bar */}
        <div className="flex items-center gap-2 border-b border-black/5 bg-cream px-3 py-2 select-none">
          <TrafficLights onClose={() => closeWindow(win.id)} />
          <span className="mx-auto truncate text-[13px] font-medium text-charcoal/80">
            {titleFor(win)}
          </span>
          {/* spacer to balance the traffic lights so the title stays centered */}
          <span className="w-[52px] shrink-0" aria-hidden="true" />
        </div>

        {/* content */}
        <div className="mac-scroll flex-1 overflow-auto bg-white">{children}</div>
      </motion.div>
    </div>
  )
}

function TrafficLights({ onClose }: { onClose: () => void }) {
  return (
    <div className="group flex items-center gap-2">
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="flex h-3 w-3 items-center justify-center rounded-full bg-[#ff5f57] ring-1 ring-black/10"
      >
        <span className="text-[8px] leading-none text-black/50 opacity-0 group-hover:opacity-100">
          ✕
        </span>
      </button>
      <span className="h-3 w-3 rounded-full bg-[#febc2e] ring-1 ring-black/10" />
      <span className="h-3 w-3 rounded-full bg-[#28c840] ring-1 ring-black/10" />
    </div>
  )
}
