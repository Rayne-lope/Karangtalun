import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache } from "react";
import { PublicShell } from "@/components/public/public-shell";
import { UmkmShareActions } from "@/components/public/umkm-share-actions";
import { getActiveUmkmBySlug, getActiveUmkm } from "@/lib/data";
import { createPageMetadata } from "@/lib/metadata";
import {
  ArrowLeft,
  MapPin,
  Phone,
  MessageCircle,
  ExternalLink,
  User,
  Store,
  ShoppingBag,
  ArrowRight,
} from "lucide-react";
import "../../homepage.css";

function InstagramIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

type PageProps = {
  params: Promise<{ slug: string }>;
};

const getUmkm = cache(getActiveUmkmBySlug);

function getUmkmDescription(item: { description: string | null; product_description: string | null }) {
  const description = (item.description ?? item.product_description ?? "Usaha lokal warga Dusun Karangtalun.")
    .replace(/\s+/g, " ")
    .trim();

  return description.length > 170
    ? `${description.slice(0, 167).trimEnd()}…`
    : description;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = await getUmkm(slug);

  if (!item) {
    return {};
  }

  return createPageMetadata({
    title: item.name,
    description: getUmkmDescription(item),
    path: `/umkm/${slug}`,
    image: item.image_url,
  });
}

export default async function UmkmDetailPage({ params }: PageProps) {
  const { slug } = await params;

  // Fetch current UMKM and all active UMKMs in parallel
  const [item, allUmkm] = await Promise.all([
    getUmkm(slug),
    getActiveUmkm(),
  ]);

  if (!item) {
    notFound();
  }

  const whatsappHref = item.whatsapp ? `https://wa.me/${item.whatsapp.replace(/\D/g, "")}` : null;

  // Filter related UMKM of the same category, excluding the current one
  let relatedUmkm = allUmkm.filter(
    (u) => u.slug !== slug && u.category_id === item.category_id
  );

  // If there are less than 3 related UMKMs of the same category, fill in with others
  if (relatedUmkm.length < 3) {
    const otherUmkm = allUmkm.filter(
      (u) => u.slug !== slug && u.category_id !== item.category_id
    );
    relatedUmkm = [...relatedUmkm, ...otherUmkm].slice(0, 3);
  } else {
    relatedUmkm = relatedUmkm.slice(0, 3);
  }

  const summary = item.description || item.product_description;

  return (
    <div className="homepage-custom">
      <PublicShell bgClassName="bg-[var(--cream)]" hideFooter={true}>
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          {/* Back Navigation */}
          <div className="mb-8">
            <Link
              href="/umkm"
              className="group inline-flex items-center gap-2 text-[10px] font-extrabold tracking-widest uppercase text-[var(--ink)] hover:text-[var(--teal)] transition-colors duration-200"
            >
              <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-x-1" />
              Kembali ke Katalog UMKM
            </Link>
          </div>

          {/* Main Layout Grid */}
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px]">
            {/* Left Content Column */}
            <div className="space-y-8">
              {/* Header Info */}
              <div>
                <span className="inline-block rounded-full bg-[var(--teal)] px-3.5 py-1 text-[10px] font-extrabold uppercase tracking-widest text-white mb-4">
                  {item.umkm_categories?.name ?? "Usaha Dusun"}
                </span>

                <h1 className="text-3xl font-medium leading-tight text-[var(--ink)] font-serif sm:text-4xl md:text-5xl">
                  {item.name}
                </h1>

                {/* Subtitle Meta */}
                <div className="mt-4 flex flex-wrap items-center gap-y-2 gap-x-5 border-y border-[var(--line)] py-3 text-xs text-[var(--muted)]">
                  {item.owner_name && (
                    <span className="inline-flex items-center gap-1.5 font-semibold text-[var(--ink)]">
                      <User className="h-4 w-4 text-[var(--teal)]" /> Pemilik: {item.owner_name}
                    </span>
                  )}
                  {item.address && (
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="h-4 w-4 text-[var(--teal)]" /> {item.address}
                    </span>
                  )}
                </div>
              </div>

              {/* Cover Image */}
              {item.image_url ? (
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[28px] border border-[var(--line)] bg-[var(--paper-2)] shadow-md">
                  <Image
                    src={item.image_url}
                    alt={item.name}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 720px"
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="flex aspect-[16/9] w-full flex-col items-center justify-center gap-2 rounded-[28px] border border-[var(--line)] bg-[var(--paper-2)] text-[var(--muted-2)]">
                  <Store className="h-12 w-12 opacity-30" />
                  <span className="text-xs font-mono">Tanpa Foto UMKM</span>
                </div>
              )}

              {/* Description Content */}
              <div className="space-y-8 text-sm sm:text-base leading-relaxed sm:leading-8 text-[var(--ink)] font-sans">
                {item.description ? (
                  <div className="rounded-[24px] border border-[var(--line)] bg-[var(--paper)] p-6 sm:p-8 shadow-sm">
                    <h2 className="text-xl font-medium font-serif text-[var(--ink)] mb-3">
                      Tentang UMKM
                    </h2>
                    <p className="whitespace-pre-line text-sm sm:text-base leading-relaxed text-[var(--muted)]">
                      {item.description}
                    </p>
                  </div>
                ) : null}

                {/* Product & Service Highlights */}
                {item.product_description ? (
                  <div className="rounded-[24px] border border-[var(--line)] bg-[var(--paper)] p-6 sm:p-8 shadow-sm">
                    <div className="flex items-center gap-2.5 mb-4">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--teal)]/10 text-[var(--teal)]">
                        <ShoppingBag className="h-4 w-4" />
                      </div>
                      <h2 className="text-xl font-medium font-serif text-[var(--ink)]">
                        Produk & Layanan
                      </h2>
                    </div>
                    <p className="whitespace-pre-line text-sm sm:text-base leading-relaxed text-[var(--muted)]">
                      {item.product_description}
                    </p>
                  </div>
                ) : null}

                {/* Bagikan Tautan Component */}
                <UmkmShareActions
                  title={item.name}
                  summary={summary}
                  ownerName={item.owner_name}
                />
              </div>
            </div>

            {/* Right Sidebar Column */}
            <aside className="h-fit space-y-6">
              {/* Contact Card */}
              <div className="rounded-[28px] border border-[var(--line)] bg-[var(--paper)] p-6 shadow-sm">
                <h2 className="text-lg font-medium font-serif text-[var(--ink)] mb-5 border-b border-[var(--line)] pb-4 flex items-center gap-2">
                  <Store className="h-4 w-4 text-[var(--teal)]" /> Kontak & Lokasi Usaha
                </h2>

                <dl className="space-y-4 text-xs mb-6">
                  {item.address && (
                    <div className="flex gap-3">
                      <MapPin className="h-4 w-4 shrink-0 text-[var(--teal)] mt-0.5" />
                      <div>
                        <dt className="font-extrabold text-[10px] tracking-wider uppercase text-[var(--muted)] mb-0.5">Alamat Usaha</dt>
                        <dd className="font-semibold text-[var(--ink)] leading-relaxed">{item.address}</dd>
                      </div>
                    </div>
                  )}

                  {item.phone && (
                    <div className="flex gap-3">
                      <Phone className="h-4 w-4 shrink-0 text-[var(--teal)] mt-0.5" />
                      <div>
                        <dt className="font-extrabold text-[10px] tracking-wider uppercase text-[var(--muted)] mb-0.5">Telepon</dt>
                        <dd className="font-semibold text-[var(--ink)]">{item.phone}</dd>
                      </div>
                    </div>
                  )}

                  {item.whatsapp && (
                    <div className="flex gap-3">
                      <MessageCircle className="h-4 w-4 shrink-0 text-[#25D366] mt-0.5" />
                      <div>
                        <dt className="font-extrabold text-[10px] tracking-wider uppercase text-[var(--muted)] mb-0.5">WhatsApp Usaha</dt>
                        <dd className="font-semibold text-[var(--ink)]">{item.whatsapp}</dd>
                      </div>
                    </div>
                  )}
                </dl>

                {/* Call-to-action Action Buttons */}
                <div className="space-y-3">
                  {whatsappHref && (
                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex min-h-[46px] w-full items-center justify-center gap-2.5 rounded-full bg-[#25D366] text-white text-[11px] font-extrabold tracking-wider uppercase shadow-sm transition-all duration-300 hover:bg-[#20ba5c] hover:shadow-md hover:-translate-y-0.5 active:scale-95 cursor-pointer"
                    >
                      <MessageCircle className="h-4 w-4" /> Hubungi WhatsApp
                    </a>
                  )}

                  {item.instagram_url && (
                    <a
                      href={item.instagram_url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex min-h-[46px] w-full items-center justify-center gap-2.5 rounded-full border border-[var(--line)] bg-white text-[var(--ink)] text-[11px] font-extrabold tracking-wider uppercase shadow-sm transition-all duration-300 hover:border-[#E4405F] hover:text-[#E4405F] hover:-translate-y-0.5 active:scale-95 cursor-pointer"
                    >
                      <InstagramIcon className="h-4 w-4 text-[#E4405F]" /> Kunjungi Instagram
                    </a>
                  )}

                  {item.map_url && (
                    <a
                      href={item.map_url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex min-h-[46px] w-full items-center justify-center gap-2.5 rounded-full border border-[var(--line)] bg-white text-[var(--ink)] text-[11px] font-extrabold tracking-wider uppercase shadow-sm transition-all duration-300 hover:border-[var(--teal)] hover:text-[var(--teal)] hover:-translate-y-0.5 active:scale-95 cursor-pointer"
                    >
                      <ExternalLink className="h-4 w-4" /> Buka Peta Lokasi
                    </a>
                  )}
                </div>
              </div>
            </aside>
          </div>

          {/* Divider */}
          <hr className="my-14 border-t border-[var(--line)]" />

          {/* Related UMKM Section */}
          {relatedUmkm.length > 0 && (
            <div>
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <span className="section-tag mb-1 block">Rekomendasi Lainnya</span>
                  <h2 className="text-2xl font-serif text-[var(--ink)]">UMKM Karangtalun Lainnya</h2>
                </div>
                <Link
                  href="/umkm"
                  className="hidden sm:inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-[var(--teal)] hover:underline"
                >
                  Lihat Semua UMKM <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              <div className="grid gap-6 sm:grid-cols-3">
                {relatedUmkm.map((u) => (
                  <Link
                    key={u.id}
                    href={`/umkm/${u.slug}`}
                    className="group flex flex-col justify-between overflow-hidden rounded-[24px] border border-[var(--line)] bg-[var(--paper)] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[var(--teal)]/40 hover:shadow-md cursor-pointer"
                  >
                    <div>
                      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[var(--paper-2)]">
                        {u.image_url ? (
                          <Image
                            src={u.image_url}
                            alt={u.name}
                            fill
                            sizes="(max-width: 768px) 100vw, 300px"
                            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-[var(--paper-2)] text-[var(--muted-2)] text-xs font-mono">
                            Tanpa Foto
                          </div>
                        )}
                        <span className="absolute left-3 top-3 rounded-full bg-[var(--teal)]/90 px-2.5 py-0.5 text-[8px] font-extrabold uppercase tracking-wider text-white backdrop-blur-sm">
                          {u.umkm_categories?.name || "Usaha Dusun"}
                        </span>
                      </div>
                      <div className="p-5">
                        <h3 className="text-base font-serif font-medium text-[var(--ink)] line-clamp-2 transition-colors group-hover:text-[var(--teal)]">
                          {u.name}
                        </h3>
                        <p className="mt-2 text-xs text-[var(--muted)] line-clamp-2">
                          {u.description || u.product_description}
                        </p>
                      </div>
                    </div>

                    <div className="border-t border-[var(--line)] bg-[var(--paper-2)]/50 px-5 py-3 text-[10px] font-extrabold uppercase tracking-wider text-[var(--teal)] flex items-center justify-between">
                      <span>Detail Usaha</span>
                      <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
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
