import { Seo } from '@/lib/seo'
import { LegalPage } from './LegalPage'
import { company, contact, mailtoHref } from '@/config/company'

/**
 * TODO_CLIENT: have this reviewed and confirmed before launch, and supply:
 *   - the official contact point for privacy/data requests
 *   - registered office address for the legal notice
 *   - confirmation of any analytics or third-party tools to be added
 * The text below describes only what this website actually does today.
 */
export default function PrivacyPolicy() {
  return (
    <>
      <Seo
        title="Privacy Policy"
        description={`Privacy policy for the ${company.legalName} website, covering what information the enquiry form collects and how it is used.`}
        path="/privacy-policy"
      />

      <LegalPage
        eyebrow="Privacy Policy"
        title="Privacy Policy"
        lead="How we handle the information you share with us through this website."
        updated="30 September 2026"
      >
        <section>
          <h2>Overview</h2>
          <p>
            This policy applies to the {company.legalName} website. It explains what information we
            collect through this site, why we collect it, and what we do with it.
          </p>
        </section>

        <section>
          <h2>Information we collect</h2>
          <p>
            We collect information only when you choose to send it to us. If you submit the enquiry
            form, that includes:
          </p>
          <ul>
            <li>Your name</li>
            <li>Your phone number</li>
            <li>Your email address, if you provide one</li>
            <li>Your location, if you provide one</li>
            <li>The nature of your enquiry and any message you write</li>
          </ul>
          <p>
            We do not ask for payment details, identity documents or any other sensitive personal
            information through this website.
          </p>
        </section>

        <section>
          <h2>How we use it</h2>
          <p>
            We use the details you send to respond to your enquiry, to arrange a consultation or site
            assessment where relevant, and to keep a record of our correspondence with you. We do not
            sell your information, and we do not share it for advertising purposes.
          </p>
        </section>

        <section>
          <h2>Cookies and analytics</h2>
          <p>
            This website does not set advertising or tracking cookies. If website analytics are
            introduced in future, this policy will be updated to say what is collected and how it can
            be declined where required.
          </p>
        </section>

        <section>
          <h2>Third-party content</h2>
          <p>
            The Contact page embeds a map provided by Google Maps so you can see our location. When
            that map loads, your browser makes a request to Google, which is subject to Google&rsquo;s
            own privacy terms. Links to WhatsApp, where present, open WhatsApp&rsquo;s own service.
          </p>
        </section>

        <section>
          <h2>Retention</h2>
          <p>
            Enquiry details are retained for as long as they are needed to deal with your enquiry and
            any resulting work, and for any period we are required to keep records for.
          </p>
        </section>

        <section>
          <h2>Your requests</h2>
          <p>
            You can ask us what information we hold about you, ask us to correct it, or ask us to
            delete it where we are not required to keep it. Contact us using the details on our{' '}
            <a href="/contact">Contact page</a>
            {contact.email && mailtoHref ? (
              <>
                {' '}
                or write to <a href={mailtoHref}>{contact.email}</a>
              </>
            ) : null}
            .
          </p>
        </section>

        <section>
          <h2>Changes to this policy</h2>
          <p>
            We may update this policy from time to time. The date at the top of this page shows when
            it was last revised.
          </p>
        </section>
      </LegalPage>
    </>
  )
}
