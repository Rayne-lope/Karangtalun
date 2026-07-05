import { notFound } from "next/navigation";
import { PageHeading } from "@/components/admin/page-heading";
import { ProtectedAdmin } from "@/components/admin/protected-admin";
import { UmkmForm } from "@/components/admin/umkm-form";
import { ErrorMessage } from "@/components/ui/error-message";
import { updateUmkmAction } from "@/lib/actions/umkm.actions";
import { getUmkmById, getUmkmCategories } from "@/lib/data";

type PageProps = {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ error?: string }>;
};

export default async function EditUmkmPage({ params, searchParams }: PageProps) {
  const { id } = await params;
  const [umkm, categories, query] = await Promise.all([getUmkmById(id), getUmkmCategories(), searchParams]);

  if (!umkm) {
    notFound();
  }

  return (
    <ProtectedAdmin>
      <PageHeading title="Edit UMKM" description="Perbarui profil, kontak, status, dan foto UMKM." />
      <div className="mb-4">
        <ErrorMessage message={query?.error} />
      </div>
      <UmkmForm action={updateUmkmAction.bind(null, id)} categories={categories} umkm={umkm} />
    </ProtectedAdmin>
  );
}
