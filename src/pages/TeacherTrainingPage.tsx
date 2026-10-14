import { useMemo, useState } from 'react'
import bookPen from '../assets/icons/book-pen.svg'
import language from '../assets/icons/language.svg'
import library from '../assets/icons/library.svg'
import teaching from '../assets/icons/teaching.svg'
import EnquiryForm from '../components/EnquiryForm'
import { TRAINING_FIELDS } from '../components/forms'
import { ContactCard, Offers, PageHead, SectionHead, StepsBand, Ticks, useTitle } from '../components/page'
import { Reveal, Search } from '../components/ui'
import { formatNewsDate } from '../data/news'
import { useTraining } from '../lib/content'
import type { Training } from '../lib/content'

const COVERS = [
  { icon: library, title: 'How young children learn', text: 'Child development from age 3 to 14, and what it means for the way you plan a day.' },
  { icon: bookPen, title: 'The Paradise curriculum', text: 'Our programme from Play Group to Grade VIII, taught the way we teach it in our own classrooms.' },
  { icon: teaching, title: 'Time in the classroom', text: 'Supervised practice in a real Paradise class, with feedback from an experienced teacher.' },
  { icon: language, title: 'Values and language', text: 'Bringing Quran, values and good spoken English naturally into everyday lessons.' },
]

const STEPS = [
  { title: 'Register', text: 'Fill in the form below. We send your registration number and test details.' },
  { title: 'Sit the PET', text: 'A short written Paradise Entrance Test at a centre near you.' },
  { title: 'Interview', text: 'Shortlisted candidates meet our academic team and teach a short demo lesson.' },
  { title: 'Train', text: 'Selected teachers join the next training batch, listed on this page.' },
]

const WHO = [
  'Plus Two or above; TTC, Montessori or B.Ed training is a plus',
  'A genuine love of working with young children',
  'Freshers are welcome - you do not need experience to apply',
]

/** The public list of selected candidates, searchable by name or registration number. */
function SelectedList({ batch }: { batch: Training }) {
  const [query, setQuery] = useState('')

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    return q ? batch.selected.filter((t) => `${t.regNo} ${t.name}`.toLowerCase().includes(q)) : batch.selected
  }, [batch, query])

  return (
    <div className="finder">
      <label className="search">
        <span className="sr-only">Search by name or registration number</span>
        <Search />
        <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by name or registration number" />
      </label>
      <p className="eyebrow" aria-live="polite">
        {visible.length} of {batch.selected.length} selected
      </p>

      <div className="card results">
        <table>
          <caption className="sr-only">Candidates selected for {batch.name}</caption>
          <thead>
            <tr>
              <th scope="col">Reg. No</th>
              <th scope="col">Name</th>
              <th scope="col">District</th>
            </tr>
          </thead>
          <tbody>
            {visible.map((t) => (
              <tr key={t.regNo}>
                <td>{t.regNo}</td>
                <td>{t.name}</td>
                <td>{t.district}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {visible.length === 0 && (
          <p className="results__none">
            No match for "{query.trim()}". Check the spelling or your registration number, or call us if you think you should be on the list.
          </p>
        )}
      </div>
    </div>
  )
}

/**
 * Teacher training: what the programme covers, how selection works, who has been selected for
 * the current batch, and the PET registration form. The Learning menu links into #apply and #selected.
 */
export default function TeacherTrainingPage() {
  useTitle('Teacher Training')
  const batch = useTraining()

  return (
    <div className="page wrap">
      <PageHead eyebrow="Teacher training" lines={['Teach with', 'Paradise.']}>
        <p>
          Our teacher training programme prepares you to teach the way we do. It starts with the Paradise Entrance Test (PET), and registration for
          the next batch is open now.
        </p>
        <div className="page-head__actions">
          <a href="#apply" className="btn">
            Register for PET
          </a>
          <a href="#selected" className="btn btn--ghost">
            See selected teachers
          </a>
        </div>
      </PageHead>

      <Offers items={COVERS} />
      <StepsBand title="How selection works" steps={STEPS} />

      <section id="selected" className="page__section">
        <SectionHead eyebrow="Results" lines={['Selected for training.']}>
          {batch && (
            <>
              <p className="lead">
                <strong>{batch.name}</strong>
                {batch.announced && (
                  <>
                    {' '}
                    · Announced <time dateTime={batch.announced}>{formatNewsDate(batch.announced)}</time>
                  </>
                )}
              </p>
              <p>Congratulations to everyone on the list. {batch.reporting}</p>
            </>
          )}
        </SectionHead>
        <Reveal delay={80}>{batch && <SelectedList batch={batch} />}</Reveal>
      </section>

      <section id="apply" className="page__section split">
        <div className="split__aside">
          <SectionHead eyebrow="Apply" lines={['Register for PET.']}>
            <p>Registration is free. Once we have your details, we will send your registration number and the date and centre for your test.</p>
          </SectionHead>
          <h3 className="eyebrow">Who can apply</h3>
          <Ticks items={WHO} />
          <ContactCard
            title="Questions?"
            note="Ask us about the test, the training or your application."
            whatsappMessage="Hi, I'd like to know more about the Paradise teacher training programme."
          />
        </div>
        <Reveal className="card split__main" delay={100}>
          <h3 className="title">PET registration</h3>
          <p>Takes about three minutes.</p>
          <EnquiryForm
            kind="training"
            id="t"
            submit="Register for PET"
            fields={TRAINING_FIELDS}
            success={({ regNo }) => (
              <>
                <h3 className="title">You're registered</h3>
                <p>
                  {regNo
                    ? 'Thank you. Keep your registration number safe: you will need it for the test, and to find your name on the selected list.'
                    : 'Thank you. We will be in touch with your registration number and the date and centre for your Paradise Entrance Test.'}
                </p>
                {regNo && <p className="form-done__reg">{regNo}</p>}
                {regNo && <p>We will call you with the date and centre for your Paradise Entrance Test.</p>}
              </>
            )}
          />
        </Reveal>
      </section>
    </div>
  )
}
