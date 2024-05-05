export interface EncryptOpts {
  recipientPublicKey: CryptoKey;
  info?: ArrayBuffer;
}

export interface EncryptedMessageFormat {
  ct: string;
  enc: string;
}

export type EncryptedMessage = string;
