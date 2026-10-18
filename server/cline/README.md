# Cline API Proxy (Cloudflare Worker)

Proxies `api.cline.bot` chat completions through a CORS-enabled worker so the
browser can call it directly without CORS errors.

## Setup

1. Install dependencies:
   ```
   cd server/cline
   npm install
   ```

2. Set the Cline API key secret:
   ```
   npx wrangler secret put CLINE_API_KEY
   ```

3. Deploy:
   ```
   npx wrangler deploy
   ```

4. Update your frontend `.env`:
   ```
   VITE_CLINEC_API_KEY=  (leave empty — key lives in the worker)
   VITE_CLINEC_BASE_URL=https://cline-proxy.YOUR_SUBDOMAIN.workers.dev
   VITE_CLINEC_MODEL=nvidia/nemotron-3.5-super-vl:free
   ```

## How it works

- Browser calls `https://cline-proxy.workers.dev/chat/completions`
- Worker adds `Authorization: Bearer CLINE_API_KEY` server-side
- Worker forwards to `https://api.cline.bot/api/v1/chat/completions`
- CORS headers allow browser access