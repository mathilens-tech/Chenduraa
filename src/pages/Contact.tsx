import { Seo } from '@/lib/seo'
import { PageHero } from '@/components/sections/PageHero'
import { Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { Icon } from '@/components/graphics/Icon'
import { EnquiryForm } from '@/components/contact/EnquiryForm'
import { breadcrumbSchema, organisationSchema } from '@/lib/schema'
import {
  company,
  contact,
  googleMapsEmbedKey,
  mailtoHref,
  offices,
  telHref,
  whatsappHref,
} from '@/config/company'

/** Keyless Google Maps embed; uses the Embed API when a key is configured. */
function mapSrc(query: string): string {
  return googleMapsEmbedKey
    ? `https://www.google.com/maps/embed/v1/place?key=${googleMapsEmbedKey}&q=${encodeURIComponent(query)}&zoom=12`
    : `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`
}

export default function Contact() {
  const whatsapp = whatsappHref('Hello, I would like to enquire about solar for my property.')
  const primaryOffice = offices[0]

  return (
    <>
      <Seo
        title="Contact Us"
        description="Contact Chenduraa Energy Solar Power Pvt. Ltd. for a solar consultation. Share your requirement and our team will get back to you about the next step."
        path="/contact"
        jsonLd={[
          organisationSchema(),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Contact Us', path: '/contact' },
          ]),
        ]}
      />

      <PageHero
        eyebrow="Contact"
        title="Let's talk about your solar requirement"
        lead="Tell us about your property and what you want from a solar system. We will come back to you with what is feasible and what the next step looks like."
      />

      <Section tone="light">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Form */}
          <div className="lg:col-span-7">
            <Reveal>
              <h2 className="text-d3">Send us an enquiry</h2>
              <p className="mt-2.5 text-[0.9375rem] leading-[1.7] text-body">
                Fields marked <span className="text-gold-600">*</span> are required. The more you can
                tell us about the site, the more useful our first response will be.
              </p>
            </Reveal>

            <Reveal delay={80} className="mt-8">
              <EnquiryForm />
            </Reveal>
          </div>

          {/* Details */}
          <div className="lg:col-span-5">
            <Reveal delay={60}>
              <div className="rounded-[4px] border border-line bg-surface-warm p-7 sm:p-8">
                <h2 className="font-display text-d3">Contact details</h2>
                <p className="mt-2 text-[0.9375rem] font-medium text-navy-700">
                  {company.legalName}
                </p>

                <dl className="mt-6 space-y-6 text-[0.9375rem]">
                  {offices.map((office) => (
                    <div key={office.id} className="flex gap-3.5">
                      <dt className="shrink-0">
                        <span className="sr-only">{office.label} office</span>
                        <Icon name="pin" className="mt-0.5 h-[1.125rem] w-[1.125rem] text-gold-600" />
                      </dt>
                      <dd className="leading-[1.7] text-body">
                        <span className="block font-semibold text-navy-700">
                          {office.label} Office
                        </span>
                        {office.addressLines.map((line) => (
                          <span key={line} className="block">
                            {line}
                          </span>
                        ))}
                        <span className="block">
                          {office.city}, {office.state}
                          {office.postalCode ? ` ${office.postalCode}` : ''}
                        </span>
                      </dd>
                    </div>
                  ))}

                  {telHref && (
                    <div className="flex gap-3.5">
                      <dt className="shrink-0">
                        <span className="sr-only">Phone</span>
                        <Icon name="phone" className="mt-0.5 h-[1.125rem] w-[1.125rem] text-gold-600" />
                      </dt>
                      <dd>
                        <a
                          href={telHref}
                          className="font-semibold text-navy-700 transition-colors hover:text-gold-600"
                        >
                          {contact.phone}
                        </a>
                      </dd>
                    </div>
                  )}

                  {mailtoHref && (
                    <div className="flex gap-3.5">
                      <dt className="shrink-0">
                        <span className="sr-only">Email</span>
                        <Icon name="mail" className="mt-0.5 h-[1.125rem] w-[1.125rem] text-gold-600" />
                      </dt>
                      <dd>
                        <a
                          href={mailtoHref}
                          className="font-semibold break-all text-navy-700 transition-colors hover:text-gold-600"
                        >
                          {contact.email}
                        </a>
                      </dd>
                    </div>
                  )}

                  {whatsapp && (
                    <div className="flex gap-3.5">
                      <dt className="shrink-0">
                        <span className="sr-only">WhatsApp</span>
                        <Icon
                          name="whatsapp"
                          className="mt-0.5 h-[1.125rem] w-[1.125rem] text-gold-600"
                          strokeWidth={1.5}
                        />
                      </dt>
                      <dd>
                        <a
                          href={whatsapp}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-navy-700 transition-colors hover:text-gold-600"
                        >
                          Chat on WhatsApp
                        </a>
                      </dd>
                    </div>
                  )}
                </dl>

                <div className="mt-7 border-t border-line pt-6">
                  <p className="text-[0.875rem] leading-[1.7] text-slate-muted">
                    Enquiries received outside working hours are picked up on the next working day.
                  </p>
                  {/* TODO_CLIENT: confirm working hours if you would like them published here. */}
                </div>
              </div>
            </Reveal>

            {/* Map */}
            {primaryOffice && (
              <Reveal delay={120} className="mt-6">
                <div className="overflow-hidden rounded-[4px] border border-line">
                  <iframe
                    title={`Map showing ${primaryOffice.city}, ${primaryOffice.state}`}
                    src={mapSrc(primaryOffice.mapsQuery)}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="block h-72 w-full border-0 sm:h-80"
                  />
                </div>
                <p className="mt-3 text-[0.8125rem] text-slate-muted">
                  {/* TODO_CLIENT: supply the exact street address / Google Maps place link
                      to replace this city-level map. */}
                  Map shows our {primaryOffice.city} service location.
                </p>
              </Reveal>
            )}
          </div>
        </div>
      </Section>
    </>
  )
}
