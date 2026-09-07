import { defineField, defineType } from 'sanity'

export const heroSlide = defineType({
  name: 'heroSlide',
  title: 'Hero Carousel Slide',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Internal Admin Title (e.g. Slide 1 - Alleppey)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'badge',
      title: 'Badge Tag (e.g. 🌴 God’s Own Country • Alleppey Backwaters)',
      type: 'string',
    }),
    defineField({
      name: 'heading',
      title: 'Slide Heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Slide Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'imageUrl',
      title: 'Background Image URL',
      type: 'url',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Display Order (e.g. 1, 2, 3)',
      type: 'number',
      initialValue: 1,
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
})
