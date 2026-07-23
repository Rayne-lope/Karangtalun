"use client";

import { Check, Copy, MessageCircle, Share2 } from "lucide-react";
import { useState } from "react";

type UmkmShareActionsProps = {
  title: string;
  summary?: string | null;
  ownerName?: string | null;
};

async function copyToClipboard(value: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return;
  }

  const textArea = document.createElement("textarea");
  textArea.value = value;
  textArea.setAttribute("readonly", "");
  textArea.style.position = "fixed";
  textArea.style.opacity = "0";
  document.body.append(textArea);
  textArea.select();

  const copied = document.execCommand("copy");
  textArea.remove();

  if (!copied) {
    throw new Error("Clipboard tidak tersedia.");
  }
}

export function UmkmShareActions({ title, summary, ownerName }: UmkmShareActionsProps) {
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  const shareText = summary
    ? `Dukung UMKM Lokal Dusun Karangtalun - "${title}"${ownerName ? ` (${ownerName})` : ""}: ${summary}`
    : `Dukung UMKM Lokal Dusun Karangtalun - "${title}"${ownerName ? ` (${ownerName})` : ""}`;

  const copyLink = async (url: string) => {
    try {
      await copyToClipboard(url);
      setCopyState("copied");
      setFeedback("Tautan UMKM berhasil disalin ke clipboard!");
      setTimeout(() => {
        setCopyState("idle");
        setFeedback("");
      }, 3000);
      return true;
    } catch {
      setCopyState("error");
      setFeedback("Tautan tidak dapat disalin. Silakan salin alamat halaman secara manual.");
      return false;
    }
  };

  const handleCopy = async () => {
    await copyLink(window.location.href);
  };

  const handleShare = async () => {
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({ title: `UMKM Dusun Karangtalun - ${title}`, text: shareText, url });
        return;
      } catch (error) {
        if (
          typeof error === "object" &&
          error !== null &&
          "name" in error &&
          error.name === "AbortError"
        ) {
          return;
        }
      }
    }

    await copyLink(url);
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      `Halo! Dapatkan produk/jasa dari UMKM *${title}* Dusun Karangtalun di link berikut:\n${window.location.href}`
    );
    window.open(`https://wa.me/?text=${message}`, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="rounded-[24px] border border-[var(--line)] bg-[var(--paper)] p-5 sm:p-6 shadow-sm">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-[0.17em] text-[var(--teal)]">
            <Share2 className="h-3.5 w-3.5" aria-hidden="true" />
            Bagikan Usaha Lokal
          </span>
          <p className="mt-1 text-xs text-[var(--muted)]">
            Bantu promosikan UMKM warga Karangtalun ini ke keluarga dan rekan Anda.
          </p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-2.5 sm:flex sm:flex-wrap">
        <button
          type="button"
          onClick={handleShare}
          className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-[var(--teal)] px-5 text-[11px] font-extrabold uppercase tracking-[0.12em] text-[var(--paper)] transition-all duration-200 hover:bg-[var(--teal-2)] hover:shadow-md active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--gold)] cursor-pointer"
        >
          <Share2 className="h-4 w-4" aria-hidden="true" />
          Bagikan
        </button>

        <button
          type="button"
          onClick={handleWhatsApp}
          className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-[#25D366]/30 bg-[#25D366]/10 px-5 text-[11px] font-extrabold uppercase tracking-[0.11em] text-[#128C7E] transition-all duration-200 hover:bg-[#25D366]/20 hover:border-[#25D366] hover:shadow-sm active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--gold)] cursor-pointer"
        >
          <MessageCircle className="h-4 w-4 text-[#25D366]" aria-hidden="true" />
          WhatsApp
        </button>

        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-[var(--line)] bg-white px-5 text-[11px] font-extrabold uppercase tracking-[0.11em] text-[var(--ink)] transition-all duration-200 hover:border-[var(--teal)] hover:text-[var(--teal)] hover:shadow-sm active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--gold)] cursor-pointer"
        >
          {copyState === "copied" ? (
            <Check className="h-4 w-4 text-emerald-600" aria-hidden="true" />
          ) : (
            <Copy className="h-4 w-4" aria-hidden="true" />
          )}
          {copyState === "copied" ? "Tersalin!" : "Salin Tautan"}
        </button>
      </div>

      {feedback && (
        <p className="mt-3 text-xs font-semibold text-[var(--teal)] transition-all" role="status" aria-live="polite">
          {feedback}
        </p>
      )}
    </div>
  );
}
