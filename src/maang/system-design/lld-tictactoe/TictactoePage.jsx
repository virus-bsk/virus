import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import hljs from "../../../utils/hljs";
import "highlight.js/styles/atom-one-dark.css";
import "./TictactoeLot.css";
import { JAVA_A } from "./t1";
import { JAVA_B } from "./t2";
import { JAVA_C } from "./t3";
import { SQL, UML } from "./tttTexts";

function CodeBlock({ code, lang }) {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current) { ref.current.removeAttribute("data-highlighted"); hljs.highlightElement(ref.current); }
  }, [code]);
  return (
    <div className="tt-code">
      <div className="tt-code-head"><span className="dots"><i/><i/><i/></span><span className="pl-lang">{lang}</span></div>
      <pre className="tt-pre"><code ref={ref} className={`language-${lang}`}>{code}</code></pre>
    </div>
  );
}
const Section = ({ id, children }) => <section id={id} className="tt-section">{children}</section>;
const H2 = ({ children }) => <h2 className="tt-h2">{children}</h2>;
const H3 = ({ children }) => <h3 className="tt-h3">{children}</h3>;
const Bullet = ({ title, children }) => (<div className="tt-bullet"><b>{title}</b><span>{children}</span></div>);
const Tip = ({ children }) => <div className="tt-tip">{children}</div>;

export default function TictactoePage() {
  return (
    <div className="tt-root">
      <header className="tt-header">
        <Link to="/maang/system-design/advanced" className="tt-back">← Back to Advanced System Design</Link>
        <h1><i className="fas fa-hashtag" /> Tic-Tac-Toe — LLD <span className="tt-badge"><i className="fab fa-java" /> Java + UML</span></h1>
        <div className="tt-sub-info">
          <span><i className="fas fa-list-check" /> 6 Steps</span>
          <span><i className="fas fa-code" /> Working Java</span>
          <span><i className="fas fa-database" /> DB Schema</span>
          <span className="tt-badge-alt"><i className="fas fa-mouse-pointer" /> Scroll down</span>
        </div>
        <nav className="tt-nav">
          <a href="#req">1. Requirements</a><a href="#ent">2. Entities</a><a href="#uml">3. Diagram</a><a href="#db">4. DB</a><a href="#java">5. Java</a><a href="#wrap">6. Wrap-up</a>
        </nav>
      </header>

      <Section id="req">
        <H2><i className="fas fa-list-check" /> Step 1 — Requirements (5 min)</H2>
        <p className="tt-intro"><b>What to do:</b> Pick <b>4 functional</b> + <b>3 non-functional</b>. State what is OUT of scope (online multiplayer, AI opponent, tournament mode).</p>
        <H3>Functional — what the system DOES</H3>
        <Bullet title="1. NxN board (default 3x3)">Board holds cells. Each cell is EMPTY, X, or O. Configurable size.<br /><i>Why: drives win-check logic — N-in-a-row.</i></Bullet>
        <Bullet title="2. Two players alternate turns">Player X moves first, then O. Turn flips only on valid move.<br /><i>Why: links Board + Player — core game loop.</i></Bullet>
        <Bullet title="3. Win detection — row, column, diagonal">After every move, check N-in-a-row. If yes, winner declared.<br /><i>Why: core rule — must be O(N) not O(N2).</i></Bullet>
        <Bullet title="4. Draw detection">If board is full and no winner, draw. Game ends.<br /><i>Why: closes the loop — every game terminates.</i></Bullet>
        <H3>Non-Functional — how the system BEHAVES</H3>
        <Bullet title="1. Immutable move history">Every move recorded. Enables undo and replay.<br /><i>Why: immutability + audit trail.</i></Bullet>
        <Bullet title="2. Extensible">New size = param. New win rule = new WinStrategy. New player = subclass.<br /><i>Why: shows OCP and DIP.</i></Bullet>
        <Bullet title="3. Low latency — O(1) access, O(N) win check">Board access O(1). Win check scans only affected lines.<br /><i>Why: performance, not just correctness.</i></Bullet>
        <Tip><b>Interview line:</b> Skip online multiplayer, AI opponent, tournament mode unless asked — focus on move, validate, check-win flow.</Tip>
      </Section>

      <Section id="ent">
        <H2><i className="fas fa-boxes-stacked" /> Step 2 — Entities (3 min)</H2>
        <p className="tt-intro"><b>Rule:</b> Take nouns from requirements — each becomes a class.</p>
        <Bullet title="TicTacToeGame (Singleton + Facade)">Top-level controller. Holds board, players, turn, history, state.<br /><i>Why Singleton: one game per session.</i></Bullet>
        <Bullet title="Board">NxN grid of Symbol. Has place, isFull, getCell, reset.<br /><i>Why: separates state from game logic.</i></Bullet>
        <Bullet title="Player (abstract) + Human/AI">Has name, symbol. getMove is abstract.<br /><i>Why: player is the actor — Template Method.</i></Bullet>
        <Bullet title="Move">Has row, col, symbol, timestamp. Immutable.<br /><i>Why: the receipt — enables undo and replay.</i></Bullet>
        <Bullet title="GameState (enum)">IN_PROGRESS, X_WINS, O_WINS, DRAW.<br /><i>Why: type-safe status.</i></Bullet>
        <Bullet title="WinStrategy + StandardWinStrategy">checkWinner scans row, col, diagonals. O(N).<br /><i>Why: Strategy — swap win rules for variants.</i></Bullet>
      </Section>

      <Section id="uml">
        <H2><i className="fas fa-project-diagram" /> Step 3 — Class Diagram (10 min)</H2>
        <p className="tt-intro">Draw this on the whiteboard. Relationships are the key signal:</p>
        <CodeBlock code={UML} lang="text" />
        <Tip><b>Key relationship:</b> Game to Board is Composition. Game to Player is Association. Strategy is Dependency (DIP).</Tip>
      </Section>

      <Section id="db">
        <H2><i className="fas fa-database" /> Step 4 — DB Design (5 min)</H2>
        <p className="tt-intro">Even for in-memory LLD, show you can persist it. 4 normalized tables:</p>
        <CodeBlock code={SQL} lang="sql" />
        <Bullet title="idx_move_game">Makes move-history replay O(log n).<br /><i>Why: replay without full scan.</i></Bullet>
        <Bullet title="game_snapshots with board_state">Enables undo by restoring state. Compact string.<br /><i>Why: portable snapshots.</i></Bullet>
        <Bullet title="board_size in games">Denormalized for quick queries.<br /><i>Why: read optimization.</i></Bullet>
      </Section>

      <Section id="java">
        <H2><i className="fab fa-java" /> Step 5 — Java Code (20-25 min)</H2>
        <p className="tt-intro">Minimal working Java. Skip boilerplate getters unless asked:</p>
        <H3>Block A — Enums + Board + Player</H3>
        <CodeBlock code={JAVA_A} lang="java" />
        <H3>Block B — Move + WinStrategy</H3>
        <CodeBlock code={JAVA_B} lang="java" />
        <H3>Block C — TicTacToeGame + Main</H3>
        <CodeBlock code={JAVA_C} lang="java" />
      </Section>

      <Section id="wrap">
        <H2><i className="fas fa-flag-checkered" /> Step 6 — Wrap-up (3 min)</H2>
        <p className="tt-intro">Be ready to answer these without thinking:</p>
        <Bullet title="Concurrency — two moves at once?">makeMove is synchronized. Per-game lock for online.<br /><i>Why: validation + execution atomic.</i></Bullet>
        <Bullet title="How does win detection work?">Check only affected row, col, diagonals. O(N).<br /><i>Why: swap strategy for 4-in-a-row variants.</i></Bullet>
        <Bullet title="How would you add an AI player?">AIPlayer extends Player, override getMove with minimax.<br /><i>Why: OCP in action.</i></Bullet>
        <Bullet title="Patterns used + SOLID">Singleton, Strategy, Composition, Template Method.<br /><i>Why: naming patterns shows vocabulary.</i></Bullet>
        <Tip><b>Scorecard:</b> Requirements (5) + Entities (3) + Diagram (10) + DB (5) + Code (20) + Wrap-up (3) = 46 min.</Tip>
      </Section>

      <footer className="tt-footer">
        <Link to="/maang/system-design/advanced">Back to Advanced System Design</Link>
      </footer>
    </div>
  );
}