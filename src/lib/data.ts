import { createClient } from "@/utils/supabase/server";
import type { Category, GalleryItem, News, Umkm } from "@/types/content";

export async function getNewsCategories() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("news_categories")
    .select("*")
    .order("name", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as Category[];
}

export async function getUmkmCategories() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("umkm_categories")
    .select("*")
    .order("name", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as Category[];
}

export async function getAdminNews() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("news")
    .select("*, news_categories(name, slug)")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as News[];
}

export async function getPublishedNews(limit?: number) {
  const supabase = await createClient();
  let query = supabase
    .from("news")
    .select("*, news_categories(name, slug)")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (limit) {
    query = query.limit(limit);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as News[];
}

export async function getNewsById(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("news")
    .select("*, news_categories(name, slug)")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data as News | null;
}

export async function getPublishedNewsBySlug(slug: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("news")
    .select("*, news_categories(name, slug)")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data as News | null;
}

export async function getAdminUmkm() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("umkm")
    .select("*, umkm_categories(name, slug)")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as Umkm[];
}

export async function getActiveUmkm(limit?: number) {
  const supabase = await createClient();
  let query = supabase
    .from("umkm")
    .select("*, umkm_categories(name, slug)")
    .eq("status", "active")
    .order("created_at", { ascending: false });

  if (limit) {
    query = query.limit(limit);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as Umkm[];
}

export async function getUmkmById(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("umkm")
    .select("*, umkm_categories(name, slug)")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data as Umkm | null;
}

export async function getActiveUmkmBySlug(slug: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("umkm")
    .select("*, umkm_categories(name, slug)")
    .eq("slug", slug)
    .eq("status", "active")
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data as Umkm | null;
}

export async function getAdminGallery() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("gallery")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as GalleryItem[];
}

export async function getPublishedGallery(limit?: number) {
  const supabase = await createClient();
  let query = supabase
    .from("gallery")
    .select("*")
    .eq("status", "published")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (limit) {
    query = query.limit(limit);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as GalleryItem[];
}

export async function getGalleryById(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("gallery")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data as GalleryItem | null;
}

export async function getDashboardCounts() {
  const supabase = await createClient();
  const [news, umkm, gallery] = await Promise.all([
    supabase.from("news").select("id", { count: "exact", head: true }),
    supabase.from("umkm").select("id", { count: "exact", head: true }),
    supabase.from("gallery").select("id", { count: "exact", head: true }),
  ]);

  return {
    news: news.count ?? 0,
    umkm: umkm.count ?? 0,
    gallery: gallery.count ?? 0,
  };
}
