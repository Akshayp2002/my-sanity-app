import React from "react";

interface HighlightItem {
  icon: string;
  badge: string;
  title: string;
  subtitle: string;
}

const HIGHLIGHTS: HighlightItem[] = [
  {
    icon: "⭐️",
    badge: "4.9 / 5 Rated",
    title: "500+ Verified Reviews",
    subtitle: "Trusted Kerala Tour Operator",
  },
  {
    icon: "🚖",
    badge: "Private Sanitized Cab",
    title: "Dedicated Local Driver",
    subtitle: "Door-to-door sightseeing transfers",
  },
  {
    icon: "🚢",
    badge: "Govt. Approved",
    title: "Luxury Private Houseboat",
    subtitle: "Alleppey & Kumarakom cruises",
  },
  {
    icon: "🛡️",
    badge: "Direct Kerala Office",
    title: "Zero Hidden Charges",
    subtitle: "Transparent wholesale rates",
  },
];

export function TrustHighlightsBar() {
  return (
    <section className="relative z-20 -mt-6 sm:-mt-10 max-w-7xl mx-auto px-4 sm:px-6">
      <div className="bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl border border-stone-200/90 shadow-xl shadow-stone-900/5 p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-stone-100">
          {HIGHLIGHTS.map((item, index) => (
            <div
              key={index}
              className={`flex items-start gap-3 sm:gap-4 group ${
                index > 0 ? "pt-3 sm:pt-0 sm:pl-4 lg:pl-6" : ""
              }`}
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-100/70 border border-emerald-200/60 flex items-center justify-center text-xl sm:text-2xl shadow-sm shrink-0 group-hover:scale-110 group-hover:border-emerald-400 transition-all duration-300">
                {item.icon}
              </div>
              <div className="min-w-0">
                <span className="inline-block text-[10px] font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60 mb-1">
                  {item.badge}
                </span>
                <h4 className="text-xs sm:text-sm font-bold text-stone-900 leading-snug group-hover:text-emerald-800 transition-colors">
                  {item.title}
                </h4>
                <p className="text-[11px] sm:text-xs text-stone-500 line-clamp-1 sm:line-clamp-2 mt-0.5">
                  {item.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
