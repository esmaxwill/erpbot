import type { Interaction } from "./types";
import { Env } from "./types";

import { NewAddressModal } from "./components/enterAddressModal";
import { NewShipmentModal } from "./components/newShipmentModal";

export async function handleStartAddAddress(
  env: Env,
  context: Interaction,
): Promise<Response> {
  const modal = new NewAddressModal({});
  const body = modal.serialize();
  console.log(body);
  return new Response(body, {
    headers: { "Content-Type": "application/json" },
  });
}

export async function handleStartNewShipment(
  env: Env,
  context: Interaction,
): Promise<Response> {
  const modal = new NewShipmentModal({});
  const body = modal.serialize();
  console.log(body);
  return new Response(body, {
    headers: { "Content-Type": "application/json" },
  });
}


export async function handleNewShipmentSubmit(
  env: Env,
  context: Interaction,
): Promise<Response> {
  const modal = new NewShipmentModal({});
  const body = modal.serialize();
  console.log(body);
  return new Response(body, {
    headers: { "Content-Type": "application/json" },
  });
}