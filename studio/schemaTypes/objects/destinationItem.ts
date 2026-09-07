import { defineField, defineType } from 'sanity'

export const destinationItem = defineType({
  name: 'destinationItem',
  title: 'Top Destination Item',
  type: 'object',
  fields: [
    defineField({
      name: 'name',
      title: 'Destination Name (e.g. Munnar)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tag',
      title: 'Short Tag (e.g. Tea Hills)',
      type: 'string',
    }),
    defineField({
      name: 'link',
      title: 'Link URL (e.g. /packages/munnar-tea-hills)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
  ],
})
