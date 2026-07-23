import type { NextConfig } from "next";

// Only derive from env var — no hardcoded fallback to avoid leaking project IDs
const supabaseHostname = process.env.NEXT_PUBLIC_SUPABASE_URL
  ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname
  : undefined;

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "6mb",
    },
  },

  // ── Security Headers ────────────────────────────────────────────────────
  async headers() {
    return [
      {
        // Apply to all routes
        source: "/(.*)",
        headers: [
          // Prevent clickjacking — only allow same-origin framing
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          // Prevent MIME-type sniffing
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Only send referrer to same origin; truncate for cross-origin
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // Restrict browser feature access
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=()",
          },
          // Force HTTPS for 1 year (only meaningful on production with HTTPS)
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },
          // Content Security Policy — allows Supabase storage images & Google Maps iframe
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              // Scripts: self + Next.js inline scripts (needed for hydration)
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
              // Styles: self + inline (Tailwind generates inline styles)
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              // Fonts
              "font-src 'self' https://fonts.gstatic.com",
              // Images: self + Supabase storage + OpenStreetMap tiles + data URIs for previews.
              supabaseHostname
                ? `img-src 'self' data: blob: https://tile.openstreetmap.org https://${supabaseHostname}`
                : "img-src 'self' data: blob: https://tile.openstreetmap.org",
              // Connections: Supabase API
              supabaseHostname
                ? `connect-src 'self' https://${supabaseHostname} wss://${supabaseHostname}`
                : "connect-src 'self'",
              // Media, objects
              "media-src 'none'",
              "object-src 'none'",
              // Base URI restriction — prevent base tag hijacking
              "base-uri 'self'",
              // Form action restriction
              "form-action 'self'",
            ].join("; "),
          },
        ],
      },
    ];
  },

  // ── Image optimization whitelist ────────────────────────────────────────
  images: {
    remotePatterns: [
      {
        protocol: "https" as const,
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      // Only allow images from the configured Supabase project
      ...(supabaseHostname
        ? [
            {
              protocol: "https" as const,
              hostname: supabaseHostname,
              pathname: "/storage/v1/object/public/**",
            },
          ]
        : []),
    ],
  },
};

export default nextConfig;
