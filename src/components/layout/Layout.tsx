import { Outlet } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'
import { FloatingContact } from './FloatingContact'
import { RouteBehaviour } from './RouteBehaviour'

export function Layout() {
  return (
    <>
      <RouteBehaviour />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-[3px] focus:bg-navy-700 focus:px-4 focus:py-2.5 focus:font-display focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
      <FloatingContact />
    </>
  )
}
