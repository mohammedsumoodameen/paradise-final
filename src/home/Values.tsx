import { ArrowLink, Eyebrow, Heading, Reveal } from '../components/ui'
import { VALUES_MEDIA } from '../data/media'
import { JOURNEY_STAGES, LINKS, VALUES } from '../data/site'

/**
 * Faith, character and community: six values as a grid of tiles, with a photograph running off
 * the right edge and a round badge on its corner that points back to the learning journey.
 */
export default function Values() {
  return (
    <section id="values" className="values">
      <div className="values__text">
        <Reveal>
          <Eyebrow>{VALUES.label}</Eyebrow>
          <Heading lines={VALUES.headline} />
          <p className="copy values__intro">{VALUES.text}</p>
        </Reveal>

        <ul className="values__grid">
          {VALUES.items.map((v, i) => (
            <Reveal as="li" key={v.word} className="card tile" delay={(i % 2) * 120} replay>
              <h3 className="tile__word">{v.word}</h3>
              <span className="dash" aria-hidden />
              <p>{v.text}</p>
            </Reveal>
          ))}
        </ul>

        <ArrowLink to={LINKS.visit}>See it on a real morning</ArrowLink>
      </div>

      <div className="values__side">
        <div className="values__sticky">
          <div className="media media--foot values__photo">
            <img src={VALUES_MEDIA.src} width={VALUES_MEDIA.width} height={VALUES_MEDIA.height} alt={VALUES_MEDIA.alt} loading="lazy" />
          </div>
          <a href={LINKS.academics} className="roundel">
            <span className="roundel__ring" aria-hidden />
            <strong>{JOURNEY_STAGES.length}</strong>
            <span className="roundel__what">stages, one school</span>
            <span className="roundel__more">KG to Grade 8</span>
          </a>
        </div>
      </div>
    </section>
  )
}
