import{r as e}from"./rolldown-runtime-QTnfLwEv.js";import{t}from"./react-CZI7_Jkm.js";import{r as n}from"./index-BjSszV1C.js";var r=e(t(),1),i=[{id:1,title:`Scalability`,category:`Core Concepts`,description:`Ability to handle growing amounts of work by adding resources`,easyExplanation:`Imagine a restaurant. If 10 people come, 1 chef is enough. If 100 people come, you need more chefs.`,types:[`Vertical Scaling (Scale Up)`,`Horizontal Scaling (Scale Out)`],diagram:`+------------------------------------------------+
| SCALABILITY TYPES                              |
|                                                |
| Vertical Scaling (Scale Up)                    |
|   Add more power to existing server            |
|   (RAM, CPU, faster disk)                      |
|                                                |
| Horizontal Scaling (Scale Out)                 |
|   Add more servers to distribute load          |
|   (More machines, same capacity)               |
+------------------------------------------------+`,videoLink:``},{id:2,title:`Load Balancing`,category:`Core Concepts`,description:`Distributing incoming network traffic across multiple servers`,easyExplanation:`Like a receptionist at a hospital directing patients to different doctors. No single doctor gets overwhelmed.`,types:[`Round Robin`,`Least Connections`,`IP Hash`],diagram:`+------------------------------------------------+
| LOAD BALANCER ARCHITECTURE                     |
|                                                |
|    Users                                       |
|      |                                         |
|      v                                         |
|  Load Balancer                                 |
|    /    |    \\                                 |
|   v     v     v                                |
|  S1    S2    S3                                |
|                                                |
| Request distributed equally                    |
+------------------------------------------------+`,videoLink:``},{id:3,title:`Caching`,category:`Core Concepts`,description:`Storing frequently accessed data in temporary storage location`,easyExplanation:`Like keeping your most used books on your desk instead of going to the library every time.`,types:[`In-Memory Cache (Redis)`,`CDN Cache`,`Browser Cache`],diagram:`+------------------------------------------------+
| CACHE FLOW DIAGRAM                             |
|                                                |
| User --> Cache (Redis) --> Database            |
|   |           |                                |
|   |<-- Hit ---|                                |
|   (Fast response)                              |
|                                                |
| Cache Miss: Get from Database                  |
| Cache Hit:  Return from Cache                  |
+------------------------------------------------+`,videoLink:``},{id:4,title:`Database Sharding`,category:`Core Concepts`,description:`Splitting a large database into smaller, faster, manageable parts`,easyExplanation:`Like a phone book for the whole world split into Book A (A-M) and Book B (N-Z).`,types:[`Range-Based`,`Hash-Based`,`Geo-Based`,`Directory-Based`],diagram:`+------------------------------------------------+
| DATABASE SHARDING                              |
|                                                |
|      Main Database                             |
|     /      |      \\                            |
|    v       v       v                           |
|  Shard1  Shard2  Shard3                        |
|  Users   Orders  Payments                      |
|  A-M     2023    VISA                          |
|                                                |
| Types: Range, Hash, Geo, Directory             |
+------------------------------------------------+`,videoLink:``},{id:5,title:`Replication`,category:`Core Concepts`,description:`Creating and maintaining copies of data across multiple servers`,easyExplanation:`Like making photocopies of important documents. If one copy gets destroyed, you have others.`,types:[`Master-Slave`,`Master-Master`,`Multi-Master`],diagram:`+------------------------------------------------+
| MASTER-SLAVE REPLICATION                       |
|                                                |
|      Master (Writes)                           |
|     /     |     \\                              |
|    v      v      v                             |
|  Slave1  Slave2  Slave3                        |
|  (Read)  (Read)  (Read)                        |
|                                                |
| Benefits: High Availability,                   |
| Read Scalability, Disaster Recovery            |
+------------------------------------------------+`,videoLink:``},{id:6,title:`CAP Theorem`,category:`Core Concepts`,description:`Distributed system can only provide two of three guarantees`,easyExplanation:`You can't have everything! Like a triangle where you can only pick 2 sides.`,types:[`CP (Consistency+Partition)`,`AP (Availability+Partition)`,`CA (Consistency+Availability)`],diagram:`+------------------------------------------------+
| CAP THEOREM                                    |
|                                                |
|        Consistency                             |
|       /            \\                           |
|      v              v                          |
|    CP               CA                         |
|  (Banking)      (Single DB)                    |
|      \\              /                          |
|       v            v                           |
|        Availability                            |
|                                                |
| P = Partition Tolerance (always)               |
| Choose only 2 of 3                             |
+------------------------------------------------+`,videoLink:``},{id:7,title:`API Gateway`,category:`Core Concepts`,description:`Single entry point for all client requests to microservices`,easyExplanation:`Like a mall's main entrance. You enter once and then go to different stores.`,features:[`Authentication & Authorization`,`Rate Limiting`,`Routing`,`Logging`],diagram:`+------------------------------------------------+
| API GATEWAY ARCHITECTURE                       |
|                                                |
|   Clients (Web/Mobile)                         |
|          |                                     |
|          v                                     |
|     API GATEWAY                                |
|   Auth + Rate + Route                          |
|     /    |    \\                                |
|    v     v     v                               |
|  Auth  Orders  Payment                         |
|  Svc   Svc     Svc                             |
+------------------------------------------------+`,videoLink:``},{id:8,title:`Message Queue`,category:`Core Concepts`,description:`A buffer that stores messages between producers and consumers`,easyExplanation:`Like a restaurant order system. Waiters put orders on a counter, chefs pick them up when ready.`,types:[`FIFO Queue`,`Priority Queue`,`Topic Queue`],diagram:`+------------------------------------------------+
| MESSAGE QUEUE ARCHITECTURE                     |
|                                                |
| Producer1 -->                                  |
| Producer2 --> [M1][M2][M3][M4]                 |
| Producer3 -->                                  |
|                 |                              |
|        /        |        \\                     |
|       v         v         v                    |
|   Consumer1  Consumer2  Consumer3              |
|                                                |
| Benefits: Decoupling, Fault tolerance          |
+------------------------------------------------+`,videoLink:``},{id:9,title:`CDN (Content Delivery Network)`,category:`Core Concepts`,description:`A network of servers distributed across locations to deliver content faster`,easyExplanation:`Like having fast-food franchises everywhere. There's one near your house.`,diagram:`+------------------------------------------------+
| CDN ARCHITECTURE                               |
|                                                |
| User(India) --> CDN(Mumbai)                    |
| User(USA)   --> CDN(New York)                  |
| User(EU)    --> CDN(London)                    |
|        |                                       |
|        v                                       |
|   Origin Server (Main)                         |
|                                                |
| Benefits: Faster loading,                      |
| Less bandwidth, DDoS protection                |
+------------------------------------------------+`,videoLink:``},{id:10,title:`Database Indexing`,category:`Core Concepts`,description:`A data structure that improves the speed of data retrieval operations`,easyExplanation:`Like the index at the back of a book. Check the index for the page number.`,types:[`B-Tree Index`,`Hash Index`,`Full-Text Index`,`Composite Index`],diagram:`+------------------------------------------------+
| DATABASE INDEX STRUCTURE                       |
|                                                |
|      Root Node                                 |
|    [10][20][30]                                |
|     /   |   \\                                  |
|    v    v    v                                 |
|  [5]  [15]  [25]                               |
|                                                |
| Types:                                         |
| B-Tree: Like phone book                        |
| Hash:   Dictionary lookup                      |
| Full-Text: Google-like search                  |
+------------------------------------------------+`,videoLink:``},{id:11,title:`Microservices`,category:`Distributed Systems`,description:`Breaking down a large application into small, independent services`,easyExplanation:`Like a shopping mall with independent stores. Each store has its own employees and inventory.`,types:[`Monolithic`,`Microservices`],diagram:`+------------------------------------------------+
| MONOLITHIC vs MICROSERVICES                    |
|                                                |
| MONOLITHIC:                                    |
| +-----------------------------+                |
| |   One Big Application       |                |
| +-----------------------------+                |
|                                                |
| MICROSERVICES:                                 |
| +------+ +------+ +------+                     |
| | User | |Order | |Pay   |                     |
| +------+ +------+ +------+                     |
|                                                |
| Benefits: Independent deploy, scale            |
+------------------------------------------------+`,videoLink:``},{id:12,title:`Consistency Models`,category:`Distributed Systems`,description:`Rules that define when changes to data become visible to other nodes`,easyExplanation:`Like a family group chat. If one member updates plans, when do others see it?`,types:[`Strong Consistency`,`Eventual Consistency`,`Causal Consistency`,`Monotonic Reads`],diagram:`+------------------------------------------------+
| CONSISTENCY MODELS                             |
|                                                |
| Strong:   Everyone sees update now             |
| Eventual: Everyone eventually sees             |
| Causal:   Related updates in order             |
| Monotonic: Only moves forward                  |
|                                                |
| Example:                                       |
| Strong   = Whiteboard in meeting               |
| Eventual = Email (arrives later)               |
+------------------------------------------------+`,videoLink:``},{id:13,title:`Circuit Breaker`,category:`Distributed Systems`,description:`Prevents continuous failed calls to a service`,easyExplanation:`Like a fuse in your home. If there's too much current, the fuse breaks to protect the system.`,types:[`Closed State`,`Open State`,`Half-Open State`],diagram:`+------------------------------------------------+
| CIRCUIT BREAKER STATES                         |
|                                                |
| CLOSED: Normal operation                       |
|   Request --> Service --> OK                   |
|                                                |
| OPEN: Circuit Open                             |
|   Request --> Error (skip service)             |
|                                                |
| HALF-OPEN: Testing                             |
|   Request --> Service --> OK = CLOSE           |
|   Request --> Service --> Fail = OPEN          |
+------------------------------------------------+`,videoLink:``},{id:14,title:`Rate Limiting`,category:`Distributed Systems`,description:`Controlling the amount of incoming requests a server can handle`,easyExplanation:`Like a nightclub bouncer. Only a certain number of people can enter at a time.`,types:[`Token Bucket`,`Leaky Bucket`,`Fixed Window`,`Sliding Log`],diagram:`+------------------------------------------------+
| RATE LIMITING ALGORITHMS                       |
|                                                |
| Token Bucket:                                  |
|   10 tokens, 1 per request                     |
|   New token every second                       |
|                                                |
| Leaky Bucket:                                  |
|   Queue processes at fixed rate                |
|                                                |
| Fixed Window:                                  |
|   100 requests per 1 minute                    |
|                                                |
| Sliding Log:                                   |
|   Count requests in last N sec                 |
+------------------------------------------------+`,videoLink:``},{id:15,title:`Saga Pattern`,category:`Distributed Systems`,description:`Managing distributed transactions across multiple microservices`,easyExplanation:`Like booking a flight, hotel, and car. If one fails, undo the previous bookings.`,types:[`Choreography Saga`,`Orchestration Saga`],diagram:`+------------------------------------------------+
| SAGA PATTERN FLOW                              |
|                                                |
| Orchestration:                                 |
|   Order --> Orchestrator                       |
|        /    |    \\                             |
|       v     v     v                            |
|   Payment Inventory Shipping                   |
|                                                |
| Example Flow:                                  |
|   1. Order Created    OK                       |
|   2. Payment Processed OK                      |
|   3. Inventory Reserved OK                     |
|   4. Shipping Scheduled OK                     |
|   5. Order Complete!                           |
+------------------------------------------------+`,videoLink:``},{id:16,title:`Event Sourcing`,category:`Distributed Systems`,description:`Storing all changes to application state as a sequence of events`,easyExplanation:`Like a video recording instead of a photo. You capture every change that led to it.`,diagram:`+------------------------------------------------+
| EVENT SOURCING ARCHITECTURE                    |
|                                                |
| Traditional (Save State):                      |
|   User --> {name: John, bal: 100}              |
|                                                |
| Event Sourcing (Save Events):                  |
|   Event 1: Account Created                     |
|   Event 2: Deposit $50                         |
|   Event 3: Withdraw $30                        |
|   Event 4: Deposit $80                         |
|                                                |
| Current: {name: John, bal: 100}                |
| Benefits: Audit trail, Time travel             |
+------------------------------------------------+`,videoLink:``},{id:17,title:`CQRS`,category:`Distributed Systems`,description:`Separating read and write operations into different models`,easyExplanation:`Like a restaurant. The waiter takes orders, and the menu board shows what's available.`,diagram:`+------------------------------------------------+
| CQRS ARCHITECTURE                              |
|                                                |
| Command (Write):    Query (Read):              |
|   Create Order        Get Order                |
|   Update Order        Get Orders               |
|   Delete Order        Get Summary              |
|      |                   |                     |
|      v                   v                     |
|   Write DB <-- Sync --> Read DB                |
|   (Master)           (Slave)                   |
|                                                |
| Benefits: Optimized read/write                 |
+------------------------------------------------+`,videoLink:``},{id:18,title:`Two-Phase Commit (2PC)`,category:`Distributed Systems`,description:`A protocol to ensure atomicity across distributed systems`,easyExplanation:`Like a group decision. Everyone must agree before the decision is final.`,diagram:`+------------------------------------------------+
| TWO-PHASE COMMIT PROTOCOL                      |
|                                                |
| Phase 1: Prepare (Vote)                        |
|   Coordinator --> A: Ready?                    |
|   Coordinator --> B: Ready?                    |
|   Coordinator --> C: Ready?                    |
|   A --> Coordinator: Yes                       |
|   B --> Coordinator: Yes                       |
|   C --> Coordinator: No  X                     |
|                                                |
| Phase 2: Commit or Abort                       |
|   If All Yes --> COMMIT                        |
|   If Any No  --> ABORT                         |
+------------------------------------------------+`,videoLink:``},{id:19,title:`Idempotency`,category:`Distributed Systems`,description:`An operation that can be applied multiple times without changing the result`,easyExplanation:`Like a light switch. Flipping it up multiple times has the same result as flipping it once.`,types:[`Idempotent`,`Non-Idempotent`],diagram:`+------------------------------------------------+
| IDEMPOTENCY EXAMPLES                           |
|                                                |
| Idempotent (safe to retry):                    |
|   GET request                                  |
|   PUT (update with same data)                  |
|   DELETE (delete same item)                    |
|                                                |
| Not Idempotent:                                |
|   POST (creates new each time)                 |
|   Increment count (+1)                         |
|                                                |
| Retry Example:                                 |
|   POST /orders {id: 123}                       |
|   Result: Only one order created               |
+------------------------------------------------+`,videoLink:``},{id:20,title:`Distributed Locking`,category:`Distributed Systems`,description:`A mechanism to ensure only one process can access a resource at a time`,easyExplanation:`Like a bathroom key. Only one person can have the key at a time.`,types:[`Redis Lock`,`ZooKeeper Lock`,`Database Lock`],diagram:`+------------------------------------------------+
| DISTRIBUTED LOCKING                            |
|                                                |
| Redis Lock:                                    |
|   SET key value NX EX 30                       |
|   (Only if not exists, 30s TTL)                |
|                                                |
| ZooKeeper Lock:                                |
|   Create ephemeral node                        |
|   Only one node can exist                      |
|                                                |
| Database Lock:                                 |
|   SELECT ... FOR UPDATE                        |
|   SELECT ... LOCK IN SHARE MODE                |
+------------------------------------------------+`,videoLink:``},{id:21,title:`REST API`,category:`Networking`,description:`An architectural style for designing networked applications`,easyExplanation:`Like a waiter in a restaurant. You ask for something, the waiter gets it and brings it back.`,types:[`GET`,`POST`,`PUT`,`DELETE`,`PATCH`],diagram:`+------------------------------------------------+
| REST API METHODS                               |
|                                                |
| GET    --> Read data (menu)                    |
| POST   --> Create new data (order)             |
| PUT    --> Update existing data                |
| DELETE --> Remove data (cancel)                |
| PATCH  --> Partial update                      |
|                                                |
| RESTful URLs:                                  |
|   GET    /api/users                            |
|   GET    /api/users/123                        |
|   POST   /api/users                            |
|   PUT    /api/users/123                        |
|   DELETE /api/users/123                        |
+------------------------------------------------+`,videoLink:``},{id:22,title:`GraphQL`,category:`Networking`,description:`A query language that allows clients to request exactly the data they need`,easyExplanation:`Like a restaurant menu where you can customize exactly what you want.`,diagram:`+------------------------------------------------+
| GRAPHQL vs REST                                |
|                                                |
| REST:                                          |
|   GET /api/users/123                           |
|   Returns ALL fields:                          |
|   {name, email, address, phone...}             |
|                                                |
| GraphQL:                                       |
|   query { user(id:123) { name email }}         |
|   Returns only {name, email}                   |
|                                                |
| Features:                                      |
|   Selective queries                            |
|   Nested queries                               |
|   Strong typing                                |
|   Versionless                                  |
+------------------------------------------------+`,videoLink:``},{id:23,title:`WebSockets`,category:`Networking`,description:`A protocol for full-duplex, real-time communication`,easyExplanation:`Like a phone call instead of sending letters. Both parties can talk and listen simultaneously.`,diagram:`+------------------------------------------------+
| HTTP vs WebSocket                              |
|                                                |
| HTTP (Request-Response):                       |
|   Client --> Server: Hello                     |
|   Server --> Client: Hi                        |
|                                                |
| WebSocket (Bidirectional):                     |
|   Client <-> Server: Hello                     |
|   Client <-> Server: Hi                        |
|   Client <-> Server: How are you?              |
|   Server <-> Client: Fine, thanks!             |
|                                                |
| Use Cases: Chat, Notifications,                |
| Live updates, Gaming                           |
+------------------------------------------------+`,videoLink:``},{id:24,title:`gRPC`,category:`Networking`,description:`A high-performance RPC framework developed by Google`,easyExplanation:`Like a walkie-talkie. Fast, efficient communication between services.`,features:[`Protocol Buffers`,`HTTP/2`,`Bidirectional Streaming`,`Language Agnostic`],diagram:`+------------------------------------------------+
| gRPC ARCHITECTURE                              |
|                                                |
| Protobuf Definition:                           |
|   service UserService {                        |
|     rpc GetUser(UserRequest)                   |
|         returns (UserResponse)                 |
|   }                                            |
|                                                |
| Request/Response:                              |
|   UserRequest { int64 id }                     |
|   UserResponse { string name }                 |
|                                                |
| Features: Binary, HTTP/2, Streaming            |
+------------------------------------------------+`,videoLink:``},{id:25,title:`DNS`,category:`Networking`,description:`Translates domain names to IP addresses`,easyExplanation:`Like a phonebook for the internet. Look up a name to find its phone number.`,types:[`A Record`,`AAAA Record`,`CNAME Record`,`MX Record`],diagram:`+------------------------------------------------+
| DNS LOOKUP PROCESS                             |
|                                                |
| User: www.google.com                           |
|   --> Browser cache                            |
|   --> OS hosts file                            |
|   --> DNS Resolver                             |
|   --> Root DNS Server                          |
|   --> TLD DNS Server (.com)                    |
|   --> Authoritative DNS Server                 |
|   --> IP: 142.250.185.78                       |
|                                                |
| Record Types:                                  |
|   A: IPv4, AAAA: IPv6                          |
|   CNAME: Alias, MX: Mail                       |
+------------------------------------------------+`,videoLink:``},{id:26,title:`HTTP/HTTPS`,category:`Networking`,description:`Protocols for transferring data over the web`,easyExplanation:`HTTP is like an open envelope. HTTPS is like a locked box.`,diagram:`+------------------------------------------------+
| HTTPS ENCRYPTION PROCESS                       |
|                                                |
| 1. Browser --> Server: Connect                 |
| 2. Server --> Browser: Heres cert              |
| 3. Browser: Verifies certificate               |
| 4. Browser --> Server: Session key             |
|    (encrypted with public key)                 |
| 5. Server: Decrypts session key                |
| 6. Secure communication starts                 |
|                                                |
| HTTP  = Open Envelope                          |
| HTTPS = Locked Box                             |
+------------------------------------------------+`,videoLink:``},{id:27,title:`Proxy vs Reverse Proxy`,category:`Networking`,description:`Intermediary servers between clients and servers`,easyExplanation:`Forward Proxy: Like a school library. Reverse Proxy: Like a secretary forwarding calls.`,diagram:`+------------------------------------------------+
| PROXY vs REVERSE PROXY                         |
|                                                |
| Forward Proxy:                                 |
|   User --> Forward Proxy --> Internet          |
|                                                |
| Reverse Proxy:                                 |
|   User --> Reverse Proxy --> Server 1          |
|                      --> Server 2              |
|                      --> Server 3              |
|                                                |
| Forward Uses: Bypass restrictions,             |
|   Hide client IP, Filtering                    |
|                                                |
| Reverse Uses: Load balancing,                  |
|   SSL termination, Caching                     |
+------------------------------------------------+`,videoLink:``},{id:28,title:`Pub-Sub Pattern`,category:`Networking`,description:`Publishers send messages to topics, and subscribers receive messages from topics`,easyExplanation:`Like a newspaper subscription. The company prints and sends to all subscribers.`,diagram:`+------------------------------------------------+
| PUB-SUB ARCHITECTURE                           |
|                                                |
| Publisher --> Topic --> Subscriber 1           |
|            --> Topic --> Subscriber 2          |
|            --> Topic --> Subscriber 3          |
|                                                |
| Example:                                       |
|   Order Service --> Order Created              |
|   Subscribers: Email, SMS, Analytics           |
|                                                |
| Benefits: Decoupling, Scalability              |
+------------------------------------------------+`,videoLink:``},{id:29,title:`Service Mesh`,category:`Networking`,description:`A dedicated infrastructure layer for service-to-service communication`,easyExplanation:`Like a highway system with traffic management. Cars use roads, traffic lights manage flow.`,features:[`Service Discovery`,`Load Balancing`,`Circuit Breaking`,`Authentication`,`Observability`],diagram:`+------------------------------------------------+
| SERVICE MESH ARCHITECTURE                      |
|                                                |
| Service A <-> Proxy <-> Service B              |
|            Proxy <-> Service C                 |
|                                                |
| Features:                                      |
|   Service Discovery                            |
|   Load Balancing                               |
|   Circuit Breaking                             |
|   Authentication                               |
|   Observability                                |
|                                                |
| Tools: Istio, Linkerd, Consul                  |
+------------------------------------------------+`,videoLink:``},{id:30,title:`API Versioning`,category:`Networking`,description:`Managing different versions of an API`,easyExplanation:`Like software updates. Some users have old version, others have new version.`,types:[`URI Versioning`,`Query Parameter`,`Header Versioning`,`Content Negotiation`],diagram:`+------------------------------------------------+
| API VERSIONING STRATEGIES                      |
|                                                |
| URI:                                           |
|   /api/v1/users                                |
|   /api/v2/users                                |
|                                                |
| Query:                                         |
|   /api/users?version=1                         |
|   /api/users?version=2                         |
|                                                |
| Header:                                        |
|   Accept-Version: v1                           |
|   Accept-Version: v2                           |
|                                                |
| Content Negotiation:                           |
|   application/vnd.company.v1+json              |
+------------------------------------------------+`,videoLink:``},{id:31,title:`SQL vs NoSQL`,category:`Databases`,description:`Comparing relational and non-relational databases`,easyExplanation:`SQL: Like a spreadsheet with strict rows and columns. NoSQL: Like a filing cabinet with flexible formats.`,types:[`SQL (Relational)`,`NoSQL (Non-Relational)`],diagram:`+------------------------------------------------+
| SQL vs NoSQL COMPARISON                        |
|                                                |
| SQL: Structured, Fixed schema,                 |
|   ACID, Complex queries                        |
|   Examples: MySQL, PostgreSQL                  |
|                                                |
| NoSQL: Unstructured, Flexible schema,          |
|   BASE, Large-scale data                       |
|   Examples: MongoDB, Redis                     |
|                                                |
| NoSQL Types:                                   |
|   Document: MongoDB                            |
|   Key-Value: Redis                             |
|   Column: Cassandra                            |
|   Graph: Neo4j                                 |
+------------------------------------------------+`,videoLink:``},{id:32,title:`Database Indexes`,category:`Databases`,description:`Data structures that improve query performance`,easyExplanation:`Like a library catalog. Search the catalog to find the book's location.`,types:[`B-Tree Index`,`Hash Index`,`Full-Text Index`,`Spatial Index`],diagram:`+------------------------------------------------+
| DATABASE INDEX TYPES                           |
|                                                |
| B-Tree:                                        |
|   Root [10][20][30]                            |
|    /    |    \\                                 |
|   v     v     v                                |
| [5]   [15]  [25]                               |
|                                                |
| Hash: hash(id) --> Memory Address              |
|                                                |
| Full-Text: Search within text                  |
|                                                |
| Spatial: Location-based queries                |
+------------------------------------------------+`,videoLink:``},{id:33,title:`Database Normalization`,category:`Databases`,description:`Organizing data to reduce redundancy and improve integrity`,easyExplanation:`Like organizing a filing cabinet. Don't store the same information in multiple places.`,types:[`1NF`,`2NF`,`3NF`],diagram:`+------------------------------------------------+
| DATABASE NORMALIZATION FORMS                   |
|                                                |
| 1NF: Each column has single value              |
|      Each row is unique                        |
|                                                |
| 2NF: Must be 1NF                               |
|      No partial dependencies                   |
|                                                |
| 3NF: Must be 2NF                               |
|      No transitive dependencies                |
|      Order --> Customer --> Address            |
+------------------------------------------------+`,videoLink:``},{id:34,title:`Database Migration`,category:`Databases`,description:`Moving data between databases or schema versions`,easyExplanation:`Like moving to a new house. Carefully move all belongings without losing anything.`,types:[`Zero-Downtime Migration`,`Big Bang Migration`,`Blue-Green Migration`],diagram:`+------------------------------------------------+
| DATABASE MIGRATION STRATEGIES                  |
|                                                |
| Zero-Downtime:                                 |
|   1. Create copy of database                   |
|   2. Dual-write to both                        |
|   3. Gradual cutover                           |
|                                                |
| Big Bang:                                      |
|   1. Stop old database                         |
|   2. Migrate all data                          |
|   3. Start new database                        |
|                                                |
| Blue-Green:                                    |
|   Old: Blue (production)                       |
|   New: Green (staging)                         |
|   Switch traffic from Blue to Green            |
+------------------------------------------------+`,videoLink:``},{id:35,title:`Database Replication Lag`,category:`Databases`,description:`Time delay between a write on master and its replication to slaves`,easyExplanation:`Like sending a group email. Receivers might get it at slightly different times.`,diagram:`+------------------------------------------------+
| REPLICATION LAG                                |
|                                                |
| Master:  Write at t=0                          |
| Slave 1: Update at t=50ms                      |
| Slave 2: Update at t=100ms                     |
|                                                |
| Causes:                                        |
|   Network latency                              |
|   Slave busy with reads                        |
|   Large transactions                           |
|                                                |
| Solutions:                                     |
|   Read-Your-Writes                             |
|   Monotonic Reads                              |
|   Synchronous Replication                      |
+------------------------------------------------+`,videoLink:``},{id:36,title:`ACID Properties`,category:`Databases`,description:`Transaction properties that ensure database integrity`,easyExplanation:`Like a bank transfer. Money leaves AND enters. Both must happen or neither.`,types:[`Atomicity`,`Consistency`,`Isolation`,`Durability`],diagram:`+------------------------------------------------+
| ACID PROPERTIES                                |
|                                                |
| Atomicity: All or nothing                      |
|                                                |
| Consistency: Always valid state                |
|                                                |
| Isolation: Dont interfere                      |
|                                                |
| Durability: Committed persists                 |
|                                                |
| Isolation Levels:                              |
|   Read Uncommitted                             |
|   Read Committed                               |
|   Repeatable Read                              |
|   Serializable                                 |
+------------------------------------------------+`,videoLink:``},{id:37,title:`Index Selection Strategies`,category:`Databases`,description:`Deciding which columns to index for optimal performance`,easyExplanation:`Like deciding which books to add to your library's quick reference section.`,diagram:`+------------------------------------------------+
| INDEX SELECTION GUIDELINES                     |
|                                                |
| Index When:                                    |
|   Used in WHERE clause                         |
|   Used in JOIN                                 |
|   Used in ORDER BY                             |
|   High cardinality                             |
|   Read-heavy table                             |
|                                                |
| Dont Index When:                               |
|   Small tables                                 |
|   Frequently updated columns                   |
|   Low cardinality                              |
|   Write-heavy table                            |
+------------------------------------------------+`,videoLink:``},{id:38,title:`Partitioning vs Sharding`,category:`Databases`,description:`Partitioning splits data within a database; Sharding splits across databases`,easyExplanation:`Partitioning: Dividing a bookshelf into sections. Sharding: Different bookshelves in different rooms.`,diagram:`+------------------------------------------------+
| PARTITIONING vs SHARDING                       |
|                                                |
| Partitioning (Same Database):                  |
| +--------+ +--------+                          |
| | 2023   | | 2024   |                          |
| | Orders | | Orders |                          |
| +--------+ +--------+                          |
|                                                |
| Sharding (Different Databases):                |
| +----------+ +----------+                      |
| | Shard 1  | | Shard 2  |                      |
| | Users A-M| | Users N-Z|                      |
| +----------+ +----------+                      |
+------------------------------------------------+`,videoLink:``},{id:39,title:`Database Connection Pooling`,category:`Databases`,description:`Managing database connections efficiently`,easyExplanation:`Like a taxi stand. Taxis wait ready to go instead of calling a new one each time.`,diagram:`+------------------------------------------------+
| CONNECTION POOLING ARCHITECTURE                |
|                                                |
| Without Pooling:                               |
|   Request 1 --> Create --> Use --> Close       |
|   Request 2 --> Create --> Use --> Close       |
|   (Slow, expensive)                            |
|                                                |
| With Pooling:                                  |
|   Pool: [Conn1, Conn2, Conn3]                  |
|   Request 1 --> Get --> Use --> Return         |
|   Request 2 --> Get --> Use --> Return         |
|   (Fast, efficient)                            |
+------------------------------------------------+`,videoLink:``},{id:40,title:`Database Migration Tools`,category:`Databases`,description:`Tools that manage database schema changes`,easyExplanation:`Like a construction crew that can safely renovate without breaking things.`,types:[`Flyway`,`Liquibase`,`Alembic`,`Rails Migrations`],diagram:`+------------------------------------------------+
| DATABASE MIGRATION TOOLS                       |
|                                                |
| Example Migrations:                            |
|   V1__create_users_table.sql                   |
|   CREATE TABLE users (                         |
|     id BIGINT PRIMARY KEY,                     |
|     name VARCHAR(100)                          |
|   );                                           |
|                                                |
|   V2__add_age_column.sql                       |
|   ALTER TABLE users ADD COLUMN age             |
|                                                |
| Tools: Flyway, Liquibase, Alembic              |
+------------------------------------------------+`,videoLink:``},{id:41,title:`Cloud Native`,category:`Modern Architecture`,description:`Building applications that fully leverage cloud computing`,easyExplanation:`Like renting a workspace instead of buying a building. Pay only for what you use.`,features:[`Microservices`,`Containers`,`DevOps`,`Automation`,`Observability`],diagram:`+------------------------------------------------+
| CLOUD NATIVE STACK                             |
|                                                |
| Kubernetes (Orchestration)                     |
| Docker (Containerization)                      |
| Service Mesh (Network)                         |
| Monitoring (Prometheus, Grafana)               |
| CI/CD (Jenkins, GitLab)                        |
|                                                |
| Characteristics:                               |
|   Microservices                                |
|   Containers                                   |
|   DevOps                                       |
|   Automation                                   |
|   Observability                                |
+------------------------------------------------+`,videoLink:``},{id:42,title:`Containerization & Docker`,category:`Modern Architecture`,description:`Packaging applications with their dependencies`,easyExplanation:`Like a shipping container. You put everything inside, and it works anywhere.`,features:[`Portability`,`Isolation`,`Lightweight`,`Scalability`],diagram:`+------------------------------------------------+
| DOCKER ARCHITECTURE                            |
|                                                |
| Dockerfile:                                    |
|   FROM ubuntu:20.04                            |
|   RUN apt-get install -y nodejs                |
|   COPY app/ /app/                              |
|   WORKDIR /app                                 |
|   CMD node server.js                           |
|                                                |
| Docker Image (Blueprint)                       |
|          |                                     |
|          v                                     |
| Docker Container (Running)                     |
|                                                |
| Benefits: Portability, Isolation               |
+------------------------------------------------+`,videoLink:``},{id:43,title:`Kubernetes (k8s)`,category:`Modern Architecture`,description:`Container orchestration platform`,easyExplanation:`Like a building manager that ensures all apartments are running properly.`,components:[`Pod`,`Node`,`Cluster`,`Service`,`Deployment`],diagram:`+------------------------------------------------+
| KUBERNETES ARCHITECTURE                        |
|                                                |
| Pod:       Smallest unit                       |
| Node:      Worker machine                      |
| Cluster:   Group of nodes                      |
| Service:   Stable IP for pods                  |
| Deployment: Desired state                      |
|                                                |
| +----------------------------+                 |
| |   Kubernetes Cluster       |                 |
| | +----+ +----+ +----+      |                  |
| | |Pod1| |Pod2| |Pod3|      |                  |
| | +----+ +----+ +----+      |                  |
| |      |                    |                  |
| |      v                    |                  |
| | Load Balancer Service     |                  |
| +----------------------------+                 |
+------------------------------------------------+`,videoLink:``},{id:44,title:`CI/CD`,category:`Modern Architecture`,description:`Automated software delivery process`,easyExplanation:`Like a factory assembly line that automatically builds, tests, and ships products.`,types:[`Continuous Integration`,`Continuous Delivery`,`Continuous Deployment`],diagram:`+------------------------------------------------+
| CI/CD PIPELINE                                 |
|                                                |
| CI (Continuous Integration):                   |
|   Code --> Build --> Test --> Merge            |
|                                                |
| CD (Continuous Delivery):                      |
|   Main --> Build --> Test --> Staging          |
|        --> Production                          |
|                                                |
| Pipeline Example:                              |
|   stages: build, test, deploy                  |
|   build: mvn clean package                     |
|   test: mvn test                               |
|   deploy: kubectl apply -f deploy              |
+------------------------------------------------+`,videoLink:``},{id:45,title:`Infrastructure as Code (IaC)`,category:`Modern Architecture`,description:`Managing infrastructure using code instead of manual processes`,easyExplanation:`Like having blueprints for a building. Follow the blueprint exactly.`,tools:[`Terraform`,`AWS CloudFormation`,`Ansible`,`Pulumi`],diagram:`+------------------------------------------------+
| INFRASTRUCTURE AS CODE                         |
|                                                |
| Terraform:                                     |
|   resource "aws_instance" "web" {              |
|     ami = "ami-12345"                          |
|     instance_type = "t2.micro"                 |
|   }                                            |
|                                                |
| resource "aws_s3_bucket" "data" {              |
|   bucket = "my-data-bucket"                    |
|   acl = "private"                              |
|   }                                            |
|                                                |
| Benefits: Version control,                     |
| Reproducibility, Consistency                   |
+------------------------------------------------+`,videoLink:``},{id:46,title:`Observability`,category:`Modern Architecture`,description:`Understanding system behavior through outputs`,easyExplanation:`Like a car dashboard showing speed, fuel, and engine status.`,pillars:[`Logs`,`Metrics`,`Traces`],diagram:`+------------------------------------------------+
| THREE PILLARS OF OBSERVABILITY                 |
|                                                |
| Logs: Detailed events                          |
|   Like a diary of what happened                |
|   Example: ELK Stack                           |
|                                                |
| Metrics: Numerical measurements                |
|   Like speedometer reading                     |
|   Example: Prometheus, Grafana                 |
|                                                |
| Traces: End-to-end journey                     |
|   Like GPS tracking                            |
|   Example: Jaeger, Zipkin                      |
+------------------------------------------------+`,videoLink:``},{id:47,title:`Chaos Engineering`,category:`Modern Architecture`,description:`Deliberately introducing failures to test system resilience`,easyExplanation:`Like fire drills. Practice what to do when things go wrong.`,principles:[`Start Small`,`Hypothesize`,`Experiment`,`Measure`,`Learn`],diagram:`+------------------------------------------------+
| CHAOS ENGINEERING PROCESS                      |
|                                                |
| 1. Start Small:                                |
|    Kill single pod                             |
|                                                |
| 2. Hypothesize:                                |
|    Predict: No user impact                     |
|                                                |
| 3. Experiment:                                 |
|    Simulate network latency                    |
|                                                |
| 4. Measure and Learn:                          |
|    Compare predictions vs reality              |
|    Fix issues found                            |
|                                                |
| Tools: Chaos Monkey, Gremlin                   |
+------------------------------------------------+`,videoLink:``},{id:48,title:`Blue-Green Deployment`,category:`Modern Architecture`,description:`Deployment strategy with two identical environments`,easyExplanation:`Like having two houses. Live in one while renovating the other, then switch.`,diagram:`+------------------------------------------------+
| BLUE-GREEN DEPLOYMENT                          |
|                                                |
| Blue (Production):                             |
|   Users --> Load Balancer                      |
|         --> Blue Server                        |
|                                                |
| Green (Staging):                               |
|   Users --> Load Balancer                      |
|         --> Green Server                       |
|                                                |
| After Switch:                                  |
|   Users --> Load Balancer                      |
|         --> Green Server (Production)          |
|                                                |
| Benefits: Zero downtime, Easy rollback         |
+------------------------------------------------+`,videoLink:``},{id:49,title:`Circuit Breaker vs Retry`,category:`Modern Architecture`,description:`Two patterns for handling failures`,easyExplanation:`Retry: Try again if something fails. Circuit Breaker: Stop trying if it keeps failing.`,diagram:`+------------------------------------------------+
| CIRCUIT BREAKER vs RETRY                       |
|                                                |
| Retry Pattern:                                 |
|   Request 1 --> Fail --> Wait 1s               |
|   Request 2 --> Fail --> Wait 2s               |
|   Request 3 --> Success OK                     |
|                                                |
| Circuit Breaker Pattern:                       |
|   CLOSED --> Failures(5) --> OPEN              |
|   OPEN --> Wait --> HALF-OPEN                  |
|   HALF-OPEN --> Success = CLOSED               |
|                                                |
| Best: Combine both patterns                    |
+------------------------------------------------+`,videoLink:``},{id:50,title:`Distributed Tracing`,category:`Modern Architecture`,description:`Following a request through multiple services`,easyExplanation:`Like tracking a package through shipping. See where it's been and when.`,components:[`Trace`,`Span`,`Trace ID`,`Span ID`],diagram:`+------------------------------------------------+
| DISTRIBUTED TRACING                            |
|                                                |
| User Request (Total: 120ms)                    |
|   --> API Gateway (10ms)                       |
|   --> User Service (20ms)                      |
|   --> Database (30ms)                          |
|   --> Order Service (15ms)                     |
|   --> Payment Service (25ms)                   |
|   --> Database (20ms)                          |
|                                                |
| Key Concepts:                                  |
|   Trace: Complete journey                      |
|   Span: Single operation                       |
|   Trace ID: Unique for trace                   |
|   Span ID: Unique for operation                |
+------------------------------------------------+`,videoLink:``}],a=n(),o={"Core Concepts":{icon:`🧱`,tagline:`Foundation building blocks`},"Distributed Systems":{icon:`🌐`,tagline:`Scale across machines`},Networking:{icon:`🌍`,tagline:`Communication protocols`},Databases:{icon:`🗄️`,tagline:`Data storage & retrieval`},"Modern Architecture":{icon:`☁️`,tagline:`Cloud-native practices`}},s=[`Core Concepts`,`Distributed Systems`,`Networking`,`Databases`,`Modern Architecture`];function c(){let[e,t]=(0,r.useState)(null),[n,c]=(0,r.useState)(``),[l,u]=(0,r.useState)(`all`),d=(0,r.useMemo)(()=>{let e={all:i.length};for(let t of i)e[t.category]=(e[t.category]||0)+1;return[`all`,...new Set(i.map(e=>e.category))].map(t=>({name:t,count:e[t]}))},[]),f=(0,r.useMemo)(()=>{let e=n.toLowerCase().trim();return i.filter(t=>{let n=!e||t.title.toLowerCase().includes(e)||t.description.toLowerCase().includes(e)||t.easyExplanation.toLowerCase().includes(e),r=l===`all`||t.category===l;return n&&r})},[n,l]),p=(0,r.useMemo)(()=>s.map(e=>({category:e,icon:o[e]?.icon||`📌`,tagline:o[e]?.tagline||``,concepts:f.filter(t=>t.category===e)})).filter(e=>e.concepts.length>0),[f]),m=(0,r.useCallback)(e=>{e.key===`Escape`&&t(null)},[]);(0,r.useEffect)(()=>{if(e)return document.addEventListener(`keydown`,m),document.body.style.overflow=`hidden`,()=>{document.removeEventListener(`keydown`,m),document.body.style.overflow=``}},[e,m]);let h=e=>{let t=[];return e.types?.length&&t.push({title:`🏷️ Types`,items:e.types,icon:`•`}),e.features?.length&&t.push({title:`⚡ Features`,items:e.features,icon:`✓`}),e.components?.length&&t.push({title:`🧩 Components`,items:e.components,icon:`•`}),e.pillars?.length&&t.push({title:`🏛️ Pillars`,items:e.pillars,icon:`◆`}),e.principles?.length&&t.push({title:`📋 Principles`,items:e.principles,icon:`▸`}),e.tools?.length&&t.push({title:`🛠️ Tools`,items:e.tools,icon:`⚙️`}),t};return(0,a.jsxs)(`div`,{className:`sd-page`,children:[(0,a.jsxs)(`header`,{className:`sd-header`,children:[(0,a.jsx)(`h1`,{className:`sd-header-title`,children:`🏗️ 50 System Design Concepts`}),(0,a.jsx)(`p`,{className:`sd-header-subtitle`,children:`Complete Guide for MAANG Interview Preparation — click any concept to open its detailed explanation with architecture diagram`}),(0,a.jsxs)(`div`,{className:`sd-header-stats`,children:[(0,a.jsx)(`span`,{className:`sd-stat-badge`,children:`📚 50 Concepts`}),(0,a.jsx)(`span`,{className:`sd-stat-badge`,children:`📖 5 Categories`}),(0,a.jsx)(`span`,{className:`sd-stat-badge`,children:`🎯 Interview Ready`})]})]}),(0,a.jsxs)(`div`,{className:`sd-filter-section`,children:[(0,a.jsx)(`input`,{type:`text`,className:`sd-search-input`,placeholder:`🔍 Search concepts...`,value:n,onChange:e=>c(e.target.value)}),(0,a.jsx)(`div`,{className:`sd-category-filter`,children:d.map(e=>(0,a.jsxs)(`button`,{type:`button`,className:`sd-category-btn${l===e.name?` active`:``}`,onClick:()=>u(e.name),children:[e.name===`all`?`📚 All`:e.name,(0,a.jsx)(`span`,{className:`sd-count-badge`,children:e.count})]},e.name))})]}),(0,a.jsxs)(`div`,{className:`sd-results-count`,children:[`Showing `,f.length,` of `,i.length,` `,`concepts`]}),f.length===0?(0,a.jsxs)(`div`,{className:`sd-no-results`,children:[(0,a.jsx)(`p`,{className:`sd-no-results-title`,children:`No concepts found`}),(0,a.jsx)(`p`,{className:`sd-no-results-sub`,children:`Try adjusting your search or filter`})]}):p.map(e=>(0,a.jsxs)(`section`,{className:`sd-topic-section`,children:[(0,a.jsxs)(`div`,{className:`sd-topic-header`,children:[(0,a.jsx)(`span`,{className:`sd-topic-icon`,children:e.icon}),(0,a.jsxs)(`div`,{className:`sd-topic-heading`,children:[(0,a.jsx)(`h2`,{className:`sd-topic-title`,children:e.category}),(0,a.jsx)(`p`,{className:`sd-topic-tagline`,children:e.tagline})]}),(0,a.jsxs)(`span`,{className:`sd-topic-count`,children:[e.concepts.length,` concepts`]})]}),(0,a.jsx)(`div`,{className:`sd-concepts-grid`,children:e.concepts.map(e=>(0,a.jsxs)(`div`,{className:`sd-concept-card`,onClick:()=>t(e),role:`button`,tabIndex:0,onKeyDown:n=>{(n.key===`Enter`||n.key===` `)&&(n.preventDefault(),t(e))},children:[(0,a.jsxs)(`div`,{className:`sd-card-header`,children:[(0,a.jsxs)(`span`,{className:`sd-concept-id`,children:[`#`,e.id]}),(0,a.jsx)(`span`,{className:`sd-category-tag`,children:e.category})]}),(0,a.jsx)(`h3`,{className:`sd-concept-title`,children:e.title}),(0,a.jsx)(`p`,{className:`sd-concept-desc`,children:e.description}),(0,a.jsxs)(`div`,{className:`sd-easy-explain`,children:[`💡 `,(0,a.jsx)(`span`,{children:e.easyExplanation})]}),e.types?.length>0&&(0,a.jsx)(`div`,{className:`sd-types-wrap`,children:e.types.map(e=>(0,a.jsx)(`span`,{className:`sd-type-tag`,children:e},e))}),(0,a.jsx)(`div`,{className:`sd-click-hint`,children:`▼ Tap to view details`})]},e.id))})]},e.category)),e&&(0,a.jsx)(`div`,{className:`sd-modal-overlay`,onClick:()=>t(null),role:`dialog`,"aria-modal":`true`,"aria-label":e.title,children:(0,a.jsxs)(`div`,{className:`sd-modal`,onClick:e=>e.stopPropagation(),children:[(0,a.jsx)(`button`,{type:`button`,className:`sd-modal-close`,onClick:()=>t(null),"aria-label":`Close concept details`,children:`✕`}),(0,a.jsxs)(`div`,{className:`sd-modal-header`,children:[(0,a.jsxs)(`span`,{className:`sd-concept-id`,children:[`#`,e.id]}),(0,a.jsx)(`span`,{className:`sd-category-tag`,children:e.category})]}),(0,a.jsx)(`h2`,{className:`sd-modal-title`,children:e.title}),(0,a.jsx)(`p`,{className:`sd-modal-desc`,children:e.description}),(0,a.jsxs)(`div`,{className:`sd-modal-easy`,children:[(0,a.jsx)(`span`,{className:`sd-modal-easy-label`,children:`💡 EASY EXPLANATION`}),e.easyExplanation]}),h(e).length>0&&(0,a.jsx)(`div`,{className:`sd-modal-lists`,children:h(e).map(e=>(0,a.jsxs)(`div`,{className:`sd-modal-list-block`,children:[(0,a.jsx)(`div`,{className:`sd-modal-list-title`,children:e.title}),(0,a.jsx)(`ul`,{className:`sd-modal-list`,children:e.items.map(t=>(0,a.jsxs)(`li`,{children:[e.icon,` `,t]},t))})]},e.title))}),e.diagram&&(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(`div`,{className:`sd-modal-section-title`,children:`📊 Architecture Diagram`}),(0,a.jsx)(`pre`,{className:`sd-modal-diagram`,children:e.diagram})]}),(0,a.jsx)(`div`,{className:`sd-modal-video`,children:(0,a.jsxs)(`div`,{className:`sd-video-section`,children:[(0,a.jsx)(`div`,{className:`sd-video-title`,children:`🎬 Video Tutorial`}),e.videoLink?(0,a.jsx)(`a`,{href:e.videoLink,target:`_blank`,rel:`noopener noreferrer`,className:`sd-video-btn`,children:`▶ Watch on YouTube`}):(0,a.jsx)(`span`,{className:`sd-video-coming-soon`,children:`🎬 Video Coming Soon`})]})})]})})]})}export{c as default};