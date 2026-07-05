import { notFound } from "next/navigation";
import { GalleryForm } from "@/components/admin/gallery-form";
import { PageHeading } from "@/components/admin/page-heading";
import { ProtectedAdmin } from "@/components/admin/protected-admin";
import { ErrorMessage } from "@/components/ui/error-message";
import { updateGalleryAction } from "@/lib/actions/gallery.actions";
import { getGalleryById } from "@/lib/data";

type PageProps = {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ error?: string }>;
};

export default async function EditGalleryPage({ params, searchParams }: PageProps) {
  const { id } = await params;
  const [item, query] = await Promise.all([getGalleryById(id), searchParams]);

  if (!item) {
    notFound();
  }

  return (
    <ProtectedAdmin>
      <PageHeading title="Edit Galeri" description="Perbarui judul, deskripsi, status, urutan, atau foto." />
      <div className="mb-4">
        <ErrorMessage message={query?.error} />
      </div>
      <GalleryForm action={updateGalleryAction.bind(null, id)} item={item} />
    </ProtectedAdmin>
  );
}
