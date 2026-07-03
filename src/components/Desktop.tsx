import { AnimatePresence } from 'motion/react'
import { folders } from '../content'
import { useWindowStore } from '../store/windowStore'
import { MenuBar } from './MenuBar'
import { FolderIcon } from './FolderIcon'
import { Dock } from './Dock'
import { Window } from './Window'
import { FolderWindow } from './FolderWindow'
import { AppWindow } from './AppWindow'
import { CameraWidget } from './widgets/CameraWidget'
import { PostcardWidget } from './widgets/PostcardWidget'
import { PolaroidStack } from './widgets/PolaroidStack'
import { IpodWidget } from './widgets/IpodWidget'

/** The full-screen macOS-style desktop. */
export function Desktop() {
  const windows = useWindowStore((s) => s.windows)

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-blush">
      <MenuBar />

      {/* decorative, non-folder personality widgets */}
      <CameraWidget />
      <PostcardWidget />
      <PolaroidStack />
      <IpodWidget />

      {/* clickable folders */}
      {folders.map((folder) => (
        <FolderIcon key={folder.id} folder={folder} />
      ))}

      {/* open windows (folders now; apps added with the dock) */}
      <AnimatePresence>
        {windows.map((win, index) => (
          <Window
            key={win.id}
            win={win}
            index={index}
            fullscreen={win.kind === 'app'}
          >
            {win.kind === 'folder' ? (
              <FolderWindow refId={win.refId} />
            ) : (
              <AppWindow refId={win.refId} />
            )}
          </Window>
        ))}
      </AnimatePresence>

      <Dock />
    </div>
  )
}
