import { motion } from 'motion/react'
import { apps } from '../content'
import { asset } from '../lib/asset'
import { useWindowStore } from '../store/windowStore'

/**
 * The bottom dock. Each flagship "app" (organization) is a rounded
 * macOS-style tile. The icons have their own (often white) backgrounds,
 * so we clip them to a rounded square and space them out with a gap.
 * Clicking one opens its window.
 */
export function Dock() {
  const openWindow = useWindowStore((s) => s.openWindow)

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-3 z-[9000] flex justify-center px-4">
      <div className="pointer-events-auto flex items-end gap-3 rounded-[22px] border border-white/60 bg-dock/50 px-3.5 py-2.5 shadow-[0_8px_30px_rgba(0,0,0,0.14)] backdrop-blur-md">
        {apps.map((app) => (
          <motion.button
            key={app.id}
            type="button"
            onClick={() => openWindow('app', app.id)}
            aria-label={app.name}
            className="group relative flex flex-col items-center focus:outline-none"
            whileHover={{ scale: 1.18, y: -6 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          >
            <img
              src={asset(app.icon)}
              alt={app.name}
              draggable={false}
              className="h-[52px] w-[52px] rounded-[24%] bg-white object-cover shadow-md ring-1 ring-black/10"
            />
            {/* hover tooltip */}
            <span className="pointer-events-none absolute -top-9 whitespace-nowrap rounded-md bg-charcoal/85 px-2 py-1 text-[11px] font-medium text-white opacity-0 shadow transition-opacity duration-150 group-hover:opacity-100">
              {app.name}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  )
}
