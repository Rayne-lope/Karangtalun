"use client";

import { Check, Copy, MessageCircle, Share2 } from "lucide-react";
import { useState } from "react";

type NewsShareActionsProps = {
  title: string;
  summary: string;
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

export function NewsShareActions({ title, summary }: NewsShareActionsProps) {
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  const copyLink = async (url: string) => {
    try {
      await copyToClipboard(url);
      setCopyState("copied");
      setFeedback("Tautan artikel berhasil disalin.");
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
        await navigator.share({ title, text: summary, url });
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
    const message = encodeURIComponent(`${title}\n${window.location.href}`);
    window.open(`https://wa.me/?text=${message}`, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="mt-7 border-y border-[var(--line)] py-5" aria-label="Bagikan artikel">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
        <div>
          <p className="text-[10px] font-extrabold uppercase tracking-[0.17em] text-[var(--teal)]">Bagikan artikel</p>
          <p className="mt-1 text-sm leading-6 text-[var(--muted)]">Kirimkan kabar ini kepada warga dan teman Anda.</p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2.5 sm:flex sm:flex-wrap">
        <button
          type="button"
          onClick={handleShare}
          className="col-span-2 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--teal)] px-5 text-[11px] font-extrabold uppercase tracking-[0.13em] text-[var(--paper)] transition-colors hover:bg-[var(--teal-2)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--gold)] sm:col-auto"
        >
          <Share2 className="h-4 w-4" aria-hidden="true" />
          Bagikan
        </button>

        <button
          type="button"
          onClick={handleWhatsApp}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[var(--line)] bg-[var(--paper)] px-4 text-[11px] font-extrabold uppercase tracking-[0.11em] text-[var(--ink)] transition-colors hover:border-[var(--teal)] hover:text-[var(--teal)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--gold)]"
        >
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          WhatsApp
        </button>

        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[var(--line)] bg-[var(--paper)] px-4 text-[11px] font-extrabold uppercase tracking-[0.11em] text-[var(--ink)] transition-colors hover:border-[var(--teal)] hover:text-[var(--teal)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--gold)]"
        >
          {copyState === "copied" ? <Check className="h-4 w-4" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
          {copyState === "copied" ? "Tersalin" : "Salin tautan"}
        </button>
      </div>

      <p className="mt-3 min-h-5 text-xs text-[var(--muted)]" role="status" aria-live="polite">
        {feedback}
      </p>
    </section>
  );
}
