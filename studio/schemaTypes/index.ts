import { post } from './post'
import { navItem } from './objects/navItem'
import { featureItem } from './objects/featureItem'
import { heroSection } from './objects/heroSection'
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
  post,
  heroSection,
  featureItem,
  galleryItem,
  itineraryDay,
  navItem,
  ctaSection,
]
