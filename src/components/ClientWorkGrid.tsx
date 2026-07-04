import { useJson } from '../lib/useJson'
import { asset } from '../lib/asset'
import type { CwManifest } from '../lib/clientWork'
import { useWindowStore } from '../store/windowStore'

/** The "client work" folder view: a Finder-style list of project entries. */
export function ClientWorkGrid() {
  const { data, state } = useJson<CwManifest>('client-work/manifest.json')
  const openWindow = useWindowStore((s) => s.openWindow)

  if (state === 'loading')
    return <div className="p-6 text-sm text-charcoal/50">Loading…</div>
  if (state === 'error' || !data)
    return <div className="p-6 text-sm text-charcoal/50">Couldn't load projects.</div>

  return (
    <div className="p-5">
      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
        {data.projects.map((p) => (
          <button
            key={p.slug}
            type="button"
            onClick={() => openWindow('project', p.slug, p.name)}
            className="group flex items-center gap-4 rounded-2xl bg-blush-soft/50 p-3.5 text-left ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:bg-blush-soft hover:shadow-md"
          >
            <div
              className="grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-xl ring-1 ring-black/10"
              style={{ background: `linear-gradient(135deg, ${p.accent || '#e7c4cb'}, #ffffff)` }}
            >
              {p.cover ? (
                <img src={asset(`client-work/${p.cover}`)} alt="" className="h-full w-full object-cover" />
              ) : (
                <span className="font-heading text-xl text-charcoal/70">{p.name.charAt(0)}</span>
              )}
            </div>
            <div className="min-w-0">
              <h3 className="font-heading text-lg leading-tight text-charcoal">{p.name}</h3>
              <p className="truncate text-[13px] text-charcoal/60">{p.blurb}</p>
            </div>
            <span className="ml-auto text-charcoal/30 transition group-hover:translate-x-0.5 group-hover:text-charcoal/50">
              ›
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
