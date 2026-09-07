import React from "react";

export default function AboutPage() {
  const whatsappPhone = "919876543210";

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans">
      {/* Top Notification Bar */}
      <div className="bg-emerald-900 text-emerald-100 text-xs py-2 px-6 text-center font-medium">
        🌴 Kerala Tourism Approved Destination Management Company • Registered Office in Ernakulam, Kochi
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
            <a href="/about" className="text-sm font-bold text-emerald-700 border-b-2 border-emerald-700 pb-1">About Us</a>
            <a href="/contact" className="text-sm font-semibold text-stone-600 hover:text-emerald-700">Contact Us</a>
          </nav>

          <a
            href={`https://wa.me/${whatsappPhone}?text=Hi!%20I%20want%20to%20know%20more%20about%20your%20Kerala%20tours.`}
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg bg-[#25D366] text-white hover:bg-[#20ba59] transition-all shadow"
          >
            💬 Chat on WhatsApp
          </a>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-emerald-900 via-teal-900 to-emerald-950 text-white py-16 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="text-xs uppercase font-bold tracking-widest text-amber-300 mb-2 block">15+ Years Local Expertise</span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">About Kerala Green Haven Tours</h1>
          <p className="text-emerald-100 text-base font-normal">
            Your trusted local travel partner in Kochi, Kerala. We specialize in authentic holiday experiences, luxury houseboats, and customized family & honeymoon trips.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-16 space-y-16">
        {/* Story Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block mb-2">Our Story</span>
            <h2 className="text-3xl font-extrabold text-stone-900 mb-4 tracking-tight">Rooted in Kerala's Warm Hospitality</h2>
            <p className="text-stone-600 text-sm leading-relaxed mb-4">
              Founded in Kochi, Kerala, <strong>Kerala Green Haven Tours & Travels</strong> was built with a simple mission: to offer travelers authentic, hassle-free, and memorable journeys across God’s Own Country.
            </p>
            <p className="text-stone-600 text-sm leading-relaxed">
              Unlike online booking aggregators, we operate locally in Kerala. We own our fleet of well-maintained AC tourist vehicles, employ courteous local drivers, and partner directly with luxury houseboat operators in Alleppey and Kumarakom.
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-lg border border-stone-200">
            <img
              src="https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=800&auto=format&fit=crop"
              alt="Kerala Backwaters Houseboat"
              className="w-full h-80 object-cover"
            />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="bg-white rounded-2xl border border-stone-200 p-8 shadow-sm grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <p className="text-3xl font-extrabold text-emerald-700">15,000+</p>
            <p className="text-xs font-semibold text-stone-500 mt-1">Happy Guests</p>
          </div>
          <div>
            <p className="text-3xl font-extrabold text-emerald-700">100%</p>
            <p className="text-xs font-semibold text-stone-500 mt-1">Customized Trips</p>
          </div>
          <div>
            <p className="text-3xl font-extrabold text-emerald-700">4.9 / 5 ★</p>
            <p className="text-xs font-semibold text-stone-500 mt-1">Guest Ratings</p>
          </div>
          <div>
            <p className="text-3xl font-extrabold text-emerald-700">24/7</p>
            <p className="text-xs font-semibold text-stone-500 mt-1">Local Support</p>
          </div>
        </div>

        {/* Why Choose Us */}
        <div>
          <h2 className="text-2xl font-extrabold text-stone-900 mb-8 text-center">Why Book With a Local Kerala Agency?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
              <div className="text-3xl mb-3">🚘</div>
              <h3 className="text-base font-bold text-stone-900 mb-2">Private Clean Cabs & Drivers</h3>
              <p className="text-xs text-stone-600 leading-relaxed">Punctual, English/Hindi speaking local drivers who double as knowledgeable local guides.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
              <div className="text-3xl mb-3">⛵</div>
              <h3 className="text-base font-bold text-stone-900 mb-2">Verified Houseboats</h3>
              <p className="text-xs text-stone-600 leading-relaxed">Inspected AC deluxe & luxury houseboats with safety certificates and fresh traditional meals.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
              <div className="text-3xl mb-3">💬</div>
              <h3 className="text-base font-bold text-stone-900 mb-2">Instant WhatsApp Assistance</h3>
              <p className="text-xs text-stone-600 leading-relaxed">No call center waiting queues. Direct access to your dedicated Kerala travel manager anytime.</p>
            </div>
          </div>
        </div>

        {/* CTA Card */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white p-10 rounded-2xl text-center space-y-4 shadow-lg">
          <h2 className="text-2xl font-extrabold">Ready to Experience Kerala?</h2>
          <p className="text-emerald-100 text-sm max-w-xl mx-auto">
            Get a custom day-by-day itinerary and transparent price quotation tailored to your dates and budget.
          </p>
          <a
            href={`https://wa.me/${whatsappPhone}?text=Hi!%20I%20would%20like%20to%20plan%20a%20Kerala%20trip.`}
            target="_blank"
            rel="noreferrer"
            className="inline-block px-8 py-3.5 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-sm rounded-xl transition-all shadow"
          >
            Chat With Us on WhatsApp 💬
          </a>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-stone-200 py-10 text-center text-xs text-stone-500">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© 2026 Kerala Green Haven Tours & Travels, Kochi, Kerala, India.</p>
          <div className="flex gap-6">
            <a href="/" className="hover:text-emerald-700">Home</a>
            <a href="/packages" className="hover:text-emerald-700">Packages</a>
            <a href="/contact" className="hover:text-emerald-700">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
