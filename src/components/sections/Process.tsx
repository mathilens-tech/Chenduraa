import { Section, SectionHeading } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { processSteps } from '@/content/process'

export function Process() {
  return (
    <Section id="process" tone="navy" spacing="default" grid>
      <SectionHeading
        eyebrow="Our Process"
        tone="dark"
        title="A clear path from enquiry to commissioning"
        lead="Six stages, each with a defined outcome, so you always know where your installation stands."
      />

      <ol className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-x-10 lg:gap-y-14">
        {processSteps.map((step, index) => (
          <Reveal as="li" key={step.step} delay={(index % 3) * 80} className="relative">
            <div className="flex items-baseline gap-4">
              <span
                aria-hidden="true"
                className="font-display text-[2.5rem] leading-none font-extrabold tracking-tight text-transparent [-webkit-text-stroke:1px_rgb(234_173_48/0.55)]"
              >
                {step.step}
              </span>
              <span className="h-px flex-1 bg-white/12" />
            </div>

            <h3 className="mt-4 font-display text-[1.125rem] font-bold text-white">{step.title}</h3>
            <p className="mt-2 text-[0.9375rem] leading-[1.7] text-navy-100/70">
              {step.description}
            </p>
          </Reveal>
        ))}
      </ol>
    </Section>
  )
}
