import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/cn'

type Variant = 'primary' | 'secondary' | 'ghost' | 'onDark' | 'onDarkSolid'
type Size = 'md' | 'lg'

const base =
  'group relative inline-flex items-center justify-center gap-2 rounded-[3px] font-display font-semibold ' +
  'transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] ' +
  'disabled:pointer-events-none disabled:opacity-55'

const variants: Record<Variant, string> = {
  primary:
    'bg-gold-400 text-navy-800 shadow-[0_1px_2px_rgb(7_28_54/0.12)] hover:bg-gold-300 hover:shadow-[0_6px_18px_-6px_rgb(217_145_26/0.65)] active:translate-y-px',
  secondary:
    'border border-navy-700/25 bg-white text-navy-700 hover:border-navy-700/55 hover:bg-navy-50 active:translate-y-px',
  ghost: 'text-navy-700 hover:bg-navy-50',
  onDark:
    'border border-white/30 text-white hover:border-white/70 hover:bg-white/10 active:translate-y-px',
  onDarkSolid: 'bg-white text-navy-700 hover:bg-navy-50 active:translate-y-px',
}

const sizes: Record<Size, string> = {
  md: 'px-5 py-2.5 text-[0.9rem]',
  lg: 'px-6 py-3.5 text-[0.95rem] sm:px-7',
}

type CommonProps = {
  children: ReactNode
  variant?: Variant
  size?: Size
  className?: string
  /** Shows a small trailing arrow that nudges on hover. */
  withArrow?: boolean
}

type ButtonAsLink = CommonProps & {
  to: string
  href?: never
  onClick?: never
  type?: never
  disabled?: never
}

type ButtonAsAnchor = CommonProps & {
  href: string
  to?: never
  onClick?: never
  type?: never
  disabled?: never
  /** External links get rel/target handling. */
  external?: boolean
  ariaLabel?: string
}

type ButtonAsButton = CommonProps & {
  type?: 'button' | 'submit'
  onClick?: () => void
  disabled?: boolean
  to?: never
  href?: never
}

export type ButtonProps = ButtonAsLink | ButtonAsAnchor | ButtonAsButton

export function Button(props: ButtonProps) {
  const {
    children,
    variant = 'primary',
    size = 'md',
    className,
    withArrow = false,
    ...rest
  } = props as CommonProps & Record<string, unknown>

  const classes = cn(base, variants[variant], sizes[size], className)
  const content = (
    <>
      <span>{children}</span>
      {withArrow && <Arrow />}
    </>
  )

  if ('to' in props && props.to) {
    return (
      <Link to={props.to} className={classes}>
        {content}
      </Link>
    )
  }

  if ('href' in props && props.href) {
    const external = props.external ?? /^https?:/.test(props.href)
    return (
      <a
        href={props.href}
        className={classes}
        aria-label={props.ariaLabel}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {content}
      </a>
    )
  }

  const { type = 'button', onClick, disabled } = rest as ButtonAsButton
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {content}
    </button>
  )
}

function Arrow() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className="h-3.5 w-3.5 shrink-0 transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2.5 8h10M9 4.5 12.5 8 9 11.5" />
    </svg>
  )
}
