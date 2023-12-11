import { z } from "zod";

export const resetPasswordSchema = z
  .object({
    password: z.string().min(8),
    passwordRepeat: z.string().min(8),
    token: z.string(),
  })
  .refine((data) => data.password === data.passwordRepeat, {
    message: "Passwords do not match",
    path: ["passwordRepeat"], // This specifies which field the error is associated with
  });
export type ResetPasswordDto = z.infer<typeof resetPasswordSchema>;
