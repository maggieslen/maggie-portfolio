import { music } from '../content'

/** Apple-Music-style player that embeds Maggie's real Spotify playlist. */
export function MusicWindow() {
  return (
    <div className="flex h-full">
      {/* sidebar (Apple Music vibe) */}
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

      {/* main */}
      <div className="mac-scroll flex-1 overflow-auto">
        <div className="mx-auto max-w-3xl p-6">
          <div className="flex items-end gap-4">
            <div className="h-28 w-28 shrink-0 rounded-xl bg-[linear-gradient(135deg,#e7c4cb,#c8d8e6_55%,#cbb58a)] shadow-md ring-1 ring-black/10" />
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-charcoal/40">
                Playlist
              </p>
              <h1 className="font-heading text-3xl leading-tight text-charcoal">
                {music.title}
              </h1>
              <p className="text-sm text-charcoal/55">{music.subtitle}</p>
            </div>
          </div>

          <div className="mt-6 overflow-hidden rounded-xl ring-1 ring-black/5">
            <iframe
              title={music.title}
              src={music.spotifyEmbed}
              width="100%"
              height="480"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
