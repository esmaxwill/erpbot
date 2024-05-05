import { cipher } from './suite';

export async function keygen(): Promise<{
    pk: string;
    sk: string;
  }> {
    const kp = await cipher.kem.generateKeyPair();
    const pk = await cipher.kem.serializePublicKey(kp.publicKey);
    const sk = await cipher.kem.serializePrivateKey(kp.privateKey);
    
    return {
      pk: Buffer.from(pk).toString("base64url"),
      sk: Buffer.from(sk).toString("base64url"),
    };
  }
  