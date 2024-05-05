import { suite } from "./suite";
import { Buffer } from "node:buffer";

import type {
  DecryptOpts,
  Message,
  EncryptedMessageFormat,
  SerializedMessage,
} from "./types";

function _deserializeMessage(
  message: SerializedMessage,
): EncryptedMessageFormat<Buffer> {
  const messageString = Buffer.from(message, "base64url").toString("utf-8");
  const messageFormat = JSON.parse(
    messageString,
  ) as EncryptedMessageFormat<string>;
  const ciphertext = Buffer.from(messageFormat.ct, "base64url");
  const enc = Buffer.from(messageFormat.enc, "base64url");
  return {
    ct: ciphertext,
    enc,
  };
}

export async function decrypt(
  ciphertext: string,
  opts: DecryptOpts,
): Promise<Message> {
  const messageFormat = _deserializeMessage(ciphertext);
  const recipient = await suite.createRecipientContext({
    ...opts,
    enc: messageFormat.enc,
  });

  const plaintext = await recipient.open(messageFormat.ct);
  return Buffer.from(plaintext);
}
