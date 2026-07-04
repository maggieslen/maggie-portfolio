import { useEffect, useState } from 'react'
import { asset } from './asset'

export type LoadState = 'loading' | 'ok' | 'error'

/** Fetch a JSON file from /public (works locally + on GitHub Pages). */
export function useJson<T>(path: string): { data: T | null; state: LoadState } {
  const [data, setData] = useState<T | null>(null)
  const [state, setState] = useState<LoadState>('loading')

  useEffect(() => {
    let alive = true
    setState('loading')
    setData(null)
    fetch(asset(path))
      .then((r) => {
        if (!r.ok) throw new Error(String(r.status))
        return r.json()
      })
      .then((d) => {
        if (alive) {
          setData(d as T)
          setState('ok')
        }
      })
      .catch(() => {
        if (alive) setState('error')
      })
    return () => {
      alive = false
    }
  }, [path])

  return { data, state }
}
