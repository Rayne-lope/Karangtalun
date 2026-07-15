import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PublicShell } from "@/components/public/public-shell";
import { getPublishedNewsBySlug, getPublishedNews } from "@/lib/data";
import { formatDate } from "@/lib/utils/format-date";
import "../../homepage.css";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function NewsDetailPage({ params }: PageProps) {
  const { slug } = await params;
  
  // Fetch current news and recent news in parallel
  const [news, recentNews] = await Promise.all([
    getPublishedNewsBySlug(slug),
    getPublishedNews(4), // Fetch 4 items so that if we exclude the current one, we have up to 3
  ]);

  if (!news) {
    notFound();
  }

  // Filter out current news from the related articles list
  const relatedArticles = recentNews
    ? recentNews.filter((item) => item.slug !== slug).slice(0, 3)
    : [];

  return (
    <div className="homepage-custom">
      <PublicShell bgClassName="bg-[var(--cream)]" hideFooter={true}>
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          {/* Back Navigation */}
          <div className="mb-8">
            <Link
              href="/berita"
              className="group inline-flex items-center gap-2 text-[10px] font-extrabold tracking-[1.7px] uppercase text-[var(--ink)] hover:text-[var(--teal)] transition-colors duration-200"
            >
              <span className="transition-transform duration-200 group-hover:-translate-x-1 inline-block">←</span> Kembali ke Berita
            </Link>
          </div>

          {/* Article Wrapper */}
          <article className="max-w-3xl mx-auto">
            {/* Category */}
            <span className="font-extrabold text-[10px] tracking-[1.7px] uppercase text-[var(--teal)] mb-3 block">
              {news.news_categories?.name ?? "Berita Dusun"}
            </span>

            {/* Title */}
            <h1 className="text-3xl font-medium leading-tight text-[var(--ink)] font-serif sm:text-4xl md:text-5xl">
              {news.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 mt-5 mb-8 text-[11px] font-semibold text-[var(--muted-2)] border-b border-[#1c2b24]/10 pb-6">
              <span>{formatDate(news.published_at)}</span>
              <span>•</span>
              <span>Ditulis oleh Admin KKN</span>
            </div>

            {/* Cover Image */}
            {news.cover_image_url ? (
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[28px] border border-[var(--line)] bg-[var(--paper-2)] shadow-md mb-10">
                <Image
                  src={news.cover_image_url}
                  alt={news.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 800px"
                  className="object-cover"
                />
              </div>
            ) : null}

            {/* Excerpt */}
            {news.excerpt ? (
              <p className="text-lg leading-relaxed text-[var(--ink)] font-serif italic border-l-2 border-[var(--teal)] pl-4 mb-8">
                {news.excerpt}
              </p>
            ) : null}

            {/* Content Body */}
            <div className="whitespace-pre-line text-sm sm:text-base leading-relaxed sm:leading-8 text-[var(--ink)] font-sans space-y-6">
              {news.content}
            </div>
          </article>

          {/* Divider */}
          <hr className="my-16 border-t border-[#1c2b24]/10" />

          {/* Related Articles ("Baca Juga") Section */}
          {relatedArticles.length > 0 && (
            <div className="max-w-3xl mx-auto">
              <span className="section-tag mb-8 block">Baca Artikel Lainnya</span>
              <div className="grid gap-6 sm:grid-cols-3">
                {relatedArticles.map((item) => (
                  <Link key={item.id} href={`/berita/${item.slug}`} className="item-card group block cursor-pointer">
                    <div className="card-img-wrap relative !h-[150px]">
                      {item.cover_image_url ? (
                        <Image
                          src={item.cover_image_url}
                          alt={item.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 250px"
                          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-[var(--paper-2)] text-[var(--muted-2)] text-xs font-mono">
                          No Image
                        </div>
                      )}
                    </div>
                    <div className="card-body !p-5">
                      <span className="card-category !text-[9px] !mb-1">
                        {item.news_categories?.name || "Kabar KKN"}
                      </span>
                      <div className="card-meta !text-[9px] !mb-2">
                        <span>{formatDate(item.published_at)}</span>
                      </div>
                      <span className="card-title-link !text-[18px] line-clamp-2 !mb-2">
                        {item.title}
                      </span>
                      <span className="card-link !text-[9px]">
                        Baca Selengkapnya
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
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
