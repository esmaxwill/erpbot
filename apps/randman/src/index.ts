import { Hono } from "hono";
import { RandomnessManager } from "./randomness";
import { XORShift64 } from "random-seedable";
import { HTTPException } from "hono/http-exception";

const app = new Hono().basePath("/random");
const manager = new RandomnessManager();

interface RandomRequest {
  choices: string[];
  count?: number;
}

app.get("/info", async (c) => {
  const info = await manager.getChainInfo();
  return c.json(info);
});

app.get("/round/:round/:min/:max/:numbers?", async (c) => {
  const wait = Boolean(c.req.query("wait")) ?? false;

  const round = parseInt(c.req.param("round"));
  const min = parseInt(c.req.param("min"));
  const max = parseInt(c.req.param("max")) + 1;
  const numbers = parseInt(c.req.param("numbers") ?? "1");
  const beaconPromise = manager.getBeaconForRound(round, wait);
  c.executionCtx.waitUntil(beaconPromise);
  const beacon = await beaconPromise;
  
  if (!beacon) {
    throw new HTTPException(400, {
      message: "Beacon either not available yet or we're not waiting for it.",
    });
  }

  const random = new XORShift64(BigInt(`0x${beacon.randomness}`));

  if (numbers > 1) {
    const result = random.randRangeArray(numbers, min, max);
    return c.json({ result, ...beacon });
  } else {
    const result = random.randRange(min, max);
    return c.json({ result, ...beacon });
  }
});

app.post("/round/:round", async (c) => {
  const round = parseInt(c.req.param("round"));
  const wait = Boolean(c.req.query("wait")) ?? false;
  const beacon = await manager.getBeaconForRound(round, wait);

  if (!beacon) {
    throw new HTTPException(400, {
      message: "Beacon either not available yet or we're not waiting for it.",
    });
  }

  const random = new XORShift64(BigInt(`0x${beacon.randomness}`));
  const body = (await c.req.json()) as RandomRequest;
  const choices = random.shuffle(body.choices);
  return c.json({ input: body.choices, shuffled: choices, ...beacon });
});

app.get("/time/:timestamp", async (c) => {
  let timestamp = parseInt(c.req.param("timestamp"));
  if (!timestamp) {
    timestamp = Math.floor(new Date().getTime() / 1000);
  }

  const time = new Date(timestamp * 1000);
  try {
    const beacon = await manager.getBeaconForTime(time);
    return c.json(beacon);
  } catch (e) {
    const round = await manager.getRoundNumberForTime(time);
    return c.json({ round });
  }
});

export default app;
