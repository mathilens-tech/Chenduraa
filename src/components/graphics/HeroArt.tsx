import { PanelArray, SunGlow } from './primitives'

/**
 * Hero artwork: a rooftop module array receding toward a low sun.
 * Decorative only — the hero carries its meaning in text, so this is
 * aria-hidden and contributes nothing to the accessible name of the section.
 */
export function HeroArt({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 820 620"
      className={className}
      role="presentation"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="hero-sky" x1="0" y1="0" x2="0.35" y2="1">
          <stop offset="0%" stopColor="#071c36" />
          <stop offset="55%" stopColor="#0b2545" />
          <stop offset="100%" stopColor="#041225" />
        </linearGradient>
        <linearGradient id="hero-horizon" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#eaad30" stopOpacity="0" />
          <stop offset="45%" stopColor="#eaad30" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#eaad30" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="hero-panel" x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0%" stopColor="#1b4b84" />
          <stop offset="100%" stopColor="#0b2545" />
        </linearGradient>
        <linearGradient id="hero-fade" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#041225" stopOpacity="0.85" />
          <stop offset="55%" stopColor="#041225" stopOpacity="0" />
        </linearGradient>
      </defs>

      <rect width="820" height="620" fill="url(#hero-sky)" />

      {/* Low sun behind the array */}
      <SunGlow id="hero-sun" cx={612} cy={196} r={250} intensity={0.5} />
      <circle cx="612" cy="196" r="34" fill="#efc259" opacity="0.9" />
      <circle cx="612" cy="196" r="58" fill="none" stroke="#efc259" strokeWidth="1" opacity="0.3" />

      {/* Horizon */}
      <line x1="0" y1="286" x2="820" y2="286" stroke="url(#hero-horizon)" strokeWidth="1.5" />

      {/* Distant array silhouette */}
      <PanelArray
        tl={{ x: 60, y: 258 }}
        tr={{ x: 330, y: 252 }}
        bl={{ x: 44, y: 288 }}
        br={{ x: 338, y: 282 }}
        cols={7}
        rows={1}
        gap={0.16}
        fill="#0d2a4e"
        stroke="#1b4b84"
        strokeWidth={0.8}
        cells={false}
        opacity={0.55}
      />

      {/* Primary array in perspective */}
      <PanelArray
        tl={{ x: 176, y: 318 }}
        tr={{ x: 690, y: 300 }}
        bl={{ x: -70, y: 606 }}
        br={{ x: 872, y: 528 }}
        cols={6}
        rows={4}
        gap={0.085}
        fill="url(#hero-panel)"
        stroke="#3a6ba6"
        strokeWidth={1.15}
        depthFade={0.3}
        highlights={[4, 5, 11]}
        highlightFill="#eaad30"
      />

      {/* Support structure hinted below the leading edge */}
      <g stroke="#1b4b84" strokeWidth="2.5" opacity="0.5" strokeLinecap="round">
        <line x1="120" y1="560" x2="120" y2="620" />
        <line x1="400" y1="576" x2="400" y2="620" />
        <line x1="700" y1="548" x2="700" y2="620" />
      </g>

      <rect y="470" width="820" height="150" fill="url(#hero-fade)" />
    </svg>
  )
}
