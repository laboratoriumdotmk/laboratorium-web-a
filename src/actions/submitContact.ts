'use server'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

const rateLimitMap = new Map<string, number>()

export async function submitContact(formData: FormData) {
  const honeypot = formData.get('website_url')
  if (honeypot) return { success: false, error: 'Invalid submission.' }

  const name = (formData.get('name') as string)?.trim()
  const email = (formData.get('email') as string)?.trim()
  const subject = (formData.get('subject') as string)?.trim()
  const message = (formData.get('message') as string)?.trim()

  if (!name || !email || !subject || !message) {
    return { success: false, error: 'All fields are required.' }
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, error: 'Invalid email address.' }
  }

  if (message.length > 5000) {
    return { success: false, error: 'Message too long.' }
  }

  const now = Date.now()
  const lastSubmit = rateLimitMap.get(email) || 0
  if (now - lastSubmit < 60_000) {
    return { success: false, error: 'Please wait a minute before submitting again.' }
  }
  rateLimitMap.set(email, now)

  try {
    const payload = await getPayload({ config: configPromise })
    await payload.create({
      collection: 'contact-submissions',
      data: { name, email, subject, message },
    })
    return { success: true }
  } catch {
    return { success: false, error: 'Something went wrong. Please try again.' }
  }
}
