import { useState } from 'react'
import { ArrowLink, ArrowLong, Eyebrow, Heading, Modal, Reveal } from '../components/ui'
import { STAGE_MEDIA } from '../data/media'
import { JOURNEY_STAGES, LINKS } from '../data/site'

/**
 * The learning journey: one tall card per stage, each opening a popup with what that stage
 * teaches. The whole card is the button; on hover an orange dome rises behind its label.
 */
export default function Stages() {
  const [open, setOpen] = useState<number | null>(null)
  const stage = open === null ? undefined : JOURNEY_STAGES[open]
  const photo = open === null ? undefined : STAGE_MEDIA[open]

  return (
    <section id="academics" className="stages wrap">
      <Reveal className="stages__head">
        <Eyebrow>The learning journey</Eyebrow>
        <Heading lines={['One continuous path.']} />
        <p>
          From the first morning in KG or Preschool to the last day of Grade 8, a child here walks <strong>one continuous path</strong>.
        </p>
      </Reveal>

      <ul className="stages__grid">
        {JOURNEY_STAGES.map((s, i) => (
          <Reveal as="li" key={s.id} delay={i * 80}>
            <button type="button" className="stage" onClick={() => setOpen(i)} aria-haspopup="dialog">
              <span className="media media--foot stage__photo">
                <img src={STAGE_MEDIA[i]?.src} width={STAGE_MEDIA[i]?.width} height={STAGE_MEDIA[i]?.height} alt="" loading="lazy" />
                <span className="stage__dome" aria-hidden />
              </span>
              <span className="stage__label">
                <span className="stage__title">{s.title}</span>
                <span className="stage__range">{s.range}</span>
                <span className="stage__tag">{s.tagline}</span>
              </span>
              <span className="stage__go" aria-hidden>
                <ArrowLong />
              </span>
            </button>
          </Reveal>
        ))}
      </ul>

      <Modal open={!!stage} onClose={() => setOpen(null)} label={stage?.title ?? 'Stage'} className="modal--stage">
        {stage && (
          <>
            {photo && <img className="stage-pop__photo" src={photo.src} width={photo.width} height={photo.height} alt={stage.alt} />}
            <p className="eyebrow">
              Stage {stage.index} · {stage.range}
            </p>
            <h3 className="display display--sm">
              {stage.title}
              <span className="hl">.</span>
            </h3>
            <p className="lead stage-pop__tag">{stage.tagline}</p>
            <p>{stage.text}</p>
            <ul className="tags">
              {stage.subjects.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
            <ArrowLink to={LINKS.admission}>Find a school that teaches {stage.title}</ArrowLink>
          </>
        )}
      </Modal>
    </section>
  )
}
