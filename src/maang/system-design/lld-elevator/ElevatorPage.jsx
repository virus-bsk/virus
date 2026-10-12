import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import hljs from "../../../utils/hljs";
import "highlight.js/styles/atom-one-dark.css";
import "./ElevatorLot.css";
import { JAVA1 } from "./e1";
import { JAVA2 } from "./e2";
import { JAVA3 } from "./e3";
import { SQL, UML } from "./elevatorTexts";

function CodeBlock({ code, lang }) {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current) { ref.current.removeAttribute("data-highlighted"); hljs.highlightElement(ref.current); }
  }, [code]);
  return (
    <div className="el-code">
      <div className="el-code-head"><span className="dots"><i/><i/><i/></span><span className="pl-lang">{lang}</span></div>
      <pre className="el-pre"><code ref={ref} className={`language-${lang}`}>{code}</code></pre>
    </div>
  );
}
const Section = ({ id, children }) => <section id={id} className="el-section">{children}</section>;
const H2 = ({ children }) => <h2 className="el-h2">{children}</h2>;
const H3 = ({ children }) => <h3 className="el-h3">{children}</h3>;
const Bullet = ({ title, children }) => (<div className="el-bullet"><b>{title}</b><span>{children}</span></div>);
const Tip = ({ children }) => <div className="el-tip">{children}</div>;

export default function ElevatorPage() {
  return (
    <div className="el-root">
      <header className="el-header">
        <Link to="/maang/system-design/advanced" className="el-back">← Back to Advanced System Design</Link>
        <h1><i className="fas fa-elevator" /> Elevator System — LLD <span className="el-badge"><i className="fab fa-java" /> Java + UML</span></h1>
        <div className="el-sub-info">
          <span><i className="fas fa-list-check" /> 6 Steps</span>
          <span><i className="fas fa-code" /> Working Java</span>
          <span><i className="fas fa-database" /> DB Schema</span>
          <span className="el-badge-alt"><i className="fas fa-mouse-pointer" /> Scroll down</span>
        </div>
        <nav className="el-nav">
          <a href="#req">1. Requirements</a><a href="#ent">2. Entities</a><a href="#uml">3. Diagram</a><a href="#db">4. DB</a><a href="#java">5. Java</a><a href="#wrap">6. Wrap-up</a>
        </nav>
      </header>

      <Section id="req">
        <H2><i className="fas fa-list-check" /> Step 1 — Requirements (5 min)</H2>
        <p className="el-intro"><b>What to do:</b> Pick <b>4 functional</b> + <b>3 non-functional</b>. State what is OUT of scope.</p>
        <H3>Functional — what the system DOES</H3>
        <Bullet title="1. Multi-elevator building, N floors">Building has multiple elevators (1 to M) and floors (1 to N). Each elevator moves between floors, picks up and drops passengers.<br /><i>Why: drives the scheduling algorithm.</i></Bullet>
        <Bullet title="2. External buttons — Up/Down on each floor">Every floor has UP and DOWN buttons. Pressing one calls an elevator. System assigns nearest available.<br /><i>Why: main input — triggers scheduling strategy.</i></Bullet>
        <Bullet title="3. Internal buttons — floor numbers + open/close">Inside each elevator: buttons for every floor, plus DOOR OPEN and DOOR CLOSE.<br /><i>Why: internal requests queued per elevator, processed in order.</i></Bullet>
        <Bullet title="4. Display current floor + direction per elevator">Each elevator shows current floor and direction (UP/DOWN/IDLE) on display panel.<br /><i>Why: feedback loop — users need to know where elevators are.</i></Bullet>
        <H3>Non-Functional — how the system BEHAVES</H3>
        <Bullet title="1. Thread-safe request handling">Multiple people pressing buttons simultaneously. Use synchronized or concurrent collections.<br /><i>Why: concurrency is the #1 follow-up question.</i></Bullet>
        <Bullet title="2. Extensible scheduling">New algorithms (SCAN, LOOK) can be added without modifying ElevatorController — Strategy Pattern.<br /><i>Why: demonstrates OCP and DIP.</i></Bullet>
        <Bullet title="3. Low latency — minimize wait time">Elevator should reach requesting floor fast. Nearest-elevator reduces average wait time.<br /><i>Why: real-world performance metric.</i></Bullet>
        <Tip><b>Out of scope:</b> VIP priority, fire mode, voice control, weight sensor, emergency stop. Mention these to show you can scope.</Tip>
      </Section>

      <Section id="ent">
        <H2><i className="fas fa-cubes" /> Step 2 — Entities (3 min)</H2>
        <p className="el-intro">Nouns from requirements become classes:</p>
        <Bullet title="Building">Top-level container. Holds elevators + floors. Entry point for all button presses.<br /><i>Why: facade — external world talks to Building.</i></Bullet>
        <Bullet title="Elevator">The moving box. Has currentFloor, direction, door state, target floors.<br /><i>Why: core entity — all logic revolves around elevator.</i></Bullet>
        <Bullet title="ElevatorController">Brain of the system. Assigns requests using SchedulingStrategy.<br /><i>Why: separates scheduling from mechanics (SRP).</i></Bullet>
        <Bullet title="SchedulingStrategy (interface)">Defines how to pick an elevator. Implementations: NearestElevator, SCAN, LOOK.<br /><i>Why: Strategy Pattern — swap algorithm without changing core.</i></Bullet>
        <Bullet title="Request">Represents a button press. Has floor, direction, timestamp, internal/external flag.<br /><i>Why: encapsulates input.</i></Bullet>
        <Bullet title="Floor">Has external buttons (UP/DOWN). In simple LLD, can be just an integer.<br /><i>Why: keeps design minimal — do not over-engineer.</i></Bullet>
        <Bullet title="Direction (enum)">UP, DOWN, IDLE.<br /><i>Why: state machine — direction determines next action.</i></Bullet>
        <Bullet title="ElevatorState / DoorState (enums)">MOVING, STOPPED, DOOR_OPEN, DOOR_CLOSED.<br /><i>Why: State Pattern candidate.</i></Bullet>
      </Section>

      <Section id="uml">
        <H2><i className="fas fa-project-diagram" /> Step 3 — Class Diagram (10 min)</H2>
        <p className="el-intro">Draw this on whiteboard. Relationships are the key signal:</p>
        <CodeBlock code={UML} lang="text" />
        <Tip><b>Key relationship:</b> ElevatorController depends on SchedulingStrategy interface (DIP), not on concrete class.</Tip>
      </Section>

      <Section id="db">
        <H2><i className="fas fa-database" /> Step 4 — DB Design (5 min)</H2>
        <p className="el-intro">Even for in-memory LLD, show you can persist it. 4 normalized tables:</p>
        <CodeBlock code={SQL} lang="sql" />
        <Bullet title="Why denormalize current_floor?">Elevator position changes every second — no need to join with log table.<br /><i>Why: read-heavy query — current floor queried constantly.</i></Bullet>
        <Bullet title="Why partial index on status?">Most queries are "find all PENDING requests" — partial index is smaller and faster.<br /><i>Why: completed requests are historical, not queried often.</i></Bullet>
        <Bullet title="Why elevator_log table?">Audit trail — every move recorded. Useful for debugging and analytics.<br /><i>Why: separates current state (fast) from history (append-only).</i></Bullet>
      </Section>

      <Section id="java">
        <H2><i className="fab fa-java" /> Step 5 — Java Code (20–25 min)</H2>
        <p className="el-intro">Write minimal, working Java. Skip getters/setters unless asked.</p>
        <H3>Part 1: Enums + Request + Elevator</H3>
        <CodeBlock code={JAVA1} lang="java" />
        <H3>Part 2: SchedulingStrategy + ElevatorController</H3>
        <CodeBlock code={JAVA2} lang="java" />
        <H3>Part 3: Building + Demo</H3>
        <CodeBlock code={JAVA3} lang="java" />
      </Section>

      <Section id="wrap">
        <H2><i className="fas fa-flag-checkered" /> Step 6 — Wrap-up (3 min)</H2>
        <p className="el-intro">Be ready to answer these — they separate good from great:</p>
        <Bullet title="1. Concurrency">Use synchronized on requestElevator() and requestFloor(). For scale, use ConcurrentLinkedQueue.<br /><i>Why: interviewers ask "what if 100 people press buttons at once?"</i></Bullet>
        <Bullet title="2. Starvation">Nearest-elevator can starve far floors. Fix: add aging or use SCAN.<br /><i>Why: shows you think about fairness.</i></Bullet>
        <Bullet title="3. Extension">Create ScanSchedulingStrategy implements SchedulingStrategy. One line change. OCP.<br /><i>Why: Strategy Pattern in action.</i></Bullet>
        <Bullet title="4. Patterns used">Strategy, State, Facade, Observer (display).<br /><i>Why: naming patterns shows design vocabulary.</i></Bullet>
        <Bullet title="5. SOLID check">SRP (Controller assigns, Elevator moves), OCP (new strategy = new class), DIP.<br /><i>Why: interviewers love when you self-grade.</i></Bullet>
        <Tip><b>Scorecard:</b> 5 + 3 + 10 + 5 + 20 + 3 = 46 min total. Practice until 45 min.</Tip>
      </Section>

      <footer className="el-footer">
        <Link to="/maang/system-design/advanced">← Back to Advanced System Design</Link>
      </footer>
    </div>
  );
}