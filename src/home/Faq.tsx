import { Eyebrow, Go, Heading, Plus, Reveal } from '../components/ui'
import { FAQS, LINKS } from '../data/site'

/** Good to know: the questions parents ask most, each one opening in place. */
export default function Faq() {
  return (
    <section id="faqs" className="faq wrap">
      <Reveal className="faq__head">
        <Eyebrow>Good to know</Eyebrow>
        <Heading lines={['Questions,', 'answered.']} />
        <p className="copy">
          Still wondering about something?{' '}
          <Go to={LINKS.contact} className="text-link">
            Ask us directly
          </Go>
          .
        </p>
      </Reveal>

      <div className="faq__list">
        {FAQS.map((f, i) => (
          <Reveal key={f.q} delay={(i % 3) * 60}>
            <details className="card faq__item" name="faq">
              <summary>
                <span>{f.q}</span>
                <span className="round-btn round-btn--sm" aria-hidden>
                  <Plus />
                </span>
              </summary>
              <p>{f.a}</p>
            </details>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
