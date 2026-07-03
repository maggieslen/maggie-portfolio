import { widgets } from '../../content'

const LAYOUT = [
  { rotate: -9, left: 0, top: 18, gradient: 'linear-gradient(160deg,#f6c9a0,#e88fae)' },
  { rotate: 5, left: 46, top: 0, gradient: 'linear-gradient(160deg,#cfe0f2,#8bbf74)' },
  { rotate: -3, left: 84, top: 58, gradient: 'linear-gradient(160deg,#e6b7d6,#b39ad8)' },
]

/** Three overlapping Polaroid-style photos, scattered on the desktop. */
export function PolaroidStack() {
  return (
    <div className="absolute right-[80px] top-[228px] h-[220px] w-[250px] select-none">
      {LAYOUT.map((p, i) => (
        <div
          key={i}
          className="absolute w-[120px] rounded-[3px] bg-white p-2 pb-6 shadow-lg ring-1 ring-black/5"
          style={{
            left: p.left,
            top: p.top,
            transform: `rotate(${p.rotate}deg)`,
          }}
        >
          <div
            className="h-[104px] w-full rounded-[2px]"
            style={{ background: p.gradient }}
          />
          <span className="absolute bottom-1 left-0 right-0 text-center text-[10px] italic text-charcoal/60">
            {widgets.polaroids[i]}
          </span>
        </div>
      ))}
    </div>
  )
}
