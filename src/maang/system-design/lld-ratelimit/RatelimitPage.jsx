import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import hljs from "../../../utils/hljs";
import "highlight.js/styles/atom-one-dark.css";
import "./RatelimitLot.css";
import { JAVA_A } from "./rl1";
import { JAVA_B } from "./rl2";
import { JAVA_C } from "./rl3";
import { SQL, UML } from "./ratelimitTexts";

function CodeBlock({ code, lang }) {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current) { ref.current.removeAttribute("data-highlighted"); hljs.highlightElement(ref.current); }
  }, [code]);
  return (
    <div className="rl-code">
      <div className="rl-code-head"><span className="dots"><i/><i/><i/></span><span className="pl-lang">{lang}</span></div>
      <pre className="rl-pre"><code ref={ref} className={`language-${lang}`}>{code}</code></pre>
    </div>
  );
}
const Section = ({ id, children }) => <section id={id} className="rl-section">{children}</section>;
const H2 = ({ children }) => <h2 className="rl-h2">{children}</h2>;
const H3 = ({ children }) => <h3 className="rl-h3">{children}</h3>;
const Bullet = ({ title, children }) => (<div className="rl-bullet"><b>{title}</b><span>{children}</span></div>);
const Tip = ({ children }) => <div className="rl-tip">{children}</div>;

export default function RatelimitPage() {
  return (
    <div className="rl-root">
      <header className="rl-header">
        <Link to="/maang/system-design/advanced" className="rl-back">← Back to Advanced System Design</Link>
        <h1><i className="fas fa-gauge-high" /> Rate Limiter — LLD <span className="rl-badge"><i className="fab fa-java" /> Java + UML</span></h1>
        <div className="rl-sub-info">
          <span><i className="fas fa-list-check" /> 6 Steps</span>
          <span><i className="fas fa-code" /> Working Java</span>
          <span><i className="fas fa-database" /> DB Schema</span>
          <span className="rl-badge-alt"><i className="fas fa-mouse-pointer" /> Scroll down</span>
        </div>
        <nav className="rl-nav">
          <a href="#req">1. Requirements</a><a href="#ent">2. Entities</a><a href="#uml">3. Diagram</a><a href="#db">4. DB</a><a href="#java">5. Java</a><a href="#wrap">6. Wrap-up</a>
        </nav>
      </header>

      <Section id="req">
        <H2><i className="fas fa-list-check" /> Step 1 — Requirements (5 min)</H2>
        <p className="rl-intro"><b>What to do:</b> Pick <b>4 functional</b> + <b>3 non-functional</b>. State what is OUT of scope (distributed limiting, Redis counters, dynamic rule updates).</p>
        <H3>Functional — what the system DOES</H3>
        <Bullet title="1. Per-client rate limiting">Each client (userId, IP, API key) gets own bucket. One client must not affect another.<br /><i>Why: key-based isolation — core of any limiter.</i></Bullet>
        <Bullet title="2. Multiple algorithms">Token Bucket, Leaky Bucket, Sliding Window. Interface so new ones add cleanly.<br /><i>Why: Strategy pattern — the #1 signal.</i></Bullet>
        <Bullet title="3. tryAcquire() — allow or reject">Returns true if allowed, false if limited. Must be O(1).<br /><i>Why: core API — every request goes through this.</i></Bullet>
        <Bullet title="4. Configurable rate + burst">Rate and burst per limiter. E.g. 10 req/s with burst 20.<br /><i>Why: real-world — no hardcoded limits.</i></Bullet>
        <H3>Non-Functional — how the system BEHAVES</H3>
        <Bullet title="1. Thread-safe">Concurrent tryAcquire must not over-allow. Use locks or atomics.<br /><i>Why: concurrency is the #1 follow-up.</i></Bullet>
        <Bullet title="2. Low latency — O(1) per check">No scanning. Arithmetic or deque math.<br /><i>Why: limiter is on the hot path.</i></Bullet>
        <Bullet title="3. Extensible">New algorithm = new implementation. New storage = new backend.<br /><i>Why: shows OCP and DIP.</i></Bullet>
        <Tip><b>Interview line:</b> Skip distributed limiting, Redis counters, dynamic updates unless asked — focus on algorithm + thread safety.</Tip>
      </Section>

      <Section id="ent">
        <H2><i className="fas fa-boxes-stacked" /> Step 2 — Entities (3 min)</H2>
        <p className="rl-intro"><b>Rule:</b> Take nouns from requirements — each becomes a class.</p>
        <Bullet title="RateLimiter (interface)">tryAcquire + getRemaining. Core abstraction.<br /><i>Why: all algorithms implement this.</i></Bullet>
        <Bullet title="TokenBucketLimiter">Holds tokens + lastRefill per client. Refills at rate.<br /><i>Why: most common — allows bursts.</i></Bullet>
        <Bullet title="LeakyBucketLimiter">Holds queue of timestamps. Drops if full.<br /><i>Why: smooths traffic — no bursts.</i></Bullet>
        <Bullet title="SlidingWindowLimiter">Holds deque of timestamps. Removes expired.<br /><i>Why: precise — no boundary spike.</i></Bullet>
        <Bullet title="ClientBucket / Config / Factory / Registry">Per-client state, immutable config, Factory creation, Registry lookup.<br /><i>Why: SRP — each has one job.</i></Bullet>
      </Section>

      <Section id="uml">
        <H2><i className="fas fa-project-diagram" /> Step 3 — Class Diagram (10 min)</H2>
        <p className="rl-intro">Draw this on the whiteboard. Relationships are the key signal:</p>
        <CodeBlock code={UML} lang="text" />
        <Tip><b>Key relationship:</b> Limiter owns per-client state (Composition). Registry holds limiters. Factory creates. Config injected (DIP).</Tip>
      </Section>

      <Section id="db">
        <H2><i className="fas fa-database" /> Step 4 — DB Design (5 min)</H2>
        <p className="rl-intro">Hot-path state is in-memory/Redis. DB holds config + audit — 3 tables:</p>
        <CodeBlock code={SQL} lang="sql" />
        <Bullet title="idx_config_client">Config lookup by client O(log n).<br /><i>Why: fast config fetch.</i></Bullet>
        <Bullet title="idx_event_client_time">Time-range audit queries.<br /><i>Why: hot-path stays in-memory; events async-logged.</i></Bullet>
        <Bullet title="violations aggregated">One row per (client, endpoint). Count incremented.<br /><i>Why: keeps table small.</i></Bullet>
      </Section>

      <Section id="java">
        <H2><i className="fab fa-java" /> Step 5 — Java Code (20-25 min)</H2>
        <p className="rl-intro">Minimal working Java. Skip boilerplate getters unless asked:</p>
        <H3>Block A — Config + Interface + Token Bucket</H3>
        <CodeBlock code={JAVA_A} lang="java" />
        <H3>Block B — Leaky Bucket + Sliding Window</H3>
        <CodeBlock code={JAVA_B} lang="java" />
        <H3>Block C — Factory + Registry + Main</H3>
        <CodeBlock code={JAVA_C} lang="java" />
      </Section>

      <Section id="wrap">
        <H2><i className="fas fa-flag-checkered" /> Step 6 — Wrap-up (3 min)</H2>
        <p className="rl-intro">Be ready to answer these without thinking:</p>
        <Bullet title="Concurrency — prevent over-allowing?">Per-client ReentrantLock. For scale, Redis + Lua scripts.<br /><i>Why: fine-grained locking.</i></Bullet>
        <Bullet title="Token vs Leaky vs Sliding?">Token allows bursts. Leaky smooths. Sliding is precise, more memory.<br /><i>Why: must compare tradeoffs.</i></Bullet>
        <Bullet title="How to make it distributed?">Redis: INCR+EXPIRE or ZSET with timestamps. Registry wraps Redis.<br /><i>Why: production architecture.</i></Bullet>
        <Bullet title="Patterns used + SOLID">Strategy, Factory, Composition, Encapsulation.<br /><i>Why: naming patterns shows vocabulary.</i></Bullet>
        <Tip><b>Scorecard:</b> Requirements (5) + Entities (3) + Diagram (10) + DB (5) + Code (20) + Wrap-up (3) = 46 min.</Tip>
      </Section>

      <footer className="rl-footer">
        <Link to="/maang/system-design/advanced">Back to Advanced System Design</Link>
      </footer>
    </div>
  );
}