import { useEffect, useRef, useState } from 'react'
import { ArrowLink, Eyebrow, Heading, Pause, Play } from '../components/ui'
import { HERO_MEDIA } from '../data/media'
import { HERO } from '../data/site'

const clamp = (n: number) => Math.min(1, Math.max(0, n))
const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2)

/**
 * The opening: the school film fills a rounded frame with the school's own line set in a badge
 * over it. Scrolling holds the hero in place while the film draws back to the right and the
 * welcome takes the space it leaves. Small screens get the two stacked instead (see home.css).
 */
export default function Hero() {
  const hero = useRef<HTMLElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const video = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(true)

  // People who have asked for less motion get the still poster until they press play.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      video.current?.pause()
      setPlaying(false)
    }
  }, [])

  // How far through the hero the page has been scrolled, handed to the stylesheet as three
  // 0–1 values: the badge leaves first, the film shrinks throughout, the words arrive last.
  useEffect(() => {
    const el = hero.current
    const pinned = stage.current
    if (!el || !pinned) return
    let frame = 0

    const update = () => {
      frame = 0
      const top = el.getBoundingClientRect().top
      const start = top + window.scrollY
      const travel = start + el.offsetHeight - pinned.offsetHeight
      const p = travel > 0 ? clamp((start - top) / travel) : 0
      el.style.setProperty('--badge', clamp(p / 0.3).toFixed(3))
      el.style.setProperty('--shrink', easeInOut(clamp(p / 0.85)).toFixed(3))
      el.style.setProperty('--words', clamp((p - 0.45) / 0.4).toFixed(3))
    }
    const queue = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', queue, { passive: true })
    window.addEventListener('resize', queue)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', queue)
      window.removeEventListener('resize', queue)
    }
  }, [])

  const toggle = () => {
    const v = video.current
    if (!v) return
    if (v.paused) void v.play()
    else v.pause()
    setPlaying(!v.paused)
  }

  // Someone tabbing into the welcome before scrolling would land on links still hidden behind
  // the film, so bring the page to the point where they are showing.
  const showWords = () => {
    const el = hero.current
    const pinned = stage.current
    if (!el || !pinned || getComputedStyle(pinned).position !== 'sticky') return
    const end = el.getBoundingClientRect().top + window.scrollY + el.offsetHeight - pinned.offsetHeight
    if (window.scrollY < end - 1) window.scrollTo({ top: end })
  }

  return (
    <section className="hero" ref={hero}>
      <div className="wrap hero__stage" ref={stage}>
        <div className="hero__frame">
          <div className="hero__words" onFocus={showWords}>
            <Eyebrow>{HERO.label}</Eyebrow>
            <Heading as="h1" lines={HERO.headline} className="display--hero" />
            <p className="copy">{HERO.text}</p>
            <div className="hero__actions">
              <ArrowLink to={HERO.cta.href}>{HERO.cta.label}</ArrowLink>
              <ArrowLink to={HERO.link.href}>{HERO.link.label}</ArrowLink>
            </div>
          </div>

          <div className="media media--foot hero__film">
            <video ref={video} autoPlay muted loop playsInline poster={HERO_MEDIA.poster} aria-label={HERO_MEDIA.alt}>
              <source src={HERO_MEDIA.video.mobile} type="video/mp4" media="(max-width: 760px)" />
              <source src={HERO_MEDIA.video.desktop} type="video/mp4" />
            </video>
            <p className="hero__badge">
              <span>A pleasant</span>
              <strong>Life</strong>
              <span>begins here</span>
            </p>
            <button type="button" className="hero__pause" onClick={toggle} aria-label={playing ? 'Pause the film' : 'Play the film'}>
              {playing ? <Pause /> : <Play />}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
