/**
 * Static site generation.
 *
 * Renders every route to real HTML with its own <head>, so the site is fully
 * indexable and paints before JavaScript loads. React then hydrates the markup
 * for client-side navigation.
 *
 * Also emits sitemap.xml and rewrites robots.txt with the configured origin.
 *
 * Run via `npm run build` (client build -> server build -> this script).
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const distDir = join(root, 'dist')
const ssrEntry = join(root, 'dist-ssr', 'entry-server.js')

const GREEN = '[32m'
const DIM = '[2m'
const RED = '[31m'
const RESET = '[0m'

function fail(message) {
  console.error(`${RED}prerender: ${message}${RESET}`)
  process.exit(1)
}

if (!existsSync(join(distDir, 'index.html'))) {
  fail('dist/index.html not found — run `npm run build:client` first.')
}
if (!existsSync(ssrEntry)) {
  fail('dist-ssr/entry-server.js not found — run `npm run build:server` first.')
}

const template = await readFile(join(distDir, 'index.html'), 'utf8')

if (!template.includes('<!--app-html-->') || !template.includes('<!--app-head-->')) {
  fail('index.html is missing the <!--app-html--> or <!--app-head--> placeholder.')
}

const { render, routes, siteUrl } = await import(pathToFileURL(ssrEntry).href)

/* ------------------------------ render routes ----------------------------- */

const written = []

for (const route of routes) {
  let rendered
  try {
    rendered = render(route)
  } catch (error) {
    fail(`failed rendering "${route}":\n${error?.stack ?? error}`)
  }

  // The fallback <title>/<meta description> in index.html sit after the
  // placeholder; strip them so each page has exactly one of each.
  const page = template
    .replace('<!--app-head-->', rendered.head)
    .replace(
      /\s*<!-- Fallback metadata[\s\S]*?<meta\s+name="description"[\s\S]*?\/>\s*/,
      '\n    ',
    )
    .replace('<!--app-html-->', rendered.html)

  if (page.includes('<!--app-')) {
    fail(`placeholders were not fully replaced for "${route}".`)
  }

  const outPath =
    route === '/' ? join(distDir, 'index.html') : join(distDir, route.slice(1), 'index.html')

  await mkdir(dirname(outPath), { recursive: true })
  await writeFile(outPath, page, 'utf8')

  written.push({ route, bytes: Buffer.byteLength(page) })
}

/* -------------------------------- 404 page -------------------------------- */

// Azure Static Web Apps serves /index.html for unknown paths (see
// staticwebapp.config.json); the client router then renders the 404 page.
// A standalone 404.html keeps other static hosts behaving sensibly too.
try {
  const notFound = render('/__not-found__')
  const page = template
    .replace('<!--app-head-->', notFound.head)
    .replace(/\s*<!-- Fallback metadata[\s\S]*?<meta\s+name="description"[\s\S]*?\/>\s*/, '\n    ')
    .replace('<!--app-html-->', notFound.html)
  await writeFile(join(distDir, '404.html'), page, 'utf8')
  written.push({ route: '/404.html', bytes: Buffer.byteLength(page) })
} catch (error) {
  fail(`failed rendering the 404 page:\n${error?.stack ?? error}`)
}

/* -------------------------------- sitemap --------------------------------- */

const today = new Date().toISOString().slice(0, 10)

/** Home is the most important page; legal pages the least. */
function priorityFor(route) {
  if (route === '/') return '1.0'
  if (route === '/privacy-policy' || route === '/terms') return '0.3'
  if (route === '/contact') return '0.9'
  return '0.8'
}

const sitemapXml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...routes.map((route) =>
    [
      '  <url>',
      `    <loc>${siteUrl}${route === '/' ? '/' : route}</loc>`,
      `    <lastmod>${today}</lastmod>`,
      `    <changefreq>monthly</changefreq>`,
      `    <priority>${priorityFor(route)}</priority>`,
      '  </url>',
    ].join('\n'),
  ),
  '</urlset>',
  '',
].join('\n')

await writeFile(join(distDir, 'sitemap.xml'), sitemapXml, 'utf8')

/* -------------------------------- robots.txt ------------------------------ */

const robotsPath = join(distDir, 'robots.txt')
const robots = existsSync(robotsPath) ? await readFile(robotsPath, 'utf8') : 'User-agent: *\nAllow: /\n'
await writeFile(
  robotsPath,
  robots.replace(/^Sitemap:.*$/m, `Sitemap: ${siteUrl}/sitemap.xml`),
  'utf8',
)

/* --------------------------------- report --------------------------------- */

console.log(`\n${GREEN}✓${RESET} prerendered ${written.length} pages  ${DIM}(${siteUrl})${RESET}`)
for (const { route, bytes } of written) {
  console.log(`  ${DIM}${route.padEnd(18)}${RESET} ${(bytes / 1024).toFixed(1)} kB`)
}
console.log(`  ${DIM}${'sitemap.xml'.padEnd(18)}${RESET} ${routes.length} URLs`)
console.log(`  ${DIM}${'robots.txt'.padEnd(18)}${RESET} sitemap URL set\n`)
