import { defineField, defineType } from 'sanity'

export const heroSlide = defineType({
  name: 'heroSlide',
  title: 'Hero Slide',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Slide Background Image (Upload)',
      type: 'image',
      options: { hotspot: true },
      description: 'Upload a banner image directly from your computer',
    }),
    defineField({
      name: 'imageUrl',
      title: 'Or Slide Image URL',
      type: 'url',
      description: 'Paste an external high-res photo URL (e.g. Unsplash)',
    }),
    defineField({
      name: 'badge',
      title: 'Badge Text',
      type: 'string',
      description: 'Optional top tag, e.g. "🌴 God’s Own Country"',
    }),
    defineField({
      name: 'heading',
      title: 'Slide Heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Main title for this slide',
    }),
    defineField({
      name: 'description',
      title: 'Slide Description',
      type: 'text',
      rows: 2,
      description: 'Short subtitle or explanation',
    }),
  ],
})
