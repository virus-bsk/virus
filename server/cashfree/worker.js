// Cloudflare Worker — Cashfree PG Orders API proxy.
//
// Why: Cashfree's API CORS preflight does NOT allow the x-client-id /
// x-client-secret headers, so browsers cannot call it directly (fetch fails
// with "Failed to fetch"). This worker sits in front: the browser calls THIS
// worker (same origin policy satisfied, CORS wide open here) and the worker
// adds the Cashfree credentials server-side — keeping the secret out of the
// browser bundle entirely.
//
// Endpoints (relative to the worker URL):
//   POST /orders            -> Create Order
//   GET  /orders/{order_id} -> Get Order
//
// Secrets (Settings > Variables > Secrets, or `npx wrangler secret put ...`):
//   CASHFREE_APP_ID     required  Cashfree app id
//   CASHFREE_APP_SECRET required  Cashfree secret key
//   PROXY_TOKEN         optional  if set, clients must send
//                                 `Authorization: Bearer <PROXY_TOKEN>`
// Vars (plain text variables):
//   CASHFREE_MODE       optional  "production" (default) or "sandbox"

const BASES = {
  production: "https://api.cashfree.com/pg",
  sandbox: "https://sandbox.cashfree.com/pg",
};

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, x-api-version",
  "Access-Control-Max-Age": "3600",
};

function withCors(response) {
  const headers = new Headers(response.headers);
  for (const [key, value] of Object.entries(CORS_HEADERS)) {
    headers.set(key, value);
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

function jsonError(message, status) {
  return withCors(
    new Response(JSON.stringify({ message }), {
      status,
      headers: { "Content-Type": "application/json" },
    }),
  );
}

// Only ever forward the two known order routes — never an open proxy.
const ORDER_ROUTE = /^\/orders(\/[A-Za-z0-9_.-]+)?$/;

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    }
    if (!env.CASHFREE_APP_ID || !env.CASHFREE_APP_SECRET) {
      return jsonError("Cashfree proxy secrets are not set on the worker.", 500);
    }
    if (env.PROXY_TOKEN) {
      const auth = request.headers.get("Authorization") || "";
      if (auth !== `Bearer ${env.PROXY_TOKEN}`) {
        return jsonError("Unauthorized", 401);
      }
    }

    const url = new URL(request.url);
    if (!ORDER_ROUTE.test(url.pathname)) {
      return jsonError("Not found", 404);
    }
    if (request.method !== "GET" && request.method !== "POST") {
      return jsonError("Method not allowed", 405);
    }

    const mode =
      String(env.CASHFREE_MODE || "production").toLowerCase() === "sandbox"
        ? "sandbox"
        : "production";
    const base = BASES[mode];

    const init = {
      method: request.method,
      headers: {
        "Content-Type": "application/json",
        "x-api-version": "2023-08-01",
        "x-client-id": env.CASHFREE_APP_ID,
        "x-client-secret": env.CASHFREE_APP_SECRET,
      },
    };
    if (request.method === "POST") {
      init.body = await request.text();
    }

    const upstream = await fetch(`${base}${url.pathname}`, init).catch(() => null);
    if (!upstream) {
      return jsonError("Could not reach Cashfree.", 502);
    }
    return withCors(upstream);
  },
};
