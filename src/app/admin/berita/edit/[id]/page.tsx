import { notFound } from "next/navigation";
import { ErrorMessage } from "@/components/ui/error-message";
import { NewsForm } from "@/components/admin/news-form";
import { PageHeading } from "@/components/admin/page-heading";
import { ProtectedAdmin } from "@/components/admin/protected-admin";
import { updateNewsAction } from "@/lib/actions/news.actions";
import { getNewsById, getNewsCategories } from "@/lib/data";

type PageProps = {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ error?: string }>;
};

export default async function EditNewsPage({ params, searchParams }: PageProps) {
  const { id } = await params;
  const [news, categories, query] = await Promise.all([getNewsById(id), getNewsCategories(), searchParams]);

  if (!news) {
    notFound();
  }

  return (
    <ProtectedAdmin>
      <PageHeading title="Edit Berita" description="Perbarui berita, status publikasi, dan cover." />
      <div className="mb-4">
        <ErrorMessage message={query?.error} />
      </div>
      <NewsForm action={updateNewsAction.bind(null, id)} categories={categories} news={news} />
    </ProtectedAdmin>
  );
}
