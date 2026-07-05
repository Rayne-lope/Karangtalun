import { ErrorMessage } from "@/components/ui/error-message";
import { NewsForm } from "@/components/admin/news-form";
import { PageHeading } from "@/components/admin/page-heading";
import { ProtectedAdmin } from "@/components/admin/protected-admin";
import { createNewsAction } from "@/lib/actions/news.actions";
import { getNewsCategories } from "@/lib/data";

type PageProps = {
  searchParams?: Promise<{ error?: string }>;
};

export default async function CreateNewsPage({ searchParams }: PageProps) {
  const [categories, params] = await Promise.all([getNewsCategories(), searchParams]);

  return (
    <ProtectedAdmin>
      <PageHeading title="Tambah Berita" description="Tulis berita atau aktivitas terbaru desa." />
      <div className="mb-4">
        <ErrorMessage message={params?.error} />
      </div>
      <NewsForm action={createNewsAction} categories={categories} />
    </ProtectedAdmin>
  );
}
