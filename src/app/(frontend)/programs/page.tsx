import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getLocale } from '@/utilities/getLocale'

export const revalidate = 600

export const metadata: Metadata = {
  title: 'Programs & Events',
  description: 'Workshops, concerts, exhibitions, screenings, and seminars at Laboratorium.',
}

export default async function ProgramsPage() {
  const locale = await getLocale()
  let upcoming: any[] = []
  let past: any[] = []
  try {
    const payload = await getPayload({ config: configPromise })
    const now = new Date().toISOString()
    const [u, p] = await Promise.all([
      payload.find({
        collection: 'events',
        locale,
        where: {
          and: [
            { _status: { equals: 'published' } },
            { startDateTime: { greater_than: now } },
          ],
        },
        sort: 'startDateTime',
        limit: 50,
      }),
      payload.find({
        collection: 'events',
        locale,
        where: {
          and: [
            { _status: { equals: 'published' } },
            { startDateTime: { less_than_equal: now } },
          ],
        },
        sort: '-startDateTime',
        limit: 50,
      }),
    ])
    upcoming = u.docs
    past = p.docs
  } catch {}

  const EventCard = ({ event }: { event: any }) => (
    <Link
      href={`/programs/${event.slug}`}
      className="group block border border-rule p-6 hover:border-ink transition-colors no-underline"
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <p className="font-mono text-xs text-muted">
          {new Date(event.startDateTime).toLocaleDateString('mk-MK', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        </p>
        <span className="font-mono text-xs text-accent uppercase tracking-wider shrink-0">
          {event.type}
        </span>
      </div>
      <h3 className="text-lg font-display group-hover:text-accent transition-colors">
        {event.title}
      </h3>
      {event.summary && (
        <p className="text-sm text-muted mt-2 line-clamp-2">{event.summary}</p>
      )}
    </Link>
  )

  return (
    <div className="py-16 md:py-24">
      <div className="container">
        <p className="font-mono text-xs tracking-wider uppercase text-muted mb-4">
          Programs & Events
        </p>
        <h1 className="text-4xl md:text-5xl mb-6">
          180+ events <span className="text-accent">and counting.</span>
        </h1>
        <p className="text-lg text-muted max-w-2xl mb-16">
          Workshops, concerts, exhibitions, screenings, seminars, and more — for all generations.
        </p>

        {upcoming.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl mb-6 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-accent inline-block" />
              Upcoming
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcoming.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </section>
        )}

        {past.length > 0 && (
          <section>
            <h2 className="text-2xl mb-6 text-muted">Past Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {past.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </section>
        )}

        {upcoming.length === 0 && past.length === 0 && (
          <p className="text-muted text-center py-16">Events will appear here once content is seeded.</p>
        )}

        <div className="mt-16 text-center">
          <a
            href="/events.ics"
            className="font-mono text-xs tracking-wider uppercase border border-rule px-4 py-2 hover:bg-ink hover:text-cream transition-colors"
          >
            Subscribe to calendar (iCal) ↓
          </a>
        </div>
      </div>
    </div>
  )
}
