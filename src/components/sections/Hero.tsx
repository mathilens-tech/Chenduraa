import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { HeroArt } from '@/components/graphics/HeroArt'
import { Icon } from '@/components/graphics/Icon'

/** Neutral capability descriptors — no figures, no claims. */
const capabilities = [
  { icon: 'assessment' as const, label: 'Site assessment & design' },
  { icon: 'installation' as const, label: 'Professional installation' },
  { icon: 'maintenance' as const, label: 'Operation & maintenance' },
]

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-navy-900" aria-labelledby="hero-heading">
      {/* Artwork */}
      <div aria-hidden="true" className="absolute inset-0 -z-20">
        <HeroArt className="h-full w-full object-cover lg:ml-auto lg:w-[62%]" />
      </div>

      {/* Legibility gradient over the artwork */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,rgb(4_18_37/0.9),rgb(4_18_37/0.72))] lg:bg-[linear-gradient(105deg,rgb(4_18_37/0.97)_0%,rgb(4_18_37/0.93)_42%,rgb(4_18_37/0.55)_66%,rgb(4_18_37/0.35)_100%)]"
      />

      <Container width="wide">
        <div className="grid items-center py-20 sm:py-24 lg:min-h-[38rem] lg:grid-cols-12 lg:py-32">
          <div className="lg:col-span-7 xl:col-span-6">
            <p className="eyebrow flex items-center gap-2.5 text-gold-300">
              <span aria-hidden="true" className="h-px w-7 bg-current opacity-60" />
              Solar Energy Solutions
            </p>

            <h1 id="hero-heading" className="mt-5 text-d1 text-white">
              Powering a Smarter,
              <br className="hidden sm:block" /> <span className="text-gold-300">Sustainable</span>{' '}
              Future
            </h1>

            <p className="mt-6 max-w-xl text-[1.0625rem] leading-[1.75] text-navy-100/85 sm:text-[1.125rem]">
              Chenduraa Energy Solar Power Pvt. Ltd. designs, installs and maintains solar energy
              systems for homes and businesses — from the first site assessment through to long-term
              operation and maintenance support.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button to="/contact" size="lg" withArrow>
                Request a Consultation
              </Button>
              <Button to="/solutions" variant="onDark" size="lg">
                Explore Solutions
              </Button>
            </div>

            <ul className="mt-12 grid gap-x-8 gap-y-4 border-t border-white/12 pt-8 sm:grid-cols-3">
              {capabilities.map((item) => (
                <li key={item.label} className="flex items-start gap-2.5">
                  <Icon name={item.icon} className="mt-px h-[1.125rem] w-[1.125rem] shrink-0 text-gold-400" />
                  <span className="text-[0.875rem] leading-snug font-medium text-navy-100/80">
                    {item.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  )
}
