import Link from "next/link";
import Image from "next/image";
import { PublicShell } from "@/components/public/public-shell";
import { getActiveUmkm, getUmkmCategories } from "@/lib/data";
import { Search, MapPin, User, MessageCircle, ArrowRight, Store, Tag } from "lucide-react";
import "../homepage.css";

type PageProps = {
  searchParams: Promise<{ category?: string; search?: string }>;
};

export default async function UmkmPage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const activeCategorySlug = resolvedParams.category;
  const searchQuery = resolvedParams.search;

  const [allUmkm, categories] = await Promise.all([
    getActiveUmkm(),
    getUmkmCategories(),
  ]);

  // Count items per category
  const categoryCounts = categories.reduce<Record<string, number>>((acc, cat) => {
    acc[cat.slug] = allUmkm.filter((item) => item.umkm_categories?.slug === cat.slug).length;
    return acc;
  }, {});

  // Filter in memory based on category and search query
  let filteredUmkm = allUmkm;

  if (activeCategorySlug) {
    filteredUmkm = filteredUmkm.filter(
      (item) => item.umkm_categories?.slug === activeCategorySlug
    );
  }

  if (searchQuery) {
    const query = searchQuery.toLowerCase().trim();
    filteredUmkm = filteredUmkm.filter(
      (item) =>
        item.name.toLowerCase().includes(query) ||
        (item.description && item.description.toLowerCase().includes(query)) ||
        (item.product_description && item.product_description.toLowerCase().includes(query)) ||
        (item.owner_name && item.owner_name.toLowerCase().includes(query))
    );
  }

  return (
    <div className="homepage-custom">
      <PublicShell bgClassName="bg-[var(--cream)]" hideFooter={true}>
        <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          {/* Header & Hero Section */}
          <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl text-left">
              <span className="section-tag mb-3 inline-flex items-center gap-2">
                <Store className="h-4 w-4" /> Potensi Ekonomi Kreatif
              </span>
              <h1 className="section-title">Direktori & Katalog UMKM</h1>
              <p className="section-desc mt-3 text-base leading-relaxed text-[var(--muted)]">
                Jelajahi berbagai produk kriya unggulan, kuliner khas, dan potensi usaha warga Dusun Karangtalun yang terus tumbuh dan berkembang.
              </p>
            </div>

            {/* Stats Badge Card */}
            <div className="flex shrink-0 items-center gap-4 rounded-[24px] border border-[var(--line)] bg-[var(--paper)] p-4 shadow-sm">
              <div className="text-center px-3 border-r border-[var(--line)]">
                <span className="block text-2xl font-bold font-serif text-[var(--teal)]">{allUmkm.length}</span>
                <span className="text-[10px] font-extrabold tracking-wider uppercase text-[var(--muted)]">Usaha Lokal</span>
              </div>
              <div className="text-center px-3">
                <span className="block text-2xl font-bold font-serif text-[var(--teal)]">{categories.length}</span>
                <span className="text-[10px] font-extrabold tracking-wider uppercase text-[var(--muted)]">Kategori</span>
              </div>
            </div>
          </div>

          {/* Search Bar & Filter Form */}
          <div className="mb-8 rounded-[28px] border border-[var(--line)] bg-[var(--paper)] p-4 sm:p-6 shadow-sm">
            <form action="/umkm" method="GET" className="flex flex-col gap-4 sm:flex-row sm:items-center">
              {activeCategorySlug && (
                <input type="hidden" name="category" value={activeCategorySlug} />
              )}
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted-2)]" />
                <input
                  type="text"
                  name="search"
                  defaultValue={searchQuery || ""}
                  placeholder="Cari nama toko, produk, atau pemilik UMKM..."
                  className="w-full rounded-full border border-[var(--line)] bg-[var(--paper-2)] py-3 pl-11 pr-4 text-xs sm:text-sm text-[var(--ink)] placeholder-[var(--muted-2)] transition-all focus:border-[var(--teal)] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--teal)]/20"
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-full bg-[var(--teal)] px-6 text-[11px] font-extrabold tracking-wider uppercase text-white transition-colors hover:bg-[var(--teal-2)] sm:flex-none cursor-pointer"
                >
                  Cari UMKM
                </button>
                {searchQuery && (
                  <Link
                    href={activeCategorySlug ? `/umkm?category=${activeCategorySlug}` : "/umkm"}
                    className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-[var(--line)] bg-white px-4 text-[11px] font-extrabold tracking-wider uppercase text-red-600 transition-colors hover:bg-red-50 cursor-pointer"
                  >
                    Reset
                  </Link>
                )}
              </div>
            </form>

            {/* Category Filter Pills */}
            <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-[var(--line)] pt-5">
              <span className="mr-2 inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-widest text-[var(--muted)]">
                <Tag className="h-3 w-3" /> Filter:
              </span>
              <Link
                href={searchQuery ? `/umkm?search=${encodeURIComponent(searchQuery)}` : "/umkm"}
                className={`inline-flex items-center gap-1.5 min-h-[36px] px-4 rounded-full text-[10px] font-extrabold tracking-wider uppercase transition-all duration-200 ${
                  !activeCategorySlug
                    ? "bg-[var(--teal)] text-white shadow-sm"
                    : "bg-[var(--paper-2)] text-[var(--ink)] border border-[var(--line)] hover:border-[var(--teal)] hover:bg-white"
                }`}
              >
                Semua
                <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${!activeCategorySlug ? "bg-white/20 text-white" : "bg-[var(--line)] text-[var(--muted)]"}`}>
                  {allUmkm.length}
                </span>
              </Link>

              {categories.map((cat) => {
                const isActive = cat.slug === activeCategorySlug;
                const count = categoryCounts[cat.slug] || 0;
                const href = searchQuery
                  ? `/umkm?category=${cat.slug}&search=${encodeURIComponent(searchQuery)}`
                  : `/umkm?category=${cat.slug}`;

                return (
                  <Link
                    key={cat.id}
                    href={href}
                    className={`inline-flex items-center gap-1.5 min-h-[36px] px-4 rounded-full text-[10px] font-extrabold tracking-wider uppercase transition-all duration-200 ${
                      isActive
                        ? "bg-[var(--teal)] text-white shadow-sm"
                        : "bg-[var(--paper-2)] text-[var(--ink)] border border-[var(--line)] hover:border-[var(--teal)] hover:bg-white"
                    }`}
                  >
                    {cat.name}
                    <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${isActive ? "bg-white/20 text-white" : "bg-[var(--line)] text-[var(--muted)]"}`}>
                      {count}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Search Status Indicator */}
          {searchQuery && (
            <div className="mb-6 flex items-center justify-between rounded-2xl bg-[var(--paper-2)] border border-[var(--line)] px-5 py-3 text-xs text-[var(--ink)]">
              <span>
                Menampilkan hasil untuk pencarian <strong className="text-[var(--teal)]">&ldquo;{searchQuery}&rdquo;</strong> ({filteredUmkm.length} ditemukan)
              </span>
              <Link
                href={activeCategorySlug ? `/umkm?category=${activeCategorySlug}` : "/umkm"}
                className="text-[10px] font-extrabold uppercase text-[var(--teal)] hover:underline"
              >
                Hapus Kata Kunci ×
              </Link>
            </div>
          )}

          {/* UMKM Grid Section */}
          {filteredUmkm.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredUmkm.map((item) => {
                const whatsappHref = item.whatsapp ? `https://wa.me/${item.whatsapp.replace(/\D/g, "")}` : null;

                return (
                  <div
                    key={item.id}
                    className="group flex flex-col justify-between overflow-hidden rounded-[28px] border border-[var(--line)] bg-[var(--paper)] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[var(--teal)]/40 hover:shadow-lg"
                  >
                    {/* Top Image & Category Overlay */}
                    <div>
                      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[var(--paper-2)]">
                        {item.image_url ? (
                          <Image
                            src={item.image_url}
                            alt={item.name}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                          />
                        ) : (
                          <div className="flex h-full w-full flex-col items-center justify-center gap-1 bg-[var(--paper-2)] text-[var(--muted-2)]">
                            <Store className="h-8 w-8 opacity-40" />
                            <span className="text-xs font-mono">Tanpa Foto</span>
                          </div>
                        )}

                        {/* Category Overlay Badge */}
                        <div className="absolute left-3 top-3">
                          <span className="inline-block rounded-full bg-[var(--teal)]/90 px-3 py-1 text-[9px] font-extrabold uppercase tracking-wider text-white backdrop-blur-md">
                            {item.umkm_categories?.name || "Usaha Dusun"}
                          </span>
                        </div>
                      </div>

                      {/* Card Content Body */}
                      <div className="p-5 sm:p-6">
                        {/* Title */}
                        <Link href={`/umkm/${item.slug}`} className="group/title block">
                          <h2 className="text-xl font-medium font-serif text-[var(--ink)] line-clamp-2 transition-colors group-hover/title:text-[var(--teal)]">
                            {item.name}
                          </h2>
                        </Link>

                        {/* Owner & Address Badge */}
                        <div className="mt-2.5 flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-[var(--muted)]">
                          {item.owner_name && (
                            <span className="inline-flex items-center gap-1 font-semibold text-[var(--ink)]">
                              <User className="h-3.5 w-3.5 text-[var(--teal)]" /> {item.owner_name}
                            </span>
                          )}
                          {item.address && (
                            <span className="inline-flex items-center gap-1 line-clamp-1">
                              <MapPin className="h-3.5 w-3.5 text-[var(--muted-2)]" /> {item.address}
                            </span>
                          )}
                        </div>

                        {/* Excerpt */}
                        <p className="mt-3 text-xs leading-relaxed text-[var(--muted)] line-clamp-3">
                          {item.description || item.product_description || "Produk dan layanan unggulan dari Dusun Karangtalun."}
                        </p>
                      </div>
                    </div>

                    {/* Card Actions Footer */}
                    <div className="flex items-center justify-between border-t border-[var(--line)] bg-[var(--paper-2)]/50 px-5 py-3.5">
                      <Link
                        href={`/umkm/${item.slug}`}
                        className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider text-[var(--teal)] transition-all group-hover:gap-2 hover:underline"
                      >
                        Detail Usaha <ArrowRight className="h-3.5 w-3.5" />
                      </Link>

                      {whatsappHref && (
                        <a
                          href={whatsappHref}
                          target="_blank"
                          rel="noreferrer"
                          title="Hubungi WhatsApp"
                          className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#25D366]/30 bg-[#25D366]/10 text-[#128C7E] transition-all hover:bg-[#25D366] hover:text-white hover:shadow-sm"
                        >
                          <MessageCircle className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : null}

          {/* Empty State */}
          {filteredUmkm.length === 0 ? (
            <div className="my-10 rounded-[32px] border border-[var(--line)] bg-[var(--paper)] p-12 text-center shadow-sm">
              <Store className="mx-auto h-12 w-12 text-[var(--muted-2)]" />
              <h3 className="mt-4 text-lg font-medium font-serif text-[var(--ink)]">Belum ada UMKM yang ditemukan</h3>
              <p className="mt-1 text-xs text-[var(--muted)]">
                Coba sesuaikan kata kunci pencarian Anda atau pilih filter kategori lainnya.
              </p>
              <Link
                href="/umkm"
                className="mt-6 inline-flex min-h-[42px] items-center justify-center rounded-full bg-[var(--teal)] px-6 text-[10px] font-extrabold uppercase tracking-widest text-white transition-colors hover:bg-[var(--teal-2)]"
              >
                Tampilkan Semua UMKM
              </Link>
            </div>
          ) : null}
        </section>
      </PublicShell>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div>
              <div className="footer-brand">Karangtalun</div>
              <p>
                Website informasi dusun dan dokumentasi KKN untuk menampilkan profil wilayah,
                kabar pengabdian, katalog UMKM, data dusun, dan galeri visual secara tertata.
              </p>
            </div>

            <div>
              <h4>Menu Utama</h4>
              <nav className="footer-links" aria-label="Menu utama footer">
                <Link href="/profil">Profil Dusun</Link>
                <Link href="/berita">Berita &amp; Kegiatan</Link>
                <Link href="/umkm">Potensi UMKM</Link>
                <Link href="/galeri">Galeri Dokumentasi</Link>
              </nav>
            </div>

            <div>
              <h4>Direktori</h4>
              <nav className="footer-links" aria-label="Direktori footer">
                <Link href="/sejarah">Sejarah Dusun</Link>
                <Link href="/proker-kkn">Proker KKN</Link>
                <Link href="/struktur-dusun">Struktur Pemerintahan</Link>
                <Link href="/data-dusun">Data &amp; Statistik</Link>
                <Link href="/peta">Peta Wilayah</Link>
              </nav>
            </div>

            <div>
              <h4>Kontak Dusun</h4>
              <div className="footer-links">
                <span>Karangtalun, Ngluwar</span>
                <span>Kabupaten Magelang, Jawa Tengah</span>
                <span>Telepon: 081215503366</span>
                <span>Email: ngluwarkarangtalun@gmail.com</span>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <span>© 2026 Dusun Karangtalun · KKN UPNYK.84.160</span>
            <div className="footer-social" aria-label="Media sosial">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">IG</a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" aria-label="TikTok">TT</a>
              <a href="mailto:ngluwarkarangtalun@gmail.com" aria-label="Email">@</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
