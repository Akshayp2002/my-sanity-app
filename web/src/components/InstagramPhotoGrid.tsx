"use client";

import React, { useState } from "react";

interface GalleryPhoto {
  _id?: string;
  imageUrl: string;
  caption?: string;
  category?: string;
}

interface InstagramPhotoGridProps {
  photos: GalleryPhoto[];
}

export function InstagramPhotoGrid({ photos }: InstagramPhotoGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activePhoto, setActivePhoto] = useState<GalleryPhoto | null>(null);

  if (!photos || photos.length === 0) return null;

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

  return (
    <section className="py-12 sm:py-20 bg-stone-100/70 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500/10 via-pink-500/10 to-purple-500/10 border border-pink-500/20 text-stone-800 text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-2">
            <span className="w-2 h-2 rounded-full bg-gradient-to-tr from-amber-500 to-pink-500 animate-pulse" />
            Kerala Visual Stories
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            Moments Captured Across God's Own Country
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm mt-2">
            Real snapshots from Munnar tea hills, Alleppey backwaters, tropical beaches & rainforests.
          </p>
        </div>

        {/* Category Pills Filter */}
        {categories.length > 2 && (
          <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap mb-8 sm:mb-10">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-emerald-800 text-white shadow-md shadow-emerald-900/20 scale-105"
                      : "bg-white hover:bg-stone-50 text-stone-700 border border-stone-200 hover:border-emerald-300"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        )}

        {/* Instagram Masonry Style Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
          {filteredPhotos.map((photo, idx) => {
            // Assign varied height classes for natural masonry look
            const isTall = idx % 5 === 0;
            const likesCount = 850 + ((idx * 173) % 1200);

            return (
              <div
                key={photo._id || idx}
                onClick={() => setActivePhoto(photo)}
                className={`group relative rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 bg-stone-200 border border-stone-200/80 ${
                  isTall ? "row-span-2 h-72 sm:h-96" : "h-48 sm:h-64"
                }`}
              >
                {/* Image */}
                <img
                  src={photo.imageUrl}
                  alt={photo.caption || "Kerala Travel Photo"}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                />

                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-900/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

                {/* Top Instagram story tag & Like badge */}
                <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
                  {photo.category && (
                    <span className="px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider bg-white/90 backdrop-blur-md text-stone-900 shadow-sm">
                      📍 {photo.category}
                    </span>
                  )}
                  <span className="flex items-center gap-1 text-[10px] sm:text-[11px] font-bold text-white bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-full ml-auto">
                    ❤️ {likesCount}
                  </span>
                </div>

                {/* Bottom Caption & View Trigger */}
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <p className="text-xs sm:text-sm font-bold leading-snug line-clamp-2 drop-shadow">
                    {photo.caption || "God's Own Country, Kerala"}
                  </p>
                  <span className="inline-block text-[10px] font-medium text-emerald-300 group-hover:underline mt-1">
                    Tap to expand photo ↗
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 transition-all"
          onClick={() => setActivePhoto(null)}
        >
          <div
            className="relative max-w-3xl w-full bg-stone-900 rounded-3xl overflow-hidden shadow-2xl border border-stone-800"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActivePhoto(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center text-lg hover:bg-black transition-colors"
            >
              ✕
            </button>
            <div className="max-h-[70vh] sm:max-h-[75vh] w-full bg-black flex items-center justify-center overflow-hidden">
              <img
                src={activePhoto.imageUrl}
                alt={activePhoto.caption || "Kerala Photo"}
                className="w-full h-full max-h-[70vh] sm:max-h-[75vh] object-contain"
              />
            </div>
            <div className="p-5 sm:p-6 bg-stone-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                {activePhoto.category && (
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-400 block mb-1">
                    📍 {activePhoto.category}
                  </span>
                )}
                <h3 className="text-base sm:text-lg font-bold">
                  {activePhoto.caption || "Kerala Travel Story"}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActivePhoto(null)}
                className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold transition-colors shrink-0"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
