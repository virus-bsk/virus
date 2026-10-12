import{r as e}from"./rolldown-runtime-QTnfLwEv.js";import{t}from"./react-CZI7_Jkm.js";import{r as n,s as r}from"./index-BjSszV1C.js";import{t as i}from"./atom-one-dark-CL0A0LnX.js";/* empty css                      */var a=e(t(),1),o=[{id:1,title:`What is React?`,category:`basics`,level:`beginner`,description:`React is a JavaScript library for building user interfaces. It's component-based and uses a virtual DOM for efficient updates.`,why:`To build interactive, fast, and scalable web applications with reusable components.`,when:`Single-page applications (SPAs), dynamic web apps, frontend development.`,code:`// A simple React component
function Welcome() {
    return <h1>Hello, React!</h1>;
}

// Rendering to DOM
ReactDOM.render(
    <Welcome />,
    document.getElementById('root')
);`},{id:2,title:`JSX (JavaScript XML)`,category:`basics`,level:`beginner`,description:`JSX allows you to write HTML-like syntax in JavaScript. It's transformed to React.createElement() calls.`,why:`To write UI code that's familiar and intuitive (like HTML) within JavaScript.`,when:`Every React component uses JSX to define its UI.`,code:`// JSX syntax
const element = <h1 className="title">Hello World!</h1>;

// JSX with expressions
const name = "Alice";
const greeting = <div>Hello, {name}!</div>;

// JSX with attributes
const img = <img src="image.jpg" alt="Image" />;

// JSX with children
const container = (
    <div>
        <h1>Title</h1>
        <p>Description</p>
    </div>
);`},{id:3,title:`ReactDOM`,category:`basics`,level:`beginner`,description:`ReactDOM is the package that connects React components to the DOM (Document Object Model).`,why:`To mount React components into the actual browser DOM.`,when:`Entry point of every React application.`,code:`// Rendering to DOM
ReactDOM.render(
    <App />,
    document.getElementById('root')
);

// React 18+
const root = ReactDOM.createRoot(
    document.getElementById('root')
);
root.render(<App />);

// Hydration (for SSR)
ReactDOM.hydrate(<App />, document.getElementById('root'));`},{id:4,title:`Components (Functional & Class)`,category:`components`,level:`beginner`,description:`Components are the building blocks of React. They can be functional or class-based.`,why:`To break the UI into reusable, isolated pieces.`,when:`Everything in React is a component!`,code:`// Functional Component (modern)
function Welcome(props) {
    return <h1>Hello, {props.name}!</h1>;
}

// Class Component (legacy)
class Welcome extends React.Component {
    render() {
        return <h1>Hello, {this.props.name}!</h1>;
    }
}

// Arrow function component
const Welcome = (props) => <h1>Hello, {props.name}!</h1>;`},{id:5,title:`Props (Properties)`,category:`components`,level:`beginner`,description:`Props are read-only data passed from parent to child components.`,why:`To pass data down the component tree.`,when:`Every time you need to pass data from parent to child.`,code:`// Parent component
function App() {
    return <Greeting name="Alice" age={30} />;
}

// Child component receiving props
function Greeting(props) {
    return (
        <div>
            <h1>Hello, {props.name}!</h1>
            <p>Age: {props.age}</p>
        </div>
    );
}

// Destructuring props
function Greeting({ name, age }) {
    return <h1>Hello, {name}! You are {age}.</h1>;
}`},{id:6,title:`State (useState)`,category:`hooks`,level:`beginner`,description:`State is data that changes over time. useState is the most basic Hook for managing state.`,why:`To manage data that changes in your component.`,when:`Any interactive component that needs to track data.`,code:`import { useState } from 'react';

function Counter() {
    const [count, setCount] = useState(0); // [state, setter]

    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>
                Click me
            </button>
        </div>
    );
}`},{id:7,title:`Event Handling`,category:`basics`,level:`beginner`,description:`React events are similar to DOM events but use camelCase and are passed as functions.`,why:`To handle user interactions like clicks, typing, submission, etc.`,when:`Every interactive component.`,code:`function Button() {
    const handleClick = (event) => {
        console.log('Button clicked!', event);
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default behavior
        console.log('Form submitted');
    };

    return (
        <div>
            <button onClick={handleClick}>Click me</button>
            <form onSubmit={handleSubmit}>
                <input type="text" onChange={(e) => console.log(e.target.value)} />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}`},{id:8,title:`Conditional Rendering`,category:`basics`,level:`beginner`,description:`Render different UI based on conditions.`,why:`To show/hide elements based on state or props.`,when:`Loading states, authentication, feature toggles.`,code:`function Greeting({ isLoggedIn }) {
    // if/else
    if (isLoggedIn) {
        return <h1>Welcome back!</h1>;
    }
    return <h1>Please sign in.</h1>;

    // Ternary operator
    return (
        <div>
            {isLoggedIn ? <h1>Welcome back!</h1> : <h1>Please sign in.</h1>}
        </div>
    );

    // Logical && (short-circuit)
    return (
        <div>
            {isLoggedIn && <h1>Welcome back!</h1>}
        </div>
    );
}`},{id:9,title:`Lists and Keys`,category:`basics`,level:`beginner`,description:`Rendering lists with map() and providing unique keys for each item.`,why:`Keys help React identify which items changed, added, or removed.`,when:`Rendering any list or array of elements.`,code:`function TodoList({ todos }) {
    return (
        <ul>
            {todos.map(todo => (
                <li key={todo.id}>{todo.text}</li> // key is required!
            ))}
        </ul>
    );
}

// If no ID, use index (not recommended for reordering)
return (
    <ul>
        {todos.map((todo, index) => (
            <li key={index}>{todo}</li>
        ))}
    </ul>
);`},{id:10,title:`Fragments`,category:`basics`,level:`beginner`,description:`Fragments allow grouping elements without adding extra DOM nodes.`,why:`To avoid unnecessary wrapper elements in the DOM.`,when:`Returning multiple elements from a component.`,code:`// Using <></> (short syntax)
function Columns() {
    return (
        <>
            <td>Hello</td>
            <td>World</td>
        </>
    );
}

// Using React.Fragment
import { Fragment } from 'react';

function Columns() {
    return (
        <Fragment>
            <td>Hello</td>
            <td>World</td>
        </Fragment>
    );
}`},{id:11,title:`Component Lifecycle`,category:`components`,level:`beginner`,description:`Components go through mount, update, and unmount phases.`,why:`To control side effects and optimize performance.`,when:`Fetching data, subscriptions, DOM manipulation.`,code:`// Class component lifecycle
class MyComponent extends React.Component {
    componentDidMount() { // Called after component mounts
        console.log('Component mounted');
    }
    componentDidUpdate(prevProps) { // Called after update
        console.log('Component updated');
    }
    componentWillUnmount() { // Called before unmount
        console.log('Component unmounted');
    }
    render() { return <div>Hello</div>; }
}

// Functional component with useEffect (covers all)
import { useEffect } from 'react';

function MyComponent() {
    useEffect(() => {
        console.log('Mount'); // componentDidMount
        return () => console.log('Unmount'); // componentWillUnmount
    }, []); // Empty array = run once
    return <div>Hello</div>;
}`},{id:12,title:`Controlled Components`,category:`forms`,level:`beginner`,description:`Input elements whose value is controlled by React state.`,why:`React controls the input value, making it predictable.`,when:`Forms where you need validation or to react to changes.`,code:`function NameForm() {
    const [name, setName] = useState('');

    const handleChange = (e) => setName(e.target.value);
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitted:', name);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={name}
                onChange={handleChange}
            />
            <button type="submit">Submit</button>
        </form>
    );
}`},{id:13,title:`Uncontrolled Components`,category:`forms`,level:`beginner`,description:`Input elements that manage their own state via the DOM.`,why:`Simpler when you don't need to react to every change.`,when:`Forms where you only need the value on submit.`,code:`function NameForm() {
    const inputRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Value:', inputRef.current.value);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" ref={inputRef} defaultValue="Initial" />
            <button type="submit">Submit</button>
        </form>
    );
}`},{id:14,title:`Styling in React`,category:`basics`,level:`beginner`,description:`Multiple ways to style React components.`,why:`To make your app look good and maintain consistent design.`,when:`Every component needs styling!`,code:`// 1. Inline styles
const divStyle = { color: 'blue', fontSize: '20px' };
return <div style={divStyle}>Hello</div>;

// 2. CSS Modules (file: Button.module.css)
import styles from './Button.module.css';
return <button className={styles.button}>Click</button>;

// 3. Styled Components
import styled from 'styled-components';
const Button = styled.button\`
    background: blue;
    color: white;
    padding: 10px;
\`;

// 4. Tailwind CSS
return <button className="bg-blue-500 text-white p-2">Click</button>;`},{id:15,title:`React Developer Tools`,category:`basics`,level:`beginner`,description:`Browser extension for debugging React applications.`,why:`To debug and inspect React components easily.`,when:`Every React developer should use this!`,code:`// Features:
// 1. Inspect component tree
// 2. View props and state
// 3. Edit props/state in real-time
// 4. Profile performance
// 5. Debug hooks

// Install:
// - Chrome: React Developer Tools extension
// - Firefox: React Developer Tools add-on

// Use in code:
if (process.env.NODE_ENV === 'development') {
    console.log('Dev tools ready');
}`},{id:16,title:`Children Prop`,category:`components`,level:`beginner`,description:`Pass JSX content between opening and closing tags of a component.`,why:`To create reusable wrapper/layout components.`,when:`Cards, modals, containers, layouts.`,code:`function Card({ title, children }) {
    return (
        <div className="card">
            <h2>{title}</h2>
            <div className="content">
                {children} // renders everything between <Card> tags
            </div>
        </div>
    );
}

// Usage
<Card title="Welcome">
    <p>This is the content inside the card.</p>
    <button>Click me</button>
</Card>`},{id:17,title:`useEffect`,category:`hooks`,level:`intermediate`,description:`Handle side effects in functional components (data fetching, subscriptions, DOM updates).`,why:`To perform side effects in functional components.`,when:`Data fetching, subscriptions, DOM manipulation, timers.`,code:`import { useEffect, useState } from 'react';

function DataFetcher() {
    const [data, setData] = useState(null);

    useEffect(() => {
        // Run on mount and when dependencies change
        fetchData().then(setData);

        // Cleanup function
        return () => {
            console.log('Cleanup');
        };
    }, []); // Empty = run once on mount

    useEffect(() => {
        console.log('Data changed:', data);
    }, [data]); // Run when data changes

    return <div>{data}</div>;
}`},{id:18,title:`useContext`,category:`context`,level:`intermediate`,description:`Access context values without prop drilling. Context provides a way to pass data through the component tree without passing props down manually at every level.`,why:`To avoid prop drilling and share global data (theme, user, language) across many components.`,when:`Theme, user authentication, language preferences, global app state.`,code:`// 1. Create Context
const ThemeContext = React.createContext('light');

// 2. Provider (provides value to all children)
function App() {
    const [theme, setTheme] = useState('dark');
    
    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            <Toolbar />
        </ThemeContext.Provider>
    );
}

// 3. Consumer (uses value)
function Toolbar() {
    const { theme, setTheme } = useContext(ThemeContext);
    return (
        <div style={{ background: theme === 'dark' ? '#333' : '#fff' }}>
            <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
                Toggle Theme
            </button>
        </div>
    );
}

// Multiple Contexts
const UserContext = React.createContext();
const ThemeContext = React.createContext();

function App() {
    return (
        <UserContext.Provider value={user}>
            <ThemeContext.Provider value={theme}>
                <Dashboard />
            </ThemeContext.Provider>
        </UserContext.Provider>
    );
}`},{id:19,title:`useReducer`,category:`hooks`,level:`intermediate`,description:`Alternative to useState for complex state logic.`,why:`To handle complex state logic with actions like Redux.`,when:`State with multiple sub-values or next state depends on previous.`,code:`const initialState = { count: 0 };

function reducer(state, action) {
    switch (action.type) {
        case 'increment':
            return { count: state.count + 1 };
        case 'decrement':
            return { count: state.count - 1 };
        case 'reset':
            return { count: 0 };
        default:
            return state;
    }
}

function Counter() {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <div>
            Count: {state.count}
            <button onClick={() => dispatch({ type: 'increment' })}>+</button>
            <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
            <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
        </div>
    );
}`},{id:20,title:`useRef`,category:`hooks`,level:`intermediate`,description:`Persist values across renders without causing re-renders. Also used for DOM refs.`,why:`To access DOM elements and store mutable values without re-renders.`,when:`Focusing inputs, timers, storing previous values.`,code:`// DOM refs
function InputFocus() {
    const inputRef = useRef(null);

    const focusInput = () => {
        inputRef.current.focus();
    };

    return (
        <div>
            <input ref={inputRef} type="text" />
            <button onClick={focusInput}>Focus Input</button>
        </div>
    );
}

// Storing mutable values (no re-render)
function Timer() {
    const intervalRef = useRef(null);
    
    useEffect(() => {
        intervalRef.current = setInterval(() => {
            console.log('Tick');
        }, 1000);
        return () => clearInterval(intervalRef.current);
    }, []);
}`},{id:21,title:`useMemo`,category:`hooks`,level:`intermediate`,description:`Memoize expensive calculations to avoid re-computation on every render.`,why:`To optimize performance by caching expensive calculations.`,when:`Expensive computations, data filtering, sorting.`,code:`import { useMemo, useState } from 'react';

function ExpensiveComponent({ items }) {
    const [filter, setFilter] = useState('');

    // Only re-calculate when items or filter changes
    const filteredItems = useMemo(() => {
        console.log('Filtering items...');
        return items.filter(item =>
            item.toLowerCase().includes(filter.toLowerCase())
        );
    }, [items, filter]);

    return (
        <div>
            <input value={filter} onChange={(e) => setFilter(e.target.value)} />
            {filteredItems.map(item => <div key={item}>{item}</div>)}
        </div>
    );
}`},{id:22,title:`useCallback`,category:`hooks`,level:`intermediate`,description:`Memoize functions to prevent unnecessary re-creation.`,why:`To prevent child components from re-rendering unnecessarily.`,when:`Passing callbacks to memoized child components.`,code:`import { useCallback, useState } from 'react';

function Parent() {
    const [count, setCount] = useState(0);

    // Function is only re-created when count changes
    const handleClick = useCallback(() => {
        console.log('Clicked!', count);
    }, [count]);

    return (
        <div>
            <button onClick={() => setCount(count + 1)}>Count: {count}</button>
            <Child onClick={handleClick} />
        </div>
    );
}

function Child({ onClick }) {
    return <button onClick={onClick}>Child Button</button>;
}`},{id:23,title:`Custom Hooks`,category:`hooks`,level:`intermediate`,description:`Reusable logic extracted into custom hooks.`,why:`To reuse stateful logic across multiple components.`,when:`Fetching data, local storage, form handling, etc.`,code:`// useLocalStorage.js
function useLocalStorage(key, initialValue) {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            return initialValue;
        }
    });

    const setValue = (value) => {
        try {
            setStoredValue(value);
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error(error);
        }
    };

    return [storedValue, setValue];
}

// Usage
function App() {
    const [name, setName] = useLocalStorage('name', '');
    return (
        <input
            value={name}
            onChange={(e) => setName(e.target.value)}
        />
    );
}`},{id:24,title:`Context API (Deep Dive)`,category:`context`,level:`intermediate`,description:`Advanced Context patterns: Provider composition, Context with useReducer, and optimizing Context performance.`,why:`To manage global state efficiently with better performance and organization.`,when:`Medium to large apps, complex state management, when Redux is overkill.`,code:`// Context with useReducer (like Redux)
const AppContext = createContext();

const initialState = { user: null, theme: 'light' };

function reducer(state, action) {
    switch (action.type) {
        case 'SET_USER':
            return { ...state, user: action.payload };
        case 'TOGGLE_THEME':
            return { ...state, theme: state.theme === 'light' ? 'dark' : 'light' };
        default:
            return state;
    }
}

function AppProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    );
}

// Custom hook to use context
function useApp() {
    const context = useContext(AppContext);
    if (!context) throw new Error('useApp must be used within AppProvider');
    return context;
}

// Usage in components
function Profile() {
    const { state, dispatch } = useApp();
    
    const login = () => {
        dispatch({ type: 'SET_USER', payload: { name: 'Alice' } });
    };
    
    return (
        <div>
            <p>User: {state.user?.name || 'Guest'}</p>
            <button onClick={login}>Login</button>
            <button onClick={() => dispatch({ type: 'TOGGLE_THEME' })}>
                Toggle Theme
            </button>
        </div>
    );
}

// Context Performance Optimization
// Split contexts to avoid unnecessary re-renders
const UserContext = createContext();
const ThemeContext = createContext();

function App() {
    return (
        <UserProvider>
            <ThemeProvider>
                <Dashboard />
            </ThemeProvider>
        </UserProvider>
    );
}`},{id:25,title:`Props Drilling vs Context`,category:`context`,level:`intermediate`,description:`Props drilling is passing data through many levels. Context is a better solution for deep data.`,why:`Context avoids passing props through many levels.`,when:`Theme, user auth, global state.`,code:`// ❌ Props Drilling (bad)
function App() {
    const [user, setUser] = useState('Alice');
    return <Level1 user={user} />;
}
function Level1({ user }) { return <Level2 user={user} />; }
function Level2({ user }) { return <Level3 user={user} />; }
function Level3({ user }) { return <div>{user}</div>; }

// ✅ Using Context (good)
const UserContext = React.createContext();

function App() {
    const [user] = useState('Alice');
    return (
        <UserContext.Provider value={user}>
            <Level1 />
        </UserContext.Provider>
    );
}
function Level1() { return <Level2 />; }
function Level3() {
    const user = useContext(UserContext);
    return <div>{user}</div>;
}`},{id:26,title:`Lifting State Up`,category:`state`,level:`intermediate`,description:`Moving state to the closest common ancestor of components that need it.`,why:`To share state between multiple components.`,when:`Sibling components need to share data.`,code:`function TemperatureConverter() {
    const [temperature, setTemperature] = useState('');

    return (
        <div>
            <CelsiusInput
                temperature={temperature}
                onTemperatureChange={setTemperature}
            />
            <FahrenheitInput
                temperature={temperature}
                onTemperatureChange={setTemperature}
            />
        </div>
    );
}

function CelsiusInput({ temperature, onTemperatureChange }) {
    const handleChange = (e) => {
        onTemperatureChange(e.target.value);
    };
    return (
        <input value={temperature} onChange={handleChange} />
    );
}`},{id:27,title:`React.memo`,category:`performance`,level:`intermediate`,description:`Memoize components to prevent unnecessary re-renders.`,why:`To optimize performance by preventing re-renders.`,when:`Components that re-render frequently with same props.`,code:`import { memo } from 'react';

// Component wrapped with memo
const Child = memo(function Child({ name }) {
    console.log('Child rendered');
    return <div>Hello, {name}!</div>;
});

function Parent() {
    const [count, setCount] = useState(0);
    const [name] = useState('Alice');

    return (
        <div>
            <button onClick={() => setCount(count + 1)}>
                Count: {count}
            </button>
            <Child name={name} /> // Only re-renders when name changes
        </div>
    );
}`},{id:28,title:`PureComponent`,category:`performance`,level:`intermediate`,description:`Class component version of memo, automatically implements shouldComponentUpdate.`,why:`To optimize performance with shallow prop/state comparison.`,when:`Class components that only depend on props and state.`,code:`import { PureComponent } from 'react';

class Child extends PureComponent {
    render() {
        console.log('Child rendered');
        return <div>Hello, {this.props.name}!</div>;
    }
}

class Parent extends React.Component {
    state = { count: 0, name: 'Alice' };

    render() {
        return (
            <div>
                <button onClick={() => this.setState({ count: this.state.count + 1 })}>
                    Count: {this.state.count}
                </button>
                <Child name={this.state.name} />
            </div>
        );
    }
}`},{id:29,title:`React Router (Basics)`,category:`routing`,level:`intermediate`,description:`Client-side routing for single-page applications.`,why:`To navigate between pages without full page reload.`,when:`Every SPA with multiple views/pages.`,code:`import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
    return (
        <BrowserRouter>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/users">Users</Link>
            </nav>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/users" element={<Users />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}`},{id:30,title:`React Router (Advanced)`,category:`routing`,level:`intermediate`,description:`Nested routes, route parameters, and navigation hooks.`,why:`To handle dynamic routes and complex navigation.`,when:`User profiles, detail pages, nested layouts.`,code:`// Route parameters
<Route path="/users/:id" element={<UserDetail />} />

function UserDetail() {
    const { id } = useParams(); // Get URL parameter
    const navigate = useNavigate(); // Navigate programmatically
    const location = useLocation(); // Get current location

    const handleGoBack = () => navigate(-1); // Go back

    return (
        <div>
            <h1>User ID: {id}</h1>
            <button onClick={handleGoBack}>Go Back</button>
        </div>
    );
}

// Nested routes
<Route path="/dashboard" element={<Dashboard />}>
    <Route path="profile" element={<Profile />} />
    <Route path="settings" element={<Settings />} />
</Route>`},{id:31,title:`Form Handling (React Hook Form)`,category:`forms`,level:`intermediate`,description:`Efficient form handling with validation using React Hook Form.`,why:`To handle forms efficiently with validation.`,when:`Login, registration, user input forms.`,code:`import { useForm } from 'react-hook-form';

function RegistrationForm() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input
                {...register('email', { required: 'Email is required' })}
            />
            {errors.email && <p>{errors.email.message}</p>}

            <input
                {...register('password', { minLength: 8 })}
            />
            {errors.password && <p>Min length 8</p>}

            <button type="submit">Register</button>
        </form>
    );
}`},{id:32,title:`State Management (Redux)`,category:`state`,level:`intermediate`,description:`Managing global state across the entire app.`,why:`To manage global state across many components.`,when:`Large applications with complex state.`,code:`// Redux Toolkit (modern Redux)
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { Provider, useSelector, useDispatch } from 'react-redux';

const counterSlice = createSlice({
    name: 'counter',
    initialState: { value: 0 },
    reducers: {
        increment: (state) => { state.value += 1; },
        decrement: (state) => { state.value -= 1; }
    }
});

const store = configureStore({ reducer: counterSlice.reducer });

function Counter() {
    const count = useSelector((state) => state.value);
    const dispatch = useDispatch();

    return (
        <div>
            <button onClick={() => dispatch(increment())}>+</button>
            {count}
            <button onClick={() => dispatch(decrement())}>-</button>
        </div>
    );
}`},{id:33,title:`Props Types`,category:`components`,level:`intermediate`,description:`Type-checking props to catch bugs.`,why:`To catch type errors and document component interfaces.`,when:`Every component! Use TypeScript for better experience.`,code:`// With TypeScript (recommended)
interface UserProps {
    name: string;
    age?: number;
    onClick: () => void;
}

function User({ name, age, onClick }: UserProps) {
    return <button onClick={onClick}>{name} ({age})</button>;
}

// With PropTypes (runtime checks)
import PropTypes from 'prop-types';

User.propTypes = {
    name: PropTypes.string.isRequired,
    age: PropTypes.number,
    onClick: PropTypes.func.isRequired
};

User.defaultProps = {
    age: 18
};`},{id:34,title:`Render Props`,category:`components`,level:`intermediate`,description:`A technique to share code using a prop whose value is a function.`,why:`To share logic between components.`,when:`Before hooks, now replaced by custom hooks.`,code:`function DataFetcher({ url, render }) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setData(data);
                setLoading(false);
            });
    }, [url]);

    return render({ data, loading });
}

// Usage
<DataFetcher
    url="/api/users"
    render={({ data, loading }) => (
        loading ? <div>Loading...</div> :
        data.map(user => <div key={user.id}>{user.name}</div>)
    )}
/>`},{id:35,title:`Portals`,category:`advanced`,level:`intermediate`,description:`Render children outside the parent DOM hierarchy.`,why:`To render modals, tooltips, popups outside the parent.`,when:`Modals, tooltips, dropdowns, popovers.`,code:`import { createPortal } from 'react-dom';

function Modal({ isOpen, children, onClose }) {
    if (!isOpen) return null;

    // Renders modal outside the parent DOM
    return createPortal(
        <div className="modal-overlay">
            <div className="modal">
                <button onClick={onClose}>X</button>
                {children}
            </div>
        </div>,
        document.getElementById('modal-root') // DOM node to render into
    );
}

// Usage
<Modal isOpen={showModal} onClose={() => setShowModal(false)}>
    <p>Modal content here</p>
</Modal>`},{id:36,title:`Error Boundaries`,category:`advanced`,level:`intermediate`,description:`Catch JavaScript errors in component tree and display fallback UI.`,why:`To prevent entire app from crashing due to component errors.`,when:`Wrap parts of your app that might have errors.`,code:`class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.log('Error caught:', error, errorInfo);
        // Log to error reporting service
    }

    render() {
        if (this.state.hasError) {
            return <h1>Something went wrong.</h1>;
        }
        return this.props.children;
    }
}

// Usage
<ErrorBoundary>
    <MyComponent />
</ErrorBoundary>`},{id:37,title:`useLayoutEffect`,category:`hooks`,level:`advanced`,description:`Runs synchronously after DOM mutations but before the browser paints.`,why:`To measure DOM elements before the browser paints.`,when:`Measuring DOM nodes, animations, tooltip positioning.`,code:`import { useLayoutEffect, useRef, useState } from 'react';

function MeasureElement() {
    const ref = useRef(null);
    const [height, setHeight] = useState(0);

    useLayoutEffect(() => {
        // Runs before the browser paints
        setHeight(ref.current.offsetHeight);
    }, []);

    return (
        <div>
            <div ref={ref}>Content here</div>
            <p>Height: {height}px</p>
        </div>
    );
}`},{id:38,title:`useImperativeHandle`,category:`hooks`,level:`advanced`,description:`Customize the ref value exposed to parent components.`,why:`To control what ref exposes to parent components.`,when:`Building reusable components that need controlled refs.`,code:`import { forwardRef, useImperativeHandle, useRef } from 'react';

const FancyInput = forwardRef((props, ref) => {
    const inputRef = useRef();

    useImperativeHandle(ref, () => ({
        focus: () => {
            inputRef.current.focus();
        },
        clear: () => {
            inputRef.current.value = '';
        },
        getValue: () => {
            return inputRef.current.value;
        }
    }));

    return <input ref={inputRef} {...props} />;
});

function Parent() {
    const ref = useRef();

    const handleClick = () => {
        ref.current.focus();
        ref.current.clear();
        console.log(ref.current.getValue());
    };

    return (
        <div>
            <FancyInput ref={ref} />
            <button onClick={handleClick}>Focus and Clear</button>
        </div>
    );
}`},{id:39,title:`useDebugValue`,category:`hooks`,level:`advanced`,description:`Display a label for custom hooks in React DevTools.`,why:`To make custom hooks easier to debug.`,when:`Building custom hooks for reuse.`,code:`import { useState, useDebugValue } from 'react';

function useFriendStatus(friendID) {
    const [isOnline, setIsOnline] = useState(null);

    // Shows in React DevTools
    useDebugValue(isOnline ? 'Online' : 'Offline');

    // Or with formatting
    useDebugValue(isOnline, (value) => value ? '🟢 Online' : '🔴 Offline');

    return isOnline;
}`},{id:40,title:`useTransition`,category:`hooks`,level:`advanced`,description:`Mark state updates as non-urgent to keep UI responsive.`,why:`To keep UI responsive during expensive updates.`,when:`Search, filtering large datasets, slow operations.`,code:`import { useState, useTransition } from 'react';

function Search() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [isPending, startTransition] = useTransition();

    const handleChange = (e) => {
        const value = e.target.value;
        setQuery(value);

        // Mark search as non-urgent
        startTransition(() => {
            const filtered = performExpensiveSearch(value);
            setResults(filtered);
        });
    };

    return (
        <div>
            <input value={query} onChange={handleChange} />
            {isPending && <span>Searching...</span>}
            {results.map(item => <div key={item}>{item}</div>)}
        </div>
    );
}`},{id:41,title:`useDeferredValue`,category:`hooks`,level:`advanced`,description:`Defer updating a value to prevent blocking the UI.`,why:`To keep UI responsive while updating heavy components.`,when:`Similar to useTransition, but with input values.`,code:`import { useState, useDeferredValue, useMemo } from 'react';

function Search() {
    const [query, setQuery] = useState('');
    const deferredQuery = useDeferredValue(query);

    const results = useMemo(() => {
        // Only re-calculates when deferredQuery changes
        return performExpensiveSearch(deferredQuery);
    }, [deferredQuery]);

    return (
        <div>
            <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..."
            />
            <div style={{ opacity: query !== deferredQuery ? 0.5 : 1 }}>
                {results.map(item => <div key={item}>{item}</div>)}
            </div>
        </div>
    );
}`},{id:42,title:`Suspense`,category:`advanced`,level:`advanced`,description:`Handle asynchronous operations and code splitting with fallback UI.`,why:`To handle code splitting and async data gracefully.`,when:`Lazy loading components, data fetching.`,code:`import { Suspense, lazy } from 'react';

// Lazy load component
const LazyComponent = lazy(() => import('./LazyComponent'));

function App() {
    return (
        <div>
            <Suspense fallback={<div>Loading...</div>}>
                <LazyComponent />
            </Suspense>
        </div>
    );
}

// Suspense with data fetching (React 18)
<Suspense fallback={<Loading />}>
    <UserData />
</Suspense>`},{id:43,title:`Concurrent Mode (React 18)`,category:`advanced`,level:`advanced`,description:`Rendering multiple versions of UI simultaneously.`,why:`To create smoother, more responsive user experiences.`,when:`Complex UIs, heavy rendering, responsive applications.`,code:`// React 18 concurrent features
import { createRoot } from 'react-dom/client';

// Enable concurrent mode
const root = createRoot(document.getElementById('root'));
root.render(<App />);

// useTransition and useDeferredValue are concurrent features
// startTransition marks updates as non-urgent
// Suspense integrates with concurrent rendering

// Render both old and new UI simultaneously
<div>
    <OldUI />
    <NewUI />
</div>`},{id:44,title:`Code Splitting`,category:`performance`,level:`advanced`,description:`Split bundle into smaller chunks to load faster.`,why:`To reduce initial load time and improve performance.`,when:`Large applications with many routes.`,code:`// Route-based code splitting
import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

const Home = lazy(() => import('./routes/Home'));
const About = lazy(() => import('./routes/About'));
const Dashboard = lazy(() => import('./routes/Dashboard'));

function App() {
    return (
        <Suspense fallback={<Loading />}>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </Suspense>
    );
}

// Component-based splitting
const HeavyComponent = lazy(() => import('./HeavyComponent'));`},{id:45,title:`Server-Side Rendering (SSR)`,category:`advanced`,level:`advanced`,description:`Render React components on the server to send HTML to the client.`,why:`For better SEO and faster initial page load.`,when:`SEO-critical apps, marketing pages, e-commerce.`,code:`// server.js (Node.js)
import express from 'express';
import { renderToString } from 'react-dom/server';
import App from './App';

const app = express();

app.get('*', (req, res) => {
    const html = renderToString(<App />);
    res.send(\`
        <!DOCTYPE html>
        <html>
            <head><title>SSR React</title></head>
            <body>
                <div id="root">\${html}</div>
                <script src="bundle.js"><\/script>
            </body>
        </html>
    \`);
});

// client.js
import { hydrateRoot } from 'react-dom/client';
hydrateRoot(document.getElementById('root'), <App />);`},{id:46,title:`Next.js (Framework)`,category:`ecosystem`,level:`advanced`,description:`The most popular React framework with SSR, static generation, and more.`,why:`To build full-stack React apps with great performance and SEO.`,when:`Production applications, e-commerce, blogs.`,code:`// pages/index.js
export default function Home() {
    return <h1>Hello Next.js!</h1>;
}

// API routes
export default function handler(req, res) {
    res.status(200).json({ name: 'John Doe' });
}

// getServerSideProps (SSR)
export async function getServerSideProps() {
    const res = await fetch('https://api.example.com/data');
    const data = await res.json();
    return { props: { data } };
}

// getStaticProps (SSG)
export async function getStaticProps() {
    return { props: { data } };
}`},{id:47,title:`Zustand (State Management)`,category:`state`,level:`advanced`,description:`A small, fast state management solution with minimal boilerplate.`,why:`To manage global state with less boilerplate than Redux.`,when:`Medium to large apps needing global state.`,code:`import create from 'zustand';

// Create store
const useStore = create((set) => ({
    count: 0,
    increment: () => set((state) => ({ count: state.count + 1 })),
    decrement: () => set((state) => ({ count: state.count - 1 })),
    reset: () => set({ count: 0 })
}));

// Use in component
function Counter() {
    const { count, increment, decrement, reset } = useStore();

    return (
        <div>
            <button onClick={decrement}>-</button>
            {count}
            <button onClick={increment}>+</button>
            <button onClick={reset}>Reset</button>
        </div>
    );
}

// Select specific state
const count = useStore((state) => state.count);`},{id:48,title:`React Query (Data Fetching)`,category:`ecosystem`,level:`advanced`,description:`Powerful data fetching and caching library.`,why:`To handle server state with caching, retries, and stale-while-revalidate.`,when:`Any app that fetches data from APIs.`,code:`import { useQuery, useMutation, QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function Users() {
    const { data, isLoading, error } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await fetch('/api/users');
            return res.json();
        }
    });

    const mutation = useMutation({
        mutationFn: (newUser) => fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify(newUser)
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
        }
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return <div>{data.map(user => <div key={user.id}>{user.name}</div>)}</div>;
}`},{id:49,title:`Formik (Forms)`,category:`forms`,level:`advanced`,description:`Popular form library for handling validation, errors, and submission.`,why:`To simplify form handling with built-in validation.`,when:`Complex forms with validation.`,code:`import { useFormik } from 'formik';

function LoginForm() {
    const formik = useFormik({
        initialValues: { email: '', password: '' },
        validate: (values) => {
            const errors = {};
            if (!values.email) errors.email = 'Required';
            if (!values.password) errors.password = 'Required';
            return errors;
        },
        onSubmit: (values) => {
            console.log('Form data:', values);
        }
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <input
                name="email"
                onChange={formik.handleChange}
                value={formik.values.email}
            />
            {formik.errors.email && <div>{formik.errors.email}</div>}
            
            <input
                name="password"
                type="password"
                onChange={formik.handleChange}
                value={formik.values.password}
            />
            {formik.errors.password && <div>{formik.errors.password}</div>}
            
            <button type="submit">Login</button>
        </form>
    );
}`},{id:50,title:`Testing (Jest + React Testing Library)`,category:`ecosystem`,level:`advanced`,description:`Testing React components with Jest and React Testing Library.`,why:`To ensure components work correctly and prevent regressions.`,when:`Every serious React project!`,code:`import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Component test
test('counter increments when button clicked', () => {
    render(<Counter />);
    
    const button = screen.getByText('Increment');
    const count = screen.getByText('Count: 0');
    
    fireEvent.click(button);
    expect(count).toHaveTextContent('Count: 1');
});

// User event (more realistic)
test('form submission', async () => {
    render(<LoginForm />);
    
    await userEvent.type(screen.getByLabelText('Email'), 'test@test.com');
    await userEvent.type(screen.getByLabelText('Password'), 'password123');
    await userEvent.click(screen.getByRole('button', { name: 'Login' }));
    
    expect(screen.getByText('Welcome!')).toBeInTheDocument();
});`},{id:51,title:`Firebase Integration`,category:`ecosystem`,level:`advanced`,description:`Backend-as-a-Service for authentication, database, hosting.`,why:`To quickly add backend features without managing servers.`,when:`Prototypes, MVPs, authentication, real-time features.`,code:`import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

function Login() {
    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            console.log('User:', result.user);
        } catch (error) {
            console.error(error);
        }
    };

    const addData = async () => {
        await addDoc(collection(db, 'users'), {
            name: 'Alice',
            email: 'alice@test.com'
        });
    };

    return <button onClick={handleGoogleLogin}>Login with Google</button>;
}`},{id:52,title:`Redux Toolkit (Modern Redux)`,category:`state`,level:`expert`,description:`The official, opinionated way to write Redux logic.`,why:`To write Redux with less boilerplate and best practices.`,when:`Large apps needing robust state management.`,code:`import { configureStore, createSlice } from '@reduxjs/toolkit';
import { Provider, useSelector, useDispatch } from 'react-redux';

// Create slice
const userSlice = createSlice({
    name: 'user',
    initialState: { data: null, loading: false, error: null },
    reducers: {
        fetchStart: (state) => { state.loading = true; },
        fetchSuccess: (state, action) => {
            state.loading = false;
            state.data = action.payload;
        },
        fetchError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

export const { fetchStart, fetchSuccess, fetchError } = userSlice.actions;

// Async thunk
export const fetchUser = (id) => async (dispatch) => {
    dispatch(fetchStart());
    try {
        const response = await fetch(\`/api/users/\${id}\`);
        const data = await response.json();
        dispatch(fetchSuccess(data));
    } catch (error) {
        dispatch(fetchError(error.message));
    }
};

const store = configureStore({ reducer: { user: userSlice.reducer } });`},{id:53,title:`React Native`,category:`ecosystem`,level:`expert`,description:`Build mobile apps using React components.`,why:`To build native mobile apps with JavaScript and React.`,when:`Cross-platform mobile development.`,code:`// React Native component
import { View, Text, Button, StyleSheet } from 'react-native';

function App() {
    const [count, setCount] = useState(0);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Count: {count}</Text>
            <Button
                title="Increment"
                onPress={() => setCount(count + 1)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    title: { fontSize: 24, fontWeight: 'bold' }
});`},{id:54,title:`Next.js App Router`,category:`ecosystem`,level:`expert`,description:`Next.js 13+ App Router with server components.`,why:`To leverage React Server Components and better performance.`,when:`Building new Next.js apps with React 18+.`,code:`// app/page.js (Server Component)
async function getData() {
    const res = await fetch('https://api.example.com/data');
    return res.json();
}

export default async function Page() {
    const data = await getData(); // Directly await in server component
    return <div>{data.message}</div>;
}

// app/layout.js (Layout component)
export default function Layout({ children }) {
    return (
        <html>
            <body>
                <nav>Navigation</nav>
                {children}
            </body>
        </html>
    );
}`},{id:55,title:`React Server Components (RSC)`,category:`advanced`,level:`expert`,description:`Components that run on the server and send HTML to the client.`,why:`To reduce bundle size and improve performance.`,when:`Data-heavy components, Next.js 13+ apps.`,code:`// Server Component (file extension .server.jsx or in Next.js)
import { db } from './db';

async function UserList() {
    // This runs on the server
    const users = await db.query('SELECT * FROM users');
    
    return (
        <ul>
            {users.map(user => (
                <li key={user.id}>{user.name}</li>
            ))}
        </ul>
    );
}

// Client Component (file extension .client.jsx or 'use client')
'use client';

function InteractiveButton() {
    const [count, setCount] = useState(0);
    return (
        <button onClick={() => setCount(count + 1)}>
            Clicked {count} times
        </button>
    );
}`},{id:56,title:`Recoil (State Management)`,category:`state`,level:`expert`,description:`A state management library for React with atom-based approach.`,why:`For fine-grained state updates and better performance.`,when:`Complex state with derived values.`,code:`import { atom, selector, useRecoilState, useRecoilValue } from 'recoil';

// Atom (piece of state)
const todoListState = atom({
    key: 'todoListState',
    default: []
});

// Selector (derived state)
const todoCountState = selector({
    key: 'todoCountState',
    get: ({ get }) => {
        const list = get(todoListState);
        return list.length;
    }
});

function TodoApp() {
    const [todos, setTodos] = useRecoilState(todoListState);
    const count = useRecoilValue(todoCountState);

    const addTodo = (text) => {
        setTodos([...todos, { id: Date.now(), text }]);
    };

    return (
        <div>
            Total todos: {count}
            <button onClick={() => addTodo('New todo')}>Add</button>
        </div>
    );
}`},{id:57,title:`Storybook`,category:`ecosystem`,level:`expert`,description:`Build and test UI components in isolation.`,why:`To develop components independently and document them.`,when:`Design systems, component libraries.`,code:`// Button.stories.jsx
import { Button } from './Button';

export default {
    title: 'Components/Button',
    component: Button,
    argTypes: {
        variant: { control: 'select', options: ['primary', 'secondary'] }
    }
};

export const Primary = {
    args: {
        children: 'Primary Button',
        variant: 'primary'
    }
};

export const Secondary = {
    args: {
        children: 'Secondary Button',
        variant: 'secondary'
    }
};

// With state
export const WithState = {
    render: () => {
        const [count, setCount] = useState(0);
        return (
            <Button onClick={() => setCount(count + 1)}>
                Clicked {count} times
            </Button>
        );
    }
};`},{id:58,title:`React Helmet (SEO)`,category:`ecosystem`,level:`expert`,description:`Manage document head (title, meta tags, etc.) in React.`,why:`To improve SEO and social sharing.`,when:`SEO-critical pages, SSR apps.`,code:`import { Helmet } from 'react-helmet-async';

function ProductPage({ product }) {
    return (
        <>
            <Helmet>
                <title>{product.name} - My Store</title>
                <meta name="description" content={product.description} />
                <meta property="og:title" content={product.name} />
                <meta property="og:image" content={product.image} />
                <link rel="canonical" href={\`/products/\${product.id}\`} />
                <script type="application/ld+json">
                    {JSON.stringify(product.schema)}
                <\/script>
            </Helmet>
            <div>Product content...</div>
        </>
    );
}`},{id:59,title:`React Hook Form + Zod Validation`,category:`forms`,level:`expert`,description:`Powerful form handling with TypeScript validation using Zod.`,why:`Type-safe forms with excellent developer experience.`,when:`Forms in TypeScript projects.`,code:`import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Schema definition
const userSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    age: z.number().min(18, 'Must be 18 or older')
});

type UserFormData = z.infer;

function UserForm() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm({
        resolver: zodResolver(userSchema)
    });

    const onSubmit = async (data) => {
        // data is fully typed and validated
        await submitToApi(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register('name')} placeholder="Name" />
            {errors.name && <p>{errors.name.message}</p>}
            
            <input {...register('email')} placeholder="Email" />
            {errors.email && <p>{errors.email.message}</p>}
            
            <input type="number" {...register('age', { valueAsNumber: true })} />
            {errors.age && <p>{errors.age.message}</p>}
            
            <button type="submit" disabled={isSubmitting}>
                Submit
            </button>
        </form>
    );
}`},{id:60,title:`React Spring (Animations)`,category:`ecosystem`,level:`expert`,description:`Physics-based animations for React.`,why:`To create smooth, physics-based animations.`,when:`Animations, transitions, micro-interactions.`,code:`import { useSpring, animated } from '@react-spring/web';

function AnimatedBox() {
    const [isVisible, setIsVisible] = useState(false);

    const spring = useSpring({
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'scale(1)' : 'scale(0.8)',
        config: { tension: 300, friction: 10 }
    });

    return (
        <div>
            <button onClick={() => setIsVisible(!isVisible)}>Toggle</button>
            <animated.div style={spring}>
                This animates!
            </animated.div>
        </div>
    );
}

// Trails (staggered animations)
const items = ['Item 1', 'Item 2', 'Item 3'];
const trails = useTrail(items.length, {
    from: { opacity: 0, y: 20 },
    to: { opacity: 1, y: 0 }
});`},{id:61,title:`React DnD (Drag and Drop)`,category:`ecosystem`,level:`expert`,description:`Drag and drop functionality for React.`,why:`To implement drag and drop interfaces.`,when:`Kanban boards, sortable lists, file uploads.`,code:`import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function DraggableItem({ id, text, moveItem }) {
    const [{ isDragging }, drag] = useDrag({
        type: 'ITEM',
        item: { id },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    });

    const [{ isOver }, drop] = useDrop({
        accept: 'ITEM',
        drop: (item) => moveItem(item.id, id),
        collect: (monitor) => ({
            isOver: monitor.isOver()
        })
    });

    return (
        <div
            ref={(node) => drag(drop(node))}
            style={{
                opacity: isDragging ? 0.5 : 1,
                background: isOver ? 'lightblue' : 'white',
                padding: '10px',
                margin: '5px',
                border: '1px solid #ccc'
            }}
        >
            {text}
        </div>
    );
}`},{id:62,title:`React Virtualized (Virtual Lists)`,category:`performance`,level:`expert`,description:`Efficiently render large lists by only rendering visible items.`,why:`To render thousands of items without performance issues.`,when:`Large lists, data tables, infinite scrolling.`,code:`import { FixedSizeList } from 'react-window';

function LargeList({ items }) {
    const Row = ({ index, style }) => (
        <div style={style}>
            {items[index]}
        </div>
    );

    return (
        <FixedSizeList
            height={500}
            width={300}
            itemCount={items.length}
            itemSize={35}
        >
            {Row}
        </FixedSizeList>
    );
}

// With infinite loading
import { useInfiniteLoader } from 'react-window-infinite-loader';

function InfiniteList() {
    const { data, loadMore, hasMore } = useInfiniteData();

    const loader = useInfiniteLoader({
        isItemLoaded: (index) => !!data[index],
        loadMoreItems: (startIndex, stopIndex) => loadMore(),
        itemCount: hasMore ? data.length + 1 : data.length
    });

    return (
        <FixedSizeList
            height={500}
            width={300}
            itemCount={data.length}
            itemSize={35}
            onItemsRendered={loader.onItemsRendered}
        >
            {Row}
        </FixedSizeList>
    );
}`},{id:63,title:`Advanced Testing (MSW, Cypress)`,category:`ecosystem`,level:`expert`,description:`Mock API calls and end-to-end testing.`,why:`To test API integration and end-to-end workflows.`,when:`Comprehensive testing strategy.`,code:`// Mock Service Worker (MSW) - mock API
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
    rest.get('/api/users', (req, res, ctx) => {
        return res(ctx.json([{ id: 1, name: 'Alice' }]));
    })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// Cypress E2E test
describe('Login Flow', () => {
    it('should login successfully', () => {
        cy.visit('/login');
        cy.get('[name="email"]').type('test@test.com');
        cy.get('[name="password"]').type('password123');
        cy.get('button[type="submit"]').click();
        cy.url().should('include', '/dashboard');
    });
});`},{id:64,title:`Accessibility (a11y) in React`,category:`advanced`,level:`expert`,description:`Building accessible applications for all users.`,why:`To make apps usable by everyone, including users with disabilities.`,when:`Every application!`,code:`// Accessible component
function AccessibleButton({ label, onClick }) {
    return (
        <button
            onClick={onClick}
            aria-label={label}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onClick();
                }
            }}
        >
            {label}
        </button>
    );
}

// Accessible modal
function AccessibleModal({ isOpen, onClose, children }) {
    const modalRef = useRef();

    useEffect(() => {
        const focusable = modalRef.current?.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        focusable?.[0]?.focus();
    }, [isOpen]);

    if (!isOpen) return null;

    return createPortal(
        <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            ref={modalRef}
        >
            <h2 id="modal-title">Modal Title</h2>
            {children}
            <button onClick={onClose}>Close</button>
        </div>,
        document.getElementById('modal-root')
    );
}`},{id:65,title:`React Compiler`,category:`advanced`,level:`expert`,description:`Automatic memoization of components and values.`,why:`To automatically optimize React apps without manual work.`,when:`React 19+ apps, Next.js apps with compiler enabled.`,code:`// Before React Compiler (manual)
function Component({ data }) {
    const expensive = useMemo(() => compute(data), [data]);
    const handleClick = useCallback(() => { /* ... */ }, []);
    return <ExpensiveChild onClick={handleClick} data={expensive} />;
}

// After React Compiler (automatic)
// No useMemo, useCallback needed!
function Component({ data }) {
    // Compiler automatically memoizes expensive calculations
    const expensive = compute(data);
    const handleClick = () => { /* ... */ };
    return <ExpensiveChild onClick={handleClick} data={expensive} />;
}

// Enable in next.config.js
const nextConfig = {
    experimental: {
        reactCompiler: true
    }
};`},{id:66,title:`React 19 Features`,category:`advanced`,level:`expert`,description:`Latest React features including actions, useOptimistic, useActionState.`,why:`To use the latest React features for better UX.`,when:`React 19+ applications.`,code:`// useActionState (new)
import { useActionState } from 'react';

async function updateName(prevState, formData) {
    const name = formData.get('name');
    // Update server, etc.
    return { success: true, name };
}

function Profile() {
    const [state, formAction, isPending] = useActionState(updateName, { name: '' });

    return (
        <form action={formAction}>
            <input name="name" defaultValue={state.name} />
            <button type="submit" disabled={isPending}>
                Update
            </button>
        </form>
    );
}

// useOptimistic (optimistic updates)
import { useOptimistic } from 'react';

function CommentList() {
    const [comments, setComments] = useState([]);
    const [optimisticComments, addOptimisticComment] = useOptimistic(
        comments,
        (state, newComment) => [...state, { ...newComment, pending: true }]
    );

    const addComment = async (text) => {
        addOptimisticComment({ text });
        await postComment(text);
        // Refresh actual comments
    };
}`}],s=n(),c=10,l=[`all`,...new Set(o.map(e=>e.category))],u=e=>i.highlight(e,{language:`javascript`,ignoreIllegals:!0}).value;function d(){let[e,t]=(0,a.useState)(1),[n,i]=(0,a.useState)(0),[d,f]=(0,a.useState)(``),[p,m]=(0,a.useState)(`all`),[h,g]=(0,a.useState)(!0),_=(0,a.useMemo)(()=>{let e=d.trim().toLowerCase();return o.filter(t=>{let n=p===`all`||t.category===p,r=!e||`${t.title} ${t.description} ${t.category}`.toLowerCase().includes(e);return n&&r})},[p,d]),v=Math.max(1,Math.ceil(_.length/c)),y=Math.min(n,v-1),b=_.slice(y*c,y*c+c),x=_.find(t=>t.id===e)||b[0]||o[0],S=e=>{m(e),i(0)},C=e=>{t(e.id),g(!1);let n=Math.floor(_.findIndex(t=>t.id===e.id)/c);n>=0&&i(n)};return(0,s.jsxs)(`div`,{className:`react-course-page`,children:[(0,s.jsxs)(`section`,{className:`react-course-hero`,children:[(0,s.jsx)(r,{to:`/reactjs`,className:`react-course-back`,children:`← Back to ReactJS`}),(0,s.jsx)(`div`,{className:`react-course-kicker`,children:`React.js learning path`}),(0,s.jsx)(`h1`,{children:`Complete React.js`}),(0,s.jsx)(`p`,{children:`66 concepts from the first component to modern React architecture, explained with what it does, why it matters, when to use it, and a small example.`}),(0,s.jsxs)(`div`,{className:`react-course-stats`,children:[(0,s.jsxs)(`span`,{children:[(0,s.jsx)(`strong`,{children:o.length}),` concepts`]}),(0,s.jsxs)(`span`,{children:[(0,s.jsx)(`strong`,{children:l.length-1}),` learning areas`]}),(0,s.jsxs)(`span`,{children:[(0,s.jsx)(`strong`,{children:`4`}),` levels`]})]})]}),(0,s.jsxs)(`section`,{className:`react-course-workspace`,children:[(0,s.jsx)(`button`,{type:`button`,className:`react-course-mobile-toggle`,"aria-label":h?`Hide course concepts`:`Show course concepts`,"aria-expanded":h,onClick:()=>g(e=>!e),children:h?`←`:`→`}),(0,s.jsxs)(`aside`,{className:`react-course-sidebar${h?``:` is-mobile-collapsed`}`,"aria-label":`React course navigation`,children:[(0,s.jsxs)(`div`,{className:`react-course-sidebar-top`,children:[(0,s.jsx)(`label`,{htmlFor:`react-course-search`,children:`Find a concept`}),(0,s.jsx)(`input`,{id:`react-course-search`,value:d,onChange:e=>f(e.target.value),placeholder:`Search concepts`})]}),(0,s.jsx)(`div`,{className:`react-course-filters`,"aria-label":`Filter concepts`,children:l.map(e=>(0,s.jsx)(`button`,{type:`button`,className:p===e?`active`:``,onClick:()=>S(e),children:e},e))}),(0,s.jsxs)(`div`,{className:`react-course-list`,children:[b.map(e=>(0,s.jsxs)(`button`,{type:`button`,className:`react-course-nav-item ${x?.id===e.id?`selected`:``}`,onClick:()=>C(e),children:[(0,s.jsx)(`span`,{children:String(e.id).padStart(2,`0`)}),(0,s.jsx)(`strong`,{children:e.title}),(0,s.jsx)(`small`,{children:e.level})]},e.id)),!b.length&&(0,s.jsx)(`p`,{className:`react-course-empty`,children:`No concepts match that search.`})]}),(0,s.jsxs)(`div`,{className:`react-course-pagination`,children:[(0,s.jsx)(`button`,{type:`button`,disabled:y===0,onClick:()=>i(e=>Math.max(0,e-1)),children:`Previous`}),(0,s.jsxs)(`span`,{children:[y+1,` / `,v]}),(0,s.jsx)(`button`,{type:`button`,disabled:y===v-1,onClick:()=>i(e=>Math.min(v-1,e+1)),children:`Next`})]})]}),(0,s.jsxs)(`main`,{className:`react-course-detail`,"aria-live":`polite`,children:[(0,s.jsxs)(`div`,{className:`react-course-detail-top`,children:[(0,s.jsx)(`span`,{className:`react-course-level level-${x.level}`,children:x.level}),(0,s.jsx)(`span`,{className:`react-course-category`,children:x.category}),(0,s.jsxs)(`span`,{className:`react-course-number`,children:[`Concept `,x.id,` of `,o.length]})]}),(0,s.jsx)(`h2`,{children:x.title}),(0,s.jsx)(`p`,{className:`react-course-description`,children:x.description}),(0,s.jsxs)(`div`,{className:`react-course-explain-grid`,children:[(0,s.jsxs)(`section`,{children:[(0,s.jsx)(`h3`,{children:`Why:`}),(0,s.jsx)(`p`,{children:x.why})]}),(0,s.jsxs)(`section`,{children:[(0,s.jsx)(`h3`,{children:`When:`}),(0,s.jsx)(`p`,{children:x.when})]})]}),(0,s.jsxs)(`section`,{className:`react-course-example`,children:[(0,s.jsxs)(`div`,{className:`react-course-example-heading`,children:[(0,s.jsx)(`h3`,{children:`Example:`}),(0,s.jsx)(`span`,{children:`JSX / JavaScript`})]}),(0,s.jsx)(`pre`,{children:(0,s.jsx)(`code`,{className:`hljs language-javascript`,dangerouslySetInnerHTML:{__html:u(x.code)}})})]}),(0,s.jsxs)(`div`,{className:`react-course-detail-nav`,children:[(0,s.jsx)(`button`,{type:`button`,disabled:x.id===1,onClick:()=>C(o[x.id-2]),children:`← Previous concept`}),(0,s.jsx)(`button`,{type:`button`,disabled:x.id===o.length,onClick:()=>C(o[x.id]),children:`Next concept →`})]})]})]})]})}export{d as default};