import type { Block } from 'payload'

export const Pillars: Block = {
  slug: 'pillars',
  labels: { singular: 'Pillars', plural: 'Pillars Blocks' },
  fields: [
    {
      name: 'heading',
      type: 'text',
      localized: true,
      label: { mk: 'Наслов', en: 'Heading' },
    },
    {
      name: 'pillars',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 6,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          localized: true,
          label: { mk: 'Наслов', en: 'Title' },
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          localized: true,
          label: { mk: 'Опис', en: 'Description' },
        },
        {
          name: 'icon',
          type: 'text',
          admin: { description: 'Emoji or symbol for this pillar (e.g. ⚗ ✶ ◉)' },
        },
      ],
    },
  ],
}
