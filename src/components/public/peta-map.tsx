"use client";

import dynamic from "next/dynamic";
import type { PetaUmkmLocation } from "@/lib/karangtalun-map";

const PetaMapCanvas = dynamic(() => import("./peta-map-canvas"), {
  ssr: false,
  loading: () => (
    <div
      className="flex min-h-[350px] items-center justify-center bg-[var(--paper-2)] text-sm text-[var(--muted)] lg:min-h-[650px]"
      role="status"
      aria-live="polite"
    >
      Menyiapkan peta interaktif…
    </div>
  ),
});

export function PetaMap({ locations }: { locations: PetaUmkmLocation[] }) {
  return <PetaMapCanvas locations={locations} />;
}
