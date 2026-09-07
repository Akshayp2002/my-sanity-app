"use client";

import React, { useState, useEffect } from "react";
import { urlFor } from "@/sanity/client";

export interface SlideItem {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image?: any;
  imageUrl?: string;
  badge?: string;
  heading: string;
  description?: string;
}

interface HeroCarouselProps {
  slides?: SlideItem[];
  whatsappNumber?: string;
}

export function HeroCarousel({ slides, whatsappNumber = "+919876543210" }: HeroCarouselProps) {
  // Default Kerala fallback slides with rich photography
  const defaultSlides: SlideItem[] = [
    {
      badge: "🌴 Govt. Approved Local Kerala Operator",
      heading: "Experience God’s Own Country with Kerala Green Haven",
      description:
        "Customized holiday packages, luxury houseboat cruises in Alleppey, tea garden stays in Munnar, and private AC cabs across Kerala.",
      imageUrl:
        "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=2000&auto=format&fit=crop",
    },
    {
      badge: "☕ Munnar Tea Hills & Mist Explorer",
      heading: "Discover Rolling Hills, Waterfalls & Tea Gardens",
      description:
        "Walk through lush green plantations 1,600m above sea level with private AC cabs and local sightseeing guides.",
      imageUrl:
        "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=80&w=2000&auto=format&fit=crop",
    },
    {
      badge: "⛵ Alleppey Backwater Houseboats",
      heading: "Sail on Tranquil Backwaters with Authentic Kerala Cuisine",
      description:
        "Private AC deluxe & luxury houseboats with personal chefs serving fresh Karimeen fish fry and traditional Kerala meals.",
      imageUrl:
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2000&auto=format&fit=crop",
    },
  ];

  const validSlides = slides && slides.length > 0 ? slides : defaultSlides;
  const isMultiple = validSlides.length > 1;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Automatic slide transition every 5 seconds if multiple slides exist
  useEffect(() => {
    if (!isMultiple || isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % validSlides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isMultiple, isPaused, validSlides.length]);

  const cleanWhatsapp = whatsappNumber.replace(/[^0-9]/g, "");

  const getImageSrc = (slide: SlideItem) => {
    if (slide.image) {
      try {
        return urlFor(slide.image).url();
      } catch {
        return slide.imageUrl || defaultSlides[0].imageUrl;
      }
    }
    return slide.imageUrl || defaultSlides[0].imageUrl;
  };

  return (
    <div
      className="relative min-h-[600px] sm:min-h-[660px] flex flex-col justify-between overflow-hidden bg-stone-950 text-white select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* 1. SLIDING / CROSSFADING BACKGROUND IMAGES */}
      <div className="absolute inset-0 z-0">
        {validSlides.map((slide, idx) => {
          const isActive = idx === currentIndex;
          return (
            <div
              key={idx}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? "opacity-100 z-10 scale-100" : "opacity-0 z-0 scale-105 pointer-events-none"
              } transition-transform duration-[7000ms]`}
            >
              <img
                src={getImageSrc(slide)}
                alt={slide.heading}
                className="w-full h-full object-cover"
              />
              {/* Dark overlay for contrast */}
              <div className="absolute inset-0 bg-stone-950/50 backdrop-brightness-90" />
            </div>
          );
        })}
      </div>

      {/* 2. TEXT OVERLAY CONTENT (TRANSITIONS WITH CURRENT SLIDE) */}
      <div className="relative z-20 pt-20 pb-4 px-6 max-w-4xl mx-auto text-center flex-1 flex flex-col justify-center items-center">
        {validSlides.map((slide, idx) => {
          const isActive = idx === currentIndex;
          if (!isActive) return null;

          return (
            <div
              key={idx}
              className="animate-fadeIn transition-all duration-700 max-w-3xl flex flex-col items-center"
            >
              {slide.badge && (
                <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-bold tracking-wider mb-6 shadow-md">
                  {slide.badge}
                </span>
              )}

              <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight mb-4 text-white drop-shadow-md">
                {slide.heading}
              </h1>

              {slide.description && (
                <p className="text-base sm:text-lg text-stone-100 max-w-2xl mx-auto leading-relaxed font-normal drop-shadow">
                  {slide.description}
                </p>
              )}
            </div>
          );
        })}

        {/* Carousel Indicators (Visible only if > 1 slide) */}
        {isMultiple && (
          <div className="flex items-center gap-2 mt-6 z-30">
            {validSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentIndex === idx ? "w-8 bg-amber-400" : "w-2 bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* 3. STATIC QUICK TRIP INQUIRY BOX (ANCHORED AT BOTTOM - DOES NOT MOVE ON SLIDE) */}
      <div className="relative z-20 pb-12 px-6 w-full max-w-4xl mx-auto">
        <div className="bg-white text-stone-900 rounded-2xl p-4 sm:p-5 shadow-2xl border border-stone-200 text-left grid grid-cols-1 sm:grid-cols-4 gap-3">
          <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
            <label className="block text-[10px] font-bold uppercase text-stone-500 tracking-wider mb-1">
              Destination
            </label>
            <select className="bg-transparent text-sm font-semibold text-stone-900 focus:outline-none w-full cursor-pointer">
              <option>Munnar & Alleppey</option>
              <option>Complete Kerala Tour</option>
              <option>Wayanad Rainforest</option>
              <option>Kovalam Beach</option>
            </select>
          </div>
          <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
            <label className="block text-[10px] font-bold uppercase text-stone-500 tracking-wider mb-1">
              Travel Month
            </label>
            <input
              type="text"
              defaultValue="October / November"
              className="bg-transparent text-sm font-semibold text-stone-900 focus:outline-none w-full"
            />
          </div>
          <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
            <label className="block text-[10px] font-bold uppercase text-stone-500 tracking-wider mb-1">
              Travellers
            </label>
            <select className="bg-transparent text-sm font-semibold text-stone-900 focus:outline-none w-full cursor-pointer">
              <option>Family (4-6 Persons)</option>
              <option>Honeymoon Couple</option>
              <option>Group (8+ Persons)</option>
            </select>
          </div>
          <a
            href={`https://wa.me/${cleanWhatsapp}?text=Hi!%20I%20am%20looking%20for%20a%20customized%20Kerala%20tour%20package.`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-sm tracking-wide transition-all shadow-md py-3.5 sm:py-0 gap-2"
          >
            <span>WhatsApp Inquiry</span>
            <span>💬</span>
          </a>
        </div>
      </div>
    </div>
  );
}
