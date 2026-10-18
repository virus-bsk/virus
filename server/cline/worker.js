// Cloudflare Worker — Cline API proxy.
//
// Why: api.cline.bot does not allow CORS preflight from browser origins, so
// direct fetch() from the browser fails. This worker sits in front: the browser
// calls THIS worker (CORS wide open here) and the worker forwards the request
// to api.cline.bot with the Cline API key added server-side — keeping the key
// out of the browser bundle.
//
// Endpoints:
//   POST /chat/completions  -> Cline Chat Completions (passes through body)
//   GET  /models            -> List available models
//
// Secrets:
//   CLINE_API_KEY   required  your Cline API key (set via `npx wrangler secret put CLINE_API_KEY`)
//
// Vars:
//   CLINE_BASE_URL  optional  default: https://api.cline.bot/api/v1

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Max-Age": "86400",
};

function withCors(response, init = {}) {
  return new Response(response.body, {
    ...init,
    headers: { ...CORS_HEADERS, ...init.headers },
  });
}

function jsonError(message, status) {
  return withCors(
    JSON.stringify({ error: message }),
    { status, headers: { "Content-Type": "application/json" } },
  );
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    }

    if (!env.CLINE_API_KEY) {
      return jsonError("Cline proxy secret not configured.", 500);
    }

    const base = env.CLINE_BASE_URL || "https://api.cline.bot/api/v1";

    // Only allow /chat/completions and /models
    const pathname = url.pathname;
    if (pathname !== "/chat/completions" && pathname !== "/models") {
      return jsonError("Not found", 404);
    }

    // Forward the request to api.cline.bot
    const upstreamUrl = new URL(pathname, base);
    upstreamUrl.search = url.search; // preserve query string

    const headers = {};
    const contentType = request.headers.get("Content-Type");
    if (contentType) headers["Content-Type"] = contentType;
    headers["Authorization"] = `Bearer ${env.CLINE_API_KEY}`;

    const init = {
      method: request.method,
      headers,
    };

    if (request.method === "POST") {
      init.body = await request.text();
    }

    let upstream;
    try {
      upstream = await fetch(upstreamUrl.toString(), init);
    } catch (_) {
      return jsonError("Could not reach Cline API.", 502);
    }

    const responseBody = await upstream.text();
    const responseHeaders = {};
    upstream.headers.forEach((val, key) => {
      // Strip hop-by-hop headers
      if (
        key !== "connection" &&
        key !== "keep-alive" &&
        key !== "proxy-authenticate" &&
        key !== "proxy-authorization" &&
        key !== "te" &&
        key !== "trailers" &&
        key !== "transfer-encoding" &&
        key !== "upgrade"
      ) {
        responseHeaders[key] = val;
      }
    });

    return withCors(responseBody, {
      status: upstream.status,
      headers: responseHeaders,
    });
  },
};