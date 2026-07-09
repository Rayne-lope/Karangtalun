import Link from "next/link";
import Image from "next/image";
import { PublicShell } from "@/components/public/public-shell";
import { getPublishedNews, getNewsCategories } from "@/lib/data";
import { formatDate } from "@/lib/utils/format-date";
import "../homepage.css";

type PageProps = {
  searchParams: Promise<{ category?: string }>;
};

export default async function NewsPage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const activeCategorySlug = resolvedParams.category;

  const [allNews, categories] = await Promise.all([
    getPublishedNews(),
    getNewsCategories(),
  ]);

  // Filter news based on active category slug
  const filteredNews = activeCategorySlug
    ? allNews.filter((item) => item.news_categories?.slug === activeCategorySlug)
    : allNews;

  // Set the first article as featured only if no category filter is applied and articles exist
  const featuredNews = !activeCategorySlug && filteredNews.length > 0 ? filteredNews[0] : null;
  const displayNews = featuredNews ? filteredNews.slice(1) : filteredNews;

  return (
    <div className="homepage-custom">
      <PublicShell bgClassName="bg-[var(--cream)]" hideFooter={true}>
        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="mb-10 text-left">
            <span className="section-tag mb-4 inline-block">Kabar Dusun &amp; Kegiatan</span>
            <h1 className="section-title">Berita &amp; Kegiatan</h1>
            <p className="section-desc max-w-2xl mt-4">
              Ikuti perkembangan terbaru, agenda warga, pembangunan wilayah, serta catatan dan laporan program pengabdian masyarakat di Dusun Karangtalun.
            </p>
          </div>

          {/* Category Filter Navigation */}
          <div className="flex flex-wrap items-center gap-3 mb-12 border-b border-[#1c2b24]/10 pb-6">
            <Link
              href="/berita"
              className={`inline-flex items-center justify-center min-h-[38px] px-5 rounded-full text-[10px] font-extrabold tracking-[1.5px] uppercase transition-all duration-200 ${
                !activeCategorySlug
                  ? "bg-[var(--teal)] !text-white shadow-[0_4px_12px_rgba(7,57,51,0.15)]"
                  : "bg-[var(--paper)] text-[var(--ink)] border border-[var(--line)] hover:border-[var(--teal)] hover:-translate-y-0.5 shadow-sm"
              }`}
            >
              Semua Kabar
            </Link>
            {categories.map((cat) => {
              const isActive = cat.slug === activeCategorySlug;
              return (
                <Link
                  key={cat.id}
                  href={`/berita?category=${cat.slug}`}
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

          {/* Featured Article Section */}
          {featuredNews && (
            <div className="mb-16">
              <span className="section-tag mb-5 inline-block">Artikel Utama</span>
              <div className="group overflow-hidden rounded-[28px] border border-[var(--line)] bg-[var(--paper)] shadow-[0_14px_40px_rgba(7,57,51,0.055)] transition-all duration-300 hover:shadow-[0_28px_70px_rgba(7,57,51,0.14)] hover:-translate-y-1.5 md:grid md:grid-cols-12 md:gap-0">
                <div className="relative aspect-[16/10] overflow-hidden bg-[var(--paper-2)] md:col-span-7 md:aspect-auto md:min-h-[380px]">
                  {featuredNews.cover_image_url ? (
                    <Image
                      src={featuredNews.cover_image_url}
                      alt={featuredNews.title}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-[var(--paper-2)] text-[var(--muted-2)] font-mono text-xs">
                      No Cover Image
                    </div>
                  )}
                </div>
                <div className="flex flex-col justify-between p-8 md:col-span-5 md:p-10 lg:p-12">
                  <div>
                    <span className="inline-flex font-extrabold text-[10px] tracking-[1.7px] uppercase text-[var(--teal)] mb-3">
                      {featuredNews.news_categories?.name || "Kabar KKN"}
                    </span>
                    <div className="flex flex-wrap gap-4 text-[11px] font-semibold text-[var(--muted-2)] mb-4">
                      <span>{formatDate(featuredNews.published_at)}</span>
                      <span>•</span>
                      <span>Admin KKN</span>
                    </div>
                    <Link
                      href={`/berita/${featuredNews.slug}`}
                      className="block mb-4 text-2xl font-medium leading-tight text-[var(--ink)] font-serif md:text-3xl hover:text-[var(--teal)] transition-colors"
                    >
                      {featuredNews.title}
                    </Link>
                    <p className="text-[var(--muted)] text-sm leading-relaxed mb-6 line-clamp-4 font-sans">
                      {featuredNews.excerpt}
                    </p>
                  </div>
                  <Link
                    href={`/berita/${featuredNews.slug}`}
                    className="inline-flex items-center gap-2 text-[10px] font-extrabold tracking-[1.7px] uppercase text-[var(--ink)] border-b border-current pb-1 w-fit hover:text-[var(--teal)] transition-colors duration-200"
                  >
                    Baca Selengkapnya
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* News Grid Section */}
          {displayNews.length > 0 ? (
            <div className="news-grid">
              {displayNews.map((item) => (
                <article key={item.id} className="item-card group">
                  <div className="card-img-wrap relative">
                    {item.cover_image_url ? (
                      <Image
                        src={item.cover_image_url}
                        alt={item.title}
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
                      {item.news_categories?.name || "Kabar KKN"}
                    </span>
                    <div className="card-meta">
                      <span>{formatDate(item.published_at)}</span>
                      <span>Admin KKN</span>
                    </div>
                    <Link href={`/berita/${item.slug}`} className="card-title-link line-clamp-2">
                      {item.title}
                    </Link>
                    <p className="card-excerpt line-clamp-3">{item.excerpt}</p>
                    <Link href={`/berita/${item.slug}`} className="card-link">
                      Baca Selengkapnya
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : null}

          {/* Empty State */}
          {filteredNews.length === 0 ? (
            <div className="mt-8 rounded-[24px] border border-[var(--line)] bg-[var(--paper)] px-6 py-16 text-center shadow-sm">
              <span className="text-3xl mb-3 block">◇</span>
              <p className="text-sm font-semibold text-[var(--ink)]">Belum ada berita yang dipublikasikan.</p>
              <p className="text-xs text-[var(--muted)] mt-1">Coba pilih kategori lain atau kembali ke semua kabar.</p>
              <Link
                href="/berita"
                className="mt-5 inline-flex items-center justify-center min-h-[38px] px-5 rounded-full text-[10px] font-extrabold tracking-[1.5px] uppercase transition-all duration-200 bg-[var(--teal)] !text-white hover:bg-[var(--teal-2)] shadow-sm"
              >
                Kembali ke Semua Kabar
              </Link>
            </div>
          ) : null}
        </section>
      </PublicShell>

      {/* Landing Page Matched Footer */}
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
