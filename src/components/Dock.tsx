/**
 * The bottom dock. Empty for now — flagship-project "app" icons get
 * added here in the next step. Kept as its own component so wiring in
 * the apps later is a one-file change.
 */
export function Dock() {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-3 z-[9000] flex justify-center px-4">
      <div className="pointer-events-auto h-16 w-full max-w-[860px] rounded-2xl border border-white/60 bg-dock/50 shadow-[0_8px_30px_rgba(0,0,0,0.12)] backdrop-blur-md" />
    </div>
  )
}
