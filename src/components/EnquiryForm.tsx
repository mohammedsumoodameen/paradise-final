import { useState } from 'react'
import type { FormEvent, ReactNode } from 'react'
import { PHONE, PHONE_HREF } from '../data/site'
import { formFields, sendEnquiry } from '../lib/enquiries'
import type { EnquiryKind } from '../lib/enquiries'
import { Check, Chevron } from './ui'

/**
 * One field of a form. `name` is what api/submit.ts receives, so the names here must stay in
 * step with the FORMS table there.
 */
export interface FieldDef {
  name: string
  label: string
  type?: 'text' | 'email' | 'tel' | 'date' | 'select' | 'radio' | 'textarea' | 'checkbox'
  required?: boolean
  options?: string[]
  /** Takes the full row on wide screens instead of half of it. */
  wide?: boolean
  autoComplete?: string
  defaultValue?: string
  rows?: number
  maxLength?: number
}

type Errors = Record<string, string>
type Reply = Record<string, string>

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

/**
 * Every form on the site: it draws the fields it is given, checks them on submit, posts
 * through lib/enquiries.ts, and only shows `success` once the server has said yes.
 */
export default function EnquiryForm({
  kind,
  id,
  fields,
  extra,
  submit = 'Submit',
  success,
}: {
  kind: EnquiryKind
  /** Prefix for the inputs' ids, so two forms can share a page. */
  id: string
  fields: FieldDef[]
  /** Sent with the form but not asked for, e.g. which branch an admission enquiry is for. */
  extra?: Record<string, string>
  submit?: string
  success: (reply: Reply) => ReactNode
}) {
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'failed'>('idle')
  const [reply, setReply] = useState<Reply | null>(null)
  const sending = status === 'sending'

  // The change event bubbles from whichever control was touched, so one handler on the form
  // clears that field's error as soon as the person starts fixing it.
  const clear = (target: EventTarget) => {
    const name = (target as HTMLElement & { name?: string }).name
    if (name && errors[name]) setErrors(({ [name]: _fixed, ...rest }) => rest)
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const next: Errors = {}

    for (const f of fields) {
      const value = String(data.get(f.name) ?? '').trim()
      if (f.required && !value) next[f.name] = 'This is a required field.'
      else if (f.type === 'email' && value && !EMAIL.test(value)) next[f.name] = 'Enter a valid email address.'
      else if (f.type === 'tel' && value && value.replace(/\D/g, '').length < 10) next[f.name] = 'Enter a valid phone number.'
    }

    setErrors(next)
    const first = Object.keys(next)[0]
    if (first) {
      // Take the person straight to the first thing that needs fixing.
      e.currentTarget.querySelector<HTMLElement>(`[name="${first}"]`)?.focus()
      return
    }

    setStatus('sending')
    try {
      setReply(await sendEnquiry(kind, { ...formFields(data), ...extra }))
      setStatus('idle')
    } catch {
      setStatus('failed')
    }
  }

  if (reply) {
    return (
      <div className="form-done" role="status">
        <span className="form-done__tick" aria-hidden>
          <Check />
        </span>
        {success(reply)}
      </div>
    )
  }

  return (
    <form className="form" noValidate onSubmit={onSubmit} onChange={(e) => clear(e.target)} aria-busy={sending}>
      {/* Only bots fill this in: it is hidden from people and skipped by Tab, and api/submit.ts drops anything that arrives with it. */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="form__trap" />

      {fields.map((f) => {
        const fid = `${id}-${f.name}`
        const error = errors[f.name]
        const common = { id: fid, name: f.name, 'aria-invalid': error ? true : undefined, 'aria-describedby': error ? `${fid}-error` : undefined }
        const wide = f.wide || f.type === 'textarea' || f.type === 'radio' || f.type === 'checkbox'

        if (f.type === 'checkbox') {
          return (
            <label key={f.name} className="form__check form__wide">
              <input type="checkbox" name={f.name} />
              {f.label}
            </label>
          )
        }

        if (f.type === 'radio') {
          return (
            <fieldset key={f.name} className="form__field form__wide">
              <legend className="form__label">{f.label}</legend>
              <div className="form__radios">
                {f.options?.map((o) => (
                  <label key={o} className="form__check">
                    <input type="radio" name={f.name} value={o} />
                    {o}
                  </label>
                ))}
              </div>
            </fieldset>
          )
        }

        return (
          <div key={f.name} className={`form__field${wide ? ' form__wide' : ''}`}>
            <label className="form__label" htmlFor={fid}>
              {f.label}
              {f.required && <span className="form__star"> *</span>}
            </label>
            {f.type === 'select' ? (
              <span className="form__select">
                <select {...common} defaultValue="" className="form__input">
                  <option value="">- Select -</option>
                  {f.options?.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
                <Chevron dir="down" />
              </span>
            ) : f.type === 'textarea' ? (
              <textarea {...common} rows={f.rows ?? 5} className="form__input" />
            ) : (
              <input
                {...common}
                type={f.type ?? 'text'}
                autoComplete={f.autoComplete}
                defaultValue={f.defaultValue}
                maxLength={f.maxLength}
                inputMode={f.type === 'tel' ? 'tel' : f.type === 'email' ? 'email' : undefined}
                className="form__input"
              />
            )}
            {error && (
              <p className="form__error" id={`${fid}-error`}>
                {error}
              </p>
            )}
          </div>
        )
      })}

      {status === 'failed' && (
        <p role="alert" className="form__failed form__wide">
          Sorry, that did not go through. Please try again, or call us on <a href={PHONE_HREF}>{PHONE}</a>.
        </p>
      )}

      <div className="form__wide">
        <button type="submit" className="btn" disabled={sending}>
          {sending ? 'Sending...' : submit}
        </button>
      </div>
    </form>
  )
}
