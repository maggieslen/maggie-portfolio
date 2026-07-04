import { useJson } from '../lib/useJson'
import { cwMedia, isVideo } from '../lib/clientWork'
import type { CwProject, CwSection } from '../lib/clientWork'

/** A dedicated project page (fullscreen). Your own media is the focus. */
export function ProjectWindow({ refId }: { refId: string }) {
  const slug = refId
  const { data, state } = useJson<CwProject>(`client-work/${slug}/index.json`)

  if (state === 'loading')
    return <div className="p-10 text-center text-sm text-charcoal/50">Loading…</div>
  if (state === 'error' || !data)
    return <div className="p-10 text-center text-sm text-charcoal/50">Couldn't load this project.</div>

  return (
    <div className="mx-auto w-full max-w-4xl px-8 py-10">
      <header>
        <h1 className="font-heading text-4xl leading-tight text-charcoal">{data.name}</h1>
        <p className="mt-1 text-charcoal/55">{data.tagline}</p>
        {data.description && (
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-charcoal/80">
            {data.description}
          </p>
        )}
        {data.links?.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-3">
            {data.links.map((l) => (
              <a
                key={l.label}
                href={l.url}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-garden-bloom px-4 py-2 text-sm font-medium text-white transition hover:brightness-105"
              >
                {l.label} ↗
              </a>
            ))}
          </div>
        )}
      </header>

      <div className="mt-10 space-y-12">
        {data.sections.map((s, i) => (
          <Section key={i} slug={slug} section={s} />
        ))}
      </div>
    </div>
  )
}

function Section({ slug, section }: { slug: string; section: CwSection }) {
  return (
    <section>
      <h2 className="mb-4 font-heading text-2xl text-charcoal">{section.title}</h2>
      {section.items.length === 0 ? (
        <Placeholder type={section.type} />
      ) : section.type === 'grid' ? (
        <IgGrid slug={slug} section={section} />
      ) : (
        <Gallery slug={slug} section={section} />
      )}
    </section>
  )
}

function Gallery({ slug, section }: { slug: string; section: CwSection }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {section.items.map((it, i) => (
        <figure key={i} className="overflow-hidden rounded-xl bg-white ring-1 ring-black/5">
          {isVideo(it.src) ? (
            <video src={cwMedia(slug, it.src!)} controls className="w-full" />
          ) : (
            <img src={cwMedia(slug, it.src!)} alt={it.caption || ''} className="w-full" />
          )}
          {it.caption && (
            <figcaption className="px-3 py-2 text-[12px] text-charcoal/60">{it.caption}</figcaption>
          )}
        </figure>
      ))}
    </div>
  )
}

function IgGrid({ slug, section }: { slug: string; section: CwSection }) {
  return (
    <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
      {section.items.map((it, i) => (
        <div key={i} className="aspect-square overflow-hidden rounded-lg ring-1 ring-black/5">
          <img src={cwMedia(slug, it.src!)} alt={it.caption || ''} className="h-full w-full object-cover" />
        </div>
      ))}
    </div>
  )
}

function Placeholder({ type }: { type: string }) {
  const hints: Record<string, string> = {
    gallery: "Drop images/videos into this project's media/ folder and list them under this section in index.json.",
    grid: 'Add feed posts (square images) to show an Instagram-profile-style grid.',
    stories: "Add Stories/Reels — they'll appear in a scrollable phone frame (built in the next step).",
    embeds: 'Add public Instagram post/reel URLs to embed the real posts (built in the next step).',
  }
  return (
    <div className="grid place-items-center rounded-2xl border-2 border-dashed border-charcoal/15 bg-blush-soft/30 px-6 py-10 text-center">
      <p className="max-w-md text-[13px] text-charcoal/50">{hints[type] ?? 'Add media in index.json.'}</p>
    </div>
  )
}
