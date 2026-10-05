// Sandbox-direct Cashfree integration (no backend).
// WARNING: the secret lives in the browser bundle — use ONLY with Sandbox
// test keys. For production, move order creation + webhook to a backend and
// keep the secret server-side.
const MODE = (import.meta.env.VITE_CASHFREE_MODE || "sandbox").toLowerCase();
const APP_ID = import.meta.env.VITE_CASHFREE_APP_ID || "";
const SECRET = import.meta.env.VITE_CASHFREE_APP_SECRET || "";

export const cashfreeMode = MODE;
export const cashfreeConfigured = Boolean(APP_ID && SECRET);

function baseUrl() {
  return MODE === "production"
    ? "https://api.cashfree.com/pg"
    : "https://sandbox.cashfree.com/pg";
}

function headers() {
  return {
    "Content-Type": "application/json",
    "x-api-version": "2023-08-01",
    "x-client-id": APP_ID,
    "x-client-secret": SECRET,
  };
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
