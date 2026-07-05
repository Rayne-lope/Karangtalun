"use client";

import Link from "next/link";
import { useActionState } from "react";
import { ImageInput } from "@/components/ui/image-input";
import { ErrorMessage } from "@/components/ui/error-message";
import { describedBy, FieldShell } from "@/components/ui/form-field";
import { SubmitButton } from "@/components/ui/submit-button";
import { initialNewsState } from "@/lib/action-states";
import type { Category, News } from "@/types/content";

type NewsFormAction = (
  state: typeof initialNewsState,
  formData: FormData,
) => Promise<typeof initialNewsState>;

type NewsFormProps = {
  action: NewsFormAction;
  categories: Category[];
  news?: News;
};

const inputClass =
  "min-h-[44px] w-full rounded-xl border px-4 text-sm outline-none transition-colors bg-[#f6f2e8] text-[#1c2b24] placeholder:text-[#8b968f] focus:border-[#073933] focus:bg-[#fffdf7] aria-invalid:border-red-400";
const textareaClass =
  "w-full rounded-xl border px-4 py-3 text-sm leading-6 outline-none transition-colors bg-[#f6f2e8] text-[#1c2b24] placeholder:text-[#8b968f] focus:border-[#073933] focus:bg-[#fffdf7] aria-invalid:border-red-400";
const borderColor = "rgba(28,43,36,0.14)";

export function NewsForm({ action, categories, news }: NewsFormProps) {
  const [state, formAction] = useActionState(action, {
    ...initialNewsState,
    values: {
      title: news?.title ?? "",
      excerpt: news?.excerpt ?? null,
      content: news?.content ?? "",
      category_id: news?.category_id ?? null,
      status: news?.status ?? "draft",
    },
  });

  const value = (key: keyof typeof initialNewsState.values, fallback = "") => {
    const stateValue = state.values[key];
    return typeof stateValue === "string" ? stateValue : fallback;
  };

  const titleError = state.fieldErrors.title?.[0];
  const excerptError = state.fieldErrors.excerpt?.[0];
  const contentError = state.fieldErrors.content?.[0];
  const categoryError = state.fieldErrors.category_id?.[0];
  const statusError = state.fieldErrors.status?.[0];
  const coverError = state.fieldErrors.cover_image?.[0];

  return (
    <form
      action={formAction}
      className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]"
      noValidate
    >
      {/* Main content panel */}
      <div
        className="space-y-6 rounded-[20px] border p-7"
        style={{ background: "#fffdf7", borderColor }}
      >
        <ErrorMessage message={state.message} />
        <FieldShell
          id="title"
          label="Judul"
          help="Minimal 5 karakter, maksimal 160 karakter."
          error={titleError}
        >
          <input
            id="title"
            name="title"
            defaultValue={value("title", news?.title ?? "")}
            minLength={5}
            maxLength={160}
            aria-invalid={Boolean(titleError)}
            aria-describedby={describedBy("title", "Minimal 5 karakter, maksimal 160 karakter.", titleError)}
            className={inputClass}
            style={{ borderColor }}
          />
        </FieldShell>
        <FieldShell
          id="excerpt"
          label="Ringkasan"
          help="Opsional. Maksimal 240 karakter."
          error={excerptError}
        >
          <textarea
            id="excerpt"
            name="excerpt"
            defaultValue={value("excerpt", news?.excerpt ?? "")}
            maxLength={240}
            rows={3}
            aria-invalid={Boolean(excerptError)}
            aria-describedby={describedBy("excerpt", "Opsional. Maksimal 240 karakter.", excerptError)}
            className={textareaClass}
            style={{ borderColor }}
          />
        </FieldShell>
        <FieldShell
          id="content"
          label="Konten"
          help="Minimal 20 karakter."
          error={contentError}
        >
          <textarea
            id="content"
            name="content"
            defaultValue={value("content", news?.content ?? "")}
            minLength={20}
            rows={16}
            aria-invalid={Boolean(contentError)}
            aria-describedby={describedBy("content", "Minimal 20 karakter.", contentError)}
            className={textareaClass}
            style={{ borderColor }}
          />
        </FieldShell>
      </div>

      {/* Sidebar panel */}
      <aside className="space-y-6">
        <div
          className="rounded-[20px] border p-6"
          style={{ background: "#fffdf7", borderColor }}
        >
          <ImageInput
            name="cover_image"
            label="Cover Berita"
            currentUrl={news?.cover_image_url}
            error={coverError}
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
            error={categoryError}
          >
            <select
              id="category_id"
              name="category_id"
              defaultValue={value("category_id", news?.category_id ?? "")}
              aria-invalid={Boolean(categoryError)}
              aria-describedby={describedBy("category_id", "Opsional.", categoryError)}
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
            help="Published tampil di website publik."
            error={statusError}
          >
            <select
              id="status"
              name="status"
              defaultValue={value("status", news?.status ?? "draft")}
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
          <SubmitButton>{news ? "Simpan Perubahan" : "Terbitkan Data"}</SubmitButton>
          <Link
            href="/admin/berita"
            className="inline-flex min-h-[42px] items-center justify-center rounded-full border px-5 text-[11px] font-extrabold uppercase tracking-[1.5px] transition-all duration-200 hover:-translate-y-0.5"
            style={{
              borderColor,
              color: "#66746d",
              background: "#f6f2e8",
            }}
          >
            Batal
          </Link>
        </div>
      </aside>
    </form>
  );
}
