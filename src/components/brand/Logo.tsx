import { cn } from '@/lib/cn'

/**
 * Interim brand lockup.
 *
 * TODO_CLIENT: supply the official logo as SVG (preferred) or a transparent PNG
 * at 2x. Drop it in `public/` and replace the mark below — the wordmark layout,
 * sizing and both colour variants can stay as they are.
 */

type LogoProps = {
  /** `dark` renders for dark backgrounds (navy header/footer). */
  variant?: 'light' | 'dark'
  className?: string
  /** Hides the wordmark, leaving only the mark (used in tight spaces). */
  markOnly?: boolean
}

export function Logo({ variant = 'light', className, markOnly = false }: LogoProps) {
  const dark = variant === 'dark'

  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <svg
        viewBox="0 0 40 40"
        className="h-9 w-9 shrink-0 sm:h-10 sm:w-10"
        aria-hidden="true"
        focusable="false"
      >
        <rect
          width="40"
          height="40"
          rx="7"
          fill={dark ? '#0b2545' : '#0b2545'}
          stroke={dark ? 'rgba(255,255,255,0.14)' : 'none'}
        />
        {/* Sun */}
        <circle cx="20" cy="14.5" r="5.4" fill="#eaad30" />
        <g stroke="#eaad30" strokeWidth="1.5" strokeLinecap="round" opacity="0.75">
          <path d="M20 4.4v2.2M28.8 9.4l-1.9 1.1M11.2 9.4l1.9 1.1" />
        </g>
        {/* Module array */}
        <path d="M8.6 30.4 12 22.6h16l3.4 7.8z" fill="#ffffff" fillOpacity="0.93" />
        <g stroke="#0b2545" strokeWidth="0.9" opacity="0.85">
          <path d="M14.4 22.6 12.2 30.4M20 22.6v7.8M25.6 22.6l2.2 7.8M10.5 26.5h19" />
        </g>
      </svg>

      {!markOnly && (
        <span className="flex flex-col leading-none">
          <span
            className={cn(
              'font-display text-[1.0625rem] font-extrabold tracking-[-0.015em] sm:text-[1.15rem]',
              dark ? 'text-white' : 'text-navy-700',
            )}
          >
            Chenduraa
          </span>
          <span
            className={cn(
              'mt-[3px] font-display text-[0.5625rem] font-bold tracking-[0.2em] uppercase',
              dark ? 'text-gold-300' : 'text-gold-600',
            )}
          >
            Energy
          </span>
        </span>
      )}
    </span>
  )
}
