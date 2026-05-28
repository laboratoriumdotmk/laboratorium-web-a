import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: { mk: 'Поставки', en: 'Site Settings' },
  admin: { group: 'Settings' },
  access: { read: () => true },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'General',
          fields: [
            { name: 'siteName', type: 'text', defaultValue: 'Laboratorium', label: 'Site Name' },
            { name: 'logo', type: 'upload', relationTo: 'media', label: 'Logo' },
            { name: 'defaultOgImage', type: 'upload', relationTo: 'media', label: 'Default OG Image' },
          ],
        },
        {
          label: 'Contact',
          fields: [
            { name: 'contactEmail', type: 'email', defaultValue: 'contact@laboratorium.mk', label: 'Contact Email' },
            { name: 'phone', type: 'text', defaultValue: '+389 72 905 555', label: 'Phone' },
            { name: 'phoneAlt', type: 'text', defaultValue: '+389 2 314 2044', label: 'Alternative Phone' },
            { name: 'address', type: 'textarea', localized: true, label: { mk: 'Адреса', en: 'Address' } },
            { name: 'hours', type: 'text', localized: true, label: { mk: 'Работно време', en: 'Hours' } },
            { name: 'contactPerson', type: 'text', defaultValue: 'Kalina Dukovska', label: 'Contact Person' },
          ],
        },
        {
          label: 'Social',
          fields: [
            { name: 'instagram', type: 'text', defaultValue: 'https://instagram.com/lab.ratorium', label: 'Instagram' },
            { name: 'facebook', type: 'text', defaultValue: 'https://www.facebook.com/lab.rat.rium/', label: 'Facebook' },
            { name: 'linktree', type: 'text', defaultValue: 'https://linktr.ee/lab.ratorium', label: 'Linktree' },
          ],
        },
        {
          label: 'Recognition',
          fields: [
            {
              name: 'badges',
              type: 'array',
              label: 'Awards & Networks',
              admin: { description: 'Badges shown in the footer and about page' },
              fields: [
                { name: 'name', type: 'text', required: true },
                { name: 'url', type: 'text' },
                { name: 'logo', type: 'upload', relationTo: 'media' },
              ],
            },
          ],
        },
        {
          label: 'Footer',
          fields: [
            {
              name: 'footerText',
              type: 'textarea',
              localized: true,
              label: { mk: 'Текст во подножјето', en: 'Footer Text' },
            },
          ],
        },
      ],
    },
  ],
}
