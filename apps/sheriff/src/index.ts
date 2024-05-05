import { Hono} from "hono";
import { Bindings } from "./bindings";

import { keygen } from "@repo/lockbox";
import * as auth from "./auth";

declare module "hono" {
  interface ContextVariableMap {}
}

const app = new Hono<{ Bindings: Bindings }>();

app.route("/auth", auth.default);

app.use("*", )

app.get("/keygen", async (c) => {
  return c.json(await keygen.generate());
});

app.get("/keygen/:seed", async (c) => {
  const seed = c.req.param("seed");
  return c.json(
    await keygen.deterministic(c.env.KEY_INFO, new TextEncoder().encode(seed)),
  );
});

export default app;
