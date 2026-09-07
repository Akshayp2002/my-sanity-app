import { defineField, defineType } from 'sanity'

export const itineraryDay = defineType({
  name: 'itineraryDay',
  title: 'Itinerary Day',
  type: 'object',
  fields: [
    defineField({
      name: 'day',
      title: 'Day Number (e.g. Day 1)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Day Title / Plan',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Detailed Activities',
      type: 'text',
      rows: 3,
    }),
  ],
})
