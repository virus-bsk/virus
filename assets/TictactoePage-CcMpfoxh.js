import{r as e}from"./rolldown-runtime-QTnfLwEv.js";import{t}from"./react-CZI7_Jkm.js";import{o as n,r}from"./index-DCrc1KQY.js";import{t as i}from"./atom-one-dark-CL0A0LnX.js";var a=e(t(),1),o=`// A. Enums + Board + Player
import java.util.*;

enum Symbol { X, O, EMPTY }
enum GameState { IN_PROGRESS, X_WINS, O_WINS, DRAW }

class Board {
    private final int size;
    private final Symbol[][] grid;
    Board(int n) {
        size = n;
        grid = new Symbol[n][n];
        reset();
    }
    public void reset() {
        for (int r = 0; r < size; r++)
            for (int c = 0; c < size; c++)
                grid[r][c] = Symbol.EMPTY;
    }
    public boolean place(int r, int c, Symbol s) {
        if (r < 0 || r >= size || c < 0 || c >= size) return false;
        if (grid[r][c] != Symbol.EMPTY) return false;
        grid[r][c] = s;
        return true;
    }
    public void resetCell(int r, int c) { grid[r][c] = Symbol.EMPTY; }
    public Symbol getCell(int r, int c) { return grid[r][c]; }
    public int getSize() { return size; }
    public boolean isFull() {
        for (int r = 0; r < size; r++)
            for (int c = 0; c < size; c++)
                if (grid[r][c] == Symbol.EMPTY) return false;
        return true;
    }
    public void print() {
        for (int r = 0; r < size; r++) {
            for (int c = 0; c < size; c++) {
                Symbol s = grid[r][c];
                System.out.print((s == Symbol.EMPTY ? "." : s.toString()) + " ");
            }
            System.out.println();
        }
    }
}

abstract class Player {
    protected final String name;
    protected final Symbol symbol;
    protected Player(String n, Symbol s) { name = n; symbol = s; }
    public String getName() { return name; }
    public Symbol getSymbol() { return symbol; }
    public abstract Move getMove(Board board);
}

class HumanPlayer extends Player {
    private final Scanner scanner;
    HumanPlayer(String n, Symbol s, Scanner sc) { super(n, s); scanner = sc; }
    public Move getMove(Board board) {
        System.out.print(name + " (" + symbol + ") enter row col: ");
        int r = scanner.nextInt();
        int c = scanner.nextInt();
        return new Move(r, c, symbol);
    }
}`,s=`// B. Move + WinStrategy
class Move {
    private final int row, col;
    private final Symbol symbol;
    private final long timestamp;
    Move(int r, int c, Symbol s) {
        row = r; col = c; symbol = s;
        timestamp = System.currentTimeMillis();
    }
    public int getRow() { return row; }
    public int getCol() { return col; }
    public Symbol getSymbol() { return symbol; }
    public long getTimestamp() { return timestamp; }
}

interface WinStrategy {
    Optional<Symbol> checkWinner(Board board, Move lastMove);
}

class StandardWinStrategy implements WinStrategy {
    public Optional<Symbol> checkWinner(Board board, Move lastMove) {
        int r = lastMove.getRow(), c = lastMove.getCol();
        Symbol s = lastMove.getSymbol();
        int n = board.getSize();

        boolean rowWin = true;
        for (int j = 0; j < n; j++)
            if (board.getCell(r, j) != s) { rowWin = false; break; }
        if (rowWin) return Optional.of(s);

        boolean colWin = true;
        for (int i = 0; i < n; i++)
            if (board.getCell(i, c) != s) { colWin = false; break; }
        if (colWin) return Optional.of(s);

        if (r == c) {
            boolean diagWin = true;
            for (int i = 0; i < n; i++)
                if (board.getCell(i, i) != s) { diagWin = false; break; }
            if (diagWin) return Optional.of(s);
        }

        if (r + c == n - 1) {
            boolean antiWin = true;
            for (int i = 0; i < n; i++)
                if (board.getCell(i, n - 1 - i) != s) { antiWin = false; break; }
            if (antiWin) return Optional.of(s);
        }

        return Optional.empty();
    }
}`,c=`// C. TicTacToeGame + Main
class TicTacToeGame {
    private static volatile TicTacToeGame ins;
    private final Board board;
    private final Player[] players = new Player[2];
    private int currentTurn = 0;
    private GameState gameState = GameState.IN_PROGRESS;
    private final Deque<Move> moveHistory = new ArrayDeque<>();
    private final WinStrategy winStrategy;

    private TicTacToeGame(int size, Player p1, Player p2, WinStrategy ws) {
        board = new Board(size);
        players[0] = p1;
        players[1] = p2;
        winStrategy = ws;
    }

    public static TicTacToeGame get(int size, Player p1, Player p2, WinStrategy ws) {
        if (ins == null) { synchronized (TicTacToeGame.class) {
            if (ins == null) ins = new TicTacToeGame(size, p1, p2, ws); } }
        return ins;
    }

    public synchronized boolean makeMove(int row, int col) {
        if (gameState != GameState.IN_PROGRESS) return false;
        Player current = players[currentTurn];
        if (!board.place(row, col, current.getSymbol())) return false;

        Move move = new Move(row, col, current.getSymbol());
        moveHistory.push(move);

        Optional<Symbol> winner = winStrategy.checkWinner(board, move);
        if (winner.isPresent()) {
            gameState = (winner.get() == Symbol.X) ? GameState.X_WINS : GameState.O_WINS;
        } else if (board.isFull()) {
            gameState = GameState.DRAW;
        } else {
            currentTurn = 1 - currentTurn;
        }
        return true;
    }

    public synchronized boolean undo() {
        if (moveHistory.isEmpty()) return false;
        Move last = moveHistory.pop();
        board.resetCell(last.getRow(), last.getCol());
        currentTurn = 1 - currentTurn;
        gameState = GameState.IN_PROGRESS;
        return true;
    }

    public GameState getGameState() { return gameState; }
    public Board getBoard() { return board; }
    public Player getCurrentPlayer() { return players[currentTurn]; }
    public Optional<Player> getWinner() {
        if (gameState == GameState.X_WINS) return Optional.of(players[0]);
        if (gameState == GameState.O_WINS) return Optional.of(players[1]);
        return Optional.empty();
    }
    public synchronized void reset() {
        board.reset();
        moveHistory.clear();
        currentTurn = 0;
        gameState = GameState.IN_PROGRESS;
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        HumanPlayer p1 = new HumanPlayer("Alice", Symbol.X, sc);
        HumanPlayer p2 = new HumanPlayer("Bob", Symbol.O, sc);

        TicTacToeGame game = TicTacToeGame.get(3, p1, p2, new StandardWinStrategy());
        game.getBoard().print();

        int[][] moves = {{0,0},{1,1},{0,1},{1,0},{0,2}};
        for (int[] m : moves) {
            if (!game.makeMove(m[0], m[1])) {
                System.out.println("Invalid move at " + m[0] + "," + m[1]);
                continue;
            }
            game.getBoard().print();
            if (game.getGameState() != GameState.IN_PROGRESS) break;
        }
        System.out.println("State: " + game.getGameState());
        game.getWinner().ifPresent(w -> System.out.println("Winner: " + w.getName()));
    }
}`,l=`-- 4 tables, normalized, minimal

CREATE TABLE games (
  game_id      VARCHAR(20) PRIMARY KEY,
  board_size   INT NOT NULL DEFAULT 3,
  state        ENUM('IN_PROGRESS','X_WINS','O_WINS','DRAW') DEFAULT 'IN_PROGRESS',
  winner_name  VARCHAR(100) NULL,
  started_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  ended_at     TIMESTAMP NULL
);

CREATE TABLE players (
  player_id  VARCHAR(20) PRIMARY KEY,
  game_id    VARCHAR(20) NOT NULL,
  name       VARCHAR(100) NOT NULL,
  symbol     ENUM('X','O') NOT NULL,
  is_ai      BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (game_id) REFERENCES games(game_id)
);
CREATE INDEX idx_player_game ON players(game_id);

CREATE TABLE moves (
  move_id      BIGINT AUTO_INCREMENT PRIMARY KEY,
  game_id      VARCHAR(20) NOT NULL,
  move_number  INT NOT NULL,
  row_idx      INT NOT NULL,
  col_idx      INT NOT NULL,
  symbol       ENUM('X','O') NOT NULL,
  played_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (game_id) REFERENCES games(game_id)
);
CREATE INDEX idx_move_game ON moves(game_id, move_number);

CREATE TABLE game_snapshots (
  snapshot_id  BIGINT AUTO_INCREMENT PRIMARY KEY,
  game_id      VARCHAR(20) NOT NULL,
  move_number  INT NOT NULL,
  board_state  VARCHAR(100) NOT NULL,
  created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (game_id) REFERENCES games(game_id)
);
CREATE INDEX idx_snapshot_game ON game_snapshots(game_id, move_number);`,u=`----------------------------------------
  TicTacToeGame  (Singleton + Facade)
  - board: Board
  - players: List<Player>
  - currentTurn: int
  - moveHistory: Deque<Move>
  - gameState: GameState
  - winStrategy: WinStrategy
  + makeMove(row, col): boolean
  + undo(): boolean
  + getWinner(): Optional<Player>
  + reset()
----------------------------------------
      |owns (board dies with game)
      v
----------------------------------------
  Board                       Symbol (enum)
  - grid: Symbol[N][N]        X, O, EMPTY
  - size: int
  + place(r,c,s)
  + getCell(r,c)
  + isFull()
  + reset()
----------------------------------------

TicTacToeGame --has--> Player (abstract)
  - name, symbol
  - getMove(): Move
  |-- HumanPlayer
  +-- AIPlayer (future)

TicTacToeGame --uses--> WinStrategy (interface)
                         +-- StandardWinStrategy
TicTacToeGame --creates--> Move
  - row, col, symbol, timestamp`,d=r();function f({code:e,lang:t}){let n=(0,a.useRef)(null);return(0,a.useEffect)(()=>{n.current&&(n.current.removeAttribute(`data-highlighted`),i.highlightElement(n.current))},[e]),(0,d.jsxs)(`div`,{className:`tt-code`,children:[(0,d.jsxs)(`div`,{className:`tt-code-head`,children:[(0,d.jsxs)(`span`,{className:`dots`,children:[(0,d.jsx)(`i`,{}),(0,d.jsx)(`i`,{}),(0,d.jsx)(`i`,{})]}),(0,d.jsx)(`span`,{className:`pl-lang`,children:t})]}),(0,d.jsx)(`pre`,{className:`tt-pre`,children:(0,d.jsx)(`code`,{ref:n,className:`language-${t}`,children:e})})]})}var p=({id:e,children:t})=>(0,d.jsx)(`section`,{id:e,className:`tt-section`,children:t}),m=({children:e})=>(0,d.jsx)(`h2`,{className:`tt-h2`,children:e}),h=({children:e})=>(0,d.jsx)(`h3`,{className:`tt-h3`,children:e}),g=({title:e,children:t})=>(0,d.jsxs)(`div`,{className:`tt-bullet`,children:[(0,d.jsx)(`b`,{children:e}),(0,d.jsx)(`span`,{children:t})]}),_=({children:e})=>(0,d.jsx)(`div`,{className:`tt-tip`,children:e});function v(){return(0,d.jsxs)(`div`,{className:`tt-root`,children:[(0,d.jsxs)(`header`,{className:`tt-header`,children:[(0,d.jsx)(n,{to:`/maang/system-design/advanced`,className:`tt-back`,children:`← Back to Advanced System Design`}),(0,d.jsxs)(`h1`,{children:[(0,d.jsx)(`i`,{className:`fas fa-hashtag`}),` Tic-Tac-Toe — LLD `,(0,d.jsxs)(`span`,{className:`tt-badge`,children:[(0,d.jsx)(`i`,{className:`fab fa-java`}),` Java + UML`]})]}),(0,d.jsxs)(`div`,{className:`tt-sub-info`,children:[(0,d.jsxs)(`span`,{children:[(0,d.jsx)(`i`,{className:`fas fa-list-check`}),` 6 Steps`]}),(0,d.jsxs)(`span`,{children:[(0,d.jsx)(`i`,{className:`fas fa-code`}),` Working Java`]}),(0,d.jsxs)(`span`,{children:[(0,d.jsx)(`i`,{className:`fas fa-database`}),` DB Schema`]}),(0,d.jsxs)(`span`,{className:`tt-badge-alt`,children:[(0,d.jsx)(`i`,{className:`fas fa-mouse-pointer`}),` Scroll down`]})]}),(0,d.jsxs)(`nav`,{className:`tt-nav`,children:[(0,d.jsx)(`a`,{href:`#req`,children:`1. Requirements`}),(0,d.jsx)(`a`,{href:`#ent`,children:`2. Entities`}),(0,d.jsx)(`a`,{href:`#uml`,children:`3. Diagram`}),(0,d.jsx)(`a`,{href:`#db`,children:`4. DB`}),(0,d.jsx)(`a`,{href:`#java`,children:`5. Java`}),(0,d.jsx)(`a`,{href:`#wrap`,children:`6. Wrap-up`})]})]}),(0,d.jsxs)(p,{id:`req`,children:[(0,d.jsxs)(m,{children:[(0,d.jsx)(`i`,{className:`fas fa-list-check`}),` Step 1 — Requirements (5 min)`]}),(0,d.jsxs)(`p`,{className:`tt-intro`,children:[(0,d.jsx)(`b`,{children:`What to do:`}),` Pick `,(0,d.jsx)(`b`,{children:`4 functional`}),` + `,(0,d.jsx)(`b`,{children:`3 non-functional`}),`. State what is OUT of scope (online multiplayer, AI opponent, tournament mode).`]}),(0,d.jsx)(h,{children:`Functional — what the system DOES`}),(0,d.jsxs)(g,{title:`1. NxN board (default 3x3)`,children:[`Board holds cells. Each cell is EMPTY, X, or O. Configurable size.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: drives win-check logic — N-in-a-row.`})]}),(0,d.jsxs)(g,{title:`2. Two players alternate turns`,children:[`Player X moves first, then O. Turn flips only on valid move.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: links Board + Player — core game loop.`})]}),(0,d.jsxs)(g,{title:`3. Win detection — row, column, diagonal`,children:[`After every move, check N-in-a-row. If yes, winner declared.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: core rule — must be O(N) not O(N2).`})]}),(0,d.jsxs)(g,{title:`4. Draw detection`,children:[`If board is full and no winner, draw. Game ends.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: closes the loop — every game terminates.`})]}),(0,d.jsx)(h,{children:`Non-Functional — how the system BEHAVES`}),(0,d.jsxs)(g,{title:`1. Immutable move history`,children:[`Every move recorded. Enables undo and replay.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: immutability + audit trail.`})]}),(0,d.jsxs)(g,{title:`2. Extensible`,children:[`New size = param. New win rule = new WinStrategy. New player = subclass.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: shows OCP and DIP.`})]}),(0,d.jsxs)(g,{title:`3. Low latency — O(1) access, O(N) win check`,children:[`Board access O(1). Win check scans only affected lines.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: performance, not just correctness.`})]}),(0,d.jsxs)(_,{children:[(0,d.jsx)(`b`,{children:`Interview line:`}),` Skip online multiplayer, AI opponent, tournament mode unless asked — focus on move, validate, check-win flow.`]})]}),(0,d.jsxs)(p,{id:`ent`,children:[(0,d.jsxs)(m,{children:[(0,d.jsx)(`i`,{className:`fas fa-boxes-stacked`}),` Step 2 — Entities (3 min)`]}),(0,d.jsxs)(`p`,{className:`tt-intro`,children:[(0,d.jsx)(`b`,{children:`Rule:`}),` Take nouns from requirements — each becomes a class.`]}),(0,d.jsxs)(g,{title:`TicTacToeGame (Singleton + Facade)`,children:[`Top-level controller. Holds board, players, turn, history, state.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why Singleton: one game per session.`})]}),(0,d.jsxs)(g,{title:`Board`,children:[`NxN grid of Symbol. Has place, isFull, getCell, reset.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: separates state from game logic.`})]}),(0,d.jsxs)(g,{title:`Player (abstract) + Human/AI`,children:[`Has name, symbol. getMove is abstract.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: player is the actor — Template Method.`})]}),(0,d.jsxs)(g,{title:`Move`,children:[`Has row, col, symbol, timestamp. Immutable.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: the receipt — enables undo and replay.`})]}),(0,d.jsxs)(g,{title:`GameState (enum)`,children:[`IN_PROGRESS, X_WINS, O_WINS, DRAW.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: type-safe status.`})]}),(0,d.jsxs)(g,{title:`WinStrategy + StandardWinStrategy`,children:[`checkWinner scans row, col, diagonals. O(N).`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: Strategy — swap win rules for variants.`})]})]}),(0,d.jsxs)(p,{id:`uml`,children:[(0,d.jsxs)(m,{children:[(0,d.jsx)(`i`,{className:`fas fa-project-diagram`}),` Step 3 — Class Diagram (10 min)`]}),(0,d.jsx)(`p`,{className:`tt-intro`,children:`Draw this on the whiteboard. Relationships are the key signal:`}),(0,d.jsx)(f,{code:u,lang:`text`}),(0,d.jsxs)(_,{children:[(0,d.jsx)(`b`,{children:`Key relationship:`}),` Game to Board is Composition. Game to Player is Association. Strategy is Dependency (DIP).`]})]}),(0,d.jsxs)(p,{id:`db`,children:[(0,d.jsxs)(m,{children:[(0,d.jsx)(`i`,{className:`fas fa-database`}),` Step 4 — DB Design (5 min)`]}),(0,d.jsx)(`p`,{className:`tt-intro`,children:`Even for in-memory LLD, show you can persist it. 4 normalized tables:`}),(0,d.jsx)(f,{code:l,lang:`sql`}),(0,d.jsxs)(g,{title:`idx_move_game`,children:[`Makes move-history replay O(log n).`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: replay without full scan.`})]}),(0,d.jsxs)(g,{title:`game_snapshots with board_state`,children:[`Enables undo by restoring state. Compact string.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: portable snapshots.`})]}),(0,d.jsxs)(g,{title:`board_size in games`,children:[`Denormalized for quick queries.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: read optimization.`})]})]}),(0,d.jsxs)(p,{id:`java`,children:[(0,d.jsxs)(m,{children:[(0,d.jsx)(`i`,{className:`fab fa-java`}),` Step 5 — Java Code (20-25 min)`]}),(0,d.jsx)(`p`,{className:`tt-intro`,children:`Minimal working Java. Skip boilerplate getters unless asked:`}),(0,d.jsx)(h,{children:`Block A — Enums + Board + Player`}),(0,d.jsx)(f,{code:o,lang:`java`}),(0,d.jsx)(h,{children:`Block B — Move + WinStrategy`}),(0,d.jsx)(f,{code:s,lang:`java`}),(0,d.jsx)(h,{children:`Block C — TicTacToeGame + Main`}),(0,d.jsx)(f,{code:c,lang:`java`})]}),(0,d.jsxs)(p,{id:`wrap`,children:[(0,d.jsxs)(m,{children:[(0,d.jsx)(`i`,{className:`fas fa-flag-checkered`}),` Step 6 — Wrap-up (3 min)`]}),(0,d.jsx)(`p`,{className:`tt-intro`,children:`Be ready to answer these without thinking:`}),(0,d.jsxs)(g,{title:`Concurrency — two moves at once?`,children:[`makeMove is synchronized. Per-game lock for online.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: validation + execution atomic.`})]}),(0,d.jsxs)(g,{title:`How does win detection work?`,children:[`Check only affected row, col, diagonals. O(N).`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: swap strategy for 4-in-a-row variants.`})]}),(0,d.jsxs)(g,{title:`How would you add an AI player?`,children:[`AIPlayer extends Player, override getMove with minimax.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: OCP in action.`})]}),(0,d.jsxs)(g,{title:`Patterns used + SOLID`,children:[`Singleton, Strategy, Composition, Template Method.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: naming patterns shows vocabulary.`})]}),(0,d.jsxs)(_,{children:[(0,d.jsx)(`b`,{children:`Scorecard:`}),` Requirements (5) + Entities (3) + Diagram (10) + DB (5) + Code (20) + Wrap-up (3) = 46 min.`]})]}),(0,d.jsx)(`footer`,{className:`tt-footer`,children:(0,d.jsx)(n,{to:`/maang/system-design/advanced`,children:`Back to Advanced System Design`})})]})}export{v as default};