import { z } from "zod";

export const newsSchema = z.object({
  title: z
    .string()
    .min(5, "Judul minimal 5 karakter.")
    .max(160, "Judul maksimal 160 karakter."),
  excerpt: z.string().max(500, "Ringkasan maksimal 500 karakter.").nullable(),
  content: z.string().min(20, "Konten minimal 20 karakter."),
  category_id: z.string().uuid().nullable(),
  status: z.enum(["draft", "published", "archived"], {
    error: "Pilih status berita yang valid.",
  }),
});

export type NewsValues = z.infer<typeof newsSchema>;
