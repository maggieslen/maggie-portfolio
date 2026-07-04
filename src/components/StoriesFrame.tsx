import { useState } from 'react'
import { cwMedia, isVideo } from '../lib/clientWork'
import type { CwItem, CwStoryGroup } from '../lib/clientWork'

/**
 * A single Story/Reel shown inside an iPhone frame. Tap the right/left half
 * to advance/go back a frame, like real Instagram Stories (no swipe needed).
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
  const [index, setIndex] = useState(0)
  const current = items[index]

  function go(delta: number) {
    setIndex((i) => Math.min(items.length - 1, Math.max(0, i + delta)))
  }

  return (
    <div style={{ width }} className="shrink-0 select-none">
      <div className="relative rounded-[2.2rem] bg-neutral-900 p-2 shadow-[0_14px_34px_rgba(0,0,0,0.28)] ring-1 ring-black/30">
        <div className="relative aspect-[9/19.5] overflow-hidden rounded-[1.7rem] bg-black">
          {/* story progress segments — the active one is fully lit */}
          <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex gap-1 px-3 pt-2.5">
            {items.map((_, i) => (
              <span
                key={i}
                className={`h-[3px] flex-1 rounded-full transition-colors ${
                  i <= index ? 'bg-white/90' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
          {/* dynamic-island pill */}
          <div className="pointer-events-none absolute left-1/2 top-1 z-20 h-3.5 w-12 -translate-x-1/2 rounded-full bg-black" />

          {/* current frame, centered (letterboxed rather than cropped) */}
          <div className="flex h-full w-full items-center justify-center">
            {isVideo(current.src) ? (
              <video
                key={current.src}
                src={cwMedia(slug, current.src!)}
                muted
                loop
                autoPlay
                playsInline
                className="h-full w-full object-contain"
              />
            ) : (
              <img
                key={current.src}
                src={cwMedia(slug, current.src!)}
                alt={current.caption || ''}
                className="h-full w-full object-contain"
              />
            )}
          </div>

          {/* invisible left/right tap zones to click through frames */}
          {items.length > 1 && (
            <>
              <button
                type="button"
                aria-label="Previous"
                onClick={() => go(-1)}
                className="absolute inset-y-0 left-0 z-10 w-1/2 cursor-pointer"
              />
              <button
                type="button"
                aria-label="Next"
                onClick={() => go(1)}
                className="absolute inset-y-0 right-0 z-10 w-1/2 cursor-pointer"
              />
            </>
          )}
        </div>
      </div>
      {items.length > 1 && (
        <p className="mt-2 text-center text-[11px] text-charcoal/40">
          tap to click through
        </p>
      )}
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
    <div className="rounded-[28px] bg-white px-6 py-8 shadow-[0_2px_16px_rgba(0,0,0,0.05)] ring-1 ring-black/5 sm:px-10">
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
