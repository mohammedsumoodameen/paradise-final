import { useMemo } from 'react'
import bookPen from '../assets/icons/book-pen.svg'
import teaching from '../assets/icons/teaching.svg'
import tools from '../assets/icons/tools.svg'
import trophy from '../assets/icons/trophy.svg'
import EnquiryForm from '../components/EnquiryForm'
import { FRANCHISE_FIELDS } from '../components/forms'
import { ContactCard, Offers, PageHead, SectionHead, StepsBand, Ticks, useTitle } from '../components/page'
import { Reveal } from '../components/ui'
import { PHONE, PHONE_HREF } from '../data/site'
import { districtsOf, useBranches } from '../lib/content'

const OFFER = [
  { icon: bookPen, title: 'A proven curriculum', text: 'The same Play Group to Grade VIII programme we teach, with lesson plans, materials and assessments ready to use.' },
  { icon: teaching, title: 'Teacher training', text: 'Your staff train with ours before you open, and keep training with us every year after.' },
  { icon: tools, title: 'Help with the setup', text: 'Guidance on the building, classroom layout, furniture, play areas and the approvals you will need.' },
  { icon: trophy, title: 'A name parents trust', text: 'The Paradise name, brand and marketing support, so families know what to expect before they visit.' },
]

const STEPS = [
  { title: 'Enquire', text: 'Send the form below. Our franchise team will call you within two working days.' },
  { title: 'Meet', text: 'Visit a Paradise school, meet the team, and talk through your plans and location.' },
  { title: 'Agree', text: 'We assess the site together, then sign the agreement and plan the setup.' },
  { title: 'Open', text: 'Train your teachers, prepare the building, and welcome your first children.' },
]

const LOOKING_FOR = [
  'A love of children and a long-term commitment to education',
  'A building, or plans for one, with safe outdoor space',
  'Willingness to follow the Paradise curriculum and standards',
]

/** Franchise enquiries: what a partner gets, how it works, where the schools already are, and the form. */
export default function FranchisePage() {
  useTitle('Franchise')
  const branches = useBranches()
  // The schools, open and coming soon, grouped under their district.
  const byDistrict = useMemo(() => {
    const all = branches ?? []
    return districtsOf(all).map((d) => ({ district: d, branches: all.filter((b) => b.district === d) }))
  }, [branches])
  const openCount = branches?.filter((b) => !b.comingSoon).length

  return (
    <div className="page wrap">
      <PageHead eyebrow="Partner with us" lines={['Open a Paradise', 'school.']}>
        <p>
          Bring the Paradise way of learning to your town. We give you the curriculum, the training and the support; you bring the care and the
          commitment a good school needs.
        </p>
        <a href="#enquire" className="btn">
          Start the conversation
        </a>
      </PageHead>

      <Offers items={OFFER} />
      <StepsBand title="How it works" steps={STEPS} />

      <section className="page__section">
        <SectionHead eyebrow="Our schools" lines={[openCount === undefined ? 'Our schools.' : `${openCount} schools and growing.`]}>
          <p>Every one of these is run by a partner who started where you are now. Yours could be next on the list.</p>
        </SectionHead>
        <ul className="districts">
          {byDistrict.map(({ district, branches }, i) => (
            <Reveal as="li" key={district} className="card" delay={(i % 3) * 70}>
              <h3 className="title">{district}</h3>
              <p className="eyebrow">
                {branches.length} {branches.length === 1 ? 'school' : 'schools'}
              </p>
              <span className="dash" aria-hidden />
              <ul className="districts__list">
                {branches.map((b) => (
                  <li key={b.slug}>
                    <strong>
                      Paradise {b.name}
                      {b.comingSoon && <span className="soon">Coming soon</span>}
                    </strong>
                    <span>{b.address}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </ul>
      </section>

      <section id="enquire" className="page__section split">
        <div className="split__aside">
          <SectionHead eyebrow="Enquire" lines={['Start the conversation.']}>
            <p>Tell us a little about yourself and where you would like to open. There is no commitment at this stage, just a first conversation.</p>
          </SectionHead>
          <h3 className="eyebrow">What we look for</h3>
          <Ticks items={LOOKING_FOR} />
          <ContactCard note="Our franchise team is happy to answer questions first." whatsappMessage="Hi, I'm interested in opening a Paradise school franchise." />
        </div>
        <Reveal className="card split__main" delay={100}>
          <h3 className="title">Franchise enquiry</h3>
          <EnquiryForm
            kind="franchise"
            id="f"
            submit="Send enquiry"
            fields={FRANCHISE_FIELDS}
            success={() => (
              <>
                <h3 className="title">Thank you</h3>
                <p>
                  Your enquiry is with our franchise team. We will call you within two working days to set up a first conversation. If you would rather
                  talk sooner, call{' '}
                  <a href={PHONE_HREF} className="text-link">
                    {PHONE}
                  </a>
                  .
                </p>
              </>
            )}
          />
        </Reveal>
      </section>
    </div>
  )
}
