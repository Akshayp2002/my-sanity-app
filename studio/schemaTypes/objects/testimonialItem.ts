import { defineField, defineType } from 'sanity'

export const testimonialItem = defineType({
  name: 'testimonialItem',
  title: 'Guest Testimonial Review',
  type: 'object',
  fields: [
    defineField({
      name: 'name',
      title: 'Guest Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'city',
      title: 'Guest City / Origin (e.g. Bangalore, Delhi)',
      type: 'string',
    }),
    defineField({
      name: 'packageTitle',
      title: 'Tour Package Taken',
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
  ],
})
