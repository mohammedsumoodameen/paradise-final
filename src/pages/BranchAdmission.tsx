import { Link, Navigate, useParams } from 'react-router-dom'
import EnquiryForm from '../components/EnquiryForm'
import { admissionFields } from '../components/forms'
import { PageHead, useTitle } from '../components/page'
import { Chevron, Reveal } from '../components/ui'
import { branchStages } from '../data/branches'
import { LINKS } from '../data/site'
import { useBranches } from '../lib/content'

const NEXT = [
  { title: 'We call you', text: 'Within one working day, to talk through your child and the right stage.' },
  { title: 'You visit', text: 'See the school on a normal morning and meet the teachers.' },
  { title: 'You apply', text: 'Only once you are sure. We will help with the paperwork.' },
]

/**
 * One branch and its admission enquiry, side by side so a parent never loses track of which
 * school they are writing to. An unknown slug, or a school not open yet, goes back to the list.
 */
export default function BranchAdmission() {
  const { slug } = useParams()
  const branches = useBranches()
  const branch = branches?.find((b) => b.slug === slug && !b.comingSoon)
  useTitle(branch ? `Admissions at Paradise ${branch.name}` : 'Admissions')

  if (!branches) return <div className="page wrap" aria-busy="true" />
  if (!branch) return <Navigate to={LINKS.admission} replace />

  const stages = branchStages(branch)

  return (
    <div className="page wrap">
      <Link to={LINKS.admission} className="back">
        <Chevron dir="left" /> All schools
      </Link>
      <PageHead eyebrow={`Admissions · ${branch.district} District`} lines={[`Paradise ${branch.name}.`]} />

      <div className="split">
        <Reveal className="split__aside">
          <dl className="facts">
            <div>
              <dt className="eyebrow">Address</dt>
              <dd>{branch.address}</dd>
            </div>
            {branch.phone && (
              <div>
                <dt className="eyebrow">Phone</dt>
                <dd>
                  <a href={`tel:${branch.phone.replace(/[^\d+]/g, '')}`} className="text-link">
                    {branch.phone}
                  </a>
                </dd>
              </div>
            )}
            <div>
              <dt className="eyebrow">Stages</dt>
              <dd>
                <ul>
                  {stages.map((s) => (
                    <li key={s.id}>
                      <strong>{s.title}</strong> · {s.range}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          </dl>

          <div className="card next">
            <h2 className="title">What happens next</h2>
            <ol>
              {NEXT.map((n, i) => (
                <li key={n.title}>
                  <span className="next__n">{i + 1}</span>
                  <span>
                    <strong>{n.title}</strong>
                    {n.text}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>

        <Reveal className="card split__main" delay={100}>
          <h2 className="title">Admission enquiry</h2>
          <p>A few details and we will take it from there.</p>
          {/* Keyed by branch so moving between branches starts a fresh form. */}
          <EnquiryForm
            key={branch.slug}
            kind="admission"
            id="a"
            submit="Send enquiry"
            fields={admissionFields(stages.map((s) => `${s.title} (${s.range})`))}
            extra={{ branch: branch.slug, branchName: `Paradise ${branch.name}`, branchDistrict: branch.district }}
            success={() => (
              <>
                <h3 className="title">Thank you</h3>
                <p>
                  Your enquiry for Paradise {branch.name} is with our admissions office. We will call you within one working day to talk it through
                  and arrange a visit.
                </p>
              </>
            )}
          />
        </Reveal>
      </div>
    </div>
  )
}
