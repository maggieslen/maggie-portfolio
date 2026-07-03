import { about } from '../content'
import { asset } from '../lib/asset'

/** Contents of the "about me!" folder — headshot, intro, and links. */
export function AboutMe() {
  return (
    <div className="p-6">
      <div className="flex flex-col items-center text-center">
        <img
          src={asset(about.headshot)}
          alt={about.name}
          draggable={false}
          className="h-28 w-28 rounded-full object-cover shadow-md ring-2 ring-white"
        />
        <h2 className="mt-3 font-heading text-2xl leading-tight text-charcoal">
          {about.name}
        </h2>
        <p className="mt-2 max-w-md text-[13px] leading-relaxed text-charcoal/75">
          {about.intro}
        </p>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-2.5">
        {about.links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            target={l.href.startsWith('mailto') ? undefined : '_blank'}
            rel="noreferrer"
            className="flex items-center gap-2 rounded-xl bg-blush-soft/60 px-3 py-2.5 text-[13px] font-medium text-charcoal ring-1 ring-black/5 transition hover:bg-blush-soft"
          >
            <span aria-hidden="true">{l.icon}</span>
            {l.label}
          </a>
        ))}
      </div>
    </div>
  )
}
