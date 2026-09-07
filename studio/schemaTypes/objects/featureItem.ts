import { defineField, defineType } from 'sanity'

export const featureItem = defineType({
  name: 'featureItem',
  title: 'Villa / Package Card',
  type: 'object',
  fields: [
    defineField({
      name: 'imageUrl',
      title: 'Image URL',
      type: 'url',
      description: 'High-res card image URL',
    }),
    defineField({
      name: 'title',
      title: 'Title / Suite Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tag',
      title: 'Tag / Category',
      type: 'string',
    }),
    defineField({
      name: 'location',
      title: 'Location / Region',
      type: 'string',
    }),
    defineField({
      name: 'price',
      title: 'Price Info',
      type: 'string',
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
    }),
  ],
})
