import { AeadId, CipherSuite, KdfId, KemId } from "hpke-js";

export const suite = new CipherSuite({
  kem: KemId.DhkemX25519HkdfSha256,
  kdf: KdfId.HkdfSha256,
  aead: AeadId.Aes128Gcm,
});