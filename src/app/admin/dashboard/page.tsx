import { Images, Newspaper, Store, ArrowRight } from "lucide-react";
import Link from "next/link";
import { ProtectedAdmin } from "@/components/admin/protected-admin";
import { getDashboardCounts } from "@/lib/data";

const stats = [
  {
    key: "news",
    label: "Berita",
    desc: "Artikel & aktivitas dusun",
    href: "/admin/berita",
    icon: Newspaper,
    color: "#073933",
    colorBg: "rgba(7,57,51,0.07)",
  },
  {
    key: "umkm",
    label: "UMKM",
    desc: "Usaha mikro lokal",
    href: "/admin/umkm",
    icon: Store,
    color: "#c59b4b",
    colorBg: "rgba(197,155,75,0.10)",
  },
  {
    key: "gallery",
    label: "Galeri",
    desc: "Dokumentasi foto",
    href: "/admin/galeri",
    icon: Images,
    color: "#073933",
    colorBg: "rgba(7,57,51,0.07)",
  },
] as const;

const serif = 'var(--font-cormorant-garamond), "Cormorant Garamond", Georgia, serif';

export default async function DashboardPage() {
  const counts = await getDashboardCounts();

  return (
    <ProtectedAdmin>
      {/* Welcome section */}
      <div className="mb-10">
        <span
          className="inline-flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[2.5px] mb-3"
          style={{ color: "#c59b4b" }}
        >
          <span className="inline-block h-px w-8 bg-current opacity-50" />
          Ringkasan Konten
        </span>
        <h2
          className="font-light text-[#1c2b24]"
          style={{ fontFamily: serif, fontSize: "clamp(32px, 4vw, 48px)", lineHeight: 1.05 }}
        >
          Pantau data website dusun.
        </h2>
        <p className="mt-3 max-w-lg text-sm text-[#66746d]">
          Data konten yang dikelola melalui panel ini tampil secara langsung di halaman publik
          dusun setelah dipublikasikan.
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid gap-5 sm:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.key}
              href={stat.href}
              className="group relative overflow-hidden rounded-[24px] border p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(7,57,51,0.10)]"
              style={{
                background: "#fffdf7",
                borderColor: "rgba(28,43,36,0.10)",
                boxShadow: "0 8px 30px rgba(7,57,51,0.05)",
              }}
            >
              {/* Background number */}
              <span
                className="absolute -bottom-3 -right-2 select-none pointer-events-none font-light leading-none opacity-[0.045]"
                style={{ fontFamily: serif, fontSize: "120px", color: stat.color }}
              >
                {counts[stat.key]}
              </span>

              {/* Icon */}
              <span
                className="mb-6 inline-flex h-11 w-11 items-center justify-center rounded-xl"
                style={{ background: stat.colorBg, color: stat.color }}
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>

              {/* Label */}
              <p
                className="text-[10px] font-extrabold uppercase tracking-[2px] mb-2"
                style={{ color: "#8b968f" }}
              >
                {stat.label}
              </p>
              <p className="text-sm text-[#66746d] mb-5">{stat.desc}</p>

              {/* Count */}
              <p
                className="font-light leading-none text-[#1c2b24]"
                style={{ fontFamily: serif, fontSize: "clamp(48px, 6vw, 72px)" }}
              >
                {counts[stat.key]}
              </p>

              {/* Arrow */}
              <div
                className="mt-5 flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-[1.5px] transition-all duration-200 group-hover:gap-3"
                style={{ color: stat.color }}
              >
                Kelola
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Quick links */}
      <div
        className="mt-10 rounded-[20px] border p-6"
        style={{ background: "#fffdf7", borderColor: "rgba(28,43,36,0.10)" }}
      >
        <p className="mb-4 text-[10px] font-extrabold uppercase tracking-[2px] text-[#8b968f]">
          Aksi Cepat
        </p>
        <div className="flex flex-wrap gap-3">
          {[
            { href: "/admin/berita/tambah", label: "Tambah Berita" },
            { href: "/admin/umkm/tambah", label: "Tambah UMKM" },
            { href: "/admin/galeri/tambah", label: "Upload Foto" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="inline-flex min-h-[38px] items-center rounded-full border px-5 text-[11px] font-extrabold uppercase tracking-[1.5px] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm"
              style={{
                borderColor: "rgba(28,43,36,0.12)",
                color: "#1c2b24",
                background: "#f6f2e8",
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </ProtectedAdmin>
  );
}
