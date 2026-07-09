import Image from "next/image";
import Link from "next/link";
import { Pencil } from "lucide-react";
import { PageHeading } from "@/components/admin/page-heading";
import { ProtectedAdmin } from "@/components/admin/protected-admin";
import { DeleteButton } from "@/components/ui/delete-button";
import { ErrorMessage } from "@/components/ui/error-message";
import { StatusBadge } from "@/components/ui/status-badge";
import { deleteGalleryAction } from "@/lib/actions/gallery.actions";
import { getAdminGallery } from "@/lib/data";

type PageProps = {
  searchParams?: Promise<{ error?: string }>;
};

export default async function AdminGalleryPage({ searchParams }: PageProps) {
  const [items, params] = await Promise.all([getAdminGallery(), searchParams]);

  return (
    <ProtectedAdmin>
      <PageHeading
        title="Manajemen Galeri"
        description="Upload dan kelola dokumentasi foto kegiatan serta lanskap Dusun Karangtalun."
        actionHref="/admin/galeri/tambah"
        actionLabel="Upload Foto"
      />
      {params?.error && (
        <div className="mb-6">
          <ErrorMessage message={params.error} />
        </div>
      )}

      {items.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <article
              key={item.id}
              className="group overflow-hidden rounded-[20px] border transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(7,57,51,0.09)]"
              style={{
                background: "#fffdf7",
                borderColor: "rgba(28,43,36,0.10)",
                boxShadow: "0 6px 24px rgba(7,57,51,0.05)",
              }}
            >
              {/* Thumbnail */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[#f6f2e8]">
                <Image
                  src={item.image_url}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Card body */}
              <div className="p-5 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="truncate font-semibold text-[#1c2b24]">
                      {item.title}
                    </h3>
                    <p className="mt-0.5 text-[11px] font-extrabold uppercase tracking-[1.5px] text-[#8b968f]">
                      {item.category ?? "Tanpa kategori"}
                    </p>
                  </div>
                  <StatusBadge status={item.status} />
                </div>
                {item.description && (
                  <p className="line-clamp-2 text-sm leading-relaxed text-[#66746d]">
                    {item.description}
                  </p>
                )}
                <div className="flex justify-end gap-2 pt-1 border-t" style={{ borderColor: "rgba(28,43,36,0.08)" }}>
                  <Link
                    href={`/admin/galeri/edit/${item.id}`}
                    className="inline-flex min-h-[34px] items-center gap-1.5 rounded-full border px-3.5 text-[11px] font-extrabold uppercase tracking-[1.3px] transition-all duration-200 hover:-translate-y-0.5"
                    style={{
                      borderColor: "rgba(28,43,36,0.15)",
                      color: "#1c2b24",
                      background: "#f6f2e8",
                    }}
                  >
                    <Pencil className="h-3 w-3" aria-hidden="true" />
                    Edit
                  </Link>
                  <form action={deleteGalleryAction.bind(null, item.id)}>
                    <DeleteButton />
                  </form>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div
          className="rounded-[20px] border px-6 py-16 text-center"
          style={{ background: "#fffdf7", borderColor: "rgba(28,43,36,0.10)" }}
        >
          <p className="text-sm text-[#8b968f]">
            Belum ada foto galeri. Klik &ldquo;Upload Foto&rdquo; untuk menambahkan.
          </p>
        </div>
      )}
    </ProtectedAdmin>
  );
}
