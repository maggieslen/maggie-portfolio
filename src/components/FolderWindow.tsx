import { folders } from '../content'
import { ItemTile } from './ItemTile'
import { PhotosAlbum } from './PhotosAlbum'
import { AboutMe } from './AboutMe'
import { ClientWorkGrid } from './ClientWorkGrid'

/** The contents shown inside an opened folder window. */
export function FolderWindow({ refId }: { refId: string }) {
  const folder = folders.find((f) => f.id === refId)
  if (!folder) return null

  // The photos folder gets the iPhone shared-album experience.
  if (folder.id === 'photos') return <PhotosAlbum folder={folder} />

  // The about folder shows the headshot + links.
  if (folder.id === 'about') return <AboutMe />

  // The client-work folder shows the project grid.
  if (folder.id === 'clientwork') return <ClientWorkGrid />

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
