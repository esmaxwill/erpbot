import { z } from "zod";

export const AddressInfoSchema = z.object({
  id: z.string().ulid(),
  api_id: z.string().regex(/^adr_[a-zA-Z0-9]+$/),
  discord_user_id: z.string(),
});

export type AddressInfo = z.infer<typeof AddressInfoSchema>;

export const AddressSchema = z.object({
  street1: z.string(),
  street2: z.string().optional(),
  city: z.string(),
  state: z.string(),
  zip: z.string(),
  country: z.string(),
  residential: z.boolean().default(true),
  name: z.string(),
  company: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().optional(),
});

export type Address = z.infer<typeof AddressSchema>;
