import{r as e}from"./rolldown-runtime-QTnfLwEv.js";import{t}from"./react-CZI7_Jkm.js";import{r as n,s as r}from"./index-BjSszV1C.js";/* empty css                 */var i=e(t(),1),a=n(),o=[{id:`CDN`,name:`CDN`,icon:`🌍`,tagline:`Serve content from locations near users`,accent:`#1d4ed8`,meaning:`A Content Delivery Network is a geographically distributed set of servers that caches content close to users. Instead of every user hitting your origin server (possibly on another continent), they fetch static assets from the nearest edge location — cutting latency, offloading origin traffic, and absorbing traffic spikes and DDoS attacks.`,analogy:`A global restaurant chain: instead of flying every meal from one central kitchen in Paris, each city has its own branch kitchen serving the same menu locally. Same food (content), delivered fresh and fast wherever you are.`,sql:`# Without CDN
User (India) ---- Origin (USA)     RTT ~250ms+

# With CDN
User (India) --> Edge (Mumbai)     RTT ~10ms
                   | cache HIT  -> serve (fast)
                   | cache MISS -> fetch from
                   |              origin once,
                   |              cache, serve

# Providers: CloudFront, Cloudflare,
# Akamai, Fastly, Google Cloud CDN

# What to serve via CDN:
static assets (js/css/images/video),
downloads, streamed media, API edge caching`},{id:`EDGE`,name:`Edge & Origin Servers`,icon:`🛰️`,tagline:`Many copies near users, one source of truth`,accent:`#c2410c`,meaning:`The origin server is the source of truth holding the original content. Edge servers (PoPs — Points of Presence) are distributed caches that store copies of that content near users. On a cache miss, the edge fetches from origin (origin pull), caches it per its TTL, and serves subsequent requests itself — dramatically reducing origin load.`,analogy:`A book publisher (origin) and city bookshops (edges). The publisher ships one copy to each city; readers buy locally. Only when a book sells out does the shop reorder from the publisher.`,sql:`# Request flow
edge(Mumbai) receives request
  HIT  -> serve immediately        (~95% goal)
  MISS -> origin pull:
          edge -> origin -> cache -> serve

# Origin protection
- long TTLs for immutable assets
- origin shield: one middle-tier cache
  collapses many edge misses into one
  origin fetch
- stale-while-revalidate: serve stale
  copy while refreshing in background`},{id:`CACHECTRL`,name:`Cache-Control & Headers`,icon:`🎛️`,tagline:`Telling caches exactly what to do`,accent:`#15803d`,meaning:`HTTP caching headers control how long and how aggressively content is cached: Cache-Control (max-age, no-cache, no-store, private/public), ETag/Last-Modified for validation (If-None-Match -> 304 Not Modified), and Vary for per-header cache keys. Correct headers are the difference between a fast site and an origin on fire.`,analogy:`Milk carton expiry date: shops know exactly how long they can display it (max-age), and can check with the supplier whether the batch changed (ETag) instead of shipping new milk every day.`,sql:`# Immutable hashed assets — cache hard
Cache-Control: public, max-age=31536000,
               immutable
app.9f8e7d.js   (hash changes -> new URL)

# HTML — revalidate every time
Cache-Control: no-cache
  (store, but revalidate with ETag)

ETag: "abc123"
-> If-None-Match: "abc123"
<- 304 Not Modified   (no body! cheap)

# Never cache personal data
Cache-Control: private, no-store

# Purging: CDNs allow purge-by-URL /
# purge-by-tag when content changes.`},{id:`STATIC`,name:`Static vs Dynamic Delivery`,icon:`📦`,tagline:`Cache the repeatable, personalize the rest`,accent:`#0e7490`,meaning:`Static content (images, JS, CSS, video) is identical for every user — perfect for full edge caching. Dynamic content (personalized APIs) varies per user, but modern CDNs still help: TLS termination, connection reuse, route optimization, and micro-caching or edge-compute (Lambda@Edge, Cloudflare Workers) for short-TTL personalization.`,analogy:`Newspapers (static) are printed in bulk and identical for everyone — stock them everywhere. A tailor-made suit (dynamic) is produced per customer, but you can still keep measuring tape and fabric in every city to speed it up.`,sql:`# Strategy per content type
images/js/css/video -> CDN cache, long TTL
HTML                -> no-cache + ETag
API GET (public)    -> short TTL micro-cache
API (personalized)  -> no cache, but use
   CDN's optimized backbone routes +
   edge compute for auth/token checks

# Result: most bytes come from the edge,
# origin only sees misses & dynamic calls.

# Interview angle: "Design a video
# streaming service" -> CDN for segments,
# adaptive bitrate, origin stores masters.`}];function s({topic:e,index:t,isActive:n,onClick:r}){let i=`${e.meaning.slice(0,110)}...`;return(0,a.jsxs)(`article`,{className:`acid-card ${n?`active`:``}`,style:{"--acid-accent":e.accent},onClick:()=>r(e.id),children:[(0,a.jsxs)(`div`,{className:`acid-card-head`,children:[(0,a.jsx)(`span`,{className:`acid-card-letter`,children:e.icon}),(0,a.jsxs)(`div`,{children:[(0,a.jsx)(`h3`,{className:`acid-card-name`,children:e.name}),(0,a.jsx)(`span`,{className:`acid-card-tagline`,children:e.tagline})]})]}),(0,a.jsx)(`p`,{className:`acid-card-summary`,children:i}),(0,a.jsxs)(`div`,{className:`acid-card-actions`,children:[(0,a.jsx)(`button`,{className:`acid-card-btn`,type:`button`,onClick:t=>{t.stopPropagation(),r(e.id)},children:`View details`}),(0,a.jsx)(`span`,{className:`acid-card-badge`,children:`Concept`})]}),(0,a.jsxs)(`span`,{className:`acid-card-index`,children:[t+1,` / `,o.length]}),n&&(0,a.jsx)(`span`,{className:`acid-active-indicator`,children:(0,a.jsx)(`i`,{className:`fas fa-check-circle`})})]})}function c({topic:e,onClose:t}){return e?(0,a.jsx)(`div`,{className:`acid-modal-backdrop`,onClick:t,children:(0,a.jsxs)(`div`,{className:`acid-detail-panel`,onClick:e=>e.stopPropagation(),children:[(0,a.jsxs)(`div`,{className:`acid-detail-header`,children:[(0,a.jsxs)(`h2`,{children:[(0,a.jsx)(`span`,{className:`acid-detail-letter`,children:e.icon}),(0,a.jsx)(`span`,{className:`acid-detail-title`,children:e.name}),(0,a.jsxs)(`span`,{className:`acid-detail-sub`,children:[`— `,e.tagline]})]}),(0,a.jsx)(`button`,{className:`acid-close-btn`,onClick:t,"aria-label":`Close details`,children:(0,a.jsxs)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,width:`18`,height:`18`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2.5`,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,a.jsx)(`line`,{x1:`18`,y1:`6`,x2:`6`,y2:`18`}),(0,a.jsx)(`line`,{x1:`6`,y1:`6`,x2:`18`,y2:`18`})]})})]}),(0,a.jsxs)(`div`,{className:`acid-modal-scroll-content`,children:[(0,a.jsxs)(`div`,{className:`acid-definition-box`,children:[(0,a.jsx)(`strong`,{children:`📘 Definition:`}),` `,e.meaning]}),(0,a.jsxs)(`div`,{className:`acid-detail-grid`,children:[(0,a.jsxs)(`div`,{className:`acid-info-box`,children:[(0,a.jsx)(`h3`,{children:`Real-world analogy`}),(0,a.jsx)(`p`,{children:e.analogy})]}),(0,a.jsxs)(`div`,{className:`acid-code-box`,children:[(0,a.jsx)(`h3`,{children:`How it works`}),(0,a.jsx)(`pre`,{children:(0,a.jsx)(`code`,{children:e.sql})})]})]})]})]})}):null}function l(){let[e,t]=(0,i.useState)(null),n=o.find(t=>t.id===e),l=e=>{t(t=>t===e?null:e)};return(0,a.jsxs)(`div`,{className:`acid-page`,children:[(0,a.jsxs)(`section`,{className:`acid-hero`,children:[(0,a.jsx)(r,{to:`/maang/system-design-basics`,className:`acid-back`,children:`← Back to System Design Basics`}),(0,a.jsxs)(`h1`,{className:`acid-title`,children:[`CDN & Content `,(0,a.jsx)(`span`,{children:`Delivery`})]}),(0,a.jsx)(`p`,{className:`acid-subtitle`,children:`Serve content from locations physically close to your users — lower latency, less origin load, and resilience against traffic spikes.`}),(0,a.jsxs)(`div`,{className:`acid-chip-row`,children:[(0,a.jsxs)(`span`,{className:`acid-chip`,children:[`🌍 `,o.length,` concepts`]}),(0,a.jsx)(`span`,{className:`acid-chip`,children:`⚡ Edge caching`}),(0,a.jsx)(`span`,{className:`acid-chip`,children:`🏗️ HLD staple`})]})]}),(0,a.jsxs)(`section`,{className:`acid-props`,children:[(0,a.jsx)(`h2`,{className:`acid-section-title`,children:`Core Concepts`}),(0,a.jsx)(`p`,{className:`acid-section-sub`,children:`Click any card to open the full explanation with analogy and diagrams.`}),(0,a.jsx)(`div`,{className:`acid-grid`,children:o.map((t,n)=>(0,a.jsx)(s,{topic:t,index:n,isActive:e===t.id,onClick:l},t.id))})]}),(0,a.jsx)(c,{topic:n,onClose:()=>t(null)})]})}export{l as default};