import { useState } from "react";
import { Link } from "react-router-dom";
import "./LoadBalancingPage.css";
import { loadBalancingTopics } from "./loadBalancingData";

function LbCard({ topic, index, isActive, onClick }) {
  const desc = topic.desc || "";
  const short = desc.length > 120 ? desc.slice(0, 120) + "..." : desc;
  return (
    <article className={`lb-card ${isActive ? "active" : ""}`} onClick={() => onClick(topic.id)}>
      <div className="lb-card-head">
        <span className="lb-card-letter"><i className={`fas ${topic.icon}`} /></span>
        <div>
          <h3 className="lb-card-name">{topic.title}</h3>
          <span className="lb-card-tagline">{topic.sub}</span>
        </div>
      </div>
      <p className="lb-card-summary">{short}</p>
      <div className="lb-card-actions">
        <button className="lb-card-btn" type="button">Learn more</button>
        <a className="lb-card-badge" href={topic.videoLink} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>Video</a>
      </div>
      <span className="lb-card-index">{index + 1} / {loadBalancingTopics.length}</span>
      {isActive && <span className="lb-active-indicator">check</span>}
    </article>
  );
}

function LbDetail({ topic, onClose }) {
  if (!topic) return null;
  return (
    <div className="lb-modal-backdrop" onClick={onClose}>
      <div className="lb-detail-panel" onClick={(e) => e.stopPropagation()}>
        <div className="lb-detail-header">
          <h2><span className="lb-detail-title">{topic.title}</span><span className="lb-detail-sub">{topic.sub}</span></h2>
          <button className="lb-close-btn" onClick={onClose} aria-label="Close">X</button>
        </div>
        <div className="lb-modal-scroll-content">
          <div className="lb-definition-box"><strong>Definition: </strong>{topic.definition}</div>
          <div className="lb-detail-grid">
            <div className="lb-info-box">
              <h3>Key points</h3>
              <ul>{(topic.points || []).map((p, i) => <li key={i}>{p}</li>)}</ul>
              <p><strong>Relation: </strong>{topic.relation}</p>
            </div>
            <div className="lb-code-box">
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

function LoadBalancingPage() {
  const [activeId, setActiveId] = useState(null);
  const active = loadBalancingTopics.find((t) => t.id === activeId) || null;
  return (
    <div className="lb-page">
      <Link to="/maang/system-design-basics" className="lb-back">← Back to System Design Basics</Link>
      <header className="lb-hero">
        <h1 className="lb-title">Load <span>Balancing</span></h1>
        <p className="lb-subtitle">Distribute traffic across servers so no single machine becomes a bottleneck.</p>
        <div className="lb-chip-row">
          <span className="lb-chip">Load Balancer</span>
          <span className="lb-chip">Round Robin</span>
          <span className="lb-chip">Least Connections</span>
        </div>
      </header>
      <section className="lb-define">
        <h2>What is Load Balancing?</h2>
        <p>A load balancer sits in front of multiple backend servers and distributes incoming requests. It prevents overload, enables horizontal scaling, and can remove unhealthy servers automatically.</p>
        <div className="lb-one-liner"><strong>One line: </strong>Use round robin for equal servers, least connections for uneven workloads.</div>
      </section>
      <section className="lb-props">
        <h2 className="lb-section-title">Load Balancing Algorithms</h2>
        <p className="lb-section-sub">Click any card to see the idea in plain language, with a diagram and the trade-offs.</p>
        <div className="lb-grid">
          {loadBalancingTopics.map((t, i) => <LbCard key={t.id} topic={t} index={i} isActive={t.id === activeId} onClick={(id) => setActiveId(id)} />)}
        </div>
      </section>
      <LbDetail topic={active} onClose={() => setActiveId(null)} />
      <section className="lb-together">
        <h2>How Load Balancing Works (one flow)</h2>
        <div className="lb-together-wrap">
          <div className="lb-flow">
            <div className="lb-flow-step"><span className="lb-flow-num">1</span><p><b>Client sends request</b> to the load balancer IP.</p></div>
            <div className="lb-flow-step"><span className="lb-flow-num">2</span><p><b>LB picks a server</b> using its algorithm (round robin, least connections, etc.).</p></div>
            <div className="lb-flow-step"><span className="lb-flow-num">3</span><p><b>Server processes</b> the request and sends a response.</p></div>
            <div className="lb-flow-step"><span className="lb-flow-num">4</span><p><b>Health checks</b> remove failed servers from rotation automatically.</p></div>
          </div>
          <pre className="lb-code lb-code-big"><code>{`Client -> LB -> Server A (healthy)
Client -> LB -> Server B (healthy)
Client -> LB -> Server C (removed - unhealthy)`}</code></pre>
        </div>
      </section>
      <section className="lb-why">
        <h2>When to Use What</h2>
        <div className="lb-why-grid">
          <div className="lb-why-card"><h4>Round Robin</h4><ul><li>All servers are equal size</li><li>Requests have similar cost</li><li>Simple and predictable</li></ul></div>
          <div className="lb-why-card"><h4>Least Connections</h4><ul><li>Requests vary in duration</li><li>Some servers are faster</li><li>Better load distribution</li></ul></div>
          <div className="lb-why-card"><h4>Interview tip</h4><ul><li>Mention health checks</li><li>Say stateless servers</li><li>Name NGINX or HAProxy</li></ul></div>
        </div>
      </section>
      <div className="lb-footer-note">One line to remember — load balancing distributes traffic so no single server becomes a bottleneck.</div>
    </div>
  );
}

export default LoadBalancingPage;
