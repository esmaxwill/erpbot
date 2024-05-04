import { WorkerEntrypoint } from "cloudflare:workers";

import type { Env } from "./types";
import { Users } from "./repositories/users";

export default class Statesman extends WorkerEntrypoint<Env> {
  async fetch() {
    return new Response("Hello from Worker B");
  }
}

export { Users };
