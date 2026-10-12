import{r as e}from"./rolldown-runtime-QTnfLwEv.js";import{t}from"./react-CZI7_Jkm.js";import{r as n,s as r}from"./index-yz2jrTMK.js";import{t as i}from"./atom-one-dark-CL0A0LnX.js";var a=e(t(),1),o=`// === Enums ===
enum Direction { UP, DOWN, IDLE }
enum ElevatorState { MOVING, STOPPED, DOOR_OPEN, DOOR_CLOSED }
enum DoorState { OPEN, CLOSED }

// === Request: someone pressed a button ===
class Request {
    int floor;          // which floor pressed
    Direction dir;      // UP or DOWN (for external button)
    boolean internal;   // true = inside elevator, false = floor button
    long time;          // when pressed (for FIFO)

    Request(int f, Direction d, boolean internal) {
        this.floor = f; this.dir = d;
        this.internal = internal;
        this.time = System.currentTimeMillis();
    }
}

// === Elevator: one box that moves ===
class Elevator {
    int id;
    int currentFloor = 1;
    Direction direction = Direction.IDLE;
    DoorState door = DoorState.CLOSED;
    List<Integer> targetFloors = new ArrayList<>(); // floors to stop

    Elevator(int id) { this.id = id; }

    // Add a floor to stop at
    void addTarget(int floor) {
        if (!targetFloors.contains(floor)) targetFloors.add(floor);
    }

    // Move one floor in current direction
    void move() {
        if (direction == Direction.UP) currentFloor++;
        else if (direction == Direction.DOWN) currentFloor--;
    }

    // Open door, let people in/out, close door
    void openDoor() { door = DoorState.OPEN; }
    void closeDoor() { door = DoorState.CLOSED; }
}`,s=`// === SchedulingStrategy interface ===
// Why interface? You can swap "nearest elevator" with "SCAN algorithm"
// without touching ElevatorController — Open/Closed Principle
interface SchedulingStrategy {
    Elevator selectElevator(List<Elevator> elevators, Request req);
}

// === Nearest Elevator Strategy ===
// Pick the elevator closest to request floor, preferring same direction
class NearestElevatorStrategy implements SchedulingStrategy {
    public Elevator selectElevator(List<Elevator> elevators, Request req) {
        Elevator best = null;
        int minDist = Integer.MAX_VALUE;
        for (Elevator e : elevators) {
            int dist = Math.abs(e.currentFloor - req.floor);
            // Prefer elevator going same direction or IDLE
            boolean sameDir = (e.direction == req.dir) || (e.direction == Direction.IDLE);
            if (sameDir && dist < minDist) {
                minDist = dist; best = e;
            }
        }
        // If no same-direction found, just pick nearest
        if (best == null) {
            for (Elevator e : elevators) {
                int dist = Math.abs(e.currentFloor - req.floor);
                if (dist < minDist) { minDist = dist; best = e; }
            }
        }
        return best;
    }
}

// === ElevatorController: the boss ===
// Holds all elevators + assigns requests using strategy
class ElevatorController {
    List<Elevator> elevators;
    SchedulingStrategy strategy;

    ElevatorController(int numElevators, SchedulingStrategy strategy) {
        this.strategy = strategy;
        this.elevators = new ArrayList<>();
        for (int i = 0; i < numElevators; i++)
            elevators.add(new Elevator(i + 1));
    }

    // External button pressed on floor (up/down)
    void requestElevator(int floor, Direction dir) {
        Request req = new Request(floor, dir, false);
        Elevator e = strategy.selectElevator(elevators, req);
        if (e != null) {
            e.addTarget(floor);
            updateDirection(e);
        }
    }

    // Internal button pressed inside elevator (floor number)
    void requestFloor(Elevator e, int floor) {
        e.addTarget(floor);
        updateDirection(e);
    }

    // Decide which way elevator should go based on targets
    void updateDirection(Elevator e) {
        if (e.targetFloors.isEmpty()) { e.direction = Direction.IDLE; return; }
        int next = e.targetFloors.get(0);
        e.direction = (next > e.currentFloor) ? Direction.UP : Direction.DOWN;
    }

    // Process one step: move elevators, open doors at target
    void step() {
        for (Elevator e : elevators) {
            if (e.targetFloors.isEmpty()) { e.direction = Direction.IDLE; continue; }
            if (e.currentFloor == e.targetFloors.get(0)) {
                e.openDoor();
                e.targetFloors.remove(0);
                e.closeDoor();
            } else {
                e.move();
            }
        }
    }
}`,c=`// === Building: top-level container ===
class Building {
    ElevatorController controller;
    int numFloors;

    Building(int numFloors, int numElevators) {
        this.numFloors = numFloors;
        this.controller = new ElevatorController(
            numElevators, new NearestElevatorStrategy());
    }

    // Floor button pressed (up/down)
    void pressFloorButton(int floor, Direction dir) {
        System.out.println("Floor " + floor + " pressed " + dir);
        controller.requestElevator(floor, dir);
    }

    // Elevator button pressed (inside elevator)
    void pressElevatorButton(int elevatorId, int floor) {
        Elevator e = controller.elevators.get(elevatorId - 1);
        System.out.println("Elevator " + elevatorId + " pressed floor " + floor);
        controller.requestFloor(e, floor);
    }

    // Run one tick of simulation
    void tick() { controller.step(); }

    // Print status of all elevators
    void printStatus() {
        for (Elevator e : controller.elevators) {
            System.out.println("Elevator " + e.id + ": Floor " +
                e.currentFloor + " | " + e.direction + " | Targets: " +
                e.targetFloors);
        }
        System.out.println("---");
    }
}

// === Demo ===
public class Main {
    public static void main(String[] args) {
        // 10 floors, 3 elevators
        Building building = new Building(10, 3);

        // Floor 5 wants to go UP
        building.pressFloorButton(5, Direction.UP);
        building.printStatus();

        // Floor 3 wants to go DOWN
        building.pressFloorButton(3, Direction.DOWN);

        // Elevator 1 pressed floor 7 (internal)
        building.pressElevatorButton(1, 7);

        // Run simulation for 10 ticks
        for (int i = 0; i < 10; i++) {
            building.tick();
            building.printStatus();
        }
    }
}`,l=`-- ELEVATOR SYSTEM — Database Schema
-- 4 tables: buildings, elevators, elevator_log, requests

CREATE TABLE buildings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    num_floors INT NOT NULL,
    num_elevators INT NOT NULL
);

CREATE TABLE elevators (
    id INT PRIMARY KEY AUTO_INCREMENT,
    building_id INT NOT NULL,
    current_floor INT DEFAULT 1,
    direction ENUM('UP','DOWN','IDLE') DEFAULT 'IDLE',
    door_state ENUM('OPEN','CLOSED') DEFAULT 'CLOSED',
    state ENUM('MOVING','STOPPED','DOOR_OPEN','DOOR_CLOSED') DEFAULT 'STOPPED',
    FOREIGN KEY (building_id) REFERENCES buildings(id)
);

CREATE TABLE elevator_log (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    elevator_id INT NOT NULL,
    from_floor INT,
    to_floor INT,
    direction ENUM('UP','DOWN','IDLE'),
    event_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (elevator_id) REFERENCES elevators(id)
);

CREATE TABLE requests (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    building_id INT NOT NULL,
    floor_num INT NOT NULL,
    direction ENUM('UP','DOWN') NOT NULL,
    assigned_elevator INT NULL,
    request_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_time TIMESTAMP NULL,
    status ENUM('PENDING','ASSIGNED','COMPLETED') DEFAULT 'PENDING',
    FOREIGN KEY (building_id) REFERENCES buildings(id),
    FOREIGN KEY (assigned_elevator) REFERENCES elevators(id)
);
CREATE INDEX idx_req_pending ON requests(status) WHERE status = 'PENDING';`,u=`┌─────────────────────────────────────────────────────┐
│                    Building                         │
│  - numFloors: int                                   │
│  - controller: ElevatorController                   │
│  + pressFloorButton(floor, dir)                     │
│  + pressElevatorButton(elevId, floor)               │
│  + tick()                                           │
└────────────────────┬────────────────────────────────┘
                     │ 1 owns 1
                     ▼
┌─────────────────────────────────────────────────────┐
│              ElevatorController                     │
│  - elevators: List<Elevator>                        │
│  - strategy: SchedulingStrategy                     │
│  + requestElevator(floor, dir)                      │
│  + requestFloor(e, floor)                           │
│  + step()                                           │
└───────┬──────────────────────────────┬──────────────┘
        │ 1 uses *                    │ 1 uses 1
        ▼                              ▼
┌──────────────────┐      ┌──────────────────────────┐
│    Elevator      │      │   «interface»             │
│  - id: int       │      │  SchedulingStrategy       │
│  - currentFloor  │      │  + selectElevator(list,req)│
│  - direction     │      └────────────┬─────────────┘
│  - door          │                   │ implements
│  - targetFloors  │                   ▼
│  + move()        │      ┌──────────────────────────┐
│  + openDoor()    │      │ NearestElevatorStrategy   │
│  + closeDoor()   │      │  + selectElevator(list,req)│
└──────────────────┘      └──────────────────────────┘

┌──────────────────┐      ┌──────────────────────────┐
│     Request      │      │        Enums              │
│  - floor: int    │      │  Direction: UP,DOWN,IDLE  │
│  - dir: Direction│      │  ElevatorState: MOVING... │
│  - internal: bool│      │  DoorState: OPEN,CLOSED   │
│  - time: long    │      └──────────────────────────┘
└──────────────────┘

Relationships:
  Building 1 ── 1 ElevatorController  (Composition)
  ElevatorController 1 ── * Elevator  (Composition)
  ElevatorController ── SchedulingStrategy  (Dependency / DIP)
  Request ── Elevator  (Association: assigned)`,d=n();function f({code:e,lang:t}){let n=(0,a.useRef)(null);return(0,a.useEffect)(()=>{n.current&&(n.current.removeAttribute(`data-highlighted`),i.highlightElement(n.current))},[e]),(0,d.jsxs)(`div`,{className:`el-code`,children:[(0,d.jsxs)(`div`,{className:`el-code-head`,children:[(0,d.jsxs)(`span`,{className:`dots`,children:[(0,d.jsx)(`i`,{}),(0,d.jsx)(`i`,{}),(0,d.jsx)(`i`,{})]}),(0,d.jsx)(`span`,{className:`pl-lang`,children:t})]}),(0,d.jsx)(`pre`,{className:`el-pre`,children:(0,d.jsx)(`code`,{ref:n,className:`language-${t}`,children:e})})]})}var p=({id:e,children:t})=>(0,d.jsx)(`section`,{id:e,className:`el-section`,children:t}),m=({children:e})=>(0,d.jsx)(`h2`,{className:`el-h2`,children:e}),h=({children:e})=>(0,d.jsx)(`h3`,{className:`el-h3`,children:e}),g=({title:e,children:t})=>(0,d.jsxs)(`div`,{className:`el-bullet`,children:[(0,d.jsx)(`b`,{children:e}),(0,d.jsx)(`span`,{children:t})]}),_=({children:e})=>(0,d.jsx)(`div`,{className:`el-tip`,children:e});function v(){return(0,d.jsxs)(`div`,{className:`el-root`,children:[(0,d.jsxs)(`header`,{className:`el-header`,children:[(0,d.jsx)(r,{to:`/maang/system-design/advanced`,className:`el-back`,children:`← Back to Advanced System Design`}),(0,d.jsxs)(`h1`,{children:[(0,d.jsx)(`i`,{className:`fas fa-elevator`}),` Elevator System — LLD `,(0,d.jsxs)(`span`,{className:`el-badge`,children:[(0,d.jsx)(`i`,{className:`fab fa-java`}),` Java + UML`]})]}),(0,d.jsxs)(`div`,{className:`el-sub-info`,children:[(0,d.jsxs)(`span`,{children:[(0,d.jsx)(`i`,{className:`fas fa-list-check`}),` 6 Steps`]}),(0,d.jsxs)(`span`,{children:[(0,d.jsx)(`i`,{className:`fas fa-code`}),` Working Java`]}),(0,d.jsxs)(`span`,{children:[(0,d.jsx)(`i`,{className:`fas fa-database`}),` DB Schema`]}),(0,d.jsxs)(`span`,{className:`el-badge-alt`,children:[(0,d.jsx)(`i`,{className:`fas fa-mouse-pointer`}),` Scroll down`]})]}),(0,d.jsxs)(`nav`,{className:`el-nav`,children:[(0,d.jsx)(`a`,{href:`#req`,children:`1. Requirements`}),(0,d.jsx)(`a`,{href:`#ent`,children:`2. Entities`}),(0,d.jsx)(`a`,{href:`#uml`,children:`3. Diagram`}),(0,d.jsx)(`a`,{href:`#db`,children:`4. DB`}),(0,d.jsx)(`a`,{href:`#java`,children:`5. Java`}),(0,d.jsx)(`a`,{href:`#wrap`,children:`6. Wrap-up`})]})]}),(0,d.jsxs)(p,{id:`req`,children:[(0,d.jsxs)(m,{children:[(0,d.jsx)(`i`,{className:`fas fa-list-check`}),` Step 1 — Requirements (5 min)`]}),(0,d.jsxs)(`p`,{className:`el-intro`,children:[(0,d.jsx)(`b`,{children:`What to do:`}),` Pick `,(0,d.jsx)(`b`,{children:`4 functional`}),` + `,(0,d.jsx)(`b`,{children:`3 non-functional`}),`. State what is OUT of scope.`]}),(0,d.jsx)(h,{children:`Functional — what the system DOES`}),(0,d.jsxs)(g,{title:`1. Multi-elevator building, N floors`,children:[`Building has multiple elevators (1 to M) and floors (1 to N). Each elevator moves between floors, picks up and drops passengers.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: drives the scheduling algorithm.`})]}),(0,d.jsxs)(g,{title:`2. External buttons — Up/Down on each floor`,children:[`Every floor has UP and DOWN buttons. Pressing one calls an elevator. System assigns nearest available.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: main input — triggers scheduling strategy.`})]}),(0,d.jsxs)(g,{title:`3. Internal buttons — floor numbers + open/close`,children:[`Inside each elevator: buttons for every floor, plus DOOR OPEN and DOOR CLOSE.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: internal requests queued per elevator, processed in order.`})]}),(0,d.jsxs)(g,{title:`4. Display current floor + direction per elevator`,children:[`Each elevator shows current floor and direction (UP/DOWN/IDLE) on display panel.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: feedback loop — users need to know where elevators are.`})]}),(0,d.jsx)(h,{children:`Non-Functional — how the system BEHAVES`}),(0,d.jsxs)(g,{title:`1. Thread-safe request handling`,children:[`Multiple people pressing buttons simultaneously. Use synchronized or concurrent collections.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: concurrency is the #1 follow-up question.`})]}),(0,d.jsxs)(g,{title:`2. Extensible scheduling`,children:[`New algorithms (SCAN, LOOK) can be added without modifying ElevatorController — Strategy Pattern.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: demonstrates OCP and DIP.`})]}),(0,d.jsxs)(g,{title:`3. Low latency — minimize wait time`,children:[`Elevator should reach requesting floor fast. Nearest-elevator reduces average wait time.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: real-world performance metric.`})]}),(0,d.jsxs)(_,{children:[(0,d.jsx)(`b`,{children:`Out of scope:`}),` VIP priority, fire mode, voice control, weight sensor, emergency stop. Mention these to show you can scope.`]})]}),(0,d.jsxs)(p,{id:`ent`,children:[(0,d.jsxs)(m,{children:[(0,d.jsx)(`i`,{className:`fas fa-cubes`}),` Step 2 — Entities (3 min)`]}),(0,d.jsx)(`p`,{className:`el-intro`,children:`Nouns from requirements become classes:`}),(0,d.jsxs)(g,{title:`Building`,children:[`Top-level container. Holds elevators + floors. Entry point for all button presses.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: facade — external world talks to Building.`})]}),(0,d.jsxs)(g,{title:`Elevator`,children:[`The moving box. Has currentFloor, direction, door state, target floors.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: core entity — all logic revolves around elevator.`})]}),(0,d.jsxs)(g,{title:`ElevatorController`,children:[`Brain of the system. Assigns requests using SchedulingStrategy.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: separates scheduling from mechanics (SRP).`})]}),(0,d.jsxs)(g,{title:`SchedulingStrategy (interface)`,children:[`Defines how to pick an elevator. Implementations: NearestElevator, SCAN, LOOK.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: Strategy Pattern — swap algorithm without changing core.`})]}),(0,d.jsxs)(g,{title:`Request`,children:[`Represents a button press. Has floor, direction, timestamp, internal/external flag.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: encapsulates input.`})]}),(0,d.jsxs)(g,{title:`Floor`,children:[`Has external buttons (UP/DOWN). In simple LLD, can be just an integer.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: keeps design minimal — do not over-engineer.`})]}),(0,d.jsxs)(g,{title:`Direction (enum)`,children:[`UP, DOWN, IDLE.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: state machine — direction determines next action.`})]}),(0,d.jsxs)(g,{title:`ElevatorState / DoorState (enums)`,children:[`MOVING, STOPPED, DOOR_OPEN, DOOR_CLOSED.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: State Pattern candidate.`})]})]}),(0,d.jsxs)(p,{id:`uml`,children:[(0,d.jsxs)(m,{children:[(0,d.jsx)(`i`,{className:`fas fa-project-diagram`}),` Step 3 — Class Diagram (10 min)`]}),(0,d.jsx)(`p`,{className:`el-intro`,children:`Draw this on whiteboard. Relationships are the key signal:`}),(0,d.jsx)(f,{code:u,lang:`text`}),(0,d.jsxs)(_,{children:[(0,d.jsx)(`b`,{children:`Key relationship:`}),` ElevatorController depends on SchedulingStrategy interface (DIP), not on concrete class.`]})]}),(0,d.jsxs)(p,{id:`db`,children:[(0,d.jsxs)(m,{children:[(0,d.jsx)(`i`,{className:`fas fa-database`}),` Step 4 — DB Design (5 min)`]}),(0,d.jsx)(`p`,{className:`el-intro`,children:`Even for in-memory LLD, show you can persist it. 4 normalized tables:`}),(0,d.jsx)(f,{code:l,lang:`sql`}),(0,d.jsxs)(g,{title:`Why denormalize current_floor?`,children:[`Elevator position changes every second — no need to join with log table.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: read-heavy query — current floor queried constantly.`})]}),(0,d.jsxs)(g,{title:`Why partial index on status?`,children:[`Most queries are "find all PENDING requests" — partial index is smaller and faster.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: completed requests are historical, not queried often.`})]}),(0,d.jsxs)(g,{title:`Why elevator_log table?`,children:[`Audit trail — every move recorded. Useful for debugging and analytics.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: separates current state (fast) from history (append-only).`})]})]}),(0,d.jsxs)(p,{id:`java`,children:[(0,d.jsxs)(m,{children:[(0,d.jsx)(`i`,{className:`fab fa-java`}),` Step 5 — Java Code (20–25 min)`]}),(0,d.jsx)(`p`,{className:`el-intro`,children:`Write minimal, working Java. Skip getters/setters unless asked.`}),(0,d.jsx)(h,{children:`Part 1: Enums + Request + Elevator`}),(0,d.jsx)(f,{code:o,lang:`java`}),(0,d.jsx)(h,{children:`Part 2: SchedulingStrategy + ElevatorController`}),(0,d.jsx)(f,{code:s,lang:`java`}),(0,d.jsx)(h,{children:`Part 3: Building + Demo`}),(0,d.jsx)(f,{code:c,lang:`java`})]}),(0,d.jsxs)(p,{id:`wrap`,children:[(0,d.jsxs)(m,{children:[(0,d.jsx)(`i`,{className:`fas fa-flag-checkered`}),` Step 6 — Wrap-up (3 min)`]}),(0,d.jsx)(`p`,{className:`el-intro`,children:`Be ready to answer these — they separate good from great:`}),(0,d.jsxs)(g,{title:`1. Concurrency`,children:[`Use synchronized on requestElevator() and requestFloor(). For scale, use ConcurrentLinkedQueue.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: interviewers ask "what if 100 people press buttons at once?"`})]}),(0,d.jsxs)(g,{title:`2. Starvation`,children:[`Nearest-elevator can starve far floors. Fix: add aging or use SCAN.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: shows you think about fairness.`})]}),(0,d.jsxs)(g,{title:`3. Extension`,children:[`Create ScanSchedulingStrategy implements SchedulingStrategy. One line change. OCP.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: Strategy Pattern in action.`})]}),(0,d.jsxs)(g,{title:`4. Patterns used`,children:[`Strategy, State, Facade, Observer (display).`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: naming patterns shows design vocabulary.`})]}),(0,d.jsxs)(g,{title:`5. SOLID check`,children:[`SRP (Controller assigns, Elevator moves), OCP (new strategy = new class), DIP.`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`i`,{children:`Why: interviewers love when you self-grade.`})]}),(0,d.jsxs)(_,{children:[(0,d.jsx)(`b`,{children:`Scorecard:`}),` 5 + 3 + 10 + 5 + 20 + 3 = 46 min total. Practice until 45 min.`]})]}),(0,d.jsx)(`footer`,{className:`el-footer`,children:(0,d.jsx)(r,{to:`/maang/system-design/advanced`,children:`← Back to Advanced System Design`})})]})}export{v as default};