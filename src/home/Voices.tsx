import { Eyebrow, Heading, Reveal } from '../components/ui'
import { useTestimonials } from '../lib/content'

/** What parents say, each in a card of its own, exactly as they wrote it. */
export default function Voices() {
  const voices = useTestimonials()

  return (
    <section id="testimonials" className="voices wrap">
      <Reveal className="voices__head">
        <Eyebrow>Our kind of families</Eyebrow>
        <Heading lines={['In parents’ words.']} />
      </Reveal>

      <ul className="voices__grid">
        {(voices ?? []).map((v, i) => (
          <Reveal as="li" key={v.name} className="card voice" delay={i * 90}>
            <figure>
              <span className="voice__mark" aria-hidden>
                “
              </span>
              <blockquote>
                <p>{v.text}</p>
              </blockquote>
              <span className="dash" aria-hidden />
              <figcaption>
                <strong>{v.name}</strong>
                <span>{v.relation || 'Parent'}</span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </ul>
    </section>
  )
}
