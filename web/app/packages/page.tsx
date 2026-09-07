import { client } from "@/sanity/client";
import { defineQuery, type SanityDocument } from "next-sanity";
import Link from "next/link";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { getWhatsAppUrl } from "@/utils/phone";

const PACKAGES_QUERY = defineQuery(
  `*[_type == "tourPackage"] | order(order asc){
    _id,
    title,
    slug,
    tag,
    duration,
    location,
    price,
    rating,
    imageUrl,
    highlights,
    description
  }`
);

const options = { next: { revalidate: 60 } };

export default async function PackagesPage() {
  const sanityPackages = await client.fetch<SanityDocument[]>(PACKAGES_QUERY, {}, options);
  const packages = sanityPackages || [];
  const whatsappPhone = "+919876543210";
  const cleanWhatsapp = whatsappPhone.replace(/[^0-9]/g, "");

  return (
    <div className="text-stone-900 font-sans">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-900 text-white py-16 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="text-xs uppercase font-bold tracking-widest text-amber-300 mb-2 block">
            Customized Kerala Tour Packages
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Explore Bestselling Kerala Holidays
          </h1>
          <p className="text-emerald-100 text-base font-normal">
            All tour packages include dedicated AC cabs, experienced local drivers, handpicked hotels, and authentic houseboat experiences.
          </p>
        </div>
      </section>

      {/* Packages Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg) => {
            const detailSlug =
              typeof pkg.slug === "object" ? pkg.slug?.current : pkg.slug || "munnar-tea-hills";
            const durationTag = pkg.tag || pkg.duration || "3 Days / 2 Nights";
            const waMsg = `Hi! I am interested in booking/customizing the "${pkg.title}" (${durationTag}). Please share details.`;
            const waUrl = getWhatsAppUrl(whatsappPhone, waMsg);

            return (
              <div
                key={pkg._id}
                className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <Link href={`/packages/${detailSlug}`} className="block relative h-56 w-full overflow-hidden bg-stone-100">
                    <img
                      src={
                        pkg.imageUrl ||
                        "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=800"
                      }
                      alt={pkg.title as string}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-emerald-800 text-white text-[11px] font-bold px-3 py-1 rounded-md shadow">
                      {durationTag}
                    </span>
                    {pkg.price && (
                      <span className="absolute bottom-3 right-3 bg-white text-stone-900 font-extrabold text-sm px-3 py-1 rounded-md shadow border border-stone-200">
                        {pkg.price as string}
                      </span>
                    )}
                  </Link>

                  <div className="p-6">
                    <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block mb-1">
                      {pkg.location as string || "Kerala, India"}
                    </span>
                    <Link href={`/packages/${detailSlug}`} className="hover:text-emerald-700 transition-colors">
                      <h3 className="text-lg font-bold text-stone-900 mb-2">{pkg.title as string}</h3>
                    </Link>
                    <p className="text-stone-600 text-xs leading-relaxed mb-4 line-clamp-3">{pkg.description as string}</p>

                    {Array.isArray(pkg.highlights) && pkg.highlights.length > 0 && (
                      <div className="space-y-1.5 border-t border-stone-100 pt-3">
                        <p className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">Includes:</p>
                        <div className="flex flex-wrap gap-1.5">
                          {pkg.highlights.map((item: string, i: number) => (
                            <span key={i} className="text-[11px] bg-stone-100 text-stone-700 px-2.5 py-0.5 rounded font-medium">
                              ✓ {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-6 pt-0 space-y-2">
                  <Link
                    href={`/packages/${detailSlug}`}
                    className="block text-center w-full py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs transition-colors shadow"
                  >
                    View Day-by-Day Itinerary →
                  </Link>
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs tracking-wide transition-all shadow"
                  >
                    <WhatsAppIcon className="w-4 h-4 fill-current" />
                    <span>Inquire on WhatsApp</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
