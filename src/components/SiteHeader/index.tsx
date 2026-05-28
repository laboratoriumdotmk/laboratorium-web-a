import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { HeaderClient } from './HeaderClient'
import { getLocale } from '@/utilities/getLocale'

export const SiteHeader: React.FC = async () => {
  const locale = await getLocale()
  let header: any = { navItems: [] }
  try {
    const payload = await getPayload({ config: configPromise })
    header = await payload.findGlobal({ slug: 'header', locale })
  } catch {}

  const navItems = (header?.navItems || []).map((item: any) => ({
    label: item.link?.label || '',
    url: item.link?.url || '',
    type: item.link?.type || 'custom',
    newTab: item.link?.newTab || false,
    reference: item.link?.reference,
  }))

  return <HeaderClient navItems={navItems} locale={locale} />
}
