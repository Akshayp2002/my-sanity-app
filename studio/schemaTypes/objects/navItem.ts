import { defineField, defineType } from 'sanity'

export const navItem = defineType({
  name: 'navItem',
  title: 'Navigation Item',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'link',
      title: 'Link URL',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
  ],
})
