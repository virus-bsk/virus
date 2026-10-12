import{r as e}from"./rolldown-runtime-QTnfLwEv.js";import{t}from"./react-CZI7_Jkm.js";import{o as n,r}from"./index-DCrc1KQY.js";import{t as i}from"./atom-one-dark-CL0A0LnX.js";var a=e(t(),1),o=`// A. Enums + Product + Slot
enum VendingMachineState { IDLE, PRODUCT_SELECTED, PAYMENT_PENDING, DISPENSING, OUT_OF_STOCK }
enum TransactionStatus { PENDING, SUCCESS, FAILED, REFUNDED }
enum PaymentStatus { SUCCESS, FAILED }

class Product {
    private final String code;
    private final String name;
    private final double price;
    Product(String c, String n, double p) { code = c; name = n; price = p; }
    public String getCode() { return code; }
    public String getName() { return name; }
    public double getPrice() { return price; }
}

class Slot {
    private final String code;
    private final Product product;
    private int quantity;
    private final int maxCapacity;
    Slot(String c, Product p, int q, int max) {
        code = c; product = p; quantity = q; maxCapacity = max;
    }
    public synchronized boolean isAvailable() { return quantity > 0; }
    public synchronized boolean dispense() {
        if (quantity <= 0) return false;
        quantity--; return true;
    }
    public synchronized void restock(int qty) {
        quantity = Math.min(maxCapacity, quantity + qty);
    }
    public String getCode() { return code; }
    public Product getProduct() { return product; }
    public int getQuantity() { return quantity; }
}`,s=`// B. Transaction + Payment + Change
class Transaction {
    private final String id;
    private final Product product;
    private double amountPaid;
    private double change;
    private final long timestamp;
    private TransactionStatus status;
    Transaction(String id, Product p, long t) {
        this.id = id; product = p; timestamp = t; status = TransactionStatus.PENDING;
    }
    public void markPaid(double amt, double ch) {
        amountPaid = amt; change = ch; status = TransactionStatus.SUCCESS;
    }
    public void markFailed() { status = TransactionStatus.FAILED; }
    public void markRefunded() { status = TransactionStatus.REFUNDED; }
    public String getId() { return id; }
    public Product getProduct() { return product; }
    public double getAmountPaid() { return amountPaid; }
    public double getChange() { return change; }
    public TransactionStatus getStatus() { return status; }
}

interface PaymentStrategy {
    PaymentStatus pay(double amount);
}
class CashPayment implements PaymentStrategy {
    public PaymentStatus pay(double a) { return PaymentStatus.SUCCESS; }
}
class CardPayment implements PaymentStrategy {
    public PaymentStatus pay(double a) { return PaymentStatus.SUCCESS; }
}

interface ChangeDispenser {
    double calculateChange(double paid, double price);
}
class StandardChangeDispenser implements ChangeDispenser {
    public double calculateChange(double paid, double price) {
        return Math.max(0, paid - price);
    }
}`,c=`// C. States + VendingMachine + Main
interface VendingMachineStateI {
    boolean selectProduct(VendingMachine m, String code);
    boolean insertPayment(VendingMachine m, PaymentStrategy pay, double amount);
    Product dispense(VendingMachine m);
}

class IdleState implements VendingMachineStateI {
    public boolean selectProduct(VendingMachine m, String code) {
        Slot s = m.getSlot(code);
        if (s == null || !s.isAvailable()) return false;
        m.setSelectedSlot(s);
        m.setState(new PaymentPendingState());
        return true;
    }
    public boolean insertPayment(VendingMachine m, PaymentStrategy p, double a) { return false; }
    public Product dispense(VendingMachine m) { return null; }
}

class PaymentPendingState implements VendingMachineStateI {
    public boolean selectProduct(VendingMachine m, String code) { return false; }
    public boolean insertPayment(VendingMachine m, PaymentStrategy pay, double amount) {
        Slot s = m.getSelectedSlot();
        if (s == null) return false;
        double price = s.getProduct().getPrice();
        if (amount < price) return false;
        if (pay.pay(amount) != PaymentStatus.SUCCESS) return false;
        double change = m.getChangeDispenser().calculateChange(amount, price);
        m.setCurrentTransaction(new Transaction(
            "TXN-" + System.currentTimeMillis(), s.getProduct(), System.currentTimeMillis()));
        m.getCurrentTransaction().markPaid(amount, change);
        m.setState(new DispensingState());
        return true;
    }
    public Product dispense(VendingMachine m) { return null; }
}

class DispensingState implements VendingMachineStateI {
    public boolean selectProduct(VendingMachine m, String code) { return false; }
    public boolean insertPayment(VendingMachine m, PaymentStrategy p, double a) { return false; }
    public Product dispense(VendingMachine m) {
        Slot s = m.getSelectedSlot();
        if (s == null || !s.dispense()) {
            m.getCurrentTransaction().markFailed();
            m.setState(new IdleState());
            return null;
        }
        Product p = s.getProduct();
        m.setState(new IdleState());
        return p;
    }
}

class VendingMachine {
    private static volatile VendingMachine ins;
    private final java.util.Map<String, Slot> slots = new java.util.HashMap<>();
    private VendingMachineStateI state = new IdleState();
    private Slot selectedSlot;
    private Transaction currentTransaction;
    private final ChangeDispenser changeDispenser = new StandardChangeDispenser();

    private VendingMachine() {}

    public static VendingMachine get() {
        if (ins == null) { synchronized (VendingMachine.class) {
            if (ins == null) ins = new VendingMachine(); } }
        return ins;
    }

    public void addSlot(Slot s) { slots.put(s.getCode(), s); }
    public Slot getSlot(String code) { return slots.get(code); }
    public Slot getSelectedSlot() { return selectedSlot; }
    public void setSelectedSlot(Slot s) { selectedSlot = s; }
    public void setState(VendingMachineStateI s) { state = s; }
    public VendingMachineStateI getState() { return state; }
    public Transaction getCurrentTransaction() { return currentTransaction; }
    public void setCurrentTransaction(Transaction t) { currentTransaction = t; }
    public ChangeDispenser getChangeDispenser() { return changeDispenser; }

    public boolean selectProduct(String code) { return state.selectProduct(this, code); }
    public boolean insertPayment(PaymentStrategy pay, double amount) {
        return state.insertPayment(this, pay, amount);
    }
    public Product dispense() { return state.dispense(this); }
}

public class Main {
    public static void main(String[] args) {
        VendingMachine vm = VendingMachine.get();
        vm.addSlot(new Slot("A1", new Product("P001", "Coke", 1.50), 5, 10));
        vm.addSlot(new Slot("A2", new Product("P002", "Chips", 1.00), 3, 10));

        vm.selectProduct("A1");
        vm.insertPayment(new CashPayment(), 2.00);
        Product p = vm.dispense();
        System.out.println("Dispensed: " + p.getName());
        System.out.println("Change: " + vm.getCurrentTransaction().getChange());
    }
}`,l=`-- 4 tables, normalized, minimal

CREATE TABLE products (
  product_code VARCHAR(20) PRIMARY KEY,
  name         VARCHAR(100) NOT NULL,
  price        DECIMAL(10,2) NOT NULL
);

CREATE TABLE slots (
  slot_code    VARCHAR(20) PRIMARY KEY,
  product_code VARCHAR(20) NOT NULL,
  quantity     INT NOT NULL DEFAULT 0,
  max_capacity INT NOT NULL DEFAULT 10,
  FOREIGN KEY (product_code) REFERENCES products(product_code)
);
CREATE INDEX idx_slot_product ON slots(product_code);

CREATE TABLE transactions (
  transaction_id VARCHAR(20) PRIMARY KEY,
  slot_code      VARCHAR(20) NOT NULL,
  product_code   VARCHAR(20) NOT NULL,
  amount_paid    DECIMAL(10,2) NOT NULL,
  change_given   DECIMAL(10,2) DEFAULT 0,
  status         ENUM('PENDING','SUCCESS','FAILED','REFUNDED') DEFAULT 'PENDING',
  created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (slot_code) REFERENCES slots(slot_code),
  FOREIGN KEY (product_code) REFERENCES products(product_code)
);

CREATE TABLE payments (
  payment_id     VARCHAR(20) PRIMARY KEY,
  transaction_id VARCHAR(20) NOT NULL,
  method         ENUM('CASH','CARD','UPI') NOT NULL,
  amount         DECIMAL(10,2) NOT NULL,
  status         ENUM('SUCCESS','FAILED') NOT NULL,
  paid_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (transaction_id) REFERENCES transactions(transaction_id)
);`,u=`----------------------------------------
  VendingMachine  (Singleton)
  - slots: Map<String, Slot>
  - state: VendingMachineState
  - currentTransaction: Transaction
  + selectProduct(code): boolean
  + insertPayment(strategy, amount): boolean
  + dispense(): Product
  + restock(code, qty)
----------------------------------------
      |owns (slots die with machine)
      v
----------------------------------------
  Slot                      Product
  - code: String            - code: String
  - quantity: int           - name: String
  - product: Product        - price: double
  + isAvailable()
  + dispense()
  + restock(qty)
----------------------------------------
      |holds 0..1
      v
----------------------------------------
  Transaction
  - id: String
  - product: Product
  - amountPaid: double
  - change: double
  - timestamp: long
  - status: TransactionStatus
----------------------------------------

VendingMachine --uses--> PaymentStrategy (interface)
                          |-- CashPayment
                          +-- CardPayment
VendingMachine --uses--> ChangeDispenser (interface)
                          +-- StandardChangeDispenser
VendingMachine --has--> VendingMachineState (State pattern)
                          |-- IdleState
                          |-- ProductSelectedState
                          |-- PaymentPendingState
                          +-- DispensingState`,d=r();function f({code:e,lang:t}){let n=(0,a.useRef)(null);return(0,a.useEffect)(()=>{n.current&&(n.current.removeAttribute(`data-highlighted`),i.highlightElement(n.current))},[e]),(0,d.jsxs)(`div`,{className:`vm-code`,children:[(0,d.jsxs)(`div`,{className:`vm-code-head`,children:[(0,d.jsxs)(`span`,{className:`dots`,children:[(0,d.jsx)(`i`,{}),(0,d.jsx)(`i`,{}),(0,d.jsx)(`i`,{})]}),(0,d.jsx)(`span`,{className:`pl-lang`,children:t})]}),(0,d.jsx)(`pre`,{className:`vm-pre`,children:(0,d.jsx)(`code`,{ref:n,className:`language-${t}`,children:e})})]})}var p=({id:e,children:t})=>(0,d.jsx)(`section`,{id:e,className:`vm-section`,children:t}),m=({children:e})=>(0,d.jsx)(`h2`,{className:`vm-h2`,children:e}),h=({children:e})=>(0,d.jsx)(`h3`,{className:`vm-h3`,children:e}),g=({title:e,children:t})=>(0,d.jsxs)(`div`,{className:`vm-bullet`,children:[(0,d.jsx)(`b`,{children:e}),(0,d.jsx)(`span`,{children:t})]}),_=({children:e})=>(0,d.jsx)(`div`,{className:`vm-tip`,children:e});function v(){return(0,d.jsxs)(`div`,{className:`vm-root`,children:[(0,d.jsxs)(`header`,{className:`vm-header`,children:[(0,d.jsx)(n,{to:`/maang/system-design/advanced`,className:`vm-back`,children:`← Back to Advanced System Design`}),(0,d.jsxs)(`h1`,{children:[(0,d.jsx)(`i`,{className:`fas fa-candy-cane`}),` Vending Machine — LLD `,(0,d.jsxs)(`span`,{className:`vm-badge`,children:[(0,d.jsx)(`i`,{className:`fab fa-java`}),` Java + UML`]})]}),(0,d.jsxs)(`div`,{className:`vm-sub-info`,children:[(0,d.jsxs)(`span`,{children:[(0,d.jsx)(`i`,{className:`fas fa-list-check`}),` 6 Steps`]}),(0,d.jsxs)(`span`,{children:[(0,d.jsx)(`i`,{className:`fas fa-code`}),` Working Java`]}),(0,d.jsxs)(`span`,{children:[(0,d.jsx)(`i`,{className:`fas fa-database`}),` DB Schema`]}),(0,d.jsxs)(`span`,{className:`vm-badge-alt`,children:[(0,d.jsx)(`i`,{className:`fas fa-mouse-pointer`}),` Scroll down`]})]}),(0,d.jsxs)(`nav`,{className:`vm-nav`,children:[(0,d.jsx)(`a`,{href:`#req`,children:`1. Requirements`}),(0,d.jsx)(`a`,{href:`#ent`,children:`2. Entities`}),(0,d.jsx)(`a`,{href:`#uml`,children:`3. Diagram`}),(0,d.jsx)(`a`,{href:`#db`,children:`4. DB`}),(0,d.jsx)(`a`,{href:`#java`,children:`5. Java`}),(0,d.jsx)(`a`,{href:`#wrap`,children:`6. Wrap-up`})]})]}),(0,d.jsxs)(p,{id:`req`,children:[(0,d.jsxs)(m,{children:[(0,d.jsx)(`i`,{className:`fas fa-list-check`}),` Step 1 — Requirements (5 min)`]}),(0,d.jsxs)(`p`,{className:`vm-intro`,children:[(0,d.jsx)(`b`,{children:`What to do:`}),` Pick `,(0,d.jsx)(`b`,{children:`4 functional`}),` + `,(0,d.jsx)(`b`,{children:`3 non-functional`}),`. State what is OUT of scope (refunds, dynamic pricing, cashless wallets).`]}),(0,d.jsx)(h,{children:`Functional — what the system DOES`}),(0,d.jsxs)(g,{title:`1. Product inventory with slots`,children:[`Each slot holds one product type with a quantity. Products have code, name, price. Slot is the smallest allocatable unit.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: drives the dispense logic and inventory checks.`})]}),(0,d.jsxs)(g,{title:`2. Multiple payment methods — Cash + Card`,children:[`At least two methods. Use PaymentStrategy interface so UPI can be added later without touching core.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: demonstrates Open/Closed Principle (OCP).`})]}),(0,d.jsxs)(g,{title:`3. Purchase flow — select, pay, dispense`,children:[`User selects product code, system validates stock, collects payment, dispenses item, updates inventory.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: links Product + Slot + Payment — core flow.`})]}),(0,d.jsxs)(g,{title:`4. Change/refund handling`,children:[`If payment exceeds price, return change. If dispense fails after payment, refund full amount.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: real-world edge case — beyond happy path.`})]}),(0,d.jsx)(h,{children:`Non-Functional — how the system BEHAVES`}),(0,d.jsxs)(g,{title:`1. Thread-safe inventory`,children:[`Two users buying same product must not both get it if only one left. Use synchronized on slot.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: concurrency is the #1 follow-up question.`})]}),(0,d.jsxs)(g,{title:`2. Extensible`,children:[`New payment method = new strategy. New product type = new subclass. No core class changes.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: shows SOLID, especially OCP and DIP.`})]}),(0,d.jsxs)(g,{title:`3. Low latency — O(1) product lookup`,children:[`Product lookup by code should be O(1). Use Map not linear scan.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: signals you think about performance.`})]}),(0,d.jsxs)(_,{children:[(0,d.jsx)(`b`,{children:`Interview line:`}),` Skip refunds, dynamic pricing, cashless wallets unless asked — keeps design focused on select, pay, dispense flow.`]})]}),(0,d.jsxs)(p,{id:`ent`,children:[(0,d.jsxs)(m,{children:[(0,d.jsx)(`i`,{className:`fas fa-boxes-stacked`}),` Step 2 — Entities (3 min)`]}),(0,d.jsxs)(`p`,{className:`vm-intro`,children:[(0,d.jsx)(`b`,{children:`Rule:`}),` Take nouns from requirements — each becomes a class. 8 classes is the sweet spot.`]}),(0,d.jsxs)(g,{title:`VendingMachine (Singleton)`,children:[`Top-level container. Holds slots. Has selectProduct, insertPayment, dispense.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why Singleton: only one machine instance per physical unit.`})]}),(0,d.jsxs)(g,{title:`Slot`,children:[`Holds one product type + quantity. Has isAvailable, dispense, restock.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: slot is the unit of concurrency — lock here, not whole machine.`})]}),(0,d.jsxs)(g,{title:`Product`,children:[`Immutable value object. Has code, name, price.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: separate from slot (which holds inventory).`})]}),(0,d.jsxs)(g,{title:`PaymentStrategy + Cash/Card (interfaces)`,children:[`pay(double) - Cash, Card, UPI.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: Strategy pattern — swap algorithms without changing caller (OCP).`})]}),(0,d.jsxs)(g,{title:`Transaction`,children:[`Links Product + Slot + payment + timestamp. Records what happened.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: transaction is the receipt — nothing happens without it.`})]}),(0,d.jsxs)(g,{title:`VendingMachineState (State pattern)`,children:[`IDLE, PRODUCT_SELECTED, PAYMENT_PENDING, DISPENSING.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: State pattern — machine behaves differently per state.`})]})]}),(0,d.jsxs)(p,{id:`uml`,children:[(0,d.jsxs)(m,{children:[(0,d.jsx)(`i`,{className:`fas fa-project-diagram`}),` Step 3 — Class Diagram (10 min)`]}),(0,d.jsx)(`p`,{className:`vm-intro`,children:`Draw this on the whiteboard. Relationships are the key signal:`}),(0,d.jsx)(f,{code:u,lang:`text`}),(0,d.jsxs)(_,{children:[(0,d.jsx)(`b`,{children:`Key relationship:`}),` Machine to Slot is Composition. Machine to Payment is Dependency on interface (DIP).`]})]}),(0,d.jsxs)(p,{id:`db`,children:[(0,d.jsxs)(m,{children:[(0,d.jsx)(`i`,{className:`fas fa-database`}),` Step 4 — DB Design (5 min)`]}),(0,d.jsx)(`p`,{className:`vm-intro`,children:`Even for in-memory LLD, show you can persist it. 4 normalized tables:`}),(0,d.jsx)(f,{code:l,lang:`sql`}),(0,d.jsxs)(g,{title:`idx_slot_product on slots(product_code)`,children:[`Makes product-to-slot lookup O(log n). Without this, scanning all slots is O(n).`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: interviewers ask about indexing.`})]}),(0,d.jsxs)(g,{title:`Separate payments table`,children:[`One transaction can have multiple payment attempts. Separating keeps transactions clean.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: 1-to-N relationship — retry logic.`})]})]}),(0,d.jsxs)(p,{id:`java`,children:[(0,d.jsxs)(m,{children:[(0,d.jsx)(`i`,{className:`fab fa-java`}),` Step 5 — Java Code (20-25 min)`]}),(0,d.jsx)(`p`,{className:`vm-intro`,children:`Minimal working Java. Skip boilerplate getters unless asked:`}),(0,d.jsx)(h,{children:`Block A — Enums + Product + Slot`}),(0,d.jsx)(f,{code:o,lang:`java`}),(0,d.jsx)(h,{children:`Block B — Transaction + Payment + Change`}),(0,d.jsx)(f,{code:s,lang:`java`}),(0,d.jsx)(h,{children:`Block C — States + VendingMachine + Main`}),(0,d.jsx)(f,{code:c,lang:`java`})]}),(0,d.jsxs)(p,{id:`wrap`,children:[(0,d.jsxs)(m,{children:[(0,d.jsx)(`i`,{className:`fas fa-flag-checkered`}),` Step 6 — Wrap-up (3 min)`]}),(0,d.jsx)(`p`,{className:`vm-intro`,children:`Be ready to answer these without thinking:`}),(0,d.jsxs)(g,{title:`Concurrency — how do you prevent double-dispense?`,children:[`Slot dispense is synchronized on the slot itself — fine-grained lock, not whole machine.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: fine-grained locking shows maturity.`})]}),(0,d.jsxs)(g,{title:`What if payment succeeds but dispense fails?`,children:[`Transaction marked FAILED, full refund issued. Machine returns to IDLE.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: shows you handle failure paths.`})]}),(0,d.jsxs)(g,{title:`How would you add a new payment method?`,children:[`Create a new PaymentStrategy implementation. No other class changes — OCP.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: the answer they want to hear.`})]}),(0,d.jsxs)(g,{title:`Patterns used + SOLID`,children:[`Singleton, Strategy, State, Composition. SRP, OCP, DIP.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: naming patterns shows design vocabulary.`})]}),(0,d.jsxs)(_,{children:[(0,d.jsx)(`b`,{children:`Scorecard:`}),` Requirements (5) + Entities (3) + Diagram (10) + DB (5) + Code (20) + Wrap-up (3) = 46 min.`]})]}),(0,d.jsx)(`footer`,{className:`vm-footer`,children:(0,d.jsx)(n,{to:`/maang/system-design/advanced`,children:`Back to Advanced System Design`})})]})}export{v as default};