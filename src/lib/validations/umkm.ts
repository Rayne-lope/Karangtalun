import { z } from "zod";

const phonePattern = /^[0-9+()\-\s.]*$/;

// Validates a URL is a genuine HTTPS URL from an allowed domain
function safeUrl(allowedHosts: string[], message: string) {
  return z
    .string()
    .refine(
      (val) => {
        if (!val || val === "") return true; // optional — empty is fine
        try {
          const url = new URL(val);
          // Must be https
          if (url.protocol !== "https:") return false;
          // Hostname must match one of the allowed domains (exact or subdomain)
          return allowedHosts.some(
            (host) => url.hostname === host || url.hostname.endsWith(`.${host}`)
          );
        } catch {
          return false;
        }
      },
      { message }
    )
    .nullable()
    .or(z.literal(""));
}

export const umkmSchema = z.object({
  name: z
    .string()
    .min(3, "Nama UMKM minimal 3 karakter.")
    .max(120, "Nama UMKM maksimal 120 karakter."),
  owner_name: z.string().max(120, "Nama pemilik maksimal 120 karakter.").nullable(),
  description: z.string().max(1200, "Deskripsi UMKM maksimal 1.200 karakter.").nullable(),
  product_description: z.string().max(1200, "Deskripsi produk maksimal 1.200 karakter.").nullable(),
  address: z.string().max(300, "Alamat maksimal 300 karakter.").nullable(),
  phone: z
    .string()
    .regex(phonePattern, "Nomor telepon hanya boleh berisi angka dan simbol telepon.")
    .max(30, "Nomor telepon maksimal 30 karakter.")
    .nullable(),
  whatsapp: z
    .string()
    .regex(phonePattern, "Nomor WhatsApp hanya boleh berisi angka dan simbol telepon.")
    .max(30, "Nomor WhatsApp maksimal 30 karakter.")
    .nullable(),
  // Restrict instagram_url to Instagram domains only
  instagram_url: safeUrl(
    ["instagram.com", "www.instagram.com"],
    "URL Instagram tidak valid. Gunakan link https://instagram.com/... atau https://www.instagram.com/..."
  ),
  // Restrict map_url to Google Maps domains only
  map_url: safeUrl(
    ["maps.google.com", "www.google.com", "goo.gl", "maps.app.goo.gl"],
    "URL peta tidak valid. Gunakan link Google Maps yang valid (maps.google.com atau goo.gl)."
  ),
  category_id: z.string().uuid().nullable(),
  status: z.enum(["active", "inactive", "archived"], {
    error: "Pilih status UMKM yang valid.",
  }),
});

export type UmkmValues = z.infer<typeof umkmSchema>;
