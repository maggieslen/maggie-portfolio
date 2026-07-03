import { apps } from '../content'
import { asset } from '../lib/asset'

/** Full-screen contents for an opened dock "app" (organization). */
export function AppWindow({ refId }: { refId: string }) {
  const app = apps.find((a) => a.id === refId)
  if (!app) return null

  return (
    <div className="mx-auto w-full max-w-3xl px-8 py-12">
      <div className="flex items-center gap-5">
        <img
          src={asset(app.icon)}
          alt=""
          draggable={false}
          className="h-20 w-20 rounded-[24%] bg-white object-cover shadow ring-1 ring-black/10"
        />
        <div>
          <h1 className="font-heading text-4xl leading-tight text-charcoal">
            {app.name}
          </h1>
          <p className="mt-1 text-charcoal/55">{app.tagline}</p>
        </div>
      </div>

      {app.image && (
        <img
          src={asset(app.image)}
          alt={app.name}
          className="mt-8 w-full rounded-2xl object-cover ring-1 ring-black/5"
        />
      )}

      <p className="mt-7 max-w-2xl text-[15px] leading-relaxed text-charcoal/80">
        {app.description}
      </p>

      {(app.liveUrl || app.codeUrl) && (
        <div className="mt-7 flex gap-3">
          {app.liveUrl && (
            <a
              href={app.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-garden-bloom px-5 py-2.5 text-sm font-medium text-white transition hover:brightness-105"
            >
              Visit ↗
            </a>
          )}
          {app.codeUrl && (
            <a
              href={app.codeUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-charcoal/10 px-5 py-2.5 text-sm font-medium text-charcoal transition hover:bg-charcoal/15"
            >
              Details
            </a>
          )}
        </div>
      )}
    </div>
  )
}
