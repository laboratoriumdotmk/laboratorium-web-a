import type { GlobalConfig } from 'payload'
import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: { mk: 'Подножје', en: 'Footer' },
  admin: { group: 'Settings' },
  access: { read: () => true },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      label: { mk: 'Навигација', en: 'Nav Items' },
      fields: [
        link({ appearances: false }),
      ],
      maxRows: 10,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/globals/hooks/FooterRowLabel#FooterRowLabel',
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
