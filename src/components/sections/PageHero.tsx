import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Container } from '@/components/ui/Container'

type PageHeroProps = {
  eyebrow: string
  title: string
  lead?: ReactNode
  children?: ReactNode
}

/** Compact navy banner used at the top of every inner page. */
export function PageHero({ eyebrow, title, lead, children }: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-navy-800" aria-labelledby="page-heading">
      <div
        aria-hidden="true"
        className="array-grid pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(85%_80%_at_20%_0%,black,transparent)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-24 -z-10 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgb(234_173_48/0.16),transparent_70%)]"
      />

      <Container width="wide">
        <div className="max-w-3xl py-14 sm:py-16 lg:py-20">
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-2 text-[0.8125rem] text-navy-100/60">
              <li>
                <Link to="/" className="transition-colors hover:text-white">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="font-medium text-gold-300">{eyebrow}</li>
            </ol>
          </nav>

          <h1 id="page-heading" className="text-d1 text-white">
            {title}
          </h1>

          {lead && (
            <p className="mt-5 max-w-2xl text-[1.0625rem] leading-[1.75] text-navy-100/85">{lead}</p>
          )}

          {children}
        </div>
      </Container>
    </section>
  )
}
