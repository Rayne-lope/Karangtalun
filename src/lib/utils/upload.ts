import type { SupabaseClient } from "@supabase/supabase-js";

const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp"]);
export const maxImageFileSize = 5 * 1024 * 1024;
export const imageUploadHelpText = "JPG, PNG, atau WEBP. Maksimal 5 MB.";
const bucketName = "public-assets";

export function getStoragePathFromPublicUrl(url?: string | null) {
  if (!url) {
    return null;
  }

  const marker = `/storage/v1/object/public/${bucketName}/`;
  const markerIndex = url.indexOf(marker);

  if (markerIndex === -1) {
    return null;
  }

  return decodeURIComponent(url.slice(markerIndex + marker.length));
}

export async function uploadImage(
  supabase: SupabaseClient,
  file: File | null,
  folder: "news" | "umkm" | "gallery",
  existingUrl?: string | null,
) {
  if (!file) {
    return existingUrl ?? null;
  }

  if (!allowedTypes.has(file.type)) {
    throw new Error("Format gambar harus JPG, PNG, atau WEBP.");
  }

  if (file.size > maxImageFileSize) {
    throw new Error("Ukuran gambar maksimal 5 MB.");
  }

  const extension = file.name.split(".").pop()?.toLowerCase() ?? "webp";
  const path = `${folder}/${Date.now()}-${crypto.randomUUID()}.${extension}`;
  const { error } = await supabase.storage.from(bucketName).upload(path, file, {
    cacheControl: "3600",
    contentType: file.type,
    upsert: false,
  });

  if (error) {
    throw new Error(error.message);
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from(bucketName).getPublicUrl(path);

  return publicUrl;
}

export async function removeImageByUrl(supabase: SupabaseClient, url?: string | null) {
  const path = getStoragePathFromPublicUrl(url);

  if (!path) {
    return;
  }

  await supabase.storage.from(bucketName).remove([path]);
}
