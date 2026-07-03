import { widgets } from '../../content'
import { asset } from '../../lib/asset'

/**
 * Frame geometry: display width + where the transparent "window" sits inside
 * each uploaded frame PNG (as % of the frame image). The photo is placed in
 * that window and the frame is layered on top.
 */
const FRAMES = {
  large: {
    src: 'elements/polaroid-large.png',
    width: 150,
    window: { top: '7%', left: '8%', width: '84%', height: '63%' },
  },
  small: {
    src: 'elements/polaroid-small.png',
    width: 104,
    window: { top: '7%', left: '13%', width: '74%', height: '66%' },
  },
} as const

/** Three overlapping polaroids: your photos dropped into the uploaded frames. */
export function PolaroidStack() {
  return (
    <div className="absolute right-[92px] top-[198px] h-[250px] w-[290px] select-none">
      {widgets.polaroids.map((p, i) => {
        const f = FRAMES[p.frame as keyof typeof FRAMES]
        return (
          <div
            key={i}
            className="absolute"
            style={{
              left: p.left,
              top: p.top,
              width: f.width,
              transform: `rotate(${p.rotate}deg)`,
            }}
          >
            <div className="relative">
              {/* photo, clipped to the frame's transparent window */}
              <div className="absolute overflow-hidden" style={f.window}>
                <img
                  src={asset(p.photo)}
                  alt={p.caption}
                  draggable={false}
                  className="h-full w-full object-cover"
                />
              </div>
              {/* frame on top */}
              <img
                src={asset(f.src)}
                alt=""
                aria-hidden="true"
                draggable={false}
                className="relative w-full drop-shadow-[0_6px_12px_rgba(0,0,0,0.18)]"
              />
              <span
                className="absolute inset-x-0 text-center text-[9px] italic text-charcoal/70"
                style={{ bottom: '3%' }}
              >
                {p.caption}
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
