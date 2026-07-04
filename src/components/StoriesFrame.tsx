import { cwMedia, isVideo } from '../lib/clientWork'
import type { CwItem } from '../lib/clientWork'

/**
 * Stories / Reels shown inside an iPhone frame. Swipe/scroll vertically
 * through the frames (each snaps into place), the way they'd look on a phone.
 */
export function StoriesFrame({ slug, items }: { slug: string; items: CwItem[] }) {
  return (
    <div className="w-[232px] shrink-0 select-none">
      <div className="relative rounded-[2.5rem] bg-neutral-900 p-2.5 shadow-[0_14px_34px_rgba(0,0,0,0.28)] ring-1 ring-black/30">
        <div className="relative aspect-[9/19.5] overflow-hidden rounded-[2rem] bg-black">
          {/* story progress segments */}
          <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex gap-1 px-3 pt-2.5">
            {items.map((_, i) => (
              <span key={i} className="h-[3px] flex-1 rounded-full bg-white/45" />
            ))}
          </div>
          {/* dynamic-island pill */}
          <div className="pointer-events-none absolute left-1/2 top-1 z-20 h-4 w-14 -translate-x-1/2 rounded-full bg-black" />

          {/* vertical snap scroll of frames */}
          <div className="mac-scroll h-full snap-y snap-mandatory overflow-y-auto">
            {items.map((it, i) => (
              <div key={i} className="h-full w-full snap-start">
                {isVideo(it.src) ? (
                  <video
                    src={cwMedia(slug, it.src!)}
                    muted
                    loop
                    autoPlay
                    playsInline
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <img
                    src={cwMedia(slug, it.src!)}
                    alt={it.caption || ''}
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      {items.length > 1 && (
        <p className="mt-2 text-center text-[11px] text-charcoal/40">↕ scroll through</p>
      )}
    </div>
  )
}
