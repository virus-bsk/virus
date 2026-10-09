import { useState } from "react";
import { Link } from "react-router-dom";
import "./CachingPage.css";
import { cachingTopics } from "./cachingData";

function CacheCard({ topic, index, isActive, onClick }) {
  const desc = topic.desc || "";
  const short = desc.length > 120 ? desc.slice(0, 120) + "..." : desc;
  return (
    <article className={`cache-card ${isActive ? "active" : ""}`} onClick={() => onClick(topic.id)}>
      <div className="cache-card-head">
        <span className="cache-card-letter"><i className={`fas ${topic.icon}`} /></span>
        <div>
          <h3 className="cache-card-name">{topic.title}</h3>
          <span className="cache-card-tagline">{topic.sub}</span>
        </div>
      </div>
      <p className="cache-card-summary">{short}</p>
      <div className="cache-card-actions">
        <button className="cache-card-btn" type="button">Learn more</button>
        <a className="cache-card-badge" href={topic.videoLink} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>Video</a>
      </div>
      <span className="cache-card-index">{index + 1} / {cachingTopics.length}</span>
      {isActive && <span className="cache-active-indicator">check</span>}
    </article>
  );
}

function CacheDetail({ topic, onClose }) {
  if (!topic) return null;
  return (
    <div className="cache-modal-backdrop" onClick={onClose}>
      <div className="cache-detail-panel" onClick={(e) => e.stopPropagation()}>
        <div className="cache-detail-header">
          <h2><span className="cache-detail-title">{topic.title}</span><span className="cache-detail-sub">{topic.sub}</span></h2>
          <button className="cache-close-btn" onClick={onClose} aria-label="Close">X</button>
        </div>
        <div className="cache-modal-scroll-content">
          <div className="cache-definition-box"><strong>Definition: </strong>{topic.definition}</div>
          <div className="cache-detail-grid">
            <div className="cache-info-box">
              <h3>Key points</h3>
              <ul>{(topic.points || []).map((p, i) => <li key={i}>{p}</li>)}</ul>
              <p><strong>Relation: </strong>{topic.relation}</p>
            </div>
            <div className="cache-code-box">
              <h3>Diagram</h3>
              {typeof topic.diagram === "function" ? (
                <div dangerouslySetInnerHTML={{ __html: topic.diagram() }} />
              ) : (
                <p>No diagram available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CachingPage() {
  const [activeId, setActiveId] = useState(null);
  const active = cachingTopics.find((t) => t.id === activeId) || null;
  return (
    <div className="cache-page">
      <Link to="/maang/system-design-basics" className="cache-back">← Back to System Design Basics</Link>
      <header className="cache-hero">
        <h1 className="cache-title">Caching <span>Strategies</span></h1>
        <p className="cache-subtitle">Speed up reads and reduce database load with Redis and proven cache patterns.</p>
        <div className="cache-chip-row">
          <span className="cache-chip">Redis</span>
          <span className="cache-chip">Cache-Aside</span>
          <span className="cache-chip">Write-Through</span>
          <span className="cache-chip">Write-Back</span>
          <span className="cache-chip">LRU / LFU</span>
        </div>
      </header>
      <section className="cache-define">
        <h2>What is Caching?</h2>
        <p>Caching stores frequently accessed data in a fast layer (like Redis) so repeated reads skip the slower database. This reduces latency, lowers DB cost, and improves user experience.</p>
        <div className="cache-one-liner"><strong>One line: </strong>Use cache-aside for reads, write-through for consistency, write-back for fast writes.</div>
      </section>
      <section className="cache-props">
        <h2 className="cache-section-title">Caching Concepts</h2>
        <p className="cache-section-sub">Click any card to see the idea in plain language, with a diagram and the trade-offs.</p>
        <div className="cache-grid">
          {cachingTopics.map((t, i) => <CacheCard key={t.id} topic={t} index={i} isActive={t.id === activeId} onClick={(id) => setActiveId(id)} />)}
        </div>
      </section>
      <CacheDetail topic={active} onClose={() => setActiveId(null)} />
      <section className="cache-together">
        <h2>How Caching Works (one flow)</h2>
        <div className="cache-together-wrap">
          <div className="cache-flow">
            <div className="cache-flow-step"><span className="cache-flow-num">1</span><p><b>App receives a read request</b> for user profile.</p></div>
            <div className="cache-flow-step"><span className="cache-flow-num">2</span><p><b>Check Redis cache</b> for the key. HIT = return data (fast).</p></div>
            <div className="cache-flow-step"><span className="cache-flow-num">3</span><p><b>MISS: query database</b>, get the data.</p></div>
            <div className="cache-flow-step"><span className="cache-flow-num">4</span><p><b>Store in cache</b> with a TTL, then return to user.</p></div>
          </div>
          <pre className="cache-code cache-code-big"><code>{`GET user:1001 -> CACHE HIT  (fast, <1ms)
GET user:2002 -> CACHE MISS (slow DB query)
  -> Store in cache with TTL
  -> Return data
Next GET user:2002 -> CACHE HIT (fast)`}</code></pre>
        </div>
      </section>
      <section className="cache-why">
        <h2>When to Use What</h2>
        <div className="cache-why-grid">
          <div className="cache-why-card"><h4>Cache-Aside</h4><ul><li>Read-heavy workloads</li><li>Simple to implement</li><li>Most common pattern</li></ul></div>
          <div className="cache-why-card"><h4>Write-Through / Write-Back</h4><ul><li>Write-heavy workloads</li><li>Strong consistency needed</li><li>Trade-offs on speed vs safety</li></ul></div>
          <div className="cache-why-card"><h4>Interview tip</h4><ul><li>Mention Redis + TTL</li><li>Say cache-aside first</li><li>Discuss eviction policy</li></ul></div>
        </div>
      </section>
      <div className="cache-footer-note">One line to remember - caching makes reads fast by storing hot data in memory, closer to the app.</div>
    </div>
  );
}

export default CachingPage;
