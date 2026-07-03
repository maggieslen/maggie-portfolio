import { motion } from 'motion/react'
import { widgets } from '../../content'
import { asset } from '../../lib/asset'
import { useWindowStore } from '../../store/windowStore'

/**
 * The iPod-nano widget. Clicking it opens the Music player (Apple-Music-style
 * window that embeds the real Spotify playlist).
 */
export function IpodWidget() {
  const { image, track, artist } = widgets.ipod
  const openWindow = useWindowStore((s) => s.openWindow)

  return (
    <motion.button
      type="button"
      onClick={() => openWindow('music', 'player')}
      aria-label="Open music player"
      className="absolute bottom-24 right-8 w-[250px] select-none focus:outline-none"
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 24 }}
    >
      <div className="relative">
        <img
          src={asset(image)}
          alt="Music player"
          draggable={false}
          className="w-full drop-shadow-[0_10px_24px_rgba(0,0,0,0.18)]"
        />
        {/* now-playing overlay, sitting on the iPod screen */}
        <div
          className="absolute flex items-center gap-1.5 overflow-hidden px-1"
          style={{ left: '9%', top: '34%', width: '42%', height: '30%' }}
        >
          <div className="h-[74%] aspect-square shrink-0 rounded-[2px] bg-[linear-gradient(135deg,#26305f,#7a5c8e_55%,#c98aa0)] ring-1 ring-black/10" />
          <div className="min-w-0 text-left leading-tight">
            <p className="truncate text-[8px] font-bold text-charcoal">{artist}</p>
            <p className="truncate text-[7px] text-charcoal/70">{track}</p>
          </div>
        </div>
      </div>
    </motion.button>
  )
}
