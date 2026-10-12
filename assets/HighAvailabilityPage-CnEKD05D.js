import{r as e}from"./rolldown-runtime-QTnfLwEv.js";import{t}from"./react-CZI7_Jkm.js";import{o as n,r}from"./index-DCg-4qgp.js";/* empty css                 *//* empty css                      */var i=e(t(),1),a=r(),o=[{id:`FAILOVER`,name:`Failover`,icon:`🔀`,tagline:`Standby takes over automatically`,accent:`#1d4ed8`,meaning:`Failover is the automatic switch from a failed component to a standby. Hot standby: replica is fully in sync and takes over in seconds. Warm standby: running but partially synced. Cold standby: started only after failure. Detected via health checks + leader election or a load balancer routing away from dead nodes.`,analogy:`An aircraft's co-pilot: if the captain is incapacitated, the co-pilot (already trained, already in sync with the situation) takes the controls immediately — the plane never just falls out of the sky waiting for a replacement.`,sql:`# Database failover (typical setup)
primary  (writes)  --streaming-->  standby (hot)
        health check every 5s

primary dies -> orchestrator (Patroni/RAFT)
  1. confirm primary is really dead
  2. promote standby to primary
  3. update DNS / service discovery
  4. clients reconnect (RTO ~ seconds)

# RPO  = max data loss window
#         (async replication -> seconds lost)
# RTO  = time until service is back`},{id:`REDUN`,name:`Redundancy`,icon:`🧱`,tagline:`N+1 — never a single point of failure`,accent:`#c2410c`,meaning:`Redundancy means duplicating critical components so no single failure takes the system down: multiple app instances behind a load balancer, replicated databases, multi-AZ / multi-region deployments. N+1 = one more than needed to handle load; 2N = full duplicate capacity.`,analogy:`A commercial airplane has two engines but can fly on one (N+1). Hospitals keep backup generators. A single generator that is also the only power source is not redundancy — it's a single point of failure.`,sql:`# Redundancy layers (all of them, not just one)
LB          : 2+ load balancers (active/passive)
App servers : 3+ instances across AZs
Database    : 1 primary + 2 replicas (2 AZs)
Region      : active-active or active-passive

# Availability math
one node 99.9%  -> 8.7h downtime/year
3 independent   -> 1 - (0.001)^3
  nodes           = 99.9999999% (in theory;
  shared deps dominate in practice)`},{id:`HEALTH`,name:`Health Checks`,icon:`🩺`,tagline:`Know who is alive and who is lying`,accent:`#15803d`,meaning:`Health checks let load balancers, orchestrators and registries know if an instance can serve traffic. Liveness: is the process up (restart it if not)? Readiness: is it actually able to handle requests (deps connected, warm caches)? Deep checks verify dependencies; shallow checks just verify the process.`,analogy:`A pilot's pre-flight checklist: 'am I awake' is liveness, 'are all engines, fuel and instruments OK' is readiness. You only take passengers (traffic) when the full readiness checklist passes.`,sql:`# Two endpoints, different jobs
GET /health/live   -> 200 if process is up
  (failing -> orchestrator restarts pod)

GET /health/ready  -> 200 only if able to serve
  (db connected, kafka consumer ready,
   migrations done)
  (failing -> LB removes from pool,
   no restart, just no traffic)

# Anti-patterns: returning 200 always,
# or deep-checking every dependency with a
# 10s timeout on every probe (self-DoS).`},{id:`DR`,name:`Disaster Recovery`,icon:`🚨`,tagline:`When the whole region burns down`,accent:`#7c3aed`,meaning:`Disaster recovery (DR) is the plan for catastrophic loss — region outage, ransomware, data corruption. Measured by RPO (max tolerable data loss) and RTO (max tolerable downtime). Strategies: backup & restore (slow, cheap), pilot light (core infra warm), warm standby (scaled-down live copy), active-active multi-region (instant, expensive).`,analogy:`A fire drill for your data centre: you decide in advance where everyone goes, who does what, and how fast you must be back at work. Fumbling to make a plan during the fire is far too late.`,sql:`# The four DR strategies (cost vs speed)
backup&restore : RPO hours,  RTO hours+
pilot light    : core data replicated,
                 app infra off until needed
warm standby   : scaled-down copy always
                 running; scale up on failover
active-active  : both regions serve traffic
                 RTO ~0, RPO ~0, $$$

# Key numbers (example targets)
RPO <= 5 min   -> async replication fine
RTO <= 15 min  -> warm standby minimum

# Drill it: game-day failover exercises
# every quarter — untested DR = no DR.`},{id:`BACKUP`,name:`Backup`,icon:`💾`,tagline:`The last line of defence`,accent:`#0e7490`,meaning:`Backups are periodic copies of data kept for recovery from deletion, corruption, ransomware or bugs. Practices: 3-2-1 rule (3 copies, 2 media, 1 offsite), full + incremental schedules, retention policies, and — critically — restore testing. A backup you've never restored from is just a hope.`,analogy:`Photos in your phone + cloud + an external drive. When the phone falls in the pool you lose nothing. But a 'backup' you've never actually tried to open? That's a photo of a photo you're not sure exists.`,sql:`# 3-2-1 rule
3 copies   : production + 2 backups
2 media    : disk + object storage/tape
1 offsite  : different region/account
             (survives ransomware that
              wipes your main account)

# Types
full      : everything (Sun)
differential: changes since full (Wed)
incremental : changes since last (Mon-Sat)

# PITR: point-in-time recovery via WAL/
# binlog replay — restore to 09:59:59,
# just before the bad DELETE.

# Test: automated monthly restore drills
# with checksum verification.`}];function s({topic:e,index:t,isActive:n,onClick:r,total:i}){let o=`${e.meaning.slice(0,110)}...`;return(0,a.jsxs)(`article`,{className:`acid-card ${n?`active`:``}`,style:{"--acid-accent":e.accent},onClick:()=>r(e.id),children:[(0,a.jsxs)(`div`,{className:`acid-card-head`,children:[(0,a.jsx)(`span`,{className:`acid-card-letter`,children:e.icon}),(0,a.jsxs)(`div`,{children:[(0,a.jsx)(`h3`,{className:`acid-card-name`,children:e.name}),(0,a.jsx)(`span`,{className:`acid-card-tagline`,children:e.tagline})]})]}),(0,a.jsx)(`p`,{className:`acid-card-summary`,children:o}),(0,a.jsxs)(`div`,{className:`acid-card-actions`,children:[(0,a.jsx)(`button`,{className:`acid-card-btn`,type:`button`,onClick:t=>{t.stopPropagation(),r(e.id)},children:`View details`}),(0,a.jsx)(`span`,{className:`acid-card-badge`,children:`Reliability`})]}),(0,a.jsxs)(`span`,{className:`acid-card-index`,children:[t+1,` / `,i]}),n&&(0,a.jsx)(`span`,{className:`acid-active-indicator`,children:(0,a.jsx)(`i`,{className:`fas fa-check-circle`})})]})}function c({topic:e,onClose:t}){return e?(0,a.jsx)(`div`,{className:`acid-modal-backdrop`,onClick:t,children:(0,a.jsxs)(`div`,{className:`acid-detail-panel`,onClick:e=>e.stopPropagation(),children:[(0,a.jsxs)(`div`,{className:`acid-detail-header`,children:[(0,a.jsxs)(`h2`,{children:[(0,a.jsx)(`span`,{className:`acid-detail-letter`,children:e.icon}),(0,a.jsx)(`span`,{className:`acid-detail-title`,children:e.name}),(0,a.jsxs)(`span`,{className:`acid-detail-sub`,children:[`— `,e.tagline]})]}),(0,a.jsx)(`button`,{className:`acid-close-btn`,onClick:t,"aria-label":`Close details`,children:(0,a.jsxs)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,width:`18`,height:`18`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2.5`,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,a.jsx)(`line`,{x1:`18`,y1:`6`,x2:`6`,y2:`18`}),(0,a.jsx)(`line`,{x1:`6`,y1:`6`,x2:`18`,y2:`18`})]})})]}),(0,a.jsxs)(`div`,{className:`acid-modal-scroll-content`,children:[(0,a.jsxs)(`div`,{className:`acid-definition-box`,children:[(0,a.jsx)(`strong`,{children:`📘 Definition:`}),` `,e.meaning]}),(0,a.jsxs)(`div`,{className:`acid-detail-grid`,children:[(0,a.jsxs)(`div`,{className:`acid-info-box`,children:[(0,a.jsx)(`h3`,{children:`Real-world analogy`}),(0,a.jsx)(`p`,{children:e.analogy})]}),(0,a.jsxs)(`div`,{className:`acid-code-box`,children:[(0,a.jsx)(`h3`,{children:`How it works`}),(0,a.jsx)(`pre`,{children:(0,a.jsx)(`code`,{children:e.sql})})]})]})]})]})}):null}function l(){let[e,t]=(0,i.useState)(null),r=o.find(t=>t.id===e),l=e=>{t(t=>t===e?null:e)};return(0,a.jsxs)(`div`,{className:`acid-page`,children:[(0,a.jsxs)(`section`,{className:`acid-hero`,children:[(0,a.jsx)(n,{to:`/maang/system-design-basics`,className:`acid-back`,children:`← Back to System Design Basics`}),(0,a.jsxs)(`h1`,{className:`acid-title`,children:[`🛡️ High Availability & `,(0,a.jsx)(`span`,{children:`Reliability`})]}),(0,a.jsx)(`p`,{className:`acid-subtitle`,children:`Keeping the lights on: failover, redundancy, health checks, DR and backups.`}),(0,a.jsxs)(`div`,{className:`acid-chip-row`,children:[(0,a.jsx)(`span`,{className:`acid-chip`,children:`🛡️ 5 core concepts`}),(0,a.jsx)(`span`,{className:`acid-chip`,children:`🔁 Failover & redundancy`}),(0,a.jsx)(`span`,{className:`acid-chip`,children:`🚨 DR ready`})]})]}),(0,a.jsxs)(`section`,{className:`acid-props`,children:[(0,a.jsx)(`h2`,{className:`acid-section-title`,children:`The 5 High Availability Concepts`}),(0,a.jsx)(`p`,{className:`acid-section-sub`,children:`Click any card to open the full explanation with a real-world analogy and example.`}),(0,a.jsx)(`div`,{className:`acid-grid`,children:o.map((t,n)=>(0,a.jsx)(s,{topic:t,index:n,total:o.length,isActive:e===t.id,onClick:l},t.id))})]}),(0,a.jsx)(c,{topic:r,onClose:()=>t(null)})]})}export{l as default};