import { defineField, defineType } from 'sanity'

export const experienceItem = defineType({
  name: 'experienceItem',
  title: 'Kerala Experience Item',
  type: 'object',
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
  ],
})
