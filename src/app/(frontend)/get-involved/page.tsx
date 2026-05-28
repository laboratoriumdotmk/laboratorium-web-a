import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { ContactForm } from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'Get Involved',
  description: 'Join the Laboratorium community — volunteer, partner, host events, or become a maker.',
}

const paths = [
  {
    title: 'Volunteer',
    subject: 'volunteer',
    desc: 'Help us run events, maintain spaces, and build community. We welcome people from all backgrounds and skills.',
  },
  {
    title: 'Become a Partner',
    subject: 'partner',
    desc: 'Join 80+ organizations who partner with us on cultural and educational initiatives across Skopje.',
  },
  {
    title: 'Host an Event',
    subject: 'host-event',
    desc: 'Have an idea for a workshop, screening, concert, or exhibition? Our spaces are open for community-driven events.',
  },
  {
    title: 'Artist Residency',
    subject: 'residency',
    desc: 'Apply for a residency at Laboratorium. Work in our spaces, collaborate with local artists, and show your work.',
  },
  {
    title: 'Join as a Maker',
    subject: 'become-maker',
    desc: 'Sell your handmade goods at Lab Design Market. We support Macedonian designers and craftspeople.',
  },
  {
    title: 'Support / Donate',
    subject: 'support',
    desc: 'Help us keep Laboratorium free and accessible. Every contribution supports the creative community.',
  },
]

export default function GetInvolvedPage() {
  return (
    <div className="py-16 md:py-24">
      <div className="container">
        <p className="font-mono text-xs tracking-wider uppercase text-muted mb-4">Get Involved</p>
        <h1 className="text-4xl md:text-5xl mb-6">
          Join the <span className="text-accent">community.</span>
        </h1>
        <p className="text-lg text-muted max-w-2xl mb-16">
          There are many ways to be part of Laboratorium. Whether you&apos;re an artist, organizer, craftsperson, or just someone who wants to help — there&apos;s a place for you.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {paths.map((path) => (
            <div key={path.subject} className="border border-rule p-6">
              <h2 className="text-xl font-display mb-3">{path.title}</h2>
              <p className="text-sm text-muted mb-4">{path.desc}</p>
              <Link
                href={`#form?subject=${path.subject}`}
                className="font-mono text-xs tracking-wider uppercase text-accent hover:text-ink"
              >
                Get in touch →
              </Link>
            </div>
          ))}
        </div>

        <div id="form" className="max-w-xl mx-auto">
          <h2 className="text-2xl mb-6 text-center">Tell us how you&apos;d like to contribute</h2>
          <ContactForm />
        </div>
      </div>
    </div>
  )
}
