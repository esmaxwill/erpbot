import { suite } from "../suite";
import { Buffer } from "node:buffer";

import type {
  EncryptOpts,
  EncryptedMessageFormat,
  SerializedMessage,
} from "../types";

export async function encrypt(
  plaintext: string,
  opts: EncryptOpts,
): Promise<SerializedMessage> {
  const sender = await suite.createSenderContext({
    ...opts,
  });

  const enc = sender.enc;
  const ciphertext = await sender.seal(new TextEncoder().encode(plaintext));
  const format: EncryptedMessageFormat<string> = {
    ct: Buffer.from(ciphertext).toString("base64url"),
    enc: Buffer.from(enc).toString("base64url"),
  };

  const serialized = Buffer.from(JSON.stringify(format)).toString("base64url");
  return serialized;
}
