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
    label: 'My Fav Shots',
    description:
      'Forever capturing the things I find pretty, featuring some of my favorite people and places.',
    position: { top: 70, right: 60 },
    accent: '#e7c4cb',
    // 📸 Your photography. `description` is the caption shown in the album —
    // edit these freely. Drop new files in public/photos and add a row.
    items: [
      { id: 'ph-colden-candid', title: 'Colden', kind: 'image', image: 'photos/colden-candid-cover.jpg', description: 'Good one, Colden' },
      { id: 'ph-italy', title: 'Italy', kind: 'image', image: 'photos/italy-flower-stand.jpg', description: 'Flower stand in Italy 🌸' },
      { id: 'ph-haley-liv', title: 'Haley & Liv', kind: 'image', image: 'photos/haley-liv.jpg', description: 'Backstage hugs 🩰' },
      { id: 'ph-whisper', title: 'A Quiet Moment', kind: 'image', image: 'photos/erica-ian-whisper.jpg', description: 'A quiet moment' },
      { id: 'ph-museum', title: 'At the Museum', kind: 'image', image: 'photos/museum-gallery.jpg', description: 'Wandering a gallery' },
      { id: 'ph-heads-will-roll', title: 'Heads Will Roll', kind: 'image', image: 'photos/heads-will-roll.jpg', description: 'The whole crew after the show' },
      { id: 'ph-walking', title: 'Erica & Ian', kind: 'image', image: 'photos/erica-ian-walking.jpg', description: 'Erica & Ian 🤍' },
      { id: 'ph-koehlers', title: 'The Koehlers', kind: 'image', image: 'photos/the-koehlers.jpg', description: 'The Koehlers' },
      { id: 'ph-fountain-bell-tower', title: 'Engineering Fountain x Bell Tower', kind: 'image', image: 'photos/engineering-fountain-bell-tower.jpg', description: 'Engineering Fountain x Bell Tower 🌸' },
      { id: 'ph-trevi', title: 'Trevi Fountain', kind: 'image', image: 'photos/trevi-fountain.jpg', description: 'Trevi Fountain at night' },
      { id: 'ph-boys', title: 'The Boys', kind: 'image', image: 'photos/boys-couch-cover.jpg', description: 'The boys 🛋️' },
      { id: 'ph-sarah-norah', title: 'Sarah & Norah', kind: 'image', image: 'photos/sarah-norah-cover.jpg', description: 'Sarah & Norah 🩷' },
      { id: 'ph-cali', title: 'California', kind: 'image', image: 'photos/california-beach.jpg', description: 'California coast ☀️' },
      { id: 'ph-semi', title: 'DU Semi', kind: 'image', image: 'photos/du-semi.jpg', description: 'DU semi-formal', href: 'https://www.instagram.com/p/DQpNPj2gVd-/' },
      { id: 'ph-fountain', title: 'Engineering Fountain', kind: 'image', image: 'photos/purdue-engineering-fountain.jpg', description: 'Engineering Fountain 💦' },
      { id: 'ph-bell-tower-blossoms', title: 'Bell Tower', kind: 'image', image: 'photos/purdue-bell-tower-blossoms-cover.jpg', description: 'Bell Tower through the blossoms 🌸' },
      { id: 'ph-camden', title: 'Camden', kind: 'image', image: 'photos/camden-candid-cover.jpg', description: 'Candid on court' },
      { id: 'ph-brody', title: 'Brody', kind: 'image', image: 'photos/brody-forehand-cover.jpg', description: 'Match point 🎾' },
      { id: 'ph-talan', title: 'Talan', kind: 'image', image: 'photos/talan-serve.jpg', description: 'Snider tennis 🎾' },
      { id: 'ph-fountain-trees', title: 'Engineering Mall', kind: 'image', image: 'photos/engineering-fountain-trees.jpg', description: 'Engineering Mall walkway' },
      { id: 'ph-pier', title: 'Pier at Sunset', kind: 'image', image: 'photos/pier-sunset.jpg', description: 'Pier at sunset 🌅' },
    ],
  },
  {
    id: 'about',
    label: 'About Me!',
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
      { id: 'a3', title: 'Resume', kind: 'link', description: 'My resume (PDF).', href: 'about/maggie-slen-resume.pdf' },
      { id: 'a4', title: 'Say hi', kind: 'link', description: 'Email or contact link.', href: 'mailto:maggie.slen42@gmail.com' },
    ],
  },
  {
    id: 'projects',
    label: 'Personal Projects',
    position: { top: 520, left: 365 },
    accent: '#aebca2',
    items: [
      {
        id: 'personal-project',
        title: 'Personal Social Media',
        kind: 'project',
        projectSlug: 'personal-project',
        icon: 'app-icons/instagram-doodle.png',
      },
      {
        id: 'digital-artwork',
        title: 'Digital Artwork',
        kind: 'project',
        projectSlug: 'digital-artwork',
        icon: 'app-icons/digital-artwork-doodle.png',
      },
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
    id: 'purdue',
    name: 'Purdue Brand Studio',
    icon: 'app-icons/Purdue.png',
    tagline: 'Boiler Ambassador',
    accent: '#cbb58a',
    description: 'Boiler Ambassador — capturing everyday Purdue life for Life at Purdue.',
    liveUrl: '#',
    projectSlug: 'purdue-brand-studio',
  },
  {
    id: 'dippin-daisys',
    name: 'Dippin Daisys',
    icon: 'app-icons/dippin-daisys.png',
    tagline: 'Mock Campaign',
    accent: '#cbb58a',
    description: 'A mock campaign for Dippin’ Daisys — story sets, a mock feed, and short-form content.',
    liveUrl: '#',
    projectSlug: 'dippin-daisies',
  },
  {
    id: 'dream-girl',
    name: 'Dream Girl',
    icon: 'app-icons/dream-girl.png',
    tagline: 'Social Media Intern',
    accent: '#c8d8e6',
    description: 'Social Media Intern at Dream Girl.',
    liveUrl: '#',
    projectSlug: 'dream-girl',
  },
  {
    id: 'letters-of-love',
    name: 'Letters of Love',
    icon: 'app-icons/letters-of-love.png',
    tagline: 'Design Intern',
    accent: '#d99aa6',
    description: 'Design Intern at Letters of Love.',
    liveUrl: '#',
    projectSlug: 'letters-of-love',
  },
  {
    id: 'purdue-pharmacy',
    name: 'Purdue Pre-Pharmacy Club',
    icon: 'app-icons/purdue-pre-pharmacy-club.png',
    tagline: 'Social Chair',
    accent: '#aebca2',
    description: 'Social Chair of the Purdue Pre-Pharmacy Club.',
    liveUrl: '#',
    projectSlug: 'purdue-pre-pharmacy-club',
  },
  {
    id: 'northeast-dance',
    name: 'Northeast School of Dance',
    icon: 'app-icons/northeast-school-of-dance.png',
    tagline: 'Design & Multimedia Creator',
    accent: '#e7c4cb',
    description: 'Design & Multimedia Creator at Northeast School of Dance.',
    liveUrl: '#',
    projectSlug: 'northeast-school-of-dance',
  },
]

/* ------------------------------------------------------------------ *
 * ABOUT ME  (headshot + links, shown in the "about me!" folder)
 * Replace the '#' links with your real URLs.
 * ------------------------------------------------------------------ */
export const about = {
  headshot: 'about/headshot.jpg',
  name: 'Maggie Slen',
  // Each string is its own paragraph.
  intro: [
    'Heyyyy, I’m Maggie! ✧',
    'I’m happiest when I’m creating, whether that’s making a TikTok, designing in Canva, taking photos, brainstorming ideas, or turning a random thought into something new. I find inspiration pretty much everywhere and love the little details that make something feel special.',
    'Outside of creating, you’ll usually find me listening to music on full blast and dancing around my room, drinking matcha, traveling, exploring new places, or having a good yap sesh. I love learning new things, picking up random skills like DJing, and meeting new people and hearing their stories.',
    'This portfolio is a little look inside my mind, from what inspires me and what I create to the music I have on repeat and the people I look up to. Click around, explore, and see what you find ♡',
  ],
  links: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/maggie-slen', icon: '💼' },
    { label: 'Resume', href: 'about/maggie-slen-resume.pdf', icon: '📄' },
    { label: 'Email', href: 'mailto:maggie.slen42@gmail.com', icon: '✉️' },
    { label: 'Instagram', href: 'https://www.instagram.com/maggie.slen/', icon: '📸' },
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
 * PHONE HOME SCREEN  (what visitors see on a phone)
 * Apps are listed by their `id` from the dock apps above.
 * ------------------------------------------------------------------ */
export const mobile = {
  // Big photo widget at the top (tap it → about me).
  hero: 'mobile/hero-field.jpg',
  // The row of four apps under the photo.
  topRow: ['purdue', 'dippin-daisys', 'dream-girl', 'letters-of-love'],
  // The apps beside the music widget (Photos is added after these).
  sideApps: ['purdue-pharmacy', 'northeast-dance'],
  // Dock icons (hand-drawn doodles, shown on a cream tile).
  aboutIcon: 'app-icons/about-me-doodle.png',
  socialIcon: 'app-icons/instagram-doodle.png',
  artworkIcon: 'app-icons/digital-artwork-doodle.png',
}

/* ------------------------------------------------------------------ *
 * DECORATIVE WIDGETS  (not folders — just personality)
 * ------------------------------------------------------------------ */
export const widgets = {
  // Sony point-and-shoot (transparent PNGs) with a real photo on its screen.
  // Click its ▶ playback button to cycle through them, like flipping through
  // shots on the camera's screen.
  camera: {
    images: [
      'elements/sony-camera-1.png',
      'elements/sony-camera-2.png',
      'elements/sony-camera-3.png',
      'elements/sony-camera-4.png',
    ],
  },
  // "You are so loved" hand-drawn card (cropped from the uploaded art).
  postcard: {
    image: 'elements/you-are-so-loved.jpg',
  },
  // iPod image + what shows on its little screen.
  ipod: {
    image: 'elements/music-widget.png',
    // Hand-drawn playlist cover shown on the player (desktop + phone).
    cover: 'elements/album-cover.png',
    track: 'Someone To You',
    artist: 'BANNERS',
    album: 'Where the Shadow Ends',
  },
  // Dusty-rose folder icon used across the desktop.
  folderIcon: 'elements/folder.png',
  // Pre-arranged cluster of polaroids (a single transparent image).
  photoCluster: 'elements/polaroid-cluster.png',
}
