import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { Divider } from '@/components/Motif'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getLocale } from '@/utilities/getLocale'

export const revalidate = 600

export const metadata: Metadata = {
  title: 'Spaces',
  description: 'Explore the creative spaces at Laboratorium — from the 750m² main hall to intimate exhibition rooms.',
}

const facilities = [
  'Bar & Café', 'Cinema', 'Event Space', 'Exhibition Space',
  'Indoor & Outdoor Communal Spaces', 'Library', 'Meeting / Workshop Room',
  'Shop', 'Stage / Rehearsal Room',
]

export default async function SpacesPage() {
  const locale = await getLocale()
  let spaces: any[] = []
  try {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({ collection: 'spaces', limit: 20, locale })
    spaces = result.docs
  } catch {}

  return (
    <div className="py-16 md:py-24">
      <div className="container">
        <p className="font-mono text-xs tracking-wider uppercase text-muted mb-4">Our Spaces</p>
        <h1 className="text-4xl md:text-5xl mb-6">
          Where creativity <span className="text-accent">happens.</span>
        </h1>
        <p className="text-lg text-muted max-w-2xl mb-16">
          Located in the former print house of Nova Makedonija, our spaces serve artists, educators, makers, and community builders.
        </p>

        <div className="space-y-16">
          {spaces.map((space: any, i: number) => (
            <article key={space.id} className={`grid grid-cols-1 md:grid-cols-2 gap-8 ${i > 0 ? 'border-t border-rule pt-16' : ''}`}>
              <div>
                <h2 className="text-2xl md:text-3xl mb-3">{space.name}</h2>
                <div className="flex gap-4 font-mono text-xs text-muted mb-4">
                  {space.sizeSqm && <span>{space.sizeSqm} m²</span>}
                  {space.capacity && <span>Cap. {space.capacity}</span>}
                  {space.rentable && <span className="text-accent">Available for rent</span>}
                </div>
                {space.use && <p className="text-muted leading-relaxed">{space.use}</p>}
                {space.rentable && (
                  <Link
                    href="/contact?subject=rent"
                    className="inline-block mt-6 font-mono text-xs tracking-wider uppercase border border-ink px-4 py-2 hover:bg-ink hover:text-cream transition-colors"
                  >
                    Book this space →
                  </Link>
                )}
              </div>
              <div className="bg-cream-dark halftone aspect-[4/3] flex items-center justify-center">
                <span className="font-mono text-xs text-muted">[Photo placeholder]</span>
              </div>
            </article>
          ))}
        </div>

        {spaces.length === 0 && (
          <p className="text-muted text-center py-16">Spaces will appear here once content is seeded.</p>
        )}

        <Divider className="mt-16" />

        <section>
          <h2 className="text-2xl mb-6">Facilities & Amenities</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {facilities.map((f) => (
              <div key={f} className="flex items-center gap-2 font-mono text-sm text-muted">
                <span className="text-accent">⚗</span> {f}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
