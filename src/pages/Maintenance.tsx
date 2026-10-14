import logo from '../assets/logo/logo-transparent.png'
import { useTitle } from '../components/page'
import { ArrowLink, Eyebrow, Heading, Reveal } from '../components/ui'
import { LINKS } from '../data/site'

/**
 * Stands in for a page that is not ready to go live yet. The page itself is kept as it is; to
 * bring it back, point its route in main.tsx at the page again instead of at this.
 */
export default function Maintenance({ name }: { name: string }) {
  useTitle(name)
  return (
    <div className="page wrap">
      <Reveal className="maintenance">
        <img className="maintenance__logo" src={logo} alt="" width={400} height={494} />
        <Eyebrow>{name}</Eyebrow>
        <Heading as="h1" lines={['Almost ready.']} />
        <p className="copy">
          We are putting the finishing touches on this page and it will be open very soon. In the meantime, have a look around the rest of the
          site, or talk to us directly.
        </p>
        <div className="maintenance__actions">
          <ArrowLink to={LINKS.home}>Back to home</ArrowLink>
          <ArrowLink to={LINKS.contact}>Contact us</ArrowLink>
        </div>
      </Reveal>
    </div>
  )
}
