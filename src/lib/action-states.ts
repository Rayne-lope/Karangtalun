import { emptyActionState } from "@/lib/utils/forms";
import type { LoginValues } from "@/lib/validations/auth";
import type { GalleryValues } from "@/lib/validations/gallery";
import type { NewsValues } from "@/lib/validations/news";
import type { UmkmValues } from "@/lib/validations/umkm";

export const initialLoginState = emptyActionState<LoginValues>({
  username: "",
  password: "",
});

export const initialNewsState = emptyActionState<NewsValues>({
  title: "",
  excerpt: null,
  content: "",
  category_id: null,
  status: "draft",
});

export const initialUmkmState = emptyActionState<UmkmValues>({
  name: "",
  owner_name: null,
  description: null,
  product_description: null,
  address: null,
  phone: null,
  whatsapp: null,
  instagram_url: null,
  map_url: null,
  category_id: null,
  status: "active",
});

export const initialGalleryState = emptyActionState<GalleryValues>({
  title: "",
  description: null,
  category: null,
  sort_order: 0,
  status: "published",
});
