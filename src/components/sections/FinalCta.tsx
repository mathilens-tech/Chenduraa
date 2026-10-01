import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/graphics/Icon'
import { contact, telHref, whatsappHref } from '@/config/company'

type FinalCtaProps = {
  title?: string
  lead?: string
}

export function FinalCta({
  title = 'Ready to explore solar for your home or business?',
  lead = 'Tell us about your property and what you want from a solar system. We will take it from there — starting with a consultation and a look at your site.',
}: FinalCtaProps) {
  const whatsapp = whatsappHref('Hello, I would like to request a solar consultation.')

  return (
    <section className="relative isolate overflow-hidden bg-navy-800" aria-labelledby="final-cta-heading">
      <div
        aria-hidden="true"
        className="array-grid pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(70%_70%_at_50%_50%,black,transparent)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 left-1/2 -z-10 h-96 w-[40rem] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgb(234_173_48/0.18),transparent_70%)]"
      />

      <Container>
        <Reveal className="py-16 text-center sm:py-20 lg:py-24">
          <h2 id="final-cta-heading" className="mx-auto max-w-2xl text-d2 text-white">
            {title}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[1.0625rem] leading-[1.75] text-navy-100/80">
            {lead}
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button to="/contact" size="lg" withArrow>
              Request a Consultation
            </Button>
            {whatsapp ? (
              <Button href={whatsapp} variant="onDark" size="lg">
                Chat on WhatsApp
              </Button>
            ) : (
              <Button to="/projects" variant="onDark" size="lg">
                See what we install
              </Button>
            )}
          </div>

          {telHref && (
            <p className="mt-7 text-[0.9375rem] text-navy-100/70">
              Or call us on{' '}
              <a
                href={telHref}
                className="inline-flex items-center gap-1.5 font-semibold text-gold-300 underline decoration-gold-300/30 underline-offset-4 transition-colors hover:decoration-gold-300"
              >
                <Icon name="phone" className="h-4 w-4" />
                {contact.phone}
              </a>
            </p>
          )}
        </Reveal>
      </Container>
    </section>
  )
}
