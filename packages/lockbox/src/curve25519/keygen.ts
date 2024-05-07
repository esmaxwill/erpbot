import { suite } from "./suite";
import { KeyFormat } from "../types";
import { Buffer } from "node:buffer";

export async function random(): Promise<KeyFormat<string>> {
  const kp = await suite.kem.generateKeyPair();
  const pk = await suite.kem.serializePublicKey(kp.publicKey);
  const sk = await suite.kem.serializePrivateKey(kp.privateKey);

  return {
    pk: Buffer.from(pk).toString("base64url"),
    sk: Buffer.from(sk).toString("base64url"),
  };
}

export async function deterministic(
  info: string,
  seed: ArrayBuffer,
): Promise<KeyFormat<string>> {
  const salt = Buffer.from(info, "base64");
  const ikm = await crypto.subtle.importKey("raw", seed, "PBKDF2", false, [
    "deriveBits",
  ]);

  const keySeed = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      hash: "SHA-256",
      iterations: 100000,
      salt,
    },
    ikm,
    32,
  );

  const kp = await suite.kem.deriveKeyPair(keySeed);
  const pk = await suite.kem.serializePublicKey(kp.publicKey);
  const sk = await suite.kem.serializePrivateKey(kp.privateKey);

  return {
    pk: Buffer.from(pk).toString("base64url"),
    sk: Buffer.from(sk).toString("base64url"),
  };
}
