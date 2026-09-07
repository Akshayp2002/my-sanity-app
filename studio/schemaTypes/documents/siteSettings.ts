import { defineArrayMember, defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings & Branding (Header/Footer)',
  type: 'document',
  fields: [
    defineField({
      name: 'topNotificationBar',
      title: 'Top Notification Bar Text',
      type: 'string',
      initialValue: '🌿 Authorized Local Tour Operator • Registered Office in Kochi, Kerala • Direct Cab Drivers & Houseboat Owners!',
    }),
    defineField({
      name: 'logoIcon',
      title: 'Logo Icon / Emoji',
      type: 'string',
      initialValue: '🌴',
    }),
    defineField({
      name: 'logoText',
      title: 'Agency Name (Logo Text)',
      type: 'string',
      initialValue: 'Kerala Green Haven Tours',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logoTagline',
      title: 'Agency Tagline (Sub-Logo)',
      type: 'string',
      initialValue: 'Tours & Travels • Kochi, Kerala',
    }),
    defineField({
      name: 'whatsappNumber',
      title: 'WhatsApp Contact Number',
      type: 'string',
      initialValue: '+919876543210',
      description: 'Used for all direct WhatsApp click-to-chat inquiry buttons across the website.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'navItems',
      title: 'Header Navigation Links',
      type: 'array',
      of: [defineArrayMember({ type: 'navItem' })],
    }),
    defineField({
      name: 'ctaTitle',
      title: 'Inquiry CTA Banner Title',
      type: 'string',
      initialValue: 'Need a Customized Kerala Tour Itinerary?',
    }),
    defineField({
      name: 'ctaDescription',
      title: 'Inquiry CTA Banner Description',
      type: 'text',
      rows: 2,
      initialValue: 'Connect directly with our local travel expert in Kochi, Kerala via WhatsApp or phone call for quick quotations.',
    }),
    defineField({
      name: 'ctaButtonText',
      title: 'Inquiry CTA Button Text',
      type: 'string',
      initialValue: 'Chat on WhatsApp',
    }),
    defineField({
      name: 'footerAboutText',
      title: 'Footer About Agency Description',
      type: 'text',
      rows: 3,
      initialValue: 'Authorized local travel agency in Kochi, Kerala. Specializing in customized Kerala tours, houseboats, and cab packages.',
    }),
    defineField({
      name: 'footerOfficeAddress',
      title: 'Footer Office Address',
      type: 'string',
      initialValue: 'Ernakulam, Kochi, Kerala, India',
    }),
    defineField({
      name: 'footerPhone',
      title: 'Footer Phone Number',
      type: 'string',
      initialValue: '+91 98765 43210 / +91 484 2345678',
    }),
    defineField({
      name: 'footerEmail',
      title: 'Footer Contact Email',
      type: 'string',
      initialValue: 'info@keralagreenhaventours.com',
    }),
    defineField({
      name: 'footerCopyright',
      title: 'Footer Copyright Notice',
      type: 'string',
      initialValue: '© 2026 Kerala Green Haven Tours & Travels, Kochi, Kerala, India.',
    }),
  ],
})
