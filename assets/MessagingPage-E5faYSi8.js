import{r as e}from"./rolldown-runtime-QTnfLwEv.js";import{t}from"./react-CZI7_Jkm.js";import{o as n,r}from"./index-DCg-4qgp.js";/* empty css                 *//* empty css                      */var i=e(t(),1),a=r(),o=[{id:`KAFKA`,name:`Kafka`,icon:`🌊`,tagline:`Distributed event log at scale`,accent:`#15803d`,meaning:`Kafka is a distributed, partitioned, append-only log. Producers write events to topics (split into partitions for parallelism); consumers read by offset and can replay history. It offers huge throughput, ordered processing per partition, and long-term retention — used for event sourcing, streams, and pipelines.`,analogy:`Kafka is like an infinite DVR for events: everything that happened is recorded in order (the log). You can watch it live, rewatch last week's episode (replay), or jump to any timestamp. Channels are split (partitions) so many viewers watch in parallel.`,sql:`# Topics are split into PARTITIONS (ordered logs)
topic: orders
  partition 0: [e1, e4, e7]  (key=customer-A)
  partition 1: [e2, e5, e8]  (key=customer-B)

# Producer picks partition by key hash ->
# same key = same partition = ordered

# Consumers form GROUPS; each partition is
# read by exactly one consumer in the group
group: analytics
  consumer-1 -> partition 0
  consumer-2 -> partition 1

# Offsets: consumers track position, can
# commit & replay any time. Retention: days+`},{id:`RABBIT`,name:`RabbitMQ`,icon:`🐇`,tagline:`Smart broker, flexible routing`,accent:`#7c3aed`,meaning:`RabbitMQ is a message broker built on AMQP. Producers send to exchanges, which route messages to queues via bindings (direct, topic, fanout, headers routing). It supports acknowledgements, dead-letter queues, priority queues, and complex routing — ideal for task queues and fine-grained delivery logic.`,analogy:`A smart post office: you hand a letter to the counter (exchange) with an address pattern; the postal worker (binding) decides exactly which mailboxes (queues) get a copy. Kafka records everything; Rabbit delivers and deletes.`,sql:`# Routing topology
producer -> exchange -> (binding keys) -> queues
                                        -> consumers

# Exchange types
direct  : exact key match  ("error" -> errors-q)
topic   : pattern match    ("order.*" -> o1, o2)
fanout  : broadcast to all bound queues
headers : match message headers

# Reliability features
- acks: message removed only when consumer acks
- dead-letter queue: failed messages parked
  for inspection/retry
- message TTL + priority queues`},{id:`PC`,name:`Producer / Consumer`,icon:`🔄`,tagline:`The async contract between services`,accent:`#0e7490`,meaning:`The producer/consumer model: producers emit messages; consumers process them independently — different speeds, scaling, and lifecycles. Key design points: message serialisation (schema), delivery guarantees (at-least/once), idempotent consumers (duplicates happen!), and scaling consumers by partition or queue depth.`,analogy:`A sushi conveyor belt: chefs (producers) put plates on the belt at their own pace; diners (consumers) take plates when hungry. Add more diners when plates pile up — that's consumer scaling based on queue depth.`,sql:`# Architecture
[Service A] --produce--> [Broker] --consume--> [Service B]

# Rules of the contract:
1. Producer: never blocks on consumer
2. Consumer: must be IDEMPOTENT (dup delivery
   is a fact of life — dedupe by message id)
3. Schema: agree on the message format (Avro /
   JSON Schema) so both sides evolve freely
4. Backpressure: consumer pulls at its own
   pace; scale consumers when lag grows
   (Kafka consumer lag metric)`},{id:`QUEUE`,name:`Queue`,icon:`📬`,tagline:`First in, first out buffer`,accent:`#1d4ed8`,meaning:`A queue holds messages between a producer and consumer so they don't need to be online at the same time. It decouples services, absorbs traffic spikes (backpressure), and lets consumers process at their own pace. Messages are typically removed after acknowledgement.`,analogy:`A coffee shop line: customers (messages) join a queue; baristas (consumers) take the next order when free. If a rush of 100 customers arrives, the shop doesn't collapse — they simply wait in line and get served in order.`,sql:`// Producer
queue.send("order-created", { id: 42 });

// Consumer (worker)
while (true) {
  msg = queue.receive();      // blocking pull
  process(msg);               // do the work
  msg.ack();                  // remove from queue
  // on crash BEFORE ack -> redelivered
}

// Guarantees:
// at-most-once  : may lose messages
// at-least-once : may duplicate (idempotency!)
// exactly-once  : hardest, per-system support`},{id:`PUBSUB`,name:`Pub/Sub`,icon:`📢`,tagline:`One event, many subscribers`,accent:`#c2410c`,meaning:`In publish/subscribe, senders (publishers) emit events to a topic without knowing who receives them. Any number of subscribers can listen to a topic and each gets its own copy. This decouples producers from consumers completely — add a new subscriber without touching the publisher.`,analogy:`A YouTube channel: the creator uploads one video (publish), and every subscriber gets it in their feed (fan-out). Subscribers can unsubscribe anytime; the creator never needs to know who's watching.`,sql:`// Publisher — knows nothing about consumers
publish("order.created", { orderId: 42 });

// Subscribers each get their own copy
subscribe("order.created", sendEmail);
subscribe("order.created", updateAnalytics);
subscribe("order.created", chargePayment);

// Topic vs Queue:
//   queue  = 1 message -> 1 consumer (work split)
//   pubsub = 1 message -> ALL subscribers (fan-out)
// Kafka does pub-sub with consumer groups
// (each group gets the full stream).`},{id:`GUAR`,name:`Delivery Guarantees & DLQ`,icon:`📬`,tagline:`At-most, at-least, exactly-once + dead letters`,accent:`#7c3aed`,meaning:`Delivery guarantees define what happens to messages under failure: at-most-once (may lose, never duplicate), at-least-once (never lose, may duplicate — needs idempotent consumers), exactly-once (hardest, needs transactions/dedup — Kafka transactions & idempotent producers). A Dead Letter Queue (DLQ) collects messages that repeatedly fail so poison messages don't block the pipeline.`,analogy:`Postal options: regular mail may get lost (at-most-once), registered mail always arrives but you may receive copies (at-least-once), a notarized ledger gives exactly-once. Mail that can't be delivered after 3 attempts goes to a dead-letter office instead of blocking the mailman forever.`,sql:`# The three guarantees
at-most-once  : fire & forget, may lose
at-least-once : ack after processing,
                duplicates possible
                -> consumers idempotent!
exactly-once  : producer idempotence +
                transactions (Kafka EOS)

# DLQ flow
msg fails -> retry (3x, backoff)
          -> still fails -> DLQ
consumer keeps processing new msgs;
ops inspect/replay DLQ later

# Cloud: SQS DLQ, RabbitMQ
dead-letter-exchange, Kafka retry
topics + dead letter topic`}];function s({topic:e,index:t,isActive:n,onClick:r,total:i}){let o=`${e.meaning.slice(0,110)}...`;return(0,a.jsxs)(`article`,{className:`acid-card ${n?`active`:``}`,style:{"--acid-accent":e.accent},onClick:()=>r(e.id),children:[(0,a.jsxs)(`div`,{className:`acid-card-head`,children:[(0,a.jsx)(`span`,{className:`acid-card-letter api-topic-icon`,children:e.icon}),(0,a.jsxs)(`div`,{children:[(0,a.jsx)(`h3`,{className:`acid-card-name`,children:e.name}),(0,a.jsx)(`span`,{className:`acid-card-tagline`,children:e.tagline})]})]}),(0,a.jsx)(`p`,{className:`acid-card-summary`,children:o}),(0,a.jsxs)(`div`,{className:`acid-card-actions`,children:[(0,a.jsx)(`button`,{className:`acid-card-btn`,type:`button`,onClick:t=>{t.stopPropagation(),r(e.id)},children:`View details`}),(0,a.jsx)(`span`,{className:`acid-card-badge`,children:`Messaging`})]}),(0,a.jsxs)(`span`,{className:`acid-card-index`,children:[t+1,` / `,i]}),n&&(0,a.jsx)(`span`,{className:`acid-active-indicator`,children:(0,a.jsx)(`i`,{className:`fas fa-check-circle`})})]})}function c({topic:e,onClose:t}){return e?(0,a.jsx)(`div`,{className:`acid-modal-backdrop`,onClick:t,children:(0,a.jsxs)(`div`,{className:`acid-detail-panel`,onClick:e=>e.stopPropagation(),children:[(0,a.jsxs)(`div`,{className:`acid-detail-header`,children:[(0,a.jsxs)(`h2`,{children:[(0,a.jsx)(`span`,{className:`acid-detail-letter api-topic-icon`,children:e.icon}),(0,a.jsx)(`span`,{className:`acid-detail-title`,children:e.name}),(0,a.jsxs)(`span`,{className:`acid-detail-sub`,children:[`— `,e.tagline]})]}),(0,a.jsx)(`button`,{className:`acid-close-btn`,onClick:t,"aria-label":`Close details`,children:(0,a.jsxs)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,width:`18`,height:`18`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2.5`,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,a.jsx)(`line`,{x1:`18`,y1:`6`,x2:`6`,y2:`18`}),(0,a.jsx)(`line`,{x1:`6`,y1:`6`,x2:`18`,y2:`18`})]})})]}),(0,a.jsxs)(`div`,{className:`acid-modal-scroll-content`,children:[(0,a.jsxs)(`div`,{className:`acid-definition-box`,children:[(0,a.jsx)(`strong`,{children:`📘 Definition:`}),` `,e.meaning]}),(0,a.jsxs)(`div`,{className:`acid-detail-grid`,children:[(0,a.jsxs)(`div`,{className:`acid-info-box`,children:[(0,a.jsx)(`h3`,{children:`Real-world analogy`}),(0,a.jsx)(`p`,{children:e.analogy})]}),(0,a.jsxs)(`div`,{className:`acid-code-box`,children:[(0,a.jsx)(`h3`,{children:`Example`}),(0,a.jsx)(`pre`,{children:(0,a.jsx)(`code`,{children:e.sql})})]})]})]})]})}):null}function l(){let[e,t]=(0,i.useState)(null),r=o.find(t=>t.id===e),l=e=>{t(t=>t===e?null:e)};return(0,a.jsxs)(`div`,{className:`acid-page`,children:[(0,a.jsxs)(`section`,{className:`acid-hero`,children:[(0,a.jsx)(n,{to:`/maang/system-design-basics`,className:`acid-back`,children:`← Back to System Design Basics`}),(0,a.jsxs)(`h1`,{className:`acid-title`,children:[`Messaging & `,(0,a.jsx)(`span`,{children:`Event-Driven Architecture`})]}),(0,a.jsxs)(`p`,{className:`acid-subtitle`,children:[`Services talking asynchronously: events instead of blocking calls.`,` `,(0,a.jsx)(`strong`,{children:`Queue`}),` · `,(0,a.jsx)(`strong`,{children:`Pub/Sub`}),` ·`,` `,(0,a.jsx)(`strong`,{children:`Producer/Consumer`}),` · `,(0,a.jsx)(`strong`,{children:`Kafka`}),` ·`,` `,(0,a.jsx)(`strong`,{children:`RabbitMQ`})]}),(0,a.jsxs)(`div`,{className:`acid-chip-row`,children:[(0,a.jsx)(`span`,{className:`acid-chip`,children:`🧩 5 core concepts`}),(0,a.jsx)(`span`,{className:`acid-chip`,children:`⚡ Async & decoupled`}),(0,a.jsx)(`span`,{className:`acid-chip`,children:`🔥 Kafka vs RabbitMQ`})]})]}),(0,a.jsxs)(`section`,{className:`acid-define`,children:[(0,a.jsx)(`h2`,{children:`🤔 What is Event-Driven Architecture in one line?`}),(0,a.jsxs)(`p`,{children:[`Instead of Service A calling Service B and waiting, A simply`,` `,(0,a.jsx)(`b`,{children:`publishes an event`}),` ("order created!") and moves on. Whoever cares subscribes and reacts — independently, at their own pace. Messages flow through a `,(0,a.jsx)(`b`,{children:`broker`}),` (a queue, pub/sub topic, Kafka or RabbitMQ), which buffers, routes, and retries — so a slow or dead consumer never brings down the producer.`]}),(0,a.jsxs)(`div`,{className:`acid-one-liner`,children:[`💡 Synchronous = `,(0,a.jsx)(`b`,{children:`phone call`}),` (both must be free). Asynchronous messaging = `,(0,a.jsx)(`b`,{children:`WhatsApp message`}),` (send it, deal with it later) — that's the entire idea behind event-driven systems.`]})]}),(0,a.jsxs)(`section`,{className:`acid-props`,children:[(0,a.jsx)(`h2`,{className:`acid-section-title`,children:`The 5 Messaging Concepts`}),(0,a.jsx)(`p`,{className:`acid-section-sub`,children:`Click any card to open the full explanation with a real-world analogy and example.`}),(0,a.jsx)(`div`,{className:`acid-grid`,children:o.map((t,n)=>(0,a.jsx)(s,{topic:t,index:n,total:o.length,isActive:e===t.id,onClick:l},t.id))})]}),(0,a.jsx)(c,{topic:r,onClose:()=>t(null)})]})}export{l as default};