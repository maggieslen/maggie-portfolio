import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { SITE_TITLE, apps, folders } from '../content'
import { asset } from '../lib/asset'
import { FolderGlyph } from './FolderGlyph'
import { FolderWindow } from './FolderWindow'
import { AppWindow } from './AppWindow'
import { MusicWindow } from './MusicWindow'
import { ProjectWindow } from './ProjectWindow'

type OpenItem = { kind: 'folder' | 'app' | 'music' | 'project'; id: string; label: string }

const sectionLabel =
  'mb-2 text-[11px] font-semibold uppercase tracking-wide text-charcoal/40'
const card =
  'flex w-full items-center gap-3 rounded-2xl bg-white/70 p-3 text-left ring-1 ring-black/5 transition active:scale-[0.99]'

/**
 * Phone / small-tablet layout. The draggable desktop doesn't translate to
 * small screens, so folders, apps, and the music player become tappable rows
 * that open as full-screen sheets.
 */
export function MobileView() {
  const [open, setOpen] = useState<OpenItem | null>(null)

  return (
    <div className="min-h-screen w-full overflow-y-auto bg-blush">
      <header className="sticky top-0 z-10 border-b border-black/5 bg-cream/90 px-4 py-3 backdrop-blur">
        <h1 className="font-heading text-xl text-charcoal">{SITE_TITLE}</h1>
      </header>

      <div className="px-4 py-5">
        {/* folders */}
        <p className={sectionLabel}>Folders</p>
        <ul className="space-y-2.5">
          {folders.map((f) => (
            <li key={f.id}>
              <button
                type="button"
                onClick={() => setOpen({ kind: 'folder', id: f.id, label: f.label })}
                className={card}
              >
                <FolderGlyph size={44} />
                <div>
                  <p className="text-[15px] font-medium text-charcoal">{f.label}</p>
                  <p className="text-xs text-charcoal/50">{f.items.length} items</p>
                </div>
              </button>
            </li>
          ))}
        </ul>

        {/* apps */}
        <p className={`${sectionLabel} mt-6`}>Featured</p>
        <ul className="grid grid-cols-2 gap-2.5">
          {apps.map((a) => (
            <li key={a.id}>
              <button
                type="button"
                onClick={() =>
                  a.projectSlug
                    ? setOpen({ kind: 'project', id: a.projectSlug, label: a.name })
                    : setOpen({ kind: 'app', id: a.id, label: a.name })
                }
                className="flex w-full items-center gap-2.5 rounded-2xl bg-white/70 p-2.5 text-left ring-1 ring-black/5 transition active:scale-[0.99]"
              >
                <img
                  src={asset(a.icon)}
                  alt=""
                  className="h-10 w-10 shrink-0 rounded-[24%] bg-white object-cover ring-1 ring-black/10"
                />
                <p className="truncate text-[13px] font-medium text-charcoal">{a.name}</p>
              </button>
            </li>
          ))}
        </ul>

        {/* music */}
        <p className={`${sectionLabel} mt-6`}>Now playing</p>
        <button
          type="button"
          onClick={() => setOpen({ kind: 'music', id: 'player', label: 'Music' })}
          className={card}
        >
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-[24%] bg-[linear-gradient(135deg,#e7c4cb,#c8d8e6_55%,#cbb58a)] text-lg ring-1 ring-black/10">
            🎧
          </div>
          <div>
            <p className="text-[15px] font-medium text-charcoal">borrow my headphones 🎧</p>
            <p className="text-xs text-charcoal/50">my playlist</p>
          </div>
        </button>
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
                className="text-sm text-[#a85d72]"
              >
                ‹ Back
              </button>
              <span className="mx-auto truncate px-2 text-[15px] font-medium text-charcoal">
                {open.label}
              </span>
              <span className="w-10" aria-hidden="true" />
            </div>
            <div className="mac-scroll flex-1 overflow-y-auto">
              {open.kind === 'folder' ? (
                <FolderWindow refId={open.id} />
              ) : open.kind === 'app' ? (
                <AppWindow refId={open.id} />
              ) : open.kind === 'project' ? (
                <ProjectWindow refId={open.id} />
              ) : (
                <MusicWindow />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
