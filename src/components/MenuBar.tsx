import { useEffect, useState } from 'react'
import { SITE_TITLE } from '../content'

const MENUS = ['File', 'Edit', 'View', 'Window', 'Help']

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
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 15_000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="absolute inset-x-0 top-0 z-[9999] flex h-7 items-center justify-between border-b border-black/5 bg-cream/80 px-3 text-[13px] text-charcoal backdrop-blur-md select-none">
      {/* left: app title + menus */}
      <div className="flex items-center gap-4">
        <span className="font-semibold"> {SITE_TITLE}</span>
        {MENUS.map((m) => (
          <span
            key={m}
            className="hidden cursor-default rounded px-1 hover:bg-black/5 sm:inline"
          >
            {m}
          </span>
        ))}
      </div>

      {/* right: status icons + clock */}
      <div className="flex items-center gap-3">
        <BatteryIcon />
        <WifiIcon />
        <SearchIcon />
        <ControlCenterIcon />
        <span className="tabular-nums">{formatClock(now)}</span>
      </div>
    </div>
  )
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
