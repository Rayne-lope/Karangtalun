import { GalleryForm } from "@/components/admin/gallery-form";
import { PageHeading } from "@/components/admin/page-heading";
import { ProtectedAdmin } from "@/components/admin/protected-admin";
import { ErrorMessage } from "@/components/ui/error-message";
import { createGalleryAction } from "@/lib/actions/gallery.actions";

type PageProps = {
  searchParams?: Promise<{ error?: string }>;
};

export default async function CreateGalleryPage({ searchParams }: PageProps) {
  const params = await searchParams;

  return (
    <ProtectedAdmin>
      <PageHeading title="Upload Galeri" description="Tambahkan foto dokumentasi kegiatan dusun." />
      <div className="mb-4">
        <ErrorMessage message={params?.error} />
      </div>
      <GalleryForm action={createGalleryAction} />
    </ProtectedAdmin>
  );
}
