import { motion, useDragControls } from 'motion/react'
import { useRef } from 'react'
import type { PointerEvent, ReactNode } from 'react'
import type { OpenWindow } from '../store/windowStore'
import { useWindowStore } from '../store/windowStore'
import { apps, folders } from '../content'

function titleFor(win: OpenWindow): string {
  if (win.title) return win.title
  if (win.kind === 'folder')
    return folders.find((f) => f.id === win.refId)?.label ?? 'Folder'
  if (win.kind === 'music') return 'Music'
  if (win.kind === 'project') return 'Project'
  return apps.find((a) => a.id === win.refId)?.name ?? 'App'
}

interface WindowProps {
  win: OpenWindow
  /** Position of this window in the open list — used to cascade stacks. */
  index: number
  /** Bigger windows for "apps", cozier ones for folders. */
  size?: { width: number; height: number }
  /** Apps + the music player fill the screen; folders stay small + draggable. */
  fullscreen?: boolean
  children: ReactNode
}

export function Window({ win, index, size, fullscreen, children }: WindowProps) {
  const closeWindow = useWindowStore((s) => s.closeWindow)
  const focusWindow = useWindowStore((s) => s.focusWindow)
  const dragControls = useDragControls()
  const constraintsRef = useRef<HTMLDivElement>(null)

  // Shared title bar. `onDrag` is only wired for draggable (windowed) mode.
  const titleBar = (onPointerDown?: (e: PointerEvent) => void) => (
    <div
      onPointerDown={onPointerDown}
      className={`flex items-center gap-2 border-b border-black/5 bg-cream px-3 py-2 select-none ${
        onPointerDown ? 'cursor-grab active:cursor-grabbing' : ''
      }`}
    >
      {/* stop the traffic lights from starting a drag */}
      <span onPointerDown={(e) => e.stopPropagation()}>
        <TrafficLights onClose={() => closeWindow(win.id)} />
      </span>
      <span className="mx-auto truncate text-[13px] font-medium text-charcoal/80">
        {titleFor(win)}
      </span>
      <span className="w-[52px] shrink-0" aria-hidden="true" />
    </div>
  )

  const content = (
    <div className="mac-scroll flex-1 overflow-auto bg-white">{children}</div>
  )

  // ---- Fullscreen (apps + music) ----
  if (fullscreen) {
    return (
      <div
        className="pointer-events-none absolute inset-0"
        style={{ zIndex: win.zIndex }}
      >
        <motion.div
          className="mac-window pointer-events-auto absolute inset-x-0 bottom-0 top-7 flex flex-col overflow-hidden bg-white shadow-2xl"
          initial={{ opacity: 0, scale: 0.98, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.985, y: 12 }}
          transition={{ type: 'spring', stiffness: 320, damping: 32 }}
          onMouseDown={() => focusWindow(win.id)}
        >
          {titleBar()}
          {content}
        </motion.div>
      </div>
    )
  }

  // ---- Windowed + draggable (folders) ----
  const width = size?.width ?? 620
  const height = size?.height ?? 460
  const offset = index * 26 // gentle diagonal cascade for stacked windows

  function startDrag(e: PointerEvent) {
    focusWindow(win.id)
    dragControls.start(e)
  }

  return (
    <div
      ref={constraintsRef}
      className="pointer-events-none absolute inset-0 flex items-center justify-center px-4 pb-28 pt-10"
      style={{ zIndex: win.zIndex }}
    >
      <motion.div
        className="mac-window pointer-events-auto flex max-h-full max-w-full flex-col overflow-hidden rounded-xl border border-black/10 bg-white shadow-2xl"
        style={{ width, height, marginLeft: offset, marginTop: offset }}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 460, damping: 34 }}
        drag
        dragListener={false}
        dragControls={dragControls}
        dragConstraints={constraintsRef}
        dragElastic={0.06}
        dragMomentum={false}
        onMouseDown={() => focusWindow(win.id)}
      >
        {titleBar(startDrag)}
        {content}
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
