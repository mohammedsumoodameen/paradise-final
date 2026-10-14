import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowLink, Chevron, Go, Heading, Reveal } from '../components/ui'
import type { NewsCategory } from '../data/news'
import { LINKS } from '../data/site'
import { useNews } from '../lib/content'

const TABS: { id: NewsCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'Latest' },
  { id: 'events', label: 'Events' },
  { id: 'community', label: 'Community' },
]

/**
 * News on the home page. The stories sit in a row of small title cards that scrolls sideways,
 * and the picture follows the current one. On a wide screen that is the first card in view, and
 * two arrows on the picture's edge step the row along; on a narrow one the row is centred under
 * the picture, the current story is the one in the middle, and the arrows sit beneath.
 */
export default function Moments() {
  const news = useNews()
  const [tab, setTab] = useState<NewsCategory | 'all'>('all')

  const stories = useMemo(() => (news ?? []).filter((s) => tab === 'all' || s.category === tab).slice(0, 6), [news, tab])
  const row = useRef<HTMLUListElement>(null)
  const [current, setCurrent] = useState(0)
  const [atEnd, setAtEnd] = useState(false)
  const lead = stories[current] ?? stories[0]

  // Back to the first story whenever the tab changes.
  useEffect(() => {
    row.current?.scrollTo({ left: 0 })
    setCurrent(0)
  }, [tab])

  // The current story: the one nearest the middle of the row when stacked, otherwise the first in view.
  useEffect(() => {
    const el = row.current
    if (!el) return
    const stacked = window.matchMedia('(max-width: 900px)')
    let frame = 0

    const watch = () => {
      frame = 0
      setAtEnd(el.scrollLeft >= el.scrollWidth - el.clientWidth - 2)
      const mid = stacked.matches ? el.scrollLeft + el.clientWidth / 2 : el.scrollLeft
      let best = 0
      let gap = Infinity
      Array.from(el.children).forEach((card, i) => {
        const c = card as HTMLElement
        const d = Math.abs(c.offsetLeft + (stacked.matches ? c.offsetWidth / 2 : 0) - mid)
        if (d < gap) {
          gap = d
          best = i
        }
      })
      setCurrent(best)
    }
    const queue = () => {
      if (!frame) frame = requestAnimationFrame(watch)
    }

    queue()
    el.addEventListener('scroll', queue, { passive: true })
    window.addEventListener('resize', queue)
    stacked.addEventListener('change', queue)
    return () => {
      cancelAnimationFrame(frame)
      el.removeEventListener('scroll', queue)
      window.removeEventListener('resize', queue)
      stacked.removeEventListener('change', queue)
    }
  }, [stories.length])

  const nudge = (dir: 1 | -1) => {
    const el = row.current
    const cards = el?.children
    const a = cards?.[0] as HTMLElement | undefined
    const b = cards?.[1] as HTMLElement | undefined
    if (!el || !a || !b) return
    const smooth = document.documentElement.classList.contains('motion')
    el.scrollBy({ left: dir * (b.offsetLeft - a.offsetLeft), behavior: smooth ? 'smooth' : 'auto' })
  }

  return (
    <section className="moments">
      <Reveal className="media media--foot moments__photo">
        {lead && <img key={lead.slug} src={lead.image} width={lead.width} height={lead.height} alt={lead.alt} loading="lazy" />}
      </Reveal>

      <div className="moments__text">
        <Reveal>
          <Heading lines={['Our kind of', 'moments.']} />
        </Reveal>

        <div className="chips" role="group" aria-label="Choose which news to show">
          {TABS.map((t) => (
            <button key={t.id} type="button" className="chip" aria-pressed={tab === t.id} onClick={() => setTab(t.id)}>
              {t.label}
            </button>
          ))}
        </div>

        <ul className="moments__row" ref={row} tabIndex={0} aria-label="News stories">
          {stories.map((s, i) => (
            <li key={s.slug} className={`card moment${i === current ? ' is-current' : ''}`}>
              <h3 className="moment__title">{s.short ?? s.title}</h3>
              <span className="dash" aria-hidden />
              <Go to={`${LINKS.news}/${s.slug}`} className="moment__more" aria-label={`Read more: ${s.title}`}>
                Read more
                <span className="round-btn round-btn--sm" aria-hidden>
                  <Chevron />
                </span>
              </Go>
            </li>
          ))}
          {news && stories.length === 0 && <li className="moments__none">Nothing here just yet.</li>}
        </ul>

        {stories.length > 1 && (
          <div className="moments__nav">
            <button type="button" className="round-btn" onClick={() => nudge(-1)} disabled={current === 0} aria-label="Previous story">
              <Chevron dir="left" />
            </button>
            <button type="button" className="round-btn" onClick={() => nudge(1)} disabled={atEnd || current === stories.length - 1} aria-label="Next story">
              <Chevron />
            </button>
          </div>
        )}

        <ArrowLink to={LINKS.news}>Read all the news</ArrowLink>
      </div>
    </section>
  )
}
