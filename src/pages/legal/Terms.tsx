import { Seo } from '@/lib/seo'
import { LegalPage } from './LegalPage'
import { company } from '@/config/company'

/**
 * TODO_CLIENT: review and confirm before launch. Anything relating to
 * warranties, guarantees, pricing, payment terms or dispute jurisdiction must
 * come from the company — none of it is stated here.
 */
export default function Terms() {
  return (
    <>
      <Seo
        title="Terms & Conditions"
        description={`Terms and conditions for the use of the ${company.legalName} website.`}
        path="/terms"
      />

      <LegalPage
        eyebrow="Terms & Conditions"
        title="Terms & Conditions"
        lead="The terms on which this website is made available."
        updated="30 September 2026"
      >
        <section>
          <h2>About these terms</h2>
          <p>
            These terms apply to your use of the {company.legalName} website. By using the site, you
            accept them. They cover the website itself — they are not the terms of any contract for
            supply, installation or maintenance work.
          </p>
        </section>

        <section>
          <h2>Information on this site</h2>
          <p>
            The content of this website is provided for general information about our services. It
            describes the kind of work we do and the process we follow. It is not a quotation, a
            technical specification or a commitment in respect of any particular site.
          </p>
          <p>
            What a solar system can generate, and what it costs, depends on the specific property,
            its roof, its shading and its electricity requirement. Those details are established
            during consultation and site assessment, and are confirmed in writing.
          </p>
        </section>

        <section>
          <h2>Enquiries</h2>
          <p>
            Submitting the enquiry form does not create a contract between us. It starts a
            conversation. Any work we carry out for you will be covered by a separate written
            agreement setting out scope, specification, price and terms.
          </p>
          <p>
            Please provide accurate information in your enquiry so we can respond usefully. Do not
            use the form to send unsolicited commercial material.
          </p>
        </section>

        <section>
          <h2>Subsidy schemes</h2>
          <p>
            Where we refer to subsidy assistance, we mean help with the documentation and application
            process. Eligibility, amounts, conditions and timelines are set by the relevant scheme
            and authority, not by us, and may change. We do not guarantee the outcome of any
            application.
          </p>
        </section>

        <section>
          <h2>Intellectual property</h2>
          <p>
            The content, design and graphics on this website belong to {company.legalName} or are
            used with permission. You may view and share pages for your own reference. Please do not
            reproduce the content commercially without our written permission.
          </p>
        </section>

        <section>
          <h2>External links</h2>
          <p>
            This website may link to third-party services such as Google Maps or WhatsApp. Those
            services are operated by others and are governed by their own terms. We are not
            responsible for their content or availability.
          </p>
        </section>

        <section>
          <h2>Availability</h2>
          <p>
            We aim to keep this website available and its information current, but we do not warrant
            uninterrupted availability or that every page is free of error or omission at all times.
          </p>
        </section>

        <section>
          <h2>Changes</h2>
          <p>
            We may revise these terms. The date at the top of this page shows when they were last
            updated. Continued use of the site after a change means you accept the revised terms.
          </p>
        </section>

        <section>
          <h2>Governing law</h2>
          <p>
            These terms are governed by the laws of India. Any dispute relating to this website will
            be subject to the jurisdiction of the competent courts in India.
          </p>
        </section>
      </LegalPage>
    </>
  )
}
