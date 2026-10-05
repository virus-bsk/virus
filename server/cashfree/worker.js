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
//   POST /orders                    -> Create Order
//   GET  /orders/{order_id}         -> Get Order (raw Cashfree response)
//   GET  /orders/{order_id}/status  -> Simplified payment status for the client
//   GET  /orders/{order_id}/payments-> Raw Cashfree payments list for that order
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

// Only ever forward the known order routes — never an open proxy.
const ORDER_ID = "[A-Za-z0-9_.-]+";
const STATUS_ROUTE = new RegExp(`^/orders/(${ORDER_ID})/status$`);
const PAYMENTS_ROUTE = new RegExp(`^/orders/(${ORDER_ID})/payments$`);
const ORDER_ROUTE = new RegExp(`^/orders(/(${ORDER_ID}))?(/(status|payments))?$`);

async function cashfreeFetch(base, path, method, body, env) {
  const init = {
    method,
    headers: {
      "Content-Type": "application/json",
      "x-api-version": "2023-08-01",
      "x-client-id": env.CASHFREE_APP_ID,
      "x-client-secret": env.CASHFREE_APP_SECRET,
    },
  };
  if (body != null) init.body = body;
  return fetch(`${base}${path}`, init).catch(() => null);
}

// GET /orders/{id}/status — a small, stable shape for the browser so the client
// never has to parse Cashfree's nested payments array. success === true only
// when the order is PAID, and payment_id is then Cashfree's payment id.
async function orderStatus(base, orderId, env) {
  const upstream = await cashfreeFetch(base, `/orders/${orderId}`, "GET", null, env);
  if (!upstream) return jsonError("Could not reach Cashfree.", 502);
  if (!upstream.ok) {
    const text = await upstream.text();
    return withCors(
      new Response(text || JSON.stringify({ message: "Order not found." }), {
        status: upstream.status,
        headers: { "Content-Type": "application/json" },
      }),
    );
  }
  const data = await upstream.json().catch(() => ({}));
  const orderStatusValue = data?.order_status || "UNKNOWN";
  // Cashfree reports the per-attempt outcome in payments[]; the first
  // successful one carries the payment id we hand back to the client.
  const payments = Array.isArray(data?.payments) ? data.payments : [];
  const paid = payments.find((p) => p?.payment_status === "SUCCESS");
  const isPaid = orderStatusValue === "PAID" || Boolean(paid);
  return withCors(
    new Response(
      JSON.stringify({
        order_id: data?.order_id || orderId,
        order_status: orderStatusValue,
        payment_status: isPaid ? "SUCCESS" : orderStatusValue,
        payment_id: isPaid ? paid?.payment_id ?? null : null,
        cf_order_id: data?.cf_order_id ?? null,
        success: isPaid,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } },
    ),
  );
}

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

    const statusMatch = url.pathname.match(STATUS_ROUTE);
    const paymentsMatch = url.pathname.match(PAYMENTS_ROUTE);
    if (statusMatch || paymentsMatch) {
      if (request.method !== "GET") {
        return jsonError("Method not allowed", 405);
      }
      const mode =
        String(env.CASHFREE_MODE || "production").toLowerCase() === "sandbox"
          ? "sandbox"
          : "production";
      const base = BASES[mode];
      if (statusMatch) return orderStatus(base, statusMatch[1], env);
      const upstream = await cashfreeFetch(
        base,
        `/orders/${paymentsMatch[1]}/payments`,
        "GET",
        null,
        env,
      );
      if (!upstream) return jsonError("Could not reach Cashfree.", 502);
      return withCors(upstream);
    }

    if (request.method !== "GET" && request.method !== "POST") {
      return jsonError("Method not allowed", 405);
    }

    const mode =
      String(env.CASHFREE_MODE || "production").toLowerCase() === "sandbox"
        ? "sandbox"
        : "production";
    const base = BASES[mode];

    const body = request.method === "POST" ? await request.text() : null;
    const upstream = await cashfreeFetch(base, url.pathname, request.method, body, env);
    if (!upstream) {
      return jsonError("Could not reach Cashfree.", 502);
    }
    return withCors(upstream);
  },
};
