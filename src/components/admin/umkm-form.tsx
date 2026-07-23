"use client";

import Link from "next/link";
import { useActionState } from "react";
import { ImageInput } from "@/components/ui/image-input";
import { ErrorMessage } from "@/components/ui/error-message";
import { describedBy, FieldShell } from "@/components/ui/form-field";
import { SubmitButton } from "@/components/ui/submit-button";
import { initialUmkmState } from "@/lib/action-states";
import type { Category, Umkm } from "@/types/content";

type UmkmFormAction = (
  state: typeof initialUmkmState,
  formData: FormData,
) => Promise<typeof initialUmkmState>;

type UmkmFormProps = {
  action: UmkmFormAction;
  categories: Category[];
  umkm?: Umkm;
};

const borderColor = "rgba(28,43,36,0.14)";
const inputClass =
  "min-h-[44px] w-full rounded-xl border px-4 text-sm outline-none transition-colors bg-[#f6f2e8] text-[#1c2b24] placeholder:text-[#8b968f] focus:border-[#073933] focus:bg-[#fffdf7] aria-invalid:border-red-400";
const textareaClass =
  "w-full rounded-xl border px-4 py-3 text-sm leading-6 outline-none transition-colors bg-[#f6f2e8] text-[#1c2b24] placeholder:text-[#8b968f] focus:border-[#073933] focus:bg-[#fffdf7] aria-invalid:border-red-400";

export function UmkmForm({ action, categories, umkm }: UmkmFormProps) {
  const [state, formAction] = useActionState(action, {
    ...initialUmkmState,
    values: {
      name: umkm?.name ?? "",
      owner_name: umkm?.owner_name ?? null,
      description: umkm?.description ?? null,
      product_description: umkm?.product_description ?? null,
      address: umkm?.address ?? null,
      phone: umkm?.phone ?? null,
      whatsapp: umkm?.whatsapp ?? null,
      instagram_url: umkm?.instagram_url ?? null,
      map_url: umkm?.map_url ?? null,
      category_id: umkm?.category_id ?? null,
      status: umkm?.status ?? "active",
    },
  });

  const value = (key: keyof typeof initialUmkmState.values, fallback = "") => {
    const stateValue = state.values[key];
    return typeof stateValue === "string" ? stateValue : fallback;
  };

  return (
    <form
      action={formAction}
      className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]"
      noValidate
    >
      {/* Main content */}
      <div
        className="space-y-6 rounded-[20px] border p-7"
        style={{ background: "#fffdf7", borderColor }}
      >
        <ErrorMessage message={state.message} />

        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            name="name"
            label="Nama UMKM"
            help="Minimal 3 karakter, maksimal 120 karakter."
            defaultValue={value("name", umkm?.name ?? "")}
            error={state.fieldErrors.name?.[0]}
            minLength={3}
            maxLength={120}
            inputClass={inputClass}
            borderColor={borderColor}
          />
          <Field
            name="owner_name"
            label="Nama Pemilik"
            help="Opsional. Maksimal 120 karakter."
            defaultValue={value("owner_name", umkm?.owner_name ?? "")}
            error={state.fieldErrors.owner_name?.[0]}
            maxLength={120}
            inputClass={inputClass}
            borderColor={borderColor}
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            name="phone"
            label="Telepon"
            help="Opsional. Maks. 30 karakter."
            defaultValue={value("phone", umkm?.phone ?? "")}
            error={state.fieldErrors.phone?.[0]}
            type="tel"
            maxLength={30}
            inputClass={inputClass}
            borderColor={borderColor}
          />
          <Field
            name="whatsapp"
            label="WhatsApp"
            help="Opsional. Contoh: 6281234567890."
            defaultValue={value("whatsapp", umkm?.whatsapp ?? "")}
            error={state.fieldErrors.whatsapp?.[0]}
            type="tel"
            maxLength={30}
            inputClass={inputClass}
            borderColor={borderColor}
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            name="instagram_url"
            label="URL Instagram"
            help="Opsional. Contoh: https://instagram.com/namausaha."
            defaultValue={value("instagram_url", umkm?.instagram_url ?? "")}
            error={state.fieldErrors.instagram_url?.[0]}
            type="url"
            inputClass={inputClass}
            borderColor={borderColor}
          />
          <Field
            name="map_url"
            label="URL Google Maps"
            help="Opsional. Link lengkap dari Google Maps."
            defaultValue={value("map_url", umkm?.map_url ?? "")}
            error={state.fieldErrors.map_url?.[0]}
            type="url"
            inputClass={inputClass}
            borderColor={borderColor}
          />
        </div>

        <TextArea
          name="address"
          label="Alamat"
          help="Opsional. Maksimal 300 karakter."
          defaultValue={value("address", umkm?.address ?? "")}
          error={state.fieldErrors.address?.[0]}
          rows={3}
          maxLength={300}
          textareaClass={textareaClass}
          borderColor={borderColor}
        />
        <TextArea
          name="description"
          label="Deskripsi UMKM"
          help="Opsional. Ceritakan profil usaha, maksimal 1.200 karakter."
          defaultValue={value("description", umkm?.description ?? "")}
          error={state.fieldErrors.description?.[0]}
          rows={5}
          maxLength={1200}
          textareaClass={textareaClass}
          borderColor={borderColor}
        />
        <TextArea
          name="product_description"
          label="Deskripsi Produk"
          help="Opsional. Jelaskan produk atau layanan utama, maksimal 1.200 karakter."
          defaultValue={value("product_description", umkm?.product_description ?? "")}
          error={state.fieldErrors.product_description?.[0]}
          rows={5}
          maxLength={1200}
          textareaClass={textareaClass}
          borderColor={borderColor}
        />
      </div>

      {/* Sidebar */}
      <aside className="space-y-6">
        <div
          className="rounded-[20px] border p-6"
          style={{ background: "#fffdf7", borderColor }}
        >
          <ImageInput
            name="image"
            label="Foto UMKM/Produk"
            currentUrl={umkm?.image_url}
            error={state.fieldErrors.image?.[0]}
          />
        </div>

        <div
          className="space-y-5 rounded-[20px] border p-6"
          style={{ background: "#fffdf7", borderColor }}
        >
          <FieldShell
            id="category_id"
            label="Kategori"
            help="Opsional."
            error={state.fieldErrors.category_id?.[0]}
          >
            <select
              id="category_id"
              name="category_id"
              defaultValue={value("category_id", umkm?.category_id ?? "")}
              aria-invalid={Boolean(state.fieldErrors.category_id?.[0])}
              aria-describedby={describedBy("category_id", "Opsional.", state.fieldErrors.category_id?.[0])}
              className={inputClass}
              style={{ borderColor }}
            >
              <option value="">Tanpa kategori</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </FieldShell>

          <FieldShell
            id="status"
            label="Status"
            help="Active tampil di website publik."
            error={state.fieldErrors.status?.[0]}
          >
            <select
              id="status"
              name="status"
              defaultValue={value("status", umkm?.status ?? "active")}
              aria-invalid={Boolean(state.fieldErrors.status?.[0])}
              aria-describedby={describedBy("status", "Active tampil di website publik.", state.fieldErrors.status?.[0])}
              className={inputClass}
              style={{ borderColor }}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="archived">Archived</option>
            </select>
          </FieldShell>
        </div>

        <div className="flex flex-wrap gap-3">
          <SubmitButton>{umkm ? "Simpan Perubahan" : "Simpan UMKM"}</SubmitButton>
          <Link
            href="/admin/umkm"
            className="inline-flex min-h-[44px] items-center justify-center rounded-full border px-5 text-[11px] font-extrabold uppercase tracking-[1.5px] transition-all duration-200 hover:-translate-y-0.5"
            style={{ borderColor, color: "#66746d", background: "#f6f2e8" }}
          >
            Batal
          </Link>
        </div>
      </aside>
    </form>
  );
}

/* ─── Internal sub-components ────────────────────────────────────────────── */

function Field({
  name,
  label,
  help,
  defaultValue,
  error,
  type = "text",
  minLength,
  maxLength,
  inputClass,
  borderColor,
}: {
  name: string;
  label: string;
  help: string;
  defaultValue: string;
  error?: string;
  type?: "text" | "tel" | "url";
  minLength?: number;
  maxLength?: number;
  inputClass: string;
  borderColor: string;
}) {
  return (
    <FieldShell id={name} label={label} help={help} error={error}>
      <input
        id={name}
        name={name}
        type={type}
        defaultValue={defaultValue}
        minLength={minLength}
        maxLength={maxLength}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy(name, help, error)}
        className={inputClass}
        style={{ borderColor }}
      />
    </FieldShell>
  );
}

function TextArea({
  name,
  label,
  help,
  defaultValue,
  error,
  rows,
  maxLength,
  textareaClass,
  borderColor,
}: {
  name: string;
  label: string;
  help: string;
  defaultValue: string;
  error?: string;
  rows: number;
  maxLength: number;
  textareaClass: string;
  borderColor: string;
}) {
  return (
    <FieldShell id={name} label={label} help={help} error={error}>
      <textarea
        id={name}
        name={name}
        defaultValue={defaultValue}
        rows={rows}
        maxLength={maxLength}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy(name, help, error)}
        className={textareaClass}
        style={{ borderColor }}
      />
    </FieldShell>
  );
}
