import { motion } from 'motion/react'
import { widgets } from '../../content'
import { asset } from '../../lib/asset'
import { useWindowStore } from '../../store/windowStore'

/**
 * The iPod-nano widget. Clicking it opens the Music player (Apple-Music-style
 * window that embeds the real Spotify playlist).
 */
export function IpodWidget() {
  const { image, cover, track, artist } = widgets.ipod
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
        {/* album cover in the player's empty left side */}
        <img
          src={asset(cover)}
          alt=""
          draggable={false}
          className="absolute left-[5%] top-[11%] aspect-square w-[39%] rounded-lg bg-[#f9f1ea] object-contain p-[3%] shadow-md"
        />
      </div>
      {/* now-playing caption, shown below the widget rather than over its artwork */}
      <p className="mt-2 truncate text-center text-[12px] font-medium text-charcoal/70">
        {track} <span className="text-charcoal/50">— {artist}</span>
      </p>
    </motion.button>
  )
}
