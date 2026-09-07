import { defineArrayMember, defineField, defineType } from 'sanity'

export const landingPage = defineType({
  name: 'landingPage',
  title: 'Kerala Travel Agency Landing Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
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
      name: 'logoText',
      title: 'Agency Name',
      type: 'string',
      initialValue: 'Kerala Green Haven Tours',
    }),
    defineField({
      name: 'whatsappNumber',
      title: 'WhatsApp Contact Number',
      type: 'string',
      initialValue: '+919876543210',
    }),
    defineField({
      name: 'navItems',
      title: 'Header Navigation Links',
      type: 'array',
      of: [defineArrayMember({ type: 'navItem' })],
    }),
    defineField({
      name: 'hero',
      title: 'Big Banner Hero Section',
      type: 'heroSection',
    }),
    defineField({
      name: 'featuresSectionTitle',
      title: 'Popular Tour Packages Title',
      type: 'string',
      initialValue: 'Bestselling Kerala Holiday Packages',
    }),
    defineField({
      name: 'featuresSectionSubtitle',
      title: 'Popular Tour Packages Subtitle',
      type: 'string',
      initialValue: 'Explore God’s Own Country with customized tour packages, luxury houseboats, and private cab transfers.',
    }),
    defineField({
      name: 'features',
      title: 'Featured Kerala Tour Packages',
      type: 'array',
      of: [defineArrayMember({ type: 'featureItem' })],
    }),
    defineField({
      name: 'gallerySectionTitle',
      title: 'Kerala Tourism Photo Gallery Title',
      type: 'string',
      initialValue: 'Glimpse of Kerala - God’s Own Country',
    }),
    defineField({
      name: 'gallery',
      title: 'Photo Gallery Images',
      type: 'array',
      of: [defineArrayMember({ type: 'galleryItem' })],
    }),
    defineField({
      name: 'cta',
      title: 'Quick Inquiry Call to Action Section',
      type: 'ctaSection',
    }),
    defineField({
      name: 'footerText',
      title: 'Footer Copyright & Info',
      type: 'string',
      initialValue: '© 2026 Kerala Green Haven Tours & Travels, Kochi, Kerala, India.',
    }),
  ],
})
