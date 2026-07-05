import { useState } from 'react'
import { useJson } from '../lib/useJson'
import { cwMedia, cwSlides, igEmbedUrl, isVideo } from '../lib/clientWork'
import type { CwItem, CwProject, CwSection } from '../lib/clientWork'
import { StoriesRow } from './StoriesFrame'
import { IgProfileCard } from './IgProfileCard'
import { IgLightbox } from './IgLightbox'
import { CardGrid } from './CardViewer'

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
  const isEmpty =
    section.type === 'stories'
      ? !section.groups?.length && !section.items?.length
      : section.type === 'profile'
        ? !section.profile
        : section.type === 'cards'
          ? !section.cards?.length
          : !section.items?.length

  return (
    <section>
      <h2 className="mb-4 font-heading text-2xl text-charcoal">{section.title}</h2>
      {isEmpty ? (
        <Placeholder type={section.type} />
      ) : section.type === 'stories' ? (
        <StoriesRow
          slug={slug}
          groups={section.groups ?? [{ items: section.items ?? [] }]}
        />
      ) : section.type === 'profile' ? (
        <IgProfileCard slug={slug} profile={section.profile!} items={section.items ?? []} />
      ) : section.type === 'cards' ? (
        <CardGrid slug={slug} cards={section.cards ?? []} />
      ) : section.type === 'grid' ? (
        <IgGrid slug={slug} items={section.items ?? []} />
      ) : section.type === 'embeds' ? (
        <IgEmbed items={section.items ?? []} />
      ) : (
        <Gallery slug={slug} items={section.items ?? []} />
      )}
    </section>
  )
}

function Gallery({ slug, items }: { slug: string; items: CwItem[] }) {
  return (
    <div className="space-y-6">
      {items.map((it, i) => (
        <figure
          key={i}
          className="mx-auto max-w-2xl overflow-hidden rounded-xl bg-white ring-1 ring-black/5"
        >
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

function IgGrid({ slug, items }: { slug: string; items: CwItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <>
      <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
        {items.map((it, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setOpenIndex(i)}
            title={it.caption}
            className="group relative aspect-[3/4] overflow-hidden rounded-lg ring-1 ring-black/5"
          >
            <img
              src={cwMedia(slug, cwSlides(it)[0])}
              alt={it.caption || ''}
              className="h-full w-full object-cover transition group-hover:scale-105"
            />
            {cwSlides(it).length > 1 && (
              <span className="absolute right-1.5 top-1.5 rounded bg-black/50 px-1 text-[10px] font-medium text-white">
                1/{cwSlides(it).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {openIndex !== null && (
        <IgLightbox
          slug={slug}
          items={items}
          startIndex={openIndex}
          onClose={() => setOpenIndex(null)}
        />
      )}
    </>
  )
}

function IgEmbed({ items }: { items: CwItem[] }) {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((it, i) => (
        <div key={i}>
          {it.caption && (
            <p className="mb-2 text-[13px] font-medium text-charcoal/60">{it.caption}</p>
          )}
          <div className="overflow-hidden rounded-xl bg-white ring-1 ring-black/5">
            <iframe
              src={igEmbedUrl(it.url!)}
              title={it.caption || it.url}
              loading="lazy"
              scrolling="no"
              className="h-[620px] w-full"
            />
          </div>
        </div>
      ))}
    </div>
  )
}

function Placeholder({ type }: { type: string }) {
  const hints: Record<string, string> = {
    gallery: "Drop images/videos into this project's media/ folder and list them under this section in index.json.",
    grid: 'Add feed posts (square images) to show an Instagram-profile-style grid.',
    stories: 'Add Stories/Reels groups — each becomes its own phone mockup with a caption below.',
    embeds: 'Add public Instagram post/reel URLs to embed the real posts.',
    profile: 'Add a "profile" object (username, stats, bio, highlights) to show an Instagram-style profile card.',
    cards: 'Add "cards" (title, front, inside) to show a grid of cards you can click open, like the real thing.',
  }
  return (
    <div className="grid place-items-center rounded-2xl border-2 border-dashed border-charcoal/15 bg-blush-soft/30 px-6 py-10 text-center">
      <p className="max-w-md text-[13px] text-charcoal/50">{hints[type] ?? 'Add media in index.json.'}</p>
    </div>
  )
}
