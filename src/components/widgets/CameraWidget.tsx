import { widgets } from '../../content'
import { asset } from '../../lib/asset'

/**
 * Vintage Sony point-and-shoot (transparent PNG, with a real photo on
 * its screen). Sits in the top-left of the desktop.
 */
export function CameraWidget() {
  return (
    <div className="absolute left-7 top-12 w-[360px] select-none">
      <img
        src={asset(widgets.camera.image)}
        alt="Camera showing a photo"
        draggable={false}
        className="w-full drop-shadow-[0_14px_28px_rgba(0,0,0,0.18)]"
      />
    </div>
  )
}
