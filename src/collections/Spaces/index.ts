import type { CollectionConfig } from 'payload'
import { authenticated } from '../../access/authenticated'
import { anyone } from '../../access/anyone'
import { slugField } from 'payload'

export const Spaces: CollectionConfig = {
  slug: 'spaces',
  labels: { singular: { mk: 'Простор', en: 'Space' }, plural: { mk: 'Простори', en: 'Spaces' } },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'sizeSqm', 'rentable'],
    group: 'Content',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  defaultPopulate: {
    name: true,
    slug: true,
    sizeSqm: true,
    use: true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      localized: true,
      label: { mk: 'Име', en: 'Name' },
    },
    {
      name: 'sizeSqm',
      type: 'number',
      label: { mk: 'Површина (m²)', en: 'Size (m²)' },
    },
    {
      name: 'capacity',
      type: 'number',
      label: { mk: 'Капацитет', en: 'Capacity' },
    },
    {
      name: 'use',
      type: 'textarea',
      localized: true,
      label: { mk: 'Намена', en: 'Use / Description' },
      admin: { description: 'Short description of what this space is used for' },
    },
    {
      name: 'images',
      type: 'array',
      label: { mk: 'Слики', en: 'Images' },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'rentable',
      type: 'checkbox',
      label: { mk: 'Може да се изнајми', en: 'Available for Rent' },
      defaultValue: false,
    },
    slugField('name'),
  ],
}
