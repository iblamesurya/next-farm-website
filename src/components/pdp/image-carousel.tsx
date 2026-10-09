'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ShieldCheck } from 'lucide-react';

interface ImageCarouselProps {
  images: string[];
  productName: string;
}

export function ImageCarousel({ images, productName }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="space-y-4">
      {/* Main 1:1 Display */}
      <div className="relative aspect-square w-full bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden flex items-center justify-center p-6 shadow-sm">
        {/* CAA Trust Pill */}
        <div className="absolute top-4 left-4 z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#004B50] text-[#FFD200] text-xs font-bold rounded-full shadow-md">
            <ShieldCheck className="w-4 h-4" />
            <span>CAA Verified Packshot</span>
          </span>
        </div>

        {/* Studio 1:1 Packshot Image */}
        <div className="relative w-full h-full">
          <Image
            src={images[currentIndex] || images[0]}
            alt={`${productName} Studio View ${currentIndex + 1}`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-contain transition-all duration-300"
            priority
          />
        </div>

        {/* Carousel Prev/Next Buttons (only if multiple images) */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={prevImage}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white text-slate-800 shadow-md backdrop-blur-sm transition-all focus:outline-none"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={nextImage}
              aria-label="Next image"
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white text-slate-800 shadow-md backdrop-blur-sm transition-all focus:outline-none"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails Row */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {images.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              className={`relative w-20 h-20 rounded-xl bg-slate-50 border-2 overflow-hidden flex-shrink-0 transition-all ${
                currentIndex === idx
                  ? 'border-[#004B50] ring-2 ring-[#004B50]/20'
                  : 'border-slate-200 hover:border-slate-300 opacity-70 hover:opacity-100'
              }`}
            >
              <Image
                src={img}
                alt={`${productName} Thumbnail ${idx + 1}`}
                fill
                sizes="80px"
                className="object-contain p-1.5"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
