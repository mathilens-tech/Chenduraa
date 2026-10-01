/**
 * Local static server that resolves URLs the way a static host does.
 *
 * `vite preview` applies its SPA fallback before looking for directory index
 * files, so `/about` gets served `index.html` (the home page) instead of
 * `about/index.html`. That is fine for a pure SPA but misrepresents this
 * prerendered build — React then hydrates the wrong page.
 *
 * Resolution order here matches Azure Static Web Apps and GitHub Pages:
 *   1. exact file            /favicon.svg
 *   2. directory index       /about        -> /about/index.html
 *   3. extension-less .html  /about        -> /about.html
 *   4. navigation fallback   /404.html with a 404 status
 *
 * Usage: node scripts/serve-static.mjs [port]
 *
 * Honours VITE_BASE_PATH so a GitHub Pages project-site build (served from
 * /<repo>/) can be verified locally exactly as it will be hosted.
 */
import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { dirname, extname, join, normalize, resolve, sep } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..', 'dist')
const port = Number(process.argv[2] ?? 4173)

/** "" when served from the domain root, otherwise "/repo". */
const basePath = (process.env.VITE_BASE_PATH ?? '').trim().replace(/^\/+|\/+$/g, '')
const basePrefix = basePath ? `/${basePath}` : ''

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.json': 'application/json; charset=utf-8',
  '.webmanifest': 'application/manifest+json',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.ico': 'image/x-icon',
}

async function tryFile(path) {
  try {
    const info = await stat(path)
    if (info.isFile()) return path
  } catch {
    /* not found */
  }
  return null
}

async function resolvePath(urlPath) {
  // Reject traversal outside dist.
  const safe = normalize(decodeURIComponent(urlPath)).replace(/^(\.\.[/\\])+/, '')
  const base = join(root, safe)
  if (!base.startsWith(root + sep) && base !== root) return null

  if (extname(base)) return await tryFile(base)

  return (
    (await tryFile(join(base, 'index.html'))) ??
    (await tryFile(`${base.replace(/[/\\]$/, '')}.html`)) ??
    null
  )
}

const server = createServer(async (req, res) => {
  const requested = (req.url ?? '/').split('?')[0]

  // Strip the base path the way the host does before resolving to a file.
  let urlPath = requested
  if (basePrefix) {
    if (requested === basePrefix) {
      res.writeHead(302, { Location: `${basePrefix}/` })
      res.end()
      return
    }
    if (!requested.startsWith(`${basePrefix}/`)) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
      res.end(`404 — this build is served from ${basePrefix}/`)
      return
    }
    urlPath = requested.slice(basePrefix.length) || '/'
  }

  let file = await resolvePath(urlPath)
  let status = 200

  if (!file) {
    // Navigation fallback: the client router renders the 404 page.
    file = join(root, '404.html')
    if (!(await tryFile(file))) file = join(root, 'index.html')
    status = 404
  }

  try {
    const body = await readFile(file)
    res.writeHead(status, {
      'Content-Type': TYPES[extname(file)] ?? 'application/octet-stream',
      'Cache-Control': urlPath.startsWith('/assets/')
        ? 'public, max-age=31536000, immutable'
        : 'no-cache',
    })
    res.end(body)
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' })
    res.end(`500 ${error.message}`)
  }
})

server.listen(port, () => {
  console.log(
    `\n  Static preview (host-accurate)  http://localhost:${port}${basePrefix}/\n  serving ${root}\n`,
  )
})
