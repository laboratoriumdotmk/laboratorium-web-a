import React from 'react'
import Link from 'next/link'
import { Motif } from '@/components/Motif'

export default function NotFound() {
  return (
    <div className="py-24 md:py-36 text-center">
      <div className="container">
        <Motif size="lg" className="mb-6" />
        <h1 className="text-6xl md:text-8xl font-display mb-4">404</h1>
        <p className="text-lg text-muted mb-8">This page doesn&apos;t exist.</p>
        <Link
          href="/"
          className="font-mono text-xs tracking-wider uppercase border border-ink px-6 py-3 hover:bg-ink hover:text-cream transition-colors"
        >
          Back to home →
        </Link>
      </div>
    </div>
  )
}
