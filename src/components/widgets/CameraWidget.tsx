import { widgets } from '../../content'
import { asset } from '../../lib/asset'

/**
 * Vintage point-and-shoot camera — a realistic photo cropped from the
 * mockup (Sony body with a real photo on its screen). Its pink margins
 * blend into the matching desktop background, so no CSS shadow is needed.
 */
export function CameraWidget() {
  return (
    <div className="absolute left-7 top-11 w-[368px] select-none">
      <img
        src={asset(widgets.camera.image)}
        alt="Camera showing a photo"
        draggable={false}
        className="w-full"
      />
    </div>
  )
}
