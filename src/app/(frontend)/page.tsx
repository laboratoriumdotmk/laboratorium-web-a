import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { Motif, Divider } from '@/components/Motif'
import { MutatingWordmark } from '@/components/MutatingWordmark'
import Link from 'next/link'
import { getLocale } from '@/utilities/getLocale'

export const revalidate = 600

async function getHomeData(locale: string) {
  const payload = await getPayload({ config: configPromise })

  const [events, spaces, projects] = await Promise.all([
    payload.find({
      collection: 'events',
      where: { _status: { equals: 'published' } },
      sort: 'startDateTime',
      limit: 6,
      locale: locale as any,
    }),
    payload.find({ collection: 'spaces', limit: 10, locale: locale as any }),
    payload.find({
      collection: 'projects',
      where: { _status: { equals: 'published' } },
      limit: 4,
      locale: locale as any,
    }),
  ])

  return { events: events.docs, spaces: spaces.docs, projects: projects.docs }
}

export default async function HomePage() {
  const locale = await getLocale()
  let data = { events: [] as any[], spaces: [] as any[], projects: [] as any[] }
  try {
    data = await getHomeData(locale)
  } catch {
    // DB may not be seeded yet
  }

  const upcomingEvents = data.events.filter(
    (e) => new Date(e.startDateTime) > new Date(),
  )

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden py-24 md:py-36">
        <div className="halftone absolute inset-0 opacity-30" />
        <div className="container relative">
          <div className="max-w-4xl">
            <div className="mb-8">
              <MutatingWordmark className="text-4xl md:text-6xl" />
            </div>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl leading-[1.05] mb-6">
              Лабораторија за
              <br />
              <span className="text-accent">убави нешта.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted max-w-2xl leading-relaxed">
              A free cultural-educational center in Skopje where artists, designers, makers, and
              young creatives meet, learn, experiment, and build community.
            </p>
          </div>
        </div>
      </section>

      {/* Origin */}
      <section className="py-16 md:py-24">
        <div className="container">
          <hr className="rule-thick mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <p className="font-mono text-xs tracking-wider uppercase text-muted mb-4">
                <Motif size="sm" /> Est. December 2024
              </p>
              <h2 className="text-3xl md:text-4xl mb-6">
                Born in a print house.
              </h2>
            </div>
            <div className="text-muted leading-relaxed space-y-4">
              <p>
                Housed in the cavernous former print house of <em>Nova Makedonija</em>, the
                country&apos;s former national daily newspaper — a raw industrial space repurposed by young
                artists from many disciplines into a single creative ecosystem.
              </p>
              <p>
                Since opening, we&apos;ve hosted <strong>180+ events</strong>, built partnerships with{' '}
                <strong>80+ organizations</strong>, and been selected as a{' '}
                <strong>finalist for the New European Bauhaus Award 2024</strong> out of 600+ European
                projects.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Three Pillars */}
      <section className="py-16 md:py-24 bg-cream-dark">
        <div className="container">
          <p className="font-mono text-xs tracking-wider uppercase text-muted mb-8">
            What we do
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '◉',
                title: 'Community & Creative Space',
                desc: 'A free, welcoming, multi-use space where future artists and creators meet, exchange ideas, and create together. Workshops, craft classes, seminars, concerts, exhibitions, screenings.',
              },
              {
                icon: '◎',
                title: 'Incubator for Social Projects',
                desc: 'Events and initiatives run directly or with partners, aimed at improving the cultural and social environment, especially engaging young people toward a better future.',
              },
              {
                icon: '⚗',
                title: 'Craft & Design Revival',
                desc: 'Reviving fading Macedonian crafts and artisanal work, making these professions attractive to young people, and offering makers a direct sales channel via Lab Design Market.',
              },
            ].map((pillar, i) => (
              <div key={i} className="relative">
                <span className="text-accent text-3xl mb-4 block">{pillar.icon}</span>
                <h3 className="text-xl md:text-2xl mb-3">{pillar.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      {upcomingEvents.length > 0 && (
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-3xl">Upcoming</h2>
              <Link
                href="/programs"
                className="font-mono text-xs tracking-wider uppercase text-accent hover:text-ink"
              >
                All programs →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.slice(0, 6).map((event: any) => (
                <Link
                  key={event.id}
                  href={`/programs/${event.slug}`}
                  className="group block border border-rule p-6 hover:border-ink transition-colors no-underline"
                >
                  <p className="font-mono text-xs text-muted mb-2">
                    {new Date(event.startDateTime).toLocaleDateString('mk-MK', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </p>
                  <h3 className="text-lg font-display group-hover:text-accent transition-colors">
                    {event.title}
                  </h3>
                  {event.summary && (
                    <p className="text-sm text-muted mt-2 line-clamp-2">{event.summary}</p>
                  )}
                  <p className="font-mono text-xs text-accent mt-3 uppercase tracking-wider">
                    {event.type}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Spaces Preview */}
      {data.spaces.length > 0 && (
        <section className="py-16 md:py-24 bg-cream-dark">
          <div className="container">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-3xl">Our Spaces</h2>
              <Link
                href="/spaces"
                className="font-mono text-xs tracking-wider uppercase text-accent"
              >
                Explore spaces →
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {data.spaces.map((space: any) => (
                <div key={space.id} className="border border-rule p-4 bg-cream">
                  <h4 className="font-display text-lg">{space.name}</h4>
                  {space.sizeSqm && (
                    <p className="font-mono text-xs text-muted mt-1">{space.sizeSqm} m²</p>
                  )}
                  {space.use && (
                    <p className="text-sm text-muted mt-2 line-clamp-2">{space.use}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Projects */}
      {data.projects.length > 0 && (
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-3xl">Projects</h2>
              <Link
                href="/projects"
                className="font-mono text-xs tracking-wider uppercase text-accent"
              >
                All projects →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.projects.map((project: any) => (
                <Link
                  key={project.id}
                  href={`/projects/${project.slug}`}
                  className="group block border-t-2 border-ink pt-4 no-underline"
                >
                  <h3 className="text-xl font-display group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                  {project.summary && (
                    <p className="text-sm text-muted mt-2">{project.summary}</p>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Badges / Networks */}
      <section className="py-12 bg-cream-dark">
        <div className="container">
          <div className="flex flex-wrap items-center justify-center gap-6 text-center">
            {[
              'New European Bauhaus Award 2024 Finalist',
              'Trans Europe Halles (TEH)',
              'European Network of Cultural Centres (ENCC)',
              'European Creative Hubs Network (ECHN)',
            ].map((badge) => (
              <span
                key={badge}
                className="font-mono text-xs tracking-wider uppercase text-muted border border-rule px-3 py-2"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </section>

      <Divider />
    </div>
  )
}
