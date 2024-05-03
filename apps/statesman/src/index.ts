import { WorkerEntrypoint } from "cloudflare:workers";

import type { UserType } from "./repositories/users";
import { UserRepository } from "./repositories/users";

export default class Statesman extends WorkerEntrypoint {
  async fetch() { return new Response("Hello from Worker B"); }
  async createUser(user: UserType) {
    console.log(user);
    const response = await UserRepository.createUser(this.ctx, this.env, user);
    return response;
  }
}