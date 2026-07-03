import { useEffect, useState } from 'react'

/**
 * Returns true on small screens (phones / small tablets) so we can show
 * a simplified, tap-friendly layout instead of the draggable desktop.
 */
export function useIsMobile(breakpoint = 820): boolean {
  const query = `(max-width: ${breakpoint}px)`
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches,
  )

  useEffect(() => {
    const mql = window.matchMedia(query)
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mql.addEventListener('change', onChange)
    setIsMobile(mql.matches)
    return () => mql.removeEventListener('change', onChange)
  }, [query])

  return isMobile
}
