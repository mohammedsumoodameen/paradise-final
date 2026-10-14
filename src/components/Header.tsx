import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import mark from '../assets/mark.png'
import { LINKS, NAV_ITEMS, PHONE, PHONE_HREF, SCHOOL, WHATSAPP_HREF } from '../data/site'
import { Cap, Chat, Chevron, Go, Menu, Modal, Phone, Pin } from './ui'

/** The school's name beside the kite mark, used in the header, the menu and the footer. */
export function Brand({ onClick }: { onClick?: () => void }) {
  return (
    <Go to={LINKS.home} className="brand" aria-label={`${SCHOOL.full}, home`} onClick={onClick}>
      <span className="brand__mark">
        <img src={mark} alt="" width={64} height={64} />
      </span>
      <span className="brand__text">
        <span className="brand__name">{SCHOOL.name.toLowerCase()}</span>
        <span className="brand__name">{SCHOOL.descriptor.toLowerCase()}</span>
        <span className="brand__line">A pleasant life begins here</span>
      </span>
    </Go>
  )
}

const UTILITY = [
  { label: 'Find a school', to: LINKS.admission, icon: <Pin /> },
  { label: 'Teacher training', to: LINKS.pet, icon: <Cap /> },
  { label: 'Contact us', to: LINKS.contact, icon: <Chat /> },
]

/**
 * The header: a small utility row, the four doors into the site (each opening a panel with
 * its one-line blurb and its links), and a round button that rings the school. On phones the
 * doors move into a full-screen menu.
 */
export default function Header() {
  const [open, setOpen] = useState<number | null>(null)
  const [menu, setMenu] = useState(false)
  const { pathname, hash } = useLocation()
  const ref = useRef<HTMLElement>(null)

  // Any navigation closes whatever was open.
  useEffect(() => {
    setOpen(null)
    setMenu(false)
  }, [pathname, hash])

  useEffect(() => {
    if (open === null) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(null)
    const onDown = (e: PointerEvent) => !ref.current?.contains(e.target as Node) && setOpen(null)
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onDown)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onDown)
    }
  }, [open])

  const item = open === null ? undefined : NAV_ITEMS[open]

  return (
    <header className="header" ref={ref} onMouseLeave={() => setOpen(null)}>
      <div className="wrap header__row">
        <Brand />

        <div className="header__side">
          <ul className="utility">
            {UTILITY.map((u) => (
              <li key={u.label}>
                <Go to={u.to} className="utility__link">
                  {u.icon}
                  {u.label}
                </Go>
              </li>
            ))}
          </ul>

          <div className="header__main">
            <nav aria-label="Main">
              <ul className="nav">
                {NAV_ITEMS.map((n, i) => (
                  <li key={n.name}>
                    <button
                      type="button"
                      className="nav__item"
                      aria-expanded={open === i}
                      aria-controls="nav-panel"
                      onClick={() => setOpen(open === i ? null : i)}
                      onMouseEnter={() => setOpen(i)}
                    >
                      {n.name}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
            <a href={PHONE_HREF} className="round-btn header__call" aria-label={`Call the school on ${PHONE}`} title={`Call ${PHONE}`}>
              <Phone />
            </a>
            <button type="button" className="round-btn header__burger" aria-label="Open menu" onClick={() => setMenu(true)}>
              <Menu />
            </button>
          </div>
        </div>
      </div>

      <div id="nav-panel" className="panel" hidden={!item}>
        {item && (
          <div className="wrap panel__inner">
            <p className="panel__blurb">{item.blurb}</p>
            <ul className="panel__links">
              {item.subLinks.map((l) => (
                <li key={l.name}>
                  <Go to={l.href} className="panel__link" onClick={() => setOpen(null)}>
                    {l.name}
                    <Chevron />
                  </Go>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <Modal open={menu} onClose={() => setMenu(false)} label="Menu" className="modal--menu">
        <Brand onClick={() => setMenu(false)} />
        <nav aria-label="Menu" className="mmenu">
          {NAV_ITEMS.map((n) => (
            <details key={n.name} className="mmenu__group">
              <summary>
                {n.name}
                <Chevron dir="down" />
              </summary>
              <p>{n.blurb}</p>
              <ul>
                {n.subLinks.map((l) => (
                  <li key={l.name}>
                    <Go to={l.href} onClick={() => setMenu(false)}>
                      {l.name}
                    </Go>
                  </li>
                ))}
              </ul>
            </details>
          ))}
        </nav>
        <div className="mmenu__foot">
          <Go to={LINKS.visit} className="btn" onClick={() => setMenu(false)}>
            Plan a Visit
          </Go>
          <a href={PHONE_HREF} className="btn btn--ghost">
            <Phone /> {PHONE}
          </a>
          <Go to={WHATSAPP_HREF} className="btn btn--ghost">
            <Chat /> WhatsApp
          </Go>
        </div>
      </Modal>
    </header>
  )
}
