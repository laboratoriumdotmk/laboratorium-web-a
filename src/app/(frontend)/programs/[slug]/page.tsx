import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { RichText } from '@/components/RichText'
import Link from 'next/link'
import { getLocale } from '@/utilities/getLocale'

export const revalidate = 600

type Args = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const events = await payload.find({
    collection: 'events',
    draft: false,
    limit: 1000,
    pagination: false,
    select: { slug: true },
  })
  return events.docs.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'events',
    where: { slug: { equals: slug } },
    limit: 1,
  })
  const event = result.docs[0]
  if (!event) return {}
  return {
    title: event.title,
    description: event.summary || undefined,
  }
}

export default async function EventPage({ params }: Args) {
  const locale = await getLocale()
  const { slug } = await params
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'events',
    locale,
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,
  })
  const event = result.docs[0]
  if (!event) notFound()

  const start = new Date(event.startDateTime)
  const icsUrl = `/api/events/${event.id}/ics`

  return (
    <div className="py-16 md:py-24">
      <div className="container max-w-3xl">
        <Link href="/programs" className="font-mono text-xs tracking-wider uppercase text-muted hover:text-accent mb-8 block">
          ← All Programs
        </Link>

        <div className="flex items-center gap-4 mb-4">
          <span className="font-mono text-xs text-accent uppercase tracking-wider border border-accent px-2 py-0.5">
            {event.type}
          </span>
          <time className="font-mono text-xs text-muted" dateTime={event.startDateTime}>
            {start.toLocaleDateString('mk-MK', { day: 'numeric', month: 'long', year: 'numeric' })}
            {' '}
            {start.toLocaleTimeString('mk-MK', { hour: '2-digit', minute: '2-digit' })}
          </time>
        </div>

        <h1 className="text-3xl md:text-5xl mb-6">{event.title}</h1>

        {event.summary && (
          <p className="text-lg text-muted mb-8 leading-relaxed">{event.summary}</p>
        )}

        {typeof event.space === 'object' && event.space?.name && (
          <p className="font-mono text-sm text-muted mb-6">
            📍 {event.space.name}
            {event.space.sizeSqm && ` — ${event.space.sizeSqm} m²`}
          </p>
        )}

        {event.body && (
          <div className="prose prose-lg max-w-none mb-12">
            <RichText data={event.body} />
          </div>
        )}

        {event.partners && event.partners.length > 0 && (
          <div className="border-t border-rule pt-6 mb-8">
            <p className="font-mono text-xs tracking-wider uppercase text-muted mb-2">Partners</p>
            <div className="flex flex-wrap gap-2">
              {event.partners.map((p: any, i: number) => (
                <span key={i} className="text-sm border border-rule px-2 py-1">{p.name}</span>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-4">
          {event.ticketUrl && (
            <a
              href={event.ticketUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs tracking-wider uppercase bg-accent text-cream px-4 py-2 hover:bg-accent-dark transition-colors no-underline"
            >
              RSVP / Tickets →
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
