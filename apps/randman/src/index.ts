import { Hono } from "hono";
import { RandomnessManager } from './randomness';
import { XORShift64 } from 'random-seedable';

const app = new Hono().basePath('/random');
const manager = new RandomnessManager();

interface RandomRequest {
  choices: string[];
  count?: number;
}

app.get('/round/:round/:min/:max/:numbers?', async (c) => {
  const round = parseInt(c.req.param('round'));
  const min = parseInt(c.req.param('min'));
  const max = parseInt(c.req.param('max')) + 1;
  const numbers = parseInt(c.req.param('numbers') ?? '1');
  const beacon = await manager.getForRound(round);
  const random = new XORShift64(BigInt(`0x${beacon.randomness}`));

  if (numbers > 1) {
    const result = random.randRangeArray(numbers, min, max);
    return c.json({result, ...beacon});
  }
  else {
    const result = random.randRange(min, max);
    return c.json({result, ...beacon});
  }
});

app.post('/round/:round', async (c) => {
  const round = parseInt(c.req.param('round'));
  const beacon = await manager.getForRound(round);
  const random = new XORShift64(BigInt(`0x${beacon.randomness}`));
  const body = await c.req.json() as RandomRequest;
  const choices = random.shuffle(body.choices);
  return c.json({input: body.choices, shuffled:choices, choices: choices.slice(0, body.count ?? choices.length), ...beacon});
});



export default app;
