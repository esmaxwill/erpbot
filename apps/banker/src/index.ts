import { Hono, Context } from "hono";
import { Bindings } from "./bindings";

import { CookieMiddlewareOpts, cookieMiddleware } from "@repo/cookie-auth";

declare module "hono" {
  interface ContextVariableMap {}
}

const app = new Hono<{ Bindings: Bindings }>();


export default app;
