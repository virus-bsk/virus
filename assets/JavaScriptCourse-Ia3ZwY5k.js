import{r as e}from"./rolldown-runtime-QTnfLwEv.js";import{h as t,r as n,u as r}from"./index-Dka5w6n9.js";import{t as i}from"./atom-one-dark-C84iCW6D.js";/* empty css                      */var a=e(t(),1),o=[{id:1,title:`What is JavaScript?`,category:`basics`,level:`beginner`,description:`JavaScript is a programming language that makes websites interactive. It runs in the browser (frontend) and on servers (Node.js).`,why:`To add interactivity to websites, build web apps, servers, mobile apps, etc.`,when:`Every time you want to make a webpage dynamic or build any web application.`,code:`// JavaScript can do this:
console.log("Hello, World!");  // Prints to console
alert("Welcome!");            // Shows popup
document.title = "New Title";    // Changes page title`},{id:2,title:`How to Include JavaScript`,category:`basics`,level:`beginner`,description:`Three ways to add JavaScript to HTML: inline, internal, and external.`,why:`To separate HTML, CSS, and JS for cleaner code and better maintenance.`,when:`Always use external files for production; inline for quick testing.`,code:`<!-- 1. Inline (in HTML tag) -->
<button onclick="alert('Hi')">Click</button>

<!-- 2. Internal (in <script> tag) -->
<script>
  console.log("Hello");
<\/script>

<!-- 3. External (best practice) -->
<script src="script.js"><\/script>`},{id:3,title:`console.log() & Comments`,category:`basics`,level:`beginner`,description:`console.log() prints to the browser console. Comments explain code.`,why:`To debug code, print values, and explain code logic.`,when:`Every time you write code!`,code:`// This is a single-line comment
/* This is a 
   multi-line comment */

console.log("Hello World");  // Prints to console
console.log(42);               // Prints a number
console.log(true);            // Prints boolean

// Use for debugging
console.log("Variable value:", myVar);`},{id:4,title:`Variables (var, let, const)`,category:`basics`,level:`beginner`,description:`Containers for storing data. var (old), let (can change), const (can't change).`,why:`To store and manage data in your program.`,when:`Always! Use const by default, let when you need to reassign.`,code:`// var - old way (avoid in modern code)
var oldName = "John";

// let - can be reassigned
let age = 25;
age = 26;  // ✅ allowed

// const - cannot be reassigned
const PI = 3.14159;
// PI = 3.14; // ❌ Error

// Best practice: Use const by default, let when needed`},{id:5,title:`Data Types`,category:`basics`,level:`beginner`,description:`8 data types: String, Number, Boolean, Undefined, Null, Symbol, BigInt, Object.`,why:`To represent different kinds of information (text, numbers, true/false, etc.).`,when:`Every time you store data.`,code:`// Primitive Types
let name = "John";        // String
let age = 25;              // Number
let isStudent = true;     // Boolean
let nothing = undefined;   // Undefined
let empty = null;          // Null
let bigNum = 9007199254740991n; // BigInt
let sym = Symbol("id");   // Symbol

// Reference Type
let person = { name: "Alice", age: 30 }; // Object`},{id:6,title:`Type Coercion`,category:`basics`,level:`beginner`,description:`JavaScript automatically converts types. Be careful!`,why:`JavaScript is loosely typed - it tries to be helpful.`,when:`Always use explicit coercion to avoid bugs.`,code:`// Implicit Coercion (automatic)
let result = "5" + 3;    // "53" (string concatenation)
let result2 = "5" - 3;   // 2 (number subtraction)
let result3 = "5" * 2;   // 10 (number multiplication)

// Explicit Coercion (manual - better)
let num = Number("5");      // 5
let str = String(5);        // "5"
let bool = Boolean(0);       // false
let bool2 = Boolean("hello"); // true`},{id:7,title:`Operators`,category:`basics`,level:`beginner`,description:`Symbols that perform operations on values.`,why:`To perform calculations, comparisons, and logic.`,when:`Everywhere in your code!`,code:`// Arithmetic: +, -, *, /, %, **
let sum = 10 + 5;    // 15
let power = 2 ** 3;   // 8 (2³)

// Comparison: ==, ===, !=, !==, >, =, 
let isEqual = 5 == "5";   // true (loose)
let isStrict = 5 === "5"; // false (strict - recommended)

// Logical: && (AND), || (OR), ! (NOT)
let and = true && false; // false
let or = true || false;  // true
let not = !true;        // false

// Assignment: =, +=, -=, *=, /=
let x = 10;
x += 5;  // x = 15`},{id:8,title:`Conditionals (if, else, switch)`,category:`basics`,level:`beginner`,description:`Execute code based on conditions.`,why:`To make decisions in your code.`,when:`Whenever you need to check a condition.`,code:`// if/else
let age = 18;
if (age >= 18) {
    console.log("Adult");
} else {
    console.log("Minor");
}

// else if
if (age "Child");
} else if (age "Teenager");
} else {
    console.log("Adult");
}

// Ternary operator (shortcut)
let status = age >= 18 ? "Adult" : "Minor";

// switch
switch (day) {
    case "Monday": console.log("Start of week"); break;
    case "Friday": console.log("TGIF!"); break;
    default: console.log("Midweek");
}`},{id:9,title:`Loops (for, while, do-while)`,category:`basics`,level:`beginner`,description:`Execute code repeatedly.`,why:`To repeat actions and iterate over data.`,when:`Processing lists, repeating actions, etc.`,code:`// for loop - most common
for (let i = 0; i // 0,1,2,3,4
}

// while loop
let i = 0;
while (i // do-while (runs at least once)
do {
    console.log("At least once");
} while (false);

// for...of (for arrays)
let arr = [1, 2, 3];
for (let val of arr) {
    console.log(val);
}`},{id:10,title:`Functions (Declaration & Expression)`,category:`functions`,level:`beginner`,description:`Reusable blocks of code.`,why:`To organize code, reuse logic, and avoid repetition.`,when:`Any task you need to do multiple times.`,code:`// Function Declaration
function greet(name) {
    return "Hello, " + name + "!";
}

// Function Expression
const greet2 = function(name) {
    return "Hi, " + name;
};

console.log(greet("Alice")); // "Hello, Alice!"

// Arrow function (ES6)
const greet3 = (name) => \`Hello, \${name}!\`;`},{id:11,title:`Scope (Global, Function, Block)`,category:`basics`,level:`beginner`,description:`Where variables are accessible.`,why:`To control variable visibility and prevent conflicts.`,when:`Always! Understanding scope prevents bugs.`,code:`// Global scope
let globalVar = "I'm global";

function myFunction() {
    // Function scope
    let localVar = "I'm local";
    console.log(globalVar); // ✅ accessible
    
    if (true) {
        // Block scope (let, const)
        let blockVar = "I'm block-scoped";
    }
    // console.log(blockVar); // ❌ ReferenceError
}`},{id:12,title:`Hoisting`,category:`basics`,level:`beginner`,description:`JavaScript moves declarations to the top during compilation.`,why:`JavaScript's default behavior; understand it to avoid confusion.`,when:`Be aware of it; best to declare variables at the top.`,code:`// Hoisting with var
console.log(x); // undefined (not error!)
var x = 5;

// Hoisting with function declarations
console.log(greet("John")); // "Hello, John!"
function greet(name) {
    return "Hello, " + name;
}

// let and const are hoisted but not initialized (TDZ)
// console.log(y); // ❌ ReferenceError
let y = 10;`},{id:13,title:`Strict Mode ("use strict")`,category:`basics`,level:`beginner`,description:`Enforces stricter parsing and error handling.`,why:`To catch common coding errors and improve security.`,when:`Always use strict mode in modern JavaScript.`,code:`// Enable strict mode
"use strict";

// Without strict: allowed
x = 10; // ❌ In strict: ReferenceError

// Without strict: allowed
function myFunction() {
    this.name = "John"; // ❌ In strict: TypeError
}

// Must be at the top of file or function
function strictFunction() {
    "use strict";
    // strict mode only in this function
}`},{id:14,title:`Truthy & Falsy Values`,category:`basics`,level:`beginner`,description:`Values that evaluate to true or false in boolean contexts.`,why:`To write cleaner conditions and default values.`,when:`Conditions, default values, short-circuiting.`,code:`// Falsy values (only 8)
false, 0, "", null, undefined, NaN, 0n, -0

// Everything else is truthy
if ("hello") console.log("truthy"); // ✅ runs
if (0) console.log("falsy"); // ❌ doesn't run
if ([]) console.log("truthy"); // ✅ runs (empty array is truthy)

// Practical: default values
let name = userInput || "Guest";
let age = userAge ?? 18; // Nullish coalescing (only null/undefined)`},{id:15,title:`Short-circuit Evaluation`,category:`basics`,level:`beginner`,description:`Logical operators stop evaluating once result is determined.`,why:`To write concise conditional code.`,when:`Default values, conditional execution, guarding against null/undefined.`,code:`// && stops at first falsy
console.log("hello" && "world"); // "world"
console.log(0 && "world");      // 0

// || stops at first truthy
console.log("hello" || "world"); // "hello"
console.log(0 || "world");      // "world"

// Practical uses
let name = user.name || "Anonymous"; // Default value
user && user.greet(); // Only call if user exists
isLoggedIn && showDashboard(); // Only show if logged in`},{id:16,title:`Arrow Functions`,category:`es6`,level:`intermediate`,description:`Shorter function syntax. Lexical 'this' binding.`,why:`Concise syntax, lexical 'this' binding.`,when:`Callbacks, array methods, React components.`,code:`// Regular function
function add(a, b) {
    return a + b;
}

// Arrow function
const add = (a, b) => a + b;

// With one parameter
const double = x => x * 2;

// No parameters
const greet = () => console.log("Hello");

// Returning an object
const createUser = (name) => ({ name: name });

// Arrow functions don't bind their own 'this'
const obj = {
    name: "Alice",
    greet: () => console.log(this.name) // this = global, not obj
};`},{id:17,title:`Template Literals`,category:`es6`,level:`intermediate`,description:`String literals with embedded expressions using backticks.`,why:`Cleaner string concatenation and multi-line support.`,when:`Almost always! Replaces string concatenation.`,code:`// Basic template literal
const name = "Alice";
const age = 30;
const message = \`Hello, \${name}! You are \${age} years old.\`;

// Multi-line strings
const multi = \`This is
a multi-line
string\`;

// Expressions
const result = \`2 + 2 = \${2 + 2}\`; // "2 + 2 = 4"

// Tagged templates
function tag(strings, ...values) {
    console.log(strings); // ["Hello ", "!"]
    console.log(values);  // ["Alice"]
}
tag\`Hello \${name}!\`;`},{id:18,title:`Destructuring (Objects & Arrays)`,category:`es6`,level:`intermediate`,description:`Extract values from objects and arrays into variables.`,why:`Cleaner, more readable code.`,when:`Extracting props in React, configuration objects.`,code:`// Object destructuring
const person = { name: "Alice", age: 30, city: "NYC" };
const { name, age } = person;
console.log(name, age); // "Alice" 30

// Renaming
const { name: firstName } = person;

// Default values
const { job = "Developer" } = person;

// Array destructuring
const colors = ["red", "green", "blue"];
const [first, second] = colors;
console.log(first, second); // "red" "green"

// Skipping elements
const [x, , z] = colors;`},{id:19,title:`Spread & Rest Operators (...)`,category:`es6`,level:`intermediate`,description:`Spread expands, rest collects.`,why:`Flexible array/object manipulation.`,when:`Merging data, copying, function arguments.`,code:`// Spread: expand array/object
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const merged = [...arr1, ...arr2]; // [1,2,3,4,5,6]

// Copy
const copy = [...arr1]; // new array

// Object spread
const person = { name: "Alice", age: 30 };
const newPerson = { ...person, city: "NYC" };

// Rest: collect remaining
function logAll(first, ...rest) {
    console.log(first); // 1
    console.log(rest);  // [2,3,4]
}
logAll(1, 2, 3, 4);`},{id:20,title:`Default Parameters`,category:`es6`,level:`intermediate`,description:`Function parameters with default values.`,why:`To make functions robust and handle missing arguments.`,when:`Most functions with optional parameters.`,code:`function greet(name = "Guest", greeting = "Hello") {
    return \`\${greeting}, \${name}!\`;
}

console.log(greet());                // "Hello, Guest!"
console.log(greet("Alice"));       // "Hello, Alice!"

// With destructuring
function createUser({ name = "Anonymous", age = 0 } = {}) {
    return { name, age };
}`},{id:21,title:`Map (Key-Value Collection)`,category:`collections`,level:`intermediate`,description:`A collection of key-value pairs where keys can be any type (not just strings).`,why:`More flexible than objects - keys can be any type, preserves insertion order.`,when:`When you need keys that aren't strings, or need ordered key-value pairs.`,code:`// Creating a Map
const map = new Map();

// Adding values
map.set("name", "Alice");
map.set(42, "answer");
map.set({ id: 1 }, "user"); // object as key

// Getting values
console.log(map.get("name")); // "Alice"
console.log(map.get(42));     // "answer"

// Checking existence
console.log(map.has("name")); // true

// Iterating
for (const [key, value] of map) {
    console.log(key, value);
}

// Size
console.log(map.size); // 3

// Creating from array
const map2 = new Map([["a", 1], ["b", 2]]);`},{id:22,title:`Set (Unique Values)`,category:`collections`,level:`intermediate`,description:`A collection of unique values (no duplicates allowed).`,why:`To store unique values and remove duplicates efficiently.`,when:`Removing duplicates, checking existence, set operations (union, intersection).`,code:`// Creating a Set
const set = new Set();

// Adding values
set.add(1);
set.add(2);
set.add(2); // ignored (already exists)
set.add("hello");

console.log(set); // Set { 1, 2, "hello" }
console.log(set.size); // 3

// Checking existence
console.log(set.has(1)); // true

// Iterating
for (const value of set) {
    console.log(value);
}

// Remove duplicates from array
const arr = [1, 2, 2, 3, 3, 3, 4];
const unique = [...new Set(arr)]; // [1,2,3,4]`},{id:23,title:`WeakMap & WeakSet`,category:`collections`,level:`advanced`,description:`Collections with weak references (garbage collected).`,why:`To prevent memory leaks with object keys.`,when:`Caching DOM elements, private data, metadata storage.`,code:`// WeakMap (keys must be objects)
const weakMap = new WeakMap();
const key = { id: 1 };
weakMap.set(key, "value");
console.log(weakMap.get(key)); // "value"

// If key is garbage collected, entry is removed
// WeakMap is not iterable

// WeakSet (only objects)
const weakSet = new WeakSet();
const obj = {};
weakSet.add(obj);
console.log(weakSet.has(obj)); // true

// Uses: memory management, private data
// Great for caching DOM elements without memory leaks`},{id:24,title:`Callback Functions`,category:`functions`,level:`intermediate`,description:`A function passed as an argument to another function.`,why:`To handle async operations and functional programming.`,when:`Event handlers, array methods, async operations.`,code:`// Basic callback
function processUser(name, callback) {
    const greeting = "Hello, " + name;
    callback(greeting);
}

processUser("Alice", (message) => {
    console.log(message);
});

// Array methods use callbacks
const numbers = [1, 2, 3];
numbers.forEach((num) => console.log(num * 2));

// Event listeners
document.addEventListener("click", () => {
    console.log("Clicked!");
});`},{id:25,title:`Higher-Order Functions`,category:`functions`,level:`intermediate`,description:`Functions that take other functions as arguments or return functions.`,why:`To write cleaner, more declarative code.`,when:`Processing arrays, composing functions.`,code:`// map: transform each element
const doubled = [1, 2, 3].map(n => n * 2); // [2,4,6]

// filter: keep elements that pass test
const evens = [1, 2, 3, 4].filter(n => n % 2 === 0); // [2,4]

// reduce: accumulate values
const sum = [1, 2, 3].reduce((acc, n) => acc + n, 0); // 6

// Creating HOF
function multiplyBy(factor) {
    return function(number) {
        return number * factor;
    };
}
const double = multiplyBy(2);
console.log(double(5)); // 10`},{id:26,title:`Closures`,category:`advanced`,level:`advanced`,description:`A function that remembers its lexical scope even when executed outside it.`,why:`To create private variables, function factories.`,when:`Module pattern, event handlers, functional programming.`,code:`function outer(x) {
    return function(y) {
        return x + y; // inner function remembers 'x'
    };
}

const add5 = outer(5);
console.log(add5(3)); // 8

// Practical: private variables
function counter() {
    let count = 0;
    return {
        increment: () => ++count,
        decrement: () => --count,
        getCount: () => count
    };
}

const myCounter = counter();
myCounter.increment();
myCounter.increment();
console.log(myCounter.getCount()); // 2`},{id:27,title:`IIFE (Immediately Invoked Function Expression)`,category:`functions`,level:`intermediate`,description:`A function that runs as soon as it's defined.`,why:`To create a private scope, avoid polluting global scope.`,when:`One-time initialization, old-style modules.`,code:`// IIFE syntax
(function() {
    let privateVar = "I'm private";
    console.log("IIFE executed!");
})();

// Arrow function IIFE
(() => {
    console.log("Arrow IIFE");
})();

// With parameters
((name) => {
    console.log("Hello, " + name);
})("John");

// Old module pattern
const module = (function() {
    let private = "secret";
    return {
        getPrivate: () => private
    };
})();`},{id:28,title:`'this' Keyword`,category:`objects`,level:`intermediate`,description:`Refers to the object executing the current function.`,why:`To access object properties within methods.`,when:`Methods, event handlers, class methods.`,code:`// In a method: refers to the object
const obj = {
    name: "Alice",
    greet() {
        console.log(this.name); // "Alice"
    }
};

// In a function (strict): undefined
function showThis() {
    "use strict";
    console.log(this); // undefined
}

// In arrow functions: lexical 'this'
const arrow = () => console.log(this);

// With call/apply/bind
function greet() {
    console.log(this.name);
}
const user = { name: "Bob" };
greet.call(user); // "Bob"`},{id:29,title:`call, apply, bind`,category:`functions`,level:`advanced`,description:`Methods to explicitly set 'this' and call functions.`,why:`To control 'this' value and borrow methods.`,when:`Event handlers, method borrowing, partial application.`,code:`function greet(greeting, punctuation) {
    console.log(\`\${greeting}, \${this.name}\${punctuation}\`);
}

const user = { name: "Alice" };

// call: pass arguments individually
greet.call(user, "Hello", "!"); // "Hello, Alice!"

// apply: pass arguments as array
greet.apply(user, ["Hi", "?"]); // "Hi, Alice?"

// bind: creates new function
const greetAlice = greet.bind(user, "Hey");
greetAlice("."); // "Hey, Alice."

// bind with React components
class Component {
    constructor() {
        this.handleClick = this.handleClick.bind(this);
    }
}`},{id:30,title:`Objects (Advanced)`,category:`objects`,level:`intermediate`,description:`Key-value pairs with properties and methods.`,why:`To group related data and functionality.`,when:`Almost always! Objects are fundamental to JS.`,code:`// Object creation
const person = {
    name: "Alice",
    age: 30,
    greet() {
        return \`Hello, \${this.name}\`;
    }
};

// Computed properties
const key = "job";
const user = {
    [key]: "Developer"
};

// Object methods
Object.keys(person); // ["name", "age", "greet"]
Object.values(person); // ["Alice", 30, function]
Object.entries(person); // [["name","Alice"], ["age",30], ...]

// Object.assign
const merged = Object.assign({}, person, { city: "NYC" });

// Freeze (immutable)
Object.freeze(person);
person.age = 31; // ignored in strict mode`},{id:31,title:`Prototypes & Prototypal Inheritance`,category:`objects`,level:`advanced`,description:`JavaScript's underlying inheritance mechanism.`,why:`To understand how JavaScript inheritance works.`,when:`Understanding core JS, performance optimization.`,code:`// Every object has a prototype
const person = { name: "Alice" };
console.log(person.__proto__); // {} (Object.prototype)

// Prototypal inheritance
const animal = { eats: true };
const dog = { barks: true };
dog.__proto__ = animal;
console.log(dog.eats); // true

// Modern: Object.create
const animalProto = { eats: true };
const dog2 = Object.create(animalProto);
dog2.barks = true;

// Constructor functions
function Person(name) {
    this.name = name;
}
Person.prototype.greet = function() {
    return "Hello, " + this.name;
};`},{id:32,title:`Classes (ES6)`,category:`oop`,level:`intermediate`,description:`Blueprints for creating objects with shared properties and methods.`,why:`To create objects with similar structure and behavior.`,when:`When you need multiple similar objects.`,code:`class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    greet() {
        return \`Hello, I'm \${this.name}\`;
    }

    static isAdult(age) {
        return age >= 18;
    }

    get bio() {
        return \`\${this.name} is \${this.age} years old\`;
    }

    set bio(value) {
        const [name, age] = value.split(", ");
        this.name = name;
        this.age = parseInt(age);
    }
}

const alice = new Person("Alice", 30);
console.log(alice.greet()); // "Hello, I'm Alice"
console.log(Person.isAdult(20)); // true
console.log(alice.bio); // "Alice is 30 years old"`},{id:33,title:`Inheritance (extends)`,category:`oop`,level:`intermediate`,description:`A class can inherit properties and methods from another class.`,why:`To reuse code and create hierarchical relationships.`,when:`When classes share common behavior.`,code:`class Animal {
    constructor(name) {
        this.name = name;
    }
    speak() {
        console.log(\`\${this.name} makes a sound\`);
    }
}

class Dog extends Animal {
    constructor(name, breed) {
        super(name); // call parent constructor
        this.breed = breed;
    }
    speak() {
        console.log(\`\${this.name} barks!\`); // override
    }
    getBreed() {
        return this.breed;
    }
}

const dog = new Dog("Rex", "German Shepherd");
dog.speak(); // "Rex barks!"`},{id:34,title:`Encapsulation (Private Fields)`,category:`oop`,level:`advanced`,description:`Hiding internal state and exposing controlled interfaces.`,why:`To protect data and enforce proper usage.`,when:`When you need to control access to internal state.`,code:`// Private fields (ES2022)
class BankAccount {
    #balance = 0; // private field
    
    constructor(initialBalance) {
        this.#balance = initialBalance;
    }
    
    deposit(amount) {
        if (amount > 0) this.#balance += amount;
        return this.#balance;
    }
    
    getBalance() {
        return this.#balance;
    }
}

const account = new BankAccount(100);
console.log(account.getBalance()); // 100
// console.log(account.#balance); // ❌ SyntaxError

// Private methods
class MyClass {
    #privateMethod() {
        return "private";
    }
    publicMethod() {
        return this.#privateMethod();
    }
}`},{id:35,title:`Polymorphism`,category:`oop`,level:`intermediate`,description:`Different classes can implement the same method differently.`,why:`To write code that works with different types.`,when:`When you have related classes with different behavior.`,code:`class Shape {
    area() { return 0; }
}

class Circle extends Shape {
    constructor(radius) {
        super();
        this.radius = radius;
    }
    area() {
        return Math.PI * this.radius ** 2;
    }
}

class Rectangle extends Shape {
    constructor(width, height) {
        super();
        this.width = width;
        this.height = height;
    }
    area() {
        return this.width * this.height;
    }
}

function printArea(shape) {
    console.log(shape.area()); // Works with any Shape
}`},{id:36,title:`Promises`,category:`async`,level:`advanced`,description:`Objects representing the eventual completion/failure of async operations.`,why:`To handle async operations more cleanly than callbacks.`,when:`Any async operation (fetch, database queries).`,code:`// Creating a Promise
const fetchData = new Promise((resolve, reject) => {
    setTimeout(() => {
        const success = true;
        if (success) {
            resolve("Data received!");
        } else {
            reject("Error fetching data");
        }
    }, 1000);
});

// Using a Promise
fetchData
    .then(data => console.log(data))
    .catch(error => console.error(error))
    .finally(() => console.log("Done"));

// Promise chaining
fetchUser()
    .then(user => fetchPosts(user.id))
    .then(posts => console.log(posts))
    .catch(err => console.error(err));`},{id:37,title:`async/await`,category:`async`,level:`advanced`,description:`Syntactic sugar over Promises for cleaner async code.`,why:`To write async code that looks synchronous and readable.`,when:`Almost always! Preferred over .then chains.`,code:`async function getData() {
    try {
        const response = await fetch('https://api.example.com/data');
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}

// Arrow function async
const fetchUser = async (id) => {
    const user = await db.findUser(id);
    return user;
};

// Top-level await (ES2022)
const data = await fetchData();`},{id:38,title:`Promise Methods (all, race, allSettled)`,category:`async`,level:`advanced`,description:`Handling multiple promises together.`,why:`To handle multiple async operations efficiently.`,when:`Batch operations, parallel requests.`,code:`// Promise.all: wait for all to resolve
const [user, posts] = await Promise.all([
    fetchUser(),
    fetchPosts()
]);

// Promise.race: first to settle wins
const fastResult = await Promise.race([
    fetchFromAPI1(),
    fetchFromAPI2()
]);

// Promise.allSettled: wait for all to finish
const results = await Promise.allSettled([
    fetchData(),
    fetchData2()
]);

results.forEach(result => {
    if (result.status === "fulfilled") {
        console.log("Success:", result.value);
    } else {
        console.log("Failed:", result.reason);
    }
});

// Promise.any: first fulfilled (ignores rejections)
const result = await Promise.any([api1(), api2()]);`},{id:39,title:`Event Loop`,category:`advanced`,level:`expert`,description:`How JavaScript handles async operations despite being single-threaded.`,why:`To understand async behavior and order of execution.`,when:`Debugging async code, performance optimization.`,code:`// Event Loop in action
console.log("1: Start");

setTimeout(() => {
    console.log("2: Timeout (macrotask)");
}, 0);

Promise.resolve().then(() => {
    console.log("3: Promise (microtask)");
});

queueMicrotask(() => {
    console.log("4: Microtask");
});

console.log("5: End");

// Output: 1, 5, 3, 4, 2
// Microtasks (Promise) run before macrotasks (setTimeout)`},{id:40,title:`Fetch API`,category:`async`,level:`intermediate`,description:`Modern way to make HTTP requests (returns Promises).`,why:`To make network requests (API calls).`,when:`Almost all web apps that talk to servers.`,code:`// GET request
try {
    const response = await fetch('https://api.example.com/users');
    if (!response.ok) {
        throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    const users = await response.json();
    console.log(users);
} catch (error) {
    console.error("Error:", error);
}

// POST request
const response = await fetch('https://api.example.com/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: "Alice", age: 30 })
});

// AbortController (timeout)
const controller = new AbortController();
const timeout = setTimeout(() => controller.abort(), 5000);
const response = await fetch(url, { signal: controller.signal });`},{id:41,title:`Error Handling (try/catch/finally)`,category:`error`,level:`intermediate`,description:`Gracefully handle errors without crashing your app.`,why:`To prevent crashes and handle errors gracefully.`,when:`Async operations, user input, API calls.`,code:`// Basic try/catch
try {
    let data = JSON.parse('{"invalid": json');
    console.log(data);
} catch (error) {
    console.error("Parsing failed:", error.message);
} finally {
    console.log("Always runs");
}

// Custom errors
class ValidationError extends Error {
    constructor(message, field) {
        super(message);
        this.name = "ValidationError";
        this.field = field;
    }
}

try {
    throw new ValidationError("Invalid input", "email");
} catch (error) {
    if (error instanceof ValidationError) {
        console.log(\`Error in \${error.field}: \${error.message}\`);
    }
}

// Global error handler
window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
});`},{id:42,title:`Modules (import/export)`,category:`modules`,level:`intermediate`,description:`Organize code into reusable modules.`,why:`To organize code, avoid global namespace pollution.`,when:`Every JavaScript project!`,code:`// math.js (export)
export const PI = 3.14159;
export function add(a, b) { return a + b; }
export default function multiply(a, b) { return a * b; }

// main.js (import)
import multiply, { PI, add } from './math.js';
console.log(PI);       // 3.14159
console.log(add(2,3)); // 5

// Import all
import * as math from './math.js';

// Dynamic import
const module = await import('./module.js');`},{id:43,title:`DOM Manipulation`,category:`dom`,level:`intermediate`,description:`Interacting with HTML elements using JavaScript.`,why:`To create dynamic, interactive web pages.`,when:`Any time you need to update the page based on user interaction or data.`,code:`// Selecting elements
const element = document.getElementById('myId');
const elements = document.querySelectorAll('.myClass');
const first = document.querySelector('#myId');

// Creating elements
const div = document.createElement('div');
div.textContent = "Hello";
div.classList.add('my-class');
document.body.appendChild(div);

// Modifying elements
element.innerHTML = "New content";
element.style.color = 'red';
element.setAttribute('data-id', '123');

// Removing elements
element.remove();
// or
parent.removeChild(child);`},{id:44,title:`Events & Event Listeners`,category:`dom`,level:`intermediate`,description:`Handling user interactions and browser events.`,why:`To make websites interactive and responsive.`,when:`Every time you need to respond to user actions.`,code:`// Adding event listener
element.addEventListener('click', (event) => {
    console.log('Clicked!', event.target);
});

// Event object properties
element.addEventListener('click', (e) => {
    console.log(e.type);        // "click"
    console.log(e.target);      // element clicked
    console.log(e.clientX, e.clientY); // mouse position
});

// Common events
element.addEventListener('mouseover', () => {});
element.addEventListener('keydown', (e) => {
    console.log(e.key); // pressed key
});
element.addEventListener('submit', (e) => {
    e.preventDefault(); // prevent form submission
});

// Removing event listener
element.removeEventListener('click', handler);`},{id:45,title:`Event Delegation`,category:`dom`,level:`advanced`,description:`Attaching an event listener to a parent element to handle events on its children.`,why:`To improve performance and handle dynamic content.`,when:`Lists, tables, any dynamic content.`,code:`// Without delegation (inefficient)
document.querySelectorAll('li').forEach(item => {
    item.addEventListener('click', () => {
        console.log('Item clicked');
    });
});

// With delegation (efficient)
document.querySelector('ul').addEventListener('click', (e) => {
    if (e.target.tagName === 'LI') {
        console.log('Item clicked:', e.target.textContent);
    }
});

// Works with dynamically added elements
// No need to re-attach listeners!

// Using data attributes
document.addEventListener('click', (e) => {
    const item = e.target.closest('[data-action]');
    if (item) {
        console.log(item.dataset.action);
    }
});`},{id:46,title:`LocalStorage & SessionStorage`,category:`advanced`,level:`intermediate`,description:`Store data in the browser (key-value storage).`,why:`To persist data between sessions and page reloads.`,when:`User preferences, themes, auth tokens, caching.`,code:`// LocalStorage (persistent)
localStorage.setItem('key', 'value');
const value = localStorage.getItem('key');
localStorage.removeItem('key');
localStorage.clear();

// SessionStorage (per tab/session)
sessionStorage.setItem('key', 'value');

// Storing objects (JSON)
const user = { name: "Alice", age: 30 };
localStorage.setItem('user', JSON.stringify(user));
const stored = JSON.parse(localStorage.getItem('user'));

// Storage events (cross-tab)
window.addEventListener('storage', (e) => {
    console.log('Storage changed:', e.key, e.newValue);
});`},{id:47,title:`Cookies`,category:`advanced`,level:`intermediate`,description:`Small pieces of data stored by the browser, sent with every request.`,why:`To store small amounts of data that need to be sent to the server.`,when:`Authentication, user preferences, tracking.`,code:`// Setting a cookie
document.cookie = "username=John; expires=Wed, 1 Jan 2025 00:00:00 UTC; path=/";

// Reading cookies
console.log(document.cookie); // "username=John; other=value"

// Cookie helper functions
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = \`\${name}=\${value}; expires=\${date.toUTCString()}; path=/\`;
}

function getCookie(name) {
    const value = \`; \${document.cookie}\`;
    const parts = value.split(\`; \${name}=\`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}`},{id:48,title:`Recursion`,category:`advanced`,level:`advanced`,description:`A function that calls itself to solve problems.`,why:`For problems with recursive structure (trees, nested data).`,when:`Tree traversal, complex algorithms.`,code:`// Factorial recursion
function factorial(n) {
    if (n return 1;
    return n * factorial(n - 1);
}
console.log(factorial(5)); // 120

// Tree traversal
function walkTree(node) {
    console.log(node.value);
    if (node.children) {
        for (const child of node.children) {
            walkTree(child);
        }
    }
}

// Fibonacci (with memoization)
const cache = {};
function fib(n) {
    if (n return n;
    if (cache[n]) return cache[n];
    cache[n] = fib(n - 1) + fib(n - 2);
    return cache[n];
}`},{id:49,title:`Memoization`,category:`advanced`,level:`advanced`,description:`Caching function results to optimize performance.`,why:`To optimize expensive repeated computations.`,when:`Expensive functions with repeated inputs.`,code:`function memoize(fn) {
    const cache = {};
    return function(...args) {
        const key = JSON.stringify(args);
        if (cache[key] !== undefined) {
            return cache[key];
        }
        const result = fn(...args);
        cache[key] = result;
        return result;
    };
}

// Expensive function
const slowFib = memoize(function(n) {
    if (n return n;
    return slowFib(n - 1) + slowFib(n - 2);
});

console.log(slowFib(40)); // Fast!

// React useMemo equivalent
const memoizedValue = useMemo(() => expensiveCalculation(a, b), [a, b]);`},{id:50,title:`Debouncing & Throttling`,category:`advanced`,level:`advanced`,description:`Techniques to limit the rate of function execution.`,why:`To improve performance and user experience.`,when:`Search inputs, scroll events, resize events.`,code:`// Debounce: wait for pause
function debounce(fn, delay) {
    let timer;
    return function(...args) {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
    };
}

// Throttle: limit to once per interval
function throttle(fn, limit) {
    let inThrottle = false;
    return function(...args) {
        if (!inThrottle) {
            fn(...args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Usage
const handleSearch = debounce((query) => {
    console.log("Searching:", query);
}, 300);

// React useDebounce hook
const debouncedValue = useDebounce(searchTerm, 500);`},{id:51,title:`Generators (function*)`,category:`advanced`,level:`expert`,description:`Functions that can be paused and resumed, yielding multiple values.`,why:`To generate sequences, handle infinite streams.`,when:`Custom iterators, lazy evaluation, async streams.`,code:`function* countUp(max) {
    for (let i = 1; i yield i;
    }
}

const counter = countUp(3);
console.log(counter.next()); // { value: 1, done: false }
console.log(counter.next()); // { value: 2, done: false }
console.log(counter.next()); // { value: 3, done: false }
console.log(counter.next()); // { value: undefined, done: true }

// Infinite generator
function* infiniteId() {
    let id = 1;
    while (true) {
        yield id++;
    }
}

// Async generators
async function* asyncGenerator() {
    yield await fetchData();
    yield await fetchMoreData();
}`},{id:52,title:`Symbol`,category:`advanced`,level:`expert`,description:`Unique and immutable primitive values used as object keys.`,why:`To create unique property keys.`,when:`Creating hidden/metadata properties, avoiding collisions.`,code:`// Creating Symbols
const sym1 = Symbol("id");
const sym2 = Symbol("id");
console.log(sym1 === sym2); // false (always unique)

// As object keys
const obj = {
    [sym1]: "value1",
    name: "Alice"
};
console.log(obj[sym1]); // "value1"

// Hidden from iteration
for (const key in obj) {
    console.log(key); // "name" (symbol not shown)
}

// Well-known symbols
console.log(Symbol.iterator); // Symbol(Symbol.iterator)
// Used for custom iteration
const myIterable = {
    [Symbol.iterator]() {
        let i = 0;
        return {
            next() {
                return { value: i++, done: i > 3 };
            }
        };
    }
};`},{id:53,title:`Currying`,category:`advanced`,level:`expert`,description:`Transforming a function that takes multiple arguments into a sequence of functions.`,why:`For function composition and partial application.`,when:`Functional programming, configuration functions.`,code:`// Regular function
function add(a, b) { return a + b; }

// Curried version
function curriedAdd(a) {
    return function(b) {
        return a + b;
    };
}

const add5 = curriedAdd(5);
console.log(add5(3)); // 8

// Arrow function curry
const multiply = a => b => a * b;
console.log(multiply(3)(4)); // 12

// Advanced curry
function curry(fn, arity = fn.length) {
    return function curried(...args) {
        if (args.length >= arity) {
            return fn(...args);
        }
        return (...more) => curried(...args, ...more);
    };
}

const curriedSum = curry((a, b, c) => a + b + c);
console.log(curriedSum(1)(2)(3)); // 6`},{id:54,title:`Proxy`,category:`advanced`,level:`expert`,description:`Create a proxy for another object to intercept operations.`,why:`To intercept and customize operations on objects.`,when:`Validation, logging, reactivity, data binding.`,code:`// Creating a proxy
const target = { message: "Hello" };
const handler = {
    get(obj, prop) {
        if (prop in obj) {
            return obj[prop];
        }
        return "Property not found";
    },
    set(obj, prop, value) {
        if (prop === "age" && value throw new Error("Age cannot be negative");
        }
        obj[prop] = value;
        return true;
    }
};

const proxy = new Proxy(target, handler);
console.log(proxy.message); // "Hello"
console.log(proxy.nonExistent); // "Property not found"
proxy.age = 25; // ✅ works
// proxy.age = -5; // ❌ Error

// Use cases: validation, logging, reactivity (Vue 3)`},{id:55,title:`Reflect`,category:`advanced`,level:`expert`,description:`Built-in object that provides methods for interceptable operations.`,why:`To provide a cleaner way to perform object operations.`,when:`Working with Proxies, meta-programming.`,code:`// Reflect methods
const obj = { name: "Alice", age: 30 };

// Instead of
console.log(obj.name);
// Use
console.log(Reflect.get(obj, 'name'));

// Instead of
obj.age = 31;
// Use
Reflect.set(obj, 'age', 31);

// Instead of
if ('age' in obj) {}
// Use
if (Reflect.has(obj, 'age')) {}

// Proxy with Reflect
const proxy = new Proxy(obj, {
    get(target, prop, receiver) {
        console.log(\`Getting \${String(prop)}\`);
        return Reflect.get(target, prop, receiver);
    },
    set(target, prop, value, receiver) {
        console.log(\`Setting \${String(prop)} to \${value}\`);
        return Reflect.set(target, prop, value, receiver);
    }
});`},{id:56,title:`BigInt`,category:`advanced`,level:`advanced`,description:`For numbers larger than 2^53 - 1.`,why:`To safely handle very large integers.`,when:`Database IDs, timestamps, crypto operations.`,code:`// Creating BigInt
const bigNum = 9007199254740991n; // n suffix
const bigNum2 = BigInt(9007199254740991);

// Operations
const result = bigNum + 1n;
console.log(result); // 9007199254740992n

// Comparison
console.log(10n === 10); // false (different types)
console.log(10n == 10);  // true

// Cannot mix with regular numbers
// const sum = 10n + 5; // ❌ TypeError

// Use cases
// - Database IDs, timestamps, crypto`},{id:57,title:`Web Workers`,category:`advanced`,level:`expert`,description:`Run JavaScript in background threads.`,why:`To run CPU-intensive tasks without blocking the UI.`,when:`Heavy computations, image processing, large data processing.`,code:`// main.js
const worker = new Worker('worker.js');

worker.postMessage({ data: "Hello" });

worker.onmessage = (e) => {
    console.log('Received:', e.data);
};

worker.onerror = (error) => {
    console.error('Worker error:', error);
};

// worker.js
self.onmessage = (e) => {
    console.log('Worker received:', e.data);
    // Do heavy computation
    const result = heavyCalculation(e.data);
    self.postMessage(result);
};

// Terminate
worker.terminate();`},{id:58,title:`Service Workers`,category:`advanced`,level:`expert`,description:`Network proxy that enables offline experiences.`,why:`To enable offline support and improve performance.`,when:`PWAs, offline-first apps, caching assets.`,code:`// Register service worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
        .then(reg => console.log('SW registered'))
        .catch(err => console.error('SW failed:', err));
}

// sw.js
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('v1').then(cache => {
            return cache.addAll([
                '/',
                '/styles.css',
                '/script.js'
            ]);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );
});`},{id:59,title:`Intersection Observer`,category:`advanced`,level:`advanced`,description:`Observe when elements enter/exit the viewport.`,why:`To improve performance and implement lazy loading.`,when:`Lazy loading images, infinite scroll, analytics.`,code:`// Lazy loading images
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            observer.unobserve(img);
        }
    });
});

document.querySelectorAll('img[data-src]').forEach(img => {
    observer.observe(img);
});

// Infinite scrolling
const sentinel = document.querySelector('#sentinel');
const loadMore = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        fetchMoreData();
    }
});
loadMore.observe(sentinel);`},{id:60,title:`Mutation Observer`,category:`advanced`,level:`expert`,description:`Observe changes to the DOM.`,why:`To respond to DOM changes.`,when:`Auto-save, analytics, DOM change detection.`,code:`// Watch for DOM changes
const observer = new MutationObserver((mutations) => {
    mutations.forEach(mutation => {
        if (mutation.type === 'childList') {
            console.log('Nodes added/removed', mutation.addedNodes);
        }
        if (mutation.type === 'attributes') {
            console.log(\`Attribute \${mutation.attributeName} changed\`);
        }
    });
});

observer.observe(document.body, {
    childList: true,
    attributes: true,
    subtree: true
});

// Disconnect
observer.disconnect();

// Use cases: auto-save, DOM change tracking`},{id:61,title:`Resize Observer`,category:`advanced`,level:`advanced`,description:`Observe when an element's size changes.`,why:`To respond to element size changes.`,when:`Responsive design, charts, dynamic layouts.`,code:`// Watch element resizing
const observer = new ResizeObserver(entries => {
    entries.forEach(entry => {
        const { width, height } = entry.contentRect;
        console.log(\`Size: \${width} x \${height}\`);
        
        // Adjust layout
        if (width 'mobile');
        } else {
            entry.target.classList.remove('mobile');
        }
    });
});

observer.observe(document.querySelector('.container'));

// Better than window.resize (specific elements)`},{id:62,title:`Performance API`,category:`advanced`,level:`expert`,description:`Measure and analyze application performance.`,why:`To measure and optimize performance.`,when:`Performance optimization, debugging slow code.`,code:`// Measuring performance
performance.mark('start');
// ... do something ...
performance.mark('end');
performance.measure('myOperation', 'start', 'end');

const measure = performance.getEntriesByName('myOperation')[0];
console.log(\`Time: \${measure.duration}ms\`);

// Navigation timing
const nav = performance.getEntriesByType('navigation')[0];
console.log(\`Page load: \${nav.loadEventEnd - nav.startTime}ms\`);

// Resource timing
performance.getEntriesByType('resource').forEach(resource => {
    console.log(resource.name, resource.duration);
});`},{id:63,title:`Design Patterns`,category:`advanced`,level:`expert`,description:`Common solutions to recurring problems.`,why:`To solve common problems in a structured way.`,when:`Building large applications, creating reusable code.`,code:`// Singleton pattern
const Singleton = (function() {
    let instance;
    function createInstance() {
        return { name: "Singleton" };
    }
    return {
        getInstance: function() {
            if (!instance) instance = createInstance();
            return instance;
        }
    };
})();

// Factory pattern
class UserFactory {
    createUser(type) {
        switch (type) {
            case 'admin': return new Admin();
            case 'user': return new RegularUser();
            default: return new Guest();
        }
    }
}

// Observer pattern (Event Emitter)
class EventEmitter {
    constructor() {
        this.events = {};
    }
    on(event, listener) {
        if (!this.events[event]) this.events[event] = [];
        this.events[event].push(listener);
    }
    emit(event, data) {
        if (this.events[event]) {
            this.events[event].forEach(fn => fn(data));
        }
    }
}`},{id:64,title:`Clean Code Principles`,category:`advanced`,level:`expert`,description:`Writing readable, maintainable code.`,why:`To make code easier to understand, maintain, and debug.`,when:`Every line of code you write!`,code:`// ❌ Bad
function p(a, b) {
    let c = a + b;
    return c;
}

// ✅ Good
function calculateTotal(price, tax) {
    const total = price + tax;
    return total;
}

// ❌ Bad
if (user && user.profile && user.profile.address) {
    // ...
}

// ✅ Good (Optional Chaining)
if (user?.profile?.address) {
    // ...
}

// ❌ Bad
class UserDataHandler {
    // ... 500 lines ...
}

// ✅ Good (Single Responsibility)
class UserRepository { /* data access */ }
class UserValidator { /* validation */ }
class UserFormatter { /* formatting */ }

// DRY - Don't Repeat Yourself
// KISS - Keep It Simple, Stupid
// YAGNI - You Aren't Gonna Need It`},{id:65,title:`Testing (Jest, Mocha, etc.)`,category:`advanced`,level:`expert`,description:`Testing your code to ensure it works correctly.`,why:`To catch bugs early and ensure code works as expected.`,when:`Every serious project! Unit tests, integration tests.`,code:`// Jest example
function add(a, b) {
    return a + b;
}

test('adds 1 + 2 to equal 3', () => {
    expect(add(1, 2)).toBe(3);
});

test('adds negative numbers', () => {
    expect(add(-1, -2)).toBe(-3);
});

// Async test
test('fetches user data', async () => {
    const user = await fetchUser(1);
    expect(user.name).toBe('Alice');
});

// Mocking
jest.mock('./api');
const mockFetch = jest.fn(() => Promise.resolve({ data: 'mocked' }));`}],s=n(),c=10,l=[`all`,...new Set(o.map(e=>e.category))],u=e=>i.highlight(e,{language:`javascript`,ignoreIllegals:!0}).value;function d(){let[e,t]=(0,a.useState)(1),[n,i]=(0,a.useState)(0),[d,f]=(0,a.useState)(``),[p,m]=(0,a.useState)(`all`),[h,g]=(0,a.useState)(!0),_=(0,a.useMemo)(()=>{let e=d.trim().toLowerCase();return o.filter(t=>(p===`all`||t.category===p)&&(!e||`${t.title} ${t.description} ${t.category}`.toLowerCase().includes(e)))},[p,d]),v=Math.max(1,Math.ceil(_.length/c)),y=Math.min(n,v-1),b=_.slice(y*c,y*c+c),x=_.find(t=>t.id===e)||b[0]||o[0],S=e=>{if(!e)return;t(e.id),g(!1);let n=_.findIndex(t=>t.id===e.id);n>=0&&i(Math.floor(n/c))};return(0,s.jsxs)(`div`,{className:`react-course-page javascript-course-page`,children:[(0,s.jsxs)(`section`,{className:`react-course-hero`,children:[(0,s.jsx)(r,{to:`/javascript`,className:`react-course-back`,children:`← Back to JavaScript`}),(0,s.jsx)(`div`,{className:`react-course-kicker`,children:`JavaScript learning path`}),(0,s.jsx)(`h1`,{children:`Complete JavaScript`}),(0,s.jsx)(`p`,{children:`65+ essential concepts from beginner fundamentals to advanced browser and language features, with the complete examples, Why, and When content.`}),(0,s.jsxs)(`div`,{className:`react-course-stats`,children:[(0,s.jsxs)(`span`,{children:[(0,s.jsx)(`strong`,{children:o.length}),` concepts`]}),(0,s.jsxs)(`span`,{children:[(0,s.jsx)(`strong`,{children:l.length-1}),` learning areas`]}),(0,s.jsxs)(`span`,{children:[(0,s.jsx)(`strong`,{children:`4`}),` levels`]})]})]}),(0,s.jsxs)(`section`,{className:`react-course-workspace`,children:[(0,s.jsx)(`button`,{type:`button`,className:`react-course-mobile-toggle`,"aria-label":h?`Hide course concepts`:`Show course concepts`,"aria-expanded":h,onClick:()=>g(e=>!e),children:h?`←`:`→`}),(0,s.jsxs)(`aside`,{className:`react-course-sidebar${h?``:` is-mobile-collapsed`}`,"aria-label":`JavaScript course navigation`,children:[(0,s.jsxs)(`div`,{className:`react-course-sidebar-top`,children:[(0,s.jsx)(`label`,{htmlFor:`javascript-course-search`,children:`Find a concept`}),(0,s.jsx)(`input`,{id:`javascript-course-search`,value:d,onChange:e=>{f(e.target.value),i(0)},placeholder:`Search concepts`})]}),(0,s.jsx)(`div`,{className:`react-course-filters`,children:l.map(e=>(0,s.jsx)(`button`,{type:`button`,className:p===e?`active`:``,onClick:()=>{m(e),i(0)},children:e},e))}),(0,s.jsxs)(`div`,{className:`react-course-list`,children:[b.map(e=>(0,s.jsxs)(`button`,{type:`button`,className:`react-course-nav-item ${x.id===e.id?`selected`:``}`,onClick:()=>S(e),children:[(0,s.jsx)(`span`,{children:String(e.id).padStart(2,`0`)}),(0,s.jsx)(`strong`,{children:e.title}),(0,s.jsx)(`small`,{children:e.level})]},e.id)),!b.length&&(0,s.jsx)(`p`,{className:`react-course-empty`,children:`No concepts match that search.`})]}),(0,s.jsxs)(`div`,{className:`react-course-pagination`,children:[(0,s.jsx)(`button`,{type:`button`,disabled:y===0,onClick:()=>i(e=>Math.max(0,e-1)),children:`Previous`}),(0,s.jsxs)(`span`,{children:[y+1,` / `,v]}),(0,s.jsx)(`button`,{type:`button`,disabled:y===v-1,onClick:()=>i(e=>Math.min(v-1,e+1)),children:`Next`})]})]}),(0,s.jsxs)(`main`,{className:`react-course-detail`,"aria-live":`polite`,children:[(0,s.jsxs)(`div`,{className:`react-course-detail-top`,children:[(0,s.jsx)(`span`,{className:`react-course-level level-${x.level}`,children:x.level}),(0,s.jsx)(`span`,{className:`react-course-category`,children:x.category}),(0,s.jsxs)(`span`,{className:`react-course-number`,children:[`Concept `,x.id,` of `,o.length]})]}),(0,s.jsx)(`h2`,{children:x.title}),(0,s.jsx)(`p`,{className:`react-course-description`,children:x.description}),(0,s.jsxs)(`div`,{className:`react-course-explain-grid`,children:[(0,s.jsxs)(`section`,{children:[(0,s.jsx)(`h3`,{children:`Why:`}),(0,s.jsx)(`p`,{children:x.why})]}),(0,s.jsxs)(`section`,{children:[(0,s.jsx)(`h3`,{children:`When:`}),(0,s.jsx)(`p`,{children:x.when})]})]}),(0,s.jsxs)(`section`,{className:`react-course-example`,children:[(0,s.jsxs)(`div`,{className:`react-course-example-heading`,children:[(0,s.jsx)(`h3`,{children:`Example:`}),(0,s.jsx)(`span`,{children:`JavaScript`})]}),(0,s.jsx)(`pre`,{children:(0,s.jsx)(`code`,{className:`hljs language-javascript`,dangerouslySetInnerHTML:{__html:u(x.code)}})})]}),(0,s.jsxs)(`div`,{className:`react-course-detail-nav`,children:[(0,s.jsx)(`button`,{type:`button`,disabled:x.id===1,onClick:()=>S(o[x.id-2]),children:`← Previous concept`}),(0,s.jsx)(`button`,{type:`button`,disabled:x.id===o.length,onClick:()=>S(o[x.id]),children:`Next concept →`})]})]})]})]})}export{d as default};