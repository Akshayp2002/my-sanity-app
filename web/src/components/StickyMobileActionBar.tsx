"use client";

import React from "react";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { getPrimaryPhoneNumber, getWhatsAppUrl } from "@/utils/phone";

interface StickyMobileActionBarProps {
  whatsappNumber?: string;
  phoneNumber?: string;
}

export function StickyMobileActionBar({
  whatsappNumber = "+919876543210",
  phoneNumber = "+919876543210",
}: StickyMobileActionBarProps) {
  const dialNumber = getPrimaryPhoneNumber(phoneNumber);
  const waUrl = getWhatsAppUrl(
    whatsappNumber,
    "Hi! I am planning a Kerala trip. Please send me customized itineraries and quotation."
  );

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white/95 backdrop-blur-lg border-t border-stone-200/90 shadow-[0_-8px_25px_rgba(0,0,0,0.12)] px-3 py-2.5 pb-[max(0.65rem,env(safe-area-inset-bottom))] transition-transform">
      <div className="flex items-center gap-2.5 max-w-md mx-auto">
        {/* Direct Call Button - dials ONLY first clean number */}
        <a
          href={`tel:${dialNumber}`}
          className="flex-1 py-3 px-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-900 font-bold text-xs flex items-center justify-center gap-2 border border-stone-300/80 active:scale-[0.98] transition-all"
        >
          <svg
            className="w-4 h-4 text-emerald-800 shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
          <span className="truncate">Call Office</span>
        </a>

        {/* Instant WhatsApp Quote Button - universal whatsapp opening */}
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-3 px-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-md shadow-emerald-900/20 active:scale-[0.98] transition-all"
        >
          <WhatsAppIcon className="w-4 h-4 fill-current shrink-0" />
          <span className="truncate">WhatsApp Quote</span>
        </a>
      </div>
    </div>
  );
}
