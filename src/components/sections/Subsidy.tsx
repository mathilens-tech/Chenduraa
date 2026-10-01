import { Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/graphics/Icon'

const steps = [
  {
    icon: 'assessment' as const,
    title: 'Check what applies',
    description:
      'We look at your installation and tell you which subsidy route is relevant to it, if any.',
  },
  {
    icon: 'subsidy' as const,
    title: 'Prepare the paperwork',
    description: 'We help you assemble the documents the application requires.',
  },
  {
    icon: 'support' as const,
    title: 'Follow it through',
    description: 'We stay with the application through the process rather than handing it over.',
  },
]

export function Subsidy() {
  return (
    <Section id="subsidy-assistance" tone="light" spacing="default">
      <div className="overflow-hidden rounded-[6px] border border-line bg-surface-tint">
        <div className="grid lg:grid-cols-12">
          <div className="p-8 sm:p-10 lg:col-span-5 lg:p-12">
            <Reveal>
              <p className="eyebrow mb-3.5 flex items-center gap-2.5 text-gold-600">
                <span aria-hidden="true" className="h-px w-7 bg-current opacity-60" />
                Subsidy Assistance
              </p>
              <h2 className="text-d2">Help with the subsidy process</h2>
            </Reveal>

            <Reveal delay={80}>
              <p className="mt-5 text-[1.0625rem] leading-[1.75] text-body">
                Solar subsidy schemes come with their own eligibility conditions, documentation and
                timelines, and these are revised from time to time. We help you work through the
                steps that apply to your installation and keep you informed of where the application
                stands.
              </p>
              {/*
                Deliberately no amounts, percentages or eligibility criteria — these change and
                must come from the client / the scheme itself.
                TODO_CLIENT: confirm which schemes you assist with, if you want them named here.
              */}
              <p className="mt-4 text-[0.9375rem] leading-[1.7] text-slate-muted">
                Applicable schemes, conditions and timelines are confirmed for your specific
                installation during consultation.
              </p>
            </Reveal>

            <Reveal delay={140} className="mt-8">
              <Button to="/contact" withArrow>
                Talk to Our Team
              </Button>
            </Reveal>
          </div>

          <div className="border-t border-line bg-white p-8 sm:p-10 lg:col-span-7 lg:border-t-0 lg:border-l lg:p-12">
            <ol className="space-y-8">
              {steps.map((step, index) => (
                <Reveal as="li" key={step.title} delay={index * 80} className="flex gap-5">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[3px] bg-navy-50 text-navy-600">
                    <Icon name={step.icon} className="h-[1.375rem] w-[1.375rem]" />
                  </span>
                  <div>
                    <h3 className="font-display text-[1.0625rem] font-bold text-navy-700">
                      {step.title}
                    </h3>
                    <p className="mt-1.5 text-[0.9375rem] leading-[1.7] text-body">
                      {step.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </Section>
  )
}
