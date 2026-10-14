/**
 * The one door every form leaves the site through. Each submission says what kind it is
 * (and, for admissions, which branch it is for) and is POSTed as JSON to api/submit.ts, which
 * saves it to Sanity for staff to pick up in the Studio.
 *
 * `VITE_ENQUIRY_ENDPOINT` can point the forms somewhere else; by default they use the site's
 * own function, which `vite dev` serves too.
 */
export type EnquiryKind = 'admission' | 'contact' | 'franchise' | 'training'

const ENDPOINT = (import.meta.env.VITE_ENQUIRY_ENDPOINT as string | undefined) || '/api/submit'

/** Resolves with what the server sent back, e.g. `regNo` for a training registration. */
export async function sendEnquiry(kind: EnquiryKind, fields: Record<string, string>): Promise<Record<string, string>> {
  const payload = { kind, page: window.location.pathname, ...fields }

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error(`Enquiry failed with status ${res.status}`)
  return res.json()
}

/** FormData to a flat record of trimmed strings, dropping anything left empty. */
export const formFields = (data: FormData) =>
  Object.fromEntries(
    [...data.entries()].map(([k, v]) => [k, String(v).trim()] as const).filter(([, v]) => v !== ''),
  )
