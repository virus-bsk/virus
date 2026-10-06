# Cashfree proxy (Cloudflare Worker)

Cashfree's Orders API blocks browser calls (its CORS preflight does not allow
the `x-client-id` / `x-client-secret` headers), so the site calls this worker
instead. The worker adds your Cashfree credentials — the secret never ships in
the browser bundle.

## 1. Deploy (Cloudflare dashboard — easiest)

1. Create a free account at https://dash.cloudflare.com
2. **Workers & Pages → Create → Worker → Hello World** (name it `cashfree-proxy`)
3. **Edit code**, delete the template, paste the entire contents of `worker.js`, **Deploy**
4. Note your URL, e.g. `https://cashfree-proxy.<your-account>.workers.dev`

## 1. Deploy (wrangler CLI — alternative)

```bash
cd server/cashfree
npx wrangler login
npx wrangler deploy
```

## 2. Configure secrets

Dashboard: **Settings → Variables and Secrets → Add**:

| Name | Type | Value |
|---|---|---|
| `CASHFREE_APP_ID` | Secret | your Cashfree app id |
| `CASHFREE_APP_SECRET` | Secret | your Cashfree secret key |
| `CASHFREE_MODE` | Plain text | `production` (or `sandbox`) |
| `PROXY_TOKEN` | Secret (optional) | any long random string — recommended |

CLI:
```bash
npx wrangler secret put CASHFREE_APP_ID
npx wrangler secret put CASHFREE_APP_SECRET
npx wrangler secret put PROXY_TOKEN        # optional
```

## 3. Point the site at the worker

`.env` (local) and the GitHub repo secret (for deploys):

```
VITE_CASHFREE_API_BASE=https://cashfree-proxy.<your-account>.workers.dev
VITE_CASHFREE_PROXY_TOKEN=<same value as PROXY_TOKEN, if you set it>
```

Restart `npm run dev` / push to `main` to redeploy.

## Automatic activation (no user action)

Cashfree can notify the worker the moment a payment settles, and the worker
writes `isPaid` to Firestore through a **Firebase service account**. Because a
service account is an Admin credential, this bypasses the client security rules
— which is exactly why it can flip `isPaid` with no browser involved.

### 4a. Create the service account

Firebase console → **Project settings → Service accounts → Generate new private
key** (JSON download). From that JSON take three values:

| Worker secret | JSON field |
|---|---|
| `FIREBASE_PROJECT_ID` | `project_id` |
| `FIREBASE_CLIENT_EMAIL` | `client_email` |
| `FIREBASE_PRIVATE_KEY` | `private_key` (keep the `-----BEGIN/END-----` lines; paste on **one** line — `\n` escapes are handled) |

```bash
npx wrangler secret put FIREBASE_PROJECT_ID
npx wrangler secret put FIREBASE_CLIENT_EMAIL
npx wrangler secret put FIREBASE_PRIVATE_KEY
```

### 4b. Register the webhook

Cashfree dashboard → **Developers → Webhooks**, endpoint URL:

```
https://cashfree-proxy.<your-account>.workers.dev/webhook/cashfree
```

Subscribe to `PAYMENT_SUCCESS`. Copy the webhook secret Cashfree shows you into:

```bash
npx wrangler secret put CASHFREE_WEBHOOK_SECRET
```

### How it works

Order ids are minted as `<email-prefix>_<timestamp>` (see
`orderBelongsToAccount` in `src/utils/cashfree.js` — the single definition of
that convention), so the browser can confirm a settled order was created for
the signed-in account before it writes anything: `src/pages/Payment.jsx`
requires BOTH the minted prefix AND Cashfree's `customer_email` on the order
(the new fields on `GET /orders/{id}/status`) to match this account. Either
mismatch refuses the write, and the pending order lives under a per-account
localStorage key (`bskcoding.pendingCashfreeOrder.<email-prefix>`).

A single shared pending-order key was the bug that let one payment activate
every Google account signed into a browser: the page read whatever order was
stored and wrote `isPaid` into the then-current user's document without
checking ownership — different accounts ended up carrying the same
`orderId`/`paymentId`. Check for that if it ever happens again: any
`users/` document whose `orderId` does not start with its own document id
(plus `_`) was activated from someone else's payment and should be reset
(`isPaid: false`, `orderId: ""`, remove `paymentId`) in the Firebase console.

On `PAYMENT_SUCCESS` the webhook re-fetches the order from Cashfree
(`CASHFREE_MODE` must match the mode the order was created in) and maps it to
`users/{email-prefix}` through `customer_details.customer_email` — not the
order id, whose embedded prefix loses characters `newOrderId` strips (".",
"+"). Order-id parsing is only the fallback when Cashfree's response carries
no email. If the document is missing it is created whole (email, userName,
date included), so the rules' email read-binding keeps working. If Cashfree
cannot be reached at all, the worker answers 5xx so Cashfree retries — it
never guesses.

The endpoint sits **outside** the `PROXY_TOKEN` check — Cashfree cannot send
your bearer token. Instead the route **fails closed**: unless
`CASHFREE_WEBHOOK_SECRET` is set, deliveries are acknowledged-but-ignored
(200, no activation), so anyone who finds the URL cannot POST a fake "payment
succeeded". With the secret set, the HMAC-SHA256 signature over the raw body
(`x-webhook-signature`) is verified in constant time; without it, 401.

Test it locally:
```bash
BODY='{"event_type":"PAYMENT_SUCCESS","data":{"order_id":"bsktrending11_1791189124500","payment_id":6664565849,"payment_status":"SUCCESS"}}'
SIG=$(printf '%s' "$BODY" | openssl dgst -sha256 -hmac "$CASHFREE_WEBHOOK_SECRET" -hex | sed 's/^.* //')
curl -X POST https://cashfree-proxy.<your-account>.workers.dev/webhook/cashfree \
  -H "x-webhook-signature: $SIG" -d "$BODY"
# {"received":true,"activated":true,"doc_id":"bsktrending11",...}
```

The browser flow in `src/pages/Payment.jsx` is kept as a fallback: if a webhook
delivery is ever missed, the page still verifies on load via
`GET /orders/{id}/status`.

## Quick test

```bash
curl -X POST https://cashfree-proxy.<your-account>.workers.dev/orders \
  -H "Content-Type: application/json" \
  -d '{"order_id":"test_1","order_amount":1,"order_currency":"INR","customer_details":{"customer_id":"t1","customer_phone":"9999999999"}}'
```
