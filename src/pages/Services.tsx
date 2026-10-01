import { Seo } from '@/lib/seo'
import { PageHero } from '@/components/sections/PageHero'
import { ServicesGrid } from '@/components/sections/ServicesGrid'
import { Process } from '@/components/sections/Process'
import { Maintenance } from '@/components/sections/Maintenance'
import { Subsidy } from '@/components/sections/Subsidy'
import { FinalCta } from '@/components/sections/FinalCta'
import { breadcrumbSchema, servicesSchema } from '@/lib/schema'

export default function Services() {
  return (
    <>
      <Seo
        title="Solar Services"
        description="Solar services from Chenduraa Energy — solar consultation, site assessment, system design, solar installation, operation & maintenance and subsidy assistance for homes and businesses."
        path="/services"
        jsonLd={[
          servicesSchema(),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Solar Services', path: '/services' },
          ]),
        ]}
      />

      <PageHero
        eyebrow="Services"
        title="Everything a solar installation needs, from one team"
        lead="Consultation, assessment, design, installation, commissioning and maintenance — handled together, so responsibility never gets divided."
      />

      <ServicesGrid variant="detail" tone="light" showCta={false} />
      <Process />
      <Maintenance />
      <Subsidy />
      <FinalCta
        title="Tell us what you need help with"
        lead="Whether it is a new installation, maintenance for an existing system or help with a subsidy application, start with a conversation."
      />
    </>
  )
}
