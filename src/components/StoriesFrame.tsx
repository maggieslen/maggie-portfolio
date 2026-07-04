import { useState } from 'react'
import { cwMedia, isVideo } from '../lib/clientWork'
import type { CwItem, CwStoryGroup } from '../lib/clientWork'

/**
 * A single Story/Reel shown inside an iPhone frame. Tap the right/left half
 * to advance/go back a frame, like real Instagram Stories (no swipe needed).
 * Videos autoplay muted (required by browsers); a speaker icon lets you
 * turn the sound on, like Instagram Reels.
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
  const [muted, setMuted] = useState(true)
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
                muted={muted}
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

          {/* mute/unmute toggle, only shown on video frames */}
          {isVideo(current.src) && (
            <button
              type="button"
              aria-label={muted ? 'Unmute' : 'Mute'}
              onClick={() => setMuted((m) => !m)}
              className="absolute right-2 top-8 z-20 grid h-7 w-7 place-items-center rounded-full bg-black/45 text-white backdrop-blur-sm"
            >
              {muted ? <SpeakerOffIcon /> : <SpeakerOnIcon />}
            </button>
          )}

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

function SpeakerOnIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 9v6h4l5 5V4L7 9H3z" />
      <path d="M16.5 12a4.5 4.5 0 0 0-2.5-4.03v8.06A4.5 4.5 0 0 0 16.5 12z" />
      <path d="M14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
    </svg>
  )
}

function SpeakerOffIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 9v6h4l5 5V4L7 9H3z" />
      <path d="M19.8 12l2.5-2.5-1.3-1.3-2.5 2.5-2.5-2.5-1.3 1.3 2.5 2.5-2.5 2.5 1.3 1.3 2.5-2.5 2.5 2.5 1.3-1.3z" />
    </svg>
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
