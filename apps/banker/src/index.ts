import { Hono } from "hono";
import { Bindings } from "./bindings";

declare module "hono" {
  interface ContextVariableMap {}
}

const app = new Hono<{ Bindings: Bindings }>();

export default app;
