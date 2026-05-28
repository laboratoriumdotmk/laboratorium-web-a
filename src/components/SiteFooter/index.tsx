import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { Motif } from '@/components/Motif'
import { getLocale } from '@/utilities/getLocale'

export const SiteFooter: React.FC = async () => {
  const locale = await getLocale()
  let settings: any = {}
  let footer: any = {}
  try {
    const payload = await getPayload({ config: configPromise })
    ;[settings, footer] = await Promise.all([
      payload.findGlobal({ slug: 'site-settings', locale }),
      payload.findGlobal({ slug: 'footer', locale }),
    ])
  } catch {
    // DB may not be initialized yet
  }

  return (
    <footer className="bg-ink text-cream mt-auto">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="font-display text-2xl mb-4">Laboratorium</h3>
            <p className="text-cream/70 text-sm font-mono leading-relaxed">
              Едукативен Културен Центар
              <br />
              Educational Cultural Center
            </p>
            <div className="mt-4 flex gap-3">
              <Motif size="lg" />
            </div>
          </div>

          <div>
            <h4 className="font-mono text-xs tracking-wider uppercase text-cream/50 mb-4">
              Contact
            </h4>
            <div className="text-sm space-y-2 text-cream/80">
              <p>{settings?.address || 'Blvd. Kliment Ohridski 68, 1000 Skopje'}</p>
              <p>
                <a href={`mailto:${settings?.contactEmail || 'contact@laboratorium.mk'}`} className="text-cream/80 hover:text-accent">
                  {settings?.contactEmail || 'contact@laboratorium.mk'}
                </a>
              </p>
              <p>
                <a href={`tel:${settings?.phone || '+38972905555'}`} className="text-cream/80 hover:text-accent">
                  {settings?.phone || '+389 72 905 555'}
                </a>
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-mono text-xs tracking-wider uppercase text-cream/50 mb-4">
              Follow
            </h4>
            <div className="text-sm space-y-2">
              {settings?.instagram && (
                <a href={settings.instagram} target="_blank" rel="noopener noreferrer" className="block text-cream/80 hover:text-accent">
                  Instagram
                </a>
              )}
              {settings?.facebook && (
                <a href={settings.facebook} target="_blank" rel="noopener noreferrer" className="block text-cream/80 hover:text-accent">
                  Facebook
                </a>
              )}
              {settings?.linktree && (
                <a href={settings.linktree} target="_blank" rel="noopener noreferrer" className="block text-cream/80 hover:text-accent">
                  Linktree
                </a>
              )}
            </div>

            {settings?.badges && settings.badges.length > 0 && (
              <div className="mt-6">
                <h4 className="font-mono text-xs tracking-wider uppercase text-cream/50 mb-3">
                  Networks & Recognition
                </h4>
                <div className="flex flex-wrap gap-2">
                  {settings.badges.map((badge: any, i: number) => (
                    <span key={i} className="text-xs font-mono text-cream/60 border border-cream/20 px-2 py-1">
                      {badge.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-cream/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-cream/40 font-mono">
            &copy; {new Date().getFullYear()} Laboratorium. {settings?.footerText || ''}
          </p>
          <p className="text-xs text-cream/30 font-mono">
            {'"Laboratorium represents what Skopje has the potential to be."'}
          </p>
        </div>
      </div>
    </footer>
  )
}
