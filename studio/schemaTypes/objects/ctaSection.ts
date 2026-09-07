import { defineField, defineType } from 'sanity'

export const ctaSection = defineType({
  name: 'ctaSection',
  title: 'Call To Action Section',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'CTA Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'CTA Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'buttonText',
      title: 'Button Text',
      type: 'string',
    }),
    defineField({
      name: 'buttonLink',
      title: 'Button Link',
      type: 'string',
    }),
  ],
})
