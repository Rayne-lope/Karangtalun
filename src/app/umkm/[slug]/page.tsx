import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PublicShell } from "@/components/public/public-shell";
import { getActiveUmkmBySlug, getActiveUmkm } from "@/lib/data";
import "../../homepage.css";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function UmkmDetailPage({ params }: PageProps) {
  const { slug } = await params;

  // Fetch current UMKM and all active UMKMs in parallel
  const [item, allUmkm] = await Promise.all([
    getActiveUmkmBySlug(slug),
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

  return (
    <div className="homepage-custom">
      <PublicShell bgClassName="bg-[var(--cream)]" hideFooter={true}>
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          {/* Back Navigation */}
          <div className="mb-8">
            <Link
              href="/umkm"
              className="group inline-flex items-center gap-2 text-[10px] font-extrabold tracking-[1.7px] uppercase text-[var(--ink)] hover:text-[var(--teal)] transition-colors duration-200"
            >
              <span className="transition-transform duration-200 group-hover:-translate-x-1 inline-block">←</span> Kembali ke UMKM
            </Link>
          </div>

          {/* Main Layout Grid */}
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px]">
            {/* Left Content Column */}
            <div>
              {/* Category */}
              <span className="font-extrabold text-[10px] tracking-[1.7px] uppercase text-[var(--teal)] mb-3 block">
                {item.umkm_categories?.name ?? "UMKM Dusun"}
              </span>

              {/* Name */}
              <h1 className="text-3xl font-medium leading-tight text-[var(--ink)] font-serif sm:text-4xl md:text-5xl">
                {item.name}
              </h1>

              {/* Owner */}
              {item.owner_name ? (
                <p className="mt-2 text-xs font-semibold text-[var(--muted-2)]">
                  Pemilik: {item.owner_name}
                </p>
              ) : null}

              {/* Cover Image */}
              {item.image_url ? (
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[28px] border border-[var(--line)] bg-[var(--paper-2)] shadow-md mt-6 mb-10">
                  <Image
                    src={item.image_url}
                    alt={item.name}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 720px"
                    className="object-cover"
                  />
                </div>
              ) : null}

              {/* Text Description Content */}
              <div className="space-y-8 text-sm sm:text-base leading-relaxed sm:leading-8 text-[var(--ink)] font-sans">
                {item.description ? (
                  <p className="whitespace-pre-line">{item.description}</p>
                ) : null}

                {item.product_description ? (
                  <section className="bg-[var(--paper)] border border-[var(--line)] rounded-[24px] p-6 sm:p-8 shadow-sm">
                    <h2 className="text-xl font-medium font-serif text-[var(--ink)] mb-4">
                      Produk & Layanan
                    </h2>
                    <p className="whitespace-pre-line text-sm sm:text-base leading-relaxed text-[var(--muted)]">
                      {item.product_description}
                    </p>
                  </section>
                ) : null}
              </div>
            </div>

            {/* Right Sidebar Column */}
            <aside className="h-fit rounded-[24px] border border-[var(--line)] bg-[var(--paper)] p-6 shadow-sm">
              <h2 className="text-lg font-medium font-serif text-[var(--ink)] mb-6 border-b border-[#1c2b24]/10 pb-4">
                Kontak UMKM
              </h2>
              <dl className="space-y-5 text-sm mb-6">
                <Info label="Alamat" value={item.address} />
                <Info label="Telepon" value={item.phone} />
                <Info label="WhatsApp" value={item.whatsapp} />
              </dl>
              <div className="space-y-3">
                {whatsappHref ? (
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-[46px] w-full items-center justify-center rounded-full bg-[#073933] !text-white text-[10px] font-extrabold tracking-[1.5px] uppercase shadow-sm transition-all duration-300 hover:bg-[#0f4a42] hover:shadow-md hover:-translate-y-0.5 active:scale-95"
                  >
                    Hubungi WhatsApp
                  </a>
                ) : null}
                {item.instagram_url ? (
                  <a
                    href={item.instagram_url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-[46px] w-full items-center justify-center rounded-full border border-[var(--line)] text-[var(--ink)] text-[10px] font-extrabold tracking-[1.5px] uppercase shadow-sm transition-all duration-300 hover:border-[#073933] hover:text-[#073933] hover:-translate-y-0.5 active:scale-95 bg-white"
                  >
                    Instagram
                  </a>
                ) : null}
                {item.map_url ? (
                  <a
                    href={item.map_url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-[46px] w-full items-center justify-center rounded-full border border-[var(--line)] text-[var(--ink)] text-[10px] font-extrabold tracking-[1.5px] uppercase shadow-sm transition-all duration-300 hover:border-[#073933] hover:text-[#073933] hover:-translate-y-0.5 active:scale-95 bg-white"
                  >
                    Buka Lokasi Maps
                  </a>
                ) : null}
              </div>
            </aside>
          </div>

          {/* Divider */}
          <hr className="my-16 border-t border-[#1c2b24]/10" />

          {/* Related UMKM Section */}
          {relatedUmkm.length > 0 && (
            <div>
              <span className="section-tag mb-8 block">UMKM Lainnya</span>
              <div className="grid gap-6 sm:grid-cols-3">
                {relatedUmkm.map((u) => (
                  <article key={u.id} className="item-card group">
                    <div className="card-img-wrap relative !h-[150px]">
                      {u.image_url ? (
                        <Image
                          src={u.image_url}
                          alt={u.name}
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
                        {u.umkm_categories?.name || "UMKM Dusun"}
                      </span>
                      <Link href={`/umkm/${u.slug}`} className="card-title-link !text-[18px] line-clamp-2 !mb-2">
                        {u.name}
                      </Link>
                      <Link href={`/umkm/${u.slug}`} className="card-link !text-[9px]">
                        Detail Toko & Produk
                      </Link>
                    </div>
                  </article>
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

function Info({ label, value }: { label: string; value?: string | null }) {
  if (!value) {
    return null;
  }

  return (
    <div>
      <dt className="font-extrabold text-[10px] tracking-[1.5px] uppercase text-[var(--teal)] mb-1">
        {label}
      </dt>
      <dd className="text-sm font-medium text-[var(--ink)] leading-relaxed">
        {value}
      </dd>
    </div>
  );
}
