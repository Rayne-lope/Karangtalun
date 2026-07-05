"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Mail, MapPin, Phone, Search } from "lucide-react";

const navItems = [
  { href: "/berita", label: "Berita" },
  { href: "/umkm", label: "UMKM" },
  { href: "/galeri", label: "Galeri" },
];

const footerSections = [
  {
    title: "Profil Desa",
    links: [
      { href: "/profil", label: "Profil" },
      { href: "/sejarah", label: "Sejarah" },
      { href: "/visi-misi", label: "Visi Misi" },
      { href: "/struktur-desa", label: "Struktur Desa" },
    ],
  },
  {
    title: "Informasi",
    links: [
      { href: "/berita", label: "Berita" },
      { href: "/umkm", label: "UMKM" },
      { href: "/galeri", label: "Galeri" },
      { href: "/data-desa", label: "Data Desa" },
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
}: {
  children: React.ReactNode;
  bgClassName?: string;
  hideFooter?: boolean;
}) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/umkm?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className={`min-h-screen ${bgClassName} text-slate-800 flex flex-col font-sans`}>
      <div className="max-w-7xl mx-auto w-full px-3 sm:px-6 lg:px-8 pt-3 sm:pt-4 flex-1 flex flex-col relative">
        {/* Navigation Bar */}
        <nav className="flex flex-col lg:flex-row items-center justify-between py-4 sm:py-5 px-2 sm:px-3 z-40 mb-5 sm:mb-7 gap-4 bg-transparent">
          <div className="flex items-center justify-between w-full lg:w-auto">
            <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group">
              <div className="w-11 h-11 relative flex items-center justify-center">
                <Image 
                  src="/images/karanz.png" 
                  alt="Logo Desa Karangtalun" 
                  width={44} 
                  height={44} 
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="text-left">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-rimba group-hover:text-daun transition-colors duration-200">
                  Karangtalun<span className="text-daun font-serif italic font-normal">.</span>
                </span>
                <p className="text-[8px] sm:text-[9px] tracking-[0.18em] uppercase text-slate-400 font-bold">
                  Profil Desa & KKN Mandiri UPN
                </p>
              </div>
            </Link>
            
            {/* Simple Touch Menu Indicators for Mobile */}
            <div className="flex lg:hidden items-center gap-1.5 text-[10px] font-bold text-slate-500 bg-white/60 px-2.5 py-1.5 rounded-full border border-slate-200/50 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Aktif</span>
            </div>
          </div>
          
          {/* Mid-Nav Menu Links */}
          <div className="flex items-center justify-center gap-6 sm:gap-8 text-xs sm:text-sm font-bold bg-white/75 lg:bg-transparent py-2.5 px-6 lg:p-0 rounded-full border border-slate-200/50 lg:border-none shadow-sm lg:shadow-none backdrop-blur-sm lg:backdrop-blur-none w-full lg:w-auto text-slate-600">
            {navItems.map((item) => (
              <Link 
                key={item.href} 
                href={item.href} 
                className="transition-colors py-1 active:scale-95 duration-100 hover:text-daun text-slate-600"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right-Nav Search & Pill Button */}
          <div className="flex items-center gap-2.5 w-full lg:w-auto justify-between lg:justify-end">
            <form onSubmit={handleSearchSubmit} className="relative flex h-9 w-full items-center lg:w-56 xl:w-64">
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari UMKM..." 
                className="h-9 w-full rounded-full border border-slate-200/80 bg-white/95 py-0 pl-4 pr-10 text-xs text-slate-700 placeholder:text-slate-400 shadow-sm transition-all duration-200 focus:border-emerald-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/10"
              />
              <button type="submit" className="absolute inset-y-0 right-3 my-auto flex h-6 w-6 items-center justify-center text-slate-400 hover:text-emerald-700 transition-colors cursor-pointer">
                <Search className="w-3.5 h-3.5" />
              </button>
            </form>

            <Link 
              href="/umkm" 
              className="inline-flex h-9 items-center justify-center rounded-full bg-[#073933] px-5 text-[10px] font-extrabold tracking-[1.5px] uppercase !text-white shadow-sm transition-all duration-300 hover:bg-[#0f4a42] hover:shadow-md hover:-translate-y-0.5 active:scale-95 sm:text-[11px] shrink-0"
            >
              Eksplor UMKM
            </Link>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1">{children}</main>

        {/* Footer */}
        {!hideFooter && (
          <footer className="mt-16 mb-6 overflow-hidden rounded-[2rem] bg-slate-950 text-slate-200 shadow-xl">
            <div className="mx-auto grid max-w-6xl gap-10 px-6 py-10 sm:px-8 lg:grid-cols-[1.35fr_2fr] lg:py-12">
              <div className="space-y-5 text-left">
                <Link href="/" className="inline-flex items-center gap-3 group">
                  <div className="relative flex h-12 w-12 items-center justify-center">
                    <Image
                      src="/images/karanz.png"
                      alt="Logo Desa Karangtalun"
                      width={48}
                      height={48}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <div>
                    <p className="text-xl font-extrabold tracking-tight text-white group-hover:text-daun transition-colors">
                      Karangtalun<span className="text-pucuk">.</span>
                    </p>
                    <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400">
                      Profil Desa & KKN Mandiri UPN
                    </p>
                  </div>
                </Link>

                <p className="max-w-md text-sm leading-6 text-slate-400">
                  Portal informasi Desa Karangtalun untuk berita, profil wilayah, katalog UMKM, galeri kegiatan, dan akses layanan publik sederhana.
                </p>

                <div className="space-y-3 text-xs text-slate-400">
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-daun" />
                    <span>Karangtalun, Ngluwar, Kabupaten Magelang, Jawa Tengah</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 shrink-0 text-daun" />
                    <span>ngluwarkarangtalun@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 shrink-0 text-daun" />
                    <span>081215503366</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-7 text-left sm:grid-cols-3">
                {footerSections.map((section) => (
                  <div key={section.title} className="space-y-3">
                    <h2 className="text-xs font-extrabold uppercase tracking-[0.18em] text-white">
                      {section.title}
                    </h2>
                    <nav className="flex flex-col gap-2.5 text-sm">
                      {section.links.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="text-slate-400 transition-colors hover:text-daun"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </nav>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-white/10 px-6 py-4 sm:px-8">
              <div className="mx-auto flex max-w-6xl flex-col gap-3 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
                <p>© 2026 Pemdes Karangtalun & KKN PPM UPN.</p>
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
