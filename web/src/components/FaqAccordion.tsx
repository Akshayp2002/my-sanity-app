"use client";

import React, { useState } from "react";

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  items: FaqItem[];
}

export function FaqAccordion({ items }: FaqAccordionProps) {
  const [openIndices, setOpenIndices] = useState<number[]>([0]);

  const toggleFaq = (index: number) => {
    setOpenIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  if (!items || items.length === 0) return null;

  return (
    <div className="space-y-3 sm:space-y-4">
      {items.map((item, index) => {
        const isOpen = openIndices.includes(index);
        return (
          <div
            key={index}
            className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
              isOpen
                ? "bg-white border-emerald-300 shadow-md ring-1 ring-emerald-500/10"
                : "bg-stone-50/80 hover:bg-white border-stone-200"
            }`}
          >
            <button
              type="button"
              onClick={() => toggleFaq(index)}
              className="w-full text-left px-5 sm:px-6 py-4 sm:py-5 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
              aria-expanded={isOpen}
            >
              <div className="flex items-start sm:items-center gap-3">
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                    isOpen
                      ? "bg-emerald-700 text-white"
                      : "bg-stone-200 text-stone-700"
                  }`}
                >
                  Q
                </span>
                <span className="font-bold text-stone-900 text-sm sm:text-base leading-snug">
                  {item.question}
                </span>
              </div>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                  isOpen
                    ? "bg-emerald-100 text-emerald-800 rotate-180"
                    : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                }`}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </button>

            {isOpen && (
              <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-1 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-100 pl-14">
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
