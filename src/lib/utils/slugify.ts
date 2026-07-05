export function slugify(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function createUniqueSlug(
  table: "news" | "umkm",
  value: string,
  finder: (table: "news" | "umkm", slug: string) => Promise<string | null>,
  excludeId?: string,
) {
  const baseSlug = slugify(value) || "konten";
  let candidate = baseSlug;
  let suffix = 1;

  while (true) {
    const existingId = await finder(table, candidate);

    if (!existingId || existingId === excludeId) {
      return candidate;
    }

    candidate = `${baseSlug}-${suffix}`;
    suffix += 1;
  }
}
