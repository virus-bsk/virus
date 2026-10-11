import{r as e}from"./rolldown-runtime-QTnfLwEv.js";import{h as t,r as n,u as r}from"./index-Dka5w6n9.js";/* empty css                 */var i=e(t(),1),a=n();function o({topic:e,index:t,isActive:n,onClick:r,total:i}){let o=`${e.meaning.slice(0,110)}...`;return(0,a.jsxs)(`article`,{className:`acid-card ${n?`active`:``}`,style:{"--acid-accent":e.accent},onClick:()=>r(e.id),children:[(0,a.jsxs)(`div`,{className:`acid-card-head`,children:[(0,a.jsx)(`span`,{className:`acid-card-letter api-topic-icon`,children:e.icon}),(0,a.jsxs)(`div`,{children:[(0,a.jsx)(`h3`,{className:`acid-card-name`,children:e.name}),(0,a.jsx)(`span`,{className:`acid-card-tagline`,children:e.tagline})]})]}),(0,a.jsx)(`p`,{className:`acid-card-summary`,children:o}),(0,a.jsxs)(`div`,{className:`acid-card-actions`,children:[(0,a.jsx)(`button`,{className:`acid-card-btn`,type:`button`,onClick:t=>{t.stopPropagation(),r(e.id)},children:`View details`}),(0,a.jsx)(`span`,{className:`acid-card-badge`,children:`API design`})]}),(0,a.jsxs)(`span`,{className:`acid-card-index`,children:[t+1,` / `,i]}),n&&(0,a.jsx)(`span`,{className:`acid-active-indicator`,children:(0,a.jsx)(`i`,{className:`fas fa-check-circle`})})]})}function s({topic:e,onClose:t}){return e?(0,a.jsx)(`div`,{className:`acid-modal-backdrop`,onClick:t,children:(0,a.jsxs)(`div`,{className:`acid-detail-panel`,onClick:e=>e.stopPropagation(),children:[(0,a.jsxs)(`div`,{className:`acid-detail-header`,children:[(0,a.jsxs)(`h2`,{children:[(0,a.jsx)(`span`,{className:`acid-detail-letter api-topic-icon`,children:e.icon}),(0,a.jsx)(`span`,{className:`acid-detail-title`,children:e.name}),(0,a.jsxs)(`span`,{className:`acid-detail-sub`,children:[`— `,e.tagline]})]}),(0,a.jsx)(`button`,{className:`acid-close-btn`,onClick:t,"aria-label":`Close details`,children:(0,a.jsxs)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,width:`18`,height:`18`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2.5`,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,a.jsx)(`line`,{x1:`18`,y1:`6`,x2:`6`,y2:`18`}),(0,a.jsx)(`line`,{x1:`6`,y1:`6`,x2:`18`,y2:`18`})]})})]}),(0,a.jsxs)(`div`,{className:`acid-modal-scroll-content`,children:[(0,a.jsxs)(`div`,{className:`acid-definition-box`,children:[(0,a.jsx)(`strong`,{children:`📘 Definition:`}),` `,e.meaning]}),(0,a.jsxs)(`div`,{className:`acid-detail-grid`,children:[(0,a.jsxs)(`div`,{className:`acid-info-box`,children:[(0,a.jsx)(`h3`,{children:`Real-world analogy`}),(0,a.jsx)(`p`,{children:e.analogy})]}),(0,a.jsxs)(`div`,{className:`acid-code-box`,children:[(0,a.jsx)(`h3`,{children:`Example`}),(0,a.jsx)(`pre`,{children:(0,a.jsx)(`code`,{children:e.sql})})]})]})]})]})}):null}var c=[{id:`REST`,name:`REST`,icon:`🌐`,tagline:`Resources over HTTP`,accent:`#1d4ed8`,meaning:`REST (Representational State Transfer) is an architectural style where everything is a resource with a URL. Clients interact with resources using standard HTTP verbs — stateless, cacheable, and uniform. Each request carries everything needed to process it.`,analogy:`Think of a library: each book has a unique catalogue number (URL). You don't call the librarian's name and explain everything — you just point at the catalogue number and say what you want (GET to read, POST to add, PUT to replace).`,sql:`GET    /users/42          -> fetch user 42
POST   /users             -> create a user
PUT    /users/42          -> replace user 42
PATCH  /users/42          -> partially update user 42
DELETE /users/42          -> remove user 42

# REST constraints: client-server, stateless,
# cacheable, uniform interface, layered system`},{id:`HTTP`,name:`HTTP Methods`,icon:`📨`,tagline:`GET · POST · PUT · PATCH · DELETE`,accent:`#c2410c`,meaning:`HTTP methods define the action on a resource. GET reads, POST creates, PUT replaces entirely, PATCH updates partially, DELETE removes. Safe methods (GET, HEAD) never change state; idempotent ones (GET, PUT, DELETE) give the same result when repeated.`,analogy:`A restaurant: GET = reading the menu (safe), POST = ordering a new dish (creates something), PUT = swapping your whole order, PATCH = asking for 'no onions' (small change), DELETE = cancelling the order.`,sql:`GET    -> Safe & Idempotent  (read only)
POST   -> Neither            (new resource each time)
PUT    -> Idempotent         (same result if repeated)
PATCH  -> Not guaranteed     (partial update)
DELETE -> Idempotent         (2nd delete = 404, still gone)

201 Created  -> POST success
204 No Content -> PUT/DELETE success (no body)`},{id:`IDEM`,name:`Idempotency`,icon:`🔁`,tagline:`Same request, same result`,accent:`#15803d`,meaning:`An operation is idempotent when performing it once or many times produces the same effect. Critical for retries: if the network drops after a payment request, the client can safely retry — the server recognises the Idempotency-Key and never charges twice.`,analogy:`An elevator button: press it once or ten times, the elevator comes once. That's idempotency. A light switch is also idempotent (on stays on). But sending a tweet twice creates two tweets — not idempotent.`,sql:`// Client sends a unique key with the request
POST /payments
Idempotency-Key: 7d9c0b8a-1234-4f2e

// Server stores the key + response for 24h
// 1st request  -> process & store result
// Retry (same key) -> return stored result,
//                     never double-charge

PUT /users/42   // naturally idempotent
DELETE /users/42 // naturally idempotent
POST /users     // NOT idempotent without a key`},{id:`PAGE`,name:`Pagination`,icon:`📄`,tagline:`Don't return 10 million rows`,accent:`#7c3aed`,meaning:`Pagination splits large result sets into pages. Offset pagination uses ?page=2&limit=20 (simple, but skips/shifts under writes). Cursor pagination uses an opaque pointer like ?cursor=abc (stable, fast, ideal for infinite scroll and very large datasets).`,analogy:`Reading a book one page at a time vs. cursor = a bookmark. Offset pagination counts pages from the start (page 500 is slow); cursor says 'continue from where you stopped' — always the same speed.`,sql:`# Offset pagination (simple, page N costs N*limit rows)
GET /products?page=3&limit=20
SELECT * FROM products LIMIT 20 OFFSET 40;

# Cursor pagination (stable & fast at any depth)
GET /products?cursor=prod_9f8e7d&limit=20
SELECT * FROM products
  WHERE id > 'prod_9f8e7d'
  ORDER BY id
  LIMIT 20;
// Response: { data: [...], nextCursor: "prod_ab12cd" }`},{id:`VER`,name:`API Versioning`,icon:`🔖`,tagline:`Evolve without breaking clients`,accent:`#0e7490`,meaning:`Versioning lets you change an API without breaking existing clients. Common strategies: URL path (/v1/users — most visible), header (Accept: application/vnd.api+json; v=2), or query param (?version=2). Never introduce breaking changes inside a released version.`,analogy:`A phone charger: EU plug vs UK plug — you can't silently change the shape; you release a new standard and support both. Old clients keep using v1, new clients adopt v2, and v1 is eventually sunset with a deprecation date.`,sql:`# 1. URL path versioning (most common)
GET /v1/users/42
GET /v2/users/42

# 2. Header versioning
GET /users/42
Accept: application/vnd.myapp.v2+json

# Deprecation practice:
#   - announce sunset date
#   - return Sunset + Deprecation headers
#   - keep N-1 versions alive`},{id:`RATE`,name:`Rate Limiting`,icon:`🚦`,tagline:`Protect your API from overload`,accent:`#b45309`,meaning:`Rate limiting caps how many requests a client can make in a time window (e.g. 100 req/min). Algorithms: Token Bucket (allows bursts), Leaky Bucket (smooths traffic), Fixed/Sliding Window counters. Exceeding the limit returns 429 Too Many Requests with a Retry-After header.`,analogy:`A toll gate: one car every few seconds. Token Bucket = you get 10 tokens, each request spends one, tokens refill over time — so you can spend all 10 in one burst, then must wait for refill.`,sql:`// Common HTTP responses
429 Too Many Requests
Retry-After: 30
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 1699999999

// Token Bucket pseudocode
on request:
  refill(bucket)          // tokens += rate * elapsed
  if bucket.tokens >= 1:
    bucket.tokens -= 1
    allow()
  else:
    reject(429)`},{id:`TRANSPORT`,name:`HTTP/HTTPS & TCP vs UDP`,icon:`🌐`,tagline:`The transport layer under every API`,accent:`#1d4ed8`,meaning:`TCP is connection-oriented with guaranteed, ordered delivery (HTTP, gRPC, databases); UDP is connectionless fire-and-forget with no guarantees but minimal latency (video, gaming, DNS, QUIC). HTTPS is HTTP over TLS — encryption plus server identity via certificates. Interviews expect you to pick TCP vs UDP per use case.`,analogy:`TCP is registered mail: every letter is confirmed and arrives in order. UDP is a radio broadcast: fast, no confirmation — some people may miss it, and that's fine.`,sql:`# TCP vs UDP
TCP: handshake, retransmit, ordered
     -> web, DB, file transfer, gRPC
UDP: no handshake, no retransmit,
     low latency, can lose packets
     -> live video, VoIP, gaming, DNS

# HTTP/1.1 vs 2 vs 3
1.1  : one request per connection
2    : multiplexing over one TCP conn
3    : HTTP over QUIC (UDP) — no
       TCP head-of-line blocking

# HTTPS = HTTP + TLS
cert proves server identity,
keys encrypt the session.`}];function l(){let[e,t]=(0,i.useState)(null),n=c.find(t=>t.id===e),l=e=>{t(t=>t===e?null:e)};return(0,a.jsxs)(`div`,{className:`acid-page`,children:[(0,a.jsxs)(`section`,{className:`acid-hero`,children:[(0,a.jsx)(r,{to:`/maang/system-design-basics`,className:`acid-back`,children:`← Back to System Design Basics`}),(0,a.jsxs)(`h1`,{className:`acid-title`,children:[`API `,(0,a.jsx)(`span`,{children:`Design`})]}),(0,a.jsxs)(`p`,{className:`acid-subtitle`,children:[`Design APIs that scale, survive retries, and never break clients.`,` `,(0,a.jsx)(`strong`,{children:`REST`}),` · `,(0,a.jsx)(`strong`,{children:`HTTP Methods`}),` ·`,` `,(0,a.jsx)(`strong`,{children:`Idempotency`}),` · `,(0,a.jsx)(`strong`,{children:`Pagination`}),` ·`,` `,(0,a.jsx)(`strong`,{children:`Versioning`}),` · `,(0,a.jsx)(`strong`,{children:`Rate Limiting`})]}),(0,a.jsxs)(`div`,{className:`acid-chip-row`,children:[(0,a.jsx)(`span`,{className:`acid-chip`,children:`🧩 6 core concepts`}),(0,a.jsx)(`span`,{className:`acid-chip`,children:`🌐 RESTful conventions`}),(0,a.jsx)(`span`,{className:`acid-chip`,children:`🛡️ Production-ready APIs`})]})]}),(0,a.jsxs)(`section`,{className:`acid-define`,children:[(0,a.jsx)(`h2`,{children:`🤔 What is API Design in one line?`}),(0,a.jsxs)(`p`,{children:[`API design is the art of exposing your service through`,` `,(0,a.jsx)(`b`,{children:`predictable, self-explanatory endpoints`}),`. A well-designed API is consistent in naming, safe under retries (idempotency), never overwhelming (pagination + rate limiting), and evolves without breaking anyone (versioning). These six topics come up in almost every backend / system design interview round.`]}),(0,a.jsxs)(`div`,{className:`acid-one-liner`,children:[`💡 A good API is `,(0,a.jsx)(`b`,{children:`intuitive`}),`, `,(0,a.jsx)(`b`,{children:`predictable`}),`,`,` `,(0,a.jsx)(`b`,{children:`retry-safe`}),`, and `,(0,a.jsx)(`b`,{children:`protects itself`}),` — anyone can guess the next endpoint just by reading the existing ones.`]})]}),(0,a.jsxs)(`section`,{className:`acid-props`,children:[(0,a.jsx)(`h2`,{className:`acid-section-title`,children:`The 6 API Design Concepts`}),(0,a.jsx)(`p`,{className:`acid-section-sub`,children:`Click any card to open the full explanation with a real-world analogy and example.`}),(0,a.jsx)(`div`,{className:`acid-grid`,children:c.map((t,n)=>(0,a.jsx)(o,{topic:t,index:n,total:c.length,isActive:e===t.id,onClick:l},t.id))})]}),(0,a.jsx)(s,{topic:n,onClose:()=>t(null)})]})}export{l as default};