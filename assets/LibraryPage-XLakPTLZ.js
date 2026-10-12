import{r as e}from"./rolldown-runtime-QTnfLwEv.js";import{t}from"./react-CZI7_Jkm.js";import{o as n,r}from"./index-DCg-4qgp.js";import{t as i}from"./atom-one-dark-CL0A0LnX.js";var a=e(t(),1),o=`// A. Enums + Book + BookCopy
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

enum CopyStatus { AVAILABLE, BORROWED, RESERVED, LOST }
enum MemberType { REGULAR, PREMIUM }
enum LoanStatus { ACTIVE, RETURNED, OVERDUE, LOST }

class Book {
    private final String isbn;
    private final String title;
    private final String author;
    private final String genre;
    Book(String i, String t, String a, String g) {
        isbn = i; title = t; author = a; genre = g;
    }
    public String getIsbn() { return isbn; }
    public String getTitle() { return title; }
    public String getAuthor() { return author; }
    public String getGenre() { return genre; }
}

class BookCopy {
    private final String barcode;
    private final Book book;
    private CopyStatus status = CopyStatus.AVAILABLE;

    BookCopy(String b, Book bk) { barcode = b; book = bk; }

    public synchronized boolean borrow() {
        if (status != CopyStatus.AVAILABLE) return false;
        status = CopyStatus.BORROWED;
        return true;
    }
    public synchronized void returnCopy() {
        status = CopyStatus.AVAILABLE;
    }
    public String getBarcode() { return barcode; }
    public Book getBook() { return book; }
    public CopyStatus getStatus() { return status; }
    public boolean isAvailable() { return status == CopyStatus.AVAILABLE; }
}`,s=`// B. Member hierarchy + Loan + Strategies
abstract class Member {
    protected final String id;
    protected final String name;
    protected final String email;
    protected final int maxBooks;
    protected final int loanPeriodDays;
    protected final List<BookCopy> borrowedCopies = new ArrayList<>();

    protected Member(String id, String n, String e, int max, int days) {
        this.id = id; name = n; email = e;
        maxBooks = max; loanPeriodDays = days;
    }
    public String getId() { return id; }
    public String getName() { return name; }
    public int getMaxBooks() { return maxBooks; }
    public int getLoanPeriodDays() { return loanPeriodDays; }
    public List<BookCopy> getBorrowedCopies() { return borrowedCopies; }

    public synchronized boolean canBorrow() {
        return borrowedCopies.size() < maxBooks;
    }
    public synchronized void addBorrowed(BookCopy c) { borrowedCopies.add(c); }
    public synchronized void removeBorrowed(BookCopy c) { borrowedCopies.remove(c); }
}

class RegularMember extends Member {
    RegularMember(String id, String n, String e) { super(id, n, e, 3, 14); }
}
class PremiumMember extends Member {
    PremiumMember(String id, String n, String e) { super(id, n, e, 10, 30); }
}

class Loan {
    private final String id;
    private final BookCopy copy;
    private final Member member;
    private final LocalDate borrowDate;
    private final LocalDate dueDate;
    private LocalDate returnDate;
    private double fine = 0;
    private LoanStatus status = LoanStatus.ACTIVE;

    Loan(String id, BookCopy c, Member m, LocalDate borrow) {
        this.id = id; copy = c; member = m;
        borrowDate = borrow;
        dueDate = borrow.plusDays(m.getLoanPeriodDays());
    }
    public void markReturned(LocalDate d, double f) {
        returnDate = d; fine = f; status = LoanStatus.RETURNED;
    }
    public String getId() { return id; }
    public BookCopy getCopy() { return copy; }
    public Member getMember() { return member; }
    public LocalDate getBorrowDate() { return borrowDate; }
    public LocalDate getDueDate() { return dueDate; }
    public LocalDate getReturnDate() { return returnDate; }
    public double getFine() { return fine; }
    public LoanStatus getStatus() { return status; }
}

interface SearchStrategy {
    List<Book> search(Collection<Book> books, String query);
}

class TitleSearch implements SearchStrategy {
    public List<Book> search(Collection<Book> books, String q) {
        List<Book> r = new ArrayList<>();
        for (Book b : books)
            if (b.getTitle().toLowerCase().contains(q.toLowerCase())) r.add(b);
        return r;
    }
}
class AuthorSearch implements SearchStrategy {
    public List<Book> search(Collection<Book> books, String q) {
        List<Book> r = new ArrayList<>();
        for (Book b : books)
            if (b.getAuthor().toLowerCase().contains(q.toLowerCase())) r.add(b);
        return r;
    }
}
class ISBNSearch implements SearchStrategy {
    public List<Book> search(Collection<Book> books, String q) {
        List<Book> r = new ArrayList<>();
        for (Book b : books)
            if (b.getIsbn().equals(q)) r.add(b);
        return r;
    }
}

interface FineStrategy {
    double calculateFine(Loan loan, LocalDate returnDate);
}

class StandardFine implements FineStrategy {
    private final double perDayRate;
    StandardFine(double rate) { perDayRate = rate; }
    public double calculateFine(Loan loan, LocalDate returnDate) {
        if (!returnDate.isAfter(loan.getDueDate())) return 0;
        long daysLate = ChronoUnit.DAYS.between(loan.getDueDate(), returnDate);
        return daysLate * perDayRate;
    }
}`,c=`// C. Catalog + LibraryService + Main
class Catalog {
    private final Map<String, Book> books = new ConcurrentHashMap<>();
    private final Map<String, BookCopy> copies = new ConcurrentHashMap<>();

    public void addBook(Book b) { books.put(b.getIsbn(), b); }
    public void addCopy(BookCopy c) {
        copies.put(c.getBarcode(), c);
        books.putIfAbsent(c.getBook().getIsbn(), c.getBook());
    }
    public Book getBook(String isbn) { return books.get(isbn); }
    public BookCopy getCopy(String barcode) { return copies.get(barcode); }
    public Collection<Book> getAllBooks() { return books.values(); }

    public Optional<BookCopy> findAvailableCopy(String isbn) {
        for (BookCopy c : copies.values())
            if (c.getBook().getIsbn().equals(isbn) && c.isAvailable()) return Optional.of(c);
        return Optional.empty();
    }

    public List<Book> search(SearchStrategy strategy, String query) {
        return strategy.search(books.values(), query);
    }
}

class LibraryService {
    private static volatile LibraryService ins;
    private final Catalog catalog = new Catalog();
    private final Map<String, Member> members = new ConcurrentHashMap<>();
    private final List<Loan> loans = new ArrayList<>();
    private final FineStrategy fineStrategy = new StandardFine(0.50);

    private LibraryService() {}

    public static LibraryService get() {
        if (ins == null) { synchronized (LibraryService.class) {
            if (ins == null) ins = new LibraryService(); } }
        return ins;
    }

    public void addBook(Book b, int numCopies) {
        catalog.addBook(b);
        for (int i = 1; i <= numCopies; i++)
            catalog.addCopy(new BookCopy(b.getIsbn() + "-C" + i, b));
    }

    public void registerMember(Member m) { members.put(m.getId(), m); }

    public synchronized Optional<Loan> borrow(String memberId, String isbn, LocalDate today) {
        Member m = members.get(memberId);
        if (m == null || !m.canBorrow()) return Optional.empty();
        Optional<BookCopy> copy = catalog.findAvailableCopy(isbn);
        if (copy.isEmpty() || !copy.get().borrow()) return Optional.empty();
        Loan loan = new Loan("L-" + System.currentTimeMillis(), copy.get(), m, today);
        loans.add(loan);
        m.addBorrowed(copy.get());
        return Optional.of(loan);
    }

    public synchronized double returnBook(Loan loan, LocalDate today) {
        double fine = fineStrategy.calculateFine(loan, today);
        loan.markReturned(today, fine);
        loan.getCopy().returnCopy();
        loan.getMember().removeBorrowed(loan.getCopy());
        return fine;
    }

    public List<Book> search(SearchStrategy strategy, String query) {
        return catalog.search(strategy, query);
    }
}

public class Main {
    public static void main(String[] args) {
        LibraryService lib = LibraryService.get();

        Book cleanCode = new Book("978-0132350884", "Clean Code", "Robert Martin", "Tech");
        Book effectiveJava = new Book("978-0134685991", "Effective Java", "Joshua Bloch", "Tech");
        lib.addBook(cleanCode, 3);
        lib.addBook(effectiveJava, 2);

        Member alice = new RegularMember("M1", "Alice", "alice@x.com");
        Member bob = new PremiumMember("M2", "Bob", "bob@x.com");
        lib.registerMember(alice);
        lib.registerMember(bob);

        LocalDate today = LocalDate.of(2024, 1, 1);
        Optional<Loan> loan = lib.borrow("M1", "978-0132350884", today);
        loan.ifPresent(l -> System.out.println("Borrowed: " + l.getId() + " due " + l.getDueDate()));

        LocalDate returnDate = today.plusDays(20);
        loan.ifPresent(l -> {
            double fine = lib.returnBook(l, returnDate);
            System.out.println("Returned late. Fine: $" + fine);
        });

        System.out.println("\\nSearch by author 'Martin':");
        lib.search(new AuthorSearch(), "Martin")
                .forEach(b -> System.out.println("  " + b.getTitle()));

        System.out.println("\\nSearch by title 'Java':");
        lib.search(new TitleSearch(), "Java")
                .forEach(b -> System.out.println("  " + b.getTitle()));
    }
}`,l=`-- 6 tables, normalized, minimal

CREATE TABLE books (
  isbn        VARCHAR(20) PRIMARY KEY,
  title       VARCHAR(255) NOT NULL,
  author      VARCHAR(255) NOT NULL,
  genre       VARCHAR(50),
  published_year INT
);
CREATE INDEX idx_book_title ON books(title);
CREATE INDEX idx_book_author ON books(author);

CREATE TABLE book_copies (
  barcode    VARCHAR(30) PRIMARY KEY,
  isbn       VARCHAR(20) NOT NULL,
  status     ENUM('AVAILABLE','BORROWED','RESERVED','LOST') DEFAULT 'AVAILABLE',
  added_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (isbn) REFERENCES books(isbn)
);
CREATE INDEX idx_copy_isbn ON book_copies(isbn);
CREATE INDEX idx_copy_status ON book_copies(status);

CREATE TABLE members (
  member_id    VARCHAR(20) PRIMARY KEY,
  name         VARCHAR(100) NOT NULL,
  email        VARCHAR(100) UNIQUE NOT NULL,
  member_type  ENUM('REGULAR','PREMIUM') NOT NULL DEFAULT 'REGULAR',
  max_books    INT NOT NULL DEFAULT 3,
  loan_period_days INT NOT NULL DEFAULT 14,
  joined_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status       ENUM('ACTIVE','SUSPENDED','CLOSED') DEFAULT 'ACTIVE'
);
CREATE INDEX idx_member_email ON members(email);

CREATE TABLE loans (
  loan_id      VARCHAR(20) PRIMARY KEY,
  barcode      VARCHAR(30) NOT NULL,
  member_id    VARCHAR(20) NOT NULL,
  borrow_date  DATE NOT NULL,
  due_date     DATE NOT NULL,
  return_date  DATE NULL,
  fine_amount  DECIMAL(10,2) DEFAULT 0,
  status       ENUM('ACTIVE','RETURNED','OVERDUE','LOST') DEFAULT 'ACTIVE',
  FOREIGN KEY (barcode) REFERENCES book_copies(barcode),
  FOREIGN KEY (member_id) REFERENCES members(member_id)
);
CREATE INDEX idx_loan_member ON loans(member_id, status);
CREATE INDEX idx_loan_due ON loans(due_date, status);

CREATE TABLE fines (
  fine_id      VARCHAR(20) PRIMARY KEY,
  loan_id      VARCHAR(20) NOT NULL,
  member_id    VARCHAR(20) NOT NULL,
  amount       DECIMAL(10,2) NOT NULL,
  reason       ENUM('LATE_RETURN','DAMAGE','LOST') NOT NULL,
  status       ENUM('PENDING','PAID','WAIVED') DEFAULT 'PENDING',
  created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  paid_at      TIMESTAMP NULL,
  FOREIGN KEY (loan_id) REFERENCES loans(loan_id),
  FOREIGN KEY (member_id) REFERENCES members(member_id)
);
CREATE INDEX idx_fine_member ON fines(member_id, status);

CREATE TABLE reservations (
  reservation_id VARCHAR(20) PRIMARY KEY,
  isbn           VARCHAR(20) NOT NULL,
  member_id      VARCHAR(20) NOT NULL,
  reserved_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status         ENUM('ACTIVE','FULFILLED','CANCELLED') DEFAULT 'ACTIVE',
  FOREIGN KEY (isbn) REFERENCES books(isbn),
  FOREIGN KEY (member_id) REFERENCES members(member_id)
);
CREATE INDEX idx_reservation_isbn ON reservations(isbn, status);`,u=`----------------------------------------
  LibraryService  (Singleton + Facade)
  - catalog: Catalog
  - members: Map<String, Member>
  - loans: List<Loan>
  + addBook(book, copies)
  + registerMember(member)
  + borrow(memberId, barcode): Optional<Loan>
  + returnBook(loan): double
  + search(strategy, query): List<Book>
----------------------------------------
      |owns (catalog dies with service)
      v
----------------------------------------
  Catalog                          Book
  - books: Map<ISBN,Book>          - isbn, title
  - copies: Map<barcode,Copy>      - author, genre
  + addBook()
  + getCopy(barcode)
  + search(strategy)
----------------------------------------
      |has
      v
----------------------------------------
  BookCopy
  - barcode, book, status
  + borrow()
  + returnCopy()
----------------------------------------

LibraryService --has--> Member (abstract)
  |-- RegularMember  +-- PremiumMember
LibraryService --uses--> SearchStrategy (Title/Author/ISBN)
LibraryService --uses--> FineStrategy (StandardFine)
LibraryService --creates--> Loan (copy, member, dates, fine)`,d=r();function f({code:e,lang:t}){let n=(0,a.useRef)(null);return(0,a.useEffect)(()=>{n.current&&(n.current.removeAttribute(`data-highlighted`),i.highlightElement(n.current))},[e]),(0,d.jsxs)(`div`,{className:`lib-code`,children:[(0,d.jsxs)(`div`,{className:`lib-code-head`,children:[(0,d.jsxs)(`span`,{className:`dots`,children:[(0,d.jsx)(`i`,{}),(0,d.jsx)(`i`,{}),(0,d.jsx)(`i`,{})]}),(0,d.jsx)(`span`,{className:`pl-lang`,children:t})]}),(0,d.jsx)(`pre`,{className:`lib-pre`,children:(0,d.jsx)(`code`,{ref:n,className:`language-${t}`,children:e})})]})}var p=({id:e,children:t})=>(0,d.jsx)(`section`,{id:e,className:`lib-section`,children:t}),m=({children:e})=>(0,d.jsx)(`h2`,{className:`lib-h2`,children:e}),h=({children:e})=>(0,d.jsx)(`h3`,{className:`lib-h3`,children:e}),g=({title:e,children:t})=>(0,d.jsxs)(`div`,{className:`lib-bullet`,children:[(0,d.jsx)(`b`,{children:e}),(0,d.jsx)(`span`,{children:t})]}),_=({children:e})=>(0,d.jsx)(`div`,{className:`lib-tip`,children:e});function v(){return(0,d.jsxs)(`div`,{className:`lib-root`,children:[(0,d.jsxs)(`header`,{className:`lib-header`,children:[(0,d.jsx)(n,{to:`/maang/system-design/advanced`,className:`lib-back`,children:`← Back to Advanced System Design`}),(0,d.jsxs)(`h1`,{children:[(0,d.jsx)(`i`,{className:`fas fa-book-open`}),` Library Management — LLD `,(0,d.jsxs)(`span`,{className:`lib-badge`,children:[(0,d.jsx)(`i`,{className:`fab fa-java`}),` Java + UML`]})]}),(0,d.jsxs)(`div`,{className:`lib-sub-info`,children:[(0,d.jsxs)(`span`,{children:[(0,d.jsx)(`i`,{className:`fas fa-list-check`}),` 6 Steps`]}),(0,d.jsxs)(`span`,{children:[(0,d.jsx)(`i`,{className:`fas fa-code`}),` Working Java`]}),(0,d.jsxs)(`span`,{children:[(0,d.jsx)(`i`,{className:`fas fa-database`}),` DB Schema`]}),(0,d.jsxs)(`span`,{className:`lib-badge-alt`,children:[(0,d.jsx)(`i`,{className:`fas fa-mouse-pointer`}),` Scroll down`]})]}),(0,d.jsxs)(`nav`,{className:`lib-nav`,children:[(0,d.jsx)(`a`,{href:`#req`,children:`1. Requirements`}),(0,d.jsx)(`a`,{href:`#ent`,children:`2. Entities`}),(0,d.jsx)(`a`,{href:`#uml`,children:`3. Diagram`}),(0,d.jsx)(`a`,{href:`#db`,children:`4. DB`}),(0,d.jsx)(`a`,{href:`#java`,children:`5. Java`}),(0,d.jsx)(`a`,{href:`#wrap`,children:`6. Wrap-up`})]})]}),(0,d.jsxs)(p,{id:`req`,children:[(0,d.jsxs)(m,{children:[(0,d.jsx)(`i`,{className:`fas fa-list-check`}),` Step 1 — Requirements (5 min)`]}),(0,d.jsxs)(`p`,{className:`lib-intro`,children:[(0,d.jsx)(`b`,{children:`What to do:`}),` Pick `,(0,d.jsx)(`b`,{children:`4 functional`}),` + `,(0,d.jsx)(`b`,{children:`3 non-functional`}),`. State what is OUT of scope (e-books, inter-library loan, recommendations).`]}),(0,d.jsx)(h,{children:`Functional — what the system DOES`}),(0,d.jsxs)(g,{title:`1. Book catalog + multiple copies`,children:[`Each book has ISBN, title, author. Copies have barcode + status.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: one book, many copies — availability logic.`})]}),(0,d.jsxs)(g,{title:`2. Member management — issue, return, renew`,children:[`Member borrows copy, returns it. Max books enforced.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: links Member + Copy — core flow.`})]}),(0,d.jsxs)(g,{title:`3. Search — title, author, ISBN, genre`,children:[`SearchStrategy interface for new types.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: Strategy — interviewers look for this.`})]}),(0,d.jsxs)(g,{title:`4. Fine on late return`,children:[`Due = borrow + loan period. Fine = days late x rate.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: edge cases — beyond happy path.`})]}),(0,d.jsx)(h,{children:`Non-Functional — how the system BEHAVES`}),(0,d.jsxs)(g,{title:`1. Thread-safe borrow/return`,children:[`Two members must not borrow same copy. Synchronized.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: concurrency is the #1 follow-up.`})]}),(0,d.jsxs)(g,{title:`2. Extensible`,children:[`New search = new strategy. New fine = new strategy. No core changes.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: OCP and DIP.`})]}),(0,d.jsxs)(g,{title:`3. Low latency — O(1) copy lookup`,children:[`Copy by barcode is O(1). HashMap.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: performance signal.`})]}),(0,d.jsxs)(_,{children:[(0,d.jsx)(`b`,{children:`Interview line:`}),` Skip e-books, inter-library loan, recommendations unless asked — focus on catalog, borrow, return, fine flow.`]})]}),(0,d.jsxs)(p,{id:`ent`,children:[(0,d.jsxs)(m,{children:[(0,d.jsx)(`i`,{className:`fas fa-boxes-stacked`}),` Step 2 — Entities (3 min)`]}),(0,d.jsxs)(`p`,{className:`lib-intro`,children:[(0,d.jsx)(`b`,{children:`Rule:`}),` Take nouns from requirements — each becomes a class.`]}),(0,d.jsxs)(g,{title:`LibraryService (Singleton + Facade)`,children:[`Top-level controller. Holds catalog, members, loans.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why Singleton: one instance. Facade over sub-systems.`})]}),(0,d.jsxs)(g,{title:`Book`,children:[`Metadata — ISBN, title, author, genre. Immutable.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: separates metadata from physical copies.`})]}),(0,d.jsxs)(g,{title:`BookCopy`,children:[`Physical copy — barcode, status, book ref. Unit of borrow.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: what actually gets borrowed.`})]}),(0,d.jsxs)(g,{title:`Member + Regular/Premium`,children:[`Max books and loan period differ by type.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why inheritance: different tier limits.`})]}),(0,d.jsxs)(g,{title:`Loan`,children:[`Has copy, member, dates, fine. The receipt.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: enables audit and fine calc.`})]}),(0,d.jsxs)(g,{title:`SearchStrategy + FineStrategy`,children:[`Title/Author/ISBN search. StandardFine calc.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: Strategy — swap without touching core.`})]})]}),(0,d.jsxs)(p,{id:`uml`,children:[(0,d.jsxs)(m,{children:[(0,d.jsx)(`i`,{className:`fas fa-project-diagram`}),` Step 3 — Class Diagram (10 min)`]}),(0,d.jsx)(`p`,{className:`lib-intro`,children:`Draw this on the whiteboard. Relationships are the key signal:`}),(0,d.jsx)(f,{code:u,lang:`text`}),(0,d.jsxs)(_,{children:[(0,d.jsx)(`b`,{children:`Key relationship:`}),` Service to Catalog is Composition. Copy to Book is Association. Service to Strategies is Dependency (DIP).`]})]}),(0,d.jsxs)(p,{id:`db`,children:[(0,d.jsxs)(m,{children:[(0,d.jsx)(`i`,{className:`fas fa-database`}),` Step 4 — DB Design (5 min)`]}),(0,d.jsx)(`p`,{className:`lib-intro`,children:`Even for in-memory LLD, show you can persist it. 6 normalized tables:`}),(0,d.jsx)(f,{code:l,lang:`sql`}),(0,d.jsxs)(g,{title:`idx_book_title / idx_book_author`,children:[`Makes search O(log n).`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: avoids full scan.`})]}),(0,d.jsxs)(g,{title:`idx_copy_status`,children:[`Find available copy of ISBN is O(log n).`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: critical for borrow flow.`})]}),(0,d.jsxs)(g,{title:`idx_loan_due`,children:[`Overdue batch job O(log n).`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: nightly scan optimization.`})]})]}),(0,d.jsxs)(p,{id:`java`,children:[(0,d.jsxs)(m,{children:[(0,d.jsx)(`i`,{className:`fab fa-java`}),` Step 5 — Java Code (20-25 min)`]}),(0,d.jsx)(`p`,{className:`lib-intro`,children:`Minimal working Java. Skip boilerplate getters unless asked:`}),(0,d.jsx)(h,{children:`Block A — Enums + Book + BookCopy`}),(0,d.jsx)(f,{code:o,lang:`java`}),(0,d.jsx)(h,{children:`Block B — Members + Loan + Strategies`}),(0,d.jsx)(f,{code:s,lang:`java`}),(0,d.jsx)(h,{children:`Block C — Catalog + Service + Main`}),(0,d.jsx)(f,{code:c,lang:`java`})]}),(0,d.jsxs)(p,{id:`wrap`,children:[(0,d.jsxs)(m,{children:[(0,d.jsx)(`i`,{className:`fas fa-flag-checkered`}),` Step 6 — Wrap-up (3 min)`]}),(0,d.jsx)(`p`,{className:`lib-intro`,children:`Be ready to answer these without thinking:`}),(0,d.jsxs)(g,{title:`Concurrency — same copy race?`,children:[`borrow() synchronized on copy. Service.borrow also synchronized.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: find + lock must be atomic.`})]}),(0,d.jsxs)(g,{title:`How to add genre search?`,children:[`GenreSearch implements SearchStrategy. No core changes.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: OCP + Strategy.`})]}),(0,d.jsxs)(g,{title:`How to handle reservations?`,children:[`Reservation queue per ISBN. Returned copy goes to queue head.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: hold queue design.`})]}),(0,d.jsxs)(g,{title:`Patterns used + SOLID`,children:[`Singleton, Strategy, Composition, Inheritance.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: naming patterns shows vocabulary.`})]}),(0,d.jsxs)(_,{children:[(0,d.jsx)(`b`,{children:`Scorecard:`}),` Requirements (5) + Entities (3) + Diagram (10) + DB (5) + Code (20) + Wrap-up (3) = 46 min.`]})]}),(0,d.jsx)(`footer`,{className:`lib-footer`,children:(0,d.jsx)(n,{to:`/maang/system-design/advanced`,children:`Back to Advanced System Design`})})]})}export{v as default};