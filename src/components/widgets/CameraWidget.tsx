import { useState } from 'react'
import { widgets } from '../../content'
import { asset } from '../../lib/asset'

/**
 * Vintage Sony point-and-shoot (transparent PNG, with a real photo on
 * its screen). Sits in the top-left of the desktop. Tapping the camera's
 * ▶ playback button cycles the screen through a few photos.
 */
export function CameraWidget() {
  const { images } = widgets.camera
  const [index, setIndex] = useState(0)

  return (
    <div className="absolute left-7 top-12 w-[360px] select-none">
      <div className="relative">
        <img
          src={asset(images[index])}
          alt="Camera showing a photo"
          draggable={false}
          className="w-full drop-shadow-[0_14px_28px_rgba(0,0,0,0.18)]"
        />
        {/* invisible hit target over the camera's printed ▶ playback button */}
        <button
          type="button"
          aria-label="Show next photo"
          onClick={() => setIndex((i) => (i + 1) % images.length)}
          className="absolute rounded-full"
          style={{ left: '74%', top: '39%', width: '13%', height: '16%' }}
        />
      </div>
    </div>
  )
}
