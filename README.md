# Chenduraa Energy Solar Power Pvt. Ltd. — Corporate Website

**Live demo:** <https://mathilens-tech.github.io/Chenduraa/>
Deployed from `main` by [`.github/workflows/github-pages.yml`](.github/workflows/github-pages.yml).

Production website for Chenduraa Energy Solar Power Pvt. Ltd. — a five-page corporate
site covering solar solutions, services, installations and enquiries.

Built as a statically generated single-page application: every route is rendered to real
HTML at build time (so it is fully indexable and paints before JavaScript loads), then
hydrated by React for instant client-side navigation. There is no backend, no database
and no authentication — deployment is a folder of static files.

---

## Tech stack

| Layer          | Choice                                              |
| -------------- | --------------------------------------------------- |
| Framework      | React 19                                            |
| Language       | TypeScript 5 (strict)                               |
| Build tool     | Vite 7                                              |
| Styling        | Tailwind CSS v4 (CSS-first `@theme` configuration)  |
| Routing        | React Router 7                                      |
| Fonts          | Manrope + Inter (self-hosted variable, Latin subset)|
| Imagery        | Hand-built SVG artwork (no stock photo licensing)   |
| Hosting        | Azure Static Web Apps                               |

Runtime dependencies: `react`, `react-dom`, `react-router-dom`, two font packages.
Nothing else — no UI kit, no animation library, no analytics SDK.

---

## Local setup

```bash
npm install
cp .env.example .env.local   # then fill in the values you have
npm run dev
```

The dev server prints its URL (default `http://localhost:5173`; this project has been
run on `5180` where 5173 was already in use — `npm run dev -- --port 5180`).

### Commands

| Command             | What it does                                                      |
| ------------------- | ----------------------------------------------------------------- |
| `npm run dev`       | Dev server with hot reload                                        |
| `npm run build`     | Full production build: client → SSR bundle → prerender all routes |
| `npm run preview`   | Serve the built `dist/` locally, exactly as production will       |
| `npm run typecheck` | TypeScript, no emit                                               |
| `npm run assets`    | Regenerate PNG favicon/OG images from the SVG sources             |

`npm run build` runs three steps in order:

1. `build:client` — the browser bundle into `dist/`
2. `build:server` — an SSR bundle into `dist-ssr/`
3. `prerender` — renders each route to `dist/<route>/index.html`, then writes
   `sitemap.xml` and rewrites the `Sitemap:` line in `robots.txt`

A page that throws during render fails the build, so the build doubles as a smoke test
across every route.

---

## Environment variables

All configuration lives in `.env.local` (local) or Azure SWA build environment variables
(production). Every value is **optional** — anything left blank simply does not render.
The site never displays a placeholder or a TODO.

See [`.env.example`](.env.example) for the annotated list. The ones that matter most:

| Variable                  | Purpose                                                            |
| ------------------------- | ------------------------------------------------------------------ |
| `VITE_SITE_URL`           | Canonical origin — drives canonical tags, OG URLs, sitemap, robots |
| `VITE_CONTACT_PHONE`      | Phone number as displayed                                          |
| `VITE_CONTACT_PHONE_E164` | Same number, digits only (e.g. `919876543210`) for `tel:`/`wa.me`  |
| `VITE_CONTACT_EMAIL`      | Enquiry email address                                              |
| `VITE_WHATSAPP_E164`      | WhatsApp number; falls back to the phone E164                      |
| `VITE_LEAD_ENDPOINT`      | Optional API the enquiry form POSTs to                             |

Feature flags: `VITE_OFFICE_CHENNAI_ENABLED` and `VITE_SOLUTION_INDUSTRIAL_ENABLED`
both default to `false`, so unconfirmed information is never published.

> Environment variables are compiled into the bundle at build time. They are **public**.
> Never put a secret, private API key or credential in a `VITE_*` variable.

---

## Contact form

The form collects: name, phone, email, location, requirement, message.
It validates on submit (required fields, Indian mobile format, email format), shows
inline errors wired up with `aria-invalid` / `aria-describedby`, and carries a honeypot
field plus a minimum-fill-time check to absorb basic bot spam.

Submission behaviour, in order of preference:

1. **`VITE_LEAD_ENDPOINT` is set** → `POST` JSON to that URL.
2. **Otherwise, `VITE_CONTACT_EMAIL` is set** → opens the visitor's mail client with a
   prefilled enquiry. No backend needed, and the enquiry genuinely reaches the client.
3. **Neither is set** → the form validates and confirms locally without sending.
   This is demo-only behaviour.

### Using a hosted form service (no backend)

The request is a plain JSON `POST` with `Accept: application/json`, which is exactly what
the common form services expect — so they work by setting one or two variables, with no
code change. This is the recommended setup for static hosting.

| Service | `VITE_LEAD_ENDPOINT` | Also needs |
| --- | --- | --- |
| **Web3Forms** | `https://api.web3forms.com/submit` | `VITE_LEAD_ACCESS_KEY` = your access key |
| **Formspree** | `https://formspree.io/f/<form-id>` | — |
| **Getform** | `https://getform.io/f/<form-id>` | — |
| **FormSubmit** | `https://formsubmit.co/ajax/<your-email>` | Confirm the address once by email |

The form sends the payload below plus a `subject` line, and `access_key` when configured.
Unknown fields are simply forwarded into the notification email by all four services.

> `VITE_LEAD_ACCESS_KEY` is a **public** form key, not a secret — it only permits posting
> to that one form, which is what the page does anyway. Never put a private API key or
> SMTP credential in a `VITE_*` variable; they are compiled into the bundle.

Two things to check once configured: that the service allows your site's origin (CORS),
and that its free-tier submission limit suits expected enquiry volume.

> **Before go-live you must set `VITE_CONTACT_EMAIL`, `VITE_LEAD_ENDPOINT`, or both.**
> With neither configured, submitted enquiries are not delivered anywhere.

The POST payload is already shaped for a future CRM/ERP lead API, so no migration is
needed when one exists:

```json
{
  "name": "...",
  "phone": "...",
  "email": "... or null",
  "location": "... or null",
  "requirement": "Residential Solar",
  "source": "website-contact-form",
  "message": "... or null",
  "submittedAt": "2026-09-30T10:15:00.000Z"
}
```

Any endpoint accepting `POST` with `Content-Type: application/json` and returning 2xx
works — an Azure Function, a Power Automate flow, or a form service. Whatever you use
must send CORS headers permitting the site origin.

---

## Updating content

No CMS, by design. Content lives in typed files — edit, commit, and the site rebuilds.

| What                                   | File                                      |
| -------------------------------------- | ----------------------------------------- |
| Phone, email, WhatsApp, offices, socials | `src/config/company.ts` (or `.env.local`) |
| Navigation and route list              | `src/config/navigation.ts`                |
| Solution categories                    | `src/content/solutions.ts`                |
| Services                               | `src/content/services.ts`                 |
| Process steps                          | `src/content/process.ts`                  |
| "Why Chenduraa" points                 | `src/content/values.ts`                   |
| Projects and installation types        | `src/content/projects.ts`                 |
| Per-page titles / meta descriptions    | The `<Seo>` block at the top of each page in `src/pages/` |

### Publishing real projects

`src/content/projects.ts` exports an empty `projects` array. While it is empty, the
Projects page shows the installation types we design and build. Add entries and the page
automatically switches to a real project gallery.

1. Put photographs in `public/images/projects/` — WebP or JPG, ~1600 px wide, under
   ~250 KB each.
2. Add one object per project. Only `id`, `type`, `image` and `alt` are required;
   `name`, `location` and `capacity` render only when present, so a project with just a
   photo and a category is valid.

### Replacing the logo

`src/components/brand/Logo.tsx` holds an interim mark. Drop the official SVG into
`public/` and swap the inline `<svg>` — the wordmark layout, sizing and the light/dark
variants can stay as they are. Then run `npm run assets` to regenerate the PNG favicon
and Apple touch icon.

---

## SEO

- Per-page `<title>`, meta description and canonical URL, present in the **static HTML**
  (not injected by JS) and also updated on client-side navigation
- Open Graph + Twitter card tags, with a generated 1200×630 PNG share image
- JSON-LD: `Organization` and `WebSite` on the home page, `ItemList`/`Service` on
  Services, `BreadcrumbList` on inner pages
- `robots.txt` and `sitemap.xml` generated at build time from `VITE_SITE_URL`
- One `<h1>` per page, semantic landmarks (`header`/`main`/`footer`/`nav`), alt text on
  every image, titled iframes
- Favicon, Apple touch icon, web manifest, `theme-color`

Structured data contains only confirmed facts — no ratings, review counts, founding
dates or award claims.

---

## Accessibility

- Skip-to-content link as the first tab stop
- Visible gold focus ring on every interactive element (`:focus-visible`)
- Mobile menu: `aria-expanded` / `aria-controls`, Escape to close, focus moved into the
  panel on open and returned to the toggle on close, background scroll locked
- Form errors announced via `role="alert"`, fields wired with `aria-invalid` and
  `aria-describedby`
- All animation removed under `prefers-reduced-motion`, plus a `<noscript>` fallback so
  scroll-reveal content is visible without JavaScript
- Body copy meets WCAG AA contrast against its backgrounds

---

## Performance

- ~210 KB gzipped first load for the home page, including both web fonts
- Fonts self-hosted, Latin subset only, `font-display: swap` — no third-party font CDN
- Artwork is inline SVG: sharp at any resolution, no image requests, no layout shift
- Zero third-party scripts; the only external request is the Google Maps iframe on the
  Contact page, which is lazy-loaded
- Immutable cache headers on hashed assets (see `staticwebapp.config.json`)

---

## Production deployment — Azure Static Web Apps

### 1. Create the resource

Azure Portal → **Create a resource** → **Static Web App**.

- Plan: **Free** is sufficient for this site (Standard only if you later add
  Azure Functions for the lead API)
- Deployment source: **GitHub**, pointing at this repository and the `main` branch
- Build presets: **Custom**, with:

| Setting               | Value  |
| --------------------- | ------ |
| App location          | `/`    |
| Api location          | *(blank)* |
| Output location       | `dist` |

Azure commits a workflow file to `.github/workflows/`. This repository already includes
one at [`.github/workflows/azure-static-web-apps.yml`](.github/workflows/azure-static-web-apps.yml);
use whichever you prefer, but keep only one.

### 2. Add the deployment token

Azure creates the repository secret `AZURE_STATIC_WEB_APPS_API_TOKEN` automatically when
you connect via the portal. If you are using the committed workflow instead, copy the
token from **Static Web App → Overview → Manage deployment token** into
**GitHub → Settings → Secrets and variables → Actions**.

### 3. Set build environment variables

In the workflow (or in the Azure portal under **Configuration → Application settings**,
then re-run the build), set at minimum:

```
VITE_SITE_URL=https://www.yourdomain.com
VITE_CONTACT_PHONE=...
VITE_CONTACT_PHONE_E164=91...
VITE_CONTACT_EMAIL=...
VITE_WHATSAPP_E164=91...
```

These are read at **build** time, so changing them requires a rebuild, not just a
restart.

### 4. Routing and headers

[`staticwebapp.config.json`](staticwebapp.config.json) is already configured with:

- SPA navigation fallback to `/index.html` (excluding real asset paths)
- A 404 response that still renders the site's own 404 page
- Security headers: HSTS, `X-Content-Type-Options`, `X-Frame-Options`,
  `Referrer-Policy`, `Permissions-Policy`
- One-year immutable caching for `/assets/*`

### 5. Custom domain (GoDaddy)

1. Azure Portal → your Static Web App → **Custom domains** → **Add**.
2. For `www.yourdomain.com`, choose **CNAME** validation. Azure gives you a target like
   `<name>.azurestaticapps.net`.
3. In GoDaddy → **DNS Management**:
   - `CNAME` · Host `www` · Value `<name>.azurestaticapps.net` · TTL 1 hour
   - For the apex `yourdomain.com`, Azure validates with a `TXT` record it supplies, then
     you add GoDaddy **Forwarding** from the apex to `www`, or an `A`/`ALIAS` record if
     your DNS plan supports it. Routing apex → `www` is the simpler, recommended setup.
4. Wait for propagation (usually minutes, up to a few hours) and confirm in Azure that
   the domain shows **Ready**.
5. HTTPS is automatic — Azure provisions and renews a free certificate. No action needed.
6. Set `VITE_SITE_URL` to the final domain and **redeploy**, so canonical URLs, the
   sitemap and `robots.txt` all point at the live domain.

### 6. Post-deploy checks

- `https://yourdomain.com/sitemap.xml` lists 8 URLs on the correct domain
- `https://yourdomain.com/robots.txt` points at that sitemap
- Deep links load directly (e.g. paste `/services` into a fresh tab)
- An unknown URL renders the site's 404 page
- Submit the enquiry form once and confirm it arrives where you expect
- Submit the sitemap in Google Search Console

---

## Alternative: GitHub Pages

The build works on GitHub Pages unchanged — output is already directory-index HTML with a
native `404.html`, and `public/.nojekyll` stops Jekyll interfering. A workflow is included
at [`.github/workflows/github-pages.yml`](.github/workflows/github-pages.yml). Enable
**only one** of the two workflows.

**Before choosing it, two limitations:**

1. **Private repositories need a paid GitHub plan.** Publishing Pages from a private repo
   requires Pro, Team or Enterprise. On the free plan the repository — and therefore all
   of this source — must be **public**. Azure Static Web Apps has no such restriction on
   its free tier.
2. **No custom response headers.** `staticwebapp.config.json` is ignored, so the HSTS,
   `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy` and `Permissions-Policy`
   headers configured for Azure will not be applied. HTTPS itself is still provided free.

Everything else is equivalent: free hosting, custom domains, automatic certificates, and
the enquiry form works identically because it posts to a third-party service rather than
to the host.

### Setup

1. **Settings → Pages → Build and deployment → Source: GitHub Actions.**
2. Add repository **variables** (Settings → Secrets and variables → Actions → Variables).
   Which ones depend on how the site is addressed:

   **Custom domain, or a user/org site** (`<user>.github.io`) — served from the root:

   ```
   VITE_SITE_URL   = https://www.yourdomain.com
   CUSTOM_DOMAIN   = www.yourdomain.com     # only for a custom domain
   # leave VITE_BASE_PATH unset
   ```

   **Project site** (`https://<user>.github.io/<repo>/`) — served from a sub-path:

   ```
   VITE_BASE_PATH  = Chenduraa
   VITE_SITE_URL   = https://<user>.github.io/Chenduraa
   ```

   `VITE_BASE_PATH` feeds Vite's `base`, the React Router `basename`, asset URLs,
   canonical tags and the sitemap, so the whole site relocates consistently.

3. Add the contact variables (`VITE_CONTACT_PHONE`, `VITE_CONTACT_EMAIL`,
   `VITE_LEAD_ENDPOINT`, …) exactly as for Azure.
4. Push to `main`.

### Custom domain on GitHub Pages (GoDaddy)

Set the `CUSTOM_DOMAIN` repository variable — the workflow writes the `CNAME` file for
you. Then in GoDaddy DNS:

- `CNAME` · Host `www` · Value `<user>.github.io`
- For the apex, four `A` records to `185.199.108.153`, `185.199.109.153`,
  `185.199.110.153`, `185.199.111.153`

Then Settings → Pages → Custom domain, and tick **Enforce HTTPS** once the certificate is
issued (usually within the hour).

### Verifying a sub-path build locally

```bash
VITE_BASE_PATH=Chenduraa VITE_SITE_URL=https://example.github.io/Chenduraa npm run build
VITE_BASE_PATH=Chenduraa npm run serve
# -> http://localhost:4173/Chenduraa/
```

### Which host?

Azure Static Web Apps is the better fit here: the repository can stay private on the free
tier, and the security headers already written in `staticwebapp.config.json` are actually
applied. Choose GitHub Pages if you would rather not manage an Azure resource and are
comfortable with a public repository.

---

## Client inputs still required

Tracked in [`CONTENT-TODO.md`](CONTENT-TODO.md). Nothing in that list blocks the demo —
the site is complete and presentable without it — but the contact details and lead
delivery must be supplied before go-live.

---

## Project structure

```
src/
  components/
    brand/       Logo lockup
    contact/     Enquiry form
    graphics/    SVG artwork, scenes and the icon set
    layout/      Header, footer, floating contact, route behaviour
    sections/    Composable page sections (hero, process, gallery, CTA…)
    ui/          Button, Container, Section, Reveal primitives
  config/        Company details, navigation, route list
  content/       Editable copy: solutions, services, process, values, projects
  lib/           SEO, structured data, class-name helper
  pages/         One file per route
  entry-server.tsx   SSR entry used by the prerenderer
  main.tsx           Browser entry (hydrates the prerendered HTML)
scripts/
  prerender.mjs              Static generation + sitemap + robots
  generate-raster-assets.mjs SVG → PNG for favicon/OG images
```
