import { Buffer } from "node:buffer";

export interface EncryptOpts {
  recipientPublicKey: CryptoKey;
  info?: ArrayBuffer;
}

export interface DecryptOpts {
  recipientKey: CryptoKey;
  info?: ArrayBuffer;
}

export interface KeyFormat<T extends string | CryptoKey> {
  id?: string;
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
