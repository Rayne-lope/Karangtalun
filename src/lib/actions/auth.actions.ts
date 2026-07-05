"use server";

import { redirect } from "next/navigation";
import { loginSchema, type LoginValues } from "@/lib/validations/auth";
import { initialLoginState } from "@/lib/action-states";
import { actionErrorState, stringValue, validationErrorState } from "@/lib/utils/forms";
import { createClient } from "@/utils/supabase/server";

export async function loginAction(_state: typeof initialLoginState, formData: FormData) {
  const values = {
    username: stringValue(formData, "username"),
    password: stringValue(formData, "password"),
  };

  const validated = loginSchema.safeParse(values);

  if (!validated.success) {
    return validationErrorState<LoginValues>(validated.error, {
      username: values.username,
      password: "",
    });
  }

  const supabase = await createClient();

  let email: string | null = null;
  let dbError = false;

  try {
    const profileResult = await supabase
      .from("profiles")
      .select("email")
      .eq("username", validated.data.username)
      .maybeSingle();

    if (profileResult.error) {
      dbError = true;
    } else {
      email = profileResult.data?.email || null;
    }
  } catch {
    dbError = true;
  }

  if (dbError) {
    return actionErrorState<LoginValues>("Gagal mengakses database. Coba lagi beberapa saat lagi.", {
      username: values.username,
      password: "",
    });
  }

  if (!email) {
    return actionErrorState<LoginValues>("Username atau password tidak sesuai.", {
      username: values.username,
      password: "",
    });
  }

  // Sign in using the mapped email and password
  const { error } = await supabase.auth
    .signInWithPassword({
      email,
      password: validated.data.password,
    })
    .catch(() => ({
      error: new Error("Tidak bisa terhubung ke Supabase. Coba lagi beberapa saat lagi."),
    }));

  if (error) {
    return actionErrorState<LoginValues>(
      error.message.includes("Supabase") ? error.message : "Username atau password tidak sesuai.",
      {
        username: values.username,
        password: "",
      },
    );
  }

  let profile: { role?: string } | null = null;

  try {
    const userResult = await supabase.auth.getUser();
    const user = userResult.data.user;

    if (user) {
      const profileResult = await supabase.from("profiles").select("role").eq("id", user.id).maybeSingle();
      profile = profileResult.data;
    }
  } catch {
    await supabase.auth.signOut();
    return actionErrorState<LoginValues>("Tidak bisa memeriksa akses admin. Coba lagi beberapa saat lagi.", {
      username: values.username,
      password: "",
    });
  }

  if (profile?.role !== "admin") {
    await supabase.auth.signOut();
    return actionErrorState<LoginValues>("Akun ini belum memiliki akses admin.", {
      username: values.username,
      password: "",
    });
  }

  redirect("/admin/dashboard");
}

export async function logoutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
