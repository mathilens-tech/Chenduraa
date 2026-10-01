import { Route, Routes } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import Home from '@/pages/Home'
import About from '@/pages/About'
import Solutions from '@/pages/Solutions'
import Services from '@/pages/Services'
import Projects from '@/pages/Projects'
import Contact from '@/pages/Contact'
import PrivacyPolicy from '@/pages/legal/PrivacyPolicy'
import Terms from '@/pages/legal/Terms'
import NotFound from '@/pages/NotFound'

/**
 * Routes are imported eagerly rather than code-split: the whole site is a few
 * hundred kilobytes, and eager imports let every page be prerendered to static
 * HTML at build time without Suspense boundaries.
 */
export function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="solutions" element={<Solutions />} />
        <Route path="services" element={<Services />} />
        <Route path="projects" element={<Projects />} />
        <Route path="contact" element={<Contact />} />
        <Route path="privacy-policy" element={<PrivacyPolicy />} />
        <Route path="terms" element={<Terms />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
