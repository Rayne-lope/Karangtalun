"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { initialUmkmState } from "@/lib/action-states";
import { umkmSchema, type UmkmValues } from "@/lib/validations/umkm";
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

function revalidateUmkmPaths() {
  revalidatePath("/");
  revalidatePath("/umkm");
  revalidatePath("/umkm/[slug]", "page");
  revalidatePath("/admin/umkm");
  revalidatePath("/admin/dashboard");
}

function formPayload(formData: FormData) {
  return {
    name: stringValue(formData, "name"),
    owner_name: optionalStringValue(formData, "owner_name"),
    description: optionalStringValue(formData, "description"),
    product_description: optionalStringValue(formData, "product_description"),
    address: optionalStringValue(formData, "address"),
    phone: optionalStringValue(formData, "phone"),
    whatsapp: optionalStringValue(formData, "whatsapp"),
    instagram_url: optionalStringValue(formData, "instagram_url"),
    map_url: optionalStringValue(formData, "map_url"),
    category_id: optionalStringValue(formData, "category_id"),
    status: stringValue(formData, "status"),
  };
}

export async function createUmkmAction(_state: typeof initialUmkmState, formData: FormData) {
  await requireAdmin();
  const values = formPayload(formData);
  const validated = umkmSchema.safeParse(values);

  if (!validated.success) {
    return validationErrorState<UmkmValues>(validated.error, values);
  }

  const supabase = await createClient();
  let imageUrl: string | null = null;

  try {
    imageUrl = await uploadImage(supabase, fileValue(formData, "image"), "umkm");
  } catch (error) {
    return actionErrorState<UmkmValues>(
      error instanceof Error ? error.message : "Foto UMKM gagal diunggah.",
      values,
      { image: [error instanceof Error ? error.message : "Foto UMKM gagal diunggah."] },
    );
  }

  const slug = await createUniqueSlug("umkm", validated.data.name, findSlug);
  const { error } = await supabase.from("umkm").insert({
    ...validated.data,
    instagram_url: validated.data.instagram_url || null,
    map_url: validated.data.map_url || null,
    slug,
    image_url: imageUrl,
  });

  if (error) {
    return actionErrorState<UmkmValues>(error.message, values);
  }

  revalidateUmkmPaths();
  redirect("/admin/umkm");
}

export async function updateUmkmAction(id: string, _state: typeof initialUmkmState, formData: FormData) {
  await requireAdmin();
  const values = formPayload(formData);
  const validated = umkmSchema.safeParse(values);

  if (!validated.success) {
    return validationErrorState<UmkmValues>(validated.error, values);
  }

  const supabase = await createClient();
  const { data: current, error: currentError } = await supabase
    .from("umkm")
    .select("id, image_url")
    .eq("id", id)
    .maybeSingle();

  if (currentError || !current) {
    return actionErrorState<UmkmValues>("UMKM tidak ditemukan.", values);
  }

  let imageUrl: string | null = current.image_url;

  try {
    imageUrl = await uploadImage(supabase, fileValue(formData, "image"), "umkm", current.image_url);
  } catch (error) {
    return actionErrorState<UmkmValues>(
      error instanceof Error ? error.message : "Foto UMKM gagal diunggah.",
      values,
      { image: [error instanceof Error ? error.message : "Foto UMKM gagal diunggah."] },
    );
  }

  const slug = await createUniqueSlug("umkm", validated.data.name, findSlug, id);
  const { error } = await supabase
    .from("umkm")
    .update({
      ...validated.data,
      instagram_url: validated.data.instagram_url || null,
      map_url: validated.data.map_url || null,
      slug,
      image_url: imageUrl,
    })
    .eq("id", id);

  if (error) {
    return actionErrorState<UmkmValues>(error.message, values);
  }

  if (imageUrl !== current.image_url) {
    await removeImageByUrl(supabase, current.image_url);
  }

  revalidateUmkmPaths();
  redirect("/admin/umkm");
}

export async function deleteUmkmAction(id: string) {
  await requireAdmin();
  const supabase = await createClient();
  const { data: current } = await supabase.from("umkm").select("image_url").eq("id", id).maybeSingle();
  const { error } = await supabase.from("umkm").delete().eq("id", id);

  if (error) {
    redirect(redirectWithError("/admin/umkm", error.message));
  }

  await removeImageByUrl(supabase, current?.image_url);
  revalidateUmkmPaths();
  redirect("/admin/umkm");
}
