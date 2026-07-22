import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache } from "react";
import { PublicShell } from "@/components/public/public-shell";
import { getPublishedNewsBySlug, getPublishedNews } from "@/lib/data";
import { formatDate } from "@/lib/utils/format-date";
import { NewsShareActions } from "./news-share-actions";
import "../../homepage.css";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const getArticle = cache(getPublishedNewsBySlug);

function getArticleDescription(content: string, excerpt: string | null) {
  const description = (excerpt ?? content).replace(/\s+/g, " ").trim();

  if (description.length <= 170) {
    return description;
  }

  return `${description.slice(0, 167).trimEnd()}…`;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const news = await getArticle(slug);

  if (!news) {
    return {};
  }

  const description = getArticleDescription(news.content, news.excerpt);
  const images = news.cover_image_url ? [news.cover_image_url] : undefined;

  return {
    title: `${news.title} | Karangtalun`,
    description,
    authors: [{ name: "Admin KKN" }],
    openGraph: {
      type: "article",
      locale: "id_ID",
      title: news.title,
      description,
      publishedTime: news.published_at ?? undefined,
      images,
    },
    twitter: {
      card: news.cover_image_url ? "summary_large_image" : "summary",
      title: news.title,
      description,
      images,
    },
  };
}

export default async function NewsDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const [news, recentNews] = await Promise.all([
    getArticle(slug),
    getPublishedNews(4),
  ]);

  if (!news) {
    notFound();
  }

  const relatedArticles = recentNews
    .filter((item) => item.slug !== slug)
    .slice(0, 3);
  const articleDescription = getArticleDescription(news.content, news.excerpt);

  return (
    <div className="homepage-custom">
      <PublicShell bgClassName="bg-[var(--cream)]" hideFooter={true} headerVariant="article">
        <div className="mx-auto w-full max-w-5xl px-4 pb-16 pt-6 sm:px-6 sm:pb-24 sm:pt-10 lg:px-8">
          <article className="mx-auto max-w-3xl">
            <header>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.17em] text-[var(--teal)]">
                {news.news_categories?.name ?? "Berita Dusun"}
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold text-[var(--muted-2)]">
                <time dateTime={news.published_at ?? undefined}>{formatDate(news.published_at)}</time>
                <span aria-hidden="true">•</span>
                <span>Ditulis oleh Admin KKN</span>
              </div>

              <h1 className="mt-5 font-serif text-[clamp(2.35rem,9vw,4.75rem)] font-medium leading-[0.96] tracking-[-0.04em] text-[var(--ink)]">
                {news.title}
              </h1>

              {news.excerpt ? (
                <p className="mt-6 rounded-2xl border border-[var(--line)] bg-[var(--paper-2)] px-5 py-5 font-serif text-lg leading-8 text-[var(--ink)] sm:mt-7 sm:px-7 sm:py-6 sm:text-xl sm:leading-9">
                  {news.excerpt}
                </p>
              ) : null}

              <NewsShareActions title={news.title} summary={articleDescription} />
            </header>

            {news.cover_image_url ? (
              <figure className="relative mt-8 aspect-[4/3] w-full overflow-hidden rounded-[24px] border border-[var(--line)] bg-[var(--paper-2)] shadow-[0_18px_48px_rgba(7,57,51,0.10)] sm:mt-10 sm:aspect-[16/10] sm:rounded-[28px]">
                <Image
                  src={news.cover_image_url}
                  alt={news.title}
                  fill
                  priority
                  sizes="(max-width: 640px) calc(100vw - 32px), (max-width: 1024px) calc(100vw - 96px), 768px"
                  className="object-cover"
                />
              </figure>
            ) : null}

            <div className="mx-auto mt-9 max-w-[42rem] whitespace-pre-line text-[17px] leading-8 text-[var(--ink)] sm:mt-12 sm:text-[18px] sm:leading-9">
              {news.content}
            </div>
          </article>

          {relatedArticles.length > 0 && (
            <section className="mx-auto mt-16 max-w-3xl border-t border-[var(--line)] pt-10 sm:mt-24 sm:pt-14" aria-labelledby="related-news-title">
              <div className="flex items-end justify-between gap-5">
                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.17em] text-[var(--teal)]">Lanjutkan membaca</p>
                  <h2 id="related-news-title" className="mt-3 font-serif text-3xl leading-none tracking-[-0.03em] text-[var(--ink)] sm:text-4xl">
                    Artikel lainnya
                  </h2>
                </div>
                <Link href="/berita" className="hidden text-[10px] font-extrabold uppercase tracking-[0.14em] text-[var(--teal)] underline underline-offset-4 sm:inline">
                  Semua berita
                </Link>
              </div>

              <div className="mt-7 grid gap-3 sm:grid-cols-3 sm:gap-5">
                {relatedArticles.map((item) => (
                  <Link
                    key={item.id}
                    href={`/berita/${item.slug}`}
                    className="item-card group grid grid-cols-[88px_minmax(0,1fr)] gap-4 p-3 sm:block sm:p-0"
                  >
                    <div className="card-img-wrap relative !h-[88px] overflow-hidden rounded-xl sm:!h-[150px] sm:rounded-none">
                      {item.cover_image_url ? (
                        <Image
                          src={item.cover_image_url}
                          alt={item.title}
                          fill
                          sizes="(max-width: 640px) 88px, 250px"
                          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-[var(--paper-2)] px-3 text-center text-[10px] font-semibold text-[var(--muted-2)]">
                          Tanpa gambar
                        </div>
                      )}
                    </div>

                    <div className="min-w-0 py-1 sm:p-5">
                      <p className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-[var(--teal)]">
                        {item.news_categories?.name ?? "Kabar KKN"}
                      </p>
                      <p className="mt-1 text-[10px] font-semibold text-[var(--muted-2)]">
                        {formatDate(item.published_at)}
                      </p>
                      <h3 className="mt-2 line-clamp-2 font-serif text-[20px] leading-[1.02] tracking-[-0.02em] text-[var(--ink)] sm:text-[22px]">
                        {item.title}
                      </h3>
                      <span className="mt-3 hidden text-[10px] font-extrabold uppercase tracking-[0.12em] text-[var(--teal)] sm:inline-block">
                        Baca selengkapnya →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>

              <Link href="/berita" className="mt-7 inline-flex min-h-11 items-center text-[10px] font-extrabold uppercase tracking-[0.14em] text-[var(--teal)] underline underline-offset-4 sm:hidden">
                Lihat semua berita
              </Link>
            </section>
          )}
        </div>
      </PublicShell>

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
