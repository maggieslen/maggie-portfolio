import { useEffect, useState } from 'react'
import { cwMedia, cwSlides } from '../lib/clientWork'
import type { CwItem } from '../lib/clientWork'

interface Position {
  postIndex: number
  slideIndex: number
}

/**
 * Full-screen lightbox for browsing a grid of posts in place. Left/right
 * (arrows, or ← / → / Esc on a keyboard) first pages through the current
 * post's own slides (for carousel posts), then continues on to the next
 * post — one continuous swipe through everything, no new tab required.
 */
export function IgLightbox({
  slug,
  items,
  startIndex,
  onClose,
}: {
  slug: string
  items: CwItem[]
  startIndex: number
  onClose: () => void
}) {
  const [pos, setPos] = useState<Position>({ postIndex: startIndex, slideIndex: 0 })
  const { postIndex, slideIndex } = pos

  const post = items[postIndex]
  const slides = cwSlides(post)
  const hasPrev = postIndex > 0 || slideIndex > 0
  const hasNext = postIndex < items.length - 1 || slideIndex < slides.length - 1

  function goPrev() {
    setPos(({ postIndex, slideIndex }) => {
      if (slideIndex > 0) return { postIndex, slideIndex: slideIndex - 1 }
      if (postIndex > 0) {
        const prevSlides = cwSlides(items[postIndex - 1])
        return { postIndex: postIndex - 1, slideIndex: prevSlides.length - 1 }
      }
      return { postIndex, slideIndex }
    })
  }

  function goNext() {
    setPos(({ postIndex, slideIndex }) => {
      const slideCount = cwSlides(items[postIndex]).length
      if (slideIndex < slideCount - 1) return { postIndex, slideIndex: slideIndex + 1 }
      if (postIndex < items.length - 1) return { postIndex: postIndex + 1, slideIndex: 0 }
      return { postIndex, slideIndex }
    })
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
  }, [items.length, onClose])

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
          aria-label="Previous"
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
          aria-label="Next"
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
        <div className="relative">
          <img
            src={cwMedia(slug, slides[slideIndex])}
            alt={post.caption || ''}
            className="max-h-[72vh] max-w-[88vw] rounded-lg object-contain shadow-2xl sm:max-w-[70vw]"
          />
          {/* carousel dots for this post's own slides */}
          {slides.length > 1 && (
            <div className="absolute inset-x-0 bottom-2.5 flex justify-center gap-1.5">
              {slides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Slide ${i + 1}`}
                  onClick={(e) => {
                    e.stopPropagation()
                    setPos((p) => ({ ...p, slideIndex: i }))
                  }}
                  className={`h-1.5 w-1.5 rounded-full transition ${
                    i === slideIndex ? 'bg-white' : 'bg-white/40'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {(post.caption || post.url) && (
          <div className="mt-4 flex flex-col items-center gap-1 text-center">
            {post.caption && <p className="text-[15px] text-white/90">{post.caption}</p>}
            {post.url && (
              <a
                href={post.url}
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
          Post {postIndex + 1} / {items.length}
          {slides.length > 1 && ` · Slide ${slideIndex + 1} / ${slides.length}`}
        </p>
      </div>
    </div>
  )
}
