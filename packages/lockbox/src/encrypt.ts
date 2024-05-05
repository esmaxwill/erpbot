import { cipher } from "./suite";
import { Buffer } from "node:buffer";

export interface EncryptOpts {
  recipientPublicKey: CryptoKey;
  info?: ArrayBuffer;
}

export interface EncryptedMessageFormat {
  ct: string;
  enc: string;
}

export type EncryptedMessage = string;

export async function encrypt(
  plaintext: string,
  opts: EncryptOpts,
): Promise<EncryptedMessage> {
  const sender = await cipher.createSenderContext({
    ...opts,
  });

  const enc = sender.enc;

  const ciphertext = await sender.seal(new TextEncoder().encode(plaintext));

  const format: EncryptedMessageFormat = {
    ct: Buffer.from(ciphertext).toString("base64url"),
    enc: Buffer.from(enc).toString("base64url"),
  };

  const serialized = Buffer.from(JSON.stringify(format)).toString("base64url");
  return serialized;
}
