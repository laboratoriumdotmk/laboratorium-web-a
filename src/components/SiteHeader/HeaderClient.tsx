'use client'
import React, { useState } from 'react'
import { MutatingWordmark } from '@/components/MutatingWordmark'
import { LocaleToggle } from '@/components/LocaleToggle'
import { motion, AnimatePresence } from 'framer-motion'

type NavItem = {
  label: string
  url: string
  type: string
  newTab: boolean
  reference?: any
}

export const HeaderClient: React.FC<{ navItems: NavItem[]; locale: string }> = ({ navItems, locale }) => {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur-sm border-b border-rule">
      <div className="container flex items-center justify-between h-16">
        <MutatingWordmark className="text-lg" />

        <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
          {navItems.map((item, i) => {
            const href =
              item.type === 'reference' && item.reference?.value?.slug
                ? `/${item.reference.value.slug}`
                : item.url
            return (
              <a
                key={i}
                href={href}
                className="font-mono text-xs tracking-wider uppercase text-ink hover:text-accent transition-colors"
                {...(item.newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                {item.label}
              </a>
            )
          })}
          <LocaleToggle currentLocale={locale} />
        </nav>

        <button
          className="md:hidden font-mono text-xs"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? '✕' : '☰'}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-rule overflow-hidden"
            aria-label="Mobile navigation"
          >
            <div className="container py-4 flex flex-col gap-3">
              {navItems.map((item, i) => {
                const href =
                  item.type === 'reference' && item.reference?.value?.slug
                    ? `/${item.reference.value.slug}`
                    : item.url
                return (
                  <a
                    key={i}
                    href={href}
                    className="font-mono text-sm tracking-wider uppercase text-ink hover:text-accent py-1"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </a>
                )
              })}
              <div className="pt-2">
                <LocaleToggle currentLocale={locale} />
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
