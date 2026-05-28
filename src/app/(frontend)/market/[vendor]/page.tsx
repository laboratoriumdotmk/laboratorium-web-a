import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getLocale } from '@/utilities/getLocale'

export const revalidate = 600

type Args = { params: Promise<{ vendor: string }> }

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const vendors = await payload.find({
    collection: 'vendors',
    draft: false,
    limit: 1000,
    pagination: false,
    select: { slug: true },
  })
  return vendors.docs.map(({ slug }) => ({ vendor: slug }))
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { vendor: slug } = await params
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'vendors',
    where: { slug: { equals: slug } },
    limit: 1,
  })
  const vendor = result.docs[0]
  if (!vendor) return {}
  return { title: `${vendor.name} — Lab Design Market`, description: vendor.bio || undefined }
}

export default async function VendorPage({ params }: Args) {
  const locale = await getLocale()
  const { vendor: slug } = await params
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'vendors',
    locale,
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 1,
  })
  const vendor = result.docs[0]
  if (!vendor) notFound()

  const socials = vendor.socials as any

  return (
    <div className="py-16 md:py-24">
      <div className="container max-w-3xl">
        <Link href="/market" className="font-mono text-xs tracking-wider uppercase text-muted hover:text-accent mb-8 block">
          ← Lab Design Market
        </Link>

        <div className="flex items-start gap-6 mb-8">
          <div className="w-24 h-24 rounded-full bg-cream-dark halftone shrink-0" />
          <div>
            <h1 className="text-3xl md:text-4xl">{vendor.name}</h1>
            {vendor.craft && (
              <p className="font-mono text-sm text-accent mt-1">{vendor.craft}</p>
            )}
          </div>
        </div>

        {vendor.bio && (
          <p className="text-lg text-muted leading-relaxed mb-8">{vendor.bio}</p>
        )}

        {(socials?.instagram || socials?.facebook || socials?.website) && (
          <div className="border-t border-rule pt-6">
            <p className="font-mono text-xs tracking-wider uppercase text-muted mb-3">Links</p>
            <div className="flex flex-wrap gap-4">
              {socials.instagram && (
                <a href={socials.instagram} target="_blank" rel="noopener noreferrer" className="text-sm hover:text-accent">Instagram</a>
              )}
              {socials.facebook && (
                <a href={socials.facebook} target="_blank" rel="noopener noreferrer" className="text-sm hover:text-accent">Facebook</a>
              )}
              {socials.website && (
                <a href={socials.website} target="_blank" rel="noopener noreferrer" className="text-sm hover:text-accent">Website</a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
