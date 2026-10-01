import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

type ContainerProps = {
  children: ReactNode
  className?: string
  /** `wide` for full-bleed layout bands, `narrow` for reading-width copy. */
  width?: 'default' | 'wide' | 'narrow'
}

const widths = {
  default: 'max-w-[76rem]',
  wide: 'max-w-[86rem]',
  narrow: 'max-w-[48rem]',
}

export function Container({ children, className, width = 'default' }: ContainerProps) {
  return (
    <div className={cn('mx-auto w-full px-5 sm:px-7 lg:px-10', widths[width], className)}>
      {children}
    </div>
  )
}
