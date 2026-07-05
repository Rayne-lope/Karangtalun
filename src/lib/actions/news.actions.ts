"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { initialNewsState } from "@/lib/action-states";
import { newsSchema, type NewsValues } from "@/lib/validations/news";
import {
  actionErrorState,
  fileValue,
  optionalStringValue,
  redirectWithError,
  stringValue,
  validationErrorState,
} from "@/lib/utils/forms";
import { createUniqueSlug } from "@/lib/utils/slugify";
import { removeImageByUrl, uploadImage } from "@/lib/utils/upload";
import { createClient } from "@/utils/supabase/server";

async function findSlug(table: "news" | "umkm", slug: string) {
  const supabase = await createClient();
  const { data } = await supabase.from(table).select("id").eq("slug", slug).maybeSingle();
  return data?.id ?? null;
}

function revalidateNewsPaths() {
  revalidatePath("/");
  revalidatePath("/berita");
  revalidatePath("/berita/[slug]", "page");
  revalidatePath("/admin/berita");
  revalidatePath("/admin/dashboard");
}

function newsValues(formData: FormData) {
  return {
    title: stringValue(formData, "title"),
    excerpt: optionalStringValue(formData, "excerpt"),
    content: stringValue(formData, "content"),
    category_id: optionalStringValue(formData, "category_id"),
    status: stringValue(formData, "status"),
  };
}

export async function createNewsAction(_state: typeof initialNewsState, formData: FormData) {
  const profile = await requireAdmin();
  const values = newsValues(formData);
  const validated = newsSchema.safeParse(values);

  if (!validated.success) {
    return validationErrorState<NewsValues>(validated.error, values);
  }

  const supabase = await createClient();
  let imageUrl: string | null = null;

  try {
    imageUrl = await uploadImage(supabase, fileValue(formData, "cover_image"), "news");
  } catch (error) {
    return actionErrorState<NewsValues>(
      error instanceof Error ? error.message : "Cover berita gagal diunggah.",
      values,
      { cover_image: [error instanceof Error ? error.message : "Cover berita gagal diunggah."] },
    );
  }

  const slug = await createUniqueSlug("news", validated.data.title, findSlug);
  const { error } = await supabase.from("news").insert({
    ...validated.data,
    slug,
    cover_image_url: imageUrl,
    published_at: validated.data.status === "published" ? new Date().toISOString() : null,
    author_id: profile.id,
  });

  if (error) {
    return actionErrorState<NewsValues>(error.message, values);
  }

  revalidateNewsPaths();
  redirect("/admin/berita");
}

export async function updateNewsAction(id: string, _state: typeof initialNewsState, formData: FormData) {
  await requireAdmin();
  const values = newsValues(formData);
  const validated = newsSchema.safeParse(values);

  if (!validated.success) {
    return validationErrorState<NewsValues>(validated.error, values);
  }

  const supabase = await createClient();
  const { data: current, error: currentError } = await supabase
    .from("news")
    .select("id, slug, cover_image_url, published_at")
    .eq("id", id)
    .maybeSingle();

  if (currentError || !current) {
    return actionErrorState<NewsValues>("Berita tidak ditemukan.", values);
  }

  let imageUrl: string | null = current.cover_image_url;

  try {
    imageUrl = await uploadImage(supabase, fileValue(formData, "cover_image"), "news", current.cover_image_url);
  } catch (error) {
    return actionErrorState<NewsValues>(
      error instanceof Error ? error.message : "Cover berita gagal diunggah.",
      values,
      { cover_image: [error instanceof Error ? error.message : "Cover berita gagal diunggah."] },
    );
  }

  const slug = await createUniqueSlug("news", validated.data.title, findSlug, id);
  const { error } = await supabase
    .from("news")
    .update({
      ...validated.data,
      slug,
      cover_image_url: imageUrl,
      published_at:
        validated.data.status === "published"
          ? current.published_at ?? new Date().toISOString()
          : null,
    })
    .eq("id", id);

  if (error) {
    return actionErrorState<NewsValues>(error.message, values);
  }

  if (imageUrl !== current.cover_image_url) {
    await removeImageByUrl(supabase, current.cover_image_url);
  }

  revalidateNewsPaths();
  redirect("/admin/berita");
}

export async function deleteNewsAction(id: string) {
  await requireAdmin();
  const supabase = await createClient();
  const { data: current } = await supabase
    .from("news")
    .select("cover_image_url")
    .eq("id", id)
    .maybeSingle();

  const { error } = await supabase.from("news").delete().eq("id", id);

  if (error) {
    redirect(redirectWithError("/admin/berita", error.message));
  }

  await removeImageByUrl(supabase, current?.cover_image_url);
  revalidateNewsPaths();
  redirect("/admin/berita");
}
