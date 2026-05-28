import configPromise from '@payload-config'
import { getPayload } from 'payload'

function formatICSDate(date: Date): string {
  return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
}

function escapeICS(text: string): string {
  return text.replace(/[\\;,\n]/g, (match) => {
    if (match === '\n') return '\\n'
    return `\\${match}`
  })
}

export async function GET() {
  const payload = await getPayload({ config: configPromise })
  const now = new Date().toISOString()

  const result = await payload.find({
    collection: 'events',
    where: {
      and: [
        { _status: { equals: 'published' } },
        { startDateTime: { greater_than: now } },
      ],
    },
    sort: 'startDateTime',
    limit: 100,
  })

  const events = result.docs

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Laboratorium//Events//MK',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'X-WR-CALNAME:Laboratorium Events',
    'X-WR-TIMEZONE:Europe/Skopje',
  ]

  for (const event of events) {
    const start = new Date(event.startDateTime)
    const end = event.endDateTime
      ? new Date(event.endDateTime)
      : new Date(start.getTime() + 2 * 60 * 60 * 1000)

    lines.push('BEGIN:VEVENT')
    lines.push(`UID:event-${event.id}@laboratorium.mk`)
    lines.push(`DTSTART:${formatICSDate(start)}`)
    lines.push(`DTEND:${formatICSDate(end)}`)
    lines.push(`SUMMARY:${escapeICS(String(event.title))}`)
    if (event.summary) lines.push(`DESCRIPTION:${escapeICS(String(event.summary))}`)
    lines.push('LOCATION:Laboratorium\\, Blvd. Kliment Ohridski 68\\, 1000 Skopje')
    lines.push(`URL:${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3100'}/programs/${event.slug}`)
    lines.push('END:VEVENT')
  }

  lines.push('END:VCALENDAR')

  return new Response(lines.join('\r\n'), {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': 'attachment; filename="laboratorium-events.ics"',
    },
  })
}
