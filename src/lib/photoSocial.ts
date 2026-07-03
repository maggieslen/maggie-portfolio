import { useState } from 'react'

/* ------------------------------------------------------------------ *
 * Likes + comments for the photos album.
 *
 * For now this saves to the visitor's own browser (localStorage) so the
 * feature works immediately. It's written behind a small hook so we can
 * later swap the storage for a shared backend (e.g. Firebase) WITHOUT
 * touching the album UI — only this file changes.
 * ------------------------------------------------------------------ */

export interface Comment {
  id: string
  name: string
  text: string
  ts: number
}

interface PhotoState {
  likes: number
  liked: boolean
  comments: Comment[]
}

const KEY = 'maggie-photo-social-v1'
type Store = Record<string, PhotoState>

function readStore(): Store {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '{}') as Store
  } catch {
    return {}
  }
}

function readOne(id: string): PhotoState {
  return readStore()[id] ?? { likes: 0, liked: false, comments: [] }
}

function writeOne(id: string, state: PhotoState) {
  const store = readStore()
  store[id] = state
  localStorage.setItem(KEY, JSON.stringify(store))
}

function newId(): string {
  return (crypto.randomUUID?.() ?? String(Math.random())).slice(0, 12)
}

/** Likes + comments for a single photo. */
export function usePhotoSocial(id: string) {
  const [state, setState] = useState<PhotoState>(() => readOne(id))

  function toggleLike() {
    setState((s) => {
      const next: PhotoState = {
        ...s,
        liked: !s.liked,
        likes: Math.max(0, s.likes + (s.liked ? -1 : 1)),
      }
      writeOne(id, next)
      return next
    })
  }

  function addComment(name: string, text: string) {
    setState((s) => {
      const next: PhotoState = {
        ...s,
        comments: [
          ...s.comments,
          { id: newId(), name: name || 'anonymous', text, ts: Date.now() },
        ],
      }
      writeOne(id, next)
      return next
    })
  }

  return { ...state, toggleLike, addComment }
}
