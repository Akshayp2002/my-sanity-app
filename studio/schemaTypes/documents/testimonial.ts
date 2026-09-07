import { defineField, defineType } from 'sanity'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Guest Testimonial Review',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Guest Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'city',
      title: 'Guest City / Origin (e.g. Bangalore, Delhi, Mumbai)',
      type: 'string',
    }),
    defineField({
      name: 'packageTitle',
      title: 'Tour Package Taken (e.g. Munnar & Alleppey Honeymoon Special)',
      type: 'string',
    }),
    defineField({
      name: 'review',
      title: 'Review Text',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'rating',
      title: 'Rating Text (e.g. 5.0 ★★★★★)',
      type: 'string',
      initialValue: '5.0 ★★★★★',
    }),
    defineField({
      name: 'avatar',
      title: 'Emoji Avatar or Symbol (e.g. 👨‍👩‍👧, 👨‍👩‍👦‍👦, 👩‍🌾)',
      type: 'string',
      initialValue: '👤',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
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
