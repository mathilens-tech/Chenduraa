import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { App } from './App'
import { routerBasename } from './config/company'
import './index.css'

const container = document.getElementById('root')

if (!container) {
  throw new Error('Root container #root was not found in the document.')
}

const tree = (
  <StrictMode>
    <BrowserRouter basename={routerBasename || undefined}>
      <App />
    </BrowserRouter>
  </StrictMode>
)

/**
 * Production builds are prerendered to static HTML, so hydrate when markup is
 * already present and mount fresh otherwise (dev server, or an unprerendered
 * route).
 */
if (container.hasChildNodes()) {
  hydrateRoot(container, tree)
} else {
  createRoot(container).render(tree)
}
