"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, Mail, MapPin, Phone, Search, Menu, X, ChevronRight, Store, BookOpen, UserCheck, Map, BarChart3, Info } from "lucide-react";

const mainNavItems = [
  { href: "/berita", label: "Berita & Kegiatan" },
  { href: "/umkm", label: "Potensi UMKM" },
  { href: "/galeri", label: "Galeri Visual" },
  { href: "/profil", label: "Profil Dusun" },
];

const allNavItems = [
  { href: "/profil", label: "Profil Dusun", icon: Info },
  { href: "/berita", label: "Berita & Kegiatan", icon: BookOpen },
  { href: "/umkm", label: "Potensi UMKM", icon: Store },
  { href: "/galeri", label: "Galeri Visual", icon: BookOpen },
  { href: "/sejarah", label: "Sejarah Dusun", icon: Info },
  { href: "/proker-kkn", label: "Proker KKN", icon: BookOpen },
  { href: "/struktur-dusun", label: "Struktur Pemerintahan", icon: UserCheck },
  { href: "/data-dusun", label: "Data & Statistik", icon: BarChart3 },
  { href: "/peta", label: "Peta Wilayah", icon: Map },
  { href: "/kontak", label: "Kontak & Layanan", icon: Phone },
];

const footerSections = [
  {
    title: "Profil Dusun",
    links: [
      { href: "/profil", label: "Profil" },
      { href: "/sejarah", label: "Sejarah" },
      { href: "/proker-kkn", label: "Proker KKN" },
      { href: "/struktur-dusun", label: "Struktur Dusun" },
    ],
  },
  {
    title: "Informasi",
    links: [
      { href: "/berita", label: "Berita" },
      { href: "/umkm", label: "UMKM" },
      { href: "/galeri", label: "Galeri" },
      { href: "/data-dusun", label: "Data Dusun" },
    ],
  },
  {
    title: "Layanan",
    links: [
      { href: "/peta", label: "Peta Wilayah" },
      { href: "/kontak", label: "Kontak" },
      { href: "/admin/login", label: "Admin" },
    ],
  },
];

export function PublicShell({
  children,
  bgClassName = "bg-pasir",
  hideFooter = false,
  headerVariant = "default",
}: {
  children: React.ReactNode;
  bgClassName?: string;
  hideFooter?: boolean;
  headerVariant?: "default" | "article";
}) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsMobileSearchOpen(false);
      setIsMobileMenuOpen(false);
      router.push(`/umkm?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className={`min-h-screen ${bgClassName} text-slate-800 flex flex-col font-sans overflow-x-hidden`}>
      <div className="max-w-7xl mx-auto w-full px-3 sm:px-6 lg:px-8 pt-3 sm:pt-4 flex-1 flex flex-col relative">
        {/* Navigation Bar */}
        <nav className="relative z-40 mb-4 sm:mb-7 py-3 sm:py-4 px-2 sm:px-3 bg-transparent">
          <div className="flex items-center justify-between gap-3">
            {/* Brand Logo */}
            <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group min-w-0">
              <div className={`${headerVariant === "article" ? "w-9 h-9 sm:w-10 sm:h-10" : "w-10 h-10 sm:w-11 sm:h-11"} relative flex shrink-0 items-center justify-center`}>
                <Image 
                  src="/images/karanz.png" 
                  alt="Logo Dusun Karangtalun" 
                  width={44} 
                  height={44} 
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="text-left">
                <span className="text-lg sm:text-xl font-extrabold tracking-tight text-rimba group-hover:text-daun transition-colors duration-200">
                  Karangtalun<span className="text-daun font-serif italic font-normal">.</span>
                </span>
                <p className="text-[8px] sm:text-[9px] tracking-[0.16em] uppercase text-slate-400 font-bold line-clamp-1">
                  Profil Dusun & KKN UPN
                </p>
              </div>
            </Link>

            {headerVariant === "article" ? (
              <Link
                href="/berita"
                className="inline-flex min-h-11 shrink-0 items-center justify-center gap-1.5 rounded-full border border-[var(--line)] bg-[var(--paper)] px-3 text-[10px] font-extrabold uppercase tracking-[0.12em] text-[var(--ink)] transition-colors hover:border-[var(--teal)] hover:text-[var(--teal)] sm:px-4"
              >
                <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                <span className="sm:hidden">Berita</span>
                <span className="hidden sm:inline">Kembali ke Berita</span>
              </Link>
            ) : (
              <>
                {/* Desktop Navigation Links */}
                <div className="hidden lg:flex items-center gap-6 xl:gap-8 text-xs font-bold text-slate-600">
                  {mainNavItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="transition-colors py-1 hover:text-daun text-slate-700"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>

                {/* Desktop Search & CTA */}
                <div className="hidden lg:flex items-center gap-2.5">
                  <form onSubmit={handleSearchSubmit} className="relative flex h-9 items-center lg:w-52 xl:w-60">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Cari UMKM..."
                      className="h-9 w-full rounded-full border border-slate-200/80 bg-white/95 py-0 pl-4 pr-9 text-xs text-slate-700 placeholder:text-slate-400 shadow-sm transition-all duration-200 focus:border-emerald-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/10"
                    />
                    <button type="submit" aria-label="Cari UMKM" className="absolute inset-y-0 right-3 my-auto flex h-8 w-8 items-center justify-center text-slate-400 hover:text-emerald-700 transition-colors cursor-pointer">
                      <Search className="w-3.5 h-3.5" />
                    </button>
                  </form>

                  <Link
                    href="/umkm"
                    className="inline-flex h-9 items-center justify-center rounded-full bg-[#073933] px-4 text-[10px] font-extrabold tracking-[1.5px] uppercase !text-white shadow-sm transition-all duration-300 hover:bg-[#0f4a42] hover:shadow-md hover:-translate-y-0.5 active:scale-95 shrink-0 cursor-pointer"
                  >
                    Katalog UMKM
                  </Link>
                </div>

                {/* Mobile Right Controls: Search Toggle + Hamburger Button */}
                <div className="flex items-center gap-1.5 lg:hidden">
                  <button
                    type="button"
                    onClick={() => {
                      setIsMobileSearchOpen(!isMobileSearchOpen);
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white/90 text-slate-700 shadow-sm transition-all active:scale-95 cursor-pointer"
                    aria-label={isMobileSearchOpen ? "Tutup pencarian" : "Buka pencarian"}
                    aria-controls="mobile-search-panel"
                    aria-expanded={isMobileSearchOpen}
                  >
                    <Search className="h-4 w-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setIsMobileMenuOpen(!isMobileMenuOpen);
                      setIsMobileSearchOpen(false);
                    }}
                    className="flex min-h-11 items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-3 text-xs font-bold text-slate-700 shadow-sm transition-all active:scale-95 cursor-pointer"
                    aria-label={isMobileMenuOpen ? "Tutup menu" : "Buka menu"}
                    aria-controls="mobile-navigation-panel"
                    aria-expanded={isMobileMenuOpen}
                  >
                    {isMobileMenuOpen ? <X className="h-4 w-4 text-emerald-700" /> : <Menu className="h-4 w-4" />}
                    <span className="text-[11px] uppercase tracking-wider font-extrabold">
                      {isMobileMenuOpen ? "Tutup" : "Menu"}
                    </span>
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Mobile Search Overlay Bar */}
          {isMobileSearchOpen && (
            <div id="mobile-search-panel" className="mt-3 lg:hidden animate-fade-in">
              <form onSubmit={handleSearchSubmit} className="relative flex h-11 w-full items-center">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari produk / UMKM Karangtalun..."
                  className="h-11 w-full rounded-2xl border border-emerald-600/40 bg-white py-0 pl-4 pr-12 text-base text-slate-800 placeholder:text-slate-400 shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  autoFocus
                />
                  <button
                    type="submit"
                    aria-label="Jalankan pencarian UMKM"
                    className="absolute inset-y-0 right-2 my-auto flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--teal)] text-white shadow-sm cursor-pointer"
                >
                  <Search className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}

          {/* Mobile Drawer Slide-down Navigation */}
          {isMobileMenuOpen && (
            <div id="mobile-navigation-panel" className="mt-3 overflow-hidden rounded-[24px] border border-slate-200 bg-white p-4 shadow-xl lg:hidden animate-fade-in">
              <div className="mb-3 border-b border-slate-100 pb-3">
                <form onSubmit={handleSearchSubmit} className="relative flex h-11 w-full items-center">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cari UMKM atau info..."
                    className="h-11 w-full rounded-full border border-slate-200 bg-slate-50 py-0 pl-4 pr-12 text-base text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-none"
                  />
                  <button type="submit" aria-label="Jalankan pencarian UMKM" className="absolute inset-y-0 right-1 my-auto flex h-11 w-11 items-center justify-center text-slate-400">
                    <Search className="w-4 h-4" />
                  </button>
                </form>
              </div>

              <div className="grid grid-cols-1 gap-1">
                {allNavItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex min-h-[44px] items-center justify-between rounded-xl px-3 text-xs font-extrabold uppercase tracking-wider text-slate-700 transition-all hover:bg-emerald-50 hover:text-emerald-800 active:bg-emerald-100"
                    >
                      <span className="flex items-center gap-2.5">
                        <Icon className="h-4 w-4 text-[var(--teal)]" />
                        {item.label}
                      </span>
                      <ChevronRight className="h-3.5 w-3.5 text-slate-300" />
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </nav>

        {/* Main Content */}
        <main className="flex-1">{children}</main>

        {/* Footer */}
        {!hideFooter && (
          <footer className="mt-12 mb-6 overflow-hidden rounded-[2rem] bg-slate-950 text-slate-200 shadow-xl">
            <div className="mx-auto grid max-w-6xl gap-8 px-5 py-8 sm:px-8 lg:grid-cols-[1.35fr_2fr] lg:py-12">
              <div className="space-y-4 text-left">
                <Link href="/" className="inline-flex items-center gap-3 group">
                  <div className="relative flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center">
                    <Image
                      src="/images/karanz.png"
                      alt="Logo Dusun Karangtalun"
                      width={48}
                      height={48}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <div>
                    <p className="text-lg sm:text-xl font-extrabold tracking-tight text-white group-hover:text-daun transition-colors">
                      Karangtalun<span className="text-pucuk">.</span>
                    </p>
                    <p className="text-[8px] sm:text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400">
                      Profil Dusun & KKN UPN
                    </p>
                  </div>
                </Link>

                <p className="max-w-md text-xs sm:text-sm leading-6 text-slate-400">
                  Portal informasi Dusun Karangtalun untuk berita, profil wilayah, katalog UMKM, galeri kegiatan, dan akses layanan publik.
                </p>

                <div className="space-y-2.5 text-xs text-slate-400">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-daun" />
                    <span>Karangtalun, Ngluwar, Magelang, Jawa Tengah</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Mail className="h-4 w-4 shrink-0 text-daun" />
                    <span className="truncate">ngluwarkarangtalun@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Phone className="h-4 w-4 shrink-0 text-daun" />
                    <span>081215503366</span>
                  </div>
                </div>
              </div>

              {/* Mobile 2-column grid / Desktop 3-column grid */}
              <div className="grid grid-cols-2 gap-6 text-left sm:grid-cols-3">
                {footerSections.map((section) => (
                  <div key={section.title} className="space-y-3">
                    <h2 className="text-[11px] sm:text-xs font-extrabold uppercase tracking-[0.18em] text-white">
                      {section.title}
                    </h2>
                    <nav className="flex flex-col gap-2 text-xs sm:text-sm">
                      {section.links.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="text-slate-400 transition-colors hover:text-daun py-0.5"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </nav>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-white/10 px-5 py-4 sm:px-8">
              <div className="mx-auto flex max-w-6xl flex-col gap-3 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
                <p>© 2026 Dusun Karangtalun · KKN UPNYK</p>
                <div className="flex flex-wrap gap-3 font-semibold">
                  <Link href="/" className="hover:text-daun transition-colors">Beranda</Link>
                  <span className="text-slate-700">•</span>
                  <Link href="/kontak" className="hover:text-daun transition-colors">Kontak</Link>
                  <span className="text-slate-700">•</span>
                  <Link href="/admin/login" className="hover:text-daun transition-colors">Admin</Link>
                </div>
              </div>
            </div>
          </footer>
        )}
      </div>
    </div>
  );
}
