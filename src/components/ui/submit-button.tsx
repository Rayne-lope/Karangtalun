"use client";

import { useFormStatus } from "react-dom";
import React from "react";

type SubmitButtonProps = {
  children: React.ReactNode;
  pendingLabel?: string;
  className?: string;
  style?: React.CSSProperties;
};

export function SubmitButton({
  children,
  pendingLabel = "Menyimpan...",
  className,
  style,
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={
        className ??
        "inline-flex min-h-[44px] items-center justify-center rounded-full px-6 text-[11px] font-extrabold uppercase tracking-[1.7px] text-white transition-all duration-200 hover:-translate-y-0.5 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
      }
      style={style ?? (className ? undefined : { background: "#062b27" })}
    >
      {pending ? pendingLabel : children}
    </button>
  );
}
