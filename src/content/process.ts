export type ProcessStep = {
  step: string
  title: string
  description: string
}

export const processSteps: ProcessStep[] = [
  {
    step: '01',
    title: 'Consultation',
    description:
      'We discuss your electricity requirement, your site and what you want solar to do for you.',
  },
  {
    step: '02',
    title: 'Site Assessment',
    description:
      'An on-site review of usable area, orientation, shading, access and existing electrical infrastructure.',
  },
  {
    step: '03',
    title: 'System Design',
    description:
      'Module layout, structure and specification prepared to suit your site and consumption pattern.',
  },
  {
    step: '04',
    title: 'Installation',
    description:
      'Mounting structure, module installation and electrical work carried out by our installation team.',
  },
  {
    step: '05',
    title: 'Commissioning',
    description:
      'Testing, commissioning and a walkthrough of the installed system, along with the applicable paperwork.',
  },
  {
    step: '06',
    title: 'Support',
    description:
      'Operation and maintenance support so the system continues to work the way it was designed to.',
  },
]
