/**
 * Every form on the site posts here (a Vercel function; `vite dev` runs it too, see
 * vite.config.ts). It keeps only the fields each form actually has, checks the required ones,
 * and saves the submission to Sanity under an `inbox.` id, which the public dataset never
 * shows to visitors: only people logged in to the Studio can read it.
 *
 * Needs SANITY_WRITE_TOKEN (an Editor token from sanity.io/manage, server-side only, never
 * VITE_-prefixed) alongside VITE_SANITY_PROJECT_ID and VITE_SANITY_DATASET.
 */

interface Form {
  type: string
  required: string[]
  fields: string[]
}

const FORMS: Record<string, Form> = {
  admission: {
    type: 'admissionEnquiry',
    required: ['parentName', 'phone', 'email', 'childName', 'childDob', 'stage', 'year', 'branchName'],
    fields: ['preferred', 'message'],
  },
  contact: {
    type: 'contactMessage',
    required: ['firstName', 'lastName', 'email', 'phone', 'reason', 'programme', 'children'],
    fields: ['preferred', 'address', 'city', 'district', 'pin', 'message', 'enrolled', 'source', 'newsletter'],
  },
  franchise: {
    type: 'franchiseApplication',
    required: ['name', 'email', 'phone', 'location', 'state', 'timeline'],
    fields: ['property', 'investment', 'experience', 'message'],
  },
  training: {
    type: 'trainingApplication',
    required: ['name', 'dob', 'phone', 'email', 'district', 'qualification', 'experience'],
    fields: ['stage', 'arabic', 'message'],
  },
}

/** Filled in only by bots: the input is hidden from people. */
const HONEYPOT = 'website'

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } })

async function mutate(mutations: unknown[]) {
  const { VITE_SANITY_PROJECT_ID: project, VITE_SANITY_DATASET: dataset = 'production', SANITY_WRITE_TOKEN: token } = process.env
  if (!project || !token) throw new Error('VITE_SANITY_PROJECT_ID or SANITY_WRITE_TOKEN is not set')
  const res = await fetch(`https://${project}.api.sanity.io/v2025-02-19/data/mutate/${dataset}?returnDocuments=true`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ mutations }),
  })
  if (!res.ok) throw new Error(`Sanity answered ${res.status}: ${await res.text()}`)
  return (await res.json()) as { results: { id: string; document?: Record<string, unknown> }[] }
}

/** The next PET registration number for this year: PET26-0001, PET26-0002, ... */
async function nextRegNo() {
  const yy = String(new Date().getFullYear()).slice(-2)
  const id = `inbox.counter-training-${yy}`
  const { results } = await mutate([
    { createIfNotExists: { _id: id, _type: 'counter', count: 0 } },
    { patch: { id, inc: { count: 1 } } },
  ])
  const count = Number(results.at(-1)?.document?.count)
  if (!count) throw new Error('Could not read the registration counter')
  return `PET${yy}-${String(count).padStart(4, '0')}`
}

export async function POST(request: Request) {
  let body: Record<string, unknown>
  try {
    body = (await request.json()) as Record<string, unknown>
  } catch {
    return json({ error: 'Expected a JSON body.' }, 400)
  }

  const form = FORMS[String(body.kind)]
  if (!form) return json({ error: 'Unknown form.' }, 400)
  if (body[HONEYPOT]) return json({ ok: true })

  const doc: Record<string, string> = {}
  for (const name of [...form.required, ...form.fields]) {
    const value = typeof body[name] === 'string' ? (body[name] as string).trim() : ''
    if (value) doc[name] = value.slice(0, name === 'message' ? 4000 : 300)
  }
  const missing = form.required.filter((name) => !doc[name])
  if (missing.length) return json({ error: `Missing: ${missing.join(', ')}` }, 400)

  try {
    const extra: Record<string, string> = {}
    if (form.type === 'trainingApplication') extra.regNo = await nextRegNo()
    // Staff start the public listing from the town the applicant named.
    if (form.type === 'franchiseApplication') extra.listingName = doc.location

    await mutate([
      {
        create: {
          _id: `inbox.${crypto.randomUUID()}`,
          _type: form.type,
          status: 'new',
          submittedAt: new Date().toISOString(),
          ...doc,
          ...extra,
        },
      },
    ])
    return json({ ok: true, ...(extra.regNo ? { regNo: extra.regNo } : {}) })
  } catch (err) {
    console.error('[submit]', err)
    return json({ error: 'Could not save the submission.' }, 500)
  }
}
