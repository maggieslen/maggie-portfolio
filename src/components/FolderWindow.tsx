import { folders } from '../content'
import { ItemTile } from './ItemTile'

/** The contents shown inside an opened folder window. */
export function FolderWindow({ refId }: { refId: string }) {
  const folder = folders.find((f) => f.id === refId)
  if (!folder) return null

  return (
    <div className="p-5">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {folder.items.map((item) => (
          <ItemTile key={item.id} item={item} accent={folder.accent} />
        ))}
      </div>
    </div>
  )
}
