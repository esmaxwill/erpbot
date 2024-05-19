import { Hono, Context } from "hono";
import { Bindings } from "./bindings";
import { HTTPException } from "hono/http-exception";
import {
  getCookie,
  getSignedCookie,
  setCookie,
  setSignedCookie,
  deleteCookie,
} from "hono/cookie";
import { Buffer } from "node:buffer";

const API_ENDPOINT = "https://discord.com/api/v10";
const COOKIE_NAME = "Session";

interface TokenResponse {
  token_type: string;
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
}

export interface UserFields {
  id: string;
  username: string;
  avatar: string;
  global_name: string;
}

export interface UserInfo {
  user: UserFields;
  scopes: string[];
}

async function exchangeCode(
  context: Context,
  code: string,
  state: string,
): Promise<TokenResponse> {
  const headers = new Headers({
    "content-type": "application/x-www-form-urlencoded",
  });

  const response = await fetch(`${API_ENDPOINT}/oauth2/token`, {
    method: "POST",
    headers,
    body: new URLSearchParams({
      client_id: context.env.DISCORD_CLIENT_ID,
      client_secret: context.env.DISCORD_CLIENT_SECRET,
      grant_type: "authorization_code",
      code,
      redirect_uri: context.env.DISCORD_REDIRECT_URI,
      scopes: "identify",
      state,
    }).toString(),
  });

  const token = await response.json();
  return token as TokenResponse;
}

async function getUserInfo(
  context: Context,
  token: TokenResponse,
): Promise<UserInfo> {
  const response = await fetch(`${API_ENDPOINT}/oauth2/@me`, {
    method: "GET",
    headers: new Headers({ Authorization: `Bearer ${token.access_token}` }),
  });
  return (await response.json()) as UserInfo;
}

const app = new Hono<{ Bindings: Bindings }>();

app.get("/logout", async (c: Context) => {
  await deleteCookie(c, COOKIE_NAME, { prefix: "secure" });
  return c.text("Logged out.");
});

app.get("/login", (c: Context) => {
  const state = crypto.randomUUID();
  return c.redirect(
    `https://discord.com/oauth2/authorize?client_id=${c.env.DISCORD_CLIENT_ID}&response_type=code&redirect_uri=https%3A%2F%2F${c.env.REDIRECT_DOMAIN}%2Fauth%2Fcallback&scope=identify&state=${state}`,
    307,
  );
});

app.get("/callback", async (c: Context) => {
  const code = c.req.query("code");
  const state = c.req.query("state");

  if (!code || !state) {
    throw new HTTPException(400, { message: "Invalid code or state" });
  }

  const response = await exchangeCode(c, code, state);
  const userInfo = await getUserInfo(c, response);

  try {
    await c.env.Users.createUser({
      id: userInfo.user.id,
      username: userInfo.user.username,
    });
  } catch (error) {
    console.log("Caught error: ", error);
  }

  const cookieData = Buffer.from(JSON.stringify({ ...userInfo.user })).toString(
    "base64url",
  );

  await setSignedCookie(c, COOKIE_NAME, cookieData, c.env.COOKIE_SECRET, {
    prefix: "secure", // or `host`
    domain: "randtools.erpbot.app",
  });

  return c.json(userInfo);
});

export default app;
