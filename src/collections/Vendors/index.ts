import type { CollectionConfig } from 'payload'
import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { slugField } from 'payload'

export const Vendors: CollectionConfig = {
  slug: 'vendors',
  labels: {
    singular: { mk: 'Мајстор', en: 'Maker' },
    plural: { mk: 'Мајстори', en: 'Makers' },
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'craft', 'joinedDate', '_status'],
    group: 'Content',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultPopulate: {
    name: true,
    slug: true,
    craft: true,
    photo: true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: { mk: 'Име', en: 'Name' },
    },
    {
      name: 'craft',
      type: 'text',
      localized: true,
      label: { mk: 'Занает', en: 'Craft' },
    },
    {
      name: 'bio',
      type: 'textarea',
      localized: true,
      label: { mk: 'Биографија', en: 'Bio' },
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      label: { mk: 'Фотографија', en: 'Photo' },
    },
    {
      name: 'socials',
      type: 'group',
      label: { mk: 'Социјални мрежи', en: 'Social Links' },
      fields: [
        { name: 'instagram', type: 'text', label: 'Instagram URL' },
        { name: 'facebook', type: 'text', label: 'Facebook URL' },
        { name: 'website', type: 'text', label: 'Website URL' },
      ],
    },
    {
      name: 'joinedDate',
      type: 'date',
      label: { mk: 'Датум на приклучување', en: 'Joined Date' },
      admin: { position: 'sidebar' },
    },
    slugField('name'),
  ],
  versions: {
    drafts: { schedulePublish: true },
    maxPerDoc: 20,
  },
}
