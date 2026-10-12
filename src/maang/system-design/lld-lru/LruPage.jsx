import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import hljs from "../../../utils/hljs";
import "highlight.js/styles/atom-one-dark.css";
import "./LruLot.css";
import { JAVA_A } from "./l1";
import { JAVA_B } from "./l2";
import { JAVA_C } from "./l3";
import { SQL, UML } from "./lruTexts";

function CodeBlock({ code, lang }) {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current) { ref.current.removeAttribute("data-highlighted"); hljs.highlightElement(ref.current); }
  }, [code]);
  return (
    <div className="lru-code">
      <div className="lru-code-head"><span className="dots"><i/><i/><i/></span><span className="pl-lang">{lang}</span></div>
      <pre className="lru-pre"><code ref={ref} className={`language-${lang}`}>{code}</code></pre>
    </div>
  );
}
const Section = ({ id, children }) => <section id={id} className="lru-section">{children}</section>;
const H2 = ({ children }) => <h2 className="lru-h2">{children}</h2>;
const H3 = ({ children }) => <h3 className="lru-h3">{children}</h3>;
const Bullet = ({ title, children }) => (<div className="lru-bullet"><b>{title}</b><span>{children}</span></div>);
const Tip = ({ children }) => <div className="lru-tip">{children}</div>;

export default function LruPage() {
  return (
    <div className="lru-root">
      <header className="lru-header">
        <Link to="/maang/system-design/advanced" className="lru-back">← Back to Advanced System Design</Link>
        <h1><i className="fas fa-database" /> LRU Cache — LLD <span className="lru-badge"><i className="fab fa-java" /> Java + UML</span></h1>
        <div className="lru-sub-info">
          <span><i className="fas fa-list-check" /> 6 Steps</span>
          <span><i className="fas fa-code" /> Working Java</span>
          <span><i className="fas fa-database" /> DB Schema</span>
          <span className="lru-badge-alt"><i className="fas fa-mouse-pointer" /> Scroll down</span>
        </div>
        <nav className="lru-nav">
          <a href="#req">1. Requirements</a><a href="#ent">2. Entities</a><a href="#uml">3. Diagram</a><a href="#db">4. DB</a><a href="#java">5. Java</a><a href="#wrap">6. Wrap-up</a>
        </nav>
      </header>

      <Section id="req">
        <H2><i className="fas fa-list-check" /> Step 1 — Requirements (5 min)</H2>
        <p className="lru-intro"><b>What to do:</b> Pick <b>4 functional</b> + <b>3 non-functional</b>. State what is OUT of scope (TTL expiry, disk spillover, distributed cache).</p>
        <H3>Functional — what the system DOES</H3>
        <Bullet title="1. Fixed-capacity cache">Constructor takes capacity. When full, evict LRU before inserting new.<br /><i>Why: capacity drives eviction — core constraint.</i></Bullet>
        <Bullet title="2. get(key) — O(1)">Return value if present. Move entry to MRU. Null if absent.<br /><i>Why: access updates recency — the LRU part.</i></Bullet>
        <Bullet title="3. put(key, value) — O(1)">Insert or update. If full, evict LRU. Move to MRU.<br /><i>Why: insertion + eviction must be O(1).</i></Bullet>
        <Bullet title="4. Eviction policy — LRU">LRU entry evicted first. Both get and put update recency.<br /><i>Why: policy is the core algorithm.</i></Bullet>
        <H3>Non-Functional — how the system BEHAVES</H3>
        <Bullet title="1. Thread-safe">Concurrent get/put must not corrupt list or map. Use locks.<br /><i>Why: concurrency is the #1 follow-up.</i></Bullet>
        <Bullet title="2. Generic — K, V">Works for any key/value type. Use generics.<br /><i>Why: type safety — reusable code.</i></Bullet>
        <Bullet title="3. Extensible">New policy (LFU, FIFO) = new EvictionPolicy. No core changes.<br /><i>Why: shows OCP and DIP.</i></Bullet>
        <Tip><b>Interview line:</b> Skip TTL expiry, disk spillover, distributed cache unless asked — focus on O(1) get/put with LRU eviction.</Tip>
      </Section>

      <Section id="ent">
        <H2><i className="fas fa-boxes-stacked" /> Step 2 — Entities (3 min)</H2>
        <p className="lru-intro"><b>Rule:</b> Take nouns from requirements — each becomes a class.</p>
        <Bullet title="LRUCache (generic K, V)">Top-level container. Holds capacity, map, list. Has get, put, evict.<br /><i>Why: facade over map + list.</i></Bullet>
        <Bullet title="Node">Doubly linked list node. Has key, value, prev, next.<br /><i>Why: unit of recency — prev + next for O(1) removal.</i></Bullet>
        <Bullet title="DoublyLinkedList">Holds head (MRU) and tail (LRU). Has addFirst, removeNode, moveToFront.<br /><i>Why: separates list mechanics from cache (SRP).</i></Bullet>
        <Bullet title="EvictionPolicy + LRUEvictionPolicy">evict selects victim. LRU = remove tail.<br /><i>Why: Strategy — swap policy without changing core.</i></Bullet>
        <Bullet title="CacheStats (optional)">Hits, misses, evictions. For monitoring.<br /><i>Why: observability — interviewers like this.</i></Bullet>
      </Section>

      <Section id="uml">
        <H2><i className="fas fa-project-diagram" /> Step 3 — Class Diagram (10 min)</H2>
        <p className="lru-intro">Draw this on the whiteboard. Relationships are the key signal:</p>
        <CodeBlock code={UML} lang="text" />
        <Tip><b>Key relationship:</b> Cache to List is Composition. Cache to Policy is Dependency (DIP). HashMap + DLL = O(1).</Tip>
      </Section>

      <Section id="db">
        <H2><i className="fas fa-database" /> Step 4 — DB Design (5 min)</H2>
        <p className="lru-intro">LRU is in-memory, so DB is about persistence for warm restart — 2 tables:</p>
        <CodeBlock code={SQL} lang="sql" />
        <Bullet title="idx_cache_lru">Makes LRU eviction query O(log n).<br /><i>Why: reload most-recent N on restart.</i></Bullet>
        <Bullet title="cache_name in PK">Enables multiple named caches in one table.<br /><i>Why: partition-friendly.</i></Bullet>
        <Bullet title="Why DB at all?">Pure in-memory loses data on restart. Persist with last_access for warm restart.<br /><i>Why: distributed cache source of truth.</i></Bullet>
      </Section>

      <Section id="java">
        <H2><i className="fab fa-java" /> Step 5 — Java Code (20-25 min)</H2>
        <p className="lru-intro">Minimal working Java. Skip boilerplate getters unless asked:</p>
        <H3>Block A — Node + DoublyLinkedList</H3>
        <CodeBlock code={JAVA_A} lang="java" />
        <H3>Block B — EvictionPolicy + LRUCache</H3>
        <CodeBlock code={JAVA_B} lang="java" />
        <H3>Block C — Main + Demo</H3>
        <CodeBlock code={JAVA_C} lang="java" />
      </Section>

      <Section id="wrap">
        <H2><i className="fas fa-flag-checkered" /> Step 6 — Wrap-up (3 min)</H2>
        <p className="lru-intro">Be ready to answer these without thinking:</p>
        <Bullet title="Concurrency — prevent corruption?">ReentrantReadWriteLock — get takes write lock (mutates recency).<br /><i>Why: ConcurrentHashMap alone is insufficient.</i></Bullet>
        <Bullet title="Why HashMap + DLL?">Map gives O(1) lookup. DLL gives O(1) removal at both ends.<br /><i>Why: singly linked needs O(n) for prev.</i></Bullet>
        <Bullet title="Why not LinkedHashMap?">accessOrder + removeEldestEntry gives LRU in 5 lines. But build from scratch to prove understanding.<br /><i>Why: interviewers want mechanics, not shortcuts.</i></Bullet>
        <Bullet title="Patterns used + SOLID">Strategy, Composition, Encapsulation, Generics.<br /><i>Why: naming patterns shows vocabulary.</i></Bullet>
        <Tip><b>Scorecard:</b> Requirements (5) + Entities (3) + Diagram (10) + DB (5) + Code (20) + Wrap-up (3) = 46 min.</Tip>
      </Section>

      <footer className="lru-footer">
        <Link to="/maang/system-design/advanced">Back to Advanced System Design</Link>
      </footer>
    </div>
  );
}