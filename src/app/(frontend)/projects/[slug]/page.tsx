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
  const projects = await payload.find({
    collection: 'projects',
    draft: false,
    limit: 1000,
    pagination: false,
    select: { slug: true },
  })
  return projects.docs.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'projects',
    where: { slug: { equals: slug } },
    limit: 1,
  })
  const project = result.docs[0]
  if (!project) return {}
  return { title: project.title, description: project.summary || undefined }
}

export default async function ProjectPage({ params }: Args) {
  const locale = await getLocale()
  const { slug } = await params
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'projects',
    locale,
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,
  })
  const project = result.docs[0]
  if (!project) notFound()

  return (
    <div className="py-16 md:py-24">
      <div className="container max-w-3xl">
        <Link href="/projects" className="font-mono text-xs tracking-wider uppercase text-muted hover:text-accent mb-8 block">
          ← All Projects
        </Link>

        <span className="font-mono text-xs text-accent uppercase tracking-wider">{project.projectStatus}</span>
        <h1 className="text-3xl md:text-5xl mt-2 mb-6">{project.title}</h1>

        {project.summary && (
          <p className="text-lg text-muted mb-8 leading-relaxed">{project.summary}</p>
        )}

        {project.collaborators && project.collaborators.length > 0 && (
          <div className="mb-8">
            <p className="font-mono text-xs tracking-wider uppercase text-muted mb-2">Collaborators</p>
            <div className="flex flex-wrap gap-2">
              {project.collaborators.map((c: any, i: number) => (
                <span key={i} className="text-sm border border-rule px-2 py-1">{c.name}</span>
              ))}
            </div>
          </div>
        )}

        {project.body && (
          <div className="prose prose-lg max-w-none">
            <RichText data={project.body} />
          </div>
        )}
      </div>
    </div>
  )
}
