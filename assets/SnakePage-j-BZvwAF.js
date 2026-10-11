import{r as e}from"./rolldown-runtime-QTnfLwEv.js";import{h as t,r as n,u as r}from"./index-Dka5w6n9.js";import{t as i}from"./atom-one-dark-C84iCW6D.js";var a=e(t(),1),o=`// A. Enums + Player + Board
import java.util.*;

enum GameState { IN_PROGRESS, FINISHED }

class Player {
    private final int id;
    private final String name;
    private int position = 0;
    Player(int id, String n) { this.id = id; name = n; }
    public int getId() { return id; }
    public String getName() { return name; }
    public int getPosition() { return position; }
    public void setPosition(int p) { position = p; }
}

class Board {
    private final int size;
    private final Map<Integer, Integer> snakes = new HashMap<>();
    private final Map<Integer, Integer> ladders = new HashMap<>();

    Board(int s) { size = s; }
    public int getSize() { return size; }

    public void addSnake(int head, int tail) {
        if (head <= tail) throw new IllegalArgumentException("Snake head must be > tail");
        snakes.put(head, tail);
    }
    public void addLadder(int start, int end) {
        if (start >= end) throw new IllegalArgumentException("Ladder start must be < end");
        ladders.put(start, end);
    }

    public int getNextPosition(int pos) {
        if (snakes.containsKey(pos)) return snakes.get(pos);
        if (ladders.containsKey(pos)) return ladders.get(pos);
        return pos;
    }
    public boolean isSnake(int pos) { return snakes.containsKey(pos); }
    public boolean isLadder(int pos) { return ladders.containsKey(pos); }
}`,s=`// B. Dice strategies + Move
interface Dice {
    int roll();
}

class StandardDice implements Dice {
    private final Random random = new Random();
    public int roll() { return random.nextInt(6) + 1; }
}

class LoadedDice implements Dice {
    private final int fixed;
    LoadedDice(int f) { fixed = f; }
    public int roll() { return fixed; }
}

class MultiDice implements Dice {
    private final List<Dice> dice;
    MultiDice(List<Dice> d) { dice = d; }
    public int roll() {
        int sum = 0;
        for (Dice d : dice) sum += d.roll();
        return sum;
    }
}

class Move {
    private final Player player;
    private final int diceValue;
    private final int fromPos;
    private final int toPos;
    private final boolean jumped;
    private final long timestamp;

    Move(Player p, int d, int from, int to, boolean j) {
        player = p; diceValue = d; fromPos = from; toPos = to; jumped = j;
        timestamp = System.currentTimeMillis();
    }
    public Player getPlayer() { return player; }
    public int getDiceValue() { return diceValue; }
    public int getFromPos() { return fromPos; }
    public int getToPos() { return toPos; }
    public boolean isJumped() { return jumped; }
    public long getTimestamp() { return timestamp; }
}`,c=`// C. SnakeLadderGame + Main
class SnakeLadderGame {
    private static volatile SnakeLadderGame ins;
    private final Board board;
    private final List<Player> players;
    private final Dice dice;
    private int currentTurn = 0;
    private GameState gameState = GameState.IN_PROGRESS;
    private final List<Move> moveHistory = new ArrayList<>();

    private SnakeLadderGame(Board b, List<Player> p, Dice d) {
        board = b; players = p; dice = d;
    }

    public static SnakeLadderGame get(Board b, List<Player> p, Dice d) {
        if (ins == null) { synchronized (SnakeLadderGame.class) {
            if (ins == null) ins = new SnakeLadderGame(b, p, d); } }
        return ins;
    }

    public synchronized Move playTurn() {
        if (gameState == GameState.FINISHED) return null;
        Player current = players.get(currentTurn);
        int from = current.getPosition();
        int roll = dice.roll();
        int raw = from + roll;

        int landed;
        if (raw > board.getSize()) {
            landed = from;
        } else {
            landed = raw;
        }

        int finalPos = board.getNextPosition(landed);
        boolean jumped = finalPos != landed;
        current.setPosition(finalPos);

        Move move = new Move(current, roll, from, finalPos, jumped);
        moveHistory.add(move);

        System.out.println(current.getName() + " rolled " + roll
                + " -> moved from " + from + " to " + landed
                + (jumped ? (" -> jumped to " + finalPos) : ""));

        if (finalPos == board.getSize()) {
            gameState = GameState.FINISHED;
            System.out.println(current.getName() + " WINS!");
        } else {
            currentTurn = (currentTurn + 1) % players.size();
        }
        return move;
    }

    public Optional<Player> getWinner() {
        if (gameState == GameState.FINISHED) {
            for (Player p : players)
                if (p.getPosition() == board.getSize()) return Optional.of(p);
        }
        return Optional.empty();
    }

    public GameState getGameState() { return gameState; }
    public Player getCurrentPlayer() { return players.get(currentTurn); }
    public List<Move> getMoveHistory() { return moveHistory; }

    public synchronized void reset() {
        for (Player p : players) p.setPosition(0);
        moveHistory.clear();
        currentTurn = 0;
        gameState = GameState.IN_PROGRESS;
    }
}

public class Main {
    public static void main(String[] args) {
        Board board = new Board(100);
        board.addSnake(99, 54);
        board.addSnake(70, 55);
        board.addSnake(52, 42);
        board.addSnake(25, 2);
        board.addLadder(6, 25);
        board.addLadder(11, 40);
        board.addLadder(60, 85);
        board.addLadder(46, 90);

        List<Player> players = List.of(
                new Player(1, "Alice"),
                new Player(2, "Bob"));

        SnakeLadderGame game = SnakeLadderGame.get(board, players, new StandardDice());

        int turns = 0;
        while (game.getGameState() != GameState.FINISHED && turns < 200) {
            game.playTurn();
            turns++;
        }
        game.getWinner().ifPresent(w ->
                System.out.println("Winner: " + w.getName() + " after " + turns + " turns"));
    }
}`,l=`-- 5 tables, normalized, minimal

CREATE TABLE games (
  game_id      VARCHAR(20) PRIMARY KEY,
  board_size   INT NOT NULL DEFAULT 100,
  state        ENUM('IN_PROGRESS','FINISHED') DEFAULT 'IN_PROGRESS',
  winner_name  VARCHAR(100) NULL,
  started_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  ended_at     TIMESTAMP NULL
);

CREATE TABLE players (
  player_id  VARCHAR(20) PRIMARY KEY,
  game_id    VARCHAR(20) NOT NULL,
  name       VARCHAR(100) NOT NULL,
  position   INT NOT NULL DEFAULT 0,
  turn_order INT NOT NULL,
  FOREIGN KEY (game_id) REFERENCES games(game_id)
);
CREATE INDEX idx_player_game ON players(game_id, turn_order);

CREATE TABLE board_config (
  config_id  BIGINT AUTO_INCREMENT PRIMARY KEY,
  game_id    VARCHAR(20) NOT NULL,
  type       ENUM('SNAKE','LADDER') NOT NULL,
  start_pos  INT NOT NULL,
  end_pos    INT NOT NULL,
  FOREIGN KEY (game_id) REFERENCES games(game_id)
);
CREATE INDEX idx_config_game ON board_config(game_id);

CREATE TABLE moves (
  move_id      BIGINT AUTO_INCREMENT PRIMARY KEY,
  game_id      VARCHAR(20) NOT NULL,
  player_id    VARCHAR(20) NOT NULL,
  move_number  INT NOT NULL,
  dice_value   INT NOT NULL,
  from_pos     INT NOT NULL,
  to_pos       INT NOT NULL,
  jumped       BOOLEAN DEFAULT FALSE,
  played_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (game_id) REFERENCES games(game_id),
  FOREIGN KEY (player_id) REFERENCES players(player_id)
);
CREATE INDEX idx_move_game ON moves(game_id, move_number);

CREATE TABLE game_snapshots (
  snapshot_id  BIGINT AUTO_INCREMENT PRIMARY KEY,
  game_id      VARCHAR(20) NOT NULL,
  move_number  INT NOT NULL,
  positions    VARCHAR(255) NOT NULL,
  created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (game_id) REFERENCES games(game_id)
);
CREATE INDEX idx_snapshot_game ON game_snapshots(game_id, move_number);`,u=`----------------------------------------
  SnakeLadderGame  (Singleton + Facade)
  - board: Board
  - players: List<Player>
  - dice: Dice
  - currentTurn: int
  - moveHistory: List<Move>
  - gameState: GameState
  + playTurn(): Move
  + getWinner(): Optional<Player>
  + reset()
----------------------------------------
      |owns (board dies with game)
      v
----------------------------------------
  Board
  - size: int
  - snakes: Map<Int,Int>
  - ladders: Map<Int,Int>
  + getNextPosition()
  + addSnake()
  + addLadder()
----------------------------------------

SnakeLadderGame --has--> Player
  - id, name, position

SnakeLadderGame --uses--> Dice (interface)
  |-- StandardDice
  |-- LoadedDice
  +-- MultiDice
SnakeLadderGame --creates--> Move
  - player, diceValue, fromPos, toPos, jumped, timestamp`,d=n();function f({code:e,lang:t}){let n=(0,a.useRef)(null);return(0,a.useEffect)(()=>{n.current&&(n.current.removeAttribute(`data-highlighted`),i.highlightElement(n.current))},[e]),(0,d.jsxs)(`div`,{className:`sn-code`,children:[(0,d.jsxs)(`div`,{className:`sn-code-head`,children:[(0,d.jsxs)(`span`,{className:`dots`,children:[(0,d.jsx)(`i`,{}),(0,d.jsx)(`i`,{}),(0,d.jsx)(`i`,{})]}),(0,d.jsx)(`span`,{className:`pl-lang`,children:t})]}),(0,d.jsx)(`pre`,{className:`sn-pre`,children:(0,d.jsx)(`code`,{ref:n,className:`language-${t}`,children:e})})]})}var p=({id:e,children:t})=>(0,d.jsx)(`section`,{id:e,className:`sn-section`,children:t}),m=({children:e})=>(0,d.jsx)(`h2`,{className:`sn-h2`,children:e}),h=({children:e})=>(0,d.jsx)(`h3`,{className:`sn-h3`,children:e}),g=({title:e,children:t})=>(0,d.jsxs)(`div`,{className:`sn-bullet`,children:[(0,d.jsx)(`b`,{children:e}),(0,d.jsx)(`span`,{children:t})]}),_=({children:e})=>(0,d.jsx)(`div`,{className:`sn-tip`,children:e});function v(){return(0,d.jsxs)(`div`,{className:`sn-root`,children:[(0,d.jsxs)(`header`,{className:`sn-header`,children:[(0,d.jsx)(r,{to:`/maang/system-design/advanced`,className:`sn-back`,children:`← Back to Advanced System Design`}),(0,d.jsxs)(`h1`,{children:[(0,d.jsx)(`i`,{className:`fas fa-worm`}),` Snake and Ladder — LLD `,(0,d.jsxs)(`span`,{className:`sn-badge`,children:[(0,d.jsx)(`i`,{className:`fab fa-java`}),` Java + UML`]})]}),(0,d.jsxs)(`div`,{className:`sn-sub-info`,children:[(0,d.jsxs)(`span`,{children:[(0,d.jsx)(`i`,{className:`fas fa-list-check`}),` 6 Steps`]}),(0,d.jsxs)(`span`,{children:[(0,d.jsx)(`i`,{className:`fas fa-code`}),` Working Java`]}),(0,d.jsxs)(`span`,{children:[(0,d.jsx)(`i`,{className:`fas fa-database`}),` DB Schema`]}),(0,d.jsxs)(`span`,{className:`sn-badge-alt`,children:[(0,d.jsx)(`i`,{className:`fas fa-mouse-pointer`}),` Scroll down`]})]}),(0,d.jsxs)(`nav`,{className:`sn-nav`,children:[(0,d.jsx)(`a`,{href:`#req`,children:`1. Requirements`}),(0,d.jsx)(`a`,{href:`#ent`,children:`2. Entities`}),(0,d.jsx)(`a`,{href:`#uml`,children:`3. Diagram`}),(0,d.jsx)(`a`,{href:`#db`,children:`4. DB`}),(0,d.jsx)(`a`,{href:`#java`,children:`5. Java`}),(0,d.jsx)(`a`,{href:`#wrap`,children:`6. Wrap-up`})]})]}),(0,d.jsxs)(p,{id:`req`,children:[(0,d.jsxs)(m,{children:[(0,d.jsx)(`i`,{className:`fas fa-list-check`}),` Step 1 — Requirements (5 min)`]}),(0,d.jsxs)(`p`,{className:`sn-intro`,children:[(0,d.jsx)(`b`,{children:`What to do:`}),` Pick `,(0,d.jsx)(`b`,{children:`4 functional`}),` + `,(0,d.jsx)(`b`,{children:`3 non-functional`}),`. State what is OUT of scope (online multiplayer, tournament mode, custom board editor).`]}),(0,d.jsx)(h,{children:`Functional — what the system DOES`}),(0,d.jsxs)(g,{title:`1. Board with 100 cells + snakes/ladders`,children:[`10x10 = 100 cells. Snakes move down, ladders move up. Configurable map.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: drives the jump logic — core of the game.`})]}),(0,d.jsxs)(g,{title:`2. 2-4 players alternate turns`,children:[`Each starts at 0. Roll dice, move, check snake/ladder, check win.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: links Board + Player + Dice — core loop.`})]}),(0,d.jsxs)(g,{title:`3. Dice roll (1-6) + exact win`,children:[`Dice gives 1-6. Must land exactly on 100. Overshoot stays.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: classic rule — shows you know the game.`})]}),(0,d.jsxs)(g,{title:`4. Win detection`,children:[`First player to reach 100 wins. Game ends immediately.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: closes the loop — every game terminates.`})]}),(0,d.jsx)(h,{children:`Non-Functional — how the system BEHAVES`}),(0,d.jsxs)(g,{title:`1. Immutable move history`,children:[`Every turn recorded. Enables replay and audit.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: immutability + audit trail.`})]}),(0,d.jsxs)(g,{title:`2. Extensible`,children:[`New dice = new DiceStrategy. New board = new setup strategy.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: shows OCP and DIP.`})]}),(0,d.jsxs)(g,{title:`3. Low latency — O(1) lookup`,children:[`Board jumps via HashMap — O(1) snake/ladder lookup.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: performance, not just correctness.`})]}),(0,d.jsxs)(_,{children:[(0,d.jsx)(`b`,{children:`Interview line:`}),` Skip online multiplayer, tournament mode, custom editor unless asked — focus on roll, move, jump, win flow.`]})]}),(0,d.jsxs)(p,{id:`ent`,children:[(0,d.jsxs)(m,{children:[(0,d.jsx)(`i`,{className:`fas fa-boxes-stacked`}),` Step 2 — Entities (3 min)`]}),(0,d.jsxs)(`p`,{className:`sn-intro`,children:[(0,d.jsx)(`b`,{children:`Rule:`}),` Take nouns from requirements — each becomes a class.`]}),(0,d.jsxs)(g,{title:`SnakeLadderGame (Singleton + Facade)`,children:[`Top-level controller. Holds board, players, dice, turn.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why Singleton: one game per session.`})]}),(0,d.jsxs)(g,{title:`Board`,children:[`Holds size + snakes/ladders map. Has getNextPosition.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: separates config from game logic.`})]}),(0,d.jsxs)(g,{title:`Player`,children:[`Has name, id, current position. Mutable state.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: player is the actor — owns position.`})]}),(0,d.jsxs)(g,{title:`Move`,children:[`Has player, dice, fromPos, toPos, jumped. Immutable.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: the receipt — enables replay.`})]}),(0,d.jsxs)(g,{title:`Dice + Standard/Loaded/Multi`,children:[`roll() returns int. Strategy pattern.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: swap dice behavior for variants.`})]}),(0,d.jsxs)(g,{title:`GameState (enum)`,children:[`IN_PROGRESS, FINISHED.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: type-safe status.`})]})]}),(0,d.jsxs)(p,{id:`uml`,children:[(0,d.jsxs)(m,{children:[(0,d.jsx)(`i`,{className:`fas fa-project-diagram`}),` Step 3 — Class Diagram (10 min)`]}),(0,d.jsx)(`p`,{className:`sn-intro`,children:`Draw this on the whiteboard. Relationships are the key signal:`}),(0,d.jsx)(f,{code:u,lang:`text`}),(0,d.jsxs)(_,{children:[(0,d.jsx)(`b`,{children:`Key relationship:`}),` Game to Board is Composition. Game to Dice is Dependency (DIP). Dice subclasses are Inheritance.`]})]}),(0,d.jsxs)(p,{id:`db`,children:[(0,d.jsxs)(m,{children:[(0,d.jsx)(`i`,{className:`fas fa-database`}),` Step 4 — DB Design (5 min)`]}),(0,d.jsx)(`p`,{className:`sn-intro`,children:`Even for in-memory LLD, show you can persist it. 5 normalized tables:`}),(0,d.jsx)(f,{code:l,lang:`sql`}),(0,d.jsxs)(g,{title:`idx_move_game`,children:[`Makes move-history replay O(log n).`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: replay without full scan.`})]}),(0,d.jsxs)(g,{title:`board_config separate table`,children:[`Snakes and ladders are per-game config. Normalized.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: enables custom boards.`})]}),(0,d.jsxs)(g,{title:`turn_order in players`,children:[`Fixes turn sequence. No insertion-order reliance.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: deterministic ordering.`})]})]}),(0,d.jsxs)(p,{id:`java`,children:[(0,d.jsxs)(m,{children:[(0,d.jsx)(`i`,{className:`fab fa-java`}),` Step 5 — Java Code (20-25 min)`]}),(0,d.jsx)(`p`,{className:`sn-intro`,children:`Minimal working Java. Skip boilerplate getters unless asked:`}),(0,d.jsx)(h,{children:`Block A — Enums + Player + Board`}),(0,d.jsx)(f,{code:o,lang:`java`}),(0,d.jsx)(h,{children:`Block B — Dice + Move`}),(0,d.jsx)(f,{code:s,lang:`java`}),(0,d.jsx)(h,{children:`Block C — SnakeLadderGame + Main`}),(0,d.jsx)(f,{code:c,lang:`java`})]}),(0,d.jsxs)(p,{id:`wrap`,children:[(0,d.jsxs)(m,{children:[(0,d.jsx)(`i`,{className:`fas fa-flag-checkered`}),` Step 6 — Wrap-up (3 min)`]}),(0,d.jsx)(`p`,{className:`sn-intro`,children:`Be ready to answer these without thinking:`}),(0,d.jsxs)(g,{title:`Concurrency — two rolls at once?`,children:[`playTurn is synchronized. Sequential turns — no parallel rolls.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: turn order is strict.`})]}),(0,d.jsxs)(g,{title:`How does snake/ladder jump work?`,children:[`getNextPosition checks snakes then ladders. O(1) HashMap.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: the core rule.`})]}),(0,d.jsxs)(g,{title:`What if roll overshoots 100?`,children:[`Player stays. Exact landing required.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: classic rule — prevents trivial wins.`})]}),(0,d.jsxs)(g,{title:`Patterns used + SOLID`,children:[`Singleton, Strategy, Composition, Encapsulation.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: naming patterns shows vocabulary.`})]}),(0,d.jsxs)(_,{children:[(0,d.jsx)(`b`,{children:`Scorecard:`}),` Requirements (5) + Entities (3) + Diagram (10) + DB (5) + Code (20) + Wrap-up (3) = 46 min.`]})]}),(0,d.jsx)(`footer`,{className:`sn-footer`,children:(0,d.jsx)(r,{to:`/maang/system-design/advanced`,children:`Back to Advanced System Design`})})]})}export{v as default};