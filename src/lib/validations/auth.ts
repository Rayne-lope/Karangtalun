import { z } from "zod";

export const loginSchema = z.object({
  // max(100) prevents DoS via extremely long username strings
  username: z
    .string()
    .min(1, "Username wajib diisi.")
    .max(100, "Username maksimal 100 karakter.")
    .regex(/^[a-zA-Z0-9_.-]+$/, "Username hanya boleh berisi huruf, angka, titik, strip, atau underscore."),
  // max(200) is well above any reasonable password length
  password: z
    .string()
    .min(6, "Password minimal 6 karakter.")
    .max(200, "Password terlalu panjang."),
});

export type LoginValues = z.infer<typeof loginSchema>;
