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
      <img
        src={asset(image)}
        alt="Music player"
        draggable={false}
        className="w-full drop-shadow-[0_10px_24px_rgba(0,0,0,0.18)]"
      />
      {/* now-playing caption, shown below the widget rather than over its artwork */}
      <p className="mt-2 truncate text-center text-[12px] font-medium text-charcoal/70">
        {track} <span className="text-charcoal/50">— {artist}</span>
      </p>
    </motion.button>
  )
}
