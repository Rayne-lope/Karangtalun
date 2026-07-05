"use client";

import { useActionState } from "react";
import { loginAction } from "@/lib/actions/auth.actions";
import { initialLoginState } from "@/lib/action-states";
import { describedBy, FieldError, FieldHelp, FieldShell } from "@/components/ui/form-field";
import { ErrorMessage } from "@/components/ui/error-message";
import { SubmitButton } from "@/components/ui/submit-button";

const inputClass =
  "min-h-[48px] w-full rounded-xl border px-4 text-sm outline-none transition-all bg-[#f6f2e8] text-[#1c2b24] placeholder:text-[#8b968f] focus:border-[#073933] focus:bg-[#fffdf7] focus:shadow-[0_0_0_3px_rgba(7,57,51,0.08)]";
const borderColor = "rgba(28,43,36,0.14)";

export function LoginForm() {
  const [state, formAction] = useActionState(loginAction, initialLoginState);
  const usernameError = state.fieldErrors.username?.[0];
  const passwordError = state.fieldErrors.password?.[0];

  return (
    <form action={formAction} className="space-y-5" noValidate>
      <ErrorMessage message={state.message} />

      <FieldShell
        id="username"
        label="Username"
        help="Masukkan username admin yang terdaftar."
        error={usernameError}
      >
        <input
          id="username"
          name="username"
          type="text"
          defaultValue={
            typeof state.values.username === "string" ? state.values.username : ""
          }
          autoComplete="username"
          aria-invalid={Boolean(usernameError)}
          aria-describedby={describedBy(
            "username",
            "Masukkan username admin yang terdaftar.",
            usernameError,
          )}
          className={inputClass}
          style={{ borderColor }}
        />
      </FieldShell>

      <div className="space-y-2">
        <label
          htmlFor="password"
          className="block text-[11px] font-extrabold uppercase tracking-[1.8px] text-[#1c2b24]"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          aria-invalid={Boolean(passwordError)}
          aria-describedby={describedBy("password", "Minimal 6 karakter.", passwordError)}
          className={inputClass}
          style={{ borderColor }}
        />
        <FieldHelp id="password-help" help="Minimal 6 karakter." />
        <FieldError id="password-error" error={passwordError} />
      </div>

      <SubmitButton
        className="inline-flex min-h-[48px] w-full items-center justify-center rounded-full text-[11px] font-extrabold uppercase tracking-[2px] text-white transition-all duration-200 hover:opacity-90 disabled:opacity-50"
        style={{ background: "#062b27" } as React.CSSProperties}
      >
        Masuk ke Dashboard
      </SubmitButton>

    </form>
  );
}
