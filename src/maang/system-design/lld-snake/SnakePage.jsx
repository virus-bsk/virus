import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import hljs from "../../../utils/hljs";
import "highlight.js/styles/atom-one-dark.css";
import "./SnakeLot.css";
import { JAVA_A } from "./sn1";
import { JAVA_B } from "./sn2";
import { JAVA_C } from "./sn3";
import { SQL, UML } from "./snakeTexts";

function CodeBlock({ code, lang }) {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current) { ref.current.removeAttribute("data-highlighted"); hljs.highlightElement(ref.current); }
  }, [code]);
  return (
    <div className="sn-code">
      <div className="sn-code-head"><span className="dots"><i/><i/><i/></span><span className="pl-lang">{lang}</span></div>
      <pre className="sn-pre"><code ref={ref} className={`language-${lang}`}>{code}</code></pre>
    </div>
  );
}
const Section = ({ id, children }) => <section id={id} className="sn-section">{children}</section>;
const H2 = ({ children }) => <h2 className="sn-h2">{children}</h2>;
const H3 = ({ children }) => <h3 className="sn-h3">{children}</h3>;
const Bullet = ({ title, children }) => (<div className="sn-bullet"><b>{title}</b><span>{children}</span></div>);
const Tip = ({ children }) => <div className="sn-tip">{children}</div>;

export default function SnakePage() {
  return (
    <div className="sn-root">
      <header className="sn-header">
        <Link to="/maang/system-design/advanced" className="sn-back">← Back to Advanced System Design</Link>
        <h1><i className="fas fa-worm" /> Snake and Ladder — LLD <span className="sn-badge"><i className="fab fa-java" /> Java + UML</span></h1>
        <div className="sn-sub-info">
          <span><i className="fas fa-list-check" /> 6 Steps</span>
          <span><i className="fas fa-code" /> Working Java</span>
          <span><i className="fas fa-database" /> DB Schema</span>
          <span className="sn-badge-alt"><i className="fas fa-mouse-pointer" /> Scroll down</span>
        </div>
        <nav className="sn-nav">
          <a href="#req">1. Requirements</a><a href="#ent">2. Entities</a><a href="#uml">3. Diagram</a><a href="#db">4. DB</a><a href="#java">5. Java</a><a href="#wrap">6. Wrap-up</a>
        </nav>
      </header>

      <Section id="req">
        <H2><i className="fas fa-list-check" /> Step 1 — Requirements (5 min)</H2>
        <p className="sn-intro"><b>What to do:</b> Pick <b>4 functional</b> + <b>3 non-functional</b>. State what is OUT of scope (online multiplayer, tournament mode, custom board editor).</p>
        <H3>Functional — what the system DOES</H3>
        <Bullet title="1. Board with 100 cells + snakes/ladders">10x10 = 100 cells. Snakes move down, ladders move up. Configurable map.<br /><i>Why: drives the jump logic — core of the game.</i></Bullet>
        <Bullet title="2. 2-4 players alternate turns">Each starts at 0. Roll dice, move, check snake/ladder, check win.<br /><i>Why: links Board + Player + Dice — core loop.</i></Bullet>
        <Bullet title="3. Dice roll (1-6) + exact win">Dice gives 1-6. Must land exactly on 100. Overshoot stays.<br /><i>Why: classic rule — shows you know the game.</i></Bullet>
        <Bullet title="4. Win detection">First player to reach 100 wins. Game ends immediately.<br /><i>Why: closes the loop — every game terminates.</i></Bullet>
        <H3>Non-Functional — how the system BEHAVES</H3>
        <Bullet title="1. Immutable move history">Every turn recorded. Enables replay and audit.<br /><i>Why: immutability + audit trail.</i></Bullet>
        <Bullet title="2. Extensible">New dice = new DiceStrategy. New board = new setup strategy.<br /><i>Why: shows OCP and DIP.</i></Bullet>
        <Bullet title="3. Low latency — O(1) lookup">Board jumps via HashMap — O(1) snake/ladder lookup.<br /><i>Why: performance, not just correctness.</i></Bullet>
        <Tip><b>Interview line:</b> Skip online multiplayer, tournament mode, custom editor unless asked — focus on roll, move, jump, win flow.</Tip>
      </Section>

      <Section id="ent">
        <H2><i className="fas fa-boxes-stacked" /> Step 2 — Entities (3 min)</H2>
        <p className="sn-intro"><b>Rule:</b> Take nouns from requirements — each becomes a class.</p>
        <Bullet title="SnakeLadderGame (Singleton + Facade)">Top-level controller. Holds board, players, dice, turn.<br /><i>Why Singleton: one game per session.</i></Bullet>
        <Bullet title="Board">Holds size + snakes/ladders map. Has getNextPosition.<br /><i>Why: separates config from game logic.</i></Bullet>
        <Bullet title="Player">Has name, id, current position. Mutable state.<br /><i>Why: player is the actor — owns position.</i></Bullet>
        <Bullet title="Move">Has player, dice, fromPos, toPos, jumped. Immutable.<br /><i>Why: the receipt — enables replay.</i></Bullet>
        <Bullet title="Dice + Standard/Loaded/Multi">roll() returns int. Strategy pattern.<br /><i>Why: swap dice behavior for variants.</i></Bullet>
        <Bullet title="GameState (enum)">IN_PROGRESS, FINISHED.<br /><i>Why: type-safe status.</i></Bullet>
      </Section>

      <Section id="uml">
        <H2><i className="fas fa-project-diagram" /> Step 3 — Class Diagram (10 min)</H2>
        <p className="sn-intro">Draw this on the whiteboard. Relationships are the key signal:</p>
        <CodeBlock code={UML} lang="text" />
        <Tip><b>Key relationship:</b> Game to Board is Composition. Game to Dice is Dependency (DIP). Dice subclasses are Inheritance.</Tip>
      </Section>

      <Section id="db">
        <H2><i className="fas fa-database" /> Step 4 — DB Design (5 min)</H2>
        <p className="sn-intro">Even for in-memory LLD, show you can persist it. 5 normalized tables:</p>
        <CodeBlock code={SQL} lang="sql" />
        <Bullet title="idx_move_game">Makes move-history replay O(log n).<br /><i>Why: replay without full scan.</i></Bullet>
        <Bullet title="board_config separate table">Snakes and ladders are per-game config. Normalized.<br /><i>Why: enables custom boards.</i></Bullet>
        <Bullet title="turn_order in players">Fixes turn sequence. No insertion-order reliance.<br /><i>Why: deterministic ordering.</i></Bullet>
      </Section>

      <Section id="java">
        <H2><i className="fab fa-java" /> Step 5 — Java Code (20-25 min)</H2>
        <p className="sn-intro">Minimal working Java. Skip boilerplate getters unless asked:</p>
        <H3>Block A — Enums + Player + Board</H3>
        <CodeBlock code={JAVA_A} lang="java" />
        <H3>Block B — Dice + Move</H3>
        <CodeBlock code={JAVA_B} lang="java" />
        <H3>Block C — SnakeLadderGame + Main</H3>
        <CodeBlock code={JAVA_C} lang="java" />
      </Section>

      <Section id="wrap">
        <H2><i className="fas fa-flag-checkered" /> Step 6 — Wrap-up (3 min)</H2>
        <p className="sn-intro">Be ready to answer these without thinking:</p>
        <Bullet title="Concurrency — two rolls at once?">playTurn is synchronized. Sequential turns — no parallel rolls.<br /><i>Why: turn order is strict.</i></Bullet>
        <Bullet title="How does snake/ladder jump work?">getNextPosition checks snakes then ladders. O(1) HashMap.<br /><i>Why: the core rule.</i></Bullet>
        <Bullet title="What if roll overshoots 100?">Player stays. Exact landing required.<br /><i>Why: classic rule — prevents trivial wins.</i></Bullet>
        <Bullet title="Patterns used + SOLID">Singleton, Strategy, Composition, Encapsulation.<br /><i>Why: naming patterns shows vocabulary.</i></Bullet>
        <Tip><b>Scorecard:</b> Requirements (5) + Entities (3) + Diagram (10) + DB (5) + Code (20) + Wrap-up (3) = 46 min.</Tip>
      </Section>

      <footer className="sn-footer">
        <Link to="/maang/system-design/advanced">Back to Advanced System Design</Link>
      </footer>
    </div>
  );
}