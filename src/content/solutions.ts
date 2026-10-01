/**
 * Solution categories.
 *
 * Only categories evidenced by the client's own material are enabled by
 * default (residential and commercial). Industrial is present but gated behind
 * VITE_SOLUTION_INDUSTRIAL_ENABLED so it is never published unconfirmed.
 */
export type Solution = {
  slug: string
  title: string
  summary: string
  /** Longer copy for the Solutions page. */
  detail: string
  /** Neutral, non-committal points — capabilities, not guarantees. */
  points: string[]
  graphic: 'residential' | 'commercial' | 'industrial'
}

const all: (Solution & { enabled: boolean })[] = [
  {
    slug: 'residential-solar',
    title: 'Residential Solar',
    summary:
      'Rooftop solar systems designed around the roof area, shading and day-to-day electricity use of individual homes.',
    detail:
      'We assess the available roof area, orientation and shading of your home, then design a system sized to your household consumption pattern. Installation, testing and handover are carried out by our own team, and we explain how the system works before we leave the site.',
    points: [
      'Roof and shading assessment before design',
      'System sizing based on your electricity usage',
      'Installation, testing and handover by our team',
      'Guidance on applicable subsidy processes',
    ],
    graphic: 'residential',
    enabled: true,
  },
  {
    slug: 'commercial-solar',
    title: 'Commercial Solar',
    summary:
      'Solar systems for offices, retail spaces, institutions and commercial buildings, planned around operating hours and load profile.',
    detail:
      'Commercial buildings have a different demand curve to homes. We study your load profile, available roof or ground area and electrical infrastructure, then design a system that fits how your premises actually operate — including phased builds where that suits your plans better.',
    points: [
      'Load profile and site infrastructure review',
      'Roof-mounted and ground-mounted layouts',
      'Coordination with your electrical contractor',
      'Operation and maintenance support after commissioning',
    ],
    graphic: 'commercial',
    enabled: true,
  },
  {
    slug: 'industrial-solar',
    title: 'Industrial Solar',
    summary:
      'Larger rooftop and ground-mount solar systems for industrial premises with sustained daytime electricity demand.',
    detail:
      'For industrial premises we plan around sustained daytime demand, structural considerations of large roof spans and the existing electrical distribution on site.',
    points: [
      'Large-span rooftop and ground-mount layouts',
      'Structural and electrical coordination',
      'Planned maintenance schedules',
    ],
    graphic: 'industrial',
    // TODO_CLIENT: confirm whether industrial solar is an offered service.
    // Set VITE_SOLUTION_INDUSTRIAL_ENABLED=true to publish this category.
    enabled: import.meta.env.VITE_SOLUTION_INDUSTRIAL_ENABLED?.trim() === 'true',
  },
]

export const solutions: Solution[] = all
  .filter((item) => item.enabled)
  .map(({ enabled: _enabled, ...solution }) => solution)
