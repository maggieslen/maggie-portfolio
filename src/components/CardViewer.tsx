import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { cwMedia } from '../lib/clientWork'
import type { CwCard } from '../lib/clientWork'

/** A grid of closed cards — click one to open it like the real thing. */
export function CardGrid({ slug, cards }: { slug: string; cards: CwCard[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <>
      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3">
        {cards.map((card, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setOpenIndex(i)}
            title={card.title}
            className="group overflow-hidden rounded-lg transition hover:-translate-y-0.5"
          >
            <img
              src={cwMedia(slug, card.front)}
              alt={card.title}
              className="w-full transition group-hover:scale-[1.02]"
            />
          </button>
        ))}
      </div>

      {openIndex !== null && (
        <CardModal
          slug={slug}
          cards={cards}
          startIndex={openIndex}
          onClose={() => setOpenIndex(null)}
        />
      )}
    </>
  )
}

function CardModal({
  slug,
  cards,
  startIndex,
  onClose,
}: {
  slug: string
  cards: CwCard[]
  startIndex: number
  onClose: () => void
}) {
  const [index, setIndex] = useState(startIndex)
  const [open, setOpen] = useState(false)
  const card = cards[index]

  function go(delta: number) {
    setOpen(false)
    setIndex((i) => Math.min(cards.length - 1, Math.max(0, i + delta)))
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') go(-1)
      if (e.key === 'ArrowRight') go(1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, cards.length, onClose])

  const hasPrev = index > 0
  const hasNext = index < cards.length - 1

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
          aria-label="Previous card"
          onClick={(e) => {
            e.stopPropagation()
            go(-1)
          }}
          className="absolute left-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-xl text-white hover:bg-white/20 sm:left-6"
        >
          ‹
        </button>
      )}
      {hasNext && (
        <button
          type="button"
          aria-label="Next card"
          onClick={(e) => {
            e.stopPropagation()
            go(1)
          }}
          className="absolute right-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-xl text-white hover:bg-white/20 sm:right-6"
        >
          ›
        </button>
      )}

      <div className="flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
        <motion.div layout transition={{ duration: 0.35, ease: 'easeInOut' }}>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="block cursor-pointer overflow-hidden rounded-lg shadow-2xl"
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={open ? 'inside' : 'front'}
                src={cwMedia(slug, open ? card.inside : card.front)}
                alt={card.title}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="block max-h-[72vh] max-w-[88vw] object-contain sm:max-w-[75vw]"
              />
            </AnimatePresence>
          </button>
        </motion.div>

        <p className="mt-4 text-[15px] text-white/90">{card.title}</p>
        <p className="mt-1 text-[12px] text-white/40">
          {open ? 'tap the card to close it' : 'tap the card to open it'} · {index + 1} / {cards.length}
        </p>
      </div>
    </div>
  )
}
