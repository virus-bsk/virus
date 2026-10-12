import{r as e}from"./rolldown-runtime-QTnfLwEv.js";import{t}from"./react-CZI7_Jkm.js";import{o as n,r}from"./index-DCg-4qgp.js";/* empty css                 */var i=e(t(),1),a=r(),o=[{id:`CHUNK`,name:`Chunking`,icon:`🧱`,tagline:`Split big files into manageable pieces`,accent:`#1d4ed8`,meaning:`Chunking splits a large file into fixed-size blocks (e.g. 5–8 MB) that are uploaded, stored, and transferred independently. Benefits: parallel transfers, retrying only failed chunks, streaming/processing data without loading the whole file in memory, and resumable uploads. Chunks are reassembled in order at the destination.`,analogy:`Moving a truckload of furniture: you don't shove the entire truck through the door at once — you carry boxes (chunks) in parallel, and if you drop one box you only redo that box, not the whole truck.`,sql:`# Upload pipeline
file 100MB, chunk = 5MB -> 20 chunks
1. client asks server for upload id
2. upload chunks in parallel (3-5 at a
   time) with index numbers
3. server/object-store stores each chunk
4. on complete: verify all arrived,
   concatenate (or store manifest)

# Why not one big POST?
- one packet glitch = restart 100MB
- no parallelism, memory pressure
- proxies/timeouts kill long uploads`},{id:`MULTIPART`,name:`Multipart Upload`,icon:`📤`,tagline:`S3's native big-file upload protocol`,accent:`#c2410c`,meaning:`S3 Multipart Upload lets you upload one object as a set of parts, independently, in parallel, in any order. After all parts are uploaded you send 'complete' and S3 assembles the object. Failed parts are retried individually; unfinished uploads can be aborted to avoid storage costs. Required for objects over ~5 GB; recommended for >100 MB.`,analogy:`IKEA furniture: the flat-pack arrives as numbered boxes (parts). You can assemble in any order with friends in parallel, and if one box is damaged only that box is replaced — then the final 'complete' combines everything into the product.`,sql:`# S3 multipart flow
1. POST /bucket/key?uploads
   -> UploadId
2. PUT /bucket/key?partNumber=1&uploadId=..
   PUT ...partNumber=2... (parallel)
   each part returns ETag
3. POST ?uploadId=..  (complete)
   body: parts list [ {ETag, partNumber} ]
   -> S3 concatenates -> single object

# Rules
- part size: 5MB..5GB, max 10,000 parts
- retry only failed parts
- abort incomplete uploads (lifecycle
  rule) or you pay for orphaned parts`},{id:`RESUME`,name:`Resume / Retry Upload`,icon:`🔁`,tagline:`Flaky network? Pick up where you left off`,accent:`#15803d`,meaning:`Resumable uploads track which chunks have already been stored so an interrupted upload continues from the last acknowledged chunk instead of restarting. The client keeps a manifest (upload ID + completed parts); on reconnect it queries the server for state, retries missing chunks, then finalizes. This is essential for mobile apps and large media.`,analogy:`A checkpoint in a video game: you don't restart the whole game when you fall — you respawn at the last checkpoint. Each uploaded chunk is a checkpoint for the file.`,sql:`# Client-side state (localStorage / db)
{ uploadId: "u-123", fileHash: "abc",
  done: [1,2,3,4] }   // part numbers

# On resume
GET /upload/u-123/status
  -> server lists parts it actually has
  (server is source of truth!)
retry only missing parts -> complete

# Server-side
- identify file by content hash to
  dedupe (same file = skip already-
  uploaded chunks: "dedup upload")
- expire stale uploads via TTL
# YouTube/Drive/Dropbox all work this way`},{id:`OBJSTORE`,name:`Object Storage & S3`,icon:`☁️`,tagline:`Infinite, cheap, durable blob storage`,accent:`#0e7490`,meaning:`Object storage (AWS S3, GCS, Azure Blob) stores files as immutable objects addressed by unique keys inside buckets — no filesystem hierarchy, exposed over HTTP APIs. It offers ~11 nines durability (replication across AZs), near-infinite scale, lifecycle policies, versioning, and direct browser uploads via presigned URLs so files never pass through your app servers.`,analogy:`A valet parking garage: you hand over your car (file) with a ticket (key). You can't open the hood and edit the engine inside — you get the whole car back by ticket. Infinite space, valets handle the parking (durability).`,sql:`# Key = address, not a path
s3://media-app/uploads/2026/09/
  user991/video.mp4

# Direct upload via presigned URL
1. app server: S3.generatePresignedUrl(
     bucket, key, expiresIn=900)
2. browser PUTs file straight to S3
   (app server never sees the bytes!)
3. S3 event (s3:ObjectCreated) -> Lambda
   -> thumbnail / metadata / index

# Features to mention in interviews
- storage classes (Standard -> Glacier)
- lifecycle rules, versioning,
  encryption at rest, 11 nines durability`}];function s({topic:e,index:t,isActive:n,onClick:r}){let i=`${e.meaning.slice(0,110)}...`;return(0,a.jsxs)(`article`,{className:`acid-card ${n?`active`:``}`,style:{"--acid-accent":e.accent},onClick:()=>r(e.id),children:[(0,a.jsxs)(`div`,{className:`acid-card-head`,children:[(0,a.jsx)(`span`,{className:`acid-card-letter`,children:e.icon}),(0,a.jsxs)(`div`,{children:[(0,a.jsx)(`h3`,{className:`acid-card-name`,children:e.name}),(0,a.jsx)(`span`,{className:`acid-card-tagline`,children:e.tagline})]})]}),(0,a.jsx)(`p`,{className:`acid-card-summary`,children:i}),(0,a.jsxs)(`div`,{className:`acid-card-actions`,children:[(0,a.jsx)(`button`,{className:`acid-card-btn`,type:`button`,onClick:t=>{t.stopPropagation(),r(e.id)},children:`View details`}),(0,a.jsx)(`span`,{className:`acid-card-badge`,children:`Concept`})]}),(0,a.jsxs)(`span`,{className:`acid-card-index`,children:[t+1,` / `,o.length]}),n&&(0,a.jsx)(`span`,{className:`acid-active-indicator`,children:(0,a.jsx)(`i`,{className:`fas fa-check-circle`})})]})}function c({topic:e,onClose:t}){return e?(0,a.jsx)(`div`,{className:`acid-modal-backdrop`,onClick:t,children:(0,a.jsxs)(`div`,{className:`acid-detail-panel`,onClick:e=>e.stopPropagation(),children:[(0,a.jsxs)(`div`,{className:`acid-detail-header`,children:[(0,a.jsxs)(`h2`,{children:[(0,a.jsx)(`span`,{className:`acid-detail-letter`,children:e.icon}),(0,a.jsx)(`span`,{className:`acid-detail-title`,children:e.name}),(0,a.jsxs)(`span`,{className:`acid-detail-sub`,children:[`— `,e.tagline]})]}),(0,a.jsx)(`button`,{className:`acid-close-btn`,onClick:t,"aria-label":`Close details`,children:(0,a.jsxs)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,width:`18`,height:`18`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2.5`,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,a.jsx)(`line`,{x1:`18`,y1:`6`,x2:`6`,y2:`18`}),(0,a.jsx)(`line`,{x1:`6`,y1:`6`,x2:`18`,y2:`18`})]})})]}),(0,a.jsxs)(`div`,{className:`acid-modal-scroll-content`,children:[(0,a.jsxs)(`div`,{className:`acid-definition-box`,children:[(0,a.jsx)(`strong`,{children:`📘 Definition:`}),` `,e.meaning]}),(0,a.jsxs)(`div`,{className:`acid-detail-grid`,children:[(0,a.jsxs)(`div`,{className:`acid-info-box`,children:[(0,a.jsx)(`h3`,{children:`Real-world analogy`}),(0,a.jsx)(`p`,{children:e.analogy})]}),(0,a.jsxs)(`div`,{className:`acid-code-box`,children:[(0,a.jsx)(`h3`,{children:`How it works`}),(0,a.jsx)(`pre`,{children:(0,a.jsx)(`code`,{children:e.sql})})]})]})]})]})}):null}function l(){let[e,t]=(0,i.useState)(null),r=o.find(t=>t.id===e),l=e=>{t(t=>t===e?null:e)};return(0,a.jsxs)(`div`,{className:`acid-page`,children:[(0,a.jsxs)(`section`,{className:`acid-hero`,children:[(0,a.jsx)(n,{to:`/maang/system-design-basics`,className:`acid-back`,children:`← Back to System Design Basics`}),(0,a.jsxs)(`h1`,{className:`acid-title`,children:[`File & Large Data `,(0,a.jsx)(`span`,{children:`Handling`})]}),(0,a.jsx)(`p`,{className:`acid-subtitle`,children:`Upload, store, and serve huge files reliably — chunking, multipart uploads, resume support, and object storage.`}),(0,a.jsxs)(`div`,{className:`acid-chip-row`,children:[(0,a.jsx)(`span`,{className:`acid-chip`,children:`🧱 Chunking`}),(0,a.jsx)(`span`,{className:`acid-chip`,children:`☁️ S3 & presigned URLs`}),(0,a.jsx)(`span`,{className:`acid-chip`,children:`🏗️ HLD staple`})]})]}),(0,a.jsxs)(`section`,{className:`acid-props`,children:[(0,a.jsx)(`h2`,{className:`acid-section-title`,children:`Core Concepts`}),(0,a.jsx)(`p`,{className:`acid-section-sub`,children:`Click any card to open the full explanation with analogy and diagrams.`}),(0,a.jsx)(`div`,{className:`acid-grid`,children:o.map((t,n)=>(0,a.jsx)(s,{topic:t,index:n,isActive:e===t.id,onClick:l},t.id))})]}),(0,a.jsx)(c,{topic:r,onClose:()=>t(null)})]})}export{l as default};