import { motion } from 'motion/react'
import type { Folder } from '../types'
import { useWindowStore } from '../store/windowStore'
import { FolderGlyph } from './FolderGlyph'

/** A single clickable folder sitting on the desktop. */
export function FolderIcon({ folder }: { folder: Folder }) {
  const openWindow = useWindowStore((s) => s.openWindow)
  const { top, left, right } = folder.position

  return (
    <motion.button
      type="button"
      className="absolute flex w-[96px] flex-col items-center gap-1 focus:outline-none"
      style={{ top, left, right }}
      onClick={() => openWindow('folder', folder.id)}
      whileHover={{ scale: 1.07, y: -2 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 500, damping: 28 }}
    >
      <FolderGlyph />
      <span className="max-w-[96px] rounded px-1 text-center text-[13px] leading-tight text-charcoal">
        {folder.label}
      </span>
    </motion.button>
  )
}
