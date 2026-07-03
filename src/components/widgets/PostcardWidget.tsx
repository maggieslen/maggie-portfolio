import { widgets } from '../../content'
import { asset } from '../../lib/asset'

/** The hand-drawn "you are so loved" card (cropped from the uploaded art). */
export function PostcardWidget() {
  return (
    <div className="absolute left-8 top-[300px] w-[236px] -rotate-2 select-none">
      <img
        src={asset(widgets.postcard.image)}
        alt="You are so loved — with love, Maggie"
        draggable={false}
        className="w-full rounded-[8px] shadow-[0_10px_24px_rgba(0,0,0,0.15)] ring-1 ring-black/5"
      />
    </div>
  )
}
