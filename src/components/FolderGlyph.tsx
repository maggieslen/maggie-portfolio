import { widgets } from '../content'
import { asset } from '../lib/asset'

/**
 * The dusty-rose folder icon (uploaded image). Used on the desktop and
 * in the mobile list. Swap the file at public/elements/folder.png (or the
 * `folderIcon` path in content.ts) to change it everywhere.
 */
export function FolderGlyph({ size = 82 }: { size?: number }) {
  return (
    <img
      src={asset(widgets.folderIcon)}
      alt=""
      aria-hidden="true"
      draggable={false}
      className="drop-shadow-[0_3px_4px_rgba(0,0,0,0.12)] select-none"
      style={{ width: size, height: 'auto' }}
    />
  )
}
