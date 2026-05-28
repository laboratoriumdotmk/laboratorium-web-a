import type { Block } from 'payload'
import { link } from '@/fields/link'

export const CallToAction: Block = {
  slug: 'cta',
  labels: { singular: 'Call to Action', plural: 'CTAs' },
  fields: [
    {
      name: 'heading',
      type: 'text',
      localized: true,
      label: { mk: 'Наслов', en: 'Heading' },
    },
    {
      name: 'text',
      type: 'textarea',
      localized: true,
      label: { mk: 'Текст', en: 'Text' },
    },
    link({}),
  ],
}
