import{r as e}from"./rolldown-runtime-QTnfLwEv.js";import{h as t,r as n,u as r}from"./index-Dka5w6n9.js";var i=e(t(),1);function a(){return`<svg viewBox="0 0 760 470" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <marker id="capArrow" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
        <path d="M0,0 L8,4.5 L0,9 Z" fill="#64748b"/>
      </marker>
    </defs>
    <text x="380" y="30" text-anchor="middle" font-size="19" font-weight="700" font-family="Segoe UI,sans-serif" fill="#1a1a2e">CAP Theorem - Pick Any 2 of 3</text>
    <text x="380" y="53" text-anchor="middle" font-size="13" font-family="Segoe UI,sans-serif" fill="#666">Distributed system: at most 2 guarantees at once</text>
    <circle cx="380" cy="128" r="58" fill="#ff6b6b" stroke="#b91c1c" stroke-width="2.5"/>
    <text x="380" y="122" text-anchor="middle" fill="#fff" font-size="26" font-weight="700" font-family="Segoe UI,sans-serif">C</text>
    <text x="380" y="143" text-anchor="middle" fill="#fff" font-size="11" font-weight="600" font-family="Segoe UI,sans-serif">Consistency</text>
    <circle cx="252" cy="292" r="58" fill="#51cf66" stroke="#15803d" stroke-width="2.5"/>
    <text x="252" y="286" text-anchor="middle" fill="#fff" font-size="26" font-weight="700" font-family="Segoe UI,sans-serif">A</text>
    <text x="252" y="307" text-anchor="middle" fill="#fff" font-size="11" font-weight="600" font-family="Segoe UI,sans-serif">Availability</text>
    <circle cx="508" cy="292" r="58" fill="#5c7cfa" stroke="#1d4ed8" stroke-width="2.5"/>
    <text x="508" y="286" text-anchor="middle" fill="#fff" font-size="26" font-weight="700" font-family="Segoe UI,sans-serif">P</text>
    <text x="508" y="307" text-anchor="middle" fill="#fff" font-size="10" font-weight="600" font-family="Segoe UI,sans-serif">Partition Tol.</text>
    <line x1="340" y1="168" x2="290" y2="246" stroke="#64748b" stroke-width="2" stroke-dasharray="5,4" marker-end="url(#capArrow)"/>
    <line x1="420" y1="168" x2="470" y2="246" stroke="#64748b" stroke-width="2" stroke-dasharray="5,4" marker-end="url(#capArrow)"/>
    <line x1="312" y1="292" x2="446" y2="292" stroke="#64748b" stroke-width="2" stroke-dasharray="5,4" marker-end="url(#capArrow)"/>
    <text x="282" y="212" text-anchor="middle" font-size="13" font-weight="700" font-family="Segoe UI,sans-serif" fill="#b91c1c">CA</text>
    <text x="478" y="212" text-anchor="middle" font-size="13" font-weight="700" font-family="Segoe UI,sans-serif" fill="#1d4ed8">CP</text>
    <text x="380" y="286" text-anchor="middle" font-size="13" font-weight="700" font-family="Segoe UI,sans-serif" fill="#15803d">AP</text>
    <rect x="90" y="368" width="180" height="64" rx="10" fill="#fef2f2" stroke="#b91c1c" stroke-width="1.5"/>
    <text x="180" y="390" text-anchor="middle" font-size="13" font-weight="700" font-family="Segoe UI,sans-serif" fill="#b91c1c">CA - single node</text>
    <text x="180" y="410" text-anchor="middle" font-size="11" font-family="Segoe UI,sans-serif" fill="#555">rare in practice</text>
    <rect x="290" y="368" width="180" height="64" rx="10" fill="#f0fdf4" stroke="#15803d" stroke-width="2"/>
    <text x="380" y="390" text-anchor="middle" font-size="13" font-weight="700" font-family="Segoe UI,sans-serif" fill="#15803d">CP - banking</text>
    <text x="380" y="410" text-anchor="middle" font-size="11" font-family="Segoe UI,sans-serif" fill="#555">correct over up</text>
    <rect x="490" y="368" width="180" height="64" rx="10" fill="#eff6ff" stroke="#1d4ed8" stroke-width="2"/>
    <text x="580" y="390" text-anchor="middle" font-size="13" font-weight="700" font-family="Segoe UI,sans-serif" fill="#1d4ed8">AP - feeds</text>
    <text x="580" y="410" text-anchor="middle" font-size="11" font-family="Segoe UI,sans-serif" fill="#555">up over correct</text>
  </svg>`}function o(){return`<svg viewBox="0 0 720 360" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <marker id="cArrow" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
        <path d="M0,0 L8,4.5 L0,9 Z" fill="#15803d"/>
      </marker>
    </defs>
    <text x="360" y="32" text-anchor="middle" font-size="19" font-weight="700" font-family="Segoe UI,sans-serif" fill="#1a1a2e">C - Consistency: every read gets latest write</text>
    <text x="360" y="56" text-anchor="middle" font-size="13" font-family="Segoe UI,sans-serif" fill="#666">All nodes show the SAME value at the SAME time</text>
    <rect x="60" y="84" width="170" height="80" rx="12" fill="#e3f2fd" stroke="#1565c0" stroke-width="2"/>
    <text x="145" y="110" text-anchor="middle" font-size="13" font-weight="700" font-family="Segoe UI,sans-serif" fill="#1565c0">1. WRITE</text>
    <text x="145" y="132" text-anchor="middle" font-size="12" font-family="Segoe UI,sans-serif" fill="#333">balance = $1500</text>
    <text x="145" y="150" text-anchor="middle" font-size="11" font-family="Segoe UI,sans-serif" fill="#666">client writes</text>
    <rect x="275" y="84" width="170" height="80" rx="12" fill="#fff8e1" stroke="#f57c00" stroke-width="2"/>
    <text x="360" y="110" text-anchor="middle" font-size="13" font-weight="700" font-family="Segoe UI,sans-serif" fill="#e65100">2. SYNC</text>
    <text x="360" y="132" text-anchor="middle" font-size="12" font-family="Segoe UI,sans-serif" fill="#333">copy to all nodes</text>
    <text x="360" y="150" text-anchor="middle" font-size="11" font-family="Segoe UI,sans-serif" fill="#666">before replying OK</text>
    <rect x="490" y="84" width="170" height="80" rx="12" fill="#f0fdf4" stroke="#15803d" stroke-width="2"/>
    <text x="575" y="110" text-anchor="middle" font-size="13" font-weight="700" font-family="Segoe UI,sans-serif" fill="#15803d">3. READ</text>
    <text x="575" y="132" text-anchor="middle" font-size="12" font-family="Segoe UI,sans-serif" fill="#333">any node: $1500</text>
    <text x="575" y="150" text-anchor="middle" font-size="11" font-family="Segoe UI,sans-serif" fill="#666">always fresh</text>
    <line x1="230" y1="124" x2="271" y2="124" stroke="#15803d" stroke-width="3" marker-end="url(#cArrow)"/>
    <line x1="445" y1="124" x2="486" y2="124" stroke="#15803d" stroke-width="3" marker-end="url(#cArrow)"/>
    <rect x="145" y="192" width="200" height="64" rx="12" fill="#15803d"/>
    <text x="245" y="218" text-anchor="middle" font-size="15" font-weight="700" font-family="Segoe UI,sans-serif" fill="#fff">Node A: $1500</text>
    <text x="245" y="238" text-anchor="middle" font-size="12" font-family="Segoe UI,sans-serif" fill="#fff">latest value</text>
    <rect x="375" y="192" width="200" height="64" rx="12" fill="#15803d"/>
    <text x="475" y="218" text-anchor="middle" font-size="15" font-weight="700" font-family="Segoe UI,sans-serif" fill="#fff">Node B: $1500</text>
    <text x="475" y="238" text-anchor="middle" font-size="12" font-family="Segoe UI,sans-serif" fill="#fff">same value</text>
    <line x1="345" y1="224" x2="371" y2="224" stroke="#15803d" stroke-width="3" stroke-dasharray="6,4" marker-end="url(#cArrow)"/>
    <rect x="60" y="276" width="600" height="60" rx="10" fill="#fff8e1" stroke="#f57c00" stroke-width="1.5"/>
    <text x="360" y="299" text-anchor="middle" font-size="13" font-weight="700" font-family="Segoe UI,sans-serif" fill="#e65100">Bank example: deposit Rs.1000 - every ATM shows Rs.1000 instantly</text>
    <text x="360" y="320" text-anchor="middle" font-size="12" font-family="Segoe UI,sans-serif" fill="#555">Never stale. Used by: MongoDB, HBase, banking.</text>
  </svg>`}function s(){return`<svg viewBox="0 0 720 380" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <marker id="aArrow" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
        <path d="M0,0 L8,4.5 L0,9 Z" fill="#15803d"/>
      </marker>
    </defs>
    <text x="360" y="30" text-anchor="middle" font-size="18" font-weight="700" font-family="Segoe UI,sans-serif" fill="#1a1a2e">A - Availability: every request gets an answer</text>
    <text x="360" y="52" text-anchor="middle" font-size="12" font-family="Segoe UI,sans-serif" fill="#666">System stays UP even if the answer is slightly old</text>
    <rect x="100" y="72" width="220" height="76" rx="12" fill="#15803d"/>
    <text x="210" y="100" text-anchor="middle" font-size="15" font-weight="700" font-family="Segoe UI,sans-serif" fill="#fff">Node A: $1500</text>
    <text x="210" y="122" text-anchor="middle" font-size="12" font-family="Segoe UI,sans-serif" fill="#fff">got the new write</text>
    <rect x="400" y="72" width="220" height="76" rx="12" fill="#f59f00"/>
    <text x="510" y="100" text-anchor="middle" font-size="15" font-weight="700" font-family="Segoe UI,sans-serif" fill="#fff">Node B: $1000</text>
    <text x="510" y="122" text-anchor="middle" font-size="12" font-family="Segoe UI,sans-serif" fill="#fff">old value (stale)</text>
    <line x1="320" y1="110" x2="400" y2="110" stroke="#b91c1c" stroke-width="3" stroke-dasharray="7,5"/>
    <text x="360" y="102" text-anchor="middle" font-size="18">&#9986;</text>
    <text x="360" y="138" text-anchor="middle" font-size="11" font-family="Segoe UI,sans-serif" fill="#b91c1c">link broken</text>
    <rect x="100" y="168" width="220" height="88" rx="10" fill="#f0fdf4" stroke="#15803d" stroke-width="2"/>
    <text x="210" y="192" text-anchor="middle" font-size="13" font-weight="700" font-family="Segoe UI,sans-serif" fill="#15803d">Read from A:</text>
    <rect x="130" y="202" width="160" height="32" rx="8" fill="#15803d"/>
    <text x="210" y="224" text-anchor="middle" font-size="14" font-weight="700" font-family="Segoe UI,sans-serif" fill="#fff">$1500 fresh</text>
    <text x="210" y="244" text-anchor="middle" font-size="11" font-family="Segoe UI,sans-serif" fill="#555">answers instantly</text>
    <rect x="400" y="168" width="220" height="88" rx="10" fill="#fff8e1" stroke="#f59f00" stroke-width="2"/>
    <text x="510" y="192" text-anchor="middle" font-size="13" font-weight="700" font-family="Segoe UI,sans-serif" fill="#e65100">Read from B:</text>
    <rect x="430" y="202" width="160" height="32" rx="8" fill="#f59f00"/>
    <text x="510" y="224" text-anchor="middle" font-size="14" font-weight="700" font-family="Segoe UI,sans-serif" fill="#fff">$1000 stale, UP</text>
    <text x="510" y="244" text-anchor="middle" font-size="11" font-family="Segoe UI,sans-serif" fill="#555">no error, no waiting</text>
    <rect x="60" y="272" width="600" height="88" rx="10" fill="#e8f5e9" stroke="#15803d" stroke-width="1.5"/>
    <text x="360" y="298" text-anchor="middle" font-size="13" font-weight="700" font-family="Segoe UI,sans-serif" fill="#15803d">Rule: A replies always (maybe stale) - C replies fresh (maybe fails)</text>
    <text x="360" y="320" text-anchor="middle" font-size="12" font-family="Segoe UI,sans-serif" fill="#555">Like-counter shows 999 for 1 sec instead of going down.</text>
    <text x="360" y="340" text-anchor="middle" font-size="12" font-family="Segoe UI,sans-serif" fill="#555">Used by: Cassandra, DynamoDB, feeds.</text>
  </svg>`}function c(){return`<svg viewBox="0 0 720 370" xmlns="http://www.w3.org/2000/svg">
    <text x="360" y="30" text-anchor="middle" font-size="18" font-weight="700" font-family="Segoe UI,sans-serif" fill="#1a1a2e">P - Partition Tolerance: works when network splits</text>
    <text x="360" y="52" text-anchor="middle" font-size="12" font-family="Segoe UI,sans-serif" fill="#666">Mandatory for any distributed system</text>
    <rect x="80" y="72" width="220" height="76" rx="12" fill="#5c7cfa"/>
    <text x="190" y="100" text-anchor="middle" font-size="15" font-weight="700" font-family="Segoe UI,sans-serif" fill="#fff">Node A group</text>
    <text x="190" y="122" text-anchor="middle" font-size="12" font-family="Segoe UI,sans-serif" fill="#fff">keeps serving users</text>
    <rect x="420" y="72" width="220" height="76" rx="12" fill="#5c7cfa"/>
    <text x="530" y="100" text-anchor="middle" font-size="15" font-weight="700" font-family="Segoe UI,sans-serif" fill="#fff">Node B group</text>
    <text x="530" y="122" text-anchor="middle" font-size="12" font-family="Segoe UI,sans-serif" fill="#fff">keeps serving users</text>
    <line x1="300" y1="110" x2="420" y2="110" stroke="#b91c1c" stroke-width="3" stroke-dasharray="7,5"/>
    <text x="360" y="102" text-anchor="middle" font-size="18">&#9986;</text>
    <text x="360" y="138" text-anchor="middle" font-size="11" font-family="Segoe UI,sans-serif" fill="#b91c1c">network split - nodes cannot talk</text>
    <rect x="80" y="168" width="560" height="88" rx="10" fill="#eff6ff" stroke="#1d4ed8" stroke-width="1.5"/>
    <text x="360" y="194" text-anchor="middle" font-size="13" font-weight="700" font-family="Segoe UI,sans-serif" fill="#1d4ed8">System does NOT crash - each side keeps working alone</text>
    <text x="360" y="216" text-anchor="middle" font-size="12" font-family="Segoe UI,sans-serif" fill="#555">Then must choose: stop one side (CP) or allow stale reads (AP)</text>
    <text x="360" y="236" text-anchor="middle" font-size="12" font-family="Segoe UI,sans-serif" fill="#555">Single server can skip P. Real networks cannot.</text>
    <rect x="80" y="270" width="560" height="76" rx="10" fill="#fff8e1" stroke="#f59f00" stroke-width="1.5"/>
    <text x="360" y="296" text-anchor="middle" font-size="13" font-weight="700" font-family="Segoe UI,sans-serif" fill="#e65100">Cable cut / data-center down / switch failure = partition</text>
    <text x="360" y="318" text-anchor="middle" font-size="12" font-family="Segoe UI,sans-serif" fill="#555">Used by: every distributed DB - Cassandra, MongoDB, Kafka.</text>
  </svg>`}function l(){return`<svg viewBox="0 0 720 370" xmlns="http://www.w3.org/2000/svg">
    <text x="360" y="30" text-anchor="middle" font-size="18" font-weight="700" font-family="Segoe UI,sans-serif" fill="#1a1a2e">Partition happens - CP vs AP choice</text>
    <text x="360" y="52" text-anchor="middle" font-size="12" font-family="Segoe UI,sans-serif" fill="#666">Same failure, two opposite decisions</text>
    <rect x="40" y="72" width="310" height="190" rx="12" fill="#fef2f2" stroke="#b91c1c" stroke-width="2"/>
    <text x="195" y="98" text-anchor="middle" font-size="14" font-weight="700" font-family="Segoe UI,sans-serif" fill="#b91c1c">CP - Consistency + Partition</text>
    <text x="195" y="118" text-anchor="middle" font-size="11" font-family="Segoe UI,sans-serif" fill="#666">correct first, fail rather than lie</text>
    <text x="60" y="142" font-size="12" font-family="Segoe UI,sans-serif" fill="#333">Write $1500 lands on Node A.</text>
    <text x="60" y="162" font-size="12" font-family="Segoe UI,sans-serif" fill="#333">Read arrives at Node B ($1000).</text>
    <text x="60" y="182" font-size="12" font-family="Segoe UI,sans-serif" fill="#333">CP refuses: returns ERROR.</text>
    <rect x="60" y="194" width="270" height="32" rx="8" fill="#b91c1c"/>
    <text x="195" y="215" text-anchor="middle" font-size="13" font-weight="700" font-family="Segoe UI,sans-serif" fill="#fff">READ from B: ERROR</text>
    <text x="60" y="244" font-size="11" font-family="Segoe UI,sans-serif" fill="#666">Never wrong data. Ex: MongoDB, HBase</text>
    <rect x="370" y="72" width="310" height="190" rx="12" fill="#f0fdf4" stroke="#15803d" stroke-width="2"/>
    <text x="525" y="98" text-anchor="middle" font-size="14" font-weight="700" font-family="Segoe UI,sans-serif" fill="#15803d">AP - Availability + Partition</text>
    <text x="525" y="118" text-anchor="middle" font-size="11" font-family="Segoe UI,sans-serif" fill="#666">up first, stale rather than down</text>
    <text x="390" y="142" font-size="12" font-family="Segoe UI,sans-serif" fill="#333">Same write $1500 on Node A.</text>
    <text x="390" y="162" font-size="12" font-family="Segoe UI,sans-serif" fill="#333">Same read at Node B ($1000).</text>
    <text x="390" y="182" font-size="12" font-family="Segoe UI,sans-serif" fill="#333">AP answers with old value.</text>
    <rect x="390" y="194" width="270" height="32" rx="8" fill="#15803d"/>
    <text x="525" y="215" text-anchor="middle" font-size="13" font-weight="700" font-family="Segoe UI,sans-serif" fill="#fff">READ from B: $1000 (stale)</text>
    <text x="390" y="244" font-size="11" font-family="Segoe UI,sans-serif" fill="#666">Never downtime. Ex: Cassandra, Dynamo</text>
    <rect x="40" y="276" width="640" height="74" rx="10" fill="#fff8e1" stroke="#f59f00" stroke-width="1.5"/>
    <text x="360" y="302" text-anchor="middle" font-size="13" font-weight="700" font-family="Segoe UI,sans-serif" fill="#e65100">Interview line: banking needs CP, feeds need AP</text>
    <text x="360" y="324" text-anchor="middle" font-size="12" font-family="Segoe UI,sans-serif" fill="#555">Single-node DB can be CA - networked systems pick CP or AP.</text>
  </svg>`}var u=[{id:`cap-overview`,icon:`fa-balance-scale`,title:`CAP Theorem - The Big Picture`,sub:`Pick any 2 out of 3`,desc:`Your app data lives on many computers. If the cable between them cuts, you can keep only 2 of these 3: same data everywhere, always reply, keep working.`,definition:`Think of 2 branches of one bank. The phone line between them cuts. A man deposits money in Branch A. Branch B still shows old balance because it cannot ask Branch A. Now you have only 2 choices: (1) close Branch B for some time so nobody sees wrong money, or (2) keep Branch B open but it will show old money for some time. You cannot do both. This is full CAP theorem.`,videoLink:`https://www.youtube.com/watch?v=6R1jr9gM41s`,code:`// ===== CAP THEOREM - KEY INSIGHTS =====
//
// Scenario: 2 nodes (Node A and Node B) with a network partition
//
// BEFORE partition (both in sync):
//   Node A: balance = $1000
//   Node B: balance = $1000
//   Status: synced
//
// NETWORK PARTITION happens (A cannot talk to B)
//
// Client writes $500 to Node A:
//   Node A: balance = $1500  accepted
//   Node B: balance = $1000  stale (cannot sync)
//
// CP SYSTEM:
//   Client reads from Node B:
//     Node B has stale data ($1000 vs real $1500)
//     CP SYSTEM REFUSES to serve stale data
//     Returns ERROR / timeout
//     Consistency preserved, Availability lost
//
// AP SYSTEM:
//   Client reads from Node B:
//     Node B serves stale data ($1000)
//     AP SYSTEM serves it anyway (stays available)
//     Availability preserved, Consistency lost
//     Data will sync when partition heals

// ===== REAL-WORLD EXAMPLES =====
//
// CP Systems (Consistency + Partition Tolerance):
//   - MongoDB (default settings)
//   - HBase
//   - Redis
//   - ZooKeeper
//   - PostgreSQL (single-primary)
//   - Banking systems, payment processors
//   When partition happens, some requests fail
//
// AP Systems (Availability + Partition Tolerance):
//   - Cassandra
//   - DynamoDB (default)
//   - CouchDB
//   - Riak
//   - Social media feeds, like counters
//   System stays up, may serve stale data briefly

// ===== QUICK DECISION GUIDE =====
//
// Choose CP when:
//   - Data correctness is critical (money, orders, inventory)
//   - Stale data would cause real problems
//   - You can afford some downtime during partitions
//
// Choose AP when:
//   - System availability is more important than instant consistency
//   - Brief staleness is acceptable (feeds, likes, comments)
//   - Your app must stay up no matter what
`,diagram:a,relation:`Money needs correct data (CP). Likes and feeds need always-open app (AP).`,points:[`Your data lives on many computers`,`Cable between them can cut one day`,`Cut time: show error OR show old data`,`You cannot have both at same time`,`One computer can do all 3, many cannot`]},{id:`cap-consistency`,icon:`fa-check-double`,title:`C - Consistency`,sub:`Everyone sees the newest data`,desc:`You put money in one ATM. Every other ATM shows the new money at once. Nobody ever sees old money.`,definition:`Consistency means nobody sees old data. You put Rs.1000 in ATM 1. Your friend checks ATM 2 after 1 second - he also sees Rs.1000, never Rs.0. How? The ATMs first copy the new number to each other, then say OK. Copying takes time so the app feels a little slow. And if the cable breaks, the ATM says sorry-error instead of showing old wrong money.`,videoLink:`https://www.youtube.com/watch?v=6R1jr9gM41s`,diagram:o,relation:`Use it when wrong data is dangerous: money, tickets, orders.`,points:[`Newest data for all, never old data`,`Like bank: all ATMs show same money`,`Machines copy data first, then reply`,`Copy takes time, so app is a bit slow`,`Cable breaks? Shows error, not old data`]},{id:`cap-availability`,icon:`fa-bolt`,title:`A - Availability`,sub:`Always replies, never goes down`,desc:`App is always open. Every tap gets some reply. The reply may be 1 second old, but app never says error.`,definition:`Availability means the app always replies, even if the reply is a little old. Example: Instagram Like count shows 999 for 1 second instead of 1000 - but the app never hangs, never shows error, never goes down. Used where staying open is more important than showing perfect fresh number.`,videoLink:`https://www.youtube.com/watch?v=k-Yaq8AHj6I`,diagram:s,relation:`Use it when app must stay open: feeds, likes, comments.`,points:[`Always replies, never hangs`,`Reply may be 1 second old`,`Best for feeds and likes`,`Fixes itself when cable joins back`,`Price: you lose perfect fresh data`]},{id:`cap-partition`,icon:`fa-network-wired`,title:`P - Partition Tolerance`,sub:`Keeps working when cable cuts`,desc:`Cable between computers cuts, but app keeps running. Each side works alone, then joins back later.`,definition:`Partition means the computers cannot talk to each other - cable cut, switch dead, one city server down. Partition tolerance means the app still keeps running in this bad time. Since cables ALWAYS break one day, any app with 2 or more computers must have P. So the real choice is never all 3 - it is only CP or AP.`,videoLink:`https://www.youtube.com/watch?v=BHqjEjzAicA`,diagram:c,relation:`P is a must - cables break, so real choice is only CP or AP.`,points:[`Partition = computers cannot talk`,`App must still keep running`,`Must-have for 2 or more computers`,`Reason: cable cut, power cut, city down`,`So only choice left is CP or AP`]},{id:`cap-cp-vs-ap`,icon:`fa-scale-balanced`,title:`CP vs AP - When to Use What`,sub:`Correctness or uptime - pick one`,desc:`Cable cuts. Now pick: close shop for correctness (CP like bank), or keep shop open with old data (AP like Instagram).`,definition:`When cable cuts: CP closes the shop - says sorry-error but never shows wrong money. Example: bank, MongoDB, tickets. AP keeps the shop open - shows 1-second-old data but never closes. Example: Instagram, Cassandra, likes. Interview line: say bank needs CP, Instagram needs AP. That one line is enough.`,videoLink:`https://www.youtube.com/watch?v=Jw1Q5Tz8w-Y`,diagram:l,relation:`Bank and tickets need CP. Feeds, likes, carts need AP.`,points:[`CP: says error, never wrong data`,`AP: shows old data, never closes`,`CP = bank, tickets, MongoDB`,`AP = Instagram, likes, Cassandra`,`Interview: say this bank vs Instagram line`]}],d=n();function f({topic:e,index:t,isActive:n,onClick:r}){let i=e.desc.length>120?e.desc.slice(0,120)+`...`:e.desc;return(0,d.jsxs)(`article`,{className:`cap-card ${n?`active`:``}`,onClick:()=>r(e.id),children:[(0,d.jsxs)(`div`,{className:`cap-card-head`,children:[(0,d.jsx)(`span`,{className:`cap-card-letter`,children:(0,d.jsx)(`i`,{className:`fas ${e.icon}`})}),(0,d.jsxs)(`div`,{children:[(0,d.jsx)(`h3`,{className:`cap-card-name`,children:e.title}),(0,d.jsx)(`span`,{className:`cap-card-tagline`,children:e.sub})]})]}),(0,d.jsx)(`p`,{className:`cap-card-summary`,children:i}),(0,d.jsxs)(`div`,{className:`cap-card-actions`,children:[(0,d.jsx)(`button`,{className:`cap-card-btn`,type:`button`,children:`Learn more`}),(0,d.jsx)(`a`,{className:`cap-card-badge`,href:e.videoLink,target:`_blank`,rel:`noopener noreferrer`,onClick:e=>e.stopPropagation(),children:`Video`})]}),(0,d.jsxs)(`span`,{className:`cap-card-index`,children:[t+1,` / `,u.length]}),n&&(0,d.jsx)(`span`,{className:`cap-active-indicator`,children:`check`})]})}function p({topic:e,onClose:t}){return e?(0,d.jsx)(`div`,{className:`cap-modal-backdrop`,onClick:t,children:(0,d.jsxs)(`div`,{className:`cap-detail-panel`,onClick:e=>e.stopPropagation(),children:[(0,d.jsxs)(`div`,{className:`cap-detail-header`,children:[(0,d.jsxs)(`h2`,{children:[(0,d.jsx)(`span`,{className:`cap-detail-title`,children:e.title}),(0,d.jsx)(`span`,{className:`cap-detail-sub`,children:e.sub})]}),(0,d.jsx)(`button`,{className:`cap-close-btn`,onClick:t,"aria-label":`Close`,children:`X`})]}),(0,d.jsxs)(`div`,{className:`cap-modal-scroll-content`,children:[(0,d.jsxs)(`div`,{className:`cap-definition-box`,children:[(0,d.jsx)(`strong`,{children:`Definition: `}),e.definition]}),(0,d.jsxs)(`div`,{className:`cap-detail-grid`,children:[(0,d.jsxs)(`div`,{className:`cap-info-box`,children:[(0,d.jsx)(`h3`,{children:`Key points`}),(0,d.jsx)(`ul`,{children:e.points.map((e,t)=>(0,d.jsx)(`li`,{children:e},t))}),(0,d.jsxs)(`p`,{children:[(0,d.jsx)(`strong`,{children:`Relation: `}),e.relation]})]}),(0,d.jsxs)(`div`,{className:`cap-code-box`,children:[(0,d.jsx)(`h3`,{children:`Diagram`}),(0,d.jsx)(`div`,{dangerouslySetInnerHTML:{__html:e.diagram()}})]})]})]})]})}):null}function m(){let[e,t]=(0,i.useState)(null),n=u.find(t=>t.id===e)||null;return(0,d.jsxs)(`div`,{className:`cap-page`,children:[(0,d.jsx)(r,{to:`/maang/system-design-basics`,className:`cap-back`,children:`← Back to System Design Basics`}),(0,d.jsxs)(`header`,{className:`cap-hero`,children:[(0,d.jsxs)(`h1`,{className:`cap-title`,children:[`CAP `,(0,d.jsx)(`span`,{children:`Theorem`})]}),(0,d.jsx)(`p`,{className:`cap-subtitle`,children:`Your data on many computers - pick any 2 of 3. Simple diagrams plus bank vs Instagram interview answer.`}),(0,d.jsxs)(`div`,{className:`cap-chip-row`,children:[(0,d.jsx)(`span`,{className:`cap-chip`,children:`C - Consistency`}),(0,d.jsx)(`span`,{className:`cap-chip`,children:`A - Availability`}),(0,d.jsx)(`span`,{className:`cap-chip`,children:`P - Partition Tolerance`}),(0,d.jsx)(`span`,{className:`cap-chip`,children:`CP vs AP`})]})]}),(0,d.jsxs)(`section`,{className:`cap-define`,children:[(0,d.jsx)(`h2`,{children:`What is CAP Theorem?`}),(0,d.jsx)(`p`,{children:`One simple rule: if your data lives on many computers, cable will cut one day. At that time you can keep only 2 of 3 - same data everywhere, always reply, keep working. So P is a must, real choice is only CP or AP.`}),(0,d.jsxs)(`div`,{className:`cap-one-liner`,children:[(0,d.jsx)(`strong`,{children:`One line: `}),`Bank needs CP (correct money), Instagram needs AP (always open).`]})]}),(0,d.jsxs)(`section`,{className:`cap-props`,children:[(0,d.jsx)(`h2`,{className:`cap-section-title`,children:`The 3 rules + the real choice`}),(0,d.jsx)(`p`,{className:`cap-section-sub`,children:`Click any card to see simple meaning with picture.`}),(0,d.jsx)(`div`,{className:`cap-grid`,children:u.map((n,r)=>(0,d.jsx)(f,{topic:n,index:r,isActive:n.id===e,onClick:e=>t(e)},n.id))})]}),(0,d.jsx)(p,{topic:n,onClose:()=>t(null)}),(0,d.jsxs)(`section`,{className:`cap-together`,children:[(0,d.jsx)(`h2`,{children:`How all 3 work together (one story)`}),(0,d.jsxs)(`div`,{className:`cap-together-wrap`,children:[(0,d.jsxs)(`div`,{className:`cap-flow`,children:[(0,d.jsxs)(`div`,{className:`cap-flow-step`,children:[(0,d.jsx)(`span`,{className:`cap-flow-num`,children:`1`}),(0,d.jsxs)(`p`,{children:[(0,d.jsx)(`b`,{children:`Normal day:`}),` both computers have Rs.1000.`]})]}),(0,d.jsxs)(`div`,{className:`cap-flow-step`,children:[(0,d.jsx)(`span`,{className:`cap-flow-num`,children:`2`}),(0,d.jsxs)(`p`,{children:[(0,d.jsx)(`b`,{children:`Cable cuts:`}),` new Rs.1500 reaches only A.`]})]}),(0,d.jsxs)(`div`,{className:`cap-flow-step`,children:[(0,d.jsx)(`span`,{className:`cap-flow-num`,children:`3`}),(0,d.jsxs)(`p`,{children:[(0,d.jsx)(`b`,{children:`CP (bank):`}),` B says sorry-error.`]})]}),(0,d.jsxs)(`div`,{className:`cap-flow-step`,children:[(0,d.jsx)(`span`,{className:`cap-flow-num`,children:`4`}),(0,d.jsxs)(`p`,{children:[(0,d.jsx)(`b`,{children:`AP (Instagram):`}),` B shows old Rs.1000, fixes later.`]})]})]}),(0,d.jsx)(`pre`,{className:`cap-code cap-code-big`,children:(0,d.jsx)(`code`,{children:`BEFORE: A=$1000 B=$1000 (in sync)
PARTITION: A X B (no sync)
WRITE: A=$1500, B=$1000 stale
CP READ B -> ERROR
AP READ B -> $1000 stale`})})]})]}),(0,d.jsxs)(`section`,{className:`cap-why`,children:[(0,d.jsx)(`h2`,{children:`Why CAP matters (simple words)`}),(0,d.jsxs)(`div`,{className:`cap-why-grid`,children:[(0,d.jsxs)(`div`,{className:`cap-why-card`,children:[(0,d.jsx)(`h4`,{children:`Pick CP when`}),(0,d.jsxs)(`ul`,{children:[(0,d.jsx)(`li`,{children:`Money, tickets, orders.`}),(0,d.jsx)(`li`,{children:`Bank, MongoDB, HBase.`}),(0,d.jsx)(`li`,{children:`OK to show error for some time.`})]})]}),(0,d.jsxs)(`div`,{className:`cap-why-card`,children:[(0,d.jsx)(`h4`,{children:`Pick AP when`}),(0,d.jsxs)(`ul`,{children:[(0,d.jsx)(`li`,{children:`Feeds, likes, carts.`}),(0,d.jsx)(`li`,{children:`Instagram, Cassandra.`}),(0,d.jsx)(`li`,{children:`App must never close.`})]})]}),(0,d.jsxs)(`div`,{className:`cap-why-card`,children:[(0,d.jsx)(`h4`,{children:`Interview tip`}),(0,d.jsxs)(`ul`,{children:[(0,d.jsx)(`li`,{children:`Cable always cuts, so only CP or AP.`}),(0,d.jsx)(`li`,{children:`Say bank (CP) and Instagram (AP).`}),(0,d.jsx)(`li`,{children:`Name one real app for each.`})]})]})]})]}),(0,d.jsx)(`div`,{className:`cap-footer-note`,children:`One line to remember - cable cuts one day, so pick correct money (CP) or always-open app (AP).`})]})}export{m as default};