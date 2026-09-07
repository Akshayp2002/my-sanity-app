import { defineField, defineType } from 'sanity'

export const heroSection = defineType({
  name: 'heroSection',
  title: 'Hero Section',
  type: 'object',
  fields: [
    defineField({
      name: 'badgeText',
      title: 'Badge / Announcement Text',
      type: 'string',
    }),
    defineField({
      name: 'heading',
      title: 'Main Heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'highlightText',
      title: 'Highlighted Heading Phrase',
      type: 'string',
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading / Paragraph',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'heroImage',
      title: 'Upload Hero Banner Image (File Upload)',
      type: 'image',
      options: { hotspot: true },
      description: 'Upload a background banner image directly from your computer',
    }),
    defineField({
      name: 'backgroundImageUrl',
      title: 'Or Hero Background Image URL',
      type: 'url',
      description: 'Paste an external photo URL (e.g. Unsplash)',
    }),
    defineField({
      name: 'primaryCtaText',
      title: 'Primary Button Text',
      type: 'string',
    }),
    defineField({
      name: 'primaryCtaLink',
      title: 'Primary Button Link',
      type: 'string',
    }),
    defineField({
      name: 'secondaryCtaText',
      title: 'Secondary Button Text',
      type: 'string',
    }),
    defineField({
      name: 'secondaryCtaLink',
      title: 'Secondary Button Link',
      type: 'string',
    }),
  ],
})
