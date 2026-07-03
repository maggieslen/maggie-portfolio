/**
 * A stylized vintage point-and-shoot camera with a "photo" on its
 * screen. Static for now — later it can cycle through real photos on
 * click. Drop a real image in and swap the gradient for an <img>.
 */
export function CameraWidget() {
  return (
    <div className="absolute left-8 top-11 w-[330px] select-none">
      <div className="rounded-[18px] bg-gradient-to-b from-gray-200 to-gray-400 p-3 shadow-xl ring-1 ring-black/10">
        <div className="flex gap-3">
          {/* screen / photo */}
          <div className="relative h-[168px] flex-1 overflow-hidden rounded-md ring-2 ring-gray-500/40">
            <div className="h-full w-full bg-[linear-gradient(160deg,#cfe0f2_0%,#f6c9a0_45%,#e88fae_70%,#8bbf74_100%)]" />
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
