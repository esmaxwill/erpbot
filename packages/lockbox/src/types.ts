import { Buffer } from "node:buffer";

export interface EncryptOpts {
  recipientPublicKey: CryptoKey;
  info?: ArrayBuffer;
}

export interface DecryptOpts {
  recipientKey: CryptoKey;
  info?: ArrayBuffer;
}

export interface EncryptedMessageFormat<T extends string | Buffer> {
  ct: T;
  enc: T;
  pk?: T;
}

export type Message = Buffer;

export type SerializedMessage = string;
