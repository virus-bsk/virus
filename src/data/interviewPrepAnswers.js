/**
 * interviewPrepAnswers
 * --------------------
 * Answers for the clickable questions in src/pages/InterviewPrep.jsx.
 * Keys match interviewPrepTopics[].id; each has `important` and
 * `scenarios` arrays aligned by index with the question arrays.
 *
 * Every answer uses a short, human-friendly format:
 *  1. Description — plain-English definition (what the question asks)
 *  2. Real-time Example — practical example explained like a conversation
 *  3. Code — short, focused snippet only when it helps ("" when not needed)
 *
 * Keep answers short and clear — a reader who does NOT know the
 * concept should understand it after reading.
 */
export const interviewPrepAnswers = {
  sql: {
    important: [
      {
        description: "A SQL query is NOT processed top-to-bottom. SQL clauses have a logical execution order, which is why a SELECT alias usually cannot be used in WHERE.",
        example: "Think of a restaurant. First you check what ingredients are available (FROM), then remove the ones you don't want (WHERE), then group the remaining ingredients (GROUP BY), and only at the end decide what to put on the plate (SELECT). SQL works the same way.",
        code: "SELECT dept, COUNT(*) AS total\nFROM emp\nWHERE salary > 1000\nGROUP BY dept\nHAVING COUNT(*) > 2\nORDER BY total;\n\n-- Why alias can't be used in WHERE:\n-- WHERE runs BEFORE SELECT, so 'total' alias doesn't exist yet\n-- HAVING runs AFTER SELECT, so alias is OK"
      },
      {
        description: "WHERE filters individual rows BEFORE grouping. HAVING filters groups AFTER aggregation.",
        example: "Think of a sales manager. First, they remove all employees who didn't meet their quota (WHERE). Then they group the remaining employees by team (GROUP BY). Finally, they remove any team that has fewer than 3 high earners (HAVING).",
        code: "SELECT dept, COUNT(*)\nFROM emp\nWHERE salary > 50000\nGROUP BY dept\nHAVING COUNT(*) > 5;"
      },
      {
        description: "JOIN combines rows from 2+ tables using a related column.",
        example: "You have a customers table and an orders table. A JOIN merges them so you can see each customer's orders. INNER JOIN returns only customers who placed orders. LEFT JOIN returns every customer — order columns will be NULL for those who never ordered.",
        code: "SELECT c.name, o.amount\nFROM customers c\nLEFT JOIN orders o ON o.customer_id = c.id;\n\n-- INNER: only customers WITH orders\n-- LEFT : all customers, order columns = NULL when none"
      },
      {
        description: "PRIMARY KEY = unique + NOT NULL identifier of a row. UNIQUE = prevents duplicates but allows one NULL. FOREIGN KEY = references a key of another table and enforces valid references.",
        example: "A student table and a marks table. PRIMARY KEY (student_id) uniquely identifies each student. FOREIGN KEY (student_id) in marks ensures a student must exist before you can record their marks, and deleting a student fails if they have marks.",
        code: "CREATE TABLE students (\n  student_id INT PRIMARY KEY,\n  email VARCHAR(100) UNIQUE\n);\nCREATE TABLE marks (\n  student_id INT REFERENCES students(student_id)\n);"
      },
      {
        description: "CLUSTERED index = the actual table data is stored in index order (only 1 per table). NON-CLUSTERED index = a separate structure that points back to the data.",
        example: "A phone book (clustered) is sorted by last name — the data itself is in that order. A book index (non-clustered) tells you which page has a topic, but you still need to go to that page to read the content.",
        code: "CREATE INDEX idx_lastname ON students(last_name); -- non-clustered\n-- Only 1 clustered index per table — usually the primary key"
      },
      {
        description: "B-tree is a balanced tree structure used by most database indexes to search efficiently.",
        example: "Think of looking up a word in a dictionary. A B-tree lets you jump directly to the right page instead of scanning every page. That's what indexes do — they let the database skip large portions of the table.",
        code: "-- Without index: full table scan\nSELECT * FROM users WHERE email = 'test@example.com';\n\n-- With index: B-tree lookup → O(log n)\nSELECT * FROM users WHERE email = 'test@example.com';"
      },
      {
        description: "ACID properties guarantee reliable transaction processing.",
        example: "Transferring ₹500 from Account A to Account B: A (Atomicity) — both succeed or both fail. C (Consistency) — final balances must be valid. I (Isolation) — intermediate states are invisible to other transactions. D (Durability) — once committed, the balance is permanent even if the server crashes.",
        code: "-- START TRANSACTION\nUPDATE accounts SET balance = balance - 500 WHERE id = 1;\nUPDATE accounts SET balance = balance + 500 WHERE id = 2;\n-- COMMIT (or ROLLBACK on error)"
      },
      {
        description: "Normalization organizes tables to reduce duplication and data anomalies.",
        example: "Before normalization, an orders table might repeat the customer's address on every order. After normalization, you split it into customers and orders tables and link them — improving storage efficiency and data integrity.",
        code: "-- Before: 1 table with redundant address\n-- After:   customers table + orders table linked by customer_id"
      },
      {
        description: "A subquery is a query inside another query. A CTE (Common Table Expression) is a named, reusable temporary result set. A derived table is a subquery inside a FROM clause (may require an alias).",
        example: "A subquery is like nested boxes — you unpack outer to reach inner. A CTE is like naming a box once, using it multiple times, and improving readability when the same subquery appears repeatedly.",
        code: "-- CTE example\nWITH dept_avg AS (\n  SELECT dept, AVG(salary) AS avg_sal\n  FROM emp GROUP BY dept\n)\nSELECT e.name, e.salary, d.avg_sal\nFROM emp e JOIN dept_avg d ON e.dept = d.dept;"
      },
      {
        description: "Window functions perform calculations across a set of table rows related to the current row. They add a calculated column to each row without removing any rows.",
        example: "You want to rank employees by salary within each department. Instead of joining the table to itself, a window function (ROW_NUMBER(), RANK(), DENSE_RANK()) lets you compute ranks without removing rows — each row stays with its rank.",
        code: "SELECT name, dept, salary,\n  RANK() OVER (PARTITION BY dept ORDER BY salary DESC) AS rank\nFROM emp;"
      },
      {
        description: "UNION combines result sets and removes duplicates. UNION ALL keeps duplicates and is faster.",
        example: "UNION = combining two lists and removing repeated people. UNION ALL = combining two lists even if the same person appears twice. UNION ALL is much faster because it skips the duplicate-removal step.",
        code: "SELECT name FROM customers\nUNION ALL\nSELECT name FROM prospects;"
      },
      {
        description: "DELETE removes rows one at a time (logs each entry). TRUNCATE removes all rows quickly (resets the table). DROP deletes the entire table.",
        example: "DELETE = erasing individual notebook pages one by one (each page is tracked). TRUNCATE = ripping out the entire notebook at once (fast but not logged per row). DROP = throwing away the entire notebook.",
        code: "DELETE FROM emp WHERE dept = 'Sales';\nTRUNCATE TABLE emp;   -- removes ALL rows, resets auto-increment\nDROP TABLE emp;       -- removes the whole table"
      },
      {
        description: "GROUP BY groups rows by one or more columns and returns one row per group. NULLs are treated as a separate group.",
        example: "You have 100 employee records. GROUP BY dept creates one group per department. You can then apply COUNT(), SUM(), AVG() to each group. NULLs (employees with no department) are grouped together as a separate group.",
        code: "SELECT dept, COUNT(*), AVG(salary)\nFROM emp\nGROUP BY dept;"
      },
      {
        description: "EXPLAIN / EXPLAIN ANALYZE shows the query execution plan — how the database will run your query, including which indexes and joins it will use.",
        example: "It's like a map showing which roads the query takes. EXPLAIN ANALYZE actually runs it and shows real timing. You look for Seq Scan (full table scan = bad), nested loops that might be slow for large tables, or missing indexes that should be added.",
        code: "EXPLAIN ANALYZE SELECT * FROM orders WHERE customer_id = 123;"
      },
      {
        description: "SQL injection is when an attacker inserts malicious SQL code into a query through user input. Parameterized queries (prepared statements) prevent this by separating code from data.",
        example: "If a user types ' OR 1=1 -- in a login form, the raw query becomes: SELECT * FROM users WHERE username = '' OR 1=1 --. Parameterized queries treat input as data only, so the malicious code is never executed.",
        code: "-- Vulnerable (DO NOT use)\nString sql = \"SELECT * FROM users WHERE username = '\" + username + \"'\";\n\n// Safe (parameterized query)\nPreparedStatement stmt = conn.prepareStatement(\n  \"SELECT * FROM users WHERE username = ?\");\nstmt.setString(1, username);"
      },
      {
        description: "A self-join joins a table to itself. A recursive CTE references the CTE itself to traverse hierarchies like organizational charts.",
        example: "Self-join: join the employees table to itself on manager_id to find each employee's manager. Recursive CTE: start at the CEO (no manager) and repeatedly join with their reports to list the entire org chart from top to bottom.",
        code: "-- Self join\nSELECT e.name AS employee, m.name AS manager\nFROM employees e\nJOIN employees m ON e.manager_id = m.employee_id;\n\n-- Recursive CTE\nWITH RECURSIVE org AS (\n  SELECT employee_id, name, manager_id, 0 AS level\n  FROM employees WHERE manager_id IS NULL\n  UNION ALL\n  SELECT e.employee_id, e.name, e.manager_id, o.level + 1\n  FROM employees e JOIN org o ON e.manager_id = o.employee_id\n)\nSELECT * FROM org;"
      },
      {
        description: "Transaction isolation levels control how concurrent transactions interact and what data they can see, preventing problems like dirty reads, non-repeatable reads, and phantom reads.",
        example: "Isolation levels prevent problems like: dirty reads (seeing uncommitted data), non-repeatable reads (same query returns different results), and phantom reads (new rows appear between reads). Read Committed is the default. Serializable is the strictest.",
        code: "-- Set transaction isolation level\nSET TRANSACTION ISOLATION LEVEL SERIALIZABLE;\n\n-- PostgreSQL\nBEGIN ISOLATION LEVEL REPEATABLE READ;"
      },
      {
        description: "An index will NOT be used when you apply functions to a column or use a leading wildcard.",
        example: "Searching for name LIKE '%son' forces the database to scan every row because it cannot use an index. But name LIKE 'John%' can use an index because it starts with a fixed string.",
        code: "-- Index NOT used\nSELECT * FROM users WHERE UPPER(name) = 'JOHN';\n\n-- Index USED\nSELECT * FROM users WHERE name LIKE 'John%';"
      },
      {
        description: "GROUP BY groups rows by one or more columns. DISTINCT removes duplicate rows from the entire result set.",
        example: "GROUP BY is for aggregation — you group rows by a column and apply functions like COUNT() or SUM(). DISTINCT is for removing duplicates — you just want unique rows back without any aggregation.",
        code: "-- GROUP BY (grouped aggregation)\nSELECT dept, COUNT(*) FROM emp GROUP BY dept;\n\n-- DISTINCT (unique rows only)\nSELECT DISTINCT dept FROM emp;"
      },
      {
        description: "ON DELETE CASCADE automatically deletes child rows when a parent row is deleted. ON DELETE SET NULL sets the foreign key column to NULL instead.",
        example: "A customers table and an orders table. ON DELETE CASCADE means deleting a customer automatically deletes all their orders. ON DELETE SET NULL means the orders keep the record but with customer_id set to NULL (if the column allows NULL).",
        code: "-- CASCADE: delete customer → auto-delete their orders\nALTER TABLE orders ADD CONSTRAINT fk_customer\n  FOREIGN KEY (customer_id) REFERENCES customers(id)\n  ON DELETE CASCADE;\n\n-- SET NULL: delete customer → set customer_id to NULL\nALTER TABLE orders ADD CONSTRAINT fk_customer\n  FOREIGN KEY (customer_id) REFERENCES customers(id)\n  ON DELETE SET NULL;"
      },
    ],
    scenarios: [
      {
        description: "Find the second highest salary — write it 3 different ways (LIMIT, DENSE_RANK, subquery).",
        example: "You are a coach who wants to award a runner-up prize. The highest earner gets the first prize. The second highest gets the second prize. Without DISTINCT, if the top salary appears twice, a naive query would return the same person twice — you need to handle duplicates correctly.",
        code: "-- Method 1: LIMIT + OFFSET\nSELECT DISTINCT salary FROM emp ORDER BY salary DESC LIMIT 1 OFFSET 1;\n\n-- Method 2: DENSE_RANK\nSELECT salary FROM (\n  SELECT DISTINCT salary,\n    DENSE_RANK() OVER (ORDER BY salary DESC) rn\n  FROM emp\n) t WHERE rn = 2;\n\n-- Method 3: subquery\nSELECT MAX(salary) FROM emp WHERE salary < (SELECT MAX(salary) FROM emp);"
      },
      {
        description: "Find employees who have never placed an order.",
        example: "You are a CRM manager. Some customers have never placed an order. You need to find all of them. INNER JOIN would exclude them; LEFT JOIN would show them with NULL order columns; NOT EXISTS or LEFT JOIN + IS NULL would surface them.",
        code: "-- Using LEFT JOIN + IS NULL\nSELECT c.name\nFROM customers c\nLEFT JOIN orders o ON o.customer_id = c.id\nWHERE o.id IS NULL;\n\n-- Using NOT EXISTS\nSELECT name FROM customers c\nWHERE NOT EXISTS (\n  SELECT 1 FROM orders o WHERE o.customer_id = c.id\n);"
      },
      {
        description: "Find and delete duplicate rows keeping one record.",
        example: "You are cleaning a customer list that has duplicate entries. You want to keep one copy and delete the rest. Using a subquery with ROW_NUMBER() to identify duplicates and then deleting the extras.",
        code: "-- Find duplicates\nDELETE FROM customers\nWHERE id NOT IN (\n  SELECT MIN(id) FROM customers\n  GROUP BY email, phone\n);\n\n-- Or using window function\nDELETE FROM customers\nWHERE ctid NOT IN (\n  SELECT ctid FROM (\n    SELECT ctid, ROW_NUMBER() OVER (PARTITION BY email, phone ORDER BY id) rn\n    FROM customers\n  ) t WHERE rn = 1\n);"
      },
      {
        description: "A query on 10M rows is slow — step-by-step how do you tune it?",
        example: "You are a consultant brought in when a dashboard is slow. You check the query plan (is it scanning the whole table?), then add indexes on WHERE and JOIN columns, rewrite the query to reduce work, cache results if appropriate, and finally consider partitioning if the table is still too large.",
        code: "-- Step 1: EXPLAIN ANALYZE\nEXPLAIN ANALYZE SELECT * FROM orders WHERE customer_id = 123;\n\n-- Step 2: Add index\nCREATE INDEX idx_orders_customer ON orders(customer_id);\n\n-- Step 3: Reduce columns\nSELECT id, total FROM orders WHERE customer_id = 123;"
      },
      {
        description: "Month-over-month revenue growth with a single query.",
        example: "You are looking at a finance dashboard. You need to show this month's revenue and what percentage of the previous month's revenue it is. Using LAG() window function lets you compare without a self-join.",
        code: "SELECT month, revenue,\n  ROUND( (revenue - LAG(revenue) OVER (ORDER BY month)) /\n        LAG(revenue) OVER (ORDER BY month) * 100, 1 ) AS pct_growth\nFROM monthly_revenue;"
      },
      {
        description: "ROW_NUMBER() with PARTITION BY numbers rows inside each group, so you can keep only the top N rows per department.",
        example: "HR wants the 3 highest-paid employees in each department for a bonus list. Rank employees within each department by salary descending, then keep ranks 1 to 3. Use DENSE_RANK() instead when tied salaries should share the same rank.",
        code: "SELECT * FROM (\n  SELECT name, dept, salary,\n    ROW_NUMBER() OVER (PARTITION BY dept ORDER BY salary DESC) rn\n  FROM emp\n) t\nWHERE rn <= 3;"
      },
      {
        description: "A running total is the sum of all rows up to the current row in a defined order — computed with a window function over an ordered frame, no self-join or loop needed.",
        example: "In a bank passbook every entry shows the balance after that transaction. SUM() OVER (ORDER BY day) gives cumulative revenue day by day — finance dashboards use exactly this for 'total till date'.",
        code: "SELECT day, amount,\n  SUM(amount) OVER (\n    ORDER BY day\n    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\n  ) AS running_total\nFROM transactions;"
      },
      {
        description: "Load data in dependency order (parents before children), keep FK validation on but load in chunks, and verify counts and orphans before switching traffic over.",
        example: "Migrating customers, orders and order_items from a legacy DB into a schema that already has foreign keys. Insert customers first, then orders, then item_items — one transaction per chunk — then run an orphan check (LEFT JOIN ... IS NULL) and compare row counts with the source before going live.",
        code: "-- parents first, then children, in batches\nINSERT INTO customers SELECT * FROM legacy.customers;\nINSERT INTO orders    SELECT * FROM legacy.orders;\nINSERT INTO order_items SELECT * FROM legacy.order_items;\n\n-- validation: must return 0 rows\nSELECT o.id FROM orders o\nLEFT JOIN customers c ON c.id = o.customer_id\nWHERE c.id IS NULL;"
      },
      {
        description: "OFFSET skips and counts rows on every page — O(n) and slower as pages grow. Keyset (seek) pagination filters from the last seen sort key — O(log n) with the right index, and never skips rows when data shifts.",
        example: "Instagram-style infinite scroll on millions of posts: OFFSET 999900 still walks 999,900 rows just to serve 20 — page 5000 is unusable. Keyset jumps straight to the position after the last (created_at, id) using the index, so every page costs the same.",
        code: "-- OFFSET: slow on deep pages\nSELECT * FROM posts ORDER BY created_at DESC LIMIT 20 OFFSET 100000;\n\n-- Keyset / seek: constant cost, stable pagination\nSELECT * FROM posts\nWHERE (created_at, id) < (:last_ts, :last_id)\nORDER BY created_at DESC, id DESC\nLIMIT 20;"
      },
      {
        description: "Index column order matters: equality columns first, then the ORDER BY column. For WHERE a=? AND b=? ORDER BY c the ideal index is (a, b, c) — it serves both filters and avoids a separate sort step.",
        example: "A product listing API filters by brand and in-stock, sorted by price. Index (brand, in_stock, price) lets the DB seek the two equality columns and read rows already in price order — EXPLAIN shows one Index Scan and no Sort node.",
        code: "CREATE INDEX idx_prod_brand_stock_price\n  ON products (brand, in_stock, price);\n\nEXPLAIN ANALYZE\nSELECT * FROM products\nWHERE brand = 'Nike' AND in_stock = true\nORDER BY price ASC;\n-- expect: Index Scan, no \"Sort\" node"
      },
    ],
  },
  java: {
    important: [
      {
        description: "Encapsulation (hide state behind accessors), Inheritance (reuse and extend a base class), Polymorphism (one reference type, many implementations), Abstraction (expose what, hide how).",
        example: "A checkout module talks to an abstract PaymentService with charge(). CreditCardService and WalletService implement it differently — checkout never cares which one it got. Fields stay private (encapsulation), WalletService extends PaymentService (inheritance), charge() runs the subclass code (polymorphism).",
        code: "abstract class Payment { abstract void charge(int amt); }\nclass Card extends Payment {\n  private int balance;                          // encapsulation\n  @Override void charge(int amt) { balance -= amt; }\n}\nPayment p = new Card();\np.charge(100);                                  // abstraction: code sees only Payment"
      },
      {
        description: "== compares object references (memory address), .equals() compares content (override it), and hashCode() must return the same value for equal objects so hash-based collections can find them.",
        example: "new String(\"Hi\") == new String(\"Hi\") is false — two different objects in memory, but .equals() is true. In a HashMap, if you override equals() but forget hashCode(), two equal keys hash to different buckets and the lookup silently returns null — one of the most common Java bugs.",
        code: "String a = new String(\"Hi\"), b = new String(\"Hi\");\na == b        // false - different objects\na.equals(b)   // true  - same content\n// rule for HashMap keys: a.equals(b)  =>  a.hashCode() == b.hashCode()"
      },
      {
        description: "String is immutable — every change creates a new object. StringBuilder is mutable and fast (no synchronization). StringBuffer is mutable and synchronized — thread-safe but slower.",
        example: "Building a 10,000-line CSV with s = s + line inside a loop creates 10,000 throwaway objects and burns CPU. StringBuilder.append reuses one buffer — typically 100x faster. StringBuffer only makes sense when multiple threads share the same builder.",
        code: "String s = \"\";                 for (...) s += line;          // new object each time\nStringBuilder sb = new StringBuilder(); for (...) sb.append(line);  // fast, single buffer\nStringBuffer tb = new StringBuffer();  tb.append(line);             // thread-safe variant"
      },
      {
        description: "final = keyword: constant variable, method that cannot be overridden, class that cannot be extended. finally = block that always runs after try/catch (cleanup). finalize() = legacy GC hook, deprecated since Java 9.",
        example: "Closing a JDBC connection in finally guarantees it closes even when the exception propagates — code after try would be skipped. Today you use try-with-resources instead, because finalize() timing depends on the GC and is not guaranteed to ever run.",
        code: "final int LIMIT = 10;                 // cannot reassign\ntry { risky(); } finally { conn.close(); }   // always runs\n// protected void finalize() { ... }  - deprecated, do not rely on it"
      },
      {
        description: "Abstract class: state, constructors, any access modifier — you extend only one. Interface: a pure contract, with default/static methods since Java 8 — you can implement many.",
        example: "Shared config and state for a family of services → abstract BaseService. Just a capability like Comparable or Payable → interface. Default methods let an interface ship code (like Iterable.forEach) without breaking every existing implementation.",
        code: "abstract class Base { protected String name; abstract void run(); void log() {...} }\ninterface Payable { double calc(int amt); default void print() {...} }\nclass Job extends Base implements Payable { /* 1 class, many interfaces */ }"
      },
      {
        description: "Overloading = same method name, different parameter list, resolved at COMPILE time. Overriding = subclass redefines the parent's identical signature, resolved at RUNTIME through dynamic dispatch.",
        example: "print(int) and print(String) are two overloads — javac picks based on the argument you pass. But when Shape s = new Child(); s.draw(); runs, Child.draw() executes even though the variable type is Shape — the runtime object decides.",
        code: "class A { void go(int x) {...} void go(String s) {...} }  // overloading (compile time)\nclass B extends A { @Override void go(int x) {...} }        // overriding (runtime)\nA a = new B();\na.go(1);   // calls B.go - virtual dispatch"
      },
      {
        description: "Checked exceptions (IOException, SQLException) must be caught or declared with throws — the compiler enforces it. Unchecked exceptions (NullPointerException, IllegalArgumentException) are programming errors and are never forced on you.",
        example: "Reading a file means handling FileNotFoundException — a real-world failure the compiler makes you plan for. Passing a null argument into a method is a bug: fix the code, don't wrap it in try/catch. Business failures (order rejected) should be a custom unchecked exception carrying an error code.",
        code: "try { Files.readString(path); }          // checked - must catch or throw\n  catch (IOException e) { log.error(\"read failed\", e); }\n\nthrow new IllegalArgumentException(\"qty must be > 0\");  // unchecked"
      },
      {
        description: "The stack holds method frames — locals and references — is thread-private and auto-freed on return. The heap holds all objects and arrays, is shared between threads, and is managed by the GC. Metaspace stores class metadata.",
        example: "Calling placeOrder() pushes a frame containing the order id and a reference to the Cart. The Cart object itself lives on the heap. When the method returns, the frame disappears; the Cart stays until nothing references it, then GC collects it.",
        code: "void placeOrder() {\n  int id = 10;                  // primitive -> stack\n  Cart c = new Cart();          // reference -> stack, Cart object -> heap\n}                               // frame popped; Cart eligible for GC if unreferenced"
      },
      {
        description: "GC frees unreachable objects. New objects live in the Young generation — Minor GC moves survivors to the Old generation; Full GC cleans the Old generation. G1 (default) collects regions incrementally against a pause goal; ZGC targets sub-millisecond pauses.",
        example: "Every request creates thousands of short-lived DTOs — they die in Eden almost immediately, so Minor GC is cheap. Cached sessions survive and get promoted to Old Gen. A memory leak means objects stay reachable forever (a static map nobody clears) → Old Gen fills → Full GC thrashes → OutOfMemoryError.",
        code: "// java -Xmx512m -Xlog:gc* app.jar\njmap -histo:live <pid>     // top classes by instance count -> spot the leak\n// -XX:+UseG1GC (default) | -XX:+UseZGC for low-latency"
      },
      {
        description: "List = ordered, allows duplicates (ArrayList, LinkedList). Set = unique elements (HashSet, LinkedHashSet, TreeSet). Map = key→value pairs with unique keys (HashMap, LinkedHashMap, TreeMap).",
        example: "A shopping list with repeat items → List. Unique visitor emails → Set. Product id → Product for O(1) lookup on every page render → Map. Need results sorted by name → TreeSet / TreeMap.",
        code: "List<String> list = new ArrayList<>();          // ordered, allows duplicates\nSet<String> set = new HashSet<>();              // unique only\nMap<String, Product> map = new HashMap<>();     // O(1) get by key"
      },
      {
        description: "HashMap is an array of buckets. hash(key) picks a bucket; collisions form a linked list that becomes a red-black tree at 8 entries. Default capacity 16, load factor 0.75 — it doubles and rehashes at 12 entries.",
        example: "Looking up 100k products by id is near O(1) because the hash jumps straight to the bucket. A key with a bad hash (or equals without hashCode) piles everything into one chain and lookups degrade to O(n) — which is why both methods must be implemented correctly for custom keys.",
        code: "h = key.hashCode() ^ (key.hashCode() >>> 16);  // spread high bits\nindex = (capacity - 1) & h;                     // bucket index\n// bin: linked list -> treeify at 8; resize when size > capacity * 0.75"
      },
      {
        description: "ArrayList is a dynamic array: O(1) get by index, O(n) insert/delete in the middle. LinkedList is doubly linked: O(1) add/remove once you hold the node, but O(n) to reach index i — and it wastes memory on node pointers.",
        example: "Random reads like get(5000) or append-heavy logs → ArrayList (and it's cache-friendly). Frequent add/remove at head/tail through an iterator → Deque. In practice ArrayList wins for almost every real workload; even the JDK recommends ArrayDeque over LinkedList for stacks/queues.",
        code: "list.get(5000);   // ArrayList O(1) | LinkedList O(n)\nlist.add(0, x);   // ArrayList shifts O(n); LinkedList O(1) after cursor\nDeque<String> dq = new ArrayDeque<>();   // stack/queue - not LinkedList"
      },
      {
        description: "volatile gives visibility only (reads/writes hit main memory, no caching). synchronized gives mutual exclusion plus visibility. Lock (ReentrantLock) adds tryLock, timeouts, fairness and interruptible waits.",
        example: "A refresh thread flips a config flag → volatile boolean so all worker threads see it immediately. Updating a shared balance needs synchronized/Atomic to stop lost updates. A payment thread using tryLock(2, SECONDS) can give up instead of hanging forever — impossible with synchronized.",
        code: "volatile boolean running = true;            // visibility only\nsynchronized (lock) { balance -= amt; }      // exclusion + visibility\nif (lock.tryLock(2, TimeUnit.SECONDS)) {\n  try { ... } finally { lock.unlock(); }\n}"
      },
      {
        description: "Deadlock: two threads each hold one lock and wait for the other — both block forever. Livelock: threads keep reacting to each other and never make progress. Starvation: a thread never wins the resource because others always take it first.",
        example: "A transfer service: thread A locks account1 then asks for account2, while thread B locks account2 then asks for account1 — during a double transfer both hang forever. Fix: always acquire locks in a fixed order (sort account ids) or use tryLock with a timeout.",
        code: "// deadlock: T1 holds X waits Y, T2 holds Y waits X\n// fix 1: consistent lock ordering\nif (a.getId() > b.getId()) { lock(b); lock(a); } else { lock(a); lock(b); }\n// fix 2: give up instead of blocking forever\nlock.tryLock(100, TimeUnit.MILLISECONDS);"
      },
      {
        description: "A lambda is an anonymous function bound to a functional interface (exactly one abstract method): Predicate<T> filters, Function<T,R> maps, Supplier<T> produces, Consumer<T> consumes.",
        example: "list.stream().filter(p -> p.getPrice() < 100) — the lambda is a Predicate<Product>. Behavior becomes data you can pass around, instead of writing a five-line anonymous inner class for every callback.",
        code: "Predicate<Product> cheap = p -> p.getPrice() < 100;\nFunction<Product, String> name = Product::getName;\nConsumer<String> log = System.out::println;\nlist.stream().filter(cheap).map(name).forEach(log);"
      },
      {
        description: "A stream is a lazy pipeline: intermediate ops (filter, map, sorted) build the chain, a terminal op (collect, forEach) triggers execution. Elements flow one at a time — no intermediate collection is built.",
        example: "Active premium users sorted by name: filter → map → sorted → collect. Nothing runs until collect(), and each element passes through the whole pipeline before the next one is read. Parallel streams split the work across cores for CPU-heavy jobs on large data.",
        code: "List<String> names = users.stream()\n  .filter(u -> u.isActive())       // intermediate (lazy)\n  .map(User::getName)              // intermediate\n  .sorted()                        // intermediate\n  .collect(Collectors.toList());   // terminal - triggers execution"
      },
      {
        description: "Optional<T> wraps a value that may be absent and forces callers to deal with the empty case explicitly — map, filter, orElse, orElseThrow instead of raw null checks.",
        example: "repo.findById(id) returning Optional<User> means the caller cannot forget the null check and crash three layers later with NPE. get() on an empty Optional throws immediately at the mistake — fail fast at the right place.",
        code: "Optional<User> u = repo.findById(id);\nString name = u.map(User::getName).orElse(\"guest\");\nUser strict = u.orElseThrow(() -> new NotFoundException(id));\n// avoid: opt.get() without isPresent(), Optional as a field or setter param"
      },
      {
        description: "An immutable class has final fields set by the constructor and no setters — its state can never change after creation. A record (Java 16+) generates the constructor, getters, equals, hashCode and toString for you.",
        example: "Money and LocalDate are immutable, so you can share them across threads without locks. Records are the default choice for DTOs: an OrderLine(price, qty) passed between services can't be corrupted by another thread, and equals() works in tests for free.",
        code: "record Money(BigDecimal amount, String currency) {}\n\nMoney m = new Money(new BigDecimal(\"10.00\"), \"EUR\");\nm.amount();                 // accessor, no setter - immutable by design"
      },
      {
        description: "The JVM loads bytecode through a hierarchy of classloaders (bootstrap → platform → application), verifies it, then interprets/JIT-compiles it. Memory: heap, per-thread stack, metaspace for class metadata.",
        example: "java.* classes come from the bootstrap loader, your classes from the application loader — each loader has its own namespace, so the same FQN loaded twice by different loaders is NOT the same type. That's how Tomcat isolates webapps, and why an 'impossible' ClassCastException can still happen.",
        code: "java -verbose:class app.jar     // watch classes load at startup\n// parent delegation: child asks parent first\n// same FQN + different classloader => a instanceof B is false"
      },
      {
        description: "CompletableFuture represents a value arriving later. thenApply/thenCompose chain steps, thenCombine runs two in parallel, allOf waits for all, orTimeout/exceptionally handle failure — on a chosen executor, without blocking caller threads.",
        example: "A dashboard needs user, orders and recommendations in parallel: start three futures and join with allOf — total latency = the slowest call instead of the sum. If recommendations times out, orTimeout + exceptionally returns defaults so the page still renders.",
        code: "CompletableFuture<User> u = supplyAsync(() -> api.user(id), pool);\nCompletableFuture<List<Order>> o = supplyAsync(() -> api.orders(id), pool);\nu.thenCombine(o, (uu, oo) -> new Dashboard(uu, oo))\n .orTimeout(2, TimeUnit.SECONDS)\n .exceptionally(ex -> Dashboard.empty());"
      },
    ],
    scenarios: [
      {
        description: "Group by the element and count occurrences, keep entries whose count > 1 — or add to a Set and catch the add() returning false.",
        example: "A login audit lists the same user ids repeatedly. One stream gives every duplicate plus how often it appeared — no loops, no nested maps in the calling code.",
        code: "List<String> dups = list.stream()\n  .collect(Collectors.groupingBy(x -> x, Collectors.counting()))\n  .entrySet().stream()\n  .filter(e -> e.getValue() > 1)\n  .map(Map.Entry::getKey)\n  .collect(Collectors.toList());"
      },
      {
        description: "synchronized serializes every increment under one lock. AtomicLong uses lock-free CAS on a single field. LongAdder splits contention across cells and sums them on read — best for write-heavy counters.",
        example: "A request-metrics counter in a busy service: synchronized makes threads ping-pong the cache line, AtomicLong is better but everyone still CASes the same object. Above ~10k increments/s, LongAdder wins — read with sum() when you need the total.",
        code: "synchronized (lock) { c++; }                     // exclusive lock\nAtomicLong a = new AtomicLong(); a.incrementAndGet();  // CAS, no lock\nLongAdder adder = new LongAdder(); adder.increment();  // high contention\nlong total = adder.sum();"
      },
      {
        description: "Store value plus expiry timestamp in a ConcurrentHashMap; on get() treat expired entries as missing and remove them, and schedule a sweep so never-read keys still get cleaned up.",
        example: "Caching FX rates for 60 seconds: get() returns null for a stale entry so the caller reloads; a scheduled executor removes expired entries every minute, keeping memory bounded even for currencies nobody requests again.",
        code: "record Entry(String value, long expiresAt) {}\nMap<String, Entry> cache = new ConcurrentHashMap<>();\n\nString get(String k) {\n  Entry e = cache.get(k);\n  if (e == null) return null;\n  if (e.expiresAt() < System.currentTimeMillis()) { cache.remove(k); return null; }\n  return e.value();\n}\n// cleanup: cache.entrySet().removeIf(en -> en.getValue().expiresAt() < now)"
      },
      {
        description: "The classic deadlock is waiting while holding the lock (or two threads with inverted wait sets). Fix: a single monitor with wait/signal — wait() releases the lock — or simply use BlockingQueue, which implements this correctly.",
        example: "Two threads each hold the queue lock while waiting for the other to free space — neither can ever signal. ArrayBlockingQueue.put()/take() await on conditions and release the lock while waiting, breaking the cycle. Always re-check the condition in a while-loop (spurious wakeups).",
        code: "// broken: waiting while holding the lock / inverted wait sets\n// fix: one condition, await releases the monitor\nsynchronized (q) {\n  while (q.isEmpty()) q.wait();     // releases lock while waiting\n  Item it = q.removeFirst();\n}\n// production: BlockingQueue<Item> q = new ArrayBlockingQueue<>(10);"
      },
      {
        description: "Never load the whole file: stream it line by line with BufferedReader / Files.lines() (a lazy Spliterator over the channel), keeping only aggregates in memory. For binary, use FileChannel with MappedByteBuffer.",
        example: "Summing a 2GB CSV of orders: Files.lines(path).skip(1).mapToLong(...) processes one line at a time — heap stays flat at a few MB even in a 512MB container. Files.readAllLines() would copy everything into a List and immediately OOM.",
        code: "try (Stream<String> lines = Files.lines(path)) {\n  long total = lines.skip(1)\n    .mapToLong(l -> Long.parseLong(l.split(\",\")[4]))\n    .sum();\n}\n// line loop: BufferedReader.readLine(); binary: FileChannel + MappedByteBuffer"
      },
      {
        description: "CPU-bound pools size around core count to avoid context-switch waste; IO-bound pools go much higher (cores × (1 + wait/compute)) because most threads are blocked, not computing. Bound the queue and add a rejection policy.",
        example: "An order service doing ~50ms of HTTP calls per request on 8 cores: 8 × (1 + 45/5) ≈ 80 threads keeps cores busy while others wait on the network. A pricing engine crunching numbers stays at 8 threads — 80 compute threads would only thrash the scheduler. An unbounded queue with a small pool silently queues requests and blows up latency.",
        code: "int cpu = Runtime.getRuntime().availableProcessors();\nint ioPool  = cpu * (1 + waitTime / cpuTime);   // e.g. 8 * (1 + 45/5) = 80\nint cpuPool = cpu;                              // cores (+1 for timing luck)\nnew ThreadPoolExecutor(0, ioPool, 60, SECONDS,\n  new LinkedBlockingQueue<>(1000),\n  new ThreadPoolExecutor.CallerRunsPolicy());    // bounded queue + backpressure"
      },
      {
        description: "Count frequencies in a HashMap (stream groupingBy), then keep the K largest by count — a min-heap of size K gives O(n log K); sorting every entry is simpler but O(n log n).",
        example: "Log analysis: the 10 most frequent error codes in a 500MB file. Stream lines, count in a map, sort entries by count descending and limit(10) — with millions of distinct words, a size-K PriorityQueue keeps only the top 10 in memory.",
        code: "Map<String, Long> freq = words.stream()\n  .collect(Collectors.groupingBy(w -> w, Collectors.counting()));\n\nList<String> top10 = freq.entrySet().stream()\n  .sorted(Map.Entry.<String, Long>comparingByValue().reversed())\n  .limit(10)\n  .map(Map.Entry::getKey)\n  .toList();"
      },
      {
        description: "Floyd's tortoise and hare: slow moves 1 step, fast moves 2 — they meet if a cycle exists (O(1) memory). For graphs, DFS with white/gray/black coloring detects a back edge, or Union-Find detects an edge connecting two already-connected vertices.",
        example: "A corrupted file system where block A's next pointer loops back to block B hangs a naive walk. Floyd's algorithm finds the cycle in a single pass with two pointers — no HashSet of visited nodes, no stack overflow.",
        code: "boolean hasCycle(Node head) {\n  Node slow = head, fast = head;\n  while (fast != null && fast.next != null) {\n    slow = slow.next;\n    fast = fast.next.next;\n    if (slow == fast) return true;\n  }\n  return false;\n}"
      },
      {
        description: "Wrap every nullable boundary in Optional at the source, chain with map/filter, and resolve once at the edge with orElse or orElseThrow — replacing nested null checks with a readable pipeline.",
        example: "getUser().getAddress().getCity() NPEs the moment any link is null. Refactored: the chain returns Optional<String> and the controller ends with orElseThrow(NotFoundException) — the failure surfaces at the right layer with a clear message.",
        code: "String city = Optional.ofNullable(user)\n  .map(User::getAddress)        // Optional<Address>\n  .map(Address::getCity)        // Optional<String>\n  .filter(c -> !c.isBlank())\n  .orElseThrow(() -> new NotFoundException(\"city missing\"));"
      },
      {
        description: "Start each call with supplyAsync on a shared executor, join them with allOf (or thenCombine), and guard latency with orTimeout / completeOnTimeout; absorb failures with handle() so one slow backend can't stall the page.",
        example: "A dashboard fetches user, orders and recommendations concurrently — total time is the slowest call, not the sum. Recommendations exceeding 1s completes with an empty list, so the page renders in ~1.2s instead of blocking on a broken backend.",
        code: "Executor ex = Executors.newFixedThreadPool(3);\nCompletableFuture<User> u = supplyAsync(() -> api.user(id), ex);\nCompletableFuture<List<Order>> o = supplyAsync(() -> api.orders(id), ex);\nCompletableFuture<List<Rec>> r = supplyAsync(() -> api.recs(id), ex)\n  .orTimeout(1, TimeUnit.SECONDS)\n  .exceptionally(e -> List.of());\nallOf(u, o, r).thenRun(() -> render(u.join(), o.join(), r.join()));"
      },
    ],
  },
  "spring-boot": {
    important: [
      {
        description: "Spring Boot is an opinionated layer over the Spring Framework that removes boilerplate: auto-configuration, embedded server, starter dependencies and production-ready actuator — you ship one runnable jar.",
        example: "An API that used to need a day of XML/servlet wiring in classic Spring is now a @RestController plus one dependency: mvn spring-boot:run gives you a running service with logging, health checks and metrics out of the box.",
        code: "@SpringBootApplication\npublic class App {\n  public static void main(String[] args) { SpringApplication.run(App.class, args); }\n}\n// spring-boot-starter-web -> embedded Tomcat + Spring MVC + JSON"
      },
      {
        description: "Spring is the full IoC container and ecosystem (you configure it). Spring Boot is defaults + auto-configuration on top of Spring — it configures Spring for you, but is not a replacement; every default can be overridden.",
        example: "With Spring you register DispatcherServlet, message converters and view resolvers yourself. Boot sees spring-webmvc on the classpath and wires them for you — you start at 80% of a working service and customize the rest.",
        code: "// Spring: explicit wiring\n@Bean DispatcherServlet dispatcherServlet() { ... }\n\n// Boot: picked from the classpath\n// @EnableAutoConfiguration -> WebMvcAutoConfiguration applies automatically"
      },
      {
        description: "On startup, Boot filters candidate auto-configurations from AutoConfiguration.imports, applies @Conditional rules (class present, bean missing, properties set) and registers only the ones that match your app.",
        example: "Add spring-boot-starter-data-jpa → DataSourceAutoConfiguration finds Hibernate on the classpath, reads spring.datasource.url and creates the pool. Remove the MySQL driver and it backs off via @ConditionalOnClass. --debug prints 'matched/not matched' for every condition — that's the first thing to check when auto-config 'doesn't work'.",
        code: "@AutoConfiguration\n@ConditionalOnClass(JdbcTemplate.class)\n@ConditionalOnMissingBean(JdbcTemplate.class)\npublic class JdbcTemplateAutoConfiguration {\n  @Bean JdbcTemplate jdbcTemplate(DataSource ds) { return new JdbcTemplate(ds); }\n}\n// registered in META-INF/.../AutoConfiguration.imports"
      },
      {
        description: "@SpringBootApplication combines @Configuration (the class can hold beans), @ComponentScan (finds beans under its package) and @EnableAutoConfiguration (applies auto-configs) — three annotations, one line.",
        example: "Placing App.java at the root of com.example means every @Service below it is scanned. If your entry class sits in a sub-package, beans outside it vanish — the classic 'required a bean of type' startup error. Fix with scanBasePackages or moving the class up.",
        code: "@SpringBootApplication\n// == @Configuration + @EnableAutoConfiguration + @ComponentScan\n// = new @ComponentScan(basePackages = \"com.example\") + @Configuration"
      },
      {
        description: "Starters are curated dependency bundles: one artifact pulls a compatible, version-locked set of transitive dependencies for a use case (web, data-jpa, security, test).",
        example: "Building a JWT-secured REST API: spring-boot-starter-web + starter-security + starter-test bring Spring MVC, Security, JUnit 5 and Mockito — all versions aligned by the Boot BOM, so no jar hell between Hibernate, Jackson and Tomcat.",
        code: "<dependency><groupId>org.springframework.boot</groupId>\n  <artifactId>spring-boot-starter-web</artifactId></dependency>\n<dependency>...spring-boot-starter-data-jpa</dependency>\n<dependency>...spring-boot-starter-security</dependency>"
      },
      {
        description: "Inversion of Control: objects don't construct their dependencies — the container does and injects them. Constructor injection is the standard: final fields, no reflection hacks, trivially mockable in tests.",
        example: "OrderService needs PaymentClient. Instead of new PaymentClient() inside the service (untestable, hard-wired), the constructor receives it — the unit test passes a mock, and Spring guarantees the dependency exists before the service is used.",
        code: "@Service\nclass OrderService {\n  private final PaymentClient pay;\n  OrderService(PaymentClient pay) { this.pay = pay; }   // constructor injection\n}\n// test: new OrderService(mockPayClient)"
      },
      {
        description: "@Component is the generic stereotype; @Service, @Repository, @Controller are specialized components that state intent — and carry behavior (e.g. @Repository translates persistence exceptions into Spring's DataAccessException hierarchy).",
        example: "You rarely write bare @Component for application classes: @Service for business logic, @Repository for DAOs (its exception translation is real), @Controller for view handlers. AOP features like @Async and @Transactional target these stereotypes when they proxy beans.",
        code: "@Component                // generic bean, picked up by component scan\n@Service class Pricing {...}         // business logic\n@Repository class OrderDao {...}     // DB exceptions translated\n@Controller class PageController {...} // returns view names"
      },
      {
        description: "@Component is class-level: Spring instantiates the annotated class itself during scanning. @Bean is method-level: you construct and configure the instance — required for third-party classes you cannot annotate.",
        example: "You can't add @Component to ObjectMapper or a vendor SDK's client — you write a @Bean method that news it up with the exact modules and timeouts you want, giving one single source of truth for how that object is built.",
        code: "@Component\nclass OrderService {...}          // Spring scans and constructs it\n\n@Configuration\nclass AppConfig {\n  @Bean ObjectMapper mapper() {\n    return new ObjectMapper().registerModule(new JavaTimeModule());\n  }\n}"
      },
      {
        description: "Default scope is singleton (one instance per container). prototype creates a new instance per lookup; request/session scope exist in web apps; application is one per ServletContext; websocket per WS session.",
        example: "Stateless services are singleton — cheap and shared. A bean carrying per-request state must be prototype (or better: no state at all). The trap: a singleton holding a prototype dependency freezes it — inject ObjectProvider<Wizard> or use scoped proxies to get a fresh instance per use.",
        code: "@Service                       // singleton (default) - one instance\n@Scope(\"prototype\")\n@Component class Wizard {}      // new instance on every getBean()\n\n// singleton needs fresh prototypes? inject ObjectProvider<Wizard>"
      },
      {
        description: "Lifecycle: instantiate → populate properties (DI) → aware callbacks → BeanPostProcessor (before) → @PostConstruct / InitializingBean.afterPropertiesSet → ready → @PreDestroy on shutdown.",
        example: "A connection pool opens its sockets in @PostConstruct, after all config is injected and before the app serves a single request — startup validation belongs there so a bad config fails fast at boot, not at the first user click. @PreDestroy closes resources during graceful shutdown.",
        code: "@Service\nclass CacheWarmer {\n  @PostConstruct void init()  { /* after DI: validate config, warm cache */ }\n  @PreDestroy  void shutdown() { /* before exit: close resources */ }\n}"
      },
      {
        description: "Profiles activate environment-specific beans and config: @Profile(\"dev\") on beans, spring.profiles.active=dev at runtime, plus application-{profile}.yml overrides on top of the default file.",
        example: "dev uses H2 plus a stub payment gateway, prod uses MySQL and the real one — same jar deployed everywhere. Tests run with @Profile(\"test\"). Never branch on if (env.equals(\"prod\")) in business code — let the container wire the right beans per profile.",
        code: "@Service @Profile(\"prod\") class StripePay implements Pay {...}\n@Service @Profile(\"dev\")  class StubPay   implements Pay {...}\n# application-prod.yml\nspring.profiles.active: prod"
      },
      {
        description: "Both hold the same key-value configuration; properties is flat and line-based, YAML is hierarchical and indentation-based (nicer for nested maps/lists). YAML is whitespace-sensitive — a wrong indent silently drops the setting.",
        example: "Spring picks up whichever you put in resources/ (both together: application.properties + application.yml also work, properties wins on same key). Teams often use YAML for complex datasource/pool config because nested structure stays readable.",
        code: "# application.properties\nserver.port=8080\nspring.datasource.url=jdbc:postgresql://db/app\n\n# application.yml - same data\nserver:\n  port: 8080\nspring:\n  datasource:\n    url: jdbc:postgresql://db/app"
      },
      {
        description: "@ConfigurationProperties binds a group of keys to a type-safe class (record or POJO), with validation annotations and IDE completion — instead of scattering @Value(\"${...}\") through the code.",
        example: "Upload limits, bucket name and region belong to one UploadProperties injected wherever needed. Adding a config key = one field + one yml line, and @Validated fails startup on a missing/invalid value instead of exploding at 3am in production.",
        code: "@ConfigurationProperties(prefix = \"upload\")\n@Validated\npublic record UploadProps(@NotBlank String bucket, @Min(1) int maxMb) {}\n\n// @ConfigurationPropertiesScan or @EnableConfigurationProperties(UploadProps.class)"
      },
      {
        description: "A controller throws → DispatcherServlet asks HandlerExceptionResolvers → @ExceptionHandler (local) or @ControllerAdvice (global) maps it to a status and body. @RestControllerAdvice = @ControllerAdvice + @ResponseBody.",
        example: "One GlobalExceptionHandler translates NotFoundException → 404, ValidationException → 400 with field errors, anything unexpected → 500 plus a correlation id. Controllers stay free of try/catch boilerplate and every error has a consistent contract.",
        code: "@RestControllerAdvice\nclass GlobalExceptionHandler {\n  @ExceptionHandler(NotFoundException.class)\n  ResponseEntity<ProblemDetail> nf(NotFoundException e) {\n    return ProblemDetail.forStatusAndDetail(HttpStatus.NOT_FOUND, e.getMessage())...;\n  }\n  @ExceptionHandler(Exception.class)\n  ResponseEntity<ProblemDetail> boom(Exception e) { ... 500 ... }\n}"
      },
      {
        description: "@Controller resolves a view name through ViewResolver (server-rendered pages). @RestController = @Controller + @ResponseBody — return values are serialized straight into the response body (JSON/XML), no view step.",
        example: "A Thymeleaf page returns \"orders/list\" and the view layer renders orders/list.html. A REST endpoint returns the Order object itself and Jackson writes JSON — same mapping annotations, different output path.",
        code: "@Controller\nclass PageController {\n  @GetMapping(\"/home\") String home() { return \"home\"; }   // view name\n}\n@RestController\nclass ApiController {\n  @GetMapping(\"/api/orders/{id}\") Order one(...) { return order; }   // JSON body\n}"
      },
      {
        description: "@RequestMapping maps a handler to paths/methods/params; @GetMapping, @PostMapping, @PutMapping, @DeleteMapping, @PatchMapping are shortcuts that pin the HTTP method for you.",
        example: "@RequestMapping(\"/api/orders\") on the class plus @GetMapping(\"/{id}\") on a method = GET /api/orders/42. The same annotation carries consumes (Content-Type), produces (Accept) and params for content negotiation and conditional matching.",
        code: "@RestController\n@RequestMapping(\"/api/orders\")\nclass OrderApi {\n  @GetMapping(\"/{id}\") Order one(@PathVariable long id) { ... }\n  @PostMapping(consumes = \"application/json\")\n  ResponseEntity<Order> create(@Valid @RequestBody OrderDto dto) { ... }\n}"
      },
      {
        description: "@PathVariable takes a URL segment (/orders/42). @RequestParam takes a query string or form field (?page=2, required by default). @RequestBody deserializes the JSON payload of a POST/PUT.",
        example: "GET /orders/42 → path variable = identity. GET /orders?status=SHIPPED&page=2 → request params = filtering and paging. POST /orders with a JSON body → @RequestBody OrderDto = structured input, validated before the service runs.",
        code: "@GetMapping(\"/{id}\")\nOrder byId(@PathVariable long id);\n\n@GetMapping\nList<Order> search(@RequestParam(defaultValue = \"0\") int page,\n                   @RequestParam(required = false) String status);\n\n@PostMapping\nOrder create(@Valid @RequestBody OrderDto dto);"
      },
      {
        description: "@Valid on a @RequestBody parameter triggers Jakarta Bean Validation (@NotNull, @Min, @Email, @Size) — violations throw MethodArgumentNotValidException, which advice maps to 400 with per-field messages.",
        example: "A checkout POST with qty = -5 or a missing email is rejected at the edge with {\"qty\": \"must be greater than 0\"} — no service code runs, no bad data reaches the DB, and the frontend gets a precise error to render.",
        code: "record OrderDto(@NotBlank String email, @Min(1) int qty, @Email String notify) {}\n\n@PostMapping\nResponseEntity<Order> create(@Valid @RequestBody OrderDto dto) { ... }\n// violation -> MethodArgumentNotValidException -> 400 + field errors"
      },
      {
        description: "The browser blocks cross-origin calls unless the server answers with Access-Control-Allow-* headers; non-simple requests trigger an OPTIONS preflight that must also be allowed. Configure globally with addCorsMappings or per-endpoint @CrossOrigin.",
        example: "Frontend at app.example.com calling api.example.com: the browser first sends OPTIONS. If the API doesn't allow that origin, method and headers, the real request never leaves the browser — the console shows a CORS error even though the endpoint works in Postman. Allow credentials only with an explicit origin, never *.",
        code: "@Configuration\nclass CorsConfig implements WebMvcConfigurer {\n  @Override public void addCorsMappings(CorsRegistry r) {\n    r.addMapping(\"/api/**\")\n     .allowedOrigins(\"https://app.example.com\")\n     .allowedMethods(\"GET\", \"POST\", \"PUT\", \"DELETE\")\n     .allowCredentials(true).maxAge(3600);\n  }\n}"
      },
      {
        description: "Filter (auth, logging) → DispatcherServlet → HandlerMapping finds the controller → HandlerAdapter invokes it → message converters (Jackson) write the response. Errors go through @ExceptionHandler and come back on the same chain.",
        example: "GET /api/orders/42: the servlet maps it to OrderApi.one(), Jackson serializes JSON, a timing filter measured the whole trip. Knowing the chain localizes failures: 404 = no mapping, 415 = wrong Content-Type, 400 = validation, 500 = handler exception.",
        code: "// Filter (auth, logging) -> DispatcherServlet\n//   -> HandlerMapping -> HandlerAdapter -> @Controller method\n//   -> HttpMessageConverter (Jackson) -> response\n// errors: @ExceptionHandler -> same chain writes the error body"
      },
    ],
    scenarios: [
      {
        description: "By default only RuntimeException/Error trigger rollback, the call must go through the Spring proxy (self-invocation bypasses it), and the exception must actually escape the method — swallowed exceptions commit.",
        example: "A service catches its own exception to log it, or calls a @Transactional method on this inside the same bean — the transaction commits anyway and the data is half-written. Also classic: annotation on a private method (proxies can't see it) or a checked exception needing rollbackFor = Exception.class.",
        code: "// broken: self-invocation skips the proxy\nvoid place() { this.save(); }   // this.save() is a plain method call\n\n// fix: separate bean, or let the exception propagate\n@Transactional(rollbackFor = Exception.class)\nvoid save() { ... }"
      },
      {
        description: "Turn on the conditions report (--debug or debug=true) — Boot prints positive and negative matches for every auto-configuration with the @Conditional that decided it (OnClass, OnMissingBean, OnProperty).",
        example: "The DataSource bean you expected is missing. The report says DataSourceAutoConfiguration did not match because spring.datasource.url was not found — one line of evidence instead of hours of guessing which starter or property is missing.",
        code: "$ java -jar app.jar --debug\n# ============================\n# AUTO-CONFIGURATION REPORT\n# JdbcTemplateAutoConfiguration:\n#   Did not match: @ConditionalOnMissingBean (types: JdbcTemplate)"
      },
      {
        description: "N+1 = one query for the list plus one query per row for its children. Detect it in SQL logs/statistics, then fix with a fetch join, @EntityGraph, or batch fetching.",
        example: "An order list page runs SELECT orders, then 20 separate SELECT items — 21 round trips where one would do; 60ms becomes 600ms. Hibernate statistics or p6spy expose the pattern instantly; JOIN FETCH or @BatchSize collapses it back to 1-2 queries.",
        code: "// detect: repeated identical selects in the log / Hibernate statistics\n\n// fix 1: fetch join\nSELECT o FROM Order o JOIN FETCH o.items WHERE o.status = :s\n\n// fix 2: entity graph\n@EntityGraph(attributePaths = \"items\")\nList<Order> findTop20ByOrderByCreatedAtDesc();\n\n// fix 3: @BatchSize(size = 20) on the child entity"
      },
      {
        description: "@Version on the entity increments on every UPDATE; if someone else changed the row first, Hibernate throws OptimisticLockException — surfaced as 409 Conflict. Handle by re-reading and retrying or merging, never by blindly overwriting.",
        example: "Two support agents edit the same customer: the second save gets 409. The UI shows 'this record just changed — refresh?', reloads the fresh row and retries — the first agent's edit is never silently lost. Blind last-write-wins would discard it without a word.",
        code: "@Entity\nclass Customer { @Version long version; ... }\n\n@PutMapping(\"/{id}\")\nResponseEntity<?> update(@PathVariable long id, @RequestBody CustomerDto dto) {\n  try { return ok(service.save(id, dto)); }\n  catch (OptimisticLockingFailureException e) {\n    return status(HttpStatus.CONFLICT).body(\"stale data, reload\");\n  }\n}"
      },
      {
        description: "@RestControllerAdvice with ordered @ExceptionHandler methods maps domain exceptions to status codes and a problem-details body (RFC 7807), plus a catch-all that logs with a correlation id and never leaks stack traces.",
        example: "Controllers throw NotFoundException / BusinessRuleException freely; the advice returns {type, title, status, detail, correlationId} consistently for every endpoint. Clients rely on a stable contract, ops grep logs by correlation id, and internals stay server-side only.",
        code: "@RestControllerAdvice\nclass ApiExceptionHandler {\n  @ExceptionHandler(BusinessRuleException.class)\n  ProblemDetail business(BusinessRuleException e) { /* 409/422 + e.getCode() */ }\n\n  @ExceptionHandler(Exception.class)\n  ProblemDetail unexpected(Exception e) {\n    log.error(\"unhandled {}\", MDC.get(\"correlationId\"), e);\n    return ProblemDetail.forStatus(500);   // generic, no stack trace\n  }\n}"
      },
      {
        description: "Measure first, fix second: SQL log (N+1, missing index) → external calls (timeouts, serial vs parallel) → thread dumps for blocked threads → profiler for CPU → GC. Change one thing, re-measure.",
        example: "An endpoint takes 2.1s: p6spy shows one 15ms query repeated 40 times (N+1) plus two external HTTP calls at 800ms each, executed serially. Fetch join + parallel calls with 500ms timeout → 340ms total. actuator metrics show the p95 drop on the dashboard.",
        code: "management.endpoints.web.exposure.include: health,metrics,prometheus\n# http_server_requests_seconds{uri=\"/api/orders\"} — baseline per endpoint\n# then: SQL log (n+1), jstack (blocked threads), async-profiler -e cpu"
      },
      {
        description: "A → B → A cannot be constructed: Spring fails with BeanCurrentlyInCreationException. Fix with constructor injection (surfaces the cycle immediately), @Lazy to defer one side, or break the cycle via events / a shared abstraction — the real fix is usually redesign.",
        example: "OrderService and InventoryService inject each other via field @Autowired — it 'worked' on old Spring (hidden by proxies) and now fails at boot. Constructor injection turns it into a visible design smell: both sides truly need each other, so extract the shared rule or publish an event instead.",
        code: "// hidden cycle (field injection)\n@Service class A { @Autowired B b; }\n@Service class B { @Autowired A a; }\n\n// fix 1: @Lazy breaks construction-time cycle\n@Service class A { A(@Lazy B b) { this.b = b; } }\n// fix 2: extract shared logic or use ApplicationEvent"
      },
      {
        description: "Login issues a short-lived access token (JWT, ~15 min) plus a long-lived rotating refresh token. Requests carry the access token; on expiry the client silently refreshes; refresh tokens rotate on use and are revoked when reuse is detected.",
        example: "User logs in once a week: every API call sends the 15-minute access JWT; when it expires the app calls /auth/refresh transparently — no re-login prompt. A stolen refresh token gets one use before rotation invalidates the whole family.",
        code: "// login\nString access = JWT.create()\n  .withSubject(user.getId()).withClaim(\"roles\", roles)\n  .withExpiresAt(Date.from(now.plus(15, MINUTES)))\n  .sign(Algorithm.RSA256(null, privateKey));\n// request:  Authorization: Bearer <access>\n// 401 -> POST /auth/refresh (rotated) -> new access + refresh pair"
      },
      {
        description: "Wrap each call with timeout + retry + circuit breaker; collect results per feature; fail fast when a dependency is mandatory, degrade with defaults when it's optional — and bulkhead the pools so one slow API can't consume everything.",
        example: "A search page calls pricing, inventory and reviews: pricing is required (fail the request → 502 + retry page) while inventory and reviews are optional — render 'temporarily unavailable' placeholders. Resilience4j bulkheads keep the reviews outage from eating the whole connection pool.",
        code: "CompletableFuture<Price> p = supplyAsync(() -> priceApi.get(id))\n  .orTimeout(500, MILLISECONDS);                    // mandatory: may propagate\nCompletableFuture<Stock> s = supplyAsync(() -> stockApi.get(id))\n  .orTimeout(500, MILLISECONDS)\n  .exceptionally(e -> Stock.unknown());              // optional: degrade\n"
      },
      {
        description: "Externalized config and secrets, liveness/readiness probes, structured logs with correlation id, metrics and tracing, timeouts on every remote call, graceful shutdown, resource limits, alerts with a runbook.",
        example: "Before go-live: K8s probes wired to /actuator/health, JSON logs carrying the request id, Prometheus dashboards for p95 latency and error rate, server.shutdown=graceful for zero-downtime deploys, sane container heap flags. The 3am page links straight to the dashboard and the runbook.",
        code: "management.endpoints.web.exposure.include: health,metrics,prometheus\nmanagement.endpoint.health.probes.enabled: true\nserver.shutdown: graceful\nspring.lifecycle.timeout-per-shutdown-phase: 30s\nlogging.pattern.console: \"%d %X{traceId} %-5level %logger - %msg%n\""
      },
    ],
  },
  microservices: {
    important: [
      {
        description: "A monolith is one deployable with a shared database and in-process calls — simple but coupled. Microservices are small, independently deployable services owning their data — autonomous teams, at the price of network failures, eventual consistency and heavier operations.",
        example: "A 5-person startup ships one monolith daily — fastest path to product. At 50 devs, every release needs three teams to coordinate → split by bounded context (orders, payments, catalog): each team deploys on its own. The bill comes due as distributed tracing, sagas and on-call complexity.",
        code: ""
      },
      {
        description: "Each service owns its schema exclusively — no other service reads it directly, all access goes through the owning service's API. Independent deployment and schema evolution; the cost is you can no longer JOIN across services.",
        example: "Orders can't SELECT from the users table — it calls the User API, or consumes UserChanged events into a local read model. 'Show the buyer name on the order page' becomes API composition or event replication, never a cross-service join.",
        code: ""
      },
      {
        description: "Sync (REST/gRPC): the caller waits — right for queries needing an answer now, but couples availability and latency. Async (events/queues): fire-and-forget — decoupled in time, survives downstream outages, ideal for side effects and fan-out.",
        example: "Confirming an order checks stock synchronously (the answer is needed this second). Then 'OrderPlaced' is published async: email, analytics and loyalty each react independently — the email service being down doesn't block a single order.",
        code: "// query: answer needed now (sync)\nGET /inventory/stock/SKU-1  ->  200 OK, 200ms budget\n\n// process: answer not needed (async)\npublish(\"OrderPlaced\", event);   // consumers react independently"
      },
      {
        description: "An API Gateway is the single entry point: routing, TLS, authentication/authorization, rate limiting, request aggregation and cross-cutting observability — clients know one URL, not the service topology.",
        example: "The mobile app calls api.shop.com: the gateway validates the JWT, rate-limits each client, routes /orders → order-service and /search → search-service (rerouting traffic without an app release), and aggregates the home page from five services in one response.",
        code: "spring:\n  cloud:\n    gateway:\n      routes:\n        - id: orders\n          uri: lb://order-service\n          predicates: Path=/api/orders/**\n# cross-cutting filters: JWT auth, rate limiter, correlation-id"
      },
      {
        description: "Instances change constantly — services register with a registry (Eureka, Consul, or Kubernetes DNS) and clients resolve names to healthy addresses with load balancing and health checks built in.",
        example: "order-service pods register on startup; inventory-service asks for healthy instances and round-robins across them. A pod dies → fails health check → removed within seconds and traffic shifts — no hardcoded IPs, no config redeploy when you scale out.",
        code: "// client-side load balancing\n@LoadBalanced @Bean RestTemplate restTemplate() { ... }\nrestTemplate.getForObject(\"http://inventory-service/stock/{id}\", Stock.class, id);\n\n// k8s: DNS discovery — order-service.default.svc.cluster.local -> pod IPs"
      },
      {
        description: "A saga is a sequence of local transactions; if one step fails, compensating actions undo the previous ones. Choreography: services react to each other's events. Orchestration: a central coordinator drives the flow — clearer, but a single point of logic that must itself be reliable.",
        example: "Order → reserve stock → charge payment → confirm. Choreography: StockReserved triggers PaymentCaptured; PaymentFailed publishes StockReleaseRequested. Orchestration: a PaymentOrchestrator executes each step and on failure explicitly calls release + refund — the whole flow lives in one readable class.",
        code: "// orchestration\nlong reservation = inventory.reserve(order);\ntry { payment.charge(order); }\ncatch (PaymentFailed e) { inventory.release(reservation); throw e; }\n\n// choreography\nOrderPlaced -> StockReserved -> PaymentCaptured\n                    \\-> StockReleaseRequested (on failure)"
      },
      {
        description: "Timeout caps every call. Retry heals transient faults (bounded, with backoff + jitter). Circuit breaker stops calling a failing dependency (open → half-open → closed). Bulkhead caps concurrency per dependency so it can't drain the whole pool.",
        example: "The inventory API starts returning 500s: without protection, order threads queue behind it and the entire service collapses. After repeated failures the breaker opens — calls fail fast in milliseconds with a fallback answer — and half-open probes detect recovery. Blind retries would multiply the load 3x and finish the job off.",
        code: "CircuitBreaker cb = CircuitBreaker.of(\"inventory\",\n  CircuitBreakerConfig.custom()\n    .failureRateThreshold(50)\n    .slidingWindowSize(10)\n    .waitDurationInOpenState(Duration.ofSeconds(30)));\n\nStock s = Decorators.ofSupplier(() -> inventory.get(id))\n  .withCircuitBreaker(cb)\n  .withRetry(Retry.ofDefaults(\"retry\"))\n  .withFallback(List.of(Exception.class), e -> Stock.unknown())\n  .get();"
      },
      {
        description: "CQRS separates the write model from the read model, each optimized for its job. Event sourcing stores the immutable event stream as the source of truth — current state is derived by replaying events.",
        example: "The orders write service enforces invariants in a normalized table, while a denormalized read model answers dashboard queries with zero joins. With event sourcing, 'OrderShipped' is a permanent record: rebuild any projection, audit any decision, replay last month to debug — but queries always hit a materialized view, never the event store.",
        code: "// write side\napply(new OrderShipped(orderId, Instant.now()));   // append event\n\n// read side (projection)\n@EventListener void on(OrderShipped e) { readModel.update(e); }\n\n// state = fold(events) — replay to rebuild a model"
      },
      {
        description: "A centralized config source (Spring Cloud Config, git-backed, or K8s ConfigMaps) gives one versioned place for every service's settings — with environment overrides, audit history and dynamic refresh — instead of per-service env files drifting apart.",
        example: "The payment timeout must change across 12 services: one commit in the config repo changes all of them, and git blame answers 'who changed this and why'. Without it: 12 hand-edited YAMLs, silent drift between environments and no audit trail.",
        code: "# config client\nspring:\n  config:\n    import: optional:configserver:http://config-server:8888\n  application:\n    name: order-service\n# server serves order-service-prod.yml from git\n@RefreshScope @RestController   // /actuator/refresh picks up changes"
      },
      {
        description: "Every request gets a traceId at the edge, propagated across services (W3C traceparent / X-Request-Id); spans record each hop; the same id lands in MDC so logs, metrics and the latency waterfall can be stitched together (OpenTelemetry → Zipkin/Jaeger).",
        example: "A user reports a slow checkout: the traceId from their error screen opens the full waterfall — gateway 8ms → orders 120ms → payments 1.9s (timeout retry). Without propagation you'd grep six services' logs by timestamp and never prove which hop caused it.",
        code: "server:\n  tracing:\n    propagation: w3c\nlogging.pattern.console: \"%d %X{traceId} %-5level %logger - %msg%n\"\n\n// traceparent: 00-<trace-id>-<span-id>-01\n// OTel agent -> Zipkin/Tempo -> waterfall per traceId"
      },
      {
        description: "Docker packages app + dependencies into an immutable image; a container runs one instance. Kubernetes schedules them: Deployments manage replicas and rolling updates, Services give stable discovery, ConfigMaps/Secrets inject config, HPA scales on load, probes drive self-healing.",
        example: "The identical image runs in dev, staging and prod. A rollout to v2 surges pods gradually with readiness gates so no request hits a dead instance; a crash loop backs off and restarts itself; HPA adds replicas at 70% CPU — ending 'works on my machine' and manual scaling.",
        code: "apiVersion: apps/v1\nkind: Deployment\nspec:\n  replicas: 3\n  template:\n    spec:\n      containers:\n        - name: orders\n          image: shop/order-service:1.4.2\n          readinessProbe:\n            httpGet: { path: /actuator/health/readiness, port: 8080 }\n# + Service (discovery), HPA (autoscaling), ConfigMap/Secret (config)"
      },
      {
        description: "An idempotent operation behaves the same no matter how many times it runs. Clients send an Idempotency-Key; the server stores key → response and replays it on retries, with a unique constraint preventing races.",
        example: "A payment times out — did the charge go through? The client retries with the same key; the server finds it and returns the original response instead of charging twice. Network retries are ambiguous by nature; idempotency makes them safe.",
        code: "POST /payments\nIdempotency-Key: 8f14e45f-ea1b-4c9a-...\n\n// server\nif (repo.exists(key)) return repo.findResult(key);   // replay\n// DB: PRIMARY KEY (key) — unique index is the race-proof backstop"
      },
      {
        description: "Strong consistency: every read right after a write sees it (single-transactional store). Eventual consistency: reads may lag until events propagate — the realistic choice across services, since distributed 2PC sacrifices availability. Design for it explicitly.",
        example: "After 'pay', the confirmation page must show paid → read-your-writes by querying the service that wrote it. The analytics board showing it 300ms later is fine. Money movement across services uses a saga + outbox, not a distributed transaction — and reconciliation jobs mop up the rare drift.",
        code: "-- strong: single-DB transaction\nBEGIN; UPDATE accounts SET bal = bal - 100 WHERE id = 1; COMMIT;\n\n// eventual: event published, read model lags ~300ms (acceptable)\n// read-your-writes: route the user's next read to the write service\n// never: UPDATE another service's tables directly"
      },
      {
        description: "Each consumer publishes what it expects from a provider (the contract); the provider verifies all consumer contracts in CI — breaking changes fail the build before deployment, with no full end-to-end environment needed. Pact is the classic tool.",
        example: "Billing depends on GET /users/{id} returning {id, email}. Someone renames email → mail in user-service: provider CI immediately fails against Billing's contract — instead of the break surfacing two weeks later in staging, or in production at midnight.",
        code: "// consumer test defines the contract\npact = consumer(\"billing\").hasPactWith(\"user-service\")\n  .uponReceiving(\"get user\").matchRequest(\"/users/42\")\n  .willRespondWith(200, body(id, email));\n\n// provider CI: pact-verify runs every published consumer contract\n// -> build fails if a change breaks any consumer"
      },
      {
        description: "A service mesh puts a sidecar proxy (Envoy) beside every pod and moves cross-cutting traffic concerns — mTLS, retries, timeouts, traffic splitting, metrics — from application code into infrastructure, controlled centrally (Istio, Linkerd).",
        example: "Enable mTLS everywhere and give the new order version 10% of traffic — pure config, zero code changes, no redeploy of application logic. Every service gets golden metrics for free. The trade-off: an extra layer with its own upgrades, memory overhead and failure modes.",
        code: "apiVersion: networking.istio.io/v1beta1\nkind: VirtualService\nspec:\n  http:\n    - route:\n        - destination: { host: orders, subset: v1 }, weight: 90\n        - destination: { host: orders, subset: v2 }, weight: 10\n# PeerAuthentication: mTLS STRICT for the namespace"
      },
      {
        description: "Authenticate internal calls with OAuth2 client-credentials JWTs (identity + audience) and encrypt/authenticate the channel with mTLS — or both via a mesh (SPIFFE). Verify every inbound claim; never trust identity headers you haven't validated.",
        example: "order-service calls payment-service carrying the user's JWT plus an audience claim restricted to 'payments'. payment-service verifies signature, expiry and audience itself, while mTLS proves the peer really is an in-cluster order-service pod — not a random workload that found the port.",
        code: "// outgoing\nHttpRequest req = HttpRequest.newBuilder(uri)\n  .header(\"Authorization\", \"Bearer \" + userJwt)\n  .header(\"X-Request-Id\", traceId)\n  .POST(body)\n  .build();\n// incoming: verify signature + exp + aud; mTLS between pods (mesh)"
      },
      {
        description: "Backpressure tells the producer to slow down (bounded queues, reactive streams, 429 responses). Rate limiting caps request rate per client (token bucket) at the edge — protecting capacity before queues balloon latency.",
        example: "Flash sale at 10x normal traffic: without limits, the orders DB drowns and everything times out. The gateway's token bucket admits 100 rps and answers the rest with 429 + Retry-After — predictable latency for those let in, clear signal for those not, capacity never exceeded.",
        code: "TokenBucket bucket = new TokenBucket(capacity = 100, refillPerSec = 100);\n\nif (bucket.tryAcquire()) handle(req);\nelse { response(429, \"Retry-After: 1\"); }   // shed load fast\n\n// bounded queue = backpressure: full -> reject, never grow unbounded"
      },
      {
        description: "Expand-contract: (1) expand — add the new column/table alongside the old, dual-write; (2) migrate data; (3) switch reads to the new schema; (4) contract — drop the old, in a LATER release. Old and new app versions must coexist throughout.",
        example: "Renaming full_name → name: never ALTER in one deploy. Release A adds name and backfills; release B writes both and reads name; weeks later release C drops full_name. At no point does a running old version hit a column that no longer exists — rolling deploys stay safe.",
        code: "-- release A (expand)\nALTER TABLE users ADD COLUMN name VARCHAR(100);\nUPDATE users SET name = full_name WHERE name IS NULL;   -- backfill\n\n-- release B: write name + full_name, read name\n-- release C (weeks later, contract)\nALTER TABLE users DROP COLUMN full_name;"
      },
      {
        description: "Bounded context (DDD): a boundary where each domain concept has exactly one meaning (Catalog's Product ≠ Shipping's Product). An anti-corruption layer translates external/legacy models into yours once, so foreign concepts never leak into your domain code.",
        example: "The legacy billing system calls everything a 'deal' with 40 fields; orders needs three. A single adapter maps Deal → Invoice at the boundary — when legacy renames a field, you change one class, not twenty services. Two teams merging vocabularies each keep their own model behind the ACL.",
        code: "class LegacyDealAdapter {\n  Invoice toInvoice(LegacyDeal d) {\n    return new Invoice(d.getDealId(), d.getAmtCents() / 100.0, mapStatus(d.getSt()));\n  }\n}\n// domain code never sees LegacyDeal — the ACL is the only door"
      },
      {
        description: "Logs = discrete events (why it failed), metrics = aggregated numeric time series (how often/how slow, cheap to alert on), traces = one request's path across services (where the time went). Correlation ids tie all three together.",
        example: "An alert fires on error rate (metrics) → the dashboard shows checkout p95 climbing (metrics) → one trace reveals payments is the slow hop (traces) → its traceId greps the exact log lines with the stack trace (logs). Each pillar alone is half-blind; together they answer any 'what happened'.",
        code: "// metrics: error rate, p95, queue depth -> Prometheus + Grafana + alerts\n// logs: structured JSON with traceId -> ELK / Loki\n// traces: spans across services -> OpenTelemetry -> Tempo / Zipkin\n// workflow: alert -> dashboard -> trace -> log (same id everywhere)"
      },
    ],
    scenarios: [
      {
        description: "Every step is a local transaction that publishes an event; when one step fails, compensating actions undo the completed steps in reverse order — never a distributed lock.",
        example: "Order saga: reserve stock (10-min hold), charge payment, confirm order. Payment declined → compensate: release the reservation, mark the order FAILED with a reason. The saga state machine records where it stopped, so a retry resumes safely instead of double-charging.",
        code: "res = inventory.reserve(order);          // local tx + event\ntry {\n  payment.charge(order);                   // local tx\n  orders.confirm(order);\n} catch (PaymentFailed e) {\n  inventory.release(res);                  // compensation\n  orders.cancel(order, e.reason());\n  throw e;\n}"
      },
      {
        description: "Dedupe on a deterministic event id: store processed ids in a table with a unique key — the first message inserts and processes, a redelivery collides and is skipped. Make the business operation itself idempotent too (unique charge id).",
        example: "payment-processed(evt#123) arrives twice because a consumer crashed after processing but before committing the offset. The handler inserts evt#123 into processed_events; the second insert throws DuplicateKeyException → ack and move on. Money moves exactly once, ever.",
        code: "@EventListener\nvoid on(PaymentProcessed e) {\n  try { processedRepo.insert(e.eventId()); }        // PK = eventId\n  catch (DuplicateKeyException dup) { return; }      // already handled\n  wallet.credit(e.accountId(), e.amount());          // runs exactly once\n}"
      },
      {
        description: "The circuit breaker fails fast instead of queueing doomed calls; the bulkhead (semaphore or pool limit) caps concurrency per dependency so its latency cannot consume every thread in the service.",
        example: "The shipping API degrades to 10s responses: before, every order thread waited 30s until Tomcat's pool emptied — a total outage. Now the breaker opens after repeated failures (calls return a fallback in ms) and max 20 concurrent shipping calls protect the rest of the service — checkout keeps serving.",
        code: "CircuitBreaker cb = CircuitBreaker.of(\"shipping\",\n  CircuitBreakerConfig.custom()\n    .failureRateThreshold(50)\n    .slowCallDurationThreshold(Duration.ofSeconds(2))\n    .slidingWindowSize(10));\nBulkhead bh = Bulkhead.of(\"shipping\",\n  BulkheadConfig.custom().maxConcurrentCalls(20));\n// breaker open -> fallback; bulkhead -> pool never exhausted"
      },
      {
        description: "Generate a correlation id at the gateway, propagate it downstream (X-Request-Id / traceparent), put it into MDC for every log line, and return it in error responses — one id stitches six services into one story.",
        example: "A ticket says 'checkout failed at 14:03': the traceId from the user's error screen greps gateway → orders → payments → bank-adapter logs in seconds. OpenTelemetry renders the same correlation as a latency waterfall automatically.",
        code: "// gateway filter\nString traceId = firstNonNull(req.getHeader(\"X-Request-Id\"), randomUUID());\nMDC.put(\"traceId\", traceId);              // pattern: %X{traceId}\nforwarded.add(\"X-Request-Id\", traceId);   // next service logs it too\n// error body: { \"traceId\": \"...\" } -> support can grep it"
      },
      {
        description: "Strangler fig: put a facade in front of the monolith, route one use case to the new service, shadow-read to compare, flip traffic per use case, then delete the old module — no big-bang rewrite, rollback = a routing flag.",
        example: "Order module of a 10-year-old monolith: the facade proxies /checkout to the new Order Service while inventory and catalog stay put. Shadow reads compare both outputs until parity holds, then reads flip, then writes, one use case at a time — old code dies only when nothing references it.",
        code: "if (path.startsWith(\"/checkout\")) route(orderService);   // strangled out\nelse route(monolith);\n\n// order: 1) proxy  2) shadow reads  3) compare  4) flip writes  5) drop old code"
      },
      {
        description: "Additive-only changes within a version: new optional fields are safe; never rename, remove or reorder in place. Consumers must ignore unknown fields; deprecate with a sunset date; bump a major version only when unavoidable.",
        example: "orders v1 returns {id, total}: adding currency as an optional field keeps old clients working (they ignore it). Removing 'total' would break every consumer at once — instead mark it deprecated, migrate clients to 'grandTotal', watch usage drop to zero, and only then remove it.",
        code: "// additive change — safe for all consumers\n{ \"id\": 1, \"total\": 10.0, \"currency\": \"EUR\" }\n// consumer: ignore unknown fields (Jackson FAIL_ON_UNKNOWN_PROPERTIES=false)\n// removal: deprecated in 1.2 -> sunset 1.9 -> gone in 2.0"
      },
      {
        description: "Sharing one database recreates coupling — the fix is replication: the owning service publishes change events, consumers maintain a local projection. Direct table sharing is only ever a temporary, documented shortcut.",
        example: "Reporting needs catalog prices, but orders must not query the catalog DB — its next schema change would break orders. Catalog publishes ProductChanged events and orders keeps its own product_read table updated by consumers: each service owns its data and still shows consistent prices.",
        code: "// producer\npublish(new ProductChanged(id, price, version));\n\n// consumer builds its own read model\n@EventListener void on(ProductChanged e) { localProductRepo.upsert(e.toRow()); }\n// orders DB owns product_read — catalog's schema changes never touch it"
      },
      {
        description: "Run both versions in parallel behind one facade: add the new contract alongside the old, migrate clients, keep the old path as an adapter, and remove it only when metrics prove zero traffic — no flag day.",
        example: "Changing POST /orders' response shape: ship /orders/v2, move the mobile app over two weeks, and watch v1 access logs. When v1 sits at zero requests for a week, delete it. Old and new clients coexist the entire migration; rollback is pointing traffic back.",
        code: "@PostMapping(\"/orders/v2\") OrderV2 createV2(@Valid @RequestBody OrderDto dto)\n// v1 adapter still serves old clients\n// removal gate:\nhttp_server_requests_seconds_count{uri=\"/orders\"}  // flatlines at 0 -> drop v1"
      },
      {
        description: "Cache miss storm: everyone misses at once and hits the DB together. Fixes: request coalescing / singleflight (one DB call per key), TTL jitter so keys don't expire together, stale-while-revalidate, negative caching, and a hard limit on DB concurrency.",
        example: "A deploy flushes Redis at peak: 5k req/s all request the same product → DB collapses. With coalescing, only one query runs and the other 4,999 wait milliseconds for its result. Adding ±30s of TTL jitter ensures next time's expirations never align either.",
        code: "// singleflight / coalescing — one loader per key\nCache.get(key, () -> db.load(key));     // concurrent callers wait & share\n\n// TTL jitter + stale-while-revalidate\ncache.put(key, v, ttl.plus(random(0, 30s)));\nif (stale) return old; refreshAsync(key);   // serve, don't stampede"
      },
      {
        description: "Scale out (HPA on CPU/RPS), shed load early (429 + Retry-After, bounded queues), degrade non-essential work (defaults for enrichment, pause batch jobs), and prioritize the critical path over background tasks.",
        example: "Payments hit 10x normal load: HPA adds pods, the gateway rate-limits partner traffic, nightly reports pause, and optional enrichment returns defaults — interactive latency stays flat because load is rejected or deferred instead of queueing behind everything.",
        code: "# HPA\nmetrics:\n  - type: Resource\n    resource: { name: cpu, target: { averageUtilization: 70 } }\n\n// app: bounded queue — when full, reject fast (429 + Retry-After)\n// prioritize: interactive pool > batch executor; pause non-critical jobs"
      },
    ],
  },
  kafka: {
    important: [
      {
        description: "Kafka is a distributed commit log / event streaming platform: producers append immutable events to topics, consumers read at their own pace — durable, horizontally scalable and replayable.",
        example: "Every order and payment change is published once; search, analytics, email and warehouse services each consume independently — the order service never needs to know who's listening. With 7-day retention, a new consumer can replay history from the start.",
        code: "# produce\nkafka-console-producer --broker-list localhost:9092 --topic orders\n# consume from the beginning with a group\nkafka-console-consumer --topic orders --from-beginning --group analyzer"
      },
      {
        description: "Brokers form the cluster. A topic is split into partitions — each an ordered, immutable append log with monotonically increasing offsets. Producers write, consumer groups read; replication across brokers gives durability; KRaft (formerly ZooKeeper) holds cluster metadata.",
        example: "topic orders with 12 partitions on 3 brokers means 4 partitions stored per broker, each with its own offset sequence (0,1,2…). A consumer's 'position' is simply the next offset it will read inside its assigned partitions.",
        code: "orders (topic, RF=3, 12 partitions)\n  partition-0  [leader @ broker-1]  offsets 0,1,2,...  retention 7d\n  partition-1  [leader @ broker-2]\n  ...\nmetadata: KRaft quorum (ZooKeeper in older clusters)"
      },
      {
        description: "Broker = a server storing data. Topic = a named stream. Partition = an ordered shard of a topic. Offset = a record's position in its partition. Producer writes, consumers read, a consumer group shares a topic's partitions.",
        example: "producers (checkout, payment) append to topic 'orders'; consumer group 'billing' with 4 consumers covers all 16 partitions; an offset like 4,813,992 is just that message's row number inside its partition.",
        code: "Producer --> Broker --> Topic = { P0 [offsets 0..n], P1 [...], ... } <-- Consumer(group)"
      },
      {
        description: "Partitions are Kafka's unit of parallelism: more partitions = more consumers and throughput, plus room for replication. The trade-off: ordering is guaranteed only within a single partition.",
        example: "A one-partition topic can never be consumed faster than one consumer. 16 partitions let a group run 16 consumers in parallel across brokers. That's why throughput-heavy topics get many partitions — and why global ordering across a topic is impossible at scale.",
        code: "throughput ~ partitions x per-consumer rate\nordering: per partition only\nsame key -> same partition (ordering per key, parallelism across keys)"
      },
      {
        description: "With a key: hash(key) % numPartitions, so the same key always lands in the same partition. Without a key: round-robin or sticky partitioning (fill one partition per batch, then move). A custom Partitioner can override.",
        example: "All events for user 42 use key=\"user-42\" — they all land in partition 7 and are consumed strictly in order. Keyless metrics spread round-robin so no single partition becomes a hotspot.",
        code: "partition = Math.abs(murmur2(key) % numPartitions);\n// same key -> same partition -> per-key ordering\n// no key -> sticky/round-robin for even load"
      },
      {
        description: "A consumer group shares a group id: the group receives every message exactly once as a whole, with partitions divided among members — each partition owned by exactly one consumer in the group. Different groups read independently (broadcast).",
        example: "group 'billing' with 4 consumers over 16 partitions → 4 partitions each. Scale to 8 → rebalance → 2 each. group 'analytics' separately also reads 100% of messages — groups are Kafka's broadcast mechanism.",
        code: "props.put(\"group.id\", \"billing\");\nconsumer.subscribe(List.of(\"orders\"));\n// each partition: one consumer per group\n// other groups see all messages independently"
      },
      {
        description: "The coordinator divides partitions as evenly as possible (round-robin / sticky assignor): each partition to one consumer; if there are more consumers than partitions, the extras sit idle.",
        example: "10 partitions / 4 consumers → 3,3,2,2. Add a 5th → rebalance, partitions move (committed offsets mean no loss, just a short pause). 12 consumers on 10 partitions → 2 consumers get nothing — never run more consumers than partitions.",
        code: "10 partitions / 4 consumers -> [3,3,2,2]\n12 consumers / 10 partitions -> 2 idle\nrebalance on join/leave: revoke + reassign (COOPERATIVE sticky avoids full stop)"
      },
      {
        description: "The coordinator triggers a rebalance: consumers stop, partitions are revoked and reassigned, processing resumes from committed offsets. Heartbeats/session timeout detect dead members; max.poll.interval.ms detects consumers that are too slow.",
        example: "A rolling deploy adds a new pod: group pauses for a second or two, partitions redistribute, and consumption continues — no messages lost (offsets committed), though some in-flight records may be processed twice (at-least-once).",
        code: "session.interval.ms / heartbeat  -> liveness detection\nmax.poll.interval.ms            -> too-slow consumer evicted -> rebalance\ngroup.instance.id               -> static membership: restarts don't rejoin"
      },
      {
        description: "An offset is a record's sequential id inside a partition (0,1,2…). The consumer's position is the next offset to read; committed offsets are stored per group+partition in the internal __consumer_offsets topic.",
        example: "A consumer processed through 4999 and committed 5000. It crashes, restarts, and resumes at 5000 — nothing skipped. If no commit exists (brand-new group), auto.offset.reset (earliest/latest) decides where it starts; seek() can jump anywhere, including replaying from 0.",
        code: "__consumer_offsets: (group, partition) -> committed offset\nauto.offset.reset = earliest | latest     // fresh group, no commit\nconsumer.seek(tp, 0L)                     // manual replay"
      },
      {
        description: "Ordering is guaranteed only within one partition (single producer session). Cross-partition ordering requires sacrificing throughput; retries can reorder unless you use an idempotent producer or max.in.flight=1.",
        example: "Key events by userId and that user's sequence stays in order — created, paid, shipped. A retry after a network blip could otherwise deliver an older record after a newer one: enable.idempotence=true with acks=all prevents it while keeping pipelining.",
        code: "props.put(\"enable.idempotence\", true);\nprops.put(\"acks\", \"all\");\n// strictest order (lower throughput):\nprops.put(\"max.in.flight.requests.per.connection\", 1);"
      },
      {
        description: "acks=0: fire-and-forget, may lose. acks=1: leader acknowledges alone — fast, but loss if the leader fails before replication. acks=all/-1: every in-sync replica acknowledges — safest and slowest (pair with min.insync.replicas).",
        example: "Payment events use acks=all + min.insync.replicas=2: the leader dies right after the write and a synced follower still has the record — zero loss. Internal telemetry with acks=0 accepts losing a few points in exchange for maximum speed.",
        code: "acks=0    // no confirmation; fastest; possible loss\nacks=1    // leader only; loss if leader fails pre-replication\nacks=all  // all ISR ack; safe with min.insync.replicas=2"
      },
      {
        description: "The replication factor is how many copies of each partition exist across brokers. RF=1 loses data on broker failure; RF=3 is standard — survives one broker loss without data loss. Higher RF costs more storage and replication traffic.",
        example: "RF=3 on a 3-broker cluster: leader + 2 followers on different brokers. One broker dies → its leaders promote from the ISR with zero loss. RF=5 only pays off if you must survive two simultaneous failures.",
        code: "kafka-topics --create --topic orders \\\n  --partitions 12 --replication-factor 3\n# plus: min.insync.replicas=2 — tolerates 1 failure, no data loss"
      },
      {
        description: "Every partition has one leader that serves all reads and writes; followers replicate from it. Only the leader talks to clients. If the leader dies, an ISR follower is promoted by the controller.",
        example: "Partition-5's leader is broker-2: producers and consumers connect only to it; brokers 1 and 3 follow. b2 crashes → the controller elects a synced follower within seconds and clients reconnect transparently — kafka-topics --describe shows the new Leader.",
        code: "kafka-topics --describe --topic orders\n  Partition:5  Leader:2  Replicas:2,1,3  Isr:2,1,3\n// leader failure -> controller promotes a replica that is in Isr"
      },
      {
        description: "The controller detects the dead broker (session timeout), elects new leaders for its partitions from the ISR, and clients refresh metadata and reconnect. Data is lost only when too few replicas survived (unclean election or RF=1).",
        example: "One of three brokers dies at 2am: ~40 partitions promote leaders in a couple of seconds and producers' retries cover the gap — RF=3 with min.insync=2 means zero acknowledged messages lost. With RF=1 you just lost that broker's partitions permanently.",
        code: "# controller: onBrokerFailure -> elect leader from Isr\n# clients: metadata refresh -> reconnect (retries cover the window)\n# monitor: under-replicated partitions = 0, live brokers = expected"
      },
      {
        description: "ISR = the replicas fully caught up with the leader. acks=all waits only for the ISR; a follower lagging past replica.lag.time.max.ms is evicted and rejoins when caught up. unclean.leader.election decides whether a non-ISR replica may take over (availability vs data loss).",
        example: "Describe shows Isr:2,1,3 — all healthy. Broker-3 lags 30s (network hiccup) → Isr:2,1. If b2 now dies, b1 (still in sync) takes over with no loss. Had both followers been out of ISR, an unclean election would trade data loss for availability — which is why it's off by default.",
        code: "replica.lag.time.max.ms=30000       // eviction threshold\nunclean.leader.election.enable=false // default: never elect unsynced leaders\n# Isr shrinks/grows -> alert on under-replicated partitions"
      },
      {
        description: "auto-commit (enable.auto.commit=true) commits every auto.commit.interval.ms during poll — a crash between commit and processing skips unprocessed messages. Manual commit processes first, then commits: never a skip, worst case a duplicate.",
        example: "Processing takes 5s while auto-commit fires at 2s: crash → the committed offset is already past messages that were never handled → silent data loss. Manual sync commit after the DB write removes that window entirely — that's the single most important consumer setting.",
        code: "props.put(\"enable.auto.commit\", false);\nwhile (running) {\n  ConsumerRecords rs = consumer.poll(Duration.ofMillis(1000));\n  process(rs);            // -> DB / side effects\n  consumer.commitSync();  // commit AFTER success\n}"
      },
      {
        description: "The messages processed since the last commit are re-delivered from that offset after restart — at-least-once semantics. With no commit at all (brand-new group), auto.offset.reset picks earliest or latest.",
        example: "A consumer processed offsets 51-100 but committed only 50 before crashing → on restart it reprocesses 51-100. Nothing is lost, but side effects run twice — which is why handlers must be idempotent. Setting reset=earliest on a new group re-reads the whole topic.",
        code: "last committed offset: 50\nprocessed before crash: 51..100\nrestart -> poll resumes at 51 -> reprocess 51..100 (duplicates)\n// therefore: idempotent handler (event-id dedup)"
      },
      {
        description: "Kafka guarantees at-least-once across restarts and rebalances — deduplicate downstream: a unique event-id table, idempotent upserts keyed by business id, or the downstream system's own natural dedup key.",
        example: "A rebalance rolls offsets back and 500 payment events replay. The handler inserts event_id into processed_events (PK) — replays collide and are skipped — while the charge carries chargeId so the bank also rejects duplicates. Effectively exactly-once, without distributed transactions.",
        code: "try { processedRepo.insert(e.eventId()); }      // PK = event id\ncatch (DuplicateKeyException dup) { return; }   // replay -> skip\npayments.charge(e.chargeId(), e.amount());      // chargeId deduped at bank\n\n// or upsert: INSERT ... ON CONFLICT (id) DO UPDATE"
      },
      {
        description: "At-most-once: commit before processing (can lose). At-least-once: process then commit (can duplicate — the practical default). Exactly-once: Kafka EOS — idempotent producer + transactions atomic across output writes and offset commits.",
        example: "Metrics tolerate at-most-once. Business events use at-least-once plus an idempotent consumer. Kafka→Kafka money pipelines turn on exactly_once_v2 so the produced records and the consumed offsets commit as one transaction.",
        code: "// at-least-once (typical)\nprocess(); consumer.commitSync();\n// exactly-once for Kafka -> Kafka flows\nprops.put(\"processing.guarantee\", \"exactly_once_v2\");"
      },
      {
        description: "From peak throughput (partitions ≥ target MB/s ÷ per-partition capacity), consumer parallelism (consumers ≤ partitions) and broker count — balanced against cost: each partition costs files, memory, replica traffic and longer rebalances. Increasing is easy; decreasing needs a new topic.",
        example: "Need 60 MB/s at a safe 15 MB/s per partition → 4-8 partitions with 2x headroom gives 8-16; you also want at least as many partitions as consumers. 1,000 partitions on 3 brokers means sluggish rebalances and idle consumers — partition count is effectively a one-way door.",
        code: "partitions ~ ceil(peakMBs / 15) * 2   // headroom\nlimits: consumers <= partitions; ~2-4k partitions per broker\n// shrinking: create new topic + re-create data (destructive)"
      },
    ],
    scenarios: [
      {
        description: "Rebalance loops come from consumers exceeding max.poll.interval.ms, too-slow batches, session timeouts (GC/network) or constant deploys. Fix: raise the interval above the worst batch time, shrink batches, use static membership and the cooperative sticky assignor.",
        example: "A consumer processes a 12-minute batch while max.poll.interval.ms is 5 minutes: the coordinator evicts it, a rebalance moves its partitions to another consumer that also gets a fat batch and is evicted — an endless loop with ~zero throughput. Raising the interval to 10 minutes AND processing in small batches breaks the cycle.",
        code: "max.poll.interval.ms=600000    // > worst-case batch time\nmax.poll.records=500           // smaller batches between polls\npartition.assignment.strategy=CooperativeStickyAssignor\ngroup.instance.id=pod-$(ORDINAL)   // static membership: no rejoin on restart"
      },
      {
        description: "Lag = log-end offset − committed position. Detect with kafka-consumer-groups --describe (or the lag metric); fix with more consumers (≤ partitions), removing blocking work, batching, or parallel processing inside the consumer.",
        example: "Lag hits 2M messages (8h behind) after a slow DB deploy: --describe shows partition 7 holding 90% of it — a hot partition from bad keying. You accelerate that consumer, fix the DB latency, then scale the group; adding partitions helps future throughput but doesn't drain existing lag.",
        code: "kafka-consumer-groups --bootstrap-server b:9092 \\\n  --describe --group billing\n# TOPIC  PARTITION  CURRENT-OFFSET  LOG-END-OFFSET  LAG\n# orders 7          1000            1900000         1899000  <- hotspot\n// fixes: consumers <= partitions, batch I/O, faster downstream"
      },
      {
        description: "Key every event by that business key: hashing routes all of its records to one partition, which a single consumer in the group reads sequentially — per-key order preserved while other keys run in parallel.",
        example: "Order events must flow created → paid → shipped per order: producer sends key=orderId, so all of order 123's events land in partition 9 and one consumer reads them in sequence. Millions of other orders fan out across the other partitions — ordering exactly where you need it, scale everywhere else.",
        code: "producer.send(new ProducerRecord<>(\"orders\", orderId, event));\n// same key -> same partition -> per-key ordering\n// group consumers split partitions, never messages within one"
      },
      {
        description: "A poison message must not block its partition forever: cap retries, then route to a delayed retry topic or a dead-letter topic carrying error metadata; alert on the DLQ and replay it after the fix.",
        example: "One malformed payload crashes the handler, the offset never commits, and the same record restarts the crash loop — every message behind it stalls. After 3 attempts it's parked in orders.DLQ with headers (exception, original offset), the partition moves on, and a fixed consumer replays the DLQ.",
        code: "try { handle(r); consumer.commitSync(); }\ncatch (NonRetryableException e) { toDlq(r, e); commit(); }\ncatch (Exception e) {\n  if (attempts(r) < 3) toRetryTopic(r); else toDlq(r, e);\n  commit();\n}\n// retry topic + delay: reprocess after backoff, move toward DLQ"
      },
      {
        description: "Retries re-deliver messages (at-least-once) — make side effects idempotent: unique event-id dedup table, business-key upserts, or a downstream natural key (charge id) that rejects repeats.",
        example: "After an offset rollback, 500 payment events are replayed. The handler inserts event_id into processed_events first — the duplicate collides with the primary key and is acked without re-charging. The wallet's own chargeId gives a second dedup layer at the bank.",
        code: "void handle(PaymentEvent e) {\n  try { processedRepo.insert(e.eventId()); }      // PK = event id\ncatch (DuplicateKeyException dup) { return; }   // replay -> skip\n  payments.charge(e.chargeId(), e.amount());      // chargeId deduped downstream\n}"
      },
      {
        description: "A broker crash loses only un-replicated data and delays leadership until the controller elects new leaders. With RF=3, min.insync.replicas=2 and acks=all, a synced follower takes over with zero acknowledged loss; RF=1 or acks=1 exposes you to real loss.",
        example: "Broker-2 dies holding partition-5's leadership: the controller promotes an ISR member in a couple of seconds, producers' retries cover in-flight writes — nothing acknowledged is gone. Had followers lagged below min.insync, the last acked write would have failed instead of vanishing silently.",
        code: "replication.factor=3\nmin.insync.replicas=2\nacks=all\nunclean.leader.election.enable=false\n# broker down -> controller elects from Isr -> clients refresh metadata"
      },
      {
        description: "A high-throughput order pipeline: keyed topics (per-order ordering), idempotent producer with acks=all, consumers that commit after processing, DLQ for poison records, lag monitoring — and exactly-once semantics only where they're actually needed (Kafka→Kafka).",
        example: "10k order events/s: 24 partitions keyed by orderId, producer batches with lz4 and acks=all; the DB consumer processes then commits with dedup; the analytics copy to another topic runs exactly_once_v2. Lag dashboard and DLQ alerts give production visibility.",
        code: "// producer\nenable.idempotence=true; acks=all; compression.type=lz4; linger.ms=5\n// consume -> Kafka (EOS)\nprocessing.guarantee=exactly_once_v2\n// consume -> DB (practical at-least-once)\nprocess(); insertIdempotently(); consumer.commitSync();"
      },
      {
        description: "A new consumer group replays history without touching live groups — groups are independent. Run the backfill under its own group id with rate limits so it doesn't starve live consumers, then cut over when it catches up.",
        example: "A search indexer needs 3 months of order events: start it with group 'search-backfill' and auto.offset.reset=earliest — it races through history while 'billing' continues on its committed offsets. Throttled polls/quotas keep the brokers healthy; at lag≈0 the service switches to its live group.",
        code: "# new group, replay from the start — live groups unaffected\nkafka-console-consumer --topic orders --from-beginning \\\n  --group search-backfill\n// programmatic: consumer.seekToBeginning(tps)\n// throttle: client quotas / max.poll.records to protect live traffic"
      },
      {
        description: "Kafka: a durable, replayable, partitioned log — high throughput, many independent consumers, ordering per key — for streams of facts. RabbitMQ: per-message routing and acks (exchanges, TTLs, DLX) — better for task queues and low-latency delivery.",
        example: "Order events with audit replay, five consumer teams and 10k/s → Kafka. Push notifications needing per-device acks, routing rules and delayed retries → RabbitMQ, whose exchanges model that directly. Kafka would force you to build the routing and per-message bookkeeping yourself.",
        code: "order events   -> Kafka    (retention, replay, partitions, fan-out)\nnotifications  -> RabbitMQ (exchanges, routing keys, per-message ack, TTL/DLQ)\nrule of thumb: stream of facts -> Kafka; task/delivery -> RabbitMQ / SQS"
      },
      {
        description: "Producer: batching (linger.ms, batch.size), compression, acks trade-off, partitions for parallelism. Consumer: more consumers (≤ partitions), larger fetches, less blocking per record. Broker: fast disks, replication headroom, avoid hot partitions.",
        example: "At 5k small msgs/s, linger.ms=5 + batch.size=64KB bundles messages into big network writes and snappy compression halves the bytes; the consumer's fetch.min.bytes=1MB pulls in bulk. Same workload, ~8x throughput, and p99 latency stays under 100ms.",
        code: "// producer\nlinger.ms=5; batch.size=65536; compression.type=snappy\nbuffer.memory=67108864; acks=all\n// consumer\nfetch.min.bytes=1048576; fetch.max.wait.ms=500; max.poll.records=500\n// topic: enough partitions; broker: SSD, monitor under-replicated count"
      },
    ],
  },
  reactive: {
    important: [
      {
        description: "Reactive programming is an asynchronous, non-blocking, event-driven paradigm: data flows as streams of events and consumers react to them as items arrive — described by the Reactive Streams specification.",
        example: "Nothing waits for a result: you subscribe, and when the row arrives the callback runs. A price change event triggers recalculate-cart → push-notification as a chain of reactions, without a single thread parked in between.",
        code: "Flux.fromIterable(orders)          // stream of events\n  .filter(Order::isOpen)\n  .subscribe(this::handle);          // react when data arrives"
      },
      {
        description: "Imperative code calls a function and blocks the thread until it returns. Reactive code composes asynchronous pipelines — threads only run when an events fire — so a handful of threads serve thousands of concurrent operations.",
        example: "Imperative: 100 concurrent requests × 2s downstream latency = 100 threads mostly sleeping. Reactive: 2-4 event-loop threads handle 10,000+ connections. The cost: harder debugging (stack traces end at the callback) and an absolute rule — every link in the chain must be non-blocking.",
        code: "// imperative: thread parked for 2s\nOrder o = http.get(\"/order/1\");\n\n// reactive: same result, thread released meanwhile\nhttp.get(\"/order/1\").subscribe(this::render);"
      },
      {
        description: "Reactive Streams spec: Publisher<T> emits items; Subscriber<T> receives them; Subscription is the link — request(n) declares demand, cancel() stops it; Processor<T,R> is a subscriber that is also a publisher. Backpressure is part of the contract.",
        example: "A subscriber says 'send me 10 at a time' — the publisher must not push an 11th until more demand arrives. Reactor's Flux and Mono are the reference implementations; any spec-compliant library (Kafka Reactive Streams, RSocket) can plug into the same operators.",
        code: "interface Subscriber<T> {\n  void onSubscribe(Subscription s);   // s.request(n) / s.cancel()\n  void onNext(T item);                // one element\n  void onError(Throwable t);\n  void onComplete();\n}"
      },
      {
        description: "Non-blocking I/O releases the thread immediately; a completion event delivers the result later (selectors/epoll under the hood). Blocking pins the thread for the whole operation, so scale equals thread count.",
        example: "Blocking server with 500 threads: most threads just sleep waiting on sockets (memory + context switches). Netty event loop: one thread multiplexes thousands of connections and only runs a callback when a response actually arrives. Same box: hundreds vs tens of thousands of connections.",
        code: "// blocking — thread parked to completion\nbyte[] data = inputStream.readAllBytes();\n// non-blocking — thread freed, callback later\nchannel.read(buf).whenComplete((n, err) -> handle(n));\n// Reactor\nMono<byte[]> data = webClient.get().uri(u).bodyToMono(byte[].class);"
      },
      {
        description: "Backpressure is the consumer telling the producer how much it can handle (request(n)) instead of the producer buffering without limits — the defense against OOM when a fast producer meets a slow consumer.",
        example: "A market-data feed pushes 100k events/s while your DB writes take 10ms: unbounded buffering grows until the pod dies. With a demand window of 100, or an explicit strategy (buffer, drop-oldest, latest-only), the rate mismatch becomes a design decision instead of an outage.",
        code: "// demand-driven flow\nsubscriber.request(100);        // publisher may send at most 100\n\nFlux.interval(Duration.ofMillis(1))\n  .onBackpressureBuffer(1000, BufferOverflowStrategy.DROP_OLDEST);\n// strategies: BUFFER | DROP | LATEST | ERROR"
      },
      {
        description: "Mono<T> is a Publisher of 0 or 1 value (like a future). Flux<T> is a Publisher of 0..n values (a stream). Both are lazy, asynchronous and composable with operators — nothing happens until subscribe().",
        example: "Mono<User> for a single lookup, Flux<Order> for a list or an endless event feed. flatMap is the bridge: fetch a user, then issue the orders call for that user and flatten the resulting Flux into the outer stream.",
        code: "Mono<User> user = repo.findById(id);\nFlux<Order> orders = repo.findAllByUser(id);\n\nuser.flatMap(u -> client.orders(u.getId()))   // Mono -> Flux, flattened\n     .subscribe();"
      },
      {
        description: "Lifecycle: assemble the pipeline (nothing runs) → subscribe() starts it → onNext 0..n times → exactly one terminal signal (onError XOR onComplete) → resources released (dispose / cancel upstream).",
        example: "You build the pipeline when you write it; it starts when WebFlux subscribes on the incoming request. Items flow; the stream ends once with either completion or an error. If the client disconnects, dispose() cancels upstream so no more work is done for nobody.",
        code: "Disposable d = Flux.fromIterable(ids)\n  .doOnSubscribe(s -> log.info(\"started\"))\n  .subscribe(\n    x -> handle(x),\n    err -> log.error(\"failed\", err),\n    () -> log.info(\"done\"));\n\nd.dispose();   // cancel early (e.g. client disconnected)"
      },
      {
        description: "Cold publishers run the sequence per subscriber — everyone gets the whole flow. Hot publishers share one execution: subscribers only see items emitted after they subscribe. Everything is lazy until subscribe().",
        example: "Flux.just(1,2,3) delivered twice = each subscriber sees 1-3 (cold — like re-running the query). A live price ticker is hot: join late and you've missed earlier ticks — publish() makes one shared source, replay(1) also hands the newest tick to newcomers.",
        code: "Flux.just(1, 2, 3).subscribe(::print);   // cold: per subscriber, full sequence\n\nFlux.create(sink -> feed.onTick(sink::next))\n  .publish().refCount(1);   // hot: shared, starts with first subscriber\n  // .replay(1).autoConnect() — late joiners get the last tick too"
      },
      {
        description: "map transforms each element synchronously (1:1). flatMap transforms each element into its own Publisher and merges the results asynchronously — order may interleave, concurrency unbounded (default cap 256).",
        example: "map: order → \"ORDER-\" + id (pure, no I/O). flatMap: order id → Mono<Order> fetched over HTTP — every lookup runs concurrently and the results flatten into the stream. Returning a Mono from map gives you Mono<Mono<Order>> — the classic sign you needed flatMap.",
        code: "flux.map(o -> o.getId())                  // T -> U, synchronous\nflux.flatMap(id -> client.getOrder(id))     // T -> Publisher<U>, merged async\n// lambda returns Mono/Flux? -> flatMap, not map"
      },
      {
        description: "flatMap runs inner publishers concurrently and merges as results arrive (order lost, default concurrency 256). concatMap is strictly serial, one inner at a time (order kept, slowest). flatMapSequential is concurrent but emits in original order.",
        example: "Fetching details for 500 items where order doesn't matter → flatMap (fastest). Building a CSV where rows must stay in input order but calls can overlap → flatMapSequential: full concurrency with deterministic output. Each call depends on the previous result → concatMap.",
        code: "flux.flatMap(id -> fetch(id))             // concurrent, order not guaranteed\nflux.flatMapSequential(id -> fetch(id))     // concurrent, order kept\nflux.concatMap(id -> fetch(id))             // strictly serial, one at a time"
      },
      {
        description: "concat subscribes sequentially — the first stream must finish before the second starts (order kept). merge subscribes immediately and interleaves items as they arrive. zip pairs items positionally — one from each source per tuple, waiting for the slow side.",
        example: "Combine user + profile + settings for one page → zip (exactly one from each). Blend two sensor feeds → merge (timing irrelevant). Read page 1 then page 2 → concat (dependency, cannot start the second early).",
        code: "Flux.merge(sensorA, sensorB);            // interleaved as they arrive\nFlux.concat(page1, page2);                 // page1 completes first\nFlux.zip(user, profile, Tuple2::new);      // (u1,p1), (u2,p2)... waits for slowest"
      },
      {
        description: "subscribeOn fixes where subscription (and the source's work) happens — it only matters upstream and effectively once. publishOn switches the thread for everything downstream of it. Rule: publishOn after each point where you must hop threads.",
        example: "A JDBC read runs on boundedElastic (blocking allowed there), then publishOn(parallel) hops back to a normal pool for enrichment and rendering. Just subscribeOn would move only the source — your map/flatMap would still run on the blocking pool.",
        code: "Mono.fromCallable(() -> jdbc.query())       // blocking source\n  .subscribeOn(Schedulers.boundedElastic())  // where source executes\n  .map(this::enrich)                        // still on boundedElastic\n  .publishOn(Schedulers.parallel())         // hop for downstream ops\n  .flatMap(this::render);"
      },
      {
        description: "parallel(): fixed pool = CPU cores, for CPU-bound non-blocking work. boundedElastic(): grows elastically (bounded), the only place blocking code may run. single(): one shared thread for sequencing. immediate(): current thread, no switch.",
        example: "JSON serialization and hashing → parallel(). JDBC, file reads, legacy SDKs → boundedElastic (it's capped, so runaway blocking can't grow infinitely). Minute-level cleanup on single() for guaranteed ordering. Running blocking work on parallel() stalls every task sharing that pool.",
        code: "Schedulers.parallel();        // CPU cores, non-blocking compute\nSchedulers.boundedElastic();   // blocking / legacy I/O (bounded, elastic)\nSchedulers.single();           // one shared thread, serialized work\nSchedulers.immediate();        // same thread, no switch (trampoline)"
      },
      {
        description: "No. Reactor only manages where callbacks run — a blocking call inside a non-blocking thread still freezes that thread. You must isolate it on its own scheduler or remove it; reactive does not magically convert blocking I/O.",
        example: "jdbc.query() inside flatMap on the Netty event loop stalls every other request that loop serves — one slow query and the whole node's latency spikes. Mono.fromCallable().subscribeOn(boundedElastic) isolates it; a truly non-blocking driver (R2DBC) removes the problem entirely.",
        code: "// WRONG: blocks the event loop for everyone\nMono.fromCallable(() -> jdbc.find(id))          // no subscribeOn\n\n// BETTER: isolate blocking\nMono.fromCallable(() -> jdbc.find(id))\n  .subscribeOn(Schedulers.boundedElastic())\n\n// BEST: non-blocking driver (r2dbc)"
      },
      {
        description: "Prefer a non-blocking driver (R2DBC) where available. Otherwise wrap the blocking call in Mono.fromCallable + subscribeOn on a dedicated, size-limited elastic pool — or simply keep that service on blocking MVC; reactive adoption need not be all-or-nothing.",
        example: "A legacy Oracle JDBC dependency inside an otherwise reactive service: a boundedElastic pool of 64 threads, sized to the DB connection pool — blocking work queues among itself and can never exhaust the event loops. A CSV export using Files.readAllLines follows the same pattern.",
        code: "Mono<Order> load = Mono.fromCallable(() -> legacyDao.find(id))\n  .subscribeOn(Schedulers.boundedElastic())   // dedicated pool\n  .timeout(Duration.ofSeconds(2));\n\n// dedicated: Schedulers.newBoundedElastic(64, 1000, \"legacy-db\")"
      },
      {
        description: "onErrorReturn emits a default value and completes; onErrorResume switches to a fallback Publisher; onErrorMap transforms the error type. Errors travel via onError — you compose recovery, you don't try/catch around operators.",
        example: "Pricing service down: onErrorReturn(Price.unavailable()) to keep the page alive, onErrorResume(e -> cache.get(id)) to serve stale prices, onErrorMap(ExternalException::new) to hide internals behind a clean API error. Each is a deliberate, visible degradation strategy.",
        code: "pricingClient.get(id)\n  .onErrorReturn(Price.unavailable())            // default value\n  .onErrorResume(e -> cache.get(id))             // fallback source\n  .onErrorMap(ex -> new ApiException(502, ex));  // translate error"
      },
      {
        description: "retry(n) re-subscribes n times immediately. retryWhen composes a retry policy (exponential backoff, jitter, attempt caps, filtering). timeout() fails the stream if no signal arrives in time. All three end in a terminal fallback — never infinite retries.",
        example: "A flaky partner API: 3 attempts with 1s → 2s → 4s backoff and jitter, inside a 5s timeout; if it still fails, onErrorResume returns a default so the user sees the page. Retrying forever with no backoff against a down service is a self-inflicted DDoS.",
        code: "partnerClient.get(id)\n  .timeout(Duration.ofSeconds(5))\n  .retryWhen(Retry.backoff(3, Duration.ofSeconds(1))\n              .maxBackoff(Duration.ofSeconds(8))\n              .jitter(0.5)\n              .filter(e -> e instanceof TimeoutException))\n  .onErrorResume(e -> Mono.just(Fallback.INSTANCE));"
      },
      {
        description: "Spring MVC is servlet-based, thread-per-request and blocking-friendly — mature and simple when your stack is blocking anyway. WebFlux is event-loop based, non-blocking, and reaches huge concurrency with few threads — at the cost of a stricter non-blocking discipline.",
        example: "Internal CRUD with JDBC at 50 rps → MVC: less risk, similar performance. A gateway with 10k concurrent SSE connections → WebFlux: ~4 event-loop threads instead of 10k. A team deep in blocking JPA gains little by switching — pick per service, both can coexist.",
        code: "// MVC: thread per request, blocking is fine\n@GetMapping Order get() { return service.get(id); }\n\n// WebFlux: event loop, everything non-blocking\n@GetMapping Mono<Order> get() { return service.get(id); }"
      },
      {
        description: "WebFlux runs handlers on a few Netty event-loop threads: a request's thread is released while awaiting I/O, and its continuation resumes when the response arrives. Concurrency equals in-flight operations, not OS threads.",
        example: "8,000 concurrent requests each waiting 200ms on a downstream call: thread-per-request needs ~8,000 parked threads (gigabytes of stacks); the event loop needs one thread per core multiplexing thousands of channels through selectors — the same workload with a fraction of the memory.",
        code: "8000 requests x 200ms wait\n// thread-per-request: ~8000 threads (mostly parked)\n// event loop: N = cores threads, selector events -> callbacks\n// thread only runs while doing actual CPU work, never while waiting"
      },
      {
        description: "WebClient is the reactive HTTP client (Netty-backed, non-blocking). Start the calls first, then combine with zip/allOf — total latency becomes the slowest call instead of the sum. Wrap with timeout and a degradation strategy per call.",
        example: "A page needs user (150ms) + recommendations (400ms): sequential flatMap chains take 550ms; Mono.zip takes ~400ms. Add three more services and the saving multiplies — but parallelism isn't automatic: a chain of flatMaps is sequential by design.",
        code: "Mono<User> u = webClient.get().uri(\"/users/{id}\", id)\n  .retrieve().bodyToMono(User.class);\nMono<Recs> r = webClient.get().uri(\"/recs/{id}\", id)\n  .retrieve().bodyToMono(Recs.class);\n\nMono.zip(u, r)\n  .timeout(Duration.ofSeconds(2))\n  .map(t -> new Page(t.getT1(), t.getT2()));"
      },
    ],
    scenarios: [
      {
        description: "Protect the call on every axis: timeout on each request, bulkhead (limited concurrency) so one dependency can't consume your capacity, circuit breaker to stop hammering a dead service, and a fallback to degrade gracefully.",
        example: "Recommendation service degrades to 3s responses: without protection, WebFlux's massive concurrency opens thousands of connections to it and pushes it into collapse. Timeout 500ms + max 50 in flight + breaker opening after 50% failures → requests serve cached recommendations in milliseconds.",
        code: "webClient.get().uri(\"/recs/{id}\", id).retrieve().bodyToMono(Recs.class)\n  .timeout(Duration.ofMillis(500))\n  .transformDeferred(CircuitBreakerOperator.of(cb))  // resilience4j-reactor\n  .transformDeferred(BulkheadOperator.of(bh))        // max concurrent\n  .onErrorResume(e -> Mono.just(Recs.empty()));      // fallback"
      },
      {
        description: "Demand-driven flow: the subscriber requests n items and the publisher may never exceed it; for sources you don't control, pick an explicit overflow strategy — buffer (bounded), drop, latest, or error — instead of unbounded queues.",
        example: "A feed emits every 1ms while the DB sink writes every 50ms: limitRate(100) pulls in batches of 100 so the sink sets the pace. A live dashboard only needs the newest tick — onBackpressureDrop throws stale values away, which is exactly right for that UI.",
        code: "Flux.create(sink -> producer.onMessage(sink::next),\n            FluxSink.OverflowStrategy.BUFFER)\n  .limitRate(100)                 // request in windows of 100\n  .onBackpressureLatest();        // keep only the newest for live views\n// strategies: BUFFER | DROP | LATEST | ERROR — never unbounded"
      },
      {
        description: "Stream in batches: page through the source with a cursor, emit each page as a Flux, process chunks with bounded flatMap concurrency — heap holds one page at a time, never the whole dataset.",
        example: "Exporting 10M rows to S3: a loop of paged queries (1,000 rows each) feeds flatMap(uploadChunk, 16) — memory stays at a few MB in a 512MB container. Loading all rows into a List first is the guaranteed OOM that kills naive exports.",
        code: "Flux.range(0, 10_000)                        // pages\n  .concatMap(i -> Mono.fromCallable(() -> repo.page(i, 1000)))\n  .flatMapIterable(List::stream)               // rows\n  .flatMap(this::uploadChunk, 16)              // bounded concurrency\n  .then();\n// heap holds ~1 page, not 10M rows"
      },
      {
        description: "Find where the time goes before touching anything: thread dumps (event loop stuck in blocking code?), GC logs (buffering leak?), WebClient connection pool exhaustion, missing timeouts causing pileups, downstream latency — via metrics first.",
        example: "p99 spikes under load: reactor-nio thread dumps show Netty workers inside JDBC — a blocking call sneaked into a handler; and the WebClient has no timeout so slow downstreams hold sockets open until the pool starves. Fix: boundedElastic for the DB, 500ms timeouts, pool caps — latency flattens on the same dashboard.",
        code: "evidence:\n  thread dump -> reactor-http-nio-* inside JDBC? blocking on the loop\n  metrics    -> reactor.netty pool active/max, timeouts, GC pauses\nfixes:\n  Mono.fromCallable(db).subscribeOn(boundedElastic)\n  .timeout(500ms);  webClient maxConnections / maxInMemorySize; alert on lag"
      },
      {
        description: "WebFlux API validates the order, runs payment + inventory concurrently (zip) with timeouts and breakers, publishes OrderPlaced idempotently to Kafka, and lets downstream react asynchronously — the API returns as soon as the critical path completes.",
        example: "POST /orders: payment (400ms) and inventory (300ms) run in parallel; success → Kafka event (acks=all, idempotent producer); notifications and analytics consume with their own lag. Kafka backpressure buffers safely while the API stays at a constant 80ms p95 regardless of consumer speed.",
        code: "Mono.zip(charge(id), reserve(id))          // concurrent critical path\n  .timeout(Duration.ofSeconds(2))\n  .flatMap(t -> kafka.send(\"order.placed\", event))\n  .retryWhen(Retry.backoff(3, Duration.ofSeconds(1)))\n  .onErrorResume(e -> Mono.error(new OrderFailed(e)));\n// consumers: idempotent + DLQ; producer: idempotence=true, acks=all"
      },
      {
        description: "flatMap(mapper, maxConcurrency = 10) is the one-liner — demand windows keep at most 10 inner publishers active. If output order must be preserved, flatMapSequential(mapper, 10) does the same with ordered emission.",
        example: "500 calls to a partner API limited to 10 in flight (their rate limit): flux.flatMap(this::call, 10) — violations become 429s avoided instead of throttling. Results must arrive in input order for the report? flatMapSequential with the same cap.",
        code: "Flux.fromIterable(ids)\n  .flatMap(this::callPartner, 10)          // max 10 concurrent\n\nFlux.fromIterable(ids)\n  .flatMapSequential(this::callPartner, 10) // concurrent, order preserved\n// manual alternative: Semaphore(10) around each inner Mono"
      },
      {
        description: "It depends on criticality. Required data: let the error propagate and fail fast with a clear message. Optional data: recover that inner Mono alone (onErrorReturn / onErrorResume) before zipping — the page renders with partial content.",
        example: "A product page needs profile (required) plus recommendations (optional): zip(profile, recs.onErrorReturn(empty)) — if recs fails the page loads with a placeholder section. Payment + inventory are both required: zipping them means any failure aborts the whole order — no half-placed orders.",
        code: "Mono.zip(profile,\n         recs.onErrorReturn(Recs.empty()))    // partial: degrade one source\n  .map(Page::new);\n\nMono.zip(payment, inventory)               // fail fast: both required\n  .timeout(Duration.ofSeconds(2));\n// recover per-source BEFORE combining, never swallow inside"
      },
      {
        description: "Wrap it: Mono.fromCallable(blockingWork).subscribeOn(Schedulers.boundedElastic()) so the event loop never executes it, size that pool to the underlying resource, and always put a timeout around it. Long-term: replace it with a non-blocking driver.",
        example: "The legacy Oracle JDBC stays put: every access goes through a dedicated 32-thread boundedElastic pool matching the DB's connection pool. If the database slows, only that pool queues and timeouts trip — the event loops and every other endpoint keep serving.",
        code: "Mono<Order> load = Mono.fromCallable(() -> legacyDao.find(id))\n  .subscribeOn(Schedulers.boundedElastic())   // never on the event loop\n  .timeout(Duration.ofSeconds(2));\n\n// size to the DB: Schedulers.newBoundedElastic(32, 1000, \"legacy-db\")"
      },
      {
        description: "Cold = each subscriber runs its own execution and receives the full sequence. Hot = one shared execution; subscribers see only items emitted after they attach. Make a live feed hot with publish()/multicast, optionally replaying the latest item to newcomers.",
        example: "200 dashboard tabs must share ONE WebSocket connection to the exchange (hot) — publish().refCount() connects on the first subscriber and tears down with the last. A tab that opens late would otherwise see nothing until the next tick, so replay(1) hands it the current price immediately.",
        code: "Flux.create(sink -> feed.onTick(sink::next))   // single upstream source\n  .publish()\n  .refCount(1);        // hot: shared, starts on first, stops on last\n\n// late joiners need the latest value:\n  .replay(1).autoConnect();   // multicast + replay last tick"
      },
      {
        description: "An unbounded subscribe() with no demand or concurrency cap pulls the entire source into memory at once (every element and every inner Publisher queued), heap climbs, GC thrashes, and the pod OOM-kills — repeatedly. Fix: bounded flatMap concurrency + limitRate + cancellation.",
        example: "Incident: Flux.range(0, 10_000_000).flatMap(this::call) queued all 10 million inner Monos immediately — heap hit 90% within minutes and the pod was OOM-killed 12 times in an hour. With flatMap(call, 32) and limitRate(100), memory stayed flat and p99 actually improved from queueing alone.",
        code: "// before: unbounded demand\nFlux.range(0, 10_000_000).flatMap(this::call);      // ~10M in flight\n\n// after: bounded\nFlux.range(0, 10_000_000)\n  .flatMap(this::call, 32)          // concurrency cap\n  .limitRate(100)                   // bounded request windows\n  .subscribe();"
      },
    ]
  }
};
