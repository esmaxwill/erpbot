import {Context, Next} from 'hono';
import { HTTPException } from 'hono/http-exception';

import { getCookie, getSignedCookie, setCookie, setSignedCookie, deleteCookie } from 'hono/cookie'
import { createMiddleware } from "hono/factory";

import type { Env } from "hono/types";
import type { CookieMiddlewareOpts } from "./types";

export const cookieMiddleware = <T extends Env>(opts: CookieMiddlewareOpts) => {
  return createMiddleware<T>(async (c: Context, next: Next) => {
    const secret = c.env.COOKIE_SECRET;
    if(!secret) {
        throw new HTTPException(500, {message: "Cookie secret is not set."});
    }
    const cookie = await getSignedCookie(c, secret, opts.cookieName);
    if(!cookie) {
        throw new HTTPException(401, {message: "Unauthorized."});
    }
    await next();
  });
};
