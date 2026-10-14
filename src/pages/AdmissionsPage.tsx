import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { PageHead, useTitle } from '../components/page'
import { ArrowLong, Reveal, Search } from '../components/ui'
import { branchStages } from '../data/branches'
import type { Branch } from '../data/branches'
import { PHONE, PHONE_HREF } from '../data/site'
import { districtsOf, useBranches } from '../lib/content'

/** Lower-cased text a branch can be found by: its name, district, address and PIN. */
const haystack = (b: Branch) => `${b.name} ${b.district} ${b.address}`.toLowerCase()

/**
 * Admissions: every open branch (coming-soon ones wait on /franchise), searchable and
 * filterable by district. A parent finds their nearest school and opens it to send an enquiry.
 */
export default function AdmissionsPage() {
  useTitle('Admissions')
  const [query, setQuery] = useState('')
  const [district, setDistrict] = useState<string | null>(null)
  const all = useBranches()
  const open = useMemo(() => all?.filter((b) => !b.comingSoon), [all])
  const districts = useMemo(() => districtsOf(open ?? []), [open])

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    return (open ?? []).filter((b) => (!district || b.district === district) && (!q || haystack(b).includes(q)))
  }, [open, query, district])

  return (
    <div className="page wrap">
      <PageHead eyebrow="Admissions" lines={['Find your school.']}>
        <p>
          Admissions are open at every Paradise school. Choose the one nearest you and send an enquiry. Our admissions office will call you back and
          arrange a visit.
        </p>
      </PageHead>

      <Reveal className="finder">
        <label className="search">
          <span className="sr-only">Search by town, district or PIN code</span>
          <Search />
          <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by town, district or PIN code" />
        </label>
        <div className="chips" role="group" aria-label="Filter by district">
          <button type="button" className="chip" aria-pressed={!district} onClick={() => setDistrict(null)}>
            All districts
          </button>
          {districts.map((d) => (
            <button key={d} type="button" className="chip" aria-pressed={district === d} onClick={() => setDistrict(district === d ? null : d)}>
              {d}
            </button>
          ))}
        </div>
        <p className="eyebrow" aria-live="polite">
          {open ? `${visible.length} ${visible.length === 1 ? 'school' : 'schools'}` : 'Loading schools…'}
        </p>
      </Reveal>

      {!open ? null : visible.length > 0 ? (
        <ul className="branches">
          {visible.map((b, i) => (
            <Reveal as="li" key={b.slug} className="card branch" delay={(i % 3) * 70}>
              <p className="eyebrow">{b.district}</p>
              <h2 className="title">
                {/* The link covers the whole card, so anywhere on it opens the branch. */}
                <Link to={`/admissions/${b.slug}`} className="branch__link">
                  Paradise {b.name}
                </Link>
              </h2>
              <span className="dash" aria-hidden />
              <p>{b.address}</p>
              <ul className="tags" aria-label="Stages taught">
                {branchStages(b).map((s) => (
                  <li key={s.id}>{s.title}</li>
                ))}
              </ul>
              <span className="branch__go" aria-hidden>
                Enquire here <ArrowLong />
              </span>
            </Reveal>
          ))}
        </ul>
      ) : (
        <div className="card empty">
          <p className="title">No school matches that yet.</p>
          <p>
            Try another town or district, or{' '}
            <button
              type="button"
              className="text-link"
              onClick={() => {
                setQuery('')
                setDistrict(null)
              }}
            >
              see every school
            </button>
            .
          </p>
        </div>
      )}

      <Reveal className="closing">
        <h2 className="display display--sm">
          Not sure which school<span className="hl">?</span>
        </h2>
        <p>
          Call the admissions office on{' '}
          <a href={PHONE_HREF} className="text-link">
            {PHONE}
          </a>{' '}
          and we will help you find the right one.
        </p>
      </Reveal>
    </div>
  )
}
