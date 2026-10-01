import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/**
 * `VITE_BASE_PATH` lets the site be served from a sub-path, which GitHub Pages
 * project sites require (https://<user>.github.io/<repo>/). Leave it unset for
 * Azure Static Web Apps, a custom domain, or a GitHub user/org site — all of
 * which serve from the root.
 */
export function normaliseBase(raw: string | undefined): string {
  const trimmed = raw?.trim().replace(/^\/+|\/+$/g, '')
  return trimmed ? `/${trimmed}/` : '/'
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')

  return {
    base: normaliseBase(env.VITE_BASE_PATH),
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    build: {
      target: 'es2022',
      cssCodeSplit: false,
      reportCompressedSize: false,
    },
  }
})
