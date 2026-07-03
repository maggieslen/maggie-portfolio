import { widgets } from '../../content'
import { asset } from '../../lib/asset'

/** The scattered cluster of polaroids (a single pre-arranged, transparent image). */
export function PolaroidStack() {
  return (
    <div className="absolute right-[78px] top-[205px] w-[288px] select-none">
      <img
        src={asset(widgets.photoCluster)}
        alt="A cluster of polaroid photos"
        draggable={false}
        className="w-full drop-shadow-[0_10px_18px_rgba(0,0,0,0.12)]"
      />
    </div>
  )
}
