import { widgets } from '../../content'
import { asset } from '../../lib/asset'

/**
 * Vintage point-and-shoot camera. The BODY is drawn in CSS for now — the
 * uploaded "digital-camera.png" was a duplicate of the iPod, so once you
 * upload a real camera graphic we'll swap the whole thing for an <img>.
 * The photo below shows on the camera's "screen".
 */
export function CameraWidget() {
  return (
    <div className="absolute left-8 top-11 w-[330px] select-none">
      <div className="rounded-[18px] bg-gradient-to-b from-gray-200 to-gray-400 p-3 shadow-xl ring-1 ring-black/10">
        <div className="flex gap-3">
          {/* screen — your real photo */}
          <div className="relative h-[168px] flex-1 overflow-hidden rounded-md ring-2 ring-gray-500/40">
            <img
              src={asset(widgets.camera.screenPhoto)}
              alt="Camera screen"
              draggable={false}
              className="h-full w-full object-cover"
            />
            <span className="absolute left-2 top-1.5 text-[10px] font-semibold tracking-wide text-white/90 drop-shadow">
              ● REC
            </span>
            <span className="absolute bottom-1.5 right-2 text-[10px] font-medium text-white/90 drop-shadow">
              12:34
            </span>
          </div>

          {/* control cluster */}
          <div className="flex w-[66px] flex-col items-center justify-between py-1">
            <div className="h-3.5 w-9 rounded-sm bg-gray-500/50" />
            <div className="relative h-14 w-14 rounded-full bg-gradient-to-b from-gray-100 to-gray-400 ring-1 ring-black/10">
              <div className="absolute inset-[7px] rounded-full bg-gray-300" />
              <div className="absolute inset-[19px] rounded-full bg-gray-500" />
            </div>
            <div className="flex gap-1.5">
              <div className="h-3 w-3 rounded-full bg-gray-500/70" />
              <div className="h-3 w-3 rounded-full bg-gray-500/70" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
