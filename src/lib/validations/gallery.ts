import { z } from "zod";

export const gallerySchema = z.object({
  title: z.string().min(1, "Judul wajib diisi.").max(120, "Judul maksimal 120 karakter."),
  description: z.string().max(600, "Deskripsi maksimal 600 karakter.").nullable(),
  category: z.string().max(80, "Kategori maksimal 80 karakter.").nullable(),
  sort_order: z.coerce.number("Urutan harus berupa angka.").int("Urutan harus bilangan bulat.").default(0),
  status: z.enum(["draft", "published", "archived"], {
    error: "Pilih status galeri yang valid.",
  }),
});

export type GalleryValues = z.infer<typeof gallerySchema>;
