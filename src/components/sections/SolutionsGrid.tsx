import { Link } from 'react-router-dom'
import { Section, SectionHeading } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { Icon } from '@/components/graphics/Icon'
import { solutionScenes } from '@/components/graphics/Scene'
import { solutions } from '@/content/solutions'
import { cn } from '@/lib/cn'

/** Solution category cards. Layout adapts to however many categories are enabled. */
export function SolutionsGrid({ tone = 'warm' }: { tone?: 'warm' | 'light' }) {
  const columns =
    solutions.length >= 3 ? 'md:grid-cols-2 lg:grid-cols-3' : 'md:grid-cols-2'

  return (
    <Section id="solutions" tone={tone} spacing="default">
      <SectionHeading
        eyebrow="Solar Solutions"
        title="Solutions for every kind of property"
        lead="Homes and commercial premises use electricity very differently. We design around how your property actually operates rather than fitting it to a standard package."
      />

      <ul className={cn('mt-12 grid gap-6 sm:mt-14 lg:gap-7', columns)}>
        {solutions.map((solution, index) => {
          const Scene = solutionScenes[solution.graphic]
          return (
            <Reveal as="li" key={solution.slug} delay={index * 90} className="h-full">
              <article className="group flex h-full flex-col overflow-hidden rounded-[4px] border border-line bg-white shadow-card transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-navy-200 hover:shadow-lift">
                <div className="relative aspect-[8/5] overflow-hidden bg-navy-50">
                  <Scene className="h-full w-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]" />
                </div>

                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <h3 className="font-display text-d3">{solution.title}</h3>
                  <p className="mt-3 flex-1 text-[0.9375rem] leading-[1.7] text-body">
                    {solution.summary}
                  </p>
                  <Link
                    to={`/solutions#${solution.slug}`}
                    className="mt-6 inline-flex items-center gap-1.5 self-start rounded-sm font-display text-[0.875rem] font-semibold text-navy-700 transition-colors hover:text-gold-600"
                  >
                    Explore {solution.title.toLowerCase()}
                    <Icon
                      name="arrowUpRight"
                      className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      strokeWidth={1.9}
                    />
                  </Link>
                </div>
              </article>
            </Reveal>
          )
        })}
      </ul>
    </Section>
  )
}
