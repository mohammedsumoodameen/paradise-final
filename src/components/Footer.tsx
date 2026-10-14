import mark from '../assets/mark.png'
import { EMAIL, LINKS, PHONE, PHONE_HREF, SCHOOL, SOCIALS, WHATSAPP_HREF, isLive } from '../data/site'
import { Chat, Go, Mail, Phone } from './ui'

const USEFUL = [
  { name: 'Find your school', href: LINKS.admission },
  { name: 'Plan a visit', href: LINKS.visit },
  { name: 'News', href: LINKS.news },
  { name: 'Gallery', href: LINKS.gallery },
  { name: 'Teacher training', href: LINKS.pet },
  { name: 'Open a Paradise school', href: LINKS.franchise },
]

/* Legal pages and social accounts only appear once they have somewhere to go (see LINKS in data/site.ts). */
const LEGAL = [
  { name: 'Privacy', href: LINKS.privacy },
  { name: 'Terms', href: LINKS.terms },
  { name: 'Data deletion', href: LINKS.dataDeletion },
].filter((l) => isLive(l.href))

const SOCIAL = Object.entries(SOCIALS).filter(([, href]) => isLive(href))

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer__top">
        <div className="footer__col">
          <h2 className="footer__title">Contact us</h2>
          <p>{SCHOOL.full}</p>
          <ul className="footer__lines">
            <li>
              <a href={PHONE_HREF}>
                <Phone /> {PHONE}
              </a>
            </li>
            <li>
              <a href={`mailto:${EMAIL}`}>
                <Mail /> <span className="footer__u">{EMAIL}</span>
              </a>
            </li>
            <li>
              <Go to={WHATSAPP_HREF}>
                <Chat /> Chat on WhatsApp
              </Go>
            </li>
          </ul>
        </div>

        <Go to={LINKS.home} className="footer__badge" aria-label={`${SCHOOL.full}, home`}>
          <img src={mark} alt="" width={96} height={96} loading="lazy" />
        </Go>

        <div className="footer__col">
          <h2 className="footer__title">Useful links</h2>
          <ul className="footer__links">
            {USEFUL.map((l) => (
              <li key={l.name}>
                <Go to={l.href}>{l.name}</Go>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="wrap footer__base">
        <p>
          © {new Date().getFullYear()} {SCHOOL.full}
        </p>
        {SOCIAL.length > 0 && (
          <ul className="footer__legal">
            {SOCIAL.map(([name, href]) => (
              <li key={name}>
                <Go to={href}>{name}</Go>
              </li>
            ))}
          </ul>
        )}
        {LEGAL.length > 0 && (
          <ul className="footer__legal">
            {LEGAL.map((l) => (
              <li key={l.name}>
                <Go to={l.href}>{l.name}</Go>
              </li>
            ))}
          </ul>
        )}
        <a href="#top" className="footer__up">
          Back to top
        </a>
      </div>
    </footer>
  )
}
