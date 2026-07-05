import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import type { Profile } from "@/types/content";

export async function getAdminProfile() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return null;
    }

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .maybeSingle();

    if (error) {
      return null;
    }

    const profile = data as Profile | null;
    return profile?.role === "admin" ? profile : null;
  } catch {
    return null;
  }
}

export async function requireAdmin() {
  const profile = await getAdminProfile();

  if (!profile) {
    redirect("/admin/login");
  }

  return profile;
}
