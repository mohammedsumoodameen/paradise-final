import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { ArrowLink, Chevron, Eyebrow, Heading, Reveal } from '../components/ui'
import { LINKS, SCHOOL_LIFE } from '../data/site'
import { useGallery } from '../lib/content'

/** The row holds the photographs this many times over; the middle run is the one people look at. */
const RUNS = 3

/**
 * Life at school: a sideways row of photographs, one large in the centre with a smaller
 * neighbour peeking in from each edge. It is an ordinary scrolling row, so it swipes, scrolls
 * and arrow-keys as usual. To go round for ever the photographs are laid out three times over,
 * and whenever the row comes to rest in the first or last run it is put back, unseen, on the
 * same photograph in the middle one.
 */
export default function Life() {
  const gallery = useGallery()
  const photos = gallery?.home ?? []
  const count = photos.length
  const track = useRef<HTMLUListElement>(null)
  const [current, setCurrent] = useState(0)

  /** The distance from one photograph to the next. */
  const stride = () => {
    const cards = track.current?.children
    const a = cards?.[0] as HTMLElement | undefined
    const b = cards?.[1] as HTMLElement | undefined
    return a && b ? b.offsetLeft - a.offsetLeft : 0
  }

  // Start on the first photograph of the middle run, so there is a neighbour on both sides.
  useLayoutEffect(() => {
    const el = track.current
    if (el && count) el.scrollLeft = count * stride()
  }, [count])

  useEffect(() => {
    const el = track.current
    if (!el || !count) return
    let frame = 0
    let rest = 0
    let at = count

    const settle = () => {
      const step = stride()
      if (!step) return
      const i = Math.round(el.scrollLeft / step)
      const home = count + (((i % count) + count) % count)
      if (i !== home) el.scrollLeft += (home - i) * step
      at = home
    }
    const watch = () => {
      frame = 0
      const step = stride()
      if (!step) return
      at = Math.round(el.scrollLeft / step)
      setCurrent(((at % count) + count) % count)
      clearTimeout(rest)
      rest = window.setTimeout(settle, 140)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(watch)
    }
    // Card widths follow the window, so hold the same photograph in the centre as it changes.
    const onResize = () => {
      el.scrollLeft = at * stride()
    }

    el.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(frame)
      clearTimeout(rest)
      el.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [count])

  const nudge = (dir: 1 | -1) => {
    const smooth = document.documentElement.classList.contains('motion')
    track.current?.scrollBy({ left: dir * stride(), behavior: smooth ? 'smooth' : 'auto' })
  }

  return (
    <section id="gallery" className="life">
      <Reveal className="wrap life__head">
        <Eyebrow>{SCHOOL_LIFE.label}</Eyebrow>
        <Heading lines={SCHOOL_LIFE.headline} />
        <p>{SCHOOL_LIFE.text}</p>
      </Reveal>

      <div className="life__stage" role="group" aria-roledescription="carousel" aria-label="Photographs from school">
        <ul className="life__track" ref={track} tabIndex={0}>
          {Array.from({ length: RUNS }, (_, run) =>
            photos.map((p, i) => (
              <li key={`${run}:${p.src}`} className={`media media--foot life__card${i === current ? ' is-current' : ''}`} aria-hidden={run !== 1 || undefined}>
                <img src={p.src} width={p.width} height={p.height} alt={run === 1 ? p.alt : ''} loading="lazy" />
                <p className="life__caption">
                  <span>Our kind of day</span>
                  <strong>{p.caption}</strong>
                </p>
              </li>
            )),
          )}
        </ul>
        <button type="button" className="round-btn life__prev" onClick={() => nudge(-1)} aria-label="Previous photograph">
          <Chevron dir="left" />
        </button>
        <button type="button" className="round-btn life__next" onClick={() => nudge(1)} aria-label="Next photograph">
          <Chevron />
        </button>
      </div>

      <div className="wrap life__foot">
        <ul className="tags">
          {SCHOOL_LIFE.themes.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        <ArrowLink to={LINKS.gallery}>See all {gallery ? `${gallery.photos.length} ` : ''}photographs</ArrowLink>
      </div>
    </section>
  )
}
