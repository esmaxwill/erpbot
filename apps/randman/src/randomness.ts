import { 
  fetchBeacon, 
  fetchBeaconByTime, 
  HttpChainClient,  
  HttpCachingChain,
  type RandomnessBeacon,
} from 'drand-client';

const CHAIN_HASH =
  "8990e7a9aaed2ffed73dbd7092123d6f289930540d7651336225dc172e51b2ce"; // (hex encoded)
const PUBLIC_KEY =
  "868f005eb8e6e4ca0a47c8a77ceaa5309a47978a7c71bc5cce96366b5d7a569937c529eeda66c7293784a9402801af31"; // (hex encoded)

export class RandomnessManager {
  chain: HttpCachingChain;
  client: HttpChainClient;

  constructor() {
    const options = {
      disableBeaconVerification: false, // `true` disables checking of signatures on beacons - faster but insecure!!!
      noCache: false, // `true` disables caching when retrieving beacons for some providers
      chainVerificationParams: { chainHash:CHAIN_HASH, publicKey:PUBLIC_KEY }, // these are optional, but recommended! They are compared for parity against the `/info` output of a given node
    };

    this.chain = new HttpCachingChain('https://api.drand.sh', options);
    this.client = new HttpChainClient(this.chain, options)
  }

  async getForRound(round: number): Promise<RandomnessBeacon> {
    return await fetchBeacon(this.client, round);
  }

  async getForTime(time: Date): Promise<RandomnessBeacon> {
    const timestamp = time.getTime() / 1000;
    return await fetchBeaconByTime(this.client, timestamp);
  }

  async getLatest(): Promise<RandomnessBeacon> {
    return await fetchBeacon(this.client);
  }
}
