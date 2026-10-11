import{r as e}from"./rolldown-runtime-QTnfLwEv.js";import{h as t,r as n,u as r}from"./index-Dka5w6n9.js";import{t as i}from"./atom-one-dark-C84iCW6D.js";var a=e(t(),1),o=`// A. Enums + Cell + Piece hierarchy
import java.util.*;

enum Color { WHITE, BLACK }
enum PieceType { KING, QUEEN, ROOK, BISHOP, KNIGHT, PAWN }
enum GameState { ACTIVE, CHECK, CHECKMATE, STALEMATE, RESIGNED, DRAW }

class Cell {
    final int row, col;
    Cell(int r, int c) { row = r; col = c; }
    @Override public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Cell)) return false;
        Cell c = (Cell) o;
        return row == c.row && col == c.col;
    }
    @Override public int hashCode() { return Objects.hash(row, col); }
    @Override public String toString() { return "(" + row + "," + col + ")"; }
}

abstract class Piece {
    protected final Color color;
    protected final PieceType type;
    protected Piece(Color c, PieceType t) { color = c; type = t; }
    public Color getColor() { return color; }
    public PieceType getType() { return type; }
    public abstract boolean canMove(Board board, Cell from, Cell to);
    public abstract String getSymbol();
}

class King extends Piece {
    King(Color c) { super(c, PieceType.KING); }
    public boolean canMove(Board b, Cell f, Cell t) {
        int dr = Math.abs(f.row - t.row), dc = Math.abs(f.col - t.col);
        return Math.max(dr, dc) == 1;
    }
    public String getSymbol() { return color == Color.WHITE ? "K" : "k"; }
}

class Queen extends Piece {
    Queen(Color c) { super(c, PieceType.QUEEN); }
    public boolean canMove(Board b, Cell f, Cell t) {
        int dr = Math.abs(f.row - t.row), dc = Math.abs(f.col - t.col);
        boolean straight = (f.row == t.row || f.col == t.col);
        boolean diagonal = (dr == dc);
        return (straight || diagonal) && b.isPathClear(f, t);
    }
    public String getSymbol() { return color == Color.WHITE ? "Q" : "q"; }
}

class Rook extends Piece {
    Rook(Color c) { super(c, PieceType.ROOK); }
    public boolean canMove(Board b, Cell f, Cell t) {
        if (f.row != t.row && f.col != t.col) return false;
        return b.isPathClear(f, t);
    }
    public String getSymbol() { return color == Color.WHITE ? "R" : "r"; }
}

class Bishop extends Piece {
    Bishop(Color c) { super(c, PieceType.BISHOP); }
    public boolean canMove(Board b, Cell f, Cell t) {
        if (Math.abs(f.row - t.row) != Math.abs(f.col - t.col)) return false;
        return b.isPathClear(f, t);
    }
    public String getSymbol() { return color == Color.WHITE ? "B" : "b"; }
}

class Knight extends Piece {
    Knight(Color c) { super(c, PieceType.KNIGHT); }
    public boolean canMove(Board b, Cell f, Cell t) {
        int dr = Math.abs(f.row - t.row), dc = Math.abs(f.col - t.col);
        return (dr == 2 && dc == 1) || (dr == 1 && dc == 2);
    }
    public String getSymbol() { return color == Color.WHITE ? "N" : "n"; }
}

class Pawn extends Piece {
    Pawn(Color c) { super(c, PieceType.PAWN); }
    public boolean canMove(Board b, Cell f, Cell t) {
        int dir = (color == Color.WHITE) ? -1 : 1;
        int dr = t.row - f.row, dc = Math.abs(t.col - f.col);
        if (dc == 0 && dr == dir && b.getPiece(t.row, t.col) == null) return true;
        int startRow = (color == Color.WHITE) ? 6 : 1;
        if (dc == 0 && dr == 2 * dir && f.row == startRow
                && b.getPiece(f.row + dir, f.col) == null
                && b.getPiece(t.row, t.col) == null) return true;
        if (dc == 1 && dr == dir) {
            Piece target = b.getPiece(t.row, t.col);
            return target != null && target.getColor() != color;
        }
        return false;
    }
    public String getSymbol() { return color == Color.WHITE ? "P" : "p"; }
}`,s=`// B. Board + Move + Player + Validator
class Board {
    private final Piece[][] grid = new Piece[8][8];
    public Piece getPiece(int r, int c) {
        if (r < 0 || r > 7 || c < 0 || c > 7) return null;
        return grid[r][c];
    }
    public void setPiece(int r, int c, Piece p) { grid[r][c] = p; }
    public boolean isPathClear(Cell from, Cell to) {
        int dr = Integer.signum(to.row - from.row);
        int dc = Integer.signum(to.col - from.col);
        int r = from.row + dr, c = from.col + dc;
        while (r != to.row || c != to.col) {
            if (grid[r][c] != null) return false;
            r += dr; c += dc;
        }
        return true;
    }
    public void movePiece(Cell from, Cell to) {
        grid[to.row][to.col] = grid[from.row][from.col];
        grid[from.row][from.col] = null;
    }
    public Board copy() {
        Board b = new Board();
        for (int r = 0; r < 8; r++)
            for (int c = 0; c < 8; c++)
                b.grid[r][c] = grid[r][c];
        return b;
    }
}

class Move {
    private final Cell from, to;
    private final Piece piece;
    private final Piece captured;
    private final long timestamp;
    Move(Cell f, Cell t, Piece p, Piece cap) {
        from = f; to = t; piece = p; captured = cap;
        timestamp = System.currentTimeMillis();
    }
    public Cell getFrom() { return from; }
    public Cell getTo() { return to; }
    public Piece getPiece() { return piece; }
    public Piece getCaptured() { return captured; }
    public long getTimestamp() { return timestamp; }
}

class Player {
    private final String name;
    private final Color color;
    private final List<Piece> capturedPieces = new ArrayList<>();
    Player(String n, Color c) { name = n; color = c; }
    public String getName() { return name; }
    public Color getColor() { return color; }
    public void addCapture(Piece p) { capturedPieces.add(p); }
    public List<Piece> getCapturedPieces() { return capturedPieces; }
}

interface MoveValidator {
    boolean isValidMove(Board board, Cell from, Cell to, Color turn);
}

class StandardValidator implements MoveValidator {
    public boolean isValidMove(Board board, Cell from, Cell to, Color turn) {
        Piece p = board.getPiece(from.row, from.col);
        if (p == null || p.getColor() != turn) return false;
        Piece target = board.getPiece(to.row, to.col);
        if (target != null && target.getColor() == turn) return false;
        if (!p.canMove(board, from, to)) return false;
        Board copy = board.copy();
        copy.movePiece(from, to);
        return !isKingInCheck(copy, turn);
    }
    private boolean isKingInCheck(Board board, Color color) {
        Cell kingPos = null;
        for (int r = 0; r < 8; r++)
            for (int c = 0; c < 8; c++) {
                Piece p = board.getPiece(r, c);
                if (p != null && p.getType() == PieceType.KING && p.getColor() == color)
                    kingPos = new Cell(r, c);
            }
        if (kingPos == null) return true;
        Color enemy = (color == Color.WHITE) ? Color.BLACK : Color.WHITE;
        for (int r = 0; r < 8; r++)
            for (int c = 0; c < 8; c++) {
                Piece p = board.getPiece(r, c);
                if (p != null && p.getColor() == enemy
                        && p.canMove(board, new Cell(r, c), kingPos)) return true;
            }
        return false;
    }
}`,c=`// C. ChessGame + Main
class ChessGame {
    private static volatile ChessGame ins;
    private final Board board;
    private final Player white, black;
    private Color currentTurn = Color.WHITE;
    private GameState gameState = GameState.ACTIVE;
    private final Deque<Move> moveHistory = new ArrayDeque<>();
    private final MoveValidator validator;

    private ChessGame(String whiteName, String blackName, MoveValidator v) {
        board = new Board();
        white = new Player(whiteName, Color.WHITE);
        black = new Player(blackName, Color.BLACK);
        validator = v;
        setupBoard();
    }

    public static ChessGame get(String w, String b, MoveValidator v) {
        if (ins == null) { synchronized (ChessGame.class) {
            if (ins == null) ins = new ChessGame(w, b, v); } }
        return ins;
    }

    private void setupBoard() {
        board.setPiece(0, 0, new Rook(Color.BLACK));
        board.setPiece(0, 1, new Knight(Color.BLACK));
        board.setPiece(0, 2, new Bishop(Color.BLACK));
        board.setPiece(0, 3, new Queen(Color.BLACK));
        board.setPiece(0, 4, new King(Color.BLACK));
        board.setPiece(0, 5, new Bishop(Color.BLACK));
        board.setPiece(0, 6, new Knight(Color.BLACK));
        board.setPiece(0, 7, new Rook(Color.BLACK));
        for (int c = 0; c < 8; c++) board.setPiece(1, c, new Pawn(Color.BLACK));
        board.setPiece(7, 0, new Rook(Color.WHITE));
        board.setPiece(7, 1, new Knight(Color.WHITE));
        board.setPiece(7, 2, new Bishop(Color.WHITE));
        board.setPiece(7, 3, new Queen(Color.WHITE));
        board.setPiece(7, 4, new King(Color.WHITE));
        board.setPiece(7, 5, new Bishop(Color.WHITE));
        board.setPiece(7, 6, new Knight(Color.WHITE));
        board.setPiece(7, 7, new Rook(Color.WHITE));
        for (int c = 0; c < 8; c++) board.setPiece(6, c, new Pawn(Color.WHITE));
    }

    public synchronized boolean makeMove(Cell from, Cell to) {
        if (gameState == GameState.CHECKMATE || gameState == GameState.STALEMATE) return false;
        if (!validator.isValidMove(board, from, to, currentTurn)) return false;
        Piece piece = board.getPiece(from.row, from.col);
        Piece captured = board.getPiece(to.row, to.col);
        board.movePiece(from, to);
        moveHistory.push(new Move(from, to, piece, captured));
        if (captured != null) {
            Player capturer = (currentTurn == Color.WHITE) ? white : black;
            capturer.addCapture(captured);
        }
        currentTurn = (currentTurn == Color.WHITE) ? Color.BLACK : Color.WHITE;
        updateGameState();
        return true;
    }

    private void updateGameState() {
        boolean inCheck = isInCheck(currentTurn);
        boolean hasLegalMove = hasAnyLegalMove(currentTurn);
        if (inCheck && !hasLegalMove) gameState = GameState.CHECKMATE;
        else if (!inCheck && !hasLegalMove) gameState = GameState.STALEMATE;
        else if (inCheck) gameState = GameState.CHECK;
        else gameState = GameState.ACTIVE;
    }

    private boolean isInCheck(Color color) {
        Cell kingPos = null;
        for (int r = 0; r < 8; r++)
            for (int c = 0; c < 8; c++) {
                Piece p = board.getPiece(r, c);
                if (p != null && p.getType() == PieceType.KING && p.getColor() == color)
                    kingPos = new Cell(r, c);
            }
        if (kingPos == null) return true;
        Color enemy = (color == Color.WHITE) ? Color.BLACK : Color.WHITE;
        for (int r = 0; r < 8; r++)
            for (int c = 0; c < 8; c++) {
                Piece p = board.getPiece(r, c);
                if (p != null && p.getColor() == enemy
                        && p.canMove(board, new Cell(r, c), kingPos)) return true;
            }
        return false;
    }

    private boolean hasAnyLegalMove(Color color) {
        for (int r = 0; r < 8; r++)
            for (int c = 0; c < 8; c++) {
                Piece p = board.getPiece(r, c);
                if (p == null || p.getColor() != color) continue;
                for (int tr = 0; tr < 8; tr++)
                    for (int tc = 0; tc < 8; tc++) {
                        if (validator.isValidMove(board, new Cell(r, c),
                                new Cell(tr, tc), color)) return true;
                    }
            }
        return false;
    }

    public synchronized boolean undo() {
        if (moveHistory.isEmpty()) return false;
        Move m = moveHistory.pop();
        board.setPiece(m.getFrom().row, m.getFrom().col, m.getPiece());
        board.setPiece(m.getTo().row, m.getTo().col, m.getCaptured());
        currentTurn = (currentTurn == Color.WHITE) ? Color.BLACK : Color.WHITE;
        updateGameState();
        return true;
    }

    public GameState getGameState() { return gameState; }
    public Color getCurrentTurn() { return currentTurn; }
    public Board getBoard() { return board; }

    public void printBoard() {
        for (int r = 0; r < 8; r++) {
            for (int c = 0; c < 8; c++) {
                Piece p = board.getPiece(r, c);
                System.out.print((p == null ? "." : p.getSymbol()) + " ");
            }
            System.out.println();
        }
    }
}

public class Main {
    public static void main(String[] args) {
        ChessGame game = ChessGame.get("Alice", "Bob", new StandardValidator());
        game.printBoard();
        game.makeMove(new Cell(6, 4), new Cell(4, 4));
        game.makeMove(new Cell(1, 4), new Cell(3, 4));
        System.out.println("Turn: " + game.getCurrentTurn());
        System.out.println("State: " + game.getGameState());
        game.printBoard();
    }
}`,l=`-- 4 tables, normalized, minimal

CREATE TABLE games (
  game_id      VARCHAR(20) PRIMARY KEY,
  white_player VARCHAR(100) NOT NULL,
  black_player VARCHAR(100) NOT NULL,
  state        ENUM('ACTIVE','CHECK','CHECKMATE','STALEMATE','RESIGNED','DRAW') DEFAULT 'ACTIVE',
  winner       ENUM('WHITE','BLACK','DRAW') NULL,
  started_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  ended_at     TIMESTAMP NULL
);

CREATE TABLE moves (
  move_id      BIGINT AUTO_INCREMENT PRIMARY KEY,
  game_id      VARCHAR(20) NOT NULL,
  move_number  INT NOT NULL,
  from_row     INT NOT NULL,
  from_col     INT NOT NULL,
  to_row       INT NOT NULL,
  to_col       INT NOT NULL,
  piece_type   ENUM('KING','QUEEN','ROOK','BISHOP','KNIGHT','PAWN') NOT NULL,
  piece_color  ENUM('WHITE','BLACK') NOT NULL,
  captured_type ENUM('KING','QUEEN','ROOK','BISHOP','KNIGHT','PAWN') NULL,
  is_check     BOOLEAN DEFAULT FALSE,
  is_checkmate BOOLEAN DEFAULT FALSE,
  played_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (game_id) REFERENCES games(game_id)
);
CREATE INDEX idx_move_game ON moves(game_id, move_number);

CREATE TABLE game_snapshots (
  snapshot_id  BIGINT AUTO_INCREMENT PRIMARY KEY,
  game_id      VARCHAR(20) NOT NULL,
  move_number  INT NOT NULL,
  board_fen    VARCHAR(100) NOT NULL,
  created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (game_id) REFERENCES games(game_id)
);
CREATE INDEX idx_snapshot_game ON game_snapshots(game_id, move_number);

CREATE TABLE captured_pieces (
  capture_id   BIGINT AUTO_INCREMENT PRIMARY KEY,
  game_id      VARCHAR(20) NOT NULL,
  move_id      BIGINT NOT NULL,
  piece_type   ENUM('KING','QUEEN','ROOK','BISHOP','KNIGHT','PAWN') NOT NULL,
  piece_color  ENUM('WHITE','BLACK') NOT NULL,
  FOREIGN KEY (game_id) REFERENCES games(game_id),
  FOREIGN KEY (move_id) REFERENCES moves(move_id)
);`,u=`----------------------------------------
  ChessGame  (Singleton + Facade)
  - board: Board
  - players: List<Player>
  - currentTurn: Color
  - moveHistory: Deque<Move>
  - gameState: GameState
  + makeMove(from, to): boolean
  + undo(): boolean
  + isCheckmate(color): boolean
  + isStalemate(color): boolean
----------------------------------------
      |owns (board dies with game)
      v
----------------------------------------
  Board                         Cell
  - grid: Cell[8][8]            - row: int
  + getPiece(r,c)               - col: int
  + setPiece(r,c,p)             - piece: Piece
  + movePiece(f,t)
  + isPathClear(f,t)
----------------------------------------
      Cell holds 0..1
      v
----------------------------------------
  Piece  (abstract)
  - color: Color
  + canMove(board,f,t)
  + getSymbol()
----------------------------------------
  |-- King    |-- Queen   |-- Pawn
  |-- Rook    |-- Bishop  +-- Knight

ChessGame --uses--> MoveValidator (interface)
                     +-- StandardValidator
ChessGame --uses--> Player
  - name, color, capturedPieces
ChessGame --creates--> Move
  - from, to, piece, captured, timestamp`,d=n();function f({code:e,lang:t}){let n=(0,a.useRef)(null);return(0,a.useEffect)(()=>{n.current&&(n.current.removeAttribute(`data-highlighted`),i.highlightElement(n.current))},[e]),(0,d.jsxs)(`div`,{className:`ch-code`,children:[(0,d.jsxs)(`div`,{className:`ch-code-head`,children:[(0,d.jsxs)(`span`,{className:`dots`,children:[(0,d.jsx)(`i`,{}),(0,d.jsx)(`i`,{}),(0,d.jsx)(`i`,{})]}),(0,d.jsx)(`span`,{className:`pl-lang`,children:t})]}),(0,d.jsx)(`pre`,{className:`ch-pre`,children:(0,d.jsx)(`code`,{ref:n,className:`language-${t}`,children:e})})]})}var p=({id:e,children:t})=>(0,d.jsx)(`section`,{id:e,className:`ch-section`,children:t}),m=({children:e})=>(0,d.jsx)(`h2`,{className:`ch-h2`,children:e}),h=({children:e})=>(0,d.jsx)(`h3`,{className:`ch-h3`,children:e}),g=({title:e,children:t})=>(0,d.jsxs)(`div`,{className:`ch-bullet`,children:[(0,d.jsx)(`b`,{children:e}),(0,d.jsx)(`span`,{children:t})]}),_=({children:e})=>(0,d.jsx)(`div`,{className:`ch-tip`,children:e});function v(){return(0,d.jsxs)(`div`,{className:`ch-root`,children:[(0,d.jsxs)(`header`,{className:`ch-header`,children:[(0,d.jsx)(r,{to:`/maang/system-design/advanced`,className:`ch-back`,children:`← Back to Advanced System Design`}),(0,d.jsxs)(`h1`,{children:[(0,d.jsx)(`i`,{className:`fas fa-chess`}),` Chess Game — LLD `,(0,d.jsxs)(`span`,{className:`ch-badge`,children:[(0,d.jsx)(`i`,{className:`fab fa-java`}),` Java + UML`]})]}),(0,d.jsxs)(`div`,{className:`ch-sub-info`,children:[(0,d.jsxs)(`span`,{children:[(0,d.jsx)(`i`,{className:`fas fa-list-check`}),` 6 Steps`]}),(0,d.jsxs)(`span`,{children:[(0,d.jsx)(`i`,{className:`fas fa-code`}),` Working Java`]}),(0,d.jsxs)(`span`,{children:[(0,d.jsx)(`i`,{className:`fas fa-database`}),` DB Schema`]}),(0,d.jsxs)(`span`,{className:`ch-badge-alt`,children:[(0,d.jsx)(`i`,{className:`fas fa-mouse-pointer`}),` Scroll down`]})]}),(0,d.jsxs)(`nav`,{className:`ch-nav`,children:[(0,d.jsx)(`a`,{href:`#req`,children:`1. Requirements`}),(0,d.jsx)(`a`,{href:`#ent`,children:`2. Entities`}),(0,d.jsx)(`a`,{href:`#uml`,children:`3. Diagram`}),(0,d.jsx)(`a`,{href:`#db`,children:`4. DB`}),(0,d.jsx)(`a`,{href:`#java`,children:`5. Java`}),(0,d.jsx)(`a`,{href:`#wrap`,children:`6. Wrap-up`})]})]}),(0,d.jsxs)(p,{id:`req`,children:[(0,d.jsxs)(m,{children:[(0,d.jsx)(`i`,{className:`fas fa-list-check`}),` Step 1 — Requirements (5 min)`]}),(0,d.jsxs)(`p`,{className:`ch-intro`,children:[(0,d.jsx)(`b`,{children:`What to do:`}),` Pick `,(0,d.jsx)(`b`,{children:`4 functional`}),` + `,(0,d.jsx)(`b`,{children:`3 non-functional`}),`. State what is OUT of scope (AI opponent, online multiplayer, clock, FEN import).`]}),(0,d.jsx)(h,{children:`Functional — what the system DOES`}),(0,d.jsxs)(g,{title:`1. Board setup + 8x8 grid`,children:[`Standard 8x8 board. Each cell holds a Piece or is empty. Pieces placed in starting position.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: board is the foundation — everything references coordinates.`})]}),(0,d.jsxs)(g,{title:`2. Piece movement rules`,children:[`Each piece has its own logic — King, Queen, Rook, Bishop, Knight, Pawn. canMove is polymorphic.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: inheritance + polymorphism — the core OOP signal.`})]}),(0,d.jsxs)(g,{title:`3. Turn-based play + move validation`,children:[`White moves first, then Black. Invalid move rejected. Turn flips only on valid move.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: links Board + Player + Piece — core game loop.`})]}),(0,d.jsxs)(g,{title:`4. Check / Checkmate / Stalemate`,children:[`After every move, check King safety. No legal moves + in check = mate.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: game-end logic — shows you understand chess rules.`})]}),(0,d.jsx)(h,{children:`Non-Functional — how the system BEHAVES`}),(0,d.jsxs)(g,{title:`1. Immutable move history`,children:[`Every move recorded. Enables undo, replay, audit. Stack of Move objects.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: immutability + audit — interviewers love this.`})]}),(0,d.jsxs)(g,{title:`2. Extensible`,children:[`New piece = new subclass. New variant = new BoardSetupStrategy.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: shows SOLID, especially OCP and DIP.`})]}),(0,d.jsxs)(g,{title:`3. Low latency — O(1) cell lookup`,children:[`Board access by (row, col) is O(1). Use 2D array.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: performance, not just correctness.`})]}),(0,d.jsxs)(_,{children:[(0,d.jsx)(`b`,{children:`Interview line:`}),` Skip AI opponent, online multiplayer, clock unless asked — focus on move, validate, update, check-endgame flow.`]})]}),(0,d.jsxs)(p,{id:`ent`,children:[(0,d.jsxs)(m,{children:[(0,d.jsx)(`i`,{className:`fas fa-boxes-stacked`}),` Step 2 — Entities (3 min)`]}),(0,d.jsxs)(`p`,{className:`ch-intro`,children:[(0,d.jsx)(`b`,{children:`Rule:`}),` Take nouns from requirements — each becomes a class.`]}),(0,d.jsxs)(g,{title:`ChessGame (Singleton + Facade)`,children:[`Top-level controller. Holds board, players, turn, history, state.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why Singleton: one game per session. Facade over Board + Rules.`})]}),(0,d.jsxs)(g,{title:`Board`,children:[`8x8 grid of Cell. Has getPiece, setPiece, movePiece, isPathClear.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: separates board state from game logic.`})]}),(0,d.jsxs)(g,{title:`Cell`,children:[`Has row, col, piece. Immutable coordinates.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: unit of board — coordinates + occupant.`})]}),(0,d.jsxs)(g,{title:`Piece (abstract) + 6 subclasses`,children:[`Each has canMove + getSymbol. Polymorphic movement.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: the #1 OOP signal in chess.`})]}),(0,d.jsxs)(g,{title:`Player`,children:[`Has name, color, captured pieces list.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: player is the actor — owns pieces and turn.`})]}),(0,d.jsxs)(g,{title:`Move`,children:[`Has fromCell, toCell, piece, capturedPiece. Immutable.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: the receipt — enables undo and replay.`})]}),(0,d.jsxs)(g,{title:`GameState (enum)`,children:[`ACTIVE, CHECK, CHECKMATE, STALEMATE, RESIGNED, DRAW.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: type-safe status — drives UI and end-game logic.`})]}),(0,d.jsxs)(g,{title:`MoveValidator (Strategy)`,children:[`isValidMove checks movement + path + king safety.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: Strategy — swap validation rules for variants.`})]})]}),(0,d.jsxs)(p,{id:`uml`,children:[(0,d.jsxs)(m,{children:[(0,d.jsx)(`i`,{className:`fas fa-project-diagram`}),` Step 3 — Class Diagram (10 min)`]}),(0,d.jsx)(`p`,{className:`ch-intro`,children:`Draw this on the whiteboard. Relationships are the key signal:`}),(0,d.jsx)(f,{code:u,lang:`text`}),(0,d.jsxs)(_,{children:[(0,d.jsx)(`b`,{children:`Key relationship:`}),` Game to Board is Composition. Cell to Piece is Association. Pieces are Inheritance. Validator is Dependency (DIP).`]})]}),(0,d.jsxs)(p,{id:`db`,children:[(0,d.jsxs)(m,{children:[(0,d.jsx)(`i`,{className:`fas fa-database`}),` Step 4 — DB Design (5 min)`]}),(0,d.jsx)(`p`,{className:`ch-intro`,children:`Even for in-memory LLD, show you can persist it. 4 normalized tables:`}),(0,d.jsx)(f,{code:l,lang:`sql`}),(0,d.jsxs)(g,{title:`idx_move_game`,children:[`Makes move-history replay O(log n).`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: replay without full scan.`})]}),(0,d.jsxs)(g,{title:`game_snapshots with FEN`,children:[`Enables undo by restoring board state. Standard notation.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: compact, portable snapshots.`})]}),(0,d.jsxs)(g,{title:`winner in games`,children:[`Denormalized for quick queries — avoids scanning moves.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: read optimization.`})]})]}),(0,d.jsxs)(p,{id:`java`,children:[(0,d.jsxs)(m,{children:[(0,d.jsx)(`i`,{className:`fab fa-java`}),` Step 5 — Java Code (20-25 min)`]}),(0,d.jsx)(`p`,{className:`ch-intro`,children:`Minimal working Java. Skip boilerplate getters unless asked:`}),(0,d.jsx)(h,{children:`Block A — Enums + Cell + Pieces`}),(0,d.jsx)(f,{code:o,lang:`java`}),(0,d.jsx)(h,{children:`Block B — Board + Move + Validator`}),(0,d.jsx)(f,{code:s,lang:`java`}),(0,d.jsx)(h,{children:`Block C — ChessGame + Main`}),(0,d.jsx)(f,{code:c,lang:`java`})]}),(0,d.jsxs)(p,{id:`wrap`,children:[(0,d.jsxs)(m,{children:[(0,d.jsx)(`i`,{className:`fas fa-flag-checkered`}),` Step 6 — Wrap-up (3 min)`]}),(0,d.jsx)(`p`,{className:`ch-intro`,children:`Be ready to answer these without thinking:`}),(0,d.jsxs)(g,{title:`Concurrency — two moves at once?`,children:[`makeMove is synchronized. For online, per-game lock.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: validation + execution must be atomic.`})]}),(0,d.jsxs)(g,{title:`How does check detection work?`,children:[`Scan all enemy pieces, check if any can reach King. No escape = mate.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: the core rule — must explain clearly.`})]}),(0,d.jsxs)(g,{title:`How would you add a new piece?`,children:[`New Piece subclass, override canMove + getSymbol. No other changes.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: OCP in action.`})]}),(0,d.jsxs)(g,{title:`Patterns used + SOLID`,children:[`Singleton, Strategy, Composition, Polymorphism, State.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: naming patterns shows design vocabulary.`})]}),(0,d.jsxs)(_,{children:[(0,d.jsx)(`b`,{children:`Scorecard:`}),` Requirements (5) + Entities (3) + Diagram (10) + DB (5) + Code (20) + Wrap-up (3) = 46 min.`]})]}),(0,d.jsx)(`footer`,{className:`ch-footer`,children:(0,d.jsx)(r,{to:`/maang/system-design/advanced`,children:`Back to Advanced System Design`})})]})}export{v as default};