import { z } from "zod";

export const accountSchema = z.object({
  email: z.string().email(),
});
export type AccountDto = z.infer<typeof accountSchema>;
