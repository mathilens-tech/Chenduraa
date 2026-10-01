import { useId, useRef, useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/graphics/Icon'
import { contact, leadAccessKey, leadEndpoint } from '@/config/company'
import { solutions } from '@/content/solutions'
import { cn } from '@/lib/cn'

/**
 * Enquiry form.
 *
 * Submission order of preference:
 *   1. POST JSON to VITE_LEAD_ENDPOINT. This works both with a hosted form
 *      service (Formspree, Web3Forms, Getform, FormSubmit — all accept a JSON
 *      body and an `Accept: application/json` header) and with your own Lead
 *      API later. No backend of our own is required either way.
 *   2. Fall back to a prefilled mailto: using VITE_CONTACT_EMAIL.
 *   3. Confirm locally (demo behaviour only — see README "Contact form").
 *
 * The payload shape is deliberately the one a future Lead API / ERP will
 * consume, so no migration is needed later:
 *   { name, phone, email, location, requirement, source, message }
 */

type Fields = {
  name: string
  phone: string
  email: string
  location: string
  requirement: string
  message: string
}

type Errors = Partial<Record<keyof Fields, string>>

const EMPTY: Fields = {
  name: '',
  phone: '',
  email: '',
  location: '',
  requirement: '',
  message: '',
}

const requirementOptions = [
  ...solutions.map((solution) => solution.title),
  'Site assessment',
  'Operation & maintenance',
  'Subsidy assistance',
  'Other enquiry',
]

/** Accepts Indian 10-digit numbers with optional +91 / 0 prefix and separators. */
function isValidPhone(raw: string): boolean {
  const digits = raw.replace(/[\s\-().]/g, '')
  return /^(?:\+?91|0)?[6-9]\d{9}$/.test(digits)
}

function isValidEmail(raw: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(raw.trim())
}

function validate(fields: Fields): Errors {
  const errors: Errors = {}

  if (fields.name.trim().length < 2) {
    errors.name = 'Please enter your name.'
  }
  if (!fields.phone.trim()) {
    errors.phone = 'Please enter a phone number we can reach you on.'
  } else if (!isValidPhone(fields.phone)) {
    errors.phone = 'Please enter a valid 10-digit mobile number.'
  }
  if (fields.email.trim() && !isValidEmail(fields.email)) {
    errors.email = 'Please check this email address.'
  }
  if (!fields.requirement) {
    errors.requirement = 'Please select what your enquiry is about.'
  }
  if (fields.message.length > 2000) {
    errors.message = 'Please keep your message under 2000 characters.'
  }

  return errors
}

type Status = 'idle' | 'submitting' | 'success' | 'error'

export function EnquiryForm() {
  const [fields, setFields] = useState<Fields>(EMPTY)
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<Status>('idle')
  const mountedAt = useRef(Date.now())
  const honeypot = useRef<HTMLInputElement | null>(null)
  const errorSummary = useRef<HTMLDivElement | null>(null)
  const uid = useId().replace(/:/g, '')

  function update<K extends keyof Fields>(key: K, value: string) {
    setFields((previous) => ({ ...previous, [key]: value }))
    if (errors[key]) {
      setErrors((previous) => ({ ...previous, [key]: undefined }))
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const found = validate(fields)
    if (Object.keys(found).length > 0) {
      setErrors(found)
      setStatus('idle')
      // Announce and focus the summary so screen readers and keyboard users
      // are told what needs fixing.
      requestAnimationFrame(() => errorSummary.current?.focus())
      return
    }

    // Spam heuristics: a filled hidden field, or a submission faster than a
    // human could realistically type, is dropped without a network call.
    const isBot = Boolean(honeypot.current?.value) || Date.now() - mountedAt.current < 2500
    if (isBot) {
      setStatus('success')
      return
    }

    setStatus('submitting')

    const payload = {
      name: fields.name.trim(),
      phone: fields.phone.trim(),
      email: fields.email.trim() || null,
      location: fields.location.trim() || null,
      requirement: fields.requirement,
      source: 'website-contact-form',
      message: fields.message.trim() || null,
      submittedAt: new Date().toISOString(),
    }

    try {
      if (leadEndpoint) {
        const response = await fetch(leadEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // Form services return JSON instead of an HTML redirect when asked.
            Accept: 'application/json',
          },
          body: JSON.stringify({
            ...payload,
            // Web3Forms (and similar) authenticate the form with a public key
            // in the body. Omitted entirely when not configured.
            ...(leadAccessKey ? { access_key: leadAccessKey } : {}),
            subject: `Website enquiry — ${payload.requirement}`,
          }),
        })
        if (!response.ok) throw new Error(`Lead endpoint responded ${response.status}`)
      } else if (contact.email) {
        // No endpoint configured: hand off to the visitor's mail client.
        const body = [
          `Name: ${payload.name}`,
          `Phone: ${payload.phone}`,
          `Email: ${payload.email ?? '-'}`,
          `Location: ${payload.location ?? '-'}`,
          `Requirement: ${payload.requirement}`,
          '',
          payload.message ?? '',
        ].join('\n')

        window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(
          `Website enquiry — ${payload.requirement}`,
        )}&body=${encodeURIComponent(body)}`
      }

      setStatus('success')
      setFields(EMPTY)
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div
        className="rounded-[4px] border border-eco-500/25 bg-eco-100 p-8 text-center sm:p-10"
        role="status"
      >
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-eco-500 text-white">
          <Icon name="check" className="h-6 w-6" strokeWidth={2.4} />
        </span>
        <h3 className="mt-5 font-display text-d3 text-navy-700">Thank you for getting in touch</h3>
        <p className="mx-auto mt-3 max-w-md text-[0.9375rem] leading-[1.7] text-body">
          Your enquiry has been received. Our team will review the details you have shared and get
          back to you about the next step.
        </p>
        <button
          type="button"
          onClick={() => {
            mountedAt.current = Date.now()
            setStatus('idle')
          }}
          className="mt-6 rounded-sm font-display text-[0.875rem] font-semibold text-navy-700 underline decoration-navy-700/30 underline-offset-4 transition-colors hover:text-gold-600"
        >
          Send another enquiry
        </button>
      </div>
    )
  }

  const errorList = Object.entries(errors).filter(([, message]) => Boolean(message))

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {errorList.length > 0 && (
        <div
          ref={errorSummary}
          tabIndex={-1}
          role="alert"
          className="rounded-[4px] border border-red-200 bg-red-50 p-4"
        >
          <p className="flex items-center gap-2 font-display text-[0.875rem] font-semibold text-red-800">
            <Icon name="alert" className="h-4 w-4" />
            Please check the highlighted fields
          </p>
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id={`${uid}-name`}
          label="Full name"
          required
          value={fields.name}
          error={errors.name}
          autoComplete="name"
          onChange={(value) => update('name', value)}
        />
        <Field
          id={`${uid}-phone`}
          label="Phone number"
          required
          type="tel"
          inputMode="tel"
          value={fields.phone}
          error={errors.phone}
          autoComplete="tel"
          onChange={(value) => update('phone', value)}
        />
        <Field
          id={`${uid}-email`}
          label="Email address"
          type="email"
          inputMode="email"
          value={fields.email}
          error={errors.email}
          autoComplete="email"
          hint="Optional"
          onChange={(value) => update('email', value)}
        />
        <Field
          id={`${uid}-location`}
          label="Location"
          value={fields.location}
          error={errors.location}
          autoComplete="address-level2"
          hint="City or town"
          onChange={(value) => update('location', value)}
        />
      </div>

      {/* Requirement */}
      <div>
        <Label htmlFor={`${uid}-requirement`} required>
          What is your enquiry about?
        </Label>
        <div className="relative">
          <select
            id={`${uid}-requirement`}
            value={fields.requirement}
            onChange={(event) => update('requirement', event.target.value)}
            aria-invalid={Boolean(errors.requirement)}
            aria-describedby={errors.requirement ? `${uid}-requirement-error` : undefined}
            className={cn(
              'w-full appearance-none rounded-[3px] border bg-white px-3.5 py-3 pr-10 text-[0.9375rem] text-ink transition-colors',
              'focus:border-navy-500 focus:outline-none',
              errors.requirement ? 'border-red-400' : 'border-line hover:border-navy-200',
            )}
          >
            <option value="">Please select…</option>
            {requirementOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <Icon
            name="chevronDown"
            className="pointer-events-none absolute top-1/2 right-3.5 h-4 w-4 -translate-y-1/2 text-slate-muted"
          />
        </div>
        <FieldError id={`${uid}-requirement-error`} message={errors.requirement} />
      </div>

      {/* Message */}
      <div>
        <Label htmlFor={`${uid}-message`} hint="Optional">
          Tell us about your requirement
        </Label>
        <textarea
          id={`${uid}-message`}
          rows={5}
          value={fields.message}
          maxLength={2000}
          onChange={(event) => update('message', event.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? `${uid}-message-error` : undefined}
          placeholder="Roof type, approximate area, current monthly electricity usage — whatever you already know."
          className={cn(
            'w-full resize-y rounded-[3px] border bg-white px-3.5 py-3 text-[0.9375rem] text-ink transition-colors placeholder:text-slate-muted/70',
            'focus:border-navy-500 focus:outline-none',
            errors.message ? 'border-red-400' : 'border-line hover:border-navy-200',
          )}
        />
        <FieldError id={`${uid}-message-error`} message={errors.message} />
      </div>

      {/* Honeypot — hidden from users and assistive tech, attractive to bots. */}
      <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden opacity-0">
        <label htmlFor={`${uid}-website`}>Website</label>
        <input
          ref={honeypot}
          id={`${uid}-website`}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {status === 'error' && (
        <div role="alert" className="rounded-[4px] border border-red-200 bg-red-50 p-4">
          <p className="text-[0.9375rem] leading-relaxed text-red-800">
            Something went wrong sending your enquiry. Please try again, or reach us directly using
            the contact details on this page.
          </p>
        </div>
      )}

      <div className="flex flex-col gap-4 pt-1 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" size="lg" disabled={status === 'submitting'} withArrow>
          {status === 'submitting' ? 'Sending…' : 'Send Enquiry'}
        </Button>
        <p className="text-[0.8125rem] leading-relaxed text-slate-muted">
          We use your details only to respond to this enquiry.
        </p>
      </div>
    </form>
  )
}

/* -------------------------------- field parts ------------------------------- */

function Label({
  htmlFor,
  children,
  required,
  hint,
}: {
  htmlFor: string
  children: React.ReactNode
  required?: boolean
  hint?: string
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-2 flex items-baseline justify-between gap-2 font-display text-[0.8125rem] font-semibold text-navy-700"
    >
      <span>
        {children}
        {required && (
          <>
            {' '}
            <span className="text-gold-600" aria-hidden="true">
              *
            </span>
            <span className="sr-only"> (required)</span>
          </>
        )}
      </span>
      {hint && <span className="font-sans text-[0.75rem] font-normal text-slate-muted">{hint}</span>}
    </label>
  )
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null
  return (
    <p id={id} className="mt-1.5 text-[0.8125rem] text-red-700">
      {message}
    </p>
  )
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  required,
  type = 'text',
  inputMode,
  autoComplete,
  hint,
}: {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  error?: string
  required?: boolean
  type?: string
  inputMode?: 'text' | 'tel' | 'email'
  autoComplete?: string
  hint?: string
}) {
  return (
    <div>
      <Label htmlFor={id} required={required} hint={hint}>
        {label}
      </Label>
      <input
        id={id}
        type={type}
        inputMode={inputMode}
        autoComplete={autoComplete}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(
          'w-full rounded-[3px] border bg-white px-3.5 py-3 text-[0.9375rem] text-ink transition-colors',
          'focus:border-navy-500 focus:outline-none',
          error ? 'border-red-400' : 'border-line hover:border-navy-200',
        )}
      />
      <FieldError id={`${id}-error`} message={error} />
    </div>
  )
}
