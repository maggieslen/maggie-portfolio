import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// The site is deployed to GitHub Pages at:
//   https://maggieslen.github.io/maggie-portfolio/
// so all assets must be served from the "/maggie-portfolio/" sub-path.
// If you ever rename the repo, update `base` to match "/<repo-name>/".
export default defineConfig({
  base: '/maggie-portfolio/',
  plugins: [react(), tailwindcss()],
  server: {
    port: Number(process.env.PORT) || 5173,
    strictPort: false,
  },
})
