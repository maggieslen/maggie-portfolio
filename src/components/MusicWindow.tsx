import { music } from '../content'

/**
 * Apple-Music-style player. The embedded player is the single source of the
 * cover art, title, creator, and playback — we just frame it with a sidebar.
 */
export function MusicWindow() {
  return (
    <div className="flex h-full">
      {/* sidebar (music-app vibe) */}
      <aside className="hidden w-52 shrink-0 flex-col border-r border-black/5 bg-blush-soft/40 p-4 sm:flex">
        <h2 className="font-heading text-2xl text-charcoal">Music</h2>
        <nav className="mt-4 space-y-0.5 text-[13px] text-charcoal/70">
          {['Listen Now', 'Browse', 'Radio'].map((x) => (
            <div key={x} className="rounded-md px-2 py-1 hover:bg-black/5">
              {x}
            </div>
          ))}
        </nav>
        <p className="mt-5 px-2 text-[11px] font-semibold uppercase tracking-wide text-charcoal/40">
          Playlists
        </p>
        <div className="mt-1 rounded-md bg-garden-bloom/15 px-2 py-1 text-[13px] font-medium text-[#a85d72]">
          {music.title}
        </div>
      </aside>

      {/* the player embed fills the rest */}
      <div className="flex-1 p-4">
        <iframe
          title={music.title}
          src={music.embed}
          className="h-full w-full rounded-xl ring-1 ring-black/5"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        />
      </div>
    </div>
  )
}
