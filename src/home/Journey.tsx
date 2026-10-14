import { useEffect, useRef, useState } from 'react'
import type { CSSProperties, ReactNode } from 'react'
import { ArrowLink, Eyebrow, Heading, Reveal } from '../components/ui'
import { ADMISSIONS_MEDIA, ADMISSION_STEP_MEDIA } from '../data/media'
import { ADMISSIONS, ADMISSION_STEPS, LINKS } from '../data/site'

const icon = (size: number, d: ReactNode) => (
  <svg viewBox="0 0 48 48" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <circle cx="24" cy="24" r="21" strokeWidth={2.6} />
    {d}
  </svg>
)

/** One per admission step, in order: a speech bubble, a doorway, a filled-in page, a raised flag. */
const MARKS = [
  <path d="M15 17h18a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-8l-6 4v-4h-4a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2Z" />,
  <path d="M16 35V20a8 8 0 0 1 16 0v15M13 35h22M24 35V24" />,
  <path d="M17 13h10l5 5v17H17V13Zm10 0v5h5M21 24h7M21 29h7" />,
  <path d="M18 36V13m0 2h13l-3 4.500 3 4.500H18" />,
]

/**
 * A colour for each step: the band fills the screen, the blob takes the deep shade and the shape
 * peeping out behind it the pale one. The band colours are repeated here because the background
 * is blended between them in script as the page scrolls; keep them in step with base.css.
 */
const TONES = [
  { name: 'sky', band: [95, 208, 236] },
  { name: 'sun', band: [255, 200, 87] },
  { name: 'leaf', band: [180, 220, 110] },
  { name: 'coral', band: [255, 156, 138] },
] as const
const PAPER = [255, 255, 255]

/** Where the pale shape sits behind each blob, so the four steps do not all look alike. */
const ECHOES = ['top', 'bottom', 'top', 'bottom']

/** Mix two RGB colours, t of the way from a to b. */
const mix = (a: readonly number[], b: readonly number[], t: number) => `rgb(${a.map((v, i) => Math.round(v + ((b[i] ?? v) - v) * t)).join(',')})`

/**
 * After the last step the section stays pinned for this much more of a screen while its colour
 * fades back to white, so it hands over to the white section below without a hard edge. Keep in
 * step with the section's height in home.css.
 */
const FADE = 0.6

/** Sideways scrolling only where there is room for it, and only for visitors who have not asked for less motion. */
const SIDEWAYS = '(min-width: 901px)'

/**
 * Admissions. On a desktop the section pins to the screen and scrolling carries it sideways:
 * first the invitation beside a photograph, then one panel per step, while the background
 * blends from white into each step's colour, and back to white as the section lets go. Icons along the bottom show the step in view and
 * jump to any of them. On phones, and with reduced motion, the panels simply stack.
 */
export default function Journey() {
  const section = useRef<HTMLElement>(null)
  const pin = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const [at, setAt] = useState(0)
  const [leaving, setLeaving] = useState(false)
  const panels = ADMISSION_STEPS.length + 1

  useEffect(() => {
    const el = section.current
    const box = pin.current
    const rail = track.current
    if (!el || !box || !rail) return
    const wide = window.matchMedia(SIDEWAYS)
    const bands = [PAPER, ...TONES.map((t) => t.band)]
    let frame = 0

    const paint = () => {
      frame = 0
      if (!wide.matches || !document.documentElement.classList.contains('motion')) {
        rail.style.transform = ''
        box.style.backgroundColor = ''
        return
      }
      const screen = window.innerHeight
      const last = panels - 1
      const scrolled = Math.max(0, -el.getBoundingClientRect().top)
      const p = Math.min(last, scrolled / screen)
      const fade = Math.min(1, Math.max(0, (scrolled - last * screen) / (FADE * screen)))
      rail.style.transform = `translate3d(${-p * box.clientWidth}px, 0, 0)`
      const from = Math.floor(p)
      const colour = mix(bands[from]!, bands[Math.min(from + 1, last)]!, p - from)
      box.style.backgroundColor = fade > 0 ? mix(bands[last]!, PAPER, fade) : colour
      setAt(Math.round(p))
      setLeaving(fade > 0.5)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(paint)
    }

    // Tabbing into a panel that is off to the side would scroll the pinned box itself; scroll the page to it instead.
    const onFocus = (e: FocusEvent) => {
      box.scrollLeft = 0
      const i = [...rail.children].findIndex((c) => c.contains(e.target as Node))
      if (i >= 0 && wide.matches) jump(i, 'auto')
    }

    paint()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    wide.addEventListener('change', onScroll)
    rail.addEventListener('focusin', onFocus)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      wide.removeEventListener('change', onScroll)
      rail.removeEventListener('focusin', onFocus)
    }
  }, [panels])

  /** Scroll the page so panel i sits squarely in view. */
  const jump = (i: number, behavior: ScrollBehavior = 'smooth') => {
    const el = section.current
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY
    if (!window.matchMedia(SIDEWAYS).matches) {
      const panel = track.current?.children[i] as HTMLElement | undefined
      panel?.scrollIntoView({ behavior })
      return
    }
    window.scrollTo({ top: top + i * window.innerHeight, behavior: document.documentElement.classList.contains('motion') ? behavior : 'auto' })
  }

  return (
    <section id="admissions" className="journey" ref={section} style={{ '--panels': panels } as CSSProperties}>
      <div className="journey__pin" ref={pin}>
        <div className="journey__track" ref={track}>
          <div className="journey__panel journey__intro">
            <Reveal className="journey__art">
              <div className="media journey__photo">
                <img src={ADMISSIONS_MEDIA.src} width={ADMISSIONS_MEDIA.width} height={ADMISSIONS_MEDIA.height} alt={ADMISSIONS_MEDIA.alt} loading="lazy" />
              </div>
              <span className="journey__chevrons" aria-hidden>
                <svg viewBox="0 0 60 40" width="96" height="64" fill="#fff">
                  <path d="M0 0h10l12 20-12 20H0l12-20L0 0Zm19 0h10l12 20-12 20H19l12-20L19 0Zm19 0h10l12 20-12 20H38l12-20L38 0Z" />
                </svg>
              </span>
            </Reveal>
            <Reveal className="journey__words" delay={100}>
              <Eyebrow>{ADMISSIONS.label}</Eyebrow>
              <Heading lines={ADMISSIONS.headline} />
              <p className="copy">{ADMISSIONS.text}</p>
              <ArrowLink to={ADMISSIONS.cta.href}>{ADMISSIONS.cta.label}</ArrowLink>
            </Reveal>
          </div>

          {ADMISSION_STEPS.map((s, i) => {
            const photo = ADMISSION_STEP_MEDIA[i]
            return (
              <article key={s.index} className={`journey__panel step step--${TONES[i % TONES.length]!.name}`} aria-label={`Step ${s.index}: ${s.title}`}>
                <div className={`step__art step__art--${ECHOES[i % ECHOES.length]}`}>
                  <span className="step__echo" aria-hidden />
                  <div className="step__blob" aria-hidden>
                    {icon(128, MARKS[i])}
                    <span>{s.badge}</span>
                  </div>
                  {photo && <img className="step__photo" src={photo.src} width={photo.width} height={photo.height} alt={photo.alt} loading="lazy" />}
                </div>
                <div className="step__words">
                  <p className="eyebrow">
                    Step {s.index} of {String(ADMISSION_STEPS.length).padStart(2, '0')}
                  </p>
                  <h3 className="display">{s.title}</h3>
                  <p className="step__lead">{s.lead}</p>
                  <p className="copy">{s.text}</p>
                  <ArrowLink to={LINKS.admission}>Start here</ArrowLink>
                </div>
              </article>
            )
          })}
        </div>

        <ol className={`journey__dots${at > 0 && !leaving ? ' is-on' : ''}`} aria-label="Admission steps">
          {ADMISSION_STEPS.map((s, i) => (
            <li key={s.index}>
              <button type="button" aria-label={`Step ${s.index}: ${s.title}`} aria-current={at === i + 1 ? 'step' : undefined} onClick={() => jump(i + 1)}>
                {icon(26, MARKS[i])}
              </button>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
