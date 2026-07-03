/**
 * Build a URL for a file in the /public folder that works both locally
 * and on GitHub Pages (which serves the site from a sub-path).
 *
 * Example: asset('photos/beach.jpg')
 */
export function asset(path: string): string {
  const base = import.meta.env.BASE_URL // e.g. "/maggie-portfolio/"
  return `${base}${path.replace(/^\//, '')}`
}
