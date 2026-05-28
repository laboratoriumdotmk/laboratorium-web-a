'use client'
import React, { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { setLocale } from '@/actions/setLocale'

export const LocaleToggle: React.FC<{ currentLocale: string }> = ({ currentLocale }) => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const toggle = () => {
    const newLocale = currentLocale === 'mk' ? 'en' : 'mk'
    startTransition(async () => {
      await setLocale(newLocale as 'mk' | 'en')
      router.refresh()
    })
  }

  return (
    <button
      onClick={toggle}
      disabled={isPending}
      className="font-mono text-xs tracking-wider uppercase border border-rule px-2 py-1 hover:bg-ink hover:text-cream transition-colors disabled:opacity-50"
      aria-label={`Switch to ${currentLocale === 'mk' ? 'English' : 'Македонски'}`}
    >
      {isPending ? '...' : currentLocale === 'mk' ? 'EN' : 'МК'}
    </button>
  )
}
