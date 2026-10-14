import { useEffect, useRef, useState } from 'react'
import type { ElementType, ReactNode, SVGProps } from 'react'
import { Link } from 'react-router-dom'

/* ─── Links ───────────────────────────────────────────────────────────────── */

const isExternal = (href: string) => /^(https?:|tel:|mailto:)/.test(href)

/** One link for everything: router paths (including `/#section`) and tel:, mailto: and https: alike. */
export function Go({ to, children, className, ...rest }: { to: string; children: ReactNode; className?: string; 'aria-label'?: string; onClick?: () => void }) {
  if (isExternal(to)) {
    const web = to.startsWith('http')
    return (
      <a href={to} className={className} {...(web ? { target: '_blank', rel: 'noopener noreferrer' } : {})} {...rest}>
        {children}
      </a>
    )
  }
  return (
    <Link to={to} className={className} {...rest}>
      {children}
    </Link>
  )
}

/** The site's standard call to action: a line of text and a long arrow in an outlined pill. */
export function ArrowLink({ to, children, light = false }: { to: string; children: ReactNode; light?: boolean }) {
  return (
    <Go to={to} className={`arrow-link${light ? ' arrow-link--light' : ''}`}>
      <span>{children}</span>
      <span className="arrow-link__pill" aria-hidden>
        <ArrowLong />
      </span>
    </Go>
  )
}

/* ─── Type ────────────────────────────────────────────────────────────────── */

export function Eyebrow({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <p className={`eyebrow ${className}`}>{children}</p>
}

/**
 * A display heading, one entry per line. The last word is picked out in the accent colour and
 * its full stop stays in ink, which is the signature of every heading on the site.
 */
export function Heading({ lines, as: Tag = 'h2', className = '' }: { lines: string[]; as?: ElementType; className?: string }) {
  const last = lines[lines.length - 1] ?? ''
  const [, lead = '', word = '', mark = ''] = last.match(/^(.*\s)?(\S+?)([.?!]*)$/) ?? []
  return (
    <Tag className={`display ${className}`}>
      {lines.slice(0, -1).map((l) => (
        <span key={l} className="display__line">
          {l}{' '}
        </span>
      ))}
      <span className="display__line">
        {lead}
        <span className="hl">{word}</span>
        {mark}
      </span>
    </Tag>
  )
}

/* ─── Motion ──────────────────────────────────────────────────────────────── */

/**
 * Fades its children up the first time they scroll into view. With `replay`, it hides again once it
 * drops back below the fold, so it rises afresh every time it is scrolled to. Does nothing without
 * `.motion` on <html>.
 */
export function Reveal({ children, className = '', delay = 0, replay = false, as: Tag = 'div' }: { children: ReactNode; className?: string; delay?: number; replay?: boolean; as?: ElementType }) {
  const ref = useRef<HTMLElement>(null)
  const [seen, setSeen] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || (seen && !replay)) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return
        if (entry.isIntersecting) {
          setSeen(true)
          if (!replay) io.disconnect()
        } else if (replay && entry.boundingClientRect.top > 0) {
          setSeen(false)
        }
      },
      { rootMargin: '0px 0px -8% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [seen, replay])

  return (
    <Tag ref={ref} className={`reveal${seen ? ' is-seen' : ''} ${className}`} style={delay ? { transitionDelay: `${delay}ms` } : undefined}>
      {children}
    </Tag>
  )
}

/* ─── Popup ───────────────────────────────────────────────────────────────── */

/** A native modal dialog: the browser traps focus, closes on Escape and hands focus back. */
export function Modal({ open, onClose, label, children, className = '' }: { open: boolean; onClose: () => void; label: string; children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const d = ref.current
    if (!d) return
    if (open && !d.open) d.showModal()
    if (!open && d.open) d.close()
  }, [open])

  return (
    <dialog
      ref={ref}
      className={`modal ${className}`}
      aria-label={label}
      onClose={onClose}
      onClick={(e) => {
        // A click on the backdrop lands on the dialog element itself.
        if (e.target === ref.current) onClose()
      }}
    >
      {open && (
        <div className="modal__body">
          <button type="button" className="round-btn modal__close" onClick={onClose} aria-label="Close">
            <Close />
          </button>
          {children}
        </div>
      )}
    </dialog>
  )
}

/* ─── Icons ───────────────────────────────────────────────────────────────── */

type IconProps = SVGProps<SVGSVGElement>

const Svg = ({ children, ...p }: IconProps) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden {...p}>
    {children}
  </svg>
)

export const ArrowLong = (p: IconProps) => (
  <svg viewBox="0 0 34 12" width="34" height="12" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden {...p}>
    <path d="M1 6h31M27 1.5 32 6l-5 4.5" />
  </svg>
)
export const Chevron = ({ dir = 'right', ...p }: IconProps & { dir?: 'left' | 'right' | 'down' }) => (
  <Svg strokeWidth={2.6} {...p}>
    <path d={dir === 'left' ? 'm14.5 6-6 6 6 6' : dir === 'down' ? 'm6 9.5 6 6 6-6' : 'm9.5 6 6 6-6 6'} />
  </Svg>
)
export const Plus = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 5v14M5 12h14" />
  </Svg>
)
export const Close = (p: IconProps) => (
  <Svg {...p}>
    <path d="m6 6 12 12M18 6 6 18" />
  </Svg>
)
export const Menu = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </Svg>
)
export const Search = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </Svg>
)
export const Phone = (p: IconProps) => (
  <Svg {...p}>
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
  </Svg>
)
export const Mail = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </Svg>
)
export const Pin = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 21s7-6.2 7-11a7 7 0 0 0-14 0c0 4.800 7 11 7 11Z" />
    <circle cx="12" cy="10" r="2.5" />
  </Svg>
)
export const Chat = (p: IconProps) => (
  <Svg {...p}>
    <path d="M21 11.5a8.500 8.500 0 0 1-12.600 7.400L3 20l1.200-5A8.500 8.500 0 1 1 21 11.500Z" />
  </Svg>
)
export const Cap = (p: IconProps) => (
  <Svg {...p}>
    <path d="m2 9 10-5 10 5-10 5L2 9Z" />
    <path d="M6 11.500V16c2 2 10 2 12 0v-4.500" />
  </Svg>
)
export const Pause = (p: IconProps) => (
  <Svg {...p}>
    <path d="M9 6v12M15 6v12" />
  </Svg>
)
export const Play = (p: IconProps) => (
  <Svg {...p}>
    <path d="m8 5 11 7-11 7V5Z" />
  </Svg>
)
export const Check = (p: IconProps) => (
  <Svg strokeWidth={3} {...p}>
    <path d="M4 12.500 9.500 18 20 6.500" />
  </Svg>
)
