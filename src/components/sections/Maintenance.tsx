import { Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/graphics/Icon'

const checks = [
  'Periodic inspection of modules, structure and connections',
  'Guidance on module cleaning and how often your site needs it',
  'Inverter and electrical checks, including fault attention',
  'A review of shading changes that affect generation over time',
]

export function Maintenance() {
  return (
    <Section id="operation-maintenance" tone="warm" spacing="default">
      <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <Reveal>
            <p className="eyebrow mb-3.5 flex items-center gap-2.5 text-gold-600">
              <span aria-hidden="true" className="h-px w-7 bg-current opacity-60" />
              Operation &amp; Maintenance
            </p>
            <h2 className="text-d2">Solar doesn&rsquo;t end at installation.</h2>
          </Reveal>

          <Reveal delay={80}>
            <p className="mt-5 text-[1.0625rem] leading-[1.75] text-body">
              A solar system works outdoors, every day, for years. Dust, shading changes, loose
              connections and inverter faults all affect how much it generates. Our operation and
              maintenance support keeps the system attended to, so small issues get found before
              they become large ones.
            </p>
          </Reveal>

          <Reveal delay={140} className="mt-8">
            <Button to="/services#operation-maintenance" variant="secondary" withArrow>
              About our O&amp;M support
            </Button>
          </Reveal>
        </div>

        <Reveal delay={120} className="lg:col-span-6">
          <div className="rounded-[4px] border border-line bg-white p-7 shadow-card sm:p-9">
            <h3 className="font-display text-[1.0625rem] font-bold text-navy-700">
              What maintenance support covers
            </h3>
            <ul className="mt-5 space-y-4">
              {checks.map((item) => (
                <li key={item} className="flex gap-3.5">
                  <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-eco-100 text-eco-500">
                    <Icon name="check" className="h-3 w-3" strokeWidth={2.6} />
                  </span>
                  <span className="text-[0.9375rem] leading-[1.65] text-body">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
