import { client } from "@/sanity/client";
import { defineQuery, type SanityDocument } from "next-sanity";
import Link from "next/link";
import { notFound } from "next/navigation";

const PACKAGE_DETAIL_QUERY = defineQuery(
  `*[_type == "tourPackage" && (slug.current == $slug || _id == $slug)][0]{
    _id,
    title,
    slug,
    duration,
    location,
    price,
    imageUrl,
    highlights,
    description,
    itinerary[]{ day, title, description },
    inclusions,
    exclusions
  }`
);

const options = { next: { revalidate: 10 } };

// Fallback Package Detail Generator for Slugs
function getFallbackPackage(slug: string) {
  const normalized = slug.toLowerCase();

  if (normalized.includes("munnar")) {
    return {
      title: "Munnar Tea Hills & Mist Explorer",
      duration: "3 Days / 2 Nights",
      location: "Munnar, Kerala",
      price: "₹8,500 / person",
      imageUrl:
        "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=80&w=1600&auto=format&fit=crop",
      highlights: [
        "Private AC Sedan/SUV Cab with Experienced Local Driver",
        "2 Nights Accommodation in 3-Star Hill Resort with Breakfast",
        "Mattupetty Dam, Echo Point, & Kundala Lake Sightseeing",
        "Eravikulam National Park (Home to Nilgiri Tahr)",
        "Tata Tea Museum & Factory Tour with Spice Garden Visit",
      ],
      description:
        "Escape to Munnar, the crown jewel of Kerala's Western Ghats. Situated 1,600 meters above sea level, Munnar is famous for vast tea plantations, misty valleys, wildlife sanctuaries, and cool crisp mountain air.",
      itinerary: [
        {
          day: "Day 1",
          title: "Arrival in Kochi & Scenic Drive to Munnar (130 km / 4 hrs)",
          description:
            "Our friendly local driver will receive you at Kochi Airport (COK) or Ernakulam Railway Station. Enjoy a breathtaking drive through spice plantations and stop at Cheeyappara and Valara Waterfalls. Check-in to your resort in Munnar and relax. Evening at leisure.",
        },
        {
          day: "Day 2",
          title: "Full Day Munnar Tea Gardens & Wildlife Sightseeing",
          description:
            "After a delicious breakfast, visit Eravikulam National Park to spot the endangered Nilgiri Tahr. Proceed to Mattupetty Dam for boat rides, Echo Point, Kundala Lake, and the Tea Museum to witness tea processing. Evening walk through Munnar town spice market.",
        },
        {
          day: "Day 3",
          title: "Munnar to Kochi Departure Transfer",
          description:
            "Enjoy your morning breakfast with misty hill views. Check out from the resort and stop by Blossom Hydel Park and spice shopping. Drop-off at Kochi Airport or Railway Station for your onwards journey with golden memories.",
        },
      ],
      inclusions: [
        "Dedicated AC Private Vehicle for all transfers & sightseeing",
        "Fuel, Toll, Parking charges, & Driver Allowances included",
        "Daily Breakfast at resort",
        "2 Nights accommodation in Deluxe AC room",
        "24/7 WhatsApp & Phone Concierge support",
      ],
      exclusions: [
        "Airfare or Train tickets to/from Kochi",
        "Entry tickets to National Parks, Boating, & Monuments",
        "Lunch and Dinner (unless specified)",
        "Personal expenses like laundry, room service, or tips",
      ],
    };
  }

  if (normalized.includes("houseboat") || normalized.includes("alleppey")) {
    return {
      title: "Alleppey Luxury Backwater Houseboat Cruise",
      duration: "2 Days / 1 Night",
      location: "Alleppey Backwaters, Kerala",
      price: "₹9,800 / couple",
      imageUrl:
        "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1600&auto=format&fit=crop",
      highlights: [
        "Private Deluxe/Luxury AC Houseboat for Exclusive Use",
        "Traditional Welcome Drink, Lunch, High Tea, & Dinner",
        "Authentic Kerala Karimeen Pollichathu (Pearl Spot Fish)",
        "Cruising along Vembanad Lake & Narrow Village Canals",
        "Overnight Stay Moored in Peaceful Backwater Village",
      ],
      description:
        "Experience the iconic hallmark of Kerala tourism—an overnight cruise on a traditional Kettuvallam houseboat. Sail past emerald paddy fields, coconut groves, and tranquil backwater villages.",
      itinerary: [
        {
          day: "Day 1",
          title: "Check-in at Alleppey Jetty & Backwater Cruise",
          description:
            "Board your private luxury houseboat at Alleppey Jetty by 12:00 PM. Enjoy a traditional welcome drink as the houseboat sets sail across Vembanad Lake. Savor a lavish traditional Kerala lunch served on banana leaves. Cruise through narrow canals, watching rural backwater life. Anchorage at 5:30 PM with candlelit dinner.",
        },
        {
          day: "Day 2",
          title: "Morning Cruise, Breakfast & Checkout",
          description:
            "Wake up to idyllic water reflections and chirping birds. Enjoy a 1-hour morning cruise accompanied by freshly prepared Kerala breakfast (Appam, Stew, Tea/Coffee). Disembark at 9:00 AM with unforgettable backwater memories.",
        },
      ],
      inclusions: [
        "Exclusive Private AC Houseboat (No shared guests)",
        "Welcome Drink, Lunch, Evening Snacks, Dinner, & Breakfast",
        "Professional Onboard Chef & Boat Crew",
        "Full Cruise itinerary covering Vembanad Lake & canals",
      ],
      exclusions: [
        "Vehicle transfers to/from Alleppey Jetty",
        "Canoe/Shikara narrow canal rides (Optional extra)",
        "Personal beverages or tips for boat crew",
      ],
    };
  }

  // Default Fallback
  return {
    title: "Complete Kerala Panorama Holiday",
    duration: "6 Days / 5 Nights",
    location: "Munnar + Thekkady + Alleppey + Kochi",
    price: "₹18,500 / person",
    imageUrl:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop",
    highlights: [
      "Munnar Hill Station & Tea Gardens (2 Nights)",
      "Thekkady Wildlife Sanctuary & Spice Plantation (1 Night)",
      "Alleppey Luxury Houseboat Overnight Cruise (1 Night)",
      "Kochi Historic Fort Area Sightseeing & Departure (1 Night)",
      "Private AC Sedan/SUV Cab Throughout the Trip",
    ],
    description:
      "The ultimate Kerala holiday package covering hill stations, spice gardens, backwaters, and heritage sights with personalized service.",
    itinerary: [
      {
        day: "Day 1",
        title: "Kochi Arrival & Drive to Munnar",
        description: "Pickup from Kochi Airport and transfer to Munnar hill station. Check-in to resort.",
      },
      {
        day: "Day 2",
        title: "Munnar Full Day Tour",
        description: "Visit Eravikulam National Park, Mattupetty Dam, and Tea Museum.",
      },
      {
        day: "Day 3",
        title: "Munnar to Thekkady Spice Sanctuary",
        description: "Scenic mountain drive to Thekkady. Boat safari in Periyar Wildlife Sanctuary.",
      },
      {
        day: "Day 4",
        title: "Thekkady to Alleppey Houseboat",
        description: "Drive to Alleppey backwaters. Board private houseboat at 12 PM with all meals.",
      },
      {
        day: "Day 5",
        title: "Alleppey to Fort Kochi Sightseeing",
        description: "Visit Chinese Fishing Nets, St. Francis Church, and Mattancherry Palace.",
      },
      {
        day: "Day 6",
        title: "Kochi Departure",
        description: "Morning shopping and drop-off at Kochi Airport or Railway Station.",
      },
    ],
    inclusions: [
      "Private AC Cab for 6 Days",
      "Daily Breakfast + All Houseboat Meals",
      "4-Star & 3-Star Handpicked Hotel Stays",
      "Tolls, Parking, Driver Allowance",
    ],
    exclusions: [
      "Airfare / Train tickets",
      "Entry tickets & Boating charges",
      "Personal expenses",
    ],
  };
}

export async function generateStaticParams() {
  try {
    const packages = await client.fetch<Array<{ slug?: string }>>(
      `*[_type == "tourPackage" && defined(slug.current)]{ "slug": slug.current }`
    );
    const sanitySlugs = (packages || [])
      .map((p) => ({ slug: String(p.slug) }))
      .filter((s) => Boolean(s.slug));
    const defaultSlugs = [
      { slug: "munnar-tea-hills" },
      { slug: "alleppey-houseboat" },
      { slug: "wayanad-nature" },
      { slug: "kovalam-beach" },
      { slug: "thekkady-safari" },
      { slug: "kerala-honeymoon" },
    ];
    return [...defaultSlugs, ...sanitySlugs];
  } catch {
    return [
      { slug: "munnar-tea-hills" },
      { slug: "alleppey-houseboat" },
      { slug: "wayanad-nature" },
      { slug: "kovalam-beach" },
      { slug: "thekkady-safari" },
      { slug: "kerala-honeymoon" },
    ];
  }
}

export default async function PackageDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const sanityPkg = await client.fetch<SanityDocument | null>(PACKAGE_DETAIL_QUERY, { slug }, options);

  const pkg = sanityPkg || getFallbackPackage(slug);
  const cleanWhatsapp = "919876543210";
  const whatsappMsg = `Hi! I am interested in booking/customizing the package: "${pkg.title}" (${pkg.duration}). Please share full details and best price quote.`;
  const whatsappUrl = `https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent(whatsappMsg)}`;

  if (!pkg) return notFound();

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans">
      {/* Top Banner */}
      <div className="bg-emerald-900 text-emerald-100 text-xs py-2 px-6 text-center font-medium">
        🌿 Authorized Local Kerala Operator • Direct Cab Drivers & Houseboats • 100% Customization
      </div>

      {/* Header */}
      <header className="bg-white border-b border-stone-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-emerald-700 text-white font-bold flex items-center justify-center text-xl shadow">
              🌴
            </div>
            <div>
              <span className="font-extrabold text-lg text-stone-900 tracking-tight block">Kerala Green Haven</span>
              <span className="text-[10px] text-emerald-700 font-bold uppercase tracking-widest block -mt-1">Tours & Travels • Kochi, Kerala</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-semibold text-stone-600 hover:text-emerald-700">Home</Link>
            <Link href="/packages" className="text-sm font-bold text-emerald-700 border-b-2 border-emerald-700 pb-1">Packages</Link>
            <Link href="/about" className="text-sm font-semibold text-stone-600 hover:text-emerald-700">About Us</Link>
            <Link href="/contact" className="text-sm font-semibold text-stone-600 hover:text-emerald-700">Contact Us</Link>
          </nav>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg bg-[#25D366] text-white hover:bg-[#20ba59] transition-all shadow"
          >
            💬 Inquire Package on WhatsApp
          </a>
        </div>
      </header>

      {/* Breadcrumbs */}
      <div className="bg-stone-100 border-b border-stone-200 py-3 px-6 text-xs text-stone-600">
        <div className="max-w-7xl mx-auto flex items-center gap-2">
          <Link href="/" className="hover:text-emerald-700">Home</Link>
          <span>/</span>
          <Link href="/packages" className="hover:text-emerald-700">Kerala Packages</Link>
          <span>/</span>
          <span className="font-bold text-stone-900">{pkg.title as string}</span>
        </div>
      </div>

      {/* Hero Banner */}
      <section className="relative min-h-[380px] sm:min-h-[440px] flex items-end justify-start px-6 py-12 text-white overflow-hidden">
        <img
          src={(pkg.imageUrl as string) || "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=80&w=1600"}
          alt={pkg.title as string}
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/40 to-transparent z-10" />

        <div className="max-w-7xl mx-auto w-full relative z-20 space-y-3">
          <div className="flex flex-wrap gap-2">
            <span className="bg-emerald-700 text-white text-xs font-bold px-3 py-1 rounded-md shadow">
              {pkg.duration as string}
            </span>
            <span className="bg-white/90 text-stone-900 text-xs font-bold px-3 py-1 rounded-md shadow">
              📍 {pkg.location as string}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">{pkg.title as string}</h1>
          <p className="text-amber-300 font-extrabold text-xl sm:text-2xl">Starting from {pkg.price as string}</p>
        </div>
      </section>

      {/* Main Content Layout */}
      <main className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Details & Itinerary */}
        <div className="lg:col-span-8 space-y-12">
          {/* Overview */}
          <div className="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-extrabold text-stone-900 tracking-tight">Package Overview</h2>
            <p className="text-stone-600 text-sm leading-relaxed">{pkg.description as string}</p>

            {Array.isArray(pkg.highlights) && pkg.highlights.length > 0 && (
              <div className="pt-4 border-t border-stone-100">
                <h3 className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-3">Key Highlights:</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-medium text-stone-800">
                  {pkg.highlights.map((item: string, idx: number) => (
                    <li key={idx} className="flex items-center gap-2 bg-emerald-50 text-emerald-950 p-2.5 rounded-lg border border-emerald-100">
                      <span className="text-emerald-600">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Day-by-Day Detailed Itinerary */}
          {Array.isArray(pkg.itinerary) && pkg.itinerary.length > 0 && (
            <div className="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm space-y-6">
              <h2 className="text-2xl font-extrabold text-stone-900 tracking-tight">Day-by-Day Itinerary</h2>

              <div className="space-y-6 relative border-l-2 border-emerald-600 ml-4 pl-6">
                {pkg.itinerary.map((item: { day: string; title: string; description: string }, idx: number) => (
                  <div key={idx} className="relative group">
                    <div className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-emerald-600 border-4 border-white shadow" />
                    <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded inline-block mb-1">
                      {item.day}
                    </span>
                    <h3 className="text-lg font-bold text-stone-900 mb-2">{item.title}</h3>
                    <p className="text-stone-600 text-xs leading-relaxed bg-stone-50 p-4 rounded-xl border border-stone-200">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Inclusions & Exclusions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Inclusions */}
            {Array.isArray(pkg.inclusions) && pkg.inclusions.length > 0 && (
              <div className="bg-white p-6 rounded-2xl border border-emerald-200 bg-emerald-50/20 space-y-3">
                <h3 className="text-base font-extrabold text-emerald-800 flex items-center gap-2">
                  <span>✅</span> What's Included
                </h3>
                <ul className="space-y-2 text-xs text-stone-700 font-medium">
                  {pkg.inclusions.map((inc: string, i: number) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">•</span>
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Exclusions */}
            {Array.isArray(pkg.exclusions) && pkg.exclusions.length > 0 && (
              <div className="bg-white p-6 rounded-2xl border border-rose-200 bg-rose-50/20 space-y-3">
                <h3 className="text-base font-extrabold text-rose-800 flex items-center gap-2">
                  <span>❌</span> What's Excluded
                </h3>
                <ul className="space-y-2 text-xs text-stone-700 font-medium">
                  {pkg.exclusions.map((exc: string, i: number) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-rose-500 font-bold">•</span>
                      <span>{exc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Sticky Booking & WhatsApp Sidebar */}
        <div className="lg:col-span-4">
          <div className="sticky top-28 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-md space-y-6">
              <div className="border-b border-stone-100 pb-4">
                <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Package Price</span>
                <p className="text-3xl font-extrabold text-emerald-700 mt-1">{pkg.price as string}</p>
                <p className="text-[11px] text-stone-500 mt-1">Includes Private Cab + Hotels + Meals</p>
              </div>

              <div className="space-y-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-extrabold text-sm tracking-wide transition-all shadow-md"
                >
                  <span>Book / Inquire on WhatsApp</span>
                  <span>💬</span>
                </a>

                <a
                  href="tel:+919876543210"
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-stone-900 hover:bg-black text-white font-bold text-xs transition-colors"
                >
                  <span>📞 Call Kerala Office: +91 98765 43210</span>
                </a>
              </div>

              <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 space-y-2 text-xs text-stone-600">
                <p className="font-bold text-stone-900">Why book with us?</p>
                <p>✓ 100% Customized Day-by-Day Itineraries</p>
                <p>✓ Direct Cab Driver & Houseboat Ownership</p>
                <p>✓ Zero Hidden Cancellation Fees</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-stone-200 py-10 text-center text-xs text-stone-500">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© 2026 Kerala Green Haven Tours & Travels, Kochi, Kerala, India.</p>
          <div className="flex gap-6">
            <Link href="/" className="hover:text-emerald-700">Home</Link>
            <Link href="/packages" className="hover:text-emerald-700">Packages</Link>
            <Link href="/contact" className="hover:text-emerald-700">Contact Us</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
