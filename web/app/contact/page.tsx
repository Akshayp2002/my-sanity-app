import { client } from "@/sanity/client";
import { defineQuery, type SanityDocument } from "next-sanity";

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

const options = { next: { revalidate: 10 } };

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
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans">
      {/* Top Bar */}
      <div className="bg-emerald-900 text-emerald-100 text-xs py-2 px-6 text-center font-medium">
        🌴 Authorized Local Kerala Tour Operator • Govt Approved Reg. No: KTD-2026-981
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
            <a href="/packages" className="text-sm font-semibold text-stone-600 hover:text-emerald-700">Kerala Packages</a>
            <a href="/about" className="text-sm font-semibold text-stone-600 hover:text-emerald-700">About Us</a>
            <a href="/contact" className="text-sm font-bold text-emerald-700 border-b-2 border-emerald-700 pb-1">Contact Us</a>
          </nav>

          <a
            href={`https://wa.me/${cleanWhatsapp}?text=Hi%2C%20I%20want%20to%20plan%20a%20Kerala%20trip.`}
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg bg-[#25D366] text-white hover:bg-[#20ba59] transition-all shadow"
          >
            💬 WhatsApp Us Direct
          </a>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white py-14 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="text-xs uppercase font-bold tracking-widest text-amber-300 mb-2 block">We Are Located in Kochi, Kerala</span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">Contact Our Local Kerala Travel Experts</h1>
          <p className="text-emerald-100 text-base font-normal">
            Have questions or need a customized Kerala itinerary for Munnar, Alleppey houseboats, Wayanad, or Kovalam? Call us or send a message!
          </p>
        </div>
      </section>

      {/* Main Content Grid */}
      <main className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Office Info & Direct Contacts */}
        <div className="lg:col-span-5 space-y-8">
          <div className="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm space-y-6">
            <h2 className="text-xl font-extrabold text-stone-900 border-b border-stone-100 pb-4">Our Head Office</h2>

            <div className="flex gap-4 items-start">
              <span className="text-2xl p-2.5 bg-emerald-50 text-emerald-700 rounded-xl">📍</span>
              <div>
                <h3 className="text-xs font-bold uppercase text-stone-500 tracking-wider">Address</h3>
                <p className="text-stone-800 text-sm font-medium mt-1 leading-relaxed">{officeAddress}</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <span className="text-2xl p-2.5 bg-emerald-50 text-emerald-700 rounded-xl">📞</span>
              <div>
                <h3 className="text-xs font-bold uppercase text-stone-500 tracking-wider">Phone Calls</h3>
                <p className="text-stone-900 text-sm font-bold mt-1">{phonePrimary}</p>
                <p className="text-stone-600 text-xs">{phoneSecondary} (Landline)</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <span className="text-2xl p-2.5 bg-emerald-50 text-emerald-700 rounded-xl">✉️</span>
              <div>
                <h3 className="text-xs font-bold uppercase text-stone-500 tracking-wider">Email Inquiry</h3>
                <p className="text-emerald-700 font-semibold text-sm mt-1">{email}</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <span className="text-2xl p-2.5 bg-emerald-50 text-emerald-700 rounded-xl">⏰</span>
              <div>
                <h3 className="text-xs font-bold uppercase text-stone-500 tracking-wider">Working Hours</h3>
                <p className="text-stone-700 text-xs mt-1">{businessHours}</p>
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
              href={`https://wa.me/${cleanWhatsapp}?text=Hi!%20I%20want%20to%20plan%20a%20Kerala%20holiday%20trip.`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-sm rounded-xl transition-all shadow-md"
            >
              <span>Chat Directly on WhatsApp</span>
              <span>💬</span>
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
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Kumar"
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:border-emerald-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">Phone / WhatsApp Number *</label>
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
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">Email Address</label>
                  <input
                    type="email"
                    placeholder="e.g. name@example.com"
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:border-emerald-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">Destinations Interested</label>
                  <select className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:border-emerald-600 cursor-pointer">
                    <option>Munnar & Alleppey Houseboat (4D/3N)</option>
                    <option>Complete Kerala Panorama (7D/6N)</option>
                    <option>Wayanad Hill Station & Waterfalls</option>
                    <option>Kovalam Beach & Trivandrum</option>
                    <option>Customized Kerala Package</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">Travel Details / Message</label>
                <textarea
                  rows={4}
                  placeholder="Tell us about number of adults/children, expected travel dates, or budget preferences..."
                  className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:border-emerald-600"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm tracking-wide transition-all shadow-md"
              >
                Submit Inquiry to Local Team
              </button>
            </form>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-stone-200 py-10 text-center text-xs text-stone-500">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© 2026 Kerala Green Haven Tours & Travels. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="/" className="hover:text-emerald-700">Home</a>
            <a href="/packages" className="hover:text-emerald-700">Packages</a>
            <a href="/about" className="hover:text-emerald-700">About Us</a>
            <a href="http://localhost:3333" target="_blank" rel="noreferrer" className="text-emerald-700 font-bold">Sanity Studio</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
