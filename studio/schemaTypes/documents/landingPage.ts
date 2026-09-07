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
      initialValue: 'Kerala Green Haven Tours & Travels | Best Kerala Packages',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      initialValue: { current: 'home' },
      validation: (Rule) => Rule.required(),
    }),

    // --- TOP BAR & HEADER BRANDING ---
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

    // --- HERO SECTION / CAROUSEL ---
    defineField({
      name: 'heroSlides',
      title: 'Hero Carousel Slides (Images & Headings)',
      type: 'array',
      of: [defineArrayMember({ type: 'heroSlide' })],
      description: 'Add 1 or more slides with Image, Heading, and Description. Multiple slides will automatically slide smoothly in a loop!',
    }),

    // --- TOP KERALA DESTINATIONS STRIP ---
    defineField({
      name: 'destinationsTitle',
      title: 'Top Destinations Bar Title',
      type: 'string',
      initialValue: 'Explore Top Kerala Destinations',
    }),
    defineField({
      name: 'destinations',
      title: 'Top Kerala Destinations List',
      type: 'array',
      of: [defineArrayMember({ type: 'destinationItem' })],
      description: 'Quick links to top Kerala spots (Munnar, Alleppey, Wayanad, Kovalam, Thekkady, etc.)',
    }),

    // --- FEATURED PACKAGES ---
    defineField({
      name: 'featuresSectionTag',
      title: 'Tour Packages Badge/Tag',
      type: 'string',
      initialValue: 'Bestselling Itineraries',
    }),
    defineField({
      name: 'featuresSectionTitle',
      title: 'Tour Packages Section Title',
      type: 'string',
      initialValue: 'Handcrafted Kerala Holiday Packages',
    }),
    defineField({
      name: 'featuresSectionSubtitle',
      title: 'Tour Packages Section Subtitle',
      type: 'string',
      initialValue: 'Explore God’s Own Country with customized tour packages, luxury houseboats, and private cab transfers.',
    }),
    defineField({
      name: 'features',
      title: 'Featured Kerala Tour Packages',
      type: 'array',
      of: [defineArrayMember({ type: 'featureItem' })],
    }),

    // --- EXPERIENCES SPOTLIGHT ---
    defineField({
      name: 'experiencesSectionTag',
      title: 'Experiences Badge/Tag',
      type: 'string',
      initialValue: 'Why Visit Kerala',
    }),
    defineField({
      name: 'experiencesSectionTitle',
      title: 'Experiences Section Title',
      type: 'string',
      initialValue: 'Unrivaled Experiences in God’s Own Country',
    }),
    defineField({
      name: 'experiences',
      title: 'Kerala Experiences List',
      type: 'array',
      of: [defineArrayMember({ type: 'experienceItem' })],
    }),

    // --- PHOTO GALLERY ---
    defineField({
      name: 'gallerySectionTag',
      title: 'Photo Gallery Badge/Tag',
      type: 'string',
      initialValue: 'Kerala Highlights',
    }),
    defineField({
      name: 'gallerySectionTitle',
      title: 'Photo Gallery Section Title',
      type: 'string',
      initialValue: 'Glimpse of Kerala - God’s Own Country',
    }),
    defineField({
      name: 'gallery',
      title: 'Photo Gallery Images',
      type: 'array',
      of: [defineArrayMember({ type: 'galleryItem' })],
    }),

    // --- TESTIMONIALS / REVIEWS ---
    defineField({
      name: 'testimonialsSectionTag',
      title: 'Testimonials Badge/Tag',
      type: 'string',
      initialValue: 'Guest Experiences',
    }),
    defineField({
      name: 'testimonialsSectionTitle',
      title: 'Testimonials Section Title',
      type: 'string',
      initialValue: 'What Our Guests Say About Us',
    }),
    defineField({
      name: 'testimonials',
      title: 'Guest Testimonials & Reviews',
      type: 'array',
      of: [defineArrayMember({ type: 'testimonialItem' })],
    }),

    // --- FAQS ---
    defineField({
      name: 'faqSectionTag',
      title: 'FAQ Badge/Tag',
      type: 'string',
      initialValue: 'Have Questions?',
    }),
    defineField({
      name: 'faqSectionTitle',
      title: 'FAQ Section Title',
      type: 'string',
      initialValue: 'Frequently Asked Questions',
    }),
    defineField({
      name: 'faqs',
      title: 'Frequently Asked Questions List',
      type: 'array',
      of: [defineArrayMember({ type: 'faqItem' })],
    }),

    // --- CALL TO ACTION ---
    defineField({
      name: 'cta',
      title: 'Call to Action Banner',
      type: 'ctaSection',
    }),

    // --- FOOTER DETAILS ---
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
