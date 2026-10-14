import { useEffect } from 'react'
import type { ReactNode } from 'react'
import whatsapp from '../assets/icons/whatsapp.svg'
import { EMAIL, PHONE, PHONE_HREF, SCHOOL, WHATSAPP_HREF } from '../data/site'
import { ArrowLong, Eyebrow, Heading, Mail, Phone, Reveal } from './ui'

/** Sets the tab title: "News | Paradise Junior School", or just the school's name on the home page. */
export function useTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} | ${SCHOOL.full}` : SCHOOL.full
  }, [title])
}

/** The top of every inner page: a small label, the page's name as a display heading, and a line or two. */
export function PageHead({ eyebrow, lines, children }: { eyebrow: string; lines: string[]; children?: ReactNode }) {
  return (
    <Reveal className="page-head">
      <Eyebrow>{eyebrow}</Eyebrow>
      <Heading as="h1" lines={lines} className="display--hero" />
      {children && <div className="page-head__intro">{children}</div>}
    </Reveal>
  )
}

/** A smaller heading block for the sections inside a page. */
export function SectionHead({ eyebrow, lines, children }: { eyebrow: string; lines: string[]; children?: ReactNode }) {
  return (
    <Reveal className="section-head">
      <Eyebrow>{eyebrow}</Eyebrow>
      <Heading lines={lines} className="display--sm" />
      {children}
    </Reveal>
  )
}

/** Numbered steps on the dark band used by the franchise and teacher training pages. */
export function StepsBand({ title, steps }: { title: string; steps: { title: string; text: string }[] }) {
  return (
    <Reveal className="band">
      <h2 className="display display--sm">
        {title}
        <span className="hl">.</span>
      </h2>
      <ol className="band__steps">
        {steps.map((s, i) => (
          <li key={s.title}>
            <span className="band__n">{String(i + 1).padStart(2, '0')}</span>
            <h3 className="title">{s.title}</h3>
            <p>{s.text}</p>
          </li>
        ))}
      </ol>
    </Reveal>
  )
}

/** Four things in a row, each with a small icon: what a partner gets, what the training covers. */
export function Offers({ items }: { items: { icon: string; title: string; text: string }[] }) {
  return (
    <ul className="offers">
      {items.map((o, i) => (
        <Reveal as="li" key={o.title} className="card tile" delay={i * 80}>
          <span className="offers__icon">
            <img src={o.icon} alt="" width={34} height={34} loading="lazy" />
          </span>
          <h2 className="tile__word">{o.title}</h2>
          <span className="dash" aria-hidden />
          <p>{o.text}</p>
        </Reveal>
      ))}
    </ul>
  )
}

export function Ticks({ items }: { items: string[] }) {
  return (
    <ul className="ticks">
      {items.map((t) => (
        <li key={t}>{t}</li>
      ))}
    </ul>
  )
}

/**
 * The direct lines, for anyone who would rather talk than fill in a form: WhatsApp first, with
 * the opening message already written so the office knows what it is about, then phone and email.
 */
export function ContactCard({ title = 'Rather talk?', note, whatsappMessage }: { title?: string; note: string; whatsappMessage: string }) {
  return (
    <div className="contact-card">
      <h3 className="title">{title}</h3>
      <p>{note}</p>
      <a className="contact-card__wa" href={`${WHATSAPP_HREF}?text=${encodeURIComponent(whatsappMessage)}`} target="_blank" rel="noopener noreferrer">
        <img src={whatsapp} alt="" width={26} height={26} />
        Chat on WhatsApp
        <ArrowLong />
      </a>
      <ul>
        <li>
          <a href={PHONE_HREF}>
            <Phone />
            <span>
              <strong>{PHONE}</strong>
              <small>Call us</small>
            </span>
          </a>
        </li>
        <li>
          <a href={`mailto:${EMAIL}`}>
            <Mail />
            <span>
              <strong>{EMAIL}</strong>
              <small>Write to us</small>
            </span>
          </a>
        </li>
      </ul>
    </div>
  )
}
