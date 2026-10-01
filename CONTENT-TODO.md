# Client inputs required

Everything the website needs from Chenduraa Energy, in priority order.

**None of this blocks the demo.** The site is complete and presentable as it stands —
every item below is either hidden until supplied or replaced with neutral copy, so
nothing on screen looks unfinished. Items marked **Launch blocker** must be resolved
before the site goes live on the public domain.

---

## 1. Contact details — Launch blocker

Without these, visitors cannot reach you directly and enquiries are not delivered.

| Item | Where it goes | Currently |
| --- | --- | --- |
| Official phone number (display format) | `VITE_CONTACT_PHONE` | Hidden; header, footer and CTA omit the phone row |
| Same number in E.164 digits (e.g. `919876543210`) | `VITE_CONTACT_PHONE_E164` | No `tel:` links rendered |
| Official enquiry email | `VITE_CONTACT_EMAIL` | Hidden; form cannot fall back to email |
| WhatsApp number (E.164 digits) | `VITE_WHATSAPP_E164` | Floating button links to the contact form instead of WhatsApp |

> At least one of `VITE_CONTACT_EMAIL` or `VITE_LEAD_ENDPOINT` **must** be set, otherwise
> enquiry submissions are validated and confirmed but not delivered anywhere.

## 2. Office addresses — Launch blocker

| Item | Currently |
| --- | --- |
| Full Thanjavur street address and PIN code | Shows "Thanjavur, Tamil Nadu" only; map is a city-level map |
| Google Maps place link for the Thanjavur office | Keyless city search embed |
| Whether a **Chennai** office should be listed, and its address | Not shown at all (`VITE_OFFICE_CHENNAI_ENABLED=false`) |

## 3. Domain — Launch blocker

| Item | Currently |
| --- | --- |
| Final domain name | `VITE_SITE_URL` defaults to `https://www.chenduraaenergy.com` |

This value drives canonical URLs, Open Graph tags, `sitemap.xml` and `robots.txt`.
Set it to the real domain and rebuild before going live.

---

## 4. Brand assets

| Item | Currently |
| --- | --- |
| Official logo, SVG preferred (or transparent PNG at 2x) | Interim mark in `src/components/brand/Logo.tsx` |
| Brand colour references, if the navy/gold used here should be matched exactly | Navy `#0b2545`, gold `#eaad30` |

After replacing the logo, run `npm run assets` to regenerate the favicon, Apple touch
icon and social share image.

## 5. Photographs

| Item | Currently |
| --- | --- |
| Project / installation photographs | Custom SVG artwork throughout |
| Team or office photographs, if wanted on the About page | Not used |

Drop project photos into `public/images/projects/` and add entries to
`src/content/projects.ts`. The Projects page then switches automatically from
"installation types" to a real project gallery.

For each project, supply only what may be published — any of: photograph, project name,
location, capacity, system type. A project with just a photo and a type is fine.

## 6. Company information

Nothing of this kind is stated anywhere on the site, because none of it is confirmed.
Supply whatever you want published:

- Year established / years in operation
- CIN or company registration number (often required in the footer)
- GST number, if it should appear
- Certifications, empanelment or approvals held
- Team size, leadership names and roles
- Service areas / districts covered
- Working hours
- Any brands of module or inverter you supply and want named

> Numbers such as projects completed, total kW/MW installed, customers served or savings
> percentages have been **deliberately left out**. Send the figures you can stand behind
> and they can be added as a statistics band.

## 7. Services and solutions

| Question | Current assumption |
| --- | --- |
| Do you offer **industrial** solar? | Not published (`VITE_SOLUTION_INDUSTRIAL_ENABLED=false`) — only residential and commercial are shown |
| Which subsidy schemes do you assist with? | Described generically; no scheme named, no amounts or eligibility stated |
| Do you offer battery/hybrid systems? | Listed as an installation type only |

Subsidy amounts, percentages, eligibility criteria and timelines are intentionally
absent. They change, and publishing them incorrectly creates a liability. Send confirmed
wording if you want specifics shown.

## 8. Social profiles

Supply the URLs you want linked — LinkedIn, Facebook, Instagram, YouTube. The footer's
social block is hidden entirely while none are set. No profile URLs have been guessed.

## 9. Legal pages

`Privacy Policy` and `Terms & Conditions` are drafted to describe only what the website
actually does. Please have them reviewed and confirm:

- The contact point for privacy and data requests
- The registered office address for the legal notice
- Whether any analytics tool will be added (the policy currently states none is used)

---

## Testimonials and client names

Not included. If you want a testimonials section, supply the quotes along with written
permission from each client to publish their name.
