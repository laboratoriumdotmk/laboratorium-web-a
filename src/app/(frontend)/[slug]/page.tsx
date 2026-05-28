import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { generateMeta } from '@/utilities/generateMeta'
import { draftMode } from 'next/headers'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { cache } from 'react'
import { getLocale } from '@/utilities/getLocale'

export const revalidate = 600

const reservedSlugs = ['spaces', 'programs', 'projects', 'market', 'news', 'contact', 'get-involved']

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const pages = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1000,
    pagination: false,
    select: { slug: true },
  })
  return pages.docs
    .filter((doc) => doc.slug !== 'home' && !reservedSlugs.includes(doc.slug as string))
    .map(({ slug }) => ({ slug }))
}

type Args = { params: Promise<{ slug?: string }> }

const queryPageBySlug = cache(async (slug: string) => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    where: { slug: { equals: slug } },
  })
  return result.docs?.[0] || null
})

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug = 'home' } = await params
  const page = await queryPageBySlug(slug)
  return generateMeta({ doc: page })
}

export default async function Page({ params }: Args) {
  const locale = await getLocale()
  const { slug = 'home' } = await params
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'pages',
    locale,
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    where: { slug: { equals: slug } },
  })
  const page = result.docs?.[0] || null

  if (!page) notFound()

  return (
    <article className="py-16 md:py-24">
      {draft && <LivePreviewListener />}
      <div className="container">
        <h1 className="text-4xl md:text-5xl mb-12">{page.title}</h1>
        <RenderBlocks blocks={page.layout} />
      </div>
    </article>
  )
}
