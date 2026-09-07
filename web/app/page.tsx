import { client, urlFor } from "@/sanity/client";
import { defineQuery, type SanityDocument } from "next-sanity";
import Link from "next/link";

const LANDING_PAGE_QUERY = defineQuery(
  `*[_type == "landingPage"][0]{
    title,
    logoText,
    whatsappNumber,
    navItems[]{ label, link },
    hero{
      badgeText,
      heading,
      highlightText,
      subheading,
      heroImage,
      backgroundImageUrl,
      primaryCtaText,
      primaryCtaLink,
      secondaryCtaText,
      secondaryCtaLink
    },
    featuresSectionTitle,
    featuresSectionSubtitle,
    features[]{ imageUrl, title, tag, location, price, rating, description },
    gallerySectionTitle,
    gallery[]{ imageUrl, caption, category },
    cta{ title, description, buttonText, buttonLink },
    footerText
  }`
);

const options = { next: { revalidate: 10 } };

export default async function KeralaTravelLandingPage() {
  const pageData = await client.fetch<SanityDocument | null>(LANDING_PAGE_QUERY, {}, options);

  const logoText = pageData?.logoText || "Kerala Green Haven Tours";
  const rawWhatsapp = pageData?.whatsappNumber || "+919876543210";
  const cleanWhatsapp = rawWhatsapp.replace(/[^0-9]/g, "");

  const navItems = pageData?.navItems?.length
    ? pageData.navItems
    : [
        { label: "Home", link: "/" },
        { label: "Kerala Packages", link: "/packages" },
        { label: "About Us", link: "/about" },
        { label: "Contact Us", link: "/contact" },
      ];

  const hero = pageData?.hero || {
    badgeText: "🌴 Govt. Approved Local Kerala Tour Operator",
    heading: "Experience God’s Own Country with",
    highlightText: "Kerala Green Haven",
    subheading:
      "Customized holiday packages, luxury houseboat cruises in Alleppey, tea garden stays in Munnar, and private AC cabs across Kerala.",
    backgroundImageUrl:
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=2000&auto=format&fit=crop",
    primaryCtaText: "Inquire on WhatsApp",
    primaryCtaLink: `https://wa.me/${cleanWhatsapp}?text=Hi!%20I%20am%20planning%20a%20trip%20to%20Kerala%20and%20need%20customized%20packages.`,
    secondaryCtaText: "Explore Packages",
    secondaryCtaLink: "/packages",
  };

  const features = pageData?.features?.length
    ? pageData.features
    : [
        {
          slug: "munnar-tea-hills",
          imageUrl:
            "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=80&w=1000&auto=format&fit=crop",
          title: "Munnar Tea Hills & Mist Explorer",
          tag: "3 Days / 2 Nights",
          location: "Munnar, Kerala",
          price: "₹8,500 / person",
          rating: "4.98 ★ (180 reviews)",
          description: "Misty tea garden walks, Mattupetty dam boat ride, spice plantation tour, and waterfalls.",
        },
        {
          slug: "alleppey-houseboat",
          imageUrl:
            "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1000&auto=format&fit=crop",
          title: "Alleppey Luxury Houseboat Cruise",
          tag: "2 Days / 1 Night",
          location: "Alleppey Backwaters",
          price: "₹9,800 / couple",
          rating: "4.97 ★ (220 reviews)",
          description: "Private AC deluxe houseboat cruise with traditional Kerala fish fry, evening snacks, and breakfast.",
        },
        {
          slug: "wayanad-nature",
          imageUrl:
            "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1000&auto=format&fit=crop",
          title: "Wayanad Nature & Waterfalls Escape",
          tag: "4 Days / 3 Nights",
          location: "Wayanad, North Kerala",
          price: "₹12,900 / person",
          rating: "4.95 ★ (110 reviews)",
          description: "Edakkal caves, Banasura Sagar dam, Chembra peak trekking, and eco resort stay in rainforests.",
        },
        {
          slug: "kovalam-beach",
          imageUrl:
            "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000&auto=format&fit=crop",
          title: "Kovalam Beach & Poovar Island Retreat",
          tag: "5 Days / 4 Nights",
          location: "Kovalam & Trivandrum",
          price: "₹16,500 / person",
          rating: "4.99 ★ (165 reviews)",
          description: "Beachfront resort stay, Padmanabhaswamy temple visit, Poovar mangrove boat cruise, and Ayurveda massage.",
        },
      ];

  const galleryTitle = pageData?.gallerySectionTitle || "Glimpse of Kerala - God's Own Country";
  const galleryItems = pageData?.gallery?.length
    ? pageData.gallery
    : [
        {
          imageUrl:
            "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=800&auto=format&fit=crop",
          caption: "Traditional Alleppey Backwater Houseboat",
          category: "Backwaters",
        },
        {
          imageUrl:
            "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=80&w=800&auto=format&fit=crop",
          caption: "Rolling Tea Plantations of Munnar",
          category: "Hill Stations",
        },
        {
          imageUrl:
            "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop",
          caption: "Kovalam Golden Beach Sunsets",
          category: "Beaches",
        },
        {
          imageUrl:
            "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=800&auto=format&fit=crop",
          caption: "Periyar Wildlife Sanctuary Boat Safari",
          category: "Wildlife",
        },
        {
          imageUrl:
            "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?q=80&w=800&auto=format&fit=crop",
          caption: "Aromatic Spice Garden Walk in Thekkady",
          category: "Spices",
        },
        {
          imageUrl:
            "https://images.unsplash.com/photo-1515238152791-8216bfdf89a7?q=80&w=800&auto=format&fit=crop",
          caption: "Authentic Kerala Sadya & Seafood Dining",
          category: "Cuisine",
        },
      ];

  const testimonials = [
    {
      name: "Anand & Divya Sharma",
      city: "New Delhi",
      package: "Munnar & Alleppey Honeymoon Special",
      review:
        "Everything was arranged smoothly! The private AC cab driver was very polite and punctual. The houseboat stay in Alleppey with fresh Karimeen fish fry was the best highlight of our honeymoon trip.",
      rating: "5.0 ★★★★★",
      avatar: "👨‍👩‍👧",
    },
    {
      name: "Suresh Pillai & Family",
      city: "Bangalore",
      package: "Complete Kerala Family Tour (6D/5N)",
      review:
        "Direct local operators are so much better than third-party apps. Quick WhatsApp responses, clean 4-star hotels in Munnar, and hassle-free pickup from Kochi airport.",
      rating: "5.0 ★★★★★",
      avatar: "👨‍👩‍👦‍👦",
    },
    {
      name: "Priya & Friends",
      city: "Mumbai",
      package: "Wayanad Rainforest & Waterfalls",
      review:
        "Wayanad resort stay arranged by Kerala Green Haven was magical! Treehouse stay, Chembra peak trek, and Banasura dam boat ride were extraordinary.",
      rating: "4.9 ★★★★★",
      avatar: "👩‍🌾",
    },
  ];

  const faqs = [
    {
      q: "What is the best time to visit Kerala?",
      a: "September to March is considered the peak season with pleasant weather for Munnar hills, Alleppey backwaters, and Kovalam beaches. June to August (Monsoon) is famous for Ayurvedic wellness treatments.",
    },
    {
      q: "What is included in the package cost?",
      a: "Our packages include dedicated private AC sedan/SUV cab, driver allowances, toll, parking, daily breakfast at hotels, full meals on private houseboat cruises, and 24/7 WhatsApp assistance.",
    },
    {
      q: "Do you provide pickup from Kochi Airport or Railway Station?",
      a: "Yes! All our packages include door-to-door pickup and drop-off from Cochin International Airport (COK) or Ernakulam North/South Railway Station.",
    },
    {
      q: "Can we customize our itinerary based on our flight timings?",
      a: "Absolutely! Since we are local tour operators based in Kochi, we can tailor the day-by-day sightseeing and hotel choices according to your flight or train schedule.",
    },
  ];

  const cta = pageData?.cta || {
    title: "Need a Customized Kerala Tour Itinerary?",
    description: "Connect directly with our local travel expert in Kochi, Kerala via WhatsApp or phone call for quick quotations.",
    buttonText: "Inquire Now on WhatsApp",
    buttonLink: `https://wa.me/${cleanWhatsapp}?text=Hi!%20I%20am%20looking%20for%20a%20customized%20Kerala%20tour%20package.`,
  };

  const footerText = pageData?.footerText || "© 2026 Kerala Green Haven Tours & Travels, Kochi, Kerala, India.";

  const heroBannerUrl =
    pageData?.hero?.heroImage
      ? urlFor(pageData.hero.heroImage).url()
      : hero.backgroundImageUrl ||
        "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=2000&auto=format&fit=crop";

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans selection:bg-emerald-700 selection:text-white">
      {/* Top Notification Bar */}
      <div className="bg-emerald-900 text-emerald-100 text-xs py-2 px-6 text-center font-medium">
        🌿 Authorized Local Tour Operator • Registered Office in Kochi, Kerala • Direct Cab Drivers & Houseboat Owners!
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-emerald-700 text-white font-bold flex items-center justify-center text-xl shadow">
              🌴
            </div>
            <div>
              <span className="font-extrabold text-lg tracking-tight text-stone-900 block">
                {logoText}
              </span>
              <span className="text-[10px] text-emerald-700 font-bold uppercase tracking-widest block -mt-1">Tours & Travels • Kochi, Kerala</span>
            </div>
          </Link>

          {/* Navigation Links */}
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

          {/* Action Buttons */}
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

      {/* 1. HERO SECTION WITH BIG BACKGROUND IMAGE */}
      <section className="relative min-h-[580px] sm:min-h-[640px] flex items-center justify-center text-center px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroBannerUrl}
            alt="Kerala Backwaters Houseboat"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-stone-950/45 backdrop-brightness-95" />
        </div>

        <div className="max-w-4xl mx-auto relative z-10 py-16 text-white">
          {hero.badgeText && (
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-bold tracking-wider mb-6 shadow-md">
              {hero.badgeText}
            </span>
          )}

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight mb-6">
            {hero.heading}{" "}
            <span className="text-amber-300 drop-shadow-md">
              {hero.highlightText}
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-stone-100 max-w-2xl mx-auto leading-relaxed mb-10 font-normal">
            {hero.subheading}
          </p>

          {/* Quick Trip Inquiry Box */}
          <div className="max-w-3xl mx-auto bg-white text-stone-900 rounded-2xl p-4 sm:p-5 shadow-2xl border border-stone-200 text-left grid grid-cols-1 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
              <label className="block text-[10px] font-bold uppercase text-stone-500 tracking-wider mb-1">Destination</label>
              <select className="bg-transparent text-sm font-semibold text-stone-900 focus:outline-none w-full cursor-pointer">
                <option>Munnar & Alleppey</option>
                <option>Complete Kerala Tour</option>
                <option>Wayanad Rainforest</option>
                <option>Kovalam Beach</option>
              </select>
            </div>
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
              <label className="block text-[10px] font-bold uppercase text-stone-500 tracking-wider mb-1">Travel Month</label>
              <input type="text" defaultValue="October / November" className="bg-transparent text-sm font-semibold text-stone-900 focus:outline-none w-full" />
            </div>
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
              <label className="block text-[10px] font-bold uppercase text-stone-500 tracking-wider mb-1">Travellers</label>
              <select className="bg-transparent text-sm font-semibold text-stone-900 focus:outline-none w-full cursor-pointer">
                <option>Family (4-6 Persons)</option>
                <option>Honeymoon Couple</option>
                <option>Group (8+ Persons)</option>
              </select>
            </div>
            <a
              href={`https://wa.me/${cleanWhatsapp}?text=Hi!%20I%20am%20looking%20for%20a%20Kerala%20tour%20package.`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-sm tracking-wide transition-all shadow-md py-3.5 sm:py-0 gap-2"
            >
              <span>WhatsApp Inquiry</span>
              <span>💬</span>
            </a>
          </div>
        </div>
      </section>

      {/* 2. TOP KERALA DESTINATIONS STRIP */}
      <section className="bg-white border-b border-stone-200 py-8">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-xs font-bold text-stone-500 uppercase tracking-widest text-center mb-6">Explore Top Kerala Destinations</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4 text-center">
            {[
              { name: "Munnar", tag: "Tea Hills", slug: "munnar-tea-hills" },
              { name: "Alleppey", tag: "Houseboats", slug: "alleppey-houseboat" },
              { name: "Wayanad", tag: "Rainforest", slug: "wayanad-nature" },
              { name: "Kovalam", tag: "Beaches", slug: "kovalam-beach" },
              { name: "Thekkady", tag: "Wildlife", slug: "thekkady-safari" },
              { name: "Kumarakom", tag: "Backwaters", slug: "alleppey-houseboat" },
              { name: "Varkala", tag: "Cliff Beach", slug: "kovalam-beach" },
            ].map((item, idx) => (
              <Link
                key={idx}
                href={`/packages/${item.slug}`}
                className="p-3 rounded-xl bg-stone-50 hover:bg-emerald-50 border border-stone-200 hover:border-emerald-300 transition-all text-stone-900 group"
              >
                <p className="font-bold text-sm group-hover:text-emerald-700">{item.name}</p>
                <p className="text-[10px] text-stone-500 font-medium">{item.tag}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FEATURED PACKAGES GRID WITH CLICK-TO-EXPAND DETAIL PAGES */}
      <section id="packages" className="py-20 max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest block mb-2">Bestselling Itineraries</span>
            <h2 className="text-3xl font-extrabold text-stone-900 tracking-tight">Handcrafted Kerala Holiday Packages</h2>
          </div>
          <Link href="/packages" className="text-emerald-700 text-xs font-bold hover:underline mt-2 md:mt-0">
            View All Packages →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item: { slug?: string; imageUrl?: string; title: string; tag?: string; location?: string; price?: string; rating?: string; description: string }, idx: number) => {
            const detailSlug = item.slug || "munnar-tea-hills";

            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <Link href={`/packages/${detailSlug}`} className="block relative h-52 w-full overflow-hidden bg-stone-100">
                    <img
                      src={item.imageUrl || "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=800"}
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
                    <p className="text-xs font-semibold text-emerald-700 mb-1">{item.location || "Kerala, India"}</p>
                    <Link href={`/packages/${detailSlug}`} className="hover:text-emerald-700 transition-colors">
                      <h3 className="text-base font-bold text-stone-900 mb-2 leading-snug">{item.title}</h3>
                    </Link>
                    {item.rating && (
                      <p className="text-xs text-amber-600 font-bold mb-2">{item.rating}</p>
                    )}
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
          })}
        </div>
      </section>

      {/* 4. KERALA EXPERIENCES SPOTLIGHT */}
      <section className="py-20 bg-white border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest block mb-2">Why Visit Kerala</span>
            <h2 className="text-3xl font-extrabold text-stone-900 tracking-tight">Unrivaled Experiences in God's Own Country</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-stone-50 p-8 rounded-2xl border border-stone-200">
              <div className="text-4xl mb-4">⛵</div>
              <h3 className="text-lg font-bold text-stone-900 mb-2">Overnight Houseboat Cruise</h3>
              <p className="text-stone-600 text-xs leading-relaxed">
                Float gently past palm groves, paddy fields, and serene lagoons on a private deluxe AC houseboat with fresh traditional meals.
              </p>
            </div>
            <div className="bg-stone-50 p-8 rounded-2xl border border-stone-200">
              <div className="text-4xl mb-4">🌿</div>
              <h3 className="text-lg font-bold text-stone-900 mb-2">Munnar Tea Hills & Trails</h3>
              <p className="text-stone-600 text-xs leading-relaxed">
                Walk through misty green tea gardens 1,600 meters above sea level, visit spice plantations, and spot rare Nilgiri Tahr.
              </p>
            </div>
            <div className="bg-stone-50 p-8 rounded-2xl border border-stone-200">
              <div className="text-4xl mb-4">🧘‍♂️</div>
              <h3 className="text-lg font-bold text-stone-900 mb-2">Authentic Ayurveda Spa</h3>
              <p className="text-stone-600 text-xs leading-relaxed">
                Rejuvenate your body and mind with authentic herbal massages and holistic therapies certified by Kerala Ayurveda experts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. PHOTO GALLERY */}
      <section className="py-20 bg-stone-100 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest block mb-2">Kerala Highlights</span>
            <h2 className="text-3xl font-extrabold text-stone-900 tracking-tight">{galleryTitle}</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryItems.map((photo: { imageUrl: string; caption?: string; category?: string }, idx: number) => (
              <div key={idx} className="relative h-64 rounded-2xl overflow-hidden group shadow-md border border-stone-200">
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
            ))}
          </div>
        </div>
      </section>

      {/* 6. GUEST REVIEWS & TESTIMONIALS */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest block mb-2">Guest Experiences</span>
          <h2 className="text-3xl font-extrabold text-stone-900 tracking-tight">What Our Guests Say About Us</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div key={idx} className="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="text-3xl p-2 bg-emerald-50 rounded-xl">{t.avatar}</div>
                <div>
                  <h3 className="font-bold text-sm text-stone-900">{t.name}</h3>
                  <p className="text-xs text-stone-500">{t.city} • {t.package}</p>
                </div>
              </div>
              <p className="text-amber-500 text-xs font-bold">{t.rating}</p>
              <p className="text-stone-600 text-xs leading-relaxed italic">"{t.review}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. FREQUENTLY ASKED QUESTIONS (FAQ) */}
      <section className="py-20 bg-white border-t border-stone-200">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest block mb-2">Have Questions?</span>
            <h2 className="text-3xl font-extrabold text-stone-900 tracking-tight">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-stone-50 p-6 rounded-2xl border border-stone-200 space-y-2">
                <h3 className="font-bold text-stone-900 text-base flex items-center gap-2">
                  <span className="text-emerald-700">Q:</span> {faq.q}
                </h3>
                <p className="text-stone-600 text-xs leading-relaxed pl-6">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. WHATSAPP & CONTACT CTA SECTION */}
      <section className="py-20 max-w-6xl mx-auto px-6">
        <div className="bg-gradient-to-r from-emerald-800 to-teal-900 rounded-3xl p-10 sm:p-14 text-white relative overflow-hidden shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl text-center md:text-left space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-300 block">Direct Local Kerala Office</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Need a Customized Kerala Tour Itinerary?</h2>
            <p className="text-emerald-100 text-sm leading-relaxed font-normal">
              Connect directly with our local travel expert in Kochi, Kerala via WhatsApp or phone call for quick quotations.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <a
              href={`https://wa.me/${cleanWhatsapp}?text=Hi!%20I%20am%20interested%20in%20a%20Kerala%20tour%20package.`}
              target="_blank"
              rel="noreferrer"
              className="px-8 py-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <span>Chat on WhatsApp</span>
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

      {/* FOOTER */}
      <footer className="bg-white border-t border-stone-200 pt-16 pb-12 text-stone-600 text-xs">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="h-7 w-7 rounded-lg bg-emerald-700 flex items-center justify-center font-bold text-white text-sm">
                🌴
              </div>
              <span className="font-extrabold text-base text-stone-900 tracking-tight">{logoText}</span>
            </div>
            <p className="text-stone-500 leading-relaxed text-xs">
              Authorized local travel agency in Kochi, Kerala. Specializing in customized Kerala tours, houseboats, and cab packages.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-stone-900 text-xs uppercase tracking-wider mb-4">Popular Pages</h4>
            <ul className="space-y-2.5">
              <li><Link href="/" className="hover:text-emerald-700 transition-colors">Home</Link></li>
              <li><Link href="/packages" className="hover:text-emerald-700 transition-colors">Kerala Packages</Link></li>
              <li><Link href="/about" className="hover:text-emerald-700 transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-emerald-700 transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-stone-900 text-xs uppercase tracking-wider mb-4">Kerala Destinations</h4>
            <ul className="space-y-2.5">
              <li><Link href="/packages/munnar-tea-hills" className="hover:text-emerald-700 transition-colors">Munnar Tea Hills</Link></li>
              <li><Link href="/packages/alleppey-houseboat" className="hover:text-emerald-700 transition-colors">Alleppey Houseboats</Link></li>
              <li><Link href="/packages/wayanad-nature" className="hover:text-emerald-700 transition-colors">Wayanad Rainforests</Link></li>
              <li><Link href="/packages/kovalam-beach" className="hover:text-emerald-700 transition-colors">Kovalam & Poovar Beach</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-stone-900 text-xs uppercase tracking-wider mb-4">Contact Kerala Office</h4>
            <p className="text-stone-600 font-bold mb-1">📍 Ernakulam, Kochi, Kerala, India</p>
            <p className="text-stone-600 mb-1">📞 +91 98765 43210 / +91 484 2345678</p>
            <p className="text-emerald-700 font-semibold mb-3">✉️ info@keralagreenhaventours.com</p>
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
          <p>{footerText}</p>
          <div className="flex gap-6 text-stone-500">
            <a href="http://localhost:3333" target="_blank" rel="noreferrer" className="text-emerald-700 font-bold hover:underline">Sanity Studio</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
