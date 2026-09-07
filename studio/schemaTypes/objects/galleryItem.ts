import { defineField, defineType } from 'sanity'

export const galleryItem = defineType({
  name: 'galleryItem',
  title: 'Gallery Image Item',
  type: 'object',
  fields: [
    defineField({
      name: 'imageUrl',
      title: 'Image URL',
      type: 'url',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'caption',
      title: 'Caption / Title',
      type: 'string',
    }),
    defineField({
      name: 'category',
      title: 'Category Tag',
      type: 'string',
      description: 'e.g. Dining, Spa, Beach, Yacht',
    }),
  ],
})
