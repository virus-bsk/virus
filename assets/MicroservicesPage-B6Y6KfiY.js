import{r as e}from"./rolldown-runtime-QTnfLwEv.js";import{h as t,r as n,u as r}from"./index-Dka5w6n9.js";/* empty css                 *//* empty css                      */var i=e(t(),1),a=n(),o=[{id:`GW`,name:`API Gateway`,icon:`🚪`,tagline:`Single entry point for all services`,accent:`#1d4ed8`,meaning:`An API Gateway is the front door of a microservices system: clients hit one endpoint and the gateway routes requests to the right service. It centralises cross-cutting concerns — authentication, rate limiting, SSL termination, logging, response caching and request transformation.`,analogy:`A hotel reception desk: you don't walk into each department yourself — you tell reception what you need, they verify your identity, route your request, and hand back the answer. Guests (clients) only ever talk to the desk.`,sql:`# Client -> Gateway -> Services
Client: GET /orders/42
  1. Gateway authenticates JWT
  2. Rate limit check (429 if exceeded)
  3. Route to order-service /orders/42
  4. Log, cache, return response

# Common tools: Kong, Nginx, AWS API
# Gateway, Spring Cloud Gateway

# Without a gateway the client must know
# every service address + re-implement
# auth/rate-limiting in each service.`},{id:`DISC`,name:`Service Discovery`,icon:`🧭`,tagline:`Services find each other dynamically`,accent:`#c2410c`,meaning:`In dynamic environments (Kubernetes, auto-scaling), service IPs change constantly. Service discovery lets services locate each other by name instead of hard-coded addresses. Client-side discovery: caller queries a registry (Eureka/Consul) and picks an instance. Server-side: a load balancer/router does the lookup (Kubernetes DNS).`,analogy:`A phone directory that updates itself: instead of memorising your friend's number, you look up their name. When they change phones, the directory updates — you never notice.`,sql:`# How it works
1. Service starts -> registers itself:
   name: payment-service
   ip:   10.0.4.12, port: 8080
   health: /health (heartbeat)

2. Caller asks the registry:
   lookup("payment-service")
   -> [10.0.4.12, 10.0.4.13, 10.0.4.14]

3. Caller picks one (load balancing) and calls.

# Tools: Kubernetes DNS, Consul, Eureka, etcd
# Dead instances are removed via health checks.`},{id:`CB`,name:`Circuit Breaker`,icon:`🔌`,tagline:`Fail fast instead of piling up`,accent:`#15803d`,meaning:`A circuit breaker wraps calls to another service. After failures cross a threshold it 'trips' open and fails immediately — no waiting on a dead service. This stops cascading failures, gives the struggling service time to recover, and can serve a fallback (cached/default response).`,analogy:`Your home's electrical breaker: too much current -> it trips, cutting power to protect the house. You reset it later and see if the problem is gone. Same idea — protect the system from a continuously failing dependency.`,sql:`# Three states
CLOSED    -> calls flow; failures counted
OPEN      -> fail fast immediately
             (serve fallback / cache)
HALF-OPEN -> after a cool-down, let one
             trial request through

payment.breaker.call(() => charge(order),
  fallback = () => markPending(order));

# Tools: Resilience4j (Java), Polly (.NET),
# Hystrix (legacy), opossum (Node)

# Why: without it, one slow dependency
# exhausts thread pools across the cluster.`},{id:`RETRY`,name:`Retry`,icon:`🔁`,tagline:`Try again — but politely`,accent:`#7c3aed`,meaning:`Retry re-attempts failed calls — safe only for idempotent operations. Best practice: exponential backoff with jitter (2^attempt × random) to avoid thundering herds, a retry budget/limit, and only retrying transient errors (timeouts, 503) — never 4xx client errors like 400/401.`,analogy:`Redialling a busy phone number: you wait a bit longer between each attempt (backoff) and randomise your timing so everyone doesn't redial at exactly the same second (jitter). Redialling a wrong number repeatedly (400) is pointless.`,sql:`# What to retry
retryable: timeout, 503, 429 (after Retry-After)
no-retry : 400, 401, 403, 404 (client errors)

# Exponential backoff + jitter
delay = base * 2^attempt + random(0, base)
attempt 1 -> ~100ms
attempt 2 -> ~200ms
attempt 3 -> ~400ms  (max 3 attempts)

# Dangers without care:
# - thundering herd (everyone retries at once)
# - retry storms amplify an outage 10x
# - non-idempotent POST retried = double charge
#   (pair with idempotency keys!)

# Tools: Resilience4j, Polly, opossum`},{id:`SAGA`,name:`Saga`,icon:`🧩`,tagline:`Distributed transactions without 2PC`,accent:`#0e7490`,meaning:`A Saga splits a distributed transaction into a sequence of local transactions, each with a compensating action for rollback. Choreography: services react to each other's events (no coordinator). Orchestration: a central saga orchestrator calls each step. Used for order flows spanning order, payment, inventory and shipping services.`,analogy:`Booking a trip: flight booked ✓, hotel booked ✓, car rental fails ✗. The agent calls back and cancels the hotel and flight — those cancellations are compensating transactions. You never 'un-book' globally with one big undo button.`,sql:`# Order saga (orchestration)
1. create order        (order-svc)      OK
2. reserve inventory   (inventory-svc)  OK
3. charge payment      (payment-svc)    FAIL
   -> compensation:
4. release inventory   (reverse of 2)
5. cancel order        (reverse of 1)

# Choreography alternative: each service
# subscribes to events:
OrderCreated -> InventoryReserved
             -> PaymentFailed -> OrderCancelled

# Rules: every step needs a compensating
# action; design for retries + idempotency;
# accept temporary inconsistency.`},{id:`EDAC`,name:`Event-Driven Communication`,icon:`📡`,tagline:`Notify, don't block`,accent:`#b45309`,meaning:`Instead of services calling each other synchronously, a service publishes domain events (OrderCreated, PaymentCompleted) to a broker; interested services subscribe and react independently. Benefits: loose coupling, independent scaling, resilience. Trade-offs: eventual consistency, harder debugging, need idempotent consumers and event schema versioning.`,analogy:`A company announcement email: HR sends 'new hire joined' once, and IT, facilities and payroll each do their own follow-up — nobody stands at HR's desk blocking them. If payroll is on holiday, the email waits in their inbox.`,sql:`# Sync (chatty, coupled, fragile)
orders-svc -> inventory-svc -> payment-svc
  (one slow service stalls everything)

# Async (event-driven)
orders-svc --publish--> broker("order.created")
                   |---> inventory-svc (reserves)
                   |---> email-svc     (sends mail)
                   |---> analytics-svc (updates)

# Design rules:
- events are facts: past tense, immutable
- consumers must be idempotent (duplicates!)
- version event schemas (add fields, don't
  rename) — producers/consumers deploy
  independently`}];function s({topic:e,index:t,isActive:n,onClick:r,total:i}){let o=`${e.meaning.slice(0,110)}...`;return(0,a.jsxs)(`article`,{className:`acid-card ${n?`active`:``}`,style:{"--acid-accent":e.accent},onClick:()=>r(e.id),children:[(0,a.jsxs)(`div`,{className:`acid-card-head`,children:[(0,a.jsx)(`span`,{className:`acid-card-letter`,children:e.icon}),(0,a.jsxs)(`div`,{children:[(0,a.jsx)(`h3`,{className:`acid-card-name`,children:e.name}),(0,a.jsx)(`span`,{className:`acid-card-tagline`,children:e.tagline})]})]}),(0,a.jsx)(`p`,{className:`acid-card-summary`,children:o}),(0,a.jsxs)(`div`,{className:`acid-card-actions`,children:[(0,a.jsx)(`button`,{className:`acid-card-btn`,type:`button`,onClick:t=>{t.stopPropagation(),r(e.id)},children:`View details`}),(0,a.jsx)(`span`,{className:`acid-card-badge`,children:`Microservices`})]}),(0,a.jsxs)(`span`,{className:`acid-card-index`,children:[t+1,` / `,i]}),n&&(0,a.jsx)(`span`,{className:`acid-active-indicator`,children:(0,a.jsx)(`i`,{className:`fas fa-check-circle`})})]})}function c({topic:e,onClose:t}){return e?(0,a.jsx)(`div`,{className:`acid-modal-backdrop`,onClick:t,children:(0,a.jsxs)(`div`,{className:`acid-detail-panel`,onClick:e=>e.stopPropagation(),children:[(0,a.jsxs)(`div`,{className:`acid-detail-header`,children:[(0,a.jsxs)(`h2`,{children:[(0,a.jsx)(`span`,{className:`acid-detail-letter`,children:e.icon}),(0,a.jsx)(`span`,{className:`acid-detail-title`,children:e.name}),(0,a.jsxs)(`span`,{className:`acid-detail-sub`,children:[`— `,e.tagline]})]}),(0,a.jsx)(`button`,{className:`acid-close-btn`,onClick:t,"aria-label":`Close details`,children:(0,a.jsxs)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,width:`18`,height:`18`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2.5`,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,a.jsx)(`line`,{x1:`18`,y1:`6`,x2:`6`,y2:`18`}),(0,a.jsx)(`line`,{x1:`6`,y1:`6`,x2:`18`,y2:`18`})]})})]}),(0,a.jsxs)(`div`,{className:`acid-modal-scroll-content`,children:[(0,a.jsxs)(`div`,{className:`acid-definition-box`,children:[(0,a.jsx)(`strong`,{children:`📘 Definition:`}),` `,e.meaning]}),(0,a.jsxs)(`div`,{className:`acid-detail-grid`,children:[(0,a.jsxs)(`div`,{className:`acid-info-box`,children:[(0,a.jsx)(`h3`,{children:`Real-world analogy`}),(0,a.jsx)(`p`,{children:e.analogy})]}),(0,a.jsxs)(`div`,{className:`acid-code-box`,children:[(0,a.jsx)(`h3`,{children:`How it works`}),(0,a.jsx)(`pre`,{children:(0,a.jsx)(`code`,{children:e.sql})})]})]})]})]})}):null}function l(){let[e,t]=(0,i.useState)(null),n=o.find(t=>t.id===e),l=e=>{t(t=>t===e?null:e)};return(0,a.jsxs)(`div`,{className:`acid-page`,children:[(0,a.jsxs)(`section`,{className:`acid-hero`,children:[(0,a.jsx)(r,{to:`/maang/system-design-basics`,className:`acid-back`,children:`← Back to System Design Basics`}),(0,a.jsxs)(`h1`,{className:`acid-title`,children:[`🧩 Microservices `,(0,a.jsx)(`span`,{children:`Architecture`})]}),(0,a.jsx)(`p`,{className:`acid-subtitle`,children:`Breaking a monolith into services: gateways, resilience patterns and communication.`}),(0,a.jsxs)(`div`,{className:`acid-chip-row`,children:[(0,a.jsx)(`span`,{className:`acid-chip`,children:`🧩 6 core concepts`}),(0,a.jsx)(`span`,{className:`acid-chip`,children:`🚪 Gateway & routing`}),(0,a.jsx)(`span`,{className:`acid-chip`,children:`🛡️ Resilience patterns`})]})]}),(0,a.jsxs)(`section`,{className:`acid-props`,children:[(0,a.jsx)(`h2`,{className:`acid-section-title`,children:`The 6 Microservices Concepts`}),(0,a.jsx)(`p`,{className:`acid-section-sub`,children:`Click any card to open the full explanation with a real-world analogy and example.`}),(0,a.jsx)(`div`,{className:`acid-grid`,children:o.map((t,n)=>(0,a.jsx)(s,{topic:t,index:n,total:o.length,isActive:e===t.id,onClick:l},t.id))})]}),(0,a.jsx)(c,{topic:n,onClose:()=>t(null)})]})}export{l as default};