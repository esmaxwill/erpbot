import { z } from "zod";

export const UserSchema = z.object({
  id: z.string(),
  username: z.string(),
  venmo: z.string().optional(),
  email: z.string().email().optional(),
});

export type User = z.infer<typeof UserSchema>;
