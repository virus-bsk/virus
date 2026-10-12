import{r as e}from"./rolldown-runtime-QTnfLwEv.js";import{t}from"./react-CZI7_Jkm.js";import{o as n,r}from"./index-DCg-4qgp.js";/* empty css                 *//* empty css                      */var i=e(t(),1),a=r(),o=[{id:`LOCK`,name:`Distributed Locks`,icon:`🔐`,tagline:`One worker per critical section`,accent:`#15803d`,meaning:`A distributed lock ensures only one node runs a critical section across a cluster (e.g. only one worker processes a job). Implemented with Redis (SET NX PX + token, or Redlock), ZooKeeper (ephemeral znodes) or the DB (advisory locks). Must handle lock expiry, renewal and safe release.`,analogy:`A single bathroom key at a petrol station: whoever holds the key can enter; everyone else waits. But what if the key-holder falls asleep? The lock must auto-expire (lease) so the queue is never stuck forever.`,sql:`# Redis simple lock (SET with NX + TTL)
SET lock:job-42 <token> NX PX 30000
# NX = only if not exists, PX = auto-expire

# Release safely — only delete YOUR lock
if GET lock:job-42 == <token>:
    DEL lock:job-42        # via Lua (atomic)

# Gotchas:
# - lease expires while work is running ->
#   renew it (heartbeat) or use fencing tokens
# - clock skew can break correctness (the
#   Redlock debate) — prefer fencing tokens`},{id:`LEAD`,name:`Leader Election`,icon:`👑`,tagline:`Pick one coordinator among peers`,accent:`#7c3aed`,meaning:`Leader election chooses one node to coordinate work (accept writes, assign tasks) while others follow. If the leader dies, followers detect it via heartbeats and elect a new one. Algorithms: Bully, Raft (randomised timeout + majority vote), ZooKeeper / etcd leases.`,analogy:`A class without a teacher picks a class monitor: everyone raises hands, the first to get a majority wins. If the monitor stops showing up, the class holds a new vote. The randomised start-time avoids two students 'winning' simultaneously.`,sql:`# Raft (used by etcd, Consul, Kafka KRaft)
1. All nodes start as FOLLOWERS
2. No heartbeat from leader -> follower
   becomes CANDIDATE, term++
3. Candidate requests votes from peers
4. Majority of votes -> becomes LEADER
5. Leader sends heartbeats; on failure,
   a new election starts (new term)

# Safety: at most ONE leader per term —
# guaranteed by majority voting`},{id:`FAULT`,name:`Fault Tolerance`,icon:`🛡️`,tagline:`Fail, but never fall over`,accent:`#0e7490`,meaning:`Fault tolerance keeps the system working despite component failures using redundancy, replication, failover, retries with backoff, timeouts, circuit breakers, and health checks. Design for failure: assume every network call can fail or hang, and make the failure path fast and safe.`,analogy:`An airplane has two of everything critical — if one engine fails, the plane flies on. Software equivalent: two database replicas, a backup instance that takes over (failover), and a circuit breaker that stops hammering a dead service.`,sql:`# Common fault-tolerance patterns
Retry with exponential backoff + jitter
  delay = base * 2^attempt + random()

Circuit breaker states:
  CLOSED    -> requests flow normally
  OPEN      -> fail fast, don't call the
               broken service
  HALF-OPEN -> let one probe request
               through; recover if it works

Timeouts: every remote call gets one —
never wait forever.

Health checks + failover: LB stops routing
to a dead node; standby promotes itself.`},{id:`REPL`,name:`Replication`,icon:`🧬`,tagline:`Same data, many machines`,accent:`#1d4ed8`,meaning:`Replication keeps copies of the same data on multiple nodes so the system survives failures and stays close to users. Patterns: single-leader (one primary writes, replicas follow), multi-leader (several nodes accept writes), and leaderless (any replica accepts writes, like Cassandra/DynamoDB).`,analogy:`Photocopies of an important document kept in three offices. If one office burns down, the document still exists. The challenge: when someone edits copy #1, the other copies must be updated — that's replication lag.`,sql:`# Single-leader replication (PostgreSQL / MySQL)
#   primary  -> accepts ALL writes, logs changes
#   replicas -> stream the log (WAL/binlog) & apply

primary:  INSERT INTO orders VALUES (1, 'paid');
replica1: (applies the same change ~ms later)
replica2: (applies the same change ~ms later)

# Sync vs async replication:
#   sync  = writes wait for replicas (safe, slower)
#   async = returns immediately (fast, may lose
#           the latest writes if primary dies)`},{id:`CONS`,name:`Consistency`,icon:`🎯`,tagline:`What do replicas agree on?`,accent:`#c2410c`,meaning:`Consistency defines what a read sees after a write. Strong consistency: every read sees the latest write (like a single machine). Eventual consistency: replicas converge eventually, but reads may be stale. In-between models: read-your-writes, monotonic reads, bounded staleness.`,analogy:`Posting a photo: on Instagram you instantly see your own post (read-your-writes), but your friend might need to refresh before it appears (eventual consistency). A bank balance, however, must be strong — never show outdated money.`,sql:`# Consistency spectrum
strong       : read = latest write (always)
read-your-   : you always see YOUR writes
  writes     :   (session sticky reads)
eventual     : replicas converge "eventually"

# Tunable in Cassandra / DynamoDB:
WRITE: consistency_level = QUORUM
READ : consistency_level = QUORUM
# W + R > N  => strong-ish (read overlaps
#   the latest write quorum)`},{id:`CONSENSUS`,name:`Consensus`,icon:`🤝`,tagline:`Getting replicas to agree on one truth`,accent:`#b45309`,meaning:`Consensus is the problem of getting multiple nodes to agree on a single value/order even with crashes and network delays — the foundation for leader election, replicated state machines and distributed locks. Algorithms: Raft (understandable, used by etcd/Consul), Paxos (classic, hard), ZAB (ZooKeeper). All need a majority (quorum) to make progress.`,analogy:`A board of directors: a decision passes only when more than half vote yes (quorum). Even if a few directors are unreachable, the company keeps deciding — as long as a majority is in the room.`,sql:`# Raft, in one minute
1. elect a leader (majority vote)
2. leader accepts commands, appends
   to its log
3. replicates log to followers
4. entry committed once a MAJORITY
   acknowledges
5. leader applies & replies

# Guarantees
- agreed order of operations (log)
- survives (N/2 - 1) failures
- split brain impossible: only the
  majority side elects a leader

# Where: etcd (K8s), Consul,
  ZooKeeper, CockroachDB, Kafka KRaft`}];function s({topic:e,index:t,isActive:n,onClick:r,total:i}){let o=`${e.meaning.slice(0,110)}...`;return(0,a.jsxs)(`article`,{className:`acid-card ${n?`active`:``}`,style:{"--acid-accent":e.accent},onClick:()=>r(e.id),children:[(0,a.jsxs)(`div`,{className:`acid-card-head`,children:[(0,a.jsx)(`span`,{className:`acid-card-letter api-topic-icon`,children:e.icon}),(0,a.jsxs)(`div`,{children:[(0,a.jsx)(`h3`,{className:`acid-card-name`,children:e.name}),(0,a.jsx)(`span`,{className:`acid-card-tagline`,children:e.tagline})]})]}),(0,a.jsx)(`p`,{className:`acid-card-summary`,children:o}),(0,a.jsxs)(`div`,{className:`acid-card-actions`,children:[(0,a.jsx)(`button`,{className:`acid-card-btn`,type:`button`,onClick:t=>{t.stopPropagation(),r(e.id)},children:`View details`}),(0,a.jsx)(`span`,{className:`acid-card-badge`,children:`Distributed`})]}),(0,a.jsxs)(`span`,{className:`acid-card-index`,children:[t+1,` / `,i]}),n&&(0,a.jsx)(`span`,{className:`acid-active-indicator`,children:(0,a.jsx)(`i`,{className:`fas fa-check-circle`})})]})}function c({topic:e,onClose:t}){return e?(0,a.jsx)(`div`,{className:`acid-modal-backdrop`,onClick:t,children:(0,a.jsxs)(`div`,{className:`acid-detail-panel`,onClick:e=>e.stopPropagation(),children:[(0,a.jsxs)(`div`,{className:`acid-detail-header`,children:[(0,a.jsxs)(`h2`,{children:[(0,a.jsx)(`span`,{className:`acid-detail-letter api-topic-icon`,children:e.icon}),(0,a.jsx)(`span`,{className:`acid-detail-title`,children:e.name}),(0,a.jsxs)(`span`,{className:`acid-detail-sub`,children:[`— `,e.tagline]})]}),(0,a.jsx)(`button`,{className:`acid-close-btn`,onClick:t,"aria-label":`Close details`,children:(0,a.jsxs)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,width:`18`,height:`18`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2.5`,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,a.jsx)(`line`,{x1:`18`,y1:`6`,x2:`6`,y2:`18`}),(0,a.jsx)(`line`,{x1:`6`,y1:`6`,x2:`18`,y2:`18`})]})})]}),(0,a.jsxs)(`div`,{className:`acid-modal-scroll-content`,children:[(0,a.jsxs)(`div`,{className:`acid-definition-box`,children:[(0,a.jsx)(`strong`,{children:`📘 Definition:`}),` `,e.meaning]}),(0,a.jsxs)(`div`,{className:`acid-detail-grid`,children:[(0,a.jsxs)(`div`,{className:`acid-info-box`,children:[(0,a.jsx)(`h3`,{children:`Real-world analogy`}),(0,a.jsx)(`p`,{children:e.analogy})]}),(0,a.jsxs)(`div`,{className:`acid-code-box`,children:[(0,a.jsx)(`h3`,{children:`Example`}),(0,a.jsx)(`pre`,{children:(0,a.jsx)(`code`,{children:e.sql})})]})]})]})]})}):null}function l(){let[e,t]=(0,i.useState)(null),r=o.find(t=>t.id===e),l=e=>{t(t=>t===e?null:e)};return(0,a.jsxs)(`div`,{className:`acid-page`,children:[(0,a.jsxs)(`section`,{className:`acid-hero`,children:[(0,a.jsx)(n,{to:`/maang/system-design-basics`,className:`acid-back`,children:`← Back to System Design Basics`}),(0,a.jsxs)(`h1`,{className:`acid-title`,children:[`Distributed `,(0,a.jsx)(`span`,{children:`Systems`})]}),(0,a.jsxs)(`p`,{className:`acid-subtitle`,children:[`Many machines, one system: keep data copied, coordinated, and alive even when nodes fail. `,(0,a.jsx)(`strong`,{children:`Replication`}),` ·`,` `,(0,a.jsx)(`strong`,{children:`Consistency`}),` · `,(0,a.jsx)(`strong`,{children:`Distributed Locks`}),` ·`,` `,(0,a.jsx)(`strong`,{children:`Leader Election`}),` · `,(0,a.jsx)(`strong`,{children:`Fault Tolerance`})]}),(0,a.jsxs)(`div`,{className:`acid-chip-row`,children:[(0,a.jsx)(`span`,{className:`acid-chip`,children:`🧩 5 core concepts`}),(0,a.jsx)(`span`,{className:`acid-chip`,children:`🌍 Multi-node coordination`}),(0,a.jsx)(`span`,{className:`acid-chip`,children:`🛡️ Survives failures`})]})]}),(0,a.jsxs)(`section`,{className:`acid-define`,children:[(0,a.jsx)(`h2`,{children:`🤔 What is a Distributed System in one line?`}),(0,a.jsxs)(`p`,{children:[`A distributed system is many machines working together as`,` `,(0,a.jsx)(`b`,{children:`one logical computer`}),` — over an unreliable network. Once your data spans multiple nodes, you must answer three hard questions:`,` `,(0,a.jsx)(`b`,{children:`how do copies stay in sync (replication + consistency)?`}),` who coordinates (locks + leader election)? and`,` `,(0,a.jsx)(`b`,{children:`what happens when a machine dies (fault tolerance)?`}),` These five topics are the heart of every system design interview.`]}),(0,a.jsxs)(`div`,{className:`acid-one-liner`,children:[`💡 In distributed systems, `,(0,a.jsx)(`b`,{children:`partial failure is normal`}),` — design every feature assuming some node, somewhere, is currently on fire.`]})]}),(0,a.jsxs)(`section`,{className:`acid-props`,children:[(0,a.jsx)(`h2`,{className:`acid-section-title`,children:`The 5 Distributed Systems Concepts`}),(0,a.jsx)(`p`,{className:`acid-section-sub`,children:`Click any card to open the full explanation with a real-world analogy and example.`}),(0,a.jsx)(`div`,{className:`acid-grid`,children:o.map((t,n)=>(0,a.jsx)(s,{topic:t,index:n,total:o.length,isActive:e===t.id,onClick:l},t.id))})]}),(0,a.jsx)(c,{topic:r,onClose:()=>t(null)})]})}export{l as default};