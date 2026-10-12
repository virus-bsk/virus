import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import hljs from "../../../utils/hljs";
import "highlight.js/styles/atom-one-dark.css";
import "./ChessLot.css";
import { JAVA_A } from "./c1";
import { JAVA_B } from "./c2";
import { JAVA_C } from "./c3";
import { SQL, UML } from "./chessTexts";

function CodeBlock({ code, lang }) {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current) { ref.current.removeAttribute("data-highlighted"); hljs.highlightElement(ref.current); }
  }, [code]);
  return (
    <div className="ch-code">
      <div className="ch-code-head"><span className="dots"><i/><i/><i/></span><span className="pl-lang">{lang}</span></div>
      <pre className="ch-pre"><code ref={ref} className={`language-${lang}`}>{code}</code></pre>
    </div>
  );
}
const Section = ({ id, children }) => <section id={id} className="ch-section">{children}</section>;
const H2 = ({ children }) => <h2 className="ch-h2">{children}</h2>;
const H3 = ({ children }) => <h3 className="ch-h3">{children}</h3>;
const Bullet = ({ title, children }) => (<div className="ch-bullet"><b>{title}</b><span>{children}</span></div>);
const Tip = ({ children }) => <div className="ch-tip">{children}</div>;

export default function ChessPage() {
  return (
    <div className="ch-root">
      <header className="ch-header">
        <Link to="/maang/system-design/advanced" className="ch-back">← Back to Advanced System Design</Link>
        <h1><i className="fas fa-chess" /> Chess Game — LLD <span className="ch-badge"><i className="fab fa-java" /> Java + UML</span></h1>
        <div className="ch-sub-info">
          <span><i className="fas fa-list-check" /> 6 Steps</span>
          <span><i className="fas fa-code" /> Working Java</span>
          <span><i className="fas fa-database" /> DB Schema</span>
          <span className="ch-badge-alt"><i className="fas fa-mouse-pointer" /> Scroll down</span>
        </div>
        <nav className="ch-nav">
          <a href="#req">1. Requirements</a><a href="#ent">2. Entities</a><a href="#uml">3. Diagram</a><a href="#db">4. DB</a><a href="#java">5. Java</a><a href="#wrap">6. Wrap-up</a>
        </nav>
      </header>

      <Section id="req">
        <H2><i className="fas fa-list-check" /> Step 1 — Requirements (5 min)</H2>
        <p className="ch-intro"><b>What to do:</b> Pick <b>4 functional</b> + <b>3 non-functional</b>. State what is OUT of scope (AI opponent, online multiplayer, clock, FEN import).</p>
        <H3>Functional — what the system DOES</H3>
        <Bullet title="1. Board setup + 8x8 grid">Standard 8x8 board. Each cell holds a Piece or is empty. Pieces placed in starting position.<br /><i>Why: board is the foundation — everything references coordinates.</i></Bullet>
        <Bullet title="2. Piece movement rules">Each piece has its own logic — King, Queen, Rook, Bishop, Knight, Pawn. canMove is polymorphic.<br /><i>Why: inheritance + polymorphism — the core OOP signal.</i></Bullet>
        <Bullet title="3. Turn-based play + move validation">White moves first, then Black. Invalid move rejected. Turn flips only on valid move.<br /><i>Why: links Board + Player + Piece — core game loop.</i></Bullet>
        <Bullet title="4. Check / Checkmate / Stalemate">After every move, check King safety. No legal moves + in check = mate.<br /><i>Why: game-end logic — shows you understand chess rules.</i></Bullet>
        <H3>Non-Functional — how the system BEHAVES</H3>
        <Bullet title="1. Immutable move history">Every move recorded. Enables undo, replay, audit. Stack of Move objects.<br /><i>Why: immutability + audit — interviewers love this.</i></Bullet>
        <Bullet title="2. Extensible">New piece = new subclass. New variant = new BoardSetupStrategy.<br /><i>Why: shows SOLID, especially OCP and DIP.</i></Bullet>
        <Bullet title="3. Low latency — O(1) cell lookup">Board access by (row, col) is O(1). Use 2D array.<br /><i>Why: performance, not just correctness.</i></Bullet>
        <Tip><b>Interview line:</b> Skip AI opponent, online multiplayer, clock unless asked — focus on move, validate, update, check-endgame flow.</Tip>
      </Section>

      <Section id="ent">
        <H2><i className="fas fa-boxes-stacked" /> Step 2 — Entities (3 min)</H2>
        <p className="ch-intro"><b>Rule:</b> Take nouns from requirements — each becomes a class.</p>
        <Bullet title="ChessGame (Singleton + Facade)">Top-level controller. Holds board, players, turn, history, state.<br /><i>Why Singleton: one game per session. Facade over Board + Rules.</i></Bullet>
        <Bullet title="Board">8x8 grid of Cell. Has getPiece, setPiece, movePiece, isPathClear.<br /><i>Why: separates board state from game logic.</i></Bullet>
        <Bullet title="Cell">Has row, col, piece. Immutable coordinates.<br /><i>Why: unit of board — coordinates + occupant.</i></Bullet>
        <Bullet title="Piece (abstract) + 6 subclasses">Each has canMove + getSymbol. Polymorphic movement.<br /><i>Why: the #1 OOP signal in chess.</i></Bullet>
        <Bullet title="Player">Has name, color, captured pieces list.<br /><i>Why: player is the actor — owns pieces and turn.</i></Bullet>
        <Bullet title="Move">Has fromCell, toCell, piece, capturedPiece. Immutable.<br /><i>Why: the receipt — enables undo and replay.</i></Bullet>
        <Bullet title="GameState (enum)">ACTIVE, CHECK, CHECKMATE, STALEMATE, RESIGNED, DRAW.<br /><i>Why: type-safe status — drives UI and end-game logic.</i></Bullet>
        <Bullet title="MoveValidator (Strategy)">isValidMove checks movement + path + king safety.<br /><i>Why: Strategy — swap validation rules for variants.</i></Bullet>
      </Section>

      <Section id="uml">
        <H2><i className="fas fa-project-diagram" /> Step 3 — Class Diagram (10 min)</H2>
        <p className="ch-intro">Draw this on the whiteboard. Relationships are the key signal:</p>
        <CodeBlock code={UML} lang="text" />
        <Tip><b>Key relationship:</b> Game to Board is Composition. Cell to Piece is Association. Pieces are Inheritance. Validator is Dependency (DIP).</Tip>
      </Section>

      <Section id="db">
        <H2><i className="fas fa-database" /> Step 4 — DB Design (5 min)</H2>
        <p className="ch-intro">Even for in-memory LLD, show you can persist it. 4 normalized tables:</p>
        <CodeBlock code={SQL} lang="sql" />
        <Bullet title="idx_move_game">Makes move-history replay O(log n).<br /><i>Why: replay without full scan.</i></Bullet>
        <Bullet title="game_snapshots with FEN">Enables undo by restoring board state. Standard notation.<br /><i>Why: compact, portable snapshots.</i></Bullet>
        <Bullet title="winner in games">Denormalized for quick queries — avoids scanning moves.<br /><i>Why: read optimization.</i></Bullet>
      </Section>

      <Section id="java">
        <H2><i className="fab fa-java" /> Step 5 — Java Code (20-25 min)</H2>
        <p className="ch-intro">Minimal working Java. Skip boilerplate getters unless asked:</p>
        <H3>Block A — Enums + Cell + Pieces</H3>
        <CodeBlock code={JAVA_A} lang="java" />
        <H3>Block B — Board + Move + Validator</H3>
        <CodeBlock code={JAVA_B} lang="java" />
        <H3>Block C — ChessGame + Main</H3>
        <CodeBlock code={JAVA_C} lang="java" />
      </Section>

      <Section id="wrap">
        <H2><i className="fas fa-flag-checkered" /> Step 6 — Wrap-up (3 min)</H2>
        <p className="ch-intro">Be ready to answer these without thinking:</p>
        <Bullet title="Concurrency — two moves at once?">makeMove is synchronized. For online, per-game lock.<br /><i>Why: validation + execution must be atomic.</i></Bullet>
        <Bullet title="How does check detection work?">Scan all enemy pieces, check if any can reach King. No escape = mate.<br /><i>Why: the core rule — must explain clearly.</i></Bullet>
        <Bullet title="How would you add a new piece?">New Piece subclass, override canMove + getSymbol. No other changes.<br /><i>Why: OCP in action.</i></Bullet>
        <Bullet title="Patterns used + SOLID">Singleton, Strategy, Composition, Polymorphism, State.<br /><i>Why: naming patterns shows design vocabulary.</i></Bullet>
        <Tip><b>Scorecard:</b> Requirements (5) + Entities (3) + Diagram (10) + DB (5) + Code (20) + Wrap-up (3) = 46 min.</Tip>
      </Section>

      <footer className="ch-footer">
        <Link to="/maang/system-design/advanced">Back to Advanced System Design</Link>
      </footer>
    </div>
  );
}