import { Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { Button } from '@/components/ui/Button'
import { Icon, type IconName } from '@/components/graphics/Icon'

const pillars: { icon: IconName; title: string; description: string }[] = [
  {
    icon: 'sun',
    title: 'Solar solutions',
    description: 'Grid-tied and hybrid systems sized to the property they are built for.',
  },
  {
    icon: 'install',
    title: 'Professional installation',
    description: 'Structure, electrical work, testing and commissioning by our own team.',
  },
  {
    icon: 'customer',
    title: 'Customer-focused service',
    description: 'Plain explanations at every stage, from first enquiry to handover.',
  },
  {
    icon: 'support',
    title: 'Long-term support',
    description: 'Operation and maintenance support after the system is commissioned.',
  },
]

export function Intro() {
  return (
    <Section tone="light" spacing="default">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="eyebrow mb-3.5 flex items-center gap-2.5 text-gold-600">
              <span aria-hidden="true" className="h-px w-7 bg-current opacity-60" />
              About Chenduraa Energy
            </p>
            <h2 className="text-d2">
              Reliable solar solutions.
              <br className="hidden sm:block" /> Built for a sustainable future.
            </h2>
          </Reveal>

          <Reveal delay={80}>
            <div className="mt-5 space-y-4 text-[1.0625rem] leading-[1.75] text-body">
              <p>
                Chenduraa Energy Solar Power Pvt. Ltd. provides solar energy solutions designed
                around the electricity requirements of homes and businesses. Every system starts
                with an assessment of the site itself — available area, orientation, shading and the
                existing electrical setup.
              </p>
              <p>
                We handle consultation, system design, installation and commissioning, and stay
                involved afterwards through operation and maintenance support. Where a solar subsidy
                scheme applies, we help you work through the documentation.
              </p>
            </div>
          </Reveal>

          <Reveal delay={140} className="mt-8">
            <Button to="/about" variant="secondary" withArrow>
              More about us
            </Button>
          </Reveal>
        </div>

        {/* Pillars */}
        <div className="lg:col-span-7">
          <ul className="grid gap-px overflow-hidden rounded-[4px] border border-line bg-line sm:grid-cols-2">
            {pillars.map((pillar, index) => (
              <Reveal as="li" key={pillar.title} delay={index * 70} className="bg-white">
                <div className="h-full p-6 transition-colors duration-300 hover:bg-surface-warm sm:p-7">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-[3px] bg-navy-50 text-navy-600">
                    <Icon name={pillar.icon} className="h-[1.375rem] w-[1.375rem]" />
                  </span>
                  <h3 className="mt-5 font-display text-[1.0625rem] font-bold text-navy-700">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-[0.9375rem] leading-[1.65] text-body">
                    {pillar.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}
