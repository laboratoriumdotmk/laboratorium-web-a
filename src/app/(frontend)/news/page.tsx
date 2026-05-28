import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getLocale } from '@/utilities/getLocale'

export const revalidate = 600

export const metadata: Metadata = {
  title: 'News',
  description: 'Latest news and updates from Laboratorium.',
}

export default async function NewsPage() {
  const locale = await getLocale()
  let posts: any[] = []
  try {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'posts',
      locale,
      where: { _status: { equals: 'published' } },
      sort: '-publishedAt',
      limit: 50,
    })
    posts = result.docs
  } catch {}

  return (
    <div className="py-16 md:py-24">
      <div className="container max-w-3xl">
        <p className="font-mono text-xs tracking-wider uppercase text-muted mb-4">News / Journal</p>
        <h1 className="text-4xl md:text-5xl mb-16">
          What&apos;s <span className="text-accent">happening.</span>
        </h1>

        <div className="space-y-0">
          {posts.map((post: any) => (
            <Link
              key={post.id}
              href={`/news/${post.slug}`}
              className="group block border-t border-rule py-8 no-underline"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl md:text-2xl font-display group-hover:text-accent transition-colors">
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p className="text-muted mt-2 line-clamp-2">{post.excerpt}</p>
                  )}
                </div>
                <time className="font-mono text-xs text-muted shrink-0 mt-1">
                  {post.publishedAt
                    ? new Date(post.publishedAt).toLocaleDateString('mk-MK', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })
                    : ''}
                </time>
              </div>
              {post.category && (
                <span className="font-mono text-xs text-accent uppercase tracking-wider mt-2 inline-block">
                  {post.category}
                </span>
              )}
            </Link>
          ))}
        </div>

        {posts.length === 0 && (
          <p className="text-muted text-center py-16">News posts will appear here once content is seeded.</p>
        )}
      </div>
    </div>
  )
}
