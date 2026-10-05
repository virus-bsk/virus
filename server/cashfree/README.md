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

## Quick test

```bash
curl -X POST https://cashfree-proxy.<your-account>.workers.dev/orders \
  -H "Content-Type: application/json" \
  -d '{"order_id":"test_1","order_amount":1,"order_currency":"INR","customer_details":{"customer_id":"t1","customer_phone":"9999999999"}}'
```
