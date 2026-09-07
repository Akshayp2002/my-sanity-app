import { client } from "@/sanity/client";
import { defineQuery, type SanityDocument } from "next-sanity";

const PACKAGES_QUERY = defineQuery(
  `*[_type == "tourPackage"]{
    _id,
    title,
    slug,
    duration,
    location,
    price,
    imageUrl,
    highlights,
    description
  }`
);

const options = { next: { revalidate: 10 } };

export default async function PackagesPage() {
  const sanityPackages = await client.fetch<SanityDocument[]>(PACKAGES_QUERY, {}, options);

  // Kerala Holiday Packages Fallback Data
  const packages = sanityPackages.length
    ? sanityPackages
    : [
        {
          _id: "1",
          title: "Munnar Tea Hills & Mist Explorer",
          duration: "3 Days / 2 Nights",
          location: "Munnar, Kerala",
          price: "₹8,500 / person",
          imageUrl:
            "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=80&w=800&auto=format&fit=crop",
          highlights: ["Private AC Sedan Cab", "Mattupetty Dam", "Tea Factory Tour", "Eravikulam National Park"],
          description:
            "Relax amidst misty tea plantations, cascading waterfalls, and cool mountain breezes in Kerala's premier hill station.",
        },
        {
          _id: "2",
          title: "Alleppey Luxury Houseboat Cruise",
          duration: "2 Days / 1 Night",
          location: "Alleppey Backwaters",
          price: "₹9,800 / couple",
          imageUrl:
            "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=800&auto=format&fit=crop",
          highlights: ["Private AC Deluxe Houseboat", "All Meals Included", "Vembanad Lake Cruise", "Traditional Karimeen Fry"],
          description:
            "Glide along tranquil palm-fringed backwaters with authentic Kerala seafood cooked fresh onboard your private houseboat.",
        },
        {
          _id: "3",
          title: "Wayanad Nature & Waterfalls Escape",
          duration: "4 Days / 3 Nights",
          location: "Wayanad, Kerala",
          price: "₹12,900 / person",
          imageUrl:
            "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=800&auto=format&fit=crop",
          highlights: ["Edakkal Caves", "Banasura Sagar Dam", "Chembra Peak Trek", "Treehouse Resort Stay"],
          description:
            "Discover ancient caves, lush rain forests, pristine lakes, and eco-resort stays in northern Kerala.",
        },
        {
          _id: "4",
          title: "Kovalam Beach & Poovar Island Retreat",
          duration: "5 Days / 4 Nights",
          location: "Kovalam & Trivandrum",
          price: "₹16,500 / person",
          imageUrl:
            "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop",
          highlights: ["Lighthouse Beach", "Poovar Mangrove Boat Ride", "Padmanabhaswamy Temple", "Ayurvedic Massage"],
          description:
            "Golden sandy beaches, traditional Ayurvedic rejuvenation therapies, and backwater boat rides through mangrove forests.",
        },
        {
          _id: "5",
          title: "Thekkady Spice Plantation & Wildlife Safari",
          duration: "3 Days / 2 Nights",
          location: "Thekkady / Periyar",
          price: "₹9,500 / person",
          imageUrl:
            "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=800&auto=format&fit=crop",
          highlights: ["Periyar Lake Wildlife Boat Ride", "Spice Garden Walk", "Kathakali Cultural Show", "Elephant Ride"],
          description:
            "Experience wild elephant sightings, aromatic cardamom & pepper plantations, and authentic Kerala cultural performances.",
        },
        {
          _id: "6",
          title: "Grand Kerala Honeymoon Special",
          duration: "7 Days / 6 Nights",
          location: "Munnar + Thekkady + Alleppey + Kovalam",
          price: "₹28,000 / couple",
          imageUrl:
            "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?q=80&w=800&auto=format&fit=crop",
          highlights: ["Candlelight Dinner", "Flower Bed Decoration", "Private Houseboat", "4-Star Resort Stays"],
          description:
            "The ultimate romantic journey across Kerala's hills, backwaters, and beaches with special honeymoon inclusions.",
        },
      ];

  const whatsappPhone = "919876543210";

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans">
      {/* Top Notification Bar */}
      <div className="bg-emerald-900 text-emerald-100 text-xs py-2 px-6 text-center font-medium">
        🌿 Local Tour Operator in Kochi, Kerala • Direct Cab Drivers & Houseboat Owners • No Middlemen Commission!
      </div>

      {/* Header */}
      <header className="bg-white border-b border-stone-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-emerald-700 text-white font-bold flex items-center justify-center text-xl shadow">
              🌴
            </div>
            <div>
              <span className="font-extrabold text-lg text-stone-900 tracking-tight block">Kerala Green Haven</span>
              <span className="text-[10px] text-emerald-700 font-bold uppercase tracking-widest block -mt-1">Tours & Travels • Kochi, Kerala</span>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            <a href="/" className="text-sm font-semibold text-stone-600 hover:text-emerald-700">Home</a>
            <a href="/packages" className="text-sm font-bold text-emerald-700 border-b-2 border-emerald-700 pb-1">Kerala Packages</a>
            <a href="/about" className="text-sm font-semibold text-stone-600 hover:text-emerald-700">About Us</a>
            <a href="/contact" className="text-sm font-semibold text-stone-600 hover:text-emerald-700">Contact Us</a>
          </nav>

          <a
            href={`https://wa.me/${whatsappPhone}?text=Hi%2C%20I%20want%20to%20inquire%20about%20Kerala%20tour%20packages.`}
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg bg-[#25D366] text-white hover:bg-[#20ba59] transition-all shadow"
          >
            💬 Inquire on WhatsApp
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-emerald-900 via-teal-900 to-emerald-950 text-white py-16 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="text-xs uppercase font-bold tracking-widest text-amber-300 mb-2 block">Customized Kerala Tour Packages</span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">Explore Bestselling Kerala Holidays</h1>
          <p className="text-emerald-100 text-base font-normal">
            All tour packages include dedicated AC cabs, experienced local drivers, handpicked hotels, and authentic houseboat experiences.
          </p>
        </div>
      </section>

      {/* Packages Grid */}
      <main className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg) => {
            const waMsg = `Hi! I am interested in booking/customizing the "${pkg.title}" (${pkg.duration}). Please share details.`;
            const waUrl = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(waMsg)}`;

            return (
              <div
                key={pkg._id}
                className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-56 w-full overflow-hidden bg-stone-100">
                    <img
                      src={pkg.imageUrl || "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=800"}
                      alt={pkg.title as string}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-3 left-3 bg-emerald-800 text-white text-[11px] font-bold px-3 py-1 rounded-md shadow">
                      {pkg.duration as string}
                    </span>
                    <span className="absolute bottom-3 right-3 bg-white text-stone-900 font-extrabold text-sm px-3 py-1 rounded-md shadow border border-stone-200">
                      {pkg.price as string}
                    </span>
                  </div>

                  <div className="p-6">
                    <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block mb-1">
                      {pkg.location as string}
                    </span>
                    <h3 className="text-lg font-bold text-stone-900 mb-3">{pkg.title as string}</h3>
                    <p className="text-stone-600 text-xs leading-relaxed mb-4">{pkg.description as string}</p>

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
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs tracking-wide transition-all shadow"
                  >
                    <span>Inquire on WhatsApp</span>
                    <span>💬</span>
                  </a>
                  <a
                    href="/contact"
                    className="block text-center w-full py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-xs transition-colors"
                  >
                    Customized Quote Call
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-stone-200 py-10 text-center text-xs text-stone-500">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© 2026 Kerala Green Haven Tours & Travels, Kochi, Kerala, India.</p>
          <div className="flex gap-6">
            <a href="/" className="hover:text-emerald-700">Home</a>
            <a href="/about" className="hover:text-emerald-700">About Us</a>
            <a href="/contact" className="hover:text-emerald-700">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
