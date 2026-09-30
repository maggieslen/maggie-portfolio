import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { SITE_TITLE, apps, folders, mobile, widgets } from '../content'
import type { AppProject, Folder } from '../types'
import { asset } from '../lib/asset'
import { FolderWindow } from './FolderWindow'
import { AppWindow } from './AppWindow'
import { MusicWindow } from './MusicWindow'
import { ProjectWindow } from './ProjectWindow'

type OpenItem = { kind: 'folder' | 'app' | 'music' | 'project'; id: string; label: string }

let greeted = false

/**
 * Phone / small-tablet layout, styled as an iPhone home screen (edit `mobile` in
 * content.ts): a big photo widget, a grid of app icons, a music
 * widget, and a dock. Everything opens as a full-screen sheet.
 */
export function MobileView() {
  // Start with "about me!" open so it greets people on first load.
  const [open, setOpen] = useState<OpenItem | null>(() => {
    if (greeted) return null
    greeted = true
    const about = folders.find((f) => f.id === 'about')
    return about ? { kind: 'folder', id: about.id, label: about.label } : null
  })

  const openApp = (a: AppProject) =>
    a.projectSlug
      ? setOpen({ kind: 'project', id: a.projectSlug, label: a.name })
      : setOpen({ kind: 'app', id: a.id, label: a.name })

  const openFolder = (f: Folder) => {
    // A folder holding just one project skips straight to it.
    const onlyItem = f.items.length === 1 ? f.items[0] : null
    if (onlyItem?.kind === 'project' && onlyItem.projectSlug)
      setOpen({ kind: 'project', id: onlyItem.projectSlug, label: onlyItem.title })
    else setOpen({ kind: 'folder', id: f.id, label: f.label })
  }

  const appById = (id: string) => apps.find((a) => a.id === id)
  const folderById = (id: string) => folders.find((f) => f.id === id)
  const topRow = mobile.topRow.map(appById).filter(Boolean) as AppProject[]
  const sideApps = mobile.sideApps.map(appById).filter(Boolean) as AppProject[]
  const photos = folderById('photos')
  const about = folderById('about')

  return (
    <div className="mac-scroll h-dvh w-full overflow-y-auto bg-blush">
      {/* Width is capped by screen height too, so the whole home screen fits
          without scrolling (everything scales with width). */}
      <div className="mx-auto flex min-h-dvh w-full max-w-[min(440px,calc((100dvh-245px)/1.15))] flex-col px-4 pb-3">
        <StatusBar />

        {/* hero photo widget */}
        <Pop i={0}>
          <button
            type="button"
            onClick={() => about && openFolder(about)}
            aria-label="About me"
            className="@container relative mt-2 block aspect-[1000/520] w-full overflow-hidden rounded-[26px] shadow-[0_6px_20px_rgba(0,0,0,0.12)] active:scale-[0.99]"
          >
            <img
              src={asset(mobile.hero)}
              alt=""
              draggable={false}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <span className="absolute inset-x-0 bottom-[7%] text-center font-script whitespace-nowrap text-[clamp(16px,6cqw,26px)] leading-none text-black drop-shadow-[0_1px_6px_rgba(255,255,255,0.55)]">
              {SITE_TITLE.replace(/!$/, '')}
            </span>
          </button>
        </Pop>

        {/* the home-screen grid: 4 columns, like iOS */}
        <div className="mt-3 grid grid-cols-4 gap-x-3 gap-y-2.5">
          {topRow.map((a, i) => (
            <Pop key={a.id} i={i + 1}>
              <AppIcon label={a.name} onClick={() => openApp(a)}>
                <img src={asset(a.icon)} alt="" draggable={false} className="h-full w-full object-cover" />
              </AppIcon>
            </Pop>
          ))}

          {/* music widget (2×2) */}
          <Pop i={5} className="col-span-2 row-span-2">
            <MusicWidget onClick={() => setOpen({ kind: 'music', id: 'player', label: 'Music' })} />
          </Pop>

          {sideApps.map((a, i) => (
            <Pop key={a.id} i={i + 6}>
              <AppIcon label={a.name} onClick={() => openApp(a)}>
                <img src={asset(a.icon)} alt="" draggable={false} className="h-full w-full object-cover" />
              </AppIcon>
            </Pop>
          ))}

          {photos && (
            <Pop i={8}>
              <AppIcon label="Photos" onClick={() => openFolder(photos)}>
                <PhotosGlyph />
              </AppIcon>
            </Pop>
          )}
        </div>

        {/* dock */}
        <div className="mt-auto pt-3">
          <div className="flex justify-center gap-[9%] rounded-[28px] bg-dock/60 px-4 py-2.5 backdrop-blur-md">
            {about && (
              <DockIcon label="About me" onClick={() => openFolder(about)}>
                <Doodle src={mobile.aboutIcon} />
              </DockIcon>
            )}
            <DockIcon
              label="Personal Social Media"
              onClick={() => setOpen({ kind: 'project', id: 'personal-project', label: 'Personal Social Media' })}
            >
              <Doodle src={mobile.socialIcon} />
            </DockIcon>
            <DockIcon
              label="Digital Artwork"
              onClick={() => setOpen({ kind: 'project', id: 'digital-artwork', label: 'Digital Artwork' })}
            >
              <Doodle src={mobile.artworkIcon} />
            </DockIcon>
          </div>
        </div>
      </div>

      {/* full-screen sheet for whatever's open */}
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
              <button type="button" onClick={() => setOpen(null)} className="text-sm text-[#a85d72]">
                ‹ Home
              </button>
              <span className="mx-auto truncate px-2 text-[15px] font-medium text-charcoal">
                {open.label}
              </span>
              <span className="w-12" aria-hidden="true" />
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

/** Staggered "springboard" pop-in, like icons settling after unlock. */
function Pop({ i, className = '', children }: { i: number; className?: string; children: ReactNode }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 320, damping: 22, delay: 0.04 * i }}
    >
      {children}
    </motion.div>
  )
}

function AppIcon({ label, onClick, children }: { label: string; onClick: () => void; children: ReactNode }) {
  return (
    <button type="button" onClick={onClick} className="flex w-full flex-col items-center gap-1 active:scale-95 transition">
      <span className="block aspect-square w-full overflow-hidden rounded-[23%] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.1)] ring-1 ring-black/5">
        {children}
      </span>
      <span className="text-center text-[9px] leading-tight text-charcoal">{label}</span>
    </button>
  )
}

function DockIcon({ label, onClick, children }: { label: string; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="block aspect-square w-[21%] overflow-hidden rounded-[23%] shadow-[0_2px_8px_rgba(0,0,0,0.12)] ring-1 ring-black/5 transition active:scale-95"
    >
      {children}
    </button>
  )
}

/** The 2×2 music widget — a plain grey tile with a now-playing bar; taps through to the playlist. */
function MusicWidget({ onClick }: { onClick: () => void }) {
  const { track, artist } = widgets.ipod
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Open music player"
      className="flex h-full min-h-[150px] w-full flex-col justify-end overflow-hidden rounded-[26px] bg-[#bab1b3] p-4 text-left text-white shadow-[0_6px_20px_rgba(0,0,0,0.08)] transition active:scale-[0.98]"
    >
      <span className="block truncate text-[13px] font-semibold">{track}</span>
      <span className="block truncate text-[11px] text-white/75">{artist}</span>

      {/* progress bar */}
      <span className="mt-3 block h-1 w-full overflow-hidden rounded-full bg-white/35">
        <span className="block h-full w-[38%] rounded-full bg-white" />
      </span>
      <span className="mt-1 flex justify-between text-[9px] tabular-nums text-white/70">
        <span>1:12</span>
        <span>-1:58</span>
      </span>

      {/* controls */}
      <span className="mt-1.5 flex items-center justify-center gap-6" aria-hidden="true">
        <svg width="20" height="14" viewBox="0 0 20 14" fill="currentColor">
          <path d="M10 1v12L2 7zM18 1v12l-8-6z" />
        </svg>
        <svg width="16" height="18" viewBox="0 0 16 18" fill="currentColor">
          <path d="M2 1l13 8-13 8z" />
        </svg>
        <svg width="20" height="14" viewBox="0 0 20 14" fill="currentColor">
          <path d="M2 1v12l8-6zM10 1v12l8-6z" />
        </svg>
      </span>
    </button>
  )
}

/** A hand-drawn icon (transparent PNG) centered on a cream app tile. */
function Doodle({ src }: { src: string }) {
  return (
    <span className="flex h-full w-full items-center justify-center bg-[#f9f1ea] p-[12%]">
      <img src={asset(src)} alt="" draggable={false} className="max-h-full max-w-full object-contain" />
    </span>
  )
}

/** A soft pinwheel of overlapping petals for the Photos icon. */
function PhotosGlyph() {
  const colors = ['#f7a531', '#f5d33b', '#a6d14e', '#5dc47b', '#4ab0e0', '#8a7be0', '#c86fd1', '#f0566d']
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full bg-white" aria-hidden="true">
      {colors.map((c, i) => (
        <ellipse
          key={c}
          cx="50"
          cy="30"
          rx="11"
          ry="19"
          fill={c}
          opacity="0.82"
          style={{ mixBlendMode: 'multiply' }}
          transform={`rotate(${i * 45} 50 50) translate(-6 0)`}
        />
      ))}
    </svg>
  )
}

/** Fake iPhone status bar with a live clock. */
function StatusBar() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 15_000)
    return () => clearInterval(id)
  }, [])
  const time = `${now.getHours() % 12 || 12}:${now.getMinutes().toString().padStart(2, '0')}`

  return (
    <div className="flex h-[26px] items-center justify-between pt-2 text-charcoal/55" aria-hidden="true">
      <span className="w-20 pl-2 text-[15px] font-semibold tabular-nums">{time}</span>
      <span className="flex w-20 items-center justify-end gap-1.5 pr-1">
        <svg width="17" height="12" viewBox="0 0 17 12" fill="currentColor">
          <rect x="0" y="8" width="3" height="4" rx="1" />
          <rect x="4.5" y="5.5" width="3" height="6.5" rx="1" />
          <rect x="9" y="3" width="3" height="9" rx="1" />
          <rect x="13.5" y="0" width="3" height="12" rx="1" />
        </svg>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          <path d="M1.5 4.2a9.5 9.5 0 0 1 13 0M4 6.8a5.8 5.8 0 0 1 8 0" />
          <circle cx="8" cy="9.8" r="1.2" fill="currentColor" stroke="none" />
        </svg>
        <svg width="26" height="12" viewBox="0 0 26 12" fill="none">
          <rect x="0.75" y="0.75" width="21.5" height="10.5" rx="3" stroke="currentColor" strokeWidth="1.5" />
          <rect x="2.5" y="2.5" width="6" height="7" rx="1.5" fill="currentColor" />
          <rect x="23.5" y="4" width="2" height="4" rx="1" fill="currentColor" />
        </svg>
      </span>
    </div>
  )
}
