import { Hono, Context } from "hono";
import { Bindings } from "./bindings";

import { AeadId, CipherSuite, KdfId, KemId } from "hpke-js";
import { Buffer } from "node:buffer";

import * as auth from "./auth";

declare module "hono" {
  interface ContextVariableMap {}
}

const app = new Hono<{ Bindings: Bindings }>();

app.route("/auth", auth.default);

app.get("/keygen/:seed", async (c) => {
  const seed = c.req.param("seed");
  const salt = Buffer.from(c.env.KEY_INFO, "base64");
  const enc = new TextEncoder().encode(seed);
  const id = (await crypto.subtle.digest("SHA-256", enc)).slice(0, 12);

  const ikm = await crypto.subtle.importKey(
    "raw",
    enc,
    "PBKDF2",
    false,
    ["deriveBits"],
  );

  const keySeed = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      hash: "SHA-256",
      iterations: 100000,
      salt
    },
    ikm,
    32,
  );

  const suite = new CipherSuite({
    kem: KemId.DhkemX25519HkdfSha256,
    kdf: KdfId.HkdfSha256,
    aead: AeadId.Aes128Gcm,
  });

  const kp = await suite.kem.deriveKeyPair(keySeed);
  const pk = await suite.kem.serializePublicKey(kp.publicKey);
  const sk = await suite.kem.serializePrivateKey(kp.privateKey);

  return c.json({
    id: Buffer.from(id).toString("base64url"),
    pk: Buffer.from(pk).toString("base64url"),
    sk: Buffer.from(sk).toString("base64url"),
  });
});

export default app;
