import { z } from "zod";

const phonePattern = /^[0-9+()\-\s.]*$/;
const optionalUrl = (message: string) =>
  z
    .string()
    .url(message)
    .nullable()
    .or(z.literal(""));

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
  instagram_url: optionalUrl("URL Instagram tidak valid. Contoh: https://instagram.com/namausaha"),
  map_url: optionalUrl("URL peta tidak valid. Gunakan link lengkap dari Google Maps."),
  category_id: z.string().uuid().nullable(),
  status: z.enum(["active", "inactive", "archived"], {
    error: "Pilih status UMKM yang valid.",
  }),
});

export type UmkmValues = z.infer<typeof umkmSchema>;
