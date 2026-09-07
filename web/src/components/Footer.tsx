import React from "react";
import Link from "next/link";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";

export interface FooterProps {
  logoSrc?: string | null;
  logoIcon?: string;
  logoText?: string;
  footerAbout?: string;
  footerAddress?: string;
  footerPhone?: string;
  footerEmail?: string;
  footerCopyright?: string;
  whatsappNumber?: string;
  destinations?: Array<{ name: string; link: string }>;
}

export function Footer({
  logoSrc,
  logoIcon = "🌴",
  logoText = "Kerala Green Haven Tours",
  footerAbout = "Authorized local travel agency in Kochi, Kerala. Specializing in customized Kerala tours, houseboats, and cab packages.",
  footerAddress = "Ernakulam, Kochi, Kerala, India",
  footerPhone = "+91 98765 43210 / +91 484 2345678",
  footerEmail = "info@keralagreenhaventours.com",
  footerCopyright = "© 2026 Kerala Green Haven Tours & Travels, Kochi, Kerala, India.",
  whatsappNumber = "+919876543210",
  destinations = [
    { name: "Munnar Tea Hills", link: "/packages/munnar-tea-hills" },
    { name: "Alleppey Houseboats", link: "/packages/alleppey-houseboat" },
    { name: "Wayanad Rainforest", link: "/packages/wayanad-nature" },
    { name: "Kovalam Beach", link: "/packages/kovalam-beach" },
  ],
}: FooterProps) {
  const cleanWhatsapp = whatsappNumber.replace(/[^0-9]/g, "");

  return (
    <footer className="bg-white border-t border-stone-200 pt-12 sm:pt-16 pb-8 sm:pb-12 text-stone-600 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-4 gap-8 sm:gap-10 mb-8 sm:mb-12">
        {/* About Agency */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            {logoSrc ? (
              <img
                src={logoSrc}
                alt={logoText}
                className="h-8 w-auto max-w-[140px] object-contain bg-transparent"
              />
            ) : (
              <div className="h-7 w-7 rounded-lg bg-emerald-700 flex items-center justify-center font-bold text-white text-sm">
                {logoIcon}
              </div>
            )}
            <span className="font-extrabold text-base text-stone-900 tracking-tight">{logoText}</span>
          </div>
          <p className="text-stone-500 leading-relaxed text-xs">{footerAbout}</p>
        </div>

        {/* Popular Pages */}
        <div>
          <h4 className="font-bold text-stone-900 text-xs uppercase tracking-wider mb-3 sm:mb-4">Popular Pages</h4>
          <ul className="space-y-2">
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

        {/* Kerala Destinations */}
        <div>
          <h4 className="font-bold text-stone-900 text-xs uppercase tracking-wider mb-3 sm:mb-4">
            Kerala Destinations
          </h4>
          <ul className="space-y-2">
            {destinations.slice(0, 4).map((dest, idx) => (
              <li key={idx}>
                <Link href={dest.link || "/packages"} className="hover:text-emerald-700 transition-colors">
                  {dest.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Kerala Office */}
        <div>
          <h4 className="font-bold text-stone-900 text-xs uppercase tracking-wider mb-3 sm:mb-4">
            Contact Kerala Office
          </h4>
          {footerAddress && <p className="text-stone-600 font-bold mb-1">📍 {footerAddress}</p>}
          {footerPhone && (
            <p className="text-stone-600 mb-1">
              📞 <a href={`tel:${footerPhone.replace(/[^0-9+]/g, "")}`}>{footerPhone}</a>
            </p>
          )}
          {footerEmail && (
            <p className="text-emerald-700 font-semibold mb-3">
              ✉️ <a href={`mailto:${footerEmail}`}>{footerEmail}</a>
            </p>
          )}
          <a
            href={`https://wa.me/${cleanWhatsapp}?text=Hi!%20I%20want%20to%20plan%20a%20Kerala%20trip.`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#25D366] text-white font-bold rounded text-[11px]"
          >
            <WhatsAppIcon className="w-3.5 h-3.5 fill-current" />
            <span>Quick WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Copyright Footer without Sanity Studio link */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 border-t border-stone-100 pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-stone-400 text-center sm:text-left">
        <p>{footerCopyright}</p>
        <p className="text-stone-400 text-[11px]">God's Own Country • Kerala Tourism</p>
      </div>
    </footer>
  );
}
