import { Link } from 'react-router-dom'
import { Seo } from '@/lib/seo'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { primaryNav } from '@/config/navigation'

export default function NotFound() {
  return (
    <>
      <Seo
        title="Page Not Found"
        description="The page you were looking for could not be found."
        path="/404"
        noindex
      />

      <section className="relative isolate overflow-hidden bg-navy-900">
        <div
          aria-hidden="true"
          className="array-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(70%_70%_at_50%_30%,black,transparent)]"
        />
        <Container>
          <div className="relative py-24 text-center sm:py-32">
            <p className="eyebrow text-gold-300">Error 404</p>
            <h1 className="mt-4 text-d1 text-white">This page isn&rsquo;t here</h1>
            <p className="mx-auto mt-5 max-w-lg text-[1.0625rem] leading-[1.75] text-navy-100/80">
              The link may be out of date, or the address may have been mistyped. Here is the way
              back.
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button to="/" size="lg" withArrow>
                Back to home
              </Button>
              <Button to="/contact" variant="onDark" size="lg">
                Contact us
              </Button>
            </div>

            <nav aria-label="Site pages" className="mt-14 border-t border-white/12 pt-8">
              <ul className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
                {primaryNav.map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className="text-[0.9375rem] text-navy-100/70 transition-colors hover:text-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </Container>
      </section>
    </>
  )
}
