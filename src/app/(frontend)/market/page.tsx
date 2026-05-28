import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import Link from 'next/link'
import type { Metadata } from 'next'
import { Divider } from '@/components/Motif'
import { getLocale } from '@/utilities/getLocale'

export const revalidate = 600

export const metadata: Metadata = {
  title: 'Lab Design Market',
  description: 'Macedonian designers, craftspeople, and artisans — 15+ local brands at Laboratorium.',
}

export default async function MarketPage() {
  const locale = await getLocale()
  let vendors: any[] = []
  try {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'vendors',
      locale,
      where: { _status: { equals: 'published' } },
      limit: 50,
      depth: 1,
    })
    vendors = result.docs
  } catch {}

  return (
    <div className="py-16 md:py-24">
      <div className="container">
        <p className="font-mono text-xs tracking-wider uppercase text-muted mb-4">Lab Design Market</p>
        <h1 className="text-4xl md:text-5xl mb-6">
          Crafted in <span className="text-accent">Macedonia.</span>
        </h1>
        <p className="text-lg text-muted max-w-2xl mb-8">
          An industrial showroom and community of 15+ Macedonian designers and craftspeople.
          Reviving fading crafts, making artisanal work attractive to young people, and offering makers a direct sales channel.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="border border-rule p-8 bg-cream-dark">
            <h2 className="text-2xl mb-3">Lab Design Market</h2>
            <p className="text-muted">
              Our exhibition hall and marketplace for Macedonian design and craft. A curated selection of
              handmade goods from local brands who share our vision of reviving artisanal traditions.
            </p>
          </div>
          <div className="border border-rule p-8 bg-cream-dark">
            <h2 className="text-2xl mb-3">Lab Re:store</h2>
            <p className="text-muted">
              A small market dedicated to repurposing and upcycling older fashion articles and accessories.
              Giving new life to pre-loved items.
            </p>
          </div>
        </div>

        <Divider />

        <section>
          <h2 className="text-2xl mb-8">Our Makers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {vendors.map((vendor: any) => (
              <Link
                key={vendor.id}
                href={`/market/${vendor.slug}`}
                className="group block border border-rule p-6 hover:border-ink transition-colors no-underline"
              >
                <div className="w-16 h-16 rounded-full bg-cream-dark halftone mb-4" />
                <h3 className="text-lg font-display group-hover:text-accent transition-colors">
                  {vendor.name}
                </h3>
                {vendor.craft && (
                  <p className="font-mono text-xs text-accent mt-1">{vendor.craft}</p>
                )}
                {vendor.bio && (
                  <p className="text-sm text-muted mt-2 line-clamp-2">{vendor.bio}</p>
                )}
              </Link>
            ))}
          </div>

          {vendors.length === 0 && (
            <p className="text-muted text-center py-16">Makers will appear here once content is seeded.</p>
          )}
        </section>

        <div className="mt-16 text-center">
          <Link
            href="/get-involved?subject=become-maker"
            className="inline-block font-mono text-xs tracking-wider uppercase bg-ink text-cream px-6 py-3 hover:bg-accent transition-colors no-underline"
          >
            Apply to sell / Join as a maker →
          </Link>
        </div>
      </div>
    </div>
  )
}
