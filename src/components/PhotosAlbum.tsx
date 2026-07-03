import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import type { Folder, FolderItem } from '../types'
import { asset } from '../lib/asset'
import { usePhotoSocial } from '../lib/photoSocial'

/** iPhone "shared album"-style photo browser shown inside the photos folder. */
export function PhotosAlbum({ folder }: { folder: Folder }) {
  const photos = folder.items.filter((i) => i.image)
  const [openId, setOpenId] = useState<string | null>(null)
  const current = photos.find((p) => p.id === openId) ?? null

  return (
    <div className="relative h-full">
      <div className="mac-scroll h-full overflow-auto p-3">
        <div className="mb-3 px-1">
          <h2 className="font-heading text-xl leading-tight text-charcoal">
            {folder.label}
          </h2>
          <p className="text-xs text-charcoal/50">
            {photos.length} photos · shared album
          </p>
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          {photos.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setOpenId(p.id)}
              className="group relative aspect-square overflow-hidden rounded-md ring-1 ring-black/5"
            >
              <img
                src={asset(p.image!)}
                alt={p.description || ''}
                loading="lazy"
                draggable={false}
                className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
              />
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {current && (
          <PhotoDetail photo={current} onClose={() => setOpenId(null)} />
        )}
      </AnimatePresence>
    </div>
  )
}

function PhotoDetail({
  photo,
  onClose,
}: {
  photo: FolderItem
  onClose: () => void
}) {
  const { liked, likes, comments, toggleLike, addComment } = usePhotoSocial(
    photo.id,
  )
  const [name, setName] = useState('')
  const [text, setText] = useState('')

  function submit(e: React.FormEvent) {
    e.preventDefault()
    const t = text.trim()
    if (!t) return
    addComment(name.trim(), t)
    setText('')
  }

  return (
    <motion.div
      className="absolute inset-0 z-10 flex flex-col bg-white"
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', stiffness: 360, damping: 36 }}
    >
      <div className="flex items-center border-b border-black/5 bg-cream px-3 py-2">
        <button
          type="button"
          onClick={onClose}
          className="text-sm font-medium text-[#8a5b74]"
        >
          ‹ Album
        </button>
      </div>

      <div className="mac-scroll flex-1 overflow-auto">
        <img
          src={asset(photo.image!)}
          alt={photo.description || ''}
          className="max-h-[280px] w-full bg-black/5 object-contain"
        />
        <div className="p-4">
          <div className="flex items-start justify-between gap-3">
            <p className="text-sm text-charcoal">{photo.description}</p>
            <button
              type="button"
              onClick={toggleLike}
              className="flex shrink-0 items-center gap-1.5"
              aria-pressed={liked}
              aria-label="Like"
            >
              <Heart filled={liked} />
              <span className="text-sm text-charcoal/60">{likes}</span>
            </button>
          </div>

          <div className="mt-4 space-y-2">
            {comments.map((c) => (
              <p key={c.id} className="text-[13px] leading-snug">
                <span className="font-semibold text-charcoal">{c.name}</span>{' '}
                <span className="text-charcoal/75">{c.text}</span>
              </p>
            ))}
            {comments.length === 0 && (
              <p className="text-[12px] text-charcoal/40">
                No comments yet — be the first 💬
              </p>
            )}
          </div>

          <form onSubmit={submit} className="mt-4 space-y-2">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="your name (optional)"
              className="w-full rounded-lg border border-black/10 bg-white px-3 py-1.5 text-[13px] outline-none focus:border-garden-bloom"
            />
            <div className="flex gap-2">
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="add a comment…"
                className="flex-1 rounded-lg border border-black/10 bg-white px-3 py-1.5 text-[13px] outline-none focus:border-garden-bloom"
              />
              <button
                type="submit"
                className="rounded-lg bg-garden-bloom px-3 py-1.5 text-[13px] font-medium text-white transition hover:brightness-105"
              >
                Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  )
}

function Heart({ filled }: { filled: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`h-6 w-6 transition ${filled ? 'text-red-500' : 'text-charcoal/35'}`}
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    >
      <path d="M12 20.5S3.5 15.4 3.5 9.6C3.5 6.9 5.6 5 8 5c1.7 0 3.1 1 4 2.3C12.9 6 14.3 5 16 5c2.4 0 4.5 1.9 4.5 4.6 0 5.8-8.5 10.9-8.5 10.9z" />
    </svg>
  )
}
