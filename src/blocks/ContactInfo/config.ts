import type { Block } from 'payload'

export const ContactInfo: Block = {
  slug: 'contactInfo',
  labels: { singular: 'Contact Info', plural: 'Contact Info Blocks' },
  fields: [
    {
      name: 'showMap',
      type: 'checkbox',
      defaultValue: true,
      label: 'Show Google Map',
    },
    {
      name: 'showForm',
      type: 'checkbox',
      defaultValue: true,
      label: 'Show Contact Form',
    },
    {
      name: 'heading',
      type: 'text',
      localized: true,
    },
  ],
}
