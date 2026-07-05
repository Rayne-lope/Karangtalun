import type { z } from "zod";

export type FieldErrors = Record<string, string[] | undefined>;
type FormValues<TValues extends object> = {
  [Key in keyof TValues]?: unknown;
} & Record<string, unknown>;

export type ActionState<TValues extends object = Record<string, unknown>> = {
  success: boolean;
  message?: string;
  fieldErrors: FieldErrors;
  values: FormValues<TValues>;
};

export function emptyActionState<TValues extends object = Record<string, unknown>>(
  values: FormValues<TValues> = {} as FormValues<TValues>,
): ActionState<TValues> {
  return {
    success: false,
    fieldErrors: {},
    values,
  };
}

export function stringValue(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export function optionalStringValue(formData: FormData, key: string) {
  const value = stringValue(formData, key);
  return value.length > 0 ? value : null;
}

export function fileValue(formData: FormData, key: string) {
  const value = formData.get(key);
  return value instanceof File && value.size > 0 ? value : null;
}

export function redirectWithError(path: string, message: string) {
  return `${path}?error=${encodeURIComponent(message)}`;
}

export function firstError(errors: FieldErrors, key: string) {
  return errors[key]?.[0];
}

export function validationErrorState<TValues extends object>(
  error: z.ZodError,
  values: FormValues<TValues>,
  message = "Periksa kembali isian yang ditandai.",
): ActionState<TValues> {
  return {
    success: false,
    message,
    fieldErrors: error.flatten().fieldErrors,
    values,
  };
}

export function actionErrorState<TValues extends object>(
  message: string,
  values: FormValues<TValues>,
  fieldErrors: FieldErrors = {},
): ActionState<TValues> {
  return {
    success: false,
    message,
    fieldErrors,
    values,
  };
}
