import { z } from "zod";
import { ulidFactory } from "ulid-workers";
const ulid = ulidFactory();

function generateId(): string {
  return ulid();
}

export const KeySchema = z.object({
  id: z.string().ulid().default(generateId),
});

export type Key = z.infer<typeof KeySchema>;
