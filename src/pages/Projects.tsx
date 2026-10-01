import { Seo } from '@/lib/seo'
import { PageHero } from '@/components/sections/PageHero'
import { Gallery } from '@/components/sections/Gallery'
import { Section, SectionHeading } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/graphics/Icon'
import { FinalCta } from '@/components/sections/FinalCta'
import { projects } from '@/content/projects'
import { breadcrumbSchema } from '@/lib/schema'

const considerations = [
  {
    icon: 'assessment' as const,
    title: 'Usable area',
    description:
      'Not all roof area is usable. Water tanks, stairwells, parapets and access paths all reduce what can be built on.',
  },
  {
    icon: 'sun' as const,
    title: 'Shading through the day',
    description:
      'Neighbouring buildings, trees and even the roof structure itself cast shadows that move. Layout has to account for them.',
  },
  {
    icon: 'design' as const,
    title: 'Roof type and structure',
    description:
      'Concrete, tiled and profiled metal sheet roofs each need different mounting, and the structure has to carry the load.',
  },
  {
    icon: 'endToEnd' as const,
    title: 'Electrical infrastructure',
    description:
      'Where the inverter goes, how cabling is routed and how the system ties into existing distribution all affect the design.',
  },
]

export default function Projects() {
  const hasProjects = projects.length > 0

  return (
    <>
      <Seo
        title={hasProjects ? 'Projects' : 'Projects & Installations'}
        description="Solar installations by Chenduraa Energy — residential and commercial rooftop solar, metal sheet roof, ground-mount and hybrid system configurations."
        path="/projects"
        jsonLd={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Projects', path: '/projects' },
        ])}
      />

      <PageHero
        eyebrow="Projects"
        title={hasProjects ? 'Our solar installations' : 'Solar installations we build'}
        lead={
          hasProjects
            ? 'Residential and commercial solar systems designed, installed and commissioned by our team.'
            : 'The system configurations we design and install, and what determines which one suits a given site.'
        }
      />

      <Gallery variant="full" tone="light" />

      {/* What shapes a design — useful, factual, no claims */}
      <Section tone="warm">
        <SectionHeading
          eyebrow="Site Factors"
          title="What decides the right layout"
          lead="Two buildings of the same size rarely take the same system. These are the factors we work through during assessment."
          align="center"
        />

        <ul className="mx-auto mt-12 grid max-w-5xl gap-x-10 gap-y-9 sm:mt-14 sm:grid-cols-2 lg:gap-x-14">
          {considerations.map((item, index) => (
            <Reveal as="li" key={item.title} delay={(index % 2) * 70} className="flex gap-4">
              <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[3px] bg-white text-navy-600 ring-1 ring-line">
                <Icon name={item.icon} className="h-5 w-5" strokeWidth={1.7} />
              </span>
              <div>
                <h3 className="font-display text-[1.0625rem] font-bold text-navy-700">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-[0.9375rem] leading-[1.7] text-body">{item.description}</p>
              </div>
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-12 flex justify-center">
          <Button to="/contact" withArrow>
            Book a site assessment
          </Button>
        </Reveal>
      </Section>

      <FinalCta
        title="Have a site in mind?"
        lead="Send us the location and roof type, and we will tell you what kind of system it can take."
      />
    </>
  )
}
