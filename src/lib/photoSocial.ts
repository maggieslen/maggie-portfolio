import { useEffect, useState } from 'react'
import {
  addDoc,
  collection,
  doc,
  increment,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore'
import { db } from './firebase'

/* ------------------------------------------------------------------ *
 * Shared likes + comments for the photos album (Firebase Firestore).
 *
 *   photos/{photoId}                     -> { likes: number }
 *   photos/{photoId}/comments/{id}       -> { name, text, ts }
 *
 * Likes + comments are shared across ALL visitors (real-time). Whether
 * THIS device has liked a photo is remembered locally so the heart can
 * toggle, but the count itself lives in Firestore.
 * ------------------------------------------------------------------ */

export interface Comment {
  id: string
  name: string
  text: string
  ts: number
}

const LIKED_KEY = 'maggie-liked-v1'

function readLiked(): Record<string, boolean> {
  try {
    return JSON.parse(localStorage.getItem(LIKED_KEY) || '{}')
  } catch {
    return {}
  }
}

function writeLiked(map: Record<string, boolean>) {
  localStorage.setItem(LIKED_KEY, JSON.stringify(map))
}

/** Live likes + comments for a single photo. */
export function usePhotoSocial(id: string) {
  const [likes, setLikes] = useState(0)
  const [liked, setLiked] = useState<boolean>(() => !!readLiked()[id])
  const [comments, setComments] = useState<Comment[]>([])

  useEffect(() => {
    const photoRef = doc(db, 'photos', id)
    const unsubLikes = onSnapshot(
      photoRef,
      (snap) => setLikes(Math.max(0, (snap.data()?.likes as number) ?? 0)),
      () => setLikes(0),
    )

    const commentsQuery = query(
      collection(db, 'photos', id, 'comments'),
      orderBy('ts', 'asc'),
    )
    const unsubComments = onSnapshot(
      commentsQuery,
      (snap) =>
        setComments(
          snap.docs.map((d) => {
            const data = d.data()
            return {
              id: d.id,
              name: (data.name as string) ?? 'anonymous',
              text: (data.text as string) ?? '',
              ts: data.ts?.toMillis?.() ?? Date.now(),
            }
          }),
        ),
      () => setComments([]),
    )

    return () => {
      unsubLikes()
      unsubComments()
    }
  }, [id])

  async function toggleLike() {
    const nowLiked = !liked
    // optimistic local update
    setLiked(nowLiked)
    setLikes((n) => Math.max(0, n + (nowLiked ? 1 : -1)))
    const map = readLiked()
    map[id] = nowLiked
    writeLiked(map)
    try {
      await setDoc(
        doc(db, 'photos', id),
        { likes: increment(nowLiked ? 1 : -1) },
        { merge: true },
      )
    } catch {
      // revert on failure
      setLiked(!nowLiked)
      setLikes((n) => Math.max(0, n + (nowLiked ? -1 : 1)))
      map[id] = !nowLiked
      writeLiked(map)
    }
  }

  async function addComment(name: string, text: string) {
    try {
      await addDoc(collection(db, 'photos', id, 'comments'), {
        name: name || 'anonymous',
        text,
        ts: serverTimestamp(),
      })
    } catch (e) {
      console.warn('Comment not saved (are the Firestore rules published?)', e)
    }
  }

  return { likes, liked, comments, toggleLike, addComment }
}
