import { client } from "@/sanity/client";
import { defineQuery, type SanityDocument } from "next-sanity";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { getPrimaryPhoneNumber, getWhatsAppUrl } from "@/utils/phone";

const CONTACT_PAGE_QUERY = defineQuery(
  `*[_type == "contactPage"][0]{
    title,
    whatsappNumber,
    phonePrimary,
    phoneSecondary,
    email,
    officeAddress,
    businessHours,
    whatsappMessagePrefix
  }`
);

const options = { next: { revalidate: 60 } };

export default async function ContactPage() {
  const contactData = await client.fetch<SanityDocument | null>(CONTACT_PAGE_QUERY, {}, options);

  const phonePrimary = contactData?.phonePrimary || "+91 98765 43210";
  const phoneSecondary = contactData?.phoneSecondary || "+91 484 2345678";
  const whatsappNumber = contactData?.whatsappNumber || "+919876543210";
  const email = contactData?.email || "info@keralagreenhaventours.com";
  const officeAddress =
    contactData?.officeAddress ||
    "Door No. 42/1080, Marine Drive Promenade, Ernakulam, Kochi, Kerala 682031, India";
  const businessHours =
    contactData?.businessHours || "Mon - Sat: 9:00 AM - 8:00 PM IST | Sun: 10:00 AM - 5:00 PM IST";
  const cleanWhatsapp = whatsappNumber.replace(/[^0-9]/g, "");

  return (
    <div className="text-stone-900 font-sans">
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white py-14 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="text-xs uppercase font-bold tracking-widest text-amber-300 mb-2 block">
            We Are Located in Kochi, Kerala
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Contact Our Local Kerala Travel Experts
          </h1>
          <p className="text-emerald-100 text-base font-normal">
            Have questions or need a customized Kerala itinerary for Munnar, Alleppey houseboats, Wayanad, or Kovalam? Call us or send a message!
          </p>
        </div>
      </section>

      {/* Main Content Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Contact Cards */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm space-y-6">
            <h2 className="text-xl font-extrabold text-stone-900 border-b border-stone-100 pb-4">
              Registered Office Information
            </h2>

            {/* Office Address */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center text-lg shrink-0">
                📍
              </div>
              <div>
                <p className="text-xs font-bold text-stone-500 uppercase tracking-wider">Office Address</p>
                <p className="text-sm font-semibold text-stone-800 mt-0.5 leading-relaxed">
                  {officeAddress}
                </p>
              </div>
            </div>

            {/* Phone Numbers */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center text-lg shrink-0">
                📞
              </div>
              <div>
                <p className="text-xs font-bold text-stone-500 uppercase tracking-wider">Direct Phone Support</p>
                <p className="text-sm font-semibold text-stone-800 mt-0.5">
                  <a href={`tel:${getPrimaryPhoneNumber(phonePrimary)}`} className="hover:text-emerald-700">
                    {phonePrimary}
                  </a>
                  {" / "}
                  <a href={`tel:${getPrimaryPhoneNumber(phoneSecondary)}`} className="hover:text-emerald-700">
                    {phoneSecondary}
                  </a>
                </p>
              </div>
            </div>

            {/* Email Address */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center text-lg shrink-0">
                ✉️
              </div>
              <div>
                <p className="text-xs font-bold text-stone-500 uppercase tracking-wider">Official Email</p>
                <p className="text-sm font-semibold text-emerald-700 mt-0.5">
                  <a href={`mailto:${email}`}>{email}</a>
                </p>
              </div>
            </div>

            {/* Working Hours */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center text-lg shrink-0">
                🕒
              </div>
              <div>
                <p className="text-xs font-bold text-stone-500 uppercase tracking-wider">Working Hours</p>
                <p className="text-sm text-stone-700 mt-0.5">{businessHours}</p>
              </div>
            </div>
          </div>

          {/* Quick WhatsApp Card */}
          <div className="bg-gradient-to-r from-emerald-700 to-teal-800 text-white p-8 rounded-2xl shadow-md">
            <h3 className="text-lg font-extrabold mb-2">Prefer Instant Chat?</h3>
            <p className="text-emerald-100 text-xs mb-6">
              Our local Kerala tour managers reply within 5 minutes on WhatsApp!
            </p>
            <a
              href={getWhatsAppUrl(
                whatsappNumber,
                "Hi! I want to plan a Kerala holiday trip."
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-sm rounded-xl transition-all shadow-md"
            >
              <WhatsAppIcon className="w-5 h-5 fill-current" />
              <span>Chat Directly on WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Right Column: Inquiry Form */}
        <div className="lg:col-span-7">
          <div className="bg-white p-8 sm:p-10 rounded-2xl border border-stone-200 shadow-sm">
            <h2 className="text-2xl font-extrabold text-stone-900 mb-2">Send Us a Tour Inquiry</h2>
            <p className="text-stone-500 text-xs mb-8">
              Fill out your trip preferences below and our Kerala tour planner will call/WhatsApp you with custom package options & best quotes.
            </p>

            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Kumar"
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:border-emerald-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                    WhatsApp / Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +91 98765 43210"
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:border-emerald-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                    Preferred Destination
                  </label>
                  <select className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:border-emerald-600 cursor-pointer">
                    <option>Munnar & Alleppey Combo</option>
                    <option>Complete Kerala (Munnar, Thekkady, Alleppey, Kovalam)</option>
                    <option>Alleppey Houseboat Exclusive Cruise</option>
                    <option>Wayanad Rainforest & Waterfalls</option>
                    <option>Kovalam & Poovar Beach Island</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                    Expected Travel Month / Date
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. November 2026 / 15th Oct"
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:border-emerald-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                  Special Requirements / Number of Travellers
                </label>
                <textarea
                  rows={4}
                  placeholder="Tell us about your group size (Adults / Children), hotel category (3-star, 4-star, 5-star resort), pickup airport, etc."
                  className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:border-emerald-600 resize-none"
                />
              </div>

              <button
                type="button"
                className="w-full py-4 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-sm uppercase tracking-wider rounded-xl transition-all shadow-md"
              >
                Submit Tour Inquiry →
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
