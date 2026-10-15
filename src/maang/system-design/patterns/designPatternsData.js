// ===== Design Patterns — topic data =====
import {
  svgSingleton,
  svgFactory,
  svgBuilder,
  svgObserver,
  svgStrategy,
  svgProxy,
  svgChainOfResponsibility,
} from "./designPatternsDiagrams";

const CHANNEL_UPLOADS =
  "https://www.youtube.com/playlist?list=UUTirDqmh7EyUCB8661XdwYw";

export const designPatternsTopics = [
  // ---------- 1. SINGLETON ----------
  {
    id: "singleton",
    icon: "fa-infinity",
    title: "Singleton",
    sub: "Making objects · only one shared copy",
    category: "creational",
    desc: "Make sure only ONE copy of something exists in the whole app, and everyone shares that same one.",
    definition:
      "Think of your country's President — there is only one, no matter how many times people ask. Singleton means a class can create only ONE object, and everyone who asks gets the exact same one. We use it for things like a single database connection or one settings file, so the whole app shares one copy instead of wasting memory making many. It also keeps everything in one place.",
    videoLink: CHANNEL_UPLOADS,
    code: `// ===== SINGLETON PATTERN =====

// Thread-safe Singleton with double-checked locking
class DatabaseConnection {
    private static volatile DatabaseConnection instance;
    private boolean connected;

    private DatabaseConnection() {
        // private constructor → no external new
        this.connected = false;
    }

    public static DatabaseConnection getInstance() {
        if (instance == null) {              // first check
            synchronized (DatabaseConnection.class) {
                if (instance == null) {      // second check
                    instance = new DatabaseConnection();
                }
            }
        }
        return instance;
    }

    public void connect() {
        if (!connected) {
            connected = true;
            System.out.println("Connected to primary DB");
        }
    }
}

public class Main {
    public static void main(String[] args) {
        DatabaseConnection a = DatabaseConnection.getInstance();
        DatabaseConnection b = DatabaseConnection.getInstance();

        System.out.println(a == b);   // true — same instance
        a.connect();                  // Connected once
        b.connect();                  // already connected
    }
}`,
    diagram: svgSingleton,
    relation: "🔂 Only one copy is ever made — everyone uses the same shared one",
    points: [
      "Only ONE object is created for the whole app",
      "Every part of the code gets the SAME copy",
      "Great for: a single database connection, one settings file, one logger",
      "Saves memory and keeps everything in one shared place",
    ],
  },

  // ---------- 2. FACTORY ----------
  {
    id: "factory",
    icon: "fa-industry",
    title: "Factory Method",
    sub: "Making objects · a factory builds it for you",
    category: "creational",
    desc: "You ask for what you want, and a factory builds the right object for you — you never build it yourself.",
    definition:
      "Imagine a pizza shop: you say 'I want a veg pizza' and they make it. You don't cook it yourself. A Factory works the same way. You tell the factory WHAT you want (like 'email' or 'sms'), and it creates the right object and hands it to you. Your main code stays clean because it never has to know HOW each object is built — it just asks for one by name and uses it.",
    videoLink: CHANNEL_UPLOADS,
    code: `// ===== FACTORY METHOD PATTERN =====

// Product interface
interface Notification {
    void send(String message);
}

// Concrete products
class EmailNotification implements Notification {
    public void send(String message) {
        System.out.println("📧 Email: " + message);
    }
}
class SMSNotification implements Notification {
    public void send(String message) {
        System.out.println("📱 SMS: " + message);
    }
}
class PushNotification implements Notification {
    public void send(String message) {
        System.out.println("🔔 Push: " + message);
    }
}

// Factory — decides which concrete object to create
class NotificationFactory {
    public static Notification create(String channel) {
        switch (channel) {
            case "email": return new EmailNotification();
            case "sms":   return new SMSNotification();
            case "push":  return new PushNotification();
            default: throw new IllegalArgumentException("Unknown: " + channel);
        }
    }
}

public class Main {
    public static void main(String[] args) {
        // Client never uses 'new' — factory does the work
        Notification n1 = NotificationFactory.create("email");
        n1.send("Welcome!");

        Notification n2 = NotificationFactory.create("push");
        n2.send("New message");
    }
}`,
    diagram: svgFactory,
    relation: "🏭 The factory builds the object — your code just asks for it",
    points: [
      "Your code only says WHAT it wants, not HOW to build it",
      "All the building happens in one place (the factory)",
      "Adding a new type is easy — you just add it inside the factory",
      "Keeps your main code clean and less tightly tied to details",
    ],
  },

  // ---------- 3. BUILDER ----------
  {
    id: "builder",
    icon: "fa-layer-group",
    title: "Builder",
    sub: "Making objects · build step by step",
    category: "creational",
    desc: "Build a big object step by step, adding only the pieces you actually need.",
    definition:
      "Think of ordering a burger at a custom counter — you add patty, then cheese, skip the onions, add sauce, one step at a time, then say 'done'. Builder works the same way for objects. When an object has lots of optional parts, instead of one giant confusing setup with 15 settings you mostly leave empty, you set only what you need, piece by piece, and press 'build' at the end. Much easier to read and no mistakes with the wrong order of settings.",
    videoLink: CHANNEL_UPLOADS,
    code: `// ===== BUILDER PATTERN =====

class HttpRequest {
    private final String method;
    private final String url;
    private final String body;      // optional
    private final boolean retry;    // optional

    private HttpRequest(Builder b) {
        this.method = b.method;
        this.url = b.url;
        this.body = b.body;
        this.retry = b.retry;
    }

    public String toString() {
        return method + " " + url + " body='" + body + "' retry=" + retry;
    }

    // Fluent Builder
    public static class Builder {
        private String method = "GET"; // defaults
        private String url = "/";
        private String body = "";
        private boolean retry = false;

        public Builder method(String m) { this.method = m; return this; }
        public Builder url(String u)    { this.url = u; return this; }
        public Builder body(String b)   { this.body = b; return this; }
        public Builder retry(boolean r) { this.retry = r; return this; }

        public HttpRequest build() { return new HttpRequest(this); }
    }
}

public class Main {
    public static void main(String[] args) {
        // Only set what you need — fluent chain
        HttpRequest req = new HttpRequest.Builder()
                .method("POST")
                .url("/api/order")
                .body("{\\"userId\\": 1}")
                .retry(true)
                .build();

        System.out.println(req);
        // POST /api/order body='{"userId": 1}' retry=true
    }
}`,
    diagram: svgBuilder,
    relation: "🧱 Set the pieces one by one, then build — no giant confusing setup",
    points: [
      "Add settings one step at a time, like filling a form",
      "Only set the parts you need — skip the rest",
      "Perfect when an object has many optional pieces",
      "Easy to read, and the finished object can't be changed by accident",
    ],
  },

  // ---------- 4. OBSERVER ----------
  {
    id: "observer",
    icon: "fa-bell",
    title: "Observer",
    sub: "How pieces talk · tell everyone on change",
    category: "behavioral",
    desc: "When one thing changes, everyone who signed up to hear about it gets told automatically.",
    definition:
      "Think of a YouTube channel. When it posts a new video, everyone who subscribed gets a notification — they don't have to keep checking the channel all day. Observer works the same way. One object (the channel) keeps a list of people who subscribed (the watchers). When something changes, it tells ALL of them at once. That's how notifications, live feeds, and 'subscribe' buttons work.",
    videoLink: CHANNEL_UPLOADS,
    code: `// ===== OBSERVER PATTERN =====
import java.util.*;

interface Observer {
    void update(String message);
}

// Subject (Publisher)
class NewsAgency {
    private List<Observer> observers = new ArrayList<>();
    private String latestNews;

    public void subscribe(Observer o) { observers.add(o); }
    public void unsubscribe(Observer o) { observers.remove(o); }

    // When news arrives, notify everyone
    public void publish(String news) {
        this.latestNews = news;
        for (Observer o : observers) {
            o.update(news);
        }
    }
}

// Observers (Subscribers)
class EmailSubscriber implements Observer {
    private String name;
    public EmailSubscriber(String name) { this.name = name; }
    public void update(String message) {
        System.out.println(name + " got email: " + message);
    }
}
class PushSubscriber implements Observer {
    private String name;
    public PushSubscriber(String name) { this.name = name; }
    public void update(String message) {
        System.out.println(name + " got push: " + message);
    }
}

public class Main {
    public static void main(String[] args) {
        NewsAgency agency = new NewsAgency();

        Observer alice = new EmailSubscriber("Alice");
        Observer bob   = new PushSubscriber("Bob");

        agency.subscribe(alice);
        agency.subscribe(bob);

        agency.publish("Breaking: AI wins gold!");
        // Alice got email: Breaking...
        // Bob got push: Breaking...
    }
}`,
    diagram: svgObserver,
    relation: "🔔 One thing changes → everyone subscribed gets told at once",
    points: [
      "Many people can listen to one thing at the same time",
      "Listeners don't have to keep checking for updates",
      "Add or remove listeners anytime without changing the main thing",
      "This is how notifications and live updates work",
    ],
  },

  // ---------- 5. STRATEGY ----------
  {
    id: "strategy",
    icon: "fa-bullseye",
    title: "Strategy",
    sub: "How pieces talk · swap the method anytime",
    category: "behavioral",
    desc: "Pick HOW to do something, and swap the method anytime — without changing the rest of your code.",
    definition:
      "Think of paying at a shop. You can pay by card, by UPI, or by cash. The goal (paying) is the same, but the method is different, and you can switch on the spot. Strategy works the same way. Each way of doing a job is kept in its own box, and your code just picks one and uses it. Want a new payment method later? Just add a new box — no need to rewrite the old ones. No messy if-else.",
    videoLink: CHANNEL_UPLOADS,
    code: `// ===== STRATEGY PATTERN =====

// Strategy interface
interface PaymentStrategy {
    void pay(double amount);
}

// Concrete strategies
class CreditCardPayment implements PaymentStrategy {
    private String cardNo;
    public CreditCardPayment(String cardNo) { this.cardNo = cardNo; }
    public void pay(double amount) {
        System.out.println("💳 Paid $" + amount + " via card " + cardNo);
    }
}
class PayPalPayment implements PaymentStrategy {
    private String email;
    public PayPalPayment(String email) { this.email = email; }
    public void pay(double amount) {
        System.out.println("🌐 Paid $" + amount + " via PayPal " + email);
    }
}
class CryptoPayment implements PaymentStrategy {
    public void pay(double amount) {
        System.out.println("🪙 Paid $" + amount + " via Crypto");
    }
}

// Context — uses a chosen strategy
class Checkout {
    private PaymentStrategy strategy;
    public void setStrategy(PaymentStrategy s) { this.strategy = s; }
    public void checkout(double amount) {
        strategy.pay(amount);   // delegate to current strategy
    }
}

public class Main {
    public static void main(String[] args) {
        Checkout cart = new Checkout();

        cart.setStrategy(new CreditCardPayment("4242-****"));
        cart.checkout(100);   // via card

        cart.setStrategy(new PayPalPayment("user@mail.com"));
        cart.checkout(250);   // swap strategy at runtime

        cart.setStrategy(new CryptoPayment());
        cart.checkout(500);
    }
}`,
    diagram: svgStrategy,
    relation: "🎯 Choose the method you want — swap it anytime, no if/else mess",
    points: [
      "Each way of doing the job sits in its own separate box",
      "You can switch the method while the app is running",
      "Add a new method without touching the old ones",
      "No long if-else chains to pick what to do",
    ],
  },

  // ---------- 6. PROXY ----------
  {
    id: "proxy",
    icon: "fa-shield-halved",
    title: "Proxy",
    sub: "Fitting together · a guard controls access",
    category: "structural",
    desc: "A stand-in that guards the real object — it can check permission, load lazily, or remember results.",
    definition:
      "Think of a celebrity's manager. Fans don't reach the star directly — they go through the manager, who decides who gets through, when, and how. A Proxy is that manager for an object. It looks and works exactly like the real thing from the outside, but quietly does extra jobs: it can wait and load the real thing only when needed (to save time), check that you're allowed in (security), or remember an old answer instead of asking again (caching).",
    videoLink: CHANNEL_UPLOADS,
    code: `// ===== PROXY PATTERN =====
// Proxy controls access to a real object.
// RealImage is heavy (loads from disk); ProxyImage loads lazily + caches.

public class Main {

    // ---- Subject interface (both Real and Proxy implement this) ----
    interface Image {
        void display();
    }

    // ---- Real subject (heavy / expensive to construct) ----
    static class RealImage implements Image {
        private String filename;

        public RealImage(String filename) {
            this.filename = filename;
            loadFromDisk();             // expensive operation
        }

        private void loadFromDisk() {
            System.out.println("Loading image from disk: " + filename);
        }

        public void display() {
            System.out.println("Displaying image: " + filename);
        }
    }

    // ---- Proxy: lazy load + cache ----
    static class ProxyImage implements Image {
        private String filename;
        private RealImage realImage;     // holds the real subject

        public ProxyImage(String filename) {
            this.filename = filename;     // NOT loading yet
        }

        public void display() {
            // Lazy: only create RealImage when first needed
            if (realImage == null) {
                realImage = new RealImage(filename);
            }
            realImage.display();
        }
    }

    public static void main(String[] args) {
        // Client uses the proxy — does NOT know about RealImage
        Image img1 = new ProxyImage("photo1.jpg");
        Image img2 = new ProxyImage("photo2.jpg");

        // First display → triggers loading
        img1.display();
        img1.display();                  // already loaded, no re-load

        img2.display();
    }
}`,
    diagram: svgProxy,
    relation: "🛡️ A guard stands in front — controls access, saves time, remembers results",
    points: [
      "It looks and acts just like the real object",
      "Can load the real thing only when needed (saves time)",
      "Can check permission before letting you in (security)",
      "Can remember an old answer instead of doing the work again (caching)",
    ],
  },

  // ---------- 7. CHAIN OF RESPONSIBILITY ----------
  {
    id: "chain",
    icon: "fa-link",
    title: "Chain of Responsibility",
    sub: "How pieces talk · pass it until someone handles it",
    category: "behavioral",
    desc: "Pass a request from one handler to the next until someone can actually handle it.",
    definition:
      "Think of calling customer support. First a robot tries to help. If it can't, it passes you to a human agent. If that agent can't fix it, they pass you to a manager. The request keeps moving along the line until the right person handles it. Chain of Responsibility works the same way: each handler gets a turn, decides 'can I handle this?', and if not, passes it to the next one in line.",
    videoLink: CHANNEL_UPLOADS,
    code: `// ===== CHAIN OF RESPONSIBILITY PATTERN =====
// A support ticket flows through handlers until one resolves it.
//   $50  → Bot handles
//   $500 → Supervisor handles
//   else → Manager handles

public class Main {

    // ---- Request ----
    static class SupportTicket {
        private String issue;
        private int amount;
        public SupportTicket(String issue, int amount) {
            this.issue = issue;
            this.amount = amount;
        }
        public String getIssue() { return issue; }
        public int    getAmount() { return amount; }
    }

    // ---- Abstract Handler ----
    abstract static class SupportHandler {
        protected SupportHandler next;   // link to next handler
        public void setNext(SupportHandler next) { this.next = next; }
        public abstract void handle(SupportTicket t);
        protected void forward(SupportTicket t) {
            if (next != null) next.handle(t);
            else              System.out.println("No one could handle: " + t.getIssue());
        }
    }

    // ---- Concrete Handler 1: Bot (small issues) ----
    static class BotHandler extends SupportHandler {
        public void handle(SupportTicket t) {
            if (t.getAmount() < 100) {
                System.out.println("[Bot]     resolved: " + t.getIssue() + " ($" + t.getAmount() + ")");
            } else {
                forward(t);     // pass to next
            }
        }
    }

    // ---- Concrete Handler 2: Supervisor ----
    static class SupervisorHandler extends SupportHandler {
        public void handle(SupportTicket t) {
            if (t.getAmount() <= 1000) {
                System.out.println("[Sup]     resolved: " + t.getIssue() + " ($" + t.getAmount() + ")");
            } else {
                forward(t);
            }
        }
    }

    // ---- Concrete Handler 3: Manager ----
    static class ManagerHandler extends SupportHandler {
        public void handle(SupportTicket t) {
            System.out.println("[Mgr]     resolved: " + t.getIssue() + " ($" + t.getAmount() + ")");
        }
    }

    public static void main(String[] args) {
        // Build the chain: Bot → Supervisor → Manager
        SupportHandler bot = new BotHandler();
        SupportHandler sup = new SupervisorHandler();
        SupportHandler mgr = new ManagerHandler();
        bot.setNext(sup);
        sup.setNext(mgr);

        // Send tickets — each finds its handler
        bot.handle(new SupportTicket("Reset password",  0));
        bot.handle(new SupportTicket("Refund request",  500));
        bot.handle(new SupportTicket("Server outage",  10000));
    }
}`,
    diagram: svgChainOfResponsibility,
    relation: "🔗 The request passes along until the right handler takes care of it",
    points: [
      "You don't need to know WHO will handle it — you just send it",
      "Each handler either fixes it or passes it to the next",
      "Easy to add or remove handlers anytime",
      "Used in: customer support, approvals, logins, and app middleware",
    ],
  },
];