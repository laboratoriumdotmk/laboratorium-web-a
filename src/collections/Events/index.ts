import type { CollectionConfig } from 'payload'
import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { slugField } from 'payload'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { revalidateDelete, revalidateEvent } from './hooks/revalidateEvent'

export const Events: CollectionConfig = {
  slug: 'events',
  labels: { singular: { mk: 'Настан', en: 'Event' }, plural: { mk: 'Настани', en: 'Events' } },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'type', 'startDateTime', 'space', '_status'],
    group: 'Content',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultPopulate: {
    title: true,
    slug: true,
    type: true,
    startDateTime: true,
    summary: true,
    featuredImage: true,
    space: true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      label: { mk: 'Наслов', en: 'Title' },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Details',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'type',
                  type: 'select',
                  required: true,
                  label: { mk: 'Тип', en: 'Type' },
                  options: [
                    { label: 'Workshop', value: 'workshop' },
                    { label: 'Concert', value: 'concert' },
                    { label: 'Exhibition', value: 'exhibition' },
                    { label: 'Screening', value: 'screening' },
                    { label: 'Seminar', value: 'seminar' },
                    { label: 'Party', value: 'party' },
                    { label: 'Other', value: 'other' },
                  ],
                  admin: { width: '33%' },
                },
                {
                  name: 'startDateTime',
                  type: 'date',
                  required: true,
                  label: { mk: 'Почеток', en: 'Start Date & Time' },
                  admin: {
                    date: { pickerAppearance: 'dayAndTime' },
                    width: '33%',
                  },
                },
                {
                  name: 'endDateTime',
                  type: 'date',
                  label: { mk: 'Крај', en: 'End Date & Time' },
                  admin: {
                    date: { pickerAppearance: 'dayAndTime' },
                    width: '33%',
                  },
                },
              ],
            },
            {
              name: 'space',
              type: 'relationship',
              relationTo: 'spaces',
              label: { mk: 'Простор', en: 'Space' },
            },
            {
              name: 'summary',
              type: 'textarea',
              localized: true,
              label: { mk: 'Краток опис', en: 'Summary' },
              admin: { description: 'Short description for cards and listings' },
            },
            {
              name: 'body',
              type: 'richText',
              localized: true,
              label: { mk: 'Содржина', en: 'Body' },
              editor: lexicalEditor({
                features: ({ rootFeatures }) => [
                  ...rootFeatures,
                  HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
                  FixedToolbarFeature(),
                  InlineToolbarFeature(),
                ],
              }),
            },
            {
              name: 'featuredImage',
              type: 'upload',
              relationTo: 'media',
              label: { mk: 'Слика', en: 'Featured Image' },
            },
            {
              name: 'partners',
              type: 'array',
              label: { mk: 'Партнери', en: 'Partners' },
              fields: [{ name: 'name', type: 'text', required: true }],
            },
            {
              name: 'ticketUrl',
              type: 'text',
              label: { mk: 'Линк за билети', en: 'Ticket URL' },
              admin: { description: 'External link for tickets/RSVP' },
            },
          ],
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({ hasGenerateFn: true }),
            MetaImageField({ relationTo: 'media' }),
            MetaDescriptionField({}),
            PreviewField({
              hasGenerateFn: true,
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: { mk: 'Истакнат', en: 'Featured' },
      admin: { position: 'sidebar' },
    },
    {
      name: 'eventStatus',
      type: 'select',
      options: [
        { label: 'Upcoming', value: 'upcoming' },
        { label: 'Past', value: 'past' },
      ],
      admin: {
        position: 'sidebar',
        readOnly: true,
        description: 'Automatically computed from start date',
      },
      hooks: {
        beforeChange: [
          ({ siblingData }) => {
            const start = siblingData?.startDateTime
            if (!start) return 'upcoming'
            return new Date(start) > new Date() ? 'upcoming' : 'past'
          },
        ],
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: { position: 'sidebar' },
    },
    slugField(),
  ],
  hooks: {
    afterChange: [revalidateEvent],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: { autosave: { interval: 100 }, schedulePublish: true },
    maxPerDoc: 50,
  },
}
