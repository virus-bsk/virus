import{r as e}from"./rolldown-runtime-QTnfLwEv.js";import{t}from"./react-CZI7_Jkm.js";import{r as n,s as r}from"./index-BjSszV1C.js";import{t as i}from"./atom-one-dark-CL0A0LnX.js";var a=e(t(),1),o=`## JavaScript Interview Questions

### Basic Questions

1. **What is JavaScript and how has it evolved?**
   - **Answer**: JavaScript is a high-level, interpreted programming language that conforms to the ECMAScript specification.  JavaScript has evolved with features like Temporal API for date/time, Decorators, and Pattern Matching proposals.
   - **Example**:
     \`\`\`javascript
     // Modern JavaScript 
     const user = {
       name: 'John',
       age: 30,
       // Using newer syntax
       get description() {
         return \`\${this.name} is \${this.age} years old\`;
       }
     };
     \`\`\`
   - **Note**: Modern JavaScript runs everywhere — browsers, servers (Node.js), mobile apps, and even embedded devices.

2. **What are the data types supported by JavaScript ?**
   - **Answer**: Primitive Types: Number, String, Boolean, Undefined, Null, Symbol, BigInt. Structural Types: Object, Function, Array. New: Record & Tuple (proposal stage 3).
   - **Example**:
     \`\`\`javascript
     // Modern data type usage
     const sym = Symbol('id');
     const bigNumber = 9007199254740991n;
     // Record and Tuple (proposed)
     const record = #{ name: "John", age: 30 };
     const tuple = #[1, 2, 3];
     \`\`\`
   - **Note**: Use typeof to check primitives; Array.isArray() for arrays since typeof returns 'object' for arrays.

3. **What are the different ways to declare a variable in JavaScript?**
   - **Answer**: var (legacy), let, const. Best Practice : Use const by default, let when reassignment is needed, avoid var.
   - **Example**:
     \`\`\`javascript
     // Modern approach
     const API_URL = 'https://api.example.com'; // Constant
     let counter = 0; // Mutable
     // Never use var in new code
     \`\`\`
   - **Note**: const prevents reassignment, not mutation — objects declared with const can still have properties changed.

4. **Explain the difference between var, let, and const with modern context.**
   - **Answer**: var: Function-scoped, hoisted, can be redeclared (deprecated). let: Block-scoped, no redeclaration, temporal dead zone. const: Block-scoped, immutable binding, must initialize.
   - **Example**:
     \`\`\`javascript
     // Modern best practices
     const user = { name: 'John' };
     user.name = 'Jane'; // Object can be mutated
     // user = {}; // Error - reassignment not allowed

     // Temporal dead zone (TDZ)
     console.log(x); // ReferenceError (not undefined)
     let x = 10;
     \`\`\`
   - **Note**: TDZ means accessing a let/const variable before declaration throws a ReferenceError instead of returning undefined.

5. **What are the different types of loops in JavaScript ?**
   - **Answer**: Traditional: for, while, do...while. Modern: for...in (objects), for...of (iterables). New: Iterator helpers (ES2025).
   - **Example**:
     \`\`\`javascript
     // Modern iteration
     const array = [1, 2, 3];
     // for-of with destructuring
     for (const [index, value] of array.entries()) {
       console.log(\`\${index}: \${value}\`);
     }
     // Iterator helpers (ES2025)
     const result = array.values()
       .filter(x => x > 1)
       .map(x => x * 2)
       .toArray();
     \`\`\`
   - **Note**: Use for...of for arrays and iterables, for...in only for object keys.

6. **Explain how forEach works and modern alternatives.**
   - **Answer**: forEach executes callback for each element. Modern alternatives: for...of, map, reduce.
   - **Example**:
     \`\`\`javascript
     const numbers = [1, 2, 3];
     // Old way
     numbers.forEach(num => console.log(num));
     // Modern way with async
     for (const num of numbers) {
       await processNumber(num);
     }
     // Functional approach
     numbers.map(num => num * 2);
     \`\`\`
   - **Note**: forEach cannot be stopped with break or await properly — prefer for...of for async operations.

7. **How does the map function work with modern features?**
   - **Answer**: Creates new array by applying callback to each element. Supports chaining with other array methods.
   - **Example**:
     \`\`\`javascript
     const users = [{ name: 'John', age: 30 }, { name: 'Jane', age: 25 }];
     // Modern chain
     const result = users
       .filter(user => user.age > 18)
       .map(user => ({ ...user, adult: true }))
       .sort((a, b) => a.name.localeCompare(b.name));
     \`\`\`
   - **Note**: map always returns a new array of the same length — it never mutates the original.

8. **What is the difference between == and ===?**
   - **Answer**: ==: Abstract equality (type coercion). ===: Strict equality (no coercion). Best Practice : Always use ===, avoid ==.
   - **Example**:
     \`\`\`javascript
     // Modern practice
     if (value === null || value === undefined) {
       // Use nullish coalescing
     }
     // Nullish coalescing operator
     const name = user.name ?? 'Guest';
     \`\`\`
   - **Note**: == coerces types ('1' == 1 is true), === checks type and value ('1' === 1 is false).

9. **What is a closure in JavaScript?**
   - **Answer**: A closure is a function that retains access to its outer scope even after the outer function returns. Modern use: React hooks, memoization, private variables.
   - **Example**:
     \`\`\`javascript
     // Modern closure pattern
     const createCounter = (initial = 0) => {
       let count = initial;
       return {
         increment: () => ++count,
         decrement: () => --count,
         get value() { return count; }
       };
     };
     const counter = createCounter(5);
     \`\`\`
   - **Note**: Closures capture variables by reference, not by value — all closures over the same variable share its state.

10. **Explain hoisting in modern JavaScript.**
    - **Answer**: Declarations moved to top of scope. let and const have TDZ (Temporal Dead Zone). Modern: Use let/const to avoid confusion.
    - **Example**:
      \`\`\`javascript
      // Modern approach
      console.log(x); // ReferenceError (TDZ)
      let x = 5;
      // Function expressions vs declarations
      const greet = () => { console.log('Hello'); };
      \`\`\`
    - **Note**: Only declarations are hoisted, not assignments. Function declarations are fully hoisted including their body.

11. **What is the difference between null and undefined?**
    - **Answer**: null: Explicitly assigned "no value". undefined: Uninitialized variable. Modern: Use nullish coalescing for safe defaults.
    - **Example**:
      \`\`\`javascript
      // Modern safe access
      const value = user?.address?.city ?? 'Unknown';
      // Optional chaining
      const name = user?.profile?.name ?? 'Guest';
      \`\`\`
    - **Note**: typeof null returns 'object' (a historical bug); use value === null to check for null.

12. **What are template literals?**
    - **Answer**: Multi-line strings with interpolation using backticks. Modern: Tagged templates, expression evaluation.
    - **Example**:
      \`\`\`javascript
      // Modern template literals
      const name = 'John';
      const age = 30;
      const message = \`Name: \${name}
      Age: \${age}
      Status: \${age >= 18 ? 'Adult' : 'Minor'}\`;
      // Tagged template
      const html = htmlEscape\`<div>\${userInput}</div>\`;
      \`\`\`
    - **Note**: Tagged templates receive strings and values separately, enabling safe HTML escaping and i18n.

13. **What is an arrow function, and how is it different from a regular function?**
    - **Answer**: Shorter syntax, lexical this binding. Modern: Prefer arrow functions for callbacks, class methods.
    - **Example**:
      \`\`\`javascript
      // Modern usage
      const fetchData = async () => {
        const response = await fetch('/api/data');
        return response.json();
      };
      // Class with arrow methods
      class User {
        constructor(name) { this.name = name; }
        greet = () => console.log(\`Hello \${this.name}\`);
      }
      \`\`\`
    - **Note**: Arrow functions have no own this, arguments, or prototype — they cannot be used as constructors.

14. **Explain the this keyword in modern JavaScript.**
    - **Answer**: Refers to execution context, determined by how function is called. Modern: Arrow functions inherit this, bind() for context.
    - **Example**:
      \`\`\`javascript
      // Modern patterns
      class Component {
        constructor() {
          this.state = {};
          // Auto-bind using arrow
          this.handleClick = () => {
            this.updateState();
          };
        }
      }
      \`\`\`
    - **Note**: this depends on the call site: method call → object, plain call → undefined (strict mode), arrow → enclosing scope.

15. **What is the difference between function declaration and function expression?**
    - **Answer**: Declaration: Hoisted, can be called before definition. Expression: Not hoisted, better for modular code. Modern: Prefer function expressions/arrow functions.
    - **Example**:
      \`\`\`javascript
      // Modern approach - use expressions
      const fetchUsers = async (params) => {
        // Implementation
      };
      // Or named function expression
      const processData = function handleData(data) {
        // Recursion possible
      };
      \`\`\`
    - **Note**: Named function expressions give better stack traces while keeping the binding const-scoped.

16. **What is an Immediately Invoked Function Expression (IIFE) and its modern alternatives?**
    - **Answer**: IIFE: Function executed immediately after definition. Modern: Use modules or block scoping instead.
    - **Example**:
      \`\`\`javascript
      // Legacy IIFE
      (function() {
        var private = 'data';
      })();
      // Modern alternatives
      // 1. Module pattern
      // module.js
      export const private = 'data';
      // 2. Block scope
      {
        let private = 'data';
        // Code here
      }
      \`\`\`
    - **Note**: IIFEs were essential before modules existed; today top-level await and ES modules cover most use cases.

17. **Explain event delegation in modern JavaScript.**
    - **Answer**: Single event listener on parent for multiple child elements. Modern: Use event.target.matches() for filtering.
    - **Example**:
      \`\`\`javascript
      // Modern event delegation
      document.querySelector('#container').addEventListener('click', (e) => {
        const button = e.target.closest('button');
        if (button) {
          const action = button.dataset.action;
          if (action === 'delete') {
            handleDelete(button.id);
          }
        }
      });
      \`\`\`
    - **Note**: Delegation saves memory with many elements and automatically handles dynamically added children.

18. **How do you handle errors in modern JavaScript?**
    - **Answer**: try...catch with async/await, error boundaries. Modern: Async/await error handling, custom error classes.
    - **Example**:
      \`\`\`javascript
      // Modern error handling
      class ApiError extends Error {
        constructor(message, status) {
          super(message);
          this.status = status;
        }
      }
      const fetchData = async () => {
        try {
          const response = await fetch('/api/data');
          if (!response.ok) {
            throw new ApiError('API Error', response.status);
          }
          return await response.json();
        } catch (error) {
          if (error instanceof ApiError) {
            // Handle API error
          }
          throw error;
        }
      };
      \`\`\`
    - **Note**: Always extend Error for custom errors so instanceof checks and stack traces work correctly.

19. **What is the purpose of the try...catch block with modern patterns?**
    - **Answer**: Handle exceptions, cleanup in finally block. Modern: Async/Await with try-catch, error boundaries in React.
    - **Example**:
      \`\`\`javascript
      // Modern pattern
      const processData = async (data) => {
        try {
          await validateData(data);
          await saveData(data);
          return { success: true };
        } catch (error) {
          await logError(error);
          return { success: false, error: error.message };
        } finally {
          cleanup();
        }
      };
      \`\`\`
    - **Note**: finally runs regardless of success or failure — ideal for closing connections and releasing resources.

20. **Explain promises in modern JavaScript .**
    - **Answer**: Object representing async operation completion. Modern: Async/await is preferred over .then() chains.
    - **Example**:
      \`\`\`javascript
      // Modern promise usage
      const fetchData = async (url) => {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Request failed');
        return response.json();
      };
      // Promise.all with modern patterns
      const results = await Promise.allSettled([
        fetchData('/api/user'),
        fetchData('/api/posts')
      ]);
      \`\`\`
    - **Note**: A promise has three states: pending, fulfilled, rejected — once settled it never changes state again.

21. **What are async/await and how do they relate to promises?**
    - **Answer**: Syntactic sugar for promises, makes async code look synchronous. Modern: Use with Top-level await (ES2022+).
    - **Example**:
      \`\`\`javascript
      // Modern async/await
      // Top-level await
      const config = await import('./config.js');
      // Module-level async
      export default async function () {
        const data = await fetchData();
        return processData(data);
      };
      \`\`\`
    - **Note**: await pauses only the current async function — other code continues running concurrently.

22. **What is a callback function and its modern alternatives?**
    - **Answer**: Function passed as argument, executed later. Modern: Promises, async/await instead of callbacks.
    - **Example**:
      \`\`\`javascript
      // Legacy callback
      function fetchData(callback) {
        setTimeout(() => callback('data'), 1000);
      }
      // Modern alternative
      const fetchData = () => new Promise(resolve => {
        setTimeout(() => resolve('data'), 1000);
      });
      // Usage
      const data = await fetchData();
      \`\`\`
    - **Note**: Callbacks are still used for event handlers and array methods, but not for control flow.

23. **Explain callback hell and how to avoid it .**
    - **Answer**: Nested callbacks making code hard to read. Modern: Promises, async/await, observables.
    - **Example**:
      \`\`\`javascript
      // Modern approach with async/await
      const processData = async () => {
        try {
          const user = await getUser();
          const orders = await getOrders(user.id);
          const details = await Promise.all(orders.map(getOrderDetails));
          return { user, orders: details };
        } catch (error) {
          await logError(error);
          throw error;
        }
      };
      \`\`\`
    - **Note**: Use Promise.all for independent parallel calls instead of sequential awaits to improve performance.

24. **What are JavaScript modules?**
    - **Answer**: Native ES modules with import/export, dynamic imports. Modern: Module federation, import maps.
    - **Example**:
      \`\`\`javascript
      // Modern modules
      // feature.js
      export const feature = async () => {
        // Dynamic import
        const { default: lib } = await import('./lib.js');
        return lib.process();
      };
      // main.js
      import { feature } from './feature.js';
      // Import map
      <script type="importmap">
      {
        "imports": {
          "react": "https://cdn.jsdelivr.net/npm/react@18/index.js"
        }
      }
      <\/script>
      \`\`\`
    - **Note**: Dynamic imports enable code splitting — load heavy libraries only when actually needed.

25. **How do you export and import modules in JavaScript?**
    - **Answer**: Named exports, default exports, namespace imports. Modern: Export maps, conditional exports.
    - **Example**:
      \`\`\`javascript
      // Modern exports (package.json)
      {
        "exports": {
          ".": {
            "import": "./dist/index.js",
            "require": "./dist/index.cjs"
          }
        }
      }
      // Named exports
      export const PI = 3.14;
      export default class Calculator {}
      // Import with renaming
      import { PI as PI_VALUE } from './math.js';
      \`\`\`
    - **Note**: A module can have one default export and unlimited named exports; default imports allow any local name.

26. **What is the purpose of the spread operator ?**
    - **Answer**: Expands iterables, creates shallow copies. Modern: Spread with objects, arrays, function calls.
    - **Example**:
      \`\`\`javascript
      // Modern spread usage
      // Deep clone with structuredClone
      const clone = structuredClone(original);
      // Spread with Set
      const unique = [...new Set([1, 2, 2, 3])];
      // Spread with Map
      const newMap = new Map([...oldMap, [key, value]]);
      \`\`\`
    - **Note**: Spread creates shallow copies — nested objects still share references; use structuredClone for deep copies.

27. **How does the rest operator work with modern patterns?**
    - **Answer**: Collects remaining arguments/values. Modern: Destructuring, function parameters.
    - **Example**:
      \`\`\`javascript
      // Modern rest patterns
      const { id, ...rest } = user;
      const [first, ...others] = items;
      // Function with rest
      const logMessages = (level, ...messages) => {
        messages.forEach(msg => console[level](msg));
      };
      // With type checking
      const sum = (...numbers) => numbers.reduce((a, b) => a + b, 0);
      \`\`\`
    - **Note**: Rest must be the last element in destructuring patterns or parameter lists.

28. **What is destructuring assignment?**
    - **Answer**: Unpack values from arrays/objects. Modern: Default values, renaming, nested destructuring.
    - **Example**:
      \`\`\`javascript
      // Modern destructuring
      const { name: userName, age = 18, address: { city } } = user;
      // Array destructuring with rest
      const [first, second, ...rest] = array;
      // Function parameter destructuring
      const processUser = ({ id, name, preferences = {} }) => {
        // Implementation
      };
      \`\`\`
    - **Note**: Destructuring with defaults only applies when the value is undefined, not null or falsy.

29. **What is the event loop and how does it work in modern JavaScript?**
    - **Answer**: Handles async operations, microtasks, macrotasks. Modern: Microtasks (Promise), macrotasks (setTimeout).
    - **Example**:
      \`\`\`javascript
      // Modern event loop understanding
      console.log('1'); // Sync
      setTimeout(() => console.log('2'), 0); // Macrotask
      Promise.resolve().then(() => console.log('3')); // Microtask
      queueMicrotask(() => console.log('4')); // Microtask
      // Output: 1, 3, 4, 2
      \`\`\`
    - **Note**: All microtasks drain before the next macrotask — this ordering explains most async timing surprises.

30. **Explain single-threaded in JavaScript with modern context.**
    - **Answer**: One call stack, handles tasks sequentially. Modern: Web Workers for parallel execution.
    - **Example**:
      \`\`\`javascript
      // Modern parallel processing
      // Web Worker
      const worker = new Worker('worker.js');
      worker.postMessage(data);
      worker.onmessage = (e) => {
        console.log('Result:', e.data);
      };
      // Shared Array Buffer
      const sab = new SharedArrayBuffer(1024);
      // Atomics for synchronization
      \`\`\`
    - **Note**: Long-running CPU tasks block the UI thread — offload them to Web Workers to keep the page responsive.

### Intermediate Questions

31. **What are higher-order functions with modern examples?**
    - **Answer**: Functions taking/returning functions. Modern: Composition, currying, functional programming.
    - **Example**:
      \`\`\`javascript
      // Modern functional patterns
      const withLogging = (fn) => async (...args) => {
        console.log('Starting:', args);
        const result = await fn(...args);
        console.log('Result:', result);
        return result;
      };
      const withRetry = (fn, maxRetries = 3) => async (...args) => {
        for (let i = 0; i < maxRetries; i++) {
          try { return await fn(...args); }
          catch (e) { if (i === maxRetries - 1) throw e; }
        }
      };
      const fetchData = withLogging(withRetry(apiFetch));
      \`\`\`
    - **Note**: HOFs power middleware patterns in Express, Redux, and React higher-order components.

32. **How do you create a class in JavaScript ?**
    - **Answer**: Class syntax with private fields, static methods. Modern: Private fields (#), static blocks, decorators.
    - **Example**:
      \`\`\`javascript
      // Modern class features
      class User {
        #privateField = 'secret';
        static #privateStatic = 'static secret';

        constructor(name) {
          this.name = name;
        }

        #privateMethod() {
          return this.#privateField;
        }

        static #privateStaticMethod() {}

        static { // Static initialization block
          console.log('Class initialized');
        }
      }
      // Decorators (stage 3)
      @logged
      class Service {
        @deprecated
        method() {}
      }
      \`\`\`
    - **Note**: Private fields (#) are enforced by the engine — truly inaccessible from outside, unlike underscore conventions.

33. **What are getters and setters in JavaScript classes?**
    - **Answer**: Define computed properties with get/set. Modern: Private fields, computed property names.
    - **Example**:
      \`\`\`javascript
      // Modern getters/setters
      class User {
        #password;

        constructor(firstName, lastName) {
          this._firstName = firstName;
          this._lastName = lastName;
        }

        get fullName() {
          return \`\${this._firstName} \${this._lastName}\`;
        }

        set password(value) {
          if (value.length < 8) throw new Error('Too short');
          this.#password = hash(value);
        }

        // Private getter
        get #secret() {
          return 'secret';
        }
      }
      \`\`\`
    - **Note**: Getters/setters look like properties to consumers, letting you add validation without changing call sites.

34. **What is prototype inheritance with modern practices?**
    - **Answer**: Objects inherit from other objects via prototype chain. Modern: Use classes, Object.setPrototypeOf, Object.create.
    - **Example**:
      \`\`\`javascript
      // Modern prototype usage
      const baseObj = {
        greet() { console.log('Hello'); }
      };
      const child = Object.create(baseObj);
      child.greet(); // Inherited
      // Class inheritance
      class Animal {
        constructor(name) { this.name = name; }
        speak() { console.log(\`\${this.name} speaks\`); }
      }
      class Dog extends Animal {
        speak() { super.speak(); console.log('Woof!'); }
      }
      \`\`\`
    - **Note**: Classes are syntactic sugar over prototypes — Dog.prototype inherits from Animal.prototype under the hood.

35. **How does the prototype chain work with modern features?**
    - **Answer**: Chain of objects linked via prototype. Modern: Reflect API, Proxy for metaprogramming.
    - **Example**:
      \`\`\`javascript
      // Modern prototype chain
      const parent = { a: 1 };
      const child = Object.setPrototypeOf({ b: 2 }, parent);
      // Reflect API
      Reflect.getPrototypeOf(child); // parent
      // Proxy for prototype interception
      const proxy = new Proxy(child, {
        get(target, prop) {
          if (prop in target) return target[prop];
          return 'default';
        }
      });
      \`\`\`
    - **Note**: Property lookup walks up the chain until found or null — mutation of a prototype affects all inheriting objects.

36. **What is the difference between classical inheritance and prototypal inheritance?**
    - **Answer**: Classical: Class-based (Java-like), inheritance from classes. Prototypal: Object-based, inheritance from objects. Modern: Mixins, composition over inheritance.
    - **Example**:
      \`\`\`javascript
      // Modern composition pattern
      const canEat = {
        eat() { console.log('Eating'); }
      };
      const canWalk = {
        walk() { console.log('Walking'); }
      };
      // Compose
      const person = Object.assign({}, canEat, canWalk);
      // Or using class with mixins
      class Person {
        constructor(name) { this.name = name; }
      }
      Object.assign(Person.prototype, canEat, canWalk);
      \`\`\`
    - **Note**: Prefer composition — deep inheritance hierarchies become rigid and hard to refactor.

37. **What are pure functions and why are they important?**
    - **Answer**: Same input = same output, no side effects. Modern: Functional programming, testing, memoization.
    - **Example**:
      \`\`\`javascript
      // Modern pure functions
      const memoize = (fn) => {
        const cache = new Map();
        return (...args) => {
          const key = JSON.stringify(args);
          if (cache.has(key)) return cache.get(key);
          const result = fn(...args);
          cache.set(key, result);
          return result;
        };
      };
      const compute = memoize((x, y) => x + y);
      // Immutable updates
      const updateUser = (user, updates) => ({
        ...user,
        ...updates,
        updatedAt: new Date()
      });
      \`\`\`
    - **Note**: Pure functions are trivially testable, cacheable, and safe to run in parallel — the foundation of React rendering.

38. **What is the concept of immutability in JavaScript?**
    - **Answer**: Data cannot be modified after creation. Modern: Immutable patterns, libraries (Immer), structuredClone.
    - **Example**:
      \`\`\`javascript
      // Modern immutability
      // Use structuredClone for deep clone
      const clone = structuredClone(original);
      // Immer for immutable updates
      import { produce } from 'immer';
      const nextState = produce(state, draft => {
        draft.users.push(newUser);
      });
      // Object.freeze
      const frozen = Object.freeze({ count: 1 });
      // frozen.count = 2; // Error in strict mode
      \`\`\`
    - **Note**: Immutability enables cheap change detection via reference equality — critical for React.memo and Redux.

39. **Explain strict mode in modern JavaScript.**
    - **Answer**: Opt-in to restricted JavaScript variant. Modern: Default in modules, classes.
    - **Example**:
      \`\`\`javascript
      // Modern strict mode
      // Modules are strict by default
      // Class definitions are strict by default
      class User {
        // Strict by default
      }
      // Explicit strict mode
      'use strict';
      // Features enabled
      // - No silent errors
      // - No duplicate parameter names
      // - No with statement
      \`\`\`
    - **Note**: Strict mode turns silent failures into thrown errors, catching bugs early during development.

40. **What are the differences between call, apply, and bind?**
    - **Answer**: call: Invokes with context and arguments. apply: Like call but with array of arguments. bind: Returns new function with bound context. Modern: Arrow functions avoid need for bind.
    - **Example**:
      \`\`\`javascript
      // Modern usage
      const user = { name: 'John' };
      // No need for bind with arrow functions
      class Component {
        constructor() {
          this.handleClick = () => {
            console.log(this.state);
          };
        }
      }
      // Function call with spread
      Math.max(...numbers);
      // Reflect.apply
      Reflect.apply(console.log, console, ['Hello']);
      \`\`\`
    - **Note**: With spread (...) you rarely need apply anymore — f(...args) replaces f.apply(null, args).

41. **What is the fetch API?**
    - **Answer**: Modern API for HTTP requests. Modern: AbortController, FormData, Streams API.
    - **Example**:
      \`\`\`javascript
      // Modern fetch with abort
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      try {
        const response = await fetch('/api/data', {
          signal: controller.signal,
          headers: { 'Content-Type': 'application/json' }
        });
        const stream = response.body;
        // Streaming response
        const reader = stream.getReader();
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          // Process chunk
        }
      } catch (err) {
        if (err.name === 'AbortError') {
          console.log('Request aborted');
        }
      }
      \`\`\`
    - **Note**: fetch only rejects on network failure — check response.ok for HTTP error statuses like 404 or 500.

42. **How do you make HTTP requests in modern JavaScript?**
    - **Answer**: Modern: Fetch API, WebSocket, EventSource. Libraries: Axios, Ky (modern fetch wrapper).
    - **Example**:
      \`\`\`javascript
      // Modern HTTP with Ky
      import ky from 'ky';
      const data = await ky.get('/api/data', {
        timeout: 5000,
        retry: 3,
        hooks: {
          beforeRequest: [request => {
            request.headers.set('Authorization', \`Bearer \${token}\`);
          }]
        }
      }).json();
      // WebSocket
      const ws = new WebSocket('wss://api.example.com');
      ws.onmessage = ({ data }) => {
        const message = JSON.parse(data);
        handleMessage(message);
      };
      // Server-Sent Events
      const eventSource = new EventSource('/api/events');
      eventSource.onmessage = ({ data }) => {
        handleEvent(JSON.parse(data));
      };
      \`\`\`
    - **Note**: Choose per use case: fetch for simple requests, SSE for server push, WebSocket for bidirectional real-time.

43. **What are Web Workers in modern JavaScript?**
    - **Answer**: Run scripts in background threads. Modern: Dedicated workers, shared workers, service workers.
    - **Example**:
      \`\`\`javascript
      // Modern worker usage
      const worker = new Worker('worker.js', { type: 'module' });
      // Transferable objects
      const buffer = new ArrayBuffer(1024);
      worker.postMessage(buffer, [buffer]);
      // Shared worker
      const shared = new SharedWorker('shared.js');
      shared.port.onmessage = handleMessage;
      shared.port.start();
      // Service worker for PWA
      const register = async () => {
        const registration = await navigator.serviceWorker.register('/sw.js', {
          scope: '/'
        });
      };
      \`\`\`
    - **Note**: Workers cannot access the DOM — communicate via postMessage and structured clone or transferables.

44. **What are service workers and how do you use them?**
    - **Answer**: Background scripts for offline support, push notifications. Modern: Workbox, PWA, cache strategies.
    - **Example**:
      \`\`\`javascript
      // Modern service worker
      // sw.js
      const CACHE_NAME = 'v1';
      const urls = ['/', '/index.html', '/styles.css'];

      self.addEventListener('install', event => {
        event.waitUntil(
          caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urls))
        );
      });
      self.addEventListener('fetch', event => {
        event.respondWith(
          caches.match(event.request)
            .then(response => {
              // Network first strategy
              return response || fetch(event.request)
                .then(response => {
                  caches.open(CACHE_NAME)
                    .then(cache => cache.put(event.request, response));
                  return response.clone();
                });
            })
        );
      });
      \`\`\`
    - **Note**: Service workers act as a programmable network proxy — version your cache names to force updates.

45. **How do you implement caching in JavaScript?**
    - **Answer**: Modern: Cache API, localStorage, IndexedDB. Patterns: SWR (stale-while-revalidate).
    - **Example**:
      \`\`\`javascript
      // Modern caching patterns
      class CacheManager {
        constructor() {
          this.cache = new Map();
        }

        async get(key, fetchFn) {
          const cached = this.cache.get(key);
          if (cached && Date.now() - cached.timestamp < 60000) {
            return cached.data;
          }
          const data = await fetchFn();
          this.cache.set(key, { data, timestamp: Date.now() });
          return data;
        }
      }
      // IndexedDB for large data
      const db = await idb.openDB('my-db', 1, {
        upgrade(db) {
          db.createObjectStore('cache');
        }
      });
      \`\`\`
    - **Note**: Match storage to data size: Map/memory for session, localStorage for small prefs, IndexedDB for large datasets.

46. **What is the purpose of the Symbol type?**
    - **Answer**: Creates unique primitive values. Modern: Well-known symbols, private symbols.
    - **Example**:
      \`\`\`javascript
      // Modern Symbol usage
      const id = Symbol('id');
      const user = {
        [id]: '123',
        name: 'John'
      };
      // Well-known symbols
      const iterable = {
        [Symbol.iterator]: function* () {
          yield 1;
          yield 2;
        }
      };
      // Symbol.asyncIterator for async iteration
      const asyncIterable = {
        async *[Symbol.asyncIterator]() {
          yield await Promise.resolve(1);
        }
      };
      \`\`\`
    - **Note**: Symbols are invisible to for...in and JSON.stringify — perfect for metadata keys that shouldn't leak.

47. **What are WeakMap and WeakSet?**
    - **Answer**: Weak references to objects, no prevention of GC. Modern: Memory management, private data.
    - **Example**:
      \`\`\`javascript
      // Modern WeakMap usage
      const privateData = new WeakMap();
      class User {
        constructor(name) {
          privateData.set(this, { name });
        }
        getName() {
          return privateData.get(this).name;
        }
      }
      // WeakSet for object tracking
      const visited = new WeakSet();
      const visit = (obj) => {
        if (visited.has(obj)) return;
        visited.add(obj);
        process(obj);
      };
      // FinalizationRegistry
      const registry = new FinalizationRegistry((held) => {
        console.log('Object cleaned up', held);
      });
      \`\`\`
    - **Note**: WeakMap keys don't prevent garbage collection — ideal for attaching metadata without memory leaks.

48. **How do you create and use generators in JavaScript?**
    - **Answer**: Functions that can pause/resume execution. Modern: Async generators, infinite streams.
    - **Example**:
      \`\`\`javascript
      // Modern generators
      const generateNumbers = function* (start = 0) {
        let i = start;
        while (true) {
          yield i++;
        }
      };
      // Async generator
      const fetchPages = async function* (url) {
        let page = 1;
        while (true) {
          const response = await fetch(\`\${url}?page=\${page}\`);
          const data = await response.json();
          if (data.length === 0) break;
          yield data;
          page++;
        }
      };
      // Using for-await-of
      for await (const page of fetchPages('/api/users')) {
        console.log(page);
      }
      \`\`\`
    - **Note**: Generators produce values lazily — perfect for infinite sequences and streaming large datasets.

49. **What is the purpose of the yield keyword?**
    - **Answer**: Pauses generator and returns value. Modern: Delegation, infinite sequences.
    - **Example**:
      \`\`\`javascript
      // Modern yield patterns
      const generateSequence = function* (start, end) {
        for (let i = start; i <= end; i++) {
          yield i;
        }
      };
      // Yield delegation
      const generateCombined = function* () {
        yield* [1, 2, 3];
        yield* generateSequence(4, 6);
      };
      // Asynchronous yield
      const asyncGen = async function* () {
        yield await fetchData();
        yield await fetchMoreData();
      };
      \`\`\`
    - **Note**: yield* delegates to another iterable or generator, flattening nested generation logic.

50. **What are iterators and iterable objects?**
    - **Answer**: Objects implementing iteration protocol. Modern: Custom iterators, async iteration.
    - **Example**:
      \`\`\`javascript
      // Modern iterator
      const range = {
        start: 1,
        end: 5,
        [Symbol.iterator]() {
          let current = this.start;
          return {
            next: () => {
              if (current <= this.end) {
                return { value: current++, done: false };
              }
              return { done: true };
            }
          };
        }
      };
      // Async iterator
      const asyncRange = {
        [Symbol.asyncIterator]: async function* () {
          for (let i = 1; i <= 5; i++) {
            await new Promise(r => setTimeout(r, 1000));
            yield i;
          }
        }
      };
      \`\`\`
    - **Note**: Any object with Symbol.iterator works with for...of, spread, and destructuring automatically.
`,s=`### Advanced Questions

51. **What is the concept of dynamic typing?**
    - **Answer**: Types determined at runtime. Modern: TypeScript, JSDoc for type safety.
    - **Example**:
      \`\`\`javascript
      // Modern type validation
      const validate = (value) => {
        if (typeof value !== 'string') {
          throw new TypeError('Expected string');
        }
      };
      // JSDoc type annotations
      /**
       * @param {number} x
       * @param {number} y
       * @returns {number}
       */
      const add = (x, y) => x + y;
      // Runtime type checking
      const checkType = (value, schema) => {
        // Implementation with Zod or similar
      };
      \`\`\`
    - **Note**: JSDoc gives you TypeScript-grade checking in plain JS files via the tsc --checkJs flag.

52. **How does type coercion work in modern JavaScript?**
    - **Answer**: Automatic conversion between types. Modern: Avoid coercion, use explicit conversion.
    - **Example**:
      \`\`\`javascript
      // Modern coercion
      // Use explicit conversion
      const num = Number('42');
      const str = String(42);
      // Avoid implicit coercion
      const result = Number(a) + Number(b);
      // Nullish coalescing for safe defaults
      const value = input ?? 'default';
      // Optional chaining for safe access
      const name = user?.profile?.name;
      \`\`\`
    - **Note**: Implicit coercion causes subtle bugs ('1' + 1 = '11') — always convert explicitly.

53. **What are the new features in ES2026?**
    - **Answer**: Temporal API, Decorators, Pattern Matching. New Set methods: union(), intersection(). Array.fromAsync() for async iteration.
    - **Example**:
      \`\`\`javascript
      // ES2025 features
      // Temporal API
      const now = Temporal.Now.plainDateISO();
      const tomorrow = now.add({ days: 1 });
      // Decorators
      @log
      class Example {
        @deprecated
        oldMethod() {}
      }
      // Pattern matching
      const value = match(user) {
        when ({ type: 'admin' }) => 'Admin';
        when ({ type: 'user' }) => 'User';
        otherwise => 'Unknown';
      };
      \`\`\`
    - **Note**: Check browser support before using cutting-edge features — many are still proposal-stage.

54. **What are promises and how do they work ?**
    - **Answer**: Objects representing async operations. Modern: Promise.withResolvers(), Promise.any().
    - **Example**:
      \`\`\`javascript
      // Modern promise patterns
      const { promise, resolve, reject } = Promise.withResolvers();
      // Promise combinators
      const results = await Promise.allSettled([
        fetch('/api/user'),
        fetch('/api/posts')
      ]);
      // Promise.any (ES2021) - first fulfilled
      const first = await Promise.any([
        fetch('/api/primary'),
        fetch('/api/backup')
      ]);
      \`\`\`
    - **Note**: Promise.any rejects only when ALL promises reject, collecting an AggregateError.

55. **How do you handle multiple promises in JavaScript?**
    - **Answer**: Promise.all, Promise.race, Promise.allSettled. Modern: Promise.any, Promise.withResolvers.
    - **Example**:
      \`\`\`javascript
      // Modern promise handling
      const fetchWithFallback = async (urls) => {
        const promises = urls.map(url => fetch(url));
        // Race with timeout
        const timeout = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Timeout')), 5000)
        );
        return Promise.race([Promise.any(promises), timeout]);
      };
      // Batch processing with concurrency
      const processBatch = async (items, concurrency = 5) => {
        const results = [];
        for (let i = 0; i < items.length; i += concurrency) {
          const batch = items.slice(i, i + concurrency);
          const batchResults = await Promise.all(
            batch.map(item => processItem(item))
          );
          results.push(...batchResults);
        }
        return results;
      };
      \`\`\`
    - **Note**: Batching with controlled concurrency prevents overwhelming APIs while staying fast.

56. **What is the Promise.all method?**
    - **Answer**: Waits for all promises to resolve. Modern: Promise.allSettled for error handling.
    - **Example**:
      \`\`\`javascript
      // Modern Promise.all
      const fetchAll = async () => {
        const [user, posts, comments] = await Promise.all([
          fetchUser(),
          fetchPosts(),
          fetchComments()
        ]);
        return { user, posts, comments };
      };
      // Promise.allSettled for partial results
      const results = await Promise.allSettled([
        fetch('/api/user'),
        fetch('/api/posts')
      ]);
      const successful = results
        .filter(r => r.status === 'fulfilled')
        .map(r => r.value);
      \`\`\`
    - **Note**: Promise.all fails fast — one rejection rejects everything; use allSettled when partial success is acceptable.

57. **What is the Promise.race method?**
    - **Answer**: Resolves/rejects with first settled promise. Modern: Timeout patterns, competition.
    - **Example**:
      \`\`\`javascript
      // Modern race patterns
      const withTimeout = (promise, ms) => {
        const timeout = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Timeout')), ms)
        );
        return Promise.race([promise, timeout]);
      };
      // CDN fallback
      const loadResource = (primary, fallback) => {
        return Promise.race([
          loadFromCDN(primary),
          loadFromCDN(fallback)
        ]);
      };
      \`\`\`
    - **Note**: The losing promise still runs to completion — race doesn't cancel anything.

58. **How do you create a custom promise?**
    - **Answer**: New Promise constructor. Modern: Promise.withResolvers for better patterns.
    - **Example**:
      \`\`\`javascript
      // Modern custom promise
      class BetterPromise extends Promise {
        // Custom methods
        timeout(ms) {
          return withTimeout(this, ms);
        }
        retry(attempts) {
          return withRetry(this, attempts);
        }
      }
      // Promise.withResolvers
      const { promise, resolve, reject } = Promise.withResolvers();
      // Usage with external events
      const eventToPromise = (emitter, event) => {
        const { promise, resolve } = Promise.withResolvers();
        emitter.once(event, resolve);
        return promise;
      };
      \`\`\`
    - **Note**: Promise.withResolvers separates creation from resolution — cleaner than wrapping callbacks.

59. **What is the purpose of the Proxy object?**
    - **Answer**: Custom behavior for fundamental operations. Modern: Reactive programming, validation, logging.
    - **Example**:
      \`\`\`javascript
      // Modern proxy patterns
      const createReactiveState = (initial) => {
        const subscribers = new Set();
        return new Proxy(initial, {
          set(target, prop, value) {
            target[prop] = value;
            subscribers.forEach(cb => cb(target));
            return true;
          }
        });
      };
      // Validation proxy
      const validateObject = (schema) => ({
        set(target, prop, value) {
          const validator = schema[prop];
          if (validator && !validator(value)) {
            throw new Error(\`Invalid \${prop}\`);
          }
          target[prop] = value;
          return true;
        }
      });
      \`\`\`
    - **Note**: Vue's reactivity system is built on Proxies — intercepting get/set enables automatic dependency tracking.

60. **How do you create a proxy in JavaScript?**
    - **Answer**: new Proxy(target, handler). Modern: Revocable proxies, Reflect API.
    - **Example**:
      \`\`\`javascript
      // Modern proxy creation
      const { proxy, revoke } = Proxy.revocable(target, handler);
      // Revoke when done
      revoke();
      // Proxy with Reflect
      const loggingProxy = new Proxy(obj, {
        get(target, prop) {
          console.log(\`Getting \${String(prop)}\`);
          return Reflect.get(target, prop);
        },
        set(target, prop, value) {
          console.log(\`Setting \${String(prop)} to \${value}\`);
          return Reflect.set(target, prop, value);
        }
      });
      \`\`\`
    - **Note**: Always pair handler traps with Reflect calls to preserve default behavior and correct this binding.

61. **What is the Reflect API?**
    - **Answer**: Methods for interceptable JavaScript operations. Modern: Metaprogramming, proxy integration.
    - **Example**:
      \`\`\`javascript
      // Modern Reflect usage
      const obj = { a: 1 };
      // Reflection methods
      Reflect.set(obj, 'b', 2);
      Reflect.defineProperty(obj, 'c', { value: 3 });
      // Construct with new.target
      const instance = Reflect.construct(MyClass, [arg1, arg2]);
      // Apply function with context
      Reflect.apply(console.log, console, ['Hello']);
      \`\`\`
    - **Note**: Reflect mirrors every Proxy trap — together they form JavaScript's metaprogramming toolkit.

62. **How does the Reflect API differ from normal object operations?**
    - **Answer**: Better error handling (boolean returns). Modern: Consistent behavior, proxy compatibility.
    - **Example**:
      \`\`\`javascript
      // Modern comparison
      // Old way (throws on error)
      try {
        Object.defineProperty(obj, 'prop', {});
      } catch (e) {}
      // Reflect (returns boolean)
      if (!Reflect.defineProperty(obj, 'prop', {})) {
        // Handle failure gracefully
      }
      // Useful in proxies
      const handler = {
        get(target, prop) {
          return Reflect.get(target, prop);
        }
      };
      \`\`\`
    - **Note**: Reflect functions return false instead of throwing, making failure handling explicit.

63. **What is the difference between synchronous and asynchronous code?**
    - **Answer**: Synchronous: Blocks, sequential execution. Asynchronous: Non-blocking, parallel execution. Modern: Async/Await, workers, async iteration.
    - **Example**:
      \`\`\`javascript
      // Modern async patterns
      // Parallel async
      const [data1, data2] = await Promise.all([
        fetchData1(),
        fetchData2()
      ]);
      // Async iteration with backpressure
      const processStream = async (stream) => {
        for await (const chunk of stream) {
          await process(chunk);
        }
      };
      \`\`\`
    - **Note**: Sequential awaits are slower than parallel Promise.all when operations don't depend on each other.

64. **How do you debug JavaScript code ?**
    - **Answer**: Chrome DevTools, VS Code debugger. Modern: Logging, breakpoints, performance tools.
    - **Example**:
      \`\`\`javascript
      // Modern debugging
      // Console
      console.trace('Stack trace');
      console.group('Request details');
      console.log('URL:', url);
      console.groupEnd();
      // Performance
      performance.mark('start');
      // ... code ...
      performance.mark('end');
      performance.measure('duration', 'start', 'end');
      // Memory
      console.memory;
      // Error tracking
      const error = new Error('Custom error');
      console.error(error);
      \`\`\`
    - **Note**: Use debugger; statements and conditional breakpoints instead of scattered console.logs.

65. **What are the different ways to handle asynchronous operations?**
    - **Answer**: Callbacks, Promises, Async/Await. Modern: Observables, event emitters.
    - **Example**:
      \`\`\`javascript
      // Modern async patterns
      // Event emitter pattern
      const events = new EventTarget();
      events.addEventListener('complete', (e) => {
        console.log(e.detail);
      });
      // Observable pattern
      const observable = new Observable(subscriber => {
        subscriber.next('Hello');
        subscriber.complete();
      });
      observable.subscribe({
        next: (value) => console.log(value),
        error: (err) => console.error(err),
        complete: () => console.log('Done')
      });
      \`\`\`
    - **Note**: Choose callbacks for events, promises for one-shot async, observables for streams of values over time.

66. **How do you prevent default behavior in an event?**
    - **Answer**: preventDefault() method. Modern: Passive events for performance.
    - **Example**:
      \`\`\`javascript
      // Modern event handling
      const form = document.querySelector('form');
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        // Custom submission
      });
      // Passive scroll listeners
      document.addEventListener('scroll', handler, { passive: true });
      // Custom events
      const event = new CustomEvent('my-event', {
        detail: { data: 'value' },
        cancelable: true
      });
      \`\`\`
    - **Note**: Mark scroll/touch listeners as passive so the browser can optimize scrolling performance.

67. **What is event bubbling and event capturing?**
    - **Answer**: Bubbling: From target to root. Capturing: From root to target. Modern: Event delegation, useCapture.
    - **Example**:
      \`\`\`javascript
      // Modern event flow
      // Capture phase
      parent.addEventListener('click', handler, { capture: true });
      // Bubbling phase (default)
      child.addEventListener('click', handler);
      // Stop propagation
      element.addEventListener('click', (e) => {
        e.stopPropagation();
      });
      \`\`\`
    - **Note**: Events flow capture → target → bubble; delegation relies on bubbling to catch child events at parents.

68. **How do you stop event propagation?**
    - **Answer**: stopPropagation() method. Modern: stopImmediatePropagation().
    - **Example**:
      \`\`\`javascript
      // Modern event control
      element.addEventListener('click', (e) => {
        // Prevents other handlers on same element
        e.stopImmediatePropagation();
        // Prevents bubbling
        e.stopPropagation();
        // Prevent default
        e.preventDefault();
        // Check if default prevented
        if (e.defaultPrevented) {
          // Handle prevented
        }
      });
      \`\`\`
    - **Note**: stopImmediatePropagation also blocks other listeners on the same element, not just ancestors.

69. **What are custom events in JavaScript?**
    - **Answer**: User-defined events. Modern: CustomEvent API, event targets.
    - **Example**:
      \`\`\`javascript
      // Modern custom events
      const myEvent = new CustomEvent('user-action', {
        detail: {
          userId: 123,
          action: 'login'
        },
        bubbles: true,
        cancelable: true
      });
      document.dispatchEvent(myEvent);
      // Reactive state with custom events
      class Store extends EventTarget {
        constructor(initial) {
          super();
          this.state = initial;
        }
        setState(newState) {
          this.state = { ...this.state, ...newState };
          this.dispatchEvent(new Event('change'));
        }
      }
      \`\`\`
    - **Note**: CustomEvent.detail carries arbitrary data; extend EventTarget to build observable stores without libraries.

70. **What are WebSockets and how do you use them?**
    - **Answer**: Persistent real-time communication. Modern: WebSocket API, protocols, automatic reconnection.
    - **Example**:
      \`\`\`javascript
      // Modern WebSocket
      class WebSocketClient {
        constructor(url) {
          this.url = url;
          this.connect();
        }
        connect() {
          this.ws = new WebSocket(this.url);
          this.ws.onopen = () => this.handleOpen();
          this.ws.onmessage = (e) => this.handleMessage(e);
          this.ws.onclose = () => this.handleClose();
          this.ws.onerror = (e) => this.handleError(e);
        }
        handleClose() {
          // Reconnect with exponential backoff
          setTimeout(() => this.connect(), 1000);
        }
        send(data) {
          if (this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify(data));
          }
        }
      }
      \`\`\`
    - **Note**: Implement reconnection with exponential backoff and heartbeat pings for production reliability.

### Expert Questions

71. **What are SharedArrayBuffer and Atomics?**
    - **Answer**: Shared memory between threads, atomic operations. Modern: Web Workers, high-performance computing.
    - **Example**:
      \`\`\`javascript
      // Modern SharedArrayBuffer
      const sab = new SharedArrayBuffer(1024);
      const int32 = new Int32Array(sab);
      // Worker 1
      Atomics.add(int32, 0, 1);
      // Worker 2
      const value = Atomics.load(int32, 0);
      // Wait/notify for synchronization
      Atomics.wait(int32, 0, 0);
      Atomics.notify(int32, 0, 1);
      \`\`\`
    - **Note**: Requires COOP/COEP headers for security; Atomics guarantee atomic read-modify-write across threads.

72. **What are Transferable Objects?**
    - **Answer**: Objects that can be transferred between contexts. Modern: Efficient data passing in workers.
    - **Example**:
      \`\`\`javascript
      // Modern transfer
      const buffer = new ArrayBuffer(1024);
      const view = new Uint8Array(buffer);
      // Transfer ownership
      worker.postMessage(view, [view.buffer]);
      // After transfer, original is unusable
      console.log(view.byteLength); // 0
      // Other transferable objects
      const canvas = new OffscreenCanvas(100, 100);
      const bitmap = canvas.transferToImageBitmap();
      worker.postMessage(bitmap, [bitmap]);
      \`\`\`
    - **Note**: Transfers move ownership with zero-copy — far faster than structured cloning large buffers.

73. **What are WebAssembly and JavaScript integration?**
    - **Answer**: Binary format for high-performance code. Modern: Wasm modules, shared memory.
    - **Example**:
      \`\`\`javascript
      // Modern WebAssembly
      const wasm = await WebAssembly.instantiateStreaming(
        fetch('module.wasm'),
        {
          env: {
            memory: new WebAssembly.Memory({ initial: 1 }),
            log: console.log
          }
        }
      );
      const result = wasm.instance.exports.calculate(1, 2);
      // Shared memory between Wasm and JS
      const memory = new WebAssembly.Memory({
        initial: 1,
        maximum: 2,
        shared: true
      });
      \`\`\`
    - **Note**: Use Wasm for CPU-intensive work (image processing, games); JS remains best for DOM and orchestration.

74. **What are the new features in ECMAScript 2026?**
    - **Answer**: Pattern matching, decorators (finalized). Modern: Temporal API, JSON modules.
    - **Example**:
      \`\`\`javascript
      // ES2026 features
      // Import assertions
      import data from './data.json' assert { type: 'json' };
      // Source phase imports
      import source from './module.js' with { type: 'source' };
      // Async context
      const context = new AsyncContext();
      // Iterator helpers
      const result = [1, 2, 3].values()
        .filter(x => x > 1)
        .map(x => x * 2)
        .toArray();
      \`\`\`
    - **Note**: Import attributes replace assertions — use \`with { type: 'json' }\` syntax going forward.

75. **How do you implement real-time communication?**
    - **Answer**: WebSockets, SSE, WebRTC. Modern: Server-Sent Events for server push.
    - **Example**:
      \`\`\`javascript
      // Modern real-time patterns
      // SSE client
      const eventSource = new EventSource('/api/events');
      eventSource.addEventListener('message', ({ data }) => {
        const event = JSON.parse(data);
        handleEvent(event);
      });
      // WebRTC for peer-to-peer
      const pc = new RTCPeerConnection(config);
      pc.ontrack = ({ streams }) => {
        const video = document.getElementById('video');
        video.srcObject = streams[0];
      };
      \`\`\`
    - **Note**: SSE auto-reconnects and works over plain HTTP — simpler than WebSockets for one-way updates.

76. **What is the difference between local storage and session storage?**
    - **Answer**: Local: Persistent across sessions. Session: Per-tab, cleared on close. Modern: Storage events, quota limits.
    - **Example**:
      \`\`\`javascript
      // Modern storage
      // Storage events for sync
      window.addEventListener('storage', (e) => {
        console.log('Storage changed:', e.key, e.newValue);
      });
      // IndexedDB for large data
      const db = await idb.openDB('database', 1, {
        upgrade(db) {
          db.createObjectStore('store');
        }
      });
      \`\`\`
    - **Note**: Storage events fire in OTHER tabs, not the one that made the change — useful for cross-tab sync.

77. **How do you store data in the browser?**
    - **Answer**: Cookies, localStorage, sessionStorage, IndexedDB. Modern: Cache API, File API.
    - **Example**:
      \`\`\`javascript
      // Modern data storage
      // Cache API
      const cache = await caches.open('cache');
      await cache.put('/api/data', new Response(jsonData));
      // File API
      const fileHandle = await window.showSaveFilePicker();
      const writable = await fileHandle.createWritable();
      await writable.write(blob);
      await writable.close();
      \`\`\`
    - **Note**: localStorage is synchronous and ~5MB; IndexedDB is async and handles hundreds of MB.

78. **What are the security concerns with storing data in cookies?**
    - **Answer**: XSS, CSRF, hijacking. Modern: HttpOnly, SameSite, Secure flags.
    - **Example**:
      \`\`\`javascript
      // Modern cookie security
      document.cookie = 'token=value; SameSite=Strict; Secure; HttpOnly';
      // CSRF protection
      // Use CSRF tokens with SameSite cookies
      const csrfToken = document.querySelector('meta[name="csrf-token"]').content;
      const response = await fetch('/api/action', {
        headers: { 'X-CSRF-Token': csrfToken }
      });
      \`\`\`
    - **Note**: HttpOnly cookies can't be read by JS (XSS-safe), but require CSRF tokens since they're sent automatically.

79. **How do you create and use regular expressions?**
    - **Answer**: Pattern matching with RegExp. Modern: Unicode properties, named groups.
    - **Example**:
      \`\`\`javascript
      // Modern regex
      const pattern = /(?<year>\\d{4})-(?<month>\\d{2})/u;
      const match = pattern.exec('2026-05');
      const { year, month } = match.groups;
      // Unicode property escapes
      const emoji = /\\p{Emoji}/u;
      // Lookbehind assertions
      const price = /(?<=[USD])\\d+/.exec('Price: USD 100');
      \`\`\`
    - **Note**: Named groups make regex readable — access matches via match.groups.year instead of array indices.

80. **What is the RegExp constructor with modern features?**
    - **Answer**: Creates regex with dynamic pattern. Modern: Unicode, sticky flags.
    - **Example**:
      \`\`\`javascript
      // Modern RegExp constructor
      const flags = 'gu';
      const pattern = '\\\\d+';
      const regex = new RegExp(pattern, flags);
      // With Unicode property escapes
      const unicodeRegex = new RegExp('\\\\p{Emoji}', 'u');
      // Sticky flag for matching at index
      const stickyRegex = new RegExp('abc', 'y');
      \`\`\`
    - **Note**: The sticky flag (y) anchors matching to lastIndex — great for tokenizers parsing character by character.

81. **What is the difference between let and var in terms of scope?**
    - **Answer**: let: Block-scoped, TDZ. var: Function-scoped, hoisted. Modern: Use let/const exclusively.
    - **Example**:
      \`\`\`javascript
      // Modern scoping
      // Block scope with let
      {
        let x = 1;
        var y = 2;
      }
      // x is not accessible, y is
      // Temporal dead zone
      {
        // TDZ starts
        let x = 3; // TDZ ends
      }
      \`\`\`
    - **Note**: var leaks out of blocks and loops causing classic closure bugs — let captures per-iteration correctly.

82. **How does the const keyword work?**
    - **Answer**: Block-scoped, cannot be reassigned. Modern: Immutable binding, mutable object.
    - **Example**:
      \`\`\`javascript
      // Modern const usage
      const PI = 3.14;
      // Object mutation is allowed
      const obj = { value: 1 };
      obj.value = 2; // OK
      // Cannot reassign
      // obj = {}; // Error
      // Object.freeze for immutability
      const immutable = Object.freeze({ value: 1 });
      // immutable.value = 2; // Error
      \`\`\`
    - **Note**: const locks the binding, not the value — freeze objects too if you need full immutability.

83. **What is destructuring assignment?**
    - **Answer**: Unpack values from arrays/objects. Modern: Nested, default, renaming.
    - **Example**:
      \`\`\`javascript
      // Modern destructuring
      // Array with rest
      const [first, second, ...rest] = [1, 2, 3, 4];
      // Object with defaults
      const { name = 'Guest', age } = user;
      // Nested
      const { address: { city, country } } = user;
      // Renaming
      const { name: userName } = user;
      // Function parameters
      const process = ({ id, data = {} }) => {
        // Implementation
      };
      \`\`\`
    - **Note**: Destructuring function parameters documents expected shape directly in the signature.

84. **What are template literals?**
    - **Answer**: String literals with interpolation. Modern: Tagged templates, raw strings.
    - **Example**:
      \`\`\`javascript
      // Modern template literals
      // Tagged template
      function html(strings, ...values) {
        return strings.reduce((acc, str, i) => {
          const value = values[i] || '';
          return acc + str + sanitize(value);
        }, '');
      }
      const safe = html\`<div>\${userInput}</div>\`;
      // Raw strings
      const path = String.raw\`C:\\Users\\John\`;
      // Expression interpolation
      const message = \`Hello \${user.name}!
      Today is \${new Date().toLocaleString()}\`;
      \`\`\`
    - **Note**: String.raw preserves backslashes literally — perfect for Windows paths and regex patterns.

85. **What is the rest operator, and how is it used?**
    - **Answer**: Collects remaining elements. Modern: Destructuring, spread alternatives.
    - **Example**:
      \`\`\`javascript
      // Modern rest patterns
      // Function rest parameters
      const sum = (...numbers) => numbers.reduce((a, b) => a + b);
      // Destructuring rest
      const [first, ...rest] = array;
      const { id, ...attributes } = user;
      // With typed arrays
      const [x, ...coordinates] = points;
      \`\`\`
    - **Note**: Rest creates a real array (unlike arguments object), so all array methods work on it.

86. **What is the spread operator, and how is it used?**
    - **Answer**: Expands iterable elements. Modern: Array/object cloning, merging.
    - **Example**:
      \`\`\`javascript
      // Modern spread usage
      // Array spread
      const merged = [...arr1, ...arr2];
      // Object spread
      const updated = { ...obj, newProp: 'value' };
      // Function arguments
      Math.max(...numbers);
      // With Set for dedup
      const unique = [...new Set(array)];
      // With Map
      const map = new Map([...entries]);
      \`\`\`
    - **Note**: Spread order matters — later properties overwrite earlier ones when merging objects.

87. **What is a class in JavaScript?**
    - **Answer**: Blueprint for objects. Modern: Private fields, static blocks.
    - **Example**:
      \`\`\`javascript
      // Modern class
      class User {
        #private = 'secret';
        static #staticPrivate = 'static secret';

        constructor(name) {
          this.name = name;
        }

        static { // Static init
          console.log('Class loaded');
        }

        get #privateValue() {
          return this.#private;
        }

        static create(name) {
          return new User(name);
        }
      }
      \`\`\`
    - **Note**: Classes are not hoisted like function declarations — define them before instantiation.

88. **How do you create and use classes in JavaScript?**
    - **Answer**: Class syntax with extends, super. Modern: Mixins, decorators.
    - **Example**:
      \`\`\`javascript
      // Modern class usage
      class Animal {
        constructor(name) {
          this.name = name;
        }
        speak() {
          console.log(\`\${this.name} speaks\`);
        }
      }
      class Dog extends Animal {
        #breed;
        constructor(name, breed) {
          super(name);
          this.#breed = breed;
        }
        speak() {
          super.speak();
          console.log('Woof!');
        }
        get breed() {
          return this.#breed;
        }
      }
      \`\`\`
    - **Note**: Call super() before using this in derived constructors — accessing this first throws a ReferenceError.

89. **What are class inheritance and the extends keyword?**
    - **Answer**: Inherits properties/methods from parent. Modern: Super calls, override methods.
    - **Example**:
      \`\`\`javascript
      // Modern inheritance
      class Base {
        constructor(value) {
          this.value = value;
        }
        method() {
          return this.value;
        }
      }
      class Derived extends Base {
        constructor(value, extra) {
          super(value);
          this.extra = extra;
        }
        method() {
          return super.method() + this.extra;
        }
      }
      \`\`\`
    - **Note**: extends works with any expression evaluating to a constructor or null — enabling mixin factories.

90. **What are getters and setters?**
    - **Answer**: Property accessors. Modern: Private fields with accessors.
    - **Example**:
      \`\`\`javascript
      // Modern accessors
      class User {
        #name;
        #age;
        constructor(name, age) {
          this.#name = name;
          this.#age = age;
        }
        get name() {
          return this.#name;
        }
        set name(value) {
          if (!value) throw new Error('Name required');
          this.#name = value;
        }
        get age() {
          return this.#age;
        }
        set age(value) {
          if (value < 0) throw new Error('Invalid age');
          this.#age = value;
        }
      }
      \`\`\`
    - **Note**: Accessors enable computed values and validation while keeping a clean property-based API.

91. **What are static methods?**
    - **Answer**: Class-level methods. Modern: Static blocks, private static.
    - **Example**:
      \`\`\`javascript
      // Modern static methods
      class MathUtils {
        static #PI = 3.14;
        static { // Init
          console.log('MathUtils loaded');
        }
        static get pi() {
          return this.#PI;
        }
        static add(a, b) {
          return a + b;
        }
        static async fetch() {
          const data = await api.fetch();
          return data;
        }
      }
      \`\`\`
    - **Note**: Static members belong to the class itself, not instances — call them via ClassName.method().

92. **How do you create a module in JavaScript?**
    - **Answer**: Module pattern, ES modules. Modern: Export maps, module federation.
    - **Example**:
      \`\`\`javascript
      // Modern module
      // math.js
      export const PI = 3.14;
      export default function add(a, b) {
        return a + b;
      }
      // main.js
      import add, { PI } from './math.js';
      // Dynamic import
      const module = await import('./module.js');
      // Import assertion
      import data from './data.json' assert { type: 'json' };
      \`\`\`
    - **Note**: ES modules have single evaluation — imported module code runs once regardless of import count.

93. **What is the purpose of export and import statements?**
    - **Answer**: Share code between modules. Modern: Export maps, conditional exports.
    - **Example**:
      \`\`\`javascript
      // Modern export/import
      // package.json
      {
        "exports": {
          ".": "./index.js",
          "./utils": "./utils.js",
          "./types": {
            "import": "./types.mjs",
            "require": "./types.cjs"
          }
        }
      }
      // Re-export
      export * from './core.js';
      export { default as App } from './App.js';
      // Dynamic exports
      export default await import('./feature.js');
      \`\`\`
    - **Note**: Export maps control what consumers can import — internal files stay private by omission.

94. **What is the default export, and how is it used?**
    - **Answer**: Single main export from module. Modern: Combined with named exports.
    - **Example**:
      \`\`\`javascript
      // Modern default exports
      // Default function
      export default function greet() {
        console.log('Hello');
      }
      // Default class
      export default class User {
        constructor(name) {
          this.name = name;
        }
      }
      // Default value
      export default 'Hello';
      // Import with any name
      import Greet from './greet.js';
      import UserClass from './user.js';
      \`\`\`
    - **Note**: Default exports allow arbitrary import names — some teams ban them to keep imports consistent.

95. **How do you handle exceptions in JavaScript?**
    - **Answer**: Try-catch-finally, throw. Modern: Custom error classes, error boundaries.
    - **Example**:
      \`\`\`javascript
      // Modern error handling
      class ValidationError extends Error {
        constructor(message, field) {
          super(message);
          this.field = field;
          this.name = 'ValidationError';
        }
      }
      try {
        const user = await fetchUser(id);
        if (!user) throw new ValidationError('User not found', 'id');
        return user;
      } catch (error) {
        if (error instanceof ValidationError) {
          // Handle validation
        }
        // Re-throw with context
        throw new Error(\`Failed to fetch user: \${error.message}\`, {
          cause: error
        });
      }
      \`\`\`
    - **Note**: The cause option chains errors preserving original stack traces for better debugging.

96. **What is the purpose of the finally block?**
    - **Answer**: Always executes, for cleanup. Modern: Resource cleanup, logging.
    - **Example**:
      \`\`\`javascript
      // Modern finally usage
      async function processFile(file) {
        const handle = await openFile(file);
        try {
          const data = await handle.read();
          return processData(data);
        } catch (error) {
          logError(error);
          throw error;
        } finally {
          await handle.close(); // Always cleanup
          cleanupResources();
        }
      }
      \`\`\`
    - **Note**: finally runs even when try contains return or throw — guaranteed cleanup execution.

97. **How do you throw custom errors?**
    - **Answer**: Extend Error class. Modern: Error cause, context.
    - **Example**:
      \`\`\`javascript
      // Modern custom errors
      class ApiError extends Error {
        constructor(message, status, code) {
          super(message);
          this.status = status;
          this.code = code;
          this.name = 'ApiError';
          this.timestamp = new Date();
        }
      }
      throw new ApiError('Not found', 404, 'NOT_FOUND');
      // Chained errors
      try {
        await apiCall();
      } catch (error) {
        throw new Error('API call failed', { cause: error });
      }
      \`\`\`
    - **Note**: Setting this.name ensures readable logs; instanceof checks enable precise error handling.

98. **What are async functions and how do they work?**
    - **Answer**: Functions returning promises. Modern: Top-level await, async iterators.
    - **Example**:
      \`\`\`javascript
      // Modern async functions
      // Top-level await
      const config = await fetchConfig();
      // Async method
      class Service {
        async fetchData() {
          const response = await fetch('/api/data');
          return response.json();
        }
        // Async generator
        async *streamData() {
          for await (const chunk of this.getChunks()) {
            yield processChunk(chunk);
          }
        }
      }
      \`\`\`
    - **Note**: An async function ALWAYS returns a promise — even returning a plain value wraps it automatically.

99. **How do you use the await keyword?**
    - **Answer**: Wait for promise resolution. Modern: For-await-of, multiple awaits.
    - **Example**:
      \`\`\`javascript
      // Modern await usage
      // Parallel awaits
      const [user, posts] = await Promise.all([
        fetchUser(),
        fetchPosts()
      ]);
      // For-await-of
      for await (const item of asyncIterable) {
        console.log(item);
      }
      // Await with timeout
      const withTimeout = (promise, ms) => {
        return Promise.race([
          promise,
          new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Timeout')), ms)
          )
        ]);
      };
      const data = await withTimeout(fetchData(), 5000);
      \`\`\`
    - **Note**: await outside async functions requires top-level await support (ES modules in modern browsers).

100. **What are the differences between classical inheritance and prototypal inheritance in modern JS?**
     - **Answer**: Classical: Class-based, extends keyword. Prototypal: Object-based, prototype chain. Modern: Use classes for structure, composition for flexibility.
     - **Example**:
       \`\`\`javascript
       // Modern hybrid approach
       // Classical inheritance
       class Animal {
         constructor(name) { this.name = name; }
         speak() { console.log(\`\${this.name} speaks\`); }
       }
       class Dog extends Animal {}

       // Prototypal composition
       const canFly = {
         fly() { console.log('Flying'); }
       };
       const canSwim = {
         swim() { console.log('Swimming'); }
       };

       // Compose objects
       const duck = Object.assign({}, canFly, canSwim);

       // Class with mixins
       const WithFly = (Base) => class extends Base {
         fly() { console.log('Flying'); }
       };
       class Bird extends WithFly(Animal) {}
       \`\`\`
     - **Note**: Mixin factories compose behavior into classes — combining OOP structure with functional flexibility.
`,c=n(),l=o+s,u=`
`,d=(e,t)=>{try{return t||=`javascript`,i.highlight(e,{language:t,ignoreIllegals:!0}).value}catch(n){return console.warn(`Highlight.js error for language '${t}':`,n),e.split(`&`).join(`&amp;`).split(`<`).join(`&lt;`).split(`>`).join(`&gt;`).split(`"`).join(`&quot;`).split(`'`).join(`&#x27;`)}},f=(e=>{let t=[],n=e.split(u),r=null,i=null,a=!1,o=[],s=``;for(let e=0;e<n.length;e++){let c=n[e],l=c.trim();if(l.startsWith("```")){if(!a)a=!0,s=l.replace(/```/g,``).trim()||`javascript`,o=[];else{if(a=!1,i&&o.length>0){let e=o.join(u).split(u),t=Math.min(...e.filter(e=>e.trim()).map(e=>e.match(/^\s*/)[0].length)),n=e.map(e=>e.slice(t)).join(u).trim();i.response.push({type:`code`,content:n,language:s})}o=[]}continue}if(a){o.push(c);continue}let d=c.match(/^###\s+(.+)/);if(d){r={name:d[1],questions:[]},t.push(r),i=null;continue}let f=c.match(/^(\d+)\.\s*\*\*(.+?)\*\*/);if(f)i={id:f[1],question:f[2],response:[]},r&&r.questions.push(i);else if(i&&c.trim().startsWith(`- **Answer**:`)){let e=c.replace(`- **Answer**:`,``).trim();e&&i.response.push({type:`text`,content:e})}else if(i&&c.trim().startsWith(`- **Example**:`)){let e=c.replace(`- **Example**:`,``).trim();e&&i.response.push({type:`example`,content:e})}else if(i&&c.trim().startsWith(`- **Note**:`)){let e=c.replace(`- **Note**:`,``).trim();e&&i.response.push({type:`note`,content:e})}else if(i&&c.trim()&&!c.trim().startsWith(`#`)){let e=c.trim();if(e&&e.length>1&&!e.match(/^[-*]\s*$/)&&!e.match(/^[a-zA-Z]$/)&&!e.match(/^[0-9]$/)){let t=e.replace(/^\s*[-*]\s+/,``).replace(/\*\*(.+?)\*\*/g,`$1`).replace(/`([^`]+)`/g,`$1`);i.response.push({type:`text`,content:t})}}}return t})(l),p=f.reduce((e,t)=>e+t.questions.length,0);function m(){let[e,t]=(0,a.useState)(null),n=n=>{t(e===n?null:n)};return(0,c.jsxs)(`div`,{className:`js-interview-page`,children:[(0,c.jsx)(`section`,{className:`interview-header`,children:(0,c.jsxs)(`div`,{className:`interview-header-content`,children:[(0,c.jsx)(r,{to:`/javascript`,className:`back-button`,children:`← Back to JavaScript`}),(0,c.jsx)(`h1`,{className:`interview-title`,children:`JavaScript Interview Questions`}),(0,c.jsx)(`p`,{className:`interview-subtitle`,children:`Master JavaScript interview questions with detailed answers and code examples`}),(0,c.jsxs)(`div`,{className:`interview-stats`,children:[(0,c.jsxs)(`div`,{className:`interview-stat`,children:[(0,c.jsxs)(`span`,{className:`stat-number`,children:[p,`+`]}),(0,c.jsx)(`span`,{className:`stat-label`,children:`Questions`})]}),(0,c.jsxs)(`div`,{className:`interview-stat`,children:[(0,c.jsx)(`span`,{className:`stat-number`,children:f.length}),(0,c.jsx)(`span`,{className:`stat-label`,children:`Categories`})]}),(0,c.jsxs)(`div`,{className:`interview-stat`,children:[(0,c.jsx)(`span`,{className:`stat-number`,children:`100%`}),(0,c.jsx)(`span`,{className:`stat-label`,children:`Free`})]})]})]})}),(0,c.jsx)(`section`,{className:`questions-section`,children:(0,c.jsx)(`div`,{className:`questions-container`,children:(0,c.jsx)(`div`,{className:`questions-list`,children:f.map((t,r)=>(0,c.jsxs)(`div`,{className:`category-section`,children:[(0,c.jsx)(`h2`,{className:`category-title`,children:t.name}),(0,c.jsx)(`div`,{className:`questions-vertical`,children:t.questions.map(t=>(0,c.jsxs)(`div`,{className:`question-item-vertical ${e===t.id?`active`:``}`,children:[(0,c.jsxs)(`div`,{className:`question-item-header`,onClick:()=>n(t.id),children:[(0,c.jsxs)(`span`,{className:`q-number`,children:[`Q`,t.id]}),(0,c.jsx)(`p`,{className:`q-text`,children:t.question}),(0,c.jsx)(`span`,{className:`expand-arrow ${e===t.id?`expanded`:``}`,children:`▼`})]}),e===t.id&&(0,c.jsx)(`div`,{className:`question-item-content`,children:(0,c.jsx)(`div`,{className:`question-card`,children:(0,c.jsxs)(`div`,{className:`question-answer`,children:[(0,c.jsx)(`h3`,{className:`answer-title`,children:`Answer:`}),t.response.map((e,t)=>e.type===`code`?(0,c.jsxs)(`div`,{className:`code-block`,children:[(0,c.jsx)(`div`,{className:`code-header`,children:(0,c.jsx)(`span`,{className:`code-language`,children:e.language||`javascript`})}),(0,c.jsx)(`pre`,{className:`language-${e.language||`javascript`}`,children:(0,c.jsx)(`code`,{className:`language-${e.language||`javascript`}`,dangerouslySetInnerHTML:{__html:d(e.content,e.language)}})})]},t):e.type===`example`?(0,c.jsxs)(`p`,{className:`answer-text`,children:[`📘 `,e.content]},t):e.type===`note`?(0,c.jsxs)(`p`,{className:`answer-text`,children:[`💡 `,e.content]},t):(0,c.jsx)(`p`,{className:`answer-text`,children:e.content},t))]})})})]},t.id))})]},r))})})})]})}export{m as default};