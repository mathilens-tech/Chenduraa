import { Seo } from '@/lib/seo'
import { Hero } from '@/components/sections/Hero'
import { Intro } from '@/components/sections/Intro'
import { SolutionsGrid } from '@/components/sections/SolutionsGrid'
import { ServicesGrid } from '@/components/sections/ServicesGrid'
import { Process } from '@/components/sections/Process'
import { WhyUs } from '@/components/sections/WhyUs'
import { Gallery } from '@/components/sections/Gallery'
import { Maintenance } from '@/components/sections/Maintenance'
import { Subsidy } from '@/components/sections/Subsidy'
import { FinalCta } from '@/components/sections/FinalCta'
import { organisationSchema, websiteSchema } from '@/lib/schema'

export default function Home() {
  return (
    <>
      <Seo
        title="Chenduraa Energy Solar Power Pvt. Ltd. | Solar Energy Solutions"
        description="Chenduraa Energy Solar Power Pvt. Ltd. provides solar energy solutions for homes and businesses — consultation, system design, rooftop solar installation, operation & maintenance and subsidy assistance."
        path="/"
        jsonLd={[organisationSchema(), websiteSchema()]}
      />
      <Hero />
      <Intro />
      <SolutionsGrid tone="warm" />
      <ServicesGrid tone="light" />
      <Process />
      <WhyUs tone="light" />
      <Gallery variant="preview" tone="tint" />
      <Maintenance />
      <Subsidy />
      <FinalCta />
    </>
  )
}
