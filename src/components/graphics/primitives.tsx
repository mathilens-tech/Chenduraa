/**
 * Shared SVG building blocks for the site artwork.
 *
 * Rather than stock photography, the visual language is built from
 * perspective-projected module arrays. It is a few kilobytes total, stays sharp
 * at any size, and matches the brand palette exactly. Client photographs can
 * replace any of these graphics without touching layout — see
 * `src/content/projects.ts`.
 */

export type Point = { x: number; y: number }

/** Bilinear interpolation across four corners — cheap, convincing perspective. */
function lerpQuad(
  tl: Point,
  tr: Point,
  bl: Point,
  br: Point,
  u: number,
  v: number,
): Point {
  const top = { x: tl.x + (tr.x - tl.x) * u, y: tl.y + (tr.y - tl.y) * u }
  const bottom = { x: bl.x + (br.x - bl.x) * u, y: bl.y + (br.y - bl.y) * u }
  return { x: top.x + (bottom.x - top.x) * v, y: top.y + (bottom.y - top.y) * v }
}

export type PanelArrayProps = {
  tl: Point
  tr: Point
  bl: Point
  br: Point
  cols: number
  rows: number
  /** Fractional gap between modules, 0–0.3. */
  gap?: number
  /** Base module fill. */
  fill?: string
  /** Module outline. */
  stroke?: string
  strokeWidth?: number
  /** Adds interior cell lines to read as a module, not a flat rectangle. */
  cells?: boolean
  /** 0–1: how much rows lighten toward the back of the array. */
  depthFade?: number
  /** Indices (row*cols+col) rendered with the highlight fill. */
  highlights?: number[]
  highlightFill?: string
  opacity?: number
}

/**
 * Renders a grid of solar modules mapped onto an arbitrary quad, producing a
 * perspective array without needing a 3D transform.
 */
export function PanelArray({
  tl,
  tr,
  bl,
  br,
  cols,
  rows,
  gap = 0.1,
  fill = '#123763',
  stroke = '#2f5c93',
  strokeWidth = 1,
  cells = true,
  depthFade = 0.35,
  highlights = [],
  highlightFill = '#eaad30',
  opacity = 1,
}: PanelArrayProps) {
  const modules: React.ReactNode[] = []
  const highlightSet = new Set(highlights)

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const u0 = (col + gap / 2) / cols
      const u1 = (col + 1 - gap / 2) / cols
      const v0 = (row + gap / 2) / rows
      const v1 = (row + 1 - gap / 2) / rows

      const a = lerpQuad(tl, tr, bl, br, u0, v0)
      const b = lerpQuad(tl, tr, bl, br, u1, v0)
      const c = lerpQuad(tl, tr, bl, br, u1, v1)
      const d = lerpQuad(tl, tr, bl, br, u0, v1)

      const index = row * cols + col
      const isHighlight = highlightSet.has(index)
      // Back rows sit further away: fade them slightly for aerial depth.
      const depth = rows > 1 ? 1 - (row / (rows - 1)) * depthFade : 1

      modules.push(
        <g key={index} opacity={depth * opacity}>
          <polygon
            points={`${a.x},${a.y} ${b.x},${b.y} ${c.x},${c.y} ${d.x},${d.y}`}
            fill={isHighlight ? highlightFill : fill}
            stroke={stroke}
            strokeWidth={strokeWidth}
            fillOpacity={isHighlight ? 0.92 : 1}
          />
          {cells && (
            <>
              <line
                x1={(a.x + d.x) / 2}
                y1={(a.y + d.y) / 2}
                x2={(b.x + c.x) / 2}
                y2={(b.y + c.y) / 2}
                stroke={stroke}
                strokeWidth={strokeWidth * 0.7}
                opacity={0.65}
              />
              <line
                x1={a.x + (b.x - a.x) / 3}
                y1={a.y + (b.y - a.y) / 3}
                x2={d.x + (c.x - d.x) / 3}
                y2={d.y + (c.y - d.y) / 3}
                stroke={stroke}
                strokeWidth={strokeWidth * 0.55}
                opacity={0.5}
              />
              <line
                x1={a.x + ((b.x - a.x) * 2) / 3}
                y1={a.y + ((b.y - a.y) * 2) / 3}
                x2={d.x + ((c.x - d.x) * 2) / 3}
                y2={d.y + ((c.y - d.y) * 2) / 3}
                stroke={stroke}
                strokeWidth={strokeWidth * 0.55}
                opacity={0.5}
              />
            </>
          )}
        </g>,
      )
    }
  }

  return <g>{modules}</g>
}

/** Soft radial sun glow. Give each instance a unique `id`. */
export function SunGlow({
  id,
  cx,
  cy,
  r,
  color = '#eaad30',
  intensity = 0.55,
}: {
  id: string
  cx: number
  cy: number
  r: number
  color?: string
  intensity?: number
}) {
  return (
    <>
      <defs>
        <radialGradient id={id} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={color} stopOpacity={intensity} />
          <stop offset="45%" stopColor={color} stopOpacity={intensity * 0.35} />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx={cx} cy={cy} r={r} fill={`url(#${id})`} />
    </>
  )
}

/** Mounting leg / support strut. */
export function Strut({
  x1,
  y1,
  x2,
  y2,
  stroke = '#2f5c93',
  width = 3,
}: {
  x1: number
  y1: number
  x2: number
  y2: number
  stroke?: string
  width?: number
}) {
  return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={stroke} strokeWidth={width} strokeLinecap="round" />
}
