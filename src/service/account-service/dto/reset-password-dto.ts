import { z } from "zod";

export const resetPasswordSchema = z.object({
  password: z.string().min(8),
  passwordRepeat: z.string().min(8),
  token: z.string(),
});
export type ResetPasswordDto = z.infer<typeof resetPasswordSchema>;
