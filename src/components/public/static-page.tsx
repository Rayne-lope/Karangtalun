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

      {/* Editorial Footer — identical to landing page & news pages */}
      <footer className="footer mt-16">
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
    <section className="mx-auto max-w-6xl px-4 pt-14 pb-10 sm:px-6 lg:px-8 border-b border-[var(--line)]">
      <div className="text-left max-w-3xl">
        <span className="section-tag mb-5 inline-flex">{eyebrow}</span>
        <h1 className="section-title">{title}</h1>
        <p className="section-desc max-w-2xl leading-relaxed">{description}</p>
      </div>
    </section>
  );
}

/* ─── Page Container ─────────────────────────────────────────────────────── */

export function StaticPageContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-10 pb-20 sm:px-6 lg:px-8 space-y-8">
      {children}
    </div>
  );
}

/* ─── Info Block ─────────────────────────────────────────────────────────── */

export function InfoBlock({ title, seq, children }: InfoBlockProps) {
  return (
    <section className="relative rounded-[28px] border border-[var(--line)] bg-[var(--paper)] p-8 sm:p-10 shadow-[0_14px_40px_rgba(7,57,51,0.035)] transition-all duration-300 hover:shadow-[0_22px_60px_rgba(7,57,51,0.08)] hover:-translate-y-0.5 overflow-hidden">
      {seq && (
        <span className="absolute top-7 right-8 font-serif text-[64px] leading-none font-light text-[var(--ink)] opacity-[0.04] select-none pointer-events-none">
          {seq}
        </span>
      )}
      <h2 className="text-2xl font-serif font-medium text-[var(--ink)] mb-4">
        {title}
      </h2>
      <div className="space-y-4 text-sm leading-relaxed text-[var(--muted)] font-sans">
        {children}
      </div>
    </section>
  );
}

/* ─── Highlight Block (Pull Quote) ──────────────────────────────────────── */

export function HighlightBlock({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative rounded-[28px] bg-[var(--teal)] text-white px-10 py-12 sm:px-14 sm:py-14 overflow-hidden">
      {/* Decorative circle */}
      <div
        className="absolute -top-16 -right-16 w-72 h-72 rounded-full opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, #c59b4b, transparent 70%)" }}
      />
      <span className="absolute top-8 right-10 text-white/10 font-serif text-[120px] leading-none select-none pointer-events-none">
        ◇
      </span>
      <div className="relative font-serif text-2xl sm:text-3xl font-light leading-snug tracking-[-0.02em] text-white/95 max-w-3xl">
        {children}
      </div>
    </div>
  );
}

/* ─── Section Divider ────────────────────────────────────────────────────── */

export function SectionDivider() {
  return (
    <div className="flex items-center justify-center gap-5 py-4">
      <span className="text-[var(--gold)] text-lg opacity-60">◇</span>
      <span className="text-[var(--gold)] text-lg">◇</span>
      <span className="text-[var(--gold)] text-lg opacity-60">◇</span>
    </div>
  );
}

/* ─── Big Stat Grid (premium number display) ─────────────────────────────── */

export function BigStatGrid({ stats }: { stats: SimpleStat[] }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-[24px] border border-[var(--line)] bg-[var(--paper)] p-8 shadow-[0_14px_40px_rgba(7,57,51,0.03)] transition-all duration-300 hover:shadow-[0_22px_60px_rgba(7,57,51,0.07)] hover:-translate-y-0.5"
        >
          <p className="text-[10px] font-extrabold uppercase tracking-[2px] text-[var(--muted-2)] mb-4">
            {stat.label}
          </p>
          <p
            className="font-serif font-light text-[var(--ink)] leading-none"
            style={{ fontSize: "clamp(52px, 7vw, 84px)" }}
          >
            {stat.value}
          </p>
          {stat.description ? (
            <p className="mt-4 text-xs leading-relaxed text-[var(--muted)]">
              {stat.description}
            </p>
          ) : null}
        </div>
      ))}
    </div>
  );
}

/* ─── Simple Stat Grid (legacy — keep for compat) ────────────────────────── */

export function SimpleStatGrid({ stats }: { stats: SimpleStat[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-[20px] border border-[var(--line)] bg-[var(--paper)] p-6 shadow-[0_14px_40px_rgba(7,57,51,0.03)] transition-all duration-300 hover:shadow-[0_22px_60px_rgba(7,57,51,0.07)] hover:-translate-y-0.5"
        >
          <p className="text-xs font-bold uppercase tracking-[1.5px] text-[var(--muted-2)]">
            {stat.label}
          </p>
          <p className="mt-3 text-4xl font-serif text-[var(--ink)]">
            {stat.value}
          </p>
          {stat.description ? (
            <p className="mt-3 text-xs leading-relaxed text-[var(--muted)]">
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
    <ul className="space-y-3.5 pl-1">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <span className="text-[var(--gold)] text-lg leading-none mt-0.5">
            ◇
          </span>
          <span className="text-sm text-[var(--muted)] leading-relaxed">
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
    <div className="grid gap-8 lg:grid-cols-[1fr_340px] items-start">
      <div className="space-y-8">{main}</div>
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
    <div className="rounded-[24px] border border-[var(--line)] bg-[var(--paper)] p-6 shadow-[0_14px_40px_rgba(7,57,51,0.035)]">
      <h3 className="text-[10px] font-extrabold uppercase tracking-[2px] text-[var(--muted-2)] mb-5">
        {title}
      </h3>
      <dl className="space-y-4">
        {items.map(({ label, value }) => (
          <div key={label} className="grid gap-0.5">
            <dt className="text-[11px] font-bold text-[var(--muted-2)]">
              {label}
            </dt>
            <dd className="text-sm font-medium text-[var(--ink)]">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
