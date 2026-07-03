import { apps } from '../content'
import { asset } from '../lib/asset'

/** Contents shown inside an opened dock "app" (organization) window. */
export function AppWindow({ refId }: { refId: string }) {
  const app = apps.find((a) => a.id === refId)
  if (!app) return null

  return (
    <div className="p-6">
      <div className="flex items-center gap-4">
        <img
          src={asset(app.icon)}
          alt=""
          draggable={false}
          className="h-16 w-16 rounded-[24%] bg-white object-cover shadow ring-1 ring-black/10"
        />
        <div>
          <h2 className="font-heading text-2xl leading-tight text-charcoal">
            {app.name}
          </h2>
          <p className="text-sm text-charcoal/55">{app.tagline}</p>
        </div>
      </div>

      {app.image && (
        <img
          src={asset(app.image)}
          alt={app.name}
          className="mt-5 w-full rounded-xl object-cover ring-1 ring-black/5"
        />
      )}

      <p className="mt-4 text-[14px] leading-relaxed text-charcoal/80">
        {app.description}
      </p>

      {(app.liveUrl || app.codeUrl) && (
        <div className="mt-5 flex gap-3">
          {app.liveUrl && (
            <a
              href={app.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-garden-bloom px-4 py-2 text-sm font-medium text-white transition hover:brightness-105"
            >
              Visit ↗
            </a>
          )}
          {app.codeUrl && (
            <a
              href={app.codeUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-charcoal/10 px-4 py-2 text-sm font-medium text-charcoal transition hover:bg-charcoal/15"
            >
              Details
            </a>
          )}
        </div>
      )}
    </div>
  )
}
