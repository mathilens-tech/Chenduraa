import { Seo } from '@/lib/seo'
import { PageHero } from '@/components/sections/PageHero'
import { Section, SectionHeading } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/graphics/Icon'
import { solutionScenes } from '@/components/graphics/Scene'
import { Gallery } from '@/components/sections/Gallery'
import { Process } from '@/components/sections/Process'
import { FinalCta } from '@/components/sections/FinalCta'
import { solutions } from '@/content/solutions'
import { breadcrumbSchema } from '@/lib/schema'
import { cn } from '@/lib/cn'

export default function Solutions() {
  return (
    <>
      <Seo
        title="Solar Solutions"
        description="Residential and commercial solar solutions from Chenduraa Energy — rooftop solar systems designed around your roof area, shading and electricity requirement, installed and maintained by our team."
        path="/solutions"
        jsonLd={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Solar Solutions', path: '/solutions' },
        ])}
      />

      <PageHero
        eyebrow="Solutions"
        title="Solar solutions for homes and businesses"
        lead="We design around the property in front of us — its roof, its shading, its load and how it is used through the day."
      />

      {/* Detail blocks, alternating sides */}
      {solutions.map((solution, index) => {
        const Scene = solutionScenes[solution.graphic]
        const reversed = index % 2 === 1

        return (
          <Section
            key={solution.slug}
            id={solution.slug}
            tone={reversed ? 'warm' : 'light'}
            className="scroll-mt-24"
          >
            <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
              <Reveal className={cn('lg:col-span-6', reversed && 'lg:order-2')}>
                <div className="overflow-hidden rounded-[6px] border border-line shadow-card">
                  <Scene className="aspect-[8/5] w-full" />
                </div>
              </Reveal>

              <div className={cn('lg:col-span-6', reversed && 'lg:order-1')}>
                <Reveal>
                  <p className="eyebrow mb-3.5 flex items-center gap-2.5 text-gold-600">
                    <span aria-hidden="true" className="h-px w-7 bg-current opacity-60" />
                    {String(index + 1).padStart(2, '0')} — Solution
                  </p>
                  <h2 className="text-d2">{solution.title}</h2>
                </Reveal>

                <Reveal delay={80}>
                  <p className="mt-5 text-[1.0625rem] leading-[1.75] text-body">{solution.summary}</p>
                  <p className="mt-4 text-[0.9375rem] leading-[1.75] text-slate-muted">
                    {solution.detail}
                  </p>
                </Reveal>

                <Reveal delay={130}>
                  <ul className="mt-7 space-y-3 border-t border-line pt-7">
                    {solution.points.map((point) => (
                      <li key={point} className="flex gap-3.5">
                        <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold-50 text-gold-600 ring-1 ring-gold-200">
                          <Icon name="check" className="h-3 w-3" strokeWidth={2.6} />
                        </span>
                        <span className="text-[0.9375rem] leading-[1.65] text-body">{point}</span>
                      </li>
                    ))}
                  </ul>
                </Reveal>

                <Reveal delay={180} className="mt-8">
                  <Button to="/contact" withArrow>
                    Discuss your requirement
                  </Button>
                </Reveal>
              </div>
            </div>
          </Section>
        )
      })}

      {/* What a system is made of — neutral, no brands */}
      <Section tone="tint">
        <SectionHeading
          eyebrow="System Components"
          title="What makes up a solar system"
          lead="The parts that go into an installation, and what each of them does."
          align="center"
        />
        <ul className="mx-auto mt-12 grid max-w-5xl gap-6 sm:mt-14 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: 'Solar modules',
              description: 'Convert sunlight into DC electricity. Laid out to suit the usable area.',
            },
            {
              title: 'Mounting structure',
              description:
                'Holds the modules at the right tilt, fixed appropriately for the roof type.',
            },
            {
              title: 'Inverter',
              description: 'Converts DC output into AC electricity your premises can use.',
            },
            {
              title: 'Balance of system',
              description:
                'Cabling, protection devices, earthing and metering that tie the system together.',
            },
          ].map((item, index) => (
            <Reveal as="li" key={item.title} delay={index * 70}>
              <div className="h-full rounded-[4px] border border-line bg-white p-6">
                <h3 className="font-display text-[1rem] font-bold text-navy-700">{item.title}</h3>
                <p className="mt-2 text-[0.9375rem] leading-[1.65] text-body">{item.description}</p>
              </div>
            </Reveal>
          ))}
        </ul>
        {/* TODO_CLIENT: confirm the module / inverter brands you supply if you want them named. */}
        <Reveal className="mt-10 text-center">
          <p className="mx-auto max-w-2xl text-[0.9375rem] leading-[1.7] text-slate-muted">
            Component specifications for your system are confirmed in writing as part of the system
            design, before installation begins.
          </p>
        </Reveal>
      </Section>

      <Gallery variant="preview" tone="light" />
      <Process />
      <FinalCta
        title="Not sure which solution fits your property?"
        lead="Share a few details about your site and we will tell you what is feasible — that conversation costs you nothing."
      />
    </>
  )
}
