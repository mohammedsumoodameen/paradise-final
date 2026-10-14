import { useState } from 'react'
import type { ReactNode } from 'react'
import { ArrowLink, Chevron, Eyebrow, Heading, Reveal } from '../components/ui'
import { ADMISSIONS_MEDIA } from '../data/media'
import { ADMISSIONS, ADMISSION_STEPS } from '../data/site'

const icon = (d: ReactNode) => (
  <svg viewBox="0 0 48 48" width="96" height="96" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <circle cx="24" cy="24" r="21" strokeWidth={2.6} />
    {d}
  </svg>
)

/** One per admission step, in order: a speech bubble, a doorway, a filled-in page, a raised flag. */
const ICONS = [
  icon(<path d="M15 17h18a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-8l-6 4v-4h-4a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2Z" />),
  icon(<path d="M16 35V20a8 8 0 0 1 16 0v15M13 35h22M24 35V24" />),
  icon(<path d="M17 13h10l5 5v17H17V13Zm10 0v5h5M21 24h7M21 29h7" />),
  icon(<path d="M18 36V13m0 2h13l-3 4.500 3 4.500H18" />),
]

/** A colour of the kite for each step: the blob takes the deep shade and the band behind it the light one. */
const TONES = ['sky', 'sun', 'leaf', 'coral']

/**
 * Admissions. First the invitation, beside a photograph with a chevron badge on its corner;
 * then the four steps as one coloured band that changes with the step being read.
 */
export default function Journey() {
  const [active, setActive] = useState(0)
  const count = ADMISSION_STEPS.length
  const step = ADMISSION_STEPS[active] ?? ADMISSION_STEPS[0]!
  const go = (i: number) => setActive((i + count) % count)

  return (
    <section id="admissions" className="journey">
      <div className="wrap journey__intro">
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

      <div className={`steps steps--${TONES[active % TONES.length]}`} role="group" aria-roledescription="carousel" aria-label="How admission works">
        <div className="wrap steps__inner">
          <div className="steps__words" aria-live="polite">
            <div key={step.index} className="steps__slide">
              <p className="eyebrow">
                Step {step.index} of {String(count).padStart(2, '0')}
              </p>
              <h3 className="display">{step.title}</h3>
              <p className="lead copy">{step.text}</p>
            </div>
            <div className="steps__nav">
              <button type="button" className="round-btn round-btn--sm" onClick={() => go(active - 1)} aria-label="Previous step">
                <Chevron dir="left" />
              </button>
              <ol className="steps__dots">
                {ADMISSION_STEPS.map((s, i) => (
                  <li key={s.index}>
                    <button type="button" aria-label={`Step ${s.index}: ${s.title}`} aria-current={i === active ? 'step' : undefined} onClick={() => setActive(i)}>
                      {s.index}
                    </button>
                  </li>
                ))}
              </ol>
              <button type="button" className="round-btn round-btn--sm" onClick={() => go(active + 1)} aria-label="Next step">
                <Chevron />
              </button>
            </div>
          </div>

          <div className="steps__blob" aria-hidden>
            <span className="steps__echo" />
            <div key={step.index} className="steps__slide">
              {ICONS[active]}
              <span>{step.title}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
