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
//   POST /webhook/cashfree          -> Cashfree payment webhook (auto-activates)
//
// Auto-activation: the browser cannot flip isPaid on its own without the tab
// staying open, so Cashfree posts here the moment a payment settles and this
// worker writes isPaid/orderId/paymentId to Firestore through a service account
// (Admin SDK credentials bypass the client security rules, which is what makes
// a true "no user action required" flow possible). The target document is
// resolved from Cashfree's own customer_email record — NOT from the order id
// alone, whose embedded prefix loses characters newOrderId strips (".", "+").
// Unreached-Cashfree answers 5xx so deliveries retry; the route refuses to
// run at all unless CASHFREE_WEBHOOK_SECRET is set.
//
// Secrets (Settings > Variables > Secrets, or `npx wrangler secret put ...`):
//   CASHFREE_APP_ID      required  Cashfree app id
//   CASHFREE_APP_SECRET  required  Cashfree secret key
//   PROXY_TOKEN          optional  if set, clients must send
//                                  `Authorization: Bearer <PROXY_TOKEN>`
//   CASHFREE_WEBHOOK_SECRET optional HMAC secret for x-webhook-signature
//   FIREBASE_PROJECT_ID  optional  e.g. "bskcoding-app" (needed for auto-write)
//   FIREBASE_CLIENT_EMAIL  optional service account e.g. "act@project.iam..."
//   FIREBASE_PRIVATE_KEY optional  the PEM private key, newlines preserved
// Vars (plain text variables):
//   CASHFREE_MODE       optional  "production" (default) or "sandbox"

const BASES = {
  production: "https://api.cashfree.com/pg",
  sandbox: "https://sandbox.cashfree.com/pg",
};

// ---------------------------------------------------------------------------
// Firebase Admin (service account) access, so the webhook can flip isPaid
// without a browser and without depending on the client security rules.
//
// Implemented against the plain REST APIs rather than the Admin SDK: the Admin
// SDK pulls in gRPC/node-only modules that do not run on Workers. The flow is
// the standard OAuth2 service-account JWT assertion:
//   1. sign a short-lived RS256 JWT with the service account private key
//   2. exchange it at oauth2.googleapis.com/token for an access token
//   3. PATCH the Firestore document with that bearer token
// ---------------------------------------------------------------------------

function pemToArrayBuffer(pem) {
  // Cloudflare secrets may arrive with literal "\n" sequences or real newlines.
  const normalized = String(pem).replace(/\\n/g, "\n");
  const body = normalized
    .replace(/-----BEGIN PRIVATE KEY-----/g, "")
    .replace(/-----END PRIVATE KEY-----/g, "")
    .replace(/\s+/g, "");
  const binary = atob(body);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return bytes.buffer;
}

function base64UrlEncode(input) {
  const bytes =
    typeof input === "string" ? new TextEncoder().encode(input) : new Uint8Array(input);
  let binary = "";
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function getAccessToken(env, force = false) {
  const now = Date.now();
  if (!force && env.__tokenCache && now < env.__tokenCache.expiresAt - 60_000) {
    return env.__tokenCache.value;
  }
  const issued = Math.floor(now / 1000);
  const header = base64UrlEncode(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claims = base64UrlEncode(
    JSON.stringify({
      iss: env.FIREBASE_CLIENT_EMAIL,
      scope: "https://www.googleapis.com/auth/datastore https://www.googleapis.com/auth/firebase.database",
      aud: "https://oauth2.googleapis.com/token",
      iat: issued,
      exp: issued + 3600,
    }),
  );
  const signingInput = `${header}.${claims}`;
  const key = await crypto.subtle.importKey(
    "pkcs8",
    pemToArrayBuffer(env.FIREBASE_PRIVATE_KEY),
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    key,
    new TextEncoder().encode(signingInput),
  );
  const assertion = `${signingInput}.${base64UrlEncode(signature)}`;
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }).toString(),
  });
  if (!res.ok) {
    throw new Error(`Firebase token exchange failed (${res.status}): ${await res.text()}`);
  }
  const data = await res.json();
  env.__tokenCache = { value: data.access_token, expiresAt: Date.now() + data.expires_in * 1000 };
  return data.access_token;
}

export function firebaseWriteConfigured(env) {
  return Boolean(
    env.FIREBASE_PROJECT_ID && env.FIREBASE_CLIENT_EMAIL && env.FIREBASE_PRIVATE_KEY,
  );
}

// Sets isPaid/orderId/paymentId on users/{docId} through the Firestore REST API.
// The service account is an Admin credential, so the client rules that block
// client-side isPaid writes are bypassed here by design.
//
// When the document already exists (normal case: accounts are created at
// login), only the three paid fields are patched. When it is MISSING — e.g.
// a late webhook delivery after the user cleared their data — a complete
// document is created instead: a PATCH-only write would leave a partial doc
// with no email, and the rules' read binding (resource.data.email == the
// signer's email) would then lock the account out entirely. The caller's
// customer_email/customer_name come straight from Cashfree's order record.
export async function activateMembership(
  env,
  docId,
  { orderId, paymentId, email = "", name = "" } = {},
) {
  if (!firebaseWriteConfigured(env)) {
    throw new Error("Firebase service-account secrets are not configured on the worker.");
  }
  if (!docId) throw new Error("Cannot activate: no document id.");
  const token = await getAccessToken(env);
  const docUrl =
    `https://firestore.googleapis.com/v1/projects/${env.FIREBASE_PROJECT_ID}` +
    `/databases/(default)/documents/users/${encodeURIComponent(docId)}`;
  const auth = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  const paidFields = {
    isPaid: { booleanValue: true },
    orderId: { stringValue: String(orderId) },
    paymentId:
      paymentId == null ? { nullValue: null } : { stringValue: String(paymentId) },
  };

  const existing = await fetch(docUrl, { method: "GET", headers: auth });
  if (existing.status !== 404 && !existing.ok) {
    throw new Error(`Firestore read failed (${existing.status}): ${await existing.text()}`);
  }
  if (existing.ok) {
    const current = await existing.json().catch(() => null);
    const fields = { ...paidFields };
    const masks = Object.keys(fields);
    // Repair identity fields if an older automation left them out — never
    // touch values that are already there.
    const storedEmail = current?.fields?.email?.stringValue;
    if (!storedEmail && email) fields.email = { stringValue: String(email) };
    const storedName = current?.fields?.userName?.stringValue;
    const fallbackName = String(name || email.split("@")[0] || docId).trim();
    if (!storedName && fallbackName) fields.userName = { stringValue: fallbackName };
    for (const key of Object.keys(fields)) {
      if (!masks.includes(key)) masks.push(key);
    }
    const url = `${docUrl}?${masks
      .map((key) => `updateMask.fieldPaths=${encodeURIComponent(key)}`)
      .join("&")}`;
    const res = await fetch(url, {
      method: "PATCH",
      headers: auth,
      body: JSON.stringify({ fields }),
    });
    if (!res.ok) {
      throw new Error(`Firestore write failed (${res.status}): ${await res.text()}`);
    }
    return true;
  }

  // Document missing: create it whole so the account can read it back.
  if (!email) {
    throw new Error(
      `Cannot create users/${docId}: the Cashfree order has no customer_email to anchor it with.`,
    );
  }
  const created = await fetch(docUrl, {
    method: "PUT",
    headers: auth,
    body: JSON.stringify({
      fields: {
        ...paidFields,
        email: { stringValue: String(email) },
        userName: {
          stringValue: String(name || email.split("@")[0] || docId).trim(),
        },
        date: { timestampValue: new Date().toISOString() },
      },
    }),
  });
  if (!created.ok) {
    throw new Error(`Firestore create failed (${created.status}): ${await created.text()}`);
  }
  return true;
}

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

// Cashfree signs webhooks with HMAC-SHA256 over the RAW body and sends the
// digest in x-webhook-signature. Verifying against the untouched body is what
// stops anyone from POSTing a fake "payment succeeded" to this endpoint.
async function verifyWebhookSignature(rawBody, signature, secret) {
  if (!signature || !secret) return false;
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const digest = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(rawBody),
  );
  const bytes = new Uint8Array(digest);
  const hex = Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  // Constant-time compare against every candidate Cashfree might send (hex, or
  // base64 of the raw digest). No Buffer here — it does not exist on Workers.
  let rawBinary = "";
  for (const b of bytes) rawBinary += String.fromCharCode(b);
  const candidates = [hex, btoa(rawBinary)];
  const expected = new TextEncoder().encode(signature.trim());
  for (const candidate of candidates) {
    const candidateBytes = new TextEncoder().encode(candidate);
    if (candidateBytes.length !== expected.length) continue;
    let diff = 0;
    for (let i = 0; i < expected.length; i += 1) diff |= expected[i] ^ candidateBytes[i];
    if (diff === 0) return true;
  }
  return false;
}

// Order ids are minted by the client as "<email-prefix>_<timestamp>" (see
// newOrderId in src/utils/cashfree.js) — a FALLBACK mapping only. It cannot
// see characters newOrderId strips (".", "+"), so for a prefix like
// "v.bharathbsk97" parsing alone yields "vbharathbsk97", the wrong document.
// The webhook prefers customer_email (see resolveDocIdForOrder): exact, no
// sanitisation involved.
function docIdFromOrderId(orderId) {
  const raw = String(orderId || "").toLowerCase();
  const match = raw.match(/^([a-z0-9_-]+?)_\d+$/);
  return match ? match[1] : null;
}

// customer_email -> users/{docId}: the exact inverse of userDocId() in
// src/utils/userProfile.js (the part before "@", lowercased).
function docIdFromEmail(email) {
  const trimmed = String(email || "").trim().toLowerCase();
  const at = trimmed.indexOf("@");
  return at > 0 ? trimmed.slice(0, at) : null;
}

function cashfreeBase(env) {
  return BASES[
    String(env.CASHFREE_MODE || "production").toLowerCase() === "sandbox"
      ? "sandbox"
      : "production"
  ];
}

// Resolve the Firestore document for a settled order. Asks Cashfree for the
// order first: customer_email tells us the exact doc id, and looking the
// order up at all means a correctly-signed-but-forged event body still cannot
// activate anything Cashfree does not actually show. Falls back to parsing
// the order id only when Cashfree's response carries no email.
async function resolveDocIdForOrder(orderId, env) {
  try {
    const res = await cashfreeFetch(
      cashfreeBase(env),
      `/orders/${encodeURIComponent(orderId)}`,
      "GET",
      null,
      env,
    );
    if (!res) return { docId: null, order: null, reachable: false };
    // Auth failures are a config problem on our side, not a bad order: say
    // unreachable so the caller answers 5xx and Cashfree retries after we
    // fix the keys. A 404 (wrong mode for the order, or sandbox test) still
    // falls back to the order-id parse below.
    if (!res.ok && res.status !== 404) {
      return { docId: null, order: null, reachable: false };
    }
    const order = res.ok ? await res.json().catch(() => null) : null;
    const email =
      order?.customer_details?.customer_email ??
      order?.customer_details?.customerEmail ??
      "";
    return {
      docId: docIdFromEmail(email) || docIdFromOrderId(orderId),
      order,
      reachable: true,
    };
  } catch {
    return { docId: null, order: null, reachable: false };
  }
}

async function handleCashfreeWebhook(request, env) {
  const rawBody = await request.text();
  // Fail closed: without a shared secret anyone who finds this URL could POST
  // a fake "payment succeeded" and activate an account. 200 (not an error) so
  // Cashfree does not retry forever while the secret is still being set up —
  // the payment is simply not activated from this path until it exists.
  if (!env.CASHFREE_WEBHOOK_SECRET) {
    console.warn(
      "Cashfree webhook ignored: CASHFREE_WEBHOOK_SECRET is not set.",
    );
    return json({
      received: true,
      ignored: true,
      reason: "CASHFREE_WEBHOOK_SECRET is not set on this worker.",
    });
  }
  const signature =
    request.headers.get("x-webhook-signature") ||
    request.headers.get("X-Webhook-Signature");
  const ok = await verifyWebhookSignature(
    rawBody,
    signature,
    env.CASHFREE_WEBHOOK_SECRET,
  );
  if (!ok) return jsonError("Invalid webhook signature.", 401);
  let event;
  try {
    event = JSON.parse(rawBody);
  } catch {
    return jsonError("Malformed webhook body.", 400);
  }

  const paymentStatus = event?.data?.payment_status;
  const orderId = event?.data?.order_id;
  const paymentId = event?.data?.payment_id;
  const eventType = event?.event_type;

  // Acknowledge everything that is not a settled payment so Cashfree stops
  // retrying: only PAYMENT_SUCCESS needs work.
  if (eventType !== "PAYMENT_SUCCESS" && paymentStatus !== "SUCCESS") {
    return json({ received: true, ignored: true, event_type: eventType || null });
  }

  if (!orderId) {
    return jsonError("Webhook event has no data.order_id.", 400);
  }
  if (!firebaseWriteConfigured(env)) {
    return jsonError(
      "Payment received but this worker has no Firebase service account, so isPaid cannot be set. Add FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL and FIREBASE_PRIVATE_KEY.",
      501,
    );
  }

  // Resolve the exact document via Cashfree's own customer_email record — the
  // raw order-id parse is lossy for prefixes with dots or "+" (newOrderId
  // strips them), so order-id parsing is only a fallback. If Cashfree cannot
  // be reached at all, 500 so Cashfree retries: writing a real payment to a
  // well-formed-but-wrong document is the bug that put one orderId on two
  // accounts, and must not happen again.
  const resolved = await resolveDocIdForOrder(orderId, env);
  if (!resolved.reachable) {
    return jsonError(
      `Could not fetch order "${orderId}" from Cashfree to verify it.`,
      500,
    );
  }
  if (!resolved.docId) {
    return jsonError(`Cannot map order "${orderId}" to a user document.`, 400);
  }
  const mappedDocId = resolved.docId;
  const customerName =
    resolved.order?.customer_details?.customer_name ??
    resolved.order?.customer_details?.customerName ??
    "";
  const customerEmail =
    resolved.order?.customer_details?.customer_email ??
    resolved.order?.customer_details?.customerEmail ??
    "";

  try {
    await activateMembership(env, mappedDocId, {
      orderId,
      paymentId,
      email: customerEmail,
      name: customerName,
    });
    return json({
      received: true,
      activated: true,
      doc_id: mappedDocId,
      order_id: orderId,
    });
  } catch (err) {
    // 500 makes Cashfree retry, which is what we want for a transient failure.
    return jsonError(`Could not activate ${mappedDocId}: ${err.message}`, 500);
  }
}

function json(payload, status = 200) {
  return withCors(
    new Response(JSON.stringify(payload), {
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
  // Cashfree reports errors as a 200 with a "code" body. Do not mask those as
  // success:false — an unknown order and an unpaid order must be
  // distinguishable, or a client can never tell a real failure from a pending
  // payment.
  if (data?.code) {
    return withCors(
      new Response(
        JSON.stringify({
          order_id: orderId,
          order_status: "UNKNOWN",
          payment_status: "UNKNOWN",
          payment_id: null,
          success: false,
          error: data.code,
          message: data.message || "Cashfree rejected the request.",
        }),
        { status: 404, headers: { "Content-Type": "application/json" } },
      ),
    );
  }
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
        // Who the order was created for — the browser only activates its own
        // account with a settled order (Payment.jsx gates on this), so one
        // payment can never flip a different account on the same machine.
        customer_email: data?.customer_details?.customer_email ?? null,
        customer_id: data?.customer_details?.customer_id ?? null,
        success: isPaid,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } },
    ),
  );
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Webhook first, and deliberately outside the PROXY_TOKEN check: Cashfree
    // cannot send our bearer token, it authenticates with an HMAC signature.
    if (url.pathname === "/webhook/cashfree") {
      if (request.method !== "POST") return jsonError("Method not allowed", 405);
      return handleCashfreeWebhook(request, env);
    }

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
