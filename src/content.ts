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
    // 📸 Your photography. `description` is the caption shown in the album —
    // edit these freely. Drop new files in public/photos and add a row.
    items: [
      { id: 'ph-italy', title: 'Italy', kind: 'image', image: 'photos/italy-flower-stand.jpg', description: 'flower stand in italy 🌸' },
      { id: 'ph-cali', title: 'California', kind: 'image', image: 'photos/california-beach.jpg', description: 'california coast ☀️' },
      { id: 'ph-fountain', title: 'Engineering Fountain', kind: 'image', image: 'photos/purdue-engineering-fountain.jpg', description: 'engineering fountain 💦' },
      { id: 'ph-hovde', title: 'Hovde Hall', kind: 'image', image: 'photos/purdue-hovde-hall.jpg', description: 'hovde hall at golden hour' },
      { id: 'ph-walking', title: 'Erica & Ian', kind: 'image', image: 'photos/erica-ian-walking.jpg', description: 'erica & ian 🤍' },
      { id: 'ph-whisper', title: 'A Quiet Moment', kind: 'image', image: 'photos/erica-ian-whisper.jpg', description: 'a quiet moment' },
      { id: 'ph-semi', title: 'DU Semi', kind: 'image', image: 'photos/du-semi.jpg', description: 'du semi-formal' },
      { id: 'ph-boys', title: 'The Boys', kind: 'image', image: 'photos/boys-couch.jpg', description: 'the boys 🛋️' },
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
      {
        id: 'personal-project',
        title: 'Personal Project',
        kind: 'project',
        projectSlug: 'personal-project',
        description: 'A personal creative project.',
      },
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
    projectSlug: 'northeast-school-of-dance',
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
    projectSlug: 'dippin-daisies',
  },
  {
    id: 'purdue-pharmacy',
    name: 'Purdue Pre-Pharmacy Club',
    icon: 'app-icons/purdue-pre-pharmacy-club.png',
    tagline: 'Club',
    accent: '#aebca2',
    description: 'Placeholder — your role and what you did in the club.',
    liveUrl: '#',
    projectSlug: 'purdue-pre-pharmacy-club',
  },
  {
    id: 'purdue',
    name: 'Purdue Brand Studio',
    icon: 'app-icons/Purdue.png',
    tagline: 'Brand Studio',
    accent: '#cbb58a',
    description: 'Placeholder — your role at Purdue Brand Studio and the work you did.',
    liveUrl: '#',
    projectSlug: 'purdue-brand-studio',
  },
]

/* ------------------------------------------------------------------ *
 * ABOUT ME  (headshot + links, shown in the "about me!" folder)
 * Replace the '#' links with your real URLs.
 * ------------------------------------------------------------------ */
export const about = {
  headshot: 'about/headshot.jpg',
  name: 'Maggie Slen',
  intro:
    'Hi, I’m Maggie! Placeholder intro — a few warm sentences about who you are, what you love creating, and what you’re looking for. Edit me in src/content.ts.',
  links: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/maggie-slen', icon: '💼' },
    { label: 'Instagram', href: 'https://www.instagram.com/maggie.slen/', icon: '📸' },
    { label: 'Email', href: 'mailto:maggie.slen42@gmail.com', icon: '✉️' },
    { label: 'Purdue Email', href: 'mailto:mslen@purdue.edu', icon: '🎓' },
    { label: 'Resume', href: '#', icon: '📄' },
  ],
}

/* ------------------------------------------------------------------ *
 * MUSIC  (the iPod opens a player that embeds this Spotify playlist)
 * ------------------------------------------------------------------ */
export const music = {
  // Matches the real playlist name (also shown in the sidebar).
  title: 'borrow my headphones 🎧',
  // Apple Music playlist embed — the single source of the cover art, title,
  // and playback (Apple resolves by the "pl...." id; the name in the URL is
  // cosmetic). To change it, grab a new share link from music.apple.com.
  embed:
    'https://embed.music.apple.com/us/playlist/borrow-my-headphones/pl.u-PDb44lgFLNEY53r',
}

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
