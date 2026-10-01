/**
 * Line-icon set. Single 24x24 grid, 1.6 stroke, no fills — consistent weight
 * across the site and a few hundred bytes each. `currentColor` throughout so
 * icons inherit their context.
 */

export type IconName =
  // services
  | 'consultation'
  | 'assessment'
  | 'design'
  | 'installation'
  | 'maintenance'
  | 'subsidy'
  // value points
  | 'endToEnd'
  | 'customer'
  | 'install'
  | 'support'
  | 'clean'
  | 'clarity'
  // interface
  | 'phone'
  | 'mail'
  | 'pin'
  | 'whatsapp'
  | 'clock'
  | 'check'
  | 'menu'
  | 'close'
  | 'chevronDown'
  | 'arrowUpRight'
  | 'sun'
  | 'alert'

const paths: Record<IconName, { d: string; fill?: boolean }[]> = {
  consultation: [
    { d: 'M3 6.5A2.5 2.5 0 0 1 5.5 4h8A2.5 2.5 0 0 1 16 6.5v4A2.5 2.5 0 0 1 13.5 13H8l-5 3.5z' },
    { d: 'M9 16.2a2.5 2.5 0 0 0 2.4 1.8h4.1l3.5 2.5V15a2.5 2.5 0 0 0-1.8-2.4' },
  ],
  assessment: [
    { d: 'M8 4h8a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z' },
    { d: 'M10 3.5h4v2h-4z' },
    { d: 'M9.8 11.2l1.6 1.7 3-3.6' },
    { d: 'M9.8 16h5' },
  ],
  design: [
    { d: 'M3.5 5.5h17v13h-17z' },
    { d: 'M3.5 9.5h17M8.5 9.5v9M14 9.5v9' },
    { d: 'M17 13.2 19.8 16 17 18.8' },
  ],
  installation: [
    { d: 'M14.8 3.6a4.2 4.2 0 0 0-5.4 5.4l-6 6a1.5 1.5 0 0 0 0 2.1l1.5 1.5a1.5 1.5 0 0 0 2.1 0l6-6a4.2 4.2 0 0 0 5.4-5.4l-2.5 2.5-2.6-2.6z' },
  ],
  maintenance: [
    { d: 'M12 15.2a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4z' },
    {
      d: 'M12 3.2v2M12 19v2M5.8 5.8l1.4 1.4M16.8 16.8l1.4 1.4M3.2 12h2M18.8 12h2M5.8 18.2l1.4-1.4M16.8 7.2l1.4-1.4',
    },
  ],
  subsidy: [
    { d: 'M6 3.5h9l4 4v13H6z' },
    { d: 'M15 3.5v4h4' },
    { d: 'M9.5 10.5h5M9.5 13h5M12.8 10.5c1.6 0 1.6 2.5 0 2.5h-3.3l3.8 4' },
  ],
  endToEnd: [
    { d: 'M4 7h8.5a3.5 3.5 0 0 1 0 7H8' },
    { d: 'M10.2 4.8 7.5 7l2.7 2.2' },
    { d: 'M5.8 11.8 8.5 14l-2.7 2.2' },
    { d: 'M15 17h5' },
  ],
  customer: [
    { d: 'M12 11.5a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5z' },
    { d: 'M4.8 20.2a7.2 7.2 0 0 1 14.4 0' },
  ],
  install: [
    { d: 'M4 16.5a8 8 0 0 1 16 0z' },
    { d: 'M3 19.8h18' },
    { d: 'M9.2 9.2V6.4A1.6 1.6 0 0 1 10.8 4.8h2.4a1.6 1.6 0 0 1 1.6 1.6v2.8' },
  ],
  support: [
    { d: 'M4.5 14v-2a7.5 7.5 0 0 1 15 0v2' },
    { d: 'M4.5 13.5h2v5h-2a1.5 1.5 0 0 1-1.5-1.5v-2a1.5 1.5 0 0 1 1.5-1.5zM17.5 13.5h2A1.5 1.5 0 0 1 21 15v2a1.5 1.5 0 0 1-1.5 1.5h-2z' },
    { d: 'M18.5 18.5v.5a2.5 2.5 0 0 1-2.5 2.5h-2.5' },
  ],
  clean: [
    { d: 'M20 4c0 8.5-4.2 13-9 13a5.2 5.2 0 0 1-3.6-1.3C9 9 13.5 5.5 20 4z' },
    { d: 'M5 21c0-4 1.2-7 3.4-9.3' },
  ],
  clarity: [
    { d: 'M3 12s3.4-6 9-6 9 6 9 6-3.4 6-9 6-9-6-9-6z' },
    { d: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z' },
  ],
  phone: [
    {
      d: 'M6.3 3.8h2.4l1.5 3.7-1.9 1.4a10.5 10.5 0 0 0 4.9 4.9l1.4-1.9 3.7 1.5v2.4a2.3 2.3 0 0 1-2.5 2.3C10 17.4 6.6 14 5.2 7.9a2.3 2.3 0 0 1 1.1-4.1z',
    },
  ],
  mail: [
    { d: 'M3.5 6h17v12h-17z' },
    { d: 'm3.9 6.6 8.1 6 8.1-6' },
  ],
  pin: [
    { d: 'M12 21s6.5-6.1 6.5-10.5a6.5 6.5 0 0 0-13 0C5.5 14.9 12 21 12 21z' },
    { d: 'M12 13.2a2.6 2.6 0 1 0 0-5.2 2.6 2.6 0 0 0 0 5.2z' },
  ],
  whatsapp: [
    {
      d: 'M12.04 2.6a9.3 9.3 0 0 0-7.9 14.2L2.8 21.4l4.7-1.3a9.3 9.3 0 1 0 4.54-17.5z',
    },
    {
      d: 'M8.9 7.6c.25 0 .5.01.72.02.23.01.36.05.52.42.16.37.62 1.5.68 1.61.06.11.1.24.02.39-.07.15-.14.24-.25.37-.11.13-.23.29-.33.39-.11.1-.22.22-.09.44.13.22.58.95 1.24 1.53.85.76 1.57 1 1.79 1.1.22.09.35.08.48-.05.13-.13.56-.64.71-.86.15-.22.3-.18.5-.11.2.07 1.29.6 1.51.72.22.11.37.17.42.26.05.1.05.56-.13 1.11-.18.55-1.04 1.08-1.5 1.11-.46.04-.89.2-2.61-.48-2.08-.82-3.39-2.93-3.49-3.07-.1-.14-.83-1.11-.83-2.12s.53-1.5.72-1.71c.19-.2.41-.25.55-.25z',
    },
  ],
  clock: [
    { d: 'M12 20.5a8.5 8.5 0 1 0 0-17 8.5 8.5 0 0 0 0 17z' },
    { d: 'M12 7.8V12l3 1.9' },
  ],
  check: [{ d: 'm4.5 12.5 5 5 10-11' }],
  menu: [{ d: 'M4 7h16M4 12h16M4 17h16' }],
  close: [{ d: 'M6 6l12 12M18 6 6 18' }],
  chevronDown: [{ d: 'm6 9.5 6 6 6-6' }],
  arrowUpRight: [{ d: 'M7 17 17 7M9 7h8v8' }],
  sun: [
    { d: 'M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10z' },
    { d: 'M12 2.5v2M12 19.5v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2.5 12h2M19.5 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4' },
  ],
  alert: [
    { d: 'M12 3.5 21.5 20H2.5z' },
    { d: 'M12 9.5v4.2M12 16.6v.1' },
  ],
}

export function Icon({
  name,
  className = 'h-6 w-6',
  strokeWidth = 1.6,
}: {
  name: IconName
  className?: string
  strokeWidth?: number
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name].map((path, index) => (
        <path key={index} d={path.d} />
      ))}
    </svg>
  )
}
