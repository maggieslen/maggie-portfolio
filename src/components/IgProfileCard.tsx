import { asset } from '../lib/asset'
import { cwMedia } from '../lib/clientWork'
import type { CwItem, CwProfile } from '../lib/clientWork'

/**
 * An Instagram-desktop-style profile card — avatar, stats, bio, highlights,
 * and a post grid — recolored into the site's own brand palette instead of
 * Instagram's dark theme. Used for the "profile" section type.
 */
export function IgProfileCard({
  slug,
  profile,
  items,
}: {
  slug: string
  profile: CwProfile
  items: CwItem[]
}) {
  return (
    <div className="overflow-hidden rounded-[24px] bg-white ring-1 ring-black/5">
      <div className="p-6 sm:p-8">
        {/* header */}
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
          <div className="rounded-full bg-[linear-gradient(135deg,#d99aa6,#cbb58a_50%,#c8d8e6)] p-[3px]">
            <div className="rounded-full bg-white p-[3px]">
              {profile.avatar ? (
                <img
                  src={asset(profile.avatar)}
                  alt={profile.username}
                  className="h-24 w-24 rounded-full object-cover sm:h-28 sm:w-28"
                />
              ) : (
                <div className="grid h-24 w-24 place-items-center rounded-full bg-blush-soft font-heading text-2xl text-charcoal/60 sm:h-28 sm:w-28">
                  {profile.username.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
          </div>

          <div className="min-w-0 flex-1 text-center sm:text-left">
            <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-start">
              {profile.instagramUrl ? (
                <a
                  href={profile.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-lg font-semibold text-charcoal hover:underline"
                >
                  {profile.username}
                </a>
              ) : (
                <h3 className="text-lg font-semibold text-charcoal">{profile.username}</h3>
              )}
              <a
                href={profile.instagramUrl || '#'}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg bg-garden-bloom px-4 py-1.5 text-[13px] font-medium text-white transition hover:brightness-105"
              >
                Follow
              </a>
              <button
                type="button"
                className="rounded-lg bg-champagne-cream/50 px-4 py-1.5 text-[13px] font-medium text-charcoal transition hover:bg-champagne-cream/70"
              >
                Message
              </button>
            </div>

            <div className="mt-3 flex justify-center gap-6 text-[14px] sm:justify-start">
              <span><b className="text-charcoal">{profile.stats.posts}</b> <span className="text-charcoal/55">posts</span></span>
              <span><b className="text-charcoal">{profile.stats.followers}</b> <span className="text-charcoal/55">followers</span></span>
              <span><b className="text-charcoal">{profile.stats.following}</b> <span className="text-charcoal/55">following</span></span>
            </div>

            {profile.displayName && (
              <p className="mt-3 text-[14px] font-semibold text-charcoal">{profile.displayName}</p>
            )}
            {profile.bio?.map((line, i) => (
              <p key={i} className="text-[14px] text-charcoal/75">{line}</p>
            ))}
            {profile.link && (
              <a
                href={`https://${profile.link}`}
                target="_blank"
                rel="noreferrer"
                className="mt-1 inline-block text-[14px] font-medium text-[#a85d72]"
              >
                🔗 {profile.link}
              </a>
            )}
          </div>
        </div>

        {/* highlights */}
        {profile.highlights && profile.highlights.length > 0 && (
          <div className="mt-7 flex justify-center gap-5 overflow-x-auto sm:justify-start">
            {profile.highlights.map((h, i) => (
              <div key={i} className="flex shrink-0 flex-col items-center gap-1.5">
                {h.image ? (
                  <img
                    src={cwMedia(slug, h.image)}
                    alt={h.label}
                    className="h-14 w-14 rounded-full object-cover ring-2 ring-champagne-cream"
                  />
                ) : (
                  <div className="grid h-14 w-14 place-items-center rounded-full bg-blush-soft ring-2 ring-champagne-cream">
                    <span className="text-lg">✨</span>
                  </div>
                )}
                <span className="max-w-[64px] truncate text-[11px] text-charcoal/60">{h.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* grid tab + posts */}
      <div className="border-t border-charcoal/10">
        <div className="flex justify-center border-b border-charcoal/10 py-2.5">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-charcoal/70">
            ⊞ Posts
          </span>
        </div>
        <div className="grid grid-cols-3 gap-0.5 sm:gap-1">
          {items.map((it, i) => (
            <div key={i} className="aspect-square overflow-hidden">
              <img
                src={cwMedia(slug, it.src!)}
                alt={it.caption || ''}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
