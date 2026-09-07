import { defineField, defineType } from 'sanity'

export const contactPage = defineType({
  name: 'contactPage',
  title: 'Contact Us Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Contact Our Kerala Travel Experts',
    }),
    defineField({
      name: 'whatsappNumber',
      title: 'WhatsApp Number (with country code)',
      type: 'string',
      initialValue: '+919876543210',
      description: 'e.g. +919876543210',
    }),
    defineField({
      name: 'phonePrimary',
      title: 'Primary Phone Number',
      type: 'string',
      initialValue: '+91 98765 43210',
    }),
    defineField({
      name: 'phoneSecondary',
      title: 'Secondary Phone Number',
      type: 'string',
      initialValue: '+91 484 2345678',
    }),
    defineField({
      name: 'email',
      title: 'Contact Email',
      type: 'string',
      initialValue: 'info@keralagreenhaventours.com',
    }),
    defineField({
      name: 'officeAddress',
      title: 'Office Address',
      type: 'text',
      rows: 3,
      initialValue: 'Door No. 42/1080, Marine Drive Promenade, Ernakulam, Kochi, Kerala 682031, India',
    }),
    defineField({
      name: 'businessHours',
      title: 'Business Hours',
      type: 'string',
      initialValue: 'Mon - Sat: 9:00 AM - 8:00 PM IST | Sun: 10:00 AM - 5:00 PM IST',
    }),
    defineField({
      name: 'whatsappMessagePrefix',
      title: 'Default WhatsApp Inquiry Message',
      type: 'string',
      initialValue: 'Hello! I would like to inquire about Kerala tour packages.',
    }),
  ],
})
