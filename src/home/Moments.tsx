import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowLink, Chevron, Eyebrow, Go, Heading, Reveal } from '../components/ui'
import { NEWS_CATEGORIES, formatNewsDate } from '../data/news'
import type { NewsCategory } from '../data/news'
import { LINKS } from '../data/site'
import { useNews } from '../lib/content'

const TABS: { id: NewsCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'Latest' },
  { id: 'events', label: 'Events' },
  { id: 'community', label: 'Community' },
]

/**
 * News on the home page. The stories sit in a row of small cards that scrolls sideways. On a
 * wide screen the picture on the left belongs to the newest story in the chosen tab; on a narrow
 * one the row is centred under the picture, which follows whichever story is in the middle.
 */
export default function Moments() {
  const news = useNews()
  const [tab, setTab] = useState<NewsCategory | 'all'>('all')

  const stories = useMemo(() => (news ?? []).filter((s) => tab === 'all' || s.category === tab).slice(0, 6), [news, tab])
  const row = useRef<HTMLUListElement>(null)
  const [current, setCurrent] = useState(0)
  const lead = stories[current] ?? stories[0]

  // Back to the first story whenever the tab changes.
  useEffect(() => {
    row.current?.scrollTo({ left: 0 })
    setCurrent(0)
  }, [tab])

  // On the stacked layout, the story nearest the middle of the row is the current one.
  useEffect(() => {
    const el = row.current
    if (!el) return
    const stacked = window.matchMedia('(max-width: 900px)')
    let frame = 0

    const watch = () => {
      frame = 0
      if (!stacked.matches) return setCurrent(0)
      const mid = el.scrollLeft + el.clientWidth / 2
      let best = 0
      let gap = Infinity
      Array.from(el.children).forEach((card, i) => {
        const c = card as HTMLElement
        const d = Math.abs(c.offsetLeft + c.offsetWidth / 2 - mid)
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

    el.addEventListener('scroll', queue, { passive: true })
    stacked.addEventListener('change', queue)
    return () => {
      cancelAnimationFrame(frame)
      el.removeEventListener('scroll', queue)
      stacked.removeEventListener('change', queue)
    }
  }, [])

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
          <Eyebrow>News</Eyebrow>
          <Heading lines={['Our kind of', 'moments.']} />
          <p className="copy">Dates for the diary, notes from the classroom, and the small wins worth telling everyone about.</p>
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
              <p className="moment__meta">
                {NEWS_CATEGORIES[s.category]?.label} · <time dateTime={s.date}>{formatNewsDate(s.date)}</time>
              </p>
              <h3 className="moment__title">{s.title}</h3>
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
            <button type="button" className="round-btn" onClick={() => nudge(1)} disabled={current === stories.length - 1} aria-label="Next story">
              <Chevron />
            </button>
          </div>
        )}

        <ArrowLink to={LINKS.news}>Read all the news</ArrowLink>
      </div>
    </section>
  )
}
