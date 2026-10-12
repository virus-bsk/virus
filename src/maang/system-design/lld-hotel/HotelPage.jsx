import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import hljs from "../../../utils/hljs";
import "highlight.js/styles/atom-one-dark.css";
import "./HotelLot.css";
import { JAVA_A } from "./ht1";
import { JAVA_B } from "./ht2";
import { JAVA_C } from "./ht3";
import { SQL, UML } from "./hotelTexts";

function CodeBlock({ code, lang }) {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current) { ref.current.removeAttribute("data-highlighted"); hljs.highlightElement(ref.current); }
  }, [code]);
  return (
    <div className="ht-code">
      <div className="ht-code-head"><span className="dots"><i/><i/><i/></span><span className="pl-lang">{lang}</span></div>
      <pre className="ht-pre"><code ref={ref} className={`language-${lang}`}>{code}</code></pre>
    </div>
  );
}
const Section = ({ id, children }) => <section id={id} className="ht-section">{children}</section>;
const H2 = ({ children }) => <h2 className="ht-h2">{children}</h2>;
const H3 = ({ children }) => <h3 className="ht-h3">{children}</h3>;
const Bullet = ({ title, children }) => (<div className="ht-bullet"><b>{title}</b><span>{children}</span></div>);
const Tip = ({ children }) => <div className="ht-tip">{children}</div>;

export default function HotelPage() {
  return (
    <div className="ht-root">
      <header className="ht-header">
        <Link to="/maang/system-design/advanced" className="ht-back">← Back to Advanced System Design</Link>
        <h1><i className="fas fa-hotel" /> Hotel Booking — LLD <span className="ht-badge"><i className="fab fa-java" /> Java + UML</span></h1>
        <div className="ht-sub-info">
          <span><i className="fas fa-list-check" /> 6 Steps</span>
          <span><i className="fas fa-code" /> Working Java</span>
          <span><i className="fas fa-database" /> DB Schema</span>
          <span className="ht-badge-alt"><i className="fas fa-mouse-pointer" /> Scroll down</span>
        </div>
        <nav className="ht-nav">
          <a href="#req">1. Requirements</a><a href="#ent">2. Entities</a><a href="#uml">3. Diagram</a><a href="#db">4. DB</a><a href="#java">5. Java</a><a href="#wrap">6. Wrap-up</a>
        </nav>
      </header>

      <Section id="req">
        <H2><i className="fas fa-list-check" /> Step 1 — Requirements (5 min)</H2>
        <p className="ht-intro"><b>What to do:</b> Pick <b>4 functional</b> + <b>3 non-functional</b>. State what is OUT of scope (loyalty, dynamic pricing, housekeeping).</p>
        <H3>Functional — what the system DOES</H3>
        <Bullet title="1. Room inventory with types">Room has number, type, price/night, status.<br /><i>Why: availability search — core of booking system.</i></Bullet>
        <Bullet title="2. Search + book for date range">User specifies check-in/out. Books lock room for dates.<br /><i>Why: date-range availability is #1 complexity.</i></Bullet>
        <Bullet title="3. Booking lifecycle — reserve to check-out">State pattern: PENDING to CONFIRMED to CHECKED_IN to CHECKED_OUT.<br /><i>Why: State pattern is the classic signal.</i></Bullet>
        <Bullet title="4. Payment with refund policy">PaymentStrategy + RefundStrategy. FreeCancel, Partial, NoRefund.<br /><i>Why: Strategy for payment + refund — shows OCP.</i></Bullet>
        <H3>Non-Functional — how the system BEHAVES</H3>
        <Bullet title="1. Thread-safe booking — no double-booking">Synchronized + overlap check. Two users cannot get same room.<br /><i>Why: concurrency is the #1 follow-up.</i></Bullet>
        <Bullet title="2. Extensible">New room type, payment, refund = new subclasses. No core changes.<br /><i>Why: OCP and DIP.</i></Bullet>
        <Bullet title="3. O(1) room lookup, O(k) availability">Room by number O(1). Check scans only that room's bookings.<br /><i>Why: performance signal.</i></Bullet>
        <Tip><b>Interview line:</b> Skip loyalty points, dynamic pricing, housekeeping unless asked — focus on search, book, pay, cancel flow.</Tip>
      </Section>

      <Section id="ent">
        <H2><i className="fas fa-boxes-stacked" /> Step 2 — Entities (3 min)</H2>
        <p className="ht-intro"><b>Rule:</b> Take nouns from requirements — each becomes a class.</p>
        <Bullet title="HotelBookingService (Singleton + Facade)">Top-level controller. Holds rooms, bookings, payments.<br /><i>Why Singleton: one service per hotel.</i></Bullet>
        <Bullet title="Room">Number, type, price/night, status. Immutable identity.<br /><i>Why: unit of inventory, separate from booking.</i></Bullet>
        <Bullet title="Booking">Has id, room, guest, dates, state, payment. The receipt.<br /><i>Why: core entity.</i></Bullet>
        <Bullet title="BookingState + 5 states">Each handles confirm, checkIn, checkOut, cancel.<br /><i>Why: State pattern — classic lifecycle.</i></Bullet>
        <Bullet title="Guest">Has id, name, email, phone.<br /><i>Why: actor — owns bookings.</i></Bullet>
        <Bullet title="PaymentStrategy + RefundStrategy">Card/UPI/Cash. Free/Partial/NoRefund.<br /><i>Why: Strategy — swap without touching core.</i></Bullet>
      </Section>

      <Section id="uml">
        <H2><i className="fas fa-project-diagram" /> Step 3 — Class Diagram (10 min)</H2>
        <p className="ht-intro">Draw this on the whiteboard. Relationships are the key signal:</p>
        <CodeBlock code={UML} lang="text" />
        <Tip><b>Key relationship:</b> Service to Room/Booking is Composition. Booking to State is Composition. Booking to Strategies is Dependency (DIP).</Tip>
      </Section>

      <Section id="db">
        <H2><i className="fas fa-database" /> Step 4 — DB Design (5 min)</H2>
        <p className="ht-intro">Even for in-memory LLD, show you can persist it. 6 normalized tables:</p>
        <CodeBlock code={SQL} lang="sql" />
        <Bullet title="idx_booking_room_dates">Overlap check O(log n).<br /><i>Why: no full scan for availability.</i></Bullet>
        <Bullet title="CHECK (check_out > check_in)">DB guard against invalid date ranges.<br /><i>Why: prevents bad data even if app fails.</i></Bullet>
        <Bullet title="availability_locks">Temp locks during payment. Prevents double-booking.<br /><i>Why: expires automatically.</i></Bullet>
      </Section>

      <Section id="java">
        <H2><i className="fab fa-java" /> Step 5 — Java Code (20-25 min)</H2>
        <p className="ht-intro">Minimal working Java. Skip boilerplate getters unless asked:</p>
        <H3>Block A — Enums + Room + Guest</H3>
        <CodeBlock code={JAVA_A} lang="java" />
        <H3>Block B — BookingState + Payment + Refund</H3>
        <CodeBlock code={JAVA_B} lang="java" />
        <H3>Block C — Booking + Service + Main</H3>
        <CodeBlock code={JAVA_C} lang="java" />
      </Section>

      <Section id="wrap">
        <H2><i className="fas fa-flag-checkered" /> Step 6 — Wrap-up (3 min)</H2>
        <p className="ht-intro">Be ready to answer these without thinking:</p>
        <Bullet title="Concurrency — double-booking?">book() synchronized + overlap check. For scale, DB pessimistic lock.<br /><i>Why: find + lock must be atomic.</i></Bullet>
        <Bullet title="How does date overlap work?">Half-open intervals [a1,a2) and [b1,b2): a1 is before b2 AND b1 is before a2.<br /><i>Why: avoids checkout=checkin false positive.</i></Bullet>
        <Bullet title="How to add dynamic pricing?">PricingStrategy interface. StandardPricing default; Seasonal/Weekend. DIP.<br /><i>Why: the expansion answer they want.</i></Bullet>
        <Bullet title="Patterns used + SOLID">Singleton, State, Strategy, Composition.<br /><i>Why: naming patterns shows vocabulary.</i></Bullet>
        <Tip><b>Scorecard:</b> Requirements (5) + Entities (3) + Diagram (10) + DB (5) + Code (20) + Wrap-up (3) = 46 min.</Tip>
      </Section>

      <footer className="ht-footer">
        <Link to="/maang/system-design/advanced">Back to Advanced System Design</Link>
      </footer>
    </div>
  );
}