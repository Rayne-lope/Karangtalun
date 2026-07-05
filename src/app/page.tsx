import Link from "next/link";
import Image from "next/image";
import { 
  Newspaper, 
  Store, 
  Image as ImageIcon, 
  Info, 
  BookOpen, 
  Target, 
  Users, 
  BarChart3, 
  Map, 
  Phone 
} from "lucide-react";
import { getActiveUmkm, getPublishedGallery, getPublishedNews, getDashboardCounts } from "@/lib/data";
import { formatDate } from "@/lib/utils/format-date";
import { HomeGallerySlider } from "./home-gallery-slider";
import "./homepage.css";

export default async function Home() {
  const [news, umkm, gallery, counts] = await Promise.all([
    getPublishedNews(3),
    getActiveUmkm(3),
    getPublishedGallery(6),
    getDashboardCounts(),
  ]);

  return (
    <div className="homepage-custom min-h-screen bg-[#efece3] text-[#1c2b24] font-sans antialiased overflow-x-hidden">
      <main>
        {/* 1. Hero Section */}
        <section className="hero" id="beranda">
          <div className="container">
            <header className="site-header">
              <Link href="/" className="header-brand">
                <Image 
                  src="/images/karanz.png" 
                  alt="Logo Desa Karangtalun" 
                  width={26} 
                  height={26} 
                  className="object-contain"
                />
                <span>Desa Karangtalun</span>
              </Link>

              <nav className="hero-nav" aria-label="Navigasi utama">
                <Link href="/profil">Profil Desa</Link>
                <Link href="/umkm">Potensi UMKM</Link>
                <Link href="/galeri">Galeri Dokumenter</Link>
              </nav>
            </header>
          </div>

          <div className="container">
            <div className="hero-main">
              <div>
                <span className="hero-kicker">Kuliah Kerja Nyata 2026</span>
                <h1 className="hero-title">Karangtalun</h1>
                <p className="hero-subtitle">
                  Gerbang informasi desa untuk memperkenalkan profil wilayah, dokumentasi pengabdian,
                  potensi UMKM, data desa, serta arsip kegiatan KKN secara ringkas dan tertata.
                </p>

                <div className="hero-actions">
                  <Link href="/profil" className="pill-button">Profil Desa</Link>
                  <Link href="/galeri" className="pill-button">Galeri Dokumenter</Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Quick Navigation */}
        <section className="quick-nav" aria-label="Quick Navigation">
          <div className="container">
            <div className="quick-nav-grid">
              <article className="quick-card">
                <div>
                  <div className="quick-icon">✦</div>
                  <h3>Catatan & Kabar KKN</h3>
                  <p>Linimasa laporan aktivitas mingguan, program kerja, dan catatan pengabdian selama pelaksanaan KKN.</p>
                </div>
                <Link href="/berita" className="discover-link">
                  Buka Catatan <span className="arrow">→</span>
                </Link>
              </article>

              <article className="quick-card">
                <div>
                  <div className="quick-icon">◇</div>
                  <h3>Katalog UMKM</h3>
                  <p>Akses produk kriya, kuliner, kopi warga, serta profil usaha lokal yang terdata dalam program desa.</p>
                </div>
                <Link href="/umkm" className="discover-link">
                  Jelajahi Produk <span className="arrow">→</span>
                </Link>
              </article>

              <article className="quick-card">
                <div>
                  <div className="quick-icon">◐</div>
                  <h3>Galeri Lensa</h3>
                  <p>Dokumentasi visual pengabdian, lanskap desa, interaksi warga, dan momen kegiatan mahasiswa.</p>
                </div>
                <Link href="/galeri" className="discover-link">
                  Lihat Album <span className="arrow">→</span>
                </Link>
              </article>
            </div>
          </div>
        </section>

        {/* 3. Papan Navigasi Direktori Desa */}
        <section className="directory" id="direktori">
          <div className="container">
            <div className="directory-shell">
              <aside className="directory-intro">
                <span className="section-tag">Direktori Navigasi Desa</span>
                <h2>Papan akses utama informasi desa.</h2>
                <p>
                  Direktori dibuat sebagai shortcut bersih untuk membuka halaman penting:
                  berita, UMKM, profil, sejarah, struktur pemerintahan, data statistik, peta wilayah, hingga kontak resmi.
                </p>

                <div className="directory-mini-stats" aria-label="Ringkasan direktori">
                  <div className="directory-mini-stat">
                    <strong>10</strong>
                    <span>Halaman inti</span>
                  </div>
                  <div className="directory-mini-stat">
                    <strong>03</strong>
                    <span>Fokus konten</span>
                  </div>
                </div>
              </aside>

              <div className="directory-grid">
                <Link href="/berita" className="directory-item">
                  <div className="dir-top">
                    <span className="dir-icon">
                      <Newspaper className="w-5 h-5" />
                    </span>
                    <span className="dir-number">01</span>
                  </div>
                  <div className="dir-content">
                    <span className="dir-title">Berita & Kegiatan</span>
                    <span className="dir-desc">Kabar desa, agenda warga, dan laporan aktivitas KKN.</span>
                  </div>
                  <div className="dir-footer">
                    <span className="dir-slug">/berita</span>
                    <span className="dir-arrow">→</span>
                  </div>
                </Link>

                <Link href="/umkm" className="directory-item">
                  <div className="dir-top">
                    <span className="dir-icon">
                      <Store className="w-5 h-5" />
                    </span>
                    <span className="dir-number">02</span>
                  </div>
                  <div className="dir-content">
                    <span className="dir-title">Potensi UMKM</span>
                    <span className="dir-desc">Katalog usaha, produk lokal, dan profil pelaku UMKM.</span>
                  </div>
                  <div className="dir-footer">
                    <span className="dir-slug">/umkm</span>
                    <span className="dir-arrow">→</span>
                  </div>
                </Link>

                <Link href="/galeri" className="directory-item">
                  <div className="dir-top">
                    <span className="dir-icon">
                      <ImageIcon className="w-5 h-5" />
                    </span>
                    <span className="dir-number">03</span>
                  </div>
                  <div className="dir-content">
                    <span className="dir-title">Galeri Dokumentasi</span>
                    <span className="dir-desc">Foto kegiatan, lanskap desa, and dokumentasi pengabdian.</span>
                  </div>
                  <div className="dir-footer">
                    <span className="dir-slug">/galeri</span>
                    <span className="dir-arrow">→</span>
                  </div>
                </Link>

                <Link href="/profil" className="directory-item wide">
                  <div className="dir-top">
                    <span className="dir-icon">
                      <Info className="w-5 h-5" />
                    </span>
                    <span className="dir-number">04</span>
                  </div>
                  <div className="dir-content">
                    <span className="dir-title">Profil Desa</span>
                    <span className="dir-desc">Identitas wilayah, kondisi umum, potensi lokal, dan informasi resmi desa.</span>
                  </div>
                  <div className="dir-footer">
                    <span className="dir-slug">/profil</span>
                    <span className="dir-arrow">→</span>
                  </div>
                </Link>

                <Link href="/sejarah" className="directory-item">
                  <div className="dir-top">
                    <span className="dir-icon">
                      <BookOpen className="w-5 h-5" />
                    </span>
                    <span className="dir-number">05</span>
                  </div>
                  <div className="dir-content">
                    <span className="dir-title">Sejarah Desa</span>
                    <span className="dir-desc">Catatan asal-usul, cerita lokal, dan perkembangan Karangtalun.</span>
                  </div>
                  <div className="dir-footer">
                    <span className="dir-slug">/sejarah</span>
                    <span className="dir-arrow">→</span>
                  </div>
                </Link>

                <Link href="/visi-misi" className="directory-item">
                  <div className="dir-top">
                    <span className="dir-icon">
                      <Target className="w-5 h-5" />
                    </span>
                    <span className="dir-number">06</span>
                  </div>
                  <div className="dir-content">
                    <span className="dir-title">Visi & Misi</span>
                    <span className="dir-desc">Arah pembangunan dan tujuan pengembangan desa.</span>
                  </div>
                  <div className="dir-footer">
                    <span className="dir-slug">/visi-misi</span>
                    <span className="dir-arrow">→</span>
                  </div>
                </Link>

                <Link href="/struktur-desa" className="directory-item">
                  <div className="dir-top">
                    <span className="dir-icon">
                      <Users className="w-5 h-5" />
                    </span>
                    <span className="dir-number">07</span>
                  </div>
                  <div className="dir-content">
                    <span className="dir-title">Struktur Pemerintahan</span>
                    <span className="dir-desc">Susunan perangkat desa dan bagian pelayanan pemerintahan.</span>
                  </div>
                  <div className="dir-footer">
                    <span className="dir-slug">/struktur-desa</span>
                    <span className="dir-arrow">→</span>
                  </div>
                </Link>

                <Link href="/data-desa" className="directory-item">
                  <div className="dir-top">
                    <span className="dir-icon">
                      <BarChart3 className="w-5 h-5" />
                    </span>
                    <span className="dir-number">08</span>
                  </div>
                  <div className="dir-content">
                    <span className="dir-title">Data & Statistik</span>
                    <span className="dir-desc">Ringkasan data kependudukan, sanitasi, UMKM, dan indikator wilayah.</span>
                  </div>
                  <div className="dir-footer">
                    <span className="dir-slug">/data-desa</span>
                    <span className="dir-arrow">→</span>
                  </div>
                </Link>

                <Link href="/peta" className="directory-item wide">
                  <div className="dir-top">
                    <span className="dir-icon">
                      <Map className="w-5 h-5" />
                    </span>
                    <span className="dir-number">09</span>
                  </div>
                  <div className="dir-content">
                    <span className="dir-title">Peta Wilayah</span>
                    <span className="dir-desc">Tautan menuju peta digital desa, titik potensi, dan informasi batas wilayah.</span>
                  </div>
                  <div className="dir-footer">
                    <span className="dir-slug">/peta</span>
                    <span className="dir-arrow">→</span>
                  </div>
                </Link>

                <Link href="/kontak" className="directory-item wide">
                  <div className="dir-top">
                    <span className="dir-icon">
                      <Phone className="w-5 h-5" />
                    </span>
                    <span className="dir-number">10</span>
                  </div>
                  <div className="dir-content">
                    <span className="dir-title">Hubungi Kami</span>
                    <span className="dir-desc">Kontak resmi pemerintah desa Karangtalun dan tim KKN UPN.</span>
                  </div>
                  <div className="dir-footer">
                    <span className="dir-slug">/kontak</span>
                    <span className="dir-arrow">→</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Showcase Profil Desa */}
        <section className="section showcase-profile" id="profil">
          <div className="container">
            <div className="profile-container">
              <div className="profile-left">
                <span className="section-tag">Kearifan Lokal & Demografi</span>
                <h2>Menyelami potensi desa yang tumbuh dari warga dan ruang hidupnya.</h2>
                <p>
                  Karangtalun ditampilkan sebagai desa dengan potensi pertanian, kriya lokal,
                  pengembangan sanitasi, dan kolaborasi program KKN. Bagian ini diisi
                  dengan data demografi, potensi unggulan, serta ringkasan program kerja yang
                  relevan dengan kebutuhan masyarakat.
                </p>

                <div className="tags">
                  <span className="tag">Pertanian</span>
                  <span className="tag">Kriya</span>
                  <span className="tag">Sanitasi</span>
                </div>
              </div>

              <aside className="profile-right">
                <h3>Kontak Resmi Desa</h3>

                <div className="contact-list">
                  <div className="contact-row">
                    <span className="contact-label">Alamat Kantor Desa</span>
                    <span className="contact-value">Jangkang, Karangtalun, Ngluwar, Magelang, Jawa Tengah 56485</span>
                  </div>

                  <div className="contact-row">
                    <span className="contact-label">Nomor Telepon Resmi</span>
                    <span className="contact-value">081215503366</span>
                  </div>

                  <div className="contact-row">
                    <span className="contact-label">Email Resmi</span>
                    <span className="contact-value">ngluwarkarangtalun@gmail.com</span>
                  </div>

                  <div className="contact-row">
                    <span className="contact-label">Wilayah Administrasi</span>
                    <span className="contact-value">Kec. Ngluwar · Kab. Magelang · Jawa Tengah</span>
                  </div>
                </div>

                <a href="/documents/profil-desa.pdf" download className="btn-download">
                  Download Profil Desa PDF
                </a>
              </aside>
            </div>
          </div>
        </section>

        {/* 5. Kabar Desa & Catatan Bakti */}
        <section className="section dynamic-grid-section" id="berita">
          <div className="container">
            <div className="section-header">
              <div className="section-copy">
                <span className="section-tag">Kabar Desa & Catatan Bakti</span>
                <h2 className="section-title">Berita terbaru dari Karangtalun.</h2>
                <p className="section-desc">
                  Kabar aktual pengabdian masyarakat KKN, perkembangan teknologi, dan agenda kegiatan desa.
                </p>
              </div>
              <Link href="/berita" className="discover-link">
                Semua Kabar <span className="arrow">→</span>
              </Link>
            </div>

            <div className="news-grid">
              {news && news.length > 0 ? (
                news.map((item) => (
                  <article key={item.id} className="item-card">
                    <div className="card-img-wrap">
                      {item.cover_image_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img 
                          src={item.cover_image_url} 
                          alt={item.title} 
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-400 text-xs font-mono">
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
                      <Link href={`/berita/${item.slug}`} className="card-title-link">
                        {item.title}
                      </Link>
                      <p className="card-excerpt line-clamp-3">{item.excerpt}</p>
                      <Link href={`/berita/${item.slug}`} className="card-link">
                        Baca Selengkapnya
                      </Link>
                    </div>
                  </article>
                ))
              ) : (
                // Fallbacks if empty
                <>
                  <article className="item-card">
                    <div className="card-img-wrap">
                      <img src="https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=800&q=80" alt="Dokumentasi program teknologi desa" />
                    </div>
                    <div className="card-body">
                      <span className="card-category">Teknologi</span>
                      <div className="card-meta">
                        <span>01 Juli 2026</span>
                        <span>Admin KKN</span>
                      </div>
                      <Link href="/berita" className="card-title-link">Digitalisasi Informasi Profil Desa</Link>
                      <p className="card-excerpt">Website desa dikembangkan sebagai pusat informasi profil, kabar kegiatan, UMKM, dan galeri dokumentasi.</p>
                      <Link href="/berita" className="card-link">Baca Selengkapnya</Link>
                    </div>
                  </article>

                  <article className="item-card">
                    <div className="card-img-wrap">
                      <img src="https://images.unsplash.com/photo-1576085898323-218337e3343c?auto=format&fit=crop&w=800&q=80" alt="Kegiatan pendataan warga" />
                    </div>
                    <div className="card-body">
                      <span className="card-category">Kesehatan</span>
                      <div className="card-meta">
                        <span>03 Juli 2026</span>
                        <span>Divisi KKN</span>
                      </div>
                      <Link href="/berita" className="card-title-link">Pendataan Sanitasi Rumah Tangga</Link>
                      <p className="card-excerpt">Data lapangan dikumpulkan untuk mendukung program edukasi sanitasi dan penyusunan informasi desa.</p>
                      <Link href="/berita" className="card-link">Baca Selengkapnya</Link>
                    </div>
                  </article>

                  <article className="item-card">
                    <div className="card-img-wrap">
                      <img src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80" alt="Kegiatan edukasi bersama masyarakat" />
                    </div>
                    <div className="card-body">
                      <span className="card-category">Pendidikan</span>
                      <div className="card-meta">
                        <span>05 Juli 2026</span>
                        <span>Admin Desa</span>
                      </div>
                      <Link href="/berita" className="card-title-link">Edukasi Digital untuk Informasi Desa</Link>
                      <p className="card-excerpt">Sosialisasi penggunaan website dilakukan agar warga dan perangkat desa dapat mengelola informasi utama.</p>
                      <Link href="/berita" className="card-link">Baca Selengkapnya</Link>
                    </div>
                  </article>
                </>
              )}
            </div>
          </div>
        </section>

        {/* 6. Katalog UMKM Unggulan */}
        <section className="section dynamic-grid-section alt" id="umkm">
          <div className="container">
            <div className="section-header">
              <div className="section-copy">
                <span className="section-tag">Katalog UMKM Unggulan</span>
                <h2 className="section-title">Produk lokal yang layak ditampilkan.</h2>
                <p className="section-desc">
                  Mendukung peningkatan ekonomi kreatif mandiri melalui pemasaran produk unggulan warga desa.
                </p>
              </div>
              <Link href="/umkm" className="discover-link">
                Semua Produk <span className="arrow">→</span>
              </Link>
            </div>

            <div className="umkm-grid">
              {umkm && umkm.length > 0 ? (
                umkm.map((item) => (
                  <article key={item.id} className="item-card">
                    <div className="card-img-wrap">
                      {item.image_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img 
                          src={item.image_url} 
                          alt={item.name} 
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-400 text-xs font-mono">
                          No Photo
                        </div>
                      )}
                    </div>
                    <div className="card-body">
                      <span className="card-category">
                        {item.umkm_categories?.name || "Lokal"}
                      </span>
                      <Link href={`/umkm/${item.slug}`} className="card-title-link">
                        {item.name}
                      </Link>
                      <p className="card-excerpt line-clamp-3">
                        {item.description || item.product_description}
                      </p>
                      <Link href={`/umkm/${item.slug}`} className="card-link">
                        Detail Toko & Produk
                      </Link>
                    </div>
                  </article>
                ))
              ) : (
                // Fallbacks if empty
                <>
                  <article className="item-card">
                    <div className="card-img-wrap">
                      <img src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80" alt="Produk kriya lokal" />
                    </div>
                    <div className="card-body">
                      <span className="card-category">Kriya</span>
                      <Link href="/umkm" className="card-title-link">Anyaman Bambu Lestari</Link>
                      <p className="card-excerpt">Produk kerajinan tangan berbasis bahan alami untuk dekorasi dan kebutuhan rumah tangga.</p>
                      <Link href="/umkm" className="card-link">Detail Toko & Produk</Link>
                    </div>
                  </article>

                  <article className="item-card">
                    <div className="card-img-wrap">
                      <img src="https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=800&q=80" alt="Produk kopi lokal" />
                    </div>
                    <div className="card-body">
                      <span className="card-category">Kuliner</span>
                      <Link href="/umkm" className="card-title-link">Kopi Talun</Link>
                      <p className="card-excerpt">Produk kopi dan minuman lokal yang dapat dipromosikan melalui katalog digital desa.</p>
                      <Link href="/umkm" className="card-link">Detail Toko & Produk</Link>
                    </div>
                  </article>

                  <article className="item-card">
                    <div className="card-img-wrap">
                      <img src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80" alt="Produk kuliner lokal" />
                    </div>
                    <div className="card-body">
                      <span className="card-category">Kuliner</span>
                      <Link href="/umkm" className="card-title-link">Olahan Singkong Warga</Link>
                      <p className="card-excerpt">Camilan dan produk olahan lokal yang dapat dikurasi sebagai potensi ekonomi warga.</p>
                      <Link href="/umkm" className="card-link">Detail Toko & Produk</Link>
                    </div>
                  </article>
                </>
              )}
            </div>
          </div>
        </section>

        {/* 7. Lensa Pengabdian */}
        <section className="section lensa" id="galeri">
          <div className="container">
            <HomeGallerySlider gallery={gallery} />
          </div>
        </section>
      </main>

      {/* 8. Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div>
              <div className="footer-brand">Karangtalun</div>
              <p>
                Website informasi desa dan dokumentasi KKN untuk menampilkan profil wilayah,
                kabar pengabdian, katalog UMKM, data desa, dan galeri visual secara tertata.
              </p>
            </div>

            <div>
              <h4>Menu Utama</h4>
              <nav className="footer-links" aria-label="Menu utama footer">
                <Link href="/profil">Profil Desa</Link>
                <Link href="/berita">Berita & Kegiatan</Link>
                <Link href="/umkm">Potensi UMKM</Link>
                <Link href="/galeri">Galeri Dokumentasi</Link>
              </nav>
            </div>

            <div>
              <h4>Direktori</h4>
              <nav className="footer-links" aria-label="Direktori footer">
                <Link href="/sejarah">Sejarah Desa</Link>
                <Link href="/visi-misi">Visi & Misi</Link>
                <Link href="/struktur-desa">Struktur Pemerintahan</Link>
                <Link href="/data-desa">Data & Statistik</Link>
                <Link href="/peta">Peta Wilayah</Link>
              </nav>
            </div>

            <div>
              <h4>Kontak Desa</h4>
              <div className="footer-links">
                <span>Karangtalun, Ngluwar</span>
                <span>Kabupaten Magelang, Jawa Tengah</span>
                <span>Telepon: 081215503366</span>
                <span>Email: ngluwarkarangtalun@gmail.com</span>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <span>© 2026 Desa Karangtalun · KKN UPNYK.84.160</span>
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
