import { WorkerEntrypoint } from "cloudflare:workers";
import {
  InteractionResponseType,
  InteractionType,
  verifyKey,
} from "discord-interactions";

import type { Interaction } from "./types";

interface Env {
  APP_ID: string;
  PUBLIC_KEY: string;
}

export default class extends WorkerEntrypoint<Env> {
  async fetch(request: Request) {
    const signature = request.headers.get("X-Signature-Ed25519") || "";
    const timestamp = request.headers.get("X-Signature-Timestamp") || "";

    const isValidRequest = verifyKey(
      await request.clone().arrayBuffer(),
      signature,
      timestamp,
      this.env.PUBLIC_KEY,
    );
    if (!isValidRequest) {
      return new Response("Bad request signature", { status: 401 });
    }

    const body = await request.json<Interaction>();

    console.log(body);

    if (body.type === InteractionType.PING) {
      return new Response(
        JSON.stringify({ type: InteractionResponseType.PONG }),
      );
    }

    return new Response(null, { status: 404 });
  }
}
