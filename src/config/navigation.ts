export type NavItem = {
  label: string
  to: string
}

/** Primary navigation — intentionally short to keep the header uncluttered. */
export const primaryNav: NavItem[] = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Solutions', to: '/solutions' },
  { label: 'Services', to: '/services' },
  { label: 'Projects', to: '/projects' },
  { label: 'Contact', to: '/contact' },
]

/** Every route that gets a static HTML file at build time. */
export const staticRoutes: string[] = [
  '/',
  '/about',
  '/solutions',
  '/services',
  '/projects',
  '/contact',
  '/privacy-policy',
  '/terms',
]
