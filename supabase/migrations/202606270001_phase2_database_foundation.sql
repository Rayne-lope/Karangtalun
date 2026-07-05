-- Phase 2: Database foundation for Website Profil Desa Karangtalun.
-- Covers schema, constraints, RLS policies, admin helper, timestamps, and default seeds.

create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  role text not null default 'admin',
  avatar_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  constraint profiles_role_check check (role in ('admin'))
);

create table if not exists public.news_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.news (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references public.news_categories(id) on delete set null,
  title text not null,
  slug text not null unique,
  excerpt text,
  content text not null,
  cover_image_url text,
  status text not null default 'draft',
  published_at timestamptz,
  author_id uuid references public.profiles(id) on delete set null,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  constraint news_status_check check (status in ('draft', 'published', 'archived'))
);

create table if not exists public.umkm_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.umkm (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references public.umkm_categories(id) on delete set null,
  name text not null,
  slug text not null unique,
  owner_name text,
  description text,
  product_description text,
  address text,
  phone text,
  whatsapp text,
  instagram_url text,
  image_url text,
  map_url text,
  status text not null default 'active',
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  constraint umkm_status_check check (status in ('active', 'inactive', 'archived'))
);

create table if not exists public.gallery (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  image_url text not null,
  category text,
  status text not null default 'published',
  sort_order int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  constraint gallery_status_check check (status in ('draft', 'published', 'archived'))
);

create index if not exists news_category_id_idx on public.news(category_id);
create index if not exists news_author_id_idx on public.news(author_id);
create index if not exists news_status_published_at_idx on public.news(status, published_at desc);
create index if not exists umkm_category_id_idx on public.umkm(category_id);
create index if not exists umkm_status_created_at_idx on public.umkm(status, created_at desc);
create index if not exists gallery_status_sort_order_idx on public.gallery(status, sort_order, created_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_profiles_updated_at on public.profiles;
create trigger set_profiles_updated_at
  before update on public.profiles
  for each row
  execute function public.set_updated_at();

drop trigger if exists set_news_categories_updated_at on public.news_categories;
create trigger set_news_categories_updated_at
  before update on public.news_categories
  for each row
  execute function public.set_updated_at();

drop trigger if exists set_news_updated_at on public.news;
create trigger set_news_updated_at
  before update on public.news
  for each row
  execute function public.set_updated_at();

drop trigger if exists set_umkm_categories_updated_at on public.umkm_categories;
create trigger set_umkm_categories_updated_at
  before update on public.umkm_categories
  for each row
  execute function public.set_updated_at();

drop trigger if exists set_umkm_updated_at on public.umkm;
create trigger set_umkm_updated_at
  before update on public.umkm
  for each row
  execute function public.set_updated_at();

drop trigger if exists set_gallery_updated_at on public.gallery;
create trigger set_gallery_updated_at
  before update on public.gallery
  for each row
  execute function public.set_updated_at();

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and role = 'admin'
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;

alter table public.profiles enable row level security;
alter table public.news_categories enable row level security;
alter table public.news enable row level security;
alter table public.umkm_categories enable row level security;
alter table public.umkm enable row level security;
alter table public.gallery enable row level security;

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own"
  on public.profiles
  for select
  to authenticated
  using (id = auth.uid());

drop policy if exists "profiles_select_admin" on public.profiles;
create policy "profiles_select_admin"
  on public.profiles
  for select
  to authenticated
  using (public.is_admin());

drop policy if exists "profiles_insert_admin" on public.profiles;
create policy "profiles_insert_admin"
  on public.profiles
  for insert
  to authenticated
  with check (public.is_admin());

drop policy if exists "profiles_update_admin" on public.profiles;
create policy "profiles_update_admin"
  on public.profiles
  for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "profiles_delete_admin" on public.profiles;
create policy "profiles_delete_admin"
  on public.profiles
  for delete
  to authenticated
  using (public.is_admin());

drop policy if exists "news_categories_select_public" on public.news_categories;
create policy "news_categories_select_public"
  on public.news_categories
  for select
  to anon, authenticated
  using (true);

drop policy if exists "news_categories_insert_admin" on public.news_categories;
create policy "news_categories_insert_admin"
  on public.news_categories
  for insert
  to authenticated
  with check (public.is_admin());

drop policy if exists "news_categories_update_admin" on public.news_categories;
create policy "news_categories_update_admin"
  on public.news_categories
  for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "news_categories_delete_admin" on public.news_categories;
create policy "news_categories_delete_admin"
  on public.news_categories
  for delete
  to authenticated
  using (public.is_admin());

drop policy if exists "news_select_published" on public.news;
create policy "news_select_published"
  on public.news
  for select
  to anon, authenticated
  using (status = 'published');

drop policy if exists "news_select_admin" on public.news;
create policy "news_select_admin"
  on public.news
  for select
  to authenticated
  using (public.is_admin());

drop policy if exists "news_insert_admin" on public.news;
create policy "news_insert_admin"
  on public.news
  for insert
  to authenticated
  with check (public.is_admin());

drop policy if exists "news_update_admin" on public.news;
create policy "news_update_admin"
  on public.news
  for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "news_delete_admin" on public.news;
create policy "news_delete_admin"
  on public.news
  for delete
  to authenticated
  using (public.is_admin());

drop policy if exists "umkm_categories_select_public" on public.umkm_categories;
create policy "umkm_categories_select_public"
  on public.umkm_categories
  for select
  to anon, authenticated
  using (true);

drop policy if exists "umkm_categories_insert_admin" on public.umkm_categories;
create policy "umkm_categories_insert_admin"
  on public.umkm_categories
  for insert
  to authenticated
  with check (public.is_admin());

drop policy if exists "umkm_categories_update_admin" on public.umkm_categories;
create policy "umkm_categories_update_admin"
  on public.umkm_categories
  for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "umkm_categories_delete_admin" on public.umkm_categories;
create policy "umkm_categories_delete_admin"
  on public.umkm_categories
  for delete
  to authenticated
  using (public.is_admin());

drop policy if exists "umkm_select_active" on public.umkm;
create policy "umkm_select_active"
  on public.umkm
  for select
  to anon, authenticated
  using (status = 'active');

drop policy if exists "umkm_select_admin" on public.umkm;
create policy "umkm_select_admin"
  on public.umkm
  for select
  to authenticated
  using (public.is_admin());

drop policy if exists "umkm_insert_admin" on public.umkm;
create policy "umkm_insert_admin"
  on public.umkm
  for insert
  to authenticated
  with check (public.is_admin());

drop policy if exists "umkm_update_admin" on public.umkm;
create policy "umkm_update_admin"
  on public.umkm
  for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "umkm_delete_admin" on public.umkm;
create policy "umkm_delete_admin"
  on public.umkm
  for delete
  to authenticated
  using (public.is_admin());

drop policy if exists "gallery_select_published" on public.gallery;
create policy "gallery_select_published"
  on public.gallery
  for select
  to anon, authenticated
  using (status = 'published');

drop policy if exists "gallery_select_admin" on public.gallery;
create policy "gallery_select_admin"
  on public.gallery
  for select
  to authenticated
  using (public.is_admin());

drop policy if exists "gallery_insert_admin" on public.gallery;
create policy "gallery_insert_admin"
  on public.gallery
  for insert
  to authenticated
  with check (public.is_admin());

drop policy if exists "gallery_update_admin" on public.gallery;
create policy "gallery_update_admin"
  on public.gallery
  for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "gallery_delete_admin" on public.gallery;
create policy "gallery_delete_admin"
  on public.gallery
  for delete
  to authenticated
  using (public.is_admin());

insert into public.news_categories (name, slug, description)
values
  ('Kegiatan Desa', 'kegiatan-desa', 'Berita dan dokumentasi kegiatan resmi desa.'),
  ('Pengumuman', 'pengumuman', 'Informasi dan pengumuman untuk warga desa.'),
  ('Pembangunan', 'pembangunan', 'Kabar pembangunan dan infrastruktur desa.'),
  ('Kesehatan', 'kesehatan', 'Informasi kesehatan dan kegiatan layanan kesehatan.')
on conflict (slug) do update
set
  name = excluded.name,
  description = excluded.description,
  updated_at = now();

insert into public.umkm_categories (name, slug, description)
values
  ('Kuliner', 'kuliner', 'Produk makanan dan minuman lokal desa.'),
  ('Kerajinan', 'kerajinan', 'Produk kerajinan dan karya warga desa.'),
  ('Pertanian', 'pertanian', 'Produk pertanian, perkebunan, dan hasil bumi.'),
  ('Jasa', 'jasa', 'Layanan jasa yang disediakan pelaku usaha desa.')
on conflict (slug) do update
set
  name = excluded.name,
  description = excluded.description,
  updated_at = now();
