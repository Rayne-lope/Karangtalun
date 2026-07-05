import { AdminShell } from "@/components/admin/admin-shell";
import { requireAdmin } from "@/lib/auth";

type ProtectedAdminProps = {
  children: React.ReactNode;
};

export async function ProtectedAdmin({ children }: ProtectedAdminProps) {
  const profile = await requireAdmin();
  return <AdminShell profile={profile}>{children}</AdminShell>;
}
