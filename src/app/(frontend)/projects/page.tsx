import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getLocale } from '@/utilities/getLocale'

export const revalidate = 600

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Ongoing initiatives and programs at Laboratorium — from music ensembles to creative writing.',
}

export default async function ProjectsPage() {
  const locale = await getLocale()
  let projects: any[] = []
  try {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'projects',
      locale,
      where: { _status: { equals: 'published' } },
      limit: 50,
    })
    projects = result.docs
  } catch {}

  return (
    <div className="py-16 md:py-24">
      <div className="container">
        <p className="font-mono text-xs tracking-wider uppercase text-muted mb-4">Projects</p>
        <h1 className="text-4xl md:text-5xl mb-6">
          Initiatives & <span className="text-accent">programs.</span>
        </h1>
        <p className="text-lg text-muted max-w-2xl mb-16">
          From music ensembles and creative writing to craft revival and community events — projects that make Laboratorium a living creative ecosystem.
        </p>

        <div className="space-y-8">
          {projects.map((project: any, i: number) => (
            <Link
              key={project.id}
              href={`/projects/${project.slug}`}
              className="group block border-t-2 border-ink pt-6 no-underline"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-display group-hover:text-accent transition-colors">
                    {project.title}
                  </h2>
                  {project.summary && (
                    <p className="text-muted mt-2 max-w-xl">{project.summary}</p>
                  )}
                </div>
                <span className="font-mono text-xs text-muted uppercase tracking-wider shrink-0 mt-1">
                  {project.projectStatus}
                </span>
              </div>
            </Link>
          ))}
        </div>

        {projects.length === 0 && (
          <p className="text-muted text-center py-16">Projects will appear here once content is seeded.</p>
        )}
      </div>
    </div>
  )
}
