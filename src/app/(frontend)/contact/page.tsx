import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import type { Metadata } from 'next'
import { ContactForm } from '@/components/ContactForm'
import { getLocale } from '@/utilities/getLocale'

export const revalidate = 600

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Laboratorium — visit us at Blvd. Kliment Ohridski 68, Skopje.',
}

export default async function ContactPage() {
  const locale = await getLocale()
  let settings: any = {}
  try {
    const payload = await getPayload({ config: configPromise })
    settings = await payload.findGlobal({ slug: 'site-settings', locale })
  } catch {}

  return (
    <div className="py-16 md:py-24">
      <div className="container">
        <p className="font-mono text-xs tracking-wider uppercase text-muted mb-4">Contact</p>
        <h1 className="text-4xl md:text-5xl mb-16">
          Get in <span className="text-accent">touch.</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <div className="space-y-8 mb-12">
              <div>
                <h3 className="font-mono text-xs tracking-wider uppercase text-muted mb-2">Address</h3>
                <p>{settings?.address || 'Blvd. Kliment Ohridski 68, 1000 Skopje, North Macedonia'}</p>
                <p className="text-sm text-muted mt-1">
                  (entrance: 12-та Македонска Ударна бригада бр. 2А)
                </p>
              </div>

              <div>
                <h3 className="font-mono text-xs tracking-wider uppercase text-muted mb-2">Email</h3>
                <a href={`mailto:${settings?.contactEmail || 'contact@laboratorium.mk'}`}>
                  {settings?.contactEmail || 'contact@laboratorium.mk'}
                </a>
              </div>

              <div>
                <h3 className="font-mono text-xs tracking-wider uppercase text-muted mb-2">Phone</h3>
                <p>{settings?.phone || '+389 72 905 555'}</p>
                {settings?.phoneAlt && <p className="text-sm text-muted">{settings.phoneAlt}</p>}
              </div>

              <div>
                <h3 className="font-mono text-xs tracking-wider uppercase text-muted mb-2">Hours</h3>
                <p>{settings?.hours || 'Mon–Sun (see events for specific times)'}</p>
              </div>

              <div>
                <h3 className="font-mono text-xs tracking-wider uppercase text-muted mb-2">Contact Person</h3>
                <p>{settings?.contactPerson || 'Kalina Dukovska'}</p>
              </div>

              <div className="flex gap-4">
                {settings?.instagram && (
                  <a href={settings.instagram} target="_blank" rel="noopener noreferrer" className="text-sm hover:text-accent">Instagram</a>
                )}
                {settings?.facebook && (
                  <a href={settings.facebook} target="_blank" rel="noopener noreferrer" className="text-sm hover:text-accent">Facebook</a>
                )}
                {settings?.linktree && (
                  <a href={settings.linktree} target="_blank" rel="noopener noreferrer" className="text-sm hover:text-accent">Linktree</a>
                )}
              </div>
            </div>

            {/* Map */}
            <div className="aspect-[4/3] bg-cream-dark border border-rule overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2965.123!2d21.431!3d41.997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sBlvd.+Kliment+Ohridski+68%2C+Skopje!5e0!3m2!1smk!2smk!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Laboratorium location"
              />
            </div>
          </div>

          <div>
            <h2 className="text-2xl mb-6">Send us a message</h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  )
}
