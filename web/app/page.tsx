import { client } from "@/sanity/client";
import { defineQuery, type SanityDocument } from "next-sanity";
import Link from "next/link";
import { HeroCarousel } from "@/components/HeroCarousel";

const HOME_DATA_QUERY = defineQuery(`{
  "settings": *[_type == "siteSettings"][0]{
    topNotificationBar,
    logoIcon,
    logoText,
    logoTagline,
    whatsappNumber,
    navItems[]{ label, link },
    ctaTitle,
    ctaDescription,
    ctaButtonText,
    footerAboutText,
    footerOfficeAddress,
    footerPhone,
    footerEmail,
    footerCopyright
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
  const data = await client.fetch<SanityDocument | null>(HOME_DATA_QUERY, {}, options);

  const settings = data?.settings;
  const topNotification =
    settings?.topNotificationBar ||
    "🌿 Authorized Local Tour Operator • Registered Office in Kochi, Kerala • Direct Cab Drivers & Houseboat Owners!";
  const logoIcon = settings?.logoIcon || "🌴";
  const logoText = settings?.logoText || "Kerala Green Haven Tours";
  const logoTagline = settings?.logoTagline || "Tours & Travels • Kochi, Kerala";

  const rawWhatsapp = settings?.whatsappNumber || "+919876543210";
  const cleanWhatsapp = rawWhatsapp.replace(/[^0-9]/g, "");

  const navItems = settings?.navItems?.length
    ? settings.navItems
    : [
        { label: "Home", link: "/" },
        { label: "Kerala Packages", link: "/packages" },
        { label: "About Us", link: "/about" },
        { label: "Contact Us", link: "/contact" },
      ];

  const heroSlides = data?.heroSlides || [];
  const destinations = data?.destinations || [];
  const packages = data?.packages || [];
  const experiences = data?.experiences || [];
  const galleryItems = data?.gallery || [];
  const testimonials = data?.testimonials || [];
  const faqs = data?.faqs || [];

  const footerAbout =
    settings?.footerAboutText ||
    "Authorized local travel agency in Kochi, Kerala. Specializing in customized Kerala tours, houseboats, and cab packages.";
  const footerAddress = settings?.footerOfficeAddress || "Ernakulam, Kochi, Kerala, India";
  const footerPhone = settings?.footerPhone || "+91 98765 43210 / +91 484 2345678";
  const footerEmail = settings?.footerEmail || "info@keralagreenhaventours.com";
  const footerCopyright =
    settings?.footerCopyright || "© 2026 Kerala Green Haven Tours & Travels, Kochi, Kerala, India.";

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans selection:bg-emerald-700 selection:text-white">
      {/* 1. TOP NOTIFICATION BAR */}
      {topNotification && (
        <div className="bg-emerald-900 text-emerald-100 text-xs py-2 px-6 text-center font-medium">
          {topNotification}
        </div>
      )}

      {/* 2. HEADER */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-emerald-700 text-white font-bold flex items-center justify-center text-xl shadow">
              {logoIcon}
            </div>
            <div>
              <span className="font-extrabold text-lg tracking-tight text-stone-900 block">
                {logoText}
              </span>
              <span className="text-[10px] text-emerald-700 font-bold uppercase tracking-widest block -mt-1">
                {logoTagline}
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item: { label: string; link: string }, idx: number) => (
              <Link
                key={idx}
                href={item.link}
                className="text-sm font-semibold text-stone-600 hover:text-emerald-700 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={`https://wa.me/${cleanWhatsapp}?text=Hi!%20I%20am%20interested%20in%20Kerala%20tour%20packages.`}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 text-xs font-bold rounded-lg bg-[#25D366] text-white hover:bg-[#20ba59] transition-all shadow flex items-center gap-1.5"
            >
              <span>WhatsApp</span>
              <span>💬</span>
            </a>
          </div>
        </div>
      </header>

      {/* 3. HERO CAROUSEL (MANAGED IN SANITY "HERO CAROUSEL SLIDES") */}
      <HeroCarousel slides={heroSlides} whatsappNumber={cleanWhatsapp} />

      {/* 4. TOP KERALA DESTINATIONS (MANAGED IN SANITY "TOP KERALA DESTINATIONS") */}
      {destinations.length > 0 && (
        <section className="bg-white border-b border-stone-200 py-8">
          <div className="max-w-7xl mx-auto px-6">
            <p className="text-xs font-bold text-stone-500 uppercase tracking-widest text-center mb-6">
              Explore Top Kerala Destinations
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4 text-center">
              {destinations.map((item: { name: string; tag?: string; link: string }, idx: number) => (
                <Link
                  key={idx}
                  href={item.link || "/packages"}
                  className="p-3 rounded-xl bg-stone-50 hover:bg-emerald-50 border border-stone-200 hover:border-emerald-300 transition-all text-stone-900 group"
                >
                  <p className="font-bold text-sm group-hover:text-emerald-700">{item.name}</p>
                  {item.tag && <p className="text-[10px] text-stone-500 font-medium">{item.tag}</p>}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5. FEATURED TOUR PACKAGES (MANAGED IN SANITY "KERALA TOUR PACKAGES") */}
      {packages.length > 0 && (
        <section id="packages" className="py-20 max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest block mb-2">
                Bestselling Itineraries
              </span>
              <h2 className="text-3xl font-extrabold text-stone-900 tracking-tight">
                Handcrafted Kerala Holiday Packages
              </h2>
              <p className="text-sm text-stone-600 mt-2 max-w-2xl">
                Explore God’s Own Country with customized tour packages, luxury houseboats, and private cab transfers.
              </p>
            </div>
            <Link href="/packages" className="text-emerald-700 text-xs font-bold hover:underline mt-4 md:mt-0">
              View All Packages →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
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
                        className="block relative h-52 w-full overflow-hidden bg-stone-100"
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
                          <span className="absolute top-3 left-3 bg-emerald-800 text-white px-2.5 py-1 rounded-md text-[11px] font-bold shadow">
                            {item.tag}
                          </span>
                        )}
                        {item.price && (
                          <span className="absolute bottom-3 right-3 bg-white text-stone-900 px-3 py-1 rounded-md text-xs font-extrabold shadow border border-stone-200">
                            {item.price}
                          </span>
                        )}
                      </Link>

                      <div className="p-5">
                        <p className="text-xs font-semibold text-emerald-700 mb-1">
                          {item.location || "Kerala, India"}
                        </p>
                        <Link href={`/packages/${detailSlug}`} className="hover:text-emerald-700 transition-colors">
                          <h3 className="text-base font-bold text-stone-900 mb-2 leading-snug">{item.title}</h3>
                        </Link>
                        {item.rating && <p className="text-xs text-amber-600 font-bold mb-2">{item.rating}</p>}
                        <p className="text-stone-600 text-xs leading-relaxed line-clamp-3">{item.description}</p>
                      </div>
                    </div>

                    <div className="px-5 pb-5 pt-0 space-y-2">
                      <Link
                        href={`/packages/${detailSlug}`}
                        className="block text-center w-full py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs transition-colors shadow"
                      >
                        View Day-by-Day Itinerary & Details →
                      </Link>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </section>
      )}

      {/* 6. KERALA EXPERIENCES (MANAGED IN SANITY "KERALA EXPERIENCES") */}
      {experiences.length > 0 && (
        <section className="py-20 bg-white border-y border-stone-200">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest block mb-2">
                Why Visit Kerala
              </span>
              <h2 className="text-3xl font-extrabold text-stone-900 tracking-tight">
                Unrivaled Experiences in God's Own Country
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {experiences.map(
                (exp: { icon?: string; title: string; description: string }, idx: number) => (
                  <div key={idx} className="bg-stone-50 p-8 rounded-2xl border border-stone-200">
                    <div className="text-4xl mb-4">{exp.icon || "🌴"}</div>
                    <h3 className="text-lg font-bold text-stone-900 mb-2">{exp.title}</h3>
                    <p className="text-stone-600 text-xs leading-relaxed">{exp.description}</p>
                  </div>
                )
              )}
            </div>
          </div>
        </section>
      )}

      {/* 7. PHOTO GALLERY (MANAGED IN SANITY "PHOTO GALLERY") */}
      {galleryItems.length > 0 && (
        <section className="py-20 bg-stone-100 border-b border-stone-200">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest block mb-2">
                Kerala Highlights
              </span>
              <h2 className="text-3xl font-extrabold text-stone-900 tracking-tight">
                Glimpse of Kerala - God's Own Country
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryItems.map(
                (photo: { imageUrl: string; caption?: string; category?: string }, idx: number) => (
                  <div
                    key={idx}
                    className="relative h-64 rounded-2xl overflow-hidden group shadow-md border border-stone-200"
                  >
                    <img
                      src={photo.imageUrl}
                      alt={photo.caption || "Kerala Photo"}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent opacity-90" />
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      {photo.category && (
                        <span className="inline-block text-[10px] font-bold uppercase tracking-wider bg-emerald-700 px-2 py-0.5 rounded text-white mb-1">
                          {photo.category}
                        </span>
                      )}
                      <p className="text-sm font-bold leading-snug">{photo.caption}</p>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </section>
      )}

      {/* 8. GUEST TESTIMONIALS (MANAGED IN SANITY "GUEST TESTIMONIALS") */}
      {testimonials.length > 0 && (
        <section className="py-20 max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest block mb-2">
              Guest Experiences
            </span>
            <h2 className="text-3xl font-extrabold text-stone-900 tracking-tight">
              What Our Guests Say About Us
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                <div key={idx} className="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl p-2 bg-emerald-50 rounded-xl">{t.avatar || "👤"}</div>
                    <div>
                      <h3 className="font-bold text-sm text-stone-900">{t.name}</h3>
                      <p className="text-xs text-stone-500">
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

      {/* 9. FREQUENTLY ASKED QUESTIONS (MANAGED IN SANITY "FAQS") */}
      {faqs.length > 0 && (
        <section className="py-20 bg-white border-t border-stone-200">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-14">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest block mb-2">
                Have Questions?
              </span>
              <h2 className="text-3xl font-extrabold text-stone-900 tracking-tight">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-6">
              {faqs.map((faq: { question: string; answer: string }, idx: number) => (
                <div key={idx} className="bg-stone-50 p-6 rounded-2xl border border-stone-200 space-y-2">
                  <h3 className="font-bold text-stone-900 text-base flex items-center gap-2">
                    <span className="text-emerald-700">Q:</span> {faq.question}
                  </h3>
                  <p className="text-stone-600 text-xs leading-relaxed pl-6">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 10. CALL TO ACTION BANNER */}
      <section className="py-20 max-w-6xl mx-auto px-6">
        <div className="bg-gradient-to-r from-emerald-800 to-teal-900 rounded-3xl p-10 sm:p-14 text-white relative overflow-hidden shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl text-center md:text-left space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-300 block">
              Direct Local Kerala Office
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              {settings?.ctaTitle || "Need a Customized Kerala Tour Itinerary?"}
            </h2>
            <p className="text-emerald-100 text-sm leading-relaxed font-normal">
              {settings?.ctaDescription ||
                "Connect directly with our local travel expert in Kochi, Kerala via WhatsApp or phone call for quick quotations."}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <a
              href={`https://wa.me/${cleanWhatsapp}?text=Hi!%20I%20am%20interested%20in%20a%20Kerala%20tour%20package.`}
              target="_blank"
              rel="noreferrer"
              className="px-8 py-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <span>{settings?.ctaButtonText || "Chat on WhatsApp"}</span>
              <span>💬</span>
            </a>
            <Link
              href="/contact"
              className="px-8 py-4 rounded-xl bg-white text-stone-900 font-extrabold text-xs uppercase tracking-wider hover:bg-stone-100 transition-all text-center"
            >
              Contact Office
            </Link>
          </div>
        </div>
      </section>

      {/* 11. FOOTER (MANAGED IN SANITY "SITE SETTINGS") */}
      <footer className="bg-white border-t border-stone-200 pt-16 pb-12 text-stone-600 text-xs">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="h-7 w-7 rounded-lg bg-emerald-700 flex items-center justify-center font-bold text-white text-sm">
                {logoIcon}
              </div>
              <span className="font-extrabold text-base text-stone-900 tracking-tight">{logoText}</span>
            </div>
            <p className="text-stone-500 leading-relaxed text-xs">{footerAbout}</p>
          </div>

          <div>
            <h4 className="font-bold text-stone-900 text-xs uppercase tracking-wider mb-4">Popular Pages</h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/" className="hover:text-emerald-700 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/packages" className="hover:text-emerald-700 transition-colors">
                  Kerala Packages
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-emerald-700 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-emerald-700 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-stone-900 text-xs uppercase tracking-wider mb-4">Kerala Destinations</h4>
            <ul className="space-y-2.5">
              {destinations.slice(0, 4).map((dest: { name: string; link: string }, idx: number) => (
                <li key={idx}>
                  <Link href={dest.link || "/packages"} className="hover:text-emerald-700 transition-colors">
                    {dest.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-stone-900 text-xs uppercase tracking-wider mb-4">Contact Kerala Office</h4>
            {footerAddress && <p className="text-stone-600 font-bold mb-1">📍 {footerAddress}</p>}
            {footerPhone && <p className="text-stone-600 mb-1">📞 {footerPhone}</p>}
            {footerEmail && <p className="text-emerald-700 font-semibold mb-3">✉️ {footerEmail}</p>}
            <a
              href={`https://wa.me/${cleanWhatsapp}?text=Hi!%20I%20want%20to%20plan%20a%20Kerala%20trip.`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#25D366] text-white font-bold rounded text-[11px]"
            >
              <span>Quick WhatsApp</span>
              <span>💬</span>
            </a>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 border-t border-stone-100 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-stone-400">
          <p>{footerCopyright}</p>
          <div className="flex gap-6 text-stone-500">
            <a
              href="http://localhost:3333"
              target="_blank"
              rel="noreferrer"
              className="text-emerald-700 font-bold hover:underline"
            >
              Sanity Studio
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
