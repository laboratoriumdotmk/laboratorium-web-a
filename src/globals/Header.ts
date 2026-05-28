import type { GlobalConfig } from 'payload'
import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'

export const Header: GlobalConfig = {
  slug: 'header',
  label: { mk: 'Заглавие', en: 'Header' },
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
          RowLabel: '@/globals/hooks/HeaderRowLabel#HeaderRowLabel',
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
