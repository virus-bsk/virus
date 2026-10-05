// Cashfree integration.
//
// Cashfree's Orders API refuses browser calls (CORS preflight does not allow
// the x-client-id/x-client-secret headers -> fetch fails with "Failed to
// fetch"), so in practice this app talks to a small Cloudflare Worker proxy
// (server/cashfree/) that adds the credentials server-side. Set
// VITE_CASHFREE_API_BASE to the worker URL to use it — the secret then stays
// out of the bundle entirely.
//
// Direct mode (API base empty) still exists as a fallback, but only works if
// Cashfree ever opens CORS; keep keys out of production bundles regardless.
const MODE = (import.meta.env.VITE_CASHFREE_MODE || "sandbox").toLowerCase();
const APP_ID = import.meta.env.VITE_CASHFREE_APP_ID || "";
const SECRET = import.meta.env.VITE_CASHFREE_APP_SECRET || "";
const PROXY_BASE = (import.meta.env.VITE_CASHFREE_API_BASE || "")
  .trim()
  .replace(/\/+$/, "");
const PROXY_TOKEN = (import.meta.env.VITE_CASHFREE_PROXY_TOKEN || "").trim();

export const cashfreeMode = MODE;
// Enabled when either the proxy URL or direct keys are present.
export const cashfreeConfigured = Boolean(PROXY_BASE || (APP_ID && SECRET));

function baseUrl() {
  if (PROXY_BASE) return PROXY_BASE;
  return MODE === "production"
    ? "https://api.cashfree.com/pg"
    : "https://sandbox.cashfree.com/pg";
}

function headers() {
  const h = {
    "Content-Type": "application/json",
    "x-api-version": "2023-08-01",
  };
  if (PROXY_TOKEN) h.Authorization = `Bearer ${PROXY_TOKEN}`;
  if (!PROXY_BASE) {
    // Direct mode only — via the proxy these are injected server-side.
    h["x-client-id"] = APP_ID;
    h["x-client-secret"] = SECRET;
  }
  return h;
}

// orderId must be unique per attempt: <prefix>_<timestamp>
export function newOrderId(prefix) {
  const clean = String(prefix || "user").replace(/[^a-zA-Z0-9_-]/g, "");
  return `${clean}_${Date.now()}`;
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
