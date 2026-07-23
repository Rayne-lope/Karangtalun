"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import type { GalleryItem } from "@/types/content";

type HomeGalleryItem = Pick<GalleryItem, "id" | "title" | "description" | "image_url" | "category">;

type HomeGallerySliderProps = {
  gallery: HomeGalleryItem[];
};

export function HomeGallerySlider({ gallery }: HomeGallerySliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Default fallback slides if gallery is empty
  const defaultSlides: HomeGalleryItem[] = [
    {
      id: "1",
      image_url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1100&q=82",
      category: "Catatan Pengabdian",
      title: "Kerja bakti dan kegiatan bersama warga.",
      description: null,
    },
    {
      id: "2",
      image_url: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1100&q=82",
      category: "Lanskap Desa",
      title: "Ruang hijau, sawah, dan potensi agraris.",
      description: null,
    },
    {
      id: "3",
      image_url: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1100&q=82",
      category: "Program Kerja",
      title: "Koordinasi program dan dokumentasi lapangan.",
      description: null,
    },
  ];

  const slides = gallery && gallery.length > 0 ? gallery : defaultSlides;
  const totalSlides = slides.length;

  useEffect(() => {
    if (totalSlides <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5200);
    return () => clearInterval(interval);
  }, [totalSlides]);

  const moveSlide = (direction: number) => {
    setCurrentSlide((prev) => (prev + direction + totalSlides) % totalSlides);
  };

  return (
    <div className="gallery-slider">
      <div className="slider-window">
        <div className="slider-controls">
          <button 
            className="slider-btn" 
            type="button" 
            aria-label="Slide sebelumnya" 
            onClick={() => moveSlide(-1)}
          >
            ‹
          </button>
          <button 
            className="slider-btn" 
            type="button" 
            aria-label="Slide berikutnya" 
            onClick={() => moveSlide(1)}
          >
            ›
          </button>
        </div>

        <div 
          className="slider-track" 
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide) => (
            <figure key={slide.id} className="slide">
              <Image
                src={slide.image_url}
                alt={slide.title}
                fill
                sizes="(max-width: 768px) 100vw, 58vw"
                className="object-cover"
                priority={slide.id === slides[0]?.id}
              />
              <figcaption className="slide-caption">
                <span>{slide.category || "Dokumentasi"}</span>
                <h3>{slide.title}</h3>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      <div className="lensa-side-content">
        <span className="section-tag">Lensa Pengabdian</span>
        <h2 className="section-title">Mengabadikan jejak bakti di Karangtalun.</h2>
        <p>
          Galeri visual menampilkan dokumentasi kegiatan KKN, potensi wilayah,
          interaksi warga, dan arsip foto yang dapat menjadi identitas visual desa.
        </p>
        <Link href="/galeri" className="discover-link">
          Jelajahi Galeri Lengkap <span className="arrow">→</span>
        </Link>
      </div>
    </div>
  );
}
