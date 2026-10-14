import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import { Go } from './components/ui'
import { LINKS } from './data/site'

/**
 * After every navigation: go to the section the link named, or back to the top of the page.
 * Focus moves with it, so keyboard and screen-reader users land where sighted users do.
 */
function useScrollToTarget() {
  const { pathname, hash, key } = useLocation()
  useEffect(() => {
    const target = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null
    if (target) {
      target.scrollIntoView()
      target.setAttribute('tabindex', '-1')
      target.focus({ preventScroll: true })
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
  }, [pathname, hash, key])
}

/** The frame around every page: header, the page itself, footer, and the Enquire tab on the right edge. */
export default function App() {
  useScrollToTarget()
  const { pathname } = useLocation()

  return (
    <div id="top">
      <a href="#main" className="skip">
        Skip to main content
      </a>
      <Header />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
      {pathname !== LINKS.contact && (
        <Go to={LINKS.contact} className="enquire-tab">
          Enquire
        </Go>
      )}
    </div>
  )
}
