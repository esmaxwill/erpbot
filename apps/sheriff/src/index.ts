import { Hono } from "hono";
import { Bindings } from "./bindings";

import * as auth from "./auth";

const app = new Hono<{ Bindings: Bindings }>();

app.route("/auth", auth.default);

export default app;
