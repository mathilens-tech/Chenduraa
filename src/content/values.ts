export type ValuePoint = {
  title: string
  description: string
  icon: 'endToEnd' | 'customer' | 'install' | 'support' | 'clean' | 'clarity'
}

/**
 * Value propositions only — no rankings, superlatives, awards, capacity
 * figures or project counts. Nothing here requires client verification.
 */
export const valuePoints: ValuePoint[] = [
  {
    title: 'End-to-end solar support',
    description:
      'Consultation, assessment, design, installation, commissioning and maintenance handled through a single point of contact.',
    icon: 'endToEnd',
  },
  {
    title: 'Customer-focused approach',
    description:
      'Systems are sized around how you actually use electricity, not fitted to a standard package.',
    icon: 'customer',
  },
  {
    title: 'Professional installation',
    description:
      'Structure, electrical work, testing and commissioning carried out methodically by our installation team.',
    icon: 'install',
  },
  {
    title: 'Long-term service support',
    description:
      'Our involvement continues after commissioning through operation and maintenance support.',
    icon: 'support',
  },
  {
    title: 'Clean energy solutions',
    description:
      'Solar generation that reduces how much grid electricity your premises draws during daylight hours.',
    icon: 'clean',
  },
  {
    title: 'Clear communication',
    description:
      'Plain explanations of what is being installed, how it works and what the process involves at each stage.',
    icon: 'clarity',
  },
]
