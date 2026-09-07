import { defineField, defineType } from 'sanity'

export const destination = defineType({
  name: 'destination',
  title: 'Top Kerala Destination',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Destination Name (e.g. Munnar, Alleppey, Wayanad)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tag',
      title: 'Short Tag (e.g. Tea Hills, Houseboats, Rainforest)',
      type: 'string',
    }),
    defineField({
      name: 'link',
      title: 'Package Link (e.g. /packages/munnar-tea-hills)',
      type: 'string',
      validation: (Rule) => Rule.required(),
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
