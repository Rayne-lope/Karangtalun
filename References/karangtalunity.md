# PRODUCT REQUIREMENTS DOCUMENT

## Website Profil Desa dengan Admin Panel Berbasis Next.js, Tailwind CSS, Supabase, dan Vercel (Scope Sederhana)

---

# 1. Ringkasan Produk

## 1.1 Nama Produk

Website Profil Desa Karangtalun

## 1.2 Jenis Produk

Website profil desa dengan sistem manajemen konten sederhana untuk admin desa yang berfokus pada 3 modul utama.

## 1.3 Tujuan Produk

Membangun website resmi desa yang dapat menampilkan informasi profil desa, sejarah, visi dan misi, struktur pemerintahan, potensi UMKM, peta digital, berita/kegiatan, galeri, dan kontak desa. Website ini terdiri dari halaman statis yang dikelola langsung melalui kode Next.js, serta 3 modul dinamis (Berita/Aktivitas, Potensi UMKM, dan Galeri) yang dapat dikelola oleh perangkat desa atau operator melalui Dashboard Admin tanpa harus mengedit kode program.

## 1.4 Fokus Pengembangan

Fokus utama pengembangan adalah backend yang aman, Supabase, RLS (Row Level Security), auth admin, database schema, storage upload gambar untuk modul dinamis, dan alur CRUD untuk 3 modul utama (Berita, UMKM, Galeri).

Halaman publik lainnya dibuat statis melalui code editor Next.js dengan tampilan fungsional terlebih dahulu.

## 1.5 Target Pengguna

### Pengunjung Website
* Warga desa
* Calon pengunjung desa
* Pelaku UMKM
* Perangkat desa
* Masyarakat umum

### Admin Website
* Perangkat desa / Operator desa
* Tim KKN saat masa pengembangan

---

# 2. Latar Belakang

Desa membutuhkan media digital yang dapat digunakan sebagai pusat informasi resmi. Masalah utama jika website sepenuhnya statis adalah konten yang sering berubah seperti berita, kegiatan terbaru, potensi UMKM, dan foto dokumentasi desa tidak dapat diperbarui secara mandiri oleh perangkat desa.

Untuk menyederhanakan pemeliharaan dan mempercepat pengembangan, website ini dirancang dengan kombinasi halaman statis (untuk profil, sejarah, visi-misi, struktur, data statistik, peta, dan kontak) dan halaman dinamis dengan admin panel (untuk berita, UMKM, dan galeri).

---

# 3. Masalah yang Diselesaikan

1. Informasi desa belum tersentralisasi dalam satu website resmi.
2. Berita dan kegiatan desa sulit dipublikasikan secara mandiri oleh perangkat desa.
3. Potensi UMKM desa belum terdokumentasi dan dipromosikan secara digital.
4. Foto dokumentasi kegiatan desa belum terorganisir dengan baik.
5. Menghindari ketergantungan penuh perangkat desa pada developer untuk memperbarui konten dinamis harian.

---

# 4. Scope Produk

## 4.1 In Scope

### Website Publik
1. **Landing Page**: Berisi ringkasan desa, highlight berita terbaru, highlight UMKM, dan galeri singkat.
2. **Profil Desa (Statis)**: Deskripsi umum wilayah desa.
3. **Sejarah Desa (Statis)**: Asal-usul dan sejarah perkembangan desa.
4. **Visi dan Misi Desa (Statis)**: Visi dan misi resmi pemerintah desa.
5. **Struktur Pemerintahan Desa (Statis)**: Struktur organisasi perangkat desa beserta nama dan jabatannya.
6. **Data Desa (Statis)**: Statistik kependudukan atau data demografi sederhana dalam bentuk angka/grafik statis.
7. **Peta Digital (Statis)**: Embed Google Maps wilayah desa.
8. **Kontak Desa (Statis)**: Informasi alamat, email, jam operasional kantor desa, serta tombol link WhatsApp.
9. **Potensi UMKM (Dinamis)**: Menampilkan daftar UMKM desa yang terhubung ke database.
10. **Detail UMKM (Dinamis)**: Halaman detail masing-masing UMKM beserta foto produk dan kontak WhatsApp pemilik.
11. **Berita & Kegiatan (Dinamis)**: Menampilkan daftar berita/kegiatan desa dari database.
12. **Detail Berita (Dinamis)**: Membaca isi berita secara lengkap beserta cover image dan tanggal publikasi.
13. **Galeri (Dinamis)**: Grid dokumentasi foto-foto kegiatan desa dari database.

### Admin Panel (Hanya untuk 3 Modul Utama)
1. **Login Admin**: Autentikasi aman untuk masuk ke halaman pengelola.
2. **Dashboard Admin**: Ringkasan jumlah data berita, UMKM, dan galeri yang terdaftar.
3. **Manajemen Berita/Aktivitas**: Operasi CRUD (Create, Read, Update, Delete) berita desa beserta status draft/published/archived, kategori, dan upload cover image.
4. **Manajemen Potensi UMKM**: Operasi CRUD data UMKM beserta status active/inactive/archived, upload foto, dan link kontak pemilik.
5. **Manajemen Galeri**: Upload foto dokumentasi baru, edit judul/deskripsi/status, dan hapus foto.
6. **Logout**: Menghapus session admin secara aman.

### Backend & Database
1. **Database Supabase PostgreSQL** (hanya tabel yang diperlukan).
2. **Supabase Auth** untuk login admin.
3. **Supabase Storage** (Bucket `public-assets`) untuk penyimpanan media/gambar.
4. **Row Level Security (RLS)** untuk mengamankan data dari akses tulis yang tidak sah.
5. **API Routes / Server Actions** di Next.js untuk mutasi data.
6. **Next.js Proxy / Middleware** untuk proteksi halaman admin.

## 4.2 Out of Scope
1. Fitur interaktif pengunjung (komentar, rating, forum diskusi).
2. Transaksi/pembayaran online di dalam website.
3. Sistem persuratan online / pelayanan dokumen online (semua informasi layanan/prosedur diletakkan statis di kode program).
4. Manajemen akun perangkat desa kompleks (cukup satu akun admin utama).
5. Pengaturan website (site settings), nama desa, koordinat peta, dan detail sejarah yang dinamis dari dashboard admin (semuanya di-hardcode secara statis).

---

# 5. Tech Stack

## 5.1 Frontend
* Next.js App Router (React)
* Tailwind CSS
* TypeScript
* React Hook Form & Zod (Validasi form)
* Lucide React (Icons)

## 5.2 Backend
* Supabase PostgreSQL
* Supabase Auth
* Supabase Storage
* Next.js Server Actions (untuk CRUD admin)

## 5.3 Hosting & Version Control
* Vercel (Hosting)
* Git & GitHub (Repository)

---

# 6. Arsitektur Sistem

## 6.1 Aliran Akses Pengunjung (Public)
```txt
Pengunjung -> Website Publik Next.js
                  ↓
       Halaman Dinamis? (Berita, UMKM, Galeri)
                  ↓
       Supabase (Query Select dengan filter status = published/active)
```

## 6.2 Aliran Akses Admin (Protected)
```txt
Admin -> Login -> Dashboard Admin
                     ↓
          Server Actions (Next.js)
                     ↓
          Validasi Session & RLS (Supabase)
                     ↓
          CRUD Database & Storage
```

---

# 7. Struktur Halaman Website

## 7.1 Halaman Publik
* `/` (Landing Page)
* `/profil` (Profil Desa - Statis)
* `/sejarah` (Sejarah Desa - Statis)
* `/visi-misi` (Visi & Misi - Statis)
* `/struktur-desa` (Struktur Pemerintahan - Statis)
* `/data-desa` (Statistik Kependudukan - Statis)
* `/peta` (Peta Wilayah - Statis)
* `/kontak` (Kontak & Alamat - Statis)
* `/berita` (Daftar Berita - Dinamis)
* `/berita/[slug]` (Detail Berita - Dinamis)
* `/umkm` (Daftar UMKM - Dinamis)
* `/umkm/[slug]` (Detail UMKM - Dinamis)
* `/galeri` (Galeri Dokumentasi - Dinamis)

## 7.2 Halaman Admin
* `/admin/login` (Halaman Login)
* `/admin/dashboard` (Ringkasan Statistik Konten)
* `/admin/berita` (Daftar Berita)
* `/admin/berita/tambah` (Tambah Berita Baru)
* `/admin/berita/edit/[id]` (Edit Berita)
* `/admin/umkm` (Daftar UMKM)
* `/admin/umkm/tambah` (Tambah UMKM Baru)
* `/admin/umkm/edit/[id]` (Edit UMKM)
* `/admin/galeri` (Daftar Foto Galeri)
* `/admin/galeri/tambah` (Upload Foto Baru)
* `/admin/galeri/edit/[id]` (Edit Data Foto Galeri)

---

# 8. Role dan Permission

## 8.1 Role: `admin`
Dibuat secara manual melalui dasbor Supabase. Memiliki akses penuh terhadap panel admin untuk mengelola Berita, UMKM, dan Galeri.

## 8.2 Role: `public` (Pengunjung)
Hanya dapat membaca data yang sudah dipublikasikan (`status = 'published'` atau `status = 'active'`). Tidak memiliki hak untuk melakukan mutasi data (insert, update, delete).

---

# 9. Database Design

Database hanya menggunakan 6 tabel utama:

## 9.1 Tabel `profiles`
Menyimpan data profil pengguna admin yang terhubung langsung dengan `auth.users` Supabase.
```sql
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  role text not null default 'admin',
  avatar_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
```

## 9.2 Tabel `news_categories`
Kategori opsional untuk berita.
```sql
create table public.news_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
```

## 9.3 Tabel `news`
Menyimpan berita dan kegiatan desa.
```sql
create table public.news (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references public.news_categories(id) on delete set null,
  title text not null,
  slug text not null unique,
  excerpt text,
  content text not null,
  cover_image_url text,
  status text not null default 'draft', -- draft | published | archived
  published_at timestamptz,
  author_id uuid references public.profiles(id) on delete set null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
```

## 9.4 Tabel `umkm_categories`
Kategori opsional untuk jenis UMKM.
```sql
create table public.umkm_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
```

## 9.5 Tabel `umkm`
Menyimpan data pelaku UMKM desa.
```sql
create table public.umkm (
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
  status text not null default 'active', -- active | inactive | archived
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
```

## 9.6 Tabel `gallery`
Menyimpan foto dokumentasi desa.
```sql
create table public.gallery (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  image_url text not null,
  category text,
  status text not null default 'published', -- draft | published | archived
  sort_order int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
```

---

# 10. Supabase Storage Design

## 10.1 Nama Bucket
```txt
public-assets
```

## 10.2 Struktur Folder
Penyimpanan media dipisahkan berdasarkan folder modul:
* `public-assets/news/` (Cover berita/aktivitas)
* `public-assets/umkm/` (Foto UMKM dan produk)
* `public-assets/gallery/` (Foto dokumentasi galeri)

## 10.3 Aturan Upload
* Format file: `.jpg`, `.jpeg`, `.png`, `.webp`
* Ukuran maksimal: 2 MB per file
* Nama file diubah secara otomatis menggunakan format: `timestamp-random_suffix.extension`

---

# 11. Row Level Security (RLS)

Semua tabel wajib mengaktifkan RLS:
```sql
alter table public.profiles enable row level security;
alter table public.news_categories enable row level security;
alter table public.news enable row level security;
alter table public.umkm_categories enable row level security;
alter table public.umkm enable row level security;
alter table public.gallery enable row level security;
```

## 11.1 Helper Function `is_admin`
```sql
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
    and role = 'admin'
  );
$$;
```

## 11.2 Kebijakan Akses (Policies)

### Tabel `profiles`
* Select: Pengguna hanya dapat membaca profil milik mereka sendiri atau jika pengguna adalah admin.
* Insert/Update/Delete: Hanya dapat dilakukan oleh admin atau sistem.

### Tabel `news`, `news_categories`, `umkm`, `umkm_categories`, `gallery`
* **Select (Public/All)**:
  * `news`: Hanya bisa dibaca jika `status = 'published'`.
  * `umkm`: Hanya bisa dibaca jika `status = 'active'`.
  * `gallery`: Hanya bisa dibaca jika `status = 'published'`.
* **All (Admin)**:
  * Diizinkan untuk melakukan insert, update, dan delete jika `public.is_admin()` mengembalikan nilai `true`.

---

# 12. Authentication

1. **Metode**: Email dan Password via Supabase Auth.
2. **Registrasi**: Registrasi ditutup pada frontend publik. Akun admin dibuat secara manual oleh pengembang melalui Supabase Dashboard, kemudian data profil dimasukkan ke tabel `public.profiles` dengan status role `admin`.
3. **Route Protection**: Next.js Proxy/Middleware melindungi semua rute `/admin/*` kecuali `/admin/login`. Jika pengguna belum terautentikasi atau bukan admin, sistem akan mengarahkan pengguna kembali ke `/admin/login`.

---

# 13. Validasi Data

Validasi data menggunakan library **Zod** pada Server Actions:

## 13.1 Berita/Aktivitas (`news.ts`)
* `title`: wajib, minimal 5 karakter.
* `slug`: wajib, dibuat otomatis dari judul, harus unik.
* `content`: wajib, minimal 20 karakter.
* `cover_image_url`: opsional (format url valid).
* `category_id`: opsional.
* `status`: `draft` | `published` | `archived`.

## 13.2 Potensi UMKM (`umkm.ts`)
* `name`: wajib, minimal 3 karakter.
* `slug`: wajib, dibuat otomatis, harus unik.
* `owner_name`: opsional.
* `whatsapp`: opsional (nomor telepon valid).
* `image_url`: opsional.
* `status`: `active` | `inactive` | `archived`.

## 13.3 Galeri (`gallery.ts`)
* `title`: wajib.
* `image_url`: wajib.
* `status`: `draft` | `published` | `archived`.

---

# 14. Slug System

1. Slug dibuat otomatis dari judul/nama konten menggunakan fungsi pembuat slug (slugify) di sisi server.
2. Slug berupa huruf kecil semua, spasi diganti dengan tanda hubung (`-`), dan karakter khusus dihapus.
3. Untuk menjaga keunikan, jika slug sudah ada di database, sistem secara otomatis akan menambahkan angka numerik di belakang slug (misal: `berita-desa-1`).

---

# 15. UX Admin Panel Requirements
* **Form Sederhana**: Input yang mudah dipahami dengan pesan validasi yang jelas.
* **Loading States**: Indikator loading saat melakukan upload gambar dan submit form.
* **Confirmation Modals**: Dialog konfirmasi sebelum menghapus item berita, UMKM, atau galeri.
* **Image Previews**: Menampilkan pratinjau gambar yang dipilih sebelum disimpan ke storage.

---

# 16. File Structure Next.js

```txt
src/
├── app/
│   ├── (public)/
│   │   ├── page.tsx (Landing Page)
│   │   ├── profil/
│   │   │   └── page.tsx (Profil - Statis)
│   │   ├── sejarah/
│   │   │   └── page.tsx (Sejarah - Statis)
│   │   ├── visi-misi/
│   │   │   └── page.tsx (Visi Misi - Statis)
│   │   ├── struktur-desa/
│   │   │   └── page.tsx (Struktur Pemerintahan - Statis)
│   │   ├── data-desa/
│   │   │   └── page.tsx (Statistik - Statis)
│   │   ├── peta/
│   │   │   └── page.tsx (Peta - Statis)
│   │   ├── kontak/
│   │   │   └── page.tsx (Kontak - Statis)
│   │   ├── berita/
│   │   │   ├── page.tsx (Daftar Berita)
│   │   │   └── [slug]/
│   │   │       └── page.tsx (Detail Berita)
│   │   ├── umkm/
│   │   │   ├── page.tsx (Daftar UMKM)
│   │   │   └── [slug]/
│   │   │       └── page.tsx (Detail UMKM)
│   │   └── galeri/
│   │       └── page.tsx (Grid Galeri)
│   │
│   ├── admin/
│   │   ├── login/
│   │   │   └── page.tsx (Halaman Login Admin)
│   │   ├── dashboard/
│   │   │   └── page.tsx (Dashboard Home)
│   │   ├── berita/
│   │   │   ├── page.tsx (Daftar Berita Admin)
│   │   │   ├── tambah/
│   │   │   │   └── page.tsx (Form Tambah Berita)
│   │   │   └── edit/[id]/
│   │   │       └── page.tsx (Form Edit Berita)
│   │   ├── umkm/
│   │   │   ├── page.tsx (Daftar UMKM Admin)
│   │   │   ├── tambah/
│   │   │   │   └── page.tsx (Form Tambah UMKM)
│   │   │   └── edit/[id]/
│   │   │       └── page.tsx (Form Edit UMKM)
│   │   └── galeri/
│   │       ├── page.tsx (Daftar Galeri Admin)
│   │       ├── tambah/
│   │       │   └── page.tsx (Form Upload Galeri)
│   │       └── edit/[id]/
│   │           └── page.tsx (Form Edit Galeri)
│   │
│   └── layout.tsx
│
├── components/
│   ├── public/ (Komponen halaman publik)
│   ├── admin/ (Sidebar, Header, Layout Admin)
│   └── ui/ (Button, Input, Card, Modal, dll)
│
├── lib/
│   ├── supabase/
│   │   ├── client.ts
│   │   ├── server.ts
│   │   └── middleware.ts
│   ├── validations/
│   │   ├── news.ts
│   │   ├── umkm.ts
│   │   └── gallery.ts
│   ├── actions/
│   │   ├── news.actions.ts
│   │   ├── umkm.actions.ts
│   │   └── gallery.actions.ts
│   └── utils/
│       ├── slugify.ts
│       ├── upload.ts
│       └── format-date.ts
│
├── types/
│   ├── database.types.ts
│   ├── news.ts
│   ├── umkm.ts
│   └── common.ts
│
└── proxy.ts (Next.js 16 Proxy / Middleware)
```

---

# 17. Environment Variables

Berkas `.env.local` lokal hanya berisi:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

---

# 18. Functional Requirements (FR)

* **FR-001: Login Admin**: Admin dapat login menggunakan email dan password untuk masuk ke dashboard `/admin/dashboard`.
* **FR-002: Logout Admin**: Admin dapat menghapus session secara aman dan kembali ke halaman login.
* **FR-003: Dashboard Admin**: Admin dapat melihat ringkasan statistik (jumlah berita, UMKM, dan galeri yang aktif).
* **FR-004: CRUD Berita/Aktivitas**: Admin dapat membuat, membaca daftar, mengedit, dan menghapus data berita beserta pengaturan status (draft/published/archived) dan kategori.
* **FR-005: CRUD Potensi UMKM**: Admin dapat mengelola profil UMKM lokal beserta kontak WhatsApp pemilik, deskripsi, foto produk, dan status aktif.
* **FR-006: CRUD Galeri**: Admin dapat mengupload foto baru beserta judul, deskripsi, dan status publikasi.
* **FR-007: Upload Gambar**: Sistem dapat menerima dan memvalidasi file gambar sebelum menyimpannya ke folder storage yang sesuai di Supabase.
* **FR-008: Public Read Berita**: Pengunjung dapat melihat berita yang statusnya `published`.
* **FR-009: Public Read UMKM**: Pengunjung dapat melihat profil UMKM yang statusnya `active`.
* **FR-010: Public Read Galeri**: Pengunjung dapat melihat dokumentasi foto yang statusnya `published`.

---

# 19. Non-Functional Requirements (NFR)

* **Security**: RLS aktif di semua tabel Supabase. Session admin diamankan oleh cookie JWT. Hanya admin terautentikasi yang dapat menulis data ke Supabase.
* **Maintainability**: Struktur file dipisahkan dengan bersih berdasarkan modul. Logika validasi dikonsolidasikan di bawah Zod.
* **Performance**: Halaman statis dikompilasi secara efisien saat build. Gambar yang disajikan dari storage harus dioptimalkan.
* **Usability**: Antarmuka dashboard admin yang bersih dengan UI/UX fungsional dasar dan responsif.

---

# 20. Phase Development Plan

## PHASE 0 — Preparation
* Finalisasi menu dan tata letak dasar website.
* Kumpulkan data statis desa (Profil, Sejarah, Visi Misi, Struktur Pemerintahan, Data Kependudukan, Kontak).
* Kumpulkan contoh data berita awal, UMKM, dan galeri untuk pengujian.
* Tentukan email akun admin utama desa.

## PHASE 1 — Project Setup
* Inisialisasi project Next.js.
* Konfigurasi Tailwind CSS dan ESLint.
* Instalasi dependensi Supabase.
* Konfigurasi variabel lingkungan `.env.local` lokal.

## PHASE 2 — Database Foundation
* Buat tabel di Supabase: `profiles`, `news_categories`, `news`, `umkm_categories`, `umkm`, dan `gallery`.
* Aktifkan Row Level Security (RLS) di semua tabel.
* Buat fungsi pembantu `is_admin`.
* Definisikan policy akses publik dan akses tulis untuk admin.
* Seed kategori default awal (berita dan UMKM).

## PHASE 3 — Authentication
* Buat utilitas Supabase client dan server (`@supabase/ssr`).
* Terapkan fungsionalitas login dan logout admin.
* Konfigurasi proxy/middleware untuk memproteksi direktori `/admin/*`.

## PHASE 4 — Storage
* Buat bucket `public-assets` di Supabase Storage.
* Setup struktur folder: `news/`, `umkm/`, `gallery/`.
* Tulis fungsi utilitas upload dan validasi berkas gambar (tipe dan ukuran file).

## PHASE 5 — CRUD Berita/Aktivitas
* Terapkan form tambah dan edit berita lengkap dengan upload cover.
* Tulis server action CRUD berita.
* Buat halaman daftar berita untuk admin.
* Buat halaman daftar berita publik dan detail berita dinamis berbasis slug.

## PHASE 6 — CRUD Potensi UMKM
* Terapkan form tambah dan edit profil UMKM serta upload foto produk.
* Tulis server action CRUD UMKM.
* Buat halaman daftar UMKM untuk admin.
* Buat halaman daftar UMKM publik dan detail UMKM dinamis berbasis slug.

## PHASE 7 — CRUD Galeri
* Terapkan form upload galeri foto baru.
* Tulis server action CRUD galeri.
* Buat halaman daftar galeri untuk admin.
* Buat grid galeri publik yang menampilkan foto aktif.

## PHASE 8 — Static Public Pages
* Buat Landing Page publik statis dengan komponen highlight dasar.
* Tulis halaman statis: Profil, Sejarah, Visi-Misi, Struktur Pemerintahan, Data Desa, Peta (Embed), dan Kontak.
* Hubungkan tautan statis ke menu navigasi (Header/Footer).

## PHASE 9 — Testing
* Pengujian sistem autentikasi dan otorisasi admin.
* Uji keamanan RLS untuk memastikan data draft tidak dapat diakses publik.
* Uji alur CRUD dan fungsionalitas upload gambar di setiap modul.
* Uji kompatibilitas tampilan responsif di halaman publik dan admin.

## PHASE 10 — Deployment & Handover
* Hubungkan repository GitHub dan deploy ke Vercel.
* Buat akun admin desa resmi pada lingkungan production.
* Dokumentasikan panduan singkat penggunaan dasbor admin untuk perangkat desa (tambah berita, UMKM, upload galeri).

---

# 21. MVP Definition

## 21.1 MVP Wajib Jadi
* Halaman Publik Dasar (Landing page, Profil, Sejarah, Visi Misi, Struktur Desa, Data Desa, Peta, Kontak, Berita, UMKM, Galeri).
* Dashboard Admin & Autentikasi Login/Logout.
* CRUD Berita, UMKM, dan Galeri.
* Fitur upload gambar yang terintegrasi Supabase Storage.
* Keamanan RLS Supabase aktif.
* Berhasil dideploy ke Vercel.

## 21.2 MVP Tidak Mencakup
* Form admin untuk mengedit Profil, Sejarah, Visi Misi, Struktur Desa, Peta, Kontak, dan Site Settings (semua item ini diedit langsung di kode program).

---

# 22. Kesimpulan

Website profil desa Karangtalun ini dirancang dengan backend sesederhana mungkin dengan membatasi sistem dinamis hanya pada 3 modul utama: Berita/Aktivitas, UMKM, dan Galeri. Halaman informasi profil lainnya bersifat statis dan langsung dikelola melalui editor kode Next.js. Pendekatan ini membuat website lebih ringan, aman, mudah dikembangkan oleh tim KKN, dan mudah dirawat oleh perangkat desa setempat tanpa kompleksitas database yang besar.
