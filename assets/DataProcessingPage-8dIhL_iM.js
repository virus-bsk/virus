import{r as e}from"./rolldown-runtime-QTnfLwEv.js";import{t}from"./react-CZI7_Jkm.js";import{o as n,r}from"./index-DCg-4qgp.js";/* empty css                 */var i=e(t(),1),a=r(),o=[{id:`BATCH`,name:`Batch Processing`,icon:`🗄️`,tagline:`Process big data in scheduled chunks`,accent:`#1d4ed8`,meaning:`Batch processing runs large jobs over stored data at scheduled times — nightly reports, ETL loads, ML training, billing runs. Optimized for throughput, not latency: read huge datasets, process in bulk, write results. Tools: Hadoop MapReduce, Spark, Airflow (orchestration), data warehouse jobs.`,analogy:`A bank clearing all cheques once a night instead of processing each one the moment it arrives. Nobody waits at midnight for their cheque — but the whole day's volume gets handled efficiently in one big run.`,sql:`# Nightly aggregation job (Airflow DAG)
1. extract: SELECT ... WHERE date = YESTERDAY
2. transform: Spark job (join, aggregate)
3. load: write to warehouse (Snowflake)

# Characteristics
- high throughput, seconds-hours latency
- simple to retry (idempotent jobs)
- run on schedule or on-demand
- data is bounded (has an end)

# Examples: billing, payroll, nightly
# recommendations, model retraining.`},{id:`STREAM`,name:`Stream Processing`,icon:`🌊`,tagline:`React to data the moment it arrives`,accent:`#c2410c`,meaning:`Stream processing handles unbounded, continuous data in (near) real-time: each event is processed as it flows through. Enables fraud detection, live dashboards, alerts, and real-time analytics. Tools: Kafka Streams, Flink, Spark Streaming, ksqlDB. Key challenges: out-of-order events, exactly-once semantics, windowing, state management.`,analogy:`Airport security watching passengers as they walk through continuously — one suspicious bag is flagged in seconds. Batch would be reviewing everyone's luggage at midnight, long after the flight left.`,sql:`# Fraud check per transaction (ms)
stream: card_transactions
  -> filter(amount > 1000)
  -> join with stream: card_locations
  -> alert if 2 countries in 5 min

# Windowing (core concept)
tumbling : [10:00-10:05), [10:05-10:10)
sliding  : last 5 min, moving every 1min
session  : gap-based (user activity)

# Watermarks: handle late events
"wait 2 min of event-time before
 closing a window"

# Exactly-once: Kafka transactions /
# Flink checkpoints.`},{id:`MR`,name:`MapReduce`,icon:`🗺️`,tagline:`Divide, process in parallel, merge`,accent:`#15803d`,meaning:`MapReduce is the classic paradigm for distributed batch computation: a Map phase runs on data splits in parallel producing key-value pairs; a Shuffle groups values by key; a Reduce phase aggregates each key. It scales by just adding machines — fault tolerance via re-running failed tasks. Spark later replaced disk shuffles with in-memory processing.`,analogy:`Counting votes across a huge country: every polling station counts its own ballots (map), each station reports per-candidate totals (shuffle), and a central office sums totals per candidate (reduce).`,sql:`# Classic word count
map(line):
  for word in split(line):
    emit(word, 1)

shuffle: group by word
  "the" -> [1,1,1,...]

reduce(word, counts):
  emit(word, sum(counts))

# Why it scales
- data is split across machines (map)
- no shared state between tasks
- failed task? re-run it on another
  machine (data is on local disk)
# Spark = same model, in-memory,
# ~10-100x faster for iterative jobs.`},{id:`ETL`,name:`ETL & Data Pipelines`,icon:`🚚`,tagline:`Move data from sources to insights`,accent:`#0e7490`,meaning:`ETL (Extract, Transform, Load) pipelines move data from operational sources (databases, events, logs) into analytical stores (warehouses, lakes). Modern ELT loads raw first, transforms inside the warehouse (dbt). Orchestration (Airflow) schedules, retries, and monitors pipeline dependencies. Data quality checks and idempotent, replayable jobs are the core discipline.`,analogy:`A food supply chain: farms (sources) -> trucks (pipeline) -> sorting/cleaning (transform) -> supermarket shelves (warehouse). Each step is scheduled, and a bad batch is rejected before it reaches shelves.`,sql:`# Pipeline anatomy
sources: Postgres CDC, Kafka, app logs
   |
extract -> land raw in S3 (data lake)
   |
transform: dbt models (clean, join,
  dedupe, business rules)
   |
load -> warehouse (Snowflake/BigQuery)
   |
serve: BI dashboards, ML features

# Principles
- idempotent: re-run same day, same result
- CDC (change data capture) instead of
  heavy nightly full extracts
- data quality tests (dbt tests)
- lineage: know where each number
  came from`}];function s({topic:e,index:t,isActive:n,onClick:r}){let i=`${e.meaning.slice(0,110)}...`;return(0,a.jsxs)(`article`,{className:`acid-card ${n?`active`:``}`,style:{"--acid-accent":e.accent},onClick:()=>r(e.id),children:[(0,a.jsxs)(`div`,{className:`acid-card-head`,children:[(0,a.jsx)(`span`,{className:`acid-card-letter`,children:e.icon}),(0,a.jsxs)(`div`,{children:[(0,a.jsx)(`h3`,{className:`acid-card-name`,children:e.name}),(0,a.jsx)(`span`,{className:`acid-card-tagline`,children:e.tagline})]})]}),(0,a.jsx)(`p`,{className:`acid-card-summary`,children:i}),(0,a.jsxs)(`div`,{className:`acid-card-actions`,children:[(0,a.jsx)(`button`,{className:`acid-card-btn`,type:`button`,onClick:t=>{t.stopPropagation(),r(e.id)},children:`View details`}),(0,a.jsx)(`span`,{className:`acid-card-badge`,children:`Concept`})]}),(0,a.jsxs)(`span`,{className:`acid-card-index`,children:[t+1,` / `,o.length]}),n&&(0,a.jsx)(`span`,{className:`acid-active-indicator`,children:(0,a.jsx)(`i`,{className:`fas fa-check-circle`})})]})}function c({topic:e,onClose:t}){return e?(0,a.jsx)(`div`,{className:`acid-modal-backdrop`,onClick:t,children:(0,a.jsxs)(`div`,{className:`acid-detail-panel`,onClick:e=>e.stopPropagation(),children:[(0,a.jsxs)(`div`,{className:`acid-detail-header`,children:[(0,a.jsxs)(`h2`,{children:[(0,a.jsx)(`span`,{className:`acid-detail-letter`,children:e.icon}),(0,a.jsx)(`span`,{className:`acid-detail-title`,children:e.name}),(0,a.jsxs)(`span`,{className:`acid-detail-sub`,children:[`— `,e.tagline]})]}),(0,a.jsx)(`button`,{className:`acid-close-btn`,onClick:t,"aria-label":`Close details`,children:(0,a.jsxs)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,width:`18`,height:`18`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2.5`,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,a.jsx)(`line`,{x1:`18`,y1:`6`,x2:`6`,y2:`18`}),(0,a.jsx)(`line`,{x1:`6`,y1:`6`,x2:`18`,y2:`18`})]})})]}),(0,a.jsxs)(`div`,{className:`acid-modal-scroll-content`,children:[(0,a.jsxs)(`div`,{className:`acid-definition-box`,children:[(0,a.jsx)(`strong`,{children:`📘 Definition:`}),` `,e.meaning]}),(0,a.jsxs)(`div`,{className:`acid-detail-grid`,children:[(0,a.jsxs)(`div`,{className:`acid-info-box`,children:[(0,a.jsx)(`h3`,{children:`Real-world analogy`}),(0,a.jsx)(`p`,{children:e.analogy})]}),(0,a.jsxs)(`div`,{className:`acid-code-box`,children:[(0,a.jsx)(`h3`,{children:`How it works`}),(0,a.jsx)(`pre`,{children:(0,a.jsx)(`code`,{children:e.sql})})]})]})]})]})}):null}function l(){let[e,t]=(0,i.useState)(null),r=o.find(t=>t.id===e),l=e=>{t(t=>t===e?null:e)};return(0,a.jsxs)(`div`,{className:`acid-page`,children:[(0,a.jsxs)(`section`,{className:`acid-hero`,children:[(0,a.jsx)(n,{to:`/maang/system-design-basics`,className:`acid-back`,children:`← Back to System Design Basics`}),(0,a.jsxs)(`h1`,{className:`acid-title`,children:[`Data `,(0,a.jsx)(`span`,{children:`Processing`})]}),(0,a.jsx)(`p`,{className:`acid-subtitle`,children:`From nightly batch jobs to real-time streams — MapReduce, Kafka Streams, and the pipelines that feed analytics.`}),(0,a.jsxs)(`div`,{className:`acid-chip-row`,children:[(0,a.jsx)(`span`,{className:`acid-chip`,children:`🗄️ Batch`}),(0,a.jsx)(`span`,{className:`acid-chip`,children:`🌊 Streaming`}),(0,a.jsx)(`span`,{className:`acid-chip`,children:`🏗️ HLD staple`})]})]}),(0,a.jsxs)(`section`,{className:`acid-props`,children:[(0,a.jsx)(`h2`,{className:`acid-section-title`,children:`Core Concepts`}),(0,a.jsx)(`p`,{className:`acid-section-sub`,children:`Click any card to open the full explanation with analogy and diagrams.`}),(0,a.jsx)(`div`,{className:`acid-grid`,children:o.map((t,n)=>(0,a.jsx)(s,{topic:t,index:n,isActive:e===t.id,onClick:l},t.id))})]}),(0,a.jsx)(c,{topic:r,onClose:()=>t(null)})]})}export{l as default};