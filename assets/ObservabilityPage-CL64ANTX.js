import{r as e}from"./rolldown-runtime-QTnfLwEv.js";import{t}from"./react-CZI7_Jkm.js";import{o as n,r}from"./index-DCrc1KQY.js";/* empty css                 *//* empty css                      */var i=e(t(),1),a=r(),o=[{id:`LOG`,name:`Logging`,icon:`📝`,tagline:`The system's diary`,accent:`#1d4ed8`,meaning:`Logs are timestamped, discrete event records of what happened (errors, warnings, decisions). Best practice: structured (JSON) logging with correlation IDs, shipped centrally (ELK, Loki, CloudWatch) instead of sitting on individual machines. Levels: DEBUG, INFO, WARN, ERROR — never log secrets (passwords, tokens, PII).`,analogy:`A plane's black box + the pilot's logbook: every decision and anomaly is recorded. After an incident, you replay the logs to reconstruct exactly what happened and when.`,sql:`// Structured logging (JSON), not plain text
log.info("order.processed", {
  orderId: 42,
  userId: 991,
  amount: 250.00,
  traceId: "abc-123",   // links to the trace
  latencyMs: 87,
});

// Centralised pipeline
app -> stdout -> fluentd/otel collector
   -> Loki / Elasticsearch -> dashboards

// Rules:
// - one line per event, machine-parseable
// - correlation ID in every entry
// - ERROR pages a human, INFO explains flow`},{id:`METRICS`,name:`Metrics`,icon:`📊`,tagline:`Numbers over time`,accent:`#c2410c`,meaning:`Metrics are numeric aggregates sampled over time: request rate, error rate, latency percentiles (p50/p95/p99), CPU, memory, queue depth. Cheap to store and perfect for alerting and dashboards. The golden signals: latency, traffic, errors, saturation. Always alert on percentiles, not averages — averages hide suffering outliers.`,analogy:`A car dashboard: speed, RPM, fuel, engine temperature — tiny numbers, continuously updated. You don't read the engine's diary while driving; you watch the needles and react when one goes red.`,sql:`# Prometheus: counters, gauges, histograms
http_requests_total{service="orders"} 124822
http_request_duration_seconds (histogram)

# p99 = 99% of requests are faster than this
p50 = 50ms   (typical user)
p99 = 900ms  (the suffering 1 in 100)
avg = 60ms   <- hides the problem!

# USE / RED method
Rate    - requests/sec
Errors  - error rate
Duration- latency distribution

# Storage: Prometheus scrapes & stores;
# Grafana visualises; Alertmanager pages.`},{id:`MON`,name:`Monitoring`,icon:`🚨`,tagline:`Watching metrics & waking humans`,accent:`#15803d`,meaning:`Monitoring is the practice of watching metrics/logs against thresholds and SLOs, alerting humans when user experience degrades. Good alerts are actionable (symptom-based, e.g. 'p99 > 1s for 5 min'), not noisy ('CPU > 80%'). Modern practice: SLOs + error budgets (burn the budget -> pause features, fix reliability).`,analogy:`A smoke detector, not a heat sensor on every wire: it goes off when there's an actual fire (user-facing symptom), not when the oven is warm. Ten alarms for a burnt toast trains everyone to ignore alarms.`,sql:`# Alert on symptoms users feel
ALERT HighErrorRate
  IF sum(rate(http_errors_total[5m]))
   / sum(rate(http_requests_total[5m])) > 0.02
  FOR 5m   # sustained, not a blip

# SLO & error budget
SLO : 99.9% of requests < 300ms
budget: 0.1% may fail = 43 min/month
burning budget fast -> page someone
budget intact     -> ship features

# Alert hygiene
- every alert must be actionable
- runbook link in every page
- if nobody acted on it in 3 months,
  delete the alert`},{id:`TRACE`,name:`Distributed Tracing`,icon:`🔍`,tagline:`Follow one request across services`,accent:`#0e7490`,meaning:`Distributed tracing follows a single request as it travels through many services. Each request gets a trace ID; every hop is a span (service, duration, tags) with parent-child relationships. Reveals which service added the latency or threw the error. Standard: OpenTelemetry; backends: Jaeger, Zipkin, Tempo, Datadog.`,analogy:`A parcel tracking number: one code, but you see every scan along the way — warehouse, hub, customs, delivery van. When a parcel is late, tracing shows exactly which leg of the journey stalled.`,sql:`# One request, four spans (one trace)
traceId: abc-123
├─ api-gateway        (2ms)
  └─ order-service    (220ms)  ← culprit
     ├─ auth-service   (3ms)
     ├─ db.query       (180ms)  ← slow query!
     └─ payment-svc    (30ms)

# How it propagates
headers: traceparent: 00-abc-xyz-01
(W3C trace context) — each service
extracts, adds a span, re-injects.

# Rules:
- sample smartly (100% errors, ~1-10%
  normal traffic)
- always log the traceId so logs and
  traces link together`}];function s({topic:e,index:t,isActive:n,onClick:r,total:i}){let o=`${e.meaning.slice(0,110)}...`;return(0,a.jsxs)(`article`,{className:`acid-card ${n?`active`:``}`,style:{"--acid-accent":e.accent},onClick:()=>r(e.id),children:[(0,a.jsxs)(`div`,{className:`acid-card-head`,children:[(0,a.jsx)(`span`,{className:`acid-card-letter`,children:e.icon}),(0,a.jsxs)(`div`,{children:[(0,a.jsx)(`h3`,{className:`acid-card-name`,children:e.name}),(0,a.jsx)(`span`,{className:`acid-card-tagline`,children:e.tagline})]})]}),(0,a.jsx)(`p`,{className:`acid-card-summary`,children:o}),(0,a.jsxs)(`div`,{className:`acid-card-actions`,children:[(0,a.jsx)(`button`,{className:`acid-card-btn`,type:`button`,onClick:t=>{t.stopPropagation(),r(e.id)},children:`View details`}),(0,a.jsx)(`span`,{className:`acid-card-badge`,children:`Observability`})]}),(0,a.jsxs)(`span`,{className:`acid-card-index`,children:[t+1,` / `,i]}),n&&(0,a.jsx)(`span`,{className:`acid-active-indicator`,children:(0,a.jsx)(`i`,{className:`fas fa-check-circle`})})]})}function c({topic:e,onClose:t}){return e?(0,a.jsx)(`div`,{className:`acid-modal-backdrop`,onClick:t,children:(0,a.jsxs)(`div`,{className:`acid-detail-panel`,onClick:e=>e.stopPropagation(),children:[(0,a.jsxs)(`div`,{className:`acid-detail-header`,children:[(0,a.jsxs)(`h2`,{children:[(0,a.jsx)(`span`,{className:`acid-detail-letter`,children:e.icon}),(0,a.jsx)(`span`,{className:`acid-detail-title`,children:e.name}),(0,a.jsxs)(`span`,{className:`acid-detail-sub`,children:[`— `,e.tagline]})]}),(0,a.jsx)(`button`,{className:`acid-close-btn`,onClick:t,"aria-label":`Close details`,children:(0,a.jsxs)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,width:`18`,height:`18`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2.5`,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,a.jsx)(`line`,{x1:`18`,y1:`6`,x2:`6`,y2:`18`}),(0,a.jsx)(`line`,{x1:`6`,y1:`6`,x2:`18`,y2:`18`})]})})]}),(0,a.jsxs)(`div`,{className:`acid-modal-scroll-content`,children:[(0,a.jsxs)(`div`,{className:`acid-definition-box`,children:[(0,a.jsx)(`strong`,{children:`📘 Definition:`}),` `,e.meaning]}),(0,a.jsxs)(`div`,{className:`acid-detail-grid`,children:[(0,a.jsxs)(`div`,{className:`acid-info-box`,children:[(0,a.jsx)(`h3`,{children:`Real-world analogy`}),(0,a.jsx)(`p`,{children:e.analogy})]}),(0,a.jsxs)(`div`,{className:`acid-code-box`,children:[(0,a.jsx)(`h3`,{children:`How it works`}),(0,a.jsx)(`pre`,{children:(0,a.jsx)(`code`,{children:e.sql})})]})]})]})]})}):null}function l(){let[e,t]=(0,i.useState)(null),r=o.find(t=>t.id===e),l=e=>{t(t=>t===e?null:e)};return(0,a.jsxs)(`div`,{className:`acid-page`,children:[(0,a.jsxs)(`section`,{className:`acid-hero`,children:[(0,a.jsx)(n,{to:`/maang/system-design-basics`,className:`acid-back`,children:`← Back to System Design Basics`}),(0,a.jsxs)(`h1`,{className:`acid-title`,children:[`🔭 Observability & `,(0,a.jsx)(`span`,{children:`Monitoring`})]}),(0,a.jsx)(`p`,{className:`acid-subtitle`,children:`Understanding what your system is doing inside: logs, metrics, monitoring and tracing.`}),(0,a.jsxs)(`div`,{className:`acid-chip-row`,children:[(0,a.jsx)(`span`,{className:`acid-chip`,children:`🔭 4 core concepts`}),(0,a.jsx)(`span`,{className:`acid-chip`,children:`📊 Metrics & SLOs`}),(0,a.jsx)(`span`,{className:`acid-chip`,children:`🔍 Traces & logs`})]})]}),(0,a.jsxs)(`section`,{className:`acid-props`,children:[(0,a.jsx)(`h2`,{className:`acid-section-title`,children:`The 4 Observability Concepts`}),(0,a.jsx)(`p`,{className:`acid-section-sub`,children:`Click any card to open the full explanation with a real-world analogy and example.`}),(0,a.jsx)(`div`,{className:`acid-grid`,children:o.map((t,n)=>(0,a.jsx)(s,{topic:t,index:n,total:o.length,isActive:e===t.id,onClick:l},t.id))})]}),(0,a.jsx)(c,{topic:r,onClose:()=>t(null)})]})}export{l as default};