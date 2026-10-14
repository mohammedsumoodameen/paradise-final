import { useState } from 'react'
import type { ReactNode } from 'react'
import { Eyebrow, Heading, Reveal } from '../components/ui'
import { PHILOSOPHY_MEDIA } from '../data/media'
import { PHILOSOPHY } from '../data/site'

const icon = (d: ReactNode) => (
  <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    {d}
  </svg>
)

/** One per strand in PHILOSOPHY.strands, in the same order: a book, a heart, two friends, a crescent. */
const ICONS = [
  icon(<path d="M12 6.500C10 5 6.500 4.500 3.500 5.500v12c3-1 6.500-.5 8.500 1 2-1.500 5.500-2 8.500-1v-12c-3-1-6.500-.5-8.500 1Zm0 0v12" />),
  icon(<path d="M12 20s-7.500-4.600-7.500-10.200A4.300 4.300 0 0 1 12 7.400a4.300 4.300 0 0 1 7.500 2.400C19.500 15.400 12 20 12 20Z" />),
  icon(
    <>
      <circle cx="8" cy="8" r="3" />
      <circle cx="17" cy="9.500" r="2.500" />
      <path d="M2.500 19c.4-3.400 2.700-5.500 5.500-5.500s5.100 2.100 5.500 5.500M15 14.200c.6-.2 1.300-.4 2-.4 2.300 0 4.100 1.800 4.500 4.700" />
    </>,
  ),
  icon(
    <>
      <path d="M19 14.500A8 8 0 1 1 10.500 4a6.500 6.500 0 0 0 8.500 10.500Z" />
      <path d="m17 4 .7 1.800L19.500 6.500l-1.800.7L17 9l-.7-1.800-1.800-.700 1.800-.700L17 4Z" />
    </>,
  ),
]

/**
 * Our philosophy. A photograph runs off the left edge; a stack of four buttons sits on its
 * seam, one for each way a child grows here, and the card beside them answers whichever is pressed.
 */
export default function Inspire() {
  const [active, setActive] = useState(0)
  const strand = PHILOSOPHY.strands[active] ?? PHILOSOPHY.strands[0]!

  return (
    <section id="about" className="inspire">
      <Reveal className="media inspire__media">
        <img src={PHILOSOPHY_MEDIA.detail.src} width={PHILOSOPHY_MEDIA.detail.width} height={PHILOSOPHY_MEDIA.detail.height} alt={PHILOSOPHY_MEDIA.detail.alt} loading="lazy" />
      </Reveal>

      <div className="inspire__tabs" role="group" aria-label="How a child grows here">
        {PHILOSOPHY.strands.map((s, i) => (
          <button key={s.word} type="button" className="inspire__tab" aria-pressed={i === active} onClick={() => setActive(i)}>
            {ICONS[i]}
            <span>{s.word}</span>
          </button>
        ))}
      </div>

      <Reveal className="inspire__text" delay={100}>
        <Eyebrow>{PHILOSOPHY.label}</Eyebrow>
        <Heading lines={PHILOSOPHY.headline} />
        <div className="card inspire__card" aria-live="polite">
          <p className="inspire__word">{strand.word}</p>
          <p className="lead" key={strand.word}>
            {strand.text}
          </p>
        </div>
        <p className="inspire__lead">{PHILOSOPHY.lead}</p>
        <p className="inspire__more">{PHILOSOPHY.text}</p>
      </Reveal>
    </section>
  )
}
