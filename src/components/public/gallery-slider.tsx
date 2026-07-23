"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { GalleryItem } from "@/types/content";

type GallerySliderProps = {
  gallery: GalleryItem[];
};

export function GallerySlider({ gallery }: GallerySliderProps) {
  const [activeIndex, setActiveIndex] = useState(() => {
    if (!gallery || gallery.length === 0) return 0;
    return Math.floor(gallery.length / 2);
  });
  const [spacing, setSpacing] = useState(270);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setSpacing(125);
      } else if (window.innerWidth < 1024) {
        setSpacing(220);
      } else {
        setSpacing(245);
      }
    };

    const resizeFrame = window.requestAnimationFrame(handleResize);
    window.addEventListener("resize", handleResize);
    return () => {
      window.cancelAnimationFrame(resizeFrame);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (!gallery || gallery.length === 0) {
    return (
      <div className="w-full py-16 text-center text-slate-500 font-medium">
        Tidak ada dokumentasi foto.
      </div>
    );
  }

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? gallery.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === gallery.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="flex flex-col items-center w-full">
      {/* 3D Coverflow Container */}
      <div className="relative w-full h-[360px] sm:h-[460px] md:h-[500px] flex items-center justify-center overflow-hidden">
        {gallery.map((item, index) => {
          const offset = index - activeIndex;
          const absOffset = Math.abs(offset);
          const isActive = offset === 0;
          const isVisible = absOffset <= 2;

          return (
            <div
              key={item.id}
              onClick={() => setActiveIndex(index)}
              style={{
                transform: `translateX(-50%) translateX(${offset * spacing}px) scale(${
                  isActive ? 1.08 : 0.82
                })`,
                zIndex: 10 - absOffset,
                pointerEvents: isVisible ? "auto" : "none",
                transition: "all 500ms cubic-bezier(0.4, 0, 0.2, 1)",
              }}
              className={`absolute left-1/2 top-4 sm:top-6 w-[180px] h-[240px] sm:w-[260px] sm:h-[346px] md:w-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-lg select-none cursor-pointer group bg-slate-900 ${
                isActive 
                  ? "opacity-100 shadow-2xl" 
                  : isVisible 
                    ? "opacity-90 hover:opacity-100" 
                    : "opacity-0 pointer-events-none"
              }`}
            >
              {item.image_url ? (
                <Image
                  src={item.image_url}
                  alt={item.title}
                  fill
                  priority={isActive}
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-500 text-xs bg-slate-950 font-mono">
                  No Image
                </div>
              )}

              {/* Hover overlay with smooth gradient slide up */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 sm:p-5 text-left z-10">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out space-y-1">
                  <span className="bg-daun text-slate-950 text-[9px] font-extrabold uppercase px-2 py-0.5 rounded tracking-wider">
                    {item.category || "Dokumentasi"}
                  </span>
                  <h3 className="text-white text-xs sm:text-base font-bold leading-tight line-clamp-2">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-slate-300 text-[10px] sm:text-xs font-light leading-relaxed line-clamp-3">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Slider Navigation Buttons */}
      <div className="flex items-center gap-4 mt-6">
        <button
          onClick={handlePrev}
          className="h-11 w-11 rounded-full border border-slate-300 hover:border-daun bg-white text-slate-700 hover:text-daun hover:scale-105 active:scale-95 flex items-center justify-center transition-all duration-200 cursor-pointer shadow-sm"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={handleNext}
          className="h-11 w-11 rounded-full border border-slate-300 hover:border-daun bg-white text-slate-700 hover:text-daun hover:scale-105 active:scale-95 flex items-center justify-center transition-all duration-200 cursor-pointer shadow-sm"
          aria-label="Next image"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
