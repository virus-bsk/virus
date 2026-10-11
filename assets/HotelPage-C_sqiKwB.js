import{r as e}from"./rolldown-runtime-QTnfLwEv.js";import{h as t,r as n,u as r}from"./index-Dka5w6n9.js";import{t as i}from"./atom-one-dark-C84iCW6D.js";var a=e(t(),1),o=`// A. Enums + Room + Guest
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

enum RoomType { SINGLE, DOUBLE, SUITE }
enum RoomStatus { AVAILABLE, MAINTENANCE }
enum BookingStatus { PENDING, CONFIRMED, CHECKED_IN, CHECKED_OUT, CANCELLED }
enum PaymentStatus { PENDING, SUCCESS, FAILED, REFUNDED }

class Room {
    private final String number;
    private final RoomType type;
    private final double pricePerNight;
    private RoomStatus status = RoomStatus.AVAILABLE;

    Room(String n, RoomType t, double p) { number = n; type = t; pricePerNight = p; }
    public String getNumber() { return number; }
    public RoomType getType() { return type; }
    public double getPricePerNight() { return pricePerNight; }
    public RoomStatus getStatus() { return status; }
    public void setStatus(RoomStatus s) { status = s; }
}

class Guest {
    private final String id;
    private final String name;
    private final String email;
    private final String phone;
    Guest(String id, String n, String e, String p) {
        this.id = id; name = n; email = e; phone = p;
    }
    public String getId() { return id; }
    public String getName() { return name; }
    public String getEmail() { return email; }
}`,s=`// B. BookingState + Payment + Refund Strategies
interface BookingState {
    boolean confirm(Booking b);
    boolean checkIn(Booking b);
    boolean checkOut(Booking b);
    double cancel(Booking b, LocalDate today);
    BookingStatus getStatus();
}

class PendingState implements BookingState {
    public boolean confirm(Booking b) { b.setState(new ConfirmedState()); return true; }
    public boolean checkIn(Booking b) { return false; }
    public boolean checkOut(Booking b) { return false; }
    public double cancel(Booking b, LocalDate today) {
        b.setState(new CancelledState());
        return b.getPaidAmount();
    }
    public BookingStatus getStatus() { return BookingStatus.PENDING; }
}

class ConfirmedState implements BookingState {
    public boolean confirm(Booking b) { return false; }
    public boolean checkIn(Booking b) { b.setState(new CheckedInState()); return true; }
    public boolean checkOut(Booking b) { return false; }
    public double cancel(Booking b, LocalDate today) {
        b.setState(new CancelledState());
        return b.getRefundStrategy().calculateRefund(b, today);
    }
    public BookingStatus getStatus() { return BookingStatus.CONFIRMED; }
}

class CheckedInState implements BookingState {
    public boolean confirm(Booking b) { return false; }
    public boolean checkIn(Booking b) { return false; }
    public boolean checkOut(Booking b) { b.setState(new CheckedOutState()); return true; }
    public double cancel(Booking b, LocalDate today) { return 0; }
    public BookingStatus getStatus() { return BookingStatus.CHECKED_IN; }
}

class CheckedOutState implements BookingState {
    public boolean confirm(Booking b) { return false; }
    public boolean checkIn(Booking b) { return false; }
    public boolean checkOut(Booking b) { return false; }
    public double cancel(Booking b, LocalDate today) { return 0; }
    public BookingStatus getStatus() { return BookingStatus.CHECKED_OUT; }
}

class CancelledState implements BookingState {
    public boolean confirm(Booking b) { return false; }
    public boolean checkIn(Booking b) { return false; }
    public boolean checkOut(Booking b) { return false; }
    public double cancel(Booking b, LocalDate today) { return 0; }
    public BookingStatus getStatus() { return BookingStatus.CANCELLED; }
}

interface PaymentStrategy {
    PaymentStatus pay(double amount);
}
class CardPayment implements PaymentStrategy {
    public PaymentStatus pay(double a) { return PaymentStatus.SUCCESS; }
}
class UpiPayment implements PaymentStrategy {
    public PaymentStatus pay(double a) { return PaymentStatus.SUCCESS; }
}
class CashPayment implements PaymentStrategy {
    public PaymentStatus pay(double a) { return PaymentStatus.SUCCESS; }
}

interface RefundStrategy {
    double calculateRefund(Booking b, LocalDate cancelDate);
}
class FreeCancel implements RefundStrategy {
    public double calculateRefund(Booking b, LocalDate cancelDate) {
        return b.getPaidAmount();
    }
}
class PartialRefund implements RefundStrategy {
    private final double pct;
    PartialRefund(double p) { pct = p; }
    public double calculateRefund(Booking b, LocalDate cancelDate) {
        return b.getPaidAmount() * pct;
    }
}
class NoRefund implements RefundStrategy {
    public double calculateRefund(Booking b, LocalDate cancelDate) { return 0; }
}`,c=`// C. Booking + AvailabilityChecker + Service + Main
class Booking {
    private final String id;
    private final Room room;
    private final Guest guest;
    private final LocalDate checkIn;
    private final LocalDate checkOut;
    private BookingState state = new PendingState();
    private double paidAmount = 0;
    private RefundStrategy refundStrategy = new FreeCancel();

    Booking(String id, Room r, Guest g, LocalDate in, LocalDate out) {
        this.id = id; room = r; guest = g; checkIn = in; checkOut = out;
    }
    public boolean overlaps(LocalDate in, LocalDate out) {
        return checkIn.isBefore(out) && in.isBefore(checkOut);
    }
    public long nights() { return ChronoUnit.DAYS.between(checkIn, checkOut); }
    public double totalAmount() { return nights() * room.getPricePerNight(); }

    public String getId() { return id; }
    public Room getRoom() { return room; }
    public Guest getGuest() { return guest; }
    public LocalDate getCheckIn() { return checkIn; }
    public LocalDate getCheckOut() { return checkOut; }
    public BookingState getState() { return state; }
    public void setState(BookingState s) { state = s; }
    public double getPaidAmount() { return paidAmount; }
    public void setPaidAmount(double a) { paidAmount = a; }
    public RefundStrategy getRefundStrategy() { return refundStrategy; }
    public void setRefundStrategy(RefundStrategy r) { refundStrategy = r; }

    public boolean confirm() { return state.confirm(this); }
    public boolean checkIn() { return state.checkIn(this); }
    public boolean checkOut() { return state.checkOut(this); }
    public double cancel(LocalDate today) { return state.cancel(this, today); }
    public BookingStatus getStatus() { return state.getStatus(); }
}

class AvailabilityChecker {
    public boolean isAvailable(Room room, LocalDate in, LocalDate out,
                                 Collection<Booking> allBookings) {
        if (room.getStatus() == RoomStatus.MAINTENANCE) return false;
        for (Booking b : allBookings) {
            if (!b.getRoom().getNumber().equals(room.getNumber())) continue;
            if (b.getStatus() == BookingStatus.CANCELLED
                    || b.getStatus() == BookingStatus.CHECKED_OUT) continue;
            if (b.overlaps(in, out)) return false;
        }
        return true;
    }
}

class HotelBookingService {
    private static volatile HotelBookingService ins;
    private final Map<String, Room> rooms = new ConcurrentHashMap<>();
    private final Map<String, Booking> bookings = new ConcurrentHashMap<>();
    private final Map<String, Guest> guests = new ConcurrentHashMap<>();
    private final AvailabilityChecker checker = new AvailabilityChecker();

    private HotelBookingService() {}

    public static HotelBookingService get() {
        if (ins == null) { synchronized (HotelBookingService.class) {
            if (ins == null) ins = new HotelBookingService(); } }
        return ins;
    }

    public void addRoom(Room r) { rooms.put(r.getNumber(), r); }
    public void addGuest(Guest g) { guests.put(g.getId(), g); }

    public List<Room> searchAvailable(RoomType type, LocalDate in, LocalDate out) {
        List<Room> result = new ArrayList<>();
        for (Room r : rooms.values()) {
            if (r.getType() != type) continue;
            if (checker.isAvailable(r, in, out, bookings.values())) result.add(r);
        }
        return result;
    }

    public synchronized Optional<Booking> book(String guestId, String roomNumber,
                                                LocalDate in, LocalDate out,
                                                PaymentStrategy payment) {
        Guest g = guests.get(guestId);
        Room r = rooms.get(roomNumber);
        if (g == null || r == null) return Optional.empty();
        if (in.isAfter(out) || in.isEqual(out)) return Optional.empty();
        if (!checker.isAvailable(r, in, out, bookings.values())) return Optional.empty();

        Booking b = new Booking("B-" + System.currentTimeMillis(), r, g, in, out);
        double amount = b.totalAmount();
        if (payment.pay(amount) != PaymentStatus.SUCCESS) return Optional.empty();

        b.setPaidAmount(amount);
        b.confirm();
        bookings.put(b.getId(), b);
        return Optional.of(b);
    }

    public synchronized double cancel(String bookingId, LocalDate today) {
        Booking b = bookings.get(bookingId);
        if (b == null) return 0;
        return b.cancel(today);
    }

    public boolean checkIn(String bookingId) {
        Booking b = bookings.get(bookingId);
        return b != null && b.checkIn();
    }
    public boolean checkOut(String bookingId) {
        Booking b = bookings.get(bookingId);
        return b != null && b.checkOut();
    }
    public Booking getBooking(String id) { return bookings.get(id); }
}

public class Main {
    public static void main(String[] args) {
        HotelBookingService svc = HotelBookingService.get();
        svc.addRoom(new Room("101", RoomType.SINGLE, 100));
        svc.addRoom(new Room("102", RoomType.DOUBLE, 200));
        svc.addRoom(new Room("201", RoomType.SUITE, 500));
        svc.addGuest(new Guest("G1", "Alice", "a@x.com", "111"));
        svc.addGuest(new Guest("G2", "Bob", "b@x.com", "222"));

        LocalDate in = LocalDate.of(2024, 6, 1);
        LocalDate out = LocalDate.of(2024, 6, 5);

        System.out.println("Available DOUBLE: "
                + svc.searchAvailable(RoomType.DOUBLE, in, out).size());

        Optional<Booking> b1 = svc.book("G1", "102", in, out, new CardPayment());
        b1.ifPresent(b -> System.out.println("Booked: " + b.getId()
                + " amount=" + b.getPaidAmount() + " status=" + b.getStatus()));

        Optional<Booking> b2 = svc.book("G2", "102", in.plusDays(2), out.plusDays(2), new UpiPayment());
        System.out.println("Overlap booking succeeded? " + b2.isPresent());

        b1.ifPresent(b -> {
            b.setRefundStrategy(new PartialRefund(0.5));
            double refund = svc.cancel(b.getId(), LocalDate.of(2024, 5, 25));
            System.out.println("Cancelled. Refund: " + refund);
        });
    }
}`,l=`-- 6 tables, normalized, minimal

CREATE TABLE rooms (
  room_number    VARCHAR(10) PRIMARY KEY,
  room_type      ENUM('SINGLE','DOUBLE','SUITE') NOT NULL,
  price_per_night DECIMAL(10,2) NOT NULL,
  status         ENUM('AVAILABLE','MAINTENANCE') DEFAULT 'AVAILABLE',
  floor_number   INT
);
CREATE INDEX idx_room_type ON rooms(room_type, status);

CREATE TABLE guests (
  guest_id  VARCHAR(20) PRIMARY KEY,
  name      VARCHAR(100) NOT NULL,
  email     VARCHAR(100) UNIQUE NOT NULL,
  phone     VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_guest_email ON guests(email);

CREATE TABLE bookings (
  booking_id    VARCHAR(20) PRIMARY KEY,
  room_number   VARCHAR(10) NOT NULL,
  guest_id      VARCHAR(20) NOT NULL,
  check_in      DATE NOT NULL,
  check_out     DATE NOT NULL,
  status        ENUM('PENDING','CONFIRMED','CHECKED_IN','CHECKED_OUT','CANCELLED') DEFAULT 'PENDING',
  total_amount  DECIMAL(10,2) NOT NULL,
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  cancelled_at  TIMESTAMP NULL,
  FOREIGN KEY (room_number) REFERENCES rooms(room_number),
  FOREIGN KEY (guest_id) REFERENCES guests(guest_id),
  CHECK (check_out > check_in)
);
CREATE INDEX idx_booking_room_dates ON bookings(room_number, check_in, check_out, status);
CREATE INDEX idx_booking_guest ON bookings(guest_id, status);

CREATE TABLE payments (
  payment_id    VARCHAR(20) PRIMARY KEY,
  booking_id    VARCHAR(20) NOT NULL,
  method        ENUM('CARD','UPI','CASH') NOT NULL,
  amount        DECIMAL(10,2) NOT NULL,
  status        ENUM('PENDING','SUCCESS','FAILED','REFUNDED') DEFAULT 'PENDING',
  transaction_ref VARCHAR(100),
  paid_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (booking_id) REFERENCES bookings(booking_id)
);
CREATE INDEX idx_payment_booking ON payments(booking_id);

CREATE TABLE refunds (
  refund_id     VARCHAR(20) PRIMARY KEY,
  payment_id    VARCHAR(20) NOT NULL,
  booking_id    VARCHAR(20) NOT NULL,
  amount        DECIMAL(10,2) NOT NULL,
  reason        ENUM('FREE_CANCEL','PARTIAL','NO_REFUND') NOT NULL,
  status        ENUM('PENDING','PROCESSED','FAILED') DEFAULT 'PENDING',
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (payment_id) REFERENCES payments(payment_id),
  FOREIGN KEY (booking_id) REFERENCES bookings(booking_id)
);
CREATE INDEX idx_refund_booking ON refunds(booking_id);

CREATE TABLE availability_locks (
  lock_id       VARCHAR(20) PRIMARY KEY,
  room_number   VARCHAR(10) NOT NULL,
  check_in      DATE NOT NULL,
  check_out     DATE NOT NULL,
  booking_id    VARCHAR(20),
  expires_at    TIMESTAMP NOT NULL,
  FOREIGN KEY (room_number) REFERENCES rooms(room_number)
);
CREATE INDEX idx_lock_room_dates ON availability_locks(room_number, check_in, check_out);`,u=`----------------------------------------
  HotelBookingService  (Singleton + Facade)
  - rooms: Map<String, Room>
  - bookings: Map<String, Booking>
  - availabilityChecker: AvailabilityChecker
  + searchAvailable(type, in, out): List<Room>
  + book(guest, room, in, out): Optional<Booking>
  + cancel(bookingId): double
  + checkIn(bookingId)
  + checkOut(bookingId)
----------------------------------------
      |owns (rooms die with service)
      v
----------------------------------------
  Room                    RoomType (enum)
  - number: String        SINGLE, DOUBLE, SUITE
  - type: RoomType
  - pricePerNight
  - status: RoomStatus
----------------------------------------

Service --creates--> Booking
  - id, room, guest, checkIn, checkOut
  - state: BookingState
  - payment: Payment

Booking --has--> BookingState (interface)
  |-- PendingState    |-- ConfirmedState
  |-- CheckedInState  |-- CheckedOutState
  +-- CancelledState

Booking --uses--> PaymentStrategy (Card/UPI/Cash)
Booking --uses--> RefundStrategy (FreeCancel/Partial/NoRefund)
AvailabilityChecker --checks--> Booking overlaps`,d=n();function f({code:e,lang:t}){let n=(0,a.useRef)(null);return(0,a.useEffect)(()=>{n.current&&(n.current.removeAttribute(`data-highlighted`),i.highlightElement(n.current))},[e]),(0,d.jsxs)(`div`,{className:`ht-code`,children:[(0,d.jsxs)(`div`,{className:`ht-code-head`,children:[(0,d.jsxs)(`span`,{className:`dots`,children:[(0,d.jsx)(`i`,{}),(0,d.jsx)(`i`,{}),(0,d.jsx)(`i`,{})]}),(0,d.jsx)(`span`,{className:`pl-lang`,children:t})]}),(0,d.jsx)(`pre`,{className:`ht-pre`,children:(0,d.jsx)(`code`,{ref:n,className:`language-${t}`,children:e})})]})}var p=({id:e,children:t})=>(0,d.jsx)(`section`,{id:e,className:`ht-section`,children:t}),m=({children:e})=>(0,d.jsx)(`h2`,{className:`ht-h2`,children:e}),h=({children:e})=>(0,d.jsx)(`h3`,{className:`ht-h3`,children:e}),g=({title:e,children:t})=>(0,d.jsxs)(`div`,{className:`ht-bullet`,children:[(0,d.jsx)(`b`,{children:e}),(0,d.jsx)(`span`,{children:t})]}),_=({children:e})=>(0,d.jsx)(`div`,{className:`ht-tip`,children:e});function v(){return(0,d.jsxs)(`div`,{className:`ht-root`,children:[(0,d.jsxs)(`header`,{className:`ht-header`,children:[(0,d.jsx)(r,{to:`/maang/system-design/advanced`,className:`ht-back`,children:`← Back to Advanced System Design`}),(0,d.jsxs)(`h1`,{children:[(0,d.jsx)(`i`,{className:`fas fa-hotel`}),` Hotel Booking — LLD `,(0,d.jsxs)(`span`,{className:`ht-badge`,children:[(0,d.jsx)(`i`,{className:`fab fa-java`}),` Java + UML`]})]}),(0,d.jsxs)(`div`,{className:`ht-sub-info`,children:[(0,d.jsxs)(`span`,{children:[(0,d.jsx)(`i`,{className:`fas fa-list-check`}),` 6 Steps`]}),(0,d.jsxs)(`span`,{children:[(0,d.jsx)(`i`,{className:`fas fa-code`}),` Working Java`]}),(0,d.jsxs)(`span`,{children:[(0,d.jsx)(`i`,{className:`fas fa-database`}),` DB Schema`]}),(0,d.jsxs)(`span`,{className:`ht-badge-alt`,children:[(0,d.jsx)(`i`,{className:`fas fa-mouse-pointer`}),` Scroll down`]})]}),(0,d.jsxs)(`nav`,{className:`ht-nav`,children:[(0,d.jsx)(`a`,{href:`#req`,children:`1. Requirements`}),(0,d.jsx)(`a`,{href:`#ent`,children:`2. Entities`}),(0,d.jsx)(`a`,{href:`#uml`,children:`3. Diagram`}),(0,d.jsx)(`a`,{href:`#db`,children:`4. DB`}),(0,d.jsx)(`a`,{href:`#java`,children:`5. Java`}),(0,d.jsx)(`a`,{href:`#wrap`,children:`6. Wrap-up`})]})]}),(0,d.jsxs)(p,{id:`req`,children:[(0,d.jsxs)(m,{children:[(0,d.jsx)(`i`,{className:`fas fa-list-check`}),` Step 1 — Requirements (5 min)`]}),(0,d.jsxs)(`p`,{className:`ht-intro`,children:[(0,d.jsx)(`b`,{children:`What to do:`}),` Pick `,(0,d.jsx)(`b`,{children:`4 functional`}),` + `,(0,d.jsx)(`b`,{children:`3 non-functional`}),`. State what is OUT of scope (loyalty, dynamic pricing, housekeeping).`]}),(0,d.jsx)(h,{children:`Functional — what the system DOES`}),(0,d.jsxs)(g,{title:`1. Room inventory with types`,children:[`Room has number, type, price/night, status.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: availability search — core of booking system.`})]}),(0,d.jsxs)(g,{title:`2. Search + book for date range`,children:[`User specifies check-in/out. Books lock room for dates.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: date-range availability is #1 complexity.`})]}),(0,d.jsxs)(g,{title:`3. Booking lifecycle — reserve to check-out`,children:[`State pattern: PENDING to CONFIRMED to CHECKED_IN to CHECKED_OUT.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: State pattern is the classic signal.`})]}),(0,d.jsxs)(g,{title:`4. Payment with refund policy`,children:[`PaymentStrategy + RefundStrategy. FreeCancel, Partial, NoRefund.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: Strategy for payment + refund — shows OCP.`})]}),(0,d.jsx)(h,{children:`Non-Functional — how the system BEHAVES`}),(0,d.jsxs)(g,{title:`1. Thread-safe booking — no double-booking`,children:[`Synchronized + overlap check. Two users cannot get same room.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: concurrency is the #1 follow-up.`})]}),(0,d.jsxs)(g,{title:`2. Extensible`,children:[`New room type, payment, refund = new subclasses. No core changes.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: OCP and DIP.`})]}),(0,d.jsxs)(g,{title:`3. O(1) room lookup, O(k) availability`,children:[`Room by number O(1). Check scans only that room's bookings.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: performance signal.`})]}),(0,d.jsxs)(_,{children:[(0,d.jsx)(`b`,{children:`Interview line:`}),` Skip loyalty points, dynamic pricing, housekeeping unless asked — focus on search, book, pay, cancel flow.`]})]}),(0,d.jsxs)(p,{id:`ent`,children:[(0,d.jsxs)(m,{children:[(0,d.jsx)(`i`,{className:`fas fa-boxes-stacked`}),` Step 2 — Entities (3 min)`]}),(0,d.jsxs)(`p`,{className:`ht-intro`,children:[(0,d.jsx)(`b`,{children:`Rule:`}),` Take nouns from requirements — each becomes a class.`]}),(0,d.jsxs)(g,{title:`HotelBookingService (Singleton + Facade)`,children:[`Top-level controller. Holds rooms, bookings, payments.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why Singleton: one service per hotel.`})]}),(0,d.jsxs)(g,{title:`Room`,children:[`Number, type, price/night, status. Immutable identity.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: unit of inventory, separate from booking.`})]}),(0,d.jsxs)(g,{title:`Booking`,children:[`Has id, room, guest, dates, state, payment. The receipt.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: core entity.`})]}),(0,d.jsxs)(g,{title:`BookingState + 5 states`,children:[`Each handles confirm, checkIn, checkOut, cancel.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: State pattern — classic lifecycle.`})]}),(0,d.jsxs)(g,{title:`Guest`,children:[`Has id, name, email, phone.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: actor — owns bookings.`})]}),(0,d.jsxs)(g,{title:`PaymentStrategy + RefundStrategy`,children:[`Card/UPI/Cash. Free/Partial/NoRefund.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: Strategy — swap without touching core.`})]})]}),(0,d.jsxs)(p,{id:`uml`,children:[(0,d.jsxs)(m,{children:[(0,d.jsx)(`i`,{className:`fas fa-project-diagram`}),` Step 3 — Class Diagram (10 min)`]}),(0,d.jsx)(`p`,{className:`ht-intro`,children:`Draw this on the whiteboard. Relationships are the key signal:`}),(0,d.jsx)(f,{code:u,lang:`text`}),(0,d.jsxs)(_,{children:[(0,d.jsx)(`b`,{children:`Key relationship:`}),` Service to Room/Booking is Composition. Booking to State is Composition. Booking to Strategies is Dependency (DIP).`]})]}),(0,d.jsxs)(p,{id:`db`,children:[(0,d.jsxs)(m,{children:[(0,d.jsx)(`i`,{className:`fas fa-database`}),` Step 4 — DB Design (5 min)`]}),(0,d.jsx)(`p`,{className:`ht-intro`,children:`Even for in-memory LLD, show you can persist it. 6 normalized tables:`}),(0,d.jsx)(f,{code:l,lang:`sql`}),(0,d.jsxs)(g,{title:`idx_booking_room_dates`,children:[`Overlap check O(log n).`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: no full scan for availability.`})]}),(0,d.jsxs)(g,{title:`CHECK (check_out > check_in)`,children:[`DB guard against invalid date ranges.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: prevents bad data even if app fails.`})]}),(0,d.jsxs)(g,{title:`availability_locks`,children:[`Temp locks during payment. Prevents double-booking.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: expires automatically.`})]})]}),(0,d.jsxs)(p,{id:`java`,children:[(0,d.jsxs)(m,{children:[(0,d.jsx)(`i`,{className:`fab fa-java`}),` Step 5 — Java Code (20-25 min)`]}),(0,d.jsx)(`p`,{className:`ht-intro`,children:`Minimal working Java. Skip boilerplate getters unless asked:`}),(0,d.jsx)(h,{children:`Block A — Enums + Room + Guest`}),(0,d.jsx)(f,{code:o,lang:`java`}),(0,d.jsx)(h,{children:`Block B — BookingState + Payment + Refund`}),(0,d.jsx)(f,{code:s,lang:`java`}),(0,d.jsx)(h,{children:`Block C — Booking + Service + Main`}),(0,d.jsx)(f,{code:c,lang:`java`})]}),(0,d.jsxs)(p,{id:`wrap`,children:[(0,d.jsxs)(m,{children:[(0,d.jsx)(`i`,{className:`fas fa-flag-checkered`}),` Step 6 — Wrap-up (3 min)`]}),(0,d.jsx)(`p`,{className:`ht-intro`,children:`Be ready to answer these without thinking:`}),(0,d.jsxs)(g,{title:`Concurrency — double-booking?`,children:[`book() synchronized + overlap check. For scale, DB pessimistic lock.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: find + lock must be atomic.`})]}),(0,d.jsxs)(g,{title:`How does date overlap work?`,children:[`Half-open intervals [a1,a2) and [b1,b2): a1 is before b2 AND b1 is before a2.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: avoids checkout=checkin false positive.`})]}),(0,d.jsxs)(g,{title:`How to add dynamic pricing?`,children:[`PricingStrategy interface. StandardPricing default; Seasonal/Weekend. DIP.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: the expansion answer they want.`})]}),(0,d.jsxs)(g,{title:`Patterns used + SOLID`,children:[`Singleton, State, Strategy, Composition.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: naming patterns shows vocabulary.`})]}),(0,d.jsxs)(_,{children:[(0,d.jsx)(`b`,{children:`Scorecard:`}),` Requirements (5) + Entities (3) + Diagram (10) + DB (5) + Code (20) + Wrap-up (3) = 46 min.`]})]}),(0,d.jsx)(`footer`,{className:`ht-footer`,children:(0,d.jsx)(r,{to:`/maang/system-design/advanced`,children:`Back to Advanced System Design`})})]})}export{v as default};