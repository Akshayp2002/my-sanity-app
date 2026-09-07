import { client } from "@/sanity/client";
import { defineQuery, type SanityDocument } from "next-sanity";
import Link from "next/link";
import { HeroCarousel } from "@/components/HeroCarousel";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";

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
    <div className="text-stone-900 font-sans selection:bg-emerald-700 selection:text-white">
      {/* 1. HERO CAROUSEL WITH TOUCH SWIPE & MOBILE INQUIRY BOX */}
      <HeroCarousel slides={heroSlides} whatsappNumber={cleanWhatsapp} />

      {/* 2. TOP KERALA DESTINATIONS */}
      {destinations.length > 0 && (
        <section className="bg-white border-b border-stone-200 py-6 sm:py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <p className="text-[11px] sm:text-xs font-bold text-stone-500 uppercase tracking-widest text-center mb-4 sm:mb-6">
              Explore Top Kerala Destinations
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 sm:gap-4 text-center">
              {destinations.map((item: { name: string; tag?: string; link: string }, idx: number) => (
                <Link
                  key={idx}
                  href={item.link || "/packages"}
                  className="p-2.5 sm:p-3 rounded-xl bg-stone-50 hover:bg-emerald-50 border border-stone-200 hover:border-emerald-300 transition-all text-stone-900 group"
                >
                  <p className="font-bold text-xs sm:text-sm group-hover:text-emerald-700">{item.name}</p>
                  {item.tag && (
                    <p className="text-[9px] sm:text-[10px] text-stone-500 font-medium">{item.tag}</p>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 3. FEATURED TOUR PACKAGES */}
      {packages.length > 0 && (
        <section id="packages" className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12">
            <div>
              <span className="text-[11px] sm:text-xs font-bold text-emerald-700 uppercase tracking-widest block mb-1.5 sm:mb-2">
                Bestselling Itineraries
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
                Handcrafted Kerala Holiday Packages
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 mt-1.5 sm:mt-2 max-w-2xl">
                Explore God’s Own Country with customized tour packages, luxury houseboats, and private cab transfers.
              </p>
            </div>
            <Link
              href="/packages"
              className="text-emerald-700 text-xs font-bold hover:underline mt-3 md:mt-0 inline-block"
            >
              View All Packages →
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
                    className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
                  >
                    <div>
                      <Link
                        href={`/packages/${detailSlug}`}
                        className="block relative h-48 sm:h-52 w-full overflow-hidden bg-stone-100"
                      >
                        <img
                          src={
                            item.imageUrl ||
                            "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=800"
                          }
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {item.tag && (
                          <span className="absolute top-3 left-3 bg-emerald-800 text-white px-2.5 py-1 rounded-md text-[10px] sm:text-[11px] font-bold shadow">
                            {item.tag}
                          </span>
                        )}
                        {item.price && (
                          <span className="absolute bottom-3 right-3 bg-white text-stone-900 px-2.5 sm:px-3 py-1 rounded-md text-[11px] sm:text-xs font-extrabold shadow border border-stone-200">
                            {item.price}
                          </span>
                        )}
                      </Link>

                      <div className="p-4 sm:p-5">
                        <p className="text-[11px] sm:text-xs font-semibold text-emerald-700 mb-1">
                          {item.location || "Kerala, India"}
                        </p>
                        <Link href={`/packages/${detailSlug}`} className="hover:text-emerald-700 transition-colors">
                          <h3 className="text-sm sm:text-base font-bold text-stone-900 mb-1.5 leading-snug">
                            {item.title}
                          </h3>
                        </Link>
                        {item.rating && (
                          <p className="text-[11px] sm:text-xs text-amber-600 font-bold mb-1.5">{item.rating}</p>
                        )}
                        <p className="text-stone-600 text-xs leading-relaxed line-clamp-3">{item.description}</p>
                      </div>
                    </div>

                    <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-0">
                      <Link
                        href={`/packages/${detailSlug}`}
                        className="block text-center w-full py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs transition-colors shadow min-h-[44px] flex items-center justify-center"
                      >
                        View Itinerary & Details →
                      </Link>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </section>
      )}

      {/* 4. KERALA EXPERIENCES */}
      {experiences.length > 0 && (
        <section className="py-12 sm:py-20 bg-white border-y border-stone-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
              <span className="text-[11px] sm:text-xs font-bold text-emerald-700 uppercase tracking-widest block mb-1.5 sm:mb-2">
                Why Visit Kerala
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
                Unrivaled Experiences in God's Own Country
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {experiences.map(
                (exp: { icon?: string; title: string; description: string }, idx: number) => (
                  <div key={idx} className="bg-stone-50 p-6 sm:p-8 rounded-2xl border border-stone-200">
                    <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{exp.icon || "🌴"}</div>
                    <h3 className="text-base sm:text-lg font-bold text-stone-900 mb-1.5 sm:mb-2">{exp.title}</h3>
                    <p className="text-stone-600 text-xs leading-relaxed">{exp.description}</p>
                  </div>
                )
              )}
            </div>
          </div>
        </section>
      )}

      {/* 5. PHOTO GALLERY */}
      {galleryItems.length > 0 && (
        <section className="py-12 sm:py-20 bg-stone-100 border-b border-stone-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-14">
              <span className="text-[11px] sm:text-xs font-bold text-emerald-700 uppercase tracking-widest block mb-1.5 sm:mb-2">
                Kerala Highlights
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
                Glimpse of Kerala - God's Own Country
              </h2>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
              {galleryItems.map(
                (photo: { imageUrl: string; caption?: string; category?: string }, idx: number) => (
                  <div
                    key={idx}
                    className="relative h-44 sm:h-64 rounded-xl sm:rounded-2xl overflow-hidden group shadow-md border border-stone-200"
                  >
                    <img
                      src={photo.imageUrl}
                      alt={photo.caption || "Kerala Photo"}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-transparent to-transparent opacity-90" />
                    <div className="absolute bottom-2.5 left-2.5 right-2.5 sm:bottom-4 sm:left-4 sm:right-4 text-white">
                      {photo.category && (
                        <span className="inline-block text-[9px] sm:text-[10px] font-bold uppercase tracking-wider bg-emerald-700 px-1.5 sm:px-2 py-0.5 rounded text-white mb-1">
                          {photo.category}
                        </span>
                      )}
                      <p className="text-xs sm:text-sm font-bold leading-snug line-clamp-2">{photo.caption}</p>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </section>
      )}

      {/* 6. GUEST TESTIMONIALS */}
      {testimonials.length > 0 && (
        <section className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
            <span className="text-[11px] sm:text-xs font-bold text-emerald-700 uppercase tracking-widest block mb-1.5 sm:mb-2">
              Guest Experiences
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
              What Our Guests Say About Us
            </h2>
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
                  className="bg-white p-5 sm:p-8 rounded-2xl border border-stone-200 shadow-sm space-y-3 sm:space-y-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-2xl sm:text-3xl p-2 bg-emerald-50 rounded-xl">{t.avatar || "👤"}</div>
                    <div>
                      <h3 className="font-bold text-xs sm:text-sm text-stone-900">{t.name}</h3>
                      <p className="text-[11px] sm:text-xs text-stone-500">
                        {t.city} {t.packageTitle ? `• ${t.packageTitle}` : ""}
                      </p>
                    </div>
                  </div>
                  {t.rating && <p className="text-amber-500 text-xs font-bold">{t.rating}</p>}
                  <p className="text-stone-600 text-xs leading-relaxed italic">"{t.review}"</p>
                </div>
              )
            )}
          </div>
        </section>
      )}

      {/* 7. FREQUENTLY ASKED QUESTIONS */}
      {faqs.length > 0 && (
        <section className="py-12 sm:py-20 bg-white border-t border-stone-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-10 sm:mb-14">
              <span className="text-[11px] sm:text-xs font-bold text-emerald-700 uppercase tracking-widest block mb-1.5 sm:mb-2">
                Have Questions?
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-4 sm:space-y-6">
              {faqs.map((faq: { question: string; answer: string }, idx: number) => (
                <div key={idx} className="bg-stone-50 p-4 sm:p-6 rounded-2xl border border-stone-200 space-y-1.5">
                  <h3 className="font-bold text-stone-900 text-sm sm:text-base flex items-start gap-2">
                    <span className="text-emerald-700 shrink-0">Q:</span> <span>{faq.question}</span>
                  </h3>
                  <p className="text-stone-600 text-xs leading-relaxed pl-5 sm:pl-6">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 8. CALL TO ACTION BANNER */}
      <section className="py-12 sm:py-20 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-r from-emerald-800 to-teal-900 rounded-2xl sm:rounded-3xl p-6 sm:p-14 text-white relative overflow-hidden shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
          <div className="max-w-xl text-center md:text-left space-y-2 sm:space-y-3">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-amber-300 block">
              Direct Local Kerala Office
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              {settings?.ctaTitle || "Need a Customized Kerala Tour Itinerary?"}
            </h2>
            <p className="text-emerald-100 text-xs sm:text-sm leading-relaxed font-normal">
              {settings?.ctaDescription ||
                "Connect directly with our local travel expert in Kochi, Kerala via WhatsApp or phone call for quick quotations."}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto shrink-0">
            <a
              href={`https://wa.me/${cleanWhatsapp}?text=Hi!%20I%20am%20interested%20in%20a%20Kerala%20tour%20package.`}
              target="_blank"
              rel="noreferrer"
              className="px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2 min-h-[44px]"
            >
              <WhatsAppIcon className="w-4 h-4 fill-current" />
              <span>{settings?.ctaButtonText || "Chat on WhatsApp"}</span>
            </a>
            <Link
              href="/contact"
              className="px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-white text-stone-900 font-extrabold text-xs uppercase tracking-wider hover:bg-stone-100 transition-all text-center min-h-[44px] flex items-center justify-center"
            >
              Contact Office
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
