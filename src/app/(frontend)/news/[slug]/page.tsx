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
  const posts = await payload.find({
    collection: 'posts',
    draft: false,
    limit: 1000,
    pagination: false,
    select: { slug: true },
  })
  return posts.docs.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'posts',
    where: { slug: { equals: slug } },
    limit: 1,
  })
  const post = result.docs[0]
  if (!post) return {}
  return { title: post.title, description: post.excerpt || undefined }
}

export default async function PostPage({ params }: Args) {
  const locale = await getLocale()
  const { slug } = await params
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'posts',
    locale,
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,
  })
  const post = result.docs[0]
  if (!post) notFound()

  return (
    <div className="py-16 md:py-24">
      <div className="container max-w-3xl">
        <Link href="/news" className="font-mono text-xs tracking-wider uppercase text-muted hover:text-accent mb-8 block">
          ← All News
        </Link>

        <div className="mb-4 flex items-center gap-4">
          {post.category && (
            <span className="font-mono text-xs text-accent uppercase tracking-wider">{post.category}</span>
          )}
          {post.publishedAt && (
            <time className="font-mono text-xs text-muted" dateTime={post.publishedAt}>
              {new Date(post.publishedAt).toLocaleDateString('mk-MK', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </time>
          )}
        </div>

        <h1 className="text-3xl md:text-5xl mb-8">{post.title}</h1>

        {post.excerpt && (
          <p className="text-lg text-muted mb-12 leading-relaxed border-l-2 border-accent pl-4">
            {post.excerpt}
          </p>
        )}

        {post.body && (
          <div className="prose prose-lg max-w-none">
            <RichText data={post.body} />
          </div>
        )}
      </div>
    </div>
  )
}
