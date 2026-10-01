import { company, contact, offices } from '@/config/company'
import { services } from '@/content/services'

/**
 * Structured data. Everything here is derived from confirmed configuration —
 * no ratings, review counts, award or founding-date claims.
 */

export function organisationSchema(): Record<string, unknown> {
  const primary = offices[0]

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${company.siteUrl}/#organization`,
    name: company.legalName,
    alternateName: company.shortName,
    url: `${company.siteUrl}/`,
    logo: `${company.siteUrl}/apple-touch-icon.png`,
    description:
      'Solar energy solutions for homes and businesses — consultation, system design, solar installation, operation & maintenance and subsidy assistance.',
    ...(primary
      ? {
          address: {
            '@type': 'PostalAddress',
            addressLocality: primary.city,
            addressRegion: primary.state,
            addressCountry: 'IN',
            ...(primary.postalCode ? { postalCode: primary.postalCode } : {}),
          },
        }
      : {}),
    ...(contact.phoneE164 || contact.email
      ? {
          contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'sales',
            areaServed: 'IN',
            availableLanguage: ['en', 'ta'],
            ...(contact.phoneE164 ? { telephone: `+${contact.phoneE164}` } : {}),
            ...(contact.email ? { email: contact.email } : {}),
          },
        }
      : {}),
  }
}

export function websiteSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${company.siteUrl}/#website`,
    url: `${company.siteUrl}/`,
    name: company.legalName,
    inLanguage: 'en-IN',
    publisher: { '@id': `${company.siteUrl}/#organization` },
  }
}

/** Lists the services offered, without pricing or guarantee claims. */
export function servicesSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Solar services',
    itemListElement: services.map((service, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Service',
        name: service.title,
        description: service.summary,
        serviceType: service.title,
        provider: { '@id': `${company.siteUrl}/#organization` },
        url: `${company.siteUrl}/services#${service.slug}`,
      },
    })),
  }
}

export function breadcrumbSchema(items: { name: string; path: string }[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${company.siteUrl}${item.path}`,
    })),
  }
}
