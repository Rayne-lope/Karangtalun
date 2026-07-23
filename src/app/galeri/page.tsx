import Image from "next/image";
import Link from "next/link";
import { PublicShell } from "@/components/public/public-shell";
import { getPublishedGallery } from "@/lib/data";
import { createPageMetadata } from "@/lib/metadata";
import "../homepage.css";

type PageProps = {
  searchParams: Promise<{ category?: string }>;
};

export const metadata = createPageMetadata({
  title: "Galeri Dokumentasi",
  description: "Potret kegiatan KKN, lanskap dusun, dan interaksi warga Karangtalun dalam satu galeri dokumentasi.",
  path: "/galeri",
});

export default async function GalleryPage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const activeCategory = resolvedParams.category;

  const allItems = await getPublishedGallery();

  // Extract unique categories dynamically from the items list in server
  const categories = Array.from(
    new Set(allItems.map((item) => item.category).filter(Boolean))
  ) as string[];

  // Filter items in memory based on selected category
  const filteredItems = activeCategory
    ? allItems.filter((item) => item.category === activeCategory)
    : allItems;

  return (
    <div className="homepage-custom">
      <PublicShell bgClassName="bg-[var(--cream)]" hideFooter={true}>
        <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          {/* Header Section */}
          <div className="mb-8 sm:mb-10 text-left">
            <span className="section-tag mb-3 inline-block">Galeri Lensa Pengabdian</span>
            <h1 className="section-title">Galeri Dokumentasi</h1>
            <p className="section-desc max-w-2xl mt-3 text-sm sm:text-base leading-relaxed text-[var(--muted)]">
              Melihat lebih dekat potret lanskap alam, momen hangat interaksi warga, serta visual program kerja pengabdian mahasiswa KKN di Dusun Karangtalun.
            </p>
          </div>

          {/* Category Filter Navigation (horizontal scroll on mobile) */}
          <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-4 pt-1 no-scrollbar sm:flex-wrap border-b border-[var(--line)]">
            <Link
              href="/galeri"
              className={`inline-flex shrink-0 items-center justify-center min-h-[44px] px-4 rounded-full text-[10px] font-extrabold tracking-wider uppercase transition-all duration-200 ${
                !activeCategory
                  ? "bg-[var(--teal)] !text-white shadow-sm"
                  : "bg-[var(--paper)] text-[var(--ink)] border border-[var(--line)] hover:border-[var(--teal)] shadow-sm"
              }`}
            >
              Semua Foto
            </Link>
            {categories.map((cat) => {
              const isActive = cat === activeCategory;
              return (
                <Link
                  key={cat}
                  href={`/galeri?category=${encodeURIComponent(cat)}`}
                  className={`inline-flex shrink-0 items-center justify-center min-h-[44px] px-4 rounded-full text-[10px] font-extrabold tracking-wider uppercase transition-all duration-200 ${
                    isActive
                      ? "bg-[var(--teal)] !text-white shadow-sm"
                      : "bg-[var(--paper)] text-[var(--ink)] border border-[var(--line)] hover:border-[var(--teal)] shadow-sm"
                  }`}
                >
                  {cat}
                </Link>
              );
            })}
          </div>

          {/* Gallery Grid Section - Touch & Mobile friendly design */}
          {filteredItems.length > 0 ? (
            <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {filteredItems.map((item) => (
                <article
                  key={item.id}
                  className="relative aspect-[4/3] w-full overflow-hidden rounded-[22px] sm:rounded-[28px] border border-[var(--line)] bg-[var(--paper-2)] group shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
                >
                  {/* Gallery Image */}
                  <Image
                    src={item.image_url}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Gradient Overlay & Text (Always readable on mobile, hover effect on desktop) */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[rgba(7,57,51,0.92)] via-[rgba(7,57,51,0.55)] to-transparent flex flex-col justify-end p-5 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                    <span className="font-extrabold text-[9px] tracking-wider uppercase text-[var(--gold)] mb-1">
                      {item.category ?? "Galeri"}
                    </span>
                    
                    <h3 className="text-white font-serif text-base sm:text-lg font-medium leading-tight mb-1 line-clamp-2">
                      {item.title}
                    </h3>
                    
                    {item.description ? (
                      <p className="text-white/80 font-sans text-[11px] leading-relaxed line-clamp-2">
                        {item.description}
                      </p>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          ) : null}

          {/* Empty State */}
          {filteredItems.length === 0 ? (
            <div className="mt-8 rounded-[24px] border border-[var(--line)] bg-[var(--paper)] px-6 py-16 text-center shadow-sm">
              <span className="text-3xl mb-3 block">◇</span>
              <p className="text-sm font-semibold text-[var(--ink)]">Belum ada dokumentasi foto.</p>
              <p className="text-xs text-[var(--muted)] mt-1">Coba bersihkan filter kategori Anda.</p>
              <Link
                href="/galeri"
                className="mt-5 inline-flex min-h-[44px] items-center justify-center px-5 rounded-full text-[10px] font-extrabold tracking-[1.5px] uppercase transition-all duration-200 bg-[var(--teal)] !text-white hover:bg-[var(--teal-2)] shadow-sm"
              >
                Kembali ke Semua Foto
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
