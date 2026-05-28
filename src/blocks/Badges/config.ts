import type { Block } from 'payload'

export const Badges: Block = {
  slug: 'badges',
  labels: { singular: 'Badges', plural: 'Badges Blocks' },
  fields: [
    {
      name: 'heading',
      type: 'text',
      localized: true,
    },
    {
      name: 'badges',
      type: 'array',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'url', type: 'text' },
        { name: 'logo', type: 'upload', relationTo: 'media' },
      ],
    },
  ],
}
