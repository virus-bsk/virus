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

Order ids are minted as `<email-prefix>_<timestamp>` (see `newOrderId` in
`src/utils/cashfree.js`), so the webhook maps a settled payment back to the right
`users/{email-prefix}` document with no extra bookkeeping. On `PAYMENT_SUCCESS`
it PATCHes `isPaid: true`, `orderId`, and `paymentId`.

The endpoint sits **outside** the `PROXY_TOKEN` check — Cashfree cannot send
your bearer token, it authenticates with an HMAC-SHA256 signature over the raw
body (`x-webhook-signature`), verified in constant time. Without that check
anyone could POST a fake "payment succeeded".

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
