import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Container } from './Container'
import { Reveal } from './Reveal'

type Tone = 'light' | 'warm' | 'tint' | 'navy'
type Spacing = 'default' | 'tight' | 'loose'

const tones: Record<Tone, string> = {
  light: 'bg-white text-body',
  warm: 'bg-surface-warm text-body',
  tint: 'bg-surface-tint text-body',
  navy: 'bg-navy-800 text-navy-100',
}

const spacings: Record<Spacing, string> = {
  tight: 'py-12 sm:py-16',
  default: 'py-16 sm:py-20 lg:py-28',
  loose: 'py-20 sm:py-28 lg:py-36',
}

type SectionProps = {
  children: ReactNode
  id?: string
  tone?: Tone
  spacing?: Spacing
  className?: string
  containerClassName?: string
  width?: 'default' | 'wide' | 'narrow'
  /** Adds the hairline array grid texture. */
  grid?: boolean
  /** Set false to render children outside a Container. */
  contained?: boolean
  ariaLabel?: string
}

export function Section({
  children,
  id,
  tone = 'light',
  spacing = 'default',
  className,
  containerClassName,
  width = 'default',
  grid = false,
  contained = true,
  ariaLabel,
}: SectionProps) {
  const body = contained ? (
    <Container width={width} className={containerClassName}>
      {children}
    </Container>
  ) : (
    children
  )

  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={cn('relative isolate', tones[tone], spacings[spacing], className)}
    >
      {grid && (
        <div
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute inset-0 -z-10',
            tone === 'navy' ? 'array-grid' : 'array-grid-light',
            '[mask-image:radial-gradient(75%_60%_at_50%_0%,black,transparent)]',
          )}
        />
      )}
      {body}
    </section>
  )
}

/* ------------------------------ SectionHeading ----------------------------- */

type SectionHeadingProps = {
  eyebrow?: string
  title: ReactNode
  lead?: ReactNode
  align?: 'left' | 'center'
  tone?: 'light' | 'dark'
  /** Heading level — keeps the document outline correct per page. */
  as?: 'h1' | 'h2' | 'h3'
  className?: string
  children?: ReactNode
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = 'left',
  tone = 'light',
  as: Heading = 'h2',
  className,
  children,
}: SectionHeadingProps) {
  const dark = tone === 'dark'
  return (
    <Reveal
      className={cn(
        'max-w-2xl',
        align === 'center' && 'mx-auto text-center',
        align === 'center' && 'max-w-3xl',
        className,
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            'eyebrow mb-3.5 flex items-center gap-2.5',
            align === 'center' && 'justify-center',
            dark ? 'text-gold-300' : 'text-gold-600',
          )}
        >
          <span aria-hidden="true" className="h-px w-7 bg-current opacity-60" />
          {eyebrow}
        </p>
      )}
      <Heading className={cn('text-d2', dark && 'text-white')}>{title}</Heading>
      {lead && (
        <p className={cn('mt-4 text-[1.0625rem] leading-[1.7]', dark ? 'text-navy-100/85' : 'text-body')}>
          {lead}
        </p>
      )}
      {children}
    </Reveal>
  )
}
