import { cwMedia, isVideo } from '../lib/clientWork'
import type { CwItem, CwStoryGroup } from '../lib/clientWork'

/**
 * A single Story/Reel shown inside an iPhone frame. Swipe/scroll vertically
 * through the frames (each snaps into place), the way they'd look on a phone.
 */
export function StoriesFrame({
  slug,
  items,
  width = 210,
}: {
  slug: string
  items: CwItem[]
  width?: number
}) {
  return (
    <div style={{ width }} className="shrink-0 select-none">
      <div className="relative rounded-[2.2rem] bg-neutral-900 p-2 shadow-[0_14px_34px_rgba(0,0,0,0.28)] ring-1 ring-black/30">
        <div className="relative aspect-[9/19.5] overflow-hidden rounded-[1.7rem] bg-black">
          {/* story progress segments */}
          <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex gap-1 px-3 pt-2.5">
            {items.map((_, i) => (
              <span key={i} className="h-[3px] flex-1 rounded-full bg-white/45" />
            ))}
          </div>
          {/* dynamic-island pill */}
          <div className="pointer-events-none absolute left-1/2 top-1 z-20 h-3.5 w-12 -translate-x-1/2 rounded-full bg-black" />

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
    </div>
  )
}

/**
 * A row of phone mockups (one per Stories/Reels group), each with its own
 * caption below — like flipping through a friend's camera roll.
 */
export function StoriesRow({
  slug,
  groups,
}: {
  slug: string
  groups: CwStoryGroup[]
}) {
  return (
    <div className="rounded-[28px] bg-blush-soft/40 px-6 py-8 sm:px-10">
      <div className="flex flex-wrap items-start justify-center gap-x-8 gap-y-10">
        {groups.map((g, i) => (
          <div key={i} className="flex flex-col items-center">
            <StoriesFrame slug={slug} items={g.items} />
            {g.caption && (
              <p className="mt-4 max-w-[200px] text-center font-heading text-lg leading-snug text-charcoal/80">
                {g.caption}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
