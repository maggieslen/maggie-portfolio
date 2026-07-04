import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { SITE_TITLE } from '../content'
import { useWindowStore } from '../store/windowStore'

const REPO = 'https://github.com/maggieslen/maggie-portfolio'

function formatClock(d: Date): string {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ]
  const ampm = d.getHours() >= 12 ? 'PM' : 'AM'
  const h = d.getHours() % 12 || 12
  const m = d.getMinutes().toString().padStart(2, '0')
  return `${days[d.getDay()]} ${months[d.getMonth()]} ${d.getDate()}  ${h}:${m} ${ampm}`
}

export function MenuBar() {
  const [now, setNow] = useState(() => new Date())
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const openWindow = useWindowStore((s) => s.openWindow)

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 15_000)
    return () => clearInterval(id)
  }, [])

  // Click outside to close any open menu.
  useEffect(() => {
    if (!openMenu) return
    const onDown = (e: MouseEvent) => {
      if (barRef.current && !barRef.current.contains(e.target as Node))
        setOpenMenu(null)
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [openMenu])

  const toggle = (k: string) => setOpenMenu((cur) => (cur === k ? null : k))
  const hover = (k: string) => setOpenMenu((cur) => (cur ? k : cur))
  const close = () => setOpenMenu(null)

  return (
    <div
      ref={barRef}
      className="absolute inset-x-0 top-0 z-[9999] flex h-7 items-center justify-between border-b border-black/5 bg-cream/80 px-2 text-[13px] text-charcoal backdrop-blur-md select-none"
    >
      {/* left: app title + menus */}
      <div className="flex items-center gap-0.5">
        <Menu label={SITE_TITLE} bold menuKey="title" openMenu={openMenu} onToggle={toggle} onHover={hover}>
          <DropItem onClick={() => { openWindow('folder', 'about'); close() }}>About this portfolio</DropItem>
          <DropItem href={REPO}>View the code ↗</DropItem>
          <Divider />
          <DropNote>Made with 🩷 in a browser</DropNote>
        </Menu>

        <Menu label="File" menuKey="file" openMenu={openMenu} onToggle={toggle} onHover={hover}>
          <DropItem onClick={close}>New Idea 💡</DropItem>
          <DropItem onClick={() => { openWindow('folder', 'photos'); close() }}>Open Photos…</DropItem>
          <Divider />
          <DropNote>nothing to save here 🙂</DropNote>
        </Menu>

        <Menu label="Edit" menuKey="edit" openMenu={openMenu} onToggle={toggle} onHover={hover}>
          <DropItem onClick={close}>Undo life choices ↩︎</DropItem>
          <DropItem onClick={close}>Copy good vibes</DropItem>
          <DropItem onClick={close}>Paste good vibes</DropItem>
        </Menu>

        <Menu label="View" menuKey="view" openMenu={openMenu} onToggle={toggle} onHover={hover}>
          <DropItem onClick={close}>Enter Full Vibes</DropItem>
          <DropItem onClick={close}>Show Dock ✓</DropItem>
          <Divider />
          <DropNote>current mood: dreamy ☁️</DropNote>
        </Menu>

        <Menu label="Window" menuKey="window" openMenu={openMenu} onToggle={toggle} onHover={hover}>
          <DropItem onClick={close}>Minimize worries</DropItem>
          <DropItem onClick={close}>Bring All to Front</DropItem>
          <Divider />
          <DropNote>psst — drag a window around ✨</DropNote>
        </Menu>

        <Menu label="Help" menuKey="help" openMenu={openMenu} onToggle={toggle} onHover={hover}>
          <DropNote>you are all kinds of wonderful ✨</DropNote>
          <DropItem href="mailto:maggie.slen42@gmail.com">Say hi 👋</DropItem>
          <Divider />
          <DropNote>psst — tap the iPod 🎧</DropNote>
        </Menu>
      </div>

      {/* right: status icons + clock */}
      <div className="flex items-center gap-3 pr-1">
        <BatteryIcon />
        <WifiIcon />
        <SearchIcon />
        <ControlCenterIcon />
        <span className="tabular-nums">{formatClock(now)}</span>
      </div>
    </div>
  )
}

interface MenuProps {
  label: string
  menuKey: string
  bold?: boolean
  openMenu: string | null
  onToggle: (k: string) => void
  onHover: (k: string) => void
  children: ReactNode
}

function Menu({ label, menuKey, bold, openMenu, onToggle, onHover, children }: MenuProps) {
  const isOpen = openMenu === menuKey
  return (
    <div className="relative hidden sm:block">
      <button
        type="button"
        onClick={() => onToggle(menuKey)}
        onMouseEnter={() => onHover(menuKey)}
        className={`rounded px-2 py-0.5 ${bold ? 'font-semibold' : ''} ${
          isOpen ? 'bg-black/10' : 'hover:bg-black/5'
        }`}
      >
        {label}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.12 }}
            className="absolute left-0 top-full mt-1 min-w-[210px] origin-top-left rounded-lg border border-black/10 bg-warm-ivory/95 p-1 text-[13px] text-charcoal shadow-xl backdrop-blur-md"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function DropItem({ children, onClick, href }: { children: ReactNode; onClick?: () => void; href?: string }) {
  const cls =
    'block w-full rounded-md px-3 py-1.5 text-left hover:bg-garden-bloom hover:text-white'
  if (href)
    return (
      <a href={href} target="_blank" rel="noreferrer" className={cls}>
        {children}
      </a>
    )
  return (
    <button type="button" onClick={onClick} className={cls}>
      {children}
    </button>
  )
}

function DropNote({ children }: { children: ReactNode }) {
  return <div className="px-3 py-1.5 text-[12px] text-charcoal/45">{children}</div>
}

function Divider() {
  return <div className="my-1 h-px bg-black/10" />
}

function BatteryIcon() {
  return (
    <svg width="25" height="12" viewBox="0 0 25 12" fill="none" className="text-charcoal">
      <rect x="1" y="1" width="20" height="10" rx="2.5" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <rect x="2.5" y="2.5" width="14" height="7" rx="1" fill="currentColor" />
      <rect x="22" y="4" width="1.6" height="4" rx="0.8" fill="currentColor" opacity="0.5" />
    </svg>
  )
}

function WifiIcon() {
  return (
    <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor" className="text-charcoal">
      <path d="M8 2C5 2 2.4 3.2.6 5.1l1.1 1.1C3.2 4.6 5.4 3.6 8 3.6s4.8 1 6.3 2.6l1.1-1.1C13.6 3.2 11 2 8 2z" opacity="0.85" />
      <path d="M8 5.4c-1.9 0-3.6.7-4.9 2l1.2 1.2C5.2 7.7 6.5 7.1 8 7.1s2.8.6 3.7 1.5l1.2-1.2C11.6 6.1 9.9 5.4 8 5.4z" />
      <circle cx="8" cy="10" r="1.4" />
    </svg>
  )
}

function SearchIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-charcoal">
      <circle cx="6" cy="6" r="4.2" stroke="currentColor" strokeWidth="1.4" />
      <line x1="9.2" y1="9.2" x2="12.5" y2="12.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

function ControlCenterIcon() {
  return (
    <svg width="16" height="14" viewBox="0 0 16 14" fill="none" className="text-charcoal">
      <rect x="1" y="1.5" width="14" height="4.4" rx="2.2" stroke="currentColor" strokeWidth="1.2" />
      <rect x="1" y="8.1" width="14" height="4.4" rx="2.2" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="11" cy="3.7" r="1.35" fill="currentColor" />
      <circle cx="5" cy="10.3" r="1.35" fill="currentColor" />
    </svg>
  )
}
