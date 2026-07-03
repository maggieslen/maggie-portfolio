import { widgets } from '../../content'
import { asset } from '../../lib/asset'

/**
 * The iPod-nano-style music player (uploaded image) with a small
 * "now playing" overlay on its screen. The screen rectangle is positioned
 * as a percentage of the image, so it stays aligned if the widget resizes.
 */
export function IpodWidget() {
  const { image, track, artist } = widgets.ipod
  return (
    <div className="absolute bottom-24 right-8 w-[250px] select-none">
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
          <div className="min-w-0 leading-tight">
            <p className="truncate text-[8px] font-bold text-charcoal">{artist}</p>
            <p className="truncate text-[7px] text-charcoal/70">{track}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
