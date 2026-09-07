import { post } from './post'
import { navItem } from './objects/navItem'
import { featureItem } from './objects/featureItem'
import { heroSection } from './objects/heroSection'
import { heroSlide } from './objects/heroSlide'
import { destinationItem } from './objects/destinationItem'
import { experienceItem } from './objects/experienceItem'
import { testimonialItem } from './objects/testimonialItem'
import { faqItem } from './objects/faqItem'
import { ctaSection } from './objects/ctaSection'
import { galleryItem } from './objects/galleryItem'
import { itineraryDay } from './objects/itineraryDay'
import { landingPage } from './documents/landingPage'
import { contactPage } from './documents/contactPage'
import { tourPackage } from './documents/tourPackage'

export const schemaTypes = [
  landingPage,
  contactPage,
  tourPackage,
  heroSlide,
  destinationItem,
  experienceItem,
  testimonialItem,
  faqItem,
  post,
  heroSection,
  featureItem,
  galleryItem,
  itineraryDay,
  navItem,
  ctaSection,
]
