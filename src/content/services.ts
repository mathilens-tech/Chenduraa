export type Service = {
  slug: string
  title: string
  summary: string
  detail: string
  icon: 'consultation' | 'assessment' | 'design' | 'installation' | 'maintenance' | 'subsidy'
}

/**
 * Services drawn from the client's stated business areas: solar installation,
 * operation & maintenance and subsidy assistance, plus the consultation,
 * assessment and design work that precedes an installation.
 */
export const services: Service[] = [
  {
    slug: 'consultation',
    title: 'Solar Consultation',
    summary:
      'A straightforward conversation about your electricity use, your roof or site, and whether solar suits your requirement.',
    detail:
      'We start by understanding what you use electricity for and what you want solar to achieve. You get a clear picture of what is feasible at your site before any commitment.',
    icon: 'consultation',
  },
  {
    slug: 'site-assessment',
    title: 'Site Assessment',
    summary:
      'An on-site review of roof area, orientation, shading, access and existing electrical infrastructure.',
    detail:
      'Every site behaves differently. We measure the usable area, check shading through the day, review the existing electrical setup and note anything that will affect the installation.',
    icon: 'assessment',
  },
  {
    slug: 'system-design',
    title: 'System Design',
    summary:
      'A system layout and specification prepared from your assessment findings and consumption pattern.',
    detail:
      'The design sets out module layout, structure, inverter placement and cable routing, sized to your consumption rather than to a generic template.',
    icon: 'design',
  },
  {
    slug: 'solar-installation',
    title: 'Solar Installation',
    summary:
      'Mounting structure, module installation, electrical work, testing and commissioning carried out by our team.',
    detail:
      'Installation covers the mounting structure, module fixing, inverter and electrical work, earthing, testing and commissioning — followed by a walkthrough so you know how the system operates.',
    icon: 'installation',
  },
  {
    slug: 'operation-maintenance',
    title: 'Operation & Maintenance',
    summary:
      'Periodic inspection, cleaning guidance and fault attention to help your system keep performing.',
    detail:
      'Solar hardware is long-lived but not maintenance-free. Dust, shading changes, loose connections and inverter faults all affect output. Our O&M support covers periodic checks and attention when something is not right.',
    icon: 'maintenance',
  },
  {
    slug: 'subsidy-assistance',
    title: 'Subsidy Assistance',
    summary:
      'Help with the documentation and application steps for solar subsidy schemes applicable to your installation.',
    detail:
      'Subsidy schemes have their own paperwork, eligibility conditions and timelines, and these change from time to time. We help you work through the documentation and application steps that apply to your installation.',
    icon: 'subsidy',
  },
]
