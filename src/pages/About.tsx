import { Seo } from '@/lib/seo'
import { PageHero } from '@/components/sections/PageHero'
import { Section, SectionHeading } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/graphics/Icon'
import { CommercialScene } from '@/components/graphics/Scene'
import { WhyUs } from '@/components/sections/WhyUs'
import { Process } from '@/components/sections/Process'
import { FinalCta } from '@/components/sections/FinalCta'
import { breadcrumbSchema } from '@/lib/schema'
import { offices } from '@/config/company'

const approach = [
  {
    icon: 'assessment' as const,
    title: 'Start with the site',
    description:
      'Roof area, orientation, shading through the day and the existing electrical setup decide what is actually possible. We look at those first.',
  },
  {
    icon: 'design' as const,
    title: 'Design for the requirement',
    description:
      'The system is sized around how the property uses electricity, not around a package we happen to sell.',
  },
  {
    icon: 'installation' as const,
    title: 'Install it properly',
    description:
      'Structure, module fixing, electrical work, earthing and commissioning carried out methodically and tested before handover.',
  },
  {
    icon: 'support' as const,
    title: 'Stay involved afterwards',
    description:
      'Operation and maintenance support so the system keeps doing what it was designed to do.',
  },
]

export default function About() {
  return (
    <>
      <Seo
        title="About Us"
        description="About Chenduraa Energy Solar Power Pvt. Ltd. — a solar energy company providing consultation, system design, solar installation, operation & maintenance and subsidy assistance for homes and businesses."
        path="/about"
        jsonLd={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'About Us', path: '/about' },
        ])}
      />

      <PageHero
        eyebrow="About Us"
        title="A solar company built around the site, not the sale"
        lead="Chenduraa Energy Solar Power Pvt. Ltd. provides solar energy solutions for residential and commercial properties — from the first consultation through to long-term maintenance."
      />

      {/* Who we are */}
      <Section tone="light">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <Reveal>
              <p className="eyebrow mb-3.5 flex items-center gap-2.5 text-gold-600">
                <span aria-hidden="true" className="h-px w-7 bg-current opacity-60" />
                Who we are
              </p>
              <h2 className="text-d2">Solar solutions, delivered end to end</h2>
            </Reveal>

            <Reveal delay={80}>
              <div className="mt-5 space-y-4 text-[1.0625rem] leading-[1.75] text-body">
                <p>
                  We are a solar energy company working with homes and businesses that want to
                  generate part of their own electricity. Our work covers the whole sequence —
                  consultation, site assessment, system design, installation, commissioning and
                  ongoing maintenance.
                </p>
                <p>
                  Because we handle each of those stages ourselves, you have a single point of
                  contact throughout. There is no gap between the person who designed the system and
                  the team that installs it.
                </p>
                <p>
                  Where a solar subsidy scheme applies to your installation, we help you work
                  through the documentation and the application steps involved.
                </p>
                {/*
                  TODO_CLIENT: supply company background — year established, registration/CIN,
                  leadership, team size, certifications and any service-area details you want
                  published. Nothing of that kind is stated here because none of it is confirmed.
                */}
              </div>
            </Reveal>

            {offices.length > 0 && (
              <Reveal delay={140} className="mt-8">
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-line pt-6">
                  <span className="eyebrow text-slate-muted">
                    {offices.length > 1 ? 'Offices' : 'Based in'}
                  </span>
                  <ul className="flex flex-wrap gap-x-5 gap-y-1">
                    {offices.map((office) => (
                      <li
                        key={office.id}
                        className="flex items-center gap-1.5 text-[0.9375rem] font-medium text-navy-700"
                      >
                        <Icon name="pin" className="h-4 w-4 text-gold-600" />
                        {office.city}, {office.state}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            )}
          </div>

          <Reveal delay={120} className="lg:col-span-6">
            <div className="overflow-hidden rounded-[6px] border border-line shadow-card">
              <CommercialScene className="aspect-[8/5] w-full" />
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Approach */}
      <Section tone="warm">
        <SectionHeading
          eyebrow="Our Approach"
          title="How we go about it"
          lead="Four principles that shape every installation we take on."
          align="center"
        />

        <ol className="mt-12 grid gap-px overflow-hidden rounded-[4px] border border-line bg-line sm:mt-14 sm:grid-cols-2">
          {approach.map((item, index) => (
            <Reveal as="li" key={item.title} delay={(index % 2) * 70} className="bg-white">
              <div className="h-full p-7 sm:p-9">
                <div className="flex items-center gap-4">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[3px] bg-navy-700 text-gold-300">
                    <Icon name={item.icon} className="h-[1.375rem] w-[1.375rem]" />
                  </span>
                  <h3 className="font-display text-[1.0625rem] font-bold text-navy-700">
                    {item.title}
                  </h3>
                </div>
                <p className="mt-4 text-[0.9375rem] leading-[1.7] text-body">{item.description}</p>
              </div>
            </Reveal>
          ))}
        </ol>

        <Reveal className="mt-12 flex justify-center">
          <Button to="/solutions" variant="secondary" withArrow>
            See our solar solutions
          </Button>
        </Reveal>
      </Section>

      <WhyUs tone="light" />
      <Process />
      <FinalCta />
    </>
  )
}
