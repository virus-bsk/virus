import{r as e}from"./rolldown-runtime-QTnfLwEv.js";import{t}from"./react-CZI7_Jkm.js";import{o as n,r}from"./index-DCrc1KQY.js";import{t as i}from"./atom-one-dark-CL0A0LnX.js";var a=e(t(),1),o=`// A. Config + RateLimiter interface + Token Bucket
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.locks.ReentrantLock;

class RateLimiterConfig {
    final int rate;
    final int burst;
    final long windowMs;
    RateLimiterConfig(int rate, int burst, long windowMs) {
        this.rate = rate; this.burst = burst; this.windowMs = windowMs;
    }
}

interface RateLimiter {
    boolean tryAcquire(String clientId);
    int getRemaining(String clientId);
}

class TokenBucketLimiter implements RateLimiter {
    private final RateLimiterConfig config;
    private final Map<String, ClientBucket> buckets = new ConcurrentHashMap<>();

    TokenBucketLimiter(RateLimiterConfig c) { config = c; }

    static class ClientBucket {
        double tokens;
        long lastRefillNanos;
        final ReentrantLock lock = new ReentrantLock();
        ClientBucket(double t, long now) { tokens = t; lastRefillNanos = now; }
    }

    public boolean tryAcquire(String clientId) {
        ClientBucket bucket = buckets.computeIfAbsent(clientId,
                k -> new ClientBucket(config.burst, System.nanoTime()));
        bucket.lock.lock();
        try {
            refill(bucket);
            if (bucket.tokens >= 1.0) {
                bucket.tokens -= 1.0;
                return true;
            }
            return false;
        } finally {
            bucket.lock.unlock();
        }
    }

    private void refill(ClientBucket b) {
        long now = System.nanoTime();
        double elapsedSec = (now - b.lastRefillNanos) / 1_000_000_000.0;
        double tokensToAdd = elapsedSec * config.rate;
        if (tokensToAdd > 0) {
            b.tokens = Math.min(config.burst, b.tokens + tokensToAdd);
            b.lastRefillNanos = now;
        }
    }

    public int getRemaining(String clientId) {
        ClientBucket b = buckets.get(clientId);
        if (b == null) return config.burst;
        b.lock.lock();
        try { refill(b); return (int) b.tokens; }
        finally { b.lock.unlock(); }
    }
}`,s=`// B. Leaky Bucket + Sliding Window
class LeakyBucketLimiter implements RateLimiter {
    private final RateLimiterConfig config;
    private final Map<String, Deque<Long>> queues = new ConcurrentHashMap<>();

    LeakyBucketLimiter(RateLimiterConfig c) { config = c; }

    public synchronized boolean tryAcquire(String clientId) {
        Deque<Long> q = queues.computeIfAbsent(clientId, k -> new ArrayDeque<>());
        long now = System.nanoTime();
        long windowNanos = 1_000_000_000L;
        while (!q.isEmpty() && now - q.peekFirst() > windowNanos) q.pollFirst();
        if (q.size() < config.rate) {
            q.addLast(now);
            return true;
        }
        return false;
    }

    public int getRemaining(String clientId) {
        Deque<Long> q = queues.get(clientId);
        if (q == null) return config.rate;
        long now = System.nanoTime();
        long windowNanos = 1_000_000_000L;
        synchronized (this) {
            while (!q.isEmpty() && now - q.peekFirst() > windowNanos) q.pollFirst();
            return Math.max(0, config.rate - q.size());
        }
    }
}

class SlidingWindowLimiter implements RateLimiter {
    private final RateLimiterConfig config;
    private final Map<String, Deque<Long>> windows = new ConcurrentHashMap<>();

    SlidingWindowLimiter(RateLimiterConfig c) { config = c; }

    public synchronized boolean tryAcquire(String clientId) {
        Deque<Long> window = windows.computeIfAbsent(clientId, k -> new ArrayDeque<>());
        long now = System.nanoTime();
        long windowNanos = config.windowMs * 1_000_000L;
        while (!window.isEmpty() && now - window.peekFirst() > windowNanos) window.pollFirst();
        if (window.size() < config.rate) {
            window.addLast(now);
            return true;
        }
        return false;
    }

    public int getRemaining(String clientId) {
        Deque<Long> w = windows.get(clientId);
        if (w == null) return config.rate;
        long now = System.nanoTime();
        long windowNanos = config.windowMs * 1_000_000L;
        synchronized (this) {
            while (!w.isEmpty() && now - w.peekFirst() > windowNanos) w.pollFirst();
            return Math.max(0, config.rate - w.size());
        }
    }
}`,c=`// C. Factory + Registry + Main
enum Algorithm { TOKEN_BUCKET, LEAKY_BUCKET, SLIDING_WINDOW }

class RateLimiterFactory {
    public static RateLimiter create(Algorithm algo, RateLimiterConfig config) {
        return switch (algo) {
            case TOKEN_BUCKET -> new TokenBucketLimiter(config);
            case LEAKY_BUCKET -> new LeakyBucketLimiter(config);
            case SLIDING_WINDOW -> new SlidingWindowLimiter(config);
        };
    }
}

class RateLimiterRegistry {
    private final Map<String, RateLimiter> limiters = new ConcurrentHashMap<>();
    private final Algorithm defaultAlgo;
    private final RateLimiterConfig defaultConfig;

    RateLimiterRegistry(Algorithm algo, RateLimiterConfig config) {
        defaultAlgo = algo; defaultConfig = config;
    }

    public RateLimiter getOrCreate(String clientId) {
        return limiters.computeIfAbsent(clientId,
                k -> RateLimiterFactory.create(defaultAlgo, defaultConfig));
    }

    public boolean tryAcquire(String clientId) {
        return getOrCreate(clientId).tryAcquire(clientId);
    }

    public int getRemaining(String clientId) {
        return getOrCreate(clientId).getRemaining(clientId);
    }
}

public class Main {
    public static void main(String[] args) throws InterruptedException {
        RateLimiterConfig config = new RateLimiterConfig(5, 5, 1000);
        RateLimiterRegistry registry = new RateLimiterRegistry(
                Algorithm.TOKEN_BUCKET, config);

        String client = "user-1";
        System.out.println("--- Token Bucket: burst of 7 ---");
        for (int i = 1; i <= 7; i++) {
            boolean allowed = registry.tryAcquire(client);
            System.out.println("Req " + i + ": " + (allowed ? "ALLOWED" : "REJECTED")
                    + " (remaining: " + registry.getRemaining(client) + ")");
        }

        System.out.println("\\n--- After 1 second refill ---");
        Thread.sleep(1000);
        for (int i = 1; i <= 3; i++) {
            boolean allowed = registry.tryAcquire(client);
            System.out.println("Req " + i + ": " + (allowed ? "ALLOWED" : "REJECTED")
                    + " (remaining: " + registry.getRemaining(client) + ")");
        }

        System.out.println("\\n--- Sliding Window demo ---");
        RateLimiterRegistry swRegistry = new RateLimiterRegistry(
                Algorithm.SLIDING_WINDOW,
                new RateLimiterConfig(3, 3, 1000));
        for (int i = 1; i <= 5; i++) {
            boolean allowed = swRegistry.tryAcquire("user-2");
            System.out.println("Req " + i + ": " + (allowed ? "ALLOWED" : "REJECTED"));
        }
    }
}`,l=`-- 3 tables — config + audit (hot-path state is in-memory or Redis)

CREATE TABLE rate_limit_configs (
  config_id    VARCHAR(20) PRIMARY KEY,
  client_id    VARCHAR(100) NOT NULL,
  algorithm    ENUM('TOKEN_BUCKET','LEAKY_BUCKET','SLIDING_WINDOW') NOT NULL,
  rate         INT NOT NULL,
  burst        INT NOT NULL,
  window_ms    INT NOT NULL DEFAULT 1000,
  created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uk_client_algo (client_id, algorithm)
);
CREATE INDEX idx_config_client ON rate_limit_configs(client_id);

CREATE TABLE rate_limit_events (
  event_id     BIGINT AUTO_INCREMENT PRIMARY KEY,
  client_id    VARCHAR(100) NOT NULL,
  endpoint     VARCHAR(255) NOT NULL,
  allowed      BOOLEAN NOT NULL,
  algorithm    ENUM('TOKEN_BUCKET','LEAKY_BUCKET','SLIDING_WINDOW') NOT NULL,
  remaining    INT NOT NULL,
  created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_event_client_time ON rate_limit_events(client_id, created_at);

CREATE TABLE rate_limit_violations (
  violation_id BIGINT AUTO_INCREMENT PRIMARY KEY,
  client_id    VARCHAR(100) NOT NULL,
  endpoint     VARCHAR(255) NOT NULL,
  count        INT NOT NULL DEFAULT 1,
  first_seen   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_seen    TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uk_client_endpoint (client_id, endpoint)
);
CREATE INDEX idx_violation_client ON rate_limit_violations(client_id);`,u=`----------------------------------------
  RateLimiter (interface)
  + tryAcquire(clientId): boolean
  + getRemaining(clientId): int
----------------------------------------
  |-- TokenBucketLimiter  |-- LeakyBucketLimiter
  |   - buckets: Map      |   - queues: Map
  |   + tryAcquire        |   + tryAcquire
  +-- SlidingWindowLimiter
      - windows: Map
      + tryAcquire
----------------------------------------
  Each limiter owns per-client state:
  ClientBucket (tokens, lastRefill)
  ClientQueue (timestamps)
  ClientWindow (timestamps)

All limiters --use--> RateLimiterConfig (rate, burst, window)
RateLimiterFactory --creates--> RateLimiter
RateLimiterRegistry --holds--> Map<String, RateLimiter>`,d=r();function f({code:e,lang:t}){let n=(0,a.useRef)(null);return(0,a.useEffect)(()=>{n.current&&(n.current.removeAttribute(`data-highlighted`),i.highlightElement(n.current))},[e]),(0,d.jsxs)(`div`,{className:`rl-code`,children:[(0,d.jsxs)(`div`,{className:`rl-code-head`,children:[(0,d.jsxs)(`span`,{className:`dots`,children:[(0,d.jsx)(`i`,{}),(0,d.jsx)(`i`,{}),(0,d.jsx)(`i`,{})]}),(0,d.jsx)(`span`,{className:`pl-lang`,children:t})]}),(0,d.jsx)(`pre`,{className:`rl-pre`,children:(0,d.jsx)(`code`,{ref:n,className:`language-${t}`,children:e})})]})}var p=({id:e,children:t})=>(0,d.jsx)(`section`,{id:e,className:`rl-section`,children:t}),m=({children:e})=>(0,d.jsx)(`h2`,{className:`rl-h2`,children:e}),h=({children:e})=>(0,d.jsx)(`h3`,{className:`rl-h3`,children:e}),g=({title:e,children:t})=>(0,d.jsxs)(`div`,{className:`rl-bullet`,children:[(0,d.jsx)(`b`,{children:e}),(0,d.jsx)(`span`,{children:t})]}),_=({children:e})=>(0,d.jsx)(`div`,{className:`rl-tip`,children:e});function v(){return(0,d.jsxs)(`div`,{className:`rl-root`,children:[(0,d.jsxs)(`header`,{className:`rl-header`,children:[(0,d.jsx)(n,{to:`/maang/system-design/advanced`,className:`rl-back`,children:`← Back to Advanced System Design`}),(0,d.jsxs)(`h1`,{children:[(0,d.jsx)(`i`,{className:`fas fa-gauge-high`}),` Rate Limiter — LLD `,(0,d.jsxs)(`span`,{className:`rl-badge`,children:[(0,d.jsx)(`i`,{className:`fab fa-java`}),` Java + UML`]})]}),(0,d.jsxs)(`div`,{className:`rl-sub-info`,children:[(0,d.jsxs)(`span`,{children:[(0,d.jsx)(`i`,{className:`fas fa-list-check`}),` 6 Steps`]}),(0,d.jsxs)(`span`,{children:[(0,d.jsx)(`i`,{className:`fas fa-code`}),` Working Java`]}),(0,d.jsxs)(`span`,{children:[(0,d.jsx)(`i`,{className:`fas fa-database`}),` DB Schema`]}),(0,d.jsxs)(`span`,{className:`rl-badge-alt`,children:[(0,d.jsx)(`i`,{className:`fas fa-mouse-pointer`}),` Scroll down`]})]}),(0,d.jsxs)(`nav`,{className:`rl-nav`,children:[(0,d.jsx)(`a`,{href:`#req`,children:`1. Requirements`}),(0,d.jsx)(`a`,{href:`#ent`,children:`2. Entities`}),(0,d.jsx)(`a`,{href:`#uml`,children:`3. Diagram`}),(0,d.jsx)(`a`,{href:`#db`,children:`4. DB`}),(0,d.jsx)(`a`,{href:`#java`,children:`5. Java`}),(0,d.jsx)(`a`,{href:`#wrap`,children:`6. Wrap-up`})]})]}),(0,d.jsxs)(p,{id:`req`,children:[(0,d.jsxs)(m,{children:[(0,d.jsx)(`i`,{className:`fas fa-list-check`}),` Step 1 — Requirements (5 min)`]}),(0,d.jsxs)(`p`,{className:`rl-intro`,children:[(0,d.jsx)(`b`,{children:`What to do:`}),` Pick `,(0,d.jsx)(`b`,{children:`4 functional`}),` + `,(0,d.jsx)(`b`,{children:`3 non-functional`}),`. State what is OUT of scope (distributed limiting, Redis counters, dynamic rule updates).`]}),(0,d.jsx)(h,{children:`Functional — what the system DOES`}),(0,d.jsxs)(g,{title:`1. Per-client rate limiting`,children:[`Each client (userId, IP, API key) gets own bucket. One client must not affect another.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: key-based isolation — core of any limiter.`})]}),(0,d.jsxs)(g,{title:`2. Multiple algorithms`,children:[`Token Bucket, Leaky Bucket, Sliding Window. Interface so new ones add cleanly.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: Strategy pattern — the #1 signal.`})]}),(0,d.jsxs)(g,{title:`3. tryAcquire() — allow or reject`,children:[`Returns true if allowed, false if limited. Must be O(1).`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: core API — every request goes through this.`})]}),(0,d.jsxs)(g,{title:`4. Configurable rate + burst`,children:[`Rate and burst per limiter. E.g. 10 req/s with burst 20.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: real-world — no hardcoded limits.`})]}),(0,d.jsx)(h,{children:`Non-Functional — how the system BEHAVES`}),(0,d.jsxs)(g,{title:`1. Thread-safe`,children:[`Concurrent tryAcquire must not over-allow. Use locks or atomics.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: concurrency is the #1 follow-up.`})]}),(0,d.jsxs)(g,{title:`2. Low latency — O(1) per check`,children:[`No scanning. Arithmetic or deque math.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: limiter is on the hot path.`})]}),(0,d.jsxs)(g,{title:`3. Extensible`,children:[`New algorithm = new implementation. New storage = new backend.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: shows OCP and DIP.`})]}),(0,d.jsxs)(_,{children:[(0,d.jsx)(`b`,{children:`Interview line:`}),` Skip distributed limiting, Redis counters, dynamic updates unless asked — focus on algorithm + thread safety.`]})]}),(0,d.jsxs)(p,{id:`ent`,children:[(0,d.jsxs)(m,{children:[(0,d.jsx)(`i`,{className:`fas fa-boxes-stacked`}),` Step 2 — Entities (3 min)`]}),(0,d.jsxs)(`p`,{className:`rl-intro`,children:[(0,d.jsx)(`b`,{children:`Rule:`}),` Take nouns from requirements — each becomes a class.`]}),(0,d.jsxs)(g,{title:`RateLimiter (interface)`,children:[`tryAcquire + getRemaining. Core abstraction.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: all algorithms implement this.`})]}),(0,d.jsxs)(g,{title:`TokenBucketLimiter`,children:[`Holds tokens + lastRefill per client. Refills at rate.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: most common — allows bursts.`})]}),(0,d.jsxs)(g,{title:`LeakyBucketLimiter`,children:[`Holds queue of timestamps. Drops if full.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: smooths traffic — no bursts.`})]}),(0,d.jsxs)(g,{title:`SlidingWindowLimiter`,children:[`Holds deque of timestamps. Removes expired.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: precise — no boundary spike.`})]}),(0,d.jsxs)(g,{title:`ClientBucket / Config / Factory / Registry`,children:[`Per-client state, immutable config, Factory creation, Registry lookup.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: SRP — each has one job.`})]})]}),(0,d.jsxs)(p,{id:`uml`,children:[(0,d.jsxs)(m,{children:[(0,d.jsx)(`i`,{className:`fas fa-project-diagram`}),` Step 3 — Class Diagram (10 min)`]}),(0,d.jsx)(`p`,{className:`rl-intro`,children:`Draw this on the whiteboard. Relationships are the key signal:`}),(0,d.jsx)(f,{code:u,lang:`text`}),(0,d.jsxs)(_,{children:[(0,d.jsx)(`b`,{children:`Key relationship:`}),` Limiter owns per-client state (Composition). Registry holds limiters. Factory creates. Config injected (DIP).`]})]}),(0,d.jsxs)(p,{id:`db`,children:[(0,d.jsxs)(m,{children:[(0,d.jsx)(`i`,{className:`fas fa-database`}),` Step 4 — DB Design (5 min)`]}),(0,d.jsx)(`p`,{className:`rl-intro`,children:`Hot-path state is in-memory/Redis. DB holds config + audit — 3 tables:`}),(0,d.jsx)(f,{code:l,lang:`sql`}),(0,d.jsxs)(g,{title:`idx_config_client`,children:[`Config lookup by client O(log n).`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: fast config fetch.`})]}),(0,d.jsxs)(g,{title:`idx_event_client_time`,children:[`Time-range audit queries.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: hot-path stays in-memory; events async-logged.`})]}),(0,d.jsxs)(g,{title:`violations aggregated`,children:[`One row per (client, endpoint). Count incremented.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: keeps table small.`})]})]}),(0,d.jsxs)(p,{id:`java`,children:[(0,d.jsxs)(m,{children:[(0,d.jsx)(`i`,{className:`fab fa-java`}),` Step 5 — Java Code (20-25 min)`]}),(0,d.jsx)(`p`,{className:`rl-intro`,children:`Minimal working Java. Skip boilerplate getters unless asked:`}),(0,d.jsx)(h,{children:`Block A — Config + Interface + Token Bucket`}),(0,d.jsx)(f,{code:o,lang:`java`}),(0,d.jsx)(h,{children:`Block B — Leaky Bucket + Sliding Window`}),(0,d.jsx)(f,{code:s,lang:`java`}),(0,d.jsx)(h,{children:`Block C — Factory + Registry + Main`}),(0,d.jsx)(f,{code:c,lang:`java`})]}),(0,d.jsxs)(p,{id:`wrap`,children:[(0,d.jsxs)(m,{children:[(0,d.jsx)(`i`,{className:`fas fa-flag-checkered`}),` Step 6 — Wrap-up (3 min)`]}),(0,d.jsx)(`p`,{className:`rl-intro`,children:`Be ready to answer these without thinking:`}),(0,d.jsxs)(g,{title:`Concurrency — prevent over-allowing?`,children:[`Per-client ReentrantLock. For scale, Redis + Lua scripts.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: fine-grained locking.`})]}),(0,d.jsxs)(g,{title:`Token vs Leaky vs Sliding?`,children:[`Token allows bursts. Leaky smooths. Sliding is precise, more memory.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: must compare tradeoffs.`})]}),(0,d.jsxs)(g,{title:`How to make it distributed?`,children:[`Redis: INCR+EXPIRE or ZSET with timestamps. Registry wraps Redis.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: production architecture.`})]}),(0,d.jsxs)(g,{title:`Patterns used + SOLID`,children:[`Strategy, Factory, Composition, Encapsulation.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: naming patterns shows vocabulary.`})]}),(0,d.jsxs)(_,{children:[(0,d.jsx)(`b`,{children:`Scorecard:`}),` Requirements (5) + Entities (3) + Diagram (10) + DB (5) + Code (20) + Wrap-up (3) = 46 min.`]})]}),(0,d.jsx)(`footer`,{className:`rl-footer`,children:(0,d.jsx)(n,{to:`/maang/system-design/advanced`,children:`Back to Advanced System Design`})})]})}export{v as default};