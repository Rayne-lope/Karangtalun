import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair_Display, Inter, Cormorant_Garamond } from "next/font/google";
import { siteUrl } from "@/lib/metadata";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant-garamond",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Dusun Karangtalun",
    template: "%s | Dusun Karangtalun",
  },
  description: "Website profil resmi Dusun Karangtalun untuk berita, UMKM, galeri, dan informasi wilayah.",
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "Dusun Karangtalun",
  },
  twitter: {
    card: "summary",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${plusJakartaSans.variable} ${playfairDisplay.variable} ${inter.variable} ${cormorantGaramond.variable} h-full scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-pasir text-slate-800 antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
