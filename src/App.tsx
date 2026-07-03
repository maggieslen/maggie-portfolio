import { Desktop } from './components/Desktop'
import { MobileView } from './components/MobileView'
import { useIsMobile } from './lib/useIsMobile'

/**
 * Top-level switch: the draggable desktop metaphor on larger screens,
 * a simplified tap-friendly list on phones/small tablets.
 */
export default function App() {
  const isMobile = useIsMobile()
  return isMobile ? <MobileView /> : <Desktop />
}
