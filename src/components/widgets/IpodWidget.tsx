import { widgets } from '../../content'

/**
 * An iPod-nano-style music player. Static for now — the play button
 * becomes an interactive play/pause toggle in the polish step.
 */
export function IpodWidget() {
  return (
    <div className="absolute bottom-24 right-8 w-[300px] select-none">
      <div className="rounded-[22px] bg-gradient-to-b from-gray-100 to-gray-300 p-4 shadow-xl ring-1 ring-black/10">
        <div className="flex gap-4">
          {/* now-playing + transport */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2.5 rounded-lg bg-[#efe7dc] p-2 ring-1 ring-black/5">
              <div className="h-14 w-14 shrink-0 rounded bg-[linear-gradient(135deg,#2b3a67,#7a5c8e_55%,#c98aa0)] ring-1 ring-black/10" />
              <div className="min-w-0">
                <p className="truncate text-[11px] font-semibold text-charcoal">
                  {widgets.ipod.track}
                </p>
                <p className="truncate text-[10px] text-charcoal/60">
                  {widgets.ipod.artist}
                </p>
                <p className="truncate text-[9px] text-charcoal/40">
                  {widgets.ipod.album}
                </p>
              </div>
            </div>
            <div className="mt-2.5 flex items-center justify-center gap-6 text-[15px] text-charcoal/70">
              <span>⏮</span>
              <span className="text-[17px]">▶︎</span>
              <span>⏭</span>
            </div>
          </div>

          {/* click wheel */}
          <div className="flex w-[92px] shrink-0 flex-col items-center">
            <span className="mb-2 text-[10px] font-semibold tracking-[0.2em] text-charcoal/50">
              MUSIC
            </span>
            <div className="relative h-[92px] w-[92px] rounded-full bg-gradient-to-b from-white to-gray-200 shadow-inner ring-1 ring-black/10">
              <div className="absolute inset-[30px] rounded-full bg-gray-100 ring-1 ring-black/10" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
