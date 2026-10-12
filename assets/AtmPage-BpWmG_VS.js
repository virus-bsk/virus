import{r as e}from"./rolldown-runtime-QTnfLwEv.js";import{t}from"./react-CZI7_Jkm.js";import{o as n,r}from"./index-DCrc1KQY.js";import{t as i}from"./atom-one-dark-CL0A0LnX.js";var a=e(t(),1),o=`// A. Enums + Card + Account + BankService
import java.util.*;

enum TransactionType { WITHDRAWAL, DEPOSIT, TRANSFER, BALANCE_ENQUIRY }
enum TransactionStatus { PENDING, SUCCESS, FAILED }
enum CardStatus { ACTIVE, BLOCKED, EXPIRED }
enum AccountStatus { ACTIVE, FROZEN, CLOSED }

class Account {
    private final String id;
    private final String accountNumber;
    private final String ownerName;
    private double balance;
    private AccountStatus status = AccountStatus.ACTIVE;
    Account(String id, String num, String owner, double bal) {
        this.id = id; accountNumber = num; ownerName = owner; balance = bal;
    }
    public String getId() { return id; }
    public String getAccountNumber() { return accountNumber; }
    public double getBalance() { return balance; }
    public AccountStatus getStatus() { return status; }
    public synchronized void debit(double amt) {
        if (balance < amt) throw new IllegalStateException("Insufficient funds");
        balance -= amt;
    }
    public synchronized void credit(double amt) { balance += amt; }
}

class Card {
    private final String cardNumber;
    private final Account account;
    private final String bankName;
    private final String pinHash;
    private CardStatus status = CardStatus.ACTIVE;
    private int failedAttempts = 0;
    Card(String num, Account acc, String bank, String pin) {
        cardNumber = num; account = acc; bankName = bank; pinHash = hash(pin);
    }
    private static String hash(String pin) { return "HASH_" + pin; }
    public boolean verifyPin(String pin) {
        if (status != CardStatus.ACTIVE) return false;
        if (pinHash.equals(hash(pin))) { failedAttempts = 0; return true; }
        failedAttempts++;
        if (failedAttempts >= 3) status = CardStatus.BLOCKED;
        return false;
    }
    public String getCardNumber() { return cardNumber; }
    public Account getAccount() { return account; }
    public CardStatus getStatus() { return status; }
}

interface BankService {
    boolean authenticate(Card card, String pin);
    double getBalance(Account acc);
    void debit(Account acc, double amt);
    void credit(Account acc, double amt);
}

class MockBankService implements BankService {
    public boolean authenticate(Card card, String pin) { return card.verifyPin(pin); }
    public double getBalance(Account acc) { return acc.getBalance(); }
    public void debit(Account acc, double amt) { acc.debit(amt); }
    public void credit(Account acc, double amt) { acc.credit(amt); }
}`,s=`// B. CashDispenser chain + Transaction
abstract class CashDispenser {
    protected CashDispenser next;
    protected final int denomination;
    protected int count;
    CashDispenser(int denom, int cnt) { denomination = denom; count = cnt; }
    public void setNext(CashDispenser n) { next = n; }
    public synchronized Map<Integer, Integer> dispense(int amount) {
        Map<Integer, Integer> result = new LinkedHashMap<>();
        int notesNeeded = amount / denomination;
        int notesToGive = Math.min(notesNeeded, count);
        if (notesToGive > 0) {
            count -= notesToGive;
            result.put(denomination, notesToGive);
        }
        int remainder = amount - notesToGive * denomination;
        if (remainder > 0 && next != null) {
            Map<Integer, Integer> nextResult = next.dispense(remainder);
            result.putAll(nextResult);
            remainder = 0;
        }
        if (remainder > 0) {
            count += notesToGive;
            throw new IllegalStateException("Cannot dispense amount: " + amount);
        }
        return result;
    }
    public int getCount() { return count; }
}

class TwoThousandDispenser extends CashDispenser {
    TwoThousandDispenser(int c) { super(2000, c); }
}
class FiveHundredDispenser extends CashDispenser {
    FiveHundredDispenser(int c) { super(500, c); }
}
class TwoHundredDispenser extends CashDispenser {
    TwoHundredDispenser(int c) { super(200, c); }
}
class HundredDispenser extends CashDispenser {
    HundredDispenser(int c) { super(100, c); }
}

class Transaction {
    private final String id;
    private final TransactionType type;
    private final Card card;
    private final double amount;
    private TransactionStatus status = TransactionStatus.PENDING;
    private final long timestamp;
    Transaction(String id, TransactionType t, Card c, double amt) {
        this.id = id; type = t; card = c; amount = amt;
        timestamp = System.currentTimeMillis();
    }
    public void markSuccess() { status = TransactionStatus.SUCCESS; }
    public void markFailed() { status = TransactionStatus.FAILED; }
    public String getId() { return id; }
    public TransactionType getType() { return type; }
    public double getAmount() { return amount; }
    public TransactionStatus getStatus() { return status; }
}`,c=`// C. States + ATM + Main
interface ATMState {
    void insertCard(ATM atm, Card card);
    boolean enterPin(ATM atm, String pin);
    void withdraw(ATM atm, double amount);
    void ejectCard(ATM atm);
}

class IdleState implements ATMState {
    public void insertCard(ATM atm, Card card) {
        atm.setCurrentCard(card);
        atm.setState(new HasCardState());
        System.out.println("Card inserted. Enter PIN.");
    }
    public boolean enterPin(ATM atm, String pin) { System.out.println("Insert card first"); return false; }
    public void withdraw(ATM atm, double amount) { System.out.println("Insert card first"); }
    public void ejectCard(ATM atm) { System.out.println("No card"); }
}

class HasCardState implements ATMState {
    public void insertCard(ATM atm, Card card) { System.out.println("Card already inserted"); }
    public boolean enterPin(ATM atm, String pin) {
        if (atm.getBankService().authenticate(atm.getCurrentCard(), pin)) {
            atm.setState(new AuthenticatedState());
            System.out.println("Authenticated.");
            return true;
        }
        System.out.println("Invalid PIN.");
        return false;
    }
    public void withdraw(ATM atm, double amount) { System.out.println("Enter PIN first"); }
    public void ejectCard(ATM atm) {
        atm.setCurrentCard(null);
        atm.setState(new IdleState());
        System.out.println("Card ejected.");
    }
}

class AuthenticatedState implements ATMState {
    public void insertCard(ATM atm, Card card) { System.out.println("Already authenticated"); }
    public boolean enterPin(ATM atm, String pin) { return true; }
    public void withdraw(ATM atm, double amount) {
        Card card = atm.getCurrentCard();
        Account acc = card.getAccount();
        try {
            atm.getBankService().debit(acc, amount);
            Map<Integer, Integer> notes = atm.getDispenserChain().dispense(amount);
            Transaction txn = new Transaction("TXN-" + System.currentTimeMillis(),
                    TransactionType.WITHDRAWAL, card, amount);
            txn.markSuccess();
            atm.addTransaction(txn);
            System.out.println("Dispensed: " + notes);
        } catch (Exception e) {
            System.out.println("Withdrawal failed: " + e.getMessage());
        }
    }
    public void ejectCard(ATM atm) {
        atm.setCurrentCard(null);
        atm.setState(new IdleState());
        System.out.println("Card ejected.");
    }
}

class ATM {
    private static volatile ATM ins;
    private ATMState state = new IdleState();
    private Card currentCard;
    private final BankService bankService;
    private final CashDispenser dispenserChain;
    private final List<Transaction> transactions = new ArrayList<>();

    private ATM(BankService bs, CashDispenser chain) {
        bankService = bs; dispenserChain = chain;
    }
    public static ATM get(BankService bs, CashDispenser chain) {
        if (ins == null) { synchronized (ATM.class) {
            if (ins == null) ins = new ATM(bs, chain); } }
        return ins;
    }
    public void setState(ATMState s) { state = s; }
    public ATMState getState() { return state; }
    public Card getCurrentCard() { return currentCard; }
    public void setCurrentCard(Card c) { currentCard = c; }
    public BankService getBankService() { return bankService; }
    public CashDispenser getDispenserChain() { return dispenserChain; }
    public void addTransaction(Transaction t) { transactions.add(t); }

    public void insertCard(Card c) { state.insertCard(this, c); }
    public boolean enterPin(String pin) { return state.enterPin(this, pin); }
    public void withdraw(double amt) { state.withdraw(this, amt); }
    public void ejectCard() { state.ejectCard(this); }
}

public class Main {
    public static void main(String[] args) {
        Account acc = new Account("A1", "1234567890", "Alice", 5000);
        Card card = new Card("4111-1111", acc, "HDFC", "1234");

        CashDispenser chain = new TwoThousandDispenser(5);
        chain.setNext(new FiveHundredDispenser(10));
        chain.next.setNext(new TwoHundredDispenser(20));
        chain.next.next.setNext(new HundredDispenser(50));

        ATM atm = ATM.get(new MockBankService(), chain);
        atm.insertCard(card);
        atm.enterPin("1234");
        atm.withdraw(2700);
        System.out.println("Balance: " + acc.getBalance());
        atm.ejectCard();
    }
}`,l=`-- 5 tables, normalized, minimal

CREATE TABLE accounts (
  account_id     VARCHAR(20) PRIMARY KEY,
  account_number VARCHAR(20) UNIQUE NOT NULL,
  owner_name     VARCHAR(100) NOT NULL,
  balance        DECIMAL(15,2) NOT NULL DEFAULT 0,
  status         ENUM('ACTIVE','FROZEN','CLOSED') DEFAULT 'ACTIVE'
);

CREATE TABLE cards (
  card_number VARCHAR(20) PRIMARY KEY,
  account_id  VARCHAR(20) NOT NULL,
  bank_name   VARCHAR(50) NOT NULL,
  expiry_date DATE NOT NULL,
  pin_hash    VARCHAR(255) NOT NULL,
  status      ENUM('ACTIVE','BLOCKED','EXPIRED') DEFAULT 'ACTIVE',
  failed_attempts INT DEFAULT 0,
  FOREIGN KEY (account_id) REFERENCES accounts(account_id)
);
CREATE INDEX idx_card_account ON cards(account_id);

CREATE TABLE atms (
  atm_id       VARCHAR(20) PRIMARY KEY,
  location     VARCHAR(255) NOT NULL,
  status       ENUM('ACTIVE','OUT_OF_SERVICE') DEFAULT 'ACTIVE'
);

CREATE TABLE cash_inventory (
  atm_id       VARCHAR(20) NOT NULL,
  denomination INT NOT NULL,
  count        INT NOT NULL DEFAULT 0,
  PRIMARY KEY (atm_id, denomination),
  FOREIGN KEY (atm_id) REFERENCES atms(atm_id)
);

CREATE TABLE transactions (
  transaction_id VARCHAR(20) PRIMARY KEY,
  atm_id         VARCHAR(20) NOT NULL,
  card_number    VARCHAR(20) NOT NULL,
  account_id     VARCHAR(20) NOT NULL,
  type           ENUM('WITHDRAWAL','DEPOSIT','TRANSFER','BALANCE_ENQUIRY') NOT NULL,
  amount         DECIMAL(15,2) NOT NULL,
  status         ENUM('PENDING','SUCCESS','FAILED') DEFAULT 'PENDING',
  created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (atm_id) REFERENCES atms(atm_id),
  FOREIGN KEY (card_number) REFERENCES cards(card_number),
  FOREIGN KEY (account_id) REFERENCES accounts(account_id)
);
CREATE INDEX idx_txn_card ON transactions(card_number);
CREATE INDEX idx_txn_created ON transactions(created_at);`,u=`----------------------------------------
  ATM  (Singleton + Context)
  - state: ATMState
  - currentCard: Card
  - dispenserChain: CashDispenser
  - bankService: BankService
  + insertCard(card)
  + enterPin(pin)
  + withdraw(amount)
  + deposit(amount)
  + ejectCard()
----------------------------------------
      |has (state dies with ATM)
      v
----------------------------------------
  ATMState (interface)
  + insertCard()
  + enterPin()
  + withdraw()
  + ejectCard()
----------------------------------------
  |-- Idle
  |-- HasCard
  |-- Authenticated
  +-- Dispensing

ATM --uses--> BankService (interface)
               +-- MockBankService
ATM --uses--> Card --references--> Account

ATM --owns--> CashDispenser (abstract, Chain of Responsibility)
  - denomination, count, next
  |-- TwoThousandDispenser --> FiveHundredDispenser
  |-- TwoHundredDispenser --> HundredDispenser

ATM --creates--> Transaction
  - type: TransactionType
  - card: Card
  - amount: double
  - status: TransactionStatus
  - timestamp: long`,d=r();function f({code:e,lang:t}){let n=(0,a.useRef)(null);return(0,a.useEffect)(()=>{n.current&&(n.current.removeAttribute(`data-highlighted`),i.highlightElement(n.current))},[e]),(0,d.jsxs)(`div`,{className:`atm-code`,children:[(0,d.jsxs)(`div`,{className:`atm-code-head`,children:[(0,d.jsxs)(`span`,{className:`dots`,children:[(0,d.jsx)(`i`,{}),(0,d.jsx)(`i`,{}),(0,d.jsx)(`i`,{})]}),(0,d.jsx)(`span`,{className:`pl-lang`,children:t})]}),(0,d.jsx)(`pre`,{className:`atm-pre`,children:(0,d.jsx)(`code`,{ref:n,className:`language-${t}`,children:e})})]})}var p=({id:e,children:t})=>(0,d.jsx)(`section`,{id:e,className:`atm-section`,children:t}),m=({children:e})=>(0,d.jsx)(`h2`,{className:`atm-h2`,children:e}),h=({children:e})=>(0,d.jsx)(`h3`,{className:`atm-h3`,children:e}),g=({title:e,children:t})=>(0,d.jsxs)(`div`,{className:`atm-bullet`,children:[(0,d.jsx)(`b`,{children:e}),(0,d.jsx)(`span`,{children:t})]}),_=({children:e})=>(0,d.jsx)(`div`,{className:`atm-tip`,children:e});function v(){return(0,d.jsxs)(`div`,{className:`atm-root`,children:[(0,d.jsxs)(`header`,{className:`atm-header`,children:[(0,d.jsx)(n,{to:`/maang/system-design/advanced`,className:`atm-back`,children:`← Back to Advanced System Design`}),(0,d.jsxs)(`h1`,{children:[(0,d.jsx)(`i`,{className:`fas fa-money-check-dollar`}),` ATM — LLD `,(0,d.jsxs)(`span`,{className:`atm-badge`,children:[(0,d.jsx)(`i`,{className:`fab fa-java`}),` Java + UML`]})]}),(0,d.jsxs)(`div`,{className:`atm-sub-info`,children:[(0,d.jsxs)(`span`,{children:[(0,d.jsx)(`i`,{className:`fas fa-list-check`}),` 6 Steps`]}),(0,d.jsxs)(`span`,{children:[(0,d.jsx)(`i`,{className:`fas fa-code`}),` Working Java`]}),(0,d.jsxs)(`span`,{children:[(0,d.jsx)(`i`,{className:`fas fa-database`}),` DB Schema`]}),(0,d.jsxs)(`span`,{className:`atm-badge-alt`,children:[(0,d.jsx)(`i`,{className:`fas fa-mouse-pointer`}),` Scroll down`]})]}),(0,d.jsxs)(`nav`,{className:`atm-nav`,children:[(0,d.jsx)(`a`,{href:`#req`,children:`1. Requirements`}),(0,d.jsx)(`a`,{href:`#ent`,children:`2. Entities`}),(0,d.jsx)(`a`,{href:`#uml`,children:`3. Diagram`}),(0,d.jsx)(`a`,{href:`#db`,children:`4. DB`}),(0,d.jsx)(`a`,{href:`#java`,children:`5. Java`}),(0,d.jsx)(`a`,{href:`#wrap`,children:`6. Wrap-up`})]})]}),(0,d.jsxs)(p,{id:`req`,children:[(0,d.jsxs)(m,{children:[(0,d.jsx)(`i`,{className:`fas fa-list-check`}),` Step 1 — Requirements (5 min)`]}),(0,d.jsxs)(`p`,{className:`atm-intro`,children:[(0,d.jsx)(`b`,{children:`What to do:`}),` Pick `,(0,d.jsx)(`b`,{children:`4 functional`}),` + `,(0,d.jsx)(`b`,{children:`3 non-functional`}),`. State what is OUT of scope (cheque deposit, mobile top-up, cardless withdrawal).`]}),(0,d.jsx)(h,{children:`Functional — what the system DOES`}),(0,d.jsxs)(g,{title:`1. Authentication — card + PIN`,children:[`User inserts card, enters PIN. 3 attempts max, then card blocked. Auth via BankService.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: drives State transition IDLE to AUTHENTICATED.`})]}),(0,d.jsxs)(g,{title:`2. Cash withdrawal with denominations`,children:[`User requests amount. ATM dispenses using available denominations. Chain of Responsibility.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: CoR is the classic ATM pattern interviewers look for.`})]}),(0,d.jsxs)(g,{title:`3. Balance enquiry + Mini statement`,children:[`Read-only operations. No state mutation beyond logging.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: separates read vs write operations.`})]}),(0,d.jsxs)(g,{title:`4. Deposit (cash) + Transfer`,children:[`Deposit updates balance. Transfer moves money between accounts.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: full transaction lifecycle.`})]}),(0,d.jsx)(h,{children:`Non-Functional — how the system BEHAVES`}),(0,d.jsxs)(g,{title:`1. Thread-safe cash dispensing`,children:[`Two withdrawals simultaneously must not over-dispense. Use synchronized.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: concurrency is the #1 follow-up.`})]}),(0,d.jsxs)(g,{title:`2. Extensible`,children:[`New transaction type = new State + handler. New denomination = new dispenser.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: shows SOLID, especially OCP and DIP.`})]}),(0,d.jsxs)(g,{title:`3. Audit trail — every transaction logged`,children:[`Every operation writes to log with timestamp, card, amount, status.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: compliance and debugging.`})]}),(0,d.jsxs)(_,{children:[(0,d.jsx)(`b`,{children:`Interview line:`}),` Skip cheque deposit, mobile top-up, cardless withdrawal unless asked — focus on auth, transaction, dispense flow.`]})]}),(0,d.jsxs)(p,{id:`ent`,children:[(0,d.jsxs)(m,{children:[(0,d.jsx)(`i`,{className:`fas fa-boxes-stacked`}),` Step 2 — Entities (3 min)`]}),(0,d.jsxs)(`p`,{className:`atm-intro`,children:[(0,d.jsx)(`b`,{children:`Rule:`}),` Take nouns from requirements — each becomes a class.`]}),(0,d.jsxs)(g,{title:`ATM (Singleton + Context)`,children:[`Top-level container. Holds state, dispenser chain, current card.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why Singleton: one instance per physical unit. Context for State.`})]}),(0,d.jsxs)(g,{title:`ATMState + Idle/HasCard/Authenticated/Dispensing`,children:[`Each state handles events differently.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why State pattern: behavior changes per state — classic use case.`})]}),(0,d.jsxs)(g,{title:`Card`,children:[`Has cardNumber, bank, expiry. No PIN stored — verified via BankService.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: card is identity — separate from account.`})]}),(0,d.jsxs)(g,{title:`Account`,children:[`Has accountNumber, balance, owner. BankService manages accounts.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: account is the money holder.`})]}),(0,d.jsxs)(g,{title:`BankService + MockBankService`,children:[`authenticate, getBalance, debit, credit.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why DIP: ATM depends on interface, not concrete bank.`})]}),(0,d.jsxs)(g,{title:`CashDispenser chain`,children:[`Chain of Responsibility. Each handles its denomination.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why CoR: decouples denomination logic, extensible.`})]}),(0,d.jsxs)(g,{title:`Transaction`,children:[`Records type, card, account, amount, status, timestamp.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: transaction is the receipt — audit trail.`})]}),(0,d.jsxs)(g,{title:`TransactionType (enum)`,children:[`WITHDRAWAL, DEPOSIT, TRANSFER, BALANCE_ENQUIRY.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: type-safe categorization.`})]})]}),(0,d.jsxs)(p,{id:`uml`,children:[(0,d.jsxs)(m,{children:[(0,d.jsx)(`i`,{className:`fas fa-project-diagram`}),` Step 3 — Class Diagram (10 min)`]}),(0,d.jsx)(`p`,{className:`atm-intro`,children:`Draw this on the whiteboard. Relationships are the key signal:`}),(0,d.jsx)(f,{code:u,lang:`text`}),(0,d.jsxs)(_,{children:[(0,d.jsx)(`b`,{children:`Key relationship:`}),` ATM to State is Composition. ATM to BankService is Dependency (DIP). Dispenser chain is CoR.`]})]}),(0,d.jsxs)(p,{id:`db`,children:[(0,d.jsxs)(m,{children:[(0,d.jsx)(`i`,{className:`fas fa-database`}),` Step 4 — DB Design (5 min)`]}),(0,d.jsx)(`p`,{className:`atm-intro`,children:`Even for in-memory LLD, show you can persist it. 5 normalized tables:`}),(0,d.jsx)(f,{code:l,lang:`sql`}),(0,d.jsxs)(g,{title:`idx_card_account`,children:[`Makes card to account lookup O(log n).`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: interviewers ask about indexing.`})]}),(0,d.jsxs)(g,{title:`failed_attempts on cards`,children:[`Tracks PIN failures. At 3, status flips to BLOCKED.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: security audit — persisted for compliance.`})]}),(0,d.jsxs)(g,{title:`cash_inventory separate table`,children:[`Denominations are per-ATM. Normalized.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: enables dispenser chain to check availability.`})]})]}),(0,d.jsxs)(p,{id:`java`,children:[(0,d.jsxs)(m,{children:[(0,d.jsx)(`i`,{className:`fab fa-java`}),` Step 5 — Java Code (20-25 min)`]}),(0,d.jsx)(`p`,{className:`atm-intro`,children:`Minimal working Java. Skip boilerplate getters unless asked:`}),(0,d.jsx)(h,{children:`Block A — Enums + Card + Account + BankService`}),(0,d.jsx)(f,{code:o,lang:`java`}),(0,d.jsx)(h,{children:`Block B — CashDispenser + Transaction`}),(0,d.jsx)(f,{code:s,lang:`java`}),(0,d.jsx)(h,{children:`Block C — States + ATM + Main`}),(0,d.jsx)(f,{code:c,lang:`java`})]}),(0,d.jsxs)(p,{id:`wrap`,children:[(0,d.jsxs)(m,{children:[(0,d.jsx)(`i`,{className:`fas fa-flag-checkered`}),` Step 6 — Wrap-up (3 min)`]}),(0,d.jsx)(`p`,{className:`atm-intro`,children:`Be ready to answer these without thinking:`}),(0,d.jsxs)(g,{title:`Concurrency — prevent over-dispensing?`,children:[`dispense is synchronized. For scale, per-denomination locks.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: concurrency awareness.`})]}),(0,d.jsxs)(g,{title:`What if dispense fails midway?`,children:[`Rollback: restore count, mark FAILED, reverse debit via credit.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: failure handling — compensating actions.`})]}),(0,d.jsxs)(g,{title:`How would you add a new denomination?`,children:[`New CashDispenser subclass, insert into chain. No other changes.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: OCP + CoR in action.`})]}),(0,d.jsxs)(g,{title:`Patterns used + SOLID`,children:[`Singleton, State, Chain of Responsibility, Strategy.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: naming patterns shows design vocabulary.`})]}),(0,d.jsxs)(_,{children:[(0,d.jsx)(`b`,{children:`Scorecard:`}),` Requirements (5) + Entities (3) + Diagram (10) + DB (5) + Code (20) + Wrap-up (3) = 46 min.`]})]}),(0,d.jsx)(`footer`,{className:`atm-footer`,children:(0,d.jsx)(n,{to:`/maang/system-design/advanced`,children:`Back to Advanced System Design`})})]})}export{v as default};