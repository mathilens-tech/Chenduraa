import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '@/components/graphics/Icon'
import { whatsappHref } from '@/config/company'
import { cn } from '@/lib/cn'

const WHATSAPP_MESSAGE =
  'Hello Chenduraa Energy, I would like to enquire about solar for my property.'

/**
 * Floating contact affordance.
 *
 * When an official WhatsApp number is configured this is a WhatsApp link; until
 * then it falls back to the enquiry form so the demo is never broken and no
 * placeholder number is ever dialled. No number is hard-coded anywhere.
 */
export function FloatingContact() {
  const [visible, setVisible] = useState(false)
  const href = whatsappHref(WHATSAPP_MESSAGE)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 320)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const shell = cn(
    'group fixed right-4 bottom-4 z-40 inline-flex items-center gap-2.5 rounded-full py-3 pr-4 pl-3.5',
    'font-display text-sm font-semibold shadow-lift transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]',
    'sm:right-6 sm:bottom-6',
    visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0',
  )

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className={cn(shell, 'bg-[#1f9d55] text-white hover:bg-[#188045]')}
      >
        <Icon name="whatsapp" className="h-5 w-5" strokeWidth={1.5} />
        <span className="hidden sm:inline">WhatsApp</span>
      </a>
    )
  }

  return (
    <Link
      to="/contact"
      aria-label="Send an enquiry"
      className={cn(shell, 'bg-navy-700 text-white hover:bg-navy-600')}
    >
      <Icon name="consultation" className="h-5 w-5" strokeWidth={1.5} />
      <span className="hidden sm:inline">Enquire</span>
    </Link>
  )
}
