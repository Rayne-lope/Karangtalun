"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { initialGalleryState } from "@/lib/action-states";
import { gallerySchema, type GalleryValues } from "@/lib/validations/gallery";
import {
  actionErrorState,
  fileValue,
  optionalStringValue,
  redirectWithError,
  stringValue,
  validationErrorState,
} from "@/lib/utils/forms";
import { removeImageByUrl, uploadImage } from "@/lib/utils/upload";
import { createClient } from "@/utils/supabase/server";

function revalidateGalleryPaths() {
  revalidatePath("/");
  revalidatePath("/galeri");
  revalidatePath("/admin/galeri");
  revalidatePath("/admin/dashboard");
}

function formPayload(formData: FormData) {
  return {
    title: stringValue(formData, "title"),
    description: optionalStringValue(formData, "description"),
    category: optionalStringValue(formData, "category"),
    sort_order: stringValue(formData, "sort_order") || "0",
    status: stringValue(formData, "status"),
  };
}

export async function createGalleryAction(_state: typeof initialGalleryState, formData: FormData) {
  await requireAdmin();
  const values = formPayload(formData);
  const validated = gallerySchema.safeParse(values);

  if (!validated.success) {
    return validationErrorState<GalleryValues>(validated.error, values);
  }

  const supabase = await createClient();
  let imageUrl: string | null = null;

  try {
    imageUrl = await uploadImage(supabase, fileValue(formData, "image"), "gallery");
  } catch (error) {
    return actionErrorState<GalleryValues>(
      error instanceof Error ? error.message : "Foto galeri gagal diunggah.",
      values,
      { image: [error instanceof Error ? error.message : "Foto galeri gagal diunggah."] },
    );
  }

  if (!imageUrl) {
    return actionErrorState<GalleryValues>("Gambar galeri wajib diunggah.", values, {
      image: ["Gambar galeri wajib diunggah."],
    });
  }

  const { error } = await supabase.from("gallery").insert({
    ...validated.data,
    image_url: imageUrl,
  });

  if (error) {
    return actionErrorState<GalleryValues>(error.message, values);
  }

  revalidateGalleryPaths();
  redirect("/admin/galeri");
}

export async function updateGalleryAction(id: string, _state: typeof initialGalleryState, formData: FormData) {
  await requireAdmin();
  const values = formPayload(formData);
  const validated = gallerySchema.safeParse(values);

  if (!validated.success) {
    return validationErrorState<GalleryValues>(validated.error, values);
  }

  const supabase = await createClient();
  const { data: current, error: currentError } = await supabase
    .from("gallery")
    .select("id, image_url")
    .eq("id", id)
    .maybeSingle();

  if (currentError || !current) {
    return actionErrorState<GalleryValues>("Foto galeri tidak ditemukan.", values);
  }

  let imageUrl = current.image_url;

  try {
    imageUrl = await uploadImage(supabase, fileValue(formData, "image"), "gallery", current.image_url);
  } catch (error) {
    return actionErrorState<GalleryValues>(
      error instanceof Error ? error.message : "Foto galeri gagal diunggah.",
      values,
      { image: [error instanceof Error ? error.message : "Foto galeri gagal diunggah."] },
    );
  }

  const { error } = await supabase
    .from("gallery")
    .update({
      ...validated.data,
      image_url: imageUrl,
    })
    .eq("id", id);

  if (error) {
    return actionErrorState<GalleryValues>(error.message, values);
  }

  if (imageUrl !== current.image_url) {
    await removeImageByUrl(supabase, current.image_url);
  }

  revalidateGalleryPaths();
  redirect("/admin/galeri");
}

export async function deleteGalleryAction(id: string) {
  await requireAdmin();
  const supabase = await createClient();
  const { data: current } = await supabase.from("gallery").select("image_url").eq("id", id).maybeSingle();
  const { error } = await supabase.from("gallery").delete().eq("id", id);

  if (error) {
    redirect(redirectWithError("/admin/galeri", error.message));
  }

  await removeImageByUrl(supabase, current?.image_url);
  revalidateGalleryPaths();
  redirect("/admin/galeri");
}
