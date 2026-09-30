import { useEffect } from 'react'
import { AnimatePresence } from 'motion/react'
import { folders } from '../content'
import { isFullscreenWindow, useWindowStore } from '../store/windowStore'
import { MenuBar } from './MenuBar'
import { FolderIcon } from './FolderIcon'
import { Dock } from './Dock'
import { Window } from './Window'
import { FolderWindow } from './FolderWindow'
import { AppWindow } from './AppWindow'
import { MusicWindow } from './MusicWindow'
import { ProjectWindow } from './ProjectWindow'
import { CameraWidget } from './widgets/CameraWidget'
import { PostcardWidget } from './widgets/PostcardWidget'
import { PolaroidStack } from './widgets/PolaroidStack'
import { IpodWidget } from './widgets/IpodWidget'

// Open "about me!" once per visit, so it greets people on first load.
let greeted = false

/** The full-screen macOS-style desktop. */
export function Desktop() {
  const windows = useWindowStore((s) => s.windows)
  const openWindow = useWindowStore((s) => s.openWindow)

  useEffect(() => {
    if (greeted) return
    greeted = true
    openWindow('folder', 'about')
  }, [openWindow])

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
            fullscreen={isFullscreenWindow(win)}
            // The about me window is roomier so the links show without scrolling.
            size={win.kind === 'folder' && win.refId === 'about' ? { width: 720, height: 600 } : undefined}
          >
            {win.kind === 'folder' ? (
              <FolderWindow refId={win.refId} />
            ) : win.kind === 'music' ? (
              <MusicWindow />
            ) : win.kind === 'project' ? (
              <ProjectWindow refId={win.refId} />
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
