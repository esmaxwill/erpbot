import { z } from "zod";

export const ShipmentSchema = z.object({
  id: z.string().ulid(),
});

export type Shipment = z.infer<typeof ShipmentSchema>;
