import { useId, type ReactNode } from 'react'
import { PanelArray, SunGlow, Strut } from './primitives'

/**
 * Card/section artwork. Every scene shares one composition frame (480x300,
 * 8:5) so any of them can be swapped for a client photograph of the same
 * aspect ratio without disturbing the layout.
 */

type SceneProps = {
  children: (ids: { grad: string; sun: string; panel: string }) => ReactNode
  className?: string
  /** Sun position within the frame. */
  sun?: { cx: number; cy: number; r?: number }
}

function Scene({ children, className, sun = { cx: 396, cy: 62 } }: SceneProps) {
  const uid = useId().replace(/[:]/g, '')
  const ids = { grad: `sky-${uid}`, sun: `sun-${uid}`, panel: `pnl-${uid}` }

  return (
    <svg
      viewBox="0 0 480 300"
      className={className}
      role="presentation"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id={ids.grad} x1="0" y1="0" x2="0.2" y2="1">
          <stop offset="0%" stopColor="#eef3fa" />
          <stop offset="70%" stopColor="#f8fafd" />
          <stop offset="100%" stopColor="#ffffff" />
        </linearGradient>
        <linearGradient id={ids.panel} x1="0" y1="0" x2="0.35" y2="1">
          <stop offset="0%" stopColor="#21477c" />
          <stop offset="100%" stopColor="#0b2545" />
        </linearGradient>
      </defs>

      <rect width="480" height="300" fill={`url(#${ids.grad})`} />
      <SunGlow id={ids.sun} cx={sun.cx} cy={sun.cy} r={sun.r ?? 140} intensity={0.42} />
      <circle cx={sun.cx} cy={sun.cy} r="19" fill="#eaad30" opacity="0.88" />

      {children(ids)}

      {/* Ground line */}
      <line x1="0" y1="262" x2="480" y2="262" stroke="#adc3e0" strokeWidth="1.25" />
    </svg>
  )
}

const OUTLINE = '#3a6ba6'

/* ------------------------------- residential ------------------------------ */

export function ResidentialScene({ className }: { className?: string }) {
  return (
    <Scene className={className} sun={{ cx: 402, cy: 58 }}>
      {(ids) => (
        <>
          {/* House body */}
          <path d="M96 262V166h188v96z" fill="#ffffff" stroke="#adc3e0" strokeWidth="1.5" />
          {/* Sloped roof */}
          <path d="M78 170 190 106l112 64z" fill="#d6e2f1" stroke="#adc3e0" strokeWidth="1.5" />
          {/* Array on the right-hand pitch, kept inside the roof triangle */}
          <PanelArray
            tl={{ x: 197, y: 112 }}
            tr={{ x: 262, y: 150 }}
            bl={{ x: 197, y: 134 }}
            br={{ x: 262, y: 169 }}
            cols={3}
            rows={2}
            gap={0.1}
            fill={`url(#${ids.panel})`}
            stroke={OUTLINE}
            strokeWidth={1}
            highlights={[0]}
          />
          {/* Windows & door */}
          <rect x="120" y="192" width="34" height="30" fill="#eef3fa" stroke="#adc3e0" />
          <rect x="172" y="192" width="34" height="30" fill="#eef3fa" stroke="#adc3e0" />
          <rect x="228" y="200" width="32" height="62" fill="#d6e2f1" stroke="#adc3e0" />
          {/* Foliage for scale, kept abstract */}
          <circle cx="330" cy="232" r="28" fill="#e3f2ea" stroke="#1f7a52" strokeOpacity="0.35" />
          <line x1="330" y1="232" x2="330" y2="262" stroke="#1f7a52" strokeOpacity="0.4" strokeWidth="2" />
        </>
      )}
    </Scene>
  )
}

/* ------------------------------- commercial ------------------------------- */

export function CommercialScene({ className }: { className?: string }) {
  return (
    <Scene className={className} sun={{ cx: 68, cy: 60 }}>
      {(ids) => (
        <>
          {/* Two flat-roofed blocks */}
          <path d="M132 262V128h144v134z" fill="#ffffff" stroke="#adc3e0" strokeWidth="1.5" />
          <path d="M276 262V172h104v90z" fill="#f8fafd" stroke="#adc3e0" strokeWidth="1.5" />
          {/* Window bands */}
          {[150, 178, 206].map((y) => (
            <line key={y} x1="146" y1={y} x2="262" y2={y} stroke="#adc3e0" strokeWidth="7" strokeOpacity="0.5" />
          ))}
          {[194, 220].map((y) => (
            <line key={y} x1="288" y1={y} x2="368" y2={y} stroke="#adc3e0" strokeWidth="6" strokeOpacity="0.45" />
          ))}
          {/* Tilted array on the main roof */}
          <PanelArray
            tl={{ x: 150, y: 96 }}
            tr={{ x: 268, y: 96 }}
            bl={{ x: 138, y: 124 }}
            br={{ x: 262, y: 124 }}
            cols={4}
            rows={2}
            gap={0.1}
            fill={`url(#${ids.panel})`}
            stroke={OUTLINE}
            strokeWidth={1}
            highlights={[1, 4]}
          />
          <Strut x1={144} y1={124} x2={144} y2={130} stroke={OUTLINE} width={2} />
          <Strut x1={262} y1={124} x2={262} y2={130} stroke={OUTLINE} width={2} />
          {/* Secondary roof array */}
          <PanelArray
            tl={{ x: 292, y: 150 }}
            tr={{ x: 368, y: 150 }}
            bl={{ x: 286, y: 170 }}
            br={{ x: 364, y: 170 }}
            cols={3}
            rows={1}
            gap={0.12}
            fill={`url(#${ids.panel})`}
            stroke={OUTLINE}
            strokeWidth={1}
            cells={false}
          />
        </>
      )}
    </Scene>
  )
}

/* ------------------------------- industrial ------------------------------- */

export function IndustrialScene({ className }: { className?: string }) {
  return (
    <Scene className={className} sun={{ cx: 412, cy: 54 }}>
      {(ids) => (
        <>
          {/* Saw-tooth industrial shed */}
          <path
            d="M64 262v-88l52-30 0 30 52-30 0 30 52-30 0 30 52-30 0 30 52-30v118z"
            fill="#ffffff"
            stroke="#adc3e0"
            strokeWidth="1.5"
          />
          {[116, 168, 220, 272].map((x) => (
            <line key={x} x1={x} y1="144" x2={x} y2="262" stroke="#d6e2f1" strokeWidth="1.25" />
          ))}
          {/* Long array spanning the shed roof */}
          <PanelArray
            tl={{ x: 86, y: 128 }}
            tr={{ x: 352, y: 96 }}
            bl={{ x: 78, y: 152 }}
            br={{ x: 346, y: 120 }}
            cols={8}
            rows={1}
            gap={0.09}
            fill={`url(#${ids.panel})`}
            stroke={OUTLINE}
            strokeWidth={1}
            cells={false}
            highlights={[6]}
          />
          {/* Ground-mount extension */}
          <PanelArray
            tl={{ x: 372, y: 206 }}
            tr={{ x: 452, y: 202 }}
            bl={{ x: 366, y: 232 }}
            br={{ x: 448, y: 228 }}
            cols={3}
            rows={1}
            gap={0.12}
            fill={`url(#${ids.panel})`}
            stroke={OUTLINE}
            strokeWidth={1}
            cells={false}
          />
          <Strut x1={380} y1={232} x2={380} y2={262} stroke={OUTLINE} width={2.5} />
          <Strut x1={440} y1={228} x2={440} y2={262} stroke={OUTLINE} width={2.5} />
        </>
      )}
    </Scene>
  )
}

/* ------------------------------ ground mount ------------------------------ */

export function GroundMountScene({ className }: { className?: string }) {
  return (
    <Scene className={className} sun={{ cx: 396, cy: 56 }}>
      {(ids) => (
        <>
          {[
            { y: 0, cols: 5, opacity: 0.55 },
            { y: 42, cols: 5, opacity: 0.8 },
          ].map((row, i) => (
            <g key={i} opacity={row.opacity}>
              <PanelArray
                tl={{ x: 74 - i * 14, y: 150 + row.y }}
                tr={{ x: 400 + i * 14, y: 142 + row.y }}
                bl={{ x: 66 - i * 18, y: 182 + row.y }}
                br={{ x: 408 + i * 18, y: 174 + row.y }}
                cols={row.cols}
                rows={1}
                gap={0.08}
                fill={`url(#${ids.panel})`}
                stroke={OUTLINE}
                strokeWidth={1}
                highlights={i === 1 ? [3] : []}
              />
            </g>
          ))}
          <g opacity="0.55">
            {[100, 180, 260, 340].map((x) => (
              <Strut key={x} x1={x} y1={216} x2={x} y2={262} stroke={OUTLINE} width={2.5} />
            ))}
          </g>
        </>
      )}
    </Scene>
  )
}

/* -------------------------------- metal roof ------------------------------ */

export function MetalRoofScene({ className }: { className?: string }) {
  return (
    <Scene className={className} sun={{ cx: 76, cy: 58 }}>
      {(ids) => (
        <>
          {/* Profiled sheet roof shed */}
          <path d="M72 262v-72h336v72z" fill="#ffffff" stroke="#adc3e0" strokeWidth="1.5" />
          <path d="M60 190 240 118l180 72z" fill="#d6e2f1" stroke="#adc3e0" strokeWidth="1.5" />
          {/* Sheet profile: bands running parallel to each pitch */}
          <g stroke="#adc3e0" strokeWidth="1" opacity="0.6">
            {[0, 1, 2, 3].map((i) => {
              const drop = 14 + i * 14
              return (
                <g key={i}>
                  <line x1={60} y1={190} x2={240} y2={118 + drop} />
                  <line x1={420} y1={190} x2={240} y2={118 + drop} />
                </g>
              )
            })}
          </g>
          {/* Array on the right-hand pitch, inside the roof outline */}
          <PanelArray
            tl={{ x: 251, y: 122 }}
            tr={{ x: 370, y: 170 }}
            bl={{ x: 251, y: 140 }}
            br={{ x: 370, y: 188 }}
            cols={4}
            rows={1}
            gap={0.08}
            fill={`url(#${ids.panel})`}
            stroke={OUTLINE}
            strokeWidth={1}
            highlights={[2]}
          />
          {/* Array on the left-hand pitch */}
          <PanelArray
            tl={{ x: 120, y: 166 }}
            tr={{ x: 225, y: 124 }}
            bl={{ x: 120, y: 182 }}
            br={{ x: 225, y: 140 }}
            cols={3}
            rows={1}
            gap={0.1}
            fill={`url(#${ids.panel})`}
            stroke={OUTLINE}
            strokeWidth={1}
            cells={false}
            opacity={0.9}
          />
        </>
      )}
    </Scene>
  )
}

/* --------------------------------- carport -------------------------------- */

export function CarportScene({ className }: { className?: string }) {
  return (
    <Scene className={className} sun={{ cx: 404, cy: 60 }}>
      {(ids) => (
        <>
          {/* Canopy array */}
          <PanelArray
            tl={{ x: 96, y: 112 }}
            tr={{ x: 388, y: 128 }}
            bl={{ x: 78, y: 158 }}
            br={{ x: 396, y: 176 }}
            cols={5}
            rows={2}
            gap={0.07}
            fill={`url(#${ids.panel})`}
            stroke={OUTLINE}
            strokeWidth={1}
            highlights={[3]}
          />
          {/* Posts */}
          <g>
            <Strut x1={96} y1={158} x2={96} y2={262} stroke={OUTLINE} width={4} />
            <Strut x1={380} y1={176} x2={380} y2={262} stroke={OUTLINE} width={4} />
            <Strut x1={240} y1={168} x2={240} y2={262} stroke={OUTLINE} width={3} />
          </g>
          {/* Abstract vehicle beneath the canopy */}
          <path
            d="M150 262v-22a10 10 0 0 1 8-10l14-16a10 10 0 0 1 8-4h44a10 10 0 0 1 8 4l14 16a10 10 0 0 1 8 10v22z"
            fill="#eef3fa"
            stroke="#adc3e0"
            strokeWidth="1.5"
          />
          <line x1="170" y1="230" x2="238" y2="230" stroke="#adc3e0" strokeWidth="1.25" />
        </>
      )}
    </Scene>
  )
}

/* ------------------------------ hybrid / storage -------------------------- */

export function HybridScene({ className }: { className?: string }) {
  return (
    <Scene className={className} sun={{ cx: 72, cy: 62 }}>
      {(ids) => (
        <>
          {/* Roof array */}
          <path d="M108 262v-84h150v84z" fill="#ffffff" stroke="#adc3e0" strokeWidth="1.5" />
          <PanelArray
            tl={{ x: 124, y: 144 }}
            tr={{ x: 250, y: 144 }}
            bl={{ x: 114, y: 174 }}
            br={{ x: 246, y: 174 }}
            cols={4}
            rows={1}
            gap={0.09}
            fill={`url(#${ids.panel})`}
            stroke={OUTLINE}
            strokeWidth={1}
            highlights={[1]}
          />
          {/* Inverter + battery cabinet */}
          <rect x="296" y="168" width="44" height="60" rx="3" fill="#ffffff" stroke="#adc3e0" strokeWidth="1.5" />
          <rect x="306" y="180" width="24" height="9" rx="1.5" fill="#d6e2f1" />
          <rect x="296" y="228" width="44" height="34" rx="3" fill="#f8fafd" stroke="#adc3e0" strokeWidth="1.5" />
          <rect x="352" y="196" width="46" height="66" rx="3" fill="#ffffff" stroke="#adc3e0" strokeWidth="1.5" />
          {/* Battery charge bars */}
          <g fill="#1f7a52" opacity="0.65">
            <rect x="362" y="240" width="26" height="6" rx="1" />
            <rect x="362" y="228" width="26" height="6" rx="1" />
            <rect x="362" y="216" width="26" height="6" rx="1" opacity="0.4" />
          </g>
          {/* Flow line from array to equipment */}
          <path
            d="M252 162h24a10 10 0 0 1 10 10v0"
            fill="none"
            stroke="#eaad30"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="5 4"
          />
        </>
      )}
    </Scene>
  )
}

/* --------------------------------- mapping -------------------------------- */

export const solutionScenes = {
  residential: ResidentialScene,
  commercial: CommercialScene,
  industrial: IndustrialScene,
} as const

export const installationScenes = {
  residentialRoof: ResidentialScene,
  commercialRoof: CommercialScene,
  groundMount: GroundMountScene,
  carport: CarportScene,
  metalRoof: MetalRoofScene,
  hybrid: HybridScene,
} as const
