"use client";

import Image from "next/image";
import Link from "next/link";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  Building2,
  Check,
  ChevronDown,
  Compass,
  MapPin,
  MessageCircle,
  Navigation,
  RotateCcw,
  Search,
  Share2,
  Store,
  X,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  karangtalunMapGeometry,
  type MapCoordinate,
  type PetaUmkmLocation,
} from "@/lib/karangtalun-map";
import styles from "./peta-map.module.css";

type PetaMapCanvasProps = {
  locations: PetaUmkmLocation[];
};

function toLatLng([longitude, latitude]: MapCoordinate): L.LatLngTuple {
  return [latitude, longitude];
}

function mapDirectionsUrl(location: PetaUmkmLocation) {
  if (location.mapUrl) return location.mapUrl;

  const [longitude, latitude] = location.coordinates;
  return `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
}

function mapLocationUrl(slug: string) {
  const url = new URL(window.location.href);
  url.searchParams.set("umkm", slug);
  return url.toString();
}

async function copyToClipboard(value: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return;
  }

  const textArea = document.createElement("textarea");
  textArea.value = value;
  textArea.setAttribute("readonly", "");
  textArea.style.position = "fixed";
  textArea.style.opacity = "0";
  document.body.append(textArea);
  textArea.select();

  const copied = document.execCommand("copy");
  textArea.remove();

  if (!copied) {
    throw new Error("Clipboard tidak tersedia.");
  }
}

function initialSelectedSlug(locations: PetaUmkmLocation[]) {
  if (typeof window === "undefined") return null;

  const locationParam = new URLSearchParams(window.location.search).get("umkm");
  return locations.some((location) => location.slug === locationParam) ? locationParam : null;
}

export default function PetaMapCanvas({ locations }: PetaMapCanvasProps) {
  const mapElementRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markerLayerRef = useRef<L.LayerGroup | null>(null);
  const boundaryBoundsRef = useRef<L.LatLngBounds | null>(null);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [selectedSlug, setSelectedSlug] = useState<string | null>(() => initialSelectedSlug(locations));
  const [isPanelOpen, setIsPanelOpen] = useState(() => Boolean(initialSelectedSlug(locations)));
  const [imageFailed, setImageFailed] = useState(false);
  const [shareFeedback, setShareFeedback] = useState("");

  const categories = useMemo(
    () => [...new Set(locations.map((location) => location.category))].sort((left, right) => left.localeCompare(right, "id")),
    [locations],
  );

  const visibleLocations = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("id-ID");

    return locations.filter((location) => {
      const hasCategory = category === "all" || location.category === category;
      const searchableContent = `${location.name} ${location.category} ${location.summary}`.toLocaleLowerCase("id-ID");
      return hasCategory && (!normalizedQuery || searchableContent.includes(normalizedQuery));
    });
  }, [category, locations, query]);

  const selectedLocation = useMemo(
    () => locations.find((location) => location.slug === selectedSlug) ?? null,
    [locations, selectedSlug],
  );

  const selectLocation = useCallback((slug: string) => {
    setSelectedSlug(slug);
    setIsPanelOpen(true);
    setShareFeedback("");

    const url = new URL(window.location.href);
    url.searchParams.set("umkm", slug);
    window.history.replaceState({}, "", url);
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedSlug(null);
    setShareFeedback("");

    const url = new URL(window.location.href);
    url.searchParams.delete("umkm");
    window.history.replaceState({}, "", url);
  }, []);

  const resetMap = useCallback(() => {
    setQuery("");
    setCategory("all");
    clearSelection();

    const bounds = boundaryBoundsRef.current;
    if (bounds) {
      mapRef.current?.fitBounds(bounds, { padding: [24, 24] });
    }
  }, [clearSelection]);

  useEffect(() => {
    const mapElement = mapElementRef.current;
    if (!mapElement || mapRef.current) return;

    const map = L.map(mapElement, {
      attributionControl: true,
      zoomControl: false,
      scrollWheelZoom: true,
      preferCanvas: true,
    });

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    L.control.zoom({ position: "bottomright" }).addTo(map);

    const boundary = L.polygon(karangtalunMapGeometry.boundary.map(toLatLng), {
      color: "#0f4a42",
      weight: 2,
      opacity: 0.75,
      fillColor: "#2a7b6e",
      fillOpacity: 0.11,
      interactive: false,
    }).addTo(map);

    karangtalunMapGeometry.roads.forEach((path) => {
      L.polyline(path.map(toLatLng), {
        color: "#fffdf7",
        weight: 4,
        opacity: 0.82,
        lineCap: "round",
        lineJoin: "round",
        interactive: false,
      }).addTo(map);
    });

    karangtalunMapGeometry.lanes.forEach((path) => {
      L.polyline(path.map(toLatLng), {
        color: "#d8d2be",
        weight: 2,
        opacity: 0.78,
        lineCap: "round",
        lineJoin: "round",
        interactive: false,
      }).addTo(map);
    });

    karangtalunMapGeometry.rivers.forEach((path) => {
      L.polyline(path.map(toLatLng), {
        color: "#4e9eaa",
        weight: 2.5,
        opacity: 0.72,
        lineCap: "round",
        lineJoin: "round",
        interactive: false,
      }).addTo(map);
    });

    const bounds = boundary.getBounds();
    map.fitBounds(bounds, { padding: [24, 24] });

    mapRef.current = map;
    boundaryBoundsRef.current = bounds;
    markerLayerRef.current = L.layerGroup().addTo(map);

    const resizeObserver = new ResizeObserver(() => {
      map.invalidateSize({ animate: false });
    });
    resizeObserver.observe(mapElement);

    return () => {
      resizeObserver.disconnect();
      map.remove();
      mapRef.current = null;
      markerLayerRef.current = null;
      boundaryBoundsRef.current = null;
    };
  }, []);

  useEffect(() => {
    const markerLayer = markerLayerRef.current;
    if (!markerLayer) return;

    markerLayer.clearLayers();

    visibleLocations.forEach((location) => {
      const isSelected = location.slug === selectedSlug;
      const marker = L.marker(toLatLng(location.coordinates), {
        alt: `${location.name}, ${location.category}`,
        keyboard: true,
        title: location.name,
        riseOnHover: true,
        icon: L.divIcon({
          className: styles.markerWrapper,
          html: `<span class="${styles.markerPin} ${isSelected ? styles.markerPinSelected : ""}" aria-hidden="true"></span>`,
          iconSize: [36, 36],
          iconAnchor: [18, 32],
        }),
      });

      marker.on("click keypress", () => selectLocation(location.slug));
      marker.addTo(markerLayer);
    });
  }, [selectLocation, selectedSlug, visibleLocations]);

  useEffect(() => {
    if (!selectedLocation || !mapRef.current) return;

    const map = mapRef.current;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    map.flyTo(toLatLng(selectedLocation.coordinates), Math.max(map.getZoom(), 18), {
      animate: !reduceMotion,
      duration: reduceMotion ? 0 : 0.45,
    });
    setImageFailed(false);
  }, [selectedLocation]);

  const handleShare = async () => {
    if (!selectedLocation) return;

    const url = mapLocationUrl(selectedLocation.slug);
    const text = `Lokasi UMKM ${selectedLocation.name} di Dusun Karangtalun.`;

    if (navigator.share) {
      try {
        await navigator.share({ title: selectedLocation.name, text, url });
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
      }
    }

    try {
      await copyToClipboard(url);
      setShareFeedback("Tautan lokasi berhasil disalin.");
    } catch {
      setShareFeedback("Tautan tidak dapat disalin. Silakan salin alamat halaman secara manual.");
    }
  };

  const whatsappHref = selectedLocation?.whatsapp
    ? `https://wa.me/${selectedLocation.whatsapp.replace(/\D/g, "")}`
    : null;

  return (
    <section className="overflow-hidden rounded-[22px] border border-[var(--line)] bg-[var(--paper)] shadow-[0_18px_54px_rgba(7,57,51,0.08)] sm:rounded-[28px]">
      <div className="grid lg:grid-cols-[minmax(300px,360px)_minmax(0,1fr)]">
        <aside className="order-2 border-t border-[var(--line)] bg-[var(--paper)] lg:order-1 lg:max-h-[650px] lg:overflow-y-auto lg:border-t-0 lg:border-r">
          <button
            type="button"
            className="flex min-h-[56px] w-full items-center justify-between gap-4 px-5 text-left lg:hidden"
            onClick={() => setIsPanelOpen((open) => !open)}
            aria-expanded={isPanelOpen}
            aria-controls="peta-umkm-panel"
          >
            <span>
              <span className="block text-[10px] font-extrabold uppercase tracking-[0.16em] text-[var(--muted)]">Direktori Peta</span>
              <span className="mt-0.5 block text-sm font-semibold text-[var(--ink)]">{visibleLocations.length} UMKM ditampilkan</span>
            </span>
            <ChevronDown className={`h-5 w-5 text-[var(--teal)] transition-transform duration-200 ${isPanelOpen ? "rotate-180" : ""}`} aria-hidden="true" />
          </button>

          <div id="peta-umkm-panel" className={`${isPanelOpen ? "block" : "hidden"} lg:block`}>
            <div className="border-y border-[var(--line)] px-4 py-4 sm:px-5 sm:py-5 lg:border-t-0">
              <span className="hidden text-[10px] font-extrabold uppercase tracking-[0.16em] text-[var(--muted)] lg:inline">Direktori Peta</span>
              <h2 className="mt-0.5 font-serif text-xl font-medium leading-tight text-[var(--ink)] sm:text-2xl">UMKM di Karangtalun</h2>
              <p className="mt-1 text-sm leading-5 text-[var(--muted)] sm:leading-6">Pilih usaha untuk melihat informasi, rute, dan kontaknya.</p>

              <label className="relative mt-4 block">
                <span className="sr-only">Cari UMKM pada peta</span>
                <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted-2)]" aria-hidden="true" />
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Cari UMKM"
                  className="min-h-[44px] w-full rounded-full border border-[var(--line)] bg-[var(--paper-2)] py-2 pl-10 pr-10 text-sm text-[var(--ink)] outline-none transition focus:border-[var(--teal)] focus:bg-white focus:ring-2 focus:ring-[var(--teal)]/15"
                />
                {query ? (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    className="absolute right-1 top-1 inline-flex h-10 w-10 items-center justify-center rounded-full text-[var(--muted)] hover:bg-[var(--line)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--gold)]"
                    aria-label="Hapus pencarian"
                  >
                    <X className="h-4 w-4" aria-hidden="true" />
                  </button>
                ) : null}
              </label>

              <div className="-mx-4 mt-3 flex gap-2 overflow-x-auto px-4 pb-1 no-scrollbar sm:mx-0 sm:px-0" aria-label="Filter kategori UMKM">
                <button
                  type="button"
                  onClick={() => setCategory("all")}
                  aria-pressed={category === "all"}
                  className={`inline-flex min-h-[44px] shrink-0 items-center rounded-full px-4 text-[10px] font-extrabold uppercase tracking-[0.1em] transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--gold)] ${category === "all" ? "bg-[var(--teal)] text-white" : "border border-[var(--line)] bg-[var(--paper-2)] text-[var(--ink)]"}`}
                >
                  Semua
                </button>
                {categories.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setCategory(item)}
                    aria-pressed={category === item}
                    className={`inline-flex min-h-[44px] shrink-0 items-center rounded-full px-4 text-[10px] font-extrabold uppercase tracking-[0.1em] transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--gold)] ${category === item ? "bg-[var(--teal)] text-white" : "border border-[var(--line)] bg-[var(--paper-2)] text-[var(--ink)]"}`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <p className="sr-only" role="status" aria-live="polite">{visibleLocations.length} UMKM ditampilkan di peta.</p>

            {selectedLocation ? (
              <article className="border-b border-[var(--line)] px-5 py-5">
                <div className="flex items-start justify-between gap-3">
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-[0.13em] text-[var(--teal)]">
                    <MapPin className="h-3.5 w-3.5" aria-hidden="true" /> Pilihan peta
                  </span>
                  <button
                    type="button"
                    className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--line)] text-[var(--muted)] hover:border-[var(--teal)] hover:text-[var(--teal)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--gold)]"
                    onClick={clearSelection}
                    aria-label={`Tutup detail ${selectedLocation.name}`}
                  >
                    <X className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>

                {selectedLocation.imageUrl && !imageFailed ? (
                  <div className="relative mt-3 aspect-[16/9] overflow-hidden rounded-2xl bg-[var(--paper-2)]">
                    <Image
                      src={selectedLocation.imageUrl}
                      alt={selectedLocation.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 360px"
                      className="object-cover"
                      onError={() => setImageFailed(true)}
                    />
                  </div>
                ) : (
                  <div className="mt-3 flex aspect-[16/9] items-center justify-center rounded-2xl bg-[var(--paper-2)] text-[var(--muted-2)]">
                    <Store className="h-8 w-8" aria-hidden="true" />
                  </div>
                )}

                <p className="mt-4 text-[10px] font-extrabold uppercase tracking-[0.13em] text-[var(--gold)]">{selectedLocation.category}</p>
                <h3 className="mt-1 font-serif text-2xl font-medium leading-tight text-[var(--ink)]">{selectedLocation.name}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{selectedLocation.summary}</p>

                {selectedLocation.address ? (
                  <p className="mt-3 flex gap-2 text-xs leading-5 text-[var(--muted)]">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[var(--teal)]" aria-hidden="true" />
                    {selectedLocation.address}
                  </p>
                ) : null}

                <div className="mt-5 grid grid-cols-2 gap-2">
                  <Link
                    href={`/umkm/${selectedLocation.slug}`}
                    className="col-span-2 inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-[var(--teal)] px-4 text-[10px] font-extrabold uppercase tracking-[0.12em] text-white transition hover:bg-[var(--teal-2)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--gold)]"
                  >
                    <Building2 className="h-4 w-4" aria-hidden="true" /> Lihat profil
                  </Link>
                  <a
                    href={mapDirectionsUrl(selectedLocation)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-[var(--line)] bg-white px-3 text-[10px] font-extrabold uppercase tracking-[0.1em] text-[var(--ink)] transition hover:border-[var(--teal)] hover:text-[var(--teal)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--gold)]"
                  >
                    <Navigation className="h-4 w-4" aria-hidden="true" /> Rute
                  </a>
                  {whatsappHref ? (
                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-[#25D366]/40 bg-[#25D366]/10 px-3 text-[10px] font-extrabold uppercase tracking-[0.1em] text-[#128C7E] transition hover:bg-[#25D366]/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--gold)]"
                    >
                      <MessageCircle className="h-4 w-4" aria-hidden="true" /> WhatsApp
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={handleShare}
                      className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-[var(--line)] bg-white px-3 text-[10px] font-extrabold uppercase tracking-[0.1em] text-[var(--ink)] transition hover:border-[var(--teal)] hover:text-[var(--teal)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--gold)]"
                    >
                      <Share2 className="h-4 w-4" aria-hidden="true" /> Bagikan
                    </button>
                  )}
                  {whatsappHref ? (
                    <button
                      type="button"
                      onClick={handleShare}
                      className="col-span-2 inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-[var(--line)] bg-[var(--paper-2)] px-4 text-[10px] font-extrabold uppercase tracking-[0.1em] text-[var(--ink)] transition hover:border-[var(--teal)] hover:text-[var(--teal)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--gold)]"
                    >
                      {shareFeedback ? <Check className="h-4 w-4 text-emerald-600" aria-hidden="true" /> : <Share2 className="h-4 w-4" aria-hidden="true" />}
                      {shareFeedback ? "Tautan tersalin" : "Bagikan lokasi"}
                    </button>
                  ) : null}
                </div>
                {shareFeedback ? <p className="mt-3 text-xs font-semibold text-[var(--teal)]" role="status" aria-live="polite">{shareFeedback}</p> : null}
              </article>
            ) : (
              <div className="hidden border-b border-[var(--line)] px-5 py-5 lg:block">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--teal)]/10 text-[var(--teal)]">
                  <Compass className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="mt-3 font-serif text-xl text-[var(--ink)]">Pilih titik usaha</h3>
                <p className="mt-1 text-sm leading-6 text-[var(--muted)]">Marker dan daftar saling terhubung. Pilih salah satu untuk membuka detail usaha.</p>
              </div>
            )}

            <div className="px-4 py-4 sm:px-5">
              <div className="mb-3 flex items-center justify-between gap-3">
                <h3 className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-[var(--muted)]">Hasil tersedia</h3>
                <span className="text-xs font-semibold text-[var(--teal)]">{visibleLocations.length}</span>
              </div>
              {visibleLocations.length ? (
                <div className="space-y-2">
                  {visibleLocations.map((location) => {
                    const isSelected = location.slug === selectedSlug;
                    return (
                      <button
                        key={location.id}
                        type="button"
                        onClick={() => selectLocation(location.slug)}
                        className={`flex min-h-[58px] w-full items-center gap-3 rounded-2xl border px-3.5 py-2.5 text-left transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--gold)] ${isSelected ? "border-[var(--teal)] bg-[var(--teal)]/8" : "border-[var(--line)] bg-[var(--paper-2)]/55 hover:border-[var(--teal)]/45 hover:bg-white"}`}
                      >
                        <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${isSelected ? "bg-[var(--teal)] text-white" : "bg-white text-[var(--teal)]"}`}>
                          <MapPin className="h-4 w-4" aria-hidden="true" />
                        </span>
                        <span className="min-w-0">
                          <span className="block truncate text-sm font-semibold text-[var(--ink)]">{location.name}</span>
                          <span className="mt-0.5 block truncate text-xs text-[var(--muted)]">{location.category}</span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-[var(--line)] bg-[var(--paper-2)] px-4 py-6 text-center text-sm leading-6 text-[var(--muted)]">
                  Tidak ada UMKM yang sesuai. Coba kata kunci atau kategori lain.
                </div>
              )}
            </div>
          </div>
        </aside>

        <div className={`${styles.mapStage} order-1 lg:order-2`}>
          <div ref={mapElementRef} className={styles.mapCanvas} role="region" aria-label="Peta interaktif UMKM Dusun Karangtalun" />
          <div className="pointer-events-none absolute left-4 top-4 z-[500] flex max-w-[calc(100%-2rem)] items-center gap-2 rounded-full border border-white/75 bg-[var(--paper)] px-3 py-2 text-xs font-semibold text-[var(--ink)] shadow-sm">
            <Store className="h-4 w-4 shrink-0 text-[var(--teal)]" aria-hidden="true" />
            <span className="truncate">{visibleLocations.length} titik UMKM</span>
          </div>
          <button
            type="button"
            onClick={resetMap}
            className="absolute right-4 top-4 z-[500] inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--paper)] px-4 text-[10px] font-extrabold uppercase tracking-[0.1em] text-[var(--ink)] shadow-sm transition hover:border-[var(--teal)] hover:text-[var(--teal)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--gold)]"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">Tampilan awal</span>
            <span className="sm:hidden">Reset</span>
          </button>
        </div>
      </div>
    </section>
  );
}
