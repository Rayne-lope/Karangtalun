import Image from "next/image";
import Link from "next/link";
import { LoginForm } from "@/components/admin/login-form";

const serif = 'var(--font-cormorant-garamond), "Cormorant Garamond", Georgia, serif';

export default function LoginPage() {
  return (
    <main
      className="flex min-h-screen antialiased"
      style={{ fontFamily: "var(--font-inter), Inter, system-ui, sans-serif" }}
    >
      {/* ── Left panel — dark teal branding ────────────────────────── */}
      <div
        className="relative hidden lg:flex lg:w-[44%] xl:w-[40%] flex-col justify-between p-12"
        style={{ background: "#062b27" }}
      >
        {/* Decorative radial overlay */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 18% 28%, rgba(197,155,75,0.12), transparent 50%), radial-gradient(circle at 80% 75%, rgba(255,255,255,0.04), transparent 40%)",
          }}
        />

        {/* Brand */}
        <div className="relative flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 p-1.5 ring-1 ring-white/10">
            <Image
              src="/images/karanz.png"
              alt="Logo Dusun Karangtalun"
              width={40}
              height={40}
              className="h-full w-full object-contain"
            />
          </span>
          <div>
            <span
              className="block text-[15px] font-light tracking-widest text-white"
              style={{ fontFamily: serif }}
            >
              Karangtalun
            </span>
            <span className="block text-[9px] font-extrabold uppercase tracking-[2.5px] text-white/40">
              Admin Panel
            </span>
          </div>
        </div>

        {/* Center quote */}
        <div className="relative">
          <span
            className="absolute -top-12 -left-2 text-[120px] leading-none text-white opacity-[0.04] select-none pointer-events-none"
            style={{ fontFamily: serif }}
          >
            ◇
          </span>
          <p
            className="text-[10px] font-extrabold uppercase tracking-[2.5px] text-white/40 mb-5"
          >
            Panel Manajemen
          </p>
          <h1
            className="font-light leading-tight text-white"
            style={{ fontFamily: serif, fontSize: "clamp(36px, 4vw, 52px)" }}
          >
            Kelola konten dusun dengan mudah.
          </h1>
          <p className="mt-5 text-[15px] leading-relaxed text-white/55">
            Publikasikan berita, kelola UMKM lokal, dan unggah dokumentasi galeri
            langsung dari panel ini.
          </p>
        </div>

        {/* Footer */}
        <div className="relative">
          <div className="mb-5 h-px bg-white/[0.08]" />
          <p className="text-[12px] text-white/35">
            © 2026 Dusun Karangtalun · KKN UPNYK.84.160
          </p>
        </div>
      </div>

      {/* ── Right panel — login form ────────────────────────────────── */}
      <div
        className="flex flex-1 flex-col items-center justify-center px-6 py-12 sm:px-10"
        style={{ background: "#f6f2e8" }}
      >
        {/* Mobile logo */}
        <div className="mb-8 flex items-center gap-3 lg:hidden">
          <Image
            src="/images/karanz.png"
            alt="Logo Dusun Karangtalun"
            width={32}
            height={32}
            className="object-contain"
          />
          <span
            className="text-lg font-light tracking-widest text-[#1c2b24]"
            style={{ fontFamily: serif }}
          >
            Karangtalun
          </span>
        </div>

        {/* Form card */}
        <div className="w-full max-w-[400px]">
          {/* Heading */}
          <div className="mb-8">
            <span
              className="inline-flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[2.5px] text-[#c59b4b] mb-3"
            >
              <span className="inline-block h-px w-6 bg-current opacity-50" />
              Admin Dusun
            </span>
            <h2
              className="font-light text-[#1c2b24]"
              style={{
                fontFamily: serif,
                fontSize: "clamp(28px, 4vw, 40px)",
                lineHeight: 1.1,
              }}
            >
              Masuk Dashboard
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#66746d]">
              Gunakan username dan password admin yang sudah dibuat.
            </p>
          </div>

          {/* Form */}
          <div
            className="rounded-[24px] border p-7 shadow-[0_20px_60px_rgba(7,57,51,0.08)]"
            style={{
              background: "#fffdf7",
              borderColor: "rgba(28,43,36,0.10)",
            }}
          >
            <LoginForm />
          </div>

          {/* Back link */}
          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-[11px] font-extrabold uppercase tracking-[1.7px] text-[#8b968f] transition-colors hover:text-[#1c2b24]"
            >
              ← Kembali ke Website
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
