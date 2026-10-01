/**
 * ============================================================================
 * PROJECTS
 * ============================================================================
 *
 * `projects` is intentionally EMPTY. No project names, locations, capacities or
 * photographs have been supplied, and none are invented. While the array is
 * empty the Projects page presents the installation types we design and build
 * (see `installationTypes` below) rather than implying a project history.
 *
 * TODO_CLIENT: supply project photographs and, for each project, any of name /
 * location / capacity / type that may be published.
 *
 * To publish real projects:
 *   1. Drop photographs into `public/images/projects/` (WebP or JPG,
 *      ~1600px wide, under ~250 KB each).
 *   2. Add one entry per project below. Every field except `id`, `image`,
 *      `alt` and `type` is optional — omitted fields simply do not render, so
 *      a project with only a photo and a type is perfectly valid.
 *
 * Example:
 *   {
 *     id: 'example-1',
 *     type: 'Residential Rooftop',
 *     image: '/images/projects/example-1.webp',
 *     alt: 'Rooftop solar installation on a two-storey residential building',
 *     name: 'Residential Rooftop Installation',   // optional
 *     location: 'Thanjavur, Tamil Nadu',          // optional
 *     capacity: '5 kW',                           // optional
 *   }
 */
export type Project = {
  id: string
  /** Category label, e.g. "Residential Rooftop". Always safe to show. */
  type: string
  image: string
  alt: string
  name?: string
  location?: string
  capacity?: string
}

export const projects: Project[] = []

/* -------------------------------------------------------------------------- */

/**
 * Installation types we design and install. These describe capability, not
 * completed work, and the page copy frames them that way.
 */
export type InstallationType = {
  id: string
  title: string
  description: string
  graphic: 'residentialRoof' | 'commercialRoof' | 'groundMount' | 'carport' | 'metalRoof' | 'hybrid'
}

export const installationTypes: InstallationType[] = [
  {
    id: 'residential-rooftop',
    title: 'Residential Rooftop',
    description:
      'Module arrays on concrete or sloped roofs of individual homes, laid out around available area and shading.',
    graphic: 'residentialRoof',
  },
  {
    id: 'commercial-rooftop',
    title: 'Commercial Rooftop',
    description:
      'Larger rooftop arrays for offices, retail and institutional buildings, planned around operating hours.',
    graphic: 'commercialRoof',
  },
  {
    id: 'metal-sheet-roof',
    title: 'Metal Sheet Roof',
    description:
      'Arrays fixed to profiled metal sheet roofing using mounting suited to the sheet profile and span.',
    graphic: 'metalRoof',
  },
  {
    id: 'ground-mount',
    title: 'Ground Mount',
    description:
      'Ground-mounted structures for sites with open land available, set at a fixed tilt for the location.',
    graphic: 'groundMount',
  },
  {
    id: 'solar-carport',
    title: 'Shed & Carport Structures',
    description:
      'Module arrays over sheds, parking and open structures where roof area alone is not sufficient.',
    graphic: 'carport',
  },
  {
    id: 'hybrid-storage',
    title: 'Grid-Tied & Hybrid',
    description:
      'Grid-connected systems, and hybrid configurations with battery storage where backup is required.',
    graphic: 'hybrid',
  },
]
