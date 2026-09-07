"use client";

import React, { useState } from "react";
import Link from "next/link";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { getWhatsAppUrl } from "@/utils/phone";

interface NavItem {
  label: string;
  link: string;
}

interface HeaderProps {
  logoSrc?: string | null;
  logoIcon?: string;
  logoText?: string;
  logoTagline?: string;
  navItems?: NavItem[];
  whatsappNumber?: string;
}

export function Header({
  logoSrc,
  logoIcon = "🌴",
  logoText = "Kerala Green Haven Tours",
  logoTagline = "Tours & Travels • Kochi, Kerala",
  navItems = [
    { label: "Home", link: "/" },
    { label: "Kerala Packages", link: "/packages" },
    { label: "About Us", link: "/about" },
    { label: "Contact Us", link: "/contact" },
  ],
  whatsappNumber = "+919876543210",
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const cleanWhatsapp = whatsappNumber.replace(/[^0-9]/g, "");

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 sm:gap-3 min-w-0"
          onClick={() => setMobileMenuOpen(false)}
        >
          {logoSrc ? (
            <img
              src={logoSrc}
              alt={logoText}
              className="h-9 sm:h-11 w-auto max-w-[140px] sm:max-w-[180px] object-contain bg-transparent shrink-0"
            />
          ) : (
            <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl bg-emerald-700 text-white font-bold flex items-center justify-center text-lg sm:text-xl shadow shrink-0">
              {logoIcon}
            </div>
          )}
          <div className="truncate">
            <span className="font-extrabold text-sm sm:text-lg tracking-tight text-stone-900 block truncate">
              {logoText}
            </span>
            {logoTagline && (
              <span className="text-[9px] sm:text-[10px] text-emerald-700 font-bold uppercase tracking-wider block -mt-0.5 truncate">
                {logoTagline}
              </span>
            )}
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item, idx) => (
            <Link
              key={idx}
              href={item.link}
              className="text-sm font-semibold text-stone-600 hover:text-emerald-700 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop WhatsApp CTA Button */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href={getWhatsAppUrl(
              whatsappNumber,
              "Hi! I am interested in Kerala tour packages."
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 text-xs font-bold rounded-lg bg-[#25D366] text-white hover:bg-[#20ba59] transition-all shadow flex items-center gap-2"
          >
            <WhatsAppIcon className="w-4 h-4 fill-current" />
            <span>WhatsApp</span>
          </a>
        </div>

        {/* Mobile Hamburger Menu Button */}
        <div className="flex md:hidden items-center">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="p-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 transition-all focus:outline-none focus:ring-2 focus:ring-emerald-600"
          >
            {mobileMenuOpen ? (
              // Close Icon
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              // Hamburger Icon
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Collapsible Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-stone-200 shadow-xl px-4 py-6 space-y-4 animate-fadeIn">
          <nav className="flex flex-col space-y-2">
            {navItems.map((item, idx) => (
              <Link
                key={idx}
                href={item.link}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 rounded-xl text-base font-bold text-stone-800 hover:bg-emerald-50 hover:text-emerald-700 transition-colors flex items-center justify-between"
              >
                <span>{item.label}</span>
                <span className="text-stone-400 text-sm">→</span>
              </Link>
            ))}
          </nav>

          <div className="pt-2 border-t border-stone-100 flex flex-col gap-2">
            <a
              href={getWhatsAppUrl(
                whatsappNumber,
                "Hi! I am interested in Kerala tour packages."
              )}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-sm transition-all shadow text-center flex items-center justify-center gap-2"
            >
              <WhatsAppIcon className="w-4 h-4 fill-current" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
