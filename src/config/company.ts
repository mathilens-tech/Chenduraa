/**
 * ============================================================================
 * SINGLE SOURCE OF TRUTH — company & contact details
 * ============================================================================
 *
 * Everything the client needs to supply lives here or in `.env.local`.
 * Nothing in this file is invented: values that have not been confirmed by the
 * client are left empty, and every component degrades to neutral copy instead
 * of rendering a placeholder. See CONTENT-TODO.md for the outstanding list.
 *
 * To go live, copy `.env.example` -> `.env.local` and fill in the values, or
 * edit the fallbacks below directly.
 */

const env = import.meta.env

/** Returns a trimmed env value, or `null` when unset/blank. */
function value(raw: string | undefined): string | null {
  const trimmed = raw?.trim()
  return trimmed ? trimmed : null
}

export const company = {
  legalName: 'Chenduraa Energy Solar Power Pvt. Ltd.',
  shortName: 'Chenduraa Energy',
  /** Used in <title> suffixes and structured data. */
  tagline: 'Solar Energy Solutions',
  /** Canonical origin, no trailing slash. Override per environment. */
  siteUrl: (value(env.VITE_SITE_URL) ?? 'https://www.chenduraaenergy.com').replace(/\/+$/, ''),
} as const

/**
 * TODO_CLIENT: provide the official phone, email and WhatsApp number.
 * Until then these stay null and the UI shows a callback prompt instead.
 */
export const contact = {
  phone: value(env.VITE_CONTACT_PHONE),
  /** E.164 digits only, e.g. 919000000000 — used to build tel: and wa.me links. */
  phoneE164: value(env.VITE_CONTACT_PHONE_E164),
  email: value(env.VITE_CONTACT_EMAIL),
  whatsappE164: value(env.VITE_WHATSAPP_E164),
} as const

export type Office = {
  id: string
  label: string
  /** TODO_CLIENT: full street address. City/state are from the client brief. */
  addressLines: string[]
  city: string
  state: string
  country: string
  postalCode: string | null
  /** Google Maps place/embed query. Falls back to a city-level query. */
  mapsQuery: string
}

/**
 * Thanjavur is confirmed in the client brief. A second (Chennai) office is
 * listed only when VITE_OFFICE_CHENNAI_ENABLED is set to "true", so an
 * unconfirmed location never appears on the live site.
 */
export const offices: Office[] = [
  {
    id: 'thanjavur',
    label: 'Thanjavur',
    addressLines: [],
    city: 'Thanjavur',
    state: 'Tamil Nadu',
    country: 'India',
    postalCode: null,
    mapsQuery: 'Thanjavur, Tamil Nadu, India',
  },
  ...(value(env.VITE_OFFICE_CHENNAI_ENABLED) === 'true'
    ? [
        {
          id: 'chennai',
          label: 'Chennai',
          addressLines: [],
          city: 'Chennai',
          state: 'Tamil Nadu',
          country: 'India',
          postalCode: null,
          mapsQuery: 'Chennai, Tamil Nadu, India',
        } satisfies Office,
      ]
    : []),
]

/**
 * TODO_CLIENT: provide official social profile URLs.
 * Left empty deliberately — the footer omits the block when nothing is set.
 */
export const socialLinks: { label: string; href: string }[] = [
  ...(value(env.VITE_SOCIAL_LINKEDIN)
    ? [{ label: 'LinkedIn', href: value(env.VITE_SOCIAL_LINKEDIN)! }]
    : []),
  ...(value(env.VITE_SOCIAL_FACEBOOK)
    ? [{ label: 'Facebook', href: value(env.VITE_SOCIAL_FACEBOOK)! }]
    : []),
  ...(value(env.VITE_SOCIAL_INSTAGRAM)
    ? [{ label: 'Instagram', href: value(env.VITE_SOCIAL_INSTAGRAM)! }]
    : []),
  ...(value(env.VITE_SOCIAL_YOUTUBE)
    ? [{ label: 'YouTube', href: value(env.VITE_SOCIAL_YOUTUBE)! }]
    : []),
]

/**
 * Lead endpoint. When unset the enquiry form validates and confirms locally
 * without a network call, which is the documented demo behaviour. Point this
 * at a hosted form service (Formspree, Web3Forms, Getform, FormSubmit) or at
 * your own Lead API in production — see README "Contact form".
 */
export const leadEndpoint = value(env.VITE_LEAD_ENDPOINT)

/**
 * Optional public key some form services require in the request body.
 * Web3Forms calls it `access_key`. Safe to expose — it only permits posting to
 * that form, which is exactly what this page does.
 */
export const leadAccessKey = value(env.VITE_LEAD_ACCESS_KEY)

/**
 * Sub-path the site is served from, with leading and trailing slashes
 * ("/" when served from the domain root). Vite injects this from
 * VITE_BASE_PATH at build time.
 */
export const basePath = import.meta.env.BASE_URL || '/'

/** React Router basename — the base path without its trailing slash. */
export const routerBasename = basePath === '/' ? '' : basePath.replace(/\/$/, '')

/** Resolves a path in `public/` against the configured base path. */
export function asset(path: string): string {
  return `${basePath}${path.replace(/^\/+/, '')}`
}

/** Optional Google Maps Embed API key. Without it we use the keyless embed. */
export const googleMapsEmbedKey = value(env.VITE_GOOGLE_MAPS_EMBED_KEY)

/* --------------------------------- derived -------------------------------- */

export const telHref = contact.phoneE164 ? `tel:+${contact.phoneE164}` : null
export const mailtoHref = contact.email ? `mailto:${contact.email}` : null

export function whatsappHref(message?: string): string | null {
  const number = contact.whatsappE164 ?? contact.phoneE164
  if (!number) return null
  const text = message ? `?text=${encodeURIComponent(message)}` : ''
  return `https://wa.me/${number}${text}`
}

export const hasAnyDirectContact = Boolean(contact.phone || contact.email || whatsappHref())
