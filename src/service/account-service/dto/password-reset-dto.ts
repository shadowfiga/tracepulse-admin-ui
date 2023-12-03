import { z } from "zod";

export const passwordResetSchema = z.object({
  password: z.string().min(8),
  passwordRepeat: z.string().min(8),
  token: z.string(),
});
export type PasswordResetDto = z.infer<typeof passwordResetSchema>;
