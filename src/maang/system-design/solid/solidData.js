// ===== SOLID Principles — topic data =====
import {
  svgSRP,
  svgOCP,
  svgLSP,
  svgISP,
  svgDIP,
} from "./solidDiagrams";

export const solidTopics = [
  {
    id: "srp",
    icon: "fa-gem",
    title: "S — Single Responsibility (SRP)",
    sub: "One reason to change",
    desc: "A class should have only one reason to change, i.e., only one responsibility.",
    definition:
      "Simple rule: one class = one job.\n\nLike in a hotel — the cook only cooks. The waiter only serves. The cashier only takes money. Nobody does everyone's job.\n\nIf you ask the cook to also take money and clean tables, then when ONE thing changes (like the menu), you have to disturb him for everything.\n\nSo keep each class doing only ONE work. A 'SendEmail' class should only send email. Nothing else. That's it.",
    videoLink: "https://www.youtube.com/watch?v=EMbCnn01rxc",
    code: `// ===== SINGLE RESPONSIBILITY PRINCIPLE (SRP) =====
// One class → ONE responsibility (one reason to change).
//
// Salary domain — split into 3 SEPARATE classes (one file each):
//
//   SalaryService.java     → calculate salary (business logic)
//   SalaryRepository.java  → save salary to DB  (persistence)
//   SalaryReport.java      → generate payslip   (reporting)
//
// Each class has exactly ONE reason to change.

// ---------- File 1: SalaryService.java ----------
public class SalaryService {
    public void calculateSalary() {
        System.out.println("SalaryService  → Calculate the employee salary");
    }
}

// ---------- File 2: SalaryRepository.java ----------
public class SalaryRepository {
    public void saveSalary() {
        System.out.println("SalaryRepository → Save the salary record to DB");
    }
}

// ---------- File 3: SalaryReport.java ----------
public class SalaryReport {
    public void generateReport() {
        System.out.println("SalaryReport    → Generate the monthly payslip");
    }
}

// ---------- File 4: Main.java ----------
public class Main {
    public static void main(String[] args) {

        // Each class handles its OWN responsibility
        SalaryService    salaryService = new SalaryService();
        SalaryRepository repository    = new SalaryRepository();
        SalaryReport     report        = new SalaryReport();

        salaryService.calculateSalary();   // job 1 — calculation
        repository.saveSalary();           // job 2 — persistence
        report.generateReport();           // job 3 — reporting
    }
}`,
    diagram: svgSRP,
    relation: "🎯 One class = one job → one reason to change",
    points: [
      "One class → one responsibility",
      "3 separate files, 3 separate jobs",
      "Change payslip format? → only SalaryReport changes",
      "Change DB? → only SalaryRepository changes",
    ],
  },

  // ---------- 2. OCP ----------
  {
    id: "ocp",
    icon: "fa-lock-open",
    title: "O — Open/Closed (OCP)",
    sub: "Open for extension, closed for modification",
    desc: "Software entities should be open for extension but closed for modification.",
    definition:
      "Simple rule: you can ADD new things easily, but you should NOT change the old code that already works.\n\nLike your phone charger. When you buy a new phone, you just add a new charger. You don't open the old phone and change its wires.\n\nSo when a new feature comes (like a new payment type), just ADD a new class for it. Don't go and edit the old working code and risk breaking it.",
    videoLink: "https://www.youtube.com/watch?v=j1ZxAKLonl4",
    code: `// ===== OPEN/CLOSED PRINCIPLE (OCP) =====
// Open for EXTENSION (add new payment type)
// Closed for MODIFICATION (don't touch existing code)
//
// Payment domain — each type lives in its OWN file:
//
//   Payment.java            → the abstraction (interface)
//   PaypalPayment.java      → PayPal implementation
//   UPIPayment.java         → UPI implementation
//   CreditCardPayment.java  → Card implementation
//   Main.java               → runs the demo
//
// To add a NEW payment method (e.g. Crypto) you only ADD a
// new file — no existing file is ever modified.

// ---------- File 1: Payment.java ----------
public interface Payment {
    void pay();
}

// ---------- File 2: PaypalPayment.java ----------
public class PaypalPayment implements Payment {
    public void pay() {
        System.out.println("Payment using PayPal");
    }
}

// ---------- File 3: UPIPayment.java ----------
public class UPIPayment implements Payment {
    public void pay() {
        System.out.println("Payment using UPI");
    }
}

// ---------- File 4: CreditCardPayment.java ----------
public class CreditCardPayment implements Payment {
    public void pay() {
        System.out.println("Payment using Credit Card");
    }
}

// ---------- File 5 (NEW later): CryptoPayment.java ----------
// Added LATER without touching any existing file → that is OCP.
// public class CryptoPayment implements Payment {
//     public void pay() {
//         System.out.println("Payment using Crypto");
//     }
// }

// ---------- File 6: Main.java ----------
public class Main {
    public static void main(String[] args) {

        // Same reference type (Payment), different implementations
        Payment payment1 = new PaypalPayment();
        payment1.pay();                       // → PayPal

        Payment payment2 = new UPIPayment();
        payment2.pay();                       // → UPI

        Payment payment3 = new CreditCardPayment();
        payment3.pay();                       // → Credit Card

        // New payment method? → just add a new file/class.
        // No existing code (PaypalPayment, UPIPayment...) is modified.
    }
}`,
    diagram: svgOCP,
    relation: "🔓 Extend behavior via new classes/interfaces — don't edit existing code",
    points: [
      "Abstraction over implementation",
      "Strategy pattern fits OCP",
      "Add new behavior without modifying",
      "Dependency injection for flexibility",
    ],
  },

  // ---------- 3. LSP ----------
  {
    id: "lsp",
    icon: "fa-object-extend",
    title: "L — Liskov Substitution (LSP)",
    sub: "Subtypes must be substitutable",
    desc: "Objects of a superclass should be replaceable with objects of its subclasses without breaking.",
    definition:
      "Simple rule: a child must be able to do everything the parent can do.\n\nLike this — if your father says 'everyone in our home can ride a bike', then his son must ALSO be able to ride a bike. If the son cannot ride, then he breaks the family rule and creates problems.\n\nSo in code: if a parent class can do something, the child class must also be able to do it properly. If it can't, don't make it a child of that parent.",
    videoLink: "https://www.youtube.com/watch?v=irHHnn7CZAA",
    code: `// ===== LISKOV SUBSTITUTION PRINCIPLE (LSP) =====
// Any child implementation must be replaceable with the parent
// type WITHOUT breaking the program.
//
// Payment domain — each class in its OWN file:
//
//   Payment.java            → the abstraction (interface)
//   PaypalPayment.java      → PayPal implementation
//   UPIPayment.java         → UPI implementation
//   CreditCardPayment.java  → Card implementation
//   Main.java               → runs the demo
//
// The SAME parent reference (Payment) can be swapped between
// PayPal, UPI, Credit Card — the program still works 100%.

// ---------- File 1: Payment.java ----------
public interface Payment {
    void pay();
}

// ---------- File 2: PaypalPayment.java ----------
public class PaypalPayment implements Payment {
    public void pay() {
        System.out.println("Payment using PayPal");
    }
}

// ---------- File 3: UPIPayment.java ----------
public class UPIPayment implements Payment {
    public void pay() {
        System.out.println("Payment using UPI");
    }
}

// ---------- File 4: CreditCardPayment.java ----------
public class CreditCardPayment implements Payment {
    public void pay() {
        System.out.println("Payment using Credit Card");
    }
}

// ---------- File 5: Main.java ----------
public class Main {
    public static void main(String[] args) {

        // ONE parent reference (Payment) holds DIFFERENT children.
        // This is substitutability — the LSP contract.
        Payment payment;

        payment = new PaypalPayment();
        payment.pay();     // works for PayPal

        payment = new UPIPayment();
        payment.pay();     // works for UPI

        payment = new CreditCardPayment();
        payment.pay();     // works for Credit Card

        // Every child can replace the parent type — nothing breaks.
    }
}`,
    diagram: svgLSP,
    relation: "↪️ Subtypes must honor the parent's contract — substitutability",
    points: [
      "Subclasses must preserve invariants",
      "Any child can replace the parent safely",
      "Same reference, different behavior",
      "Behavior preserved → no broken program",
    ],
  },

  // ---------- 4. ISP ----------
  {
    id: "isp",
    icon: "fa-plug",
    title: "I — Interface Segregation (ISP)",
    sub: "Many slim clients over one fat interface",
    desc: "Clients should not be forced to depend on interfaces they don't use.",
    definition:
      "Simple rule: don't force anyone to learn work they don't need.\n\nLike a hotel menu. A pure vegetarian customer only needs the veg items. Don't give him the full menu with all the non-veg items and force him to read everything.\n\nSo in code: don't make one big interface with 20 methods. Split it into small ones, so each class only takes the methods it actually needs. Nothing extra.",
    videoLink: "https://www.youtube.com/watch?v=4ZdsinALUX8",
    code: `// ===== INTERFACE SEGREGATION PRINCIPLE (ISP) =====
// Don't force a class to implement methods it doesn't need.
// Use small, role-based interfaces instead of one "fat" interface.
//
// Loan domain — split into small interfaces, one file each:
//
//   ApplyLoan.java        → who can APPLY for a loan
//   CheckLoanStatus.java  → who can CHECK loan status
//   CancelLoan.java       → who can CANCEL a loan
//   Customer.java         → needs only ApplyLoan + CheckLoanStatus
//   Admin.java            → needs all three
//   Main.java             → runs the demo
//
// Customer is never forced to implement cancelLoan() it doesn't need.

// ---------- File 1: ApplyLoan.java ----------
public interface ApplyLoan {
    void applyLoan();
}

// ---------- File 2: CheckLoanStatus.java ----------
public interface CheckLoanStatus {
    void checkLoanStatus();
}

// ---------- File 3: CancelLoan.java ----------
public interface CancelLoan {
    void cancelLoan();
}

// ---------- File 4: Customer.java ----------
// Customer applies for loan and checks status — but cannot cancel.
public class Customer implements ApplyLoan, CheckLoanStatus {

    public void applyLoan() {
        System.out.println("Customer applied for loan");
    }

    public void checkLoanStatus() {
        System.out.println("Checking loan status");
    }
}

// ---------- File 5: Admin.java ----------
// Admin has all 3 powers including cancelling the loan.
public class Admin implements ApplyLoan, CheckLoanStatus, CancelLoan {

    public void applyLoan() {
        System.out.println("Admin applied loan");
    }

    public void checkLoanStatus() {
        System.out.println("Admin checking loan status");
    }

    public void cancelLoan() {
        System.out.println("Admin cancelled loan");
    }
}

// ---------- File 6: Main.java ----------
public class Main {
    public static void main(String[] args) {

        Customer customer = new Customer();
        customer.applyLoan();          // → Customer applied for loan
        customer.checkLoanStatus();    // → Checking loan status

        Admin admin = new Admin();
        admin.applyLoan();             // → Admin applied loan
        admin.checkLoanStatus();       // → Admin checking loan status
        admin.cancelLoan();            // → Admin cancelled loan
    }
}`,
    diagram: svgISP,
    relation: "✂️ Slim interfaces — clients implement only what they need",
    points: [
      "No empty method implementations",
      "Role-based interfaces",
      "Reduce coupling between modules",
      "Single-responsibility for interfaces too",
    ],
  },

  // ---------- 5. DIP ----------
  {
    id: "dip",
    icon: "fa-plug-circle-plus",
    title: "D — Dependency Inversion (DIP)",
    sub: "Depend on abstractions, not concretions",
    desc: "High-level modules should not depend on low-level modules. Both should depend on abstractions.",
    definition:
      "Simple rule: connect to the plug, not to the wires inside the wall.\n\nWhen you use a fan, you just put the plug in the socket. You don't touch the wires inside the wall. So tomorrow if the power company changes something, your fan still works the same.\n\nSo in code: depend on a simple interface, not on the actual class. Then you can easily swap one for another (like changing from one database to another) without breaking your code.",
    videoLink: "https://www.youtube.com/watch?v=XDRSpWS8urM",
    code: `// ===== DEPENDENCY INVERSION PRINCIPLE (DIP) =====
// High-level modules must NOT depend on low-level modules.
// Both must depend on an ABSTRACTION (interface).
//
// Payment domain — one file per class:
//
//   Payment.java           → the abstraction (interface)
//   PaypalPayment.java     → low-level PayPal implementation
//   UPIPayment.java        → low-level UPI implementation
//   PaymentService.java    → high-level service (depends on Payment only)
//   Main.java              → injects implementations & runs the demo
//
// PaymentService never knows WHICH payment it uses — the concrete
// implementation is INJECTED from outside via the constructor.

// ---------- File 1: Payment.java ----------
public interface Payment {
    void pay();
}

// ---------- File 2: PaypalPayment.java ----------
public class PaypalPayment implements Payment {
    public void pay() {
        System.out.println("Payment using PayPal");
    }
}

// ---------- File 3: UPIPayment.java ----------
public class UPIPayment implements Payment {
    public void pay() {
        System.out.println("Payment using UPI");
    }
}

// ---------- File 4: PaymentService.java ----------
// High-level service depends on the interface, NOT on concrete classes.
public class PaymentService {

    private final Payment payment;   // ← abstraction

    // Constructor injection: concrete impl comes from outside
    public PaymentService(Payment payment) {
        this.payment = payment;
    }

    public void makePayment() {
        payment.pay();   // delegate to the injected implementation
    }
}

// ---------- File 5: Main.java ----------
public class Main {
    public static void main(String[] args) {

        // Inject PayPal
        Payment paypal = new PaypalPayment();
        PaymentService service1 = new PaymentService(paypal);
        service1.makePayment();        // → Payment using PayPal

        // Inject UPI — same PaymentService, different behavior
        Payment upi = new UPIPayment();
        PaymentService service2 = new PaymentService(upi);
        service2.makePayment();        // → Payment using UPI
    }
}`,
    diagram: svgDIP,
    relation: "🔄 High-level ↔ Abstraction ← Low-level (inject the impl)",
    points: [
      "Depend on abstractions, not concretions",
      "Constructor / setter / method injection",
      "Enables testability (easily mocked)",
      "Swappable implementations",
    ],
  },
];