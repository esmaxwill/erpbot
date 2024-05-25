import {
  fetchBeacon,
  fetchBeaconByTime,
  HttpChainClient,
  HttpCachingChain,
  roundAt,
  type RandomnessBeacon,
  type ChainInfo,
} from "drand-client";

import { sleep } from "drand-client/util";

// Default drand network (30 second period)
const CHAIN_HASH =
  "8990e7a9aaed2ffed73dbd7092123d6f289930540d7651336225dc172e51b2ce"; // (hex encoded)

// Retrieved from https://api.drand.sh/8990e7a9aaed2ffed73dbd7092123d6f289930540d7651336225dc172e51b2ce/info
// {
//   "public_key": "868f005eb8e6e4ca0a47c8a77ceaa5309a47978a7c71bc5cce96366b5d7a569937c529eeda66c7293784a9402801af31",
//   "period": 30,
//   "genesis_time": 1595431050,
//   "hash": "8990e7a9aaed2ffed73dbd7092123d6f289930540d7651336225dc172e51b2ce",
//   "groupHash": "176f93498eac9ca337150b46d21dd58673ea4e3581185f869672e59fa4cb390a",
//   "schemeID": "pedersen-bls-chained",
//   "metadata": {
//     "beaconID": "default"
//   }
// }

const PUBLIC_KEY =
  "868f005eb8e6e4ca0a47c8a77ceaa5309a47978a7c71bc5cce96366b5d7a569937c529eeda66c7293784a9402801af31"; // (hex encoded)

export class RandomnessManager {
  chain: HttpCachingChain;
  client: HttpChainClient;

  constructor() {
    const options = {
      disableBeaconVerification: false, // `true` disables checking of signatures on beacons - faster but insecure!!!
      noCache: false, // `true` disables caching when retrieving beacons for some providers
      chainVerificationParams: { chainHash: CHAIN_HASH, publicKey: PUBLIC_KEY }, // these are optional, but recommended! They are compared for parity against the `/info` output of a given node
    };

    this.chain = new HttpCachingChain("https://api.drand.sh", options);
    this.client = new HttpChainClient(this.chain, options);
  }

  async getChainInfo(): Promise<ChainInfo> {
    return this.chain.info();
  }

  async getBeaconForRound(
    round: number,
    wait = false,
  ): Promise<RandomnessBeacon | undefined> {
    while (true) {
      try {
        return await fetchBeacon(this.client, round);
      } catch (e) {
        if (!wait) {
          return undefined;
        } else {
          await sleep(1000);
        }
      }
    }
  }

  async getRoundNumberForTime(time: Date): Promise<number> {
    const timestamp = time.getTime();
    return roundAt(timestamp, await this.chain.info());
  }

  async getBeaconForTime(time: Date): Promise<RandomnessBeacon> {
    const timestamp = time.getTime();
    return await fetchBeaconByTime(this.client, timestamp);
  }

  async getLatestBeacon(): Promise<RandomnessBeacon> {
    return await fetchBeacon(this.client);
  }
}
