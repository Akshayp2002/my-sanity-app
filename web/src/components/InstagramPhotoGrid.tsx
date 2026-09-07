"use client";

import React, { useState } from "react";
import { WhatsAppIcon } from "./WhatsAppIcon";

interface GalleryPhoto {
  _id?: string;
  imageUrl: string;
  caption?: string;
  category?: string;
}

interface InstagramPhotoGridProps {
  photos: GalleryPhoto[];
  whatsappNumber?: string;
}

export function InstagramPhotoGrid({
  photos,
  whatsappNumber = "+919876543210",
}: InstagramPhotoGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activePhoto, setActivePhoto] = useState<GalleryPhoto | null>(null);
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});

  if (!photos || photos.length === 0) return null;

  const cleanWhatsapp = whatsappNumber.replace(/[^0-9]/g, "");

  // Extract unique categories
  const categories = [
    "All",
    ...Array.from(
      new Set(
        photos
          .map((p) => p.category)
          .filter((cat): cat is string => Boolean(cat && cat.trim().length > 0))
      )
    ),
  ];

  const filteredPhotos =
    selectedCategory === "All"
      ? photos
      : photos.filter((p) => p.category === selectedCategory);

  const toggleLike = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setLikedMap((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section className="py-14 sm:py-24 bg-stone-100/80 border-b border-stone-200/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500/15 via-rose-500/15 to-purple-500/15 border border-rose-500/20 text-stone-800 text-[10px] sm:text-xs font-black uppercase tracking-wider mb-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-tr from-amber-400 via-rose-500 to-purple-600 animate-pulse" />
            Kerala Visual Feed
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            Moments Captured Across God's Own Country
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm mt-2">
            Real guest snapshots from misty tea hills, backwater cruises, tropical beaches & rainforests.
          </p>
        </div>

        {/* Category Pills Filter (Mobile Swipe-friendly) */}
        {categories.length > 2 && (
          <div className="flex items-center sm:justify-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-6 sm:mb-10 px-1">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-extrabold whitespace-nowrap transition-all duration-200 shrink-0 cursor-pointer ${
                    isActive
                      ? "bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-800 text-white shadow-md shadow-emerald-900/20 scale-105"
                      : "bg-white hover:bg-stone-50 text-stone-700 border border-stone-200/90 hover:border-emerald-300"
                  }`}
                >
                  {cat === "All" ? "🌴 All Moments" : cat}
                </button>
              );
            })}
          </div>
        )}

        {/* Instagram Optimized Grid: 2 cols on mobile, 3 on tablet, 4 on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-6">
          {filteredPhotos.map((photo, idx) => {
            const photoId = photo._id || `photo-${idx}`;
            const isLiked = Boolean(likedMap[photoId]);
            const baseLikes = 920 + ((idx * 163) % 1100);
            const currentLikes = isLiked ? baseLikes + 1 : baseLikes;

            return (
              <div
                key={photoId}
                onClick={() => setActivePhoto(photo)}
                className="group relative aspect-[4/5] rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer bg-stone-900 border border-stone-200/80 shadow-md hover:shadow-2xl hover:shadow-emerald-950/15 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between select-none"
              >
                {/* Background Image */}
                <img
                  src={photo.imageUrl}
                  alt={photo.caption || "Kerala Travel Moment"}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                />

                {/* Soft top and bottom dark gradient vignettes for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/20 to-stone-950/60 opacity-80 group-hover:opacity-95 transition-opacity" />

                {/* Top Instagram Card Header */}
                <div className="relative z-10 p-2.5 sm:p-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {/* Story Gradient Ring Avatar */}
                    <div className="p-[1.5px] sm:p-[2px] rounded-full bg-gradient-to-tr from-amber-400 via-rose-500 to-purple-600 shadow-sm">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-stone-900 flex items-center justify-center text-[10px] text-white">
                        🌴
                      </div>
                    </div>
                    {photo.category ? (
                      <span className="text-[10px] sm:text-[11px] font-extrabold text-white drop-shadow truncate max-w-[90px] sm:max-w-[120px]">
                        {photo.category}
                      </span>
                    ) : (
                      <span className="text-[10px] sm:text-[11px] font-bold text-white drop-shadow">
                        Kerala Tour
                      </span>
                    )}
                  </div>

                  {/* Interactive Heart Button */}
                  <button
                    type="button"
                    onClick={(e) => toggleLike(e, photoId)}
                    aria-label="Like photo"
                    className={`flex items-center gap-1 px-2 py-1 rounded-full text-[10px] sm:text-[11px] font-bold backdrop-blur-md transition-transform active:scale-125 ${
                      isLiked
                        ? "bg-rose-500/90 text-white shadow-sm"
                        : "bg-black/40 hover:bg-black/60 text-white"
                    }`}
                  >
                    <span>{isLiked ? "❤️" : "🤍"}</span>
                    <span className="hidden sm:inline">{currentLikes}</span>
                  </button>
                </div>

                {/* Bottom Caption & Trigger */}
                <div className="relative z-10 p-2.5 sm:p-4 text-white">
                  <p className="text-xs sm:text-sm font-extrabold leading-snug line-clamp-2 drop-shadow-md mb-1.5">
                    {photo.caption || "God's Own Country, Kerala"}
                  </p>
                  <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-emerald-300 font-bold">
                    <span className="opacity-90">#KeralaTourism</span>
                    <span className="group-hover:translate-x-1 transition-transform inline-flex items-center gap-0.5">
                      Expand ↗
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Optimized Lightbox Modal for Desktop & Mobile */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 transition-all"
          onClick={() => setActivePhoto(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-stone-900 rounded-3xl overflow-hidden shadow-2xl border border-stone-800 flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setActivePhoto(null)}
              className="absolute top-3 right-3 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/70 text-white flex items-center justify-center text-base hover:bg-black transition-colors"
            >
              ✕
            </button>

            {/* Photo Container */}
            <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden min-h-[280px] sm:min-h-[420px] max-h-[60vh] sm:max-h-[68vh]">
              <img
                src={activePhoto.imageUrl}
                alt={activePhoto.caption || "Kerala Photo Preview"}
                className="w-full h-full max-h-[60vh] sm:max-h-[68vh] object-contain"
              />
            </div>

            {/* Modal Bottom Bar */}
            <div className="p-4 sm:p-6 bg-stone-900 text-white border-t border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3.5">
              <div className="min-w-0">
                {activePhoto.category && (
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-400 block mb-1">
                    📍 {activePhoto.category} • God's Own Country
                  </span>
                )}
                <h3 className="text-sm sm:text-lg font-bold leading-snug truncate">
                  {activePhoto.caption || "Kerala Travel Story"}
                </h3>
              </div>

              {/* Inquiry Action on WhatsApp */}
              <div className="flex items-center gap-2.5 shrink-0">
                <a
                  href={`https://wa.me/${cleanWhatsapp}?text=Hi!%20I%20saw%20this%20photo%20of%20${encodeURIComponent(
                    activePhoto.caption || activePhoto.category || "Kerala"
                  )}%20on%20your%20website.%20Can%20you%20share%20tour%20packages%20covering%20this?`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-extrabold transition-all flex items-center justify-center gap-2 shadow-md"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5 fill-current" />
                  <span>Plan Trip to this Spot</span>
                </a>
                <button
                  type="button"
                  onClick={() => setActivePhoto(null)}
                  className="px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
