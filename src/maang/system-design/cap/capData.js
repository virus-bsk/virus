// ===== CAP Theorem — topic data =====
// CAP = Consistency, Availability, Partition Tolerance
// In a distributed system, you can only pick 2 out of 3.

import {
  svgCAPOverview,
  svgConsistency,
  svgAvailability,
  svgPartitionTolerance,
  svgCPvsAP,
} from "./capDiagrams";

export const capTopics = [
  // ---------- 1. CAP Overview ----------
  {
    id: "cap-overview",
    icon: "fa-balance-scale",
    title: "CAP Theorem - The Big Picture",
    sub: "Pick any 2 out of 3",
    desc: "Your app data lives on many computers. If the cable between them cuts, you can keep only 2 of these 3: same data everywhere, always reply, keep working.",
    definition:
      `Simple rule: When two computers cannot talk, you can keep only 2 of 3 - same data everywhere, always reply, keep working.

Real choice is never all 3. Cables always break, so P is a must.
Choice is only CP (bank: correct money) or AP (Instagram: always open).`,
    videoLink: "https://www.youtube.com/watch?v=6R1jr9gM41s",
    code: `// ===== CAP THEOREM - KEY INSIGHTS =====\n//\n// Scenario: 2 nodes (Node A and Node B) with a network partition\n//\n// BEFORE partition (both in sync):\n//   Node A: balance = $1000\n//   Node B: balance = $1000\n//   Status: synced\n//\n// NETWORK PARTITION happens (A cannot talk to B)\n//\n// Client writes $500 to Node A:\n//   Node A: balance = $1500  accepted\n//   Node B: balance = $1000  stale (cannot sync)\n//\n// CP SYSTEM:\n//   Client reads from Node B:\n//     Node B has stale data ($1000 vs real $1500)\n//     CP SYSTEM REFUSES to serve stale data\n//     Returns ERROR / timeout\n//     Consistency preserved, Availability lost\n//\n// AP SYSTEM:\n//   Client reads from Node B:\n//     Node B serves stale data ($1000)\n//     AP SYSTEM serves it anyway (stays available)\n//     Availability preserved, Consistency lost\n//     Data will sync when partition heals\n\n// ===== REAL-WORLD EXAMPLES =====\n//\n// CP Systems (Consistency + Partition Tolerance):\n//   - MongoDB (default settings)\n//   - HBase\n//   - Redis\n//   - ZooKeeper\n//   - PostgreSQL (single-primary)\n//   - Banking systems, payment processors\n//   When partition happens, some requests fail\n//\n// AP Systems (Availability + Partition Tolerance):\n//   - Cassandra\n//   - DynamoDB (default)\n//   - CouchDB\n//   - Riak\n//   - Social media feeds, like counters\n//   System stays up, may serve stale data briefly\n\n// ===== QUICK DECISION GUIDE =====\n//\n// Choose CP when:\n//   - Data correctness is critical (money, orders, inventory)\n//   - Stale data would cause real problems\n//   - You can afford some downtime during partitions\n//\n// Choose AP when:\n//   - System availability is more important than instant consistency\n//   - Brief staleness is acceptable (feeds, likes, comments)\n//   - Your app must stay up no matter what\n`,
    diagram: svgCAPOverview,
    relation: "Money needs correct data (CP). Likes and feeds need always-open app (AP).",
    points: [
      "Your data lives on many computers",
      "Cable between them can cut one day",
      "Cut time: show error OR show old data",
      "You cannot have both at same time",
      "One computer can do all 3, many cannot",
    ],
  },
  {
    id: "cap-consistency",
    icon: "fa-check-double",
    title: "C - Consistency",
    sub: "Everyone sees the newest data",
    desc: "You put money in one ATM. Every other ATM shows the new money at once. Nobody ever sees old money.",
    definition: `Simple rule: Every reader must see the newest data, never old data. If the fresh copy is not there yet, show error instead of old number.

Like bank: all ATMs show same money. Machines copy data first, then reply.
Price: app is a little slower. Use when wrong data is dangerous - money, tickets.`,
    videoLink: "https://www.youtube.com/watch?v=6R1jr9gM41s",
    diagram: svgConsistency,
    relation: "Use it when wrong data is dangerous: money, tickets, orders.",
    points: [
      "Newest data for all, never old data",
      "Like bank: all ATMs show same money",
      "Machines copy data first, then reply",
      "Copy takes time, so app is a bit slow",
      "Cable breaks? Shows error, not old data",
    ],
  },
  {
    id: "cap-availability",
    icon: "fa-bolt",
    title: "A - Availability",
    sub: "Always replies, never goes down",
    desc: "App is always open. Every tap gets some reply. The reply may be 1 second old, but app never says error.",
    definition: `Simple rule: The app always replies, even if the reply is 1 second old. It never hangs, never shows error, never goes down.

Example: Instagram Like shows 999 for 1 second instead of 1000 - nobody notices.
Use when staying open matters more than perfect fresh number: feeds, likes.`,
    videoLink: "https://www.youtube.com/watch?v=k-Yaq8AHj6I",
    diagram: svgAvailability,
    relation: "Use it when app must stay open: feeds, likes, comments.",
    points: [
      "Always replies, never hangs",
      "Reply may be 1 second old",
      "Best for feeds and likes",
      "Fixes itself when cable joins back",
      "Price: you lose perfect fresh data",
    ],
  },
  {
    id: "cap-partition",
    icon: "fa-network-wired",
    title: "P - Partition Tolerance",
    sub: "Keeps working when cable cuts",
    desc: "Cable between computers cuts, but app keeps running. Each side works alone, then joins back later.",
    definition: `Simple rule: Partition means the computers cannot talk - cable cut, switch dead, one city server down. Partition tolerance means the app keeps running anyway.

Since cables ALWAYS break one day, any app with 2+ computers must have P.
So the real choice is never all 3 - it is only CP or AP.`,
    videoLink: "https://www.youtube.com/watch?v=BHqjEjzAicA",
    diagram: svgPartitionTolerance,
    relation: "P is a must - cables break, so real choice is only CP or AP.",
    points: [
      "Partition = computers cannot talk",
      "App must still keep running",
      "Must-have for 2 or more computers",
      "Reason: cable cut, power cut, city down",
      "So only choice left is CP or AP",
    ],
  },
  {
    id: "cap-cp-vs-ap",
    icon: "fa-scale-balanced",
    title: "CP vs AP - When to Use What",
    sub: "Correctness or uptime - pick one",
    desc: "Cable cuts. Now pick: close shop for correctness (CP like bank), or keep shop open with old data (AP like Instagram).",
    definition: `Simple rule: When cable cuts - CP closes shop and says error, never wrong money. AP keeps shop open with old data, never closes.

CP = bank, MongoDB, tickets. AP = Instagram, Cassandra, likes.
Interview line: bank needs CP, Instagram needs AP. That one line is enough.`,
    videoLink: "https://www.youtube.com/watch?v=Jw1Q5Tz8w-Y",
    diagram: svgCPvsAP,
    relation: "Bank and tickets need CP. Feeds, likes, carts need AP.",
    points: [
      "CP: says error, never wrong data",
      "AP: shows old data, never closes",
      "CP = bank, tickets, MongoDB",
      "AP = Instagram, likes, Cassandra",
      "Interview: say this bank vs Instagram line",
    ],
  },
];
