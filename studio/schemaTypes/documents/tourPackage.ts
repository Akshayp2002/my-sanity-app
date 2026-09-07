import { defineArrayMember, defineField, defineType } from 'sanity'

export const tourPackage = defineType({
  name: 'tourPackage',
  title: 'Kerala Tour Package',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Package Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'duration',
      title: 'Duration (e.g. 3 Days / 2 Nights)',
      type: 'string',
    }),
    defineField({
      name: 'location',
      title: 'Destination / Region (e.g. Munnar, Alleppey, Wayanad)',
      type: 'string',
    }),
    defineField({
      name: 'price',
      title: 'Starting Price (e.g. ₹8,500 / person)',
      type: 'string',
    }),
    defineField({
      name: 'imageUrl',
      title: 'Package Banner Image URL',
      type: 'url',
    }),
    defineField({
      name: 'highlights',
      title: 'Package Highlights',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({
      name: 'description',
      title: 'Overview Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'itinerary',
      title: 'Day-by-Day Itinerary',
      type: 'array',
      of: [defineArrayMember({ type: 'itineraryDay' })],
    }),
    defineField({
      name: 'inclusions',
      title: 'Inclusions',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({
      name: 'exclusions',
      title: 'Exclusions',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
    }),
  ],
})
