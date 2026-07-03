import { widgets } from '../../content'

/** The handwritten "YOU ARE ALL KINDS OF WONDERFUL" scrapbook card. */
export function PostcardWidget() {
  return (
    <div className="absolute left-9 top-[318px] w-[205px] -rotate-2 select-none">
      <div className="relative rounded-md bg-[#f3efe6] p-5 shadow-lg ring-1 ring-black/10">
        <div className="pointer-events-none absolute inset-[7px] rounded-[4px] border-2 border-dashed border-[#9fb7d4]" />
        <div className="relative flex flex-col items-center gap-1.5 py-3">
          {widgets.postcard.lines.map((line, i) => (
            <span
              key={i}
              className="font-serif text-[21px] font-bold italic leading-none tracking-wide text-[#6b83c4]"
            >
              {line}
            </span>
          ))}
        </div>
        <span className="absolute left-2 top-1.5 text-sm">⭐</span>
        <span className="absolute right-2.5 top-2.5 text-sm">🍒</span>
        <span className="absolute bottom-2.5 left-3 text-sm">🍒</span>
        <span className="absolute bottom-1.5 right-2.5 text-sm">⭐</span>
      </div>
    </div>
  )
}
