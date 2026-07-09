import Link from "next/link";
import { Pencil } from "lucide-react";
import { DeleteButton } from "@/components/ui/delete-button";
import { ErrorMessage } from "@/components/ui/error-message";
import { StatusBadge } from "@/components/ui/status-badge";
import { PageHeading } from "@/components/admin/page-heading";
import { ProtectedAdmin } from "@/components/admin/protected-admin";
import { deleteNewsAction } from "@/lib/actions/news.actions";
import { getAdminNews } from "@/lib/data";
import { formatDate } from "@/lib/utils/format-date";

type PageProps = {
  searchParams?: Promise<{ error?: string }>;
};

const tableStyle = {
  background: "#fffdf7",
  borderColor: "rgba(28,43,36,0.10)",
};

export default async function AdminNewsPage({ searchParams }: PageProps) {
  const [items, params] = await Promise.all([getAdminNews(), searchParams]);

  return (
    <ProtectedAdmin>
      <PageHeading
        title="Manajemen Berita"
        description="Kelola berita dan aktivitas dusun — termasuk draft, publikasi, dan arsip."
        actionHref="/admin/berita/tambah"
        actionLabel="Tambah Berita"
      />
      {params?.error && (
        <div className="mb-6">
          <ErrorMessage message={params.error} />
        </div>
      )}
      <div
        className="overflow-hidden rounded-[20px] border"
        style={tableStyle}
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr
                className="border-b text-[10px] font-extrabold uppercase tracking-[1.8px]"
                style={{
                  background: "#f6f2e8",
                  borderColor: "rgba(28,43,36,0.10)",
                  color: "#8b968f",
                }}
              >
                <th className="px-6 py-4">Judul</th>
                <th className="px-6 py-4">Kategori</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Tanggal</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, i) => (
                <tr
                  key={item.id}
                  className="border-b transition-colors hover:bg-[#f6f2e8]/60"
                  style={{
                    borderColor: i === items.length - 1 ? "transparent" : "rgba(28,43,36,0.07)",
                  }}
                >
                  <td className="px-6 py-4 font-semibold text-[#1c2b24]">
                    {item.title}
                  </td>
                  <td className="px-6 py-4 text-sm text-[#66746d]">
                    {item.news_categories?.name ?? "—"}
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={item.status} />
                  </td>
                  <td className="px-6 py-4 text-sm text-[#8b968f]">
                    {formatDate(item.published_at ?? item.created_at)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/admin/berita/edit/${item.id}`}
                        className="inline-flex min-h-[36px] items-center gap-1.5 rounded-full border px-3.5 text-[11px] font-extrabold uppercase tracking-[1.3px] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm"
                        style={{
                          borderColor: "rgba(28,43,36,0.15)",
                          color: "#1c2b24",
                          background: "#f6f2e8",
                        }}
                      >
                        <Pencil className="h-3 w-3" aria-hidden="true" />
                        Edit
                      </Link>
                      <form action={deleteNewsAction.bind(null, item.id)}>
                        <DeleteButton />
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-14 text-center text-sm"
                    style={{ color: "#8b968f" }}
                  >
                    Belum ada berita. Klik &ldquo;Tambah Berita&rdquo; untuk mulai menulis.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </ProtectedAdmin>
  );
}
