import { WorkerEntrypoint } from "cloudflare:workers";
import {
  InteractionResponseType,
  InteractionType,
  MessageComponentTypes,
  verifyKey,
} from "discord-interactions";

import type { Interaction, InteractionDataModal } from "./types";
import { Env } from "./types";

import * as commands from "./commands";

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
    if (body.type === InteractionType.PING) {
      return new Response(
        JSON.stringify({ type: InteractionResponseType.PONG }),
      );
    } else if (body.type === InteractionType.APPLICATION_COMMAND) {
      if (body.data?.name === "Send shipping information") {
        return await commands.handleStartNewShipment(this.env, body);
      } else if (body.data?.name === "Add Address") {
        return await commands.handleStartAddAddress(this.env, body);
      }
    } else if (body.type === InteractionType.MODAL_SUBMIT) {
      const data = body.data as unknown as InteractionDataModal;
      const modalId = data.custom_id;
      if (modalId.startsWith("dropbox|newship")) {
        return await commands.handleNewShipmentSubmit(this.env, body);
      }
    } else {
      console.log(`Unhandled type: ${body.type}`, body);
      return new Response(null, { status: 200 });
    }

    console.log("Default response of 404");
    return new Response(null, { status: 404 });
  }
}
