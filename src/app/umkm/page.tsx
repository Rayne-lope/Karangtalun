import Link from "next/link";
import Image from "next/image";
import { PublicShell } from "@/components/public/public-shell";
import { getActiveUmkm, getUmkmCategories } from "@/lib/data";
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
        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="mb-10 text-left">
            <span className="section-tag mb-4 inline-block">Potensi Kreatif & Usaha</span>
            <h1 className="section-title">Potensi UMKM</h1>
            <p className="section-desc max-w-2xl mt-4">
              Jelajahi berbagai produk kriya, kuliner khas, dan potensi usaha lokal warga Dusun Karangtalun yang dikembangkan secara kreatif.
            </p>
          </div>

          {/* Search Status (if search query is active) */}
          {searchQuery && (
            <div className="mb-8 flex items-center justify-between rounded-[24px] bg-[var(--paper)] border border-[var(--line)] px-6 py-4 shadow-sm">
              <p className="text-xs font-semibold text-[var(--ink)]">
                Menampilkan hasil pencarian untuk: <span className="font-serif italic text-sm text-[var(--teal)] ml-1">&ldquo;{searchQuery}&rdquo;</span>
              </p>
              <Link
                href={activeCategorySlug ? `/umkm?category=${activeCategorySlug}` : "/umkm"}
                className="text-[10px] font-extrabold tracking-[1px] uppercase text-[var(--teal)] hover:text-red-600 transition-colors"
              >
                Hapus Pencarian ×
              </Link>
            </div>
          )}

          {/* Category Filter Navigation */}
          <div className="flex flex-wrap items-center gap-3 mb-12 border-b border-[#1c2b24]/10 pb-6">
            <Link
              href={searchQuery ? `/umkm?search=${encodeURIComponent(searchQuery)}` : "/umkm"}
              className={`inline-flex items-center justify-center min-h-[38px] px-5 rounded-full text-[10px] font-extrabold tracking-[1.5px] uppercase transition-all duration-200 ${
                !activeCategorySlug
                  ? "bg-[var(--teal)] !text-white shadow-[0_4px_12px_rgba(7,57,51,0.15)]"
                  : "bg-[var(--paper)] text-[var(--ink)] border border-[var(--line)] hover:border-[var(--teal)] hover:-translate-y-0.5 shadow-sm"
              }`}
            >
              Semua UMKM
            </Link>
            {categories.map((cat) => {
              const isActive = cat.slug === activeCategorySlug;
              const href = searchQuery
                ? `/umkm?category=${cat.slug}&search=${encodeURIComponent(searchQuery)}`
                : `/umkm?category=${cat.slug}`;
              return (
                <Link
                  key={cat.id}
                  href={href}
                  className={`inline-flex items-center justify-center min-h-[38px] px-5 rounded-full text-[10px] font-extrabold tracking-[1.5px] uppercase transition-all duration-200 ${
                    isActive
                      ? "bg-[var(--teal)] !text-white shadow-[0_4px_12px_rgba(7,57,51,0.15)]"
                      : "bg-[var(--paper)] text-[var(--ink)] border border-[var(--line)] hover:border-[var(--teal)] hover:-translate-y-0.5 shadow-sm"
                  }`}
                >
                  {cat.name}
                </Link>
              );
            })}
          </div>

          {/* UMKM Grid Section */}
          {filteredUmkm.length > 0 ? (
            <div className="umkm-grid">
              {filteredUmkm.map((item) => (
                <Link key={item.id} href={`/umkm/${item.slug}`} className="item-card group block cursor-pointer">
                  <div className="card-img-wrap relative">
                    {item.image_url ? (
                      <Image
                        src={item.image_url}
                        alt={item.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-[var(--paper-2)] text-[var(--muted-2)] text-xs font-mono">
                        No Image
                      </div>
                    )}
                  </div>
                  <div className="card-body">
                    <span className="card-category">
                      {item.umkm_categories?.name || "UMKM Dusun"}
                    </span>
                    <span className="card-title-link line-clamp-2">
                      {item.name}
                    </span>
                    <p className="card-excerpt line-clamp-3">
                      {item.description || item.product_description}
                    </p>
                    <span className="card-link">
                      Detail Toko & Produk
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : null}

          {/* Empty State */}
          {filteredUmkm.length === 0 ? (
            <div className="mt-8 rounded-[24px] border border-[var(--line)] bg-[var(--paper)] px-6 py-16 text-center shadow-sm">
              <span className="text-3xl mb-3 block">◇</span>
              <p className="text-sm font-semibold text-[var(--ink)]">Belum ada UMKM yang ditemukan.</p>
              <p className="text-xs text-[var(--muted)] mt-1">Coba bersihkan pencarian atau pilih kategori lainnya.</p>
              <Link
                href="/umkm"
                className="mt-5 inline-flex items-center justify-center min-h-[38px] px-5 rounded-full text-[10px] font-extrabold tracking-[1.5px] uppercase transition-all duration-200 bg-[var(--teal)] !text-white hover:bg-[var(--teal-2)] shadow-sm"
              >
                Kembali ke Semua UMKM
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
