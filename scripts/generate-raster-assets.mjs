/**
 * Rasterises the SVG brand assets into the PNG formats that social platforms
 * and mobile home screens require (they do not accept SVG).
 *
 * Run with `npm run assets`. Outputs are committed to `public/`, so a normal
 * build does not need sharp — it is a dev-only dependency.
 *
 *   public/og-image.svg      -> public/og-image.png        (1200x630)
 *   public/favicon.svg       -> public/apple-touch-icon.png  (180x180)
 *   public/favicon.svg       -> public/favicon-32.png        (32x32)
 */
import { readFile, writeFile } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const publicDir = join(root, 'public')

const jobs = [
  { from: 'og-image.svg', to: 'og-image.png', width: 1200, height: 630, background: '#0b2545' },
  {
    from: 'favicon.svg',
    to: 'apple-touch-icon.png',
    width: 180,
    height: 180,
    background: '#0b2545',
  },
  { from: 'favicon.svg', to: 'favicon-32.png', width: 32, height: 32, background: '#0b2545' },
]

for (const job of jobs) {
  const svg = await readFile(join(publicDir, job.from))
  const png = await sharp(svg, { density: 384 })
    .resize(job.width, job.height, { fit: 'contain', background: job.background })
    .png({ compressionLevel: 9, palette: false })
    .toBuffer()

  await writeFile(join(publicDir, job.to), png)
  console.log(`  ${job.from.padEnd(16)} -> ${job.to.padEnd(22)} ${(png.length / 1024).toFixed(1)} kB`)
}

console.log('\n✓ raster assets generated')
