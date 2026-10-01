import { Section, SectionHeading } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/graphics/Icon'
import { services } from '@/content/services'

type ServicesGridProps = {
  /** `detail` shows the longer copy — used on the Services page. */
  variant?: 'summary' | 'detail'
  tone?: 'light' | 'warm' | 'tint'
  showCta?: boolean
}

export function ServicesGrid({
  variant = 'summary',
  tone = 'light',
  showCta = true,
}: ServicesGridProps) {
  return (
    <Section id="services" tone={tone} spacing="default">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          eyebrow="Services"
          title="What we do, end to end"
          lead="Consultation through to long-term maintenance, handled by one team so nothing falls between contractors."
          className="lg:max-w-xl"
        />
        {showCta && (
          <Reveal delay={90} className="shrink-0">
            <Button to="/services" variant="secondary" withArrow>
              All services
            </Button>
          </Reveal>
        )}
      </div>

      <ul className="mt-12 grid gap-px overflow-hidden rounded-[4px] border border-line bg-line sm:mt-14 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <Reveal as="li" key={service.slug} delay={(index % 3) * 70} className="bg-white">
            <article id={service.slug} className="group h-full scroll-mt-28 p-6 transition-colors duration-300 hover:bg-surface-warm sm:p-8">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-[3px] bg-navy-700 text-gold-300 transition-colors duration-300 group-hover:bg-navy-600">
                <Icon name={service.icon} className="h-6 w-6" />
              </span>

              <h3 className="mt-5 font-display text-[1.125rem] font-bold text-navy-700">
                {service.title}
              </h3>
              <p className="mt-2.5 text-[0.9375rem] leading-[1.7] text-body">{service.summary}</p>

              {variant === 'detail' && (
                <p className="mt-3.5 border-t border-line pt-3.5 text-[0.9375rem] leading-[1.7] text-slate-muted">
                  {service.detail}
                </p>
              )}
            </article>
          </Reveal>
        ))}
      </ul>
    </Section>
  )
}
