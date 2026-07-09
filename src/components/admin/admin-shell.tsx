"use client";

import {
  Images,
  LayoutDashboard,
  LogOut,
  Newspaper,
  Store,
  ExternalLink,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { logoutAction } from "@/lib/actions/auth.actions";
import type { Profile } from "@/types/content";

const navigation = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/berita", label: "Berita", icon: Newspaper },
  { href: "/admin/umkm", label: "UMKM", icon: Store },
  { href: "/admin/galeri", label: "Galeri", icon: Images },
];

/* ─── CSS variables injected via inline style on the root wrapper ─────────── */
const adminVars = {
  "--adm-bg": "#f6f2e8",
  "--adm-surface": "#fffdf7",
  "--adm-sidebar": "#062b27",
  "--adm-sidebar-hover": "rgba(255,255,255,0.06)",
  "--adm-sidebar-active": "rgba(255,255,255,0.11)",
  "--adm-ink": "#1c2b24",
  "--adm-muted": "#66746d",
  "--adm-teal": "#073933",
  "--adm-gold": "#c59b4b",
  "--adm-line": "rgba(28,43,36,0.10)",
  "--adm-serif": 'var(--font-cormorant-garamond), "Cormorant Garamond", Georgia, serif',
} as React.CSSProperties;

type AdminShellProps = {
  profile: Profile;
  children: React.ReactNode;
};

function NavItem({ item }: { item: (typeof navigation)[number] }) {
  const pathname = usePathname();
  const isActive =
    item.href === "/admin/dashboard"
      ? pathname === "/admin/dashboard"
      : pathname.startsWith(item.href);
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      className={`group flex min-h-[44px] items-center gap-3 rounded-xl px-3 text-[13px] font-semibold tracking-wide transition-all duration-150 ${
        isActive
          ? "bg-[var(--adm-sidebar-active)] text-white"
          : "text-white/60 hover:bg-[var(--adm-sidebar-hover)] hover:text-white"
      }`}
    >
      <Icon
        className={`h-4 w-4 flex-shrink-0 transition-colors ${
          isActive ? "text-[var(--adm-gold)]" : "text-white/40 group-hover:text-white/70"
        }`}
        aria-hidden="true"
      />
      {item.label}
      {isActive && (
        <ChevronRight className="ml-auto h-3 w-3 text-white/30" aria-hidden="true" />
      )}
    </Link>
  );
}

export function AdminShell({ profile, children }: AdminShellProps) {
  const initials = profile.full_name
    ? profile.full_name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
    : "AD";

  return (
    <div
      className="min-h-screen font-sans antialiased"
      style={{ ...adminVars, background: "var(--adm-bg)", color: "var(--adm-ink)" } as React.CSSProperties}
    >
      {/* ── Sidebar (desktop) ─────────────────────────────────────────── */}
      <aside
        className="fixed inset-y-0 left-0 hidden w-[260px] flex-col lg:flex"
        style={{ background: "var(--adm-sidebar)" }}
      >
        {/* Brand */}
        <div className="flex items-center gap-3 px-5 pt-6 pb-8">
          <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-white/10 p-1.5 ring-1 ring-white/10">
            <Image
              src="/images/karanz.png"
              alt="Logo Dusun Karangtalun"
              width={36}
              height={36}
              className="h-full w-full object-contain"
            />
          </span>
          <div className="min-w-0">
            <span
              className="block truncate text-[15px] font-light tracking-widest text-white"
              style={{ fontFamily: "var(--adm-serif)" }}
            >
              Karangtalun
            </span>
            <span className="block text-[10px] font-semibold uppercase tracking-[2px] text-white/40">
              Admin Panel
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="mx-5 mb-4 h-px bg-white/[0.07]" />

        {/* Nav label */}
        <p className="mb-2 px-5 text-[9px] font-extrabold uppercase tracking-[2.5px] text-white/25">
          Menu
        </p>

        {/* Navigation */}
        <nav className="flex-1 space-y-0.5 px-3" aria-label="Navigasi admin">
          {navigation.map((item) => (
            <NavItem key={item.href} item={item} />
          ))}
        </nav>

        {/* Divider */}
        <div className="mx-5 my-4 h-px bg-white/[0.07]" />

        {/* User Profile */}
        <div className="flex items-center gap-3 px-5 pb-6">
          <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[var(--adm-gold)]/20 text-xs font-extrabold uppercase text-[var(--adm-gold)]">
            {initials}
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[12px] font-semibold text-white/80">
              {profile.full_name ?? "Admin"}
            </p>
            <p className="truncate text-[10px] text-white/35 capitalize">
              {profile.role ?? "admin"}
            </p>
          </div>
          <form action={logoutAction}>
            <button
              type="submit"
              title="Logout"
              className="flex h-7 w-7 items-center justify-center rounded-lg text-white/30 transition hover:bg-white/10 hover:text-white/70"
            >
              <LogOut className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </form>
        </div>
      </aside>

      {/* ── Main content area ─────────────────────────────────────────── */}
      <div className="lg:pl-[260px]">
        {/* Top header */}
        <header
          className="sticky top-0 z-10 border-b px-4 py-4 sm:px-6 lg:px-8"
          style={{
            background: "var(--adm-surface)",
            borderColor: "var(--adm-line)",
            backdropFilter: "blur(12px)",
          }}
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p
                className="text-[10px] font-extrabold uppercase tracking-[2.2px]"
                style={{ color: "var(--adm-gold)" }}
              >
                Dashboard Admin
              </p>
              <h1
                className="mt-0.5 text-xl font-light leading-tight"
                style={{
                  fontFamily: "var(--adm-serif)",
                  fontSize: "clamp(18px, 2.5vw, 24px)",
                  color: "var(--adm-ink)",
                }}
              >
                Halo, {profile.full_name}
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href="/"
                className="inline-flex min-h-[38px] items-center justify-center gap-2 rounded-full border px-4 text-[11px] font-extrabold uppercase tracking-[1.5px] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm"
                style={{
                  borderColor: "var(--adm-line)",
                  color: "var(--adm-ink)",
                  background: "var(--adm-bg)",
                }}
              >
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                Lihat Situs
              </Link>
              <form action={logoutAction}>
                <button
                  type="submit"
                  className="inline-flex min-h-[38px] items-center justify-center gap-2 rounded-full px-4 text-[11px] font-extrabold uppercase tracking-[1.5px] text-white transition-all duration-200 hover:-translate-y-0.5 hover:opacity-90"
                  style={{ background: "var(--adm-sidebar)" }}
                >
                  <LogOut className="h-3.5 w-3.5" aria-hidden="true" />
                  Logout
                </button>
              </form>
            </div>
          </div>

          {/* Mobile nav tabs */}
          <nav
            className="mt-4 flex gap-1.5 overflow-x-auto pb-0.5 lg:hidden"
            aria-label="Navigasi mobile"
          >
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="inline-flex min-h-[34px] shrink-0 items-center rounded-full border px-4 text-[11px] font-extrabold uppercase tracking-[1.3px] transition"
                style={{
                  borderColor: "var(--adm-line)",
                  color: "var(--adm-ink)",
                  background: "var(--adm-surface)",
                }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </header>

        {/* Page content */}
        <main className="px-4 py-8 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
