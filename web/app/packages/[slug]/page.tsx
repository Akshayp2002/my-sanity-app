import type { Metadata } from "next";
import { client } from "@/sanity/client";
import { defineQuery, type SanityDocument } from "next-sanity";
import Link from "next/link";
import { notFound } from "next/navigation";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { getWhatsAppUrl } from "@/utils/phone";

const PACKAGE_DETAIL_QUERY = defineQuery(
  `*[_type == "tourPackage" && (slug.current == $slug || _id == $slug)][0]{
    _id,
    title,
    slug,
    duration,
    tag,
    location,
    price,
    imageUrl,
    highlights,
    description,
    itinerary[]{ dayNumber, title, description },
    inclusions,
    exclusions,
    metaTitle,
    metaDescription
  }`
);

const options = { next: { revalidate: 60 } };

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const pkg = await client.fetch<SanityDocument | null>(PACKAGE_DETAIL_QUERY, { slug }, options);

  if (!pkg) {
    return { title: "Package Not Found" };
  }

  const title = pkg.metaTitle || `${pkg.title} (${pkg.tag || "Kerala Tour"})`;
  const description =
    pkg.metaDescription ||
    pkg.description ||
    `Book ${pkg.title} with private AC cab transfers, certified hotels, and custom Kerala itineraries.`;
  const image =
    pkg.imageUrl || "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1200";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: image }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export async function generateStaticParams() {
  const slugs = await client.fetch<Array<{ slug: { current: string } }>>(
    `*[_type == "tourPackage"]{ slug }`
  );

  return (
    slugs
      ?.map((item) => ({
        slug: item.slug?.current || "",
      }))
      .filter((item) => item.slug.length > 0) || [
      { slug: "munnar-tea-hills" },
      { slug: "alleppey-houseboat" },
      { slug: "wayanad-nature" },
      { slug: "kovalam-beach" },
    ]
  );
}

export default async function PackageDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  const pkg = await client.fetch<SanityDocument | null>(
    PACKAGE_DETAIL_QUERY,
    { slug },
    options
  );

  if (!pkg) {
    notFound();
  }

  const durationTag = pkg.tag || pkg.duration || "3 Days / 2 Nights";
  const whatsappPhone = "+919876543210";
  const whatsappUrl = getWhatsAppUrl(
    whatsappPhone,
    `Hi! I want to book/customize the "${pkg.title}" package (${durationTag}).`
  );

  return (
    <div className="text-stone-900 font-sans">
      {/* Breadcrumbs */}
      <div className="bg-stone-100 border-b border-stone-200 py-3 px-4 sm:px-6 text-xs text-stone-600">
        <div className="max-w-7xl mx-auto flex items-center gap-2">
          <Link href="/" className="hover:text-emerald-700">
            Home
          </Link>
          <span>/</span>
          <Link href="/packages" className="hover:text-emerald-700">
            Kerala Packages
          </Link>
          <span>/</span>
          <span className="font-bold text-stone-900 truncate">{pkg.title as string}</span>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative h-72 sm:h-96 w-full bg-emerald-950 overflow-hidden">
        <img
          src={
            (pkg.imageUrl as string) ||
            "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=80&w=1600&auto=format&fit=crop"
          }
          alt={pkg.title as string}
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/95 via-emerald-950/40 to-transparent flex items-end">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-8 w-full">
            <span className="inline-block bg-emerald-700 text-white text-xs font-bold px-3 py-1 rounded-md mb-3 shadow">
              {durationTag}
            </span>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-2">
              {pkg.title as string}
            </h1>
            <p className="text-emerald-200 text-sm font-medium">
              📍 {pkg.location as string || "Kerala, India"} • Private AC Cab & Dedicated Driver Included
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column (Overview, Highlights, Itinerary, Inclusions) */}
        <div className="lg:col-span-8 space-y-10">
          {/* Overview */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-sm space-y-4">
            <h2 className="text-xl font-extrabold text-stone-900">Package Overview</h2>
            <p className="text-stone-600 text-sm leading-relaxed whitespace-pre-line">
              {pkg.description as string}
            </p>
          </section>

          {/* Highlights */}
          {Array.isArray(pkg.highlights) && pkg.highlights.length > 0 && (
            <section className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-sm space-y-4">
              <h2 className="text-xl font-extrabold text-stone-900">Key Highlights</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {pkg.highlights.map((h: string, idx: number) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-stone-700 font-medium">
                    <span className="text-emerald-600 font-bold shrink-0">✓</span>
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Day-by-Day Itinerary */}
          {Array.isArray(pkg.itinerary) && pkg.itinerary.length > 0 && (
            <section className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-sm space-y-6">
              <h2 className="text-xl font-extrabold text-stone-900">Day-by-Day Sightseeing Itinerary</h2>
              <div className="space-y-6">
                {pkg.itinerary.map(
                  (
                    item: { dayNumber?: number; day?: string; title: string; description: string },
                    idx: number
                  ) => (
                    <div
                      key={idx}
                      className="border-l-2 border-emerald-600 pl-4 sm:pl-6 relative pb-2 last:pb-0"
                    >
                      <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-emerald-600 border-2 border-white shadow" />
                      <span className="text-[11px] font-extrabold text-emerald-800 uppercase tracking-widest block mb-1">
                        Day {item.dayNumber || idx + 1}
                      </span>
                      <h3 className="text-base font-bold text-stone-900 mb-2">{item.title}</h3>
                      <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">{item.description}</p>
                    </div>
                  )
                )}
              </div>
            </section>
          )}

          {/* Inclusions & Exclusions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {Array.isArray(pkg.inclusions) && pkg.inclusions.length > 0 && (
              <section className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-3">
                <h3 className="text-base font-extrabold text-emerald-800">What’s Included</h3>
                <ul className="space-y-2 text-xs text-stone-700">
                  {pkg.inclusions.map((inc: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold shrink-0">✓</span>
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {Array.isArray(pkg.exclusions) && pkg.exclusions.length > 0 && (
              <section className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-3">
                <h3 className="text-base font-extrabold text-rose-800">What’s Excluded</h3>
                <ul className="space-y-2 text-xs text-stone-700">
                  {pkg.exclusions.map((exc: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-rose-600 font-bold shrink-0">✕</span>
                      <span>{exc}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </div>

        {/* Right Sticky Booking Sidebar */}
        <div className="lg:col-span-4">
          <div className="sticky top-28 bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-xl space-y-6">
            <div>
              <span className="text-xs font-bold text-stone-500 uppercase tracking-widest">
                Starting From
              </span>
              <p className="text-3xl font-extrabold text-emerald-700 mt-1">{pkg.price as string}</p>
              <p className="text-[11px] text-stone-500 mt-1">Includes Private Cab + Hotels + Meals</p>
            </div>

            <div className="space-y-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-extrabold text-sm tracking-wide transition-all shadow-md min-h-[44px]"
              >
                <WhatsAppIcon className="w-5 h-5 fill-current" />
                <span>Book / Inquire on WhatsApp</span>
              </a>

              <a
                href="tel:+919876543210"
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-stone-900 hover:bg-black text-white font-bold text-xs transition-colors min-h-[44px]"
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
    </div>
  );
}
