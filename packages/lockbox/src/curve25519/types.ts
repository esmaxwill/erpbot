import { Buffer } from "node:buffer";

export interface EncryptOpts {
  recipientPublicKey: CryptoKey;
  info?: ArrayBuffer;
  aad?: ArrayBuffer;
}

export interface DecryptOpts {
  recipientPrivateKey: CryptoKey;
  info?: ArrayBuffer;
  aad?: ArrayBuffer;
}

export interface KeyFormat<T extends string | CryptoKey> {
  pk: T;
  sk?: T;
}

export interface EncryptedMessageFormat<T extends string | Buffer> {
  ct: T;
  enc: T;
  pk?: T;
}

export type Message = Buffer;

export type SerializedMessage = string;
