/**
 * The dusty-rose macOS-style folder icon, drawn as SVG so it stays
 * crisp at any size. Used on the desktop and in the mobile list.
 */
export function FolderGlyph({ size = 76 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size * (60 / 76)}
      viewBox="0 0 76 60"
      fill="none"
      className="drop-shadow-[0_3px_4px_rgba(0,0,0,0.15)]"
      aria-hidden="true"
    >
      {/* back panel + tab */}
      <path
        d="M4 10c0-2.2 1.8-4 4-4h16.8c1.5 0 2.9.83 3.6 2.15l1.9 3.7c.7 1.32 2.1 2.15 3.6 2.15H68c2.2 0 4 1.8 4 4v33c0 2.2-1.8 4-4 4H8c-2.2 0-4-1.8-4-4V10z"
        fill="#b06f83"
      />
      {/* front pocket */}
      <path
        d="M0 21c0-2.2 1.8-4 4-4h68c2.2 0 4 1.8 4 4v31c0 2.2-1.8 4-4 4H4c-2.2 0-4-1.8-4-4V21z"
        fill="#cd8f9f"
      />
      {/* subtle top highlight */}
      <path
        d="M4 19.5h68"
        stroke="#e2b3c0"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.7"
      />
    </svg>
  )
}
