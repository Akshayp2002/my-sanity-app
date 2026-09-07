import { defineField, defineType } from 'sanity'

export const experience = defineType({
  name: 'experience',
  title: 'Kerala Experience',
  type: 'document',
  fields: [
    defineField({
      name: 'icon',
      title: 'Emoji Icon or Symbol (e.g. ⛵, 🌿, 🧘‍♂️)',
      type: 'string',
      initialValue: '🌴',
    }),
    defineField({
      name: 'title',
      title: 'Experience Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Experience Description',
      type: 'text',
      rows: 3,
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
