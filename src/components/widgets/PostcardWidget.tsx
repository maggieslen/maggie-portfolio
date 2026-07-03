import { widgets } from '../../content'
import { asset } from '../../lib/asset'

/** The handwritten "YOU ARE ALL KINDS OF WONDERFUL" scrapbook card (uploaded image). */
export function PostcardWidget() {
  return (
    <div className="absolute left-9 top-[312px] w-[200px] -rotate-2 select-none">
      <img
        src={asset(widgets.postcard.image)}
        alt="You are all kinds of wonderful"
        draggable={false}
        className="w-full rounded-[6px] shadow-[0_10px_24px_rgba(0,0,0,0.15)] ring-1 ring-black/5"
      />
    </div>
  )
}
