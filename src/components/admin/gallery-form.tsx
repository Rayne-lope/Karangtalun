"use client";

import Link from "next/link";
import { useActionState } from "react";
import { ImageInput } from "@/components/ui/image-input";
import { ErrorMessage } from "@/components/ui/error-message";
import { describedBy, FieldShell } from "@/components/ui/form-field";
import { SubmitButton } from "@/components/ui/submit-button";
import { initialGalleryState } from "@/lib/action-states";
import type { GalleryItem } from "@/types/content";

type GalleryFormAction = (
  state: typeof initialGalleryState,
  formData: FormData,
) => Promise<typeof initialGalleryState>;

type GalleryFormProps = {
  action: GalleryFormAction;
  item?: GalleryItem;
};

const borderColor = "rgba(28,43,36,0.14)";
const inputClass =
  "min-h-[44px] w-full rounded-xl border px-4 text-sm outline-none transition-colors bg-[#f6f2e8] text-[#1c2b24] placeholder:text-[#8b968f] focus:border-[#073933] focus:bg-[#fffdf7] aria-invalid:border-red-400";
const textareaClass =
  "w-full rounded-xl border px-4 py-3 text-sm leading-6 outline-none transition-colors bg-[#f6f2e8] text-[#1c2b24] placeholder:text-[#8b968f] focus:border-[#073933] focus:bg-[#fffdf7] aria-invalid:border-red-400";

export function GalleryForm({ action, item }: GalleryFormProps) {
  const [state, formAction] = useActionState(action, {
    ...initialGalleryState,
    values: {
      title: item?.title ?? "",
      description: item?.description ?? null,
      category: item?.category ?? null,
      sort_order: item?.sort_order ?? 0,
      status: item?.status ?? "published",
    },
  });

  const value = (key: keyof typeof initialGalleryState.values, fallback = "") => {
    const stateValue = state.values[key];
    return typeof stateValue === "number"
      ? String(stateValue)
      : typeof stateValue === "string"
        ? stateValue
        : fallback;
  };

  const titleError = state.fieldErrors.title?.[0];
  const descriptionError = state.fieldErrors.description?.[0];
  const categoryError = state.fieldErrors.category?.[0];
  const sortOrderError = state.fieldErrors.sort_order?.[0];
  const statusError = state.fieldErrors.status?.[0];
  const imageError = state.fieldErrors.image?.[0];

  return (
    <form
      action={formAction}
      className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]"
      noValidate
    >
      {/* Main panel */}
      <div
        className="space-y-6 rounded-[20px] border p-7"
        style={{ background: "#fffdf7", borderColor }}
      >
        <ErrorMessage message={state.message} />

        <FieldShell id="title" label="Judul" help="Wajib diisi. Maksimal 120 karakter." error={titleError}>
          <input
            id="title"
            name="title"
            defaultValue={value("title", item?.title ?? "")}
            maxLength={120}
            aria-invalid={Boolean(titleError)}
            aria-describedby={describedBy("title", "Wajib diisi. Maksimal 120 karakter.", titleError)}
            className={inputClass}
            style={{ borderColor }}
          />
        </FieldShell>

        <FieldShell id="description" label="Deskripsi" help="Opsional. Maksimal 600 karakter." error={descriptionError}>
          <textarea
            id="description"
            name="description"
            defaultValue={value("description", item?.description ?? "")}
            rows={6}
            maxLength={600}
            aria-invalid={Boolean(descriptionError)}
            aria-describedby={describedBy("description", "Opsional. Maksimal 600 karakter.", descriptionError)}
            className={textareaClass}
            style={{ borderColor }}
          />
        </FieldShell>

        <div className="grid gap-5 sm:grid-cols-2">
          <FieldShell id="category" label="Kategori" help="Opsional. Maksimal 80 karakter." error={categoryError}>
            <input
              id="category"
              name="category"
              defaultValue={value("category", item?.category ?? "")}
              maxLength={80}
              aria-invalid={Boolean(categoryError)}
              aria-describedby={describedBy("category", "Opsional. Maksimal 80 karakter.", categoryError)}
              className={inputClass}
              style={{ borderColor }}
            />
          </FieldShell>
          <FieldShell id="sort_order" label="Urutan Tampil" help="Lebih kecil tampil lebih awal." error={sortOrderError}>
            <input
              id="sort_order"
              name="sort_order"
              type="number"
              step={1}
              defaultValue={value("sort_order", String(item?.sort_order ?? 0))}
              aria-invalid={Boolean(sortOrderError)}
              aria-describedby={describedBy("sort_order", "Lebih kecil tampil lebih awal.", sortOrderError)}
              className={inputClass}
              style={{ borderColor }}
            />
          </FieldShell>
        </div>
      </div>

      {/* Sidebar */}
      <aside className="space-y-6">
        <div
          className="rounded-[20px] border p-6"
          style={{ background: "#fffdf7", borderColor }}
        >
          <ImageInput
            name="image"
            label="Foto Galeri"
            currentUrl={item?.image_url}
            required={!item}
            error={imageError}
          />
        </div>

        <div
          className="rounded-[20px] border p-6"
          style={{ background: "#fffdf7", borderColor }}
        >
          <FieldShell
            id="status"
            label="Status"
            help="Published tampil di website publik."
            error={statusError}
          >
            <select
              id="status"
              name="status"
              defaultValue={value("status", item?.status ?? "published")}
              aria-invalid={Boolean(statusError)}
              aria-describedby={describedBy("status", "Published tampil di website publik.", statusError)}
              className={inputClass}
              style={{ borderColor }}
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </FieldShell>
        </div>

        <div className="flex flex-wrap gap-3">
          <SubmitButton>{item ? "Simpan Perubahan" : "Upload Foto"}</SubmitButton>
          <Link
            href="/admin/galeri"
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
