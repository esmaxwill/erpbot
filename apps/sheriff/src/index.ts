import { Hono, Context } from "hono";
import { Bindings } from "./bindings";

import * as auth from "./auth";

declare module "hono" {
  interface ContextVariableMap {}
}

const app = new Hono<{ Bindings: Bindings }>();


app.use("*", async (c: Context, next) => {
  await next();
});

app.route("/auth", auth.default);


export default app;