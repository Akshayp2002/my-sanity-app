import { client } from "@/sanity/client";
import { defineQuery, type SanityDocument } from "next-sanity";
import Link from "next/link";
import { HeroCarousel } from "@/components/HeroCarousel";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { TrustHighlightsBar } from "@/components/TrustHighlightsBar";
import { InstagramPhotoGrid } from "@/components/InstagramPhotoGrid";
import { FaqAccordion } from "@/components/FaqAccordion";

const HOME_PAGE_QUERY = defineQuery(`{
  "settings": *[_type == "siteSettings"][0]{
    ctaTitle,
    ctaDescription,
    ctaButtonText,
    whatsappNumber
  },
  "heroSlides": *[_type == "heroSlide"] | order(order asc){
    _id,
    badge,
    heading,
    description,
    imageUrl
  },
  "destinations": *[_type == "destination"] | order(order asc){
    _id,
    name,
    tag,
    link
  },
  "packages": *[_type == "tourPackage"] | order(order asc){
    _id,
    title,
    slug,
    tag,
    location,
    price,
    rating,
    imageUrl,
    description
  },
  "experiences": *[_type == "experience"] | order(order asc){
    _id,
    icon,
    title,
    description
  },
  "gallery": *[_type == "galleryImage"] | order(order asc){
    _id,
    caption,
    category,
    imageUrl
  },
  "testimonials": *[_type == "testimonial"] | order(order asc){
    _id,
    name,
    city,
    packageTitle,
    review,
    rating,
    avatar
  },
  "faqs": *[_type == "faq"] | order(order asc){
    _id,
    question,
    answer
  }
}`);

const options = { next: { revalidate: 60 } };

export default async function KeralaTravelLandingPage() {
  const data = await client.fetch<SanityDocument | null>(HOME_PAGE_QUERY, {}, options);

  const settings = data?.settings;
  const rawWhatsapp = settings?.whatsappNumber || "+919876543210";
  const cleanWhatsapp = rawWhatsapp.replace(/[^0-9]/g, "");

  const heroSlides = data?.heroSlides || [];
  const destinations = data?.destinations || [];
  const packages = data?.packages || [];
  const experiences = data?.experiences || [];
  const galleryItems = data?.gallery || [];
  const testimonials = data?.testimonials || [];
  const faqs = data?.faqs || [];

  return (
    <div className="bg-stone-50 text-stone-900 font-sans selection:bg-emerald-700 selection:text-white">
      {/* 1. HERO CAROUSEL WITH TOUCH SWIPE & MOBILE INQUIRY BOX */}
      <HeroCarousel slides={heroSlides} whatsappNumber={cleanWhatsapp} />

      {/* 2. MODERN GLASSMORPHISM TRUST & FEATURE HIGHLIGHTS BAR */}
      <TrustHighlightsBar />

      {/* 3. TOP KERALA DESTINATIONS */}
      {destinations.length > 0 && (
        <section className="bg-white border-b border-stone-200/80 py-8 sm:py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-6">
              <span className="inline-block px-3.5 py-1 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider shadow-sm shadow-emerald-700/20 mb-2">
                Popular Kerala Circuits
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-stone-900 tracking-tight">
                Explore Top Kerala Destinations
              </h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4 text-center">
              {destinations.map((item: { name: string; tag?: string; link: string }, idx: number) => (
                <Link
                  key={idx}
                  href={item.link || "/packages"}
                  className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-b from-stone-50 to-white hover:from-emerald-50 hover:to-teal-50/60 border border-stone-200/80 hover:border-emerald-400/80 hover:shadow-lg hover:shadow-emerald-900/5 hover:-translate-y-0.5 transition-all duration-300 text-stone-900 group"
                >
                  <p className="font-extrabold text-xs sm:text-sm group-hover:text-emerald-800 transition-colors">
                    {item.name}
                  </p>
                  {item.tag && (
                    <span className="inline-block mt-1 text-[9px] sm:text-[10px] font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-md">
                      {item.tag}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. FEATURED TOUR PACKAGES */}
      {packages.length > 0 && (
        <section id="packages" className="py-14 sm:py-24 bg-gradient-to-b from-stone-50 via-emerald-50/20 to-stone-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-14">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider shadow-md shadow-emerald-800/20 mb-2.5">
                  <span>✨</span> Bestselling Itineraries
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
                  Handcrafted Kerala Holiday Packages
                </h2>
                <p className="text-xs sm:text-sm text-stone-600 mt-2 max-w-2xl">
                  Explore God’s Own Country with customized tour packages, luxury houseboats, and private cab transfers.
                </p>
              </div>
              <Link
                href="/packages"
                className="text-emerald-700 font-extrabold text-xs sm:text-sm hover:text-emerald-900 hover:underline mt-4 md:mt-0 inline-flex items-center gap-1"
              >
                View All Kerala Packages →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {packages.map(
                (
                  item: {
                    slug?: { current: string } | string;
                    imageUrl?: string;
                    title: string;
                    tag?: string;
                    location?: string;
                    price?: string;
                    rating?: string;
                    description: string;
                  },
                  idx: number
                ) => {
                  const detailSlug =
                    typeof item.slug === "object" ? item.slug?.current : item.slug || "munnar-tea-hills";

                  return (
                    <div
                      key={idx}
                      className="bg-white rounded-3xl border border-stone-200/90 overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-emerald-950/10 hover:border-emerald-400/80 transition-all duration-300 hover:-translate-y-1 group flex flex-col justify-between"
                    >
                      <div>
                        {/* Card Image */}
                        <Link
                          href={`/packages/${detailSlug}`}
                          className="block relative h-52 sm:h-56 w-full overflow-hidden bg-stone-100"
                        >
                          <img
                            src={
                              item.imageUrl ||
                              "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=800"
                            }
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                          />
                          {/* Duration Tag */}
                          {item.tag && (
                            <span className="absolute top-3 left-3 bg-gradient-to-r from-emerald-800 to-teal-900/95 text-white px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-extrabold shadow-lg shadow-black/20 backdrop-blur-md">
                              {item.tag}
                            </span>
                          )}
                          {/* Price Tag */}
                          {item.price && (
                            <span className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md text-emerald-900 border border-emerald-100 px-3 py-1 rounded-full text-xs font-black shadow-md">
                              {item.price}
                            </span>
                          )}
                        </Link>

                        {/* Card Content */}
                        <div className="p-5">
                          <p className="text-[11px] font-bold text-emerald-700 tracking-wide uppercase mb-1.5 flex items-center gap-1">
                            <span>📍</span> {item.location || "Kerala, India"}
                          </p>
                          <Link href={`/packages/${detailSlug}`} className="group-hover:text-emerald-800 transition-colors">
                            <h3 className="text-sm sm:text-base font-extrabold text-stone-900 mb-2 leading-snug">
                              {item.title}
                            </h3>
                          </Link>
                          {item.rating && (
                            <div className="flex items-center gap-1.5 mb-2.5">
                              <span className="text-amber-500 font-extrabold text-xs">⭐️ {item.rating}</span>
                              <span className="text-[10px] text-stone-600 font-medium">(Verified Trip)</span>
                            </div>
                          )}
                          <p className="text-stone-600 text-xs leading-relaxed line-clamp-3 mb-3">{item.description}</p>

                          {/* Amenity Inclusions Pills */}
                          <div className="flex items-center gap-1.5 flex-wrap pt-2 border-t border-stone-100">
                            <span className="text-[10px] font-bold bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-md border border-emerald-200/60">
                              🚖 Cab
                            </span>
                            <span className="text-[10px] font-bold bg-teal-50 text-teal-800 px-2 py-0.5 rounded-md border border-teal-200/60">
                              🏨 Hotel
                            </span>
                            <span className="text-[10px] font-bold bg-amber-50 text-amber-800 px-2 py-0.5 rounded-md border border-amber-200/60">
                              ☕ Meals
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Card Action Button */}
                      <div className="px-5 pb-5 pt-0">
                        <Link
                          href={`/packages/${detailSlug}`}
                          className="block text-center w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-800 hover:from-emerald-800 hover:to-teal-900 text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-md shadow-emerald-900/20 hover:shadow-lg min-h-[44px] flex items-center justify-center"
                        >
                          View Itinerary & Details →
                        </Link>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </section>
      )}

      {/* 5. KERALA EXPERIENCES */}
      {experiences.length > 0 && (
        <section className="py-14 sm:py-24 bg-white border-y border-stone-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
              <span className="inline-block px-3.5 py-1 rounded-full bg-gradient-to-r from-teal-600 to-cyan-600 text-white text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider shadow-sm shadow-teal-700/20 mb-2.5">
                Why Visit Kerala
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
                Unrivaled Experiences in God's Own Country
              </h2>
              <p className="text-stone-600 text-xs sm:text-sm mt-2">
                Immerse in the magic of misty tea plantations, emerald backwaters, and rejuvenating Ayurvedic wellness.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {experiences.map(
                (exp: { icon?: string; title: string; description: string }, idx: number) => {
                  const gradientStyles = [
                    "from-emerald-50/80 to-teal-50/40 border-emerald-200/70 hover:border-emerald-400",
                    "from-cyan-50/80 to-blue-50/40 border-cyan-200/70 hover:border-cyan-400",
                    "from-amber-50/80 to-orange-50/40 border-amber-200/70 hover:border-amber-400",
                  ];
                  const style = gradientStyles[idx % gradientStyles.length];

                  return (
                    <div
                      key={idx}
                      className={`bg-gradient-to-br ${style} p-7 sm:p-9 rounded-3xl border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group`}
                    >
                      <div className="w-14 h-14 rounded-2xl bg-white shadow-md border border-white/80 flex items-center justify-center text-3xl mb-5 group-hover:scale-110 transition-transform">
                        {exp.icon || "🌴"}
                      </div>
                      <h3 className="text-base sm:text-lg font-extrabold text-stone-900 mb-2 group-hover:text-emerald-800 transition-colors">
                        {exp.title}
                      </h3>
                      <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">{exp.description}</p>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </section>
      )}

      {/* 6. INSTAGRAM-STYLE KERALA PHOTO STORIES GRID */}
      {galleryItems.length > 0 && (
        <InstagramPhotoGrid photos={galleryItems} whatsappNumber={cleanWhatsapp} />
      )}

      {/* 7. GUEST TESTIMONIALS */}
      {testimonials.length > 0 && (
        <section className="py-14 sm:py-24 bg-stone-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
              <span className="inline-block px-3.5 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider shadow-sm shadow-amber-600/20 mb-2.5">
                Guest Reviews
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
                What Our Guests Say About Us
              </h2>
              <p className="text-stone-600 text-xs sm:text-sm mt-2">
                Real feedback from families, honeymooners, and solo travelers who explored Kerala with us.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {testimonials.map(
                (
                  t: {
                    name: string;
                    city?: string;
                    packageTitle?: string;
                    review: string;
                    rating?: string;
                    avatar?: string;
                  },
                  idx: number
                ) => (
                  <div
                    key={idx}
                    className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200/90 shadow-sm hover:shadow-xl hover:border-emerald-300 hover:-translate-y-1 transition-all duration-300 space-y-4 relative overflow-hidden flex flex-col justify-between"
                  >
                    {/* Top Accent Gradient Bar */}
                    <div className="h-1.5 w-full bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-400 absolute top-0 left-0" />

                    <div>
                      <div className="flex items-center gap-3.5 mb-3">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-100 border border-emerald-200 text-2xl flex items-center justify-center shadow-sm">
                          {t.avatar || "👤"}
                        </div>
                        <div>
                          <h3 className="font-extrabold text-sm text-stone-900">{t.name}</h3>
                          <p className="text-[11px] text-stone-500 font-medium">
                            {t.city} {t.packageTitle ? `• ${t.packageTitle}` : ""}
                          </p>
                        </div>
                      </div>
                      {t.rating && (
                        <p className="text-amber-500 text-xs font-extrabold tracking-wide mb-2">
                          ⭐️ {t.rating} <span className="text-[10px] text-stone-400 font-normal">• Verified Booking</span>
                        </p>
                      )}
                      <p className="text-stone-600 text-xs sm:text-sm leading-relaxed italic">"{t.review}"</p>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </section>
      )}

      {/* 8. INTERACTIVE ANIMATED FREQUENTLY ASKED QUESTIONS */}
      {faqs.length > 0 && (
        <section className="py-14 sm:py-24 bg-white border-t border-stone-200/80">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-10 sm:mb-14">
              <span className="inline-block px-3.5 py-1 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider shadow-sm shadow-emerald-700/20 mb-2.5">
                Have Questions?
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
                Frequently Asked Questions
              </h2>
              <p className="text-stone-600 text-xs sm:text-sm mt-2">
                Everything you need to know before booking your customized Kerala holiday.
              </p>
            </div>

            <FaqAccordion items={faqs} />
          </div>
        </section>
      )}

      {/* 9. VIBRANT TROPICAL CALL TO ACTION BANNER */}
      <section className="py-14 sm:py-24 bg-stone-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="bg-gradient-to-br from-emerald-900 via-teal-900 to-stone-900 rounded-3xl sm:rounded-4xl p-8 sm:p-16 text-white relative overflow-hidden shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 border border-emerald-700/30">
            {/* Background Ambient Glows */}
            <div className="absolute -right-20 -top-20 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-xl text-center md:text-left space-y-3 relative z-10">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-stone-950 text-[10px] sm:text-xs font-black uppercase tracking-wider shadow-md mb-1">
                <span>🌴</span> Direct Local Kerala Office
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                {settings?.ctaTitle || "Need a Customized Kerala Tour Itinerary?"}
              </h2>
              <p className="text-emerald-100 text-xs sm:text-base leading-relaxed font-normal">
                {settings?.ctaDescription ||
                  "Connect directly with our local travel expert in Kochi, Kerala via WhatsApp or phone call for instant custom quotations."}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3.5 sm:gap-4 w-full sm:w-auto shrink-0 relative z-10">
              <a
                href={`https://wa.me/${cleanWhatsapp}?text=Hi!%20I%20am%20interested%20in%20a%20Kerala%20tour%20package.`}
                target="_blank"
                rel="noreferrer"
                className="px-7 sm:px-9 py-4 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-xl shadow-emerald-950/40 hover:scale-105 flex items-center justify-center gap-2.5 min-h-[48px]"
              >
                <WhatsAppIcon className="w-4 h-4 fill-current" />
                <span>{settings?.ctaButtonText || "Chat on WhatsApp"}</span>
              </a>
              <Link
                href="/contact"
                className="px-7 sm:px-9 py-4 rounded-2xl bg-white text-stone-900 font-extrabold text-xs sm:text-sm uppercase tracking-wider hover:bg-stone-100 transition-all text-center min-h-[48px] flex items-center justify-center shadow-lg"
              >
                Contact Office
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
