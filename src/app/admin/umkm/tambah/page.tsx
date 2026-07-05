import { PageHeading } from "@/components/admin/page-heading";
import { ProtectedAdmin } from "@/components/admin/protected-admin";
import { UmkmForm } from "@/components/admin/umkm-form";
import { ErrorMessage } from "@/components/ui/error-message";
import { createUmkmAction } from "@/lib/actions/umkm.actions";
import { getUmkmCategories } from "@/lib/data";

type PageProps = {
  searchParams?: Promise<{ error?: string }>;
};

export default async function CreateUmkmPage({ searchParams }: PageProps) {
  const [categories, params] = await Promise.all([getUmkmCategories(), searchParams]);

  return (
    <ProtectedAdmin>
      <PageHeading title="Tambah UMKM" description="Daftarkan potensi usaha warga desa." />
      <div className="mb-4">
        <ErrorMessage message={params?.error} />
      </div>
      <UmkmForm action={createUmkmAction} categories={categories} />
    </ProtectedAdmin>
  );
}
