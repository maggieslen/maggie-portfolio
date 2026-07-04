import type { FolderItem } from '../types'
import { asset } from '../lib/asset'
import { useWindowStore } from '../store/windowStore'

/** Renders one item inside an opened folder. */
export function ItemTile({ item, accent }: { item: FolderItem; accent: string }) {
  const openWindow = useWindowStore((s) => s.openWindow)

  // Text-only note card
  if (item.kind === 'note') {
    return (
      <div className="rounded-xl bg-blush-soft/60 p-4 ring-1 ring-black/5">
        <h3 className="text-sm font-semibold text-charcoal">{item.title}</h3>
        {item.description && (
          <p className="mt-1 text-[13px] leading-snug text-charcoal/70">
            {item.description}
          </p>
        )}
        {item.href && (
          <a
            href={item.href}
            target="_blank"
            rel="noreferrer"
            className="mt-2 inline-block text-[13px] font-medium text-[#8a5b74] underline"
          >
            Open ↗
          </a>
        )}
      </div>
    )
  }

  // Media / link / project tile
  const tile = (
    <div className="group flex flex-col">
      <div
        className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-xl ring-1 ring-black/5"
        style={{
          background: `linear-gradient(135deg, ${accent}, #ffffff)`,
        }}
      >
        {item.image ? (
          <img
            src={asset(item.image)}
            alt={item.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="text-3xl opacity-70">
            {item.kind === 'link' ? '🔗' : item.kind === 'project' ? '🗂️' : '📷'}
          </span>
        )}
      </div>
      <div className="mt-1.5 px-0.5">
        <p className="truncate text-[13px] font-medium text-charcoal">
          {item.title}
        </p>
        {item.description && (
          <p className="line-clamp-2 text-[11px] leading-snug text-charcoal/60">
            {item.description}
          </p>
        )}
      </div>
    </div>
  )

  if (item.kind === 'project' && item.projectSlug) {
    return (
      <button
        type="button"
        onClick={() => openWindow('project', item.projectSlug!, item.title)}
        className="block text-left transition-opacity hover:opacity-95"
      >
        {tile}
      </button>
    )
  }

  if (item.href) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noreferrer"
        className="block transition-opacity hover:opacity-95"
      >
        {tile}
      </a>
    )
  }
  return tile
}
