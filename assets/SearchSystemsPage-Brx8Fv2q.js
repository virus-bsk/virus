import{r as e}from"./rolldown-runtime-QTnfLwEv.js";import{t}from"./react-CZI7_Jkm.js";import{r as n,s as r}from"./index-BjSszV1C.js";/* empty css                 */var i=e(t(),1),a=n(),o=[{id:`ES`,name:`Elasticsearch`,icon:`🔎`,tagline:`Distributed search & analytics engine`,accent:`#1d4ed8`,meaning:`Elasticsearch is a distributed, RESTful search engine built on Apache Lucene. Data is stored as JSON documents in indices, indexed for full-text search and aggregated analytics. It's the default answer for 'add search to your app' — used for product search, log analytics (ELK stack), autocomplete, and geospatial queries.`,analogy:`A book's index at the back: instead of reading every page to find 'photosynthesis', you look up the term and jump straight to pages. Elasticsearch builds such indexes over millions of documents and can search them in milliseconds.`,sql:`# Index a document
PUT /products/_doc/42
{ "name": "Wireless Mouse",
  "brand": "Logi", "price": 25 }

# Search (full-text, scored)
GET /products/_search
{ "query": {
    "match": { "name": "wireless mouse" }
  }
}

# Cluster basics
Node   : one ES server
Index  : like a database table
Shard  : a Lucene index (unit of scaling)
Replica: copy of a shard (HA + read scale)

# Also used as: ELK log store, metrics,
# autocomplete, geo search, aggregations.`},{id:`INVIDX`,name:`Inverted Index`,icon:`🗂️`,tagline:`The data structure that powers search`,accent:`#c2410c`,meaning:`A normal index maps documents to their words. An inverted index flips it: it maps each term to the list of documents containing it (a posting list), often with positions and frequencies. Looking up a query term is O(1)-ish; intersecting posting lists finds documents matching all terms — this is why full-text search is fast at scale.`,analogy:`Instead of asking 'which words are in book #42?' you ask 'which books mention the word dragon?' — the librarian keeps a card per word listing every book that contains it. Look up 'dragon', get the list instantly.`,sql:`Documents:
  D1: "the quick brown fox"
  D2: "the lazy dog"
  D3: "quick dog park"

Inverted index:
  the   -> [D1, D2]
  quick -> [D1, D3]
  brown -> [D1]
  fox   -> [D1]
  lazy  -> [D2]
  dog   -> [D2, D3]
  park  -> [D3]

Query "quick dog":
  [D1,D3] ∩ [D2,D3] = D3  ✓`},{id:`FTS`,name:`Full-Text Search & Relevance`,icon:`🎯`,tagline:`Not just matching — ranking what matters`,accent:`#15803d`,meaning:`Full-text search finds documents containing query terms even with partial/fuzzy matches, then ranks results by relevance. Scoring uses TF-IDF/BM25: terms that appear often in a document (TF) but are rare across all documents (IDF) score higher. Boosts (title > description), freshness, and popularity signals refine the ranking.`,analogy:`A good librarian doesn't just find every book mentioning 'java' — she puts the famous Java programming books first, not a travel guide mentioning Java island. Rare, central terms rank higher.`,sql:`# BM25 score ≈ TF * IDF
TF  : how often the term is in this doc
IDF : log(total docs / docs with term)

"the"  -> IDF ~0 (in every doc, useless)
"kafka"-> IDF high (rare, meaningful)

# Practical ranking boosts
{
  "query": { "multi_match": {
    "query": "wireless mouse",
    "fields": [
      "name^3",        // title matters 3x
      "description" ] } }
}

# Beyond text: popularity, recency,
# business rules, personalization.`},{id:`TOK`,name:`Tokenization & Analysis`,icon:`✂️`,tagline:`How text becomes searchable terms`,accent:`#0e7490`,meaning:`The analyzer pipeline converts raw text into indexed terms: character filters -> tokenizer (split into tokens) -> token filters (lowercase, stemming, stop-word removal, synonyms). This decides what queries match: 'Running' matches 'run' via stemming; 'wifi' matches 'Wi-Fi' via synonyms and tokenization rules.`,analogy:`A translator preparing notes for filing: splits sentences into keywords, converts everything to one case, reduces words to their root ('running'->'run'), and notes that 'wifi' and 'wireless internet' mean the same thing.`,sql:`"The Quick Brown Foxes are RUNNING!"
  | char filter: (none)
  v
tokenizer: [The, Quick, Brown, Foxes,
            are, RUNNING]
  | lowercase + stopwords(are, the)
  | stem: Foxes->fox, RUNNING->run
  v
terms: [quick, brown, fox, run]

# Query "running fast" -> terms
# [run, fast] -> matches the doc!

# Choose analyzers per field:
# standard, english (stemming),
# keyword (no analysis, exact match).`},{id:`SHARD`,name:`Shards & Replicas`,icon:`🧱`,tagline:`How Elasticsearch scales horizontally`,accent:`#7c3aed`,meaning:`An Elasticsearch index is split into primary shards (each a full Lucene index) distributed across nodes — that's horizontal scaling and parallel query execution. Each primary has replica shards (copies) for high availability and extra read throughput. Shard count is fixed at index creation; replicas can change anytime.`,analogy:`A library splits its catalogue across 3 rooms (shards) so searches run in parallel, and photocopies each room's catalogue in another room (replicas). If a room floods, the copy still serves readers.`,sql:`index "products": 3 primaries, 1 replica

node1: P0  P2        node2: P1  R0
node3: R1  R2        (spread for HA)

# Write: request -> primary -> replicate
# Read:  request -> any copy (primary or
#         replica) -> merge results

# Sizing rules of thumb
- shard ~ 10-50 GB, not >50M docs
- too many shards = overhead; too few
  = can't scale after creation
- replicas: >=1 for HA in production
- rebalancing is automatic when
  nodes join/leave`}];function s({topic:e,index:t,isActive:n,onClick:r}){let i=`${e.meaning.slice(0,110)}...`;return(0,a.jsxs)(`article`,{className:`acid-card ${n?`active`:``}`,style:{"--acid-accent":e.accent},onClick:()=>r(e.id),children:[(0,a.jsxs)(`div`,{className:`acid-card-head`,children:[(0,a.jsx)(`span`,{className:`acid-card-letter`,children:e.icon}),(0,a.jsxs)(`div`,{children:[(0,a.jsx)(`h3`,{className:`acid-card-name`,children:e.name}),(0,a.jsx)(`span`,{className:`acid-card-tagline`,children:e.tagline})]})]}),(0,a.jsx)(`p`,{className:`acid-card-summary`,children:i}),(0,a.jsxs)(`div`,{className:`acid-card-actions`,children:[(0,a.jsx)(`button`,{className:`acid-card-btn`,type:`button`,onClick:t=>{t.stopPropagation(),r(e.id)},children:`View details`}),(0,a.jsx)(`span`,{className:`acid-card-badge`,children:`Concept`})]}),(0,a.jsxs)(`span`,{className:`acid-card-index`,children:[t+1,` / `,o.length]}),n&&(0,a.jsx)(`span`,{className:`acid-active-indicator`,children:(0,a.jsx)(`i`,{className:`fas fa-check-circle`})})]})}function c({topic:e,onClose:t}){return e?(0,a.jsx)(`div`,{className:`acid-modal-backdrop`,onClick:t,children:(0,a.jsxs)(`div`,{className:`acid-detail-panel`,onClick:e=>e.stopPropagation(),children:[(0,a.jsxs)(`div`,{className:`acid-detail-header`,children:[(0,a.jsxs)(`h2`,{children:[(0,a.jsx)(`span`,{className:`acid-detail-letter`,children:e.icon}),(0,a.jsx)(`span`,{className:`acid-detail-title`,children:e.name}),(0,a.jsxs)(`span`,{className:`acid-detail-sub`,children:[`— `,e.tagline]})]}),(0,a.jsx)(`button`,{className:`acid-close-btn`,onClick:t,"aria-label":`Close details`,children:(0,a.jsxs)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,width:`18`,height:`18`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2.5`,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,a.jsx)(`line`,{x1:`18`,y1:`6`,x2:`6`,y2:`18`}),(0,a.jsx)(`line`,{x1:`6`,y1:`6`,x2:`18`,y2:`18`})]})})]}),(0,a.jsxs)(`div`,{className:`acid-modal-scroll-content`,children:[(0,a.jsxs)(`div`,{className:`acid-definition-box`,children:[(0,a.jsx)(`strong`,{children:`📘 Definition:`}),` `,e.meaning]}),(0,a.jsxs)(`div`,{className:`acid-detail-grid`,children:[(0,a.jsxs)(`div`,{className:`acid-info-box`,children:[(0,a.jsx)(`h3`,{children:`Real-world analogy`}),(0,a.jsx)(`p`,{children:e.analogy})]}),(0,a.jsxs)(`div`,{className:`acid-code-box`,children:[(0,a.jsx)(`h3`,{children:`How it works`}),(0,a.jsx)(`pre`,{children:(0,a.jsx)(`code`,{children:e.sql})})]})]})]})]})}):null}function l(){let[e,t]=(0,i.useState)(null),n=o.find(t=>t.id===e),l=e=>{t(t=>t===e?null:e)};return(0,a.jsxs)(`div`,{className:`acid-page`,children:[(0,a.jsxs)(`section`,{className:`acid-hero`,children:[(0,a.jsx)(r,{to:`/maang/system-design-basics`,className:`acid-back`,children:`← Back to System Design Basics`}),(0,a.jsxs)(`h1`,{className:`acid-title`,children:[`Search Systems & `,(0,a.jsx)(`span`,{children:`Elasticsearch`})]}),(0,a.jsx)(`p`,{className:`acid-subtitle`,children:`How modern full-text search works — inverted indexes, BM25 ranking, analyzers, and how Elasticsearch scales horizontally.`}),(0,a.jsxs)(`div`,{className:`acid-chip-row`,children:[(0,a.jsx)(`span`,{className:`acid-chip`,children:`🔎 Full-text search`}),(0,a.jsx)(`span`,{className:`acid-chip`,children:`📊 BM25 ranking`}),(0,a.jsx)(`span`,{className:`acid-chip`,children:`🏗️ HLD staple`})]})]}),(0,a.jsxs)(`section`,{className:`acid-props`,children:[(0,a.jsx)(`h2`,{className:`acid-section-title`,children:`Core Concepts`}),(0,a.jsx)(`p`,{className:`acid-section-sub`,children:`Click any card to open the full explanation with analogy and diagrams.`}),(0,a.jsx)(`div`,{className:`acid-grid`,children:o.map((t,n)=>(0,a.jsx)(s,{topic:t,index:n,isActive:e===t.id,onClick:l},t.id))})]}),(0,a.jsx)(c,{topic:n,onClose:()=>t(null)})]})}export{l as default};