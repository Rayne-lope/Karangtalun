import { PublicShell } from "@/components/public/public-shell";
import Link from "next/link";
import React from "react";

/* ─── Types ──────────────────────────────────────────────────────────────── */

type StaticPageHeaderProps = {
  eyebrow?: string;
  title: string;
  description: string;
};

type InfoBlockProps = {
  title: string;
  seq?: string;
  children: React.ReactNode;
};

type SimpleStat = {
  label: string;
  value: string;
  description?: string;
};

/* ─── Layout Shell ───────────────────────────────────────────────────────── */

export function StaticPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="editorial">
      <PublicShell bgClassName="bg-[var(--cream)]" hideFooter={true}>
        {children}
      </PublicShell>

      {/* Editorial Footer */}
      <footer className="footer mt-12 sm:mt-16">
        <div className="container">
          <div className="footer-grid">
            <div>
              <div className="footer-brand">Karangtalun</div>
              <p>
                Website informasi dusun dan dokumentasi KKN untuk menampilkan
                profil wilayah, kabar pengabdian, katalog UMKM, data dusun,
                dan galeri visual secara tertata.
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
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                IG
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
              >
                TT
              </a>
              <a href="mailto:ngluwarkarangtalun@gmail.com" aria-label="Email">
                @
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ─── Page Header ────────────────────────────────────────────────────────── */

export function StaticPageHeader({
  eyebrow = "Profil Dusun",
  title,
  description,
}: StaticPageHeaderProps) {
  return (
    <section className="mx-auto max-w-6xl px-4 pt-6 pb-6 sm:px-6 sm:pt-14 sm:pb-10 border-b border-[var(--line)]">
      <div className="text-left max-w-3xl">
        <span className="section-tag mb-3 sm:mb-5 inline-flex">{eyebrow}</span>
        <h1 className="text-3xl font-serif font-normal text-[var(--ink)] sm:text-4xl md:text-5xl leading-tight">
          {title}
        </h1>
        <p className="section-desc mt-3 max-w-2xl text-sm sm:text-base leading-relaxed text-[var(--muted)]">
          {description}
        </p>
      </div>
    </section>
  );
}

/* ─── Page Container ─────────────────────────────────────────────────────── */

export function StaticPageContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-6 pb-14 sm:px-6 sm:pt-10 sm:pb-20 lg:px-8 space-y-6 sm:space-y-8">
      {children}
    </div>
  );
}

/* ─── Info Block ─────────────────────────────────────────────────────────── */

export function InfoBlock({ title, seq, children }: InfoBlockProps) {
  return (
    <section className="relative rounded-[22px] sm:rounded-[28px] border border-[var(--line)] bg-[var(--paper)] p-5 sm:p-8 md:p-10 shadow-[0_14px_40px_rgba(7,57,51,0.035)] transition-all duration-300 hover:shadow-[0_22px_60px_rgba(7,57,51,0.08)] overflow-hidden">
      {seq && (
        <span className="absolute top-5 right-6 font-serif text-[48px] sm:text-[64px] leading-none font-light text-[var(--ink)] opacity-[0.04] select-none pointer-events-none">
          {seq}
        </span>
      )}
      <h2 className="text-xl sm:text-2xl font-serif font-medium text-[var(--ink)] mb-3 sm:mb-4">
        {title}
      </h2>
      <div className="space-y-3.5 text-[15px] leading-7 text-[var(--muted)] font-sans sm:text-base sm:leading-7">
        {children}
      </div>
    </section>
  );
}

/* ─── Highlight Block (Pull Quote) ──────────────────────────────────────── */

export function HighlightBlock({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative rounded-[22px] sm:rounded-[28px] bg-[var(--teal)] text-white px-6 py-8 sm:px-12 sm:py-12 overflow-hidden">
      {/* Decorative circle */}
      <div
        className="absolute -top-16 -right-16 w-72 h-72 rounded-full opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, #c59b4b, transparent 70%)" }}
      />
      <span className="absolute top-6 right-8 text-white/10 font-serif text-[80px] sm:text-[120px] leading-none select-none pointer-events-none">
        ◇
      </span>
      <div className="relative font-serif text-lg sm:text-2xl md:text-3xl font-light leading-snug tracking-[-0.02em] text-white/95 max-w-3xl">
        {children}
      </div>
    </div>
  );
}

/* ─── Section Divider ────────────────────────────────────────────────────── */

export function SectionDivider() {
  return (
    <div className="flex items-center justify-center gap-4 sm:gap-5 py-2 sm:py-4">
      <span className="text-[var(--gold)] text-base sm:text-lg opacity-60">◇</span>
      <span className="text-[var(--gold)] text-base sm:text-lg">◇</span>
      <span className="text-[var(--gold)] text-base sm:text-lg opacity-60">◇</span>
    </div>
  );
}

/* ─── Big Stat Grid (premium number display) ─────────────────────────────── */

export function BigStatGrid({ stats }: { stats: SimpleStat[] }) {
  return (
    <div className="grid gap-4 sm:gap-5 sm:grid-cols-2">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-[20px] sm:rounded-[24px] border border-[var(--line)] bg-[var(--paper)] p-5 sm:p-8 shadow-[0_14px_40px_rgba(7,57,51,0.03)] transition-all duration-300 hover:shadow-[0_22px_60px_rgba(7,57,51,0.07)]"
        >
          <p className="text-[10px] font-extrabold uppercase tracking-[2px] text-[var(--muted-2)] mb-2 sm:mb-4">
            {stat.label}
          </p>
          <p
            className="font-serif font-light text-[var(--ink)] leading-none"
            style={{ fontSize: "clamp(38px, 8vw, 84px)" }}
          >
            {stat.value}
          </p>
          {stat.description ? (
            <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
              {stat.description}
            </p>
          ) : null}
        </div>
      ))}
    </div>
  );
}

/* ─── Simple Stat Grid ───────────────────────────────────────────────────── */

export function SimpleStatGrid({ stats }: { stats: SimpleStat[] }) {
  return (
    <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-[18px] sm:rounded-[20px] border border-[var(--line)] bg-[var(--paper)] p-4 sm:p-6 shadow-[0_14px_40px_rgba(7,57,51,0.03)] transition-all duration-300"
        >
          <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[1.2px] text-[var(--muted-2)]">
            {stat.label}
          </p>
          <p className="mt-2 text-2xl sm:text-4xl font-serif text-[var(--ink)]">
            {stat.value}
          </p>
          {stat.description ? (
            <p className="mt-2 text-sm leading-relaxed text-[var(--muted)] line-clamp-2">
              {stat.description}
            </p>
          ) : null}
        </div>
      ))}
    </div>
  );
}

/* ─── Simple List ────────────────────────────────────────────────────────── */

export function SimpleList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3 pl-0.5">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5">
          <span className="text-[var(--gold)] text-base leading-none mt-0.5 shrink-0">
            ◇
          </span>
          <span className="text-sm sm:text-base text-[var(--muted)] leading-relaxed">
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

/* ─── Two Column Layout ──────────────────────────────────────────────────── */

export function TwoColumnLayout({
  main,
  sidebar,
}: {
  main: React.ReactNode;
  sidebar: React.ReactNode;
}) {
  return (
    <div className="grid gap-6 sm:gap-8 lg:grid-cols-[1fr_340px] items-start">
      <div className="space-y-6 sm:space-y-8">{main}</div>
      <div className="space-y-6 lg:sticky lg:top-8">{sidebar}</div>
    </div>
  );
}

/* ─── Sidebar Info Card ──────────────────────────────────────────────────── */

type SidebarCardItem = { label: string; value: string };

export function SidebarInfoCard({
  title,
  items,
}: {
  title: string;
  items: SidebarCardItem[];
}) {
  return (
    <div className="rounded-[20px] sm:rounded-[24px] border border-[var(--line)] bg-[var(--paper)] p-5 sm:p-6 shadow-[0_14px_40px_rgba(7,57,51,0.035)]">
      <h3 className="text-[10px] font-extrabold uppercase tracking-[2px] text-[var(--muted-2)] mb-4">
        {title}
      </h3>
      <dl className="space-y-3.5">
        {items.map(({ label, value }) => (
          <div key={label} className="grid gap-0.5">
            <dt className="text-[10px] sm:text-[11px] font-bold text-[var(--muted-2)]">
              {label}
            </dt>
            <dd className="text-sm sm:text-base font-medium text-[var(--ink)]">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
