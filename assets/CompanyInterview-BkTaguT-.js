import{r as e}from"./rolldown-runtime-QTnfLwEv.js";import{t}from"./react-CZI7_Jkm.js";import{o as n,r}from"./index-DCg-4qgp.js";import{t as i}from"./atom-one-dark-CL0A0LnX.js";var a=e(t(),1),o=Object.assign({"./acl-digital-paypal-adobe/acl-digital.js":{id:`acl-digital-paypal-adobe`,name:`ACL Digital (Paypal,Adobe)`,interviews:[{name:`ACL Digital`,questionCount:35,rounds:[{name:`Technical Round`,questions:[{question:`Explain your recent project.`,answer:`I worked on a Customer Registration and Banking Application for 2 years. The project used Java 8, Spring Boot, Hibernate, and ReactJS. I was a backend developer.
- Key features: customer registration, account management, transaction processing, secure authentication.
- Main challenges:
1. Slow API performance - fixed with Redis caching and optimized queries
2. Concurrent transaction issues - solved using @Transactional with proper isolation levels
3. Data consistency across microservices - implemented Saga pattern with compensation actions`,code:null},{question:`What are the new features in Java 8?`,answer:`Java 8 introduced 7 major features:
- Lambda expressions for cleaner code
- Stream API for collection processing
- Functional interfaces with single abstract methods
- New Date/Time API (LocalDate, LocalDateTime)
- Default methods in interfaces for backward compatibility
- Method references as shorthand for lambdas
- Optional class to avoid null pointer exceptions`,code:null},{question:`What is a static method in Java?`,answer:`A static method belongs to the class rather than instances. It can be called without creating an object using the class name. It can only access static variables and cannot be overridden.
- Example: Math.sqrt(16) - you don't need a Math object`,code:null},{question:`How can we use static methods in an interface?`,answer:`Since Java 8, interfaces can have static methods as utility methods. They are called using the interface name.
- Example: interface Utils { static void print(String s) { System.out.println(s); } }
- Call: Utils.print("Hello")`,code:null},{question:`How can we call a static method?`,answer:`Static methods can be called in three ways:
1. Using class name (recommended) - ClassName.methodName()
2. Directly if in same class - methodName()
3. Using object reference (not recommended) - obj.methodName()`,code:null},{question:`What is a default method in Java?`,answer:`Default methods are methods in interfaces that have a body and provide a default implementation. They were introduced in Java 8. Classes implementing the interface can use them or override them. They help maintain backward compatibility.`,code:null},{question:`What is the use of default methods?`,answer:`Default methods serve three main purposes:
1. Allow interfaces to evolve without breaking existing implementations
2. Provide common implementations across multiple classes
3. Enable multiple inheritance of behavior
- Used extensively in the Collection framework like forEach() method`,code:null},{question:`What is a method reference?`,answer:`A method reference is a shorthand notation for lambda expressions. It provides a way to refer to methods without invoking them.
- Example: list.forEach(System.out::println) instead of list.forEach(s -> System.out.println(s))`,code:null},{question:`How many ways can we create method references?`,answer:`Four ways:
1. Reference to static method - ClassName::staticMethod
2. Reference to instance method of specific object - instance::method
3. Reference to instance method of arbitrary object - ClassName::instanceMethod
4. Reference to constructor - ClassName::new`,code:{language:`java`,content:`public class MethodReferenceExample {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("Alice", "Bob", "Charlie");
        names.forEach(MethodReferenceExample::printName);
        MethodReferenceExample instance = new MethodReferenceExample();
        names.forEach(instance::printNameInstance);
    }
    public static void printName(String name) {
        System.out.println(name);
    }
    public void printNameInstance(String name) {
        System.out.println(name);
    }
}`}},{question:`What is a stream in Java?`,answer:`A stream is a sequence of elements that supports functional-style operations. It's not a data structure but processes collections of objects. Streams are lazy, can be parallelized, and cannot be reused after a terminal operation. Used for filtering, mapping, and collecting data.`,code:null},{question:`What is a parallel stream?`,answer:`A parallel stream enables parallel processing by splitting data into multiple chunks and processing them concurrently using multiple threads. It uses the Fork/Join framework. Useful for large datasets with CPU-intensive operations.
- Example: list.parallelStream() instead of list.stream()`,code:null},{question:`How does parallel stream work internally?`,answer:`Parallel streams work in four steps:
1. Split - Data is divided into chunks using Spliterator
2. Process - Each chunk is processed independently in parallel using multiple threads from ForkJoinPool
3. Combine - Results are merged using a combine operation
4. Return - Final result is returned`,code:null},{question:`How many ways can we create a thread in Java?`,answer:`Three ways:
1. Extending Thread class - class MyThread extends Thread { public void run() {} }
2. Implementing Runnable interface - class MyRunnable implements Runnable { public void run() {} }
3. Using Lambda expression (Java 8+) - Runnable r = () -> System.out.println("Running")`,code:{language:`java`,content:`public class RunnableExample implements Runnable {
    @Override
    public void run() {
        System.out.println("Thread is running");
    }
    public static void main(String[] args) {
        RunnableExample runnable = new RunnableExample();
        Thread thread = new Thread(runnable);
        thread.start();
    }
}`}},{question:`What is ExecutorService?`,answer:`ExecutorService is a high-level framework for managing thread pools. Instead of creating threads manually, you submit tasks which are managed by the framework. It provides methods for managing thread lifecycle, scheduling tasks, and handling results.`,code:null},{question:`How many ways can we create an ExecutorService?`,answer:`Four ways:
1. newFixedThreadPool(int n) - fixed number of threads
2. newSingleThreadExecutor() - single thread
3. newCachedThreadPool() - creates threads as needed
4. newScheduledThreadPool(int n) - scheduled tasks`,code:null},{question:`What is autowiring in Spring?`,answer:`Autowiring is a Spring feature that automatically injects dependencies into beans. It eliminates manual object creation by letting the Spring container manage dependencies. Uses @Autowired annotation for dependency injection.`,code:null},{question:`How many modes of autowiring are there?`,answer:`Four modes:
1. @Autowired - by type (default)
2. @Qualifier - by name with @Autowired
3. @Resource - by name (JSR-250)
4. @Inject - by type (JSR-330)`,code:null},{question:`Explain @Qualifier and @Inject.`,answer:`@Qualifier is used with @Autowired to specify which bean to inject when multiple beans of the same type exist. @Inject is a Java standard annotation (JSR-330) for dependency injection, similar to @Autowired but from the Java standard library.`,code:null},{question:`Difference between @Autowired and @Qualifier?`,answer:`@Autowired injects dependencies by type automatically. @Qualifier works with @Autowired to specify the exact bean when multiple beans of the same type exist. @Autowired alone causes ambiguity if multiple beans are found; @Qualifier resolves it.`,code:null},{question:`What is Spring Security?`,answer:`Spring Security is a framework for authentication (who you are) and authorization (what you can do). It provides protection against common security threats and integrates with various authentication providers.`,code:null},{question:`How do you configure Spring Security?`,answer:`Spring Security can be configured using:
1. Java configuration with @EnableWebSecurity and SecurityConfig classes extending WebSecurityConfigurerAdapter
2. XML configuration (less common now)
- Java configuration is preferred for better control.`,code:null},{question:`What is JWT token-based authentication?`,answer:`JWT (JSON Web Token) is a stateless authentication mechanism. User logs in, the server generates a JWT token containing user info. The user sends this token in each request. The server validates the token to authenticate the user. No session storage is needed.`,code:null},{question:`What is an API gateway?`,answer:`An API gateway is a single entry point for microservices. It handles routing requests to appropriate services, load balancing, authentication, rate limiting, logging, and API composition. Examples: Spring Cloud Gateway, Netflix Zuul.`,code:null},{question:`How to implement an API gateway?`,answer:`Use Spring Cloud Gateway or Netflix Zuul. Dependencies: spring-cloud-starter-gateway for Gateway, zuul for Zuul. Define routes in application.yml with URI, predicates, and filters.
- Example: routes with path /api/users/** route to user-service.`,code:null},{question:`What is load balancing?`,answer:`Load balancing distributes incoming traffic across multiple servers to prevent any single server from being overwhelmed. It improves reliability, performance, and availability. Types: client-side (Ribbon) and server-side (Nginx, HAProxy).`,code:null},{question:`What is fault tolerance?`,answer:`Fault tolerance is a system's ability to continue operating even when some components fail. Implemented through: redundancy, failover strategies, circuit breakers, retry mechanisms, and fallback methods.`,code:null},{question:`What is a circuit breaker?`,answer:`A circuit breaker prevents cascading failures by stopping calls to a failing service. It has three states: Closed (normal), Open (failing - requests fail immediately), Half-Open (testing recovery). Implemented using Resilience4j or Hystrix.`,code:null},{question:`What are the features of RESTful web services?`,answer:`Features:
- Stateless communication
- Resource-based URLs
- Standard HTTP methods (GET, POST, PUT, DELETE)
- JSON/XML responses
- HTTP status codes
- Cacheable responses
- Scalable architecture
- Layered system`,code:null},{question:`What are HTTP status codes?`,answer:`Common HTTP status codes: 200 OK, 201 Created, 204 No Content, 400 Bad Request, 401 Unauthorized, 404 Not Found, 500 Internal Server Error. They indicate the request result and guide client behavior.`,code:null},{question:`Write a query to get username when name starts with 'A' and ends with 'E'.`,answer:`SELECT username FROM users WHERE name LIKE 'A%E'`,code:{language:`sql`,content:`SELECT username FROM users WHERE name LIKE 'A%E'`}},{question:`Write SQL query to find 2nd maximum salary.`,answer:`SELECT MAX(salary) FROM employees WHERE salary < (SELECT MAX(salary) FROM employees)`,code:{language:`sql`,content:`SELECT MAX(salary) FROM employees WHERE salary < (SELECT MAX(salary) FROM employees)`}},{question:`Write SQL query to find 10th maximum salary.`,answer:`SELECT salary FROM (SELECT DISTINCT salary FROM employees ORDER BY salary DESC LIMIT 10) AS temp ORDER BY salary ASC LIMIT 1`,code:{language:`sql`,content:`SELECT salary FROM (SELECT DISTINCT salary FROM employees ORDER BY salary DESC LIMIT 10) AS temp ORDER BY salary ASC LIMIT 1`}},{question:`Difference between WHERE and HAVING?`,answer:`WHERE filters rows before grouping and cannot use aggregate functions. HAVING filters groups after GROUP BY and can use aggregate functions. WHERE is applied first, HAVING is applied last.`,code:null},{question:`Can you use grouping in WHERE clause?`,answer:`No, grouping and aggregate functions must be used with the HAVING clause, not WHERE. This is a SQL syntax rule.`,code:null},{question:`Write Java code to find names starting with 'A' using streams.`,answer:`Use filter with startsWith('A') and collect to a List`,code:{language:`java`,content:`List<String> names = Arrays.asList("Alice", "Bob", "Andrew", "Amanda", "George");
List<String> result = names.stream()
    .filter(name -> name.startsWith("A"))
    .collect(Collectors.toList());`}}]}]}],questionCount:35},"./acl-digital-paypal-adobe/paypal-new-client.js":{id:`acl-digital-paypal-adobe`,name:`ACL Digital (Paypal,Adobe)`,interviews:[{name:`PayPal CDAS New Client`,questionCount:6,rounds:[{name:`Technical L1`,questions:[{question:`Self-Introduction`,answer:`Hello, my name is [Your Name]. I have 3 years of experience as a Java Full Stack Developer, specializing in Java, Spring Boot, Hibernate, Microservices, and ReactJS. I have worked on multiple projects, including customer registration services and banking applications, where I implemented secure transaction handling, API development, and front-end components. I am proficient in writing clean, testable code using JUnit, Mockito, and TDD principles. I am also experienced in deploying applications using cloud platforms.`,code:null},{question:`Problem: Sorting an Array of {-1, 0, 1} in O(n) Time and O(1) Space`,answer:`Use the Dutch National Flag algorithm with three pointers (low, mid, high). Traverse the array once, swapping elements to sort in O(n) time with O(1) space.`,code:{language:`java`,content:`public class SortThreeElements {
    public static void sortArray(int[] arr) {
        int low = 0, mid = 0, high = arr.length - 1;
        while (mid <= high) {
            if (arr[mid] == -1) {
                swap(arr, low, mid);
                low++; mid++;
            } else if (arr[mid] == 0) {
                mid++;
            } else {
                swap(arr, mid, high);
                high--;
            }
        }
    }
    private static void swap(int[] arr, int i, int j) {
        int temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
}`}},{question:`Problem: Quantitative Trading Firm Profit Calculation`,answer:`Track portfolio holdings in a HashMap and maintain a profit/loss variable. For BUY/SELL events, update the portfolio. For CHANGE events, adjust profit based on holdings. For QUERY events, return the current profit.`,code:{language:`java`,content:`class Result {
    public static List<Long> getNetProfit(List<String> events) {
        List<Long> ansList = new ArrayList<>();
        Map<String, Long> portfolio = new HashMap<>();
        long query = 0;
        for (String event : events) {
            String[] word = event.split(" ");
            String type = word[0];
            if (type.equals("QUERY")) {
                ansList.add(query);
            } else {
                String company = word[1];
                long unit = Long.parseLong(word[2]);
                switch (type) {
                    case "BUY":
                        portfolio.put(company, portfolio.getOrDefault(company, 0L) + unit);
                        break;
                    case "SELL":
                        portfolio.put(company, portfolio.getOrDefault(company, 0L) - unit);
                        break;
                    case "CHANGE":
                        if (portfolio.containsKey(company)) {
                            query += portfolio.get(company) * unit;
                        }
                        break;
                }
            }
        }
        return ansList;
    }
}`}},{question:`Problem: Another Trading Firm Example`,answer:`Input: 6 events with BUY/SELL/CHANGE operations; the final QUERY returns -16. The solution uses the same HashMap approach tracking portfolio and profit.`,code:null}]},{name:`Technical L2`,questions:[{question:`Self-Introduction`,answer:`Hello, my name is [Your Name]. I have 3 years of experience as a Java Full Stack Developer, specializing in Java, Spring Boot, Hibernate, Microservices, and ReactJS. I have worked on multiple projects, including customer registration services and banking applications, where I implemented secure transaction handling, API development, and front-end components. I am proficient in writing clean, testable code using JUnit, Mockito, and TDD principles. I am also experienced in deploying applications using cloud platforms.`,code:null},{question:`Find the minimum element in a rotated sorted array`,answer:`Use binary search with O(log n) time complexity. Compare mid with the rightmost element. If mid > right, the minimum is in the right half, otherwise in the left half.`,code:{language:`java`,content:`public class RotatedSortedArray {
    public static int findMin(int[] nums) {
        int left = 0, right = nums.length - 1;
        while (left < right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] > nums[right]) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        return nums[left];
    }
    public static void main(String[] args) {
        int[][] testCases = {
            {100, 105, 110, 90, 95},    // Output: 90
            {3, 4, 5, 6, 7, 8, 9, 10, 1, 2}, // Output: 1
            {1, 2, 3, 4, 5, 6, 7, 8, 9, 10}, // Output: 1
            {5, 4, 3, 2, 1}              // Output: 1
        };
        for (int[] testCase : testCases) {
            System.out.println("Minimum Element: " + findMin(testCase));
        }
    }
}`}}]}]}],questionCount:6},"./acl-digital-paypal-adobe/paypal-payments-client.js":{id:`acl-digital-paypal-adobe`,name:`ACL Digital (Paypal,Adobe)`,interviews:[{name:`PayPal Payments Client`,questionCount:80,rounds:[{name:`Technical L1 - Client Interview`,questions:[{question:`Self-introduction about your project.`,answer:`Hello, I'm a Java Full Stack Developer with 3 years experience. I worked on a Customer Registration and Banking Application using Java 8, Spring Boot, Hibernate, ReactJS, and MySQL. As a backend developer, I built REST APIs for customer management, transaction processing, and authentication.
- Key challenges: performance optimization with Redis caching, concurrent transaction handling with proper isolation levels, and data consistency across services.`,code:null},{question:`Do you know SQL?`,answer:`Yes, I work with SQL regularly. I can write queries with SELECT, INSERT, UPDATE, DELETE, joins, subqueries, aggregate functions, indexes, and stored procedures. I've worked with both MySQL and PostgreSQL.`,code:null},{question:`Do you know Data Structures and Algorithms (LinkedList)?`,answer:`Yes, LinkedList is a data structure where each element (node) contains data and a reference to the next node. Types: singly linked (one direction) and doubly linked (both directions). Used for frequent insertions/deletions.`,code:null},{question:`Do you know OOP concepts?`,answer:`Yes. Four main OOP concepts:
1. Encapsulation - wrapping data and methods together
2. Abstraction - hiding complexity
3. Inheritance - deriving new classes from existing ones
4. Polymorphism - using the same function in different forms`,code:null},{question:`What is polymorphism?`,answer:`Polymorphism allows one interface to be used for different data types. Achieved through:
1. Method Overloading (compile-time) - same name different parameters
2. Method Overriding (runtime) - child class provides specific implementation`,code:null},{question:`What is method overloading and overriding?`,answer:`Method Overloading: Multiple methods with the same name but different parameters within the same class. Method Overriding: Subclass provides a specific implementation of a parent method. Use @Override annotation for overriding.`,code:null},{question:`What are access modifiers?`,answer:`Access modifiers define scope: private (class only), protected (package + subclasses), public (everywhere), default (package only). Used to control access and maintain encapsulation.`,code:null},{question:`Why use private?`,answer:`To restrict access and maintain encapsulation. Private variables can only be accessed within the class. Use public getters and setters to control access and add validation.`,code:null},{question:`Which OOP concept achieves private variables?`,answer:`Encapsulation. Private variables are encapsulated within a class and accessed through public methods (getters/setters). This protects data integrity.`,code:null},{question:`Difference between String, StringBuilder, StringBuffer?`,answer:`String: Immutable, stored in the string pool. StringBuilder: Mutable, not thread-safe, faster. StringBuffer: Mutable, thread-safe (synchronized), slower.
- Use String for constants, StringBuilder for single-threaded operations, StringBuffer for multi-threaded.`,code:null},{question:`What is the string constant pool?`,answer:`A special memory area in the Java heap that stores String literals. Optimizes memory by reusing the same string objects. Example: String s1='abc' and String s2='abc' point to the same object.`,code:null},{question:`Given String str1='abc', str2='abc', str1 == str2 output?`,answer:`Output: true. Because both str1 and str2 point to the same literal in the string constant pool. '==' compares references, and both reference the same object.`,code:null},{question:`What is an inner class and anonymous class?`,answer:`Inner class: A class defined inside another class, useful for logical grouping and accessing outer class members. Anonymous class: A class without a name, used for one-time instantiation, common in event handling.`,code:null},{question:`Have you worked with multithreading?`,answer:`Yes, multithreading allows concurrent execution of multiple threads. Used for improving performance in I/O operations, database calls, and batch processing. Used ExecutorService for thread pool management.`,code:null},{question:`How many ways to create a thread?`,answer:`Three ways:
1. Extend Thread class
2. Implement Runnable interface
3. Using Lambda expression (Java 8+)
- Runnable is preferred as it allows extending other classes.`,code:null},{question:`Have you used Future and Callable?`,answer:`Yes. Callable is similar to Runnable but returns a result and can throw checked exceptions. Future represents the result of an asynchronous computation, allowing checking completion and retrieving results.`,code:null},{question:`Which collections have you used?`,answer:`ArrayList for dynamic arrays, HashSet for unique elements, HashMap for key-value pairs, LinkedList for frequent insertions/deletions, TreeMap for sorted key-value pairs.`,code:null},{question:`What is HashMap retrieval time complexity?`,answer:`Average time complexity: O(1). Worst case: O(n) when all keys go to the same bucket. With tree implementation in Java 8+, worst case becomes O(log n) when the tree threshold is reached.`,code:null},{question:`How does HashMap work internally?`,answer:`HashMap uses an array of buckets. A key's hashcode determines the bucket index. If there is a collision, it stores in a linked list (or tree after threshold). On reaching load factor (0.75), it resizes and rehashes. Average O(1) for get/put.`,code:null},{question:`What is hash collision?`,answer:`Hash collision occurs when two different keys produce the same hashcode and map to the same bucket. Java resolves collisions through:
1. Chaining - linked list in the bucket
2. After threshold (8), converts to a balanced tree for better performance`,code:null},{question:`What is 'final' and how does it work?`,answer:`final prevents modification:
1. Variable - value cannot change after initialization
2. Method - cannot be overridden
3. Class - cannot be extended
- Used for immutability and security.`,code:null},{question:`How can you handle exceptions?`,answer:`Using try-catch blocks. Common practice:
1. Try-catch for checked exceptions
2. Try-catch-finally for cleanup
3. Try-with-resources for auto-closable resources
4. Custom exceptions extending the Exception class`,code:null},{question:`Mostly used Spring Boot exceptions?`,answer:`Common exceptions: DataIntegrityViolationException (database constraints), HttpClientErrorException (client errors), HttpServerErrorException (server errors), EntityNotFoundException (entity not found), MethodArgumentNotValidException (validation errors).`,code:null},{question:`Difference between throw and throws?`,answer:`throw: Explicitly throws an exception object, used inside a method. throws: Declares that a method can throw exceptions, used in the method signature.`,code:null},{question:`Difference between checked and unchecked exceptions?`,answer:`Checked exceptions must be handled at compile-time (e.g., IOException, SQLException). Unchecked exceptions occur at runtime (e.g., NullPointerException, ArithmeticException).`,code:null},{question:`Explain try, catch, finally?`,answer:`try: Code block to monitor for exceptions. catch: Handles specific exceptions. finally: Always executes regardless of exception, used for cleanup. finally executes even if an exception occurs.`,code:null},{question:`Have you worked with Java 8?`,answer:`Yes, extensively used Java 8 features: Lambdas for functional programming, Streams for collection processing, Optional for null safety, Date/Time API (LocalDate, LocalDateTime), Default methods in interfaces.`,code:null},{question:`Find character count using streams.`,answer:`Use chars() to convert a String to IntStream, filter the character, count occurrences.`,code:{language:`java`,content:`long count = "leetcode".chars().filter(ch -> ch == 'e').count();`}},{question:`Write code to detect cycle in linked list.`,answer:`Use Floyd's Cycle Detection algorithm with slow and fast pointers. If slow meets fast, a cycle exists.`,code:{language:`java`,content:`public boolean hasCycle(ListNode head) {
    if (head == null) return false;
    ListNode slow = head, fast = head.next;
    while (slow != fast) {
        if (fast == null || fast.next == null) return false;
        slow = slow.next;
        fast = fast.next.next;
    }
    return true;
}`}},{question:`Time and space complexity of cycle detection?`,answer:`Time Complexity: O(n) - traverse list once. Space Complexity: O(1) - only two pointers used.`,code:null},{question:`What is Optional class?`,answer:`Optional is a container object that may or may not contain a value. Used to avoid null pointer exceptions. Methods: isPresent(), get(), orElse(), orElseGet(), ifPresent().`,code:null},{question:`What is a functional interface?`,answer:`A functional interface has exactly one abstract method. Can have default/static methods. Implemented using lambda expressions. Examples: Runnable, Callable, Comparator, Consumer, Function, Predicate, Supplier.`,code:null},{question:`Built-in functional interfaces?`,answer:`Common built-in: Function<T,R> (apply), Consumer<T> (accept), Supplier<T> (get), Predicate<T> (test), BiFunction<T,U,R>, BiConsumer<T,U>, BiPredicate<T,U>.`,code:null},{question:`How to use functional interface with lambda?`,answer:`Define a functional interface with one abstract method. Implement using a lambda expression. Example: MathOperation addition = (a, b) -> a + b; addition.operate(5, 3)`,code:{language:`java`,content:`@FunctionalInterface
interface MathOperation { int operate(int a, int b); }
MathOperation addition = (a, b) -> a + b;
System.out.println(addition.operate(5, 3));`}},{question:`Do you know CompletableFuture?`,answer:`Yes, CompletableFuture is a Java 8 feature for asynchronous programming. Supports:
1. Running tasks asynchronously
2. Chaining multiple stages
3. Combining multiple async computations
4. Exception handling
5. Cancellation support`,code:null},{question:`Have you worked with Spring Boot?`,answer:`Yes, extensively. Spring Boot simplifies building production-grade applications with auto-configuration, embedded servers, and opinionated defaults. Used annotations like @RestController, @Service, @Repository, @Autowired.`,code:null},{question:`What is @Component?`,answer:`@Component marks a class as a Spring-managed bean. The Spring container auto-detects and registers beans. Used with @Service, @Repository, @Controller for specific layers.`,code:null},{question:`Explain @Controller, @Service, @Repository?`,answer:`@Controller: Web layer, handles HTTP requests. @Service: Business logic layer, contains business operations. @Repository: Data access layer, interacts with the database, translates exceptions to Spring's DataAccessException.`,code:null},{question:`Do you know MVC?`,answer:`Yes, Model-View-Controller pattern: Model (data & business logic), View (UI rendering), Controller (handles user input, coordinates Model and View). Spring Boot implements MVC with annotations.`,code:null},{question:`SOAP vs RESTful services?`,answer:`SOAP: Protocol, uses XML, more complex, supports ACID. REST: Architectural style, uses HTTP methods, simpler, uses JSON/XML, stateless, cacheable, more popular for web APIs.`,code:null},{question:`Features of RESTful services?`,answer:`Stateless, Resource-based URLs, Standard HTTP methods, JSON/XML responses, HTTP status codes, Cacheable, Scalable, Layered architecture.`,code:null},{question:`Example of notification service API?`,answer:`Notification service sends emails/SMS. Controller receives the request, Service processes business logic, Repository fetches data, External API calls provider.`,code:{language:`java`,content:`@RestController
@RequestMapping("/api/notification")
public class NotificationController {
    @Autowired
    private NotificationService notificationService;
    @PostMapping("/send")
    public ResponseEntity<String> sendNotification(@RequestBody NotificationRequest request) {
        notificationService.sendNotification(request);
        return ResponseEntity.ok("Notification sent");
    }
}
@Service
public class NotificationService {
    public void sendNotification(NotificationRequest request) {
        // Send email/SMS
    }
}`}}]},{name:`Technical L2 - Advanced Client Interview`,questions:[{question:`Self-introduction based on project.`,answer:`Hello, I'm a Java Full Stack Developer with 3 years experience specializing in Java, Spring Boot, Hibernate, Microservices, and ReactJS. I've worked on customer registration and banking applications implementing secure transaction handling, API development, and cloud deployments on GCP with auto-scaling and cloud storage integration.`,code:null},{question:`Which GCP concepts have you used?`,answer:`Compute Engine (VMs), Cloud Storage (object storage), Pub/Sub (messaging), Cloud SQL (managed databases), Cloud Load Balancing (traffic distribution), Stackdriver (monitoring/logging), Cloud CDN (static content), Cloud Scheduler (scheduled jobs).`,code:null},{question:`Are you compatible with Java 8 streams?`,answer:`Yes, proficient with Java 8 streams. Used for filtering, mapping, reducing, and collecting data. Supports functional programming with operations like filter, map, reduce, collect, and parallel processing.`,code:null},{question:`Find count of given string in list using streams.`,answer:`Use filter and count operations.`,code:{language:`java`,content:`List<String> list = Arrays.asList("apple", "banana", "apple", "orange", "apple");
long count = list.stream().filter(s -> s.equals("apple")).count();`}},{question:`Find occurrence of each string in list using streams.`,answer:`Use Collectors.groupingBy with Collectors.counting()`,code:{language:`java`,content:`List<String> list = Arrays.asList("apple", "banana", "apple", "orange", "banana");
Map<String, Long> result = list.stream()
    .collect(Collectors.groupingBy(Function.identity(), Collectors.counting()));`}},{question:`HashMap vs LinkedHashMap difference?`,answer:`HashMap: No insertion order maintained, faster access. LinkedHashMap: Maintains insertion order or access order (if configured), slightly slower but predictable iteration.`,code:null},{question:`String comparison with == and .equals()?`,answer:`== compares reference (memory address), .equals() compares content. s1 == s2 returns false if different objects. s1.equals(s2) returns false if content is different.`,code:null},{question:`What are exceptions and types?`,answer:`Exceptions are events disrupting normal program flow. Two types: Checked (must be handled, e.g., IOException) and Unchecked (runtime, e.g., NullPointerException).`,code:null},{question:`Checked vs unchecked exceptions with examples?`,answer:`Checked: Must be handled/try-catch (FileNotFoundException, SQLException). Unchecked: Runtime exceptions (ArithmeticException, NullPointerException, ArrayIndexOutOfBoundsException).`,code:{language:`java`,content:`// Checked
FileReader reader = new FileReader("file.txt");
// Unchecked
int result = 10 / 0;`}},{question:`Rate yourself in Java (1-10).`,answer:`8 out of 10. Strong in core Java, Spring Boot, and enterprise application development. Continually learning new features and best practices.`,code:null},{question:`Which data structures are you familiar with?`,answer:`Arrays, Lists (ArrayList, LinkedList), Maps (HashMap, TreeMap, LinkedHashMap), Sets (HashSet, TreeSet), Stacks, Queues, Trees (Binary Tree, Binary Search Tree), Heaps.`,code:null},{question:`Stack vs Queue difference?`,answer:`Stack: LIFO (Last In First Out) - like a stack of plates. Queue: FIFO (First In First Out) - like a checkout line.`,code:null},{question:`Try-with-resources example?`,answer:`Automatic resource management with AutoCloseable resources. Resources are closed automatically.`,code:{language:`java`,content:`try (FileReader reader = new FileReader("file.txt")) {
    // Use the reader
} catch (IOException e) {
    e.printStackTrace();
}`}},{question:`When does finally block not execute?`,answer:`1. When System.exit() is called
2. When JVM crashes
3. When the thread is interrupted
- In all other cases, finally executes.`,code:null},{question:`Given division code with finally, what's output?`,answer:`For inputs 10, 2: Output: 'finally' and returns 5. Finally executes before return.`,code:{language:`java`,content:`int division(int a, int b) {
    try { return a / b; }
    finally { System.out.print("finally"); }
}`}},{question:`How to create custom exception?`,answer:`Extend the Exception class (checked) or RuntimeException (unchecked). Add a constructor with a message.`,code:{language:`java`,content:`class CustomException extends Exception {
    public CustomException(String message) {
        super(message);
    }
}`}},{question:`What is a static method?`,answer:`A method that belongs to the class, not an instance. Called using the class name. Cannot access instance variables. Cannot be overridden (but can be hidden).`,code:null},{question:`Can static methods be overridden?`,answer:`No, static methods cannot be overridden. They can be hidden in subclasses by defining a static method with the same signature.`,code:null},{question:`What is the diamond problem?`,answer:`Ambiguity when a class inherits from multiple parent classes with the same method signature. Java avoids this through interfaces with default methods requiring explicit override.`,code:null},{question:`Java 7 vs Java 8 interface difference?`,answer:`Java 7: Only abstract methods. Java 8: Supports default methods (with implementation) and static methods in interfaces.`,code:null},{question:`Efficiently find element index in array.`,answer:`Binary search for sorted arrays (O(log n)).`,code:{language:`java`,content:`int[] arr = {2, 4, 6, 8, 9};
int index = Arrays.binarySearch(arr, 6);`}},{question:`Database join query vs Java processing - faster?`,answer:`SQL join is faster. The database is optimized for joins with indexes, query optimization, and less data transfer. Java processing requires transferring more data and manual joining.`,code:null},{question:`How to get data from database in Spring Boot?`,answer:`Using Spring Data JPA repositories. Extend JpaRepository and use methods like findAll(), findById(), and custom queries.`,code:{language:`java`,content:`@Autowired
private UserRepository userRepository;
List<User> users = userRepository.findAll();`}},{question:`Best collection for middle insertion/deletion?`,answer:`LinkedList. It provides O(1) insertion/deletion if you have a reference. ArrayList requires O(n) due to shifting.`,code:null},{question:`Can you remove element during iteration?`,answer:`Yes, using Iterator.remove() to avoid ConcurrentModificationException.`,code:{language:`java`,content:`Iterator<String> it = list.iterator();
while (it.hasNext()) {
    String s = it.next();
    if (condition) it.remove();
}`}},{question:`Can you add to List.of() created list?`,answer:`No, List.of() creates an immutable list. Cannot add, remove, or modify elements.`,code:null},{question:`Do you know design patterns?`,answer:`Yes, familiar with: Singleton (single instance), Factory (object creation), Observer (event handling), Strategy (algorithm switching), Builder (complex objects), Template (algorithm skeleton), Dependency Injection (Spring default).`,code:null},{question:`What is Singleton pattern?`,answer:`Ensures only one instance exists and provides global access. Implementation: private constructor, static instance, static getInstance() method.`,code:{language:`java`,content:`public class Singleton {
    private static Singleton instance;
    private Singleton() {}
    public static Singleton getInstance() {
        if (instance == null) {
            instance = new Singleton();
        }
        return instance;
    }
}`}},{question:`Default Spring Boot design pattern?`,answer:`Dependency Injection (DI). Spring manages object creation and dependencies through the Inversion of Control (IoC) container.`,code:null},{question:`Multiple catch blocks ordering?`,answer:`Catch specific exceptions first, general Exception last. Compile-time error if the general exception comes first.`,code:{language:`java`,content:`try {
    // code
} catch (IOException e) {
    // handle specific
} catch (Exception e) {
    // handle general
}`}},{question:`Catching general before specific exception?`,answer:`Compile-time error. More specific exceptions must be caught before a general Exception.`,code:{language:`java`,content:`// ERROR: Exception already caught
catch (Exception e) {}
catch (ArithmeticException e) {} // Unreachable`}},{question:`How familiar are you with SQL queries?`,answer:`Very familiar. Can write complex queries with joins (inner, left, right, full), subqueries, aggregate functions (COUNT, SUM, AVG, MAX, MIN), window functions, and stored procedures.`,code:null},{question:`What are SQL joins?`,answer:`Inner Join: Matching records only. Left Join: All from left + matches from right. Right Join: All from right + matches from left. Full Join: All from both tables.`,code:null},{question:`Why is main method static?`,answer:`The JVM can call the main method without creating a class instance. No object exists before main execution.`,code:null},{question:`Find order ID based on customer name.`,answer:`Join order and customer tables, filter by customer name.`,code:{language:`sql`,content:`SELECT o.oid FROM order o
INNER JOIN customer c ON o.cid = c.cid
WHERE c.cname = 'customer_name';`}},{question:`Find second maximum salary.`,answer:`Using a subquery with MAX, excluding the max salary.`,code:{language:`sql`,content:`SELECT MAX(salary) FROM employees
WHERE salary < (SELECT MAX(salary) FROM employees);`}},{question:`What is dependency injection?`,answer:`Design pattern where dependencies are injected by the container rather than created internally. Improves testability and loose coupling.`,code:{language:`java`,content:`@Service
public class MyService {
    private final MyRepository repository;
    @Autowired
    public MyService(MyRepository repository) {
        this.repository = repository;
    }
}`}},{question:`How many ways can dependency injection be done?`,answer:`Three ways: Constructor Injection (recommended), Setter Injection (for optional dependencies), Field Injection (@Autowired on field - not recommended).`,code:null}]}]}],questionCount:80},"./altimetrix/altimetrix.js":{id:`altimetrix`,name:`Altimetrix`,interviews:[{name:`Altimetrix Interview`,questionCount:30,rounds:[{name:`Altimetrix Interview`,questions:[{question:`What are the key features introduced in Java 8?`,answer:`Java 8 introduced several key features: Lambda Expressions for concise functional interface implementation, Stream API for sequence processing with map/filter/reduce operations, Optional class to avoid null references, Default Methods in interfaces for backward compatibility, Method References using ClassName::methodName syntax, and New Date and Time API (java.time package).`,code:null},{question:`What are the built-in functional interfaces available in Java 8?`,answer:`Built-in functional interfaces include: Predicate<T> (boolean-valued function), Function<T,R> (takes T returns R), Consumer<T> (accepts input no return), Supplier<T> (provides results), UnaryOperator<T> (function with same type input/output), BinaryOperator<T> (two args same type returns same type).`,code:{language:`java`,content:`Predicate<Integer> isEven = n -> n % 2 == 0;
Function<String, Integer> length = String::length;
Consumer<String> print = System.out::println;
Supplier<Double> random = Math::random;
UnaryOperator<Integer> square = n -> n * n;`}},{question:`Can you explain the internal working of a HashMap in Java?`,answer:`HashMap stores key-value pairs using an array of buckets. Keys are hashed to determine bucket location. Collisions are resolved using linked lists or trees (when many entries hash to same bucket). When entries exceed threshold, HashMap resizes and rehashes all entries. Average time complexity O(1) for get/put operations.`,code:null},{question:`What is the difference between shallow copy and deep copy?`,answer:`Shallow Copy creates a new object but copies references to the same memory addresses of internal objects - changes affect both copies. Deep Copy creates a new object and recursively copies all objects within it, making original and copied objects completely independent.`,code:{language:`java`,content:`// Shallow Copy
Employee emp1 = new Employee("John");
Employee emp2 = emp1; // Same reference
// Deep Copy
Employee emp3 = new Employee(emp1.getName()); // New object`}},{question:`How many ways can you create an object in Java?`,answer:`Five ways: 1) Using new keyword, 2) Using reflection (Class.newInstance() or Constructor.newInstance()), 3) Using clone() method (if Cloneable implemented), 4) Using serialization and deserialization, 5) Using Factory or Builder design pattern.`,code:{language:`java`,content:`// 1. new
Employee emp = new Employee();
// 2. Reflection
Employee emp = Employee.class.newInstance();
// 3. Clone
Employee emp = (Employee) emp1.clone();`}},{question:`Why is the main method in Java static?`,answer:`The main method is static so that the JVM can call it directly without creating an instance of the class. This allows the JVM to start the program execution before any objects are created.`,code:{language:`java`,content:`public static void main(String[] args) { }`}},{question:`What is a deadlock in Java?`,answer:`Deadlock occurs when two or more threads are blocked forever, waiting for each other to release locks they need to proceed. Each thread holds a resource the other thread requires, creating a cycle of dependency.`,code:{language:`java`,content:`// Thread 1
synchronized(resource1) {
    synchronized(resource2) { }
}
// Thread 2
synchronized(resource2) {
    synchronized(resource1) { }
}`}},{question:`How can we avoid deadlock in Java?`,answer:`Avoid deadlock by: 1) Always acquiring locks in consistent order, 2) Using timeout for acquiring locks, 3) Using fewer synchronized blocks with minimal code, 4) Using lock hierarchy, 5) Implementing deadlock detection algorithms.`,code:{language:`java`,content:`// Use consistent lock order
synchronized(resource1) {
    synchronized(resource2) { }
}
// Both threads use same order`}},{question:`Do you know any design patterns?`,answer:`Yes, I am familiar with several design patterns including Singleton, Factory, Builder, Observer, Strategy, Decorator, and Template Method patterns. Used in various projects for creating maintainable and scalable code.`,code:null},{question:`What is the Factory Design Pattern?`,answer:`Factory Design Pattern is a creational pattern that provides an interface for creating objects in a super class, allowing subclasses to alter the type of objects created. It promotes loose coupling and is used when object creation involves logic.`,code:{language:`java`,content:`interface Payment { void pay(); }
class PaymentFactory {
    public static Payment getPayment(String type) {
        if ("UPI".equals(type)) return new UPIPayment();
        else if ("Card".equals(type)) return new CardPayment();
        return null;
    }
}`}},{question:`What is a profile in Spring Boot, and how do you use it?`,answer:`Profile is a feature for segregating application configuration based on different environments (development, testing, production). Use @Profile annotation or specify in application.properties. Activate via command-line --spring.profiles.active=dev or environment variables.`,code:{language:`java`,content:`@Profile("dev")
@Configuration
public class DevConfig { }
# application.properties
spring.profiles.active=dev`}},{question:`What configurations can be managed within a Spring Boot profile?`,answer:`Configurations include: Data Source configurations (different databases), Service Endpoints (different API URLs), Logging Levels (different loggers), Security Settings (authentication mechanisms), and application-specific properties for different environments.`,code:{language:`java`,content:`# application-dev.properties
spring.datasource.url=jdbc:mysql://localhost:3306/devdb
logging.level.com.service=DEBUG
# application-prod.properties
spring.datasource.url=jdbc:mysql://prod-server:3306/proddb`}},{question:`What tools do you use for monitoring purposes in Spring Boot?`,answer:`We use Prometheus and Grafana for metrics monitoring, Spring Boot Actuator for exposing health and metrics endpoints, ELK Stack (Elasticsearch, Logstash, Kibana) for logging and real-time monitoring, and Micrometer for metrics collection.`,code:{language:`java`,content:`// application.yml
management:
  endpoints:
    web:
      exposure:
        include: health,info,metrics,prometheus`}},{question:`What is the N+1 select problem in JPA, and how do you handle it?`,answer:`N+1 select problem occurs when a query retrieves an entity and subsequent queries load related entities one by one. Handled using: FetchType.LAZY or EAGER, JOIN FETCH queries to load in single query, Entity Graphs, and Batch Fetching.`,code:{language:`java`,content:`// Problem: N+1 queries
List<Employee> employees = repo.findAll(); // 1 query
for(Employee emp : employees) {
    emp.getDepartment(); // N queries
}
// Solution: JOIN FETCH
@Query("SELECT e FROM Employee e JOIN FETCH e.department")
List<Employee> findAllWithDepartment();`}},{question:`Have you worked with JPA?`,answer:`Yes, I have used JPA in projects for managing database entities, relationships, and queries using Hibernate as JPA provider. Worked with annotations like @Entity, @OneToMany, @ManyToOne, @Query, and @Transactional for database operations.`,code:{language:`java`,content:`@Entity
public class Employee {
    @Id @GeneratedValue private Long id;
    private String name;
    @ManyToOne private Department department;
    @Query("SELECT e FROM Employee e WHERE e.name LIKE :name")
    List<Employee> findByName(@Param("name") String name);
}`}},{question:`What are the advantages of using microservices architecture?`,answer:`Advantages include: Scalability (independent scaling), Flexibility (separate development/deployment), Resilience (failure isolation), Technology Agnostic (different tech stacks per service), Faster Time to Market (small teams, quick deployment), and Better Maintainability.`,code:null},{question:`How do you integrate microservices in a project?`,answer:`Integration involves: API Gateway for routing, Service Registry (Eureka) for service discovery, Inter-Service Communication via REST/gRPC/messaging, Centralized Configuration Management, Centralized Monitoring and Logging (ELK/Prometheus), and Circuit Breakers for fault tolerance.`,code:null},{question:`What is a Eureka Server, and how is it used in microservices?`,answer:`Eureka Server is Netflix's service discovery tool. Services register themselves with Eureka Server, and other services discover and communicate with them using the registry. It helps in managing service instances and provides client-side load balancing.`,code:{language:`java`,content:`@SpringBootApplication
@EnableEurekaServer
public class EurekaServer { }

@SpringBootApplication
@EnableDiscoveryClient
public class UserService { }`}},{question:`How do you communicate between two microservices?`,answer:`Communication can be: Synchronous using REST APIs (HTTP calls) or gRPC, Asynchronous using Message Brokers (RabbitMQ, Kafka) for event-driven architecture, or Hybrid approach combining both based on use case.`,code:{language:`java`,content:`// REST Communication
RestTemplate rest = new RestTemplate();
User user = rest.getForObject("http://user-service/users/1", User.class);
// Feign Client
@FeignClient("user-service")
public interface UserClient {
    @GetMapping("/users/{id}") User getUser(@PathVariable Long id);
}`}},{question:`How do you secure communication between microservices?`,answer:`Secure using: JWT for authentication/authorization, OAuth2 for secure access delegation, SSL/TLS for encrypted communication, API Gateway with security filters, and Service-to-Service authentication using mutual TLS or client credentials.`,code:null},{question:`Find the missing numbers in a sequence using Java Streams.`,answer:`Use IntStream.rangeClosed to create a range and filter the numbers that are not present in the input list.

Example:
- Input: [1, 2, 4, 6, 8, 9]
- Output: [3, 5, 7]`,code:{language:`java`,content:`List<Integer> numbers = Arrays.asList(1, 2, 4, 6, 8, 9);
int min = 1;
int max = 9;
List<Integer> missingNumbers = IntStream.rangeClosed(min, max)
    .filter(n -> !numbers.contains(n))
    .boxed()
    .collect(Collectors.toList());
System.out.println("Missing numbers: " + missingNumbers); // [3, 5, 7]`}},{question:`Find the longest string and its length in a list using Java Streams.`,answer:`Use mapToInt(String::length).max() to get the longest length, or use max(Comparator.comparingInt(String::length)) to get the longest string itself.

Example:
- Input: ["blue", "green", "red", "pink"]
- Output: 5`,code:{language:`java`,content:`List<String> strings = Arrays.asList("blue", "green", "red", "pink");
int maxLength = strings.stream()
    .mapToInt(String::length)
    .max()
    .orElse(0);
// Alternative
String longest = strings.stream()
    .max(Comparator.comparingInt(String::length))
    .orElse("");
System.out.println("Length of longest string: " + maxLength); // 5`}},{question:`Check if a given string containing brackets is balanced.`,answer:`Use a Stack to track open brackets and match them with closing brackets. Return false if there is a mismatch or if the stack is not empty at the end.`,code:{language:`java`,content:`public boolean isBalanced(String str) {
    Stack<Character> stack = new Stack<>();
    for (char ch : str.toCharArray()) {
        if (ch == '(' || ch == '{' || ch == '[') {
            stack.push(ch);
        } else if (ch == ')' && (stack.isEmpty() || stack.pop() != '(')) {
            return false;
        } else if (ch == '}' && (stack.isEmpty() || stack.pop() != '{')) {
            return false;
        } else if (ch == ']' && (stack.isEmpty() || stack.pop() != '[')) {
            return false;
        }
    }
    return stack.isEmpty();
}`}},{question:`Find the most repeated IP address from logs.`,answer:`Use a HashMap to count IP occurrences, then use Collections.max with Map.Entry.comparingByValue to find the IP with the highest count.`,code:{language:`java`,content:`public String findMostRepeatedIP(List<String> logs) {
    Map<String, Integer> ipCount = new HashMap<>();
    for (String log : logs) {
        String ip = log.split(" ")[0];
        ipCount.put(ip, ipCount.getOrDefault(ip, 0) + 1);
    }
    return Collections.max(ipCount.entrySet(), Map.Entry.comparingByValue()).getKey();
}`}},{question:`What is Jenkins, and how do you use it in your project?`,answer:`Jenkins is a CI/CD tool automating build and deployment. Configured to build automatically on Git commits, run unit/integration tests, and deploy to staging/production environments. Uses Jenkinsfile for pipeline as code.`,code:{language:`java`,content:`pipeline {
    agent any
    stages {
        stage('Build') { steps { sh 'mvn clean install' } }
        stage('Test') { steps { sh 'mvn test' } }
        stage('Deploy') { steps { sh 'kubectl apply -f deployment.yaml' } }
    }
}`}},{question:`What Git commands do you commonly use in your project?`,answer:`Common commands: git clone, git pull, git push, git branch, git checkout, git merge, git commit, git stash, git status, git log, git fetch, git rebase.`,code:{language:`java`,content:`git clone <repo-url>
git pull origin main
git push origin feature-branch
git checkout -b new-branch
git merge feature-branch
git commit -m "message"`}},{question:`What is Agile methodology? Explain your experience working in Agile.`,answer:`Agile is iterative software development where requirements evolve through collaboration. Experience with Scrum: sprints, daily standups, sprint planning, retrospectives. Quick adaptation to changes, incremental delivery, continuous feedback.`,code:null},{question:`Briefly explain the project you are currently working on.`,answer:`Working on a microservices-based banking application handling user registration and transaction data. Uses Spring Boot backend, ReactJS frontend, JPA for database, Spring Security with JWT for authentication.`,code:null},{question:`How do you approach writing unit test cases?`,answer:`Use JUnit and Mockito. Test individual methods, mock external dependencies, ensure high code coverage. Write tests for positive and negative scenarios, edge cases, and boundary conditions.`,code:{language:`java`,content:`@ExtendWith(MockitoExtension.class)
public class UserServiceTest {
    @Mock private UserRepository repository;
    @InjectMocks private UserService service;
    @Test
    void testGetUser() {
        when(repository.findById(1L)).thenReturn(Optional.of(new User()));
        User user = service.getUser(1L);
        assertNotNull(user);
    }
}`}},{question:`How do you mock private methods in unit testing?`,answer:`Private methods can be mocked using PowerMock along with Mockito, which allows mocking private, static, and final methods. Alternatively, refactor code to make private methods package-private or extract to separate class.`,code:{language:`java`,content:`// Using PowerMock
@RunWith(PowerMockRunner.class)
public class ServiceTest {
    @Test
    public void testPrivateMethod() {
        Service service = PowerMockito.spy(new Service());
        PowerMockito.doReturn("mocked").when(service, "privateMethod");
    }
}`}}]}]}],questionCount:30},"./amazon/amazon.js":{id:`amazon`,name:`Amazon`,interviews:[{name:`Amazon`,questionCount:3,rounds:[{name:`Technical L1 Interview (Coding)`,questions:[{question:`Validate an IP address without using any inbuilt methods efficiently`,answer:``,code:{language:`java`,content:`public class IPAddressValidator {
    public static boolean isValidIP(String ip) {
        if (ip == null || ip.isEmpty()) return false;

        String[] parts = new String[4];
        int partIndex = 0, num = 0, count = 0;
        boolean hasNum = false;

        for (int i = 0; i < ip.length(); i++) {
            char c = ip.charAt(i);
            if (c >= '0' && c <= '9') {
                num = num * 10 + (c - '0');
                hasNum = true;
                if (num > 255) return false;
            } else if (c == '.') {
                if (!hasNum || partIndex >= 3) return false;
                parts[partIndex++] = String.valueOf(num);
                num = 0;
                hasNum = false;
                count++;
            } else {
                return false;
            }
        }

        if (partIndex != 3 || !hasNum) return false;
        return true;
    }

    public static void main(String[] args) {
        System.out.println(isValidIP("192.168.1.1")); // true
        System.out.println(isValidIP("256.100.100.100")); // false
        System.out.println(isValidIP("192.168.1.")); // false
    }
}`}}]},{name:`Technical L2 Interview (Coding)`,questions:[{question:`Pacific Atlantic Water Flow`,answer:`Watch on YouTube (https://youtu.be/yH0DesUBuFo?si=M0pcOaAy8Rm4qluD)`,code:{language:`java`,content:`class Solution {
    public List<List<Integer>> pacificAtlantic(int[][] heights) {
        List<List<Integer>> ansList=new ArrayList<>();
        int row=heights.length,col=heights[0].length;
        boolean pacific[][]=new boolean[row][col];
        boolean atlantic[][]=new boolean[row][col];
        for(int i=0;i<row;i++){
            dfs(i,0,heights,pacific,Integer.MIN_VALUE);
            dfs(i,col-1,heights,atlantic,Integer.MIN_VALUE);
        }
        for(int j=0;j<col;j++){
            dfs(0,j,heights,pacific,Integer.MIN_VALUE);
            dfs(row-1,j,heights,atlantic,Integer.MIN_VALUE);
        }
        for(int i=0;i<row;i++){
            for(int j=0;j<col;j++){
                if(pacific[i][j]&&atlantic[i][j]){
                    ansList.add(Arrays.asList(i,j));
                }
            }
        }
        return ansList;
    }
    void dfs(int i,int j,int[][] heights, boolean ocean[][],int height){
        if(i<0||j<0||i>=heights.length||j>=heights[0].length||ocean[i][j]||height>heights[i][j]){
            return;
        }
        ocean[i][j]=true;
        dfs(i+1,j,heights,ocean,heights[i][j]);
        dfs(i-1,j,heights,ocean,heights[i][j]);
        dfs(i,j+1,heights,ocean,heights[i][j]);
        dfs(i,j-1,heights,ocean,heights[i][j]);
    }
}`}}]},{name:`Technical L3 Interview (System Design)`,questions:[{question:`Chef Booking  -System Design`,answer:`1. System Requirements
1.1 Functional Requirements
- Users can register and log in.
- Users can search for chefs based on availability, cuisine, and location.
- Users can book a chef for a specific time slot.
- Users can cancel or reschedule bookings.
- Chefs can accept or reject bookings.
- Notifications for booking confirmations, rejections, and reminders.
- Admin dashboard for managing users, chefs, and bookings.
1.2 Non-Functional Requirements
- Scalability → Handle large bookings efficiently.
- Performance → Optimize API responses and database queries.
- Reliability → Ensure high availability and fault tolerance.
- Security → Authentication, authorization, and data protection.
- Observability → Logging, monitoring, and alerting.
2. High-Level Architecture
2.1 Components
1. Frontend  → React.js / Angular
2. Backend  → Spring Boot (Java)
3. Database  → PostgreSQL (Relational DB) + Redis (Caching)
4. Authentication  → JWT-based authentication
5. Messaging Queue  → Kafka / RabbitMQ for notifications
6. Caching  → Redis for faster lookup of chef availability
7. Storage  → AWS S3 / Firebase for chef images & documents
8. Load Balancer  → Nginx / AWS ALB for handling traffic
9. Microservices  (Optional for scalability) →
- User Service
- Chef Service
- Booking Service
- Notification Service
3. Database Design
3.1 Database Schema (Relational - PostgreSQL)
Users Table
Chefs Table
Bookings Table
Notifications Table
4. API Design (RESTful Services)
4.1 Authentication API
- POST /auth/register → Register new users
- POST /auth/login → Authenticate user and return JWT token
4.2 User API
- GET /users/{userId} → Fetch user details
- PUT /users/{userId} → Update user profile
4.3 Chef API
- GET /chefs → Get list of available chefs
- GET /chefs/{chefId} → Get chef details
- POST /chefs → Add a new chef (Admin Only)
- PUT /chefs/{chefId} → Update chef details
4.4 Booking API
- POST /bookings → Create a new booking
- GET /bookings/{bookingId} → Fetch booking details
- PUT /bookings/{bookingId} → Reschedule booking
- DELETE /bookings/{bookingId} → Cancel booking
4.5 Notification API
- GET /notifications → Fetch user notifications
- POST /notifications → Send notifications
5. Optimization Techniques
5.1 Caching (Redis)
- Store chef availability in Redis to reduce database load.
- Store frequently accessed user data (e.g., profile info) in Redis.
5.2 Database Indexing
- Add indexes on frequently queried columns like email, booking_time, and chef_id.
5.3 Load Balancing
- Use Nginx / AWS ALB to distribute traffic among multiple backend instances.
5.4 Background Jobs for Notifications
- Use Kafka / RabbitMQ to process notifications asynchronously.
5.5 Microservices Approach (Optional)
- User Service → Handles user authentication and profile management.
- Chef Service → Manages chef details and availability.
- Booking Service → Handles booking and scheduling logic.
- Notification Service → Sends emails, SMS, and push notifications.
6. Security Measures
6.1 Authentication & Authorization
- Use JWT-based authentication for securing APIs.
- Implement role-based access control (RBAC) for user roles.
6.2 Input Validation
- Validate all API inputs using Spring Boot validation.
6.3 Rate Limiting
- Implement API rate limiting using Spring Boot RateLimiter to prevent abuse.
6.4 Secure Data Storage
- Encrypt sensitive data like passwords using BCrypt hashing.
7. Deployment & DevOps
7.1 CI/CD Pipeline
- GitHub Actions / Jenkins: for automated testing and deployment.
- Docker: for containerized deployment.
- Kubernetes: for scalable microservices.
7.2 Monitoring & Logging
- Use Prometheus + Grafana for monitoring.
- ELK Stack (Elasticsearch, Logstash, Kibana): for logging and alerting.
7.3 Cloud Deployment
- AWS / GCP / Azure: for cloud hosting.
- S3 Storage: for storing chef images and documents.
8. Tech Stack Summary
| Component       | Technology             |
|---------------------|--------------------------|
| Frontend           | React.js / Angular        |
| Backend           | Spring Boot (Java)        |
| Database           | PostgreSQL / MySQL        |
| Caching            | Redis                      |
| Queueing System    | Kafka / RabbitMQ          |
| Authentication     | JWT + OAuth2              |
| Storage           | AWS S3 / Firebase         |
| Monitoring        | Prometheus + Grafana      |
| Deployment        | Docker + Kubernetes       |
9. Conclusion
- Scalable: Microservices architecture for high scalability.
- Efficient: Optimized database queries and caching.
- Secure: JWT-based authentication and role-based access control.
- Fault-Tolerant: Background jobs for async processing.
- Cloud-Ready: Deployable on AWS/GCP/Azure with containerization.`,code:{language:`sql`,content:`CREATE INDEX idx_email ON users(email);
CREATE INDEX idx_booking_time ON bookings(booking_time);
CREATE INDEX idx_chef_id ON bookings(chef_id);`}}]}]}],questionCount:3},"./aspire-systems/aspire-systems.js":{id:`aspire-systems`,name:`Aspire Systems`,interviews:[{name:`Aspire Systems Interview`,questionCount:66,rounds:[{name:`Technical L1 Interview`,questions:[{question:`Briefly describe your project experience and the versions of languages you used.`,answer:`I have 3 years of experience in full-stack development using Java 8 and ReactJS. I've worked on customer registration services and transaction data handling in a bank application. For backend development, I utilized Spring Boot, Hibernate, and JPA. Additionally, I've worked on implementing unit tests using JUnit and Mockito.`,code:null},{question:`What are the features of Java 8?`,answer:`Java 8 introduced several key features, including lambda expressions, the Stream API, default methods in interfaces, the new java.time API for date and time, Optional class, and improvements in the Collections API.`,code:null},{question:`What is a lambda expression?`,answer:`A lambda expression is a concise way to represent a method interface using an expression. It provides a clear and concise way to write inline implementations of functional interfaces.`,code:{language:`java`,content:`// Lambda expression example
Runnable r = () -> System.out.println("Hello");`}},{question:`What is a functional interface?`,answer:`A functional interface is an interface with exactly one abstract method. It can have multiple default or static methods. Functional interfaces are used as the types for lambda expressions and method references.`,code:{language:`java`,content:`@FunctionalInterface
interface Calculator { int add(int a, int b); }`}},{question:`What is a normal interface?`,answer:`A normal interface can have multiple abstract methods. It serves as a contract for implementing classes to provide specific behaviors.`,code:{language:`java`,content:`interface Vehicle { void start(); void stop(); }`}},{question:`What is the difference between a functional interface and a normal interface?`,answer:`A functional interface has only one abstract method, making it suitable for lambda expressions, while a normal interface can have multiple abstract methods.`,code:null},{question:`Can I use lambda expressions in normal methods?`,answer:`Yes, lambda expressions can be used in any context where a functional interface is expected, including in normal methods.`,code:{language:`java`,content:`public void process() {
    List<String> list = Arrays.asList("a", "b");
    list.forEach(s -> System.out.println(s));
}`}},{question:`What is the difference between HashMap and ConcurrentHashMap?`,answer:`HashMap is not thread-safe and can have performance issues in a concurrent environment. ConcurrentHashMap is thread-safe, allowing concurrent read and write operations without blocking.`,code:null},{question:`Can multiple threads access ConcurrentHashMap?`,answer:`Yes, ConcurrentHashMap allows multiple threads to read and write simultaneously without locking the entire map.`,code:null},{question:`If I use ConcurrentHashMap and perform get and put operations at the same time, will it work?`,answer:`Yes, ConcurrentHashMap is designed to handle concurrent read and write operations safely and efficiently.`,code:null},{question:`How does HashMap work internally?`,answer:`HashMap uses an array of buckets, where each bucket is a linked list or tree. It calculates the hash code of the key, determines the index of the bucket, and stores the key-value pair in the appropriate bucket.`,code:null},{question:`What is a bucket in HashMap?`,answer:`A bucket is a slot in the HashMap's internal array, used to store key-value pairs that have the same hash code.`,code:null},{question:`What is the difference between map and flatMap?`,answer:`map transforms each element in the stream, while flatMap transforms each element to a stream and flattens the resulting streams into a single stream.`,code:{language:`java`,content:`// map - one-to-one
List<String> upper = list.stream().map(String::toUpperCase).collect(Collectors.toList());
// flatMap - one-to-many
List<Integer> flat = list.stream().flatMap(Collection::stream).collect(Collectors.toList());`}},{question:`What is the difference between throw and throws?`,answer:`throw is used to explicitly throw an exception in the code, while throws is used in the method signature to declare that the method can throw certain exceptions.`,code:{language:`java`,content:`// throw
throw new RuntimeException("Error");
// throws
public void method() throws IOException { }`}},{question:`What is the ternary operator in Java?`,answer:`The ternary operator is a concise way to express conditional logic. It takes the form condition ? ifTrue : ifFalse.`,code:{language:`java`,content:`int result = (a > b) ? a : b;`}},{question:`Write a code to find the 3rd non-repeated character in the string 'hi am Bharath'.`,answer:`Use LinkedHashMap to maintain insertion order, count characters, then find the 3rd character with count 1.`,code:{language:`java`,content:`public static Character getThirdNonRepeatedCharacter(String str) {
    Map<Character, Integer> charCount = new LinkedHashMap<>();
    for (char c : str.toCharArray()) {
        charCount.put(c, charCount.getOrDefault(c, 0) + 1);
    }
    int count = 0;
    for (Map.Entry<Character, Integer> entry : charCount.entrySet()) {
        if (entry.getValue() == 1) {
            count++;
            if (count == 3) return entry.getKey();
        }
    }
    return null;
}`}},{question:`Write a code to count every character in the string 'hi am Bharath'.`,answer:`Use HashMap to store character counts.`,code:{language:`java`,content:`public static Map<Character, Integer> countCharacters(String str) {
    Map<Character, Integer> charCount = new HashMap<>();
    for (char c : str.toCharArray()) {
        charCount.put(c, charCount.getOrDefault(c, 0) + 1);
    }
    return charCount;
}`}},{question:`Given list1 = [1,2,4,6,7] and list2 = [3,5,4,6], print elements from list1 that are not present in list2.`,answer:`Use stream filter with contains check.`,code:{language:`java`,content:`List<Integer> result = list1.stream()
    .filter(e -> !list2.contains(e))
    .collect(Collectors.toList());
System.out.println(result); // [1, 2, 7]`}},{question:`What is the Lombok dependency?`,answer:`Lombok is a Java library that helps reduce boilerplate code. It provides annotations to automatically generate getters, setters, constructors, equals, hashCode, toString, and other methods.`,code:{language:`java`,content:`@Data @AllArgsConstructor @NoArgsConstructor
public class User { private String name; private int age; }`}},{question:`What is a no-argument constructor in Lombok?`,answer:`In Lombok, the @NoArgsConstructor annotation generates a no-argument constructor for the class.`,code:{language:`java`,content:`@NoArgsConstructor
public class User { private String name; }`}},{question:`What is serialization and where have you used it?`,answer:`Serialization is the process of converting an object into a byte stream for storage or transmission. I have used serialization in a bank project to serialize transaction statements for storage and retrieval.`,code:{language:`java`,content:`class User implements Serializable { private static final long serialVersionUID = 1L; }`}},{question:`What is a serialization ID?`,answer:`A serialization ID (serialVersionUID) is a unique identifier for a Serializable class. It is used during deserialization to verify that the sender and receiver of a serialized object maintain compatibility.`,code:{language:`java`,content:`private static final long serialVersionUID = 123456789L;`}},{question:`If two objects have the same serialization ID, what happens when calling another microservice with both serialized objects?`,answer:`If two objects have the same serialization ID, they are considered compatible for deserialization. However, it is crucial that their class definitions are compatible to avoid InvalidClassException.`,code:null},{question:`What is a String?`,answer:`A String is an immutable sequence of characters in Java. It is an instance of the java.lang.String class.`,code:{language:`java`,content:`String str = "Hello";`}},{question:`What is a String pool?`,answer:`The String pool is a special memory region where Java stores interned strings. When a string is created, the JVM checks the pool first to see if the string already exists. If it does, the reference to the existing string is returned; otherwise, a new string is added to the pool.`,code:{language:`java`,content:`String s1 = "Hello"; // Pool
String s2 = "Hello"; // Same pool reference
String s3 = new String("Hello"); // Heap`}},{question:`What does the @Qualifier annotation mean?`,answer:`The @Qualifier annotation is used to resolve ambiguity in Spring's dependency injection when multiple beans of the same type are present. It specifies which bean should be injected.`,code:{language:`java`,content:`@Autowired @Qualifier("emailService") private MessageService service;`}},{question:`Give an example of @Qualifier in real-time.`,answer:`When multiple implementations of MessageService exist (EmailService and SMSService), @Qualifier specifies which one to inject.`,code:{language:`java`,content:`@Service
public class NotificationService {
    @Autowired @Qualifier("emailService")
    private MessageService messageService;
}
@Service("emailService")
public class EmailService implements MessageService { }
@Service("smsService")
public class SMSService implements MessageService { }`}},{question:`What is @Primary and give a real-time example.`,answer:`The @Primary annotation indicates which bean should be preferred when multiple candidates qualify for autowiring.`,code:{language:`java`,content:`@Configuration
public class AppConfig {
    @Bean @Primary
    public MessageService primaryMessageService() {
        return new EmailService();
    }
}`}},{question:`What are collections in Java?`,answer:`Collections in Java are frameworks that provide an architecture to store and manipulate a group of objects. They include interfaces like List, Set, and Map, and classes like ArrayList, HashSet, and HashMap.`,code:null},{question:`Is Set an interface or a class?`,answer:`Set is an interface in Java.`,code:null},{question:`Is LinkedList an interface or a class?`,answer:`LinkedList is a class in Java.`,code:null},{question:`What is the difference between Spring and Spring Boot?`,answer:`Spring is a comprehensive framework for enterprise Java development. Spring Boot simplifies the setup and development of new Spring applications with default configurations, embedded servers, and minimal configuration.`,code:null},{question:`Why use Spring Boot?`,answer:`Spring Boot is used for its ease of setup, embedded servers, reduced boilerplate code, auto-configuration, and rapid development capabilities.`,code:null},{question:`What is AOP in Spring Boot?`,answer:`AOP (Aspect-Oriented Programming) in Spring Boot is a programming paradigm that aims to increase modularity by allowing the separation of cross-cutting concerns, such as logging, transaction management, and security.`,code:{language:`java`,content:`@Aspect
@Component
public class LoggingAspect {
    @Around("execution(* com.service.*.*(..))")
    public Object log(ProceedingJoinPoint joinPoint) throws Throwable { }
}`}},{question:`Explain microservices architecture.`,answer:`Microservices architecture is a design approach where an application is composed of small, loosely coupled, and independently deployable services. Each service handles a specific business function and communicates with other services through APIs.`,code:null},{question:`What is @Autowired?`,answer:`@Autowired is a Spring annotation used for automatic dependency injection. It can be applied to constructors, fields, and setter methods to inject the required beans.`,code:{language:`java`,content:`@Autowired private UserService userService;`}},{question:`What is the difference between @PathVariable and @RequestParam?`,answer:`@PathVariable is used to extract values from the URI path, while @RequestParam is used to extract query parameters from the request.`,code:{language:`java`,content:`@GetMapping("/users/{id}")
public User getUser(@PathVariable Long id) { }
@GetMapping("/users")
public List<User> getUsers(@RequestParam String name) { }`}},{question:`What is the difference between POST and PUT?`,answer:`POST is used to create new resources, while PUT is used to update existing resources or create a resource if it does not exist.`,code:null},{question:`Which HTTP method do we use for creating resources?`,answer:`The POST method is used for creating resources.`,code:null},{question:`Can we use PUT for creating resources?`,answer:`Yes, PUT can be used to create resources if the resource does not already exist.`,code:null},{question:`What are HTTP status codes?`,answer:`HTTP status codes are standard response codes given by web servers on the internet. They indicate the result of the client's request, such as 200 (OK), 404 (Not Found), and 500 (Internal Server Error).`,code:null},{question:`What is fail-safe and fail-fast?`,answer:`Fail-safe iterators allow modifications to the collection while iterating without throwing an exception. Fail-fast iterators throw a ConcurrentModificationException if the collection is modified during iteration.`,code:null},{question:`Explain JWT token-based authentication.`,answer:`JWT (JSON Web Token) is a compact, URL-safe means of representing claims to be transferred between two parties. It is used for stateless authentication by encoding user information in a token, which is then used to verify the user's identity.`,code:null},{question:`What is the @Transactional annotation?`,answer:`@Transactional is used to manage transaction boundaries in Spring. It ensures that a method or a block of code is executed within a transaction, providing rollback and commit mechanisms.`,code:{language:`java`,content:`@Transactional
public void transferMoney() { }`}},{question:`Write an SQL query to find the Nth maximum salary.`,answer:`Use ORDER BY with LIMIT/OFFSET or DENSE_RANK window function.`,code:{language:`java`,content:`SELECT DISTINCT salary FROM employee ORDER BY salary DESC LIMIT 1 OFFSET N-1;
-- For 3rd maximum:
SELECT DISTINCT salary FROM employee ORDER BY salary DESC LIMIT 1 OFFSET 2;`}}]},{name:`Technical L2 Interview`,questions:[{question:`Self introduction based on project.`,answer:`I have 3+ years of experience as a Java Full Stack Developer. Currently working on customer registration and transaction processing systems using Java 17, Spring Boot, Microservices, and ReactJS. I handle REST API development, Kafka integration, JWT authentication, and cloud deployment.`,code:null},{question:`Which Java version are you using?`,answer:`Previously using Java 8 with features like lambda expressions, Stream API, Date-Time API, and Optional class. Currently using Java 17 with new features like pattern matching for switch, sealed classes, records, and enhanced Date-Time API.`,code:null},{question:`Where did you generate the JWT token?`,answer:`JWT token is generated during user authentication in the backend service using a secure secret key. The token is sent to the client, which includes it in the Authorization header of subsequent requests to access protected resources.`,code:{language:`java`,content:`// JWT Generation
String jwt = Jwts.builder()
    .setSubject(username)
    .setIssuedAt(new Date())
    .setExpiration(new Date(System.currentTimeMillis() + 3600000))
    .signWith(SignatureAlgorithm.HS256, secretKey)
    .compact();`}},{question:`How do you provide JWT security in Spring Boot?`,answer:`Using Spring Security with a custom JWT filter that intercepts requests, extracts token from Authorization header, validates it, and sets authentication in security context. Configure security settings to protect specific endpoints.`,code:{language:`java`,content:`@Component
public class JwtFilter extends OncePerRequestFilter {
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) {
        String token = extractToken(request);
        if (token != null && validateToken(token)) {
            Authentication auth = getAuthentication(token);
            SecurityContextHolder.getContext().setAuthentication(auth);
        }
        chain.doFilter(request, response);
    }
}`}},{question:`How do you override the hashCode and equals methods in Java?`,answer:`Override equals to compare object content, hashCode to return same value for equal objects. Use Objects utility methods.`,code:{language:`java`,content:`@Override
public boolean equals(Object obj) {
    if (this == obj) return true;
    if (obj == null || getClass() != obj.getClass()) return false;
    Employee employee = (Employee) obj;
    return id == employee.id &&
        Double.compare(employee.salary, salary) == 0 &&
        Objects.equals(name, employee.name) &&
        Objects.equals(department, employee.department);
}
@Override
public int hashCode() {
    return Objects.hash(name, id, department, salary);
}`}},{question:`Find department-wise names using streams.`,answer:`Use groupingBy with mapping collector to get department-wise list of employee names.`,code:{language:`java`,content:`Map<String, List<String>> departmentWiseNames = employees.stream()
    .collect(Collectors.groupingBy(
        Employee::getDepartment,
        Collectors.mapping(Employee::getName, Collectors.toList())
    ));
departmentWiseNames.forEach((dept, names) -> {
    System.out.println("Department: " + dept);
    System.out.println("Names: " + names);
});`}},{question:`Find the second highest salary employee using streams.`,answer:`Sort by salary descending, skip first, find first.`,code:{language:`java`,content:`Employee secondHighestSalaryEmployee = employees.stream()
    .sorted(Comparator.comparingDouble(Employee::getSalary).reversed())
    .skip(1)
    .findFirst()
    .orElse(null);
System.out.println("Second Highest Salary Employee: " + secondHighestSalaryEmployee);`}},{question:`What will be the output of string comparison code?`,answer:`s1 == s2 true (same pool), s1 == s3 false (new object), s1.equals(s3) true (same content).`,code:{language:`java`,content:`String s1 = "hello";
String s2 = "hello";
String s3 = new String("hello");
System.out.println(s1 == s2); // true
System.out.println(s1 == s3); // false
System.out.println(s1.equals(s3)); // true`}},{question:`What will be the output with intern() method?`,answer:`s1 == s4 true (intern returns pool reference), s3 == s4 false (different objects).`,code:{language:`java`,content:`String s1 = "hello";
String s2 = "hello";
String s3 = new String("hello");
String s4 = s3.intern();
System.out.println(s1 == s2); // true
System.out.println(s1 == s3); // false
System.out.println(s1.equals(s3)); // true
System.out.println(s1 == s4); // true
System.out.println(s3 == s4); // false`}}]},{name:`Additional Interview Questions`,questions:[{question:`What is a hash collision?`,answer:`A hash collision occurs when two different keys in a hash-based collection produce the same hash code and are placed in the same bucket. This can lead to performance degradation as multiple keys have to be stored and managed in the same location.`,code:null},{question:`When does a collision error occur in hash-based collections?`,answer:`A collision error occurs when multiple keys map to the same hash code and are stored in the same bucket. Collections handle collisions through chaining (linked list) or open addressing (probing).`,code:null},{question:`What are the key differences between Runnable and Callable?`,answer:`Runnable does not return a result and cannot throw checked exceptions. Callable returns a result (T) and can throw checked exceptions. Runnable is executed by Thread or Executor, while Callable is executed by ExecutorService.`,code:{language:`java`,content:`// Runnable
Runnable r = () -> System.out.println("Hello");
// Callable
Callable<String> c = () -> "Hello";`}},{question:`What is the difference between map and flatMap in Java Streams?`,answer:`map transforms each element into another form, producing a stream of same structure. flatMap flattens multiple streams into a single stream by applying a one-to-many transformation function.`,code:{language:`java`,content:`// map: one-to-one
list.stream().map(String::toUpperCase)
// flatMap: one-to-many
list.stream().flatMap(Collection::stream)`}},{question:`How does flatMap work internally?`,answer:`flatMap applies a function that returns a stream for each element, then flattens these streams into a single stream through a combination of map operation and Stream.flatMap method, which merges nested streams.`,code:null}]},{name:`Coding Problems`,questions:[{question:`Find and Insert Target in a Sorted Array`,answer:`First check if target exists in original array. If not, sort array and use binary search to find insertion position.

Examples:
- arr=[4,1,7,2], target=4 → 0
- arr=[4,1,7,2], target=5 → 3`,code:{language:`java`,content:`import java.util.Arrays;
public class InsertAndFindIndex {
    public static int insertAndFindIndex(int[] arr, int target) {
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == target) return i;
        }
        Arrays.sort(arr);
        int index = Arrays.binarySearch(arr, target);
        if (index >= 0) return index;
        return -(index + 1);
    }
}`}},{question:`Capitalize and Count Words in a List Using Streams`,answer:`Use map to capitalize first letter, use groupingBy with counting to get word counts.

Example:
- Input: ["hello", "world", "this", "hello"] → Hello:2, World:1, This:1`,code:{language:`java`,content:`List<String> words = Arrays.asList("hello", "world", "this", "hello");
List<String> capitalized = words.stream()
    .map(word -> Character.toUpperCase(word.charAt(0)) + word.substring(1))
    .collect(Collectors.toList());
Map<String, Long> counts = words.stream()
    .map(word -> Character.toUpperCase(word.charAt(0)) + word.substring(1))
    .collect(Collectors.groupingBy(Function.identity(), Collectors.counting()));`}}]},{name:`Manager Round`,questions:[{question:`Briefly describe your current project and daily responsibilities.`,answer:`Currently working on a library system microservice handling book checkouts. Responsibilities include developing REST APIs, ensuring thread-safe operations, handling exceptions, and providing consistent API responses. Daily tasks include coding, code reviews, debugging, and collaborating with cross-functional teams.`,code:null},{question:`Design a microservice for library book checkout with concurrency handling.`,answer:`Design includes: 1) REST endpoint with @PostMapping, 2) Thread-safe checkout using synchronized block or database locks, 3) Atomic operations with @Transactional, 4) Custom exception for book unavailable, 5) Consistent error responses with proper HTTP status codes.`,code:{language:`java`,content:`@RestController
@RequestMapping("/api/checkout")
public class CheckoutController {
    @PostMapping("/{bookId}")
    public ResponseEntity<?> checkoutBook(@PathVariable Long bookId, @RequestParam String userId) {
        try {
            Checkout checkout = checkoutService.checkoutBook(bookId, userId);
            return ResponseEntity.status(HttpStatus.OK).body(checkout);
        } catch (BookUnavailableException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("An error occurred during checkout.");
        }
    }
}
@Service
public class CheckoutService {
    @Transactional
    public Checkout checkoutBook(Long bookId, String userId) throws BookUnavailableException {
        synchronized (bookId) {
            int availableCopies = bookRepository.getAvailableCopies(bookId);
            if (availableCopies <= 0) {
                throw new BookUnavailableException("No copies available.");
            }
            bookRepository.decrementAvailableCopies(bookId);
            Checkout checkout = new Checkout();
            checkout.setBookId(bookId);
            checkout.setCheckedOutBy(userId);
            checkout.setCheckedOutOn(LocalDateTime.now());
            return checkoutRepository.save(checkout);
        }
    }
}`}}]},{name:`HR Round`,questions:[{question:`Why do you want to join Aspire Systems?`,answer:`Aspire Systems has a strong reputation for innovation and technology excellence. I'm excited about the opportunity to work on challenging projects, learn new technologies, and contribute to the company's growth. The company culture and focus on employee development align with my career goals.`,code:null},{question:`What are your strengths and weaknesses?`,answer:`Strengths: Quick learner, problem-solving skills, strong technical foundation, good team player. Weakness: Sometimes focus too much on details, working on delegating tasks better.`,code:null},{question:`Why are you looking for a job change?`,answer:`Looking for better growth opportunities, challenging projects, and a chance to work with new technologies. Aspire Systems offers the perfect environment for professional growth.`,code:null}]}]}],questionCount:66},"./axis/axis.js":{id:`axis`,name:`Axis Bank`,interviews:[{name:`Axis Bank Interview`,questionCount:11,rounds:[{name:`L1 Technical Interview`,questions:[{question:`What are streams in Java, and how are they used?`,answer:`Java Streams are part of java.util.stream package introduced in Java 8. They provide a high-level abstraction for processing sequences of elements in a functional and declarative way. Key features include: Functional Operations (filter, map, reduce, collect), Lazy Evaluation (intermediate operations deferred until terminal operation), and Parallel Processing for multi-core processors.`,code:{language:`java`,content:`import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class StreamExample {
    public static void main(String[] args) {
        List<String> words = Arrays.asList("apple", "banana", "cherry", "date");
        List<String> filteredWords = words.stream()
            .filter(word -> word.startsWith("b"))
            .map(String::toUpperCase)
            .collect(Collectors.toList());
        System.out.println(filteredWords); // Output: [BANANA]
    }
}`}},{question:`Explain lambda expressions in Java with an example.`,answer:`Lambda expressions provide a concise way to express instances of functional interfaces (interfaces with single abstract method). They consist of parameters, arrow (->), and body. Syntax: (parameters) -> expression or (parameters) -> { statements; }.`,code:{language:`java`,content:`import java.util.Arrays;
import java.util.List;

public class LambdaExample {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("Alice", "Bob", "Charlie");
        // Lambda expression
        names.forEach(name -> System.out.println(name));
        // Method reference (shorter)
        names.forEach(System.out::println);
    }
}`}},{question:`Write a code to find the longest palindrome substring length in a string.`,answer:`Use expand around center technique. For each character, expand outward for odd and even length palindromes. Track maximum length found.

Examples:
- Input: "babad" → 3
- Input: "cbbd"  → 2

Time Complexity: O(n^2). Space Complexity: O(1).`,code:{language:`java`,content:`public class LongestPalindromeLength {
    private static int expandAroundCenter(String s, int left, int right) {
        while (left >= 0 && right < s.length() && s.charAt(left) == s.charAt(right)) {
            left--;
            right++;
        }
        return right - left - 1;
    }
    public static int longestPalindromeLength(String s) {
        if (s == null || s.length() == 0) return 0;
        int maxLength = 0;
        for (int i = 0; i < s.length(); i++) {
            int len1 = expandAroundCenter(s, i, i);     // Odd length
            int len2 = expandAroundCenter(s, i, i + 1); // Even length
            int len = Math.max(len1, len2);
            maxLength = Math.max(maxLength, len);
        }
        return maxLength;
    }
    public static void main(String[] args) {
        String input = "babad";
        System.out.println("Length: " + longestPalindromeLength(input)); // 3
    }
}`}},{question:`What is reactive programming, and where is it used?`,answer:`Reactive programming is a programming paradigm dealing with asynchronous data streams and propagation of changes. It allows systems to react to data changes in non-blocking, efficient manner. Use Cases: Real-Time Systems (stock market data, sensor data), User Interfaces (responsive UIs), Microservices (async communication, high-load processing). Key Libraries: RxJava, Project Reactor.`,code:{language:`java`,content:`// Project Reactor example
Flux.just(1, 2, 3, 4, 5)
    .filter(n -> n % 2 == 0)
    .map(n -> n * 2)
    .subscribe(System.out::println); // Output: 4, 8`}},{question:`Describe the architecture of microservices and how services communicate with each other.`,answer:`Microservices Architecture breaks monolithic applications into small, independent services focusing on specific business functions. Each service is developed, deployed, and scaled independently. Communication Methods: HTTP/REST APIs, gRPC (high-performance RPC), Message Brokers (Kafka, RabbitMQ for async), Service Discovery (Eureka, Consul).`,code:null},{question:`Explain the architecture of the Spring Framework and the role of the IoC container.`,answer:`Spring Architecture includes: Core Container (DI and bean lifecycle), AOP (cross-cutting concerns), Data Access/Integration (JDBC, ORM support), Web (web applications, REST APIs). IoC Container: Manages lifecycle and configuration of beans using Dependency Injection. Types: BeanFactory (basic) and ApplicationContext (advanced).`,code:{language:`java`,content:`import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class Main {
    public static void main(String[] args) {
        ApplicationContext context = new AnnotationConfigApplicationContext(AppConfig.class);
        MyService myService = context.getBean(MyService.class);
        myService.performAction();
    }
}`}},{question:`What is Docker, and how does it relate to Kubernetes?`,answer:`Docker is a platform for developing, shipping, and running applications in containers. Containers are lightweight, portable, and include everything needed to run an application. Kubernetes is an orchestration platform that manages deployment, scaling, and operation of containerized applications across clusters. Workflow: Develop → Dockerize → Deploy with Kubernetes (automated scheduling, scaling, management).`,code:{language:`java`,content:`# Dockerfile
FROM openjdk:17
COPY target/app.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]

# Kubernetes Deployment
apiVersion: apps/v1
kind: Deployment
metadata:
  name: app-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: myapp
  template:
    metadata:
      labels:
        app: myapp
    spec:
      containers:
      - name: myapp
        image: myapp:latest
        ports:
        - containerPort: 8080`}},{question:`Explain the architecture of a Kafka cluster.`,answer:`Kafka Architecture includes: Brokers (store/manage data, handle partitions/replicas), Topics (organize data with multiple partitions for parallel processing), Producers (publish messages), Consumers (subscribe and consume messages), Zookeeper (manages broker metadata, leader elections, configuration).`,code:null},{question:`What is a Security Context in Spring Security, and how does it work?`,answer:`Security Context holds authentication and authorization information for currently authenticated user. Stored in ThreadLocal, provides access to user's roles/permissions. Workflow: 1) Authentication - Spring Security creates SecurityContext with Authentication object after successful login, 2) Authorization - SecurityContext checks user permissions throughout application.`,code:{language:`java`,content:`import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public class SecurityUtils {
    public static String getCurrentUsername() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return auth != null ? auth.getName() : "Anonymous";
    }
}`}},{question:`How do you implement JWT token-based authentication?`,answer:`Implementation Steps: 1) Generate Token - After successful authentication, generate JWT token containing user details using secret key, 2) Send Token - Send token to client in response header, 3) Authenticate Requests - Client includes token in Authorization header, server verifies token and extracts user information.`,code:{language:`java`,content:`import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

public class JwtUtil {
    private static final String SECRET_KEY = "your-secret-key";
    public static String generateToken(String username) {
        return Jwts.builder()
            .setSubject(username)
            .setIssuedAt(new Date())
            .setExpiration(new Date(System.currentTimeMillis() + 3600000))
            .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
            .compact();
    }
    public static boolean validateToken(String token, String username) {
        String extractedUsername = Jwts.parser()
            .setSigningKey(SECRET_KEY)
            .parseClaimsJws(token)
            .getBody()
            .getSubject();
        return extractedUsername.equals(username) && !isTokenExpired(token);
    }
}`}},{question:`How do you use salt and hash in JWT to secure tokens?`,answer:`Salt and Hash enhance security: Salt is random value added before hashing to prevent precomputed attacks. Hash is cryptographic function applied to salted token for integrity. Steps: 1) Generate unique salt for each token, 2) Combine token with salt and apply hash function, 3) Store salted/hashed token, 4) During validation, combine incoming token with salt and hash to compare with stored value.`,code:{language:`java`,content:`import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;

public class TokenUtil {
    private static final SecureRandom random = new SecureRandom();
    public static String generateSalt() {
        byte[] salt = new byte[16];
        random.nextBytes(salt);
        return new String(salt);
    }
    public static String hashToken(String token, String salt) throws NoSuchAlgorithmException {
        MessageDigest md = MessageDigest.getInstance("SHA-256");
        md.update((token + salt).getBytes());
        byte[] hashedBytes = md.digest();
        return new String(hashedBytes);
    }
}`}}]}]}],questionCount:11},"./centrico/centrico.js":{id:`centrico`,name:`Centrico`,interviews:[{name:`Centrico Interview`,questionCount:30,rounds:[{name:`Centrico Interview`,questions:[{question:`Self Introduction and Project Details`,answer:`I have 3+ years of experience as a Java Full Stack Developer. Currently working on a banking application using Java 8 (familiar with Java 17) and React 17 (familiar with React 18). Using functional components with hooks. Backend uses Spring Boot with JPA, testing with JUnit 5 and Mockito. Frontend testing with Jest and React Testing Library.`,code:null},{question:`What are ES6 features in JavaScript?`,answer:`ES6 features include: let and const (block-scoped declarations), arrow functions (shorter function syntax), template literals (string interpolation), default parameters, rest and spread operators, destructuring assignment, classes, promises (async operations), modules (import/export), and enhanced object literals.`,code:{language:`java`,content:`// let & const
let x = 10; const y = 20;
// Arrow function
const add = (a, b) => a + b;
// Template literals
const msg = \`Hello \${name}\`;
// Destructuring
const { name, age } = person;
// Spread operator
const newArr = [...oldArr, 4, 5];
// Classes
class User { constructor(name) { this.name = name; } }`}},{question:`Difference between var and let.`,answer:`var is function-scoped and hoisted to the top of its function. let is block-scoped and not hoisted to the top of its block. var can be redeclared, let cannot be redeclared in same scope.`,code:{language:`java`,content:`// var - function scoped
function test() {
    var x = 10;
    if (true) {
        var x = 20; // Same variable
    }
    console.log(x); // 20
}
// let - block scoped
function test() {
    let x = 10;
    if (true) {
        let x = 20; // Different variable
    }
    console.log(x); // 10
}`}},{question:`What is object cloning in JavaScript?`,answer:`Object cloning is the process of creating a copy of an object with the same properties and values. Used to avoid mutating the original object, ensuring data integrity and avoiding side effects in code.`,code:{language:`java`,content:`// Shallow clone
const clone = { ...original };
const clone2 = Object.assign({}, original);
// Deep clone (for nested objects)
const deepClone = JSON.parse(JSON.stringify(original));
// Deep clone with lodash
const deepClone = _.cloneDeep(original);`}},{question:`Write a JavaScript function to count every character in a string.`,answer:`Iterate through string characters, store counts in object.`,code:{language:`java`,content:`function countCharacters(str) {
    const charCount = {};
    for (let char of str) {
        charCount[char] = charCount[char] ? charCount[char] + 1 : 1;
    }
    return charCount;
}
console.log(countCharacters("hello")); // {h:1, e:1, l:2, o:1}`}},{question:`Which version of React are you using?`,answer:`I am using React 17 (familiar with React 18).`,code:null},{question:`Are you using functional components or class components?`,answer:`I am primarily using functional components with React Hooks for state management and side effects.`,code:{language:`java`,content:`// Functional component with hooks
const MyComponent = () => {
    const [state, setState] = useState(initialValue);
    useEffect(() => { /* side effect */ }, []);
    return <div>{state}</div>;
};`}},{question:`What is useRef in React? Explain.`,answer:`useRef is a React hook that creates a mutable object persisting for component lifetime. Can access DOM elements directly or hold mutable values that don't trigger re-renders when changed.`,code:{language:`java`,content:`import React, { useRef, useEffect } from 'react';
const InputFocus = () => {
    const inputRef = useRef(null);
    useEffect(() => {
        inputRef.current.focus();
    }, []);
    return <input ref={inputRef} />;
};`}},{question:`What is a common component in ReactJS?`,answer:`A common component is a reusable piece of UI that can be used across different parts of an application, like buttons, form inputs, modal dialogs, tables, or cards. Promotes consistency and reduces code duplication.`,code:{language:`java`,content:`// Reusable Button component
const Button = ({ onClick, children, variant }) => (
    <button className={\`btn btn-\${variant}\`} onClick={onClick}>
        {children}
    </button>
);`}},{question:`How do you get data from API and display it in UI in ReactJS?`,answer:`Use useState for state management, useEffect for API calls, and axios/fetch for HTTP requests. Handle loading and error states.`,code:{language:`java`,content:`import React, { useState, useEffect } from 'react';
import axios from 'axios';
const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        axios.get('/api/employees')
            .then(response => {
                setEmployees(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    }, []);
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    return (
        <ul>
            {employees.map(emp => (
                <li key={emp.id}>{emp.name} - \${emp.salary}</li>
            ))}
        </ul>
    );
};`}},{question:`Write code to change color of text when data is posted.`,answer:`Use useState to manage color state, change on form submission.`,code:{language:`java`,content:`import React, { useState } from 'react';
const ChangeTextColor = () => {
    const [color, setColor] = useState('black');
    const handleSubmit = (e) => {
        e.preventDefault();
        setColor('blue');
    };
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <button type="submit">Post Data</button>
            </form>
            <div style={{ color: color }}>Text changes color when posted</div>
        </div>
    );
};`}},{question:`Which version of Java are you using?`,answer:`I am using Java 8 and familiar with Java 17 features including Records, Sealed Classes, Pattern Matching, and Text Blocks.`,code:null},{question:`Write a custom exception in Java and use it.`,answer:`Create custom exception by extending Exception or RuntimeException. Use throw to raise it.`,code:{language:`java`,content:`public class CustomException extends Exception {
    public CustomException(String message) {
        super(message);
    }
}
public class TestCustomException {
    public static void main(String[] args) {
        try {
            validateAge(15);
        } catch (CustomException e) {
            e.printStackTrace();
        }
    }
    static void validateAge(int age) throws CustomException {
        if (age < 18) {
            throw new CustomException("Age is not valid");
        }
    }
}`}},{question:`Implement a method to check if a string is present in a list.`,answer:`Use List.contains() method to check presence.`,code:{language:`java`,content:`import java.util.List;
public class StringChecker {
    public static boolean isStringPresent(List<String> list, String str) {
        return list.contains(str);
    }
}`}},{question:`Write Java code to remove repeated strings from a list.`,answer:`Use HashSet to remove duplicates, convert back to list.`,code:{language:`java`,content:`import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class RemoveDuplicates {
    public static List<String> removeDuplicates(List<String> list) {
        Set<String> set = new HashSet<>(list);
        return new ArrayList<>(set);
    }
    // Using streams
    public static List<String> removeDuplicatesStream(List<String> list) {
        return list.stream().distinct().collect(Collectors.toList());
    }
}`}},{question:`Have you used threads in your project?`,answer:`Yes, used threads for concurrent processing like batch operations, async tasks, and parallel data processing. Used ExecutorService for thread pool management.`,code:{language:`java`,content:`ExecutorService executor = Executors.newFixedThreadPool(10);
executor.submit(() -> {
    // Task to execute
});
executor.shutdown();`}},{question:`What is the use of @Transactional annotation in Spring Data?`,answer:`@Transactional manages transactions declaratively. Ensures method runs within a transaction, handles commit/rollback based on execution. Supports propagation, isolation, timeout, and rollback rules.`,code:{language:`java`,content:`@Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.READ_COMMITTED)
public void transferMoney(Account from, Account to, double amount) {
    from.setBalance(from.getBalance() - amount);
    to.setBalance(to.getBalance() + amount);
}`}},{question:`How do you provide security in Spring Boot?`,answer:`Security is provided through Spring Security with authentication, authorization, CSRF protection, and session management. Configured using Java configuration with @EnableWebSecurity and SecurityConfig extending WebSecurityConfigurerAdapter. Implements JWT for stateless authentication.`,code:{language:`java`,content:`@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable()
            .authorizeRequests()
            .antMatchers("/public/**").permitAll()
            .anyRequest().authenticated()
            .and()
            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
    }
}`}},{question:`Explain how JWT token-based authentication works briefly.`,answer:`User logs in with credentials, server validates and generates JWT token (signed with secret). Token sent to client. Client includes token in Authorization header for subsequent requests. Server validates token signature and extracts user info for authentication.`,code:{language:`java`,content:`// Token generation
String token = Jwts.builder()
    .setSubject(username)
    .setIssuedAt(new Date())
    .setExpiration(new Date(System.currentTimeMillis() + 3600000))
    .signWith(SignatureAlgorithm.HS256, SECRET)
    .compact();
// Token validation
Claims claims = Jwts.parser()
    .setSigningKey(SECRET)
    .parseClaimsJws(token)
    .getBody();`}},{question:`How do you limit API calls in Spring Boot?`,answer:`Use rate-limiting libraries like Bucket4j, Resilience4j, or implement custom logic using interceptors or filters. Can also use Spring Cloud Gateway for rate limiting at API gateway level.`,code:{language:`java`,content:`@Component
public class RateLimitInterceptor implements HandlerInterceptor {
    private final Map<String, Integer> requestCounts = new ConcurrentHashMap<>();
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response) {
        String clientIp = request.getRemoteAddr();
        int count = requestCounts.getOrDefault(clientIp, 0);
        if (count >= 100) {
            response.setStatus(HttpStatus.TOO_MANY_REQUESTS.value());
            return false;
        }
        requestCounts.put(clientIp, count + 1);
        return true;
    }
}`}},{question:`Have you created any custom annotations in Spring Boot?`,answer:`Yes, created custom annotations to encapsulate repetitive logic and apply cross-cutting concerns. Used with Spring AOP for logging, validation, and security checks.`,code:{language:`java`,content:`@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface LogExecutionTime { }

@Aspect
@Component
public class LoggingAspect {
    @Around("@annotation(LogExecutionTime)")
    public Object logExecutionTime(ProceedingJoinPoint joinPoint) throws Throwable {
        long start = System.currentTimeMillis();
        Object result = joinPoint.proceed();
        long time = System.currentTimeMillis() - start;
        System.out.println("Method executed in " + time + "ms");
        return result;
    }
}`}},{question:`Create a Age validation custom annotation.`,answer:`Create annotation interface with @Constraint, validator class implementing ConstraintValidator, apply annotation to fields.`,code:{language:`java`,content:`@Documented
@Constraint(validatedBy = DOBValidator.class)
@Target({ ElementType.METHOD, ElementType.FIELD })
@Retention(RetentionPolicy.RUNTIME)
public @interface ValidDOB {
    String message() default "Invalid Date of Birth";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}

public class DOBValidator implements ConstraintValidator<ValidDOB, LocalDate> {
    @Override
    public boolean isValid(LocalDate dob, ConstraintValidatorContext context) {
        if (dob == null) return false;
        return dob.isBefore(LocalDate.now());
    }
}

// Usage
public class User {
    @ValidDOB
    private LocalDate dateOfBirth;
}`}},{question:`Have you used a logger in your Spring Boot project?`,answer:`Yes, used SLF4J with Logback for logging. Implemented logging at different levels (info, debug, warn, error). Logged request/response, exceptions, and business events.`,code:{language:`java`,content:`@Slf4j
@Service
public class UserService {
    public void createUser(User user) {
        log.info("Creating user: {}", user.getUsername());
        try {
            // Business logic
        } catch (Exception e) {
            log.error("Failed to create user", e);
        }
    }
}`}},{question:`How can you see which controller API methods are running?`,answer:`Enable HTTP request logging in Spring Boot using logging.level.web=DEBUG. Use Spring Boot Actuator to see endpoint mappings. Use logging filters to log request/response.`,code:{language:`java`,content:`# application.properties
logging.level.org.springframework.web=DEBUG
logging.level.org.springframework.web.servlet.mvc.method.annotation=DEBUG

# Actuator endpoints
management.endpoints.web.exposure.include=health,info,mappings`}},{question:`How do you create a Spring Boot project?`,answer:`Use Spring Initializr (start.spring.io) to generate project with dependencies. Import into IDE. Add @SpringBootApplication and main method. Run as Spring Boot application.`,code:{language:`java`,content:`@SpringBootApplication
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}`}},{question:`What does Spring Starter provide?`,answer:`Spring Starter provides pre-configured templates for specific functionalities like web, security, JPA, etc. Includes dependencies, auto-configuration, and default settings.`,code:{language:`java`,content:`<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>`}},{question:`Which dependencies do you commonly use in Spring Boot?`,answer:`Common dependencies: spring-boot-starter-web, spring-boot-starter-data-jpa, spring-boot-starter-security, spring-boot-starter-test, spring-boot-starter-validation, spring-boot-devtools, spring-boot-starter-actuator, mysql-connector-java.`,code:{language:`java`,content:`<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jpa</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-security</artifactId>
    </dependency>
</dependencies>`}},{question:`Which annotations do you use in Spring Boot?`,answer:`@SpringBootApplication, @RestController, @RequestMapping, @Autowired, @Service, @Repository, @Entity, @Transactional, @Configuration, @Component, @Value, @Qualifier.`,code:{language:`java`,content:`@SpringBootApplication
@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserService userService;
    @GetMapping("/{id}")
    public User getUser(@PathVariable Long id) {
        return userService.findById(id);
    }
}`}},{question:`Which annotations do you use in JUnit tests?`,answer:`@Test, @BeforeEach, @AfterEach, @Mock, @InjectMocks, @RunWith, @SpringBootTest, @ExtendWith, @DisplayName, @Disabled.`,code:{language:`java`,content:`@ExtendWith(MockitoExtension.class)
class UserServiceTest {
    @Mock
    private UserRepository repository;
    @InjectMocks
    private UserService service;
    @Test
    void testGetUser() {
        when(repository.findById(1L)).thenReturn(Optional.of(new User()));
        User user = service.getUser(1L);
        assertNotNull(user);
    }
}`}},{question:`Which libraries do you use for JUnit tests?`,answer:`JUnit 5, Mockito, Spring Boot Test, AssertJ, Hamcrest, Testcontainers for integration testing.`,code:{language:`java`,content:`<dependency>
    <groupId>org.junit.jupiter</groupId>
    <artifactId>junit-jupiter</artifactId>
    <scope>test</scope>
</dependency>
<dependency>
    <groupId>org.mockito</groupId>
    <artifactId>mockito-core</artifactId>
    <scope>test</scope>
</dependency>`}}]}]}],questionCount:30},"./cognizant/cognizant.js":{id:`cognizant`,name:`Cognizant`,interviews:[{name:`Cognizant Interview`,questionCount:59,rounds:[{name:`First Round - Coding Assessment`,questions:[{question:`Implement a React component that filters a list of transactions based on an input date and sorts the list based on the amount when the amount header is clicked.`,answer:`Create a component with useState for transactions, filterDate, and sortConfig. Use useMemo for filtering and sorting. Render table with clickable header for sorting.`,code:{language:`java`,content:`import React, { useState, useMemo } from 'react';

const TransactionList = ({ transactions }) => {
    const [filterDate, setFilterDate] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: 'amount', direction: 'asc' });

    const filteredAndSorted = useMemo(() => {
        let result = transactions;
        if (filterDate) result = result.filter(t => t.date === filterDate);
        return result.sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
            if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
            return 0;
        });
    }, [transactions, filterDate, sortConfig]);

    const handleSort = (key) => {
        setSortConfig({ key, direction: sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc' });
    };

    return (
        <div>
            <input type="date" onChange={(e) => setFilterDate(e.target.value)} />
            <table>
                <thead><tr><th onClick={() => handleSort('amount')}>Amount</th></tr></thead>
                <tbody>{filteredAndSorted.map(t => <tr key={t.id}><td>{t.amount}</td></tr>)}</tbody>
            </table>
        </div>
    );
};`}},{question:`Implement a Spring Boot application with POST, GET, and DELETE APIs with proper response statuses and layered architecture.`,answer:`Create Spring Boot application with layered architecture: Controller (REST endpoints), Service (business logic), Repository (data access). Use proper HTTP status codes.`,code:{language:`java`,content:`@RestController
@RequestMapping("/api/employees")
public class EmployeeController {
    @Autowired private EmployeeService service;
    @PostMapping public ResponseEntity<Employee> create(@RequestBody Employee emp) { return ResponseEntity.status(HttpStatus.CREATED).body(service.save(emp)); }
    @GetMapping("/{id}") public ResponseEntity<Employee> get(@PathVariable Long id) { return service.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build()); }
    @DeleteMapping("/{id}") public ResponseEntity<Void> delete(@PathVariable Long id) { service.delete(id); return ResponseEntity.noContent().build(); }
}
@Service
public class EmployeeService {
    @Autowired private EmployeeRepository repository;
    public Employee save(Employee emp) { return repository.save(emp); }
    public Optional<Employee> findById(Long id) { return repository.findById(id); }
    public void delete(Long id) { repository.deleteById(id); }
}
@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> { }`}}]},{name:`Technical Round 1 - React`,questions:[{question:`Self Introduction`,answer:`I have 3+ years of experience as a Java Full Stack Developer. Currently working on a banking application using Java 8, Spring Boot, React 17, and MySQL. I handle both frontend and backend development, API design, and deployment.`,code:null},{question:`About your project`,answer:`Working on a customer registration and transaction processing system. Built REST APIs with Spring Boot, frontend with React. Implemented JWT authentication, data validation, and responsive UI.`,code:null},{question:`Explain props in React.`,answer:`Props are short for properties and are used to pass data from one component to another in React. They are read-only and immutable.`,code:{language:`java`,content:`// Parent Component
<User name="John" age={25} />
// Child Component
const User = (props) => <div>{props.name} - {props.age}</div>`}},{question:`How to pass data from child to parent in React.`,answer:`By passing a function as a prop to the child component and then calling that function in the child component with the data you want to pass.`,code:{language:`java`,content:`const Parent = () => {
    const handleData = (data) => console.log(data);
    return <Child onSendData={handleData} />;
};
const Child = ({ onSendData }) => {
    return <button onClick={() => onSendData('Hello Parent')}>Send</button>;
};`}},{question:`How to validate props in React.`,answer:`By using PropTypes, a library for type-checking props.`,code:{language:`java`,content:`import PropTypes from 'prop-types';
const User = ({ name, age }) => <div>{name} - {age}</div>;
User.propTypes = {
    name: PropTypes.string.isRequired,
    age: PropTypes.number
};`}},{question:`Have you used reusable components in React? Give an example.`,answer:`Yes, for example, a Button component that can be used across different parts of an application with different variants.`,code:{language:`java`,content:`const Button = ({ onClick, children, variant = 'primary' }) => (
    <button className={\`btn btn-\${variant}\`} onClick={onClick}>
        {children}
    </button>
);`}},{question:`Explain lazy loading in React.`,answer:`Lazy loading is a technique for delaying the loading of non-critical resources during the initial loading phase. Improves initial load time.`,code:{language:`java`,content:`const LazyComponent = React.lazy(() => import('./HeavyComponent'));
function App() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <LazyComponent />
        </Suspense>
    );
}`}},{question:`What is React.lazy?`,answer:`React.lazy is a function that lets you render a dynamic import as a regular component. It enables code splitting.`,code:{language:`java`,content:`const MyComponent = React.lazy(() => import('./MyComponent'));`}},{question:`What are React fragments?`,answer:`React fragments allow you to group a list of children without adding extra nodes to the DOM.`,code:{language:`java`,content:`return (
    <React.Fragment>
        <h1>Title</h1>
        <p>Content</p>
    </React.Fragment>
);
// Short syntax
return (
    <>
        <h1>Title</h1>
        <p>Content</p>
    </>
);`}},{question:`Difference between fragment and div tag in React.`,answer:`A fragment does not add an extra node to the DOM, whereas a div does. Using div adds unnecessary DOM nodes.`,code:null},{question:`Which hooks have you used in React?`,answer:`useState, useEffect, useContext, useReducer, useCallback, useMemo, useRef, useLayoutEffect.`,code:null},{question:`Explain useCallback hook.`,answer:`useCallback returns a memoized callback function that only changes if one of its dependencies changes. Prevents unnecessary re-renders.`,code:{language:`java`,content:`const memoizedCallback = useCallback(() => {
    doSomething(a, b);
}, [a, b]);`}},{question:`Explain useEffect.`,answer:`useEffect is a hook that runs side effects in function components. Used for data fetching, direct DOM updates, subscriptions, etc.`,code:{language:`java`,content:`useEffect(() => {
    // Side effect code
    fetchData();
    return () => {
        // Cleanup
    };
}, [dependency]);`}},{question:`What is a dependency array in useEffect?`,answer:`The dependency array in useEffect specifies when the effect should be re-run based on changes in the array items. Empty array means run once.`,code:{language:`java`,content:`useEffect(() => { /* Runs when dependency changes */ }, [dependency]);
useEffect(() => { /* Runs once on mount */ }, []);`}},{question:`How do you call APIs in React?`,answer:`By using fetch, axios, or other HTTP client libraries within a useEffect hook or event handler.`,code:{language:`java`,content:`useEffect(() => {
    axios.get('/api/users')
        .then(response => setUsers(response.data))
        .catch(error => setError(error.message));
}, []);`}},{question:`What do you use for state management in React?`,answer:`useState for local state, useReducer for complex state, Context API for global state, and Redux for application-wide state management.`,code:null},{question:`What is Context API in React?`,answer:`The Context API provides a way to pass data through the component tree without having to pass props down manually at every level. Used for global state like theme, user authentication.`,code:{language:`java`,content:`const ThemeContext = React.createContext('light');
function App() {
    return (
        <ThemeContext.Provider value="dark">
            <Child />
        </ThemeContext.Provider>
    );
}
function Child() {
    const theme = useContext(ThemeContext);
    return <div>{theme}</div>;
}`}},{question:`Do you know Redux?`,answer:`Yes, Redux is a state management library for JavaScript applications. Manages application state in a predictable way using actions, reducers, and store.`,code:{language:`java`,content:`const increment = () => ({ type: 'INCREMENT' });
const counter = (state = 0, action) => {
    switch(action.type) {
        case 'INCREMENT': return state + 1;
        default: return state;
    }
};
const store = createStore(counter);`}},{question:`How do you memorize in React?`,answer:`By using useMemo and useCallback hooks to memoize values and functions. React.memo for component memoization.`,code:{language:`java`,content:`const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
const MemoizedComponent = React.memo(MyComponent);`}},{question:`What is callback hell in React?`,answer:`Callback hell refers to deeply nested callbacks within other callbacks, leading to difficult-to-read and maintain code. Solved using Promises and async/await.`,code:null},{question:`How do you handle errors in ReactJS?`,answer:`Using try-catch blocks in async functions, error boundaries for component errors, and error handling in promises with .catch().`,code:{language:`java`,content:`class ErrorBoundary extends React.Component {
    componentDidCatch(error, info) {
        // Log error
    }
    render() { return this.props.children; }
}`}},{question:`If displaying employee data and employee is null, how to handle it?`,answer:`Using conditional rendering to check if employee data is null before attempting to display it.`,code:{language:`java`,content:`return (
    <div>
        {employee ? (
            <div>{employee.name} - {employee.salary}</div>
        ) : (
            <div>No employee data</div>
        )}
    </div>
);`}}]},{name:`Technical Round 2 - Java & Spring`,questions:[{question:`What are the new features in Java 8?`,answer:`Lambda expressions, functional interfaces, Stream API, new Date and Time API (java.time), Optional class, default methods in interfaces, method references.`,code:null},{question:`Write a code to display today's date and the date one month before using Java 8 features.`,answer:`Use LocalDate class with now() and minusMonths() methods.`,code:{language:`java`,content:`import java.time.LocalDate;
public class DateExample {
    public static void main(String[] args) {
        LocalDate today = LocalDate.now();
        LocalDate oneMonthBefore = today.minusMonths(1);
        System.out.println("Today: " + today);
        System.out.println("One Month Before: " + oneMonthBefore);
    }
}`}},{question:`Write code to display age difference using the Period class.`,answer:`Use Period.between() to calculate difference between two dates.`,code:{language:`java`,content:`import java.time.LocalDate;
import java.time.Period;
public class AgeDifference {
    public static void main(String[] args) {
        LocalDate birthDate = LocalDate.of(1990, 1, 1);
        LocalDate today = LocalDate.now();
        Period age = Period.between(birthDate, today);
        System.out.println("Age: " + age.getYears() + " years, " + age.getMonths() + " months, " + age.getDays() + " days.");
    }
}`}},{question:`What is a functional interface in Java?`,answer:`A functional interface is an interface with exactly one abstract method, which can be used as a target for lambda expressions and method references.`,code:{language:`java`,content:`@FunctionalInterface
interface MyFunctionalInterface {
    int sum(int a, int b);
}`}},{question:`Write a custom functional interface.`,answer:`Create an interface with @FunctionalInterface annotation and one abstract method.`,code:{language:`java`,content:`@FunctionalInterface
public interface StringConcatenator {
    String concatenate(String a, String b);
}
StringConcatenator concat = (a, b) -> a + b;
String result = concat.concatenate("Hello ", "World"); // Hello World`}},{question:`What are streams in Java?`,answer:`Streams represent a sequence of elements supporting sequential and parallel aggregate operations. Used for processing collections with functional operations.`,code:{language:`java`,content:`List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);
int sum = numbers.stream().filter(n -> n % 2 == 0).mapToInt(n -> n).sum();`}},{question:`Find the first non-repeated character using streams.`,answer:`Use groupingBy with LinkedHashMap to maintain order, filter count 1, find first.`,code:{language:`java`,content:`String input = "swiss";
Character result = input.chars()
    .mapToObj(c -> (char) c)
    .collect(Collectors.groupingBy(Function.identity(), LinkedHashMap::new, Collectors.counting()))
    .entrySet().stream()
    .filter(entry -> entry.getValue() == 1)
    .map(Map.Entry::getKey)
    .findFirst().orElse(null);
System.out.println("First non-repeated: " + result); // w`}},{question:`Given two arrays arr1 = [4,2,3,4,6] and arr2 = [6,8,2], output distinct array [2,3,4,6,8].`,answer:`Use TreeSet to merge and sort distinct elements.`,code:{language:`java`,content:`Integer[] arr1 = {4, 2, 3, 4, 6};
Integer[] arr2 = {6, 8, 2};
Set<Integer> resultSet = new TreeSet<>(Arrays.asList(arr1));
resultSet.addAll(Arrays.asList(arr2));
System.out.println(resultSet); // [2, 3, 4, 6, 8]`}},{question:`What is Spring Boot?`,answer:`Spring Boot is a framework for building production-ready Spring applications quickly with convention over configuration, embedded servers, and auto-configuration.`,code:null},{question:`What are the basic annotations in Spring Boot?`,answer:`@SpringBootApplication, @RestController, @RequestMapping, @Autowired, @Service, @Repository, @Component, @Configuration, @Value.`,code:null},{question:`What is Spring Security?`,answer:`Spring Security is a framework that focuses on providing authentication and authorization to Spring applications. Protects against common security threats.`,code:null},{question:`Difference between @Component and @Bean?`,answer:`@Component is used to denote a class as a Spring component (auto-detected). @Bean is used to declare a bean inside a configuration class (explicit declaration).`,code:{language:`java`,content:`@Component
public class MyComponent { }
@Configuration
public class Config {
    @Bean
    public MyBean myBean() { return new MyBean(); }
}`}},{question:`Difference between @Primary and @Qualifier?`,answer:`@Primary gives higher preference to a bean when multiple beans exist. @Qualifier specifies which bean to inject at the injection point.`,code:{language:`java`,content:`@Primary
@Component
public class PrimaryBean { }
@Component
@Qualifier("secondary")
public class SecondaryBean { }`}},{question:`Difference between @Controller and @RestController?`,answer:`@Controller is used for traditional MVC controllers returning views. @RestController combines @Controller and @ResponseBody, returning JSON/XML responses directly.`,code:null},{question:`What is the @Transactional annotation in Spring?`,answer:`@Transactional defines the scope of a single database transaction. Ensures all operations complete successfully before commit, rolls back on errors.`,code:{language:`java`,content:`@Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.READ_COMMITTED)
public void transferMoney(Account from, Account to, double amount) {
    from.setBalance(from.getBalance() - amount);
    to.setBalance(to.getBalance() + amount);
}`}}]},{name:`Final Round - React & Project`,questions:[{question:`Explain your experience in React projects and the components you have worked on.`,answer:`Worked on several React projects including banking applications. Focused on user registration, transaction handling, forms, modals, tables, and custom reusable components.`,code:null},{question:`What is the purpose of Context API?`,answer:`Context API shares data across the component tree without passing props manually at every level. Used for global state like user authentication, themes, settings.`,code:null},{question:`How do you validate data and which components have you used?`,answer:`Use Formik for form state management and Yup for schema validation. Validates on change, blur, and submit.`,code:{language:`java`,content:`const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(6, 'Too short').required('Required')
});`}},{question:`How do you test your React components?`,answer:`Use Jest and React Testing Library for unit and integration tests. Test component rendering, user interactions, and state changes.`,code:{language:`java`,content:`import { render, screen, fireEvent } from '@testing-library/react';
test('button click changes text', () => {
    render(<MyComponent />);
    fireEvent.click(screen.getByText('Click me'));
    expect(screen.getByText('Clicked')).toBeInTheDocument();
});`}},{question:`How do you improve performance in your components?`,answer:`Use React.memo for component memoization, useCallback/useMemo for function/value memoization, lazy loading with React.lazy, and efficient state management.`,code:null},{question:`What is the difference between state and props in React?`,answer:`state is mutable data managed within a component using useState. props are read-only data passed from parent to child components. props are immutable.`,code:null}]},{name:`Ford Motor Client Interview`,questions:[{question:`Given String 'Win Win!!! You have got a lottery', write Java program using stream to classify as Spam or Not Spam.`,answer:`Count occurrences of 'win' and 'lottery'. If count <= 2.5, classify as 'Not Spam', else 'Spam'.`,code:{language:`java`,content:`import java.util.Arrays;
public class SpamChecker {
    public static void main(String[] args) {
        String st = "Win Win!!! You have got a lottery";
        long ans = Arrays.stream(st.toLowerCase().split("\\\\s+"))
            .map(word -> word.replaceAll("[^a-zA-Z]", ""))
            .filter(e -> e.equals("win") || e.equals("lottery"))
            .count();
        String result = ans <= 2.5 ? "Not Spam" : "Spam";
        System.out.println(result); // Not Spam
    }
}`}},{question:`Is count a terminal operator or intermediate operator in Java Streams?`,answer:`count is a terminal operator. It triggers processing of the stream and produces a result.`,code:null},{question:`What is upcasting and downcasting in Java?`,answer:`Upcasting: Converting subclass to superclass (implicit, safe). Downcasting: Converting superclass to subclass (explicit, requires cast, can throw ClassCastException).`,code:{language:`java`,content:`Dog dog = new Dog();
Animal animal = dog; // Upcasting
Animal animal2 = new Dog();
Dog dog2 = (Dog) animal2; // Downcasting`}},{question:`For a music player where you want to add and remove songs in middle, which collection is suitable?`,answer:`LinkedList is suitable for frequent insertions/deletions in the middle. O(1) time complexity for insertion/deletion if reference available.`,code:{language:`java`,content:`LinkedList<String> playlist = new LinkedList<>();
playlist.add("Song1");
playlist.add(1, "Song2"); // Insert at middle
playlist.remove(1); // Remove from middle`}},{question:`Difference between map and flatMap in Java Streams.`,answer:`map transforms each element to another object (one-to-one). flatMap transforms each element to a stream and flattens (one-to-many).`,code:{language:`java`,content:`list.stream().map(String::toUpperCase)
list.stream().flatMap(Collection::stream)`}},{question:`What are fail-fast and fail-safe iterators?`,answer:`Fail-fast throw ConcurrentModificationException if collection modified during iteration. Fail-safe work on clone, don't throw exceptions.`,code:null},{question:`How would you design table structures for customer with multiple orders, each order with multiple products?`,answer:`Create Customer, Product, Order, and OrderProduct (junction) tables.`,code:{language:`java`,content:`CREATE TABLE Customer (
    customer_id INT PRIMARY KEY,
    customer_name VARCHAR(100)
);
CREATE TABLE Product (
    product_id INT PRIMARY KEY,
    product_name VARCHAR(100),
    price DECIMAL
);
CREATE TABLE \`Order\` (
    order_id INT PRIMARY KEY,
    customer_id INT,
    order_date DATE,
    FOREIGN KEY (customer_id) REFERENCES Customer(customer_id)
);
CREATE TABLE OrderProduct (
    order_id INT,
    product_id INT,
    quantity INT,
    PRIMARY KEY (order_id, product_id),
    FOREIGN KEY (order_id) REFERENCES \`Order\`(order_id),
    FOREIGN KEY (product_id) REFERENCES Product(product_id)
);`}},{question:`Given Spring Boot code with multiple Filter implementations, will it work?`,answer:`No, Spring cannot resolve which Filter bean to inject. Need @Qualifier to specify.`,code:{language:`java`,content:`@Component
public class Controller {
    @Autowired
    @Qualifier("abc")
    private Filter filter;
}
@Component("abc")
public class Abc implements Filter { }
@Component("abc1")
public class Abc1 implements Filter { }`}},{question:`What is Mono and Flux in WebClient?`,answer:`Mono represents a single asynchronous value. Flux represents a stream of 0 to N asynchronous values.`,code:{language:`java`,content:`Mono<User> user = webClient.get().uri("/users/1").retrieve().bodyToMono(User.class);
Flux<User> users = webClient.get().uri("/users").retrieve().bodyToFlux(User.class);`}},{question:`What is a Kafka server?`,answer:`Apache Kafka is a distributed event streaming platform for building real-time data pipelines and streaming applications.`,code:null},{question:`What is debouncing in JavaScript?`,answer:`Debouncing limits the rate at which a function is executed. Ensures function is not called repeatedly in quick succession.`,code:{language:`java`,content:`function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}`}}]},{name:`HR Round`,questions:[{question:`Tell me about yourself.`,answer:`I have 3+ years of experience as a Java Full Stack Developer. Expertise in Java, Spring Boot, React, and Microservices. Worked on banking applications and customer registration systems.`,code:null},{question:`Why do you want to join Cognizant?`,answer:`Cognizant is a global leader with strong reputation for innovation. Excited about the opportunity to work on challenging projects and grow professionally.`,code:null},{question:`What are your salary expectations?`,answer:`Based on my experience and market standards, I'm looking for a competitive package. Happy to discuss further.`,code:null}]}]}],questionCount:59},"./contus-tech-walk-in/contustech.js":{id:`contus-tech-walk-in`,name:`ContusTech (walk_in)`,interviews:[{name:`ContusTech (walk_in) Interview`,questionCount:47,rounds:[{name:`Coding Round`,questions:[{question:`Implement a Spring Boot application: REST API to list employees with pagination, sorted by age in descending order.`,answer:'Full Spring Boot app: Entity → Repository → Service → Controller.\n- Entity: `Employee` with id, name, age.\n- Repository: extends JpaRepository, so `findAll(Pageable)` works out of the box.\n- Service: builds a `PageRequest` with `Sort.by("age").descending()` and returns `Page<Employee>`.\n- Controller: `GET /api/employees?page=0&size=10` returns the page of employees.\n- Also supports dynamic sorting via `?sort=age,desc` since Spring resolves `Pageable` directly from query params.',code:{language:`java`,content:`// ===== Employee.java =====
@Entity
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private int age;
    // getters / setters
}

// ===== EmployeeRepository.java =====
@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    // findAll(Pageable) is inherited from JpaRepository
    // and applies Pageable's Sort automatically.
}

// ===== EmployeeService.java =====
@Service
public class EmployeeService {
    @Autowired
    private EmployeeRepository repository;

    public Page<Employee> listEmployees(int page, int size) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by("age").descending());
        return repository.findAll(pageRequest);
    }
}

// ===== EmployeeController.java =====
@RestController
@RequestMapping("/api/employees")
public class EmployeeController {
    @Autowired
    private EmployeeService service;

    // GET /api/employees?page=0&size=10
    @GetMapping
    public Page<Employee> listEmployees(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return service.listEmployees(page, size);
    }
}

// Example request:  GET /api/employees?page=0&size=10  → employees sorted by age (highest first)`}}]},{name:`Technical Round - Java`,questions:[{question:"What is the purpose of the `intern` method in Java?",answer:`The intern method ensures that all instances of a string with the same content share the same memory location. It returns a canonical representation of the string, which is useful for memory optimization and string comparison.`,code:{language:`java`,content:`String s1 = new String("Hello");
String s2 = s1.intern();
String s3 = "Hello";
System.out.println(s2 == s3); // true`}},{question:"Explain the internal working process of `HashMap`.",answer:`HashMap uses a hash table to store key-value pairs. It calculates a hash code for each key and uses it to determine the index in an internal array. Collisions are handled using linked lists (or balanced trees in Java 8+). When the load factor exceeds 0.75, the map is resized and rehashed.`,code:{language:`java`,content:`// Internal working
// 1. hash = key.hashCode()
// 2. index = hash & (n-1)
// 3. If collision, add to linked list/tree
// 4. When size > threshold (load factor * capacity), resize`}},{question:`What is the difference between mutable and immutable objects?`,answer:`Mutable objects can be changed after they are created (e.g., ArrayList, StringBuilder). Immutable objects cannot be changed after creation (e.g., String, Integer).`,code:{language:`java`,content:`// Mutable
StringBuilder sb = new StringBuilder("Hello");
sb.append(" World"); // Modified

// Immutable
String s = "Hello";
s.concat(" World"); // New object created, s unchanged`}},{question:"Why is `String` immutable in Java?",answer:`String is immutable for: 1) Security - prevents modification of sensitive data, 2) Thread-safety - immutable objects are inherently safe, 3) Performance - allows string pooling and caching, 4) Hashcode caching - hashcode is calculated once.`,code:null},{question:"How can you create a mutable `String`?",answer:`Use StringBuilder (not thread-safe, faster) or StringBuffer (thread-safe, slower) which are mutable versions of String.`,code:{language:`java`,content:`StringBuilder sb = new StringBuilder("Hello");
sb.append(" World");
String result = sb.toString(); // "Hello World"

StringBuffer sbf = new StringBuffer("Hello");
sbf.append(" World"); // Thread-safe`}},{question:`What is a marker interface?`,answer:`A marker interface is an interface with no methods or fields. It is used to indicate or mark a class for a specific purpose. Examples: Serializable, Cloneable, Remote.`,code:{language:`java`,content:`public interface Serializable {
    // No methods - just a marker
}

public class MyClass implements Serializable {
    // This class can be serialized
}`}},{question:`What is a functional interface?`,answer:`A functional interface has exactly one abstract method and may have multiple default or static methods. It is used as a target for lambda expressions and method references.`,code:{language:`java`,content:`@FunctionalInterface
public interface MyFunctionalInterface {
    void doSomething(); // Single abstract method
}

MyFunctionalInterface func = () -> System.out.println("Hello");`}},{question:`What happens if a class contains two methods with the same name?`,answer:`If methods have different parameter lists, it is method overloading (allowed). If methods have the same parameter list, it causes a compilation error (duplicate method).`,code:{language:`java`,content:`// Method Overloading - Valid
class Example {
    void display() { }
    void display(String s) { }
    void display(int i) { }
}

// Duplicate method - Compilation Error
class Example2 {
    void display() { }
    void display() { } // Error: Duplicate method
}`}},{question:`What is a default method in Java?`,answer:`A default method in an interface provides a default implementation. It allows you to add new methods to interfaces without breaking existing implementations. Introduced in Java 8.`,code:{language:`java`,content:`public interface MyInterface {
    default void defaultMethod() {
        System.out.println("Default method implementation");
    }
}

class MyClass implements MyInterface {
    // Can use default method or override it
}`}},{question:`How can we access an instance variable inside a static method?`,answer:`Instance variables cannot be accessed directly from static methods because they belong to instances. You need to create an instance of the class to access them.`,code:{language:`java`,content:`public class MyClass {
    private int instanceVar = 10;

    public static void staticMethod() {
        MyClass obj = new MyClass();
        System.out.println(obj.instanceVar); // Access via instance
    }
}`}},{question:`Explain the concept of a linked list`,answer:`A linked list is a data structure where each element (node) contains data and a reference to the next node. Types: Singly linked (one direction) and Doubly linked (both directions). Allows efficient insertion and deletion operations.`,code:{language:`java`,content:`class Node {
    int data;
    Node next;

    Node(int data) {
        this.data = data;
        this.next = null;
    }
}`}},{question:"What is the difference between `LinkedList` and `ArrayList` in Java?",answer:`ArrayList is backed by a dynamic array - O(1) for access, O(n) for insertions/deletions. LinkedList is backed by a doubly linked list - O(n) for access, O(1) for insertions/deletions (if position known).`,code:{language:`java`,content:`// ArrayList - Best for frequent access
ArrayList<Integer> list1 = new ArrayList<>();

// LinkedList - Best for frequent insertions/deletions
LinkedList<Integer> list2 = new LinkedList<>();`}}]},{name:`Technical Round - Spring Boot`,questions:[{question:`How to use two different databases in a single Spring Boot project?`,answer:`Configure multiple DataSource beans and specify database details in application.properties. Use @Primary annotation to mark the default DataSource.`,code:{language:`java`,content:`@Bean
@Primary
@ConfigurationProperties(prefix = "spring.datasource.primary")
public DataSource primaryDataSource() {
    return DataSourceBuilder.create().build();
}

@Bean
@ConfigurationProperties(prefix = "spring.datasource.secondary")
public DataSource secondaryDataSource() {
    return DataSourceBuilder.create().build();
}

// application.properties
spring.datasource.primary.url=jdbc:mysql://localhost/db1
spring.datasource.secondary.url=jdbc:mysql://localhost/db2`}},{question:`How to handle exceptions in Spring Boot?`,answer:`Use @ControllerAdvice to handle exceptions globally. Create methods with @ExceptionHandler to handle specific exceptions.`,code:{language:`java`,content:`@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleException(Exception ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<String> handleNotFound(ResourceNotFoundException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
    }
}`}},{question:"How to handle a `NullPointerException` in Spring Boot?",answer:`Use @ExceptionHandler within a @ControllerAdvice to catch NullPointerException and return an appropriate response.`,code:{language:`java`,content:`@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(NullPointerException.class)
    public ResponseEntity<String> handleNullPointerException(NullPointerException ex) {
        return new ResponseEntity<>("Null pointer exception occurred", HttpStatus.BAD_REQUEST);
    }
}`}},{question:`How to fetch a list of DTO data?`,answer:`Use a repository method with a JPQL constructor expression to fetch data and map it to DTOs.`,code:{language:`java`,content:`@Repository
public interface MyRepository extends JpaRepository<MyEntity, Long> {
    @Query("SELECT new com.example.dto.MyDTO(e.field1, e.field2) FROM MyEntity e")
    List<MyDTO> fetchAllDTOs();
}

// DTO Class
public class MyDTO {
    private String field1;
    private String field2;
    public MyDTO(String field1, String field2) {
        this.field1 = field1;
        this.field2 = field2;
    }
}`}},{question:`How to provide access to a third-party client in Spring Boot?`,answer:`Use OAuth2 or JWT for authentication. Configure security settings to handle access tokens and permissions. Use @EnableOAuth2Client or configure JWT filters.`,code:{language:`java`,content:`@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.oauth2Login()
            .and()
            .authorizeHttpRequests()
            .requestMatchers("/public/**").permitAll()
            .anyRequest().authenticated();
        return http.build();
    }
}`}},{question:`How to enable CORS and where do you write the logic?`,answer:`Use @CrossOrigin annotation on controllers or configure it globally using WebMvcConfigurer.`,code:{language:`java`,content:`// Method 1: Controller level
@CrossOrigin(origins = "http://example.com")
@RestController
public class MyController { }

// Method 2: Global configuration
@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
            .allowedOrigins("http://example.com")
            .allowedMethods("GET", "POST", "PUT", "DELETE");
    }
}`}},{question:`What is the difference between JWT and OAuth?`,answer:`JWT (JSON Web Token) is a token format used for securely transmitting information between parties. OAuth is an authorization framework that uses tokens (like JWT) for securing API access. JWT is a token type, OAuth is an authorization protocol.`,code:null},{question:`Explain the internal working process of JWT`,answer:`JWT consists of three parts: Header (algorithm), Payload (claims), Signature (created using secret key). Header and Payload are base64-encoded and combined with signature to form the token. Used for stateless authentication.`,code:{language:`java`,content:`// JWT Structure
// Header: {"alg": "HS256", "typ": "JWT"}
// Payload: {"sub": "user123", "exp": 1234567890}
// Signature: HMACSHA256(base64UrlEncode(header) + "." + base64UrlEncode(payload), secret)
// Token: header.payload.signature`}},{question:`What is Spring Security?`,answer:`Spring Security is a framework that provides comprehensive security services for Java applications, including authentication (who you are), authorization (what you can do), and protection against common security vulnerabilities.`,code:null},{question:`What is the use of beans and where do you use them in your application?`,answer:`Beans are managed objects within the Spring container. They are used for dependency injection and are configured in the application context. Used in Controllers, Services, Repositories, Configuration classes.`,code:{language:`java`,content:`@Bean
public MyService myService() {
    return new MyService();
}

// Or use @Component
@Component
public class MyService {
    // Business logic
}`}},{question:`What is the difference between @Component, @Service, @Repository, and @Controller?`,answer:`@Component: Generic stereotype for any Spring-managed component. @Service: Specialized component for service layer logic. @Repository: Specialized component for data access logic (translates exceptions). @Controller: Specialized component for web controllers handling HTTP requests.`,code:{language:`java`,content:`@Component
public class MyComponent { }

@Service
public class MyService { }

@Repository
public class MyRepository { }

@Controller
public class MyController { }`}},{question:`If you use @Service in place of @Controller, will it work?`,answer:`It will work technically but is not recommended. @Service is for service layer beans, while @Controller is for handling web requests. Using @Service for a controller will not handle web request mapping properly.`,code:{language:`java`,content:`// Not recommended - Controller should use @Controller
@Service
public class UserController {
    @GetMapping("/users")
    public List<User> getUsers() { }
}

// Correct approach
@RestController
public class UserController {
    @GetMapping("/users")
    public List<User> getUsers() { }
}`}},{question:`What are the different types of Spring Security?`,answer:`Types include: Basic Authentication (username/password), Form-based Authentication (login form), OAuth2 (authorization framework), JWT-based Authentication (stateless token), LDAP Authentication.`,code:null},{question:`Where are you validating the JWT token in your project?`,answer:`JWT tokens are validated in a custom filter (JwtAuthenticationFilter) that extends OncePerRequestFilter or within the security configuration class using JWT utility methods.`,code:{language:`java`,content:`public class JwtAuthenticationFilter extends OncePerRequestFilter {
    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                   HttpServletResponse response,
                                   FilterChain chain) {
        String token = extractToken(request);
        if (jwtUtil.validateToken(token)) {
            // Set authentication
        }
        chain.doFilter(request, response);
    }
}`}},{question:`What architecture are you using to develop your project?`,answer:`Microservices architecture with multiple services (User Service, Order Service, Payment Service). Uses API Gateway for routing, Eureka for service discovery, and Kafka for async communication. Alternatively, Layered Architecture (Controller-Service-Repository).`,code:null},{question:`How to sort a list of data based on a field using JPA inbuilt methods?`,answer:`Use JpaRepository methods with Sort parameter.`,code:{language:`java`,content:`// In Repository
List<MyEntity> findAll(Sort sort);

// In Service
List<MyEntity> entities = repository.findAll(Sort.by("fieldName").ascending());
List<MyEntity> entities = repository.findAll(Sort.by("fieldName").descending());
// Multiple fields
Sort.by("field1").ascending().and(Sort.by("field2").descending())`}},{question:`How to fetch and sort a list of DTO data in Spring Boot?`,answer:`Use repository methods with sorting options or fetch data and sort manually in service layer.`,code:{language:`java`,content:`@Query("SELECT new com.example.dto.MyDTO(e.field1, e.field2) FROM MyEntity e ORDER BY e.field1")
List<MyDTO> fetchAndSortDTOs();

// Or in service
List<MyDTO> dtos = repository.fetchAllDTOs();
Collections.sort(dtos, (d1, d2) -> d1.getField1().compareTo(d2.getField1()));`}}]},{name:`Final Round - Tools, Databases & Project`,questions:[{question:`What tools have you used in your project?`,answer:`Git for version control, Jenkins for CI/CD, JIRA for task management, Docker for containerization, SonarQube for code quality, Maven/Gradle for build management.`,code:null},{question:`Which database did you use in your project?`,answer:`We used PostgreSQL as our primary database due to its robustness and support for complex queries. Also used Redis for caching.`,code:null},{question:`How did you implement JWT authentication in your project?`,answer:`We implemented JWT authentication by creating a JWT token on user login, which includes user roles and expiration time. The token is then verified with each API request using a JWT filter in our Spring Boot application.`,code:{language:`java`,content:`@PostMapping("/login")
public ResponseEntity<String> login(@RequestBody LoginRequest request) {
    String token = jwtUtil.generateToken(user.getUsername(), user.getRoles());
    return ResponseEntity.ok(token);
}

public class JwtAuthenticationFilter extends OncePerRequestFilter {
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) {
        String token = extractToken(request);
        if (token != null && jwtUtil.validateToken(token)) {
            Authentication auth = jwtUtil.getAuthentication(token);
            SecurityContextHolder.getContext().setAuthentication(auth);
        }
        chain.doFilter(request, response);
    }
}`}},{question:`How did you configure two different databases in your Spring Boot project?`,answer:`Configured separate DataSource beans for each database. Used @Primary annotation to specify the primary data source. Configured entity managers and transaction managers for each database.`,code:{language:`java`,content:`@Configuration
public class DatabaseConfig {
    @Bean
    @Primary
    @ConfigurationProperties(prefix = "spring.datasource.primary")
    public DataSource primaryDataSource() {
        return DataSourceBuilder.create().build();
    }
    @Bean
    @ConfigurationProperties(prefix = "spring.datasource.secondary")
    public DataSource secondaryDataSource() {
        return DataSourceBuilder.create().build();
    }
    @Bean
    @Primary
    public PlatformTransactionManager primaryTransactionManager() {
        return new JpaTransactionManager(primaryEntityManagerFactory().getObject());
    }
}`}},{question:`Who provided the database structure in your project?`,answer:`The database structure was provided by our database architect, and the development team collaborated to finalize and optimize it using tools like DB Diagrams and Flyway for migration.`,code:null},{question:`How were tasks assigned and managed in your project on a weekly basis?`,answer:`Tasks were assigned and managed using JIRA. Each week, we conducted sprint planning meetings to assign tasks and track progress through daily stand-ups and weekly sprint reviews.`,code:null},{question:`How did you implement an API gateway in your microservices architecture?`,answer:`We implemented an API gateway using Spring Cloud Gateway, which routes requests to the appropriate microservices and handles cross-cutting concerns like authentication, rate limiting, and logging.`,code:{language:`java`,content:`spring:
  cloud:
    gateway:
      routes:
        - id: user-service
          uri: lb://USER-SERVICE
          predicates:
            - Path=/api/users/**
          filters:
            - name: CircuitBreaker
              args:
                name: userService
                fallbackUri: forward:/fallback/users
        - id: order-service
          uri: lb://ORDER-SERVICE
          predicates:
            - Path=/api/orders/**`}},{question:`How did you configure different services in the API gateway?`,answer:`Configured different services in the API gateway using route definitions in the application.yml file, specifying the paths and service URLs. Used service discovery (Eureka) for dynamic service location.`,code:{language:`java`,content:`spring:
  cloud:
    gateway:
      discovery:
        locator:
          enabled: true
          lower-case-service-id: true
      routes:
        - id: product-service
          uri: lb://PRODUCT-SERVICE
          predicates:
            - Path=/api/products/**
        - id: payment-service
          uri: lb://PAYMENT-SERVICE
          predicates:
            - Path=/api/payments/**`}},{question:`What is an Eureka Server?`,answer:`Eureka Server is a service registry used in microservices architecture for service discovery, allowing services to find and communicate with each other without hardcoding their locations.`,code:{language:`java`,content:`@SpringBootApplication
@EnableEurekaServer
public class EurekaServerApplication {
    public static void main(String[] args) {
        SpringApplication.run(EurekaServerApplication.class, args);
    }
}

eureka:
  client:
    register-with-eureka: false
    fetch-registry: false`}},{question:`How do you handle simultaneous requests from multiple users, and who determines request preference?`,answer:`Using load balancers to distribute traffic across multiple instances. Request preference is determined based on priority of the request and available resources.`,code:{language:`java`,content:`@LoadBalanced
@Bean
public RestTemplate restTemplate() {
    return new RestTemplate();
}

@Service
public class UserService {
    public User getUser(Long id) {
        return restTemplate.getForObject("http://USER-SERVICE/users/" + id, User.class);
    }
}`}},{question:`What does a Kafka server do?`,answer:`A Kafka server is used for real-time data streaming and message brokering, allowing microservices to communicate asynchronously and handle large volumes of data efficiently.`,code:{language:`java`,content:`@Autowired
private KafkaTemplate<String, String> kafkaTemplate;

public void publishOrder(Order order) {
    kafkaTemplate.send("order-topic", order.toString());
}

@KafkaListener(topics = "order-topic", groupId = "order-group")
public void consumeOrder(String message) {
    // Process order
}`}},{question:`How do you handle simultaneous requests from a large number of users?`,answer:`Using a combination of load balancing, caching (Redis), and scalable microservices architecture to ensure high availability and performance. Also use auto-scaling and horizontal scaling.`,code:null},{question:`What issues did you recently encounter with Swagger, and how did you resolve them?`,answer:`Issues with Swagger not displaying certain endpoints correctly. Resolved by ensuring all controllers were properly annotated and updating Swagger configuration to correctly scan all packages.`,code:{language:`java`,content:`@Configuration
public class SwaggerConfig {
    @Bean
    public Docket api() {
        return new Docket(DocumentationType.SWAGGER_2)
            .select()
            .apis(RequestHandlerSelectors.basePackage("com.example.controller"))
            .paths(PathSelectors.any())
            .build();
    }
}`}},{question:`How do you upgrade your project, and what technologies are used for upgrading?`,answer:`Following continuous integration and deployment pipeline using Jenkins and Docker. Thorough testing and feature toggles for smooth rollouts. Version upgrades managed through Maven/Gradle.`,code:null},{question:`What are some issues you faced in your project, and how did you overcome them?`,answer:`Database performance under high load - optimized queries, indexed critical fields, used caching mechanisms. API response time - implemented parallel calls using WebClient. Duplicate events - implemented idempotency.`,code:null},{question:`Have you worked with Log4j? If so, what was your experience?`,answer:`Yes, worked with Log4j for logging in Spring Boot applications. Effective in providing configurable logging levels and formats. Used for debugging, monitoring, and error tracking.`,code:{language:`java`,content:`logging.level.com.example=DEBUG
logging.pattern.console=%d{yyyy-MM-dd HH:mm:ss} - %msg%n

@Slf4j
@Service
public class MyService {
    public void process() {
        log.info("Processing started");
        log.debug("Request: {}", request);
        log.error("Error occurred", ex);
    }
}`}}]},{name:`HR Round`,questions:[{question:`HR Round - Discussion topics to prepare`,answer:`Be prepared to discuss the following topics in the HR round:

- Self Introduction (your background, current role, and key projects)
- Current Location and relocation preferences
- Salary Expectations (current CTC, expected CTC, and other compensation)
- Notice Period and earliest joining date
- Why ContusTech? (what attracted you to apply)
- Career Goals (where you see yourself in 3-5 years)
- Strengths and Weaknesses (with concrete examples)
- Teamwork Experience (collaboration, conflict resolution, and team successes)

Be honest, specific, and concise in your responses. Prepare 1-2 STAR (Situation, Task, Action, Result) examples for behavioral questions.`,code:null}]}]}],questionCount:47},"./datanimbus/datanimbus.js":{id:`datanimbus`,name:`Datanimbus`,interviews:[{name:`Datanimbus Interview`,questionCount:96,rounds:[{name:`L1 Technical Interview`,questions:[{question:`Introduce yourself`,answer:`I am [Your Name], with 3 years of experience in Java Full Stack Development. I specialize in Spring Boot, Microservices, Hibernate, and ReactJS. I have worked on projects like customer registration systems, batch processing for large datasets, and transaction data handling. My expertise includes implementing REST APIs, working with state management in ReactJS, and ensuring robust test coverage with JUnit and Mockito.`,code:null},{question:`What are the steps in Spring Batch processing?`,answer:`Job: The batch process's overall definition containing steps. Step: Represents a stage (Reader → Processor → Writer). ItemReader: Reads input data. ItemProcessor: Processes/transforms data. ItemWriter: Writes processed data. JobRepository: Stores metadata about the batch. JobLauncher: Launches the batch job.`,code:null},{question:`What is the difference between JDK, JVM, and JRE?`,answer:`JDK (Java Development Kit): Includes tools like compilers and debuggers for Java development. JVM (Java Virtual Machine): Executes bytecode, platform-specific. JRE (Java Runtime Environment): Contains JVM and runtime libraries to run Java applications.`,code:null},{question:`What have you worked on in Spring Batch?`,answer:`I implemented a batch job for processing transaction records. It included custom ItemReader which fetched data from a database, and a Processor which validated and transformed data. The Writer updated another database. I also configured error handling and logging for job monitoring.`,code:null},{question:`Have you worked on Kafka in Spring Batch?`,answer:`Yes, I integrated Kafka as a messaging system for batch job communication. Data was read from a Kafka topic, processed in chunks, and written back to another topic, ensuring reliable and asynchronous data flow.`,code:null},{question:`What are job schedulers in Spring Boot?`,answer:`Job schedulers automate running tasks at specific intervals. Spring Task Scheduler: Lightweight, uses cron expressions. Quartz Scheduler: Advanced scheduling with persistence.`,code:{language:`java`,content:`@Scheduled(cron = "0 0 1 * * ?")
public void runDailyJob() { }`}},{question:`Difference between static block and static variable?`,answer:`Static Block: Runs once during class loading, used for initialization logic. Static Variable: Shared by all instances, its value can be updated.`,code:{language:`java`,content:`static { System.out.println("Static block"); }
static int count = 0;`}},{question:`How does parallel processing work, and where is it used?`,answer:`Parallel processing divides tasks into smaller subtasks, executed concurrently across multiple threads. Use Case: Processing large datasets or running independent tasks using parallel streams in Java.`,code:{language:`java`,content:`list.parallelStream().filter(n -> n % 2 == 0).forEach(System.out::println);`}},{question:`What is CompletableFuture in Java?`,answer:`An API for asynchronous programming. It allows chaining tasks, combining results, and handling exceptions without blocking the main thread.`,code:{language:`java`,content:`CompletableFuture.supplyAsync(() -> fetchData())
    .thenApply(data -> process(data))
    .thenAccept(result -> System.out.println(result));`}},{question:`Provide a real-time example of CompletableFuture.`,answer:`Fetching user details from one service and user transactions from another concurrently, then combining them into a single response for the client.`,code:{language:`java`,content:`CompletableFuture<User> userFuture = CompletableFuture.supplyAsync(() -> userService.getUser(id));
CompletableFuture<List<Transaction>> txFuture = CompletableFuture.supplyAsync(() -> txService.getTransactions(id));
userFuture.thenCombine(txFuture, (user, tx) -> new UserResponse(user, tx));`}},{question:`Have you worked on microservices?`,answer:`Yes, I developed microservices for user management and transaction handling, following RESTful principles. Each service had its own database, and they communicated via REST and Kafka.`,code:null},{question:`How do microservices communicate?`,answer:`Synchronous: REST (HTTP/HTTPS). Asynchronous: Messaging queues like Kafka or RabbitMQ.`,code:null},{question:`Explain creating a POST API step-by-step`,answer:`1. Annotate class with @RestController. 2. Create method with @PostMapping. 3. Accept DTO for request. 4. Inject service class. 5. Implement logic in service and save using JpaRepository. 6. Return appropriate HTTP status codes.`,code:{language:`java`,content:`@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired private UserService service;
    @PostMapping
    public ResponseEntity<User> create(@RequestBody User user) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.save(user));
    }
}`}},{question:`Difference between Comparable and Comparator`,answer:`Comparable: Defines natural order in the class (compareTo). Comparator: External comparison logic (compare). Example: Sorting employees by age (Comparator) vs. by ID (Comparable).`,code:{language:`java`,content:`class Employee implements Comparable<Employee> {
    public int compareTo(Employee o) { return this.id - o.id; }
}
Comparator<Employee> byAge = (e1, e2) -> e1.age - e2.age;`}},{question:`Difference between StringBuilder and StringBuffer`,answer:`StringBuilder: Faster, non-thread-safe. StringBuffer: Thread-safe, synchronized. Use StringBuilder unless thread safety is needed.`,code:null},{question:`What is the volatile keyword?`,answer:`Ensures visibility of a variable's updates across threads. Prevents caching issues but does not guarantee atomicity.`,code:{language:`java`,content:`volatile boolean flag = true;`}},{question:`Java code for even number sum using streams`,answer:`Use filter and mapToInt to sum even numbers.`,code:{language:`java`,content:`List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6);
int sum = numbers.stream().filter(n -> n % 2 == 0).mapToInt(Integer::intValue).sum();
System.out.println(sum); // 12`}},{question:`Difference between Serialization and Deserialization`,answer:`Serialization: Converts an object to bytes for storage. Deserialization: Reconstructs the object from bytes.`,code:null},{question:`What is the Optional class?`,answer:`Used to avoid NullPointerException. Represents a value that can be null and provides methods to handle it gracefully.`,code:{language:`java`,content:`Optional<User> user = repository.findById(id);
String name = user.map(User::getName).orElse("Guest");`}},{question:`How to handle exceptions globally in Spring Boot?`,answer:`Use @ControllerAdvice with @ExceptionHandler for global exception handling.`,code:{language:`java`,content:`@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleException(Exception e) {
        return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}`}},{question:`What is a memory leak, and how to avoid it in Java?`,answer:`Memory Leak: Unreferenced objects not garbage collected. Avoidance: Close resources, use weak references, and avoid static fields referencing large objects.`,code:null},{question:`How to monitor Spring Boot applications?`,answer:`Use Spring Actuator for endpoints like /health and /metrics. Combine with tools like Prometheus and Grafana for monitoring.`,code:{language:`java`,content:`management.endpoints.web.exposure.include=health,metrics,prometheus`}},{question:`How does a HashMap work internally?`,answer:`Keys are hashed into buckets. Each bucket holds an entry list. If two keys map to the same bucket, a linked list or tree structure handles collisions.`,code:null},{question:`What is a hash collision?`,answer:`Occurs when two keys have the same hash. Resolved using chaining or open addressing.`,code:null},{question:`What happens if a duplicate key is added to a HashMap?`,answer:`The old value is replaced with the new value.`,code:null},{question:`Difference between @Controller and @RestController`,answer:`@Controller: Used for MVC, returns views. @RestController: Used for REST APIs, combines @Controller and @ResponseBody.`,code:null},{question:`What is @Primary and @Qualifier?`,answer:`@Primary: Marks the default bean. @Qualifier: Specifies which bean to use when multiple beans exist.`,code:{language:`java`,content:`@Primary @Component public class PrimaryBean { }
@Qualifier("secondary") @Component public class SecondaryBean { }`}},{question:`What is @SpringBootApplication?`,answer:`A meta-annotation combining @Configuration, @EnableAutoConfiguration, and @ComponentScan.`,code:{language:`java`,content:`@SpringBootApplication
public class Application { public static void main(String[] args) { SpringApplication.run(Application.class, args); } }`}},{question:`What is ApplicationContext?`,answer:`The Spring container that manages beans and their life cycle.`,code:{language:`java`,content:`ApplicationContext context = new AnnotationConfigApplicationContext(AppConfig.class);`}},{question:`What is Dependency Injection?`,answer:`A design pattern where Spring injects objects a class depends on, instead of the class creating them.`,code:{language:`java`,content:`@Service
public class UserService {
    @Autowired private UserRepository repository;
}`}},{question:`Life Cycle of Beans`,answer:`1. Instantiate, 2. Populate properties, 3. @PostConstruct, 4. Use, 5. @PreDestroy.`,code:{language:`java`,content:`@Component
public class MyBean {
    @PostConstruct public void init() { }
    @PreDestroy public void destroy() { }
}`}},{question:`What are interceptors?`,answer:`Pre- and post-process requests in Spring MVC. Used for logging, authentication, etc.`,code:{language:`java`,content:`@Component
public class LoggingInterceptor implements HandlerInterceptor {
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        System.out.println("Request: " + request.getRequestURI());
        return true;
    }
}`}},{question:`Difference between map and flatMap?`,answer:`map: Transforms data one-to-one. flatMap: Flattens nested structures one-to-many.`,code:{language:`java`,content:`list.stream().map(String::toUpperCase);
list.stream().flatMap(Collection::stream);`}},{question:`What is the this keyword?`,answer:`Refers to the current instance of a class.`,code:{language:`java`,content:`this.name = name;`}},{question:`Autoboxing vs. Unboxing`,answer:`Autoboxing: Converts primitive to wrapper (int → Integer). Unboxing: Converts wrapper to primitive (Integer → int).`,code:{language:`java`,content:`Integer num = 10; // Autoboxing
int value = num; // Unboxing`}},{question:`SQL query to join 2 tables without JOIN keyword`,answer:`Use implicit join with WHERE condition.`,code:{language:`sql`,content:`SELECT a.*, b.* FROM TableA a, TableB b WHERE a.id = b.id;`}},{question:`How to avoid memory leaks in production?`,answer:`Use tools like JVisualVM or Heap Dump Analyzer. Optimize code by closing resources, using thread pools, and monitoring object allocation.`,code:null},{question:`Explain Spring dependency injection and its uses`,answer:`Dependency Injection (DI) decouples object creation. Spring manages dependencies using constructor, setter, or field injection.`,code:null},{question:`How does HashMap handle duplicate keys?`,answer:`If the key already exists, the old value is replaced with the new one.`,code:null},{question:`How do @Primary and @Qualifier resolve conflicts?`,answer:`@Primary: Default preference when multiple beans exist. @Qualifier: Explicitly specifies which bean to use.`,code:null}]},{name:`L2 Technical Interview`,questions:[{question:`Self-Introduction`,answer:`I am [Your Name], with 3 years of experience in Java Full Stack Development. I specialize in developing scalable and maintainable applications using Spring Boot, Hibernate, and ReactJS. My expertise lies in microservices architecture, database optimization, and test-driven development. I have worked on projects like customer registration systems and transaction data handling, ensuring performance optimization and robust error handling.`,code:null},{question:`Explain your last project and one task in detail`,answer:`I recently worked on a bank application focusing on user registration and transaction management. One specific task was implementing a batch process for validating and processing customer transactions. Steps followed: 1) Defined a Job using Spring Batch, including steps for reading, processing, and writing. 2) Configured ItemReader to fetch transactions from database. 3) Applied business validation logic in ItemProcessor. 4) Updated valid transactions using ItemWriter. 5) Set up scheduling using Quartz. Technologies: Spring Boot, Spring Batch, MySQL.`,code:null},{question:`How do different databases connect internally?`,answer:`Spring Boot provides database connectivity using: 1) JDBC: Uses DriverManager to establish connections. 2) Connection Pooling: Tools like HikariCP manage multiple database connections efficiently. 3) JPA/Hibernate: Abstraction layer interacting with database using entities and queries. 4) DataSource: Acts as bridge between application and database, managing connections internally.`,code:null},{question:`What is Dependency Injection?`,answer:`Dependency Injection (DI) is a design pattern where objects (dependencies) are provided to a class rather than being instantiated within the class. Spring Boot implements DI using: 1) Constructor Injection (preferred for mandatory dependencies), 2) Setter Injection (for optional dependencies), 3) Field Injection (directly injects dependencies).`,code:{language:`java`,content:`@Service
public class UserService {
    private final UserRepository repository;
    public UserService(UserRepository repository) { // Constructor injection
        this.repository = repository;
    }
}`}},{question:`What is the @Component annotation in Spring Boot?`,answer:`@Component is a generic stereotype annotation that marks a class as a Spring-managed bean. Spring automatically detects these beans during component scanning.`,code:{language:`java`,content:`@Component
public class MyService {
    public void performTask() {
        System.out.println("Task performed.");
    }
}`}},{question:`What is a memory leak?`,answer:`A memory leak occurs when objects are no longer needed but are still referenced, preventing the garbage collector from reclaiming their memory.`,code:null},{question:`How to handle memory leaks manually?`,answer:`1) Close Resources: Ensure streams, database connections, and files are closed after use. 2) Avoid Static References: Large objects held in static fields cause leaks. 3) Weak References: Use WeakReference for cache-like structures. 4) Tools: Use profilers like JVisualVM or Eclipse MAT to detect leaks.`,code:{language:`java`,content:`try (FileInputStream fis = new FileInputStream("file.txt")) { }`}},{question:`What is Reflection in Java?`,answer:`Reflection allows inspection and manipulation of classes, methods, and fields at runtime.`,code:{language:`java`,content:`Class<?> cls = Class.forName("com.example.MyClass");
Method method = cls.getMethod("myMethod");
method.invoke(cls.newInstance());`}},{question:`Java Code: Find the length of the longest subarray with the same digit`,answer:`Traverse array tracking current consecutive count and max.`,code:{language:`java`,content:`int[] array = {1, 1, 2, 2, 2, 4, 4, 4, 4, 1, 1, 1, 1, 1, 6, 6};
int maxLen = 0, currLen = 1;
for (int i = 1; i < array.length; i++) {
    if (array[i] == array[i - 1]) {
        currLen++;
    } else {
        maxLen = Math.max(maxLen, currLen);
        currLen = 1;
    }
}
maxLen = Math.max(maxLen, currLen);
System.out.println("Longest subarray length: " + maxLen); // 5`}},{question:`SQL Query: Find the second maximum age in the employee table`,answer:`Use subquery to exclude max age.`,code:{language:`sql`,content:`SELECT MAX(age) AS second_max_age FROM employees WHERE age < (SELECT MAX(age) FROM employees);`}},{question:`How to handle duplicate requests in Spring Boot API?`,answer:`1) Use unique identifier (requestId) in request payload. 2) Store requestId in cache (Redis) with TTL. 3) Check cache for duplicates before processing.`,code:{language:`java`,content:`if (cache.contains(requestId)) {
    throw new DuplicateRequestException("Duplicate request detected.");
} else {
    cache.put(requestId, true);
}`}},{question:`What is Parallel Processing?`,answer:`Parallel processing divides tasks into smaller parts and executes them concurrently across multiple threads or processors.`,code:{language:`java`,content:`list.parallelStream().forEach(System.out::println);`}},{question:`What is Spring Boot Actuator and how to implement it?`,answer:`Spring Boot Actuator provides production-ready features to monitor and manage applications.`,code:{language:`java`,content:`<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
management.endpoints.web.exposure.include=health,metrics`}},{question:`What is Spring Boot Context?`,answer:`The Spring ApplicationContext is the central interface for accessing Spring-managed beans and their lifecycle. It initializes the container, resolves dependencies, and manages bean scopes.`,code:{language:`java`,content:`ApplicationContext context = new AnnotationConfigApplicationContext(AppConfig.class);`}},{question:`How to optimize a single API?`,answer:`1) Database Optimization: Use indexes and optimize queries. 2) Caching: Implement Redis or Ehcache. 3) Lazy Loading: Fetch related data only when required. 4) Compression: Enable GZIP for API responses. 5) Profiling: Use tools like JProfiler to identify bottlenecks.`,code:null}]},{name:`L3 Technical Interview`,questions:[{question:`Self-Introduction`,answer:`I am [Your Name] with 3 years of experience in Java Full Stack Development. I have hands-on experience in Java 8, Spring Boot, Hibernate, and ReactJS. I specialize in building scalable applications, ensuring code quality using test-driven development, and implementing microservices architecture.`,code:null},{question:`How much do you rate yourself in Java and ReactJS?`,answer:`I rate myself 8 out of 10 in Java and 7 out of 10 in ReactJS. I am proficient in both but always open to learning and improving.`,code:null},{question:`Which Java version are you familiar with?`,answer:`I am familiar with Java 8 and Java 11. I have also explored features from Java 17.`,code:null},{question:`What is the superclass of all classes?`,answer:`The superclass of all classes in Java is the Object class.`,code:null},{question:`Can you explain Object class methods?`,answer:`toString(): Returns string representation. hashCode(): Returns hash code. equals(Object o): Checks equality. clone(): Creates copy. wait()/notify()/notifyAll(): Thread synchronization. finalize(): Called by garbage collector.`,code:null},{question:`What is a thread?`,answer:`A thread is the smallest unit of a process that can execute tasks concurrently within a program.`,code:null},{question:`How do threads transition from running state to runnable state?`,answer:`A thread transitions from running to runnable when: 1) It is preempted by the OS scheduler, 2) It calls a blocking method like wait() or sleep().`,code:null},{question:`When do we use the wait() method in Java? Give a real-time example.`,answer:`The wait() method is used in inter-thread communication. Example: Producer-Consumer Problem.`,code:{language:`java`,content:`class SharedResource {
    private boolean available = false;
    public synchronized void produce() throws InterruptedException {
        while (available) wait();
        System.out.println("Produced item");
        available = true;
        notifyAll();
    }
    public synchronized void consume() throws InterruptedException {
        while (!available) wait();
        System.out.println("Consumed item");
        available = false;
        notifyAll();
    }
}`}},{question:`How do notify() and notifyAll() work? Example code.`,answer:`notify() wakes up one waiting thread, while notifyAll() wakes up all waiting threads.`,code:{language:`java`,content:`synchronized(obj) {
    obj.wait();    // Makes current thread wait
    obj.notify();  // Wakes up one waiting thread
    obj.notifyAll(); // Wakes up all waiting threads
}`}},{question:`Can the wait() method take arguments?`,answer:`Yes, wait() can take a timeout in milliseconds (wait(long timeout)), which makes the thread wait for the specified time.`,code:{language:`java`,content:`obj.wait(5000); // Wait for 5 seconds`}},{question:`Why is the wait() method in Object and not in Thread?`,answer:`wait() is in Object because it operates on the monitor lock of the object, ensuring proper synchronization at the object level.`,code:null},{question:`How to synchronize an Employee object?`,answer:`Synchronize using the synchronized keyword.`,code:{language:`java`,content:`synchronized (employee) {
    // critical section
}`}},{question:`Sort a list of employees based on the first name.`,answer:`Use Comparator.comparing with method reference.`,code:{language:`java`,content:`List<Employee> employees = ...;
employees.sort(Comparator.comparing(Employee::getFirstName));`}},{question:`What are Comparable and Comparator?`,answer:`Comparable: Natural ordering of objects (compareTo). Comparator: Custom ordering of objects (compare).`,code:{language:`java`,content:`class Employee implements Comparable<Employee> {
    @Override
    public int compareTo(Employee other) {
        return this.name.compareTo(other.name);
    }
}
Comparator<Employee> byAge = (e1, e2) -> e1.age - e2.age;`}},{question:`What is the Observer Design Pattern?`,answer:`The Observer Pattern is used for one-to-many dependency relationships where one object notifies dependent objects of state changes.`,code:{language:`java`,content:`interface Observer { void update(); }
class Subject {
    List<Observer> observers = new ArrayList<>();
    void notifyObservers() { observers.forEach(Observer::update); }
}`}},{question:`Is String mutable or immutable? Why?`,answer:`String is immutable because it ensures security, caching, and thread safety.`,code:null},{question:`Garbage collection for String s = 'abc'; s1 = s + 'def';`,answer:`abc is stored in String pool and not eligible for GC. def is also in String pool. The concatenation creates new object 'abcdef' in heap. If s1 no longer references it, 'abcdef' becomes eligible for garbage collection.`,code:null},{question:`What is the finalize method?`,answer:`The finalize method is called by the garbage collector before the object is destroyed.`,code:{language:`java`,content:`@Override
protected void finalize() throws Throwable {
    // Cleanup code
}`}},{question:`Does System.gc() call finalize()?`,answer:`System.gc() requests garbage collection, and objects collected will have their finalize() method invoked.`,code:null},{question:`What is the superclass of the Exception class?`,answer:`The Throwable class is the superclass of Exception.`,code:null},{question:`How to handle exceptions?`,answer:`Use try-catch blocks, throws keyword, or custom exception handling.`,code:{language:`java`,content:`try { } catch (Exception e) { }`}},{question:`What are the types of exceptions?`,answer:`Checked: IOException, SQLException. Unchecked: NullPointerException, IllegalArgumentException.`,code:null},{question:`Examples of Checked and Unchecked Exceptions`,answer:`Checked: IOException, FileNotFoundException, SQLException, InterruptedException, ClassNotFoundException. Unchecked: NullPointerException, ArrayIndexOutOfBoundsException, IllegalArgumentException, ArithmeticException, ClassCastException.`,code:null},{question:`NullPointerException Example`,answer:`When calling method on null reference.`,code:{language:`java`,content:`String s = null;
s.length(); // Throws NullPointerException`}},{question:`Serialization and Deserialization Example`,answer:`Serialization writes object to stream, Deserialization reads object from stream.`,code:{language:`java`,content:`// Serialization
ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream("file.ser"));
oos.writeObject(object);
// Deserialization
ObjectInputStream ois = new ObjectInputStream(new FileInputStream("file.ser"));
Object obj = ois.readObject();`}},{question:`Real-time use of Serialization`,answer:`Serialization is used in saving object states to a file or transferring objects over a network.`,code:null},{question:`Ignoring fields for serialization`,answer:`Use the transient keyword for fields to exclude them from serialization.`,code:{language:`java`,content:`class User implements Serializable {
    private String name;
    private transient String password; // Not serialized
}`}},{question:`Have you worked with the Concurrency package?`,answer:`Yes, I used it to manage thread-safe collections like ConcurrentHashMap and executors in real-time projects.`,code:null},{question:`Example of Executor Services`,answer:`ExecutorService manages thread pool for task execution.`,code:{language:`java`,content:`ExecutorService executor = Executors.newFixedThreadPool(2);
executor.submit(() -> System.out.println("Task executed"));
executor.shutdown();`}},{question:`How to decide thread pool size?`,answer:`Based on formula: Thread Pool Size = Number of Cores * (1 + Wait Time / Compute Time).`,code:null},{question:`What is ConcurrentHashMap? Why is it needed?`,answer:`A thread-safe version of HashMap used for high-performance concurrent applications. Uses segmented locking.`,code:{language:`java`,content:`ConcurrentHashMap<String, Integer> map = new ConcurrentHashMap<>();`}},{question:`Fail-Safe vs. Fail-Fast Iterators Example`,answer:`Fail-fast throws ConcurrentModificationException. Fail-safe works on clone.`,code:{language:`java`,content:`// Fail-Fast
List<String> list = new ArrayList<>();
Iterator<String> iterator = list.iterator();
list.add("New"); // ConcurrentModificationException
// Fail-Safe
CopyOnWriteArrayList<String> cowList = new CopyOnWriteArrayList<>();
cowList.add("New"); // No exception`}},{question:`How does ConcurrentHashMap work? Does it lock the whole map?`,answer:`It uses a segmented locking mechanism, locking only a portion of the map, not the entire map.`,code:null},{question:`Strengths and Weaknesses in Core Technology`,answer:`Strengths: Proficient in Java, Spring Boot, and ReactJS. Weaknesses: Need to explore advanced JavaScript frameworks more deeply.`,code:null},{question:`Do you have any Java certifications?`,answer:`I have completed Oracle Certified Associate (OCA) Java SE 8 Programmer certification.`,code:null}]},{name:`HR Round`,questions:[{question:`Tell me about yourself.`,answer:`I am [Your Name] with 3 years of experience in Java Full Stack Development. I specialize in Spring Boot, Microservices, Hibernate, and ReactJS. I have worked on projects like customer registration systems and transaction data handling. I am passionate about building scalable applications and learning new technologies.`,code:null},{question:`Why do you want to join Datanimbus?`,answer:`Datanimbus has a strong reputation for data solutions and innovation. I'm excited about the opportunity to work on challenging projects, learn new technologies, and contribute to the company's growth.`,code:null},{question:`What are your salary expectations?`,answer:`Based on my experience and market standards, I am looking for a competitive package. I'm flexible and happy to discuss further based on the role and responsibilities.`,code:null},{question:`Where do you see yourself in 5 years?`,answer:`I see myself as a technical lead, contributing to architecture decisions and mentoring junior developers. I want to continue growing my technical skills and take on more responsibilities.`,code:null},{question:`What are your strengths and weaknesses?`,answer:`Strengths: Quick learner, problem-solving skills, strong technical foundation, good team player. Weakness: Sometimes focus too much on perfection, working on delegating tasks better.`,code:null},{question:`Why are you looking for a job change?`,answer:`Looking for better growth opportunities, challenging projects, and a chance to work with new technologies. Datanimbus offers the perfect environment for professional growth.`,code:null}]}]}],questionCount:96},"./ford-motor/foad-interview-1.js":{id:`ford-motor`,name:`Ford Motor`,interviews:[{name:`Java/Spring Boot & React Interview`,rounds:[{name:`Java & Spring Boot`,questions:[{question:`Explain CSRF (Cross-Site Request Forgery) and how you handle it.`,answer:`CSRF is an attack that tricks the victim into submitting a malicious request. In Spring Boot, CSRF protection is enabled by default and can be configured with CookieCsrfTokenRepository.`,code:{language:`java`,content:`http.csrf().csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse());`}},{question:`What is JWT Security and how do you implement it?`,answer:`JWT is a method for securely transmitting information as a JSON object. Implementation steps:
- Add dependencies
- Configure Spring Security
- Create a JWT utility class
- Create an authentication filter
- Implement UserDetailsService`,code:{language:`java`,content:`public class JwtUtil {
    public String generateToken(String username) {
        return Jwts.builder()
            .setSubject(username)
            .setIssuedAt(new Date())
            .setExpiration(new Date(System.currentTimeMillis() + 3600000))
            .signWith(SignatureAlgorithm.HS256, SECRET)
            .compact();
    }
}`}},{question:`Describe OAuth2 and how it is used in your applications.`,answer:`OAuth2 is an authorization framework allowing applications to obtain limited access to user accounts. It delegates user authentication to the service hosting the user account.`,code:null},{question:`How do you implement paging to get data in Spring Boot?`,answer:`Use Spring Data JPA's Pageable interface.`,code:{language:`java`,content:`@GetMapping("/users")
public Page<User> listUsers(Pageable pageable) {
    return userService.getUsers(pageable);
}`}},{question:`How do you sort data based on a property in Spring Boot?`,answer:`Use Spring Data JPA's Sort class.`,code:{language:`java`,content:`return userRepository.findAll(Sort.by(Sort.Direction.ASC, "name"));`}},{question:`What is an API Gateway and why is it used?`,answer:`An API Gateway acts as an API front-end, receiving requests, enforcing throttling/security, and routing to back-end services. It provides a single entry point.`,code:null},{question:`How do you implement load balancing in your applications?`,answer:`Using Ribbon or Spring Cloud LoadBalancer with @LoadBalanced RestTemplate.`,code:{language:`java`,content:`@Bean @LoadBalanced
public RestTemplate restTemplate() {
    return new RestTemplate();
}`}},{question:`Explain the difference between Monolithic and Microservices architectures.`,answer:`- Monolithic: single unified codebase, tightly coupled, runs as a single service
- Microservices: loosely coupled services, each in its own process, communicating via HTTP/messaging`,code:null},{question:`What is Kubernetes and how do you use it?`,answer:`Kubernetes is a container orchestration platform automating deployment, scaling, and management of containerized applications.`,code:null},{question:`How do you connect one microservice to another?`,answer:`Using REST APIs, messaging queues (RabbitMQ), or service discovery tools (Eureka).`,code:{language:`java`,content:`// Using RestTemplate
User user = restTemplate.getForObject("http://user-service/users/1", User.class);`}},{question:`What is the difference between @RestController and @Controller?`,answer:`- @RestController: combines @Controller and @ResponseBody, used for REST APIs
- @Controller: used for MVC with view templates`,code:null},{question:`How do you perform code quality analysis in your projects?`,answer:`Using SonarQube for static code analysis to identify code smells, bugs, and security vulnerabilities.`,code:null},{question:`What is the difference between authentication and authorization?`,answer:`- Authentication: verifying the identity of a user
- Authorization: verifying what resources the authenticated user can access`,code:null},{question:`How do you scale your application?`,answer:`- Horizontal scaling: adding more instances
- Vertical scaling: adding more resources (CPU, memory)
- Tools like Kubernetes help manage scaling`,code:null},{question:`What are profiles in Spring Boot and how do you use them?`,answer:`Profiles configure different environments (dev, test, prod). Use application-{profile}.properties files.`,code:{language:`properties`,content:`# application-dev.properties
spring.datasource.url=jdbc:h2:mem:devdb

# application-prod.properties
spring.datasource.url=jdbc:mysql://localhost/proddb`}}]},{name:`React Advanced`,questions:[{question:`What is middleware in ReactJS and how do you use it?`,answer:`Middleware extends Redux store capabilities between dispatching an action and it reaching the reducer.`,code:{language:`javascript`,content:`const loggerMiddleware = store => next => action => {
    console.log('Dispatching:', action);
    let result = next(action);
    console.log('Next state:', store.getState());
    return result;
};`}},{question:`Explain Context API and Redux. How do they differ?`,answer:`- Context API: built-in, best for small-medium apps
- Redux: external library, best for large apps with complex state management — a predictable state container`,code:null},{question:`How do you write unit tests in React?`,answer:`Using Jest and React Testing Library.`,code:{language:`jsx`,content:`import { render, screen } from '@testing-library/react';
test('renders learn react link', () => {
    render(<App />);
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
});`}},{question:`Have you worked on reusable components in React? Give an example.`,answer:`Yes — a Button component reused across the application.`,code:{language:`jsx`,content:`const Button = ({ label, onClick }) => (
    <button onClick={onClick}>{label}</button>
);`}},{question:`What is a Higher-Order Component (HoC) and how do you use it?`,answer:`A HoC is a function taking a component and returning a new component. It is used for reusing component logic.`,code:{language:`jsx`,content:`const withLogging = WrappedComponent => {
    return class extends React.Component {
        componentDidMount() { console.log('Component mounted'); }
        render() { return <WrappedComponent {...this.props} />; }
    };
};`}}]}],questionCount:20}]},"./ford-motor/foad-interview.js":{id:`ford-motor`,name:`Ford Motor`,interviews:[{name:`FOAD First Round Interview`,rounds:[{name:`Core Java`,questions:[{question:`Which version of Java are you using?`,answer:`I am using Java 8 and Java 11, and I am familiar with Java 17 features.`,code:null},{question:`What are Java 8 features?`,answer:`Key Java 8 features:
- Lambda Expressions — e.g. (a, b) -> a + b
- Streams API — functional-style processing of collections
- New Date and Time API — LocalDate, LocalDateTime
- Default Methods in Interfaces
- Optional Class — helps avoid NullPointerException`,code:{language:`java`,content:`List<String> list = Arrays.asList("a1", "a2", "b1");
list.stream().filter(s -> s.startsWith("a")).forEach(System.out::println);`}},{question:`What is the Java 9 static method in interface?`,answer:`Java 9 introduced private methods in interfaces that can be static or non-static, allowing code sharing between default methods.`,code:{language:`java`,content:`interface MyInterface {
    private static void helper() { }
    default void method() { helper(); }
}`}},{question:`What is the List.of method?`,answer:`List.of() creates an immutable list with the provided elements — it returns an unmodifiable list.`,code:{language:`java`,content:`List<String> list = List.of("A", "B", "C");
// list.add("D"); // Throws UnsupportedOperationException`}},{question:`What is a Functional Interface? Give an example.`,answer:`A functional interface has exactly one abstract method. It can have multiple default or static methods.`,code:{language:`java`,content:`@FunctionalInterface
public interface Calculator { int add(int a, int b); }`}},{question:`What is Supplier in functional programming?`,answer:`Supplier is a functional interface that provides a result of type T without taking any input.`,code:{language:`java`,content:`Supplier<String> supplier = () -> "Hello";
System.out.println(supplier.get()); // Hello`}},{question:`Create a functional interface with an add method, static sum, default multiply, and use it in main.`,answer:`Create a Calculator interface with add as the abstract method, static sum, and default multiply — then implement and use it in Main.`,code:{language:`java`,content:`@FunctionalInterface
public interface Calculator {
    int add(int a, int b);
    static int sum(int a, int b) { return a + b; }
    default int multiply(int a, int b) { return a * b; }
}

public class Main {
    public static void main(String[] args) {
        Calculator calc = (a, b) -> a + b;
        System.out.println("Add: " + calc.add(5, 3));
        System.out.println("Sum: " + Calculator.sum(5, 3));
        System.out.println("Multiply: " + calc.multiply(5, 3));
    }
}`}},{question:`Using streams, given a list of employees, count male/female employees.`,answer:`Use groupingBy with counting to group employees by gender.`,code:{language:`java`,content:`Map<String, Long> result = employees.stream()
    .collect(Collectors.groupingBy(Employee::getGender, Collectors.counting()));`}},{question:`employees.stream().filter(e -> e.getAge() > 18).map(e -> e.remove()).count() — what will be the output?`,answer:`The output depends on the remove() method.
- If it removes the element from the list, it returns the count of removed items
- If not, it returns 0`,code:null},{question:`What are terminal operations in streams?`,answer:`Terminal operations produce a result or side-effect and mark the end of the stream pipeline.
- Examples: collect(), count(), forEach(), reduce()`,code:{language:`java`,content:`list.stream().filter(s -> s.length() > 3).count(); // Terminal`}},{question:`How does Java handle memory management?`,answer:`Java uses automatic garbage collection. It allocates memory on the heap for new objects and reclaims memory from unreferenced objects.`,code:null},{question:`How do you handle exceptions in Java?`,answer:`Using try-catch blocks — code that might throw an exception goes in the try block, handling code in the catch block.`,code:{language:`java`,content:`try { riskyOperation(); }
catch (Exception e) { e.printStackTrace(); }`}},{question:`What are checked and unchecked exceptions?`,answer:`- Checked exceptions must be caught or declared (IOException, SQLException)
- Unchecked exceptions don't need explicit handling (NullPointerException, ArithmeticException)`,code:null},{question:`What is the difference between == and equals() in Java?`,answer:`== checks reference equality (same object), while equals() checks value equality (same content).`,code:{language:`java`,content:`String s1 = new String("Hello");
String s2 = new String("Hello");
System.out.println(s1 == s2); // false
System.out.println(s1.equals(s2)); // true`}},{question:`Explain OOP concepts in Java.`,answer:`- Encapsulation — wrapping data and methods together
- Inheritance — deriving new classes from existing ones
- Polymorphism — same method, different forms
- Abstraction — hiding complexity`,code:null},{question:`What are thread pools and their use in Java?`,answer:`Thread pools manage reusable threads for executing tasks, reducing the overhead of creating/destroying threads. Java provides ExecutorService.`,code:{language:`java`,content:`ExecutorService executor = Executors.newFixedThreadPool(10);
executor.submit(() -> System.out.println("Task"));
executor.shutdown();`}}]},{name:`Spring Boot`,questions:[{question:`Spring Boot Controller using POST & GET for vehicle details.`,answer:`Create a @RestController with @PostMapping and @GetMapping for vehicle operations.`,code:{language:`java`,content:`@RestController
@RequestMapping("/vehicles")
public class VehicleController {
    @PostMapping
    public ResponseEntity<Vehicle> addVehicle(@RequestBody Vehicle vehicle) {
        return ResponseEntity.status(HttpStatus.CREATED).body(vehicle);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Vehicle> getVehicle(@PathVariable Long id) {
        return ResponseEntity.ok(vehicle);
    }
}`}},{question:`What are the issues you have faced in Spring Boot development?`,answer:`Common issues:
- Configuration errors
- Dependency conflicts
- Debugging complex applications
- Connection pooling issues
- Transaction management problems`,code:null},{question:`Which version of Spring Boot are you using?`,answer:`I am using Spring Boot 2.x and 3.x.`,code:null},{question:`What is the @Primary and @Qualifier annotation?`,answer:`- @Primary specifies the default bean when multiple beans of the same type exist
- @Qualifier specifies which bean to inject`,code:{language:`java`,content:`@Primary @Component public class PrimaryBean {}
@Qualifier("secondary") @Component public class SecondaryBean {}

@Autowired @Qualifier("secondary") private MyBean bean;`}},{question:`How do you use two different databases in a single Spring Boot application?`,answer:`Configure multiple DataSource beans with @Primary for the default one, and use @Qualifier to inject the appropriate DataSource.`,code:{language:`java`,content:`@Configuration
public class DataSourceConfig {
    @Bean @Primary
    @ConfigurationProperties("spring.datasource1")
    public DataSource dataSource1() { return DataSourceBuilder.create().build(); }

    @Bean
    @ConfigurationProperties("spring.datasource2")
    public DataSource dataSource2() { return DataSourceBuilder.create().build(); }
}`}},{question:`Explain JPA methods and @Query.`,answer:`JPA methods: findAll(), findById(), save(), delete(). @Query defines custom JPQL/SQL queries.`,code:{language:`java`,content:`@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    @Query("SELECT e FROM Employee e WHERE e.name LIKE %:name%")
    List<Employee> findByNameContaining(@Param("name") String name);
}`}},{question:`How do you get data for employee {id, name, address{id, location}} and fetch location based on employee data?`,answer:`Use derived query methods or @Query with JOIN FETCH.`,code:{language:`java`,content:`@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    List<Employee> findByAddressLocation(String location);

    @Query("SELECT e FROM Employee e JOIN FETCH e.address WHERE e.id = :id")
    Optional<Employee> findByIdWithAddress(@Param("id") Long id);
}`}},{question:`Explain the basics of Spring Boot.`,answer:`Spring Boot simplifies Spring development with auto-configuration, standalone application configuration, and embedded servers.`,code:{language:`java`,content:`@SpringBootApplication
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}`}},{question:`Write a code example for a JPA repository and derived query.`,answer:`Create a repository interface extending JpaRepository with a derived query method.`,code:{language:`java`,content:`@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    List<Employee> findByGender(String gender);
}`}},{question:`Configure HikariCP in a Spring Boot application.`,answer:`Add configuration in application.yml for the HikariCP connection pool.`,code:{language:`yaml`,content:`spring:
  datasource:
    url: jdbc:mysql://localhost:3306/db
    username: user
    password: pass
    hikari:
      maximum-pool-size: 10
      minimum-idle: 5
      connection-timeout: 30000`}},{question:`Explain Hibernate queries and entity graphs.`,answer:`Hibernate queries use HQL or the Criteria API. Entity graphs optimize queries by defining which related entities to fetch.`,code:{language:`java`,content:`@EntityGraph(attributePaths = {"address", "department"})
@Query("SELECT e FROM Employee e WHERE e.id = :id")
Optional<Employee> findByIdWithGraph(@Param("id") Long id);`}},{question:`How do you write test cases for controller, service, and repository layers?`,answer:`- Controller: @WebMvcTest with MockMvc
- Service: @ExtendWith(MockitoExtension.class) with @Mock and @InjectMocks
- Repository: @DataJpaTest`,code:{language:`java`,content:`// Controller Test
@WebMvcTest(EmployeeController.class)
public class EmployeeControllerTest {
    @Autowired private MockMvc mockMvc;
    @MockBean private EmployeeService service;
}

// Service Test
@ExtendWith(MockitoExtension.class)
public class EmployeeServiceTest {
    @Mock private EmployeeRepository repository;
    @InjectMocks private EmployeeService service;
}

// Repository Test
@DataJpaTest
public class EmployeeRepositoryTest {
    @Autowired private EmployeeRepository repository;
}`}},{question:`Explain code coverage and tools like SonarQube.`,answer:`Code coverage measures how much of the code is tested. SonarQube analyzes code quality, coverage, and provides improvement reports.`,code:null},{question:`What are deployment tools and how do they work?`,answer:`Deployment tools like Jenkins, Docker, and Kubernetes automate deployment, ensure consistent environments, and simplify scaling.`,code:null},{question:`How do you handle exceptions in Spring Boot?`,answer:`Use @ExceptionHandler in controllers or @ControllerAdvice for global exception handling.`,code:{language:`java`,content:`@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleException(Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
    }
}`}}]},{name:`ReactJS`,questions:[{question:`Why is React fast and what is the virtual DOM?`,answer:`React is fast due to the virtual DOM, which minimizes direct manipulation of the actual DOM. The virtual DOM is a lightweight copy representing UI components as JavaScript objects.`,code:null},{question:`What is the virtual DOM's internal structure?`,answer:`The virtual DOM is a lightweight JavaScript object representation of the real DOM. React updates it efficiently and reconciles it with the real DOM.`,code:null},{question:`Which component do you use: functional or class-based?`,answer:`I use both, but prefer functional components due to their simplicity and hooks support.`,code:{language:`jsx`,content:`const MyComponent = () => {
    const [state, setState] = useState(0);
    return <div>{state}</div>;
};`}},{question:`Other than useState and useEffect, which hooks do you use?`,answer:`- useContext
- useReducer
- useMemo
- useCallback
- useRef
- useLayoutEffect`,code:{language:`jsx`,content:`const value = useContext(MyContext);
const memoized = useMemo(() => compute(a, b), [a, b]);`}},{question:`What is useContext?`,answer:`useContext allows accessing context values in functional components, enabling state sharing without prop drilling.`,code:{language:`jsx`,content:`const ThemeContext = React.createContext('light');
const theme = useContext(ThemeContext);`}},{question:`What is the Context API alternate in React?`,answer:`Alternatives include Redux for state management, or useState/useReducer for local state.`,code:null},{question:`What is middleware in ReactJS?`,answer:`Middleware extends the Redux store by adding functionality between dispatching an action and it reaching the reducer.`,code:{language:`javascript`,content:`const loggerMiddleware = store => next => action => {
    console.log('Dispatching:', action);
    let result = next(action);
    console.log('Next state:', store.getState());
    return result;
};`}},{question:`Explain Context API and Redux. How do they differ?`,answer:`- Context API: built-in React feature for small to medium apps
- Redux: external library for large apps with complex state management`,code:null},{question:`How do you write unit tests in React?`,answer:`Use Jest and React Testing Library for unit tests.`,code:{language:`jsx`,content:`import { render, screen } from '@testing-library/react';
test('renders component', () => {
    render(<App />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
});`}},{question:`Have you worked on reusable components? Give an example.`,answer:`Yes — a reusable Button component used across the application.`,code:{language:`jsx`,content:`const Button = ({ label, onClick, variant = 'primary' }) => (
    <button className={\`btn btn-\${variant}\`} onClick={onClick}>
        {label}
    </button>
);`}},{question:`What is a Higher-Order Component (HoC)?`,answer:`A HoC is a function that takes a component and returns a new component. It is used for reusing component logic.`,code:{language:`jsx`,content:`const withLogging = WrappedComponent => {
    return class extends React.Component {
        componentDidMount() { console.log('Mounted'); }
        render() { return <WrappedComponent {...this.props} />; }
    };
};`}},{question:`Explain useState and useEffect hooks.`,answer:`useState adds state to functional components. useEffect performs side effects like data fetching.`,code:{language:`jsx`,content:`const [data, setData] = useState([]);
useEffect(() => {
    fetchData().then(setData);
}, []);`}},{question:`Write a basic API call using React.`,answer:`Use fetch or axios inside useEffect.`,code:{language:`jsx`,content:`useEffect(() => {
    fetch('https://api.example.com/data')
        .then(response => response.json())
        .then(data => setData(data));
}, []);`}},{question:`Difference between vanilla JavaScript and React.`,answer:`Vanilla JS is plain JavaScript without libraries. React is a library for building UIs with components, state management, and the virtual DOM.`,code:null},{question:`What is hoisting in JavaScript?`,answer:`Hoisting is JavaScript's behavior of moving variable and function declarations to the top during compilation.`,code:{language:`javascript`,content:`console.log(x); // undefined
var x = 5;`}},{question:`What is prototype in JavaScript?`,answer:`A prototype is the object from which other objects inherit properties and methods. Every JavaScript object has a prototype.`,code:{language:`javascript`,content:`function Person(name) { this.name = name; }
Person.prototype.greet = function() { console.log('Hello'); };`}},{question:`Transform IP address from '192.62.255.31' to '291.26.552.13'.`,answer:`Split by '.', reverse each octet, then join back.`,code:{language:`javascript`,content:`function transformIP(ip) {
    return ip.split('.').map(octet =>
        octet.split('').reverse().join('')
    ).join('.');
}

console.log(transformIP('192.62.255.31')); // 291.26.552.13`}}]}],questionCount:48}]},"./ford-motor/fordreference.js":{id:`ford-motor`,name:`Ford Motor`,interviews:[{name:`Reference Interview`,rounds:[{name:`Core Java`,questions:[{question:`Explain the concept of OOP in Java.`,answer:`OOP is a programming paradigm based on objects containing data and code. Four main principles: Encapsulation, Inheritance, Polymorphism, and Abstraction.`,code:null},{question:`Difference between == and equals() in Java?`,answer:`== checks reference equality (same object), while equals() checks value equality (same content).`,code:{language:`java`,content:`String s1 = new String("Hello");
String s2 = new String("Hello");
System.out.println(s1 == s2); // false
System.out.println(s1.equals(s2)); // true`}},{question:`How does Java handle memory management?`,answer:`Java uses automatic garbage collection. It allocates memory on the heap for new objects and reclaims memory from unreferenced objects.`,code:null},{question:`How do you handle exceptions in Java?`,answer:`Using try-catch blocks — code that might throw an exception goes in the try block, handling code in the catch block.`,code:{language:`java`,content:`try { riskyOperation(); } catch (Exception e) { e.printStackTrace(); }`}},{question:`What are checked and unchecked exceptions?`,answer:`- Checked: must be caught or declared (IOException)
- Unchecked: runtime exceptions (NullPointerException)`,code:null},{question:`Given a list of employees, find the list based on gender.`,answer:`Use groupingBy to group employees by gender.`,code:{language:`java`,content:`Map<String, List<Employee>> employeesByGender = employees.stream()
    .collect(Collectors.groupingBy(Employee::getGender));`}}]},{name:`Spring Boot`,questions:[{question:`Explain the basics of Spring Boot.`,answer:`Spring Boot simplifies Spring development with auto-configuration, standalone configuration, and embedded servers.`,code:{language:`java`,content:`@SpringBootApplication
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}`}},{question:`Write a code example for a JPA repository and derived query.`,answer:`Repository interface extending JpaRepository with a derived query method.`,code:{language:`java`,content:`@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    List<Employee> findByGender(String gender);
}`}},{question:`Explain thread pools and their use in Java.`,answer:`Thread pools manage reusable threads for executing tasks, reducing overhead. Java provides ExecutorService.`,code:{language:`java`,content:`ExecutorService executor = Executors.newFixedThreadPool(10);
executor.submit(() -> System.out.println("Task"));
executor.shutdown();`}},{question:`Configure HikariCP in a Spring Boot application.`,answer:`Configure in application.yml for the HikariCP connection pool.`,code:{language:`yaml`,content:`spring:
  datasource:
    url: jdbc:mysql://localhost:3306/db
    username: user
    password: pass
    hikari:
      maximum-pool-size: 10`}},{question:`Explain Hibernate queries and entity graphs.`,answer:`Hibernate queries use HQL or the Criteria API. Entity graphs optimize queries by defining which related entities to fetch.`,code:{language:`java`,content:`@EntityGraph(attributePaths = {"address"})
@Query("SELECT e FROM Employee e WHERE e.id = :id")
Optional<Employee> findByIdWithAddress(@Param("id") Long id);`}},{question:`How do you write test cases for controller, service, and repository?`,answer:`- Controller: @WebMvcTest
- Service: @ExtendWith(MockitoExtension.class)
- Repository: @DataJpaTest`,code:{language:`java`,content:`// Controller: @WebMvcTest
// Service: @ExtendWith(MockitoExtension.class) with @Mock
// Repository: @DataJpaTest`}},{question:`Explain code coverage and tools like SonarQube.`,answer:`Code coverage measures how much of the code is tested. SonarQube analyzes code quality, coverage, and provides improvement reports.`,code:null},{question:`What are deployment tools and how do they work?`,answer:`Deployment tools like Jenkins, Docker, and Kubernetes automate deployment, ensure consistent environments, and simplify scaling.`,code:null},{question:`How do you handle exceptions in Spring Boot?`,answer:`Using @ExceptionHandler in controllers or @ControllerAdvice for global handling.`,code:{language:`java`,content:`@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleException(Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
    }
}`}}]},{name:`React`,questions:[{question:`Difference between vanilla JavaScript and React.`,answer:`Vanilla JS is plain JavaScript. React is a library for building UIs with components, state management, and the virtual DOM.`,code:null},{question:`Explain useState and useEffect hooks.`,answer:`useState adds state to functional components. useEffect performs side effects like data fetching.`,code:{language:`jsx`,content:`const [data, setData] = useState([]);
useEffect(() => { fetchData().then(setData); }, []);`}},{question:`Write a basic API call using React.`,answer:`Use fetch or axios inside useEffect.`,code:{language:`jsx`,content:`useEffect(() => {
    fetch('https://api.example.com/data')
        .then(response => response.json())
        .then(data => setData(data));
}, []);`}}]},{name:`Pair Programming: Coding Problems`,questions:[{question:`Develop a UI page to show a list of items in a search page using React.`,answer:`Create a component with a search input and a filtered list.`,code:{language:`jsx`,content:`const ItemList = () => {
    const [items, setItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetch('http://localhost:8080/api/items')
            .then(response => response.json())
            .then(data => setItems(data));
    }, []);

    const filteredItems = items.filter(item =>
        item.name.includes(searchTerm)
    );

    return (
        <div>
            <input type="text" placeholder="Search"
                value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
            <ul>{filteredItems.map(item => <li key={item.id}>{item.name}</li>)}</ul>
        </div>
    );
};`}},{question:`Write an API with Spring Boot and use the endpoint in React to show a list.`,answer:`Create a Spring Boot REST API with a GET endpoint. The React component fetches and displays the data.`,code:{language:`java`,content:`@RestController
@RequestMapping("/api/items")
public class ItemController {
    @GetMapping
    public List<Item> getAllItems() {
        return itemService.getAllItems();
    }
}`}}]}],questionCount:20}]},"./fss/fss.js":{id:`fss`,name:`FSS`,interviews:[{name:`FSS`,questionCount:13,rounds:[{name:`Interview Questions`,questions:[{question:`Brief about the project.`,answer:`The project is a real-time banking application designed to handle customer transactions and registration. It includes functionalities such as account management, transaction processing, and secure data handling using a microservices architecture and deployed on Docker.`,code:null},{question:`Steps to deploy microservices to Docker.`,answer:`- Dockerize each microservice by creating a Dockerfile
- Build Docker images using the docker build command
- Run containers using docker run, specifying network configurations if needed
- Configure networking with Docker Compose or custom networks
- Monitor and scale using Docker commands or orchestration tools`,code:{language:`dockerfile`,content:`# Dockerfile
FROM openjdk:17
COPY target/app.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]

# Build image
docker build -t myapp:latest .

# Run container
docker run -p 8080:8080 myapp:latest`}},{question:`Write a SQL query to retrieve first name, last name, age from the customer table, and item, amount from the item table where age is greater than 25.`,answer:`Join the customer and item tables on customer_id, and filter by age > 25.`,code:{language:`sql`,content:`SELECT c.first_name, c.last_name, c.age, i.item, i.amount
FROM customer c
JOIN item i ON c.customer_id = i.customer_id
WHERE c.age > 25;`}},{question:`Explain Actuator in Spring Boot.`,answer:`Actuator provides production-ready features in Spring Boot, such as monitoring and managing applications via endpoints like health, metrics, and environment information, making it easier to maintain and troubleshoot services.`,code:{language:`properties`,content:`management.endpoints.web.exposure.include=health,info,metrics
management.endpoint.health.show-details=always`}},{question:`How do you expose REST API call endpoints?`,answer:`Expose endpoints by annotating controller methods with @GetMapping, @PostMapping, @PutMapping, @DeleteMapping, and defining URI paths in Spring Boot applications.`,code:{language:`java`,content:`@RestController
@RequestMapping("/api/users")
public class UserController {
    @GetMapping("/{id}")
    public User getUser(@PathVariable Long id) { }
    @PostMapping
    public User createUser(@RequestBody User user) { }
}`}},{question:`How do you document request and response options using Swagger, and how to convert to YAML?`,answer:`Use Swagger annotations in code (@ApiOperation, @ApiResponse) to document API endpoints. Convert the generated Swagger JSON documentation to YAML using Swagger Editor or online converters.`,code:{language:`java`,content:`@Operation(summary = "Get user by ID")
@ApiResponses(value = {
    @ApiResponse(responseCode = "200", description = "User found"),
    @ApiResponse(responseCode = "404", description = "User not found")
})
@GetMapping("/{id}")
public User getUser(@PathVariable Long id) { }`}},{question:`What are Servlet and JSP?`,answer:`Servlet: A Java class that handles HTTP requests and generates dynamic web content.
JSP (JavaServer Pages): A technology that allows embedding Java code into HTML to create dynamic web pages, simplifying web development by separating business logic from presentation.`,code:{language:`java`,content:`// Servlet
@WebServlet("/hello")
public class HelloServlet extends HttpServlet {
    protected void doGet(HttpServletRequest request, HttpServletResponse response) {
        response.getWriter().println("Hello");
    }
}

// JSP
<%@ page language="java" contentType="text/html" %>
<html><body>Hello World</body></html>`}},{question:`What are implicit objects in JSP?`,answer:`Implicit objects are pre-defined objects available in JSP for accessing various functionalities like request, response, session, application, out, and more, without explicit declaration.`,code:{language:`jsp`,content:`<%
    // request, response, session, out are implicit objects
    out.println(request.getParameter("name"));
    session.setAttribute("user", "John");
%>`}},{question:`Describe Java Streams and Lambda functions.`,answer:`Streams: A sequence of elements supporting functional-style operations to process collections, like filtering and mapping.
Lambda Functions: Anonymous functions used to implement functional interfaces, enabling concise and readable code, especially in stream operations.`,code:{language:`java`,content:`List<String> names = Arrays.asList("John", "Jane", "Jack");
names.stream()
    .filter(name -> name.startsWith("J"))
    .map(String::toUpperCase)
    .forEach(System.out::println);`}},{question:`What are the steps to establish a JDBC connection?`,answer:`- Load the JDBC driver using Class.forName()
- Establish a connection using DriverManager.getConnection()
- Create a statement object using connection.createStatement()
- Execute SQL queries with statement.executeQuery() or executeUpdate()
- Close the connection using connection.close()`,code:{language:`java`,content:`Class.forName("com.mysql.jdbc.Driver");
Connection conn = DriverManager.getConnection(url, user, password);
Statement stmt = conn.createStatement();
ResultSet rs = stmt.executeQuery("SELECT * FROM users");
conn.close();`}},{question:`Difference between StringBuffer and StringBuilder.`,answer:`StringBuffer: Synchronized and thread-safe but slower due to overhead.
StringBuilder: Non-synchronized, faster, and preferable in single-threaded environments for string manipulation.`,code:{language:`java`,content:`// Thread-safe but slower
StringBuffer sb = new StringBuffer("Hello");
sb.append(" World");

// Faster but not thread-safe
StringBuilder sb2 = new StringBuilder("Hello");
sb2.append(" World");`}},{question:`Create two lists - find common elements and unique elements using Streams.`,answer:`Use filter with contains for common elements. Use concat and distinct for unique elements.`,code:{language:`java`,content:`List<String> list1 = Arrays.asList("java", "aws", "oracle", "python");
List<String> list2 = Arrays.asList("java", "oracle", "jquery");

// Common elements
List<String> common = list1.stream()
    .filter(list2::contains)
    .collect(Collectors.toList());

// Unique elements
List<String> unique = Stream.concat(list1.stream(), list2.stream())
    .distinct()
    .filter(e -> !(list1.contains(e) && list2.contains(e)))
    .collect(Collectors.toList());

System.out.println("Common: " + common); // [java, oracle]
System.out.println("Unique: " + unique); // [aws, python, jquery]`}},{question:`Which mechanism did you use to develop the project?`,answer:`The project was developed using a microservices architecture with Spring Boot for creating RESTful services, Docker for containerization, and a CI/CD pipeline for automated deployments.`,code:null}]}]}]},"./hcl/hcl-0-to-2-years-walkin.js":{id:`hcl`,name:`HCL`,interviews:[{name:`HCL 0-2 Years Walk-in Interview`,questionCount:46,rounds:[{name:`Java MCQ Questions`,questions:[{question:`What is the output? Animal obj = new Dog(); System.out.println(obj.sound());`,answer:`Bark — Runtime polymorphism, child class method called.`,code:{language:`java`,content:`class Animal { String sound() { return "Animal sound"; } }
class Dog extends Animal { String sound() { return "Bark"; } }

Animal obj = new Dog();
System.out.println(obj.sound()); // Bark`}},{question:`What happens if you call a static method on a subclass object?`,answer:`Parent — static methods are not overridden, the method is called based on the reference type.`,code:{language:`java`,content:`Parent obj = new Child();
obj.display(); // Parent`}},{question:`How do you enforce a class to have certain methods?`,answer:`By implementing an interface.`,code:{language:`java`,content:`interface Vehicle { void start(); void stop(); }
class Car implements Vehicle { public void start() { } public void stop() { } }`}},{question:`What is the output of inheritance? A obj = new B(); obj.add(2,3);`,answer:`5 — wait, method overriding means the child class method is called. With the code below the result is 6 (2 * 3).`,code:{language:`java`,content:`class A { int add(int x, int y) { return x + y; } }
class B extends A { int add(int x, int y) { return x * y; } }

A obj = new B();
System.out.println(obj.add(2, 3)); // 6`}},{question:`What is the purpose of using super in inheritance?`,answer:`To call the parent's constructor or access the parent class members.`,code:{language:`java`,content:`class Child extends Parent { Child() { super(); } }`}},{question:`What is the output? int x=10, y=20; int result = (x > y) ? x : y;`,answer:`20 — the ternary selects y since the condition (10 > 20) is false.`,code:{language:`java`,content:`int result = (10 > 20) ? 10 : 20; // 20`}},{question:`What is the output? Test obj = null; obj.display(); (static method)`,answer:`Static method in Test — static methods don't need an instance.`,code:{language:`java`,content:`Test obj = null;
obj.display(); // Static method called`}},{question:`What happens if you override equals but not hashCode?`,answer:`The set size becomes 2 — the HashSet uses hashCode for bucketing, so the two equal objects are treated as different.`,code:{language:`java`,content:`HashSet<Person> set = new HashSet<>();
set.add(new Person("Alice", 25));
set.add(new Person("Alice", 25));
System.out.println(set.size()); // 2`}},{question:`What is the purpose of final keyword?`,answer:`All of the above — prevent inheritance, make a variable constant, prevent method overriding.`,code:{language:`java`,content:`final class Test { final int x = 10; final void display() { } }`}},{question:`What is the output of the method reference example?`,answer:`Hello World.`,code:{language:`java`,content:`Consumer<String> ref = obj::display;
ref.accept("Hello World"); // Hello World`}},{question:`What is the purpose of the Optional class?`,answer:`All of the above — avoid null pointer exceptions, simplify null checks, and provide default values.`,code:{language:`java`,content:`Optional<String> opt = Optional.ofNullable(null);
System.out.println(opt.orElse("Default Value"));`}},{question:`What happens if a stream is reused?`,answer:`IllegalStateException — streams cannot be reused after a terminal operation.`,code:{language:`java`,content:`Stream<String> stream = Stream.of("A", "B", "C");
stream.forEach(System.out::println);
stream.forEach(System.out::println); // IllegalStateException`}},{question:`What is the output of Stream.iterate?`,answer:`1 2 3 4 5`,code:{language:`java`,content:`Stream.iterate(1, n -> n + 1).limit(5).forEach(System.out::println); // 1 2 3 4 5`}},{question:`What happens when an exception is thrown inside a stream pipeline?`,answer:`ArithmeticException.`,code:{language:`java`,content:`Stream.of(1, 2, 0).map(x -> 10 / x).forEach(System.out::println); // ArithmeticException`}},{question:`Difference between map and flatMap?`,answer:`map processes elements, flatMap flattens nested streams.`,code:{language:`java`,content:`list.stream().flatMap(List::stream).collect(Collectors.toList());`}}]},{name:`Coding & SQL`,questions:[{question:`Find the highest salary from the Employee table.`,answer:`Use MAX(salary) or ORDER BY DESC LIMIT 1.`,code:{language:`sql`,content:`SELECT MAX(salary) FROM Employee;
SELECT salary FROM Employee ORDER BY salary DESC LIMIT 1;`}},{question:`Count students by grade (A, B, C, F) based on marks.`,answer:`Use a CASE statement with GROUP BY.`,code:{language:`sql`,content:`SELECT 
    CASE 
        WHEN marks > 80 THEN 'A'
        WHEN marks > 70 THEN 'B'
        WHEN marks > 50 THEN 'C'
        ELSE 'F'
    END AS Grade,
    COUNT(*) AS Count
FROM student
GROUP BY Grade;`}},{question:`List employees with their department names.`,answer:`Use a JOIN between the Employee and Department tables.`,code:{language:`sql`,content:`SELECT Employee.name, Department.name 
FROM Employee 
INNER JOIN Department ON Employee.department_id = Department.id;`}},{question:`Count employees in each department.`,answer:`Use GROUP BY department_id.`,code:{language:`sql`,content:`SELECT department_id, COUNT(*) FROM Employee GROUP BY department_id;`}},{question:`Increase salary by 10% for employees in department 2.`,answer:`Use UPDATE with a salary calculation.`,code:{language:`sql`,content:`UPDATE Employee SET salary = salary * 1.10 WHERE department_id = 2;`}},{question:`Find the name with the highest score (L=1, M=3, H=5 points).`,answer:`Calculate the score for each string and compare.`,code:{language:`java`,content:`public class HighScore {
    public static String findHighScore(String bob, String shirly) {
        int bobScore = calculateScore(bob);
        int shirlyScore = calculateScore(shirly);
        return bobScore > shirlyScore ? "bob" : "shirly";
    }

    private static int calculateScore(String input) {
        int score = 0;
        for (char ch : input.toCharArray()) {
            if (ch == 'L') score += 1;
            else if (ch == 'M') score += 3;
            else if (ch == 'H') score += 5;
        }
        return score;
    }

    public static void main(String[] args) {
        System.out.println(findHighScore("LMM", "HHH")); // shirly
    }
}`}}]},{name:`Streams & Lambda MCQ`,questions:[{question:`How to filter even numbers from a list using streams?`,answer:`filter(x -> x % 2 == 0)`,code:{language:`java`,content:`numbers.stream().filter(x -> x % 2 == 0).collect(Collectors.toList());`}},{question:`How to sort a list of strings using streams?`,answer:`sorted()`,code:{language:`java`,content:`names.stream().sorted().collect(Collectors.toList());`}},{question:`How to convert a list of integers into their squares?`,answer:`map(x -> x * x)`,code:{language:`java`,content:`numbers.stream().map(x -> x * x).collect(Collectors.toList());`}},{question:`How to group employees by department?`,answer:`collect(Collectors.groupingBy(Employee::getDepartment))`,code:{language:`java`,content:`employees.stream().collect(Collectors.groupingBy(Employee::getDepartment));`}},{question:`How to find the first element in a stream?`,answer:`findFirst()`,code:{language:`java`,content:`numbers.stream().findFirst();`}},{question:`How to calculate the sum of all elements in a list?`,answer:`reduce(0, (a, b) -> a + b)`,code:{language:`java`,content:`numbers.stream().reduce(0, (a, b) -> a + b);`}},{question:`How to find the maximum value in a list?`,answer:`Any of the above — reduce(Integer::max), max(Integer::compare), mapToInt(x->x).max()`,code:{language:`java`,content:`numbers.stream().reduce(Integer::max);
numbers.stream().mapToInt(x -> x).max();`}},{question:`How to create a custom functional interface?`,answer:`(x, y) -> x + y`,code:{language:`java`,content:`Calculator add = (x, y) -> x + y;`}},{question:`How to find duplicate elements in a list?`,answer:`filter(x -> Collections.frequency(numbers, x) > 1)`,code:{language:`java`,content:`numbers.stream().filter(x -> Collections.frequency(numbers, x) > 1).collect(Collectors.toSet());`}},{question:`How to concatenate two streams?`,answer:`Stream.concat(stream1, stream2)`,code:{language:`java`,content:`Stream<String> combined = Stream.concat(stream1, stream2);`}}]},{name:`HTML, CSS & JavaScript MCQ`,questions:[{question:`Which CSS property is used to align items in a flex container along the cross-axis?`,answer:`a) align-items
b) justify-content
c) align-self
d) flex-direction
Answer: a) align-items`,code:null},{question:`Which property is used to position an element relative to its normal position in CSS?`,answer:`a) absolute
b) relative
c) fixed
d) sticky
Answer: b) relative`,code:null},{question:`Which of the following properties is used to set the margin between an element's border and its surroundings?`,answer:`a) border
b) padding
c) margin
d) content
Answer: c) margin`,code:null},{question:`Which CSS rule is used for applying styles based on screen width?`,answer:`a) @screen
b) @media
c) @viewport
d) @responsive
Answer: b) @media`,code:null},{question:`Which CSS property controls the stacking order of elements?`,answer:`a) z-order
b) z-index
c) order
d) stacking
Answer: b) z-index`,code:null},{question:`Which HTML tag is used to create a table header?`,answer:`a) <thead>
b) <th>
c) <tr>
d) <table>
Answer: b) <th>`,code:null},{question:`Which attribute is used to specify the destination of a hyperlink?`,answer:`a) href
b) src
c) link
d) target
Answer: a) href`,code:null},{question:`Which element is used to define a form in HTML?`,answer:`a) <form>
b) <input>
c) <textarea>
d) <button>
Answer: a) <form>`,code:null},{question:`Which tag is used to define an ordered list?`,answer:`a) <ul>
b) <li>
c) <ol>
d) <dl>
Answer: c) <ol>`,code:null},{question:`Which attribute is used to provide an alternative text for an image in HTML?`,answer:`a) alt
b) title
c) src
d) desc
Answer: a) alt`,code:null},{question:`Which of the following is the correct way to declare a function in JavaScript?`,answer:`a) function myFunction() {}
b) let myFunction() {}
c) function = myFunction() {}
d) myFunction() function {}
Answer: a) function myFunction() {}`,code:null},{question:`How do you access the second element in an array arr = [10, 20, 30]?`,answer:`a) arr[2]
b) arr[1]
c) arr(2)
d) arr[3]
Answer: b) arr[1]`,code:null},{question:`How do you access the name property of an object person = {name: "John", age: 30}?`,answer:`a) person["name"]
b) person.name
c) person[name]
d) Both a) and b)
Answer: d) Both a) and b)`,code:null},{question:`Which method is used to attach an event listener to an element in JavaScript?`,answer:`a) addEvent()
b) attachEvent()
c) addEventListener()
d) bindEvent()
Answer: c) addEventListener()`,code:null},{question:`Which JavaScript loop will print numbers from 1 to 5?`,answer:`a)
b)
c)
d) All of the above
Answer: d) All of the above`,code:{language:`javascript`,content:`while (i < 5) {
    console.log(i);
    i++;
}`}}]}]}]},"./hcl/hcl-java-fsd.js":{id:`hcl`,name:`HCL`,interviews:[{name:`HCL L2 Technical Interview`,questionCount:40,rounds:[{name:`Java 8 Features`,questions:[{question:`What are the new features in Java 8?`,answer:`Java 8 introduced:
- Lambda expressions
- Functional interfaces
- Stream API
- New Date and Time API (java.time)
- Default methods in interfaces
- Method references
- Optional class`,code:null},{question:`What is a functional interface?`,answer:`A functional interface is an interface with exactly one abstract method. It can have multiple default or static methods.
- Examples: Runnable, Callable, Comparator`,code:{language:`java`,content:`@FunctionalInterface
interface Calculator { int add(int a, int b); }`}},{question:`What is a lambda expression?`,answer:`A lambda expression is a concise way to represent an anonymous function. Syntax: (parameters) -> expression. Used to implement functional interfaces.`,code:{language:`java`,content:`(a, b) -> a + b`}},{question:`What is a stream in Java?`,answer:`A stream is a sequence of elements supporting sequential and parallel aggregate operations. Used for processing collections in a functional style.`,code:{language:`java`,content:`list.stream().filter(s -> s.startsWith("A")).collect(Collectors.toList());`}},{question:`What is a parallel stream?`,answer:`A parallel stream enables parallel processing of data by splitting data into multiple chunks and processing them concurrently using multiple threads.`,code:{language:`java`,content:`list.parallelStream().forEach(System.out::println);`}},{question:`Difference between stream and parallel stream?`,answer:`Stream processes data sequentially, while a parallel stream divides data into multiple chunks and processes them concurrently using multiple threads.`,code:null},{question:`How does the internal process work in parallel streams?`,answer:`Parallel streams use ForkJoinPool to split data into smaller chunks, process them concurrently in multiple threads, and then merge the results.`,code:null},{question:`What is a static method in Java?`,answer:`A static method belongs to the class rather than instances. It can be called without creating an instance using ClassName.methodName().`,code:{language:`java`,content:`Math.sqrt(16); // Static method`}},{question:`How can we use static methods in an interface?`,answer:`Static methods in interfaces can be used to provide utility methods related to the interface. They are called using the interface name.`,code:{language:`java`,content:`interface Utils { static void print(String s) { System.out.println(s); } }
Utils.print("Hello");`}},{question:`What is a default method in Java?`,answer:`Default methods are methods in interfaces that have a body. They provide a default implementation that can be used by implementing classes.`,code:{language:`java`,content:`interface Vehicle { default void start() { System.out.println("Starting"); } }`}},{question:`What is the use of default methods in interfaces?`,answer:`Default methods allow interfaces to evolve without breaking existing implementations. They enable the addition of new methods with default behavior.`,code:null},{question:`What is a method reference in Java?`,answer:`Method references are a shorthand notation for calling a method. They provide a way to refer to methods without invoking them.`,code:{language:`java`,content:`list.forEach(System.out::println);`}},{question:`How many ways can we create method references?`,answer:`Four ways:
- Reference to a static method
- Reference to an instance method of a specific object
- Reference to an instance method of an arbitrary object
- Reference to a constructor`,code:{language:`java`,content:`ClassName::staticMethod
instance::instanceMethod
ClassName::instanceMethod
ClassName::new`}}]},{name:`Multithreading`,questions:[{question:`How many ways can we create a thread in Java?`,answer:`Two main ways: implementing the Runnable interface or extending the Thread class. ExecutorService can also be used.`,code:{language:`java`,content:`// Runnable
class MyRunnable implements Runnable { public void run() { } }

// Thread
class MyThread extends Thread { public void run() { } }`}},{question:`What is ExecutorService in threads?`,answer:`ExecutorService is a high-level replacement for managing and controlling thread execution. It provides methods for managing a pool of threads and scheduling tasks.`,code:{language:`java`,content:`ExecutorService executor = Executors.newFixedThreadPool(5);
executor.submit(() -> System.out.println("Task"));
executor.shutdown();`}},{question:`How many ways can we create an ExecutorService?`,answer:`Four ways: newFixedThreadPool, newSingleThreadExecutor, newCachedThreadPool, and newScheduledThreadPool.`,code:{language:`java`,content:`Executors.newFixedThreadPool(10);
Executors.newSingleThreadExecutor();
Executors.newCachedThreadPool();
Executors.newScheduledThreadPool(5);`}}]},{name:`Spring Boot`,questions:[{question:`What is autowiring in Spring?`,answer:`Autowiring is a feature in Spring that allows the framework to automatically inject dependencies into a bean.`,code:{language:`java`,content:`@Autowired private UserService userService;`}},{question:`How many modes of autowiring are there?`,answer:`Four modes: <@Autowired> (by type), <@Qualifier> (by name), <@Resource> (by name), and <@Inject> (by type).`,code:null},{question:`Explain @Qualifier and @Inject.`,answer:`<@Qualifier> is used to provide specific beans when multiple candidates are available. <@Inject> is a Java standard annotation used to inject dependencies.`,code:{language:`java`,content:`@Autowired @Qualifier("emailService") private MessageService service;
@Inject private UserService userService;`}},{question:`Difference between @Autowired and @Qualifier?`,answer:`<@Autowired> injects by type automatically. <@Qualifier> is used with <@Autowired> to specify which bean to inject when multiple beans of the same type exist.`,code:null},{question:`What are the limitations of autowiring?`,answer:`Limitations include:
- Ambiguity when multiple beans of the same type exist
- Difficulty in identifying dependencies at runtime
- Inability to inject beans based on dynamic conditions`,code:null},{question:`What is Spring Security?`,answer:`Spring Security is a framework that provides comprehensive security services for Java applications, including authentication, authorization, and protection against various security threats.`,code:null},{question:`How do you configure Spring Security?`,answer:`Spring Security can be configured using Java configuration with <@EnableWebSecurity> and SecurityConfig classes, or XML configuration.`,code:{language:`java`,content:`@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter { }`}},{question:`What is JWT token-based authentication?`,answer:`JWT is a method where authentication information is transmitted as a JSON object to verify the identity of users.`,code:null}]},{name:`Microservices`,questions:[{question:`What is an API gateway?`,answer:`An API gateway is a server that acts as an API front-end, receiving API requests, enforcing throttling, routing requests, and aggregating results.`,code:null},{question:`How to implement an API gateway? Which dependency is needed?`,answer:`Use Spring Cloud Gateway or Netflix Zuul. Dependencies: spring-cloud-starter-gateway or zuul.`,code:{language:`xml`,content:`<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-gateway</artifactId>
</dependency>`}},{question:`What is load balancing?`,answer:`Load balancing distributes incoming network traffic across multiple servers to ensure no single server becomes overwhelmed.`,code:null},{question:`How do you implement load balancing in microservices?`,answer:`Client-side load balancing with libraries like Ribbon, or server-side load balancing with tools like Nginx or HAProxy.`,code:null},{question:`What is fault tolerance?`,answer:`Fault tolerance refers to the ability of a system to continue operating properly in the event of a failure of some of its components.`,code:null},{question:`What is a circuit breaker?`,answer:`A circuit breaker is a design pattern that prevents a system from making calls to a failing service, allowing it to recover and preventing cascading failures.`,code:null},{question:`How do you implement a circuit breaker?`,answer:`Using libraries like Resilience4j or Hystrix.`,code:{language:`java`,content:`@CircuitBreaker(name = "service", fallbackMethod = "fallback")
public String callService() { }`}},{question:`What are the states of a circuit breaker?`,answer:`Three states:
- Closed — normal operation
- Open — the service is failing
- Half-Open — test if the service has recovered`,code:null}]},{name:`REST & SQL`,questions:[{question:`What are the features of RESTful web services?`,answer:`Features:
- Stateless communication
- Resource-based URLs
- Standard HTTP methods (GET, POST, PUT, DELETE)
- JSON or XML responses
- HTTP status codes`,code:null},{question:`What are HTTP status codes?`,answer:`200 OK, 201 Created, 204 No Content, 400 Bad Request, 401 Unauthorized, 404 Not Found, 500 Internal Server Error.`,code:null},{question:`Write a query to get the username when the name starts with 'A' and ends with 'E'.`,answer:`Use LIKE with wildcards.`,code:{language:`sql`,content:`SELECT username FROM users WHERE name LIKE 'A%E';`}},{question:`Write an SQL query to find the 2nd maximum salary.`,answer:`Use a subquery with MAX.`,code:{language:`sql`,content:`SELECT MAX(salary) FROM employees WHERE salary < (SELECT MAX(salary) FROM employees);`}},{question:`Write an SQL query to find the 10th maximum salary.`,answer:`Use LIMIT with OFFSET.`,code:{language:`sql`,content:`SELECT salary FROM (SELECT DISTINCT salary FROM employees ORDER BY salary DESC LIMIT 10) AS temp ORDER BY salary ASC LIMIT 1;`}},{question:`Difference between WHERE and HAVING?`,answer:`WHERE filters rows before grouping. HAVING filters groups after the GROUP BY operation. WHERE cannot use aggregate functions, HAVING can.`,code:null},{question:`Write Java code to find names starting with 'A' using streams.`,answer:`Use filter with startsWith.`,code:{language:`java`,content:`List<String> result = names.stream().filter(name -> name.startsWith("A")).collect(Collectors.toList());`}},{question:`Kaprekar Routine - Given number 6178, how many iterations to reach 1629 and 99?`,answer:`Sort digits ascending and descending, subtract, and repeat.`,code:{language:`java`,content:`public class KaprekarRoutine {
    public static void main(String[] args) {
        int number = 6178;
        int iterations = 0;
        while (number != 6174 && number != 99) {
            number = performKaprekarIteration(number);
            iterations++;
        }
        System.out.println("Total iterations: " + iterations);
    }

    private static int performKaprekarIteration(int number) {
        String numStr = String.format("%04d", number);
        char[] numChars = numStr.toCharArray();
        Arrays.sort(numChars);
        int smallNum = Integer.parseInt(new String(numChars));
        String largeStr = new StringBuilder(new String(numChars)).reverse().toString();
        int largeNum = Integer.parseInt(largeStr);
        return largeNum - smallNum;
    }
}`}}]}]}]},"./hcl/hcl.js":{id:`hcl`,name:`HCL`,interviews:[{name:`HCL L1 Interview`,questionCount:10,rounds:[{name:`Project & Architecture`,questions:[{question:`Brief about the project.`,answer:`The project is focused on developing a distributed banking application that handles real-time transactions using a microservices architecture. It includes features like customer registration, account management, and secure transaction processing. Technologies like Spring Boot, Kafka, Docker, and React are used, ensuring high scalability and reliability.`,code:null},{question:`Explain Kafka architecture.`,answer:`Kafka architecture consists of Producers, Consumers, Brokers, Topics, and Zookeeper.
- Producers send data to Kafka topics, while Consumers read data from these topics
- Kafka Brokers manage the storage and retrieval of messages
- Zookeeper handles metadata, including leader election and partition management
- Together this ensures Kafka's fault tolerance and distributed nature`,code:null},{question:`What is Jenkins and how do you use it?`,answer:`Jenkins is an open-source automation server used for continuous integration and continuous delivery (CI/CD).
- It automates the build, test, and deployment processes, enabling faster and more reliable software delivery
- I use Jenkins to trigger automated builds on code commits, run tests, and deploy applications to different environments`,code:null}]},{name:`Java Features`,questions:[{question:`What are the features of Java 17?`,answer:`Java 17 includes several new features:
- Sealed classes
- Pattern matching for switch (preview)
- New macOS rendering pipeline
- Enhanced pseudo-random number generators
- Removal of the experimental AOT and JIT compilers
- Long-term support (LTS) for stability in enterprise applications`,code:null},{question:`What are the features of Java 8?`,answer:`Java 8 introduced several major features:
- Lambda expressions
- The Stream API for functional-style operations on collections
- The new Date and Time API (java.time)
- Default methods in interfaces
- The Optional class to handle null values more gracefully`,code:null}]},{name:`Coding Questions`,questions:[{question:`Create a single thread in Java using different approaches.`,answer:`Three ways to create threads: extending the Thread class, implementing the Runnable interface, or using ExecutorService.`,code:{language:`java`,content:`// Using Thread class
Thread thread1 = new Thread() {
    public void run() { System.out.println("Thread using Thread class"); }
};
thread1.start();

// Using Runnable interface
Runnable runnable = () -> System.out.println("Thread using Runnable");
Thread thread2 = new Thread(runnable);
thread2.start();

// Using ExecutorService
ExecutorService executor = Executors.newSingleThreadExecutor();
executor.submit(() -> System.out.println("Thread using ExecutorService"));
executor.shutdown();`}},{question:`Create a text input and password input in React and display them when a button is clicked.`,answer:`Use useState for text and password state, and display them on button click.`,code:{language:`jsx`,content:`import React, { useState } from 'react';

function App() {
    const [text, setText] = useState('');
    const [password, setPassword] = useState('');
    const [show, setShow] = useState(false);

    return (
        <div>
            <input type="text" placeholder="Enter text" value={text} onChange={(e) => setText(e.target.value)} />
            <input type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={() => setShow(true)}>Show</button>
            {show && <div><p>Text: {text}</p><p>Password: {password}</p></div>}
        </div>
    );
}

export default App;`}}]},{name:`General Questions`,questions:[{question:`Explain your weekly tasks.`,answer:`My weekly tasks typically involve developing new features, fixing bugs, and optimizing existing code for better performance.
- Collaborate with team members in daily stand-up meetings
- Write unit and integration tests
- Participate in code reviews
- Contribute to the continuous integration pipeline and ensure smooth deployments`,code:null},{question:`What is Agile methodology?`,answer:`Agile methodology is an iterative approach to software development and project management.
- Emphasizes collaboration, flexibility, and customer feedback
- Allows teams to deliver small, functional pieces of software incrementally
- Promotes adaptive planning, evolutionary development, early delivery, and continuous improvement`,code:null},{question:`What is Jira and how do you use it?`,answer:`Jira is a project management tool used for tracking tasks, bugs, and issues.
- Supports Agile methodologies like Scrum and Kanban
- I use Jira to manage and prioritize tasks, track progress through sprints, create and assign issues, and document project workflows
- Jira also integrates with CI/CD pipelines for automated updates`,code:null}]}]}]},"./hire-bridge-consultancy/hirebridgeconsultancy.js":{id:`hire-bridge-consultancy`,name:`Hire Bridge Consultancy`,interviews:[{name:`HireBridgeConsultancy`,questionCount:17,rounds:[{name:`Interview Questions`,questions:[{question:`Explain your project briefly.`,answer:`My project involves building a real-time banking application for customer registration and transaction processing, using technologies like Spring Boot, React, microservices, and MySQL.
- Core functionality includes account management, secure transaction handling, and customer onboarding
- I was responsible for backend API development, database design, and integration with the frontend`,code:null},{question:`Given an array of integers and a number 'sum', print all pairs in the array whose sum equals 'sum'.`,answer:`Use a HashMap to store the frequency of numbers. For each element, find its complement — if the complement exists in the map, print a pair for each occurrence.
- Time: O(n), Space: O(n)
- Example: arr=[1,5,7,-1,5], sum=6 → Output: (5,1), (1,5), (7,-1), (-1,7)`,code:{language:`java`,content:`public class PairSum {
    public static void main(String[] args) {
        int[] arr = {1, 5, 7, -1, 5};
        int exp = 6;
        Map<Integer, Integer> map = new LinkedHashMap<>();
        for (int i = 0; i < arr.length; i++) {
            int e = arr[i];
            int dif = exp - e;
            if (map.containsKey(dif)) {
                for (int j = 1; j <= map.get(dif); j++) {
                    System.out.println("(" + dif + "," + e + ")");
                }
            }
            map.put(e, map.getOrDefault(e, 0) + 1);
        }
    }
}
// Output: (5,1), (1,5), (5,1), (7,-1), (-1,7)`}},{question:`Design a table structure for books and members.`,answer:`Design the following tables:
- Books (BookID PK, Title, AuthorID FK)
- Authors (AuthorID PK, Name)
- Members (MemberID PK, Name)
- Borrowing (BorrowID PK, MemberID FK, BookID FK, BorrowDate, DueDate, ReturnDate)`,code:{language:`sql`,content:`CREATE TABLE Authors (
    AuthorID INT PRIMARY KEY,
    Name VARCHAR(100)
);

CREATE TABLE Books (
    BookID INT PRIMARY KEY,
    Title VARCHAR(200),
    AuthorID INT,
    FOREIGN KEY (AuthorID) REFERENCES Authors(AuthorID)
);

CREATE TABLE Members (
    MemberID INT PRIMARY KEY,
    Name VARCHAR(100)
);

CREATE TABLE Borrowing (
    BorrowID INT PRIMARY KEY,
    MemberID INT,
    BookID INT,
    BorrowDate DATE,
    DueDate DATE,
    ReturnDate DATE,
    FOREIGN KEY (MemberID) REFERENCES Members(MemberID),
    FOREIGN KEY (BookID) REFERENCES Books(BookID)
);`}},{question:`How do you write a query to get data for a specific page in a database?`,answer:`Use LIMIT and OFFSET for pagination.`,code:{language:`sql`,content:`SELECT * FROM employees LIMIT 10 OFFSET 20;
-- This fetches 10 records starting from the 21st record`}},{question:`What happens if an exception is thrown in a method? Explain with code example.`,answer:`When an exception is thrown, it disrupts the normal program flow. If not caught, the method terminates and the exception propagates to the calling method. Use try-catch to handle it.`,code:{language:`java`,content:`public class ExceptionExample {
    public static void main(String[] args) {
        try {
            divide(10, 0);
        } catch (ArithmeticException e) {
            System.out.println("Caught Exception: " + e);
        }
    }

    public static int divide(int a, int b) throws ArithmeticException {
        return a / b; // Throws ArithmeticException if b is 0
    }
}`}},{question:`How do you store unique employee names in a Map in Java?`,answer:`Use a HashMap with the employee name as the key — this ensures uniqueness by key.`,code:{language:`java`,content:`Map<String, Employee> employeeMap = new HashMap<>();
employeeMap.put("John", new Employee("John"));
employeeMap.put("Alice", new Employee("Alice"));
// Duplicate key will overwrite the existing value`}},{question:`How do you sort a list of employees based on employee names?`,answer:`Use Comparator.comparing with a method reference.`,code:{language:`java`,content:`List<Employee> employees = new ArrayList<>();
employees.add(new Employee("John"));
employees.add(new Employee("Alice"));
employees.sort(Comparator.comparing(Employee::getName));`}},{question:`What is dependency injection?`,answer:`Dependency injection is a design pattern used in Spring to manage object dependencies by injecting them at runtime rather than defining them manually in code.
- Promotes loose coupling and testability`,code:null},{question:`Give an example of dependency injection in Spring Boot.`,answer:`Use @Autowired to inject the service dependency into the controller via constructor injection.`,code:{language:`java`,content:`@Service
public class EmployeeService {
    public String getEmployee() {
        return "Employee Details";
    }
}

@RestController
public class EmployeeController {
    private final EmployeeService employeeService;

    @Autowired
    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @GetMapping("/employee")
    public String getEmployee() {
        return employeeService.getEmployee();
    }
}`}},{question:`How do you pass dependency from controller to service in Spring Boot?`,answer:`Pass the service class dependency to the controller using the @Autowired annotation — Spring injects the service object at runtime.`,code:{language:`java`,content:`@RestController
public class MyController {
    @Autowired
    private MyService myService;
}`}},{question:`List some common Spring Boot annotations.`,answer:`- @SpringBootApplication: entry point
- @Autowired: inject dependencies
- @RestController: REST controller
- @Service: service layer
- @Repository: DAO layer
- @GetMapping, @PostMapping: HTTP method mappings`,code:null},{question:`How do you retrieve database data based on a particular page in Spring Boot?`,answer:`Use Pageable from Spring Data JPA with PageRequest.`,code:{language:`java`,content:`Pageable pageable = PageRequest.of(pageNumber, pageSize);
Page<Employee> employees = employeeRepository.findAll(pageable);`}},{question:`How do you handle the application.properties file in Spring Boot?`,answer:`application.properties is used for configuring application settings like database connections, server ports, and environment properties. Access values using @Value or @ConfigurationProperties.`,code:{language:`properties`,content:`# application.properties
server.port=8080
spring.datasource.url=jdbc:mysql://localhost:3306/db

# Access in code
@Value("\${server.port}")
private int port;`}},{question:`How do you develop code using a Git repository?`,answer:`- Clone the repository using git clone
- Create a branch using git checkout -b new-branch
- Make changes and commit using git commit
- Push the branch using git push
- Create a pull request to merge the changes`,code:{language:`bash`,content:`git clone <repo-url>
git checkout -b feature-branch
git add .
git commit -m "message"
git push origin feature-branch`}},{question:`How do you deploy your project?`,answer:`- Build the project using mvn clean install
- Deploy the generated .jar or .war file to a server (Tomcat, AWS, Kubernetes)
- Use CI/CD pipelines for continuous deployment`,code:{language:`bash`,content:`mvn clean install
java -jar target/app.jar
# Or deploy to a cloud platform`}},{question:`Which cloud are you using for deployment?`,answer:`I am using AWS (Amazon Web Services), utilizing services like Elastic Beanstalk, EC2, or Kubernetes for application hosting.`,code:null},{question:`How do you communicate between two microservices?`,answer:`Microservices communicate using:
- REST APIs via HTTP requests
- Message brokers like RabbitMQ, Kafka for asynchronous communication
- Feign clients in Spring Boot for simplified HTTP calls`,code:{language:`java`,content:`// REST API
RestTemplate rest = new RestTemplate();
User user = rest.getForObject("http://user-service/users/1", User.class);

// Feign Client
@FeignClient("user-service")
public interface UserClient {
    @GetMapping("/users/{id}")
    User getUser(@PathVariable Long id);
}

// Kafka
@KafkaListener(topics = "user-events")
public void handleEvent(UserEvent event) { }`}}]}]}]},"./ibs-software-walk-in-2025-2026/ibs-2025.js":{id:`ibs-software-walk-in-2025-2026`,name:`IBS Software (walk_in 2025, 2026)`,interviews:[{name:`IBS (2025)`,rounds:[{name:`First Round: Pen & Paper Coding`,questions:[{question:`Given an array, find the number of target element pairs whose sum equals the target value.`,answer:`Use a HashSet to track seen numbers.
- For each number, check if its complement (target - num) exists in the set.
- Count a pair whenever the complement is found.
- Time: O(n), Space: O(n)
- Example: arr=[1,3,4,5,1,5,0,-1], target=4 → Pairs: (1,3), (4,0), (5,-1) → Output: 3`,code:{language:`java`,content:`import java.util.*;

public class TargetPairCount {
    public static int countPairs(int[] arr, int target) {
        Set<Integer> seen = new HashSet<>();
        int count = 0;
        for (int num : arr) {
            if (seen.contains(target - num)) {
                count++;
            }
            seen.add(num);
        }
        return count;
    }

    public static void main(String[] args) {
        int[] arr = {1, 3, 4, 5, 1, 5, 0, -1};
        int target = 4;
        System.out.println(countPairs(arr, target)); // Output: 3
    }
}`}}]},{name:`Second Round: Technical Interview`,questions:[{question:`Given an array, replace each element with the next largest element. If no larger element exists, replace it with -1.`,answer:`Use a Stack to find the next greater element by traversing from right to left.
- For each element, pop all smaller or equal elements from the stack.
- The top of the stack (if any) is the next greater element.
- If the stack is empty, the answer is -1.
- Time: O(n), Space: O(n)
- Example: Input [1,2,0,4,11,0,1] → Output [2,4,4,11,-1,1,-1]`,code:{language:`java`,content:`import java.util.*;

public class NextGreaterElement {
    public static int[] nextGreater(int[] arr) {
        int n = arr.length;
        int[] result = new int[n];
        Stack<Integer> stack = new Stack<>();

        for (int i = n - 1; i >= 0; i--) {
            while (!stack.isEmpty() && stack.peek() <= arr[i]) {
                stack.pop();
            }
            result[i] = stack.isEmpty() ? -1 : stack.peek();
            stack.push(arr[i]);
        }
        return result;
    }

    public static void main(String[] args) {
        int[] arr = {1, 2, 0, 4, 11, 0, 1};
        System.out.println(Arrays.toString(nextGreater(arr))); // Output: [2,4,4,11,-1,1,-1]
    }
}`}},{question:`Given a list of strings, separate palindromes and non-palindromes, then sort each group by length.`,answer:`Use Streams with groupingBy on a palindrome check, then sort each group by length.
- Classify each word as "Palindromes" or "Non-Palindromes".
- Use collectingAndThen to sort each group with Comparator.comparingInt(String::length).
- Example input: "hi oo how are your level comes"
- Output — Palindromes: [oo, level], Non-Palindromes: [hi, how, are, your, comes]`,code:{language:`java`,content:`import java.util.*;
import java.util.stream.Collectors;

public class PalindromeSort {
    public static void main(String[] args) {
        String input = "hi oo how are your level comes";
        Map<String, List<String>> result = Arrays.stream(input.split(" "))
                .collect(Collectors.groupingBy(
                        word -> word.equals(new StringBuilder(word).reverse().toString())
                                ? "Palindromes" : "Non-Palindromes",
                        Collectors.collectingAndThen(
                                Collectors.toList(),
                                list -> list.stream()
                                        .sorted(Comparator.comparingInt(String::length))
                                        .collect(Collectors.toList())
                        )
                ));

        System.out.println(result);
    }
}`}}]},{name:`Third Round: Technical Interview (Java & Database)`,questions:[{question:`How can you optimize an SQL query for better performance?`,answer:`- Use indexes on frequently searched columns.
- Avoid SELECT * and fetch only required columns.
- Use JOINs efficiently and avoid unnecessary subqueries.
- Use EXPLAIN PLAN to analyze query execution.`,code:{language:`sql`,content:`CREATE INDEX idx_employee_name ON employees(name);

EXPLAIN SELECT name, salary FROM employees WHERE department = 'IT';`}},{question:`When should you use NoSQL instead of SQL?`,answer:`- When working with unstructured or semi-structured data.
- When scalability is more important than ACID compliance.
- For real-time applications like chat apps and recommendation systems.`,code:null},{question:`What are the best indexing strategies for improving database performance?`,answer:`- Use B-Tree indexes for range queries.
- Use Hash indexes for exact lookups.
- Use composite indexes for multi-column searches.`,code:{language:`sql`,content:`CREATE INDEX idx_multi ON employees(department, salary, hire_date);`}},{question:`Which Java Collection is best for group by operations?`,answer:`LinkedHashMap<String, List<String>> — it maintains insertion order and preserves the grouping order.`,code:{language:`java`,content:`Map<String, List<String>> result = new LinkedHashMap<>();`}},{question:`Why do we use List instead of ArrayList when declaring a variable?`,answer:`- List is an interface that provides flexibility to switch implementations (ArrayList, LinkedList, etc.).
- Helps in writing loosely coupled and maintainable code.
- If later a LinkedList or Vector is needed, only the object needs to change, not the variable type.`,code:{language:`java`,content:`List<Integer> ans = new ArrayList<>(); // Can change to LinkedList later`}}]},{name:`Fourth Round: Managerial Interview`,questions:[{question:`What are your strengths and weaknesses?`,answer:`- Strengths: Problem-solving, adaptability, teamwork, quick learner.
- Weaknesses: Perfectionism (but working on prioritization and delegation).`,code:null},{question:`How do you learn new concepts?`,answer:`- Hands-on practice, online courses (Udemy, Coursera), reading documentation, and contributing to open-source projects.`,code:null},{question:`Discussion about IBS Software projects.`,answer:`- IBS Software specializes in airline and travel technology.
- Their products include iCargo (air cargo management), iFly (passenger services), and travel booking platforms.`,code:null}]},{name:`Fifth Round: HR Interview`,questions:[{question:`What is your expected package?`,answer:`- Based on experience and market standards, I am looking for a competitive package.
- I'm flexible and happy to discuss further.`,code:null},{question:`How do you keep up with new technologies?`,answer:`- Reading tech blogs, taking online courses, working on personal projects, and contributing to open-source.`,code:null},{question:`Tell me about your college life and how you got your first job.`,answer:`- Share an interesting story highlighting key learning experiences and how you landed your first opportunity.`,code:null}]}],questionCount:14}],questionCount:14},"./ibs-software-walk-in-2025-2026/ibs-2026.js":{id:`ibs-software-walk-in-2025-2026`,name:`IBS Software (walk_in 2025, 2026)`,interviews:[{name:`IBS (2026)`,rounds:[{name:`First Round: Pen & Paper Coding`,questions:[{question:`Max Chunks to Make Sorted`,answer:`Split the array into the maximum number of chunks such that sorting each chunk individually and concatenating them results in a fully sorted array.
- Key idea: at any index i, if the maximum element till that index equals i, a chunk can be formed.
- Time: O(n), Space: O(1)`,code:{language:`java`,content:`public int maxChunksToSorted(int[] arr) {
    int max = 0, chunks = 0;

    for (int i = 0; i < arr.length; i++) {
        max = Math.max(max, arr[i]);

        if (max == i) {
            chunks++;
        }
    }
    return chunks;
}`}}]},{name:`Second Round: Technical Interview`,questions:[{question:`Project Overview & Orchestration`,answer:`Architecture flow: Client → API Gateway → Microservices → Kafka → Database.
- API Gateway handles routing, authentication, and rate limiting.
- Microservices are independently deployable services.
- Kafka ensures asynchronous communication.
- Reactive WebFlux is used for non-blocking operations — handles high traffic, better resource utilization, non-blocking I/O.`,code:null},{question:`Group Strings by Frequency & Find Unique`,answer:`Use groupingBy with counting to get the frequency map, then filter entries with count 1 to get unique elements.
- Return type → Map<String, Long>
- Use cases → analytics, logs, duplicate detection`,code:{language:`java`,content:`Map<String, Long> freq = list.stream()
    .collect(Collectors.groupingBy(
        Function.identity(),
        Collectors.counting()
    ));

List<String> unique = freq.entrySet().stream()
    .filter(entry -> entry.getValue() == 1)
    .map(Map.Entry::getKey)
    .toList();`}},{question:`Two Threads Print 1–100 (Odd/Even)`,answer:`Use synchronized with wait() and notify() for thread coordination — one thread prints odd numbers, the other prints even numbers.
- wait() → pause the thread
- notify() → wake the other thread
- synchronized → ensures mutual exclusion
- Avoids race conditions through thread coordination`,code:{language:`java`,content:`class NumberPrinter {
    private int num = 1;

    public synchronized void printOdd() throws InterruptedException {
        while (num <= 100) {
            if (num % 2 == 0) {
                wait();
            } else {
                System.out.println("Odd: " + num++);
                notify();
            }
        }
    }

    public synchronized void printEven() throws InterruptedException {
        while (num <= 100) {
            if (num % 2 != 0) {
                wait();
            } else {
                System.out.println("Even: " + num++);
                notify();
            }
        }
    }
}`}},{question:`Immutable Class`,answer:`Rules:
- Class → final
- Fields → private final
- No setters
- Defensive copy for mutable objects
Benefits: thread-safe, secure, used in caching.`,code:{language:`java`,content:`final class Employee {
    private final String name;

    public Employee(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}`}},{question:`Explain Neural Networks`,answer:`Neural Networks are models inspired by the human brain: Input Layer, Hidden Layers, Output Layer.
- Used in image recognition, NLP, and predictions.
- Uses activation functions and backpropagation for learning.`,code:null},{question:`What is MCP Service?`,answer:`Model Context Protocol connects AI models to tools/APIs, enabling contextual reasoning and tool integration.`,code:null},{question:`What is Generative AI?`,answer:`Generative AI generates text (ChatGPT), code, images, and audio using Transformers and LLM models.
- Examples: GPT, DALL-E, Stable Diffusion.`,code:null},{question:`Multithreading Lifecycle`,answer:`Five states:
- New — thread created but not started
- Runnable — ready to run
- Running — currently executing
- Waiting — waiting for notification
- Terminated — completed execution`,code:null},{question:`Kafka Internal Working`,answer:`Producer → Topic → Partition → Consumer.
- Partitions provide parallelism
- Offset is the message position
- Consumer Group enables load balancing and fault tolerance`,code:null},{question:`Kafka Deep Concepts`,answer:`- Offsets are stored per consumer group
- Each partition is consumed by one consumer in a group
- Enables fault tolerance, replay capability, and parallel processing`,code:null},{question:`HashMap Internal Working`,answer:`Structure: Array + LinkedList/Tree.
- hash(key) is computed using hashCode()
- Index is found using hash & (n-1)
- Entry is stored in the bucket
- Collisions are handled using chaining`,code:null},{question:`What is Hash Collision and how is it handled?`,answer:`Hash collision occurs when multiple keys map to the same index.
- Handled using chaining (linked list, which treeifies after a threshold of 8).`,code:null},{question:`HashMap Resize (20 → 2000)`,answer:`When the load factor exceeds 0.75, capacity doubles and rehashing occurs.
- All entries are redistributed to the new buckets.`,code:null}]},{name:`Third Round: Architect Round`,questions:[{question:`How do you handle Production Issues?`,answer:`- Check application logs for errors
- Monitor CPU/memory usage
- Analyze API latency and response times
- Trace request flow using distributed tracing tools`,code:null},{question:`How to handle Production Issues when no logs are available?`,answer:`- Use APM tools (New Relic, Datadog)
- Verify database state
- Enable debug mode temporarily
- Reproduce issue locally
- Check infrastructure metrics`,code:null},{question:`What is JUnit?`,answer:`JUnit is a framework for writing unit tests in Java.
- Provides annotations like @Test, @BeforeEach, @AfterEach for test lifecycle`,code:{language:`java`,content:`@Test
public void testAddition() {
    assertEquals(5, calculator.add(2, 3));
}`}},{question:`Why JUnit?`,answer:`- Early bug detection
- Regression testing
- Improves code quality
- Supports CI/CD pipelines
- Provides test coverage metrics`,code:null}]},{name:`Fourth Round: Manager Round`,questions:[{question:`What are IBS Products?`,answer:`IBS Software products include:
- iCargo — air cargo management
- iFly — passenger services
- iTravel — travel booking platform
- Logistics solutions for airlines`,code:null},{question:`Explain your Project Flow.`,answer:`Requirement Gathering → Design → Development → Testing → Deployment → Monitoring → Maintenance.
- Each stage has specific deliverables and reviews`,code:null},{question:`How is AI used in your projects?`,answer:`- Chatbots for customer support
- Automation of repetitive tasks
- Smart recommendations for users
- Predictive analytics for business decisions`,code:null},{question:`Why are developers still needed in the AI era?`,answer:`- Design system architecture
- Handle business logic and rules
- Integrate AI models into applications
- Maintain and debug systems
- Ensure security and compliance`,code:null}]},{name:`Fifth Round: HR Round`,questions:[{question:`Tell me about yourself.`,answer:`I am a Java Full Stack Developer with 3+ years of experience.
- Specializes in Spring Boot, Microservices, Hibernate, and ReactJS
- Worked on customer registration systems and transaction data handling`,code:null},{question:`Why do you want to join IBS Software?`,answer:`IBS Software is a leader in airline and travel technology.
- Excited about working on innovative solutions in the aviation industry
- Opportunity to contribute to the company's growth`,code:null},{question:`What are your salary expectations?`,answer:`- Based on experience and market standards, looking for a competitive package
- Flexible and happy to discuss further based on the role`,code:null},{question:`Where do you see yourself in 5 years?`,answer:`I see myself as a technical lead.
- Contributing to architecture decisions
- Mentoring junior developers
- Driving technical excellence`,code:null},{question:`What are your strengths and weaknesses?`,answer:`- Strengths: Quick learner, problem-solving skills, strong technical foundation, good team player
- Weakness: Sometimes focus too much on perfection; working on delegating tasks better`,code:null},{question:`Why are you looking for a job change?`,answer:`- Looking for better growth opportunities, challenging projects, and a chance to work with new technologies
- IBS Software offers the perfect environment for professional growth`,code:null}]}],questionCount:28}],questionCount:28},"./idfc-walk-in/idfc.js":{id:`idfc-walk-in`,name:`IDFC (walk_in)`,interviews:[{name:`IDFC Walk-in Interview`,questionCount:9,rounds:[{name:`Round 1: Problem Solving — Robot Movement`,questions:[{question:`Robot Movement Problem: A robot starts at origin (0,0) facing right. Commands are F<number> (forward), U/D/L/R<number> (absolute movements), TL (turn left, 90° CCW), TR (turn right, 90° CW). Find the final position for input ["F7","TL","F3","TR","TL","TR","TL","F4","U2","F1","D2"].`,answer:`Start: (0,0) facing ➡️

F7 → (7,0)
TL → facing ⬆️
F3 → (7,3)
TR → facing ➡️
TL → facing ⬆️
TR → facing ➡️
TL → facing ⬆️
F4 → (7,7)
U2 → (7,9)   (Absolute Up)
F1 → (7,10)
D2 → (7,8)   (Absolute Down)

✅ Final Answer: (7, 8)`,code:{language:`java`,content:`public static int[] findFinalPosition(String[] input) {
    int x = 0, y = 0;
    int dir = 0; // 0:Right, 1:Down, 2:Left, 3:Up
    int[][] moves = {{1,0}, {0,-1}, {-1,0}, {0,1}};

    for (String cmd : input) {
        char type = cmd.charAt(0);

        if (type == 'T') {
            if (cmd.equals("TL")) dir = (dir + 3) % 4;   // 90° CCW
            else if (cmd.equals("TR")) dir = (dir + 1) % 4; // 90° CW
        } else {
            int val = Integer.parseInt(cmd.substring(1));
            switch (type) {
                case 'F': x += moves[dir][0] * val; y += moves[dir][1] * val; break;
                case 'U': y += val; break;
                case 'D': y -= val; break;
                case 'R': x += val; break;
                case 'L': x -= val; break;
            }
        }
    }
    return new int[]{x, y};
}`}}]},{name:`Round 2: System Design & Kafka — Payment System, Kafka & Project HLD`,questions:[{question:`Design a Payment System for premium subscriptions on a video streaming platform. Cover high-level architecture, idempotency, core components, database schema, and key design principles.`,answer:`1. Requirements
Functional requirements:
- Users can browse plans, subscribe, upgrade/downgrade, and cancel.
- Collect payment securely via a PSP (Stripe / PayPal / Adyen).
- Handle retries, refunds, chargebacks, and 3D-Secure flows.
- Grant/revoke streaming access and send receipts/invoices.
Non-functional requirements:
- High availability (99.99%) — payments are critical and must never be lost.
- Idempotency — a retried request must never double-charge.
- Consistency — financial ledger must be strong & auditable; reads can be eventual.
- Scalability — support millions of customers and high peak traffic.
- Security & PCI-DSS compliance — never store raw card data.
- Auditability — every financial change is an append-only record.

2. Capacity Estimation
- 5M paying subscribers, ~500K new transactions/day, ~15M charge/renewal events/day.
- Peak load ≈ 50–100 TPS — easily handled by a small number of stateless instances.
- Event volume: ~1M events/day → a partitioned Kafka topic handles this comfortably.
- Storage: ~1KB/row → tens of millions of rows/year; archive old ledgers as needed.

3. High-Level Architecture (see diagram below)
- API Gateway: authentication, rate limiting, request routing.
- Subscription Service: plan management, subscription lifecycle, invoices.
- Payment Orchestrator: drives each payment attempt as a state machine.
- Payment Gateway Adapter: a facade that wraps Stripe / PayPal / Adyen to avoid vendor lock-in.
- Webhook Handler: consumes async PSP callbacks (success / failed / chargeback).
- Event Bus (Kafka): decouples producers from downstream consumers via events.
- Downstream: Email, Analytics, Access Provisioning, Invoice services.

4. Payment Flow (request → response)
- Client POSTs /subscribe with an idempotency_key and a payment token.
- Orchestrator checks the idempotency table; a previous match returns the cached response.
- Otherwise it creates a transaction row (INITIATED) and calls the PSP via the adapter.
- PSP handles redirect / 3DS; on completion it POSTs a webhook with the result.
- Webhook handler updates the transaction (SUCCESS / FAILED) and emits a Kafka event.
- Downstream consumers provision access, send the receipt, and update analytics.
- If the PSP is slow, the orchestrator reconciles with a scheduled job.

5. Idempotency (why we never double-charge)
- The client generates a UUID idempotency_key for each logical operation.
- It is stored in idempotency_requests along with a cached response and a TTL.
- A duplicate key returns the cached response without creating a new charge.
- The same key is also forwarded to the PSP (Stripe idempotency_key) for caller-side safety.

6. Database Schema (see SQL in the code box below).

7. Key Design Principles & Trade-offs
- Financial immutability: transactions are append-only; a refund is a new record, not an update.
- Idempotency key + DB unique constraint prevents duplicate charges on retries.
- Tokenization: we store only the PSP token (pm_xxx), never the raw card number (PCI).
- Event-driven decoupling: producers don't wait for downstream; Kafka provides buffering + replay.
- Retry with exponential backoff and a Dead Letter Queue for persistent failures.
- Trade-off: async events give availability + throughput but introduce eventual consistency; we mitigate with reconciliation jobs (e.g. compare PSP + local ledger daily).`,code:{language:`plaintext`,content:`============== HIGH-LEVEL ARCHITECTURE ==============
┌─────────────────────────────────────────────────────────────┐
│                    CLIENT (Web / Mobile)                    │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│      API GATEWAY (Rate Limiting / Auth / Routing)           │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│           SUBSCRIPTION SERVICE (Business Logic)             │
│   Plan Mgmt • Upgrade/Downgrade • Cancellation              │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│       PAYMENT ORCHESTRATOR (State Machine)                  │
│   INITIATED → PENDING_PSP → SUCCESS / FAILED / CHARGEBACK   │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│    PAYMENT GATEWAY ADAPTER (Facade Pattern)                 │
│   ┌────────┐ ┌────────┐ ┌────────┐                          │
│   │ Stripe │ │ PayPal │ │ Adyen  │                          │
│   └────────┘ └────────┘ └────────┘                          │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│           WEBHOOK HANDLER (Async Callbacks)                 │
│   Payment Success • Payment Failed • Chargeback             │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│     EVENT BUS (Kafka / RabbitMQ)                            │
│   📤 SubscriptionCreated  📤 PaymentSucceeded               │
│   📤 PaymentFailed        📤 SubscriptionCancelled          │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│  DOWNSTREAM: Email • Analytics • Access Provision • Invoice │
└─────────────────────────────────────────────────────────────┘

============== DATABASE SCHEMA (SQL) ==============
-- Core tables (simplified for the interview)

-- 1. Users
CREATE TABLE users (
    user_id    UUID PRIMARY KEY,
    email      VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- 2. Subscription Plans
CREATE TABLE subscription_plans (
    plan_id        UUID PRIMARY KEY,
    name           VARCHAR(100) NOT NULL,
    price          DECIMAL(10,2) NOT NULL,
    billing_period VARCHAR(20) DEFAULT 'MONTHLY'
);

-- 3. User Subscriptions (current active state)
CREATE TABLE user_subscriptions (
    user_sub_id          UUID PRIMARY KEY,
    user_id              UUID REFERENCES users(user_id),
    plan_id              UUID REFERENCES subscription_plans(plan_id),
    status               VARCHAR(20) NOT NULL,   -- ACTIVE, PAST_DUE, CANCELED
    current_period_end   TIMESTAMP NOT NULL,
    cancel_at_period_end BOOLEAN DEFAULT FALSE
);

-- 4. Transactions (immutable audit trail — append-only ledger)
CREATE TABLE transactions (
    transaction_id     UUID PRIMARY KEY,
    user_id            UUID REFERENCES users(user_id),
    idempotency_key    UUID UNIQUE NOT NULL,     -- prevents double charge
    amount             DECIMAL(10,2) NOT NULL,
    status             VARCHAR(20) NOT NULL,     -- SUCCESS, FAILED, REFUNDED
    psp_transaction_id VARCHAR(255),
    created_at         TIMESTAMP DEFAULT NOW()
);

-- 5. Payment Methods (tokenized — never store raw PAN)
CREATE TABLE payment_methods (
    payment_method_id UUID PRIMARY KEY,
    user_id           UUID REFERENCES users(user_id),
    psp_token         VARCHAR(255) NOT NULL,     -- e.g. Stripe pm_xxx
    last_four         VARCHAR(4),
    is_default        BOOLEAN DEFAULT FALSE
);

-- 6. Idempotency Cache
CREATE TABLE idempotency_requests (
    idempotency_key UUID PRIMARY KEY,
    response_status INT NOT NULL,
    response_body   JSONB NOT NULL,
    expires_at      TIMESTAMP DEFAULT NOW() + INTERVAL '24 hours'
);`}},{question:`A topic has 3 partitions and a consumer group has 7 consumers. How does message processing work in this scenario?`,answer:`In a consumer group, each partition is assigned to exactly one consumer.
- Only 3 consumers (one per partition) actually process messages.
- The remaining 4 consumers (C4–C7) stay idle as backups.
- If one active consumer dies, a rebalance assigns its partition to an idle consumer so processing continues.`,code:{language:`plaintext`,content:`📦 Topic  (3 partitions)
   P0      P1      P2
    │       │       │
    ▼       ▼       ▼
 🟢C1     🟢C2     🟢C3      (3 consumers active)
 ⚪C4  ⚪C5  ⚪C6  ⚪C7       (4 consumers idle)`}},{question:`A topic has 7 partitions and a consumer group has 3 consumers. How are the partitions distributed?`,answer:`Kafka distributes the 7 partitions among the 3 consumers so that each partition is owned by exactly one consumer.
- With RangeAssignor the split is 3, 2, 2.
- Each consumer processes multiple partitions in parallel.
- If group members change, a rebalance redistributes the partitions.`,code:{language:`plaintext`,content:`📦 Topic  (7 partitions)
P0  P1  P2  P3  P4  P5  P6
│   │   │   │   │   │   │
▼   ▼   ▼   ▼   ▼   ▼   ▼
🟢C1     🟢C2     🟢C3
P0,P1,P2 P3,P4   P5,P6   (RangeAssignor → 3, 2, 2)`}},{question:`Where does Kafka store consumer offsets? If a consumer crashes after processing but before committing, what happens?`,answer:`Storage: Since Kafka 0.9, offsets are stored in an internal compacted topic called __consumer_offsets on the brokers.

⚠️ Crash Scenario (at-least-once):
- Consumer reads offsets 100 → 150.
- Processes every message successfully.
- Crashes before calling commitSync().
- The last committed offset is still 100.
- On restart it reprocesses 100 → 150 again → duplicates are possible (At-least-once semantics).`,code:null},{question:`What is Kafka rebalancing? When does it happen, and how can you reduce its impact?`,answer:`What is Rebalancing?
- Kafka reassigns partition ownership among consumers in the same group.

When it happens:
- A new consumer joins the group.
- A consumer leaves (crash / shutdown).
- A new partition is added to a topic.

Impact:
- During rebalancing all consumers STOP consuming (Stop-The-World), causing latency spikes.

✅ How to reduce the impact:
- Increase session.timeout.ms and max.poll.interval.ms.
- Use StickyAssignor to minimise partition movement.
- Keep max.poll.records at a reasonable value.
- Use Cooperative Rebalancing (Kafka 2.3+) — incremental instead of full stop.`,code:null},{question:`What is a Dead Letter Queue (DLQ) in Kafka, and how do you implement it?`,answer:`What is DLQ?
- A separate Kafka topic (e.g. topic-name-dlq) that stores messages a consumer cannot process after multiple retries.

Implementation:
- Implement exponential backoff and retry 3–5 times.
- On final failure, produce the message to the DLQ topic with the original headers (topic, partition, offset, stack trace).
- Set up alerts on DLQ message counts.
- Build an admin tool to reprocess DLQ messages once the root cause is fixed.

Flow: Consume → Process → Error? → Retry (3x) → Still fail? → Send to DLQ.`,code:null},{question:`Explain the three Kafka delivery semantics. How do you achieve exactly-once processing?`,answer:`1️⃣ At-most-once:
- Commit the offset before processing.
- May lose messages, but gives the fastest throughput.

2️⃣ At-least-once:
- Commit the offset after processing.
- May produce duplicates — the default and reliable choice.

3️⃣ Exactly-once:
- No duplicates, no loss.
- Uses an idempotent producer + Kafka transactions.

✅ Exactly-Once Implementation:
- Enable Idempotent Producer → enable.idempotence=true.
- Consumer → isolation.level=read_committed.
- Use Kafka Transactions → atomic consume-process-produce.
- For DB sinks → idempotent upserts using a unique key derived from the Kafka offset.`,code:null},{question:`Walk through the High-Level Design of your previous project.`,answer:`My previous project was a PayPal Customer Orchestration Service — a microservices platform handling customer requests across PayPal products (PayPal, Venmo, Zettle, Xoom). It handled ~11M+ requests per day across 300+ REST endpoints using reactive programming with Project Reactor.

🔴 API Layer:
- 300+ REST endpoints, request validation and routing, high-volume API traffic.

🟠 Reactive Processing:
- Spring WebFlux + Project Reactor, non-blocking request processing.

🟢 Event-Driven Communication:
- Apache Kafka, asynchronous processing, decoupled downstream services.

🟣 Reliability & Operations:
- Security and authentication, logging and monitoring, scalable microservice deployment.

🏆 Interview Summary:
- Primary goal: support high-volume, low-latency customer requests while keeping services scalable and loosely coupled.
- Java + Spring Boot microservices for the business layer, Project Reactor/WebFlux for reactive processing, REST APIs for sync communication, and Kafka for async event-driven communication.

📊 Tech Stack: Java, Spring Boot, Spring WebFlux, Project Reactor, Microservices, REST APIs, Kafka.`,code:{language:`plaintext`,content:`┌─────────────────────────────────────────────────────────────┐
│                   CLIENTS                                        │
│        Web / Mobile / PayPal Products (Venmo, Xoom…)             │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│              API GATEWAY / EDGE                             │
│       Authentication • Routing • Validation                 │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│      CUSTOMER ORCHESTRATION SERVICE                         │
│   Java • Spring Boot • Project Reactor/WebFlux              │
│   300+ REST APIs, Reactive Processing                       │
└─────────────────────────────────────────────────────────────┘
              │
      ┌───────┼────────┐
      ▼       ▼        ▼
┌──────────┐ ┌──────────┐ ┌──────────┐
│ Customer │ │ Payment/ │ │  Other   │
│ Services │ │ Account  │ │Downstream│
└──────────┘ └──────────┘ └──────────┘
              │
              ▼
┌─────────────────────────────────────────────────────────────┐
│                       KAFKA                                 │
│      Asynchronous Events / Event-Driven Processing          │
└─────────────────────────────────────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────────────────────────┐
│      DOWNSTREAM CONSUMERS / SERVICES                        │
│   Event Processing • Notifications • Other Systems          │
└─────────────────────────────────────────────────────────────┘`}}]}]}],questionCount:9},"./infosis/infosisinterview.js":{id:`infosis`,name:`Infosis`,interviews:[{name:`InfosysInterview`,questionCount:50,rounds:[{name:`Technical Round`,questions:[{question:`Self-introduction with a brief explanation about your project.`,answer:`Hello, I'm [Your Name]. I have been working in software development for 3 years, specializing in Java and React. Currently, I am involved in a project that focuses on developing a distributed banking application for customer registration and transaction processing.`,code:null},{question:`Have you developed any project for your referencing purpose?`,answer:`Yes, I have worked on several projects for reference, including customer registration systems and transaction processing applications. These projects helped me enhance my skills in Java, Spring Boot, React, and microservices.`,code:null},{question:`Explain about your developed project. (Follow-up questions based on the project)`,answer:`My recent project involved building a real-time banking application with a microservices architecture. It was designed to handle customer registration, account management, and secure transaction processing. We utilized technologies such as Spring Boot, Kafka, Docker, and React to achieve scalability and reliability.`,code:null},{question:`How do you monitor your project?`,answer:`I use various tools like New Relic and Grafana for monitoring application performance and logs. Additionally, I rely on automated tests and CI/CD pipelines to ensure the project's stability.`,code:null},{question:`Which database did you use?`,answer:`I used SQL for managing relational data due to its robust features and performance advantages. Also used H2 for in-memory testing purposes.`,code:null},{question:`What is a class loader?`,answer:`A class loader is a part of the Java Runtime Environment (JRE) that loads Java classes into memory. It dynamically loads, links, and initializes classes as needed.`,code:null},{question:`What is the Object class?`,answer:`The Object class is the root class of the Java class hierarchy. Every class in Java inherits from Object, and it provides basic methods like toString(), equals(), and hashCode().`,code:null},{question:`What are the equals and hashCode methods in the Object class?`,answer:`equals() is used to compare two objects for equality, while hashCode() returns a unique integer for each object. These methods are used in collections like HashMap.`,code:null},{question:`Explain encapsulation.`,answer:`Encapsulation is the concept of wrapping data (variables) and methods (functions) into a single unit or class. It restricts direct access to some of the object's components, which can help prevent accidental interference and misuse.`,code:null},{question:`Give a real-time example of encapsulation.`,answer:`A real-time example is a bank account class. The account details (balance, account number) are private, and access is provided through public methods (deposit, withdraw) to ensure controlled and secure manipulation of the data.`,code:{language:`java`,content:`class BankAccount {
    private double balance;
    public void deposit(double amount) { balance += amount; }
    public void withdraw(double amount) { balance -= amount; }
    public double getBalance() { return balance; }
}`}},{question:`Compare static block vs static method.`,answer:`A static block is used for initializing static variables or performing initialization when the class is first loaded. A static method can be called without creating an instance and can only access static members.`,code:{language:`java`,content:`static { System.out.println("Static block"); }
static void display() { System.out.println("Static method"); }`}},{question:`Does a static block execute first or does a constructor execute first?`,answer:`A static block executes before a constructor. It runs when the class is first loaded, whereas the constructor is executed when an instance of the class is created.`,code:null},{question:`If I remove static from the main method, will it work?`,answer:`No, the main method must be static because it is the entry point for the JVM to start the application. Without static, the JVM cannot call the method.`,code:null},{question:`Write a code to move array elements with 0s to the last. arr={1,0,1,1,0,0,1} output={1,1,1,1,0,0,0}`,answer:`Traverse the array, move non-zero elements to the front, and fill the remaining positions with zeros.`,code:{language:`java`,content:`public class MoveZeros {
    public static void moveZeros(int[] arr) {
        int count = 0;
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] != 0) {
                arr[count++] = arr[i];
            }
        }
        while (count < arr.length) {
            arr[count++] = 0;
        }
    }
}
// Input: {1,0,1,1,0,0,1} Output: {1,1,1,1,0,0,0}`}},{question:`Class Inheritance Issue: class C extends A, B - Compilation error. How to resolve?`,answer:`Java does not support multiple inheritance directly. You need to refactor the code using interfaces or abstract classes.`,code:{language:`java`,content:`// Compilation error
class C extends A, B { } // Invalid

// Solution: Use interfaces
interface A { void sum(); }
interface B { void sum(); }
class C implements A, B {
    @Override
    public void sum() { System.out.println("Sum"); }
}`}},{question:`Interface Implementation Issue: Class C implements A, B with same method sum(). Which sum method to implement?`,answer:`When a class implements multiple interfaces with the same method name and signature, you only need to provide one implementation.`,code:{language:`java`,content:`interface A { void sum(); }
interface B { void sum(); }
class C implements A, B {
    @Override
    public void sum() {
        System.out.println("Sum method implemented in class C");
    }
}`}},{question:`What is a functional interface?`,answer:`A functional interface is an interface with a single abstract method. They are used as the target type for lambda expressions and method references. Examples include Runnable and Callable.`,code:{language:`java`,content:`@FunctionalInterface
interface Calculator { int add(int a, int b); }`}},{question:`Write code to find the second largest number in the array [1, 2, 3, 4, 5, 2, 4] using Java 8.`,answer:`Use a stream with distinct, sorted reverse, skip, and findFirst.`,code:{language:`java`,content:`int[] a = {1, 2, 3, 4, 5, 2, 4};
int secondLargest = Arrays.stream(a)
    .boxed()
    .sorted(Comparator.reverseOrder())
    .distinct()
    .skip(1)
    .findFirst()
    .orElseThrow(() -> new IllegalArgumentException("Array must contain at least two distinct elements"));
System.out.println("Second Largest: " + secondLargest); // 4`}},{question:`What is a HashMap?`,answer:`HashMap is a collection that stores key-value pairs. It allows for efficient retrieval of values based on their keys.`,code:{language:`java`,content:`Map<String, Integer> map = new HashMap<>();
map.put("Key", 10);`}},{question:`Can a HashMap key be null?`,answer:`Yes, HashMap allows one null key and multiple null values.`,code:{language:`java`,content:`map.put(null, 10); // Valid`}},{question:`Explain the internal working process of a HashMap.`,answer:`HashMap uses an array of buckets to store key-value pairs. The hash code of the key determines the bucket in which the entry is stored. Collisions are handled by linking entries in the same bucket (chaining).`,code:null},{question:`What is the new change in Java 8 hashCode?`,answer:`Java 8 introduced improvements to hash-based collections. HashMap uses a balanced tree structure for high collision scenarios (when bucket size exceeds threshold).`,code:null},{question:`What is the default size of a HashMap?`,answer:`The default initial capacity of a HashMap is 16 buckets.`,code:null},{question:`Explain fail-safe and fail-fast iterators.`,answer:`Fail-fast iterators throw ConcurrentModificationException if the collection is modified during iteration. Fail-safe iterators work on a copy of the collection and do not throw exceptions.`,code:{language:`java`,content:`// Fail-fast
List<String> list = new ArrayList<>();
Iterator<String> it = list.iterator();
list.add("D"); // ConcurrentModificationException

// Fail-safe
CopyOnWriteArrayList<String> cowList = new CopyOnWriteArrayList<>();
for (String item : cowList) { cowList.add("D"); } // No exception`}},{question:`What is Hibernate?`,answer:`Hibernate is an ORM (Object-Relational Mapping) framework that simplifies database interactions by mapping Java objects to database tables.`,code:null},{question:`Does JPA implement Hibernate? (True or False and why)`,answer:`False. JPA (Java Persistence API) is a specification for ORM in Java. Hibernate is an implementation of JPA.`,code:null},{question:`If JDBC is there, why do we need Hibernate?`,answer:`Hibernate provides a higher level of abstraction compared to JDBC. It handles complex database operations, caching, and object mapping more efficiently than raw JDBC.`,code:null},{question:`Do you know SQL and NoSQL databases?`,answer:`Yes, I am familiar with both SQL databases (e.g., PostgreSQL, MySQL) and NoSQL databases (e.g., MongoDB, Cassandra).`,code:null},{question:`What is the difference between HAVING and WHERE clause?`,answer:`WHERE is used to filter rows before aggregation, while HAVING is used to filter groups after aggregation.`,code:null},{question:`Can I use WHERE to filter a group of records?`,answer:`No, WHERE filters rows, not groups. Use HAVING to filter groups.`,code:{language:`sql`,content:`SELECT department, COUNT(*) FROM employees GROUP BY department HAVING COUNT(*) > 10;`}},{question:`What is an index in SQL?`,answer:`An index is a database object that improves the speed of data retrieval operations on a table. It creates a separate data structure that allows for faster searches.`,code:{language:`sql`,content:`CREATE INDEX idx_name ON employees(name);`}},{question:`What is the difference between PUT and PATCH?`,answer:`PUT is used to update an entire resource, while PATCH is used to update partial data of a resource.`,code:null},{question:`Can we use PUT in place of POST? Will it work or not?`,answer:`Yes, PUT can be used in place of POST, but they have different semantics. PUT is idempotent, meaning multiple identical requests have the same effect as a single request, while POST may result in different outcomes.`,code:null},{question:`What is the difference between @RestController and @Controller?`,answer:`@RestController is a specialized version of @Controller that combines @Controller and @ResponseBody, meaning it returns JSON/XML responses directly. @Controller is used for rendering views (like JSPs).`,code:null},{question:`Why is REST API stateless?`,answer:`REST APIs are stateless to ensure scalability and reliability. Each request from the client to the server must contain all the information needed to understand and process the request.`,code:null},{question:`How do you know .NET?`,answer:`I have basic knowledge of .NET Core. I learned by working on personal projects and following online tutorials.`,code:null},{question:`Can you give an example of where you have used all your technical skills?`,answer:`In my banking application project, I used Java and Spring Boot for backend APIs, React for the frontend, JPA/Hibernate for database operations, JWT for security, Docker for containerization, and Git for version control.`,code:null}]},{name:`Manager Round`,questions:[{question:`Can you provide a brief explanation of your project?`,answer:`I have been working on a distributed banking application that handles real-time transactions using a microservices architecture. It includes features like customer registration, account management, and secure transaction processing. Technologies used include Spring Boot, Kafka, Docker, and React.`,code:null},{question:`What specific work did you do with ReactJS in your project?`,answer:`I worked on creating reusable components, implementing form validation with Formik, and managing state using React's Context API. I also optimized the application's performance by using React hooks like useMemo and useCallback, and implemented lazy loading for certain components to enhance loading times.`,code:null},{question:`On a scale of 1 to 10, how would you rate yourself in Java, Spring Boot, and microservices?`,answer:`I would rate myself as follows: Java - 8, Spring Boot - 8, Microservices - 7.5.
- I have extensive experience in Java and Spring Boot
- I am comfortable developing and managing microservices architectures, though I continue to seek opportunities to deepen my expertise`,code:null},{question:`How did you learn .NET?`,answer:`I learned .NET Core by working on a personal project and by following tutorials and courses available online. I also created content about .NET on my YouTube channel, which helped reinforce my learning by teaching the concepts to others.`,code:null},{question:`Which databases have you used in your projects?`,answer:`I have used MySQL and H2 databases in my projects.
- MySQL was utilized for managing relational data due to its robustness and scalability
- H2 was used for in-memory data storage and testing purposes`,code:null},{question:`What issues did you face in your first and second projects, and how did you overcome them?`,answer:`In my first project, a bank application, I faced issues with data integrity, security, and performance.
- I resolved these by implementing strong transaction management, using Spring Security for authentication, and optimizing database queries
- In my second project, I did not encounter significant issues`,code:null},{question:`How have you improved the performance of your code?`,answer:`I have improved code performance by profiling and identifying bottlenecks, optimizing algorithms and data structures, and implementing caching strategies. Additionally, I have refactored code for better readability and maintainability, which also contributes to improved performance and reduced complexity.`,code:null}]},{name:`HR Round`,questions:[{question:`Tell me about yourself.`,answer:`I am [Your Name] with 3 years of experience as a Java Full Stack Developer. I specialize in Spring Boot, React, and Microservices. I have worked on banking applications and customer registration systems. I am passionate about building scalable applications and learning new technologies.`,code:null},{question:`Why do you want to join Infosys?`,answer:`Infosys is a global leader in technology and innovation. I'm excited about the opportunity to work on large-scale projects, learn from industry experts, and contribute to the company's growth.`,code:null},{question:`What are your salary expectations?`,answer:`Based on my experience and market standards, I am looking for a competitive package. I'm flexible and happy to discuss further based on the role.`,code:null},{question:`Where do you see yourself in 5 years?`,answer:`I see myself as a technical lead, contributing to architecture decisions, mentoring junior developers, and driving technical excellence.`,code:null},{question:`What are your strengths and weaknesses?`,answer:`- Strengths: quick learner, problem-solving skills, strong technical foundation, good team player
- Weakness: sometimes focus too much on perfection; working on delegating tasks better`,code:null},{question:`Why are you looking for a job change?`,answer:`Looking for better growth opportunities, challenging projects, and a chance to work with new technologies. Infosys offers the perfect environment for professional growth.`,code:null}]}]}]},"./kvas-technologies/kvastechnologies.js":{id:`kvas-technologies`,name:`KVAS Technologies`,interviews:[{name:`KVASTechnologies`,questionCount:31,rounds:[{name:`Technical Interview`,questions:[{question:`Introduce yourself with a focus on your recent projects and the technologies you've worked with.`,answer:`I am [Your Name], a Java full stack developer with 3 years of experience in building scalable web applications. My recent project involved developing a banking application where I focused on the user registration page and transaction data handling. I used ReactJS for the frontend, Spring Boot for the backend, and implemented microservices architecture. My tech stack includes Java, Spring Boot, Hibernate, ReactJS, and MySQL.`,code:null},{question:`Describe a recent task or project you worked on. What challenges did you face and how did you overcome them?`,answer:`In my recent project, I worked on a feature to implement real-time transaction monitoring. The challenge was ensuring the system could handle high-frequency transactions without performance degradation. I optimized the database queries, used Redis for caching frequently accessed data, and applied asynchronous processing for non-critical tasks. This improved the system's performance significantly.`,code:null},{question:`Why are you looking for a new job? What motivates your job search?`,answer:`I am seeking new opportunities to expand my skill set and work on more challenging projects. I am particularly interested in roles that offer the chance to work with cutting-edge technologies and innovative solutions, which will help me grow both professionally and personally.`,code:null},{question:`Write a code example for Bubble Sort in Java.`,answer:`Bubble Sort repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order.
- Time: O(n²), Space: O(1)
- Input: [3,5,1,0,4,6] → Output: [0,1,3,4,5,6]`,code:{language:`java`,content:`public class BubbleSort {
    public static void main(String[] args) {
        int[] arr = {3, 5, 1, 0, 4, 6};
        bubbleSort(arr);
        for (int num : arr) {
            System.out.print(num + " ");
        }
    }

    public static void bubbleSort(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n - 1; i++) {
            for (int j = 0; j < n - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }
    }
}
// Input: [3,5,1,0,4,6] Output: [0,1,3,4,5,6]`}},{question:`What is the difference between PUT, PATCH, and POST in RESTful services?`,answer:`- PUT: used to update an existing resource or create it if it does not exist; idempotent
- PATCH: used to apply partial updates to a resource; not necessarily idempotent
- POST: used to create a new resource; not idempotent, repeated requests may create multiple resources`,code:null},{question:`If an API takes a long time to respond, how do you handle it in your application?`,answer:`Implement asynchronous processing using the @Async annotation in Spring Boot, or use techniques like caching, timeout settings, or a circuit breaker pattern to manage delayed responses and prevent performance bottlenecks.
- Example: annotate a method with @Async and enable @EnableAsync to run it in a separate thread so the main thread is not blocked.`,code:{language:`java`,content:`@Async
public CompletableFuture<String> processRequest() {
    // long-running task
    return CompletableFuture.completedFuture("Done");
}`}},{question:`What is the @Async annotation in Spring Boot, and how does it work?`,answer:`The @Async annotation in Spring Boot is used to run methods asynchronously in a separate thread. This allows the main thread to continue processing without waiting for the annotated method to complete, improving the application's performance.`,code:null},{question:`How do you write a native query in JPA with Spring Boot?`,answer:`A native query in JPA can be written using the @Query annotation with the nativeQuery attribute set to true. For example:`,code:{language:`java`,content:`@Query(value = "SELECT * FROM users WHERE email = ?1", nativeQuery = true)
User findByEmail(String email);`}},{question:`Explain what Dependency Injection is in Spring Boot.`,answer:`Dependency Injection (DI) in Spring Boot is a design pattern where the framework injects dependencies (objects) into a class rather than the class creating them. This promotes loose coupling and enhances testability and modularity.`,code:null},{question:`Provide an example where Dependency Injection is used in a Spring Boot application.`,answer:`In a Spring Boot application, a service class can be injected into a controller using @Autowired:`,code:{language:`java`,content:`@Service
public class UserService {
    // Business logic
}

@RestController
public class UserController {
    @Autowired
    private UserService userService;

    // Controller methods using userService
}`}},{question:`In which scenarios would you use the @Autowired annotation in Spring Boot?`,answer:`The @Autowired annotation is used in Spring Boot to inject dependencies, such as service or repository beans, into a class. It can be used in constructors, setters, or directly on fields.`,code:null},{question:`What are the different bean scopes available in Spring Boot?`,answer:`- Singleton: one instance per Spring container
- Prototype: a new instance every time the bean is requested
- Request: one instance per HTTP request
- Session: one instance per HTTP session
- Application: one instance per ServletContext`,code:null},{question:`How does the request-response cycle work in a Spring Boot application?`,answer:`In a Spring Boot application, a client sends an HTTP request, which is received by the DispatcherServlet. The request is then routed to the appropriate controller method, which processes the request and returns a response. The response is sent back to the client via the DispatcherServlet.`,code:null},{question:`How does the prototype scope work in Spring Boot?`,answer:`In the prototype scope, a new instance of the bean is created each time it is requested from the Spring container. This is useful when you need multiple instances of a bean with different states.`,code:null},{question:`How does the singleton scope work in Spring Boot?`,answer:`In the singleton scope, a single instance of the bean is created and shared across the entire Spring container. This is the default scope in Spring Boot and is used when you want a single shared instance.`,code:null},{question:`What are the @Primary and @Qualifier annotations in Spring Boot, and when would you use them?`,answer:`- @Primary: used to indicate the preferred bean when multiple beans of the same type exist
- @Qualifier: used to specify which bean should be injected when multiple beans of the same type exist and @Primary is not sufficient`,code:null},{question:`Explain the different types of relationships in JPA (e.g., One-to-One, One-to-Many, Many-to-One, Many-to-Many).`,answer:`- One-to-One: each entity instance is associated with one instance of another entity
- One-to-Many: an entity instance is associated with multiple instances of another entity
- Many-to-One: multiple instances of an entity are associated with one instance of another entity
- Many-to-Many: multiple instances of an entity are associated with multiple instances of another entity`,code:null},{question:`How do you handle exceptions in a Spring Boot application?`,answer:`In Spring Boot, exceptions can be handled using @ExceptionHandler in controllers or globally using @ControllerAdvice. This allows for centralized exception handling and custom error responses.`,code:null},{question:`What is the @ControllerAdvice annotation, and how does it work in Spring Boot?`,answer:`@ControllerAdvice is used to define global exception handling for Spring MVC controllers. It allows you to write a single piece of code that handles exceptions across all controllers.`,code:null},{question:`What is Aspect-Oriented Programming (AOP), and how is it used in Spring Boot?`,answer:`Aspect-Oriented Programming (AOP) allows you to separate cross-cutting concerns (e.g., logging, security) from the business logic. In Spring Boot, AOP is implemented using aspects and advice that can be applied declaratively to methods or classes.`,code:null},{question:`What approaches have you used for authentication in your Spring Boot projects?`,answer:`In my projects, I have used JWT (JSON Web Token) for stateless authentication, as well as OAuth2 for secure access. Both approaches provide robust security and are easy to integrate with Spring Security.`,code:null},{question:`How does JWT token-based authentication work in Spring Boot?`,answer:`In JWT token-based authentication, a token is generated after a user successfully logs in. This token is then included in the header of subsequent requests to authenticate the user. The server verifies the token's validity and extracts user information from it.`,code:null},{question:`What is role-based authentication, and how do you implement it in Spring Boot?`,answer:`Role-based authentication restricts access to certain parts of the application based on user roles. In Spring Boot, it can be implemented using Spring Security by assigning roles to users and securing endpoints with @PreAuthorize or @Secured.`,code:null},{question:`How do you perform health checks in a Spring Boot application?`,answer:`Health checks in Spring Boot can be performed using the Actuator module, which provides endpoints like /actuator/health to check the application's health and status.`,code:null},{question:`What is a YAML file in Spring Boot, and how is it used?`,answer:`A YAML file in Spring Boot is an alternative to the application.properties file for configuring the application. It provides a more readable and hierarchical way to define configuration settings.`,code:null},{question:`Given a string str and a substring str1, count how many times str1 appears in str.`,answer:`Use indexOf in a loop to find and count each occurrence.
- Example: str = "i am good boy", str1 = "am" → Output: 1`,code:{language:`java`,content:`public class SubstringCount {
    public static void main(String[] args) {
        String str = "i am good boy";
        String str1 = "am";
        int count = countOccurrences(str, str1);
        System.out.println(count); // 1
    }

    public static int countOccurrences(String str, String subStr) {
        int count = 0;
        int index = 0;
        while ((index = str.indexOf(subStr, index)) != -1) {
            count++;
            index += subStr.length();
        }
        return count;
    }
}`}}]},{name:`HR Interview`,questions:[{question:`Give a self-introduction and explain your project.`,answer:`I am [Your Name], a Java full stack developer with 3 years of experience. I specialize in Spring Boot, ReactJS, Hibernate, and MySQL. My recent project was a banking application where I handled the user registration flow and transaction data processing using a microservices architecture.`,code:null},{question:`What tasks did you work on in your last project?`,answer:`I worked on building RESTful APIs with Spring Boot, designing the database schema, implementing authentication with JWT, and creating the ReactJS frontend. I also integrated Kafka for asynchronous messaging and Docker for containerization.`,code:null},{question:`What are your salary expectations?`,answer:`Based on my experience and market standards, I am looking for a competitive package. I'm flexible and happy to discuss further based on the role.`,code:null},{question:`Are you interested in learning new technology?`,answer:`Yes, I am always eager to learn new technologies. I regularly keep up with new tools and frameworks through online courses, documentation, and personal projects to stay current in the evolving tech landscape.`,code:null},{question:`Why are you looking for a new job?`,answer:`I am looking for better growth opportunities, more challenging projects, and a chance to work with new and emerging technologies that will help me advance my career.`,code:null}]}]}]},"./ltimindtree/ltimindtree.js":{id:`ltimindtree`,name:`LTIMindtree`,interviews:[{name:`LtiMindtree`,questionCount:37,rounds:[{name:`Technical Round`,questions:[{question:`Brief explanation about your project and daily tasks.`,answer:`In my current project, I am working on a banking application that handles customer transactions and account management. My daily tasks involve designing and implementing microservices using Spring Boot, developing RESTful APIs, managing the database using JPA/Hibernate, writing unit tests with JUnit and Mockito, and deploying services to a cloud environment like AWS. I also participate in code reviews, pair programming, and daily stand-ups to ensure smooth progress.`,code:null},{question:`You mentioned you worked on microservices; can you elaborate?`,answer:`Yes, I have experience in designing, developing, and deploying microservices. I have worked on breaking down a monolithic application into smaller, independent microservices that can be developed, deployed, and scaled independently. Each microservice handled a specific business capability and communicated with others through RESTful APIs or message queues. This architecture improved our system's scalability, maintainability, and fault tolerance.`,code:null},{question:`How do you handle fault tolerance in microservices?`,answer:`Fault tolerance in microservices is achieved using several strategies, including implementing retries, fallbacks, and circuit breakers. We use libraries like Hystrix or Resilience4j to manage circuit breaking and timeouts, ensuring that the failure of one microservice does not cascade and affect the entire system. We also deploy services across multiple instances and use load balancers to distribute traffic, ensuring high availability.`,code:null},{question:`What is a circuit breaker in microservices?`,answer:`A circuit breaker is a design pattern used to detect and handle failures in microservices. When a service fails or becomes unresponsive, the circuit breaker trips and stops further calls to the failing service. Instead, it returns a fallback response or an error message. This prevents the system from being overwhelmed by repeated attempts to call the failing service, helping to maintain overall stability.`,code:null},{question:`How do you manage retrying, timeouts, and circuit breakers in microservices?`,answer:`Retries, timeouts, and circuit breakers are managed using libraries like Resilience4j or Hystrix. We configure retry logic to attempt an operation a certain number of times before failing. Timeouts are set to ensure that requests do not hang indefinitely. Circuit breakers monitor the failures and, after a threshold, trip to prevent further calls. We also implement fallback mechanisms to provide default responses when a service fails.`,code:{language:`java`,content:`@CircuitBreaker(name = "paymentService", fallbackMethod = "paymentFallback")
public PaymentResult processPayment(PaymentRequest request) {
    return paymentService.process(request);
}

public PaymentResult paymentFallback(PaymentRequest request, Throwable t) {
    return new PaymentResult("FAILED", "Service unavailable");
}`}},{question:`How do microservices communicate with each other?`,answer:`Microservices communicate with each other using HTTP/REST, messaging queues, or RPC frameworks like gRPC.
- For RESTful communication, we use HTTP requests with JSON payloads
- For asynchronous communication, we use messaging systems like Kafka or RabbitMQ
- gRPC is used for efficient communication between services, especially when low latency and high throughput are required`,code:null},{question:`What is gRPC?`,answer:`gRPC is a high-performance, open-source RPC framework that allows microservices to communicate with each other efficiently. It uses Protocol Buffers (protobuf) for serializing structured data, which is more efficient than JSON. gRPC supports bi-directional streaming and is language-agnostic, allowing services written in different programming languages to communicate seamlessly.`,code:null},{question:`How do you transfer data efficiently between microservices?`,answer:`To transfer data efficiently between microservices, we use lightweight data formats like Protocol Buffers (protobuf) with gRPC. We also ensure that only necessary data is transmitted by designing APIs with minimal payloads. Data compression and pagination techniques are also applied to manage large datasets effectively.`,code:null},{question:`What is event-driven processing in microservices?`,answer:`Event-driven processing in microservices is an architectural pattern where services communicate and react to events rather than direct requests. When an event occurs (e.g., a user places an order), it is published to an event bus (e.g., Kafka). Other services subscribe to these events and perform their actions accordingly. This decouples services, allowing them to evolve independently and handle high traffic efficiently.`,code:null},{question:`Explain the CQRS pattern in microservices.`,answer:`CQRS (Command Query Responsibility Segregation) is a design pattern where the read and write operations are separated into different models. The command model handles writes (modifications), while the query model handles reads (queries). This separation allows for optimizing each model independently, improving performance, and simplifying the design, especially in complex systems.`,code:null},{question:`What is the difference between synchronous and asynchronous communication in microservices?`,answer:`- Synchronous Communication: involves direct communication where the caller waits for a response before proceeding; implemented using REST APIs or RPC; can lead to tight coupling and latency issues
- Asynchronous Communication: involves message-based communication where the caller sends a message and continues without waiting; implemented using Kafka or RabbitMQ; promotes loose coupling and better scalability`,code:null},{question:`What is load balancing, and how do you handle it in microservices?`,answer:`Load balancing is the process of distributing incoming network traffic across multiple servers or instances to ensure no single server is overwhelmed. In microservices, load balancing is handled using tools like NGINX, HAProxy, or cloud-based solutions like AWS Elastic Load Balancer. Service discovery tools like Eureka can also dynamically balance loads among instances.`,code:null},{question:`How do you monitor and measure metrics in microservices?`,answer:`We monitor and measure metrics in microservices using tools like Prometheus, Grafana, and ELK stack (Elasticsearch, Logstash, Kibana). Metrics like CPU usage, memory consumption, request rates, response times, and error rates are tracked. Logs and traces are also collected using tools like Zipkin or Jaeger for distributed tracing. Alerts are set up to notify the team of any issues.`,code:null},{question:`How do you handle a high number of incoming requests in microservices, and how do you track and manage them?`,answer:`To handle a high number of incoming requests, we scale microservices horizontally by deploying multiple instances behind a load balancer. We implement rate limiting, caching, and use of efficient data stores. To track and manage requests, we use distributed tracing tools like Jaeger and Prometheus for monitoring, which helps in identifying bottlenecks and optimizing performance.`,code:null},{question:`Can you give some examples of design patterns?`,answer:`Some common design patterns used in microservices and general software development include:
- Singleton (ensures class has only one instance)
- Factory Method (creates objects without specifying exact class)
- Observer (objects subscribe and receive notifications)
- Strategy (selects algorithm at runtime)
- Decorator (adds behavior dynamically)`,code:null},{question:`Write a code example of the Singleton design pattern in Java.`,answer:`Singleton pattern ensures only one instance exists, with a private constructor and a synchronized getInstance method.`,code:{language:`java`,content:`public class Singleton {
    private static Singleton instance;
    private Singleton() {}

    public static synchronized Singleton getInstance() {
        if (instance == null) {
            instance = new Singleton();
        }
        return instance;
    }
}

// Thread-safe with double-checked locking
public class Singleton {
    private static volatile Singleton instance;
    private Singleton() {}

    public static Singleton getInstance() {
        if (instance == null) {
            synchronized (Singleton.class) {
                if (instance == null) {
                    instance = new Singleton();
                }
            }
        }
        return instance;
    }
}`}},{question:`If two threads access the same class simultaneously, how do you manage it?`,answer:`To manage concurrent access by multiple threads, we use synchronization. In the Singleton pattern, the getInstance() method is synchronized to ensure only one thread can access it at a time, preventing multiple instances from being created.`,code:null},{question:`How can you give the option to clone a Singleton class?`,answer:`To allow cloning in a Singleton class while maintaining the singleton property, override the clone() method and throw a CloneNotSupportedException.`,code:{language:`java`,content:`@Override
protected Object clone() throws CloneNotSupportedException {
    throw new CloneNotSupportedException("Cannot clone a singleton object");
}`}},{question:`What is the Cloneable interface in Java?`,answer:`The Cloneable interface in Java is a marker interface that indicates that a class allows its objects to be cloned. When a class implements Cloneable, the Object.clone() method creates a shallow copy of the object. If a class does not implement Cloneable, calling clone() throws a CloneNotSupportedException.`,code:{language:`java`,content:`class User implements Cloneable {
    private String name;

    @Override
    protected Object clone() throws CloneNotSupportedException {
        return super.clone();
    }
}`}},{question:`Write code to handle exceptions like ArithmeticException for division by zero.`,answer:`Use a try-catch block to handle ArithmeticException.`,code:{language:`java`,content:`public class DivisionExample {
    public static void main(String[] args) {
        try {
            int result = divide(10, 0);
            System.out.println("Result: " + result);
        } catch (ArithmeticException e) {
            System.out.println("Error: Division by zero is not allowed.");
        }
    }

    public static int divide(int a, int b) {
        return a / b;
    }
}`}},{question:`Why do we use the Optional class in Java?`,answer:`The Optional class in Java is used to represent a value that might be null. It helps avoid NullPointerException by providing a way to handle null values explicitly. Using Optional, you can define default values, perform operations only when the value is present, or throw an exception if the value is absent.`,code:{language:`java`,content:`Optional<String> opt = Optional.ofNullable(str);
String result = opt.orElse("Default Value");
opt.ifPresent(System.out::println);`}},{question:`Which methods are available in the Optional class?`,answer:`Common methods in Optional: of(T value), ofNullable(T value), empty(), get(), isPresent(), ifPresent(Consumer), orElse(T other), orElseGet(Supplier), orElseThrow(Supplier), map(), flatMap(), filter().`,code:{language:`java`,content:`Optional.of("Hello").map(String::toUpperCase).orElse("Default");`}},{question:`How did you optimize a project when migrating from Java 7 to Java 8?`,answer:`When migrating from Java 7 to Java 8, we optimized our project by leveraging Java 8's new features:
- Lambda Expressions replaced anonymous inner classes
- Streams API processed collections in a functional style
- Optional handled null values safely
- New Date and Time API replaced old Date/Calendar classes
We refactored loops to streams, used Collectors to accumulate results, and leveraged parallel streams to improve performance in multi-core environments.`,code:{language:`java`,content:`// Java 7
List<String> result = new ArrayList<>();
for (String s : list) {
    if (s.startsWith("A")) {
        result.add(s.toUpperCase());
    }
}

// Java 8
List<String> result = list.stream()
    .filter(s -> s.startsWith("A"))
    .map(String::toUpperCase)
    .collect(Collectors.toList());`}},{question:`What classes are available in the Java Time API?`,answer:`Key classes in Java Time API (java.time):
- LocalDate (date without time)
- LocalTime (time without date)
- LocalDateTime (date and time)
- ZonedDateTime (date-time with time zone)
- Instant (timestamp)
- Duration (amount of time)
- Period (date-based amount)`,code:{language:`java`,content:`LocalDate today = LocalDate.now();
LocalTime time = LocalTime.now();
LocalDateTime dateTime = LocalDateTime.now();
ZonedDateTime zoned = ZonedDateTime.now();
Instant instant = Instant.now();`}},{question:`How do you schedule tasks in Java?`,answer:`Tasks in Java can be scheduled using ScheduledExecutorService or the Timer class. ScheduledExecutorService is preferred as it provides more flexibility and allows multiple tasks to be scheduled concurrently.`,code:{language:`java`,content:`ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);
scheduler.scheduleAtFixedRate(() -> {
    System.out.println("Task executed at: " + System.currentTimeMillis());
}, 0, 1, TimeUnit.SECONDS);
scheduler.shutdown();`}},{question:`What are parallel streams in Java?`,answer:`Parallel streams in Java allow processing data in parallel, taking advantage of multiple CPU cores. It is a feature of the Streams API where stream operations are divided into smaller tasks that run concurrently, potentially improving performance for large data sets.`,code:{language:`java`,content:`list.parallelStream().filter(n -> n % 2 == 0).forEach(System.out::println);`}},{question:`What are the advantages and disadvantages of parallel streams?`,answer:`- Advantages: performance improvement for large data sets by utilizing multiple CPU cores, simplified concurrency abstraction
- Disadvantages: overhead for small data sets may reduce performance, non-deterministic order of processing, complexity in debugging due to concurrency`,code:null}]},{name:`Manager Round`,questions:[{question:`Tell me about yourself and your project experience.`,answer:`I am [Your Name] with 3 years of experience as a Java Full Stack Developer. I have worked on banking applications using Spring Boot, React, and Microservices. My projects involved customer registration, transaction processing, and secure authentication.`,code:null},{question:`How do you handle team conflicts or disagreements?`,answer:`I believe in open communication and constructive feedback. When conflicts arise, I listen to all perspectives, find common ground, and propose solutions that benefit the team and project goals.`,code:null},{question:`How do you prioritize tasks in a project?`,answer:`I prioritize tasks based on business value, urgency, and dependencies. I use Agile methodologies to break down work into sprints and focus on delivering high-priority features first.`,code:null},{question:`What is your approach to learning new technologies?`,answer:`I learn new technologies through online courses, hands-on practice, reading documentation, and building personal projects. I also contribute to open-source projects to gain practical experience.`,code:null}]},{name:`HR Round`,questions:[{question:`Tell me about yourself.`,answer:`I am [Your Name] with 3 years of experience as a Java Full Stack Developer. I specialize in Spring Boot, React, and Microservices. I am passionate about building scalable applications and learning new technologies.`,code:null},{question:`Why do you want to join LTI Mindtree?`,answer:`LTI Mindtree is a global leader in technology consulting. I'm excited about the opportunity to work on innovative projects, learn from industry experts, and contribute to the company's growth.`,code:null},{question:`What are your salary expectations?`,answer:`Based on my experience and market standards, I am looking for a competitive package. I'm flexible and happy to discuss further based on the role.`,code:null},{question:`Where do you see yourself in 5 years?`,answer:`I see myself as a technical lead, contributing to architecture decisions, mentoring junior developers, and driving technical excellence.`,code:null},{question:`What are your strengths and weaknesses?`,answer:`- Strengths: quick learner, problem-solving skills, strong technical foundation, good team player
- Weakness: sometimes focus too much on perfection; working on delegating tasks better`,code:null},{question:`Why are you looking for a job change?`,answer:`Looking for better growth opportunities, challenging projects, and a chance to work with new technologies. LTI Mindtree offers the perfect environment for professional growth.`,code:null}]}]}]},"./m2p-fintech-walk-in/m2p.js":{id:`m2p-fintech-walk-in`,name:`M2P Fintech (walk_in)`,interviews:[{name:`M2P`,questionCount:48,rounds:[{name:`First Round - Technical Assessment`,category:`Spring Boot & Core Java`,questions:[{question:`What are the key differences between @Component, @Repository, and @Service annotations in Spring Boot?`,answer:`@Component: Generic stereotype annotation for any Spring-managed component. @Repository: Specialization of @Component used for DAO layer and exception translation. @Service: Specialization of @Component used for service layer logic.`,code:null},{question:`Explain the concept of dependency injection in Spring Boot.`,answer:`Dependency Injection (DI) is a design pattern where Spring manages object dependencies. It allows loose coupling by injecting dependencies at runtime. Types: Constructor Injection, Setter Injection, Field Injection.`,code:{language:`java`,content:`@Service
public class UserService {
    @Autowired private UserRepository repository;
}`}},{question:`How does Spring Boot handle exception handling? Explain with an example.`,answer:`Spring Boot provides @ControllerAdvice and @ExceptionHandler to handle exceptions globally.`,code:{language:`java`,content:`@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<String> handleNotFound(ResourceNotFoundException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
    }
}`}},{question:`What is the difference between @RestController and @Controller in Spring Boot?`,answer:`@Controller: Used for MVC applications, returns views. @RestController: Combination of @Controller and @ResponseBody, used for REST APIs.`,code:null},{question:`How do you configure and use Spring Boot caching with Redis?`,answer:`1) Add Redis dependency in pom.xml. 2) Use @EnableCaching in main class. 3) Configure Redis in application.properties. 4) Use @Cacheable, @CachePut, and @CacheEvict annotations.`,code:{language:`java`,content:`@Cacheable(value = "users", key = "#id")
public User getUser(Long id) { return repository.findById(id).orElse(null); }`}},{question:`Explain the internal working of Spring Boot's @Transactional annotation.`,answer:`Manages transactions declaratively. Uses AOP proxies to begin, commit, or rollback transactions. Works with Hibernate/JPA for database operations.`,code:{language:`java`,content:`@Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.READ_COMMITTED)
public void transferMoney(Account from, Account to, double amount) { }`}},{question:`What is the role of Spring Boot Actuator? Name some of its important endpoints.`,answer:`Provides production-ready features like health checks and metrics. Important endpoints: /actuator/health, /actuator/info, /actuator/metrics, /actuator/prometheus.`,code:{language:`properties`,content:`management.endpoints.web.exposure.include=health,info,metrics`}},{question:`What is Spring Boot Starter? How does it help in application development?`,answer:`Pre-configured dependency modules that simplify development. Example: spring-boot-starter-web, spring-boot-starter-data-jpa. Reduces boilerplate configuration.`,code:{language:`xml`,content:`<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>`}},{question:`How can you secure a Spring Boot REST API using JWT authentication?`,answer:`1) Implement JWT filter extending OncePerRequestFilter. 2) Validate tokens and extract user info. 3) Secure endpoints using @PreAuthorize. 4) Configure SecurityConfig with JWT filter.`,code:{language:`java`,content:`@Component
public class JwtFilter extends OncePerRequestFilter {
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) {
        String token = extractToken(request);
        if (token != null && validateToken(token)) {
            SecurityContextHolder.getContext().setAuthentication(getAuthentication(token));
        }
        chain.doFilter(request, response);
    }
}`}},{question:`Explain how Circuit Breaker works in Spring Boot.`,answer:`Prevents system failures by breaking the connection if failures exceed a threshold. Uses libraries like Resilience4j or Hystrix. Has three states: Closed, Open, Half-Open.`,code:{language:`java`,content:`@CircuitBreaker(name = "paymentService", fallbackMethod = "paymentFallback")
public PaymentResult processPayment(PaymentRequest request) { }`}},{question:`Write a Java program to check if a given string is a valid IPv4 address without using any inbuilt methods.`,answer:`Split by '.', check 4 parts, validate each part between 0-255.`,code:{language:`java`,content:`public class IPv4Validator {
    public static boolean isValidIPv4(String ip) {
        String[] parts = ip.split("\\\\.");
        if (parts.length != 4) return false;
        for (String part : parts) {
            try {
                int num = Integer.parseInt(part);
                if (num < 0 || num > 255) return false;
            } catch (NumberFormatException e) {
                return false;
            }
        }
        return true;
    }
}`}},{question:`Given an array of integers, return the indices of two numbers that add up to a specific target.`,answer:`Use HashMap to store complement and index for O(n) solution.`,code:{language:`java`,content:`public int[] twoSum(int[] nums, int target) {
    Map<Integer, Integer> map = new HashMap<>();
    for (int i = 0; i < nums.length; i++) {
        int complement = target - nums[i];
        if (map.containsKey(complement)) {
            return new int[]{map.get(complement), i};
        }
        map.put(nums[i], i);
    }
    return new int[]{};
}`}},{question:`Write a program to reverse the words in a sentence while maintaining their order.`,answer:`Split by space, reverse each word individually, join back.`,code:{language:`java`,content:`public String reverseWords(String s) {
    String[] words = s.split(" ");
    StringBuilder result = new StringBuilder();
    for (String word : words) {
        result.append(new StringBuilder(word).reverse()).append(" ");
    }
    return result.toString().trim();
}`}},{question:`Implement a function to check if a string is a palindrome using recursion.`,answer:`Compare first and last characters, recursively check inner substring.`,code:{language:`java`,content:`public boolean isPalindrome(String s) {
    return isPalindromeHelper(s, 0, s.length() - 1);
}
private boolean isPalindromeHelper(String s, int left, int right) {
    if (left >= right) return true;
    return (s.charAt(left) == s.charAt(right)) && isPalindromeHelper(s, left + 1, right - 1);
}`}},{question:`Implement a custom functional interface and demonstrate its use with a lambda expression.`,answer:`Create interface with @FunctionalInterface, implement using lambda.`,code:{language:`java`,content:`@FunctionalInterface
interface MathOperation { int operate(int a, int b); }
public class LambdaExample {
    public static void main(String[] args) {
        MathOperation sum = (a, b) -> a + b;
        System.out.println(sum.operate(5, 3));
    }
}`}},{question:`Find the first non-repeated character in a given string using Java Streams.`,answer:`Use groupingBy with LinkedHashMap to maintain order, filter count 1.`,code:{language:`java`,content:`public Character firstNonRepeated(String s) {
    Map<Character, Long> charCount = s.chars()
        .mapToObj(c -> (char) c)
        .collect(Collectors.groupingBy(Function.identity(), LinkedHashMap::new, Collectors.counting()));
    return charCount.entrySet().stream()
        .filter(entry -> entry.getValue() == 1)
        .map(Map.Entry::getKey)
        .findFirst()
        .orElse(null);
}`}},{question:`Implement a Least Recently Used (LRU) Cache in Java using LinkedHashMap.`,answer:`Extend LinkedHashMap with accessOrder=true and override removeEldestEntry.`,code:{language:`java`,content:`class LRUCache<K, V> extends LinkedHashMap<K, V> {
    private final int capacity;
    LRUCache(int capacity) {
        super(capacity, 0.75f, true);
        this.capacity = capacity;
    }
    @Override
    protected boolean removeEldestEntry(Map.Entry<K, V> eldest) {
        return size() > capacity;
    }
}`}},{question:`Given an array of numbers, find all unique triplets whose sum equals zero.`,answer:`Sort array, use two-pointer approach for each element.`,code:{language:`java`,content:`public List<List<Integer>> threeSum(int[] nums) {
    Arrays.sort(nums);
    List<List<Integer>> result = new ArrayList<>();
    for (int i = 0; i < nums.length - 2; i++) {
        if (i > 0 && nums[i] == nums[i-1]) continue;
        int left = i + 1, right = nums.length - 1;
        while (left < right) {
            int sum = nums[i] + nums[left] + nums[right];
            if (sum == 0) {
                result.add(Arrays.asList(nums[i], nums[left], nums[right]));
                while (left < right && nums[left] == nums[left+1]) left++;
                while (left < right && nums[right] == nums[right-1]) right--;
                left++; right--;
            } else if (sum < 0) {
                left++;
            } else {
                right--;
            }
        }
    }
    return result;
}`}},{question:`Implement a thread-safe Singleton class in Java.`,answer:`Use double-checked locking with volatile keyword.`,code:{language:`java`,content:`public class Singleton {
    private static volatile Singleton instance;
    private Singleton() {}
    public static Singleton getInstance() {
        if (instance == null) {
            synchronized (Singleton.class) {
                if (instance == null) {
                    instance = new Singleton();
                }
            }
        }
        return instance;
    }
}`}}]},{name:`Second Round - L1 Technical Interview`,category:`Spring Batch & Microservices`,questions:[{question:`Count of three-character palindromes in a string.`,answer:`Find unique 3-character palindromes where first and last characters match. Examples: "aabca" → 3, "adc" → 0, "bbcbaba" → 4.`,code:{language:`java`,content:`public class UniqueThreeCharPalindromes {
    public static int countPalindromicSubsequences(String s) {
        Set<String> uniquePalindromes = new HashSet<>();
        for (char c = 'a'; c <= 'z'; c++) {
            int first = s.indexOf(c);
            int last = s.lastIndexOf(c);
            if (first != -1 && last != -1 && last - first > 1) {
                for (int i = first + 1; i < last; i++) {
                    uniquePalindromes.add("" + s.charAt(first) + s.charAt(i) + s.charAt(last));
                }
            }
        }
        return uniquePalindromes.size();
    }
}`}},{question:`What is a circuit breaker in microservices?`,answer:`A circuit breaker in microservices is a design pattern used to prevent a system from making repeated requests to a failing service. It detects failures and stops sending requests to prevent cascading failures. Once the service recovers, it resumes operations.`,code:null},{question:`How does Netflix Hystrix work in Spring Boot?`,answer:`Netflix Hystrix provides a circuit breaker mechanism to handle failures in microservices. It isolates failing components and provides fallbacks to prevent system-wide failures. In Spring Boot, it is implemented using @HystrixCommand to wrap service calls with circuit breaker functionality.`,code:{language:`java`,content:`@HystrixCommand(fallbackMethod = "fallbackMethod")
public String callService() { }`}},{question:`What are the different states of a circuit breaker?`,answer:`1) Closed - Requests flow normally. If failures increase beyond threshold, transitions to Open. 2) Open - Requests are blocked, fallback mechanisms take over. 3) Half-Open - Few requests allowed to test if service recovered. If successful, moves back to Closed; otherwise, stays Open.`,code:null},{question:`Explain API Gateway and its role in microservices.`,answer:`An API Gateway acts as an entry point for microservices, handling authentication, request routing, rate limiting, and load balancing. It simplifies communication between clients and backend services by consolidating multiple APIs into a single endpoint.`,code:null},{question:`What is service registry and discovery in microservices?`,answer:`Service registry and discovery help microservices locate and communicate with each other dynamically. A service registry (e.g., Eureka) maintains a list of available services, and discovery mechanisms allow services to register and find each other without hardcoding URLs.`,code:{language:`java`,content:`@EnableDiscoveryClient
@SpringBootApplication
public class UserService { }`}},{question:`How does load balancing work in microservices?`,answer:`Load balancing distributes incoming requests across multiple service instances. Types: 1) Client-Side Load Balancing (Ribbon) - Clients choose instance from list. 2) Server-Side Load Balancing (Nginx, HAProxy) - Central load balancer directs traffic. 3) Service Mesh Load Balancing (Istio) - Managed at service level.`,code:null}]},{name:`Third Round - L2 Technical Interview`,category:`Data Structures & Advanced Java`,questions:[{question:`What is the difference between ArrayList and LinkedList?`,answer:`ArrayList: Dynamic array, fast access O(1), slow insertion/deletion O(n). LinkedList: Doubly linked list, slow access O(n), fast insertion/deletion O(1) at head/tail.`,code:null},{question:`How does HashMap handle collisions internally?`,answer:`HashMap handles collisions using chaining (linked list or tree nodes). Each bucket is linked list (before Java 8) or balanced tree (after Java 8, when size > 8). When bucket size exceeds threshold, converts to Red-Black Tree for faster lookups.`,code:null},{question:`How do you make a collection thread-safe in Java?`,answer:`1) Synchronized Collections - Collections.synchronizedList(new ArrayList<>()). 2) Concurrent Collections - CopyOnWriteArrayList, ConcurrentHashMap. 3) Explicit Synchronization - Using synchronized blocks.`,code:{language:`java`,content:`List<String> syncList = Collections.synchronizedList(new ArrayList<>());
ConcurrentHashMap<String, Integer> map = new ConcurrentHashMap<>();`}},{question:`Implement ArrayList using an array with add and remove methods that automatically resize when needed.`,answer:`Create custom ArrayList with array backing, resizing when capacity exceeded.`,code:{language:`java`,content:`class GenericArrayList<T> {
    private Object[] arr;
    private int size;
    private int capacity;
    public GenericArrayList() { capacity = 10; arr = new Object[capacity]; size = 0; }
    public void add(T value) {
        if (size == capacity) { capacity *= 2; arr = Arrays.copyOf(arr, capacity); }
        arr[size++] = value;
    }
    @SuppressWarnings("unchecked")
    public T get(int index) { return (T) arr[index]; }
    public void remove(int index) {
        for (int i = index; i < size - 1; i++) { arr[i] = arr[i + 1]; }
        size--;
    }
}`}},{question:`Write an SQL query to find the 3rd highest salary from an Employee table.`,answer:`Use DISTINCT with ORDER BY and LIMIT OFFSET, or DENSE_RANK window function.`,code:{language:`sql`,content:`SELECT DISTINCT salary FROM Employee ORDER BY salary DESC LIMIT 1 OFFSET 2;
-- OR
SELECT salary FROM (SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) AS rnk FROM Employee) temp WHERE rnk = 3;`}},{question:`How do you handle distributed transactions in microservices?`,answer:`1) Two-Phase Commit (2PC): Coordinating commit across multiple services. 2) Saga Pattern: Choreography (services trigger each other) or Orchestration (central orchestrator). 3) Event-Driven: Using Kafka/RabbitMQ. 4) Compensating Transactions: Rollback logic on failure.`,code:null}]},{name:`Fourth Round - L3 System Design Interview`,category:`System Design`,questions:[{question:`How would you design a scalable hotel search engine?`,answer:`Architecture: Microservices with event-driven architecture. Database: NoSQL (MongoDB, Elasticsearch) for fast queries, SQL for structured data. Search: Elasticsearch indexing. Load Balancing: Multi-region with CDN caching. API Gateway: GraphQL/REST with rate-limiting. Caching: Redis/Memcached. Data Storage: S3/GCS. Message Queue: Kafka/RabbitMQ. Scalability: Kubernetes/Docker for containerization and auto-scaling.`,code:null},{question:`What are the key components needed to optimize search results in a hotel search system?`,answer:`1) Indexing: Structured hotel data in Elasticsearch. 2) Ranking Algorithm: Relevance Score (TF-IDF) or Machine Learning models. 3) Filters & Sorting: By price, rating, distance. 4) Geo-Spatial Search: Geo-indexing for location queries. 5) Personalization: Recommendations based on user history. 6) Auto-Suggestions: n-grams or trie-based search.`,code:null},{question:`How does indexing help in improving search performance?`,answer:`1) Faster Lookups: Reduces lookup time from O(n) to O(log n) or O(1). 2) Better Query Execution: Uses B-Trees, Hash Indexing, Full-Text Search. 3) Optimized Sorting & Filtering: Queries run on precomputed indexes. 4) Efficient Range Queries: For date range searches. 5) Inverted Index: Used in Elasticsearch for fast text-based queries.`,code:null},{question:`What techniques would you use to handle high traffic in a hotel search engine?`,answer:`1) Load Balancing: Nginx, HAProxy, AWS ALB. 2) Database Optimization: Read replicas, sharding, caching. 3) CDN: Cloudflare, AWS CloudFront for static content. 4) Asynchronous Processing: Kafka, RabbitMQ for background tasks. 5) Horizontal Scaling: Kubernetes, Auto Scaling Groups.`,code:null},{question:`How can Redis be used to improve search performance?`,answer:`1) Caching: Store frequent search results. 2) Session Management: Manage user sessions. 3) Leaderboard & Ranking: Store hotel popularity ranking. 4) Rate Limiting: Prevent API abuse. 5) Geo-Indexing: Redis GeoSpatial Indexing for location-based searches.`,code:{language:`java`,content:`redisTemplate.opsForGeo().geoAdd("hotels", new Point(lat, lon), hotelId);`}},{question:`How would you design the database schema for a hotel search system?`,answer:`SQL Schema: Hotels table with hotel_id, name, address, city, country, latitude, longitude, rating, price, available_rooms. Bookings table with booking_id, user_id, hotel_id, checkin_date, checkout_date, total_price. NoSQL Schema: Elasticsearch/MongoDB with hotel_id, name, location, city, rating, price, amenities, available_rooms.`,code:{language:`sql`,content:`CREATE TABLE hotels (
    hotel_id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    address TEXT,
    city VARCHAR(100),
    country VARCHAR(100),
    latitude DECIMAL(10,6),
    longitude DECIMAL(10,6),
    rating DECIMAL(2,1),
    price DECIMAL(10,2),
    available_rooms INT
);`}},{question:`How do you handle real-time availability and pricing updates in the system?`,answer:`1) Event-Driven Architecture: Use Kafka/RabbitMQ to broadcast updates. 2) Database Triggers: Sync price updates with MySQL/PostgreSQL triggers. 3) Distributed Caching: Redis/Memcached to update price cache instantly. 4) WebSockets: For real-time UI updates when prices change.`,code:null},{question:`What caching strategies would you use to optimize search queries?`,answer:`1) Write-Through Cache: Updates cache immediately when DB changes. 2) Read-Through Cache: Data fetched from DB only when needed. 3) Time-Based Expiry: Set TTL for hotel pricing cache. 4) LRU (Least Recently Used): Removes oldest cached items. 5) Cache Partitioning: Separate popular vs less popular queries.`,code:null},{question:`What is sharding, and how can it be implemented in a hotel search system?`,answer:`Sharding is splitting database data across multiple servers to improve performance. Implementation: 1) Range-Based Sharding: Hotels A-M, Hotels N-Z. 2) Geo-Based Sharding: USA, Europe. 3) Hash-Based Sharding: hotel_id % number_of_shards. 4) Customer-Based Sharding: Premium Users, Regular Users.`,code:null},{question:`What load-balancing strategies would you use for the hotel search engine?`,answer:`1) Round Robin: Distributes requests evenly. 2) Least Connections: Routes to least busy server. 3) GeoDNS: Directs users to nearest server. 4) Weighted Load Balancing: Allocates more traffic to powerful servers. 5) Auto Scaling: Adjusts server count dynamically using Kubernetes.`,code:null}]},{name:`HR Round`,category:`Behavioral`,questions:[{question:`Tell me about yourself.`,answer:`I am [Your Name] with 3 years of experience in Java Full Stack Development. I specialize in Spring Boot, Microservices, Hibernate, and ReactJS. I have worked on customer registration systems and transaction data handling. I am passionate about building scalable applications and learning new technologies.`,code:null},{question:`Why do you want to join M2P?`,answer:`M2P has a strong reputation in fintech solutions. I'm excited about the opportunity to work on challenging financial projects, learn new technologies, and contribute to the company's growth.`,code:null},{question:`What are your salary expectations?`,answer:`Based on my experience and market standards, I am looking for a competitive package. I'm flexible and happy to discuss further based on the role and responsibilities.`,code:null},{question:`Where do you see yourself in 5 years?`,answer:`I see myself as a technical lead, contributing to architecture decisions and mentoring junior developers. I want to continue growing my technical skills and take on more responsibilities.`,code:null},{question:`What are your strengths and weaknesses?`,answer:`Strengths: Quick learner, problem-solving skills, strong technical foundation, good team player. Weakness: Sometimes focus too much on perfection, working on delegating tasks better.`,code:null},{question:`Why are you looking for a job change?`,answer:`Looking for better growth opportunities, challenging projects, and a chance to work with new technologies. M2P offers the perfect environment for professional growth.`,code:null}]}]}],questionCount:48},"./mindgate/mindgate.js":{id:`mindgate`,name:`MindGate`,interviews:[{name:`MindGate`,questionCount:43,rounds:[{name:`L1 Technical Interview`,questions:[{question:`Self-introduction based on your project.`,answer:`I am [Your Name] with 3 years of experience in Java and ReactJS. In my current project, I developed a customer registration service using ReactJS and Spring Boot, integrating with multiple microservices to ensure secure and efficient data handling.`,code:null},{question:`Explain microservices architecture.`,answer:`Microservices architecture divides an application into small, independent services, each responsible for a specific business functionality. These services communicate over a network, allowing for decentralized development, scaling, and deployment.`,code:null},{question:`How do microservices communicate internally?`,answer:`Microservices communicate internally using protocols like HTTP/REST, gRPC, or messaging systems like Kafka. Service discovery tools and load balancers help manage requests and ensure service availability.`,code:null},{question:`How does a JWT token work internally?`,answer:`A JWT token encodes user information and is signed with a secret key. The token is sent to the client and included in subsequent requests. The server verifies the token's signature to authenticate the user.`,code:null},{question:`Explain the Collection hierarchy in Java.`,answer:`The Collection hierarchy starts with Iterable, followed by Collection, branching into List, Set, and Queue. Map is a separate interface for key-value pairs, not extending Collection.`,code:null},{question:`If a List is declared as final, can we modify it?`,answer:`Yes, a final List can have its contents modified, but its reference cannot be reassigned to another List object.`,code:{language:`java`,content:`final List<String> list = new ArrayList<>();
list.add("Hello"); // Allowed
list = new ArrayList<>(); // Compilation error`}},{question:`Why does a Set not allow duplicates?`,answer:`A Set does not allow duplicates because it uses the equals() and hashCode() methods to ensure all elements are unique.`,code:null},{question:`What is the difference between fail-safe and fail-fast iterators?`,answer:`Fail-fast iterators throw a ConcurrentModificationException if the collection is modified during iteration. Fail-safe iterators work on a copy of the collection, allowing safe iteration.`,code:{language:`java`,content:`// Fail-fast
ArrayList<String> list = new ArrayList<>();
for(String s : list) { list.remove(s); } // Exception
// Fail-safe
CopyOnWriteArrayList<String> list = new CopyOnWriteArrayList<>();
for(String s : list) { list.remove(s); } // Safe`}},{question:`Explain ConcurrentHashMap.`,answer:`ConcurrentHashMap is a thread-safe implementation of Map that allows concurrent read and write operations by dividing the map into segments, reducing contention.`,code:{language:`java`,content:`ConcurrentHashMap<String, Integer> map = new ConcurrentHashMap<>();
map.put("key", 10);`}},{question:`What happens when you use HashMap in a multithreaded environment?`,answer:`Using HashMap in a multithreaded environment can lead to data corruption and unpredictable results due to concurrent modifications. ConcurrentHashMap should be used instead.`,code:null},{question:`Describe the Java thread lifecycle.`,answer:`The Java thread lifecycle includes New, Runnable, Blocked, Waiting, Timed Waiting, and Terminated states. A thread transitions through these states based on its execution and synchronization.`,code:null},{question:`Write a custom ArrayList that does not allow duplicates.`,answer:`Extend ArrayList and override add method to check for duplicates using contains.`,code:{language:`java`,content:`import java.util.ArrayList;
public class UniqueArrayList<E> extends ArrayList<E> {
    @Override
    public boolean add(E e) {
        if (!contains(e)) {
            return super.add(e);
        }
        return false;
    }
}
// Usage
UniqueArrayList<String> list = new UniqueArrayList<>();
list.add("A"); // true
list.add("A"); // false`}},{question:`How do you find the occurrences of words using HashMap in Java?`,answer:`Split string into words, use HashMap with getOrDefault to count occurrences.`,code:{language:`java`,content:`public class WordCount {
    public static void main(String[] args) {
        String text = "apple apple banana apple orange banana";
        Map<String, Integer> wordCount = new HashMap<>();
        for (String word : text.split(" ")) {
            wordCount.put(word, wordCount.getOrDefault(word, 0) + 1);
        }
        for (Map.Entry<String, Integer> entry : wordCount.entrySet()) {
            System.out.println(entry.getKey() + ": " + entry.getValue());
        }
    }
}`}},{question:`Write an SQL query to print account names based on the currency name.`,answer:`Join ACCOUNT, COUNTRY, and CURRENCY tables to filter by currency name.`,code:{language:`sql`,content:`SELECT A.ACCNAME
FROM ACCOUNT A
JOIN COUNTRY C ON A.COUNTRYID = C.COUNTRYID
JOIN CURRENCY CUR ON C.CURRID = CUR.CURRID
WHERE CUR.CURRNAME = 'currency_name';`}},{question:`What are your daily roles and responsibilities?`,answer:`Development: Writing and maintaining code for various features and fixing bugs. Collaboration: Working with cross-functional teams including designers, product managers, and other developers. Code Reviews: Participating in code reviews to ensure code quality and adherence to best practices. Testing: Writing and running unit tests and integration tests. Deployment: Assisting with the deployment of applications and ensuring smooth production operations.`,code:null},{question:`What is the difference between @RestController and @Controller in Spring?`,answer:`@Controller: Used in Spring MVC to define a controller class. Used for building web applications and returns views (JSP, Thymeleaf). @RestController: A specialized version of @Controller used for RESTful web services. Combines @Controller and @ResponseBody, returns data (JSON/XML) directly.`,code:null},{question:`What is the difference between method overloading and method overriding in Java?`,answer:`Method Overloading: Multiple methods same name different parameters, resolved at compile-time. Method Overriding: Subclass provides specific implementation for superclass method, resolved at runtime.`,code:{language:`java`,content:`// Overloading
void add(int a, int b) { }
void add(int a, int b, int c) { }
// Overriding
class Parent { void display() { } }
class Child extends Parent { @Override void display() { } }`}},{question:`What is a thread in Java?`,answer:`A thread in Java is a lightweight subprocess that runs concurrently with other threads. Threads allow a program to perform multiple tasks simultaneously. Each thread has its own execution path but shares the same process resources.`,code:{language:`java`,content:`Thread thread = new Thread(() -> System.out.println("Running"));
thread.start();`}},{question:`How do you handle exceptions in a Runnable since it cannot throw checked exceptions?`,answer:`Since Runnable does not allow throwing checked exceptions, handle exceptions within the run method using a try-catch block. Log or manage the exception as needed.`,code:{language:`java`,content:`public class MyRunnable implements Runnable {
    @Override
    public void run() {
        try {
            // Code that might throw an exception
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}`}},{question:`What are the differences between Callable and Runnable in Java?`,answer:`Runnable: Represents task, does not return result, cannot throw checked exceptions. Callable: Similar to Runnable but can return a result and can throw checked exceptions.`,code:{language:`java`,content:`Runnable r = () -> System.out.println("Hello");
Callable<String> c = () -> "Hello";`}},{question:`What is the difference between wait() and sleep() methods in Java?`,answer:`wait(): Called on object's monitor, releases lock, waits until notified, requires synchronization. sleep(): Static method of Thread class, pauses thread, does not release lock.`,code:{language:`java`,content:`synchronized(obj) { obj.wait(); }
Thread.sleep(1000);`}},{question:`What are the differences between Spring MVC and Spring Boot?`,answer:`Spring MVC: Framework for building web applications using MVC pattern. Requires configuration. Spring Boot: Simplifies Spring application setup with auto-configuration, embedded servers, convention-over-configuration.`,code:null},{question:`How do you join two tables in SQL? Provide an example query.`,answer:`Use JOIN clause to combine tables based on common column.`,code:{language:`sql`,content:`SELECT e.employee_id, e.name, d.department_name
FROM employees e
JOIN departments d ON e.department_id = d.department_id;`}},{question:`Write a Java code snippet to find the top element in a mountain array.`,answer:`Use binary search to find peak element.`,code:{language:`java`,content:`public class MountainArrayTop {
    public static int findTopElement(int[] arr) {
        int left = 0, right = arr.length - 1;
        while (left < right) {
            int mid = left + (right - left) / 2;
            if (arr[mid] > arr[mid + 1]) {
                right = mid;
            } else {
                left = mid + 1;
            }
        }
        return arr[left];
    }
    public static void main(String[] args) {
        int[] arr = {1, 3, 8, 12, 4, 2};
        System.out.println("Top element: " + findTopElement(arr)); // 12
    }
}`}}]},{name:`L1 React & Kafka`,questions:[{question:`How to migrate HTML & JavaScript code to ReactJS?`,answer:`1) Set up React Environment using Create React App. 2) Component Structure - Identify distinct sections as React components. 3) Convert HTML to JSX. 4) State Management - Convert JavaScript logic to React state and event handlers. 5) Refactor Functions to component methods or hooks. 6) Routing - Set up React Router for navigation.`,code:null},{question:`How to consume already shared messages in Kafka?`,answer:`1) Set Consumer Group - Configure consumer to be part of consumer group. 2) Seek to Offset - Use seek method to set offset. 3) Configure Consumer Properties - Set auto.offset.reset to earliest to read from beginning.`,code:{language:`java`,content:`Properties props = new Properties();
props.put("bootstrap.servers", "localhost:9092");
props.put("group.id", "my-group");
props.put("key.deserializer", "org.apache.kafka.common.serialization.StringDeserializer");
props.put("value.deserializer", "org.apache.kafka.common.serialization.StringDeserializer");
props.put("auto.offset.reset", "earliest");
KafkaConsumer<String, String> consumer = new KafkaConsumer<>(props);
consumer.subscribe(Arrays.asList("my-topic"));`}}]},{name:`L2 Technical Interview`,questions:[{question:`Can you describe a project you have worked on?`,answer:`I worked on a banking application with microservices architecture. The project handled customer registration, transaction processing, and account management. Used Spring Boot, React, Kafka, and MySQL. My role included API development, database design, and frontend integration.`,code:null},{question:`How do you scale your project?`,answer:`Strategies for scaling: load balancing using NGINX or AWS ALB, database optimization with indexing and caching, implementing microservices for independent scaling, using caching solutions like Redis, horizontal scaling of service instances.`,code:null},{question:`How do you analyze code for performance and quality?`,answer:`Use code reviews, static analysis tools (SonarQube), profiling tools (JProfiler), performance testing (JMeter). Identify bottlenecks, optimize algorithms, reduce database queries, implement caching.`,code:null},{question:`Which version of Spring Boot and Java have you used in your project?`,answer:`I have used Spring Boot 2.7.x and Java 11 in my projects. Also familiar with Spring Boot 3.x and Java 17.`,code:null},{question:`Why did you choose this company?`,answer:`I am attracted to this company's reputation for innovation, its focus on technology, and the opportunities for professional growth. The projects align with my skills and career aspirations.`,code:null},{question:`Have you used threads in your project? If so, how?`,answer:`Yes, used threads for parallel processing of batch jobs, async email notifications, and handling concurrent API requests. Used ExecutorService for thread pool management.`,code:{language:`java`,content:`ExecutorService executor = Executors.newFixedThreadPool(10);
executor.submit(() -> processBatch());
executor.shutdown();`}},{question:`Why do you use ExecutorService in your projects?`,answer:`ExecutorService provides thread pool management, simplifies concurrent task execution, improves resource management, avoids overhead of manual thread creation, and provides better control over task scheduling.`,code:null},{question:`Is it possible to solve tasks without using ExecutorService?`,answer:`Yes, tasks can be solved using raw threads (new Thread()). However, ExecutorService provides better resource management, reusability, and easier task scheduling. Manual thread management can lead to resource exhaustion.`,code:null},{question:`How do you ensure code quality and maintainability in your projects?`,answer:`Follow coding standards, conduct code reviews, write unit tests with JUnit and Mockito, use design patterns, implement CI/CD pipelines, use static code analysis tools (SonarQube).`,code:null},{question:`How do you handle version control and collaboration in your projects?`,answer:`Use Git for version control with feature branch workflow. Create pull requests for code reviews. Use tools like Jira for task tracking and Slack for team communication.`,code:{language:`bash`,content:`git checkout -b feature-branch
git add .
git commit -m "message"
git push origin feature-branch`}}]},{name:`HR Round`,questions:[{question:`Tell me about yourself.`,answer:`I am [Your Name] with 3 years of experience as a Java Full Stack Developer. I specialize in Spring Boot, React, and Microservices. I have worked on banking applications and customer registration systems. I am passionate about building scalable applications and learning new technologies.`,code:null},{question:`Why do you want to join MindGate?`,answer:`MindGate has a strong reputation in technology consulting. I'm excited about the opportunity to work on challenging projects, learn from industry experts, and contribute to the company's growth.`,code:null},{question:`What are your salary expectations?`,answer:`Based on my experience and market standards, I am looking for a competitive package. I'm flexible and happy to discuss further based on the role.`,code:null},{question:`Where do you see yourself in 5 years?`,answer:`I see myself as a technical lead, contributing to architecture decisions, mentoring junior developers, and driving technical excellence.`,code:null},{question:`What are your strengths and weaknesses?`,answer:`Strengths: Quick learner, problem-solving skills, strong technical foundation, good team player. Weakness: Sometimes focus too much on perfection, working on delegating tasks better.`,code:null},{question:`Why are you looking for a job change?`,answer:`Looking for better growth opportunities, challenging projects, and a chance to work with new technologies. MindGate offers the perfect environment for professional growth.`,code:null},{question:`What is your preferred location?`,answer:`I am open to working in [location] or remote based on company requirements.`,code:null}]}]}],questionCount:43},"./oracle/oracle.js":{id:`oracle`,name:`Oracle`,interviews:[{name:`oracle`,questionCount:23,rounds:[{name:`First Round - HackerRank`,questions:[{question:`Self-introduction`,answer:`I am [Your Name] with 3 years of experience as a Java Full Stack Developer. I specialize in Spring Boot, React, and Microservices. I have worked on banking applications, customer registration systems, and real-time transaction processing.`,code:null},{question:`Find highest and lowest rank of Students`,answer:`Use sorting or streams to find min and max rank.`,code:{language:`java`,content:`public class StudentRank {
    public static void main(String[] args) {
        List<Integer> ranks = Arrays.asList(5, 2, 8, 1, 9, 3);
        int highest = ranks.stream().max(Integer::compareTo).orElse(0);
        int lowest = ranks.stream().min(Integer::compareTo).orElse(0);
        System.out.println("Highest Rank: " + highest);
        System.out.println("Lowest Rank: " + lowest);
    }
}`}},{question:`Vending machine Problem`,answer:`Design vending machine with inventory, payment, and dispensing logic.`,code:{language:`java`,content:`public class VendingMachine {
    private Map<String, Integer> inventory = new HashMap<>();
    private int balance = 0;
    public void addItem(String item, int price) { inventory.put(item, price); }
    public void insertCoin(int amount) { balance += amount; }
    public String dispense(String item) {
        if (inventory.containsKey(item) && balance >= inventory.get(item)) {
            balance -= inventory.get(item);
            return "Dispensed: " + item;
        }
        return "Insufficient balance or item not available";
    }
}`}},{question:`SQL Query - Joins Based Query`,answer:`Query to join tables based on common columns.`,code:{language:`sql`,content:`SELECT e.employee_id, e.name, d.department_name
FROM employees e
JOIN departments d ON e.department_id = d.department_id;`}},{question:`SQL Query - Pivot Based Query`,answer:`Use CASE statements to pivot data.`,code:{language:`sql`,content:`SELECT department,
    SUM(CASE WHEN month = 'Jan' THEN sales END) AS Jan,
    SUM(CASE WHEN month = 'Feb' THEN sales END) AS Feb,
    SUM(CASE WHEN month = 'Mar' THEN sales END) AS Mar
FROM sales_data
GROUP BY department;`}}]},{name:`Second Round - Technical Interview`,questions:[{question:`Self-introduction based on project.`,answer:`I am [Your Name] with 3 years of experience in Java and React. In my current project, I developed a customer registration service using ReactJS and Spring Boot, integrating with multiple microservices to ensure secure and efficient data handling.`,code:null},{question:`Write a Spring Boot project for login and register using JWT token through an online Java compiler.`,answer:`Create Spring Boot application with AuthController for register and login endpoints. Use JwtService for token generation.`,code:{language:`java`,content:`@SpringBootApplication
public class JwtDemoApplication {
    public static void main(String[] args) {
        SpringApplication.run(JwtDemoApplication.class, args);
    }
}
@RestController
@RequestMapping("/auth")
public class AuthController {
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        // Save user logic
        return ResponseEntity.ok("User registered successfully");
    }
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {
        // Authenticate and generate JWT
        String token = jwtService.generateToken(username);
        return ResponseEntity.ok(new AuthResponse(token));
    }
}
@Service
public class JwtService {
    public String generateToken(String username) {
        return Jwts.builder()
            .setSubject(username)
            .setIssuedAt(new Date())
            .setExpiration(new Date(System.currentTimeMillis() + 3600000))
            .signWith(SignatureAlgorithm.HS256, SECRET)
            .compact();
    }
}`}},{question:`How to handle when microservices fail?`,answer:`Use fallback mechanisms, retry policies, and circuit breakers. Implement circuit breaker pattern using Resilience4j to isolate failing services and prevent cascading failures.`,code:null},{question:`How to implement circuit breakers in microservices?`,answer:`Use Resilience4j with @CircuitBreaker annotation and fallback method.`,code:{language:`java`,content:`@Service
public class MyService {
    @CircuitBreaker(name = "myService", fallbackMethod = "fallbackMethod")
    public String performOperation() {
        // Code that may fail
        return "Success";
    }
    public String fallbackMethod(Throwable t) {
        return "Fallback response";
    }
}`}},{question:`Write a program to sort a string array without using any sort method or inbuilt functions.`,answer:`Use bubble sort algorithm with custom comparison.`,code:{language:`java`,content:`public class StringArraySort {
    public static void main(String[] args) {
        String[] arr = {"banana", "apple", "cherry"};
        for (int i = 0; i < arr.length - 1; i++) {
            for (int j = i + 1; j < arr.length; j++) {
                if (compareStrings(arr[i], arr[j]) > 0) {
                    String temp = arr[i];
                    arr[i] = arr[j];
                    arr[j] = temp;
                }
            }
        }
        for (String str : arr) {
            System.out.println(str);
        }
    }
    public static int compareStrings(String s1, String s2) {
        int len = Math.min(s1.length(), s2.length());
        for (int i = 0; i < len; i++) {
            if (s1.charAt(i) != s2.charAt(i)) {
                return s1.charAt(i) - s2.charAt(i);
            }
        }
        return s1.length() - s2.length();
    }
}`}},{question:`Internal working process of HashMap.`,answer:`HashMap uses hashing principle. It uses array of buckets to store key-value pairs. hashCode() determines bucket index. Collisions handled by linked list or tree structure within bucket. Retrieval uses hash code and equals() method.`,code:null},{question:`Scenario where overriding hashCode and equals is necessary in Java.`,answer:`When custom object is used as key in HashMap or hash-based collections. Must override both for correct behavior.`,code:{language:`java`,content:`public class Employee {
    private int id;
    private String name;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Employee emp = (Employee) o;
        return id == emp.id && Objects.equals(name, emp.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name);
    }
}`}},{question:`Difference between HashMap and Hashtable.`,answer:`HashMap: Non-synchronized, allows one null key and multiple null values, faster. Hashtable: Synchronized, does not allow null keys or values, slower due to synchronization overhead.`,code:null},{question:`Difference between synchronized and non-synchronized with real-time examples.`,answer:`Synchronized: Thread-safe, only one thread can access resource at a time. Example: Hashtable. Non-synchronized: Not thread-safe, multiple threads can access simultaneously. Example: HashMap.`,code:null},{question:`Write a program to make a HashMap synchronized.`,answer:`Use Collections.synchronizedMap() to make HashMap thread-safe.`,code:{language:`java`,content:`import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
public class SyncHashMapExample {
    public static void main(String[] args) {
        Map<String, String> map = new HashMap<>();
        map.put("1", "One");
        map.put("2", "Two");
        Map<String, String> syncMap = Collections.synchronizedMap(map);
        synchronized (syncMap) {
            for (Map.Entry<String, String> entry : syncMap.entrySet()) {
                System.out.println(entry.getKey() + ": " + entry.getValue());
            }
        }
    }
}`}}]},{name:`Final Round - HR/Manager`,questions:[{question:`Self-introduction`,answer:`I am [Your Name] with 3 years of experience as a Java Full Stack Developer. I specialize in Spring Boot, React, and Microservices. I am passionate about building scalable applications and learning new technologies.`,code:null},{question:`About qualification`,answer:`I have completed [Your Degree] in [Your Field] from [Your University]. I also hold Oracle Certified Associate (OCA) certification.`,code:null},{question:`About project`,answer:`I worked on a banking application with microservices architecture. The project handled customer registration, transaction processing, and account management using Spring Boot, React, Kafka, and MySQL.`,code:null},{question:`How you learned coding and family details`,answer:`I started coding during college and continued with online courses and personal projects. I come from a supportive family background.`,code:null},{question:`Which technology you know?`,answer:`I am proficient in Java, Spring Boot, React, Microservices, Hibernate, JPA, MySQL, Docker, Kubernetes, and Git.`,code:null},{question:`If we offer you new technology, which technology would you choose?`,answer:`I would love to learn and work with cloud technologies like AWS and Kubernetes, or explore AI/ML with Python.`,code:null},{question:`In your developing project, which is your most struggling phase?`,answer:`The most struggling phase was integrating multiple microservices and ensuring data consistency across them.`,code:null},{question:`How did you overcome that?`,answer:`We implemented the Saga pattern for distributed transactions, used Kafka for event-driven communication, and added circuit breakers for fault tolerance.`,code:null}]}]}],questionCount:23},"./paypal/paypal.js":{id:`paypal`,name:`PayPal`,interviews:[{name:`PayPal Interview`,questionCount:8,rounds:[{name:`HackerRank Coding Assessment`,questions:[{question:`Inventory Clearance Sale`,answer:`Process inventory items during a clearance sale. Sort items by discount percentage or final price, calculate sale prices, and determine the maximum savings or the optimal purchase combinations.`,code:{language:`java`,content:`public class InventoryClearance {
    public static int maxSavings(int[] prices, int[] discounts) {
        // Sort items by discount percentage
        // Calculate final price after discount
        // Return maximum possible savings
        return 0;
    }
}`}},{question:`Item Purchase`,answer:`Optimize item purchases given a budget. Find the maximum number of items that can be bought or the optimal combination of items within the budget.`,code:{language:`java`,content:`public class ItemPurchase {
    public static int maxItems(int[] prices, int budget) {
        // Sort prices
        // Buy cheapest items first
        // Return maximum count of items
        return 0;
    }
}`}},{question:`Minimum Total Weight`,answer:`Minimize total weight by combining items or selecting optimal subsets. Typically solved with a greedy approach or dynamic programming.`,code:{language:`java`,content:`public class MinimumTotalWeight {
    public static int minWeight(int[] weights, int k) {
        // Combine items or select subsets
        // Return minimum possible weight
        return 0;
    }
}`}}]},{name:`Technical L1 Interview`,questions:[{question:`Find the longest substring with non-repeating characters`,answer:`Use the sliding-window technique with a HashSet to track characters. Expand the right pointer when the character is not in the set; shrink the left pointer when a duplicate is found. Track the maximum window size.

Examples:
- Input: "abcabcbb" → 3 ("abc")
- Input: "bbbbb"    → 1 ("b")
- Input: "pwwkew"   → 3 ("wke")

Time Complexity: O(n). Space Complexity: O(min(n, m)) where m is the charset size.`,code:{language:`java`,content:`import java.util.HashSet;

public class LongestSubstring {
    public static int lengthOfLongestSubstring(String s) {
        int left = 0, right = 0, maxLength = 0;
        HashSet<Character> set = new HashSet<>();

        while (right < s.length()) {
            if (!set.contains(s.charAt(right))) {
                set.add(s.charAt(right));
                maxLength = Math.max(maxLength, right - left + 1);
                right++;
            } else {
                set.remove(s.charAt(left));
                left++;
            }
        }
        return maxLength;
    }

    public static void main(String[] args) {
        System.out.println(lengthOfLongestSubstring("abcabcbb")); // 3
        System.out.println(lengthOfLongestSubstring("bbbbb"));    // 1
        System.out.println(lengthOfLongestSubstring("pwwkew"));   // 3
    }
}`}},{question:`Find the maximum water trapped between bars`,answer:`Use the two-pointer technique. Track leftMax and rightMax. When the left height is smaller, process the left side: if the current height is greater than or equal to leftMax, update leftMax; otherwise, add the difference. Apply the same logic on the right side.

Examples:
- Input: [0,1,0,2,1,0,1,3,2,1,2,1] → 6
- Input: [4,2,0,3,2,5]            → 9

Time Complexity: O(n). Space Complexity: O(1).`,code:{language:`java`,content:`public class TrappingRainWater {
    public static int trap(int[] height) {
        if (height == null || height.length == 0) return 0;

        int left = 0, right = height.length - 1;
        int leftMax = 0, rightMax = 0, trappedWater = 0;

        while (left < right) {
            if (height[left] < height[right]) {
                if (height[left] >= leftMax) {
                    leftMax = height[left];
                } else {
                    trappedWater += (leftMax - height[left]);
                }
                left++;
            } else {
                if (height[right] >= rightMax) {
                    rightMax = height[right];
                } else {
                    trappedWater += (rightMax - height[right]);
                }
                right--;
            }
        }
        return trappedWater;
    }

    public static void main(String[] args) {
        System.out.println(trap(new int[]{0,1,0,2,1,0,1,3,2,1,2,1})); // 6
        System.out.println(trap(new int[]{4,2,0,3,2,5})); // 9
    }
}`}}]},{name:`Technical L2 Interview`,questions:[{question:`Peer-to-Peer Payment System Design - Send Payment API`,answer:`Design a payment system where users can send money to each other. The implementation has:
- User class with balance (userId, balance, getters/setters)
- Transaction class to record senderId, receiverId, amount, status
- PaymentService with addUser, sendPayment, requestPayment, printTransactions, printRequests

sendPayment() validates users, checks the sender's balance, updates both balances atomically, and records the transaction with status COMPLETED (or FAILED on insufficient balance).`,code:{language:`java`,content:`import java.util.*;

class User {
    private String userId;
    private double balance;

    public User(String userId, double balance) {
        this.userId = userId;
        this.balance = balance;
    }

    public String getUserId() { return userId; }
    public double getBalance() { return balance; }
    public void setBalance(double balance) { this.balance = balance; }
}

class Transaction {
    private String senderId;
    private String receiverId;
    private double amount;
    private String status;

    public Transaction(String senderId, String receiverId, double amount, String status) {
        this.senderId = senderId;
        this.receiverId = receiverId;
        this.amount = amount;
        this.status = status;
    }

    public String toString() {
        return "Transaction: " + senderId + " -> " + receiverId +
               " | Amount: " + amount + " | Status: " + status;
    }
}

class PaymentService {
    private Map<String, User> users = new HashMap<>();
    private List<Transaction> transactions = new ArrayList<>();
    private List<String> paymentRequests = new ArrayList<>();

    public void addUser(String userId, double balance) {
        users.put(userId, new User(userId, balance));
    }

    public String sendPayment(String senderId, String receiverId, double amount) {
        if (!users.containsKey(senderId) || !users.containsKey(receiverId)) {
            return "Invalid user IDs";
        }

        User sender = users.get(senderId);
        User receiver = users.get(receiverId);

        if (sender.getBalance() < amount) {
            transactions.add(new Transaction(senderId, receiverId, amount, "FAILED"));
            return "Insufficient balance";
        }

        sender.setBalance(sender.getBalance() - amount);
        receiver.setBalance(receiver.getBalance() + amount);
        transactions.add(new Transaction(senderId, receiverId, amount, "COMPLETED"));

        return "Payment Successful";
    }

    public String requestPayment(String requesterId, String payerId, double amount) {
        if (!users.containsKey(requesterId) || !users.containsKey(payerId)) {
            return "Invalid user IDs";
        }

        String request = "Request from " + requesterId + " to " + payerId + " for amount " + amount;
        paymentRequests.add(request);
        return "Payment Request Sent";
    }

    public void printTransactions() {
        transactions.forEach(System.out::println);
    }

    public void printRequests() {
        paymentRequests.forEach(System.out::println);
    }
}

public class PeerToPeerPayment {
    public static void main(String[] args) {
        PaymentService service = new PaymentService();
        service.addUser("user1", 1000);
        service.addUser("user2", 500);

        System.out.println(service.sendPayment("user1", "user2", 200));
        System.out.println(service.requestPayment("user2", "user1", 150));

        service.printTransactions();
        service.printRequests();
    }
}`}},{question:`Peer-to-Peer Payment System Design - Request Payment API`,answer:`Design a request-payment API where one user can ask another user to pay a specific amount. The requestPayment() method creates a pending payment request and stores the requester, payer, amount, and status. Requests are tracked separately from completed transactions so that pending asks can be listed independently.`,code:{language:`java`,content:`// Key method (used by the PaymentService in the Send Payment API design):
public String requestPayment(String requesterId, String payerId, double amount) {
    if (!users.containsKey(requesterId) || !users.containsKey(payerId)) {
        return "Invalid user IDs";
    }
    String request = "Request from " + requesterId + " to " + payerId + " for amount " + amount;
    paymentRequests.add(request);
    return "Payment Request Sent";
}`}}]},{name:`Technical L3 Interview`,questions:[{question:`Furniture Order System - Enum Implementation`,answer:`Design a furniture ordering system using a Java enum for furniture types. Each furniture item has a unit cost. The FurnitureOrder class exposes methods to add orders, get per-type and total counts, compute the total order cost, and get the cost of a particular furniture type.

Furniture costs:
- CHAIR = 1500
- FAN   = 2000
- BED   = 5000

The solution uses an EnumMap for type-safe storage and a stream-based total computation. The 7 JUnit 5 tests cover addOrder, getAllOrders, getTotalFurnitureCount, getFurnitureCount, getTotalOrderCost, getFurnitureTypeCost, and the empty-order case.`,code:{language:`java`,content:`import java.util.EnumMap;
import java.util.Map;

enum Furniture {
    CHAIR(1500), FAN(2000), BED(5000);

    private final int cost;

    Furniture(int cost) {
        this.cost = cost;
    }

    public int getCost() {
        return cost;
    }
}

class FurnitureOrder {
    private final Map<Furniture, Integer> orders = new EnumMap<>(Furniture.class);

    public void addOrder(Furniture furniture, int quantity) {
        orders.put(furniture, orders.getOrDefault(furniture, 0) + quantity);
    }

    public Map<Furniture, Integer> getAllOrders() {
        return new EnumMap<>(orders);
    }

    public int getTotalFurnitureCount() {
        return orders.values().stream().mapToInt(Integer::intValue).sum();
    }

    public int getFurnitureCount(Furniture furniture) {
        return orders.getOrDefault(furniture, 0);
    }

    public int getTotalOrderCost() {
        return orders.entrySet().stream()
            .mapToInt(e -> e.getKey().getCost() * e.getValue())
            .sum();
    }

    public int getFurnitureTypeCost(Furniture furniture) {
        return getFurnitureCount(furniture) * furniture.getCost();
    }
}

// JUnit 5 Test Cases
import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class FurnitureOrderTest {
    private FurnitureOrder order;

    @BeforeEach
    void setUp() {
        order = new FurnitureOrder();
    }

    @Test
    void testAddOrder() {
        order.addOrder(Furniture.CHAIR, 2);
        assertEquals(2, order.getFurnitureCount(Furniture.CHAIR));
    }

    @Test
    void testGetAllOrders() {
        order.addOrder(Furniture.FAN, 1);
        assertTrue(order.getAllOrders().containsKey(Furniture.FAN));
    }

    @Test
    void testGetTotalFurnitureCount() {
        order.addOrder(Furniture.BED, 2);
        order.addOrder(Furniture.CHAIR, 3);
        assertEquals(5, order.getTotalFurnitureCount());
    }

    @Test
    void testGetFurnitureCount() {
        order.addOrder(Furniture.FAN, 4);
        assertEquals(4, order.getFurnitureCount(Furniture.FAN));
    }

    @Test
    void testGetTotalOrderCost() {
        order.addOrder(Furniture.CHAIR, 2);
        order.addOrder(Furniture.BED, 1);
        assertEquals(8000, order.getTotalOrderCost());
    }

    @Test
    void testGetFurnitureTypeCost() {
        order.addOrder(Furniture.FAN, 3);
        assertEquals(6000, order.getFurnitureTypeCost(Furniture.FAN));
    }

    @Test
    void testEmptyOrderCost() {
        assertEquals(0, order.getTotalOrderCost());
    }
}`}}]}]}],questionCount:8},"./synechron/synechron.js":{id:`synechron`,name:`Synechron`,interviews:[{name:`Synechron`,questionCount:11,rounds:[{name:`Technical Interview`,questions:[{question:`Can you give a brief introduction about yourself, focusing on your recent projects and the technologies you've worked with?`,answer:`I am a Java developer with extensive experience in building web applications using Spring Boot and Hibernate. Recently, I worked on a student management system where I implemented a REST API using Spring Boot. The project involved creating and managing student records with features such as validation and exception handling. I used JPA for database interactions and integrated global exception handling to manage validation errors efficiently. This project helped me refine my skills in building robust and scalable applications.`,code:null},{question:`What are the key features introduced in Java 8?`,answer:`Lambda Expressions for concise anonymous functions, Functional Interfaces with single abstract method, Streams API for functional-style operations on collections, Optional Class to avoid null values, Default Methods in interfaces, and new Date and Time API.`,code:null},{question:`Write a Java method to withdraw an amount from an account. If amount is available, withdraw; otherwise, throw custom exception InsufficientBalanceException and handle it.`,answer:`Create BankAccount class with withdraw method that checks balance. If insufficient, throw custom exception.`,code:{language:`java`,content:`public class BankAccount {
    private double balance;
    public BankAccount(double balance) { this.balance = balance; }
    public void withdraw(double amount) throws InsufficientBalanceException {
        if (amount > balance) {
            throw new InsufficientBalanceException("Insufficient balance.");
        } else {
            balance -= amount;
            System.out.println("Withdrawal successful. Remaining balance: " + balance);
        }
    }
    public double getBalance() { return balance; }
}
class InsufficientBalanceException extends Exception {
    public InsufficientBalanceException(String message) { super(message); }
}`}},{question:`Write a JUnit test case for the withdraw method.`,answer:`Use JUnit 5 with @Test annotation. Test success and failure scenarios.`,code:{language:`java`,content:`import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.Test;
public class BankAccountTest {
    @Test
    public void testWithdrawSuccess() throws InsufficientBalanceException {
        BankAccount account = new BankAccount(1000.0);
        account.withdraw(500.0);
        assertEquals(500.0, account.getBalance());
    }
    @Test
    public void testWithdrawFailure() {
        BankAccount account = new BankAccount(300.0);
        assertThrows(InsufficientBalanceException.class, () -> account.withdraw(500.0));
    }
}`}},{question:`Using Java 8 Streams, how would you find the frequency of each character in a string?`,answer:`Use chars() to convert string to IntStream, mapToObj to Character, group by with counting.`,code:{language:`java`,content:`import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;
public class CharacterFrequency {
    public static void main(String[] args) {
        String str = "Java 8 Streams";
        Map<Character, Long> frequencyMap = str.chars()
            .mapToObj(c -> (char) c)
            .collect(Collectors.groupingBy(Function.identity(), Collectors.counting()));
        System.out.println(frequencyMap);
    }
}`}},{question:`Have you completed any certifications? If so, which ones, and how have they helped you in your career?`,answer:`I have completed certifications in Java SE 8 Programmer and Spring Professional. These certifications enhanced my understanding of core Java concepts and the Spring framework, which has been instrumental in my ability to build scalable and maintainable applications.`,code:null},{question:`Which framework are you using to write test cases in your projects?`,answer:`I use JUnit 5 for writing test cases, along with Mockito for mocking dependencies. JUnit 5 offers advanced features and better flexibility, and Mockito helps in isolating the units of code during testing.`,code:null},{question:`Can you explain the architecture and data flow of Spring MVC?`,answer:`Model: Represents data and business logic. View: Presentation layer. Controller: Handles incoming requests. DispatcherServlet: Central servlet routing requests. Flow: User request -> DispatcherServlet -> Controller -> Model -> View -> Response.`,code:null},{question:`How does JWT token-based authentication work?`,answer:`User Authentication -> Token Generation (JWT with user info and signature) -> Token Storage (client stores token) -> Token Usage (sent in Authorization header) -> Token Validation (server verifies signature and expiration).`,code:null},{question:`Why is REST API considered stateless?`,answer:`REST APIs are stateless because each request must contain all necessary information for the server to fulfill it. The server does not store any session state between requests, allowing for scalability and simplicity.`,code:null},{question:`Create a Spring Boot project using Spring Initializer. Implement two APIs (GET and POST) and handle exceptions in the project.`,answer:`Create Spring Boot project with Spring Web, Spring Data JPA, H2 Database. Implement Entity (Student), Repository, Service, Controller with GET and POST endpoints. Add GlobalExceptionHandler for validation errors.`,code:{language:`java`,content:`@RestController
@RequestMapping("/api/students")
public class StudentController {
    @GetMapping
    public ResponseEntity<List<Student>> getAllStudents() {
        return new ResponseEntity<>(studentService.getAllStudents(), HttpStatus.OK);
    }
    @PostMapping
    public ResponseEntity<Student> createStudent(@Valid @RequestBody Student student) {
        return new ResponseEntity<>(studentService.saveStudent(student), HttpStatus.CREATED);
    }
}

@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidationException(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new LinkedHashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(error -> {
            errors.put(error.getField(), error.getDefaultMessage());
        });
        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }
}`}}]}]}],questionCount:11},"./tcs/tcs.js":{id:`tcs`,name:`TCS`,interviews:[{name:`TCS`,questionCount:20,rounds:[{name:`Technical Interview`,questions:[{question:`Can you briefly introduce yourself?`,answer:`I am [Your Name] with 3 years of experience as a Java Full Stack Developer. I specialize in Spring Boot, React, and Microservices. I have worked on banking applications, customer registration systems, and real-time transaction processing. I am passionate about building scalable applications and learning new technologies.`,code:null},{question:`Can you give a brief explanation about your projects?`,answer:`I worked on a banking application with microservices architecture. The project handled customer registration, transaction processing, and account management. Used Spring Boot, React, Kafka, and MySQL. My role included API development, database design, and frontend integration.`,code:null},{question:`What are the common error status codes?`,answer:`400 Bad Request: Invalid syntax. 401 Unauthorized: Authentication required. 403 Forbidden: No access rights. 404 Not Found: Resource not found. 500 Internal Server Error: Server error.`,code:null},{question:`What are the new features in Java 8?`,answer:`Lambda Expressions, Functional Interfaces, Stream API, Optional class, new Date and Time API, Default Methods in interfaces.`,code:null},{question:`What is the String pool in Java?`,answer:`The String pool is a special storage area in the Java heap where String literals are stored. It helps in saving memory and improving performance by reusing instances of String literals.`,code:{language:`java`,content:`String s1 = "Hello";
String s2 = "Hello"; // s1 and s2 point to same object in pool`}},{question:`What is a marker interface and what are some inbuilt marker interfaces in Java?`,answer:`A marker interface is an interface with no methods or fields, used to signal special behavior to JVM or compiler. Examples: Serializable, Cloneable, Remote.`,code:{language:`java`,content:`public interface Serializable { } // Marker interface`}},{question:`What is an HTTP POST method?`,answer:`The HTTP POST method is used to send data to the server to create a resource. The data is stored in the request body of the HTTP request.`,code:null},{question:`What is the difference between POST and GET methods?`,answer:`GET: Requests data from a resource, data sent in URL. POST: Submits data to be processed, data sent in request body.`,code:null},{question:`Can you use a try block without a catch block?`,answer:`Yes, a try block can be used without a catch block if it is followed by a finally block. The finally block executes regardless of whether an exception occurs or not.`,code:{language:`java`,content:`try {
    // code
} finally {
    // cleanup
}`}},{question:`How do you use try with multiple catch blocks?`,answer:`Use multiple catch blocks for different exception types. Specific exceptions should be caught before general exceptions.`,code:{language:`java`,content:`try {
    // code that may throw exceptions
} catch (IOException e) {
    // handle IOException
} catch (SQLException e) {
    // handle SQLException
} finally {
    // cleanup code
}`}},{question:`What is try with resources?`,answer:`Try with resources is a feature that allows you to declare resources to be closed automatically after the try block. Used for managing resources like streams, files.`,code:{language:`java`,content:`try (BufferedReader br = new BufferedReader(new FileReader("file.txt"))) {
    // use br
} catch (IOException e) {
    // handle IOException
}`}},{question:`How do you connect multiple databases in Spring Boot?`,answer:`Configure multiple DataSource beans using @Primary for default. Configure multiple EntityManagerFactory and TransactionManager beans for different data sources.`,code:{language:`java`,content:`@Configuration
public class DataSourceConfig {
    @Bean @Primary
    @ConfigurationProperties("spring.datasource1")
    public DataSource dataSource1() { return DataSourceBuilder.create().build(); }
    @Bean
    @ConfigurationProperties("spring.datasource2")
    public DataSource dataSource2() { return DataSourceBuilder.create().build(); }
}`}},{question:`What is the difference between 400 and 403 status codes?`,answer:`400 Bad Request: Server cannot process request due to client error (malformed syntax). 403 Forbidden: Request is valid but server is refusing action - client does not have necessary permissions.`,code:null},{question:`How do you create a singleton class in Java?`,answer:`Create private constructor, private static instance, and public static getInstance method.`,code:{language:`java`,content:`public class Singleton {
    private static Singleton instance;
    private Singleton() { }
    public static Singleton getInstance() {
        if (instance == null) {
            instance = new Singleton();
        }
        return instance;
    }
}`}}]},{name:`HR Round`,questions:[{question:`Tell me about yourself.`,answer:`I am [Your Name] with 3 years of experience as a Java Full Stack Developer. I specialize in Spring Boot, React, and Microservices. I have worked on banking applications and customer registration systems. I am passionate about building scalable applications and learning new technologies.`,code:null},{question:`Why do you want to join TCS?`,answer:`TCS is a global leader in IT services. I'm excited about the opportunity to work on large-scale projects, learn from industry experts, and contribute to the company's growth.`,code:null},{question:`What are your salary expectations?`,answer:`Based on my experience and market standards, I am looking for a competitive package. I'm flexible and happy to discuss further based on the role.`,code:null},{question:`Where do you see yourself in 5 years?`,answer:`I see myself as a technical lead, contributing to architecture decisions, mentoring junior developers, and driving technical excellence.`,code:null},{question:`What are your strengths and weaknesses?`,answer:`Strengths: Quick learner, problem-solving skills, strong technical foundation, good team player. Weakness: Sometimes focus too much on perfection, working on delegating tasks better.`,code:null},{question:`Why are you looking for a job change?`,answer:`Looking for better growth opportunities, challenging projects, and a chance to work with new technologies. TCS offers the perfect environment for professional growth.`,code:null}]}]}],questionCount:20},"./tech-mahindra/techmahindra.js":{id:`tech-mahindra`,name:`Tech Mahindra`,interviews:[{name:`TechMahindra`,questionCount:35,rounds:[{name:`Technical Interview`,questions:[{question:`What are the new features in Java 8?`,answer:`Lambda Expressions, Stream API, Optional Class, Default Methods in Interfaces, Method References, New Date and Time API (java.time), Nashorn JavaScript Engine.`,code:null},{question:`What is batch processing in Java?`,answer:`Batch processing refers to executing a series of jobs without manual intervention. It can be implemented using frameworks like Spring Batch, which provides reusable functions that process large volumes of data.`,code:null},{question:`What is job scheduling in Java?`,answer:`Job scheduling involves setting up tasks to run at specified times or intervals. Java provides APIs like java.util.Timer and java.util.concurrent.ScheduledExecutorService. Libraries like Quartz Scheduler offer more advanced features.`,code:{language:`java`,content:`ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);
scheduler.scheduleAtFixedRate(() -> System.out.println("Task"), 0, 1, TimeUnit.SECONDS);`}},{question:`What are the inbuilt Java functional interfaces?`,answer:`Predicate<T>, Function<T,R>, Supplier<T>, Consumer<T>, BiFunction<T,U,R>.`,code:{language:`java`,content:`Predicate<Integer> isEven = n -> n % 2 == 0;
Function<String, Integer> length = String::length;
Supplier<Double> random = Math::random;
Consumer<String> print = System.out::println;`}},{question:`What is the difference between an interface and a functional interface?`,answer:`An interface can have any number of abstract methods. A functional interface has exactly one abstract method and can have any number of default or static methods. It is used as the assignment target for lambda expressions.`,code:{language:`java`,content:`@FunctionalInterface
interface Calculator { int add(int a, int b); }`}},{question:`Explain the Singleton design pattern.`,answer:`The Singleton design pattern ensures that a class has only one instance and provides a global point of access to it. It is implemented by making the constructor private and providing a static method that returns the instance.`,code:{language:`java`,content:`public class Singleton {
    private static Singleton instance;
    private Singleton() { }
    public static Singleton getInstance() {
        if (instance == null) {
            instance = new Singleton();
        }
        return instance;
    }
}`}},{question:`How can you break the Singleton design pattern?`,answer:`Using reflection to call the private constructor, using serialization and deserialization, using cloning.`,code:null},{question:`What is a default method in Java and what is its use?`,answer:`A default method in an interface provides a default implementation that can be overridden by implementing classes. It allows interfaces to evolve without breaking existing implementations.`,code:{language:`java`,content:`interface Vehicle { default void start() { System.out.println("Starting"); } }`}},{question:`How do you handle errors in Java?`,answer:`Using try-catch blocks to catch and handle exceptions, using throws keyword to declare exceptions, using custom exception classes for specific error handling.`,code:{language:`java`,content:`try { riskyOperation(); } catch (Exception e) { e.printStackTrace(); }`}},{question:`How many types of exceptions are there in Java?`,answer:`Checked exceptions (subclasses of Exception except RuntimeException), Unchecked exceptions (subclasses of RuntimeException), Errors (subclasses of Error).`,code:null},{question:`Explain checked and unchecked exceptions.`,answer:`Checked exceptions must be declared in a method's throws clause if they can be thrown. Unchecked exceptions do not need to be declared in a throws clause.`,code:{language:`java`,content:`// Checked - must handle
public void readFile() throws IOException { }
// Unchecked - optional
public void divide() throws ArithmeticException { }`}},{question:`What is the difference between shallow copy and deep copy?`,answer:`Shallow copy copies the object's fields as they are - only reference is copied for objects. Deep copy creates a new instance of each object, recursively copying all nested objects.`,code:{language:`java`,content:`// Shallow
Employee emp2 = emp1; // Same reference
// Deep
Employee emp2 = new Employee(emp1.getName()); // New object`}},{question:`If you throw an IOException inside a try block, can you handle it in a catch block with a runtime exception?`,answer:`No, it will not work. IOException is a checked exception and must be caught or declared. A catch block for runtime exception (unchecked) will not handle it.`,code:null},{question:`What is serialization and deserialization?`,answer:`Serialization is converting an object into a byte stream for storage or transmission. Deserialization is converting a byte stream back into an object.`,code:{language:`java`,content:`// Serialization
ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream("file.ser"));
oos.writeObject(obj);
// Deserialization
ObjectInputStream ois = new ObjectInputStream(new FileInputStream("file.ser"));
Object obj = ois.readObject();`}},{question:`Implement a generic double linked list with a method to remove an element based on the index in Java.`,answer:`Create DoublyLinkedList class with Node inner class. Implement remove(int index) method traversing to index and updating prev/next pointers.`,code:{language:`java`,content:`public class DoublyLinkedList<T> {
    class Node { T data; Node prev, next; Node(T data) { this.data = data; } }
    private Node head, tail;
    public void remove(int index) {
        if (index < 0) return;
        Node current = head;
        for (int i = 0; i < index && current != null; i++) {
            current = current.next;
        }
        if (current == null) return;
        if (current.prev != null) {
            current.prev.next = current.next;
        } else {
            head = current.next;
        }
        if (current.next != null) {
            current.next.prev = current.prev;
        } else {
            tail = current.prev;
        }
    }
}`}},{question:`Given two arrays, combine them into a single sorted array.`,answer:`Use merge logic similar to merge sort - compare elements and add smaller one.`,code:{language:`java`,content:`int[] solution(int[] list1, int[] list2) {
    int i = 0, j = 0, a = list1.length - 1, b = list2.length - 1;
    int[] ans = new int[a + 1 + b + 1];
    int k = 0;
    while (i <= a || j <= b) {
        if (i <= a && j <= b) {
            if (list1[i] <= list2[j]) {
                ans[k++] = list1[i++];
            } else {
                ans[k++] = list2[j++];
            }
        } else if (i <= a) {
            ans[k++] = list1[i++];
        } else if (j <= b) {
            ans[k++] = list2[j++];
        }
    }
    return ans;
}`}},{question:`Ladder array code in Java.`,answer:`Create 2D array where row i has i+1 elements with values 1 to i+1.`,code:{language:`java`,content:`public void printLadderArray(int n) {
    int[][] ladder = new int[n][];
    for (int i = 0; i < n; i++) {
        ladder[i] = new int[i + 1];
        for (int j = 0; j < i + 1; j++) {
            ladder[i][j] = j + 1;
        }
    }
    for (int[] row : ladder) {
        System.out.println(Arrays.toString(row));
    }
}`}},{question:`What are profiles in Spring Boot?`,answer:`Profiles in Spring Boot are a way to segregate parts of your application configuration and make it only available in certain environments. Activate using --spring.profiles.active command-line argument.`,code:{language:`properties`,content:`spring.profiles.active=dev
# application-dev.properties
server.port=8081`}},{question:`How do you provide security in Spring Boot?`,answer:`By using Spring Security, which provides authentication and authorization. Common methods include in-memory authentication, JDBC authentication, and LDAP authentication.`,code:{language:`java`,content:`@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests().anyRequest().authenticated();
    }
}`}},{question:`Explain the process of JWT token-based authentication.`,answer:`Client sends login credentials -> Server validates and generates JWT token -> Client stores token and includes in Authorization header -> Server validates token and processes request.`,code:null},{question:`What classes do you use in JWT token security?`,answer:`JwtTokenProvider for token generation and validation, JwtAuthenticationFilter to filter and validate requests, JwtAuthenticationEntryPoint for handling authentication errors.`,code:null},{question:`Why do you need the UserDetails class in Spring Security?`,answer:`The UserDetails class represents core user information. It provides necessary information like username, password, and authorities for authentication and authorization.`,code:{language:`java`,content:`public class MyUserDetails implements UserDetails {
    private String username;
    private String password;
    private List<GrantedAuthority> authorities;
}`}},{question:`How do you handle exceptions in Spring Boot?`,answer:`Using @ControllerAdvice and @ExceptionHandler to handle exceptions globally. Customizing error response with ResponseEntity.`,code:{language:`java`,content:`@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleException(Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
    }
}`}},{question:`What is fault tolerance in microservices?`,answer:`Fault tolerance is the ability of a system to continue operating properly in the event of component failure. Achieved using patterns like circuit breaker, retry mechanisms, and fallback methods.`,code:null},{question:`What is logging and distributed tracing in microservices?`,answer:`Logging records information about system operation. Distributed tracing tracks and analyzes requests as they propagate through distributed system. Tools: ELK stack, Zipkin, Jaeger.`,code:null},{question:`How do you communicate between one microservice and another microservice?`,answer:`Using REST APIs over HTTP, messaging queues like RabbitMQ or Kafka, using gRPC for efficient communication.`,code:null},{question:`How do you limit requests in microservices?`,answer:`Using rate limiting techniques (token bucket algorithm, leaky bucket algorithm). Implementing API gateway tools like Netflix Zuul or Spring Cloud Gateway.`,code:null},{question:`What is a Kafka server?`,answer:`Kafka is a distributed event streaming platform capable of handling high throughput and low-latency data streams. Used for building real-time data pipelines and streaming applications.`,code:null},{question:`Explain Jenkins and its use in microservices.`,answer:`Jenkins is a CI/CD tool that automates building, testing, and deploying applications. In microservices, Jenkins manages pipelines for each microservice, ensuring smooth integration and deployment.`,code:null}]},{name:`HR Round`,questions:[{question:`Tell me about yourself.`,answer:`I am [Your Name] with 3 years of experience as a Java Full Stack Developer. I specialize in Spring Boot, React, and Microservices. I have worked on banking applications and customer registration systems. I am passionate about building scalable applications and learning new technologies.`,code:null},{question:`Why do you want to join Tech Mahindra?`,answer:`Tech Mahindra is a global leader in IT services. I'm excited about the opportunity to work on innovative projects, learn from industry experts, and contribute to the company's growth.`,code:null},{question:`What are your salary expectations?`,answer:`Based on my experience and market standards, I am looking for a competitive package. I'm flexible and happy to discuss further based on the role.`,code:null},{question:`Where do you see yourself in 5 years?`,answer:`I see myself as a technical lead, contributing to architecture decisions, mentoring junior developers, and driving technical excellence.`,code:null},{question:`What are your strengths and weaknesses?`,answer:`Strengths: Quick learner, problem-solving skills, strong technical foundation, good team player. Weakness: Sometimes focus too much on perfection, working on delegating tasks better.`,code:null},{question:`Why are you looking for a job change?`,answer:`Looking for better growth opportunities, challenging projects, and a chance to work with new technologies. Tech Mahindra offers the perfect environment for professional growth.`,code:null}]}]}],questionCount:35},"./zensar/zensar.js":{id:`zensar`,name:`Zensar`,interviews:[{name:`Zensar Technical Interview`,questionCount:23,rounds:[{name:`Technical Interview`,questions:[{question:`Self Introduction (Project-Oriented)`,answer:`I have around 4.5 years of experience as a Java Full Stack Developer. Currently working on a customer onboarding and transaction processing system. Responsibilities include: Developing REST & Reactive APIs using Spring Boot & WebFlux, Handling high-volume traffic using non-blocking architecture, Integrating Kafka for async communication, Writing unit tests using JUnit & Mockito, and Frontend development using ReactJS. Achievements: Improved API performance using reactive programming, Implemented JWT-based authentication, Optimized microservices communication.`,code:null},{question:`What is Reactive Programming? Explain Mono vs Flux.`,answer:`Reactive Programming is an asynchronous, non-blocking approach. Mono represents 0 or 1 element. Flux represents 0 to N elements. Used for handling high-concurrency applications with better resource utilization.`,code:null},{question:`Where do we use Mono?`,answer:`Used when we expect a single result. Examples: Get user by ID, Login response, Payment status, Fetching bank account balance.`,code:{language:`java`,content:`public Mono<Double> getBalance(String accountId) {
    return webClient.get()
        .uri("/balance/" + accountId)
        .retrieve()
        .bodyToMono(Double.class);
}`}},{question:`How to call APIs using WebClient?`,answer:`WebClient is Spring WebFlux's non-blocking HTTP client. Used to call external APIs asynchronously without blocking threads.`,code:{language:`java`,content:`@Service
public class UserService {
    private final WebClient webClient;
    public UserService(WebClient.Builder builder) {
        this.webClient = builder.baseUrl("http://localhost:8081").build();
    }
    public Mono<String> getUser() {
        return webClient.get()
            .uri("/user")
            .retrieve()
            .bodyToMono(String.class)
            .onErrorReturn("Fallback User");
    }
}`}},{question:`How do you secure APIs?`,answer:`Using Spring Security, JWT Authentication, Role-based authorization, HTTPS, Input validation, and CORS configuration.`,code:null},{question:`Explain JWT Authentication Workflow.`,answer:`1) User sends login credentials, 2) Server validates credentials, 3) JWT token generated, 4) Token sent to client, 5) Client sends token in header, 6) Server validates token using JWT Filter.`,code:null},{question:`What are HTTP Status Codes?`,answer:`200 OK, 201 Created, 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 500 Internal Server Error.`,code:null},{question:`Difference between 501 and 502?`,answer:`501 Not Implemented - Server doesn't support functionality. 502 Bad Gateway - Invalid response from upstream server.`,code:null},{question:`What is CORS?`,answer:`CORS (Cross-Origin Resource Sharing) allows cross-origin requests. Origin = protocol + host + port.`,code:{language:`java`,content:`@Configuration
public class CorsConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return registry -> registry.addMapping("/**")
            .allowedOrigins("*")
            .allowedMethods("*");
    }
}`}},{question:`What are Java 17 Features?`,answer:`Records, Sealed Classes, Pattern Matching, Text Blocks, Enhanced Switch, Better Garbage Collectors, Improved Security.`,code:null},{question:`Explain Java 8 Supplier and Consumer.`,answer:`Supplier provides values, Consumer consumes values.`,code:{language:`java`,content:`Supplier<String> supplier = () -> "Hello";
Consumer<String> consumer = x -> System.out.println(x);
consumer.accept(supplier.get());`}},{question:`What is Method Reference?`,answer:`Short form of lambda expression. Used for better readability and cleaner code.`,code:{language:`java`,content:`list.forEach(System.out::println);`}},{question:`Explain CompletableFuture with example.`,answer:`CompletableFuture is Java 8 feature for asynchronous programming. Supports chaining, combining multiple async computations, and exception handling.`,code:{language:`java`,content:`CompletableFuture.supplyAsync(() -> "Hello")
    .thenApply(String::toUpperCase)
    .thenAccept(System.out::println);`}},{question:`What is Executor Framework?`,answer:`Used for background jobs, async processing, email sending, and thread pool management.`,code:null},{question:`Explain Callable and Future.`,answer:`Callable returns a value. Future holds the result of asynchronous computation.`,code:{language:`java`,content:`ExecutorService executor = Executors.newFixedThreadPool(1);
Future<Integer> future = executor.submit(() -> 10 + 20);
System.out.println(future.get());`}},{question:`Difference between parallelStream and flatMap?`,answer:`parallelStream enables multi-threading. flatMap flattens nested collections.`,code:null},{question:`How to flatten List of List of List using streams?`,answer:`Using multiple flatMap operations.`,code:{language:`java`,content:`List<Integer> result = list.stream()
    .flatMap(List::stream)
    .flatMap(List::stream)
    .toList();`}},{question:`Explain flatMap with example.`,answer:`flatMap transforms each element into a stream and flattens.`,code:{language:`java`,content:`List<List<Integer>> list = List.of(
    List.of(1,2),
    List.of(3,4)
);
List<Integer> result = list.stream()
    .flatMap(Collection::stream)
    .toList();`}},{question:`Difference between HashSet and TreeSet?`,answer:`HashSet: O(1) operations, unordered. TreeSet: O(log n) operations, sorted.`,code:null},{question:`What is Composition vs Aggregation?`,answer:`Composition - strong relationship (Car-Engine). Aggregation - weak relationship (School-Student).`,code:null},{question:`What are your strengths and weaknesses?`,answer:`Strengths: Problem solving, Quick learner. Weakness: Sometimes focus too much on perfection.`,code:null},{question:`Why are you looking for a job change?`,answer:`Looking for better growth, learning opportunities, and challenging work.`,code:null},{question:`Explain Builder vs Strategy Pattern.`,answer:`Builder Pattern: Creates complex objects step by step. Strategy Pattern: Defines family of algorithms, encapsulates each one, and makes them interchangeable.`,code:{language:`java`,content:`// Builder Pattern
User user = User.builder()
    .name("Venkatesh")
    .age(25)
    .build();

// Strategy Pattern
interface PaymentStrategy { void pay(); }
class UpiPayment implements PaymentStrategy {
    public void pay() {
        System.out.println("Paid using UPI");
    }
}`}}]}]},{name:`American Express Interview`,questionCount:43,rounds:[{name:`Technical L1`,questions:[{question:`Self Introduction with Real-Time Project`,answer:`Hi, I'm Venkatesh, and I have around 5+ years of experience as a Java Backend Developer specializing in Java 8/17, Spring Boot, Spring WebFlux, Microservices, Kafka, REST APIs, Cassandra, PostgreSQL, Docker, Kubernetes, and CI/CD. Currently, I'm working on the American Express MARS Platform, which is a Microservices-based financial application responsible for managing customer accounts, payments, refunds, and financial obligations. Responsibilities: Develop REST APIs, Build Reactive APIs using Mono/Flux, Integrate downstream services using WebClient, Publish/consume Kafka events, Write Unit Tests, Resolve Production Issues, Optimize API performance, Deploy through Jenkins/Kubernetes.`,code:null},{question:`Difference between Java 8 and Java 17?`,answer:`Java 8 features: Lambda, Stream API, Optional, Date/Time API, Default methods. Java 17 features: Records, Sealed Classes, Pattern Matching, Text Blocks, Switch Expressions, Better G1, ZGC, Shenandoah Garbage Collectors, Improved Security.`,code:null},{question:`Difference between flatMap() and concatMap()?`,answer:`flatMap executes asynchronously in parallel, order NOT guaranteed. concatMap executes sequentially, order guaranteed. Use flatMap for independent operations, concatMap when order matters.`,code:{language:`java`,content:`// flatMap - parallel, unordered
Flux.just(1,2,3).flatMap(i -> callAPI(i)).subscribe();
// concatMap - sequential, ordered
Flux.just(1,2,3).concatMap(i -> callAPI(i)).subscribe();`}},{question:`Explain Optional Class.`,answer:`Optional introduced in Java 8 to avoid NullPointerException. Methods: of(), ofNullable(), empty(), isPresent(), ifPresent(), orElse(), orElseGet(), orElseThrow().`,code:{language:`java`,content:`Optional<User> user = repository.findById(id);
String name = user.map(User::getName).orElse("Guest");`}},{question:`What is Lambda Expression?`,answer:`Lambda Expression is a shorter way of implementing Functional Interfaces. Syntax: (parameters) -> expression. Used with Stream API, Comparator, Sorting, Filtering.`,code:{language:`java`,content:`Runnable r = () -> System.out.println("Hello");
employees.stream().filter(emp -> emp.getSalary()>50000).forEach(System.out::println);`}},{question:`What is Functional Interface?`,answer:`Functional Interface contains exactly one abstract method. Can have multiple default and static methods. Built-in: Predicate, Consumer, Supplier, Function, UnaryOperator, BinaryOperator.`,code:null},{question:`Difference between Spring MVC, Spring Boot, and Spring WebFlux?`,answer:`Spring MVC: Blocking, Servlet API, Thread per request, Better for CRUD. Spring Boot: Auto Configuration, Easy Development. Spring WebFlux: Non-Blocking, Event Loop, Fewer threads, High Concurrency.`,code:null},{question:`Explain @SpringBootApplication.`,answer:`@SpringBootApplication is combination of @Configuration, @EnableAutoConfiguration, @ComponentScan. Used as entry point for Spring Boot application.`,code:{language:`java`,content:`@SpringBootApplication
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}`}},{question:`How do you handle errors in Microservices?`,answer:`Using Global Exception Handler, Standard Error Response, Proper HTTP Status Codes, Logging, Correlation ID, Retry, Circuit Breaker, Fallback. Never expose Java exceptions directly.`,code:{language:`java`,content:`@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handle(Exception ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body(ex.getMessage());
    }
}`}},{question:`What is Spring WebFlux?`,answer:`Spring WebFlux is Spring's Reactive Web Framework introduced in Spring 5. Supports non-blocking, asynchronous, event-driven programming using Project Reactor (Mono, Flux). Uses Event Loop Model with fewer threads.`,code:{language:`java`,content:`@GetMapping("/{id}")
public Mono<User> getUser(@PathVariable int id) {
    return service.getUser(id);
}`}},{question:`Difference between Flux and Mono?`,answer:`Mono emits 0 or 1 value. Flux emits 0 to N values. Mono for single result, Flux for multiple results.`,code:{language:`java`,content:`// Mono - single result
Mono<User> user = userService.getUser(id);
// Flux - multiple results
Flux<User> users = userService.getUsers();`}},{question:`What is Spring WebClient? If WebClient is not available, how will you call another Microservice?`,answer:`WebClient is Spring WebFlux's non-blocking HTTP client. If not available, use RestTemplate, OpenFeign Client, HttpClient, or OkHttp.`,code:{language:`java`,content:`WebClient webClient = WebClient.create();
Mono<User> response = webClient.get()
    .uri("http://user-service/users/1")
    .retrieve()
    .bodyToMono(User.class);`}},{question:`How do you handle 10 Million Records in an API?`,answer:`Use Pagination, Database Index, Filtering, Streaming Response (Flux), Compression (GZIP), Caching (Redis/Caffeine), Async Processing for large reports.`,code:null},{question:`What is the Request and Response Time of APIs in your project?`,answer:`Simple CRUD: 100-200ms, Database Query: 200-500ms, External API Call: 500ms-2sec, Multiple Services: 1-3 sec. Improved from 2.8 seconds to 800ms using WebClient parallel calls, indexing, caching.`,code:null},{question:`Have you worked on Unit Testing? Which Framework?`,answer:`Yes. JUnit 5, Mockito, Spring Boot Test. Used for improving code quality, preventing bugs, supporting CI/CD.`,code:{language:`java`,content:`@Mock UserRepository repository;
@InjectMocks UserService service;
@Test
void testGetUser() {
    when(repository.findById(1L)).thenReturn(Optional.of(new User()));
    User user = service.getUser(1L);
    assertNotNull(user);
}`}},{question:`Which databases have you worked with?`,answer:`Cassandra (distributed systems), PostgreSQL (transactional data), MySQL (CRUD applications), Oracle (legacy systems). Customer Profile in PostgreSQL, Transaction Events in Cassandra.`,code:null},{question:`How do you implement Idempotency in Microservices?`,answer:`Generate Idempotency-Key (UUID). Store in database. If duplicate request arrives, return previous response. Prevents duplicate processing of same request.`,code:null},{question:`What is Event-Driven System?`,answer:`Services communicate through events instead of direct API calls. Example: Order Created event triggers Inventory, Notification, Payment services. Advantages: Loose Coupling, High Scalability, Better Reliability.`,code:null},{question:`Database contains millions of events. Fetch the latest 5 events.`,answer:`SELECT * FROM event_table ORDER BY created_date DESC LIMIT 5; Create index on created_date for optimization.`,code:{language:`java`,content:`SELECT * FROM event_table ORDER BY created_date DESC LIMIT 5;
CREATE INDEX idx_created_date ON event_table(created_date);`}},{question:`How is Message Ordering maintained in Kafka?`,answer:`Kafka guarantees ordering only within a single partition. Ordering maintained using offset. Each message gets a unique offset. For ordering, all events should go to same partition using partition key (e.g., CustomerId).`,code:null},{question:`If there are 3 Consumers, can they read partition messages in parallel without duplicates?`,answer:`Yes, Kafka allows multiple consumers in same Consumer Group to read partitions in parallel. One partition assigned to only one consumer per group. Duplicates may occur when consumer crashes before committing offset or producer retries. Avoid duplicates using Idempotent Producer, unique Transaction IDs, commit offsets after processing, store processed event IDs.`,code:null},{question:`Explain your Project Deployment Process.`,answer:`CI/CD Pipeline: Git Push -> Pull Request Review -> Merge -> Jenkins Pipeline -> Maven Build -> Unit Tests -> SonarQube Code Scan -> Docker Image Build -> Push Image -> Kubernetes Deployment -> Smoke Testing -> Production.`,code:null},{question:`Which CI/CD Pipeline or Tool are you using?`,answer:`Git, Jenkins, Maven, SonarQube, Docker, Kubernetes, Nexus/Artifactory, Helm, ArgoCD. Pipeline: Git -> Jenkins -> Maven Build -> JUnit -> SonarQube -> Docker -> Push Image -> Kubernetes Deployment -> Health Check.`,code:null},{question:`How do you solve Production Issues in Real Time?`,answer:`Step 1: Understand issue. Step 2: Check logs. Step 3: Verify monitoring dashboards. Step 4: Identify Root Cause. Step 5: Implement fix. Step 6: Deploy hotfix through CI/CD. Step 7: Prepare RCA document.`,code:null},{question:`What is Reactive Programming, and why did you use it in your project?`,answer:`Reactive Programming is asynchronous, non-blocking programming model. Used for high concurrency, better scalability, non-blocking I/O, lower memory usage, better response time. Example: Customer Dashboard API called Customer, Account, Rewards, Transaction services in parallel using WebClient.`,code:null},{question:`Why did you choose Spring WebFlux instead of Spring MVC?`,answer:`Spring MVC uses blocking model (thread per request). WebFlux uses non-blocking Event Loop model with fewer threads, better for high concurrency. Our API aggregates multiple downstream services, WebFlux allows parallel calls reducing latency.`,code:null},{question:`How do you call multiple downstream APIs in parallel using WebClient?`,answer:`Using Mono.zip() to execute independent API calls concurrently. All APIs run in parallel, reducing total response time.`,code:{language:`java`,content:`Mono<Customer> customer = customerClient.getCustomer(id);
Mono<Account> account = accountClient.getAccount(id);
Mono<Reward> reward = rewardClient.getReward(id);
return Mono.zip(customer, account, reward)
    .map(tuple -> new CustomerResponse(
        tuple.getT1(),
        tuple.getT2(),
        tuple.getT3()
    ));`}},{question:`How do you handle exceptions, retries, and fallback in Spring WebFlux?`,answer:`Using Project Reactor operators: timeout(), retry(), onErrorResume().`,code:{language:`java`,content:`return webClient.get()
    .uri("/customers")
    .retrieve()
    .bodyToMono(Customer.class)
    .timeout(Duration.ofSeconds(2))
    .retry(3)
    .onErrorResume(ex -> Mono.just(new Customer("Default Customer")));`}},{question:`What is Backpressure in Reactive Programming, and how does Project Reactor handle it?`,answer:`Backpressure prevents fast producer from overwhelming slow consumer. Consumer requests data at rate it can process. Project Reactor implements Reactive Streams Specification allowing subscribers to control how many items they receive.`,code:null},{question:`Self Introduction with your Real-Time Project`,answer:`Hi, I'm Venkatesh, and I have around 5+ years of experience as a Java Backend Developer specializing in Java 8/17, Spring Boot, Spring WebFlux, Microservices, Kafka, REST APIs, Cassandra, PostgreSQL, Docker, Kubernetes, and CI/CD. Currently working on the American Express MARS Platform managing customer accounts, payments, refunds, and financial obligations.`,code:null},{question:`How do you write Unit Test cases for Reactive Programming methods that return Mono and Flux?`,answer:`Reactive APIs are tested using JUnit 5, Mockito, and Reactor Test (StepVerifier). StepVerifier is provided by reactor-test and is used to validate Mono and Flux.`,code:{language:`java`,content:`// Maven Dependency
<dependency>
    <groupId>io.projectreactor</groupId>
    <artifactId>reactor-test</artifactId>
    <scope>test</scope>
</dependency>

// Service
public Mono<String> getUser() {
    return Mono.just("Venkatesh");
}

// Unit Test
@Test
void testGetUser() {
    StepVerifier.create(service.getUser())
        .expectNext("Venkatesh")
        .verifyComplete();
}

// Flux Example
Flux<Integer> numbers = Flux.just(1,2,3);
@Test
void testFlux() {
    StepVerifier.create(numbers)
        .expectNext(1)
        .expectNext(2)
        .expectNext(3)
        .verifyComplete();
}`}},{question:`What are the biggest challenges you have faced while working with Microservices, and how did you overcome them?`,answer:`Challenge 1: High API response time. Our Customer Dashboard API was calling Customer Service, Account Service, Rewards Service, and Transaction Service sequentially. Total response time was around 3 seconds. Solution: Replaced sequential calls with Spring WebClient and Mono.zip() for parallel execution. Response time reduced from 3 seconds to around 900ms. Challenge 2: Duplicate Kafka events. Solution: Implemented Idempotency using unique Transaction ID to prevent duplicate processing.`,code:{language:`java`,content:`// Parallel API calls using WebClient
Mono.zip(customer, account, reward)
    .map(tuple -> new CustomerResponse(
        tuple.getT1(),
        tuple.getT2(),
        tuple.getT3()
    ));`}},{question:`How do you implement logging in your Spring Boot Microservices? Which logging framework do you use?`,answer:`Spring Boot uses SLF4J with Logback as default logging framework. We create a logger using Lombok @Slf4j or LoggerFactory. Logging levels: info, debug, warn, error. Best practices: Never log passwords, Log Correlation IDs, Log request/response time, Log exceptions with stack traces.`,code:{language:`java`,content:`@Slf4j
@Service
public class UserService {
    public void process() {
        log.info("User Created");
        log.debug("Customer Request {}", request);
        log.warn("Invalid Customer");
        log.error("Database Connection Failed", ex);
    }
}

// Without Lombok
private static final Logger log = LoggerFactory.getLogger(UserService.class);`}},{question:`Which monitoring and observability tools have you used in your project, and how do you monitor application health and performance?`,answer:`Tools: Zipkin, Spring Boot Actuator, Prometheus, Grafana, Kibana (ELK), Splunk. Monitor: API Response Time, CPU Usage, Memory Usage, Error Rate, Kafka Consumer Lag, Database Connections. Spring Boot Actuator endpoints: /actuator/health, /actuator/metrics, /actuator/prometheus. Grafana Dashboard shows Request Count, Response Time, JVM Memory, Active Threads.`,code:null},{question:`How do you debug production issues in a Reactive Spring WebFlux application?`,answer:`Step 1: Check application logs. Step 2: Verify response time in monitoring dashboards. Step 3: Check downstream services. Step 4: Check Kafka consumers. Step 5: Verify database queries. Step 6: Identify Root Cause. Step 7: Deploy fix. Real-Time Example: One API taking 5 seconds, found downstream API timing out. Added timeout(), retry(), and onErrorResume() to return fallback response.`,code:{language:`java`,content:`.timeout(Duration.ofSeconds(2))
.retry(3)
.onErrorResume(ex -> Mono.just(fallbackResponse))`}},{question:`How do you trace and debug a request across multiple Microservices using distributed tracing tools like Zipkin or Spring Cloud Sleuth?`,answer:`When a request travels across multiple Microservices, debugging becomes difficult. We use Spring Cloud Sleuth and Zipkin to trace the complete request. Sleuth automatically generates Trace ID and Span ID. Every Microservice logs the same Trace ID. Zipkin displays the entire request flow. Benefits: Easy debugging, Identify slow Microservices, Measure API latency, End-to-end request tracing.`,code:null}]},{name:`Technical L2`,questions:[{question:`Self Introduction with your Real-Time Project`,answer:`Hi, I'm Venkatesh, and I have around 5+ years of experience as a Java Backend Developer specializing in Java 8/17, Spring Boot, Spring WebFlux, Microservices, Kafka, REST APIs, Cassandra, PostgreSQL, Docker, Kubernetes, and CI/CD. Currently, I'm working on the American Express MARS Platform, which is a Microservices-based financial application responsible for managing customer accounts, payments, refunds, and financial obligations. Responsibilities: Develop REST APIs, Build Reactive APIs using Mono/Flux, Integrate downstream services using WebClient, Publish/consume Kafka events, Write Unit Tests, Resolve Production Issues, Optimize API performance, Deploy through Jenkins/Kubernetes.`,code:null},{question:`How do you write Unit Test cases for Reactive Programming methods that return Mono and Flux?`,answer:`Reactive APIs are tested using JUnit 5, Mockito, and Reactor Test (StepVerifier). StepVerifier is provided by reactor-test and is used to validate Mono and Flux.`,code:{language:`java`,content:`// Maven Dependency
<dependency>
    <groupId>io.projectreactor</groupId>
    <artifactId>reactor-test</artifactId>
    <scope>test</scope>
</dependency>

// Service
public Mono<String> getUser() {
    return Mono.just("Venkatesh");
}

// Unit Test
@Test
void testGetUser() {
    StepVerifier.create(service.getUser())
        .expectNext("Venkatesh")
        .verifyComplete();
}

// Flux Example
Flux<Integer> numbers = Flux.just(1,2,3);
@Test
void testFlux() {
    StepVerifier.create(numbers)
        .expectNext(1)
        .expectNext(2)
        .expectNext(3)
        .verifyComplete();
}`}},{question:`What are the biggest challenges you have faced while working with Microservices, and how did you overcome them?`,answer:`Challenge 1: High API response time. Our Customer Dashboard API was calling Customer Service, Account Service, Rewards Service, and Transaction Service sequentially. Total response time was around 3 seconds. Solution: Replaced sequential calls with Spring WebClient and Mono.zip() for parallel execution. Response time reduced from 3 seconds to around 900ms. Challenge 2: Duplicate Kafka events. Solution: Implemented Idempotency using unique Transaction ID to prevent duplicate processing.`,code:{language:`java`,content:`// Parallel API calls using WebClient
Mono.zip(customer, account, reward)
    .map(tuple -> new CustomerResponse(
        tuple.getT1(),
        tuple.getT2(),
        tuple.getT3()
    ));`}},{question:`How do you implement logging in your Spring Boot Microservices? Which logging framework do you use?`,answer:`Spring Boot uses SLF4J with Logback as default logging framework. We create a logger using Lombok @Slf4j or LoggerFactory. Logging levels: info, debug, warn, error. Best practices: Never log passwords, Log Correlation IDs, Log request/response time, Log exceptions with stack traces.`,code:{language:`java`,content:`@Slf4j
@Service
public class UserService {
    public void process() {
        log.info("User Created");
        log.debug("Customer Request {}", request);
        log.warn("Invalid Customer");
        log.error("Database Connection Failed", ex);
    }
}

// Without Lombok
private static final Logger log = LoggerFactory.getLogger(UserService.class);`}},{question:`Which monitoring and observability tools have you used in your project, and how do you monitor application health and performance?`,answer:`Tools: Zipkin, Spring Boot Actuator, Prometheus, Grafana, Kibana (ELK), Splunk. Monitor: API Response Time, CPU Usage, Memory Usage, Error Rate, Kafka Consumer Lag, Database Connections. Spring Boot Actuator endpoints: /actuator/health, /actuator/metrics, /actuator/prometheus. Grafana Dashboard shows Request Count, Response Time, JVM Memory, Active Threads.`,code:null},{question:`How do you debug production issues in a Reactive Spring WebFlux application?`,answer:`Step 1: Check application logs. Step 2: Verify response time in monitoring dashboards. Step 3: Check downstream services. Step 4: Check Kafka consumers. Step 5: Verify database queries. Step 6: Identify Root Cause. Step 7: Deploy fix. Real-Time Example: One API taking 5 seconds, found downstream API timing out. Added timeout(), retry(), and onErrorResume() to return fallback response.`,code:{language:`java`,content:`.timeout(Duration.ofSeconds(2))
.retry(3)
.onErrorResume(ex -> Mono.just(fallbackResponse))`}},{question:`How do you trace and debug a request across multiple Microservices using distributed tracing tools like Zipkin or Spring Cloud Sleuth?`,answer:`When a request travels across multiple Microservices, debugging becomes difficult. We use Spring Cloud Sleuth and Zipkin to trace the complete request. Sleuth automatically generates Trace ID and Span ID. Every Microservice logs the same Trace ID. Zipkin displays the entire request flow. Benefits: Easy debugging, Identify slow Microservices, Measure API latency, End-to-end request tracing.`,code:null}]}]}],questionCount:66},"./zoho-walk-in/zoho.js":{id:`zoho-walk-in`,name:`ZOHO (walk_in)`,interviews:[{name:`Zoho Walk-in Interview`,questionCount:14,rounds:[{name:`Coding Round 1: Factorial Sum`,questions:[{question:`Given a number, find the sum of the factorials of its digits without recalculating previously computed factorials.`,answer:`Input: 145
Output: 1! + 4! + 5! = 1 + 24 + 120 = 145

✅ Avoids recalculating factorial using a HashMap.`,code:{language:`java`,content:`import java.util.HashMap;
import java.util.Map;

public class FactorialSum {
    private static final Map<Integer, Integer> factorialCache = new HashMap<>();

    public static void main(String[] args) {
        int num = 145;
        System.out.println("Factorial Sum: " + factorialSum(num));
    }

    public static int factorialSum(int num) {
        int sum = 0;
        while (num > 0) {
            int digit = num % 10;
            sum += factorial(digit);
            num /= 10;
        }
        return sum;
    }

    private static int factorial(int n) {
        if (!factorialCache.containsKey(n)) {
            factorialCache.put(n, (n == 0 || n == 1) ? 1 : n * factorial(n - 1));
        }
        return factorialCache.get(n);
    }
}`}}]},{name:`Coding Round 2: Character Occurrence Sorting`,questions:[{question:`Given a string, count the occurrences of each character and sort by frequency in descending order.`,answer:`Input: "zoho"
Output: "o:2, z:1, h:1"

✅ Uses Java Streams for efficient sorting and counting.`,code:{language:`java`,content:`import java.util.*;
import java.util.stream.Collectors;

public class CharacterFrequencySort {
    public static void main(String[] args) {
        String input = "zoho";
        System.out.println(sortByFrequency(input));
    }

    public static String sortByFrequency(String s) {
        Map<Character, Long> frequencyMap = s.chars()
                .mapToObj(c -> (char) c)
                .collect(Collectors.groupingBy(c -> c, Collectors.counting()));

        return frequencyMap.entrySet().stream()
                .sorted((a, b) -> Long.compare(b.getValue(), a.getValue()))  // Sort by frequency descending
                .map(e -> e.getKey() + ":" + e.getValue())
                .collect(Collectors.joining(", "));
    }
}`}}]},{name:`Coding Round 3: Matrix Rotation Validation`,questions:[{question:`Check if a given matrix is a rotated version of itself.`,answer:`Valid Rotation:
[
  [1, 2, 3]
  [3, 1, 2]
  [2, 3, 1]
]

Invalid Rotation:
[
  [1, 2, 3]
  [3, 1, 2]
  [1, 2, 3]
]

✅ Checks each row's rotation efficiently.`,code:{language:`java`,content:`import java.util.Arrays;

public class MatrixRotation {
    public static void main(String[] args) {
        int[][] matrix1 = {
                {1, 2, 3},
                {3, 1, 2},
                {2, 3, 1}
        };

        int[][] matrix2 = {
                {1, 2, 3},
                {3, 1, 2},
                {1, 2, 3}
        };

        System.out.println(isRotatedMatrix(matrix1)); // true
        System.out.println(isRotatedMatrix(matrix2)); // false
    }

    public static boolean isRotatedMatrix(int[][] matrix) {
        int n = matrix.length;
        for (int i = 1; i < n; i++) {
            if (!Arrays.equals(matrix[i], rotateRight(matrix[i - 1]))) {
                return false;
            }
        }
        return Arrays.equals(matrix[0], rotateRight(matrix[n - 1]));
    }

    private static int[] rotateRight(int[] row) {
        int[] result = new int[row.length];
        for (int i = 0; i < row.length; i++) {
            result[(i + 1) % row.length] = row[i];
        }
        return result;
    }
}`}}]},{name:`Coding Round 4: Cipher Text Encryption`,questions:[{question:`Encrypt a given string by shifting characters forward based on a given number.`,answer:`Input: ("zoho", 2)
Output: "bqjq"

✅ Uses a character-by-character shift with a wrap-around alphabet.`,code:{language:`java`,content:`public class CipherText {
    public static void main(String[] args) {
        String input = "zoho";
        int shift = 2;
        System.out.println(encrypt(input, shift));
    }

    public static String encrypt(String text, int shift) {
        StringBuilder encrypted = new StringBuilder();

        for (char ch : text.toCharArray()) {
            if (Character.isLetter(ch)) {
                char base = Character.isUpperCase(ch) ? 'A' : 'a';
                encrypted.append((char) ((ch - base + shift) % 26 + base));
            } else {
                encrypted.append(ch);
            }
        }
        return encrypted.toString();
    }
}`}}]},{name:`Coding Round 5: Zig-Zag String Transformation`,questions:[{question:`Given a string and number of rows, convert it into a Zig-Zag pattern.`,answer:`Input: "PAYPALISHIRING", Rows = 3
Output: "PAHNAPLSIIGYIR"

✅ Uses an efficient approach with StringBuilder arrays.`,code:{language:`java`,content:`import java.util.Arrays;
import java.util.stream.Collectors;

public class ZigZagConversion {
    public static void main(String[] args) {
        String s = "PAYPALISHIRING";
        int numRows = 3;
        System.out.println(convertZigZag(s, numRows));
    }

    public static String convertZigZag(String s, int numRows) {
        if (numRows == 1) return s;

        StringBuilder[] rows = new StringBuilder[numRows];
        for (int i = 0; i < numRows; i++) {
            rows[i] = new StringBuilder();
        }

        int i = 0, step = 1;
        for (char c : s.toCharArray()) {
            rows[i].append(c);
            if (i == 0) step = 1;
            if (i == numRows - 1) step = -1;
            i += step;
        }

        return Arrays.stream(rows).map(StringBuilder::toString).collect(Collectors.joining());
    }
}`}}]},{name:`Database Round: SQL & Data Modeling`,questions:[{question:`Explain data flow in a full-stack application (frontend → backend → database).`,answer:`Typical flow:
- User interacts with the React/HTML frontend
- Frontend issues an HTTP request (GET/POST) to the backend
- Spring Boot controller receives the request, validates it, and calls the service layer
- Service layer applies business logic and queries the database via JPA/JDBC
- Result is mapped to a DTO and returned as JSON
- Frontend renders the response`,code:null},{question:`Write a SQL query to fetch all employees in the HR department.`,answer:`Example:`,code:{language:`sql`,content:`SELECT * FROM employees WHERE department = 'HR';`}},{question:`Fetch data from multiple tables using a JOIN.`,answer:`Example Using JOIN:`,code:{language:`sql`,content:`SELECT e.name, d.department_name
FROM employees e
JOIN departments d ON e.department_id = d.id;`}},{question:`Explain the difference between a Primary Key and a Foreign Key.`,answer:`- Primary Key: Unique identifier in a table (cannot be NULL, only one per table).
- Foreign Key: References another table's primary key (used to establish relationships).`,code:null},{question:`List the types of SQL joins with an example.`,answer:`Example using INNER JOIN and LEFT JOIN:`,code:{language:`sql`,content:`-- INNER JOIN
SELECT e.name, d.department_name
FROM employees e
INNER JOIN departments d ON e.department_id = d.id;

-- LEFT JOIN
SELECT e.name, d.department_name
FROM employees e
LEFT JOIN departments d ON e.department_id = d.id;`}},{question:`Compare Subqueries vs Joins — when would you use each?`,answer:`- Joins are used for merging tables and are generally faster because the database engine can optimise them.
- Subqueries are nested queries (used inside WHERE/SELECT) and are helpful for step-by-step filtering or when the result of one query feeds another.

✅ Database concepts covered efficiently.`,code:null}]},{name:`HR Round: Package & Cultural Fit`,questions:[{question:`What is your expected package?`,answer:`Discuss based on current CTC, market standards, role scope, and skill set. Be realistic and justify with research.`,code:null},{question:`How do you keep up with new technologies?`,answer:`Suggested approach:
- Follow official docs and release notes
- Read tech blogs and newsletters (e.g., Baeldung, InfoQ, DZone)
- Build small POCs / side projects
- Take online courses (Udemy, Coursera, Pluralsight)
- Attend meetups / conferences and engage with the community`,code:null},{question:`Tell me about your college life and how you got your first job.`,answer:`Talk about:
- Academic highlights and projects
- Extracurriculars or leadership roles
- Internships / campus placements
- How the first job shaped your technical foundation and work ethic`,code:null}]}]}],questionCount:14}}),s=new Map;Object.values(o).forEach(e=>{if(!e||!e.id)return;let t=s.get(e.id);t?e.interviews.forEach(e=>{t.interviews.push(e),t.questionCount+=e.questionCount}):s.set(e.id,{id:e.id,name:e.name,interviews:[...e.interviews],questionCount:e.questionCount})});var c=Array.from(s.values()).sort((e,t)=>e.name.localeCompare(t.name)),l=c.reduce((e,t)=>e+t.questionCount,0),u=r(),d=(e,t)=>{if(typeof e!=`string`||e.length===0)return``;try{let n=t||`java`;return(n===`jsx`||n===`tsx`)&&(n=`javascript`),i.highlight(e,{language:n,ignoreIllegals:!0}).value}catch{return e.replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`)}};function f({text:e}){if(!e)return null;let t=e.split(`
`),n=[],r=[],i=[],a=()=>{r.length&&(n.push({type:`bullets`,items:r}),r=[])},o=()=>{i.length&&(n.push({type:`table`,rows:i}),i=[])};for(let e of t){let t=e.trim();if(!t){a(),o();continue}if(/^\|.*\|$/.test(t)){a(),/^\|[-\s|]+\|$/.test(t)||i.push(t);continue}if(o(),/^-\s+/.test(t)){r.push(t.replace(/^-\s+/,``));continue}if(a(),/^\d+\.\s+\S/.test(t)){n.push({type:`h3`,text:t});continue}if(/^\d+\.\d+\s+\S/.test(t)){n.push({type:`h4`,text:t});continue}n.push({type:`p`,text:t})}return a(),o(),(0,u.jsx)(`div`,{className:`ci-answer-content`,children:n.map((e,t)=>e.type===`bullets`?(0,u.jsx)(`ul`,{className:`ci-answer-list`,children:e.items.map((e,t)=>(0,u.jsx)(`li`,{children:e},t))},t):e.type===`h3`?(0,u.jsx)(`h4`,{className:`ci-answer-h3`,children:e.text},t):e.type===`h4`?(0,u.jsx)(`h5`,{className:`ci-answer-h4`,children:e.text},t):e.type===`table`?(0,u.jsx)(`pre`,{className:`ci-answer-table`,children:e.rows.join(`
`)},t):(0,u.jsx)(`p`,{className:`ci-answer-text`,children:e.text},t))})}var p=[`#c084fc`,`#60a5fa`,`#4ade80`,`#fbbf24`,`#f472b6`,`#38bdf8`,`#a78bfa`,`#fb923c`];function m(e){let t=e.replace(/\*\*/g,``).toLowerCase();return/(coding|hackerrank|online|aptitude|pen & paper|pen and paper)/.test(t)?`coding`:/(hr|human|manager|hiring|offer)/.test(t)?`hr`:/(system design|design)/.test(t)?`design`:/(l1|l2|l3|technical|tech|profile|client|walk-in|round|interview)/.test(t)?`technical`:`general`}function h(){let[e,t]=(0,a.useState)(null),[r,i]=(0,a.useState)(null),[o,s]=(0,a.useState)(``),[h,g]=(0,a.useState)(`all`),_=c.find(t=>t.id===e),v=e=>{i(r===e?null:e)},y=()=>{t(null),i(null),g(`all`)};if(!_){let e=c.filter(e=>e.name.toLowerCase().includes(o.toLowerCase()));return(0,u.jsxs)(`div`,{className:`company-interview-page`,children:[(0,u.jsxs)(`section`,{className:`ci-hero`,children:[(0,u.jsx)(n,{to:`/`,className:`back-button`,children:`← Back to Home`}),(0,u.jsx)(`h1`,{className:`ci-title`,children:`🏢 Company-wise Interviews`}),(0,u.jsx)(`p`,{className:`ci-subtitle`,children:`Real interview questions & answers asked at top companies — organised exactly as the interviewer asked them, round by round. Click a company to walk through its Full Interview Journey.`}),(0,u.jsxs)(`div`,{className:`ci-stats`,children:[(0,u.jsxs)(`span`,{className:`ci-stat`,children:[c.length,` Companies`]}),(0,u.jsxs)(`span`,{className:`ci-stat`,children:[l,` Questions`]}),(0,u.jsx)(`span`,{className:`ci-stat`,children:`Round-by-Round`})]}),(0,u.jsx)(`input`,{type:`text`,className:`ci-search`,placeholder:`🔍 Search company…`,value:o,onChange:e=>s(e.target.value)})]}),(0,u.jsx)(`section`,{className:`ci-content`,children:(0,u.jsxs)(`div`,{className:`ci-grid`,children:[e.map((e,n)=>(0,u.jsxs)(`div`,{className:`ci-company-card`,style:{"--ci-color":p[n%p.length]},onClick:()=>t(e.id),children:[(0,u.jsx)(`div`,{className:`ci-company-logo`,"aria-hidden":`true`,children:e.name.charAt(0).toUpperCase()}),(0,u.jsx)(`h3`,{className:`ci-company-name`,children:e.name}),(0,u.jsxs)(`p`,{className:`ci-company-meta`,children:[e.interviews.length,` `,e.interviews.length===1?`interview`:`interviews`,` `,`· `,e.questionCount,` `,e.questionCount===1?`question`:`questions`]}),(0,u.jsx)(`span`,{className:`ci-company-cta`,children:`View Interview Journey →`})]},e.id)),e.length===0&&(0,u.jsxs)(`p`,{className:`ci-empty`,children:[`No companies match "`,o,`"`]})]})})]})}let b=_.interviews.length>1,x=_.interviews.map((e,t)=>({interviewIdx:t,interview:e,rounds:e.rounds.map((e,n)=>({round:e,interviewIdx:t,roundIdx:n})).filter(e=>h===`all`||m(e.round.name)===h)})),S=x.filter(e=>e.rounds.length>0).length,C=x.reduce((e,t)=>e+t.rounds.length,0);return(0,u.jsxs)(`div`,{className:`company-interview-page`,children:[(0,u.jsxs)(`section`,{className:`ci-hero`,children:[(0,u.jsx)(`button`,{className:`back-button ci-back-btn`,onClick:y,children:`← All Companies`}),(0,u.jsxs)(`h1`,{className:`ci-title`,children:[_.name,` `,(0,u.jsx)(`span`,{className:`ci-flow`,children:`Interview Flow`})]}),(0,u.jsxs)(`p`,{className:`ci-subtitle`,children:[_.name,` interview experience`,b&&` — each interview shown as a separate section`,` — rounds in the exact order they happened. Click a question to reveal its answer.`]}),(0,u.jsxs)(`div`,{className:`ci-stats`,children:[(0,u.jsxs)(`span`,{className:`ci-stat`,children:[_.interviews.length,` `,_.interviews.length===1?`Interview`:`Interviews`]}),(0,u.jsxs)(`span`,{className:`ci-stat`,children:[C,` Rounds`]}),(0,u.jsxs)(`span`,{className:`ci-stat`,children:[_.questionCount,` `,_.questionCount===1?`Question`:`Questions`]})]}),(0,u.jsx)(`div`,{className:`ci-round-filters`,children:[{value:`all`,label:`All Rounds`},{value:`technical`,label:`Technical`},{value:`coding`,label:`Coding`},{value:`design`,label:`System Design`},{value:`hr`,label:`HR / Manager`}].map(e=>(0,u.jsx)(`button`,{className:`ci-round-filter ${h===e.value?`active`:``}`,onClick:()=>g(e.value),children:e.label},e.value))})]}),(0,u.jsxs)(`section`,{className:`ci-interviews-container`,children:[x.map(e=>e.rounds.length===0?null:(0,u.jsxs)(`div`,{className:`ci-interview-section`,children:[b&&(0,u.jsxs)(`div`,{className:`ci-interview-header`,children:[(0,u.jsx)(`div`,{className:`ci-interview-logo`,children:e.interview.name?e.interview.name.charAt(0).toUpperCase():`📄`}),(0,u.jsxs)(`div`,{className:`ci-interview-info`,children:[(0,u.jsx)(`h2`,{className:`ci-interview-name`,children:e.interview.name}),(0,u.jsxs)(`p`,{className:`ci-interview-meta`,children:[e.rounds.length,` `,e.rounds.length===1?`Round`:`Rounds`,` ·`,` `,e.interview.questionCount,` `,e.interview.questionCount===1?`Question`:`Questions`]})]})]}),(0,u.jsx)(`div`,{className:`ci-timeline`,children:e.rounds.map((e,t)=>{let{round:n,interviewIdx:i,roundIdx:a}=e,o=t+1;return(0,u.jsxs)(`div`,{className:`ci-round-block`,children:[(0,u.jsxs)(`div`,{className:`ci-round-header`,children:[(0,u.jsxs)(`span`,{className:`ci-round-badge ci-badge-${m(n.name)}`,children:[`Round `,o]}),(0,u.jsx)(`div`,{className:`ci-round-title-wrap`,children:(0,u.jsx)(`h3`,{className:`ci-round-title`,children:n.name})}),(0,u.jsxs)(`span`,{className:`ci-round-qcount`,children:[n.questions.length,` `,n.questions.length===1?`Q`:`Qs`]})]}),(0,u.jsx)(`div`,{className:`ci-questions`,children:n.questions.map((e,t)=>{let n=`${i}-${a}-${t}`;return(0,u.jsxs)(`div`,{className:`ci-question ${r===n?`active`:``}`,children:[(0,u.jsxs)(`div`,{className:`ci-question-header`,onClick:()=>v(n),children:[(0,u.jsxs)(`span`,{className:`ci-q-number`,children:[o,`.`,t+1]}),(0,u.jsx)(`p`,{className:`ci-q-text`,children:e.question}),(0,u.jsx)(`span`,{className:`ci-arrow ${r===n?`expanded`:``}`,children:`▼`})]}),r===n&&(0,u.jsx)(`div`,{className:`ci-answer-wrap`,children:(0,u.jsxs)(`div`,{className:`ci-answer`,children:[(0,u.jsx)(`h4`,{className:`ci-answer-title`,children:`Answer:`}),(0,u.jsx)(f,{text:e.answer}),e.code&&e.code.content&&(0,u.jsxs)(`div`,{className:`ci-code-block`,children:[(0,u.jsx)(`div`,{className:`ci-code-header`,children:(0,u.jsx)(`span`,{className:`ci-code-lang`,children:e.code.language||`java`})}),(0,u.jsx)(`pre`,{className:`language-${e.code.language||`java`}`,children:(0,u.jsx)(`code`,{className:`language-${e.code.language||`java`}`,dangerouslySetInnerHTML:{__html:d(e.code.content,e.code.language)}})})]}),!e.answer&&!e.code&&(0,u.jsx)(`p`,{className:`ci-answer-text`,children:(0,u.jsx)(`em`,{children:`(No written answer provided — refer to the question and prepare your own.)`})})]})})]},n)})})]},`${i}-${a}`)})})]},e.interviewIdx)),S===0&&(0,u.jsx)(`p`,{className:`ci-empty`,children:`No rounds in this filter. Switch to "All Rounds".`})]})]})}export{h as default};