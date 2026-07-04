import { useEffect } from 'react'
import { cwMedia } from '../lib/clientWork'
import type { CwItem } from '../lib/clientWork'

/**
 * Full-screen lightbox for browsing a grid of posts in place — click through
 * with the arrows (or ← / → / Esc on a keyboard) instead of leaving the page.
 */
export function IgLightbox({
  slug,
  items,
  index,
  onIndexChange,
  onClose,
}: {
  slug: string
  items: CwItem[]
  index: number
  onIndexChange: (updater: number | ((prev: number) => number)) => void
  onClose: () => void
}) {
  const current = items[index]
  const hasPrev = index > 0
  const hasNext = index < items.length - 1
  const count = items.length

  function goPrev() {
    onIndexChange((i) => Math.max(0, i - 1))
  }
  function goNext() {
    onIndexChange((i) => Math.min(count - 1, i + 1))
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') goPrev()
      if (e.key === 'ArrowRight') goNext()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, onClose])

  return (
    <div
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-black/90 p-6"
      onClick={onClose}
    >
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full bg-white/10 text-xl text-white hover:bg-white/20"
      >
        ✕
      </button>

      {hasPrev && (
        <button
          type="button"
          aria-label="Previous post"
          onClick={(e) => {
            e.stopPropagation()
            goPrev()
          }}
          className="absolute left-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-xl text-white hover:bg-white/20 sm:left-6"
        >
          ‹
        </button>
      )}
      {hasNext && (
        <button
          type="button"
          aria-label="Next post"
          onClick={(e) => {
            e.stopPropagation()
            goNext()
          }}
          className="absolute right-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-xl text-white hover:bg-white/20 sm:right-6"
        >
          ›
        </button>
      )}

      <div
        className="flex max-h-full max-w-full flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={cwMedia(slug, current.src!)}
          alt={current.caption || ''}
          className="max-h-[75vh] max-w-[88vw] rounded-lg object-contain shadow-2xl sm:max-w-[70vw]"
        />
        {(current.caption || current.url) && (
          <div className="mt-4 flex flex-col items-center gap-1 text-center">
            {current.caption && <p className="text-[15px] text-white/90">{current.caption}</p>}
            {current.url && (
              <a
                href={current.url}
                target="_blank"
                rel="noreferrer"
                className="text-[13px] font-medium text-white/60 hover:text-white hover:underline"
              >
                View on Instagram ↗
              </a>
            )}
          </div>
        )}
        <p className="mt-3 text-[12px] text-white/40">
          {index + 1} / {items.length}
        </p>
      </div>
    </div>
  )
}
