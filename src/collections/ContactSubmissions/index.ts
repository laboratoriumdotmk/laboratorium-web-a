import type { CollectionConfig } from 'payload'
import { authenticated } from '../../access/authenticated'

export const ContactSubmissions: CollectionConfig = {
  slug: 'contact-submissions',
  labels: {
    singular: { mk: 'Порака', en: 'Submission' },
    plural: { mk: 'Пораки', en: 'Submissions' },
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'subject', 'read', 'createdAt'],
    group: 'Settings',
  },
  access: {
    create: () => true,
    read: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: { mk: 'Име', en: 'Name' },
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      label: 'Email',
    },
    {
      name: 'subject',
      type: 'select',
      required: true,
      label: { mk: 'Тема', en: 'Subject' },
      options: [
        { label: 'General', value: 'general' },
        { label: 'Rent a space', value: 'rent' },
        { label: 'Volunteer', value: 'volunteer' },
        { label: 'Partner', value: 'partner' },
        { label: 'Host an event', value: 'host-event' },
        { label: 'Artist Residency', value: 'residency' },
        { label: 'Become a maker', value: 'become-maker' },
        { label: 'Support', value: 'support' },
      ],
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
      label: { mk: 'Порака', en: 'Message' },
    },
    {
      name: 'read',
      type: 'checkbox',
      defaultValue: false,
      label: { mk: 'Прочитано', en: 'Read' },
      admin: { position: 'sidebar' },
    },
  ],
  hooks: {
    afterChange: [
      async ({ doc, operation, req }) => {
        if (operation === 'create' && req.payload.email) {
          const contactEmail = process.env.CONTACT_EMAIL || 'contact@laboratorium.mk'
          try {
            await req.payload.sendEmail({
              to: contactEmail,
              subject: `New contact form submission: ${doc.subject}`,
              text: `Name: ${doc.name}\nEmail: ${doc.email}\nSubject: ${doc.subject}\n\nMessage:\n${doc.message}`,
            })
          } catch (err) {
            req.payload.logger.error('Failed to send contact notification email')
          }
        }
      },
    ],
  },
}
