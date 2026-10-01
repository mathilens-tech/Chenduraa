import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { Logo } from '@/components/brand/Logo'
import { Icon } from '@/components/graphics/Icon'
import { primaryNav } from '@/config/navigation'
import { contact, telHref, whatsappHref } from '@/config/company'
import { cn } from '@/lib/cn'

const WHATSAPP_MESSAGE = 'Hello, I would like to enquire about solar for my property.'

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const panelRef = useRef<HTMLDivElement | null>(null)
  const toggleRef = useRef<HTMLButtonElement | null>(null)
  const whatsapp = whatsappHref(WHATSAPP_MESSAGE)

  /* Elevate the header once the page has scrolled away from the top. */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Close the menu on navigation. */
  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  /* Lock background scroll and wire up Escape while the menu is open. */
  useEffect(() => {
    if (!menuOpen) return

    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        toggleRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)

    // Move focus into the panel so keyboard users land in the menu.
    panelRef.current?.querySelector<HTMLElement>('a, button')?.focus()

    return () => {
      document.body.style.overflow = overflow
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [menuOpen])

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-50 border-b bg-white/92 backdrop-blur-md transition-shadow duration-300',
          scrolled ? 'border-line shadow-[0_1px_16px_-6px_rgb(7_28_54/0.22)]' : 'border-transparent',
        )}
      >
        <Container width="wide">
          <div className="flex h-16 items-center justify-between gap-4 sm:h-[4.5rem] lg:h-20">
            <Link
              to="/"
              className="-m-1 rounded-sm p-1"
              aria-label="Chenduraa Energy Solar Power Pvt. Ltd. — home"
            >
              <Logo />
            </Link>

            {/* Desktop navigation */}
            <nav aria-label="Primary" className="hidden lg:block">
              <ul className="flex items-center gap-1">
                {primaryNav.map((item) => (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      end={item.to === '/'}
                      className={({ isActive }) =>
                        cn(
                          'relative block rounded-sm px-3.5 py-2 text-[0.9rem] font-medium transition-colors duration-200',
                          'after:absolute after:bottom-1 after:left-3.5 after:h-[2px] after:bg-gold-400 after:transition-all after:duration-300 after:content-[""]',
                          isActive
                            ? 'text-navy-700 after:right-3.5'
                            : 'text-body after:right-[calc(100%-0.875rem)] after:opacity-0 hover:text-navy-700',
                        )
                      }
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex items-center gap-2 sm:gap-3">
              {telHref && (
                <a
                  href={telHref}
                  className="hidden items-center gap-2 rounded-sm px-2 py-1.5 text-[0.875rem] font-medium text-body transition-colors hover:text-navy-700 xl:inline-flex"
                >
                  <Icon name="phone" className="h-4 w-4 text-gold-600" />
                  <span>{contact.phone}</span>
                </a>
              )}

              {/*
                Display utilities are wrapped rather than passed to <Button>:
                Tailwind emits `.inline-flex` after `.hidden`, so a `hidden`
                class on the button itself would lose the specificity tie.
              */}
              <span className="hidden sm:inline-flex">
                <Button to="/contact" size="md">
                  Get a Consultation
                </Button>
              </span>
              {/* Compact CTA so small screens still get one in the header. */}
              <span className="inline-flex sm:hidden">
                <Button to="/contact" size="md">
                  Enquire
                </Button>
              </span>

              <button
                ref={toggleRef}
                type="button"
                onClick={() => setMenuOpen((open) => !open)}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                className="inline-flex h-11 w-11 items-center justify-center rounded-[3px] border border-line text-navy-700 transition-colors hover:bg-navy-50 lg:hidden"
              >
                <Icon name={menuOpen ? 'close' : 'menu'} className="h-5 w-5" strokeWidth={1.8} />
              </button>
            </div>
          </div>
        </Container>
      </header>

      {/*
        The panel is a sibling of <header>, not a child: the header's
        backdrop-filter would otherwise become the containing block for this
        fixed element, collapsing it to the height of the header itself.
      */}
      <div
        id="mobile-menu"
        ref={panelRef}
        hidden={!menuOpen}
        className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto border-t border-line bg-white sm:top-[4.5rem] lg:hidden"
      >
        <nav aria-label="Mobile" className="px-5 pt-3 pb-8 sm:px-7">
          <ul className="divide-y divide-line">
            {primaryNav.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center justify-between py-4 font-display text-lg font-semibold transition-colors',
                      isActive ? 'text-gold-600' : 'text-navy-700',
                    )
                  }
                >
                  {item.label}
                  <Icon name="arrowUpRight" className="h-4 w-4 opacity-40" />
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="mt-7 flex flex-col gap-3">
            <Button to="/contact" size="lg" withArrow>
              Get a Consultation
            </Button>
            {whatsapp && (
              <Button href={whatsapp} variant="secondary" size="lg">
                Chat on WhatsApp
              </Button>
            )}
          </div>

          {(telHref || contact.email) && (
            <dl className="mt-8 space-y-4 border-t border-line pt-7 text-sm">
              {telHref && (
                <div className="flex items-center gap-3">
                  <dt className="sr-only">Phone</dt>
                  <Icon name="phone" className="h-4 w-4 shrink-0 text-gold-600" />
                  <dd>
                    <a href={telHref} className="font-medium text-navy-700">
                      {contact.phone}
                    </a>
                  </dd>
                </div>
              )}
              {contact.email && (
                <div className="flex items-center gap-3">
                  <dt className="sr-only">Email</dt>
                  <Icon name="mail" className="h-4 w-4 shrink-0 text-gold-600" />
                  <dd>
                    <a
                      href={`mailto:${contact.email}`}
                      className="font-medium break-all text-navy-700"
                    >
                      {contact.email}
                    </a>
                  </dd>
                </div>
              )}
            </dl>
          )}
        </nav>
      </div>
    </>
  )
}
