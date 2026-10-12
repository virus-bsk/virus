import{r as e}from"./rolldown-runtime-QTnfLwEv.js";import{t}from"./react-CZI7_Jkm.js";import{o as n,r}from"./index-DCg-4qgp.js";import{t as i}from"./atom-one-dark-CL0A0LnX.js";/* empty css                      */var a=e(t(),1),o=r(),s=(e,t)=>{try{return t||=`java`,i.highlight(e,{language:t,ignoreIllegals:!0}).value}catch(n){return console.warn(`Highlight.js error for language '${t}':`,n),e.replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`).replace(/'/g,`&#x27;`)}},c=(e=>{let t=[],n=e.split(`
`),r=null,i=null,a=!1,o=[],s=``;for(let e=0;e<n.length;e++){let c=n[e],l=c.trim();if(l.startsWith("```")){if(!a)a=!0,s=l.replace(/```/g,``).trim()||`java`,o=[];else{if(a=!1,i&&o.length>0){let e=o.join(`
`).split(`
`),t=Math.min(...e.filter(e=>e.trim()).map(e=>e.match(/^\s*/)[0].length)),n=e.map(e=>e.slice(t)).join(`
`).trim();i.response.push({type:`code`,content:n,language:s})}o=[]}continue}if(a){o.push(c);continue}let u=c.match(/^###\s+(.+)/);if(u){r={name:u[1],questions:[]},t.push(r),i=null;continue}let d=c.match(/^(\d+)\.\s*\*\*(.+?)\*\*/);if(d)i={id:d[1],question:d[2],response:[]},r&&r.questions.push(i);else if(i&&c.trim().startsWith(`- **Response**:`)){let e=c.replace(`- **Response**:`,``).trim();e&&i.response.push({type:`text`,content:e})}else if(i&&c.trim()&&!c.trim().startsWith(`#`)){let e=c.trim();if(e&&e.length>1&&!e.match(/^[-*]\s*$/)&&!e.match(/^[a-zA-Z]$/)&&!e.match(/^[0-9]$/)){let t=e.replace(/^\s*[-*]\s+/,``).replace(/\*\*(.+?)\*\*/g,`$1`).replace(/`([^`]+)`/g,`$1`);i.response.push({type:`text`,content:t})}}}return t})(`## Java Interview Questions

### Java Basics & Language Components

1. **Explain the main idea behind Java and the concept of Write Once, Run Anywhere.**
    - **Response**: Java is a high-level, class-based, object-oriented programming language designed to have as few implementation dependencies as possible. The "Write Once, Run Anywhere" (WORA) concept means that Java code is compiled into platform-independent bytecode, which can run on any device with a Java Virtual Machine (JVM), regardless of the underlying operating system or hardware architecture.
    
    \`\`\`java
    // This Java code can run on Windows, Mac, Linux, or any platform with JVM
    public class HelloWorld {
        public static void main(String[] args) {
            System.out.println("Hello, World!");
        }
    }
    // Compile once: javac HelloWorld.java
    // Run anywhere: java HelloWorld
    \`\`\`

2. **What are the main features of Java?**
    - **Response**: Java's main features include:
    - **Object-Oriented**: Everything in Java is an object, promoting modularity and code reusability
    - **Platform Independent**: Java bytecode can run on any platform with a JVM
    - **Simple**: Clean syntax with complex features like pointers removed
    - **Secure**: Built-in security features with no explicit pointer support
    - **Architecture-Neutral**: Generates architecture-neutral object file format
    - **Portable**: No implementation-dependent aspects
    - **Robust**: Strong memory management, compile-time and runtime checking
    - **Multithreaded**: Supports concurrent execution of multiple threads
    - **High Performance**: JIT compiler provides high performance
    - **Distributed**: Designed for internet-based distributed environments

3. **Can you list some non-object-oriented features of Java?**
    - **Response**: Despite being primarily object-oriented, Java has some non-OOP features:
    - **Primitive data types**: int, char, boolean, double, etc. are not objects
    - **Static methods and variables**: Belong to classes rather than objects
    - **Static imports**: Allow importing static members without class qualification
    - **Primitive arrays**: Simple arrays of primitives without object overhead
    - **Math operations**: Direct arithmetic operators (+, -, *, /, %)
    
    \`\`\`java
    // Non-OOP features example
    public class NonOOPExample {
        // Static method (not instance-based)
        public static int add(int a, int b) {
            return a + b;
        }
        
        // Primitive array
        int[] numbers = {1, 2, 3, 4, 5};
        
        // Direct math operations
        int sum = 10 + 20;
    }
    \`\`\`

4. **Describe the difference between JDK, JRE, and JVM.**
    - **Response**: 
    - **JDK (Java Development Kit)**: Complete software development kit for developing Java applications. Includes JRE, compiler (javac), archiver (jar), documentation generator (Javadoc), and other development tools.
    - **JRE (Java Runtime Environment)**: Provides minimum requirements for executing Java applications. Includes JVM, core classes, and supporting files. Used for running applications, not developing them.
    - **JVM (Java Virtual Machine)**: The engine that executes Java bytecode. Converts bytecode into machine-specific code. Responsible for loading, verifying, and executing Java programs. Core component of JRE.
    
    \`\`\`java
    // JDK is used to compile this code
    // JRE is needed to run the compiled .class file
    // JVM executes the bytecode
    
    // Example: Compiling with JDK
    // javac MyProgram.java  (uses javac from JDK)
    
    // Example: Running with JRE/JVM
    // java MyProgram  (uses JVM from JRE)
    \`\`\`

5. **What is the role of the ClassLoader?**
    - **Response**: The ClassLoader in Java is responsible for loading class files into memory. It is part of the JVM and performs three main functions:
    - **Loading**: Finds and imports binary data for a type
    - **Linking**: Verifies, prepares, and resolves the loaded class
    - **Initialization**: Initializes the class by executing its static initializers and initializing static fields
    
    Java has three built-in class loaders: Bootstrap ClassLoader, Extension ClassLoader, and System/Application ClassLoader.
    
    \`\`\`java
    // Example: Custom ClassLoader
    public class CustomClassLoader extends ClassLoader {
        public Class<?> loadClass(String className) throws ClassNotFoundException {
            return super.loadClass(className);
        }
    }
    
    // Example: Getting ClassLoader
    ClassLoader classLoader = MyClass.class.getClassLoader();
    System.out.println("ClassLoader: " + classLoader);
    \`\`\`

6. **What is the difference between a path and a classpath in Java?**
    - **Response**: 
    - **path**: An environment variable that tells the operating system where to find executable files (like java, javac). It is used by the OS to locate Java development tools.
    - **classpath**: An environment variable or command-line argument that tells the JVM where to find user-defined classes and packages. It is used by the JVM to locate .class files during program execution.
    
    \`\`\`java
    // Setting classpath when running
    // java -cp .:lib/* com.example.Main
    
    // Example: Loading class from specific classpath
    ClassLoader classLoader = ClassLoader.getSystemClassLoader();
    Class<?> clazz = classLoader.loadClass("com.example.MyClass");
    \`\`\`

7. **Can you explain the difference between an int and an Integer in Java?**
    - **Response**: 
    - **int**: A primitive data type that stores integer values. Not an object, no methods, default value 0, stored on stack.
    - **Integer**: A wrapper class that encapsulates an int value in an object. Provides utility methods, can be null, stored on heap. Part of java.lang package. Used when primitives need to be treated as objects (e.g., in collections).
    
    \`\`\`java
    public class IntVsInteger {
        public static void main(String[] args) {
            // Primitive int
            int primitiveInt = 10;
            System.out.println("Primitive int: " + primitiveInt);
            
            // Wrapper Integer
            Integer wrapperInteger = 20;
            System.out.println("Wrapper Integer: " + wrapperInteger);
            
            // Autoboxing
            Integer autoboxed = primitiveInt;
            
            // Unboxing
            int unboxed = wrapperInteger;
            
            // Utility methods
            String str = Integer.toString(100);
            int parsed = Integer.parseInt("200");
        }
    }
    \`\`\`

8. **What are wrapper classes in Java?**
    - **Response**: Wrapper classes convert primitive data types into objects. Each primitive has a corresponding wrapper:
    - byte → Byte, short → Short, int → Integer, long → Long
    - float → Float, double → Double, char → Character, boolean → Boolean
    
    Benefits: Allow primitives in collections, provide utility methods, enable null values, support serialization.
    
    \`\`\`java
    public class WrapperExample {
        public static void main(String[] args) {
            // Autoboxing
            Integer intObj = 10;
            Double doubleObj = 3.14;
            Character charObj = 'A';
            Boolean boolObj = true;
            
            // Using in collections
            List<Integer> numbers = new ArrayList<>();
            numbers.add(1);  // Autoboxing
            numbers.add(2);
            numbers.add(3);
            
            // Utility methods
            int max = Integer.MAX_VALUE;
            int min = Integer.MIN_VALUE;
            String binary = Integer.toBinaryString(10);
        }
    }
    \`\`\`

9. **What does it mean that Java is a statically typed language?**
    - **Response**: Java is statically typed, meaning variable types must be declared at compile-time and cannot change during runtime. The compiler performs type checking during compilation, ensuring type safety. This catches type-related errors early. For example, if you declare int x, you cannot assign a String to x later.
    
    \`\`\`java
    public class StaticTypingExample {
        public static void main(String[] args) {
            // Type must be declared and cannot change
            int age = 25;
            String name = "John";
            
            // This would cause compile error:
            // age = "Twenty Five";  // Error: incompatible types
            
            // Type safety at compile time
            int result = age + 5;  // OK
        }
    }
    \`\`\`

10. **Is Java a pure object-oriented language? Why or why not?**
    - **Response**: Java is not a pure object-oriented language because it supports primitive data types (int, char, boolean, etc.) which are not objects. In a pure OOP language, everything should be an object. However, Java provides wrapper classes to treat primitives as objects when needed. Java is still considered mostly OOP as it supports encapsulation, inheritance, polymorphism, and abstraction.
    
    \`\`\`java
    public class OOPExample {
        // Primitives (non-OOP)
        int primitiveInt = 10;
        char primitiveChar = 'A';
        
        // Objects (OOP)
        Integer integerObj = 10;
        Character charObj = 'A';
        
        // Using wrapper to treat primitive as object
        List<Integer> numbers = new ArrayList<>();
        numbers.add(primitiveInt);  // Autoboxing
    }
    \`\`\`

11. **What is bytecode in the context of Java?**
    - **Response**: Bytecode is the intermediate, platform-independent code generated by the Java compiler (javac) from .java source files. It is stored in .class files and consists of binary instructions that the JVM can execute. Bytecode is not machine-specific, allowing Java programs to run on any platform with a JVM. The JVM interprets or compiles bytecode to native machine code at runtime using the JIT compiler.
    
    \`\`\`java
    // Source code (HelloWorld.java)
    public class HelloWorld {
        public static void main(String[] args) {
            System.out.println("Hello, World!");
        }
    }
    
    // Compile to bytecode
    // javac HelloWorld.java  → Creates HelloWorld.class
    
    // Bytecode (platform-independent)
    // Run on any platform with JVM
    // java HelloWorld
    \`\`\`

12. **How does garbage collection work in Java?**
    - **Response**: Garbage collection in Java is an automatic memory management process that reclaims memory occupied by objects no longer reachable from the application. The JVM uses generational collection:
    - **Young Generation**: New objects are allocated here (Eden space and survivor spaces). Minor GC occurs frequently.
    - **Old Generation**: Long-lived objects are promoted here. Major GC occurs less frequently.
    - The GC identifies unreachable objects and frees their memory automatically, preventing memory leaks.
    
    \`\`\`java
    public class GCExample {
        public static void main(String[] args) {
            // Object created in Young Generation (Eden)
            MyObject obj = new MyObject();
            
            // Object becomes eligible for GC when no references
            obj = null;
            
            // Suggest GC to run (not guaranteed)
            System.gc();
        }
    }
    
    class MyObject {
        @Override
        protected void finalize() throws Throwable {
            System.out.println("Object is being garbage collected");
        }
    }
    \`\`\`

13. **What is the purpose of the final keyword?**
    - **Response**: The final keyword restricts modification:
    - **Variables**: Can only be assigned once, becomes a constant
    - **Methods**: Cannot be overridden by subclasses
    - **Classes**: Cannot be extended or inherited
    
    Final helps create immutable classes, prevent inheritance when needed, and ensure thread safety.
    
    \`\`\`java
    public class FinalExample {
        // Final variable (constant)
        public static final int MAX_VALUE = 100;
        
        // Final class (cannot be extended)
        public final class ImmutableClass {
            private final int value;
            
            public ImmutableClass(int value) {
                this.value = value;
            }
            
            // Final method (cannot be overridden)
            public final int getValue() {
                return value;
            }
        }
    }
    \`\`\`

14. **Can we overload or override static methods in Java?**
    - **Response**: 
    - **Overloading**: Yes, static methods can be overloaded (same name, different parameters in same class)
    - **Overriding**: No, static methods cannot be overridden. Defining same method in subclass is called method hiding, not overriding. Static methods belong to the class, resolved at compile-time based on reference type.
    
    \`\`\`java
    class Parent {
        // Static method
        public static void staticMethod() {
            System.out.println("Parent static method");
        }
        
        // Overloaded static method
        public static void staticMethod(int x) {
            System.out.println("Parent static method with int: " + x);
        }
    }
    
    class Child extends Parent {
        // Method hiding (not overriding)
        public static void staticMethod() {
            System.out.println("Child static method");
        }
    }
    
    public class StaticMethodExample {
        public static void main(String[] args) {
            Parent.staticMethod();  // Parent static method
            Parent.staticMethod(10);  // Overloaded method
            
            Child.staticMethod();  // Child static method
        }
    }
    \`\`\`

15. **What is the significance of the this keyword in Java?**
    - **Response**: The this keyword refers to the current object instance. Uses:
    - Distinguish between instance variables and parameters with same name
    - Call other constructors in same class (constructor chaining)
    - Pass current object as parameter to methods/constructors
    - Return current class instance from method
    
    \`\`\`java
    public class ThisExample {
        private String name;
        private int age;
        
        // Constructor using this to differentiate variables
        public ThisExample(String name, int age) {
            this.name = name;  // this.name refers to instance variable
            this.age = age;
        }
        
        // Constructor chaining
        public ThisExample(String name) {
            this(name, 0);  // Calls another constructor
        }
        
        public ThisExample getThis() {
            return this;  // Returns current instance
        }
    }
    \`\`\`

### Object-Oriented Programming (OOP) Concepts

16. **Explain the four main principles of OOP.**
    - **Response**: The four main principles of OOP are:
    - **Encapsulation**: Hiding internal state and exposing only through public methods. Achieved using private fields with public getters/setters.
    - **Inheritance**: Mechanism where a class inherits properties and behaviors from another class. Promotes code reusability.
    - **Polymorphism**: Ability of objects to take multiple forms. Allows one interface to be used for different underlying data types.
    - **Abstraction**: Hiding complex implementation details and showing only essential features. Achieved using abstract classes and interfaces.
    
    \`\`\`java
    // Encapsulation
    class EncapsulationExample {
        private int data;  // private
        
        public int getData() {  // public getter
            return data;
        }
        
        public void setData(int data) {  // public setter
            this.data = data;
        }
    }
    
    // Inheritance
    class Parent {
        void display() {
            System.out.println("Parent");
        }
    }
    
    class Child extends Parent {  // inheritance
        void show() {
            System.out.println("Child");
        }
    }
    
    // Polymorphism
    class Animal {
        void sound() {
            System.out.println("Animal sound");
        }
    }
    
    class Dog extends Animal {
        @Override
        void sound() {
            System.out.println("Bark");
        }
    }
    
    // Abstraction
    abstract class AbstractClass {
        abstract void abstractMethod();
    }
    \`\`\`

17. **How does Java implement inheritance?**
    - **Response**: Java implements inheritance using the extends keyword. A subclass inherits public and protected members from its superclass. Java supports single inheritance (a class can extend only one class) but allows multiple inheritance through interfaces. The Object class is the root of all class hierarchies.
    
    \`\`\`java
    // Single inheritance with classes
    class Animal {
        void eat() {
            System.out.println("Eating...");
        }
    }
    
    class Dog extends Animal {  // Single inheritance
        void bark() {
            System.out.println("Barking...");
        }
    }
    
    // Multiple inheritance through interfaces
    interface A {
        void methodA();
    }
    
    interface B {
        void methodB();
    }
    
    class C implements A, B {  // Multiple inheritance
        public void methodA() {}
        public void methodB() {}
    }
    \`\`\`

18. **What are interfaces, and how are they different from abstract classes?**
    - **Response**: 
    - **Interface**: Contract with abstract methods (before Java 8). Can have default and static methods (Java 8+). Cannot have instance variables. A class can implement multiple interfaces.
    - **Abstract Class**: Cannot be instantiated, can have both abstract and concrete methods, can have instance variables and constructors. A class can extend only one abstract class.
    
    \`\`\`java
    // Interface
    interface Vehicle {
        void start();  // abstract method
        default void honk() {  // default method (Java 8+)
            System.out.println("Beep!");
        }
    }
    
    // Abstract class
    abstract class Animal {
        String name;  // instance variable
        
        abstract void sound();  // abstract method
        
        void eat() {  // concrete method
            System.out.println("Eating...");
        }
    }
    
    // Implementing interface
    class Car implements Vehicle {
        public void start() {
            System.out.println("Car started");
        }
    }
    
    // Extending abstract class
    class Dog extends Animal {
        void sound() {
            System.out.println("Bark");
        }
    }
    \`\`\`

19. **Explain method overloading and method overriding.**
    - **Response**: 
    - **Overloading**: Multiple methods with same name but different parameters in same class. Resolved at compile-time (compile-time polymorphism).
    - **Overriding**: Subclass provides specific implementation of parent class method. Same signature required. Resolved at runtime (runtime polymorphism). Requires inheritance.
    
    \`\`\`java
    class MethodOverloading {
        // Overloaded methods
        int add(int a, int b) {
            return a + b;
        }
        
        double add(double a, double b) {
            return a + b;
        }
        
        int add(int a, int b, int c) {
            return a + b + c;
        }
    }
    
    class Parent {
        void display() {
            System.out.println("Parent display");
        }
    }
    
    class Child extends Parent {
        // Overriding parent method
        @Override
        void display() {
            System.out.println("Child display");
        }
    }
    \`\`\`

20. **What is polymorphism in Java? Give an example.**
    - **Response**: Polymorphism allows objects to take many forms. A parent class reference can refer to child class objects.
    
    \`\`\`java
    class Animal {
        public void sound() {
            System.out.println("Animal makes a sound");
        }
    }
    
    class Dog extends Animal {
        public void sound() {
            System.out.println("Dog barks");
        }
    }
    
    class Cat extends Animal {
        public void sound() {
            System.out.println("Cat meows");
        }
    }
    
    public class Main {
        public static void main(String[] args) {
            Animal myDog = new Dog();
            Animal myCat = new Cat();
            
            myDog.sound(); // Output: Dog barks
            myCat.sound(); // Output: Cat meows
        }
    }
    \`\`\`

21. **What is encapsulation in Java, and how is it achieved?**
    - **Response**: Encapsulation hides internal state and exposes only through public methods. Achieved by:
    - Declaring variables as private
    - Providing public getter and setter methods
    - Protecting data from unauthorized access
    
    \`\`\`java
    public class Person {
        private String name;
        private int age;
        
        public String getName() {
            return name;
        }
        
        public void setName(String name) {
            this.name = name;
        }
        
        public int getAge() {
            return age;
        }
        
        public void setAge(int age) {
            if (age > 0) {
                this.age = age;
            }
        }
    }
    
    // Usage
    Person person = new Person();
    person.setName("John");
    person.setAge(30);
    System.out.println(person.getName());  // John
    \`\`\`

22. **What is the Liskov Substitution Principle?**
    - **Response**: The Liskov Substitution Principle (LSP) states that objects of a superclass should be replaceable with objects of a subclass without affecting program correctness. Subclasses should extend parent classes without changing their behavior. If S is a subtype of T, then objects of type T may be replaced with objects of type S without breaking the application.
    
    \`\`\`java
    // Bad example - violates LSP
    class Bird {
        void fly() {
            System.out.println("Flying...");
        }
    }
    
    class Penguin extends Bird {
        @Override
        void fly() {
            throw new UnsupportedOperationException("Penguins can't fly");
        }
    }
    
    // Good example - follows LSP
    interface Bird {
        void move();
    }
    
    class FlyingBird implements Bird {
        public void move() {
            fly();
        }
        
        void fly() {
            System.out.println("Flying...");
        }
    }
    
    class Penguin implements Bird {
        public void move() {
            swim();
        }
        
        void swim() {
            System.out.println("Swimming...");
        }
    }
    \`\`\`

23. **Can you illustrate the concept of coupling and cohesion in software design?**
    - **Response**: 
    - **Coupling**: Degree of dependency between modules. Low coupling (modules independent) is desired. Achieved through interfaces, dependency injection.
    - **Cohesion**: Degree to which elements within a module belong together. High cohesion (single responsibility) is desired. Each module should have a single, well-defined purpose.
    
    \`\`\`java
    // High cohesion, low coupling example
    
    // Interface (reduces coupling)
    interface PaymentProcessor {
        void processPayment(double amount);
    }
    
    // Implementation
    class CreditCardProcessor implements PaymentProcessor {
        public void processPayment(double amount) {
            // Process credit card payment
        }
    }
    
    class PayPalProcessor implements PaymentProcessor {
        public void processPayment(double amount) {
            // Process PayPal payment
        }
    }
    
    // OrderService depends on interface, not concrete classes
    class OrderService {
        private PaymentProcessor paymentProcessor;
        
        // Dependency injection (loose coupling)
        public OrderService(PaymentProcessor paymentProcessor) {
            this.paymentProcessor = paymentProcessor;
        }
        
        public void checkout(double amount) {
            paymentProcessor.processPayment(amount);
        }
    }
    \`\`\`

### Java Collections Framework

24. **Describe the Collections framework in Java.**
    - **Response**: The Java Collections Framework provides unified architecture for representing and manipulating collections. It includes:
    - **Interfaces**: List, Set, Map, Queue, Deque
    - **Implementations**: ArrayList, LinkedList, HashSet, TreeSet, HashMap, etc.
    - **Algorithms**: Methods for sorting, searching, shuffling
    
    Part of java.util package, introduced in Java 1.2.
    
    \`\`\`java
    import java.util.*;
    
    public class CollectionsExample {
        public static void main(String[] args) {
            // List - ordered, allows duplicates
            List<String> list = new ArrayList<>();
            list.add("Java");
            list.add("Python");
            list.add("Java");  // duplicate allowed
            
            // Set - no duplicates
            Set<String> set = new HashSet<>();
            set.add("Java");
            set.add("Python");
            set.add("Java");  // duplicate ignored
            
            // Map - key-value pairs
            Map<String, Integer> map = new HashMap<>();
            map.put("Java", 1);
            map.put("Python", 2);
            
            // Sorting
            Collections.sort(list);
        }
    }
    \`\`\`

25. **What are the main differences between a List, Set, and Map in Java?**
    - **Response**: 
    - **List**: Ordered collection, allows duplicates, indexed access (ArrayList, LinkedList)
    - **Set**: No duplicates, unordered (except LinkedHashSet, TreeSet) (HashSet, TreeSet)
    - **Map**: Key-value pairs, unique keys, not a Collection (HashMap, TreeMap)
    
    \`\`\`java
    // List example
    List<String> list = new ArrayList<>();
    list.add("A");
    list.add("B");
    list.add("A");  // Allowed
    System.out.println(list.get(0));  // A
    
    // Set example
    Set<String> set = new HashSet<>();
    set.add("A");
    set.add("B");
    set.add("A");  // Ignored
    System.out.println(set.size());  // 2
    
    // Map example
    Map<String, String> map = new HashMap<>();
    map.put("key1", "value1");
    map.put("key2", "value2");
    map.put("key1", "value3");  // Overwrites
    System.out.println(map.get("key1"));  // value3
    \`\`\`

26. **How does a HashSet work internally in Java?**
    - **Response**: HashSet is backed by HashMap. Elements are stored as keys with a constant dummy value. hashCode() determines bucket location, equals() checks for duplicates. Provides O(1) performance for basic operations with good hash function.
    
    \`\`\`java
    Set<String> set = new HashSet<>();
    set.add("Java");
    set.add("Python");
    set.add("Java");  // Duplicate, won't be added
    
    // Internally:
    // "Java" → HashMap key with dummy value
    // "Python" → HashMap key with dummy value
    // Second "Java" → Same hashCode, equals() returns true, not added
    
    System.out.println(set.size());  // Output: 2
    \`\`\`

27. **Can you explain the difference between Comparable and Comparator interfaces?**
    - **Response**: 
    - **Comparable**: Defines natural ordering. Class implements compareTo() method. Single sorting sequence.
    - **Comparator**: Defines custom ordering. Separate class implements compare() method. Multiple sorting sequences possible.
    
    \`\`\`java
    // Comparable - natural ordering
    class Student implements Comparable<Student> {
        int rollNo;
        String name;
        
        public int compareTo(Student s) {
            return this.rollNo - s.rollNo;  // sort by roll number
        }
    }
    
    // Comparator - custom ordering
    class NameComparator implements Comparator<Student> {
        public int compare(Student s1, Student s2) {
            return s1.name.compareTo(s2.name);  // sort by name
        }
    }
    
    // Usage
    List<Student> students = new ArrayList<>();
    Collections.sort(students);  // Uses Comparable
    Collections.sort(students, new NameComparator());  // Uses Comparator
    \`\`\`

28. **What is the difference between HashMap and Hashtable?**
    - **Response**: 
    - **HashMap**: Not synchronized, allows one null key and multiple null values, faster, introduced in Java 1.2
    - **Hashtable**: Synchronized, no null keys/values, slower, legacy class from Java 1.0
    
    ConcurrentHashMap preferred over Hashtable for thread-safe operations.
    
    \`\`\`java
    // HashMap - not thread-safe, allows null
    Map<String, String> hashMap = new HashMap<>();
    hashMap.put(null, "value");  // Allowed
    hashMap.put("key", null);  // Allowed
    
    // Hashtable - thread-safe, no null
    Map<String, String> hashTable = new Hashtable<>();
    // hashTable.put(null, "value");  // Throws NullPointerException
    
    // ConcurrentHashMap - thread-safe, better performance
    Map<String, String> concurrentMap = new ConcurrentHashMap<>();
    \`\`\`

29. **What is the significance of equals() and hashCode() methods in Java?**
    - **Response**: These methods are fundamental for hash-based collections:
    - **equals()**: Compares content/state of objects for equality
    - **hashCode()**: Returns hash code for bucket location in hash collections
    
    Contract: If equals() returns true, hashCode() must be same. Same hashCode doesn't guarantee equality.
    
    \`\`\`java
    class Student {
        int id;
        String name;
        
        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            Student student = (Student) o;
            return id == student.id && 
                   Objects.equals(name, student.name);
        }
        
        @Override
        public int hashCode() {
            return Objects.hash(id, name);
        }
    }
    
    // Usage in HashMap
    Map<Student, String> map = new HashMap<>();
    map.put(new Student(1, "John"), "Value");
    \`\`\`

30. **What are the advantages of using Generics in collections?**
    - **Response**: Generics provide:
    - **Type Safety**: Catch type errors at compile-time
    - **No Casting**: Eliminate need for type casting
    - **Compile-time Checking**: Prevent ClassCastException at runtime
    - **Code Reusability**: Generic algorithms work with different types
    
    \`\`\`java
    // Without generics
    List list = new ArrayList();
    list.add("Java");
    String s = (String) list.get(0);  // casting required
    
    // With generics
    List<String> list = new ArrayList<>();
    list.add("Java");
    String s = list.get(0);  // no casting needed
    
    // Type safety
    // list.add(10);  // Compile error
    \`\`\`

31. **How can we make a collection thread-safe in Java?**
    - **Response**: Methods:
    - **Synchronized wrappers**: Collections.synchronizedList(), etc.
    - **Concurrent collections**: ConcurrentHashMap, CopyOnWriteArrayList (preferred)
    - **Legacy classes**: Vector, Hashtable (not recommended)
    
    \`\`\`java
    // Synchronized wrapper
    List<String> syncList = Collections.synchronizedList(new ArrayList<>());
    
    // Concurrent collection (preferred)
    Map<String, String> concurrentMap = new ConcurrentHashMap<>();
    
    // Legacy (not recommended)
    Vector<String> vector = new Vector<>();
    \`\`\`

32. **What are concurrent collections, and why do we use them?**
    - **Response**: Concurrent collections are thread-safe collections from java.util.concurrent package. They provide better performance than synchronized collections using lock stripping, copy-on-write, and non-blocking algorithms. Examples: ConcurrentHashMap, CopyOnWriteArrayList, BlockingQueue.
    
    \`\`\`java
    import java.util.concurrent.*;
    
    public class ConcurrentExample {
        public static void main(String[] args) {
            // ConcurrentHashMap - better than Hashtable
            ConcurrentHashMap<String, String> map = new ConcurrentHashMap<>();
            map.put("key", "value");
            
            // CopyOnWriteArrayList - good for reads
            CopyOnWriteArrayList<String> list = new CopyOnWriteArrayList<>();
            list.add("item");
            
            // BlockingQueue - for producer-consumer
            BlockingQueue<String> queue = new LinkedBlockingQueue<>();
            queue.put("item");  // blocks if full
            String item = queue.take();  // blocks if empty
        }
    }
    \`\`\`

### Exceptions and Error Handling

33. **What is the difference between an error and an exception in Java?**
    - **Response**: 
    - **Error**: Serious problems that applications should not catch (OutOfMemoryError, StackOverflowError). Indicate problems with the JVM.
    - **Exception**: Conditions that programs should handle. Divided into checked (IOException, SQLException) and unchecked (NullPointerException, ArrayIndexOutOfBoundsException).
    
    \`\`\`java
    public class ErrorVsException {
        public static void main(String[] args) {
            // Exception - can be caught and handled
            try {
                int result = 10 / 0;  // ArithmeticException
            } catch (ArithmeticException e) {
                System.out.println("Exception caught: " + e.getMessage());
            }
            
            // Error - should not be caught
            // OutOfMemoryError, StackOverflowError
        }
    }
    \`\`\`

34. **Can you explain Java's exception hierarchy?**
    - **Response**: Java exception hierarchy:
    - **Throwable**: Root class
    - **Exception**: Checked exceptions (must be caught or declared)
    - **RuntimeException**: Unchecked exceptions (optional to catch)
    - **Error**: Serious errors that applications shouldn't catch
    
    Checked exceptions are verified at compile-time, unchecked at runtime.
    
    \`\`\`java
    // Exception hierarchy
    Throwable
    ├── Exception (checked)
    │   ├── IOException
    │   ├── SQLException
    │   └── RuntimeException (unchecked)
    │       ├── NullPointerException
    │       ├── ArrayIndexOutOfBoundsException
    │       └── IllegalArgumentException
    └── Error (serious, shouldn't catch)
        ├── OutOfMemoryError
        └── StackOverflowError
    \`\`\`

35. **What is the difference between checked and unchecked exceptions?**
    - **Response**: 
    - **Checked Exceptions**: Must be caught or declared with throws keyword. Examples: IOException, SQLException. Verified at compile-time.
    - **Unchecked Exceptions**: Subclasses of RuntimeException. Don't need explicit handling. Examples: NullPointerException, ArrayIndexOutOfBoundsException. Occur at runtime.
    
    \`\`\`java
    // Checked exception - must be handled
    public void readFile() throws IOException {
        FileReader file = new FileReader("file.txt");
        // Must declare throws or use try-catch
    }
    
    // Unchecked exception - optional handling
    public void divide(int a, int b) {
        int result = a / b;  // ArithmeticException if b=0
    }
    
    // Handling checked exception
    try {
        readFile();
    } catch (IOException e) {
        e.printStackTrace();
    }
    \`\`\`

36. **How do you handle exceptions in Java?**
    - **Response**: Using try-catch-finally blocks:
    - **try**: Contains code that might throw exception
    - **catch**: Handles the exception
    - **finally**: Executes always (cleanup code)
    - **throw**: Explicitly throws an exception
    - **throws**: Declares exceptions a method might throw
    
    \`\`\`java
    public class ExceptionHandling {
        public static void main(String[] args) {
            try {
                int result = 10 / 0;
            } catch (ArithmeticException e) {
                System.out.println("Error: " + e.getMessage());
            } finally {
                System.out.println("Finally block always executes");
            }
        }
        
        // Throwing exception
        public void validateAge(int age) throws IllegalArgumentException {
            if (age < 0) {
                throw new IllegalArgumentException("Age cannot be negative");
            }
        }
    }
    \`\`\`

37. **What is a finally block, and when is it used?**
    - **Response**: The finally block executes always, whether exception occurs or not. Used for cleanup code like closing resources (files, connections). Executes even if try or catch has return statement. Not executed only if JVM exits (System.exit()) or thread is killed.
    
    \`\`\`java
    public class FinallyExample {
        public static void main(String[] args) {
            BufferedReader reader = null;
            try {
                reader = new BufferedReader(new FileReader("file.txt"));
                // Read file
            } catch (IOException e) {
                e.printStackTrace();
            } finally {
                // Always executes - cleanup code
                try {
                    if (reader != null) {
                        reader.close();
                    }
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }
    \`\`\`

38. **Is it possible to catch multiple exceptions in a single catch block?**
    - **Response**: Yes, in Java 7 and later using multi-catch:
    \`\`\`java
    try {
        // code that might throw IOException or SQLException
        readFile();
        connectDatabase();
    } catch (IOException | SQLException ex) {
        ex.printStackTrace();
    }
    \`\`\`
    Exceptions must be unrelated (no subclass relationship).

39. **Can you throw any exception inside a lambda expression in Java?**
    - **Response**: Lambda expressions can only throw unchecked exceptions. For checked exceptions, you need to handle them inside the lambda or use a wrapper. Functional interfaces that throw checked exceptions cannot be used directly with standard functional interfaces.
    
    \`\`\`java
    // Lambda with unchecked exception
    List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);
    numbers.forEach(n -> {
        if (n == 2) {
            throw new RuntimeException("Unchecked exception");
        }
        System.out.println(n);
    });
    
    // Handling checked exception in lambda
    try {
        numbers.forEach(n -> {
            try {
                // Code that throws checked exception
            } catch (Exception e) {
                // Handle exception
            }
        });
    } catch (Exception e) {
        e.printStackTrace();
    }
    \`\`\`

### Java Concurrency

40. **What is the difference between a process and a thread in Java?**
    - **Response**: 
    - **Process**: Independent execution unit with own memory space. Resource-intensive to create. Cannot share data directly.
    - **Thread**: Lightweight execution unit within a process. Shares memory space with other threads in same process. Less resource-intensive. Can communicate directly.
    
    \`\`\`java
    // Process example
    public class ProcessExample {
        public static void main(String[] args) {
            // Each Java program runs in its own process
            Runtime runtime = Runtime.getRuntime();
            Process process = runtime.exec("notepad.exe");
        }
    }
    
    // Thread example
    class MyThread extends Thread {
        public void run() {
            System.out.println("Thread running: " + Thread.currentThread().getName());
        }
    }
    
    public class ThreadExample {
        public static void main(String[] args) {
            MyThread thread1 = new MyThread();
            MyThread thread2 = new MyThread();
            thread1.start();
            thread2.start();
        }
    }
    \`\`\`

41. **How do you create a thread in Java?**
    - **Response**: Two ways:
    **Method 1: Extend Thread class**
    \`\`\`java
    class MyThread extends Thread {
        public void run() {
            System.out.println("Thread is running: " + Thread.currentThread().getName());
        }
    }
    
    public class ThreadExample1 {
        public static void main(String[] args) {
            MyThread t1 = new MyThread();
            t1.start();
        }
    }
    \`\`\`
    **Method 2: Implement Runnable interface (preferred)**
    \`\`\`java
    class MyRunnable implements Runnable {
        public void run() {
            System.out.println("Thread is running: " + Thread.currentThread().getName());
        }
    }
    
    public class ThreadExample2 {
        public static void main(String[] args) {
            Thread t2 = new Thread(new MyRunnable());
            t2.start();
        }
    }
    \`\`\`

42. **Explain the concept of synchronization in context with threads.**
    - **Response**: Synchronization ensures only one thread accesses shared resource at a time, preventing thread interference and data inconsistency. Achieved using:
    - Synchronized methods
    - Synchronized blocks
    - Locks from java.util.concurrent.locks
    
    Prevents race conditions and ensures thread safety.
    
    \`\`\`java
    public class Counter {
        private int count = 0;
        
        // Synchronized method
        public synchronized void increment() {
            count++;
        }
        
        // Synchronized block
        public void incrementBlock() {
            synchronized(this) {
                count++;
            }
        }
        
        public int getCount() {
            return count;
        }
    }
    
    // Usage
    Counter counter = new Counter();
    counter.increment();
    \`\`\`

43. **What is deadlocking in multithreading?**
    - **Response**: Deadlock occurs when two or more threads are blocked forever, waiting for each other to release resources. Happens when:
    - Thread A holds lock on Resource 1, waits for Resource 2
    - Thread B holds lock on Resource 2, waits for Resource 1
    
    Both wait indefinitely, causing program to hang.
    
    \`\`\`java
    public class DeadlockExample {
        private static final Object resource1 = new Object();
        private static final Object resource2 = new Object();
        
        public static void main(String[] args) {
            // Thread 1
            new Thread(() -> {
                synchronized(resource1) {
                    System.out.println("Thread 1: Locked resource 1");
                    try { Thread.sleep(100); } catch (Exception e) {}
                    
                    synchronized(resource2) {
                        System.out.println("Thread 1: Locked resource 2");
                    }
                }
            }).start();
            
            // Thread 2
            new Thread(() -> {
                synchronized(resource2) {
                    System.out.println("Thread 2: Locked resource 2");
                    try { Thread.sleep(100); } catch (Exception e) {}
                    
                    synchronized(resource1) {
                        System.out.println("Thread 2: Locked resource 1");
                    }
                }
            }).start();
        }
    }
    \`\`\`

44. **How can you avoid deadlocks?**
    - **Response**: Strategies:
    - **Lock ordering**: Acquire locks in consistent order
    - **Lock timeout**: Use tryLock() with timeout
    - **Avoid nested locks**: Minimize multiple locks
    - **Use concurrent utilities**: ConcurrentHashMap, CopyOnWriteArrayList
    - **Deadlock detection**: Implement detection mechanisms
    
    \`\`\`java
    import java.util.concurrent.locks.*;
    
    public class DeadlockPrevention {
        private static final ReentrantLock lock1 = new ReentrantLock();
        private static final ReentrantLock lock2 = new ReentrantLock();
        
        public void method1() throws InterruptedException {
            // Try to acquire lock with timeout
            if (lock1.tryLock(1, TimeUnit.SECONDS)) {
                try {
                    System.out.println("Lock1 acquired");
                    Thread.sleep(100);
                    
                    // Try to acquire second lock
                    if (lock2.tryLock(1, TimeUnit.SECONDS)) {
                        try {
                            System.out.println("Lock2 acquired");
                        } finally {
                            lock2.unlock();
                        }
                    }
                } finally {
                    lock1.unlock();
                }
            }
        }
    }
    \`\`\`

45. **Can you explain the working of the volatile keyword?**
    - **Response**: The volatile keyword ensures:
    - Variable always read/written from main memory, not thread-local caches
    - Visibility guarantees across threads
    - Prevents instruction reordering
    
    Does not provide atomicity. Lighter than synchronized. Used for flags/state variables accessed by multiple threads.
    
    \`\`\`java
    public class VolatileExample {
        // volatile ensures visibility across threads
        private volatile boolean running = true;
        
        public void start() {
            new Thread(() -> {
                while (running) {
                    // Thread will see updated value of running
                }
            }).start();
        }
        
        public void stop() {
            running = false;  // Immediately visible to other threads
        }
    }
    \`\`\`

46. **What is the difference between the synchronized method and synchronized block?**
    - **Response**: 
    - **Synchronized method**: Locks entire method. Simpler but less flexible.
    - **Synchronized block**: Locks only specific code portion. Finer-grained control, better performance.
    
    \`\`\`java
    public class SyncExample {
        private int count = 0;
        private final Object lock = new Object();
        
        // Synchronized method - locks entire method
        public synchronized void syncMethod() {
            count++;
        }
        
        // Synchronized block - locks only specific code
        public void syncBlock() {
            // Non-synchronized code
            System.out.println("Before sync");
            
            synchronized(lock) {
                // Only this block is synchronized
                count++;
            }
            
            // More non-synchronized code
            System.out.println("After sync");
        }
    }
    \`\`\`

47. **How does the 'wait' and 'notify' mechanism work in Java's Object class?**
    - **Response**: wait() and notify() are used for inter-thread communication:
    - **wait()**: Current thread waits until notify() or notifyAll() called. Releases lock.
    - **notify()**: Wakes up single waiting thread
    - **notifyAll()**: Wakes up all waiting threads
    
    Must be called from synchronized context. Defined in Object class because they operate on object monitors.
    
    \`\`\`java
    public class WaitNotifyExample {
        private final Object lock = new Object();
        private boolean ready = false;
        
        public void consumer() throws InterruptedException {
            synchronized(lock) {
                while (!ready) {
                    lock.wait();  // Wait until ready
                }
                System.out.println("Consumed: " + ready);
            }
        }
        
        public void producer() throws InterruptedException {
            synchronized(lock) {
                ready = true;
                lock.notifyAll();  // Notify waiting threads
            }
        }
    }
    \`\`\`

48. **What are Executors in Java concurrency?**
    - **Response**: Executors provide higher-level replacement for working with Thread objects. Part of java.util.concurrent:
    - **Executor**: Basic interface for executing tasks
    - **ExecutorService**: Manages termination and produces Futures
    - **Executors**: Factory class for creating thread pools
    
    Benefits: Thread reuse, better performance, improved thread management.
    
    \`\`\`java
    import java.util.concurrent.*;
    
    public class ExecutorExample {
        public static void main(String[] args) {
            // Create thread pool with 3 threads
            ExecutorService executor = Executors.newFixedThreadPool(3);
            
            // Submit tasks
            for (int i = 0; i < 5; i++) {
                executor.submit(() -> {
                    System.out.println("Task executed by: " + Thread.currentThread().getName());
                });
            }
            
            // Shutdown executor
            executor.shutdown();
        }
    }
    \`\`\`

### Java 8 and Newer Features

49. **Can you explain lambda expressions in Java 8?**
    - **Response**: Lambda expressions provide concise way to represent method interfaces. Enable functional programming with less boilerplate. Syntax: (parameters) -> expression or (parameters) -> { statements }
    
    \`\`\`java
    import java.util.*;
    import java.util.stream.*;
    
    public class LambdaExample {
        public static void main(String[] args) {
            List<String> languages = Arrays.asList("Java", "Python", "C++");
            
            // Lambda expression
            languages.forEach(lang -> System.out.println(lang));
            
            // Method reference
            languages.forEach(System.out::println);
            
            // Stream with lambda
            List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);
            List<Integer> even = numbers.stream()
                .filter(n -> n % 2 == 0)
                .collect(Collectors.toList());
        }
    }
    \`\`\`

50. **How do default methods in interfaces work?**
    - **Response**: Default methods (Java 8+) have implementation in interface. Allow adding methods to interfaces without breaking existing implementations. Classes can use default or override it.
    
    \`\`\`java
    interface Vehicle {
        void start();  // abstract method
        
        default void honk() {  // default method
            System.out.println("Beep beep!");
        }
        
        static int getWheels() {  // static method
            return 4;
        }
    }
    
    class Car implements Vehicle {
        public void start() {
            System.out.println("Car started");
        }
        // honk() inherited with default implementation
    }
    
    public class DefaultMethodExample {
        public static void main(String[] args) {
            Car car = new Car();
            car.start();  // Car started
            car.honk();  // Beep beep! (default method)
        }
    }
    \`\`\`

51. **What is a stream in Java 8, and how is it different from a collection?**
    - **Response**: Stream is sequence of elements for sequential/parallel operations. Differences:
    - Collections store elements, streams don't
    - Streams are consumable (one-time use), collections reusable
    - Streams support functional operations (filter, map, reduce)
    - Lazy evaluation
    - Easy parallel processing
    
    \`\`\`java
    import java.util.*;
    import java.util.stream.*;
    
    public class StreamExample {
        public static void main(String[] args) {
            List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
            
            // Stream operations
            List<Integer> result = numbers.stream()
                .filter(n -> n % 2 == 0)  // filter even numbers
                .map(n -> n * n)  // square them
                .collect(Collectors.toList());
            
            System.out.println(result);  // [4, 16, 36, 64, 100]
            
            // Parallel stream
            long count = numbers.parallelStream()
                .filter(n -> n > 5)
                .count();
        }
    }
    \`\`\`

52. **Explain the function of the Optional class in Java.**
    - **Response**: Optional (Java 8+) represents presence/absence of value. Helps avoid NullPointerException. Methods: isPresent(), get(), orElse(), ifPresent(), etc.
    
    \`\`\`java
    import java.util.Optional;
    
    public class OptionalExample {
        public static void main(String[] args) {
            // Creating Optional
            Optional<String> optional1 = Optional.of("Hello");
            Optional<String> optional2 = Optional.ofNullable(getName());
            Optional<String> optional3 = Optional.empty();
            
            // Safe value retrieval
            String name = optional2.orElse("Default Name");
            
            // Execute if value present
            optional1.ifPresent(n -> System.out.println("Value: " + n));
            
            // Get with exception
            String value = optional1.get();
        }
        
        static String getName() {
            return null;
        }
    }
    \`\`\`

53. **What are method references in Java 8?**
    - **Response**: Shorthand for lambda expressions to call methods using :: operator. Types:
    - Static: ClassName::staticMethod
    - Instance: objectInstance::instanceMethod
    - Arbitrary object: ClassName::instanceMethod
    - Constructor: ClassName::new
    
    \`\`\`java
    import java.util.*;
    
    public class MethodReferenceExample {
        public static void main(String[] args) {
            List<String> languages = Arrays.asList("Java", "Python", "C++");
            
            // Lambda
            languages.forEach(lang -> System.out.println(lang));
            
            // Method reference (same as above)
            languages.forEach(System.out::println);
            
            // Constructor reference
            List<String> list = new ArrayList<>();
            list.add("Java");
        }
    }
    \`\`\`

54. **How does the Java module system work?**
    - **Response**: Java Module System (Java 9+) provides modularity:
    - **module-info.java**: Declares module dependencies and exports
    - Strong encapsulation (only exported packages accessible)
    - Reliable configuration
    - Scalable platform
    
    \`\`\`java
    // module-info.java
    module com.example.myapp {
        requires java.sql;
        requires java.base;
        
        exports com.example.myapp.api;
        exports com.example.myapp.services;
        
        // Internal packages not exported
        // com.example.myapp.internal
    }
    
    // Using module
    // java --module-path mods -m com.example.myapp/com.example.Main
    \`\`\`

55. **What new features were introduced in Java 9, Java 10, Java 11, and beyond?**
    - **Response**: 
    - **Java 9**: Module system, JShell, factory methods for collections, private methods in interfaces
    - **Java 10**: Local variable type inference (var), garbage collector interface
    - **Java 11**: HTTP client API, new String methods, local variable syntax for lambda
    - **Java 12-17**: Switch expressions, text blocks, records, sealed classes, pattern matching
    
    \`\`\`java
    // Java 9 - Collection factory methods
    List<String> list = List.of("A", "B", "C");
    Set<String> set = Set.of("X", "Y", "Z");
    Map<String, Integer> map = Map.of("A", 1, "B", 2);
    
    // Java 10 - var keyword
    var list = new ArrayList<String>();
    var map = new HashMap<String, Integer>();
    
    // Java 11 - String methods
    String str = "Hello";
    str.isBlank();
    str.lines().forEach(System.out::println);
    
    // Java 14 - Switch expressions
    int day = 3;
    String type = switch(day) {
        case 1, 2, 3 -> "Weekday";
        case 4, 5 -> "Weekend";
        default -> "Invalid";
    };
    \`\`\`

### Java Input/Output (I/O)

56. **Explain the Java I/O Streams model.**
    - **Response**: Java I/O streams are used for reading/writing data:
    - **Byte Streams**: Handle I/O of bytes (InputStream, OutputStream)
    - **Character Streams**: Handle I/O of characters (Reader, Writer)
    - **Standard Streams**: System.in, System.out, System.err
    - **Buffered Streams**: BufferedInputStream, BufferedReader for efficiency
    
    \`\`\`java
    import java.io.*;
    
    public class StreamExample {
        public static void main(String[] args) throws IOException {
            // Byte stream - for binary data
            FileInputStream fis = new FileInputStream("file.txt");
            FileOutputStream fos = new FileOutputStream("output.txt");
            
            // Character stream - for text
            FileReader reader = new FileReader("file.txt");
            FileWriter writer = new FileWriter("output.txt");
            
            // Buffered stream - for efficiency
            BufferedReader br = new BufferedReader(new FileReader("file.txt"));
            BufferedWriter bw = new BufferedWriter(new FileWriter("output.txt"));
        }
    }
    \`\`\`

57. **What is serialization in Java, and when would you use it?**
    - **Response**: Serialization converts object into byte stream for saving to file or transmitting over network. Used for:
    - Persisting object state
    - Sending objects over network
    - Deep cloning
    
    Class must implement Serializable interface. Uses ObjectOutputStream/ObjectInputStream.
    
    \`\`\`java
    import java.io.*;
    
    class Student implements Serializable {
        private static final long serialVersionUID = 1L;
        int id;
        String name;
        transient int age;  // won't be serialized
    }
    
    public class SerializationExample {
        public static void main(String[] args) throws Exception {
            // Serialization
            Student student = new Student();
            student.id = 1;
            student.name = "John";
            
            FileOutputStream fos = new FileOutputStream("student.ser");
            ObjectOutputStream oos = new ObjectOutputStream(fos);
            oos.writeObject(student);
            oos.close();
            
            // Deserialization
            FileInputStream fis = new FileInputStream("student.ser");
            ObjectInputStream ois = new ObjectInputStream(fis);
            Student deserialized = (Student) ois.readObject();
            ois.close();
        }
    }
    \`\`\`

58. **What is the difference between File and Path in Java?**
    - **Response**: 
    - **File**: Legacy class (java.io) for file operations. Many methods don't throw IOException.
    - **Path**: Modern interface (java.nio) introduced in Java 7. More flexible, supports file system operations, better exception handling. Part of NIO.2.
    
    \`\`\`java
    import java.nio.file.*;
    
    public class FileVsPath {
        public static void main(String[] args) throws IOException {
            // Legacy File class
            File file = new File("file.txt");
            boolean exists = file.exists();
            
            // Modern Path interface
            Path path = Paths.get("file.txt");
            boolean exists2 = Files.exists(path);
            
            // Reading with Path
            List<String> lines = Files.readAllLines(path);
            
            // Writing with Path
            Files.write(path, "Hello World".getBytes());
        }
    }
    \`\`\`

59. **How do you read and write text files in Java?**
    - **Response**: Modern ways (Java 11+):
    \`\`\`java
    import java.nio.file.*;
    
    public class FileIOExample {
        public static void main(String[] args) throws IOException {
            // Java 11+ - Read file
            String content = Files.readString(Path.of("file.txt"));
            
            // Java 11+ - Write file
            Files.writeString(Path.of("file.txt"), "Hello World");
            
            // Traditional way - BufferedReader
            BufferedReader reader = new BufferedReader(new FileReader("file.txt"));
            String line;
            while ((line = reader.readLine()) != null) {
                System.out.println(line);
            }
            reader.close();
            
            // Traditional way - BufferedWriter
            BufferedWriter writer = new BufferedWriter(new FileWriter("output.txt"));
            writer.write("Hello World");
            writer.close();
        }
    }
    \`\`\`

60. **What's the difference between InputStream and Reader in Java?**
    - **Response**: 
    - **InputStream**: Byte stream, reads binary data, reads bytes (0-255)
    - **Reader**: Character stream, reads character data, handles encoding/decoding
    
    Use InputStream for binary files (images), Reader for text files.
    
    \`\`\`java
    import java.io.*;
    
    public class StreamExample {
        public static void main(String[] args) throws IOException {
            // InputStream - for binary data
            InputStream is = new FileInputStream("image.jpg");
            int data;
            while ((data = is.read()) != -1) {
                // Process byte data
            }
            is.close();
            
            // Reader - for character data
            Reader reader = new FileReader("file.txt");
            int c;
            while ((c = reader.read()) != -1) {
                char ch = (char) c;
                // Process character
            }
            reader.close();
        }
    }
    \`\`\`

### Networking in Java

61. **What is a socket in Java networking, and how do you create a simple client-server application?**
    - **Response**: Socket is endpoint for communication between machines. ServerSocket accepts connections, Socket connects to server.
    
    \`\`\`java
    // Server
    ServerSocket serverSocket = new ServerSocket(8080);
    Socket clientSocket = serverSocket.accept();
    BufferedReader in = new BufferedReader(
        new InputStreamReader(clientSocket.getInputStream())
    );
    PrintWriter out = new PrintWriter(clientSocket.getOutputStream(), true);
    String message = in.readLine();
    out.println("Hello from server");
    serverSocket.close();
    
    // Client
    Socket socket = new Socket("localhost", 8080);
    PrintWriter out = new PrintWriter(socket.getOutputStream(), true);
    BufferedReader in = new BufferedReader(
        new InputStreamReader(socket.getInputStream())
    );
    out.println("Hello from client");
    String response = in.readLine();
    socket.close();
    \`\`\`

62. **What are the roles of the ServerSocket and Socket classes in Java?**
    - **Response**: 
    - **ServerSocket**: Listens for incoming connections on specific port. accept() method blocks until client connects.
    - **Socket**: Represents connection to server. Provides I/O streams for communication (getInputStream(), getOutputStream()).
    
    \`\`\`java
    // ServerSocket - waits for client connections
    ServerSocket serverSocket = new ServerSocket(8080);
    System.out.println("Server listening on port 8080");
    
    // Blocks until client connects
    Socket clientSocket = serverSocket.accept();
    System.out.println("Client connected");
    
    // Socket - communicate with client
    OutputStream output = clientSocket.getOutputStream();
    InputStream input = clientSocket.getInputStream();
    \`\`\`

63. **Explain the HTTPURLConnection class.**
    - **Response**: HTTPURLConnection (java.net) is used for HTTP communication. Allows making HTTP requests (GET, POST, etc.). Methods: setRequestMethod(), setRequestProperty(), getResponseCode(), getInputStream(). Deprecated in Java 11 in favor of HttpClient API.
    
    \`\`\`java
    import java.net.*;
    import java.io.*;
    
    public class HttpExample {
        public static void main(String[] args) throws Exception {
            // GET request
            URL url = new URL("https://api.example.com/data");
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");
            
            int responseCode = conn.getResponseCode();
            System.out.println("Response Code: " + responseCode);
            
            BufferedReader in = new BufferedReader(
                new InputStreamReader(conn.getInputStream())
            );
            String line;
            while ((line = in.readLine()) != null) {
                System.out.println(line);
            }
            in.close();
            conn.disconnect();
        }
    }
    \`\`\`

### Java Memory Management

64. **How does the heap work in Java?**
    - **Response**: Heap is runtime data area where objects are allocated. Divided into:
    - **Young Generation**: New objects (Eden space, Survivor spaces). Minor GC frequent.
    - **Old Generation**: Long-lived objects. Major GC less frequent.
    - GC automatically reclaims memory from unreachable objects.
    
    \`\`\`java
    public class HeapExample {
        public static void main(String[] args) {
            // Objects allocated in Young Generation (Eden)
            for (int i = 0; i < 1000000; i++) {
                String s = new String("Object " + i);
                // s becomes eligible for GC after each iteration
            }
            
            // Suggest GC
            System.gc();
        }
    }
    \`\`\`

65. **What are reference types in Java?**
    - **Response**: Java has four reference types:
    - **Strong**: Normal object references, prevent GC
    - **Soft**: SoftReference, cleared only when memory needed
    - **Weak**: WeakReference, cleared on next GC cycle
    - **Phantom**: PhantomReference, for cleanup tracking
    
    \`\`\`java
    import java.lang.ref.*;
    
    public class ReferenceTypes {
        public static void main(String[] args) {
            // Strong reference
            String strong = new String("Strong");
            
            // Soft reference - cleared when memory needed
            SoftReference<String> soft = new SoftReference<>(new String("Soft"));
            
            // Weak reference - cleared on next GC
            WeakReference<String> weak = new WeakReference<>(new String("Weak"));
            
            // Phantom reference - for cleanup tracking
            PhantomReference<String> phantom = new PhantomReference<>(
                new String("Phantom"), 
                new ReferenceQueue<>()
            );
        }
    }
    \`\`\`

66. **What is a memory leak and how would you prevent it in Java?**
    - **Response**: Memory leak occurs when objects are unintentionally retained, preventing GC. Prevention:
    - Close resources (streams, connections) in finally block
    - Use try-with-resources
    - Avoid static collections holding objects
    - Use weak references for caches
    - Remove listeners when not needed
    
    \`\`\`java
    // Bad - memory leak
    public class MemoryLeak {
        private static List<Object> list = new ArrayList<>();
        
        public void add(Object obj) {
            list.add(obj);  // Objects never removed
        }
    }
    
    // Good - using try-with-resources
    public class NoMemoryLeak {
        public void readFile() {
            try (BufferedReader reader = new BufferedReader(
                    new FileReader("file.txt"))) {
                // Automatically closed
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
    \`\`\`

67. **Explain the concept of "Escape Analysis" in Java.**
    - **Response**: Escape Analysis is JVM optimization that determines if object reference escapes method/thread. If object doesn't escape, JVM can:
    - Allocate on stack instead of heap
    - Eliminate synchronization
    - Scalar replacement (break object into fields)
    
    Reduces GC overhead and improves performance.
    
    \`\`\`java
    public class EscapeAnalysisExample {
        // Object doesn't escape - can be optimized
        public int calculate() {
            Point p = new Point(10, 20);  // May be allocated on stack
            return p.x + p.y;
        }
        
        // Object escapes - must be on heap
        private Point point;
        public void setPoint(Point p) {
            this.point = p;  // Escapes method
        }
    }
    
    class Point {
        int x, y;
        Point(int x, int y) {
            this.x = x;
            this.y = y;
        }
    }
    \`\`\`

### Java Annotations

68. **What are annotations in Java?**
    - **Response**: Annotations are metadata added to code providing information to compiler/runtime. Used for:
    - Code analysis
    - Code generation
    - Runtime processing
    
    Built-in: @Override, @Deprecated, @SuppressWarnings, @FunctionalInterface
    
    \`\`\`java
    // Built-in annotations
    @Override
    public String toString() {
        return "Custom toString";
    }
    
    @Deprecated
    public void oldMethod() {}
    
    @SuppressWarnings("unchecked")
    public void genericMethod() {}
    
    // Custom annotation
    @Retention(RetentionPolicy.RUNTIME)
    @Target(ElementType.METHOD)
    public @interface MyAnnotation {
        String value();
        int count() default 1;
    }
    \`\`\`

69. **Can you create your own annotations in Java?**
    - **Response**: Yes, using @interface keyword:
    \`\`\`java
    import java.lang.annotation.*;
    
    @Retention(RetentionPolicy.RUNTIME)
    @Target(ElementType.METHOD)
    public @interface MyAnnotation {
        String value();
        int count() default 1;
    }
    
    // Usage
    class MyClass {
        @MyAnnotation(value = "Test", count = 5)
        public void myMethod() {
            // Method implementation
        }
    }
    
    // Reading annotation
    Method method = MyClass.class.getMethod("myMethod");
    MyAnnotation annotation = method.getAnnotation(MyAnnotation.class);
    System.out.println(annotation.value());  // Test
    \`\`\`

70. **What built-in annotations are provided by Java?**
    - **Response**: Common built-in annotations:
    - **@Override**: Indicates method overrides parent method
    - **@Deprecated**: Marks as deprecated
    - **@SuppressWarnings**: Suppresses compiler warnings
    - **@FunctionalInterface**: Indicates functional interface
    - **@SafeVarargs**: Suppresses warnings for varargs with generics
    
    \`\`\`java
    // @Override
    @Override
    public String toString() {
        return "Custom toString";
    }
    
    // @Deprecated
    @Deprecated
    public void oldMethod() {}
    
    // @FunctionalInterface
    @FunctionalInterface
    interface MyFunctionalInterface {
        void execute();
    }
    \`\`\`

71. **How are annotations used in frameworks such as Spring or Hibernate?**
    - **Response**: In Spring: @Component, @Service, @Repository, @Controller define beans. @Autowired for dependency injection. @RequestMapping for URL mapping.
    
    In Hibernate: @Entity, @Table, @Id, @Column for ORM mapping. @OneToMany, @ManyToOne for relationships.
    
    \`\`\`java
    // Spring annotations
    @RestController
    @RequestMapping("/api/users")
    public class UserController {
        @Autowired
        private UserService userService;
        
        @GetMapping("/{id}")
        public User getUser(@PathVariable Long id) {
            return userService.findById(id);
        }
    }
    
    // Hibernate annotations
    @Entity
    @Table(name = "users")
    public class User {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;
        
        @Column(name = "name", nullable = false)
        private String name;
        
        @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
        private List<Order> orders;
    }
    \`\`\`

### Database Connectivity

72. **What is JDBC, and how do you connect to a database in Java?**
    - **Response**: JDBC (Java Database Connectivity) is API for connecting and executing queries on databases:
    \`\`\`java
    import java.sql.*;
    
    public class JDBCExample {
        public static void main(String[] args) {
            try {
                // Connect to database
                Connection conn = DriverManager.getConnection(
                    "jdbc:mysql://localhost:3306/mydb",
                    "username",
                    "password"
                );
                
                // Create statement
                Statement stmt = conn.createStatement();
                
                // Execute query
                ResultSet rs = stmt.executeQuery("SELECT * FROM users");
                
                // Process results
                while (rs.next()) {
                    System.out.println("User: " + rs.getString("name"));
                }
                
                // Close connections
                rs.close();
                stmt.close();
                conn.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }
    \`\`\`

73. **Explain the role of the DriverManager class in JDBC.**
    - **Response**: DriverManager manages database drivers. Responsible for:
    - Maintaining list of registered drivers
    - Establishing connections using appropriate driver
    - getConnection() method returns Connection object
    - Handles driver selection automatically
    
    \`\`\`java
    import java.sql.*;
    
    public class DriverManagerExample {
        public static void main(String[] args) {
            // Register driver (optional in modern JDBC)
            try {
                Class.forName("com.mysql.cj.jdbc.Driver");
            } catch (ClassNotFoundException e) {
                e.printStackTrace();
            }
            
            // Get connection
            try {
                Connection conn = DriverManager.getConnection(
                    "jdbc:mysql://localhost:3306/mydb",
                    "user",
                    "password"
                );
                System.out.println("Connected: " + conn);
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }
    \`\`\`

74. **How do you handle transactions in JDBC?**
    - **Response**: By default, JDBC is in auto-commit mode. For transaction management:
    \`\`\`java
    Connection conn = DriverManager.getConnection(url, user, password);
    
    try {
        // Disable auto-commit
        conn.setAutoCommit(false);
        
        // Execute multiple SQL statements
        Statement stmt = conn.createStatement();
        stmt.executeUpdate("UPDATE accounts SET balance = balance - 100 WHERE id = 1");
        stmt.executeUpdate("UPDATE accounts SET balance = balance + 100 WHERE id = 2");
        
        // Commit transaction
        conn.commit();
    } catch (SQLException e) {
        // Rollback on error
        conn.rollback();
        e.printStackTrace();
    } finally {
        conn.setAutoCommit(true);
        conn.close();
    }
    \`\`\`

75. **What is a PreparedStatement, and how does it prevent SQL injection?**
    - **Response**: PreparedStatement pre-compiles SQL queries with placeholders (?). Parameters are set separately, preventing SQL injection by escaping special characters automatically.
    
    \`\`\`java
    import java.sql.*;
    
    public class PreparedStatementExample {
        public static void main(String[] args) {
            try {
                Connection conn = DriverManager.getConnection(url, user, password);
                
                // Vulnerable to SQL injection
                // String query = "SELECT * FROM users WHERE email = '" + email + "'";
                
                // Safe - PreparedStatement
                String query = "SELECT * FROM users WHERE email = ?";
                PreparedStatement ps = conn.prepareStatement(query);
                ps.setString(1, userInput);  // Safely set parameter
                
                ResultSet rs = ps.executeQuery();
                
                // Another example with multiple parameters
                String insertQuery = "INSERT INTO users (name, email) VALUES (?, ?)";
                PreparedStatement ps2 = conn.prepareStatement(insertQuery);
                ps2.setString(1, "John");
                ps2.setString(2, "john@example.com");
                ps2.executeUpdate();
                
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }
    \`\`\`

### Testing in Java

76. **What is unit testing, and how is it implemented in Java?**
    - **Response**: Unit testing tests individual components in isolation. In Java, implemented using:
    - **JUnit**: Popular testing framework with @Test annotations
    - **TestNG**: Alternative with more features
    - **Mockito**: For mocking dependencies
    
    Tests verify expected outcomes using assertions.
    
    \`\`\`java
    import org.junit.Test;
    import static org.junit.Assert.*;
    
    public class CalculatorTest {
        @Test
        public void testAdd() {
            Calculator calc = new Calculator();
            int result = calc.add(2, 3);
            assertEquals(5, result);
        }
        
        @Test
        public void testDivide() {
            Calculator calc = new Calculator();
            assertThrows(ArithmeticException.class, () -> {
                calc.divide(10, 0);
            });
        }
    }
    \`\`\`

77. **Can you explain the difference between JUnit and TestNG?**
    - **Response**: 
    - **JUnit**: Simpler, @Test, @Before, @After annotations. JUnit 5 has more features.
    - **TestNG**: More flexible, parallel execution, data-driven testing, @BeforeMethod, @AfterMethod, @DataProvider for test data.
    
    \`\`\`java
    // JUnit 5 example
    import org.junit.jupiter.api.*;
    
    public class JUnitExample {
        @BeforeEach
        void setUp() {
            System.out.println("Before each test");
        }
        
        @Test
        void testMethod() {
            assertEquals(5, 2 + 3);
        }
        
        @AfterEach
        void tearDown() {
            System.out.println("After each test");
        }
    }
    
    // TestNG example
    import org.testng.annotations.*;
    
    public class TestNGExample {
        @BeforeMethod
        void setUp() {
            System.out.println("Before method");
        }
        
        @Test
        void testMethod() {
            Assert.assertEquals(5, 2 + 3);
        }
        
        @DataProvider
        Object[][] data() {
            return new Object[][] {{2, 3, 5}, {4, 5, 9}};
        }
        
        @Test(dataProvider = "data")
        void testAdd(int a, int b, int result) {
            assertEquals(result, a + b);
        }
    }
    \`\`\`

78. **What is mock testing, and which frameworks would you use for it in Java?**
    - **Response**: Mock testing creates mock objects to simulate real objects, isolating the component being tested. Frameworks:
    - **Mockito**: Most popular, simple API
    - **EasyMock**: Older, more strict
    - **JMock**: Flexible, behavior-driven
    
    \`\`\`java
    import static org.mockito.Mockito.*;
    import org.junit.Test;
    
    public class MockTestExample {
        @Test
        public void testUserService() {
            // Create mock
            UserRepository mockRepo = mock(UserRepository.class);
            
            // Stub method
            when(mockRepo.findById(1L)).thenReturn(Optional.of(new User()));
            
            // Use mock
            UserService service = new UserService(mockRepo);
            User user = service.getUser(1L);
            
            // Verify
            verify(mockRepo).findById(1L);
        }
    }
    \`\`\`

### Java Design Patterns

79. **What are design patterns, and why are they useful?**
    - **Response**: Design patterns are proven solutions to common software design problems. Benefits:
    - Provide tested, proven paradigms
    - Improve code reusability and maintainability
    - Common vocabulary for developers
    - Document best practices
    
    Types: Creational (Singleton, Factory), Structural (Adapter, Decorator), Behavioral (Observer, Strategy).

80. **Can you explain the Singleton pattern and its pitfalls?**
    - **Response**: Singleton ensures only one instance exists:
    \`\`\`java
    public class Singleton {
        private static volatile Singleton instance;
        
        private Singleton() {}
        
        public static Singleton getInstance() {
            if (instance == null) {
                synchronized(Singleton.class) {
                    if (instance == null) {
                        instance = new Singleton();
                    }
                }
            }
            return instance;
        }
    }
    \`\`\`
    
    Pitfalls: Difficult to test, global state, tight coupling, multithreading issues.

81. **What is the Factory pattern in Java?**
    - **Response**: Factory pattern provides interface for creating objects, allowing subclasses to alter object types. Decouples client code from object creation.
    
    \`\`\`java
    interface Vehicle {
        void drive();
    }
    
    class Car implements Vehicle {
        public void drive() {
            System.out.println("Driving car");
        }
    }
    
    class Bike implements Vehicle {
        public void drive() {
            System.out.println("Riding bike");
        }
    }
    
    class VehicleFactory {
        public Vehicle getVehicle(String type) {
            if (type.equalsIgnoreCase("CAR")) {
                return new Car();
            } else if (type.equalsIgnoreCase("BIKE")) {
                return new Bike();
            }
            throw new IllegalArgumentException("Invalid vehicle type");
        }
    }
    
    // Usage
    VehicleFactory factory = new VehicleFactory();
    Vehicle car = factory.getVehicle("CAR");
    car.drive();
    \`\`\`

82. **How does the Strategy pattern work?**
    - **Response**: Strategy pattern defines family of algorithms, encapsulates each, makes them interchangeable. Algorithm varies independently from clients.
    
    \`\`\`java
    interface PaymentStrategy {
        void pay(int amount);
    }
    
    class CreditCardPayment implements PaymentStrategy {
        private String cardNumber;
        
        public CreditCardPayment(String cardNumber) {
            this.cardNumber = cardNumber;
        }
        
        public void pay(int amount) {
            System.out.println("Paid " + amount + " using Credit Card: " + cardNumber);
        }
    }
    
    class PayPalPayment implements PaymentStrategy {
        private String email;
        
        public PayPalPayment(String email) {
            this.email = email;
        }
        
        public void pay(int amount) {
            System.out.println("Paid " + amount + " using PayPal: " + email);
        }
    }
    
    class ShoppingCart {
        private PaymentStrategy paymentStrategy;
        
        public void setPaymentStrategy(PaymentStrategy strategy) {
            this.paymentStrategy = strategy;
        }
        
        public void checkout(int amount) {
            paymentStrategy.pay(amount);
        }
    }
    \`\`\`

83. **What is the Observer pattern and where is it used?**
    - **Response**: Observer pattern defines one-to-many dependency. When one object changes state, all dependents are notified. Used in:
    - Event handling systems
    - GUI event listeners
    - Message broker systems
    - Reactive programming
    
    \`\`\`java
    import java.util.*;
    
    interface Observer {
        void update(String message);
    }
    
    interface Subject {
        void registerObserver(Observer observer);
        void removeObserver(Observer observer);
        void notifyObservers();
    }
    
    class NewsAgency implements Subject {
        private List<Observer> observers = new ArrayList<>();
        private String news;
        
        public void setNews(String news) {
            this.news = news;
            notifyObservers();
        }
        
        public void registerObserver(Observer observer) {
            observers.add(observer);
        }
        
        public void removeObserver(Observer observer) {
            observers.remove(observer);
        }
        
        public void notifyObservers() {
            for (Observer observer : observers) {
                observer.update(news);
            }
        }
    }
    
    class NewsChannel implements Observer {
        private String news;
        
        public void update(String news) {
            this.news = news;
            System.out.println("News received: " + news);
        }
    }
    \`\`\`

### Java Security

84. **What is the Java security model?**
    - **Response**: Java security model provides:
    - **Bytecode verification**: Ensures code follows Java language rules
    - **Classloader architecture**: Isolates namespaces
    - **Security Manager**: Defines security policy, controls resource access
    - **Sandbox**: Untrusted code runs in restricted environment
    - **Cryptography**: Built-in cryptographic services
    
    \`\`\`java
    // Security Manager example
    System.setSecurityManager(new SecurityManager());
    
    // Check permission
    try {
        SecurityManager sm = System.getSecurityManager();
        if (sm != null) {
            sm.checkPermission(new RuntimePermission("accessClassInPackage.java.lang"));
        }
    } catch (SecurityException e) {
        System.out.println("Permission denied");
    }
    \`\`\`

85. **How can you secure Java code against SQL injection attacks?**
    - **Response**: Use PreparedStatements with parameterized queries. Never concatenate user input into SQL strings. Use ORM frameworks (Hibernate) which provide built-in protection. Validate and sanitize all user input. Use stored procedures when possible.
    
    \`\`\`java
    // Bad - SQL injection vulnerable
    String query = "SELECT * FROM users WHERE email = '" + userInput + "'";
    
    // Good - PreparedStatement prevents SQL injection
    String query = "SELECT * FROM users WHERE email = ?";
    PreparedStatement ps = conn.prepareStatement(query);
    ps.setString(1, userInput);
    ResultSet rs = ps.executeQuery();
    
    // Using Hibernate (ORM)
    // Automatically prevents SQL injection
    public User findByEmail(String email) {
        return entityManager.createQuery(
            "SELECT u FROM User u WHERE u.email = :email", User.class)
            .setParameter("email", email)
            .getSingleResult();
    }
    \`\`\`

86. **Explain the role of the SecurityManager in Java.**
    - **Response**: SecurityManager defines security policy, controls access to system resources. Checks permissions before operations. Deprecated in Java 17+ in favor of other security mechanisms. Previously used to run untrusted code in sandboxed environment.
    
    \`\`\`java
    // Setting security manager
    System.setSecurityManager(new SecurityManager());
    
    // Check permission
    try {
        SecurityManager sm = System.getSecurityManager();
        sm.checkRead("file.txt");
    } catch (SecurityException e) {
        System.out.println("Access denied");
    }
    \`\`\`

### Performance Tuning in Java

87. **How would you identify and improve the performance of a Java application?**
    - **Response**: Steps:
    - Profile application using tools (VisualVM, JProfiler)
    - Identify bottlenecks (CPU, memory, I/O)
    - Optimize algorithms and data structures
    - Use appropriate collections
    - Minimize object creation
    - Use StringBuilder for string concatenation
    - Optimize database queries
    - Use caching
    - Tune JVM parameters
    
    \`\`\`java
    // Bad - String concatenation in loop
    String result = "";
    for (int i = 0; i < 1000; i++) {
        result += i;  // Creates new String object each time
    }
    
    // Good - StringBuilder
    StringBuilder sb = new StringBuilder();
    for (int i = 0; i < 1000; i++) {
        sb.append(i);
    }
    String result = sb.toString();
    \`\`\`

88. **What tools do you use for Java profiling?**
    - **Response**: Tools:
    - **VisualVM**: Free, visual tool for monitoring
    - **JProfiler**: Commercial, comprehensive profiling
    - **YourKit**: Commercial Java profiler
    - **Java Mission Control**: Oracle's profiling tool
    - **NetBeans Profiler**: Integrated with NetBeans IDE
    - **Eclipse MAT**: Memory analysis tool
    
    \`\`\`java
    // Enable profiling
    // java -agentlib:hprof=cpu=sample,depth=10 MyClass
    
    // VisualVM example
    // jvisualvm
    
    // Programmatic profiling
    public class ProfilingExample {
        public static void main(String[] args) {
            long start = System.nanoTime();
            
            // Code to profile
            performTask();
            
            long end = System.nanoTime();
            long duration = (end - start) / 1000000;  // milliseconds
            System.out.println("Duration: " + duration + "ms");
        }
    }
    \`\`\`

89. **What are some common performance issues in Java applications?**
    - **Response**: Common issues:
    - Memory leaks (unclosed resources, static references)
    - Excessive object creation
    - Inefficient algorithms (O(n²) instead of O(n log n))
    - String concatenation in loops
    - Improper use of collections
    - Database query issues (N+1 problem)
    - Thread contention
    - Improper caching
    
    \`\`\`java
    // Bad - N+1 problem
    List<Order> orders = getOrders();
    for (Order order : orders) {
        User user = getUser(order.getUserId());  // N+1 queries
    }
    
    // Good - batch loading
    List<Order> orders = getOrders();
    List<Long> userIds = orders.stream()
        .map(Order::getUserId)
        .collect(Collectors.toList());
    Map<Long, User> users = getUsersByIds(userIds);  // Single query
    \`\`\`

### Java Development Best Practices

90. **What are some coding best practices in Java?**
    - **Response**: Best practices:
    - Follow naming conventions
    - Write small, focused methods
    - Use meaningful variable names
    - Handle exceptions properly
    - Close resources (try-with-resources)
    - Use generics for type safety
    - Avoid mutable static fields
    - Write unit tests
    - Use immutable objects when possible
    - Follow SOLID principles
    
    \`\`\`java
    // Good practices example
    public class BestPractices {
        // Meaningful names
        private int userAge;
        
        // Small, focused method
        public boolean isAdult(int age) {
            return age >= 18;
        }
        
        // Try-with-resources
        public void readFile(String path) throws IOException {
            try (BufferedReader reader = new BufferedReader(
                    new FileReader(path))) {
                String line;
                while ((line = reader.readLine()) != null) {
                    System.out.println(line);
                }
            }
        }
        
        // Immutable class
        public final class ImmutableUser {
            private final String name;
            private final int age;
            
            public ImmutableUser(String name, int age) {
                this.name = name;
                this.age = age;
            }
            
            public String getName() { return name; }
            public int getAge() { return age; }
        }
    }
    \`\`\`

91. **How would you manage dependencies in a Java project?**
    - **Response**: Use build tools:
    - **Maven**: pom.xml, dependency management, lifecycle
    - **Gradle**: Groovy/Kotlin DSL, faster, more flexible
    - Define dependencies, versions, scopes
    - Use dependency management for consistent versions
    - Exclude transitive dependencies when needed
    
    \`\`\`xml
    <!-- Maven pom.xml -->
    <dependencies>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-core</artifactId>
            <version>5.3.0</version>
        </dependency>
    </dependencies>
    \`\`\`
    
    \`\`\`groovy
    // Gradle build.gradle
    dependencies {
        implementation 'org.springframework:spring-core:5.3.0'
        testImplementation 'junit:junit:4.13.2'
    }
    \`\`\`

92. **What is continuous integration in the context of Java development?**
    - **Response**: CI is practice of frequently integrating code changes into shared repository. Automated builds and tests run on each commit. Tools: Jenkins, Travis CI, GitHub Actions. Benefits: Early bug detection, improved code quality, faster development.
    
    \`\`\`yaml
    # GitHub Actions example
    name: Java CI
    
    on: [push]
    
    jobs:
      build:
        runs-on: ubuntu-latest
        steps:
          - uses: actions/checkout@v2
          - uses: actions/setup-java@v2
            with:
              java-version: '11'
          - run: mvn clean test
    \`\`\`

### JVM Internals

93. **Explain the structure of the JVM and how it executes code.**
    - **Response**: JVM structure:
    - **Class Loader**: Loads .class files
    - **Runtime Data Areas**: Method area, heap, stack, PC registers, native method stacks
    - **Execution Engine**: Interpreter + JIT compiler
    - **Native Interface**: Interfaces with native libraries
    
    Execution: Load → Verify → Prepare → Resolve → Initialize → Execute
    
    \`\`\`java
    // JVM execution flow
    // 1. Load: ClassLoader loads .class file
    // 2. Verify: Bytecode verifier checks validity
    // 3. Prepare: Allocate memory for static variables
    // 4. Resolve: Replace symbolic references with direct references
    // 5. Initialize: Execute static initializers
    // 6. Execute: Interpreter or JIT compiler runs code
    
    // Example: JVM parameters
    // java -Xms256m -Xmx512m -XX:+UseG1GC MyClass
    \`\`\`

94. **How does the Just-In-Time (JIT) compiler work?**
    - **Response**: JIT compiler compiles bytecode to native machine code at runtime. Improves performance by:
    - Identifying hot spots (frequently executed code)
    - Compiling bytecode to native code
    - Caching compiled code
    - Optimizing based on runtime information
    
    Reduces interpretation overhead.
    
    \`\`\`java
    // JIT compilation happens automatically
    public class JITExample {
        public static void main(String[] args) {
            // This method will be JIT compiled after many invocations
            for (int i = 0; i < 10000; i++) {
                calculate(i);
            }
        }
        
        public static int calculate(int x) {
            return x * x + 2 * x + 1;
        }
    }
    
    // JVM flags for JIT
    // -XX:+PrintCompilation - print compiled methods
    // -XX:+TieredCompilation - use tiered compilation
    \`\`\`

95. **What is the role of the garbage collector in the JVM?**
    - **Response**: GC automatically reclaims memory from unreachable objects. Responsibilities:
    - Allocate memory for new objects
    - Identify unreachable objects
    - Reclaim memory
    - Compact heap (move objects)
    
    Types: Serial, Parallel, CMS, G1, ZGC, Shenandoah.
    
    \`\`\`java
    public class GCExample {
        public static void main(String[] args) {
            // Create objects
            for (int i = 0; i < 1000000; i++) {
                String s = new String("Object " + i);
            }
            
            // Suggest GC
            System.gc();
            
            // Monitor GC
            long totalMemory = Runtime.getRuntime().totalMemory();
            long freeMemory = Runtime.getRuntime().freeMemory();
            System.out.println("Used memory: " + (totalMemory - freeMemory));
        }
    }
    
    // JVM GC flags
    // -XX:+UseG1GC - use G1 garbage collector
    // -Xmx512m - set max heap size
    \`\`\`

### Popular Java Frameworks

96. **What is Spring Framework and what problem does it solve?**
    - **Response**: Spring is comprehensive framework for enterprise Java. Solves:
    - Dependency Injection/IoC
    - AOP for cross-cutting concerns
    - Transaction management
    - MVC web framework
    - Data access simplification
    - Security
    
    Enables building applications from POJOs with enterprise services.
    
    \`\`\`java
    @Configuration
    @ComponentScan("com.example")
    public class AppConfig {
        @Bean
        public UserService userService() {
            return new UserServiceImpl();
        }
    }
    
    @Service
    public class UserServiceImpl implements UserService {
        @Autowired
        private UserRepository userRepository;
        
        public User getUser(Long id) {
            return userRepository.findById(id);
        }
    }
    \`\`\`

97. **How does Hibernate ORM work?**
    - **Response**: Hibernate ORM maps Java objects to database tables. Provides:
    - Object-relational mapping
    - HQL (Hibernate Query Language)
    - Lazy loading, caching
    - Automatic table creation
    - Database independence
    
    Eliminates boilerplate JDBC code.
    
    \`\`\`java
    @Entity
    @Table(name = "users")
    public class User {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;
        
        @Column(name = "name")
        private String name;
        
        @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
        private List<Order> orders;
    }
    
    // Usage
    Session session = sessionFactory.openSession();
    Transaction tx = session.beginTransaction();
    
    User user = new User();
    user.setName("John");
    session.save(user);
    
    tx.commit();
    session.close();
    \`\`\`

98. **What is the purpose of the Spring Boot framework?**
    - **Response**: Spring Boot simplifies Spring application development:
    - Auto-configuration based on dependencies
    - Starter dependencies for common use cases
    - Embedded servers (Tomcat, Jetty)
    - Production-ready features (metrics, health checks)
    - No XML configuration needed
    - Reduces boilerplate significantly
    
    \`\`\`java
    @SpringBootApplication
    public class Application {
        public static void main(String[] args) {
            SpringApplication.run(Application.class, args);
        }
    }
    
    @RestController
    @RequestMapping("/api/users")
    public class UserController {
        @Autowired
        private UserService userService;
        
        @GetMapping("/{id}")
        public ResponseEntity<User> getUser(@PathVariable Long id) {
            return ResponseEntity.ok(userService.findById(id));
        }
    }
    \`\`\`

### Tools and Development Environments

99. **What IDEs are commonly used for Java development?**
    - **Response**: Popular Java IDEs:
    - **IntelliJ IDEA**: Most popular, feature-rich
    - **Eclipse**: Open-source, highly extensible
    - **NetBeans**: Open-source, good for beginners
    - **VS Code**: Lightweight with extensions
    - **JDeveloper**: Oracle's IDE

100. **Are you familiar with build tools like Maven and Gradle?**
    - **Response**: Yes, build tools automate build process:
    - **Maven**: XML-based (pom.xml), convention over configuration, lifecycle phases, dependency management
    - **Gradle**: Groovy/Kotlin DSL, faster, more flexible, incremental builds, better for multi-module projects
    
    Both handle dependencies, compilation, testing, packaging, deployment.
    
    \`\`\`xml
    <!-- Maven pom.xml -->
    <project>
        <modelVersion>4.0.0</modelVersion>
        <groupId>com.example</groupId>
        <artifactId>myapp</artifactId>
        <version>1.0.0</version>
        
        <dependencies>
            <dependency>
                <groupId>org.springframework</groupId>
                <artifactId>spring-core</artifactId>
                <version>5.3.0</version>
            </dependency>
        </dependencies>
    </project>
    \`\`\`
    
    \`\`\`groovy
    // Gradle build.gradle
    plugins {
        id 'java'
        id 'application'
    }
    
    application {
        mainClass = 'com.example.Main'
    }
    
    dependencies {
        implementation 'org.springframework:spring-core:5.3.0'
        testImplementation 'junit:junit:4.13.2'
    }
    \`\`\``),l=c.reduce((e,t)=>e+t.questions.length,0);function u(){let[e,t]=(0,a.useState)(null),r=n=>{t(e===n?null:n)};return(0,o.jsxs)(`div`,{className:`interview-page`,children:[(0,o.jsx)(`section`,{className:`interview-header`,children:(0,o.jsxs)(`div`,{className:`interview-header-content`,children:[(0,o.jsx)(n,{to:`/java`,className:`back-button`,children:`← Back to Java Topics`}),(0,o.jsx)(`h1`,{className:`interview-title`,children:`Java Interview Questions`}),(0,o.jsx)(`p`,{className:`interview-subtitle`,children:`Master Java interview questions with detailed answers and code examples`}),(0,o.jsxs)(`div`,{className:`interview-stats`,children:[(0,o.jsxs)(`div`,{className:`interview-stat`,children:[(0,o.jsxs)(`span`,{className:`stat-number`,children:[l,`+`]}),(0,o.jsx)(`span`,{className:`stat-label`,children:`Questions`})]}),(0,o.jsxs)(`div`,{className:`interview-stat`,children:[(0,o.jsx)(`span`,{className:`stat-number`,children:c.length}),(0,o.jsx)(`span`,{className:`stat-label`,children:`Categories`})]}),(0,o.jsxs)(`div`,{className:`interview-stat`,children:[(0,o.jsx)(`span`,{className:`stat-number`,children:`100%`}),(0,o.jsx)(`span`,{className:`stat-label`,children:`Free`})]})]})]})}),(0,o.jsx)(`section`,{className:`questions-section`,children:(0,o.jsx)(`div`,{className:`questions-container`,children:(0,o.jsx)(`div`,{className:`questions-list`,children:c.map((t,n)=>(0,o.jsxs)(`div`,{className:`category-section`,children:[(0,o.jsx)(`h2`,{className:`category-title`,children:t.name}),(0,o.jsx)(`div`,{className:`questions-vertical`,children:t.questions.map(t=>(0,o.jsxs)(`div`,{className:`question-item-vertical ${e===t.id?`active`:``}`,children:[(0,o.jsxs)(`div`,{className:`question-item-header`,onClick:()=>r(t.id),children:[(0,o.jsxs)(`span`,{className:`q-number`,children:[`Q`,t.id]}),(0,o.jsx)(`p`,{className:`q-text`,children:t.question}),(0,o.jsx)(`span`,{className:`expand-arrow ${e===t.id?`expanded`:``}`,children:`▼`})]}),e===t.id&&(0,o.jsx)(`div`,{className:`question-item-content`,children:(0,o.jsx)(`div`,{className:`question-card`,children:(0,o.jsxs)(`div`,{className:`question-answer`,children:[(0,o.jsx)(`h3`,{className:`answer-title`,children:`Answer:`}),t.response.map((e,t)=>e.type===`code`?(0,o.jsxs)(`div`,{className:`code-block`,children:[(0,o.jsx)(`div`,{className:`code-header`,children:(0,o.jsx)(`span`,{className:`code-language`,children:e.language||`java`})}),(0,o.jsx)(`pre`,{className:`language-${e.language||`java`}`,children:(0,o.jsx)(`code`,{className:`language-${e.language||`java`}`,dangerouslySetInnerHTML:{__html:s(e.content,e.language)}})})]},t):(0,o.jsx)(`p`,{className:`answer-text`,children:e.content},t))]})})})]},t.id))})]},n))})})})]})}export{u as default};