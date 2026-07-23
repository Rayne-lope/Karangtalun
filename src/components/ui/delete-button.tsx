"use client";

import { Trash2 } from "lucide-react";
import { useFormStatus } from "react-dom";

type DeleteButtonProps = {
  label?: string;
};

export function DeleteButton({ label = "Hapus" }: DeleteButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      onClick={(event) => {
        if (!window.confirm("Yakin ingin menghapus data ini?")) {
          event.preventDefault();
        }
      }}
      className="inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-full border px-3.5 text-[11px] font-extrabold uppercase tracking-[1.3px] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm disabled:cursor-not-allowed disabled:opacity-50"
      style={{
        borderColor: "rgba(220,38,38,0.25)",
        color: "#b91c1c",
        background: "rgba(220,38,38,0.04)",
      }}
    >
      <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
      {pending ? "Menghapus..." : label}
    </button>
  );
}
