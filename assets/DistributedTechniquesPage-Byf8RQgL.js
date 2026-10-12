import{r as e}from"./rolldown-runtime-QTnfLwEv.js";import{t}from"./react-CZI7_Jkm.js";import{o as n,r}from"./index-DCg-4qgp.js";/* empty css                 */var i=e(t(),1),a=r(),o=[{id:`CHASH`,name:`Consistent Hashing`,icon:`🔄`,tagline:`Scaling out without reshuffling everything`,accent:`#1d4ed8`,meaning:`Consistent hashing maps both keys and servers onto a hash ring. A key belongs to the first server clockwise from its hash. When a node joins or leaves, only ~K/N keys move (instead of nearly all with modulo hashing). Virtual nodes spread load evenly. Used by DynamoDB, Cassandra, Memcached clients, CDNs, and sharded systems.`,analogy:`A circular running track with water stations. Runners (keys) stop at the next station clockwise. If you add a station, only runners in its small segment change their stop — everyone else keeps running to the same place.`,sql:`# Naive (bad)
server = hash(key) % N
# N changes -> almost ALL keys remap!

# Consistent hashing
place nodes on ring: pos = hash(node)
key -> walk clockwise -> first node

# Add node X: only keys between
# X and next node move to X (~1/N)

# Virtual nodes (vnodes)
each physical node = 100-200 ring
points -> load balances evenly,
hot spots disappear.

# Users: Cassandra/Dynamo partitions,
# Discord (millions of guilds/LSB),
# load balancing memcache farms.`},{id:`BLOOM`,name:`Bloom Filter`,icon:`🌼`,tagline:`Fast 'definitely NOT present' answers`,accent:`#c2410c`,meaning:`A Bloom filter is a space-efficient probabilistic set. It can say 'definitely not present' (100% sure) or 'maybe present' (with false-positive rate ~1%). It uses a bit array + multiple hash functions; no storage of actual items. Used to avoid useless disk lookups (Cassandra/HBase), check username availability cheaply, and in CDN cache-hit prediction.`,analogy:`A club bouncer with a photographic memory for banned people. If he says 'not banned' — trust it. If he says 'maybe banned' — do a full ID check (database lookup) to be sure. Occasionally flags an innocent person, never misses a banned one.`,sql:`# Structure: m bits, k hash functions
add(x):  h1(x), h2(x), h3(x) -> set bits
has(x):  all k bits set? maybe (or FP)
         any bit clear? DEFINITELY absent

# Math: FP rate ≈ (1 - e^(-kn/m))^k
10 items w/ 1% FP -> ~120 bits total
(vs storing full keys: KBs)

# Classic use: read path
query for key ->
  bloom says "no" -> skip disk read ✓
  bloom says "yes" -> do disk read,
                      filter may FP

# No deletes (bits are shared) — use
# counting bloom filter or rebuild.`},{id:`MERKLE`,name:`Merkle Tree`,icon:`🌳`,tagline:`Detect any data difference cheaply`,accent:`#15803d`,meaning:`A Merkle tree hashes data blocks into leaves, then hashes pairs upward until one root hash remains. Two replicas just compare root hashes: equal = data identical; different = descend the tree to pinpoint exactly which blocks diverge. Used in Cassandra/Dynamo anti-entropy repair, Git, and Bitcoin block verification.`,analogy:`Checking two copies of a huge book: compare the table of contents (root). One chapter differs? Compare its sections — you find the changed paragraph without re-reading every page.`,sql:`          Root = H(H01, H23)
          /             \\
      H01 = H(H0,H1)   H23 = H(H2,H3)
      /      \\          /      \\
   H(D0)   H(D1)    H(D2)   H(D3)

# Replica sync
1. exchange root hashes
2. equal -> done (nothing to fix)
3. differ -> recurse into differing
   subtree -> transfer ONLY the
   divergent blocks

# Why: sync N GB by comparing
# O(log N) hashes + re-sending only
# the few bad blocks.`}];function s({topic:e,index:t,isActive:n,onClick:r}){let i=`${e.meaning.slice(0,110)}...`;return(0,a.jsxs)(`article`,{className:`acid-card ${n?`active`:``}`,style:{"--acid-accent":e.accent},onClick:()=>r(e.id),children:[(0,a.jsxs)(`div`,{className:`acid-card-head`,children:[(0,a.jsx)(`span`,{className:`acid-card-letter`,children:e.icon}),(0,a.jsxs)(`div`,{children:[(0,a.jsx)(`h3`,{className:`acid-card-name`,children:e.name}),(0,a.jsx)(`span`,{className:`acid-card-tagline`,children:e.tagline})]})]}),(0,a.jsx)(`p`,{className:`acid-card-summary`,children:i}),(0,a.jsxs)(`div`,{className:`acid-card-actions`,children:[(0,a.jsx)(`button`,{className:`acid-card-btn`,type:`button`,onClick:t=>{t.stopPropagation(),r(e.id)},children:`View details`}),(0,a.jsx)(`span`,{className:`acid-card-badge`,children:`Concept`})]}),(0,a.jsxs)(`span`,{className:`acid-card-index`,children:[t+1,` / `,o.length]}),n&&(0,a.jsx)(`span`,{className:`acid-active-indicator`,children:(0,a.jsx)(`i`,{className:`fas fa-check-circle`})})]})}function c({topic:e,onClose:t}){return e?(0,a.jsx)(`div`,{className:`acid-modal-backdrop`,onClick:t,children:(0,a.jsxs)(`div`,{className:`acid-detail-panel`,onClick:e=>e.stopPropagation(),children:[(0,a.jsxs)(`div`,{className:`acid-detail-header`,children:[(0,a.jsxs)(`h2`,{children:[(0,a.jsx)(`span`,{className:`acid-detail-letter`,children:e.icon}),(0,a.jsx)(`span`,{className:`acid-detail-title`,children:e.name}),(0,a.jsxs)(`span`,{className:`acid-detail-sub`,children:[`— `,e.tagline]})]}),(0,a.jsx)(`button`,{className:`acid-close-btn`,onClick:t,"aria-label":`Close details`,children:(0,a.jsxs)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,width:`18`,height:`18`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2.5`,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,a.jsx)(`line`,{x1:`18`,y1:`6`,x2:`6`,y2:`18`}),(0,a.jsx)(`line`,{x1:`6`,y1:`6`,x2:`18`,y2:`18`})]})})]}),(0,a.jsxs)(`div`,{className:`acid-modal-scroll-content`,children:[(0,a.jsxs)(`div`,{className:`acid-definition-box`,children:[(0,a.jsx)(`strong`,{children:`📘 Definition:`}),` `,e.meaning]}),(0,a.jsxs)(`div`,{className:`acid-detail-grid`,children:[(0,a.jsxs)(`div`,{className:`acid-info-box`,children:[(0,a.jsx)(`h3`,{children:`Real-world analogy`}),(0,a.jsx)(`p`,{children:e.analogy})]}),(0,a.jsxs)(`div`,{className:`acid-code-box`,children:[(0,a.jsx)(`h3`,{children:`How it works`}),(0,a.jsx)(`pre`,{children:(0,a.jsx)(`code`,{children:e.sql})})]})]})]})]})}):null}function l(){let[e,t]=(0,i.useState)(null),r=o.find(t=>t.id===e),l=e=>{t(t=>t===e?null:e)};return(0,a.jsxs)(`div`,{className:`acid-page`,children:[(0,a.jsxs)(`section`,{className:`acid-hero`,children:[(0,a.jsx)(n,{to:`/maang/system-design-basics`,className:`acid-back`,children:`← Back to System Design Basics`}),(0,a.jsxs)(`h1`,{className:`acid-title`,children:[`Distributed `,(0,a.jsx)(`span`,{children:`Techniques`})]}),(0,a.jsx)(`p`,{className:`acid-subtitle`,children:`The clever algorithms behind big systems — consistent hashing, Bloom filters, Merkle trees, Snowflake IDs, gossip and quorum.`}),(0,a.jsxs)(`div`,{className:`acid-chip-row`,children:[(0,a.jsx)(`span`,{className:`acid-chip`,children:`🔄 Consistent Hashing`}),(0,a.jsx)(`span`,{className:`acid-chip`,children:`🌼 Bloom Filter`}),(0,a.jsx)(`span`,{className:`acid-chip`,children:`🏗️ HLD staple`})]})]}),(0,a.jsxs)(`section`,{className:`acid-props`,children:[(0,a.jsx)(`h2`,{className:`acid-section-title`,children:`Core Concepts`}),(0,a.jsx)(`p`,{className:`acid-section-sub`,children:`Click any card to open the full explanation with analogy and diagrams.`}),(0,a.jsx)(`div`,{className:`acid-grid`,children:o.map((t,n)=>(0,a.jsx)(s,{topic:t,index:n,isActive:e===t.id,onClick:l},t.id))})]}),(0,a.jsx)(c,{topic:r,onClose:()=>t(null)})]})}export{l as default};