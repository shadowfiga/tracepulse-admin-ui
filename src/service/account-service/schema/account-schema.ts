import { z } from "zod";

export const accountSchema = z.object({
  id: z.string(),
  email: z.string().email(),
});
export type AccountDto = z.infer<typeof accountSchema>;
