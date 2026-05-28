'use client'
import React, { useState } from 'react'
import { submitContact } from '@/actions/submitContact'
import { useSearchParams } from 'next/navigation'

const subjects = [
  { value: 'general', label: 'General inquiry' },
  { value: 'rent', label: 'Rent a space' },
  { value: 'volunteer', label: 'Volunteer' },
  { value: 'partner', label: 'Partner' },
  { value: 'host-event', label: 'Host an event' },
  { value: 'residency', label: 'Artist Residency' },
  { value: 'become-maker', label: 'Become a maker' },
  { value: 'support', label: 'Support' },
]

export const ContactForm: React.FC<{ defaultSubject?: string }> = ({ defaultSubject }) => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const searchParams = useSearchParams()
  const subjectFromUrl = searchParams.get('subject') || defaultSubject || 'general'

  async function handleSubmit(formData: FormData) {
    setStatus('loading')
    const result = await submitContact(formData)
    if (result.success) {
      setStatus('success')
    } else {
      setErrorMsg(result.error || 'Something went wrong.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="border-2 border-accent p-8 text-center">
        <p className="text-xl font-display mb-2">Thank you!</p>
        <p className="text-muted">We&apos;ll get back to you soon.</p>
      </div>
    )
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      {/* Honeypot */}
      <div className="hidden" aria-hidden="true">
        <input type="text" name="website_url" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label htmlFor="name" className="block font-mono text-xs tracking-wider uppercase text-muted mb-2">
          Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="w-full border border-rule bg-transparent px-4 py-3 text-ink focus:border-ink focus:outline-none transition-colors"
        />
      </div>

      <div>
        <label htmlFor="email" className="block font-mono text-xs tracking-wider uppercase text-muted mb-2">
          Email *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="w-full border border-rule bg-transparent px-4 py-3 text-ink focus:border-ink focus:outline-none transition-colors"
        />
      </div>

      <div>
        <label htmlFor="subject" className="block font-mono text-xs tracking-wider uppercase text-muted mb-2">
          Subject *
        </label>
        <select
          id="subject"
          name="subject"
          defaultValue={subjectFromUrl}
          required
          className="w-full border border-rule bg-transparent px-4 py-3 text-ink focus:border-ink focus:outline-none transition-colors"
        >
          {subjects.map((s) => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block font-mono text-xs tracking-wider uppercase text-muted mb-2">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          maxLength={5000}
          className="w-full border border-rule bg-transparent px-4 py-3 text-ink focus:border-ink focus:outline-none transition-colors resize-y"
        />
      </div>

      {status === 'error' && (
        <p className="text-accent text-sm">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="font-mono text-xs tracking-wider uppercase bg-ink text-cream px-6 py-3 hover:bg-accent transition-colors disabled:opacity-50"
      >
        {status === 'loading' ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  )
}
