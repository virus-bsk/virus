import{r as e}from"./rolldown-runtime-QTnfLwEv.js";import{t}from"./react-CZI7_Jkm.js";import{o as n,r}from"./index-DCg-4qgp.js";import{t as i}from"./atom-one-dark-CL0A0LnX.js";var a=e(t(),1),o=`// A. Enums + User + Group + BalanceSheet
import java.util.*;

enum SplitType { EQUAL, EXACT, PERCENTAGE }

class User {
    private final String id;
    private final String name;
    private final String email;
    User(String id, String n, String e) { this.id = id; name = n; email = e; }
    public String getId() { return id; }
    public String getName() { return name; }
    public String getEmail() { return email; }
    @Override public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof User)) return false;
        return id.equals(((User) o).id);
    }
    @Override public int hashCode() { return id.hashCode(); }
}

class BalanceSheet {
    private final Map<User, Double> balances = new HashMap<>();
    public synchronized void updateBalance(User u, double delta) {
        balances.merge(u, delta, Double::sum);
    }
    public synchronized double getBalance(User u) {
        return balances.getOrDefault(u, 0.0);
    }
    public synchronized Map<User, Double> getAllBalances() {
        return new HashMap<>(balances);
    }
}

class Group {
    private final String id;
    private final String name;
    private final Set<User> members = new HashSet<>();
    private final BalanceSheet balanceSheet = new BalanceSheet();
    Group(String id, String n) { this.id = id; name = n; }
    public void addMember(User u) { members.add(u); }
    public boolean isMember(User u) { return members.contains(u); }
    public String getId() { return id; }
    public String getName() { return name; }
    public Set<User> getMembers() { return members; }
    public BalanceSheet getBalanceSheet() { return balanceSheet; }
}`,s=`// B. Expense + Split Strategies
abstract class SplitStrategy {
    public abstract Map<User, Double> calculate(double amount, List<User> participants,
                                                 Map<User, Double> shares);
}

class EqualSplit extends SplitStrategy {
    public Map<User, Double> calculate(double amount, List<User> participants,
                                        Map<User, Double> shares) {
        Map<User, Double> result = new HashMap<>();
        double each = amount / participants.size();
        for (User u : participants) result.put(u, each);
        return result;
    }
}

class ExactSplit extends SplitStrategy {
    public Map<User, Double> calculate(double amount, List<User> participants,
                                        Map<User, Double> shares) {
        double sum = shares.values().stream().mapToDouble(Double::doubleValue).sum();
        if (Math.abs(sum - amount) > 0.01)
            throw new IllegalArgumentException("Exact shares must sum to amount");
        return new HashMap<>(shares);
    }
}

class PercentageSplit extends SplitStrategy {
    public Map<User, Double> calculate(double amount, List<User> participants,
                                        Map<User, Double> shares) {
        double pctSum = shares.values().stream().mapToDouble(Double::doubleValue).sum();
        if (Math.abs(pctSum - 100.0) > 0.01)
            throw new IllegalArgumentException("Percentages must sum to 100");
        Map<User, Double> result = new HashMap<>();
        for (Map.Entry<User, Double> e : shares.entrySet())
            result.put(e.getKey(), amount * e.getValue() / 100.0);
        return result;
    }
}

class Expense {
    private final String id;
    private final User paidBy;
    private final double amount;
    private final List<User> participants;
    private final SplitType splitType;
    private final Map<User, Double> shares;
    private final long timestamp;

    Expense(String id, User paidBy, double amount, List<User> participants,
            SplitType splitType, Map<User, Double> rawShares, SplitStrategy strategy) {
        this.id = id; this.paidBy = paidBy; this.amount = amount;
        this.participants = participants; this.splitType = splitType;
        this.shares = strategy.calculate(amount, participants, rawShares);
        this.timestamp = System.currentTimeMillis();
    }
    public String getId() { return id; }
    public User getPaidBy() { return paidBy; }
    public double getAmount() { return amount; }
    public List<User> getParticipants() { return participants; }
    public SplitType getSplitType() { return splitType; }
    public Map<User, Double> getShares() { return shares; }
    public long getTimestamp() { return timestamp; }
}`,c=`// C. Observer + Service + Main
interface NotificationObserver {
    void onExpenseAdded(Expense e);
    void onSettlement(String groupId, User from, User to, double amount);
}
class EmailNotifier implements NotificationObserver {
    public void onExpenseAdded(Expense e) {
        System.out.println("[EMAIL] Expense " + e.getId() + " by " + e.getPaidBy().getName());
    }
    public void onSettlement(String g, User f, User t, double a) {
        System.out.println("[EMAIL] " + f.getName() + " settled " + a + " with " + t.getName());
    }
}
class PushNotifier implements NotificationObserver {
    public void onExpenseAdded(Expense e) {
        System.out.println("[PUSH] New expense: " + e.getAmount());
    }
    public void onSettlement(String g, User f, User t, double a) {
        System.out.println("[PUSH] Settlement recorded");
    }
}

class SplitwiseService {
    private static volatile SplitwiseService ins;
    private final Map<String, User> users = new HashMap<>();
    private final Map<String, Group> groups = new HashMap<>();
    private final List<Expense> expenses = new ArrayList<>();
    private final List<NotificationObserver> observers = new ArrayList<>();

    private SplitwiseService() {}

    public static SplitwiseService get() {
        if (ins == null) { synchronized (SplitwiseService.class) {
            if (ins == null) ins = new SplitwiseService(); } }
        return ins;
    }

    public void addUser(User u) { users.put(u.getId(), u); }
    public void createGroup(Group g) { groups.put(g.getId(), g); }
    public void addObserver(NotificationObserver o) { observers.add(o); }
    public Group getGroup(String id) { return groups.get(id); }

    public synchronized Expense addExpense(String groupId, User paidBy, double amount,
                                            List<User> participants, SplitType type,
                                            Map<User, Double> rawShares) {
        Group g = groups.get(groupId);
        if (g == null) throw new IllegalArgumentException("Group not found");
        SplitStrategy strategy = switch (type) {
            case EQUAL -> new EqualSplit();
            case EXACT -> new ExactSplit();
            case PERCENTAGE -> new PercentageSplit();
        };
        Expense e = new Expense("EXP-" + System.currentTimeMillis(),
                paidBy, amount, participants, type, rawShares, strategy);
        expenses.add(e);
        BalanceSheet bs = g.getBalanceSheet();
        bs.updateBalance(paidBy, amount);
        for (Map.Entry<User, Double> entry : e.getShares().entrySet())
            bs.updateBalance(entry.getKey(), -entry.getValue());
        for (NotificationObserver o : observers) o.onExpenseAdded(e);
        return e;
    }

    public synchronized Map<User, Double> getBalances(String groupId) {
        Group g = groups.get(groupId);
        if (g == null) return Collections.emptyMap();
        return g.getBalanceSheet().getAllBalances();
    }

    public synchronized void settleUp(String groupId, User from, User to, double amount) {
        Group g = groups.get(groupId);
        if (g == null) throw new IllegalArgumentException("Group not found");
        BalanceSheet bs = g.getBalanceSheet();
        bs.updateBalance(from, amount);
        bs.updateBalance(to, -amount);
        for (NotificationObserver o : observers) o.onSettlement(groupId, from, to, amount);
    }
}

public class Main {
    public static void main(String[] args) {
        SplitwiseService svc = SplitwiseService.get();
        svc.addObserver(new EmailNotifier());
        svc.addObserver(new PushNotifier());

        User alice = new User("U1", "Alice", "a@x.com");
        User bob   = new User("U2", "Bob",   "b@x.com");
        User carol = new User("U3", "Carol", "c@x.com");
        svc.addUser(alice); svc.addUser(bob); svc.addUser(carol);

        Group trip = new Group("G1", "Goa Trip");
        trip.addMember(alice); trip.addMember(bob); trip.addMember(carol);
        svc.createGroup(trip);

        svc.addExpense("G1", alice, 300.0,
                List.of(alice, bob, carol), SplitType.EQUAL, Collections.emptyMap());

        System.out.println("Balances: " + svc.getBalances("G1"));

        svc.settleUp("G1", bob, alice, 100.0);
        System.out.println("After settlement: " + svc.getBalances("G1"));
    }
}`,l=`-- 6 tables, normalized, minimal

CREATE TABLE users (
  user_id VARCHAR(20) PRIMARY KEY,
  name    VARCHAR(100) NOT NULL,
  email   VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE groups (
  group_id   VARCHAR(20) PRIMARY KEY,
  name       VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE group_members (
  group_id VARCHAR(20) NOT NULL,
  user_id  VARCHAR(20) NOT NULL,
  PRIMARY KEY (group_id, user_id),
  FOREIGN KEY (group_id) REFERENCES groups(group_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE expenses (
  expense_id   VARCHAR(20) PRIMARY KEY,
  group_id     VARCHAR(20) NOT NULL,
  paid_by      VARCHAR(20) NOT NULL,
  amount       DECIMAL(10,2) NOT NULL,
  description  VARCHAR(255),
  split_type   ENUM('EQUAL','EXACT','PERCENTAGE') NOT NULL,
  created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (group_id) REFERENCES groups(group_id),
  FOREIGN KEY (paid_by) REFERENCES users(user_id)
);
CREATE INDEX idx_expense_group ON expenses(group_id);

CREATE TABLE expense_shares (
  expense_id VARCHAR(20) NOT NULL,
  user_id    VARCHAR(20) NOT NULL,
  share      DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (expense_id, user_id),
  FOREIGN KEY (expense_id) REFERENCES expenses(expense_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE settlements (
  settlement_id VARCHAR(20) PRIMARY KEY,
  group_id      VARCHAR(20) NOT NULL,
  from_user     VARCHAR(20) NOT NULL,
  to_user       VARCHAR(20) NOT NULL,
  amount        DECIMAL(10,2) NOT NULL,
  settled_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (group_id) REFERENCES groups(group_id),
  FOREIGN KEY (from_user) REFERENCES users(user_id),
  FOREIGN KEY (to_user) REFERENCES users(user_id)
);
CREATE INDEX idx_settlement_group ON settlements(group_id);`,u=`----------------------------------------
  SplitwiseService  (Singleton)
  - users: Map<String, User>
  - groups: Map<String, Group>
  - expenses: List<Expense>
  - observers: List<NotificationObserver>
  + addUser(user)
  + createGroup(group)
  + addExpense(expense)
  + getBalances(groupId): Map<User, Double>
  + settleUp(from, to, amount)
  + addObserver(observer)
----------------------------------------
      |owns (groups die with service)
      v
----------------------------------------
  Group                       User
  - id: String                - id: String
  - name: String              - name: String
  - members: Set<User>        - email: String
  - balanceSheet
  + addMember()
  + isMember()
----------------------------------------
      |owns
      v
----------------------------------------
  BalanceSheet
  - balances: Map<User, Double>
  + updateBalance()
  + getBalance()
----------------------------------------

SplitwiseService --creates--> Expense
  - payer: User
  - amount: double
  - participants: List<User>
  - splitStrategy: SplitStrategy
  - shares: Map<User, Double>

SplitwiseService --uses--> SplitStrategy (interface)
                            |-- EqualSplit
                            |-- ExactSplit
                            +-- PercentageSplit
SplitwiseService --uses--> NotificationObserver (interface)
                            |-- EmailNotifier
                            +-- PushNotifier`,d=r();function f({code:e,lang:t}){let n=(0,a.useRef)(null);return(0,a.useEffect)(()=>{n.current&&(n.current.removeAttribute(`data-highlighted`),i.highlightElement(n.current))},[e]),(0,d.jsxs)(`div`,{className:`sw-code`,children:[(0,d.jsxs)(`div`,{className:`sw-code-head`,children:[(0,d.jsxs)(`span`,{className:`dots`,children:[(0,d.jsx)(`i`,{}),(0,d.jsx)(`i`,{}),(0,d.jsx)(`i`,{})]}),(0,d.jsx)(`span`,{className:`pl-lang`,children:t})]}),(0,d.jsx)(`pre`,{className:`sw-pre`,children:(0,d.jsx)(`code`,{ref:n,className:`language-${t}`,children:e})})]})}var p=({id:e,children:t})=>(0,d.jsx)(`section`,{id:e,className:`sw-section`,children:t}),m=({children:e})=>(0,d.jsx)(`h2`,{className:`sw-h2`,children:e}),h=({children:e})=>(0,d.jsx)(`h3`,{className:`sw-h3`,children:e}),g=({title:e,children:t})=>(0,d.jsxs)(`div`,{className:`sw-bullet`,children:[(0,d.jsx)(`b`,{children:e}),(0,d.jsx)(`span`,{children:t})]}),_=({children:e})=>(0,d.jsx)(`div`,{className:`sw-tip`,children:e});function v(){return(0,d.jsxs)(`div`,{className:`sw-root`,children:[(0,d.jsxs)(`header`,{className:`sw-header`,children:[(0,d.jsx)(n,{to:`/maang/system-design/advanced`,className:`sw-back`,children:`← Back to Advanced System Design`}),(0,d.jsxs)(`h1`,{children:[(0,d.jsx)(`i`,{className:`fas fa-money-bill-transfer`}),` Splitwise — LLD `,(0,d.jsxs)(`span`,{className:`sw-badge`,children:[(0,d.jsx)(`i`,{className:`fab fa-java`}),` Java + UML`]})]}),(0,d.jsxs)(`div`,{className:`sw-sub-info`,children:[(0,d.jsxs)(`span`,{children:[(0,d.jsx)(`i`,{className:`fas fa-list-check`}),` 6 Steps`]}),(0,d.jsxs)(`span`,{children:[(0,d.jsx)(`i`,{className:`fas fa-code`}),` Working Java`]}),(0,d.jsxs)(`span`,{children:[(0,d.jsx)(`i`,{className:`fas fa-database`}),` DB Schema`]}),(0,d.jsxs)(`span`,{className:`sw-badge-alt`,children:[(0,d.jsx)(`i`,{className:`fas fa-mouse-pointer`}),` Scroll down`]})]}),(0,d.jsxs)(`nav`,{className:`sw-nav`,children:[(0,d.jsx)(`a`,{href:`#req`,children:`1. Requirements`}),(0,d.jsx)(`a`,{href:`#ent`,children:`2. Entities`}),(0,d.jsx)(`a`,{href:`#uml`,children:`3. Diagram`}),(0,d.jsx)(`a`,{href:`#db`,children:`4. DB`}),(0,d.jsx)(`a`,{href:`#java`,children:`5. Java`}),(0,d.jsx)(`a`,{href:`#wrap`,children:`6. Wrap-up`})]})]}),(0,d.jsxs)(p,{id:`req`,children:[(0,d.jsxs)(m,{children:[(0,d.jsx)(`i`,{className:`fas fa-list-check`}),` Step 1 — Requirements (5 min)`]}),(0,d.jsxs)(`p`,{className:`sw-intro`,children:[(0,d.jsx)(`b`,{children:`What to do:`}),` Pick `,(0,d.jsx)(`b`,{children:`4 functional`}),` + `,(0,d.jsx)(`b`,{children:`3 non-functional`}),`. State what is OUT of scope (multi-currency, bank settlements, recurring expenses).`]}),(0,d.jsx)(h,{children:`Functional — what the system DOES`}),(0,d.jsxs)(g,{title:`1. Users + Groups`,children:[`Each user has id, name, email. Groups contain members. A user can belong to multiple groups.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: drives the membership check and balance scoping.`})]}),(0,d.jsxs)(g,{title:`2. Add expense with split strategies`,children:[`Equal, Exact, Percentage splits. Expense has payer, amount, participants, split type.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: Strategy pattern — swap split algorithms without changing core.`})]}),(0,d.jsxs)(g,{title:`3. Balance calculation — who owes whom`,children:[`Net balance per user per group. Positive = gets back, negative = owes.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: links Expense + User — core value of the system.`})]}),(0,d.jsxs)(g,{title:`4. Settle up — record payment`,children:[`User can settle a balance. Creates a Settlement record. Balances update.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: closes the loop — full lifecycle.`})]}),(0,d.jsx)(h,{children:`Non-Functional — how the system BEHAVES`}),(0,d.jsxs)(g,{title:`1. Thread-safe balance updates`,children:[`Two expenses added simultaneously must not corrupt balances. Use synchronized.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: concurrency is the #1 follow-up question.`})]}),(0,d.jsxs)(g,{title:`2. Extensible`,children:[`New split type = new SplitStrategy. New notification = new Observer. No core changes.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: shows SOLID, especially OCP and DIP.`})]}),(0,d.jsxs)(g,{title:`3. Low latency — O(1) balance lookup`,children:[`Balance lookup by (user, group) should be O(1). Use nested Map.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: signals you think about performance.`})]}),(0,d.jsxs)(_,{children:[(0,d.jsx)(`b`,{children:`Interview line:`}),` Skip multi-currency, bank settlements, recurring expenses unless asked — keeps design focused on add expense, balance, settle flow.`]})]}),(0,d.jsxs)(p,{id:`ent`,children:[(0,d.jsxs)(m,{children:[(0,d.jsx)(`i`,{className:`fas fa-users`}),` Step 2 — Entities (3 min)`]}),(0,d.jsxs)(`p`,{className:`sw-intro`,children:[(0,d.jsx)(`b`,{children:`Rule:`}),` Take nouns from requirements — each becomes a class.`]}),(0,d.jsxs)(g,{title:`SplitwiseService (Singleton)`,children:[`Top-level facade. Holds users, groups, expenses. Has addExpense, getBalances, settleUp.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why Singleton: only one service instance.`})]}),(0,d.jsxs)(g,{title:`User`,children:[`Has id, name, email. Immutable identity.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: user is the actor — everything revolves around them.`})]}),(0,d.jsxs)(g,{title:`Group`,children:[`Contains members. Has addMember, isMember.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: separates group logic from service.`})]}),(0,d.jsxs)(g,{title:`Expense`,children:[`Has id, payer, amount, participants, splitType, shares. Created via factory.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: core entity — nothing happens without it.`})]}),(0,d.jsxs)(g,{title:`Split (abstract) + Equal/Exact/Percentage`,children:[`calculate(amount, participants, shares) returns per-user amounts.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: inheritance + Strategy — same interface, different rules.`})]}),(0,d.jsxs)(g,{title:`BalanceSheet`,children:[`Holds Map per group. Has updateBalance, getBalance.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: separates balance logic from expense (SRP).`})]}),(0,d.jsxs)(g,{title:`Settlement`,children:[`Records a payment from one user to another. Has fromUser, toUser, amount.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: settlement is the receipt — closes the loop.`})]}),(0,d.jsxs)(g,{title:`NotificationObserver (interface) + Email/Push`,children:[`onExpenseAdded, onSettlement.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: Observer pattern — notify without coupling.`})]})]}),(0,d.jsxs)(p,{id:`uml`,children:[(0,d.jsxs)(m,{children:[(0,d.jsx)(`i`,{className:`fas fa-project-diagram`}),` Step 3 — Class Diagram (10 min)`]}),(0,d.jsx)(`p`,{className:`sw-intro`,children:`Draw this on the whiteboard. Relationships are the key signal:`}),(0,d.jsx)(f,{code:u,lang:`text`}),(0,d.jsxs)(_,{children:[(0,d.jsx)(`b`,{children:`Key relationship:`}),` Service to Group is Composition. Expense to SplitStrategy is Dependency on interface (DIP). Observer notifies without coupling.`]})]}),(0,d.jsxs)(p,{id:`db`,children:[(0,d.jsxs)(m,{children:[(0,d.jsx)(`i`,{className:`fas fa-database`}),` Step 4 — DB Design (5 min)`]}),(0,d.jsx)(`p`,{className:`sw-intro`,children:`Even for in-memory LLD, show you can persist it. 6 normalized tables:`}),(0,d.jsx)(f,{code:l,lang:`sql`}),(0,d.jsxs)(g,{title:`idx_expense_group on expenses(group_id)`,children:[`Makes group expense lookup O(log n). Without this, scanning is O(n).`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: interviewers ask about indexing.`})]}),(0,d.jsxs)(g,{title:`expense_shares separate table`,children:[`One expense has many shares. Normalized — no repeating columns.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: 1-to-N relationship.`})]}),(0,d.jsxs)(g,{title:`Settlements separate table`,children:[`Distinct from expenses. Keeping them separate preserves history.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: audit trail — never delete, only append.`})]})]}),(0,d.jsxs)(p,{id:`java`,children:[(0,d.jsxs)(m,{children:[(0,d.jsx)(`i`,{className:`fab fa-java`}),` Step 5 — Java Code (20-25 min)`]}),(0,d.jsx)(`p`,{className:`sw-intro`,children:`Minimal working Java. Skip boilerplate getters unless asked:`}),(0,d.jsx)(h,{children:`Block A — Enums + User + Group`}),(0,d.jsx)(f,{code:o,lang:`java`}),(0,d.jsx)(h,{children:`Block B — Expense + Split Strategies`}),(0,d.jsx)(f,{code:s,lang:`java`}),(0,d.jsx)(h,{children:`Block C — Observer + Service + Main`}),(0,d.jsx)(f,{code:c,lang:`java`})]}),(0,d.jsxs)(p,{id:`wrap`,children:[(0,d.jsxs)(m,{children:[(0,d.jsx)(`i`,{className:`fas fa-flag-checkered`}),` Step 6 — Wrap-up (3 min)`]}),(0,d.jsx)(`p`,{className:`sw-intro`,children:`Be ready to answer these without thinking:`}),(0,d.jsxs)(g,{title:`Concurrency — prevent corrupted balances?`,children:[`updateBalance is synchronized. For scale, ConcurrentHashMap with atomic merge.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: shows concurrency awareness.`})]}),(0,d.jsxs)(g,{title:`How does balance calculation work?`,children:[`Payer credited full amount, each participant debited their share. Positive = gets back, negative = owes.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: the core logic — must explain clearly.`})]}),(0,d.jsxs)(g,{title:`How would you add a new split type?`,children:[`New SplitStrategy subclass + enum + switch case. No other changes — OCP.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: the answer they want to hear.`})]}),(0,d.jsxs)(g,{title:`Patterns used + SOLID`,children:[`Singleton, Strategy, Observer, Composition. SRP, OCP, DIP.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: naming patterns shows design vocabulary.`})]}),(0,d.jsxs)(_,{children:[(0,d.jsx)(`b`,{children:`Scorecard:`}),` Requirements (5) + Entities (3) + Diagram (10) + DB (5) + Code (20) + Wrap-up (3) = 46 min.`]})]}),(0,d.jsx)(`footer`,{className:`sw-footer`,children:(0,d.jsx)(n,{to:`/maang/system-design/advanced`,children:`Back to Advanced System Design`})})]})}export{v as default};