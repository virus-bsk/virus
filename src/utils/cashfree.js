// Cashfree integration.
//
// Cashfree's Orders API refuses browser calls (CORS preflight does not allow
// the x-client-id/x-client-secret headers -> fetch fails with "Failed to
// fetch"), so all order traffic goes through a small Cloudflare Worker proxy
// (server/cashfree/) that adds the credentials server-side. Set
// VITE_CASHFREE_API_BASE to the worker URL; the app id/secret stay on the
// Worker as secrets and never ship in this bundle.
//
// Direct browser mode was removed deliberately: it cannot work against
// Cashfree's CORS policy, and it published the secret key to every visitor.
// import.meta.env only exists under Vite; the optional chaining keeps this
// module importable in plain Node (tests import newOrderId/orderBelongsToAccount).
const MODE = (import.meta.env?.VITE_CASHFREE_MODE || "sandbox").toLowerCase();
const PROXY_BASE = (import.meta.env?.VITE_CASHFREE_API_BASE || "")
  .trim()
  .replace(/\/+$/, "");
const PROXY_TOKEN = (import.meta.env?.VITE_CASHFREE_PROXY_TOKEN || "").trim();

export const cashfreeMode = MODE;
// Payments require the proxy. Without it we disable the Pay button up front
// rather than failing at click time with an opaque network error.
export const cashfreeConfigured = Boolean(PROXY_BASE);

function baseUrl() {
  if (!PROXY_BASE) {
    throw new Error(
      "Cashfree is not configured: VITE_CASHFREE_API_BASE is missing (see server/cashfree/README.md).",
    );
  }
  return PROXY_BASE;
}

function headers() {
  const h = {
    "Content-Type": "application/json",
    "x-api-version": "2023-08-01",
  };
  if (PROXY_TOKEN) h.Authorization = `Bearer ${PROXY_TOKEN}`;
  return h;
}

// Cashfree's Create Order API only accepts alphanumeric order ids plus "_"
// and "-" (max 50 chars), while Firestore doc ids are the raw email prefix —
// dots, "+", and whatnot. Everything that mints or checks an order id goes
// through sanitizeOrderPrefix so both sides of that conversion always agree.
export function sanitizeOrderPrefix(value) {
  return String(value ?? "").replace(/[^a-zA-Z0-9_-]/g, "");
}

// orderId must be unique per attempt: <sanitized-prefix>_<timestamp>
export function newOrderId(prefix) {
  const clean = sanitizeOrderPrefix(prefix) || "user";
  return `${clean}_${Date.now()}`;
}

// Inverse of newOrderId: "yamini4241574_1791198253137" -> "yamini4241574".
// Returns null when the id was not minted by newOrderId — the trailing
// timestamp is at least 10 digits, so ad-hoc ids like "test_1" are rejected.
export function orderOwnerPrefix(orderId) {
  const match = /^(.+)_(\d{10,})$/.exec(String(orderId || ""));
  return match ? match[1] : null;
}

// True when orderId was minted for docIdOrPrefix (a users/{docId} id or the
// raw email prefix). Both sides are sanitized and case-folded because
// newOrderId strips characters and caller casing may differ. This is the gate
// that keeps ONE settled payment from activating MULTIPLE accounts that share
// a browser: a pending order for user A must fail this check for user B.
export function orderBelongsToAccount(orderId, docIdOrPrefix) {
  const owner = orderOwnerPrefix(orderId);
  if (owner == null) return false;
  return (
    owner.toLowerCase() === sanitizeOrderPrefix(docIdOrPrefix).toLowerCase()
  );
}

export async function createCashfreeOrder({
  orderId,
  amount,
  currency = "INR",
  customerId,
  customerEmail,
  customerPhone = "9999999999",
  customerName = "",
  returnUrl,
}) {
  const res = await fetch(`${baseUrl()}/orders`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({
      order_id: orderId,
      order_amount: Number(amount),
      order_currency: currency,
      customer_details: {
        customer_id: customerId,
        customer_email: customerEmail || undefined,
        customer_phone: customerPhone,
        customer_name: customerName || undefined,
      },
      order_meta: {
        // Cashfree redirects here after payment; we verify via Get Order.
        return_url: returnUrl,
      },
    }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(
      data?.message || `Create order failed (${res.status})`,
    );
    err.details = data;
    throw err;
  }
  return data; // { payment_session_id, order_id, cf_order_id, order_status, ... }
}

export async function fetchCashfreeOrder(orderId) {
  const res = await fetch(`${baseUrl()}/orders/${encodeURIComponent(orderId)}`, {
    method: "GET",
    headers: headers(),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data?.message || `Get order failed (${res.status})`);
    err.details = data;
    throw err;
  }
  return data; // { order_status: ACTIVE|PAID|EXPIRED|..., cf_order_id, ... }
}

export async function fetchCashfreeOrderStatus(orderId) {
  // Simplified shape from the worker: { order_id, order_status, payment_status,
  // payment_id, success }. `success` is true only once Cashfree reports PAID.
  const res = await fetch(`${baseUrl()}/orders/${encodeURIComponent(orderId)}/status`, {
    method: "GET",
    headers: headers(),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data?.message || `Get order status failed (${res.status})`);
    err.details = data;
    throw err;
  }
  return data;
}

let sdkPromise = null;
// Loads https://sdk.cashfree.com/js/v3/cashfree.js once.
export function loadCashfreeSdk() {
  if (typeof window !== "undefined" && window.Cashfree) {
    return Promise.resolve(window.Cashfree);
  }
  if (!sdkPromise) {
    sdkPromise = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://sdk.cashfree.com/js/v3/cashfree.js";
      script.async = true;
      script.onload = () => {
        if (window.Cashfree) resolve(window.Cashfree);
        else reject(new Error("Cashfree SDK failed to load."));
      };
      script.onerror = () => reject(new Error("Cashfree SDK failed to load."));
      document.head.appendChild(script);
    });
  }
  return sdkPromise;
}

// Opens hosted checkout in a new tab (redirect mode) — simplest + reliable
// for static sites. Popup alternative: cashfree.checkout({ paymentSessionId, redirectTarget: "_modal" }).
export async function openCashfreeCheckout({ paymentSessionId, redirectTarget = "_self" }) {
  const Cashfree = await loadCashfreeSdk();
  const cashfree = Cashfree({ mode: MODE === "production" ? "production" : "sandbox" });
  await cashfree.checkout({ paymentSessionId, redirectTarget });
}
