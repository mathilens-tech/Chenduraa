# Project status

**Chenduraa Energy Solar Power Pvt. Ltd. — corporate website**

| | |
| --- | --- |
| Status | **Demo ready** — build passes, QA green |
| Last updated | 30 September 2026 |
| Blocking go-live | Client contact details + domain (see [CONTENT-TODO.md](CONTENT-TODO.md)) |

---

## Delivered

### Pages (8 routes + 404)

| Route | Page |
| --- | --- |
| `/` | Home — hero, introduction, solutions, services, process, why us, installations, O&M, subsidy, CTA |
| `/about` | About Us — who we are, approach, values, process |
| `/solutions` | Solar Solutions — per-category detail, system components |
| `/services` | Services — six services in detail, process, O&M, subsidy |
| `/projects` | Projects — installation gallery, site factors |
| `/contact` | Contact — enquiry form, contact details, map |
| `/privacy-policy` | Privacy Policy |
| `/terms` | Terms & Conditions |
| *(any other)* | 404 page with navigation back into the site |

### Functionality

- Sticky responsive header; accessible mobile menu (Escape, focus management, scroll lock)
- Enquiry form with client-side validation, honeypot + timing spam guards, and a payload
  already shaped for a future CRM/ERP lead API
- Floating contact button — WhatsApp when a number is configured, enquiry form until then
- Scroll-reveal animation, disabled under `prefers-reduced-motion`
- Google Maps embed on Contact (lazy-loaded, keyless by default)

### Build & infrastructure

- Static generation: every route prerendered to real HTML, then hydrated
- `sitemap.xml` and `robots.txt` generated at build time from `VITE_SITE_URL`
- `staticwebapp.config.json` with SPA fallback, security headers, immutable asset caching
- GitHub Actions workflows for **both** Azure Static Web Apps and GitHub Pages
- Sub-path support via `VITE_BASE_PATH`, for GitHub Pages project sites
- `scripts/serve-static.mjs` — local server that resolves URLs the way the host does,
  including sub-path mode

---

## QA results

Run against the **production build** (`npm run build`) served through
`scripts/serve-static.mjs`, driven by Playwright/Chromium.

| Check | Result |
| --- | --- |
| `npm run typecheck` (TypeScript strict) | Pass, no errors |
| `npm run build` | Pass — 9 pages prerendered |
| Console / page errors across all 9 routes | None |
| Failed network requests | None |
| Horizontal overflow at 360 / 390 / 414 / 768 / 1024 / 1280 / 1440 / 1920 px | None on any of 8 routes |
| Mobile menu: open, close, Escape, scroll lock, navigate | Pass |
| Form validation: required fields, phone format, email format, error clearing | Pass |
| Keyboard: skip link is first tab stop, visible focus ring | Pass |
| Hydration (prerendered HTML vs client render) | Clean, no mismatch |
| SPA navigation updates title, canonical and scroll position | Pass |
| Scroll-reveal resolves to full opacity | Pass |
| Internal links across built HTML | 14 targets, none broken |
| Full suite re-run against a sub-path build (`VITE_BASE_PATH=Chenduraa`) | Pass — GitHub Pages project-site mode verified |
| Images with `alt`, iframes with `title` | All |
| Exactly one `<h1>` per page | All 9 pages |

### Bugs found during QA and fixed

1. **Mobile menu collapsed to zero height.** The header's `backdrop-filter` made it the
   containing block for the `position: fixed` panel. Panel moved to be a sibling of
   `<header>`.
2. **Header CTA not hidden on small screens** — it wrapped to two lines and blew out the
   header at 390 px. Tailwind emits `.inline-flex` after `.hidden`, so the `hidden` class
   passed to `<Button>` lost the specificity tie. Display utilities are now applied to a
   wrapper, and small screens get a compact "Enquire" CTA.
3. **Panel arrays overhanging rooflines** in the residential and metal-sheet-roof
   artwork. Array quads recomputed to sit inside the roof outlines.

### Not tested

- **Lighthouse** — not run. Measured payload instead: ~210 KB gzipped first load
  (JS + CSS + HTML + both fonts).
- **Real device testing** — breakpoints verified in Chromium at the widths above, not on
  physical handsets.
- **Live Google Maps embed** — blocked in the QA sandbox; the markup and lazy-loading are
  in place but the rendered map has not been seen.
- **Safari / Firefox** — only Chromium was available.
- **Live email delivery** — no endpoint or address configured yet.

---

## Payload

| Asset | Raw | Gzipped |
| --- | --- | --- |
| JS bundle | 358 KB | 109 KB |
| CSS | 44 KB | 9 KB |
| Home page HTML | 114 KB | 20 KB |
| Fonts (Inter + Manrope, Latin only) | 73 KB | — (already compressed) |

Fonts were trimmed from 263 KB to 73 KB by dropping the Cyrillic, Greek, Vietnamese and
Latin-Extended subsets that this site never serves.

---

## Content integrity

No fabricated claims anywhere on the site. Specifically **not** stated: project counts,
installed capacity, customer numbers, years of experience, awards, certifications,
approvals, partnerships, client names, testimonials, savings percentages, subsidy amounts
or eligibility criteria, and product brands.

Unconfirmed information is hidden rather than invented:

- Phone, email and WhatsApp render only when configured
- The Chennai office appears only behind `VITE_OFFICE_CHENNAI_ENABLED`
- Industrial solar appears only behind `VITE_SOLUTION_INDUSTRIAL_ENABLED`
- Footer social links are hidden entirely while no URLs are set
- `projects` is empty, so the Projects page shows installation *types* rather than
  implying a project history

No TODO markers, lorem ipsum or debug output appear in the rendered UI. Internal
`TODO_CLIENT:` notes exist only in source comments.

---

## Remaining work

### Before the client demo
Nothing required. The site is presentable as it stands.

Optional, if details are available: set `VITE_CONTACT_PHONE`, `VITE_CONTACT_PHONE_E164`,
`VITE_CONTACT_EMAIL` and `VITE_WHATSAPP_E164` in `.env.local` — the phone row, WhatsApp
button and email links then appear throughout.

### Before go-live
1. Contact details (phone, email, WhatsApp) — **required**
2. Either `VITE_CONTACT_EMAIL` or `VITE_LEAD_ENDPOINT`, so enquiries are delivered — **required**
3. Final domain in `VITE_SITE_URL`, then rebuild — **required**
4. Full Thanjavur address; confirm whether Chennai should be listed
5. Official logo, then `npm run assets`
6. Legal pages reviewed and confirmed
7. Submit `sitemap.xml` to Google Search Console

Full list with context: [CONTENT-TODO.md](CONTENT-TODO.md).
Deployment steps: [README.md](README.md#production-deployment--azure-static-web-apps).
