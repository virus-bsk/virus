# Reactive Deep Dive — Interview / Mind Preparation Notes

> **Goal of this document:** explain *reactive system design* the way a senior engineer
> explains it to a sharp junior on a whiteboard — with stories, pictures, and "why".
> **No code. Only design + working + real human reasoning.**
>
> Everything here is written so you can close your eyes and *replay* it. Each section has:
> the story → the design → how it actually works → what breaks → how it's fixed → what to say in an interview.

---

## Table of Contents

| # | Chapter | One-line memory hook |
|---|---------|----------------------|
| 0 | [What "reactive" really means](#0-what-reactive-really-means) | It *reacts*, it doesn't *wait* |
| 1 | [The Reactive Manifesto — 4 traits](#1-the-reactive-manifesto--4-traits) | Responsive, Resilient, Elastic, Message-Driven |
| 2 | [Message-driven: the nervous system](#2-message-driven-the-nervous-system) | Queues vs Topics, delivery guarantees |
| 3 | [Reactive Streams: demand & backpressure](#3-reactive-streams-demand--backpressure) | Don't push faster than I can chew |
| 4 | [Event-driven architecture](#4-event-driven-architecture) | Facts that already happened |
| 5 | [CQRS + Event Sourcing](#5-cqrs--event-sourcing) | Log the truth, derive the views |
| 6 | [Sagas, Outbox & the "no distributed transaction" problem](#6-sagas-outbox--the-no-distributed-transaction-problem) | Undo, don't lock |
| 7 | [Resilience patterns](#7-resilience-patterns) | Blast radius control |
| 8 | [Elasticity & scaling](#8-elasticity--scaling) | Grow sideways, never lose a message |
| 9 | [Consistency: CAP, BASE, eventual](#9-consistency-cap-base-eventual) | "Almost now" is usually fine |
| 10 | [Real-time delivery to devices](#10-real-time-delivery-to-devices) | WebSocket / SSE / fan-out |
| 11 | [Reactive UI: signals, streams, React](#11-reactive-ui-signals-streams-react) | The same ideas in the browser |
| 12 | [Observability](#12-observability) | If you can't see it, you can't fix it |
| 13 | [Full design walkthrough: live activity feed](#13-full-design-walkthrough-live-activity-feed) | Put it all together |
| 14 | [Interview playbook](#14-interview-playbook) | How to *talk* about this |
| 15 | [Anti-patterns & red flags](#15-anti-patterns--red-flags) | What gets you rejected |

---

## 0. What "reactive" really means

### The story

Picture a **restaurant kitchen**.

- **Non-reactive (blocking / request-response):** A waiter takes an order, walks to the chef, and *stands there* until the food is ready, then carries it back. If the chef takes 20 minutes, that waiter is frozen for 20 minutes. Ten customers → the waiter is dead. Adding more waiters costs money and they all pile up at the same stove.
- **Reactive:** The waiter drops the ticket on the rail, shouts "Order in!", and immediately walks away to serve other tables. The cook sees the ticket, cooks, rings the bell, and a runner delivers it. Nobody waits on anybody.

That's the whole idea. **A reactive system reacts to events as they arrive, instead of blocking and waiting.**

### Two different meanings you must be able to separate

| Meaning | Where it lives | Example | Key idea |
|---|---|---|---|
| **Reactive Systems** (architecture) | Server-side, distributed | Netflix, Uber, Kafka pipelines | The *system* reacts to load/events/failures |
| **Reactive Programming** (paradigm) | Client-side, mostly UI | RxJS, Signals, React, Firestore listeners | Data *flows* and the UI auto-updates |

Interviewers often blend them. **A great answer names both and connects them** — because they're the same philosophy applied at different altitudes.

### The mental model, in one picture

```
BLOCKING / IMPERATIVE
   Caller ──waits, waits, waits──────► Work ──result──► Caller
   (thread held hostage)                 ↑ everything queues behind this

REACTIVE
   Event ──► [ Queue ] ──► Worker ──► Event out ──► next worker
             (buffer)      (free the        (small, fast,
                           moment it's       independent
                           accepted)         steps)
```

**Memory hook:** *"Accept fast, do later, never block, never lose."*

---

## 2. Message-driven: the nervous system

Everything reactive sits on messaging. Get these definitions exact.

### 2.1 Events vs Commands vs Queries

| Type | Tense | Means | Example |
|---|---|---|---|
| **Command** | "please do" | Imperative, can fail | `PlaceOrder`, `ReserveSeat` |
| **Event** | "this happened" | Past tense, immutable fact | `OrderPlaced`, `PaymentSucceeded` |
| **Query** | "tell me" | Read, no state change | `GetCart` |

**Why it matters:** Commands expect an answer and can be rejected. Events are *already true* and can't be "rejected" — you can only react to them. Mixing them up is the #1 design mistake.

### 2.2 Delivery guarantees (memorize this triangle)

```
   At-most-once        At-least-once        Exactly-once
   (fire & forget)     (retry until ack)    (the illusion)
        │                    │                    │
   may lose            may duplicate       = at-least-once
   fastest             default choice        + idempotency
```

**The truth nobody tells you:** true exactly-once delivery is **impossible** over an unreliable network. What vendors *sell* as "exactly-once" is really **at-least-once delivery + idempotent consumers + transactions inside the broker**. Your job as a designer is to make **handlers idempotent** so duplicates are harmless.

- Idempotency trick: every message carries a unique `messageId`; the handler records processed IDs and skips repeats.
- Real-world parallel: paying by UPI — tapping twice should never debit you twice.

### 2.3 Ordering

- **Per-partition/key ordering:** most brokers (Kafka, Kinesis) guarantee order only *within a partition/key*. "All events for user 42 arrive in order" — yes. "Global order" — no, and you rarely want it (it kills throughput).
- Design rule: **route by entity ID** (`orderId`, `userId`) so related events stay ordered.

### 2.4 Push vs Pull, and who controls the rate

| Model | Who decides the next item | Risk |
|---|---|---|
| Push | Producer | Overwhelms slow consumer |
| Pull (pull-based) | Consumer | Consumer controls pace, self-throttles |

Reactive systems prefer **pull/backpressure** so the *consumer* — the one that knows its own limits — sets the speed. This is Chapter 3.


---

## 3. Reactive Streams: demand & backpressure

This is the single most "reactive-specific" topic. Learn to explain it with the **water glass analogy**.

### The story

A waiter (producer) is pouring water. You (consumer) can only drink so fast. If the waiter pours as fast as *they* like, the table floods. So you signal: *"stop, my glass is full, tell me when I have room."* That signal is **demand**, and the rule of not overflowing is **backpressure**.

### The formal design (Reactive Streams spec)

```
Publisher ──onNext(item)──► Subscriber
          ◄──request(n)───   (demand comes FIRST)
          ──onComplete/onError──►
```

**Golden rule:** the Subscriber sends `request(n)` *before* the Publisher sends more than `n` items. Demand flows **upstream**, data flows **downstream** — a closed loop.

### The building-block vocabulary (say these out loud)

| Operator | Purpose | Analogy |
|---|---|---|
| **map** | transform each item 1→1 | rename every item in a queue |
| **filter** | keep only matching items | reject spoilt tomatoes |
| **flatMap / merge** | one item → many, run in parallel | one order → invoice + email + SMS concurrently |
| **buffer / window / throttle / debounce** | control *rate of change* | batch 100 clicks into one save |

`debounce` deserves its own line: *"only act after the user stops typing for 300ms"* — a pure rate-control idea that lives in your UI today.

### Backpressure strategies (when the consumer is slower than the producer)

1. **Buffer** — hold a *bounded* queue. Simple, but bounded; overflow needs a next step.
2. **Drop newest / oldest** — telemetry/sensors: "latest value wins", throw away stale ones.
3. **Sample / throttle** — take 1 of every N.
4. **Block (rare, anti-reactive)** — only at the boundary; inside a pipeline it defeats the purpose.
5. **Signal "slow down"** — propagate pressure back to the source.

**How it works end-to-end:** Producer asks consumer for demand → consumer grants `n` → producer sends up to `n` → consumer processes, then grants more. Throughput self-balances to the slowest stage. **No memory blow-up.**

**What breaks without it:** an unbounded in-memory queue → OOM crash → and the crash *loses* the buffered work. Backpressure turns a crash into a slowdown.

**Interview line:** *"Backpressure means the consumer, not the producer, sets the pace. Without it, a fast producer and a slow consumer means either lost data or an out-of-memory crash."*


---

## 4. Event-driven architecture

### The story

In a restaurant, the chef doesn't phone the billing desk to ask "did the payment clear?" The chef **rings a bell** — *"order up!"* — and anyone who cares reacts. The chef doesn't know who listens, and doesn't wait for them.

That bell-ringing is an **event**. Event-driven architecture (EDA) is the organisation of a system around *announcements of facts*.

### Two choreographies

```
ORCHESTRATION (a conductor)          CHOREOGRAPHY (everyone dances)
   Orchestrator                        ┌──────────┐
   ├─► Payment ──ok──┐                 │ Order    │──OrderPlaced──┐
   ├─► Inventory     │                 │ Service  │               ▼
   ├─► Shipping      │                 └──────────┘        ┌──────────┐
   └─► Email         │                                   │ Payment  │
 (central brain,      │            Payment ─Paid────────►│ Service  │
  knows the whole flow,│                                   └──────────┘
  easier to read,      │                                       │
  single point of      │                                   ┌───┴────┐
  coupling)            │                                   ▼        ▼
                                          ┌──────────┐ ┌──────────┐
                                          │ Inventory│ │ Shipping │
                                          └──────────┘ └──────────┘
```

| | Orchestration | Choreography |
|---|---|---|
| Who knows the flow | one central service | nobody — it emerges |
| Coupling | moderate (to orchestrator) | very low |
| Failure handling | easy to reason about | needs sagas + tracing |
| Scaling | orchestrator can bottleneck | naturally distributed |

**Rule of thumb:** use orchestration when the flow is a *business process with rules* (loan approval). Use choreography when you want *fan-out to independent teams/systems* (order placed → analytics, CRM, warehouse, email all react).

### Event notification vs event-carried state transfer

- **Event notification:** "OrderPlaced, id=123" — receiver must call back for details. Fewer bytes, more coupling.
- **Event-carried state transfer:** the event *contains* the data the receiver needs ("OrderPlaced + full cart + address"). Receivers become autonomous and can work even if the order service is down. Preferred for reactive systems.

### Async request-reply (the pattern people forget)

User clicks "Place order" and wants a *confirmation*. But we don't want to block.
1. UI sends command with a `correlationId`.
2. API accepts instantly, returns `202 + correlationId`.
3. Work happens asynchronously; result event carries the same `correlationId`.
4. UI is listening (WebSocket/SSE) and updates when the result arrives.

This is exactly how modern payment/UPI flows *feel* instant while doing slow work. It's how you deliver **Responsiveness** in practice.

---

## 5. CQRS + Event Sourcing

### The story

A **bank passbook vs a bank statement**. Your account *balance* is a derived number — a convenience. The **truth** is the full list of transactions. If there's ever a dispute, nobody trusts the balance; they read the line items from the beginning.

That's Event Sourcing: **store the facts, compute the answer.**

```
Traditional CRUD                 Event Sourcing
┌───────────────┐                ┌─────────────────────────────┐
│ orders row    │  UPDATE        │ Event log (append-only)     │
│ status=PAID   │◄── overwrite ──│ 1. OrderCreated {500}       │
│ total=500     │   (old value   │ 2. ItemAdded   {100}        │
└───────────────┘    is LOST)    │ 3. CouponApplied {-50}      │
                                 │ 4. PaymentSucceeded         │
                                 └──────────────┬──────────────┘
                                                │ project
                                     ┌──────────┴──────────┐
                                     ▼                     ▼
                              balance = 550        read model (fast UI view)
```


### CQRS: Command Query Responsibility Segregation

Separate the **write model** (validates commands, produces events) from the **read model** (denormalized views shaped for the screen).

```
   WRITE side                         READ side
   ─────────                          ─────────
   Command ─► Validate ─► Event Log ─► Projector ─► Read DB (optimized views)
   (rules,                  (truth)                 (dashboard, search, feed)
    consistency)
```

**Why it's reactive-friendly:** reads scale independently of writes, you can have many read models (one per screen/use-case), and the read model can be *eventually consistent* — acceptable for feeds/dashboards.

### The working, step by step

1. Command arrives (`ApplyCoupon`).
2. Write model validates business rules against current state.
3. If valid, it **appends** an event to the log. Append = fast, no locks, no read-modify-write races.
4. Projectors consume events and update read models.
5. UI reads from read models / gets pushed updates.

### Strengths (why teams adopt it)
- **Full audit trail** — free, by construction. "Show me everything that happened to order 77" is trivial.
- **Time travel / debugging** — replay the log to any past moment.
- **Rebuild** — new read model? Replay history, no migration nightmare.
- **Scales** — writes are appends; reads are served from optimized views.

### The honest trade-offs (say these — they show maturity)
- **Eventual consistency:** right after writing, a read may be stale. UI must handle "it's coming".
- **Event versioning/evolution:** your event schema will change; old events must still be readable (upcasting).
- **Snapshotting:** replaying 10M events per load is slow, so you periodically snapshot state and replay only the tail.
- **Complexity:** more moving parts than a CRUD table. **Don't use it for a simple todo app.**

**Interview line:** *"Event sourcing stores the source of truth as a log of facts; CQRS splits the fast write path from the fast read path. I'd reach for it when audit history or many divergent read shapes matter — and I'd accept eventual consistency to get it."*

---

## 6. Sagas, Outbox & the "no distributed transaction" problem

### The core problem

In a monolith, one database gives you a **transaction**: all-or-nothing. Across microservices there is **no such thing** — you cannot atomically commit to Kafka *and* Postgres *and* Stripe. Distributed transactions (2-phase commit) are slow, blocking, and fragile — the opposite of reactive.

### The Saga pattern

A saga is a **sequence of local transactions**, each publishing an event that triggers the next. If a step fails, you run **compensating transactions** to undo the previous ones.

```
   HAPPY PATH                        FAILURE PATH (compensate)
   ──────────                        ────────────────────────
   OrderCreated ──► PaymentOk        OrderCreated ──► PaymentOk ──► StockFail
                                          │                            │
                                          ▼                            ▼
                                   ShipOk ──► Done        ◄── RefundPayment (undo)
                                                          ◄── CancelOrder  (undo)
```

Design rules:
- Each step must be **idempotent** (retries are guaranteed to happen).
- Each step needs a **compensating action** that semantically undoes it.
- Compensation must also be **idempotent**.
- Sagas are **eventually consistent**, not atomic — the system is "in flight" for a while, and that's OK.

**Two coordination styles:**
- **Choreography:** each service reacts to the previous event (no central brain).
- **Orchestration:** a saga coordinator tells each service what to do and handles compensation centrally (easier to understand, single place to look).

### The Outbox pattern (fixes the dual-write problem)

The nastiest real bug: *"I saved the order to the DB, then tried to publish `OrderPlaced` to Kafka, and crashed in between."* Now the DB has an order but no other system knows. **Dual write = no atomicity.**

**Design fix — the transactional outbox:**

```
   ┌───────────────────────────── SAME DB TRANSACTION ─────────────────────────┐
   │  1. INSERT order row                                                        │
   │  2. INSERT row into `outbox` table (event to be published)                  │
   │  ── COMMIT (both or neither) ──                                            │
   └────────────────────────────────────────────────────────────────────────────┘
                                    │
        separate relay/poller        ▼
        ┌──────────────────────────────────────┐
        │ reads outbox → publishes to broker    │──► marks row as sent
        │ (at-least-once + idempotent consumer) │
        └──────────────────────────────────────┘
```

Because the event write lives in the *same* local transaction as the data write, they can never disagree. The relay then delivers to the broker with at-least-once semantics, and **idempotent consumers** absorb duplicates. This single pattern solves 80% of "we lost an event" incidents.

**Interview line:** *"There's no distributed transaction, so I use a saga with compensating actions for the business flow, and a transactional outbox so the DB write and the event publish can never diverge."*


---

## 7. Resilience patterns

Every one of these maps to "shrink the blast radius" or "fail gracefully".

### 7.1 Timeout

**Never wait forever.** Every remote call gets a deadline. If it exceeds, treat as failure and act (fallback/retry). *"A request without a timeout is a request that will eventually hang your whole system."*

### 7.2 Retry with exponential backoff + jitter

```
   attempt 1  fail → wait 1s
   attempt 2  fail → wait 2s
   attempt 3  fail → wait 4s  (+ random jitter so everyone doesn't stampede together)
   give up → fallback / dead-letter
```

- **Backoff** avoids hammering a struggling service.
- **Jitter** (randomness) prevents the *thundering herd* — 10,000 clients retrying at the exact same millisecond.
- Retries must be **idempotent** or capped.

### 7.3 Circuit Breaker

The story: a failing downstream keeps getting called, clients pile up waiting, and the failure *cascades* upstream until everything is down. The breaker stops calling a service that's clearly broken.

```
   CLOSED  ──(failures > threshold)──►  OPEN
     ▲                                    │  (fail fast, no call,
     │                                    │   return fallback immediately)
     │                                    ▼
     └────(successes in half-open)──  HALF-OPEN
                                          │ (probe with a few requests)
```

Three states: **Closed** (normal), **Open** (don't even try — fail fast), **Half-Open** (let a few through to test recovery). This gives the sick service breathing room to heal.

### 7.4 Bulkhead

Ship compartments. Give each dependency its **own** thread/connection pool so one slow dependency can't consume *all* resources. Without bulkheads, one slow call starves every other feature. This is the concrete mechanism behind "Resilient".

### 7.5 Fallback & graceful degradation

When a dependency fails, serve something useful instead of an error:
- Recommendations down → show "popular items".
- Personalization down → show generic content.
- Never: a blank page or an unhandled crash.

### 7.6 Dead Letter Queue (DLQ)

Messages that fail after all retries go to a **DLQ** instead of vanishing. You can inspect, fix the bug, and **replay** them. This turns "silent data loss" into "a visible backlog I can drain".

### 7.7 Rate limiting & load shedding

Protect yourself: reject excess load deliberately (429) rather than collapse. Sometimes the resilient move is to *say no fast*.

### How they combine (the mental sequence)

```
   call dependency
      │
      ├─ too slow?      → TIMEOUT, treat as failure
      ├─ failing often? → CIRCUIT OPEN, fail fast + fallback
      ├─ retry?         → BACKOFF + JITTER, idempotent only
      ├─ pool exhausted?→ BULKHEAD isolates the damage
      └─ still failing? → DEAD LETTER for later replay
```

**Interview line:** *"I protect the system with timeouts, circuit breakers, and bulkheads so a slow dependency degrades one feature instead of taking down the site, and a DLQ so nothing is silently lost."*

---

## 8. Elasticity & scaling

### The scaling ladder (say it in order)

1. **Cache** — avoid the work entirely.
2. **Scale up (vertical)** — bigger machine. Simple, has a ceiling, gets expensive fast.
3. **Scale out (horizontal)** — more machines. Requires **statelessness**.
4. **Shard/partition** — split data so each node owns a slice.

### The non-negotiable precondition: statelessness

An instance can serve *any* request only if it holds no session/state in memory. Push state to:
- a shared cache (Redis),
- the message log,
- a database,
- or the client (token/JWT).

**Sticky sessions are a smell** — they quietly re-couple you to specific machines.

### Scaling a reactive pipeline

```
        producers ──► [  B R O K E R  ] ──► consumer group
                                             │ C1 │ C2 │ C3 │  ← add more as lag grows
```

- The **broker is the buffer** — it absorbs spikes so you don't need instant capacity.
- **Autoscale on consumer lag** (how far behind the queue is), not just CPU. Lag is the truest signal of "I need more workers".
- **Partition count caps parallelism** — 6 partitions means at most 6 consumers work in parallel. Plan partitions for peak.

### Data scaling

- **Replication (read replicas):** more copies for reads.
- **Sharding:** split by key (`userId`) across nodes; each shard is a mini-system.
- **Consistent hashing:** decide which node owns a key such that adding/removing a node moves minimal data.

### Caching layers (fastest win first)

```
   Browser/CDN  ──►  API gateway cache  ──►  in-memory (Redis)  ──►  DB
   (edge, ms)         (edge, ms)             (µs–ms)              (slowest)
```

Rule: **cache the reads that are frequent and change slowly.** Invalidate on write. Be explicit about staleness tolerance.

**Interview line:** *"Elasticity needs stateless instances plus a buffer to absorb spikes; I autoscale on queue lag, and I size partitions for peak parallelism."*


---

## 9. Consistency: CAP, BASE, eventual

The moment you distribute, you must *choose* what to sacrifice. There is no free lunch.

### CAP theorem (the honest version)

During a **network partition** (nodes can't talk), you must pick **one**:

```
            Consistency                Availability
         (every read sees the          (every request gets
          latest write)                 an answer, maybe stale)
                 ▲                            ▲
                 └──────────┐   ┌─────────────┘
                            │   │
                    Network Partition happens
                    → you CANNOT have both C and A
```

- **CP:** reject some requests to stay correct (bank balances, inventory that can't oversell).
- **AP:** always answer, resolve conflicts later (social feeds, likes, view counts).
- In practice partitions are rare but **must** be handled; the theorem is about your *fallback behavior* during them.

### BASE (the reactive-system philosophy)

The AP-friendly counterpart to ACID:

- **Basically Available** — the system always responds.
- **Soft state** — state may change over time without new input (as replicas converge).
- **Eventual consistency** — if writes stop, all replicas *will* agree, given time.

**Story:** You post a photo. Your friend in another city sees it 2 seconds later. Nobody dies. That gap is *eventual consistency*, and it's the right trade for availability and scale.

### Consistency models you'll be asked to pick between

| Model | Guarantee | Use when |
|---|---|---|
| Strong | read always sees latest write | money, seat inventory |
| Eventual | converges given time | feeds, counters, search |
| Read-your-writes | *you* see your own write immediately | "I just saved, why isn't it here?" |
| Monotonic reads | never go backwards in time | timelines |
| Causal | cause before effect | comments after posts |

**"Read-your-writes"** is the sneaky one users actually complain about. Fix: route a user's own reads to the node that took their write, or read from the primary for a short window after writing.

### Conflict resolution

When two replicas both accept a write (AP systems), you must merge:
- **Last-Write-Wins (LWW):** simplest; can lose a write. Fine for low-stakes.
- **CRDTs:** data structures mathematically designed to always merge without conflict (counters, collaborative text).
- **Vector clocks / versioning:** detect true concurrency and let the app decide.

**Interview line:** *"I choose CP where a wrong answer is costly — money, inventory — and AP plus eventual consistency where a slightly stale answer is fine. I always design explicitly for read-your-writes because that's what users actually notice."*

---

## 10. Real-time delivery to devices

How does the server *push* to a browser/mobile without the client polling? Three options, know the trade-offs.

```
   Polling (old)         Long-polling            WebSocket               SSE
   client asks every     client asks, server    full-duplex            one-way
   N seconds             holds until data       persistent socket       server→client
   wasteful, laggy       better, still overhead real-time chat/games      feeds/tickers
```

| Technique | Direction | Good for | Watch out |
|---|---|---|---|
| Short polling | client→server repeatedly | dead simple, low frequency | wasteful, laggy |
| Long polling | server holds response | near-real-time | connection churn, overhead |
| **WebSocket** | full duplex, persistent | chat, games, collab | stateful, needs sticky routing, scaling is harder |
| **SSE** | server→client stream over HTTP | feeds, notifications, dashboards | one-way, HTTP/1.1 connection limits |
| **Push notifications** | OS-level (APNs/FCM) | mobile, app closed | not for in-app live UI |

### The hard part: fan-out and scale

One event ("Virat scored!") must reach 10 million subscribers.

```
                     ┌─────────────┐
   event ──────────► │  Fan-out    │
                     │  service    │
                     └──┬───┬───┬──┘
                        ▼   ▼   ▼
                     node1 node2 node3   ← each node holds ~3M sockets
                        │    │    │
                     ─── sockets ───
```

- Shard connections across many gateway nodes.
- Use a **pub/sub backbone** (Redis pub/sub, Kafka) so any node can broadcast to every other node's sockets.
- Maintain a **presence/registry**: "user X is connected to node 2."
- Handle **reconnect + backfill**: on drop, the client reconnects and asks "what did I miss since sequence N?" — so no updates are lost during a blip.

### The reactive tie-in

Your UI shouldn't re-fetch everything on each push. Instead, a push is a *signal* that says "this slice changed" → the client updates just that slice. This is exactly **signals / reactive state** (next chapter) reacting to an external stream.

**In bskcoding:** Firestore's `onSnapshot` listeners *are* this — the server pushes document changes and your UI reacts. That's server-driven reactivity.

**Interview line:** *"For live updates I pick the transport by direction and fan-out needs — SSE for one-way feeds, WebSocket for duplex — then shard connections, use a pub/sub backbone for broadcast, and design reconnect-with-backfill so nothing is lost."*


---

## 11. Reactive UI: signals, streams, React

Same philosophy, different altitude. The UI is a **projection of state**. When state changes, the UI *reacts* — you don't manually poke the DOM.

### The story

**Imperative UI (jQuery era):** you fetch data, then *manually* write `div.innerHTML = ...`, then remember to disable the button, then remember to re-hide the spinner. Easy to forget one, and the UI drifts from the data. This is why you get "the number says 3 but the list shows 4."

**Reactive UI:** you declare "the UI is a function of state", change the state, and the framework figures out the minimal DOM update. **One source of truth, derived views.**

### The core mental model

```
        State (single source of truth)
            │
            ▼  (reactive derivation)
        Derived values  ──►  Rendered UI
            ▲
            │
      User events ──► update State ──► loop repeats
```

Key shift: **you stop syncing the DOM and start syncing state.** The DOM becomes an output, never the source of truth.

### Signals — the modern primitive

A **signal** is a value that knows who's watching it.

- **Signal:** a piece of state (`count = 0`).
- **Computed/derived:** a value *calculated from* signals (`double = count * 2`), which auto-updates.
- **Effect:** a side-effect that re-runs when its dependencies change (e.g., save to server).

The magic is **fine-grained tracking**: when `count` changes, *only* the parts of the UI that read `count` re-render — not the whole page. This is the push-pull model again: signals *push* change notifications, and computations *pull* fresh values only when needed.

### Streams in the UI (RxJS-style thinking)

User interactions are *streams of events over time*, and you compose them:
- Typing → `debounce(300ms)` → `filter(non-empty)` → `switchMap(search API)`.
- `switchMap` = "cancel the previous in-flight request if a new keystroke arrives" — kills race conditions where an old slow response overwrites a new fast one.

This is backpressure (Chapter 3) living in the browser.

### React's flavor of reactive

React is *reactive* but with a specific strategy:
- **State → re-render → diff → commit minimal DOM changes** (the Virtual DOM / reconciler).
- **Unidirectional data flow:** props down, events up. Predictable.
- **Concurrency (React 18/19):** rendering can be *interrupted* and prioritized. Typing stays smooth even while a heavy list re-renders. This is responsiveness at the UI layer.

React idioms that map to reactive concepts:

| Reactive concept | React equivalent |
|---|---|
| State / signal | `useState`, `useReducer` |
| Derived value | `useMemo`, computed |
| Effect / subscription | `useEffect` (subscribe + cleanup) |
| Stream + backpressure | debounce/throttle + `useEffect` |
| External push source | Firestore `onSnapshot` inside `useEffect` |

### Pitfalls that cost interviews
- **Stale closures / stale state:** capturing an old value in a callback. Fix with functional updates.
- **Effect dependency mistakes:** re-running effects too often, or reading state you didn't list → subtle bugs.
- **Prop drilling vs context vs global store:** know when each is appropriate.
- **Over-rendering:** putting everything in one big state object re-renders the whole tree — the problem signals solve with granular tracking.

**Interview line:** *"Reactive UI means the view is a pure function of state, so I maintain one source of truth and let the framework do minimal DOM updates. React does this with unidirectional flow plus concurrent rendering so interactions stay responsive."*

---

## 12. Observability

A reactive system is distributed and asynchronous — you can't attach a debugger to it. If you can't *see* it, you can't operate it.

### The three pillars
- **Metrics:** numbers over time (latency, throughput, error rate, **queue lag**, saturation). Aggregated, cheap, great for alerts.
- **Logs:** discrete events with context. For detail.
- **Traces:** the end-to-end journey of one request across services. The *most important* tool for async systems.

### Distributed tracing (essential for event-driven)

Because work hops service → queue → service, one user click spawns many async jobs. You stitch them together with:
- **Trace ID** — one per user request.
- **Span ID** — per unit of work; parent/child links show causality and timing.
- **Correlation ID** — carried in every event so you can follow a saga across services.

```
   Trace abc123 (user clicked "Pay")
   ├─ span: API gateway         12ms
   ├─ span: order-service       40ms ── publishes OrderPlaced
   │        └─ span: payment-svc  120ms  (async, correlated by ID)
   │              └─ span: refund-svc 90ms (compensating action)
   └─ total perceived latency ...
```

Without tracing, an async bug is invisible: "the order succeeded but the email never sent" becomes a needle in a haystack. With correlation IDs on every event, you *replay the path*.

### Health checks
- **Liveness:** "is the process alive?" → restart if not.
- **Readiness:** "can it take traffic now?" → remove from load balancer if not (e.g., still warming a cache or catching up on lag).

### Alerting principles
- Alert on **symptoms** users feel (error rate, latency) more than causes.
- Watch **consumer lag** as a first-class metric — rising lag is the earliest warning that a reactive pipeline is falling behind.
- Dead-letter queue depth should page someone.

**Interview line:** *"In an async system I make every event carry a correlation ID so traces stitch the flow together, and I alert on lag and latency — the signals that tell me the pipeline is falling behind before users notice."*


---

## 13. Full design walkthrough: live activity feed

Let's design one system that uses *everything*. This is the "how it looks and works" you asked for.

**Requirement (human version):** "Build a live activity feed. When something happens — a like, a comment, a new order — it should appear on the user's screen within a second, for millions of users, without the page freezing, and without losing anything if a server dies."

### Step 1 — Separate the fast path from the slow path (Responsive)

```
   User action "Like"
        │
        ▼
   ┌──────────┐   optimistic: update UI instantly (~30ms)
   │   API    │──► write event to broker ──► return 202 Accepted
   └──────────┘    (do NOT do all the work inline)
```

The click *feels* instant because we only validate + enqueue, then return. Heavy work is async. This is the core responsiveness move.

### Step 2 — Message-driven backbone (Elastic + Resilient)

```
   API ──► [ EVENT BROKER (partitioned by userId) ]
                    │
                    ▼  consumer group
              ┌──────────────┐
              │ Feed workers │  ← autoscale on lag
              └──────────────┘
```

- Partition by `userId` so one user's events stay ordered (Chapter 2).
- Consumer group lets us add workers under load (Chapter 8).
- At-least-once delivery + idempotent handlers (Chapter 2).

### Step 3 — Backpressure (never OOM)

If a viral event floods the topic, workers can't keep up. The worker **pulls** at its own pace and applies backpressure (Chapter 3): buffer bounded, sample or batch, and never let an unbounded in-memory queue grow until the process dies.

### Step 4 — Fan-out to devices (real-time)

```
   Feed worker ──► [ PUB/SUB backbone ] ──► gateway nodes ──► user sockets
                                                              (sharded,
                                                               reconnect+backfill)
```

Transport choice: **SSE** for a one-way live feed (simple, scales), **WebSocket** if we also need the client to push in real time (Chapter 10).

### Step 5 — Storage with CQRS (Chapter 5)

```
   WRITE: event log (truth)          READ: denormalized feed per user (fast)
```

- The feed read model is precomputed per user so loading a screen is a single fast read.
- Full audit: "show me every event for user X" is free.

### Step 6 — Resilience (Chapter 7)

- Timeouts on every call; circuit breaker on the notification service; bulkhead so feed processing doesn't starve other features.
- DLQ for events that fail repeatedly; a dashboard + replay button.

### Step 7 — No lost events across services (Chapter 6)

When the feed worker also writes to a DB, it uses a **transactional outbox** so the DB write and the published event can never diverge. If a downstream step fails, a **saga** runs compensating actions.

### Step 8 — Consistency choices (Chapter 9)

- The feed is **AP + eventual**: a like may show up 1s later. Fine.
- But **read-your-writes**: after *you* like something, *your* screen shows it immediately (optimistic UI). We special-case the writer.

### Step 9 — Reactive UI (Chapter 11)

```
   onSnapshot / SSE event ──► update just that slice of signal state
                                     │
                                     ▼
                    only the affected list item re-renders
```

Fine-grained reactivity means a new like updates one row, not the whole page. Typing stays at 60fps even while the feed streams in.

### Step 10 — Observability (Chapter 12)

Every event carries a correlation ID. We trace one "like" across API → broker → worker → gateway → device, and alert on **consumer lag** so we know we're falling behind before users see stale feeds.

### The whole picture on one diagram

```
 USER DEVICE                              SERVER SIDE
 ┌──────────┐  optimistic UI             ┌────────────────────────────────────┐
 │ Reactive │◄──── SSE/WebSocket ────────│ Gateway nodes (sharded sockets)    │
 │   UI     │                            │      ▲            ▲                │
 │ (signals)│── action ──► 202 ──────────│      │            │ pub/sub        │
 └──────────┘                            │   [ BROKER ]──► Fan-out           │
                                         │      │    (lag metric)              │
                                         │      ▼                             │
                                         │  Feed workers (autoscale,          │
                                         │   backpressure, idempotent, DLQ)   │
                                         │      │                             │
                                         │      ▼                             │
                                         │  ┌─────────┐    ┌──────────────┐   │
                                         │  │Event log│    │ Read model   │   │
                                         │  │ (truth) │───►│ (fast views) │   │
                                         │  └─────────┘    └──────────────┘   │
                                         │  (CQRS, saga, outbox, tracing)     │
                                         └────────────────────────────────────┘
```

**Interview line:** *"I split the fast accept path from the slow work, buffer on a partitioned broker, autoscale on lag, protect the system with timeouts/breakers/bulkheads and a DLQ, push to devices with a sharded pub/sub backbone, and keep the read path fast with CQRS — all traced by a correlation ID."*


---

## 14. Interview playbook

### The 6-step script for ANY reactive/system-design question

1. **Clarify requirements.** "Is this a feed (eventual, AP) or a bank balance (strong, CP)? What's the scale — thousands or millions? Is it read-heavy or write-heavy?" *Never design before you know which.*
2. **Estimate.** Rough numbers only: users, QPS, data size, latency target. This proves you think in magnitudes.
3. **Define the API / contract.** What are the commands, events, and queries? Name them in domain language.
4. **Draw the high-level design.** Client → gateway → services → broker → storage → real-time push. Rough boxes first.
5. **Deep-dive on 1–2 hard parts** — the ones the interviewer cares about (consistency, fan-out, failure handling).
6. **Identify bottlenecks and improve.** Latency, single points of failure, scaling limits, hot keys.

### Phrases that make you sound senior

- *"What's the consistency requirement here — is a slightly stale read acceptable?"*
- *"Let me separate the fast accept path from the slow work so the response stays responsive."*
- *"I'll partition by user ID so related events stay ordered."*
- *"Consumers must be idempotent because we get at-least-once delivery."*
- *"A transactional outbox keeps the DB write and the event publish from diverging."*
- *"I'd autoscale on consumer lag, not CPU."*
- *"Let me shrink the blast radius with a circuit breaker and bulkhead."*
- *"Let me add a DLQ so nothing is silently lost."*
- *"I'll carry a correlation ID through every event so we can trace it."*
- *"Read-your-writes is what users actually notice, so I special-case the writer."*

### The four-word spine to memorize

> **Responsive · Resilient · Elastic · Message-Driven**

Then immediately: *"message-driven is the foundation; the other three are built on it."*

### Trade-offs to always state (never present one option as free)

| Decision | You gain | You pay |
|---|---|---|
| Async instead of sync | responsiveness, decoupling | eventual consistency, harder debugging |
| Event sourcing | audit, replay, rebuild | complexity, versioning, snapshots |
| AP over CP | availability, scale | stale reads, conflict resolution |
| Sharding | scale | cross-shard queries get hard |
| Microservices | team autonomy, scaling | distributed transactions, ops load |
| Caching | speed | staleness, invalidation bugs |

### Rapid-fire Q&A (rehearse these)

- **Reactive Manifesto?** Responsive, Resilient, Elastic, Message-Driven.
- **Difference between event and command?** "it happened" vs "please do it".
- **Why is exactly-once impossible?** Network is unreliable; you get at-least-once + idempotency.
- **What is backpressure?** Consumer sets the pace; buffer/drop/sample when overwhelmed.
- **CAP during partition?** Must choose C or A; can't have both.
- **Eventual consistency problem?** Read-your-writes; fix by routing writer's reads to the primary.
- **No distributed transaction, so?** Saga + compensating actions + transactional outbox.
- **Protect a flaky dependency?** Timeout + circuit breaker + bulkhead + fallback + DLQ.
- **Scale real-time to millions?** Shard sockets + pub/sub backbone + reconnect with backfill.
- **How does autoscaling decide?** Consumer lag, not CPU.
- **Reactive UI vs imperative?** View = f(state); minimal DOM updates; one source of truth.
- **CQRS benefit?** Independent scaling of reads/writes, many optimized read models.
- **Event sourcing downside?** Complexity, event versioning, need for snapshots.
- **Hot key problem?** One celebrity's data gets hammered; fix with key splitting/jitter/partitioning.

---

## 15. Anti-patterns & red flags

If you do these in an interview, it signals junior.

1. **Designing before clarifying.** Jumping to "I'll use Kafka and microservices" before knowing the scale or needs.
2. **Assuming distributed transactions.** Saying "we'll just make it atomic across services."
3. **Ignoring consistency requirements.** Treating a bank balance like a social like.
4. **Forgetting idempotency.** Retries without it = duplicated charges.
5. **No timeouts.** "We'll just call the service" — a hang waiting to happen.
6. **Dual writes.** Writing DB and publishing an event separately with no outbox — guaranteed divergence.
7. **Sticky sessions as a scaling strategy.** Secretly reintroduces coupling to specific machines.
8. **Global ordering assumptions.** Most brokers only guarantee per-partition order.
9. **Unbounded queues/buffers.** The classic OOM under load.
10. **Autoscaling on CPU in a queue-driven system.** Ignoring lag.
11. **No DLQ.** Silent data loss that nobody notices until a customer complains.
12. **No correlation IDs.** Untraceable async flows = undebuggable.
13. **Everything in one giant state object** (UI) → whole-tree re-renders.
14. **Over-engineering.** Event sourcing + CQRS + microservices for a CRUD app. Match the design to the problem.

### The one-sentence closing you can always use

> *"A reactive system accepts work fast, buffers it durably, processes it asynchronously with backpressure, isolates failures so they stay local, scales horizontally on demand, and pushes results to users in real time — trading strict immediacy for availability and resilience, and tracing every event so nothing is lost."*

---

### Study tip (how to actually remember this)

Close the doc and try to **explain each chapter out loud with an analogy** — the restaurant, the water glass, the bank passbook, the ship compartments. If you can explain it *without* the notes, you own it. The analogies above are your memory hooks; the design decisions are your differentiation.

Good luck. You've got this.

