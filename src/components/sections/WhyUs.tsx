import { Section, SectionHeading } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { Icon } from '@/components/graphics/Icon'
import { valuePoints } from '@/content/values'

export function WhyUs({ tone = 'light' }: { tone?: 'light' | 'warm' }) {
  return (
    <Section id="why-chenduraa" tone={tone} spacing="default">
      <SectionHeading
        eyebrow="Why Chenduraa"
        title="How we work"
        lead="What you can expect from us, stated plainly."
        align="center"
      />

      <ul className="mx-auto mt-12 grid max-w-5xl gap-x-10 gap-y-9 sm:mt-14 sm:grid-cols-2 lg:gap-x-14">
        {valuePoints.map((point, index) => (
          <Reveal as="li" key={point.title} delay={(index % 2) * 70} className="flex gap-4">
            <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold-50 text-gold-600 ring-1 ring-gold-200">
              <Icon name={point.icon} className="h-5 w-5" strokeWidth={1.7} />
            </span>
            <div>
              <h3 className="font-display text-[1.0625rem] font-bold text-navy-700">
                {point.title}
              </h3>
              <p className="mt-1.5 text-[0.9375rem] leading-[1.7] text-body">{point.description}</p>
            </div>
          </Reveal>
        ))}
      </ul>
    </Section>
  )
}
