import { Hono, Context } from "hono";
import { Bindings } from "./bindings";


declare module "hono" {
  interface ContextVariableMap {}
}

const app = new Hono<{ Bindings: Bindings }>();


app.use("*", async (c: Context, next) => {
  await next();
});


export default app;
