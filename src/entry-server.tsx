import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { App } from './App'
import { getCollectedSeo, resetCollectedSeo, seoToHtml } from './lib/seo'
import { staticRoutes } from './config/navigation'
import { company, routerBasename } from './config/company'

/** Routes that get a static HTML file. Consumed by scripts/prerender.mjs. */
export const routes = staticRoutes

/** Canonical origin, resolved from VITE_SITE_URL at build time. */
export const siteUrl = company.siteUrl

export function render(url: string): { html: string; head: string } {
  resetCollectedSeo()

  // StaticRouter matches against the full path, so the basename has to be
  // present in the location it is given.
  const html = renderToString(
    <StaticRouter location={`${routerBasename}${url}`} basename={routerBasename || undefined}>
      <App />
    </StaticRouter>,
  )

  const seo = getCollectedSeo()
  if (!seo) {
    throw new Error(`No <Seo> metadata was declared for route "${url}".`)
  }

  return { html, head: seoToHtml(seo) }
}
