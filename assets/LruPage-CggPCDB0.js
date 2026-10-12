import{r as e}from"./rolldown-runtime-QTnfLwEv.js";import{t}from"./react-CZI7_Jkm.js";import{r as n,s as r}from"./index-BjSszV1C.js";import{t as i}from"./atom-one-dark-CL0A0LnX.js";var a=e(t(),1),o=`// A. Node + DoublyLinkedList
class Node<K, V> {
    final K key;
    V value;
    Node<K, V> prev;
    Node<K, V> next;
    Node(K k, V v) { key = k; value = v; }
}

class DoublyLinkedList<K, V> {
    private Node<K, V> head; // MRU
    private Node<K, V> tail; // LRU
    private int size = 0;

    public void addFirst(Node<K, V> node) {
        node.prev = null;
        node.next = head;
        if (head != null) head.prev = node;
        head = node;
        if (tail == null) tail = node;
        size++;
    }

    public void removeNode(Node<K, V> node) {
        if (node.prev != null) node.prev.next = node.next;
        else head = node.next;

        if (node.next != null) node.next.prev = node.prev;
        else tail = node.prev;

        node.prev = null;
        node.next = null;
        size--;
    }

    public void moveToFront(Node<K, V> node) {
        if (node == head) return;
        removeNode(node);
        addFirst(node);
    }

    public Node<K, V> removeLast() {
        if (tail == null) return null;
        Node<K, V> last = tail;
        removeNode(last);
        return last;
    }

    public int size() { return size; }
    public Node<K, V> getHead() { return head; }
    public Node<K, V> getTail() { return tail; }
}`,s=`// B. EvictionPolicy + LRUCache
import java.util.*;
import java.util.concurrent.locks.ReentrantReadWriteLock;

interface EvictionPolicy<K, V> {
    Node<K, V> selectVictim(DoublyLinkedList<K, V> list);
}

class LRUEvictionPolicy<K, V> implements EvictionPolicy<K, V> {
    public Node<K, V> selectVictim(DoublyLinkedList<K, V> list) {
        return list.getTail(); // LRU = tail
    }
}

class LRUCache<K, V> {
    private final int capacity;
    private final Map<K, Node<K, V>> map;
    private final DoublyLinkedList<K, V> list;
    private final EvictionPolicy<K, V> policy;
    private final ReentrantReadWriteLock lock = new ReentrantReadWriteLock();

    private long hits = 0, misses = 0, evictions = 0;

    public LRUCache(int capacity, EvictionPolicy<K, V> policy) {
        if (capacity <= 0) throw new IllegalArgumentException("Capacity must be > 0");
        this.capacity = capacity;
        this.map = new HashMap<>(capacity);
        this.list = new DoublyLinkedList<>();
        this.policy = policy;
    }

    public Optional<V> get(K key) {
        lock.writeLock().lock();
        try {
            Node<K, V> node = map.get(key);
            if (node == null) { misses++; return Optional.empty(); }
            list.moveToFront(node);
            hits++;
            return Optional.of(node.value);
        } finally {
            lock.writeLock().unlock();
        }
    }

    public void put(K key, V value) {
        lock.writeLock().lock();
        try {
            Node<K, V> existing = map.get(key);
            if (existing != null) {
                existing.value = value;
                list.moveToFront(existing);
                return;
            }
            if (map.size() >= capacity) {
                Node<K, V> victim = policy.selectVictim(list);
                if (victim != null) {
                    list.removeNode(victim);
                    map.remove(victim.key);
                    evictions++;
                }
            }
            Node<K, V> node = new Node<>(key, value);
            list.addFirst(node);
            map.put(key, node);
        } finally {
            lock.writeLock().unlock();
        }
    }

    public int size() { return map.size(); }
    public long getHits() { return hits; }
    public long getMisses() { return misses; }
    public long getEvictions() { return evictions; }

    public void clear() {
        lock.writeLock().lock();
        try {
            map.clear();
            while (list.size() > 0) list.removeLast();
        } finally {
            lock.writeLock().unlock();
        }
    }

    public List<K> keysInOrder() {
        lock.readLock().lock();
        try {
            List<K> keys = new ArrayList<>();
            Node<K, V> cur = list.getHead();
            while (cur != null) { keys.add(cur.key); cur = cur.next; }
            return keys;
        } finally {
            lock.readLock().unlock();
        }
    }
}`,c=`// C. Main — demo
public class Main {
    public static void main(String[] args) {
        LRUCache<Integer, String> cache = new LRUCache<>(3, new LRUEvictionPolicy<>());

        cache.put(1, "one");
        cache.put(2, "two");
        cache.put(3, "three");
        System.out.println("Order: " + cache.keysInOrder()); // [3, 2, 1]

        cache.get(1); // 1 becomes MRU
        System.out.println("After get(1): " + cache.keysInOrder()); // [1, 3, 2]

        cache.put(4, "four"); // evicts 2 (LRU)
        System.out.println("After put(4): " + cache.keysInOrder()); // [4, 1, 3]
        System.out.println("get(2): " + cache.get(2)); // empty — evicted
        System.out.println("get(3): " + cache.get(3)); // three

        System.out.println("Hits: " + cache.getHits()
                + ", Misses: " + cache.getMisses()
                + ", Evictions: " + cache.getEvictions());
    }
}`,l=`-- 2 tables — for persistence and warm restart

CREATE TABLE cache_entries (
  cache_name   VARCHAR(50) NOT NULL,
  cache_key    VARCHAR(255) NOT NULL,
  cache_value  TEXT NOT NULL,
  last_access  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (cache_name, cache_key)
);
CREATE INDEX idx_cache_lru ON cache_entries(cache_name, last_access);

CREATE TABLE cache_metadata (
  cache_name   VARCHAR(50) PRIMARY KEY,
  capacity     INT NOT NULL,
  policy       ENUM('LRU','LFU','FIFO') DEFAULT 'LRU',
  created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`,u=`----------------------------------------
  LRUCache<K, V>
  - capacity: int
  - map: Map<K, Node<K,V>>
  - list: DoublyLinkedList<K,V>
  - policy: EvictionPolicy<K,V>
  + get(key): Optional<V>
  + put(key, value): void
  + size(): int
  + clear(): void
----------------------------------------
      |owns (map + list die with cache)
      v
----------------------------------------
  DoublyLinkedList       Node<K,V>
  - head: Node (MRU)     - key: K
  - tail: Node (LRU)     - value: V
  + addFirst(node)       - prev: Node
  + removeNode(node)     - next: Node
  + moveToFront(node)
  + removeLast()
----------------------------------------

LRUCache --uses--> EvictionPolicy<K,V> (interface)
                    +-- LRUEvictionPolicy
LRUCache --has--> Map<K, Node<K,V>> (HashMap O(1))`,d=n();function f({code:e,lang:t}){let n=(0,a.useRef)(null);return(0,a.useEffect)(()=>{n.current&&(n.current.removeAttribute(`data-highlighted`),i.highlightElement(n.current))},[e]),(0,d.jsxs)(`div`,{className:`lru-code`,children:[(0,d.jsxs)(`div`,{className:`lru-code-head`,children:[(0,d.jsxs)(`span`,{className:`dots`,children:[(0,d.jsx)(`i`,{}),(0,d.jsx)(`i`,{}),(0,d.jsx)(`i`,{})]}),(0,d.jsx)(`span`,{className:`pl-lang`,children:t})]}),(0,d.jsx)(`pre`,{className:`lru-pre`,children:(0,d.jsx)(`code`,{ref:n,className:`language-${t}`,children:e})})]})}var p=({id:e,children:t})=>(0,d.jsx)(`section`,{id:e,className:`lru-section`,children:t}),m=({children:e})=>(0,d.jsx)(`h2`,{className:`lru-h2`,children:e}),h=({children:e})=>(0,d.jsx)(`h3`,{className:`lru-h3`,children:e}),g=({title:e,children:t})=>(0,d.jsxs)(`div`,{className:`lru-bullet`,children:[(0,d.jsx)(`b`,{children:e}),(0,d.jsx)(`span`,{children:t})]}),_=({children:e})=>(0,d.jsx)(`div`,{className:`lru-tip`,children:e});function v(){return(0,d.jsxs)(`div`,{className:`lru-root`,children:[(0,d.jsxs)(`header`,{className:`lru-header`,children:[(0,d.jsx)(r,{to:`/maang/system-design/advanced`,className:`lru-back`,children:`← Back to Advanced System Design`}),(0,d.jsxs)(`h1`,{children:[(0,d.jsx)(`i`,{className:`fas fa-database`}),` LRU Cache — LLD `,(0,d.jsxs)(`span`,{className:`lru-badge`,children:[(0,d.jsx)(`i`,{className:`fab fa-java`}),` Java + UML`]})]}),(0,d.jsxs)(`div`,{className:`lru-sub-info`,children:[(0,d.jsxs)(`span`,{children:[(0,d.jsx)(`i`,{className:`fas fa-list-check`}),` 6 Steps`]}),(0,d.jsxs)(`span`,{children:[(0,d.jsx)(`i`,{className:`fas fa-code`}),` Working Java`]}),(0,d.jsxs)(`span`,{children:[(0,d.jsx)(`i`,{className:`fas fa-database`}),` DB Schema`]}),(0,d.jsxs)(`span`,{className:`lru-badge-alt`,children:[(0,d.jsx)(`i`,{className:`fas fa-mouse-pointer`}),` Scroll down`]})]}),(0,d.jsxs)(`nav`,{className:`lru-nav`,children:[(0,d.jsx)(`a`,{href:`#req`,children:`1. Requirements`}),(0,d.jsx)(`a`,{href:`#ent`,children:`2. Entities`}),(0,d.jsx)(`a`,{href:`#uml`,children:`3. Diagram`}),(0,d.jsx)(`a`,{href:`#db`,children:`4. DB`}),(0,d.jsx)(`a`,{href:`#java`,children:`5. Java`}),(0,d.jsx)(`a`,{href:`#wrap`,children:`6. Wrap-up`})]})]}),(0,d.jsxs)(p,{id:`req`,children:[(0,d.jsxs)(m,{children:[(0,d.jsx)(`i`,{className:`fas fa-list-check`}),` Step 1 — Requirements (5 min)`]}),(0,d.jsxs)(`p`,{className:`lru-intro`,children:[(0,d.jsx)(`b`,{children:`What to do:`}),` Pick `,(0,d.jsx)(`b`,{children:`4 functional`}),` + `,(0,d.jsx)(`b`,{children:`3 non-functional`}),`. State what is OUT of scope (TTL expiry, disk spillover, distributed cache).`]}),(0,d.jsx)(h,{children:`Functional — what the system DOES`}),(0,d.jsxs)(g,{title:`1. Fixed-capacity cache`,children:[`Constructor takes capacity. When full, evict LRU before inserting new.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: capacity drives eviction — core constraint.`})]}),(0,d.jsxs)(g,{title:`2. get(key) — O(1)`,children:[`Return value if present. Move entry to MRU. Null if absent.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: access updates recency — the LRU part.`})]}),(0,d.jsxs)(g,{title:`3. put(key, value) — O(1)`,children:[`Insert or update. If full, evict LRU. Move to MRU.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: insertion + eviction must be O(1).`})]}),(0,d.jsxs)(g,{title:`4. Eviction policy — LRU`,children:[`LRU entry evicted first. Both get and put update recency.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: policy is the core algorithm.`})]}),(0,d.jsx)(h,{children:`Non-Functional — how the system BEHAVES`}),(0,d.jsxs)(g,{title:`1. Thread-safe`,children:[`Concurrent get/put must not corrupt list or map. Use locks.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: concurrency is the #1 follow-up.`})]}),(0,d.jsxs)(g,{title:`2. Generic — K, V`,children:[`Works for any key/value type. Use generics.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: type safety — reusable code.`})]}),(0,d.jsxs)(g,{title:`3. Extensible`,children:[`New policy (LFU, FIFO) = new EvictionPolicy. No core changes.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: shows OCP and DIP.`})]}),(0,d.jsxs)(_,{children:[(0,d.jsx)(`b`,{children:`Interview line:`}),` Skip TTL expiry, disk spillover, distributed cache unless asked — focus on O(1) get/put with LRU eviction.`]})]}),(0,d.jsxs)(p,{id:`ent`,children:[(0,d.jsxs)(m,{children:[(0,d.jsx)(`i`,{className:`fas fa-boxes-stacked`}),` Step 2 — Entities (3 min)`]}),(0,d.jsxs)(`p`,{className:`lru-intro`,children:[(0,d.jsx)(`b`,{children:`Rule:`}),` Take nouns from requirements — each becomes a class.`]}),(0,d.jsxs)(g,{title:`LRUCache (generic K, V)`,children:[`Top-level container. Holds capacity, map, list. Has get, put, evict.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: facade over map + list.`})]}),(0,d.jsxs)(g,{title:`Node`,children:[`Doubly linked list node. Has key, value, prev, next.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: unit of recency — prev + next for O(1) removal.`})]}),(0,d.jsxs)(g,{title:`DoublyLinkedList`,children:[`Holds head (MRU) and tail (LRU). Has addFirst, removeNode, moveToFront.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: separates list mechanics from cache (SRP).`})]}),(0,d.jsxs)(g,{title:`EvictionPolicy + LRUEvictionPolicy`,children:[`evict selects victim. LRU = remove tail.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: Strategy — swap policy without changing core.`})]}),(0,d.jsxs)(g,{title:`CacheStats (optional)`,children:[`Hits, misses, evictions. For monitoring.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: observability — interviewers like this.`})]})]}),(0,d.jsxs)(p,{id:`uml`,children:[(0,d.jsxs)(m,{children:[(0,d.jsx)(`i`,{className:`fas fa-project-diagram`}),` Step 3 — Class Diagram (10 min)`]}),(0,d.jsx)(`p`,{className:`lru-intro`,children:`Draw this on the whiteboard. Relationships are the key signal:`}),(0,d.jsx)(f,{code:u,lang:`text`}),(0,d.jsxs)(_,{children:[(0,d.jsx)(`b`,{children:`Key relationship:`}),` Cache to List is Composition. Cache to Policy is Dependency (DIP). HashMap + DLL = O(1).`]})]}),(0,d.jsxs)(p,{id:`db`,children:[(0,d.jsxs)(m,{children:[(0,d.jsx)(`i`,{className:`fas fa-database`}),` Step 4 — DB Design (5 min)`]}),(0,d.jsx)(`p`,{className:`lru-intro`,children:`LRU is in-memory, so DB is about persistence for warm restart — 2 tables:`}),(0,d.jsx)(f,{code:l,lang:`sql`}),(0,d.jsxs)(g,{title:`idx_cache_lru`,children:[`Makes LRU eviction query O(log n).`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: reload most-recent N on restart.`})]}),(0,d.jsxs)(g,{title:`cache_name in PK`,children:[`Enables multiple named caches in one table.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: partition-friendly.`})]}),(0,d.jsxs)(g,{title:`Why DB at all?`,children:[`Pure in-memory loses data on restart. Persist with last_access for warm restart.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: distributed cache source of truth.`})]})]}),(0,d.jsxs)(p,{id:`java`,children:[(0,d.jsxs)(m,{children:[(0,d.jsx)(`i`,{className:`fab fa-java`}),` Step 5 — Java Code (20-25 min)`]}),(0,d.jsx)(`p`,{className:`lru-intro`,children:`Minimal working Java. Skip boilerplate getters unless asked:`}),(0,d.jsx)(h,{children:`Block A — Node + DoublyLinkedList`}),(0,d.jsx)(f,{code:o,lang:`java`}),(0,d.jsx)(h,{children:`Block B — EvictionPolicy + LRUCache`}),(0,d.jsx)(f,{code:s,lang:`java`}),(0,d.jsx)(h,{children:`Block C — Main + Demo`}),(0,d.jsx)(f,{code:c,lang:`java`})]}),(0,d.jsxs)(p,{id:`wrap`,children:[(0,d.jsxs)(m,{children:[(0,d.jsx)(`i`,{className:`fas fa-flag-checkered`}),` Step 6 — Wrap-up (3 min)`]}),(0,d.jsx)(`p`,{className:`lru-intro`,children:`Be ready to answer these without thinking:`}),(0,d.jsxs)(g,{title:`Concurrency — prevent corruption?`,children:[`ReentrantReadWriteLock — get takes write lock (mutates recency).`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: ConcurrentHashMap alone is insufficient.`})]}),(0,d.jsxs)(g,{title:`Why HashMap + DLL?`,children:[`Map gives O(1) lookup. DLL gives O(1) removal at both ends.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: singly linked needs O(n) for prev.`})]}),(0,d.jsxs)(g,{title:`Why not LinkedHashMap?`,children:[`accessOrder + removeEldestEntry gives LRU in 5 lines. But build from scratch to prove understanding.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: interviewers want mechanics, not shortcuts.`})]}),(0,d.jsxs)(g,{title:`Patterns used + SOLID`,children:[`Strategy, Composition, Encapsulation, Generics.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: naming patterns shows vocabulary.`})]}),(0,d.jsxs)(_,{children:[(0,d.jsx)(`b`,{children:`Scorecard:`}),` Requirements (5) + Entities (3) + Diagram (10) + DB (5) + Code (20) + Wrap-up (3) = 46 min.`]})]}),(0,d.jsx)(`footer`,{className:`lru-footer`,children:(0,d.jsx)(r,{to:`/maang/system-design/advanced`,children:`Back to Advanced System Design`})})]})}export{v as default};