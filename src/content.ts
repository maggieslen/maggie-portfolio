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
    accent: '#e8a7bd',
    items: [
      { id: 'p1', title: 'Poppy field', kind: 'image', description: 'Placeholder — swap in a favorite photo.' },
      { id: 'p2', title: 'Golden hour', kind: 'image', description: 'Placeholder photo.' },
      { id: 'p3', title: 'City walk', kind: 'image', description: 'Placeholder photo.' },
      { id: 'p4', title: 'Coffee run', kind: 'image', description: 'Placeholder photo.' },
      { id: 'p5', title: 'Sunday flowers', kind: 'image', description: 'Placeholder photo.' },
      { id: 'p6', title: 'Road trip', kind: 'image', description: 'Placeholder photo.' },
    ],
  },
  {
    id: 'ugc',
    label: 'ugc content',
    position: { top: 120, right: 30 },
    accent: '#d79ac0',
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
    accent: '#e6a9b4',
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
    accent: '#d59ac2',
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
    id: 'app-portfolio',
    name: 'This Portfolio',
    icon: '🖥️',
    tagline: 'A macOS desktop, in the browser',
    accent: '#cd8f9f',
    description:
      'Placeholder case study. The very site you’re looking at — built with React, Vite, Tailwind, and Framer Motion. Replace this with a real flagship project write-up.',
    codeUrl: 'https://github.com/maggieslen/maggie-portfolio',
  },
  {
    id: 'app-two',
    name: 'Flagship Two',
    icon: '🌷',
    tagline: 'Your standout project',
    accent: '#e29ec2',
    description:
      'Placeholder. Describe the problem, your role, the outcome, and add live + code links.',
    liveUrl: '#',
    codeUrl: '#',
  },
  {
    id: 'app-three',
    name: 'Flagship Three',
    icon: '✨',
    tagline: 'Another highlight',
    accent: '#c79ad8',
    description:
      'Placeholder. A short, punchy summary with a screenshot or embedded demo goes here.',
    liveUrl: '#',
    codeUrl: '#',
  },
]

/* ------------------------------------------------------------------ *
 * DECORATIVE WIDGETS  (not folders — just personality)
 * ------------------------------------------------------------------ */
export const widgets = {
  postcard: {
    lines: ['YOU ARE', 'ALL KINDS', 'OF', 'WONDERFUL'],
  },
  ipod: {
    track: 'Someday, Someday',
    artist: 'BANNERS',
    album: 'Where the Shadow Ends',
  },
  /** Captions for the little camera "screen" and polaroid stack. */
  polaroids: ['sunset', 'field day', 'the trip'],
}
