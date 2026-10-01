import type { ReactNode } from 'react'
import { PageHero } from '@/components/sections/PageHero'
import { Section } from '@/components/ui/Section'

/** Shared shell + typography for the legal pages. */
export function LegalPage({
  eyebrow,
  title,
  lead,
  updated,
  children,
}: {
  eyebrow: string
  title: string
  lead: string
  updated: string
  children: ReactNode
}) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} lead={lead} />
      <Section tone="light" width="narrow">
        <p className="mb-10 border-b border-line pb-6 text-[0.875rem] text-slate-muted">
          Last updated: {updated}
        </p>
        <div
          className={[
            'space-y-8',
            '[&_h2]:font-display [&_h2]:text-[1.25rem] [&_h2]:font-bold [&_h2]:text-navy-700',
            '[&_h2]:mb-3 [&_h2]:scroll-mt-28',
            '[&_p]:text-[1rem] [&_p]:leading-[1.8] [&_p]:text-body',
            '[&_p+p]:mt-4',
            '[&_ul]:mt-4 [&_ul]:space-y-2.5 [&_ul]:pl-0',
            '[&_li]:relative [&_li]:pl-6 [&_li]:text-[1rem] [&_li]:leading-[1.75] [&_li]:text-body',
            "[&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:top-[0.65em] [&_li]:before:h-1.5 [&_li]:before:w-1.5 [&_li]:before:rounded-full [&_li]:before:bg-gold-400 [&_li]:before:content-['']",
            '[&_a]:font-medium [&_a]:text-navy-700 [&_a]:underline [&_a]:decoration-navy-700/30 [&_a]:underline-offset-4',
            '[&_a:hover]:text-gold-600',
          ].join(' ')}
        >
          {children}
        </div>
      </Section>
    </>
  )
}
