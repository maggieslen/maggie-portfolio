import type { AppProject, Folder } from './types'

/* ================================================================== *
 *  ✏️  THIS IS THE ONLY FILE YOU NEED TO EDIT TO ADD YOUR CONTENT.
 *
 *  - Change the text, add/remove items, and point `image` fields at
 *    files you drop into the `public/` folder (e.g. put a file at
 *    public/photos/beach.jpg and set image: 'photos/beach.jpg').
 *  - Items with no `image` show a pretty colored placeholder tile,
 *    so everything looks intentional until you swap in real media.
 *  - Everything below is placeholder content — safe to overwrite.
 * ================================================================== */

/** Your name / the title shown in the top-left of the menu bar. */
export const SITE_TITLE = "Maggie's Portfolio!"

/* ------------------------------------------------------------------ *
 * DESKTOP FOLDERS
 * The four folder icons on the desktop. Positions are tuned to match
 * the mockup; tweak `position` to move an icon around.
 * ------------------------------------------------------------------ */
export const folders: Folder[] = [
  {
    id: 'photos',
    label: 'photos!',
    position: { top: 70, right: 150 },
    accent: '#e7c4cb',
    items: [
      { id: 'p1', title: 'Poppy field', kind: 'image', image: 'photos/field.jpg' },
      { id: 'p2', title: 'Beach day', kind: 'image', image: 'photos/beach.jpg' },
      { id: 'p3', title: 'Spin', kind: 'image', image: 'photos/spin.jpg' },
      { id: 'p4', title: 'Campus', kind: 'image', image: 'photos/purdue.jpg' },
      { id: 'p5', title: 'Add your own', kind: 'image', description: 'Drop a file in public/photos and set its name here.' },
      { id: 'p6', title: 'Add your own', kind: 'image', description: 'Placeholder photo.' },
    ],
  },
  {
    id: 'ugc',
    label: 'ugc content',
    position: { top: 120, right: 30 },
    accent: '#d99aa6',
    items: [
      { id: 'u1', title: 'Skincare reel', kind: 'link', description: 'Short-form video — add your link.', href: '#' },
      { id: 'u2', title: 'GRWM', kind: 'link', description: 'Get-ready-with-me collab.', href: '#' },
      { id: 'u3', title: 'Cafe review', kind: 'link', description: 'Brand partnership sample.', href: '#' },
      { id: 'u4', title: 'Haul video', kind: 'link', description: 'Try-on haul.', href: '#' },
    ],
  },
  {
    id: 'about',
    label: 'about me!',
    position: { top: 405, left: 300 },
    accent: '#c8d8e6',
    items: [
      {
        id: 'a1',
        title: 'Hi, I’m Maggie 👋',
        kind: 'note',
        description:
          'Placeholder intro. Tell your story here — who you are, what you make, and what you’re looking for. This card is a great spot for a friendly hello.',
      },
      {
        id: 'a2',
        title: 'What I do',
        kind: 'note',
        description:
          'A few sentences about your focus — content creation, design, coding, photography… whatever you want to lead with.',
      },
      { id: 'a3', title: 'Resume', kind: 'link', description: 'Link your resume / CV.', href: '#' },
      { id: 'a4', title: 'Say hi', kind: 'link', description: 'Email or contact link.', href: 'mailto:maggie.slen42@gmail.com' },
    ],
  },
  {
    id: 'projects',
    label: 'personal projects',
    position: { top: 520, left: 365 },
    accent: '#aebca2',
    items: [
      { id: 'pr1', title: 'Side project one', kind: 'note', description: 'Short write-up placeholder. What it is + what you learned.' },
      { id: 'pr2', title: 'Side project two', kind: 'note', description: 'Another small project.' },
      { id: 'pr3', title: 'Experiment', kind: 'link', description: 'Link to a repo or live demo.', href: '#' },
    ],
  },
]

/* ------------------------------------------------------------------ *
 * DOCK APPS  (flagship projects)
 * These are the bigger, featured projects. Each opens a larger window
 * with a case-study layout + live/code links. Placeholder for now —
 * swap in your real flagship work.
 * ------------------------------------------------------------------ */
export const apps: AppProject[] = [
  {
    id: 'northeast-dance',
    name: 'Northeast School of Dance',
    icon: 'app-icons/northeast-school-of-dance.png',
    tagline: 'Dance',
    accent: '#e7c4cb',
    description:
      'Placeholder — add your role (dancer / instructor), what you did, highlights, and a link to the studio.',
    liveUrl: '#',
  },
  {
    id: 'letters-of-love',
    name: 'Letters of Love',
    icon: 'app-icons/letters-of-love.png',
    tagline: 'Nonprofit',
    accent: '#d99aa6',
    description:
      'Placeholder — describe your involvement and impact, and link the organization.',
    liveUrl: '#',
  },
  {
    id: 'dream-girl',
    name: 'Dream Girl',
    icon: 'app-icons/dream-girl.png',
    tagline: 'Brand',
    accent: '#c8d8e6',
    description: 'Placeholder — your role / collaboration details go here.',
    liveUrl: '#',
  },
  {
    id: 'dippin-daisys',
    name: "Dippin' Daisy's",
    icon: 'app-icons/dippin-daisys.png',
    tagline: 'Brand',
    accent: '#cbb58a',
    description: 'Placeholder — your role / collaboration details go here.',
    liveUrl: '#',
  },
  {
    id: 'purdue-pharmacy',
    name: 'Purdue Pre-Pharmacy Club',
    icon: 'app-icons/purdue-pre-pharmacy-club.png',
    tagline: 'Club',
    accent: '#aebca2',
    description: 'Placeholder — your role and what you did in the club.',
    liveUrl: '#',
  },
  {
    id: 'purdue',
    name: 'Purdue Brand Studio',
    icon: 'app-icons/Purdue.png',
    tagline: 'Brand Studio',
    accent: '#cbb58a',
    description: 'Placeholder — your role at Purdue Brand Studio and the work you did.',
    liveUrl: '#',
  },
]

/* ------------------------------------------------------------------ *
 * DECORATIVE WIDGETS  (not folders — just personality)
 * ------------------------------------------------------------------ */
export const widgets = {
  // Sony point-and-shoot (transparent PNG) with a real photo on its screen.
  camera: {
    image: 'elements/sony-camera.png',
  },
  // "You are so loved" hand-drawn card (cropped from the uploaded art).
  postcard: {
    image: 'elements/you-are-so-loved.jpg',
  },
  // iPod image + what shows on its little screen.
  ipod: {
    image: 'elements/ipod.png',
    track: 'Someday, Someday',
    artist: 'BANNERS',
    album: 'Where the Shadow Ends',
  },
  // Dusty-rose folder icon used across the desktop.
  folderIcon: 'elements/folder.png',
  // Pre-arranged cluster of polaroids (a single transparent image).
  photoCluster: 'elements/polaroid-cluster.png',
}
