import { Link } from 'react-router-dom'
import { Container } from '@/components/ui/Container'
import { Logo } from '@/components/brand/Logo'
import { Icon } from '@/components/graphics/Icon'
import { primaryNav } from '@/config/navigation'
import { services } from '@/content/services'
import {
  company,
  contact,
  mailtoHref,
  offices,
  socialLinks,
  telHref,
  whatsappHref,
} from '@/config/company'

const year = new Date().getFullYear()

export function Footer() {
  const whatsapp = whatsappHref('Hello, I would like to enquire about solar.')

  return (
    <footer className="relative isolate bg-navy-900 text-navy-100">
      <div aria-hidden="true" className="array-grid pointer-events-none absolute inset-0 -z-10 opacity-60" />

      <Container width="wide">
        <div className="grid gap-12 py-14 sm:py-16 lg:grid-cols-12 lg:gap-8 lg:py-20">
          {/* Brand + description */}
          <div className="lg:col-span-4">
            <Logo variant="dark" />
            <p className="mt-5 max-w-sm text-[0.9375rem] leading-[1.75] text-navy-100/70">
              {company.legalName} provides solar energy solutions for homes and businesses —
              consultation, system design, installation, operation &amp; maintenance and subsidy
              assistance.
            </p>

            {socialLinks.length > 0 && (
              <ul className="mt-6 flex flex-wrap gap-2">
                {socialLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-[3px] border border-white/15 px-3 py-1.5 text-[0.8125rem] text-navy-100/80 transition-colors hover:border-white/40 hover:text-white"
                    >
                      {link.label}
                      <Icon name="arrowUpRight" className="h-3 w-3" />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Navigation */}
          <nav aria-label="Footer navigation" className="lg:col-span-2">
            <FooterHeading>Company</FooterHeading>
            <ul className="mt-4 space-y-2.5">
              {primaryNav.map((item) => (
                <li key={item.to}>
                  <FooterLink to={item.to}>{item.label}</FooterLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services */}
          <div className="lg:col-span-3">
            <FooterHeading>Services</FooterHeading>
            <ul className="mt-4 space-y-2.5">
              {services.map((service) => (
                <li key={service.slug}>
                  <FooterLink to={`/services#${service.slug}`}>{service.title}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <FooterHeading>Contact</FooterHeading>
            <ul className="mt-4 space-y-4 text-[0.9375rem]">
              {offices.map((office) => (
                <li key={office.id} className="flex gap-3">
                  <Icon name="pin" className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
                  <span className="text-navy-100/75">
                    <span className="block font-medium text-white">{office.label}</span>
                    {office.addressLines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                    <span className="block">
                      {office.city}, {office.state}
                      {office.postalCode ? ` ${office.postalCode}` : ''}
                    </span>
                  </span>
                </li>
              ))}

              {telHref && (
                <li className="flex gap-3">
                  <Icon name="phone" className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
                  <a href={telHref} className="text-navy-100/75 transition-colors hover:text-white">
                    {contact.phone}
                  </a>
                </li>
              )}

              {mailtoHref && (
                <li className="flex gap-3">
                  <Icon name="mail" className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
                  <a
                    href={mailtoHref}
                    className="break-all text-navy-100/75 transition-colors hover:text-white"
                  >
                    {contact.email}
                  </a>
                </li>
              )}

              {whatsapp && (
                <li className="flex gap-3">
                  <Icon name="whatsapp" className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
                  <a
                    href={whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-navy-100/75 transition-colors hover:text-white"
                  >
                    Chat on WhatsApp
                  </a>
                </li>
              )}

              {/* Always offer a route to reach us, even before direct details are published. */}
              <li className="flex gap-3">
                <Icon name="clock" className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
                <Link to="/contact" className="text-navy-100/75 transition-colors hover:text-white">
                  Request a callback
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal bar */}
        <div className="flex flex-col gap-4 border-t border-white/10 py-6 text-[0.8125rem] text-navy-100/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {company.legalName}. All rights reserved.
          </p>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <li>
              <Link to="/privacy-policy" className="transition-colors hover:text-white">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="transition-colors hover:text-white">
                Terms &amp; Conditions
              </Link>
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  )
}

function FooterHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="eyebrow text-gold-400">{children}</h2>
}

function FooterLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="text-[0.9375rem] text-navy-100/70 transition-colors duration-200 hover:text-white"
    >
      {children}
    </Link>
  )
}
