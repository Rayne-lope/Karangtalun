export type NewsStatus = "draft" | "published" | "archived";
export type UmkmStatus = "active" | "inactive" | "archived";
export type GalleryStatus = "draft" | "published" | "archived";

export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  created_at: string | null;
  updated_at: string | null;
};

export type News = {
  id: string;
  category_id: string | null;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  cover_image_url: string | null;
  status: NewsStatus;
  published_at: string | null;
  author_id: string | null;
  created_at: string | null;
  updated_at: string | null;
  news_categories?: Pick<Category, "name" | "slug"> | null;
};

export type Umkm = {
  id: string;
  category_id: string | null;
  name: string;
  slug: string;
  owner_name: string | null;
  description: string | null;
  product_description: string | null;
  address: string | null;
  phone: string | null;
  whatsapp: string | null;
  instagram_url: string | null;
  image_url: string | null;
  map_url: string | null;
  status: UmkmStatus;
  created_at: string | null;
  updated_at: string | null;
  umkm_categories?: Pick<Category, "name" | "slug"> | null;
};

export type GalleryItem = {
  id: string;
  title: string;
  description: string | null;
  image_url: string;
  category: string | null;
  status: GalleryStatus;
  sort_order: number | null;
  created_at: string | null;
  updated_at: string | null;
};

export type Profile = {
  id: string;
  full_name: string;
  role: "admin";
  avatar_url: string | null;
  created_at: string | null;
  updated_at: string | null;
};
