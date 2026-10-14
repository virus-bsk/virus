import { useState } from "react";
import { Link } from "react-router-dom";
import "../system-design/api-design/ApiDesignPage.css";
import "../system-design/acid/AcidPage.css";

/**
 * ReactiveDeepDivePage (Route: /maang/reactive-deep-dive).
 *
 * The full "Reactive Deep Dive" topic from the MAANG preparation grid.
 * Covers the Reactive Manifesto, message-driven design, backpressure,
 * event-driven architecture, CQRS + Event Sourcing, sagas/outbox,
 * resilience, elasticity, consistency, real-time delivery, reactive UI
 * and observability — explained as DESIGN + WORKING (no code), with
 * real-world analogies and ASCII architecture diagrams.
 *
 * Reuses the ACID page styling (same card grid + modal detail panel) so it
 * looks identical to the rest of the System Design track.
 */

const TOPICS = [
  {
    id: "MANIFESTO",
    name: "Reactive Manifesto",
    icon: "⚡",
    tagline: "The 4 traits every reactive system must have",
    accent: "#c2410c",
    meaning:
      "A reactive system REACTS to events as they arrive instead of blocking and waiting. Published in 2013, the Reactive Manifesto defines four traits: Responsive (always answers within a latency budget), Resilient (failures stay local), Elastic (grows and shrinks with load), and Message-Driven (sender and receiver share only messages). Message-driven is the foundation; the other three are built on top of it.",
    analogy:
      "A restaurant kitchen. Non-reactive: the waiter stands at the chef until the food is ready — frozen for 20 minutes, and ten customers kill them. Reactive: the waiter drops the ticket on the rail, shouts 'order in!', and walks away. The cook rings a bell when done and a runner delivers. Nobody waits on anybody.",
    sql: `THE FOUR TRAITS
                 ┌───────────────────────────────┐
                 │        REACTIVE SYSTEM         │
                 │  RESPONSIVE ◄──────► RESILIENT │
                 │       ▲                ▲        │
                 │       └──── ELASTIC ───┘        │
                 │                ▲                │
                 │        MESSAGE-DRIVEN           │
                 │        (the foundation)         │
                 └───────────────────────────────┘

Responsive  : reply in ~100ms even under load / partial outage
Resilient   : one dead service degrades ONE feature, not the site
Elastic     : stateless workers + a buffer -> scale in/out on demand
Message-Driven: async messages, no shared state, no blocking calls

MEMORY HOOK: "Accept fast, do later, never block, never lose."`,
  },
  {
    id: "MSGDRIVEN",
    name: "Message-Driven Design",
    icon: "📨",
    tagline: "Events vs Commands vs Queries + delivery guarantees",
    accent: "#15803d",
    meaning:
      "Message-driven means components talk only by sending messages, never by blocking calls. The three message types you must separate: a COMMAND ('please do this' — can be rejected, expects an answer), an EVENT ('this already happened' — an immutable fact that cannot be rejected), and a QUERY ('tell me' — read only). Delivery is at-least-once by default, so consumers MUST be idempotent.",
    analogy:
      "A ship's radio. A COMMAND is 'alter course 10 degrees' (an order, can be refused). An EVENT is 'we just hit an iceberg' (a fact, already true — you can only react to it). Ordering is guaranteed only per channel, and a message may be heard twice, so the crew acts on each fact idempotently.",
    sql: `THREE MESSAGE TYPES
  COMMAND : "please do"  -> PlaceOrder      (can fail / be rejected)
  EVENT   : "it happened" -> OrderPlaced    (immutable fact, react only)
  QUERY   : "tell me"     -> GetCart        (read, no state change)

DELIVERY GUARANTEES (the honest triangle)
   at-most-once   fire & forget        (may LOSE)
   at-least-once  retry until ack      (may DUPLICATE)  <- default
   exactly-once   = at-least-once
                   + IDEMPOTENT consumer  (the illusion; true EOS is
                     impossible over an unreliable network)

ORDERING: guaranteed only PER PARTITION/KEY
   route by orderId/userId -> related events stay ordered

QUEUE (point-to-point, 1 consumer) vs TOPIC/LOG (pub-sub, many)`,
  },
  {
    id: "BACKPRESSURE",
    name: "Backpressure",
    icon: "🌊",
    tagline: "The consumer sets the pace, not the producer",
    accent: "#0e7490",
    meaning:
      "Backpressure is the mechanism where a fast producer and a slow consumer don't crash the system. The consumer signals how much it can handle (demand), and the producer sends only that much. Without it you get either lost data or an unbounded in-memory queue that grows until the process runs out of memory and dies — losing everything buffered. Backpressure turns a crash into a slowdown.",
    analogy:
      "A waiter pouring water into your glass. If they pour as fast as THEY like, the table floods. So you say 'stop, my glass is full — tell me when I have room.' That signal is demand; not overflowing is backpressure.",
    sql: `REACTIVE STREAM LOOP
   Publisher ──onNext(item)──► Subscriber
             ◄──request(n)────   (demand FIRST)
             ──onComplete/onError──►
   demand flows UP, data flows DOWN (closed loop)

OPERATORS (the vocabulary)
   map        transform 1->1
   filter     keep matching
   flatMap    one -> many, in parallel
   throttle   take 1 of every N
   debounce   act only after quiet period (e.g. 300ms no typing)

BACKPRESSURE STRATEGIES when producer outruns consumer
   1. Buffer  (bounded) then:
   2. Drop newest / oldest   (latest value wins)
   3. Sample / throttle      (1 of N)
   4. Signal "slow down"     back to the source
   X. Block  (anti-reactive; only at the boundary)

WITHOUT it: unbounded queue -> OOM crash -> data lost`,
  },
  {
    id: "EDA",
    name: "Event-Driven Architecture",
    icon: "🔔",
    tagline: "Announce facts; let everyone react",
    accent: "#1d4ed8",
    meaning:
      "Event-driven architecture organises a system around announcements of facts (events) instead of request/response calls. Two choreographies: ORCHESTRATION (a central conductor who knows the whole flow) and CHOREOGRAPHY (no central brain — each service reacts to the previous event and the flow emerges). Prefer event-carried state transfer: put the data inside the event so receivers stay autonomous even if the source is down.",
    analogy:
      "The chef rings a bell — 'order up!' — and doesn't phone the billing desk. Anyone who cares reacts: the runner delivers, the cleaner clears the plate. The chef doesn't know who listens and doesn't wait for them. That bell is an event.",
    sql: `ORCHESTRATION (central conductor)
   Orchestrator -> Payment -> Inventory -> Shipping -> Email
   (knows whole flow, easier to read, single coupling point)

CHOREOGRAPHY (everyone dances, no brain)
   OrderSvc ──OrderPlaced──► PaymentSvc ──Paid──► Inventory + Shipping
   (very low coupling, needs sagas + tracing)

EVENT NOTIFICATION  : "OrderPlaced id=123" (receiver calls back for data)
EVENT-CARRIED STATE : event CONTAINS cart+address (receiver autonomous)

ASYNC REQUEST-REPLY (feels instant, does slow work)
   UI sends command + correlationId -> API returns 202 instantly
   work happens async -> result event carries same correlationId
   UI (listening via WebSocket/SSE) updates on arrival`,
  },
  {
    id: "CQRS",
    name: "CQRS + Event Sourcing",
    icon: "📒",
    tagline: "Log the truth, derive the views",
    accent: "#7c3aed",
    meaning:
      "Event Sourcing stores the source of truth as an append-only log of facts (events), and computes the current state by replaying them. CQRS (Command Query Responsibility Segregation) splits the fast WRITE path (validates commands, produces events) from the fast READ path (denormalized views shaped for each screen). Together they give a full audit trail, time-travel, easy rebuilds — at the cost of eventual consistency and event-versioning complexity.",
    analogy:
      "A bank passbook vs a balance. Your account balance is a derived number — a convenience. The TRUTH is the full list of transactions. In a dispute nobody trusts the balance; they read the line items from the beginning. That's event sourcing: store the facts, compute the answer.",
    sql: `TRADITIONAL CRUD            EVENT SOURCING
 orders row (status=PAID)     append-only event log (truth)
 UPDATE overwrites            1. OrderCreated {500}
 (old value is LOST)          2. ItemAdded    {100}
                              3. CouponApplied {-50}
                              4. PaymentSucceeded
                                       │ project
                              ┌────────┴────────┐
                              ▼                 ▼
                        balance=550      read model (fast UI view)

CQRS: WRITE (commands->events) scales apart from READ (views)
GAIN  : full audit, time-travel, rebuild by replay, many read shapes
PAY   : eventual consistency, event versioning, snapshots for long logs
USE WHEN audit history or many divergent read shapes matter
AVOID for a simple CRUD app (over-engineering)`,
  },
  {
    id: "SAGA",
    name: "Saga + Transactional Outbox",
    icon: "🧵",
    tagline: "No distributed transaction — undo, don't lock",
    accent: "#b45309",
    meaning:
      "Across microservices there is no atomic transaction spanning Kafka + Postgres + Stripe. A SAGA is a sequence of local transactions, each publishing an event that triggers the next; if a step fails you run COMPENSATING transactions to undo the previous ones. Each step must be idempotent. The TRANSACTIONAL OUTBOX fixes the dual-write bug: write the data row and the 'event to publish' row in the SAME DB transaction, so they can never disagree, then a relay delivers to the broker at-least-once.",
    analogy:
      "Booking a trip = flight + hotel + car. You can't lock all three atomically. So you book the flight, then the hotel; if the car fails you CANCEL the hotel and REFUND the flight — compensating actions, not a global lock. And you write 'ticket issued' in the same notebook stroke as 'book flight' so you never have a booking with no record.",
    sql: `SAGA — HAPPY vs COMPENSATION
  OrderCreated -> PaymentOk -> ShipOk -> Done
  OrderCreated -> PaymentOk -> StockFail
                        │            └─► RefundPayment (undo)
                        └──────────────► CancelOrder   (undo)

RULES: every step idempotent; every step has a compensating action;
       sagas are EVENTUALLY consistent, not atomic.

TRANSACTIONAL OUTBOX (fixes dual-write data loss)
  ┌────────── SAME DB TRANSACTION ──────────┐
  │ 1. INSERT order row                      │
  │ 2. INSERT event into outbox table         │── COMMIT (both or neither)
  └───────────────────────────────────────────┘
        │ separate relay/poller
        ▼  reads outbox -> publishes to broker -> marks sent
   (at-least-once + idempotent consumer absorbs duplicates)

Without outbox: crash between DB write & event publish = lost event.`,
  },

  {
    id: "RESILIENCE",
    name: "Resilience Patterns",
    icon: "🛡️",
    tagline: "Shrink the blast radius, fail gracefully",
    accent: "#0d9488",
    meaning:
      "Resilience is designed in, not discovered in production. Timeouts stop you waiting forever. Retries use exponential backoff + jitter to avoid hammering and the thundering herd. A Circuit Breaker stops calling a service that's clearly broken (Closed -> Open -> Half-Open) so it can heal. Bulkheads give each dependency its own pool so one slow call can't starve everything. Fallbacks serve something useful; a Dead Letter Queue parks failed messages for replay instead of losing them.",
    analogy:
      "Ship bulkheads: one flooded compartment doesn't sink the ship. A circuit breaker is the electrical one in your home — when a fault is detected it trips instantly so the fault can't burn the house down, then you reset it to test. Jittered retries stop 10,000 people redialling the same second.",
    sql: `THE PROTECTION SEQUENCE
  call dependency
    ├─ too slow?       -> TIMEOUT, treat as failure
    ├─ failing often?  -> CIRCUIT OPEN, fail fast + fallback
    ├─ retry?          -> BACKOFF (1s,2s,4s) + JITTER, idempotent only
    ├─ pool exhausted? -> BULKHEAD isolates the damage
    └─ still failing?  -> DEAD LETTER QUEUE for later replay

CIRCUIT BREAKER STATES
   CLOSED (normal) --failures>threshold--> OPEN
     ^                                     │ fail fast, no call
     └──successes in HALF-OPEN──────────────┘ (probe with a few requests)

ALSO: rate limiting / load shedding — sometimes 'say no fast' beats collapse`,
  },
  {
    id: "ELASTIC",
    name: "Elasticity & Scaling",
    icon: "📈",
    tagline: "Stateless + a buffer; scale on lag",
    accent: "#4f46e5",
    meaning:
      "Elasticity means growing and shrinking with load. The non-negotiable precondition is STATELESSNESS: an instance can serve any request only if it holds no session/state in memory (push state to cache, the log, a DB, or the client/JWT). The broker is the buffer that absorbs spikes. Autoscale on CONSUMER LAG (how far behind the queue is), not just CPU. Partition count caps parallelism — size partitions for peak.",
    analogy:
      "A call centre. Agents are stateless (any agent can take any caller) so you just add agents during a rush and remove them after. The waiting queue absorbs the spike. You staff up based on how long the queue is (lag), not how busy the phones look (CPU).",
    sql: `SCALING LADDER
   1. Cache        (avoid the work)
   2. Scale UP     (bigger box — simple, has a ceiling, pricey)
   3. Scale OUT    (more boxes — needs STATELESSNESS)
   4. Shard/Partition (split data; each node owns a slice)

REACTIVE PIPELINE
   producers ──► [ BROKER ] ──► consumer group
                                │ C1 │ C2 │ C3 │  <- add on lag
   autoscale on LAG, not CPU;  partitions cap parallelism

STATE GOES TO: Redis cache | message log | DB | client (JWT)
   sticky sessions = a smell (re-couples you to specific machines)

CACHING LAYERS (fastest first)
   Browser/CDN -> gateway cache -> in-memory (Redis) -> DB`,
  },
  {
    id: "CAP",
    name: "CAP / BASE / Eventual",
    icon: "⚖️",
    tagline: "During a partition you must choose C or A",
    accent: "#7c3aed",
    meaning:
      "CAP theorem: during a network partition you cannot have both Consistency and Availability — you must pick one. CP rejects some requests to stay correct (money, seat inventory). AP always answers, maybe stale, and resolves conflicts later (feeds, likes). BASE is the AP-friendly philosophy: Basically Available, Soft state, Eventual consistency. Always special-case read-your-writes, because that's the staleness users actually notice.",
    analogy:
      "You post a photo; your friend in another city sees it 2 seconds later. Nobody dies — that gap is eventual consistency, the right trade for scale. But if YOU refresh and your own post is missing (a read-your-writes violation), you'll file a bug. So the writer always sees their own write immediately.",
    sql: `CAP during a PARTITION (pick ONE)
   Consistency      every read sees latest write   (CP: bank balance)
   Availability     every request gets an answer    (AP: social feed)
        ▲                    ▲
        └──────── can't have both during a split ────────┘

BASE (the AP philosophy)
   Basically Available | Soft state | Eventual consistency

CONSISTENCY MODELS
   Strong            read always latest            (money, inventory)
   Eventual          converges given time          (feeds, counters)
   Read-your-writes  YOU see your own write now     (route writer->primary)
   Monotonic reads   never go backwards in time
   Causal            cause before effect

CONFLICT RESOLUTION: LWW (may lose) | CRDTs (auto-merge) | vector clocks`,
  },

  {
    id: "REALTIME",
    name: "Real-Time Delivery",
    icon: "📡",
    tagline: "WebSocket / SSE + fan-out at scale",
    accent: "#1d4ed8",
    meaning:
      "Pushing updates to devices without polling. Pick the transport by direction: WebSocket is full-duplex and persistent (chat, games, collab) but stateful and harder to scale; SSE is a one-way server-to-client stream over HTTP (feeds, tickers, dashboards) and simpler; long/short polling are fallbacks. At scale you shard connections across gateway nodes, use a pub/sub backbone (Redis/Kafka) to broadcast between nodes, keep a presence registry, and design reconnect-with-backfill so no update is lost during a blip.",
    analogy:
      "A stadium announcer (server) vs the crowd (clients). Polling is everyone shouting 'what's the score?' every second. SSE is the loudspeaker — one-way, simple, great for a score feed. WebSocket is a walkie-talkie — two-way, for live commentary both ways. If an announcer mic dies, fans reconnect and ask 'what did I miss since the last goal?' (backfill).",
    sql: `TRANSPORT CHOICE
   Polling        client asks every Ns      (wasteful, laggy)
   Long polling   server holds response    (better, churn)
   SSE            server->client stream    (feeds, dashboards; one-way)
   WebSocket      full-duplex persistent   (chat, games; harder to scale)

FAN-OUT AT SCALE
   event ─► Fan-out svc ─► node1  node2  node3  (each holds ~3M sockets)
                          └─── pub/sub backbone (Redis/Kafka) ───┘
   presence registry: "user X is on node 2"
   reconnect + BACKFILL: client reconnects, asks "missed since seq N?"

REACTIVE TIE-IN: a push is a SIGNAL "this slice changed"
   -> client updates just that slice (see Reactive UI)`,
  },
  {
    id: "REACTIVEUI",
    name: "Reactive UI (Signals/React)",
    icon: "⚛️",
    tagline: "View = f(state); the DOM is an output",
    accent: "#0e7490",
    meaning:
      "In the browser, reactive means the UI is a projection of state: you keep ONE source of truth and let the framework derive the DOM — you stop syncing the DOM and start syncing state. Signals are values that know who's watching: a signal is state, a computed derives from signals and auto-updates, an effect re-runs on dependency change. Fine-grained tracking means only the parts that read a changed value re-render. React does this with unidirectional flow + the reconciler + concurrent rendering so interactions stay smooth.",
    analogy:
      "A spreadsheet. You type a number in a cell and every formula and chart that depends on it updates itself — you never manually redraw the chart. Signals are the cells; the DOM is the auto-updating chart. Imperative jQuery was redrawing the chart by hand and forgetting to.",
    sql: `STATE (single source of truth)
   │  (reactive derivation)
   ▼
Derived values ──► Rendered UI     user events ──► update STATE ──┐
   ▲                                                            │
   └────────────────────────────────────────────────────────────┘

SIGNALS PRIMITIVES
   signal    state (count)
   computed  derived from signals (double = count*2), auto-updates
   effect    side-effect that re-runs when deps change
   -> fine-grained: only readers of count re-render, not the page

UI STREAMS = RxJS thinking
   typing -> debounce(300ms) -> filter -> switchMap(searchAPI)
   switchMap cancels the stale in-flight request (kills races)

REACT MAPPING
   useState/useReducer = signal      useEffect = subscribe + cleanup
   useMemo = computed                debounce = backpressure in the UI
   Firestore onSnapshot = external push source inside useEffect`,
  },
  {
    id: "OBSERVABILITY",
    name: "Observability",
    icon: "🔭",
    tagline: "If you can't see it, you can't operate it",
    accent: "#7c3aed",
    meaning:
      "A reactive system is distributed and async — you can't attach a debugger. Three pillars: METRICS (numbers over time: latency, throughput, error rate, and crucially CONSUMER LAG), LOGS (discrete events with context), and TRACES (the end-to-end path of one request across services — the most important tool for async). Carry a Trace ID per request, Span IDs per unit of work, and a Correlation ID in every event so you can follow a saga across services and replay its path.",
    analogy:
      "Air-traffic control. Metrics are the radar numbers (altitude, speed). Logs are each radio call. A trace is the full flight path of one plane across many towers — without it, 'the plane landed but the luggage vanished' is impossible to explain. The correlation ID is the flight number printed on every bag.",
    sql: `THREE PILLARS
   METRICS  numbers over time (latency, QPS, error rate, LAG) -> alerts
   LOGS     discrete events with context -> detail
   TRACES   end-to-end journey of ONE request -> causality & timing

DISTRIBUTED TRACE (stitched by IDs)
   Trace abc123 (user clicked "Pay")
   ├─ API gateway        12ms
   ├─ order-service      40ms  -- publishes OrderPlaced
   │    └─ payment-svc   120ms  (async, correlated by ID)
   │          └─ refund-svc 90ms (compensating action)

CARRY IN EVERY EVENT: traceId (per request) | spanId (per step)
                      correlationId (follow the whole saga)

HEALTH: liveness (restart if dead) | readiness (pull from LB if not ready)
ALERT ON: consumer lag (earliest warning) + latency + error rate + DLQ depth`,
  },
];


function TopicCard({ topic, index, isActive, onClick, total }) {
  const shortMeaning = `${topic.meaning.slice(0, 110)}...`;

  return (
    <article
      className={`acid-card ${isActive ? "active" : ""}`}
      style={{ "--acid-accent": topic.accent }}
      onClick={() => onClick(topic.id)}
    >
      <div className="acid-card-head">
        <span className="acid-card-letter api-topic-icon">{topic.icon}</span>
        <div>
          <h3 className="acid-card-name">{topic.name}</h3>
          <span className="acid-card-tagline">{topic.tagline}</span>
        </div>
      </div>

      <p className="acid-card-summary">{shortMeaning}</p>

      <div className="acid-card-actions">
        <button
          className="acid-card-btn"
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onClick(topic.id);
          }}
        >
          View details
        </button>
        <span className="acid-card-badge">Reactive</span>
      </div>

      <span className="acid-card-index">
        {index + 1} / {total}
      </span>
      {isActive && (
        <span className="acid-active-indicator">
          <i className="fas fa-check-circle" />
        </span>
      )}
    </article>
  );
}

function DetailPanel({ topic, onClose }) {
  if (!topic) return null;

  return (
    <div className="acid-modal-backdrop" onClick={onClose}>
      <div className="acid-detail-panel" onClick={(e) => e.stopPropagation()}>
        <div className="acid-detail-header">
          <h2>
            <span className="acid-detail-letter api-topic-icon">
              {topic.icon}
            </span>
            <span className="acid-detail-title">{topic.name}</span>
            <span className="acid-detail-sub">— {topic.tagline}</span>
          </h2>
          <button
            className="acid-close-btn"
            onClick={onClose}
            aria-label="Close details"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="acid-modal-scroll-content">
          <div className="acid-definition-box">
            <strong>📘 Definition:</strong> {topic.meaning}
          </div>

          <div className="acid-detail-grid">
            <div className="acid-info-box">
              <h3>Real-world analogy</h3>
              <p>{topic.analogy}</p>
            </div>

            <div className="acid-code-box">
              <h3>Design &amp; working</h3>
              <pre>
                <code>{topic.sql}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReactiveDeepDivePage() {
  const [activeId, setActiveId] = useState(null);
  const activeTopic = TOPICS.find((topic) => topic.id === activeId);

  const handleClick = (id) => {
    setActiveId((current) => (current === id ? null : id));
  };

  return (
    <div className="acid-page">
      {/* ===== HERO ===== */}
      <section className="acid-hero">
        <Link to="/maang" className="acid-back">
          ← Back to MAANG Preparation
        </Link>
        <h1 className="acid-title">
          Reactive <span>Deep Dive</span>
        </h1>
        <p className="acid-subtitle">
          Systems that <strong>react</strong> instead of block.{" "}
          <strong>Manifesto</strong> · <strong>Backpressure</strong> ·{" "}
          <strong>Event-Driven</strong> · <strong>CQRS</strong> ·{" "}
          <strong>Saga</strong> · <strong>Resilience</strong> ·{" "}
          <strong>Reactive UI</strong>
        </p>

        <div className="acid-chip-row">
          <span className="acid-chip">🧩 11 core concepts</span>
          <span className="acid-chip">⚡ Design &amp; working only</span>
          <span className="acid-chip">🔥 Real-world analogies</span>
        </div>
      </section>

      {/* ===== SIMPLE DEFINITION ===== */}
      <section className="acid-define">
        <h2>🤔 What is a Reactive System in one line?</h2>
        <p>
          A reactive system <b>reacts to events as they arrive</b> instead of
          blocking and waiting. It accepts work fast, buffers it durably,
          processes it asynchronously, keeps failures local, scales on demand,
          and pushes results to users in real time.{" "}
          <b>Accept fast, do later, never block, never lose.</b>
        </p>
        <div className="acid-one-liner">
          💡 Blocking = a <b>phone call</b> (both must be free, one waits).
          Reactive = a <b>WhatsApp message</b> (send it, deal with it later) —
          that's the entire idea, from the server all the way down to the UI.
        </div>
      </section>

      {/* ===== TOPIC CARDS ===== */}
      <section className="acid-props">
        <h2 className="acid-section-title">The 11 Reactive Concepts</h2>
        <p className="acid-section-sub">
          Click any card to open the full explanation with a real-world analogy
          and an ASCII architecture diagram of how it works.
        </p>
        <div className="acid-grid">
          {TOPICS.map((topic, i) => (
            <TopicCard
              key={topic.id}
              topic={topic}
              index={i}
              total={TOPICS.length}
              isActive={activeId === topic.id}
              onClick={handleClick}
            />
          ))}
        </div>
      </section>

      <DetailPanel topic={activeTopic} onClose={() => setActiveId(null)} />
    </div>
  );
}

export default ReactiveDeepDivePage;

