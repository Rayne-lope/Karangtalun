"use client";

import { ImagePlus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { FieldError, FieldHelp } from "@/components/ui/form-field";

type ImageInputProps = {
  name: string;
  label: string;
  currentUrl?: string | null;
  required?: boolean;
  error?: string;
};

const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp"]);
const maxFileSize = 5 * 1024 * 1024;
const helpText = "JPG, PNG, atau WEBP. Maksimal 5 MB.";

export function ImageInput({ name, label, currentUrl, required, error }: ImageInputProps) {
  const [preview, setPreview] = useState<string | null>(currentUrl ?? null);
  const [localError, setLocalError] = useState<string | undefined>();
  const objectUrlRef = useRef<string | null>(null);
  const visibleError = localError ?? error;
  const helpId = `${name}-help`;
  const errorId = `${name}-error`;

  useEffect(() => {
    return () => {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
      }
    };
  }, []);

  return (
    <div className="space-y-3">
      <label htmlFor={name} className="block text-sm font-semibold text-stone-900">
        {label}
      </label>
      <label
        htmlFor={name}
        className="flex min-h-40 cursor-pointer items-center justify-center overflow-hidden rounded-md border border-dashed border-stone-300 bg-stone-50 text-sm text-stone-600 transition hover:border-emerald-500 hover:bg-emerald-50"
      >
        {preview ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={preview} alt="" className="h-full max-h-72 w-full object-cover" />
        ) : (
          <span className="flex items-center gap-2">
            <ImagePlus className="h-5 w-5" aria-hidden="true" />
            Pilih gambar JPG, PNG, atau WEBP
          </span>
        )}
      </label>
      <input
        id={name}
        name={name}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        required={required}
        aria-invalid={Boolean(visibleError)}
        aria-describedby={`${helpId}${visibleError ? ` ${errorId}` : ""}`}
        className="block w-full text-sm text-stone-700 file:mr-4 file:rounded-md file:border-0 file:bg-stone-900 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white"
        onChange={(event) => {
          const file = event.target.files?.[0];

          if (objectUrlRef.current) {
            URL.revokeObjectURL(objectUrlRef.current);
            objectUrlRef.current = null;
          }

          if (!file) {
            setLocalError(undefined);
            setPreview(currentUrl ?? null);
            return;
          }

          if (!allowedTypes.has(file.type)) {
            setLocalError("Format gambar harus JPG, PNG, atau WEBP.");
            setPreview(currentUrl ?? null);
            event.currentTarget.value = "";
            return;
          }

          if (file.size > maxFileSize) {
            setLocalError("Ukuran gambar maksimal 5 MB.");
            setPreview(currentUrl ?? null);
            event.currentTarget.value = "";
            return;
          }

          const objectUrl = URL.createObjectURL(file);
          objectUrlRef.current = objectUrl;
          setLocalError(undefined);
          setPreview(objectUrl);
        }}
      />
      <FieldHelp id={helpId} help={helpText} />
      <FieldError id={errorId} error={visibleError} />
    </div>
  );
}
