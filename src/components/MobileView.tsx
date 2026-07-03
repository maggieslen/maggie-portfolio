import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { SITE_TITLE, folders } from '../content'
import type { Folder } from '../types'
import { FolderGlyph } from './FolderGlyph'
import { FolderWindow } from './FolderWindow'

/**
 * Phone / small-tablet layout. The draggable desktop doesn't translate
 * to small screens, so folders become a simple tappable list and open
 * as full-screen sheets.
 */
export function MobileView() {
  const [open, setOpen] = useState<Folder | null>(null)

  return (
    <div className="min-h-screen w-full overflow-y-auto bg-blush">
      <header className="sticky top-0 z-10 border-b border-black/5 bg-cream/90 px-4 py-3 backdrop-blur">
        <h1 className="text-base font-semibold text-charcoal">{SITE_TITLE}</h1>
      </header>

      <div className="px-4 py-5">
        <p className="mb-3 text-sm text-charcoal/60">Tap a folder to open it.</p>
        <ul className="space-y-3">
          {folders.map((f) => (
            <li key={f.id}>
              <button
                type="button"
                onClick={() => setOpen(f)}
                className="flex w-full items-center gap-3 rounded-2xl bg-white/70 p-3 text-left ring-1 ring-black/5 transition active:scale-[0.99]"
              >
                <FolderGlyph size={46} />
                <div>
                  <p className="text-[15px] font-medium text-charcoal">{f.label}</p>
                  <p className="text-xs text-charcoal/50">{f.items.length} items</p>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-20 flex flex-col bg-white"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 380, damping: 36 }}
          >
            <div className="flex items-center border-b border-black/5 bg-cream px-3 py-3">
              <button
                type="button"
                onClick={() => setOpen(null)}
                className="text-sm text-[#8a5b74]"
              >
                ‹ Back
              </button>
              <span className="mx-auto text-[15px] font-medium text-charcoal">
                {open.label}
              </span>
              <span className="w-10" aria-hidden="true" />
            </div>
            <div className="mac-scroll flex-1 overflow-y-auto">
              <FolderWindow refId={open.id} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
