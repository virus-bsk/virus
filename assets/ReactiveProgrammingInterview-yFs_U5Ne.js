import{r as e}from"./rolldown-runtime-QTnfLwEv.js";import{t}from"./react-CZI7_Jkm.js";import{o as n,r}from"./index-DCrc1KQY.js";import{t as i}from"./atom-one-dark-CL0A0LnX.js";/* empty css                            */var a=e(t(),1),o=[{id:1,topic:`Reactive Programming Basics`,question:`What is Reactive Programming and how does it differ from traditional imperative programming?`,answer:`Reactive Programming is a declarative programming paradigm concerned with data streams and the propagation of change. Unlike imperative programming where you execute step-by-step instructions, reactive programming allows you to define how data flows through a system and how changes are propagated automatically.`,example:`// IMPERATIVE (Blocking)
public List<User> getActiveUsers() {
    List<User> allUsers = userRepository.findAll(); // Blocks
    List<User> activeUsers = new ArrayList<>();
    for (User user : allUsers) {
        if (user.isActive()) {
            activeUsers.add(user);
        }
    }
    return activeUsers;
}

// REACTIVE (Non-blocking)
public Flux<User> getActiveUsers() {
    return userRepository.findAll()
        .filter(User::isActive)
        .subscribeOn(Schedulers.boundedElastic());
}`,note:`Reactive streams are non-blocking, backpressure-aware, and enable asynchronous data processing.`},{id:2,topic:`Reactive Programming Basics`,question:`Explain the four principles of the Reactive Manifesto: Responsive, Resilient, Elastic, and Message-Driven.`,answer:`The Reactive Manifesto defines four key principles:

1. Responsive: System responds in a timely manner
2. Resilient: System stays responsive during failures
3. Elastic: System scales up/down with workload
4. Message-Driven: Asynchronous message passing for loose coupling`,example:`// Example demonstrating resilience and elasticity
@Service
public class ResilientService {
    
    public Mono<String> fetchDataWithRetry() {
        return externalApi.fetchData()
            .retryWhen(Retry.backoff(3, Duration.ofSeconds(1))
                .filter(throwable -> throwable instanceof TimeoutException)
                .doBeforeRetry(rs -> log.info("Retrying...")))
            .timeout(Duration.ofSeconds(5))
            .onErrorResume(e -> Mono.just("Fallback response"))
            .subscribeOn(Schedulers.boundedElastic());
    }
}`,note:`These principles ensure systems are robust, scalable, and maintainable in distributed environments.`},{id:3,topic:`Reactive Programming Basics`,question:`What is the Reactive Streams specification? Explain Publisher, Subscriber, Subscription, and Processor.`,answer:`Reactive Streams is a specification that provides a standard for asynchronous stream processing with non-blocking backpressure.

- Publisher: Emits data to subscribers
- Subscriber: Receives and processes data
- Subscription: Links Publisher and Subscriber, controls demand
- Processor: Both Subscriber and Publisher (transforms data)`,example:`// Implementation of Reactive Streams interfaces
public class CustomPublisher implements Publisher<String> {
    @Override
    public void subscribe(Subscriber<? super String> subscriber) {
        Subscription subscription = new CustomSubscription(subscriber);
        subscriber.onSubscribe(subscription);
    }
}

class CustomSubscription implements Subscription {
    private final Subscriber subscriber;
    private long requested = 0;
    private boolean cancelled = false;
    
    @Override
    public void request(long n) {
        if (n > 0) {
            requested += n;
            emitItems();
        }
    }
    
    private void emitItems() {
        for (int i = 0; i < requested && !cancelled; i++) {
            subscriber.onNext("Item " + i);
        }
        if (!cancelled) {
            subscriber.onComplete();
        }
    }
}`,note:`This specification ensures interoperability between different reactive implementations.`},{id:4,topic:`Reactive Programming Basics`,question:`Compare Reactive Programming with CompletableFuture, Java Streams, ExecutorService, and Fork/Join Framework.`,answer:`1. CompletableFuture: Single async result, limited composition
2. Java Streams: Pull-based, blocking, no backpressure
3. ExecutorService: Thread pool, blocking, no composition
4. Fork/Join: Parallel processing, no reactivity
5. Reactive: Push-based, non-blocking, backpressure, rich operators`,example:`// CompletableFuture (Single result)
CompletableFuture<String> future = CompletableFuture
    .supplyAsync(() -> fetchData())
    .thenApply(String::toUpperCase);

// Reactive Streams (Multiple results, backpressure)
Flux<String> reactive = Flux.range(1, 100)
    .map(i -> fetchData(i))
    .flatMap(Mono::just, 10) // Concurrency limit
    .limitRate(50) // Backpressure
    .subscribeOn(Schedulers.boundedElastic());

// Java Streams (Blocking, no backpressure)
List<String> result = Stream.iterate(0, i -> i + 1)
    .limit(100)
    .map(i -> fetchData(i))
    .collect(Collectors.toList());`,note:`Reactive programming is superior for handling multiple asynchronous events with flow control.`},{id:5,topic:`Reactive Programming Basics`,question:`What is backpressure and why is it crucial? Provide a real scenario.`,answer:`Backpressure is a mechanism that allows consumers to control the flow of data from producers. It prevents overwhelming the consumer when it cannot process data as fast as the producer emits it.

Real scenario: A database stream produces 10,000 records/second, but an API consumer can only process 1,000 records/second.`,example:`// Without backpressure - data loss or memory overflow
Flux.interval(Duration.ofMillis(1))
    .map(i -> fetchFromDatabase(i))
    .subscribe(data -> slowAPI.process(data)); // Overwhelmed!

// With backpressure - controlled flow
Flux.interval(Duration.ofMillis(1))
    .onBackpressureDrop() // Drop if consumer can't keep up
    .map(i -> fetchFromDatabase(i))
    .limitRate(100) // Request 100 at a time
    .subscribe(data -> slowAPI.process(data));

// Custom backpressure strategy
Flux.interval(Duration.ofMillis(1))
    .onBackpressureBuffer(1000, 
        overflow -> log.warn("Buffer overflow: {}", overflow))
    .sample(Duration.ofMillis(100)) // Sample every 100ms
    .subscribeOn(Schedulers.boundedElastic());`,note:`Backpressure prevents resource exhaustion, memory leaks, and system crashes.`},{id:6,topic:`Reactive Programming Basics`,question:`Explain the Observer pattern and how Reactive Programming enhances it.`,answer:`The Observer pattern defines a one-to-many dependency where subjects notify observers of state changes. Reactive Programming extends this with:

1. Backpressure (flow control)
2. Operators (transformation, filtering, combination)
3. Error propagation
4. Completion signals
5. Schedulers (threading)`,example:`// Traditional Observer pattern
class Subject {
    private List<Observer> observers = new ArrayList<>();
    private int state;
    
    void attach(Observer observer) { observers.add(observer); }
    void setState(int state) {
        this.state = state;
        notifyAllObservers();
    }
    void notifyAllObservers() {
        observers.forEach(o -> o.update(state));
    }
}

// Reactive Programming enhanced version
class ReactiveSubject {
    private final SubjectProcessor processor = EmitterProcessor.create();
    private final FluxSink<Integer> sink;
    
    public ReactiveSubject() {
        this.sink = processor.sink();
    }
    
    public void setState(int state) {
        sink.next(state); // Push to stream
    }
    
    public Flux<Integer> observe() {
        return processor
            .onBackpressureBuffer(1000)
            .map(value -> value * 2) // Operator
            .doOnError(e -> log.error("Error", e)) // Error handling
            .subscribeOn(Schedulers.parallel()); // Threading
    }
}`,note:`Reactive Programming transforms simple notification into a full data pipeline with flow control.`},{id:7,topic:`Reactive Programming Basics`,question:`What are the benefits and drawbacks of using Reactive Programming in enterprise Java applications?`,answer:`Benefits:
- Better resource utilization (non-blocking I/O)
- Backpressure handling
- Resilience and fault tolerance
- Scalability

Drawbacks:
- Steep learning curve
- Debugging complexity
- Not suitable for all workloads (CPU-bound)
- Complexity in error handling`,example:`// Benefits: Handles many concurrent requests with few threads
@RestController
public class HighThroughputController {
    @GetMapping("/benefits")
    public Flux<Data> getData() {
        return Flux.range(1, 1000)
            .flatMap(this::fetchData, 100) // 100 concurrent calls
            .limitRate(50)
            .subscribeOn(Schedulers.boundedElastic());
    }
}

// Drawback: CPU-bound operations still block
public Mono<Result> computeHeavy(Input input) {
    return Mono.fromCallable(() -> heavyComputation(input))
        .subscribeOn(Schedulers.parallel()); // Must use separate scheduler
}`,note:`Choose reactive when dealing with I/O-bound, high-concurrency systems with many concurrent users.`},{id:8,topic:`Reactive Programming Basics`,question:`How does Reactive Programming achieve non-blocking execution? Explain the underlying threading model.`,answer:`Reactive Programming uses non-blocking I/O with event-driven threading models:

1. Event Loop (Netty): Single thread handles all I/O events
2. Worker Threads: Process scheduled tasks
3. Non-blocking I/O: Threads don't block while waiting for I/O
4. Schedulers: Control where work executes
5. Backpressure: Controls data flow without blocking threads`,example:`// Netty event loop model
HttpClient.create()
    .runOn(LoopResources.create("event-loop", 4, true))
    .option(ChannelOption.SO_KEEPALIVE, true);

// Schedulers for different workloads
public Flux<Data> processData() {
    return Flux.range(1, 1000)
        .subscribeOn(Schedulers.boundedElastic()) // I/O work
        .map(this::heavyComputation) // CPU work
        .subscribeOn(Schedulers.parallel())
        .publishOn(Schedulers.single()) // Aggregation
        .subscribeOn(Schedulers.parallel());
}

// Non-blocking call
webClient.get()
    .uri("/api/data")
    .retrieve()
    .bodyToFlux(Data.class)
    .timeout(Duration.ofSeconds(5))
    .subscribe(); // Non-blocking`,note:`The key is using non-blocking I/O and event-driven architecture to handle many concurrent connections with few threads.`},{id:9,topic:`Reactive Programming Basics`,question:`What is the difference between asynchronous and non-blocking? How do they work together in reactive systems?`,answer:`Asynchronous: Task returns immediately, completion happens later (callback/CompletableFuture). Non-blocking: Operation doesn't wait/block the thread.

They work together: Async programming with non-blocking I/O enables high concurrency with low thread overhead.`,example:`// Synchronous + Blocking
String result1 = service.getData(); // Thread blocks
String result2 = service.getMoreData(); // Thread blocks
return result1 + result2;

// Asynchronous + Blocking (CompletableFuture)
CompletableFuture<String> future1 = CompletableFuture.supplyAsync(() -> {
    Thread.sleep(1000); // Blocks worker thread
    return "data1";
});

// Asynchronous + Non-blocking (Reactive)
public Mono<String> getCombinedData() {
    return Mono.zip(
        service.getData().subscribeOn(Schedulers.boundedElastic()),
        service.getMoreData().subscribeOn(Schedulers.boundedElastic())
    ).map(Tuple2::getT1 + Tuple2::getT2);
}

// Non-blocking I/O example
Flux<Data> result = webClient.get()
    .uri("/api/data")
    .retrieve()
    .bodyToFlux(Data.class) // Non-blocking
    .timeout(Duration.ofSeconds(5))
    .retry(3);`,note:`Reactive combines both to achieve superior performance and resource utilization.`},{id:10,topic:`Reactive Programming Basics`,question:`Explain the difference between push model vs pull model vs push-pull hybrid in data flow.`,answer:`- Pull Model: Consumer requests data (Java Streams). Consumer controls pace, but may waste resources.
- Push Model: Producer pushes data (WebSocket). Producer controls pace, consumer can get overwhelmed.
- Push-Pull Hybrid (Reactive): Subscriber requests (pull) data and producer pushes (push) only up to requested amount.`,example:`// Pull Model (Java Streams)
Stream.of(1, 2, 3, 4, 5)
    .map(i -> compute(i)) // Pulls when needed
    .collect(Collectors.toList());

// Push Model (Uncontrolled)
Flux.interval(Duration.ofMillis(1))
    .subscribe(data -> {
        Thread.sleep(100); // Can't keep up
    }); // Memory overflow

// Push-Pull Hybrid (Reactive with backpressure)
Flux.interval(Duration.ofMillis(1))
    .onBackpressureBuffer(1000)
    .limitRate(100) // Subscriber requests 100 items
    .subscribe(data -> process(data)); // Producer pushes only requested

// Custom implementation
public Flux<Integer> hybridFlow() {
    return Flux.generate(
        () -> 0,
        (state, sink) -> {
            int value = state + 1;
            sink.next(value);
            return value;
        }
    ).limitRate(10); // Hybrid: publisher generates, subscriber controls`},{id:11,topic:`Reactor Core Types & Creation`,question:`What is Project Reactor? How does it compare with RxJava? When would you choose one over the other?`,answer:`Project Reactor is a reactive programming library for Java, implementing Reactive Streams specification. It's the foundation of Spring WebFlux.

Reactor vs RxJava:
- Reactor: Modern, integrated with Spring, limited operator set
- RxJava: Mature, more operators, broader ecosystem

Choose Reactor for Spring apps, RxJava for Android or complex operator needs.`,example:`// Reactor (Spring ecosystem)
Mono<String> mono = Mono.just("Hello Reactor")
    .map(String::toUpperCase)
    .subscribeOn(Schedulers.boundedElastic());

Flux<Integer> flux = Flux.range(1, 10)
    .filter(i -> i % 2 == 0)
    .flatMap(Mono::just, 5);

// RxJava (More operators, Android-friendly)
Observable.just("Hello RxJava")
    .map(String::toUpperCase)
    .subscribeOn(Schedulers.io());

Flowable.range(1, 10)
    .filter(i -> i % 2 == 0)
    .flatMap(Flowable::just, 5);

// Interoperability
Mono<String> fromRx = Mono.from(
    Single.just("Convert from RxJava")
);

// Spring WebFlux uses Reactor
@GetMapping("/reactor")
public Mono<Response> getData() {
    return service.getData(); // Reactor Mono
}`,note:`Reactor is the default choice for Spring applications and offers seamless integration with Spring ecosystem.`},{id:12,topic:`Reactor Core Types & Creation`,question:`Explain the difference between Mono and Flux in detail with use cases for each.`,answer:`Mono: 0 or 1 element publisher. Used when there's at most one result.
Flux: 0 to N elements publisher. Used for streams of multiple results.

Use Mono for:
- Single API response
- Database findById
- Any single-value result

Use Flux for:
- Collections
- Streams
- Real-time events
- Paginated results`,example:`// MONO: Single result
@GetMapping("/user/{id}")
public Mono<User> getUser(@PathVariable String id) {
    return userRepo.findById(id); // At most 1 user
}

// Mono with error
Mono<User> user = Mono.fromCallable(() -> fetchUser())
    .timeout(Duration.ofSeconds(5))
    .onErrorReturn(new User("default"));

// FLUX: Multiple results
@GetMapping("/users")
public Flux<User> getUsers() {
    return userRepo.findAll(); // Multiple users
}

// Flux with backpressure
Flux.interval(Duration.ofSeconds(1))
    .map(i -> "Event " + i)
    .limitRate(100)
    .onBackpressureBuffer(1000);

// Converting between Mono and Flux
Flux<User> flux = monoUser.flux(); // Mono to Flux
Mono<User> mono = flux.single(); // Flux to Mono (must be exactly 1)
Mono<User> mono = flux.next(); // Flux to Mono (first element)
Mono<List<User>> listMono = flux.collectList(); // Flux to Mono<List>`,note:`Mono is for 0-1 items, Flux is for multiple items. Choose based on your data cardinality.`},{id:13,topic:`Reactor Core Types & Creation`,question:`What are the different ways to create a Flux? Provide examples for each.`,answer:`Flux can be created using:
1. just(): From static values
2. fromX(): From arrays, iterables, streams
3. range(): Range of integers
4. generate(): Synchronous generation
5. create(): Asynchronous emission
6. interval(): Periodic emissions
7. error(): Error signal
8. empty(): No data`,example:`// 1. just() - Static values
Flux<String> justFlux = Flux.just("A", "B", "C");

// 2. fromX() - From collections
Flux<String> fromArray = Flux.fromArray(new String[]{"A", "B"});
Flux<String> fromIterable = Flux.fromIterable(Arrays.asList("A", "B"));
Flux<Integer> fromStream = Flux.fromStream(Stream.of(1, 2, 3));

// 3. range() - Range of integers
Flux<Integer> range = Flux.range(1, 10);

// 4. generate() - Synchronous generation
Flux<String> generate = Flux.generate(
    () -> 0,
    (state, sink) -> {
        sink.next("Item " + state);
        if (state >= 10) sink.complete();
        return state + 1;
    }
);

// 5. create() - Asynchronous emission
Flux<String> create = Flux.create(sink -> {
    emitter.onNext("Async item 1");
    emitter.onNext("Async item 2");
    emitter.complete();
});

// 6. interval() - Periodic emissions
Flux<Long> interval = Flux.interval(Duration.ofSeconds(1));

// 7. error() - Error signal
Flux<String> error = Flux.error(new RuntimeException("Error"));

// 8. empty() - No data
Flux<String> empty = Flux.empty();

// 9. Combining
Flux<String> combined = Flux.concat(
    justFlux,
    fromIterable,
    generate.take(5)
);`,note:`Choose creation method based on data source: static (just), collection (from), async (create), periodic (interval).`},{id:14,topic:`Reactor Core Types & Creation`,question:`What are the different ways to create a Mono? Explain just, empty, error, fromCallable, fromSupplier, defer.`,answer:`Mono creation methods:
1. just(): Static value
2. empty(): No value
3. error(): Error signal
4. fromCallable(): Lazy evaluation with Callable
5. fromSupplier(): Lazy evaluation with Supplier
6. defer(): Lazy evaluation per subscription
7. fromRunnable(): Execute and complete
8. fromCompletableFuture(): From CompletableFuture`,example:`// 1. just() - Static value
Mono<String> just = Mono.just("Hello");

// 2. empty() - No value
Mono<String> empty = Mono.empty();

// 3. error() - Error signal
Mono<String> error = Mono.error(new RuntimeException("Error"));

// 4. fromCallable() - Lazy, exception handling
Mono<String> callable = Mono.fromCallable(() -> {
    Thread.sleep(1000);
    return "Lazy result";
});

// 5. fromSupplier() - Lazy, no exceptions
Mono<String> supplier = Mono.fromSupplier(() -> "Supplier result");

// 6. defer() - Lazy per subscription
Mono<String> defer = Mono.defer(() -> {
    String value = getCurrentTime(); // Evaluated per subscription
    return Mono.just(value);
});

// 7. fromRunnable() - Execute and complete
Mono<Void> runnable = Mono.fromRunnable(() -> {
    System.out.println("Running task");
});

// 8. fromCompletableFuture() - From CompletableFuture
CompletableFuture<String> future = CompletableFuture.supplyAsync(() -> "Future");
Mono<String> monoFuture = Mono.fromFuture(future);

// Practical use: Lazy database query
public Mono<User> getUserLazy(String id) {
    return Mono.defer(() -> 
        Mono.fromCallable(() -> userRepo.findById(id))
    );
}`,note:`Use defer() when you need lazy evaluation or want to execute logic per subscription.`},{id:15,topic:`Reactor Core Types & Creation`,question:`What is the difference between Flux.just() and Flux.fromIterable()? When to use each?`,answer:`Flux.just(): Takes individual arguments (varargs), creates Flux from explicit values.
Flux.fromIterable(): Takes an Iterable (List, Set), creates Flux from collection.

Use just() when you have individual values, fromIterable() when you have a collection.`,example:`// Flux.just() - Varargs individual values
Flux<String> just = Flux.just("A", "B", "C");
// Good for hardcoded values

// Flux.fromIterable() - From collection
List<String> list = Arrays.asList("A", "B", "C");
Flux<String> fromList = Flux.fromIterable(list);
// Good for dynamic collections

// Performance difference
long start = System.currentTimeMillis();
Flux.just("A", "B", "C").subscribe();
Flux.fromIterable(Arrays.asList("A", "B", "C")).subscribe();

// When to use each
// Use just() for:
Flux.just("A", "B", "C"); // Individual, known values

// Use fromIterable() for:
List<String> dynamicList = getDynamicList();
Flux.fromIterable(dynamicList); // Dynamic collections

// Converting between both
Flux<String> fromJust = Flux.fromIterable(
    Flux.just("A", "B").collectList().block()
);

// Memory considerations
Flux.just(1, 2, 3, 4, 5) // Allocates varargs array
Flux.fromIterable(Arrays.asList(1, 2, 3, 4, 5)); // Reuses existing collection`,note:`Use just() for explicit values, fromIterable() for existing collections. fromIterable() is generally more efficient with large data.`},{id:16,topic:`Reactor Core Types & Creation`,question:`Explain cold publishers vs hot publishers. Provide examples using Flux.just() and Flux.interval().`,answer:`Cold Publisher: Emits data for each subscriber separately. Each subscription gets all data from start.
Hot Publisher: Shares data with all subscribers. New subscribers join mid-stream.

Flux.just() - Cold (each subscriber gets all data)
Flux.interval() - Cold initially, can be made hot with share() or publish()`,example:`// Cold Publisher
Flux<String> cold = Flux.just("A", "B", "C");

cold.subscribe(data -> System.out.println("Sub1: " + data)); 
cold.subscribe(data -> System.out.println("Sub2: " + data));
// Both subscribers get all data: A, B, C

// Hot Publisher (share)
Flux<String> hot = Flux.just("A", "B", "C")
    .publish() // Makes it hot
    .autoConnect(1); // Connects when subscriber count reaches 1

hot.subscribe(data -> System.out.println("Sub1: " + data));
Thread.sleep(100);
hot.subscribe(data -> System.out.println("Sub2: " + data));
// Sub1 gets everything, Sub2 joins late

// Making interval hot
ConnectableFlux<Long> connectable = Flux.interval(Duration.ofSeconds(1))
    .publish();

connectable.subscribe(data -> System.out.println("Sub1: " + data));
connectable.connect(); // Start emitting

Thread.sleep(3000);
connectable.subscribe(data -> System.out.println("Sub2: " + data));
// Sub2 joins after 3 seconds, misses first emissions

// RefCount - Auto connect when first subscriber, disconnect when last unsubscribes
Flux<Long> refCount = Flux.interval(Duration.ofSeconds(1))
    .publish()
    .refCount(1);

// Share - Most common hot publisher
Flux<Long> shared = Flux.interval(Duration.ofSeconds(1))
    .share(); // Equivalent to publish().refCount(1)`,note:`Hot publishers are useful for sharing streams like live data, cold for replayable data.`},{id:17,topic:`Reactor Core Types & Creation`,question:`What is Mono.defer() and why is it useful? Explain with a practical scenario.`,answer:`Mono.defer() creates a Mono that is evaluated lazily for each subscription. The supplier is called when the Mono is subscribed to, not when it's created.

Use cases:
1. Lazy resource initialization
2. Avoiding evaluation at creation time
3. Scoped request/response in web context
4. Logging per subscription
5. Testing scenarios`,example:`// Without defer - Evaluated at creation time
long time = System.currentTimeMillis();
Mono<Long> created = Mono.just(time);
Thread.sleep(1000);
created.subscribe(t -> System.out.println("Fixed: " + t)); // Same time

// With defer - Evaluated per subscription
Mono<Long> deferred = Mono.defer(() -> 
    Mono.just(System.currentTimeMillis())
);
deferred.subscribe(t -> System.out.println("Deferred1: " + t));
Thread.sleep(1000);
deferred.subscribe(t -> System.out.println("Deferred2: " + t)); // Different time

// Practical scenario: Database connection per request
public Mono<User> getUserWithDefer(String id) {
    return Mono.defer(() -> {
        // This executes per subscription
        log.info("Fetching user: {}", id);
        return userRepo.findById(id);
    });
}

// Without defer - executes at creation
public Mono<User> getBuggyUser(String id) {
    Mono<User> user = userRepo.findById(id); // Executes immediately!
    log.info("User created: {}", id);
    return user;
}

// Testing with defer
@Test
public void testDefer() {
    AtomicInteger counter = new AtomicInteger(0);
    Mono<Integer> deferred = Mono.defer(() -> 
        Mono.just(counter.incrementAndGet())
    );
    
    StepVerifier.create(deferred)
        .expectNext(1) // First subscription
        .verifyComplete();
    
    StepVerifier.create(deferred)
        .expectNext(2) // Second subscription
        .verifyComplete();
}`,note:`Use defer() when you need fresh data per subscription or want to delay expensive operations.`},{id:18,topic:`Reactor Core Types & Creation`,question:`How do you convert between Mono and Flux? Write conversion methods.`,answer:`Mono <-> Flux conversions:

Mono to Flux:
- mono.flux(): Convert Mono to Flux
- Flux.from(mono): Alternative method
- mono.concatWith(mono2): Chain Monos into Flux

Flux to Mono:
- flux.single(): Get single element (must be exactly one)
- flux.next(): Get first element
- flux.last(): Get last element
- flux.collectList(): Collect all into Mono<List>
- flux.collectMap(): Collect into Mono<Map>`,example:`// MONO to FLUX
Mono<String> mono = Mono.just("Hello");

// Method 1: mono.flux()
Flux<String> flux1 = mono.flux();

// Method 2: Flux.from()
Flux<String> flux2 = Flux.from(mono);

// Method 3: concatWith
Flux<String> flux3 = mono.concatWith(Mono.just("World"));

// FLUX to MONO
Flux<Integer> flux = Flux.range(1, 5);

// flux.single() - Must have exactly one element
Flux<Integer> singleFlux = Flux.just(1);
Mono<Integer> monoSingle = singleFlux.single();

// flux.next() - First element
Mono<Integer> monoFirst = flux.next();

// flux.last() - Last element
Mono<Integer> monoLast = flux.last();

// flux.collectList() - Collect all
Mono<List<Integer>> monoList = flux.collectList();

// flux.collectMap() - Collect to map
Mono<Map<Integer, String>> monoMap = flux
    .map(i -> i.toString())
    .collectMap(String::length);

// Practical conversion
@GetMapping("/users")
public Mono<List<User>> getUsersList() {
    return userRepo.findAll() // Flux<User>
        .collectList(); // Convert to Mono<List<User>>
}

@GetMapping("/user/{id}")
public Flux<User> getUserAsFlux(@PathVariable String id) {
    return userRepo.findById(id) // Mono<User>
        .flux(); // Convert to Flux
}`,note:`Choose conversion based on downstream requirements: use flux() for Mono to Flux, collectList() for Flux to Mono.`},{id:19,topic:`Reactor Core Types & Creation`,question:`What is Flux.range() and how is it different from Flux.interval()?`,answer:`Flux.range(start, count): Emits a sequence of integers (start to start+count-1) immediately. Synchronous, fixed, finite.

Flux.interval(period): Emits sequential numbers every period. Asynchronous, infinite, time-based.

Use range() for finite sequences, interval() for periodic/streaming data.`,example:`// Flux.range() - Finite, immediate
Flux.range(1, 10)
    .map(i -> "Item " + i)
    .subscribe(System.out::println);
// Outputs: Item 1, Item 2, ..., Item 10 immediately

// Flux.interval() - Infinite, periodic
Flux.interval(Duration.ofSeconds(1))
    .map(i -> "Tick " + i)
    .take(5) // Limit to 5
    .subscribe(System.out::println);
// Outputs every second: Tick 0, Tick 1, ..., Tick 4

// Performance comparison
long start = System.currentTimeMillis();
Flux.range(1, 1000)
    .subscribe();
System.out.println("Range took: " + (System.currentTimeMillis() - start) + "ms");
// ~1ms

Flux.interval(Duration.ofMillis(1))
    .take(1000)
    .blockLast(); // Blocks
System.out.println("Interval took: " + (System.currentTimeMillis() - start) + "ms");
// ~1000ms

// When to use each
// range() - For loops, processing known counts
Flux.range(0, data.length)
    .map(i -> transform(data[i]));

// interval() - For periodic checks, heartbeats, polling
Flux.interval(Duration.ofMinutes(5))
    .flatMap(i -> checkHealth());

// Combine both
Flux.interval(Duration.ofSeconds(1))
    .zipWith(Flux.range(1, 100))
    .map(Tuple2::getT2)
    .subscribe(i -> System.out.println("Count: " + i));`,note:`Flux.range() is for finite sequences, Flux.interval() is for time-based emissions.`},{id:20,topic:`Reactor Core Types & Creation`,question:`How do you create an infinite stream and limit it using operators?`,answer:`Create infinite streams using Flux.interval(), Flux.generate(), or Flux.create(). Limit using take(), takeUntil(), takeWhile(), or limitRate().`,example:`// 1. Using interval() - Infinite time-based
Flux<Long> infinite = Flux.interval(Duration.ofMillis(100));

// Limit with operators
infinite.take(10) // First 10
    .subscribe(i -> System.out.println("Take 10: " + i));

infinite.take(Duration.ofSeconds(2)) // 2 seconds
    .subscribe(i -> System.out.println("Take 2s: " + i));

infinite.takeUntil(i -> i > 10) // Until condition
    .subscribe(i -> System.out.println("Until 10: " + i));

// 2. Using generate() - Infinite with state
Flux<Integer> infiniteGenerate = Flux.generate(
    () -> 0,
    (state, sink) -> {
        sink.next(state);
        return state + 1;
    }
);

// Limit with takeWhile
infiniteGenerate.takeWhile(i -> i < 20)
    .subscribe(i -> System.out.println("While < 20: " + i));

// 3. Using create() - Infinite async
Flux<String> infiniteCreate = Flux.create(sink -> {
    while (!sink.isCancelled()) {
        sink.next(System.currentTimeMillis() + "");
        try {
            Thread.sleep(100);
        } catch (InterruptedException e) {
            sink.error(e);
        }
    }
});

// 4. Combine with limitRate for backpressure
Flux.interval(Duration.ofMillis(1))
    .onBackpressureBuffer(1000)
    .limitRate(100) // Limit to 100 items per request
    .take(500)
    .subscribe();

// 5. Infinite stream with condition
Flux.range(0, Integer.MAX_VALUE)
    .takeWhile(i -> i < 1000)
    .subscribe();

// Practical: Infinite retry stream
Flux<Integer> retries = Flux.range(0, Integer.MAX_VALUE)
    .takeUntil(i -> i >= 3)
    .flatMap(i -> Mono.defer(() -> 
        externalCall().doOnSuccess(r -> log.info("Success on retry {}", i))
        .onErrorResume(e -> {
            log.warn("Retry {} failed", i);
            return Mono.error(e);
        })
    ));`,note:`Always limit infinite streams to prevent resource exhaustion. Use take(), limitRate(), or takeUntil()`},{id:21,topic:`Reactor Core Types & Creation`,question:`What is the difference between Mono.empty() and Mono.never()?`,answer:`Mono.empty(): Signals completion immediately with no value. Useful for void operations.

Mono.never(): Never signals anything (no value, no complete, no error). Useful for testing and indefinite waiting.`,example:`// Mono.empty() - Completes immediately
Mono<String> empty = Mono.empty();
empty.subscribe(
    value -> System.out.println("Never called"),
    error -> System.out.println("Never called"),
    () -> System.out.println("Complete called") // Called
);
// Output: Complete called

// Mono.never() - Never completes
Mono<String> never = Mono.never();
never.subscribe(
    value -> System.out.println("Never called"),
    error -> System.out.println("Never called"),
    () -> System.out.println("Never called")
);
// No output - never completes

// Practical use: Empty result
public Mono<Void> updateUser(User user) {
    if (user == null) {
        return Mono.empty(); // Nothing to update
    }
    return userRepo.save(user)
        .then(); // Convert to Mono<Void>
}

// Practical use: Never in tests
@Test
public void testTimeout() {
    Mono<String> never = Mono.never();
    StepVerifier.create(never.timeout(Duration.ofMillis(10)))
        .expectError(TimeoutException.class)
        .verify();
}

// Mono.empty() for conditional logic
public Mono<User> findUser(String id) {
    if (id == null) {
        return Mono.empty(); // Not found, complete
    }
    return userRepo.findById(id);
}

// Combining with switchIfEmpty
Mono.just("Hello")
    .flatMap(s -> {
        if (s.isEmpty()) return Mono.empty();
        return Mono.just(s.toUpperCase());
    })
    .switchIfEmpty(Mono.just("DEFAULT"))
    .subscribe(System.out::println);`,note:`Use empty() for void operations/optional results, never() for testing timeouts and indefinite waits.`},{id:22,topic:`Reactor Core Types & Creation`,question:`Explain the concept of lazy evaluation in Reactor with examples.`,answer:`Lazy evaluation means that operations are not executed until the stream is subscribed to. This allows for:
1. No unnecessary computation
2. Infinite streams
3. Composition without execution
4. Conditional execution

In Reactor, all operators are lazy - they define what to do, not when to do it.`,example:`// Eager vs Lazy
// Eager evaluation (Java Streams)
Stream.of(1, 2, 3)
    .map(i -> {
        System.out.println("Eager map: " + i);
        return i * 2;
    }) // Already evaluating?
    .collect(Collectors.toList()); // Executes fully

// Lazy evaluation (Reactor)
Flux<Integer> lazy = Flux.range(1, 5)
    .map(i -> {
        System.out.println("Lazy map: " + i);
        return i * 2;
    }); // No output - nothing executed

// Executed only when subscribed
lazy.subscribe(); // Now executes

// Multiple subscriptions - executes each time
Flux<Integer> lazyWithSideEffect = Flux.defer(() -> {
    System.out.println("Defer called");
    return Flux.just(1, 2, 3);
});

lazyWithSideEffect.subscribe(); // Prints "Defer called"
lazyWithSideEffect.subscribe(); // Prints "Defer called" again

// Lazy error handling
Mono<User> mono = Mono.fromCallable(() -> {
    if (Math.random() > 0.5) throw new RuntimeException("Error");
    return new User();
})
.onErrorReturn(new User("Fallback"));
// No error thrown until subscription

// Infinite streams
Flux<Long> infinite = Flux.interval(Duration.ofSeconds(1))
    .map(i -> {
        System.out.println("Computing: " + i);
        return i;
    })
    .take(5); // Takes 5, then completes

// Practical: Lazy validation
public Mono<Order> validateOrder(Order order) {
    return Mono.defer(() -> {
        if (order.getTotal() < 0) {
            return Mono.error(new IllegalArgumentException("Invalid total"));
        }
        return Mono.just(order);
    });
}`,note:`Lazy evaluation is fundamental to reactive streams - it enables efficient processing and composition.`},{id:23,topic:`Reactor Core Types & Creation`,question:`What is the significance of the subscribe() method? What overloaded versions exist?`,answer:`subscribe() is the terminal operation that triggers execution of the reactive stream. It connects the publisher to the subscriber and starts the data flow.

Overloaded versions:
1. subscribe(): Minimal, no handling
2. subscribe(Consumer): Handle values only
3. subscribe(Consumer, Consumer): Handle values and errors
4. subscribe(Consumer, Consumer, Runnable): Handle values, errors, completion
5. subscribe(Subscriber): Full subscriber interface`,example:`// 1. subscribe() - No handlers
Flux.just(1, 2, 3).subscribe();
// Starts stream, ignores all signals

// 2. subscribe(Consumer) - Handle values
Flux.just(1, 2, 3)
    .subscribe(value -> System.out.println("Value: " + value));
// Output: Value: 1, Value: 2, Value: 3

// 3. subscribe(Consumer, Consumer) - Values and errors
Flux.just(1, 2, 3)
    .concatWith(Flux.error(new RuntimeException("Error")))
    .subscribe(
        value -> System.out.println("Value: " + value),
        error -> System.err.println("Error: " + error)
    );

// 4. subscribe(Consumer, Consumer, Runnable) - Values, errors, completion
Flux.range(1, 3)
    .subscribe(
        value -> System.out.println("Value: " + value),
        error -> System.err.println("Error: " + error),
        () -> System.out.println("Complete!")
    );

// 5. subscribe(Subscriber) - Full control
Flux.just(1, 2, 3)
    .subscribe(new Subscriber<Integer>() {
        private Subscription subscription;
        
        @Override
        public void onSubscribe(Subscription s) {
            this.subscription = s;
            s.request(1); // Request one item
        }
        
        @Override
        public void onNext(Integer integer) {
            System.out.println("Received: " + integer);
            subscription.request(1); // Request next
        }
        
        @Override
        public void onError(Throwable t) {
            System.err.println("Error: " + t);
        }
        
        @Override
        public void onComplete() {
            System.out.println("Complete!");
        }
    });

// 6. Subscribe with custom context
@GetMapping("/api/data")
public Mono<ResponseEntity<Data>> getData() {
    return service.getData()
        .map(ResponseEntity::ok)
        .subscribeOn(Schedulers.boundedElastic());
}`,note:`subscribe() is the execution trigger. Always use appropriate handler methods to avoid swallowing errors.`},{id:24,topic:`Reactor Core Types & Creation`,question:`How do you handle the case when a Mono or Flux has no subscribers?`,answer:`When a Mono/Flux has no subscribers, nothing happens - no data flows, no computation occurs. This is by design (lazy evaluation).

Handling strategies:
1. block() - Force execution (blocking)
2. subscribe() - Start execution async
3. blockFirst()/blockLast() - Block for Flux
4. toStream() - Convert to stream (blocking)`,example:`// No subscriber - nothing happens
Flux.range(1, 10)
    .map(i -> i * 2)
    .doOnNext(System.out::println);
// No output - stream not executed

// 1. Blocking - Force execution
List<Integer> result = Flux.range(1, 10)
    .map(i -> i * 2)
    .collectList()
    .block(); // Blocks until complete
System.out.println(result);

// 2. Subscribe - Async
Flux.range(1, 10)
    .map(i -> i * 2)
    .subscribe(System.out::println);
// Executes asynchronously

// 3. blockFirst() - First element
Integer first = Flux.range(1, 10)
    .blockFirst(); // Blocks for first element

// 4. blockLast() - Last element
Integer last = Flux.range(1, 10)
    .blockLast(); // Blocks for last element

// 5. toStream() - Convert to stream
Stream<Integer> stream = Flux.range(1, 10)
    .toStream(); // Blocking operation
stream.forEach(System.out::println);

// 6. Reactive way - Subscribe with error handling
Flux.range(1, 10)
    .doOnSubscribe(s -> log.info("Subscribed"))
    .doOnComplete(() -> log.info("Completed"))
    .subscribe(
        data -> log.info("Data: {}", data),
        error -> log.error("Error: {}", error, error),
        () -> log.info("Done")
    );

// 7. Auto-subscribe in WebFlux
@GetMapping("/data")
public Flux<Data> getData() {
    // Spring subscribes automatically
    return service.getData(); // No explicit subscribe needed
}`,note:`WebFlux controllers auto-subscribe. For manual execution, use subscribe() or block() (avoid block in production).`},{id:25,topic:`Reactor Core Types & Creation`,question:`What is the difference between blockingSubscribe() vs subscribe()?`,answer:`subscribe(): Non-blocking, returns immediately. Execution happens asynchronously.

blockingSubscribe(): Blocking, waits for completion. Similar to subscribe but blocks the current thread until complete.

Use subscribe() in production, blockingSubscribe() only for testing.`,example:`// subscribe() - Non-blocking
System.out.println("Before subscribe");
Flux.range(1, 5)
    .delayElements(Duration.ofSeconds(1))
    .subscribe(i -> System.out.println("Received: " + i));
System.out.println("After subscribe");
// Output:
// Before subscribe
// After subscribe
// Received: 1 (after 1 second)
// Received: 2 (after 2 seconds)...

// blockingSubscribe() - Blocks
System.out.println("Before blockingSubscribe");
Flux.range(1, 5)
    .delayElements(Duration.ofSeconds(1))
    .blockingSubscribe(i -> System.out.println("Received: " + i));
System.out.println("After blockingSubscribe");
// Output:
// Before blockingSubscribe
// Received: 1 (after 1 second)
// Received: 2 (after 2 seconds)...
// After blockingSubscribe (after 5 seconds)

// Production code - subscribe
@RestController
public class ApiController {
    @GetMapping("/async")
    public Mono<String> asyncData() {
        return service.getData()
            .doOnSubscribe(s -> log.info("Subscribed"))
            .doOnNext(data -> log.info("Processing data"));
        // Non-blocking, returns immediately
    }
}

// Testing code - blockingSubscribe
@Test
public void testFlux() {
    List<Integer> results = new ArrayList<>();
    Flux.range(1, 5)
        .blockingSubscribe(results::add); // Blocks for test
    
    assertEquals(5, results.size());
}

// Comparison of blocking vs non-blocking
public void performanceTest() {
    long start = System.currentTimeMillis();
    
    // Non-blocking - returns immediately
    Flux.interval(Duration.ofSeconds(1))
        .take(5)
        .subscribe();
    System.out.println("Non-blocking: " + (System.currentTimeMillis() - start) + "ms");
    // ~0ms
    
    // Blocking - waits for completion
    Flux.interval(Duration.ofSeconds(1))
        .take(5)
        .blockLast();
    System.out.println("Blocking: " + (System.currentTimeMillis() - start) + "ms");
    // ~5000ms
}`,note:`Avoid blocking in production - use subscribe() for async, block() only for testing and validation.`},{id:26,topic:`Transformation Operators`,question:`Explain the difference between map() and flatMap() in Reactor with code examples.`,answer:`map(): Synchronous 1-to-1 transformation. Takes a function that returns a value.

flatMap(): Asynchronous 1-to-N transformation. Takes a function that returns a Publisher (Mono/Flux).

Use map() for simple transformations, flatMap() for async operations or transforming to multiple elements.`,example:`// map() - Synchronous transformation
Flux.range(1, 5)
    .map(i -> i * 2)
    .subscribe(System.out::println);
// Output: 2, 4, 6, 8, 10 (immediate)

// flatMap() - Async transformation
Flux.range(1, 5)
    .flatMap(i -> Mono.just(i * 2)
        .delayElement(Duration.ofMillis(100)))
    .subscribe(System.out::println);
// Output: 2, 4, 6, 8, 10 (after 100ms each, unordered)

// map() - Simple transformation
public Mono<UserDTO> getUserDTO(String id) {
    return userRepo.findById(id)
        .map(user -> new UserDTO(user.getName(), user.getAge()));
}

// flatMap() - Async operations
public Mono<UserDTO> enrichUser(String id) {
    return userRepo.findById(id)
        .flatMap(user -> 
            addressService.getAddress(user.getAddressId())
                .map(address -> {
                    user.setAddress(address);
                    return user;
                })
        );
}

// flatMap() - Multiple async operations
public Mono<UserDTO> getFullUser(String id) {
    return userRepo.findById(id)
        .flatMap(user -> 
            Mono.zip(
                addressService.getAddress(user.getAddressId()),
                orderService.getOrders(user.getId()),
                paymentService.getPayments(user.getId())
            ).map(tuple -> {
                user.setAddress(tuple.getT1());
                user.setOrders(tuple.getT2());
                user.setPayments(tuple.getT3());
                return user;
            })
        );
}

// flatMap() - Error handling
public Mono<User> safeUpdate(User user) {
    return Mono.just(user)
        .flatMap(u -> userRepo.save(u)
            .onErrorResume(e -> {
                log.error("Save failed: {}", e.getMessage());
                return Mono.just(user); // Fallback
            })
        );
}`,note:`Always use flatMap() for async operations, map() for sync transformations.`},{id:27,topic:`Transformation Operators`,question:`What is the difference between flatMap(), flatMapSequential(), and concatMap()?`,answer:`flatMap(): Concurrent execution, order NOT preserved (fastest).
flatMapSequential(): Concurrent execution, order preserved (medium).
concatMap(): Sequential execution, order preserved (slowest).

Choose based on requirements: flatMap for speed, concatMap for order, flatMapSequential for order with concurrency.`,example:`// flatMap() - Concurrent, unordered
Flux.just("A", "B", "C")
    .flatMap(s -> Mono.just(s + "1")
        .delayElement(Duration.ofMillis(100)))
    .subscribe(System.out::println);
// Output could be: A1, B1, C1 (any order)

// flatMapSequential() - Concurrent, ordered
Flux.just("A", "B", "C")
    .flatMapSequential(s -> Mono.just(s + "1")
        .delayElement(Duration.ofMillis(100)))
    .subscribe(System.out::println);
// Output: A1, B1, C1 (preserves order)

// concatMap() - Sequential, ordered
Flux.just("A", "B", "C")
    .concatMap(s -> Mono.just(s + "1")
        .delayElement(Duration.ofMillis(100)))
    .subscribe(System.out::println);
// Output: A1 (100ms), B1 (200ms), C1 (300ms)

// Performance comparison
long start = System.currentTimeMillis();

// flatMap - Fastest
Flux.range(1, 10)
    .flatMap(i -> Mono.just(i)
        .delayElement(Duration.ofMillis(100)))
    .blockLast(); // ~100ms

// flatMapSequential - Medium
Flux.range(1, 10)
    .flatMapSequential(i -> Mono.just(i)
        .delayElement(Duration.ofMillis(100)))
    .blockLast(); // ~100ms but ordered

// concatMap - Slowest
Flux.range(1, 10)
    .concatMap(i -> Mono.just(i)
        .delayElement(Duration.ofMillis(100)))
    .blockLast(); // ~1000ms

// Use cases
// 1. Independent async calls - flatMap
public Flux<Order> getOrders(List<String> ids) {
    return Flux.fromIterable(ids)
        .flatMap(id -> orderService.getOrder(id), 10); // 10 concurrent
}

// 2. Must preserve order - concatMap
public Flux<Message> processInOrder(List<Message> messages) {
    return Flux.fromIterable(messages)
        .concatMap(msg -> validateAndProcess(msg));
}

// 3. Ordered but still want concurrency - flatMapSequential
public Flux<Result> processWithOrder(List<Job> jobs) {
    return Flux.fromIterable(jobs)
        .flatMapSequential(job -> executeJob(job), 5);
}`,note:`flatMap is fastest, concatMap preserves order, flatMapSequential is the middle ground.`},{id:28,topic:`Transformation Operators`,question:`Explain switchMap() and when it's preferred over flatMap() for canceling previous requests.`,answer:`switchMap() cancels the previous inner publisher when a new element arrives. Only the latest inner publisher emits.

Use switchMap() when:
1. Type-ahead search
2. Debounced form validation
3. Latest result only matters
4. Cancelling stale requests

Use flatMap() when all results matter (parallel processing).`,example:`// switchMap() - Cancels previous
Flux.interval(Duration.ofMillis(100))
    .switchMap(i -> 
        Mono.just("Request " + i)
            .delayElement(Duration.ofMillis(300))
    )
    .subscribe(System.out::println);
// Only emits latest request, previous are canceled

// Type-ahead search with switchMap
@GetMapping("/search")
public Flux<String> search(@RequestParam String query) {
    return Flux.just(query) // Use with debounce
        .switchMap(q -> searchService.search(q));
        // Cancels previous search when new query comes
}

// Compare with flatMap - All requests complete
Flux.interval(Duration.ofMillis(100))
    .flatMap(i -> 
        Mono.just("Request " + i)
            .delayElement(Duration.ofMillis(300))
    )
    .take(5)
    .subscribe(System.out::println);
// Emits all requests (even stale ones)

// Practical switchMap example
public class SearchController {
    @GetMapping("/api/search")
    public Flux<Result> search(@RequestParam String q) {
        return Flux.just(q)
            .delayElements(Duration.ofMillis(300)) // Debounce
            .filter(s -> s.length() > 2) // Minimum length
            .switchMap(this::performSearch) // Cancel stale searches
            .doOnSubscribe(s -> log.info("New search: {}", q))
            .doOnCancel(() -> log.info("Search canceled"));
    }
    
    private Flux<Result> performSearch(String query) {
        return webClient.get()
            .uri("/search?q=" + query)
            .retrieve()
            .bodyToFlux(Result.class)
            .delayElements(Duration.ofMillis(500));
    }
}

// switchMap with fallback
Flux.just("A", "B")
    .switchMap(s -> 
        Mono.just(s)
            .flatMap(this::fetchData)
            .onErrorResume(e -> Mono.just("Fallback"))
    );`,note:`switchMap() is perfect for scenarios where you only care about the latest result and want to cancel outdated work.`},{id:29,topic:`Transformation Operators`,question:`What is the transform() operator and how is it different from compose()?`,answer:`transform(): Applies a transformation to a Flux/Mono. It's evaluated at assembly time.

compose(): Also applies transformation but captures the publisher type (Flux vs Mono). It's also evaluated at assembly time.

The main difference: compose() is generic and works with both Flux and Mono.`,example:`// transform() - Works with specific publisher
Flux<Integer> transformExample = Flux.range(1, 10)
    .transform(flux -> flux
        .filter(i -> i % 2 == 0)
        .map(i -> i * 2)
    );

// compose() - Works with both Flux and Mono
public <T> Function<Flux<T>, Flux<T>> applyLogging() {
    return flux -> flux
        .doOnSubscribe(s -> log.info("Subscribed"))
        .doOnComplete(() -> log.info("Completed"))
        .doOnError(e -> log.error("Error", e));
}

// Using compose with Flux
Flux.range(1, 5)
    .compose(applyLogging())
    .subscribe();

// Can also work with Mono
Mono.just("Hello")
    .compose(applyLoggingMono())
    .subscribe();

// transform() vs compose() comparison
// transform() - Returns specific type
public Function<Flux<Integer>, Flux<Integer>> transformLogic() {
    return flux -> flux.map(i -> i * 2);
}

// compose() - Generic, returns same type
public <T> Function<Flux<T>, Flux<T>> composeLogic() {
    return flux -> flux
        .doOnNext(System.out::println)
        .map(t -> t);
}

// Practical use: Reusable pipeline
public class PipelineUtils {
    public static <T> Function<Flux<T>, Flux<T>> logAndMetrics() {
        return flux -> flux
            .doOnSubscribe(s -> {
                metrics.record("stream.start");
                log.info("Stream started");
            })
            .doOnComplete(() -> {
                metrics.record("stream.complete");
                log.info("Stream completed");
            })
            .doOnError(e -> {
                metrics.record("stream.error");
                log.error("Stream error", e);
            });
    }
}

// Usage
Flux.range(1, 10)
    .compose(PipelineUtils.logAndMetrics())
    .subscribe();

// transform() for specific type
Flux<Integer> transformed = Flux.range(1, 5)
    .transform(flux -> flux
        .filter(i -> i > 2)
        .map(i -> i * 10)
    );`,note:`Use compose() for reusable transformations, transform() for specific publisher type transformations.`},{id:30,topic:`Transformation Operators`,question:`Demonstrate buffer(), window(), and collectList() with practical scenarios.`,answer:`buffer(): Collects items into lists/collections of specified size/time.

window(): Similar to buffer but emits Flux windows instead of lists.

collectList(): Collects all items into a single Mono<List>.

Use buffer() for batching operations, window() for streaming processing, collectList() for aggregation.`,example:`// buffer() - Batch items
Flux.range(1, 10)
    .buffer(3) // Batch of 3
    .subscribe(System.out::println);
// Output: [1,2,3], [4,5,6], [7,8,9], [10]

// buffer() with time
Flux.interval(Duration.ofMillis(100))
    .buffer(Duration.ofSeconds(1))
    .subscribe(System.out::println);
// Emits batches of items received in 1 second

// window() - Similar but emits Flux
Flux.range(1, 10)
    .window(3)
    .flatMap(window -> window.map(i -> "Window: " + i))
    .subscribe(System.out::println);
// Output: Window: 1, Window: 2, Window: 3, Window: 4...

// collectList() - Collect all to list
Flux.range(1, 5)
    .collectList()
    .subscribe(list -> System.out.println("List: " + list));
// Output: List: [1, 2, 3, 4, 5]

// Practical: Batch processing with buffer
@Scheduled(fixedDelay = 5000)
public void processBatch() {
    queue.pollBatch(100) // Get 100 items
        .buffer(10) // Process in batches of 10
        .flatMap(batch -> processBatch(batch)
            .onErrorResume(e -> {
                log.error("Batch failed: {}", e.getMessage());
                return Mono.empty();
            })
        )
        .subscribe();
}

// Practical: Real-time streaming with window
public Flux<Aggregate> aggregateByHour(Flux<Event> events) {
    return events
        .window(Duration.ofHours(1))
        .flatMap(window -> window
            .collectList()
            .map(this::calculateAggregate)
        );
}

// Practical: collectList for pagination
@GetMapping("/users/export")
public Mono<ResponseEntity<Resource>> exportUsers() {
    return userRepo.findAll()
        .collectList()
        .map(users -> {
            // Convert to CSV
            String csv = convertToCSV(users);
            return ResponseEntity.ok(new ByteArrayResource(csv.getBytes()));
        });
}`,note:`buffer() for batching, window() for streaming, collectList() for aggregation.`},{id:31,topic:`Transformation Operators`,question:`What is the cast() operator and when would you use it?`,answer:`cast() operator is used to cast the type of elements in a Flux/Mono to a different type. It's useful when you need to change the generic type for type safety or when working with raw types.`,example:`// Basic cast()
Flux<Object> objects = Flux.just("Hello", "World", 123);
Flux<String> strings = objects.cast(String.class); // Only works if all strings
// Error if contains non-string

// Safe cast with filter
Flux<Object> mixed = Flux.just("Hello", 123, "World");
Flux<String> safeStrings = mixed
    .filter(String.class::isInstance)
    .map(String.class::cast); // Alternative to cast()

// Practical use: Database results
public Flux<User> getUsers() {
    // Raw query returns Object[]
    return jdbcClient.query("SELECT * FROM users")
        .flatMap(row -> {
            // Cast to specific types
            String id = row.getColumn("id", String.class);
            String name = row.getColumn("name", String.class);
            return Mono.just(new User(id, name));
        });
}

// Using cast() with generic types
Flux<Number> numbers = Flux.just(1, 2, 3);
Flux<Integer> integers = numbers.cast(Integer.class);

// Downcasting with cast()
class Animal {}
class Dog extends Animal {}

Flux<Animal> animals = Flux.just(new Dog(), new Dog());
Flux<Dog> dogs = animals.cast(Dog.class);

// Alternative to cast() - map
Flux<Object> obj = Flux.just("Hello", "World");
Flux<String> str = obj.map(String::valueOf); // Cast via mapping

// Safe casting with onError
Flux<Object> dangerous = Flux.just("Hello", 123);
Flux<String> safe = dangerous
    .filter(String.class::isInstance)
    .map(String.class::cast)
    .switchIfEmpty(Flux.error(new ClassCastException("Not a string")));`,note:`Use cast() when you're certain of the type. Use filter + map for safe casting.`},{id:32,topic:`Transformation Operators`,question:`Explain the defaultIfEmpty() and switchIfEmpty() operators with examples.`,answer:`defaultIfEmpty(): Provides a default value if the source completes without emitting.

switchIfEmpty(): Switches to an alternative Flux/Mono if the source completes empty.

Use defaultIfEmpty() for simple defaults, switchIfEmpty() for fallback streams or complex defaults.`,example:`// defaultIfEmpty() - Simple default
Flux.empty()
    .defaultIfEmpty("Default Value")
    .subscribe(System.out::println);
// Output: Default Value

// switchIfEmpty() - Alternative stream
Flux.empty()
    .switchIfEmpty(Flux.just("Fallback", "Values"))
    .subscribe(System.out::println);
// Output: Fallback, Values

// Practical: Fallback for empty results
@GetMapping("/user/{id}")
public Mono<User> getUser(@PathVariable String id) {
    return userRepo.findById(id)
        .switchIfEmpty(Mono.defer(() -> 
            userRepo.findByEmail("default@email.com")
        ));
}

// Practical: Caching with fallback
public Mono<Data> getData(String key) {
    return cache.get(key) // Returns Mono<Data>
        .switchIfEmpty(Mono.defer(() -> 
            database.findByKey(key)
                .flatMap(data -> 
                    cache.put(key, data)
                        .thenReturn(data)
                )
        ));
}

// defaultIfEmpty vs switchIfEmpty
// Use defaultIfEmpty for same type
Flux<Integer> numbers = Flux.empty()
    .defaultIfEmpty(0); // Returns Mono<Integer>

// Use switchIfEmpty for alternative stream
Flux<Integer> numbers2 = Flux.empty()
    .switchIfEmpty(Flux.range(1, 5)); // Returns Flux<Integer>

// Complex fallback with switchIfEmpty
public Mono<Order> getOrder(String id) {
    return orderRepo.findById(id)
        .switchIfEmpty(Mono.defer(() -> {
            log.warn("Order not found: {}", id);
            return createDefaultOrder(id);
        }))
        .switchIfEmpty(Mono.defer(() -> {
            log.error("Cannot create default order");
            return Mono.error(new OrderNotFoundException(id));
        }));
}

// With timeouts
Mono.just("Value")
    .delayElement(Duration.ofSeconds(2))
    .timeout(Duration.ofSeconds(1))
    .switchIfEmpty(Mono.just("Timeout Fallback"));`,note:`defaultIfEmpty() for simple values, switchIfEmpty() for alternative streams.`},{id:33,topic:`Transformation Operators`,question:`What does the as() operator do? Provide a use case.`,answer:`as() operator transforms the current publisher into another type. It's used to perform custom transformations or to use builder patterns.

Use as() for:
1. Custom conversion to other types
2. Builder pattern integration
3. Testing utilities
4. Debug logging`,example:`// as() - Transform to different type
Flux.range(1, 5)
    .as(flux -> flux.collectList()); // Convert to Mono<List<Integer>>

// as() with custom transformation
Flux.range(1, 10)
    .as(flux -> flux
        .filter(i -> i % 2 == 0)
        .map(i -> i * 2)
        .reduce(0, Integer::sum)
    )
    .subscribe(System.out::println);

// Practical: Builder pattern
public class QueryBuilder {
    private final Flux<Result> source;
    
    public QueryBuilder(Flux<Result> source) {
        this.source = source;
    }
    
    public QueryBuilder filter(Filter filter) {
        return new QueryBuilder(source.filter(filter::apply));
    }
    
    public QueryBuilder sort(Sort sort) {
        return new QueryBuilder(source.sort(sort));
    }
    
    public Flux<Result> build() {
        return source;
    }
}

// Usage with as()
Flux.fromIterable(results)
    .as(flux -> new QueryBuilder(flux)
        .filter(Filter.eq("status", "ACTIVE"))
        .sort(Sort.asc("name"))
        .build()
    );

// as() for testing
public <T> Flux<T> debug(Flux<T> flux) {
    return flux
        .doOnSubscribe(s -> log.debug("Subscribed"))
        .doOnNext(t -> log.debug("Element: {}", t))
        .doOnComplete(() -> log.debug("Complete"))
        .doOnError(e -> log.debug("Error: {}", e.getMessage()));
}

Flux.range(1, 5)
    .as(this::debug)
    .subscribe();

// as() for logging
Flux.just("A", "B", "C")
    .as(flux -> {
        log.info("Processing stream of size: {}", flux.count().block());
        return flux;
    })
    .subscribe();

// as() with metrics
Flux.range(1, 100)
    .as(flux -> {
        MeterRegistry registry = new SimpleMeterRegistry();
        Counter counter = Counter.builder("stream.items")
            .register(registry);
        return flux.doOnNext(item -> counter.increment());
    })
    .subscribe();`,note:`as() is useful for custom transformations and builder pattern integration.`},{id:34,topic:`Transformation Operators`,question:`How does the handle() operator work? Provide an example where it's useful.`,answer:`handle() is a stateful operator that allows handling each element with a custom, potentially stateful, logic. It provides a Sink where you can emit 0, 1, or multiple elements, and also support error and completion.

Use handle() when:
1. Need stateful processing
2. Custom filtering/mapping logic
3. Conditional emission
4. Complex transformations`,example:`// handle() - Basic usage
Flux.range(1, 10)
    .handle((item, sink) -> {
        if (item % 2 == 0) {
            sink.next(item * 2); // Only emit even numbers
        }
        // No emission for odd numbers
    })
    .subscribe(System.out::println);
// Output: 4, 8, 12, 16, 20

// handle() with state
Flux.range(1, 10)
    .handle(new BiConsumer<Integer, SynchronousSink<String>>() {
        private int count = 0;
        
        @Override
        public void accept(Integer item, SynchronousSink<String> sink) {
            count++;
            if (count % 2 == 0) {
                sink.next("Even count: " + count);
            }
            if (count == 5) {
                sink.next("Halfway there!");
            }
        }
    })
    .subscribe(System.out::println);

// Practical: CSV parsing with handle
public Flux<Record> parseCSV(Flux<String> lines) {
    return lines
        .skip(1) // Skip header
        .handle((line, sink) -> {
            try {
                String[] fields = line.split(",");
                if (fields.length >= 3) {
                    Record record = new Record(
                        fields[0],
                        fields[1],
                        Double.parseDouble(fields[2])
                    );
                    sink.next(record);
                } else {
                    // Skip invalid lines
                }
            } catch (NumberFormatException e) {
                sink.error(new ParseException("Invalid number format", e));
            }
        });
}

// Practical: Stateful deduplication
public Flux<String> deduplicate(Flux<String> stream) {
    Set<String> seen = new HashSet<>();
    return stream.handle((item, sink) -> {
        if (!seen.contains(item)) {
            seen.add(item);
            sink.next(item);
        }
    });
}

// handle() vs filter() + map()
// Using filter + map (simple)
Flux.range(1, 10)
    .filter(i -> i % 2 == 0)
    .map(i -> i * 2);

// Using handle (complex)
Flux.range(1, 10)
    .handle((i, sink) -> {
        if (i % 2 == 0) {
            sink.next(i * 2);
        } else if (i == 3) {
            sink.next(100); // Special case
            sink.next(101);
        }
        // All other odds are skipped
    });`,note:`handle() is powerful for complex, stateful processing that can't be done with simple operators.`},{id:35,topic:`Transformation Operators`,question:`Explain the difference between concatMap() and concatMapIterable().`,answer:`concatMap(): Transforms each element into a Publisher (Flux/Mono) and concatenates the results.

concatMapIterable(): Transforms each element into an Iterable and concatenates the results.

Use concatMap() for async transformations, concatMapIterable() for sync collection flattening.`,example:`// concatMap() - Async, Publisher result
Flux.just("A", "B")
    .concatMap(s -> Mono.just(s + "1").delayElement(Duration.ofMillis(100)))
    .subscribe(System.out::println);
// Output: A1 (100ms), B1 (200ms)

// concatMapIterable() - Sync, Iterable result
Flux.just("A", "B")
    .concatMapIterable(s -> Arrays.asList(s + "1", s + "2"))
    .subscribe(System.out::println);
// Output: A1, A2, B1, B2

// Practical concatMapIterable with nested lists
public Flux<OrderItem> getOrderItems(Flux<Order> orders) {
    return orders
        .concatMapIterable(Order::getItems); // Flatten nested lists
}

// Practical concatMap for async processing
public Flux<ProcessedDocument> processDocuments(Flux<Document> docs) {
    return docs
        .concatMap(doc -> 
            transformService.process(doc) // Async processing
                .delayElement(Duration.ofSeconds(1))
                .onErrorResume(e -> Mono.just(new ProcessedDocument(doc.getId(), "Error")))
        );
}

// Performance comparison
// concatMap() - Good for async operations
Flux.range(1, 10)
    .concatMap(i -> Mono.just(i).delayElement(Duration.ofMillis(10)));

// concatMapIterable() - Good for sync operations with collections
Flux.range(1, 10)
    .concatMapIterable(i -> Arrays.asList(i, i * 2));

// When to use each
// 1. Flat nested collections - concatMapIterable
public Flux<String> getAllTags(Flux<Post> posts) {
    return posts.concatMapIterable(Post::getTags);
}

// 2. Async operations with order - concatMap
public Flux<Result> executeJobs(Flux<Job> jobs) {
    return jobs
        .concatMap(job -> executeAsync(job));
}

// 3. Converting to list then back
Flux.just("A", "B", "C")
    .concatMapIterable(s -> {
        List<String> list = new ArrayList<>();
        list.add(s + "1");
        list.add(s + "2");
        return list;
    });`,note:`concatMapIterable() for sync collection flattening, concatMap() for async transformations.`},{id:36,topic:`Filtering & Conditional Operators`,question:`Explain the differences between filter(), skip(), take(), and takeUntil() with code examples.`,answer:`filter(): Keep only elements that match a predicate.

skip(): Ignore the first N elements.

take(): Take only the first N elements.

takeUntil(): Take elements until a condition becomes true.`,example:`// filter() - Keep matching elements
Flux.range(1, 10)
    .filter(i -> i % 2 == 0)
    .subscribe(System.out::println);
// Output: 2, 4, 6, 8, 10

// skip() - Skip first N elements
Flux.range(1, 10)
    .skip(3)
    .subscribe(System.out::println);
// Output: 4, 5, 6, 7, 8, 9, 10

// take() - Take first N elements
Flux.range(1, 10)
    .take(3)
    .subscribe(System.out::println);
// Output: 1, 2, 3

// takeUntil() - Take until condition
Flux.range(1, 10)
    .takeUntil(i -> i > 5)
    .subscribe(System.out::println);
// Output: 1, 2, 3, 4, 5, 6

// Practical: Pagination with skip/take
@GetMapping("/users")
public Flux<User> getUsers(
    @RequestParam int page, 
    @RequestParam int size
) {
    return userRepo.findAll()
        .skip(page * size)
        .take(size);
}

// Practical: Skip invalid before processing
public Flux<Data> processData(Flux<Data> input) {
    return input
        .skipWhile(data -> data.getTimestamp() < System.currentTimeMillis() - 10000)
        .filter(data -> data.isValid())
        .takeUntil(data -> data.getType().equals("COMPLETE"));
}

// Combined example
Flux.range(1, 20)
    .skip(5) // Start from 6
    .filter(i -> i % 3 == 0) // Keep multiples of 3
    .take(3) // Take first 3
    .subscribe(System.out::println);
// Output: 6, 9, 12

// Complex filtering
public Flux<Order> getOrders(Flux<Order> orders) {
    return orders
        .filter(order -> order.getAmount() > 100)
        .filter(order -> order.getStatus() != OrderStatus.CANCELLED)
        .takeWhile(order -> !order.isFlagged()) // Stop at first flagged
        .skip(order -> order.getTimestamp().before(LocalDate.now().minusDays(1).toEpochDay()));
}`,note:`filter() selects elements, skip() ignores them, take() limits count, takeUntil() limits by condition.`},{id:37,topic:`Filtering & Conditional Operators`,question:`What is distinct() and distinctUntilChanged()? When would you use each?`,answer:`distinct(): Filters out duplicate elements based on equals() comparison.

distinctUntilChanged(): Filters out consecutive duplicates only.

Use distinct() when you want global uniqueness, distinctUntilChanged() to avoid repetitive consecutive values.`,example:`// distinct() - Global uniqueness
Flux.just(1, 2, 1, 3, 2, 4, 1)
    .distinct()
    .subscribe(System.out::println);
// Output: 1, 2, 3, 4

// distinctUntilChanged() - Consecutive uniqueness only
Flux.just(1, 1, 2, 2, 2, 3, 1)
    .distinctUntilChanged()
    .subscribe(System.out::println);
// Output: 1, 2, 3, 1 (last 1 is different from 3)

// distinct with custom equality
Flux.just("hello", "world", "Hello", "World")
    .distinct(String::toLowerCase)
    .subscribe(System.out::println);
// Output: hello, world (case-insensitive)

// Practical: Deduplicate events
public Flux<Event> processEvents(Flux<Event> events) {
    return events
        .distinct(Event::getId) // Keep only unique events by ID
        .distinctUntilChanged(Event::getStatus); // Filter same status changes
}

// Practical: UI update optimization
@GetMapping("/stock-price")
public Flux<StockPrice> streamPrices() {
    return priceService.getPriceStream()
        .distinctUntilChanged(StockPrice::getSymbol) // Only send when symbol changes
        .distinctUntilChanged(StockPrice::getPrice); // Only send on price change
}

// Performance comparison
// distinct() - Stores all seen values (memory)
Flux.range(1, 1000000)
    .distinct()
    .subscribe(); // Memory usage: O(n)

// distinctUntilChanged() - Stores only last value (memory efficient)
Flux.interval(Duration.ofMillis(100))
    .distinctUntilChanged()
    .subscribe(); // Memory usage: O(1)

// Combined deduplication
public Flux<Action> deduplicateActions(Flux<Action> actions) {
    return actions
        .distinctUntilChanged(Action::getType) // Remove consecutive same type
        .distinct(Action::getId) // Ensure unique IDs
        .distinctUntilChanged(Action::getState); // Remove consecutive same state
}`,note:`distinct() for global uniqueness, distinctUntilChanged() for removing consecutive duplicates.`},{id:38,topic:`Filtering & Conditional Operators`,question:`How does sample() and throttleFirst() help with performance? Provide use cases.`,answer:`sample(): Emits the last element from the source at regular intervals.

throttleFirst(): Emits the first element from the source at regular intervals.

Both help reduce load by limiting emissions, especially from high-frequency events.`,example:`// sample() - Last element per window
Flux.interval(Duration.ofMillis(10))
    .sample(Duration.ofMillis(100))
    .take(10)
    .subscribe(System.out::println);
// Outputs last value every 100ms

// throttleFirst() - First element per window
Flux.interval(Duration.ofMillis(10))
    .throttleFirst(Duration.ofMillis(100))
    .take(10)
    .subscribe(System.out::println);
// Outputs first value every 100ms

// Practical: UI throttling
@GetMapping("/search")
public Flux<Result> search(@RequestParam String query) {
    return searchService.getResults(query)
        .throttleFirst(Duration.ofSeconds(2));
        // Only processes first request every 2 seconds
}

// Practical: Rate limiting
public Flux<Metric> processMetrics(Flux<Metric> metrics) {
    return metrics
        .sample(Duration.ofSeconds(5)) // Process latest metric every 5s
        .flatMap(metric -> 
            database.save(metric)
                .thenReturn(metric)
        );
}

// Practical: Debouncing with sample
@GetMapping("/sensor-data")
public Flux<SensorData> getSensorData() {
    return sensorService.getStream()
        .sample(Duration.ofMillis(500))
        .doOnNext(data -> log.info("Sample: {}", data));
}

// throttleFirst vs throttleLast
// throttleFirst - First element (use for UI events, form submissions)
Flux.just("A", "B", "C")
    .delayElements(Duration.ofMillis(10))
    .throttleFirst(Duration.ofMillis(100))
    .subscribe();

// throttleLast / sample - Last element (use for price updates, aggregation)
Flux.just("A", "B", "C")
    .delayElements(Duration.ofMillis(10))
    .sample(Duration.ofMillis(100))
    .subscribe();

// Combined performance optimization
public Flux<Event> optimizeEvents(Flux<Event> highFrequency) {
    return highFrequency
        .throttleFirst(Duration.ofSeconds(1)) // Control initial bursts
        .sample(Duration.ofSeconds(5)) // Then sample regularly
        .onBackpressureBuffer(1000)
        .limitRate(100);
}`,note:`sample() and throttleFirst() are essential for performance optimization in high-frequency streams.`},{id:39,topic:`Filtering & Conditional Operators`,question:`What is the difference between timeout() and delay()? When to use each?`,answer:`timeout(): Signals an error if no item is emitted within the specified duration.

delay(): Delays the emission of items by the specified duration.

Use timeout() for error handling and timeout scenarios, delay() for scheduling and throttling.`,example:`// timeout() - Error if no emission
Flux.just("Hello")
    .delayElements(Duration.ofSeconds(2))
    .timeout(Duration.ofSeconds(1))
    .subscribe(
        System.out::println,
        error -> System.out.println("Timeout: " + error)
    );
// Output: Timeout: reactor.core.Exceptions$TimeoutException

// delay() - Delays all emissions
Flux.just(1, 2, 3)
    .delayElements(Duration.ofSeconds(1))
    .subscribe(System.out::println);
// Outputs: 1 (1s), 2 (2s), 3 (3s)

// timeout() with fallback
Flux.just("Slow response")
    .delayElements(Duration.ofSeconds(3))
    .timeout(Duration.ofSeconds(1))
    .onErrorResume(e -> Mono.just("Fallback response"))
    .subscribe(System.out::println);
// Output: Fallback response

// timeout() per element vs total timeout
// Per element timeout
Flux.interval(Duration.ofMillis(100))
    .timeout(Duration.ofMillis(1000)) // Each interval must be <1s
    .subscribe();

// Total operation timeout
Mono.just("Data")
    .delayElement(Duration.ofSeconds(30))
    .timeout(Duration.ofSeconds(5));

// Practical: API timeout
@RestController
public class ApiController {
    @GetMapping("/external")
    public Mono<Response> callExternal() {
        return webClient.get()
            .uri("/external-service")
            .retrieve()
            .bodyToMono(Response.class)
            .timeout(Duration.ofSeconds(5))
            .onErrorResume(TimeoutException.class, 
                e -> Mono.just(new Response("Timeout")));
    }
}

// Practical: Retry with delay
public Flux<Data> fetchWithRetry() {
    return Flux.range(1, 5)
        .delayElements(Duration.ofSeconds(1))
        .flatMap(i -> fetchData()
            .retryWhen(Retry.backoff(3, Duration.ofSeconds(1)))
            .timeout(Duration.ofSeconds(2))
        );
}`,note:`timeout() for error handling, delay() for scheduling emissions.`},{id:40,topic:`Filtering & Conditional Operators`,question:`Explain the takeWhile() and skipWhile() operators with examples.`,answer:`takeWhile(): Takes elements while a condition is true. Stops on first false.

skipWhile(): Skips elements while a condition is true. Starts on first false.

Use takeWhile() to get elements until a condition is met, skipWhile() to skip initial unwanted elements.`,example:`// takeWhile() - Take while true
Flux.range(1, 10)
    .takeWhile(i -> i < 5)
    .subscribe(System.out::println);
// Output: 1, 2, 3, 4

// skipWhile() - Skip while true
Flux.range(1, 10)
    .skipWhile(i -> i < 5)
    .subscribe(System.out::println);
// Output: 5, 6, 7, 8, 9, 10

// takeWhile with complex condition
Flux.just("A", "B", "C", "D", "E")
    .takeWhile(s -> !s.equals("D"))
    .subscribe(System.out::println);
// Output: A, B, C

// skipWhile with complex condition
Flux.just("A", "B", "C", "D", "E")
    .skipWhile(s -> !s.equals("D"))
    .subscribe(System.out::println);
// Output: D, E

// Practical: Process until threshold
public Flux<Metric> processMetrics(Flux<Metric> metrics) {
    return metrics
        .takeWhile(metric -> metric.getValue() < 100)
        .doOnNext(metric -> log.info("Processing: {}", metric));
}

// Practical: Skip initialization
public Flux<Status> getStatusStream(Flux<Status> statuses) {
    return statuses
        .skipWhile(status -> status.getState() == State.INITIALIZING)
        .takeWhile(status -> status.getState() != State.SHUTDOWN);
}

// Combined operators
Flux.range(1, 20)
    .skipWhile(i -> i < 5) // Skip 1-4
    .takeWhile(i -> i < 15) // Take 5-14
    .subscribe(System.out::println);
// Output: 5,6,7,8,9,10,11,12,13,14

// takeWhile vs filter (important difference)
// filter checks all elements
Flux.range(1, 10)
    .filter(i -> i < 5)
    .subscribe(System.out::println);
// Output: 1,2,3,4 (checks all 10)

// takeWhile stops on first false
Flux.range(1, 10)
    .takeWhile(i -> i < 5)
    .subscribe(System.out::println);
// Output: 1,2,3,4 (stops at 5)`,note:`takeWhile() stops on first false, skipWhile() starts on first false.`},{id:41,topic:`Filtering & Conditional Operators`,question:`What does elementAt() do? When would you use it?`,answer:`elementAt(index): Emits the element at the specified zero-based index in the sequence.

elementAt(index, defaultValue): Emits the element at index, or default value if index out of bounds.

Use elementAt() for positional access in reactive streams (rare but useful for specific use cases).`,example:`// elementAt() - Get element at index
Flux.just("A", "B", "C", "D")
    .elementAt(2)
    .subscribe(System.out::println);
// Output: C

// elementAt() with out of bounds - Error
Flux.just("A", "B")
    .elementAt(5)
    .subscribe(
        System.out::println,
        error -> System.out.println("Error: " + error)
    );
// Output: Error: Index out of bounds

// elementAt() with default value
Flux.just("A", "B")
    .elementAt(5, "Default")
    .subscribe(System.out::println);
// Output: Default

// Practical: Get nth item in batch
public Mono<User> getNthUser(int index) {
    return userRepo.findAll()
        .elementAt(index)
        .switchIfEmpty(Mono.just(new User("Empty")));
}

// Practical: Process specific position
public Mono<Result> processSpecific(Flux<Data> data) {
    return data
        .elementAt(10) // Process 11th item
        .flatMap(item -> processItem(item));
}

// elementAt vs skip() + take()
// Using elementAt
Flux.range(1, 10)
    .elementAt(3)
    .subscribe();

// Equivalent using skip + take
Flux.range(1, 10)
    .skip(3)
    .take(1)
    .single()
    .subscribe();

// Performance note: Both are equivalent
// For large streams, consider using skip() for better performance

// Practical: Pagination using elementAt
public class PaginationService {
    public Mono<List<Item>> getPage(Flux<Item> items, int page, int size) {
        return items
            .skip(page * size)
            .take(size)
            .collectList();
    }
    
    public Mono<Item> getElementAt(Flux<Item> items, int index) {
        return items.elementAt(index)
            .switchIfEmpty(Mono.just(new Item("Default")));
    }
}`,note:`elementAt() is useful for positional access but rarely needed in streaming applications.`},{id:42,topic:`Filtering & Conditional Operators`,question:`Explain the single() and singleOrEmpty() operators.`,answer:`single(): Expects exactly one element. Throws error if 0 or >1 elements.

singleOrEmpty(): Expects 0 or 1 element. Emits value if 1, completes if 0, error if >1.

Use single() when you need exactly one item, singleOrEmpty() when item is optional.`,example:`// single() - Exactly one element
Flux.just("A")
    .single()
    .subscribe(System.out::println);
// Output: A

Flux.empty()
    .single()
    .subscribe(
        System.out::println,
        error -> System.out.println("Error: " + error)
    );
// Output: Error: No element

Flux.just("A", "B")
    .single()
    .subscribe(
        System.out::println,
        error -> System.out.println("Error: " + error)
    );
// Output: Error: Multiple elements

// singleOrEmpty() - Zero or one element
Flux.just("A")
    .singleOrEmpty()
    .subscribe(System.out::println);
// Output: A

Flux.empty()
    .singleOrEmpty()
    .subscribe(
        System.out::println,
        error -> System.out.println("Error: " + error),
        () -> System.out.println("Complete")
    );
// Output: Complete

Flux.just("A", "B")
    .singleOrEmpty()
    .subscribe(
        System.out::println,
        error -> System.out.println("Error: " + error)
    );
// Output: Error: Multiple elements

// Practical: Get single result from database
@GetMapping("/user/{id}")
public Mono<User> getUser(@PathVariable String id) {
    return userRepo.findById(id)
        .singleOrEmpty() // Allows empty
        .switchIfEmpty(Mono.error(new UserNotFoundException(id)));
}

// Practical: Validate unique result
public Mono<User> validateUniqueUsers(Flux<User> users) {
    return users
        .single() // Must be exactly one
        .onErrorResume(IndexOutOfBoundsException.class,
            e -> Mono.error(new IllegalStateException("Expected exactly one user")));
}

// single vs next vs last
Flux.just("A", "B", "C")
    .single() // Error (multiple elements)

Flux.just("A", "B", "C")
    .next() // A (first element)

Flux.just("A", "B", "C")
    .last() // C (last element)`,note:`Use single() for exactly one result, singleOrEmpty() for optional results.`},{id:43,topic:`Filtering & Conditional Operators`,question:`What is the ignoreElements() operator? When is it useful?`,answer:`ignoreElements(): Ignores all values emitted by the source and only signals completion or error.

Use ignoreElements() when:
1. You only care about completion
2. Side effects only (doOnNext for logging)
3. Converting to Mono<Void> for void returns
4. You want to discard the actual values`,example:`// ignoreElements() - Only signals completion
Flux.just(1, 2, 3)
    .doOnNext(i -> System.out.println("Received: " + i))
    .ignoreElements()
    .subscribe(
        v -> System.out.println("Value: " + v),
        err -> System.out.println("Error: " + err),
        () -> System.out.println("Complete!")
    );
// Output: Received: 1, Received: 2, Received: 3, Complete!
// No value signal

// Practical: Void return in services
@Service
public class UserService {
    public Mono<Void> updateUser(User user) {
        return userRepo.save(user)
            .doOnNext(saved -> log.info("User saved: {}", saved))
            .ignoreElements(); // Return void after save
    }
}

// Practical: Fire and forget
@PostMapping("/users")
public Mono<ResponseEntity<Void>> createUser(@RequestBody User user) {
    return userService.saveUser(user)
        .ignoreElements()
        .thenReturn(ResponseEntity.accepted().build());
}

// ignoreElements() vs then()
// ignoreElements - Returns Mono<Void>
Mono<Void> ignored = Flux.just(1, 2, 3)
    .ignoreElements();

// then - Also returns Mono<Void>
Mono<Void> then = Mono.just("Hello")
    .then();

// ignoreElements() with side effects
public Mono<Void> logAndIgnore(Flux<Event> events) {
    return events
        .doOnNext(event -> log.info("Event received: {}", event))
        .doOnError(err -> log.error("Error processing event", err))
        .ignoreElements();
}

// Practical: Batch processing with void return
@Scheduled(fixedDelay = 5000)
public Mono<Void> processBatch() {
    return batchService.getPendingItems()
        .flatMap(this::processItem)
        .doOnComplete(() -> log.info("Batch processed"))
        .ignoreElements();
}`,note:`ignoreElements() is essential for void returns and fire-and-forget scenarios.`},{id:44,topic:`Filtering & Conditional Operators`,question:`Explain the hasElement() and hasElements() operators.`,answer:`hasElement(): Returns a Mono<Boolean> indicating if the source emits any element.

hasElements(): Similar to hasElement() but less flexible (deprecated in favor of hasElement()).

Use hasElement() to check if a stream contains any elements.`,example:`// hasElement() - Check if any element
Flux.just(1, 2, 3)
    .hasElement()
    .subscribe(System.out::println);
// Output: true

Flux.empty()
    .hasElement()
    .subscribe(System.out::println);
// Output: false

// hasElement() in conditional logic
public Mono<Response> getUserResponse(Flux<User> users) {
    return users
        .hasElement()
        .flatMap(hasUser -> {
            if (hasUser) {
                return users.take(1)
                    .single()
                    .map(user -> ResponseEntity.ok(user));
            } else {
                return Mono.just(ResponseEntity.notFound().build());
            }
        });
}

// hasElement() with filtering
Flux.just(1, 2, 3, 4, 5)
    .filter(i -> i > 10)
    .hasElement()
    .subscribe(has -> System.out.println("Has >10: " + has));
// Output: Has >10: false

// Practical: Check if cache has data
@Cacheable("users")
public Mono<Boolean> hasUsers() {
    return userRepo.findAll()
        .hasElement()
        .cache(); // Cache the boolean result
}

// Practical: Validation check
public Mono<Void> validateNotEmpty(Flux<String> data) {
    return data
        .hasElement()
        .flatMap(hasElement -> {
            if (!hasElement) {
                return Mono.error(new EmptyDataException());
            }
            return Mono.empty();
        });
}

// hasElement() vs count()
// hasElement() - Short circuits, more efficient
Flux.just(1, 2, 3)
    .hasElement(); // Returns true immediately

// count() - Counts all elements
Flux.just(1, 2, 3)
    .count(); // Returns 3L

// Performance comparison
public Flux<Boolean> compareOperators(Flux<String> data) {
    return Flux.fromIterable(
        Arrays.asList(
            data.hasElement(), // Efficient
            data.count().map(c -> c > 0) // Less efficient
        )
    );
}`,note:`hasElement() efficiently checks for any element without counting all elements.`},{id:45,topic:`Filtering & Conditional Operators`,question:`What is the all() and any() operators and when to use them?`,answer:`all(predicate): Returns Mono<Boolean> true if ALL elements match the predicate.

any(predicate): Returns Mono<Boolean> true if ANY element matches the predicate.

Use all() for validation requiring all elements to pass, any() for quick existence checks.`,example:`// all() - All must match
Flux.just(2, 4, 6, 8)
    .all(i -> i % 2 == 0)
    .subscribe(System.out::println);
// Output: true

Flux.just(2, 4, 5, 8)
    .all(i -> i % 2 == 0)
    .subscribe(System.out::println);
// Output: false

// any() - Any must match
Flux.just(1, 3, 5, 7)
    .any(i -> i % 2 == 0)
    .subscribe(System.out::println);
// Output: false

Flux.just(1, 3, 5, 6)
    .any(i -> i % 2 == 0)
    .subscribe(System.out::println);
// Output: true

// Practical: Validation
public Mono<Boolean> validateAllUsers(Flux<User> users) {
    return users
        .all(user -> user.getAge() >= 18)
        .doOnNext(result -> log.info("All users are adults: {}", result));
}

// Practical: Check if any admin user exists
public Mono<Boolean> hasAdminUser(Flux<User> users) {
    return users
        .any(user -> user.getRole() == Role.ADMIN);
}

// all() and any() with empty flux
Flux.empty()
    .all(i -> true)
    .subscribe(System.out::println);
// Output: true (vacuously true)

Flux.empty()
    .any(i -> true)
    .subscribe(System.out::println);
// Output: false

// Practical: Business rule validation
public class OrderValidator {
    public Mono<Boolean> validateOrder(Flux<OrderItem> items) {
        return items
            .all(item -> item.getQuantity() > 0)
            .zipWith(items.any(item -> item.getPrice() > 100))
            .map(tuple -> tuple.getT1() && !tuple.getT2());
            // All quantities positive AND no item > $100
    }
}

// all() with complex validation
public Mono<ValidationResult> validateEmployeeData(Flux<Employee> employees) {
    return Mono.zip(
        employees.all(e -> e.getEmail().contains("@")),
        employees.all(e -> e.getPhone().length() == 10),
        employees.any(e -> e.getSalary() > 100000)
    ).map(tuple -> {
        boolean allValid = tuple.getT1() && tuple.getT2();
        boolean hasHighSalary = tuple.getT3();
        return new ValidationResult(allValid, hasHighSalary);
    });
}`,note:`all() checks all elements, any() checks if any element matches.`},{id:46,topic:`Combination & Aggregation Operators`,question:`Compare merge(), concat(), and zip() in Reactor. When to use each?`,answer:`merge(): Merges publishers, interleaving elements as they arrive. Order NOT preserved.

concat(): Concatenates publishers sequentially. Order preserved.

zip(): Combines elements from multiple publishers into tuples. Waits for all to complete.`,example:`// merge() - Interleaved, unordered
Flux<String> flux1 = Flux.just("A", "B").delayElements(Duration.ofMillis(100));
Flux<String> flux2 = Flux.just("C", "D").delayElements(Duration.ofMillis(100));
Flux.merge(flux1, flux2)
    .subscribe(System.out::println);
// Output: A, C, B, D (interleaved)

// concat() - Sequential, ordered
Flux<String> flux3 = Flux.just("A", "B").delayElements(Duration.ofMillis(100));
Flux<String> flux4 = Flux.just("C", "D").delayElements(Duration.ofMillis(100));
Flux.concat(flux3, flux4)
    .subscribe(System.out::println);
// Output: A, B, C, D (preserved order)

// zip() - Combines into tuples
Flux<Integer> numbers = Flux.just(1, 2, 3);
Flux<String> letters = Flux.just("A", "B", "C");
Flux.zip(numbers, letters)
    .subscribe(System.out::println);
// Output: [1,A], [2,B], [3,C]

// When to use each
// 1. merge() - Independent parallel streams
public Flux<Result> fetchAll(Flux<Result> stream1, Flux<Result> stream2) {
    return Flux.merge(stream1, stream2)
        .parallel(4)
        .runOn(Schedulers.parallel());
}

// 2. concat() - Sequential operations with order
public Flux<Processed> processInOrder(Flux<Input> inputs) {
    return Flux.concat(
        validate(inputs),
        transform(inputs),
        enrich(inputs)
    );
}

// 3. zip() - Combine related data
public Mono<Dashboard> getDashboard(String userId) {
    return Mono.zip(
        userService.getUser(userId),
        orderService.getOrders(userId),
        analyticsService.getAnalytics(userId)
    ).map(tuple -> new Dashboard(tuple.getT1(), tuple.getT2(), tuple.getT3()));
}

// Performance comparison
// mergeWith() - Faster, unordered
Flux.just(1, 2).mergeWith(Flux.just(3, 4));

// concatWith() - Slower, ordered
Flux.just(1, 2).concatWith(Flux.just(3, 4));

// zipWith() - Pairing data
Flux.just(1, 2, 3).zipWith(Flux.just("A", "B"));`,note:`merge() for speed, concat() for order, zip() for combining values.`},{id:47,topic:`Combination & Aggregation Operators`,question:`What is concatWith() vs startWith()? Provide examples.`,answer:`concatWith(): Appends another publisher after the current one.

startWith(): Prepends another publisher before the current one.

Use concatWith() for adding after, startWith() for adding before.`,example:`// concatWith() - Append after
Flux.just(1, 2, 3)
    .concatWith(Flux.just(4, 5))
    .subscribe(System.out::println);
// Output: 1, 2, 3, 4, 5

// startWith() - Prepends before
Flux.just(3, 4, 5)
    .startWith(Flux.just(1, 2))
    .subscribe(System.out::println);
// Output: 1, 2, 3, 4, 5

// concatWith() with delay
Flux.just("A", "B")
    .concatWith(Flux.just("C", "D").delayElements(Duration.ofSeconds(1)))
    .subscribe();
// Output: A, B (immediate), C, D (after 1s)

// startWith() with values
Flux.just("World")
    .startWith("Hello")
    .subscribe(System.out::println);
// Output: Hello, World

// Practical: Adding default values
public Flux<User> getUsersWithDefault(String id) {
    return userRepo.findById(id)
        .flux()
        .startWith(getDefaultUser()) // Add default before
        .concatWith(Mono.just(new User("Extra"))); // Add extra after
}

// Practical: Logging with startWith and concatWith
public Flux<Event> processEvents(Flux<Event> events) {
    return events
        .startWith(Event.START) // Mark start
        .concatWith(Event.END); // Mark end
}

// Chaining multiple
Flux.just("B")
    .startWith("A")
    .concatWith("C")
    .concatWith("D")
    .startWith("Start")
    .subscribe(System.out::println);
// Output: Start, A, B, C, D

// Performance note
// Both are efficient, but startWith is slightly more efficient
// since it doesn't need to combine publishers`,note:`concatWith() appends, startWith() prepends streams.`},{id:48,topic:`Combination & Aggregation Operators`,question:`Explain combineLatest() and withLatestFrom() with real-world scenarios.`,answer:`combineLatest(): Combines the latest values from multiple publishers. Emits when any publisher emits.

withLatestFrom(): Combines the value of the main publisher with the latest from others.

Use combineLatest() when changes from any source matter, withLatestFrom() when you want to combine with latest of others on main emission.`,example:`// combineLatest() - Emits on any change
Flux<Double> price = Flux.just(100.0, 101.0, 102.0).delayElements(Duration.ofSeconds(1));
Flux<Integer> quantity = Flux.just(10, 20, 30).delayElements(Duration.ofSeconds(1));
Flux.combineLatest(price, quantity, (p, q) -> p * q)
    .subscribe(System.out::println);
// Output: 1000 (100*10), 2020 (101*20), 3060 (102*30)

// withLatestFrom() - Emits only when main emits
Flux<String> main = Flux.just("A", "B", "C").delayElements(Duration.ofSeconds(1));
Flux<Integer> latest = Flux.just(1, 2, 3, 4).delayElements(Duration.ofMillis(500));
main.withLatestFrom(latest, (mainVal, latestVal) -> mainVal + latestVal)
    .subscribe(System.out::println);
// Output: A3, B4, C4 (uses latest value from latest stream)

// Practical: Real-time dashboard
public class DashboardService {
    public Flux<DashboardData> getDashboard() {
        Flux<Metrics> metrics = metricsService.getStream();
        Flux<Alerts> alerts = alertService.getStream();
        
        return Flux.combineLatest(
            metrics,
            alerts,
            (m, a) -> new DashboardData(m, a)
        );
    }
}

// Practical: Form validation with combineLatest
public Mono<ValidationResult> validateForm(
    Flux<String> email,
    Flux<String> password
) {
    return Flux.combineLatest(
        email,
        password,
        (e, p) -> new ValidationResult(
            e.matches(".+@.+\\..+"),
            p.length() >= 8
        )
    ).next();
}

// Practical: withLatestFrom for user actions
public Flux<Action> handleUserActions(Flux<Action> actions, Flux<User> currentUser) {
    return actions
        .withLatestFrom(currentUser, (action, user) -> {
            action.setUser(user);
            return action;
        });
}`,note:`combineLatest() for independent updates, withLatestFrom() for dependent updates.`},{id:49,topic:`Combination & Aggregation Operators`,question:`How does zipWhen() work? Demonstrate with a practical example.`,answer:`zipWhen() zips a publisher with the result of a function that returns a publisher based on the source value. Useful for conditional async operations based on previous results.`,example:`// zipWhen() - Conditional async operations
Flux.just(1, 2, 3)
    .zipWhen(i -> getDataFor(i)) // Async call based on i
    .subscribe(System.out::println);
// Output: [1, dataFor1], [2, dataFor2], [3, dataFor3]

// Practical: API call with dependent calls
public Mono<UserDetails> getUserDetails(String userId) {
    return userRepo.findById(userId)
        .zipWhen(user -> 
            // Load orders only if user is active
            user.isActive() ? 
                orderService.getOrders(userId) : 
                Mono.just(Collections.emptyList())
        )
        .map(tuple -> {
            User user = tuple.getT1();
            List<Order> orders = tuple.getT2();
            return new UserDetails(user, orders);
        });
}

// Practical: Conditional processing
public Flux<ProcessedData> processItems(Flux<Item> items) {
    return items
        .zipWhen(item -> 
            // Only get additional data for expensive items
            item.getPrice() > 100 ?
                externalDataService.getDetails(item.getId()) :
                Mono.just(Details.EMPTY)
        )
        .map(tuple -> {
            Item item = tuple.getT1();
            Details details = tuple.getT2();
            return new ProcessedData(item, details);
        });
}

// zipWhen vs flatMap
// zipWhen - More concise for dependent async ops
Flux.just(1, 2, 3)
    .zipWhen(i -> getData(i))
    .subscribe();

// flatMap - More flexible
Flux.just(1, 2, 3)
    .flatMap(i -> getData(i)
        .map(data -> new Tuple2<>(i, data))
    )
    .subscribe();

// Practical: Multi-step process
public Mono<OrderResult> processOrder(Order order) {
    return Mono.just(order)
        .zipWhen(o -> inventoryService.reserve(o))
        .zipWhen(tuple -> {
            Order o = tuple.getT1();
            Reservation r = tuple.getT2();
            return paymentService.charge(o, r);
        })
        .zipWhen(tuple -> {
            Order o = tuple.getT1().getT1();
            Reservation r = tuple.getT1().getT2();
            Payment p = tuple.getT2();
            return shippingService.schedule(o, r, p);
        })
        .map(tuple -> {
            Order o = tuple.getT1().getT1().getT1();
            Reservation r = tuple.getT1().getT1().getT2();
            Payment p = tuple.getT1().getT2();
            Shipping s = tuple.getT2();
            return new OrderResult(o, r, p, s);
        });
}`,note:`zipWhen() is useful for sequential dependent async operations.`},{id:50,topic:`Combination & Aggregation Operators`,question:`Use and() and when() with Mono for conditional logic.`,answer:`and(): Combines two Mono<Void> to complete when both complete.

when(): Returns a Mono<Void> that completes when all given publishers complete.

Use and() and when() for side-effect completion and conditional execution.`,example:`// and() - Combine two void operations
Mono<Void> operation1 = Mono.fromRunnable(() -> log.info("Op1"));
Mono<Void> operation2 = Mono.fromRunnable(() -> log.info("Op2"));
operation1.and(operation2)
    .subscribe(v -> log.info("Both complete"));

// when() - Multiple operations
Mono<Void> op1 = Mono.just("A").then();
Mono<Void> op2 = Mono.just("B").then();
Mono<Void> op3 = Mono.just("C").then();
Mono.when(op1, op2, op3)
    .subscribe(v -> log.info("All complete"));

// Practical: Batch updates
public Mono<Void> updateUser(User user) {
    return Mono.when(
        userRepo.update(user),
        cacheService.invalidate(user.getId()),
        auditLog.log("UPDATE", user)
    );
}

// Practical: Conditional execution with and
public Mono<Void> processOrder(Order order) {
    return inventoryService.reserve(order)
        .flatMap(reservation -> 
            paymentService.charge(order)
                .and(shippingService.schedule(order))
                .then(Mono.just(reservation))
        )
        .flatMap(reservation -> 
            orderRepo.save(order)
                .and(notificationService.sendConfirmation(order))
        );
}

// Practical: when() with error handling
public Mono<Void> performOperations() {
    return Mono.when(
        operation1().doOnError(e -> log.error("Op1 failed", e)),
        operation2().doOnError(e -> log.error("Op2 failed", e)),
        operation3().onErrorResume(e -> Mono.empty()) // Ignore error
    );
}

// when() vs zip()
Mono<String> mono1 = Mono.just("A");
Mono<String> mono2 = Mono.just("B");

// when() - Ignore results
Mono.when(mono1, mono2).subscribe();

// zip() - Preserve results
Mono.zip(mono1, mono2)
    .map(tuple -> tuple.getT1() + tuple.getT2())
    .subscribe();`,note:`and() and when() are for void operations, zip() for preserving results.`},{id:51,topic:`Combination & Aggregation Operators`,question:`What is firstWithValue() and how does it help with fallback scenarios?`,answer:`firstWithValue(): Returns the first publisher that emits a value (ignores empty publishers).

Use firstWithValue() for:
1. Fallback strategies
2. Multiple data sources
3. Cache-first approaches
4. Race conditions between sources`,example:`// firstWithValue() - Use first that emits
Mono<String> primary = Mono.just("Primary Data").delayElement(Duration.ofSeconds(1));
Mono<String> fallback = Mono.just("Fallback Data").delayElement(Duration.ofSeconds(2));
Mono.firstWithValue(primary, fallback)
    .subscribe(System.out::println);
// Output: Primary Data (after 1s)

// Practical: Cache-first with fallback
public Mono<Data> getData(String key) {
    Mono<Data> cache = cacheService.get(key);
    Mono<Data> database = dbService.find(key);
    Mono<Data> external = externalService.fetch(key);
    
    return Mono.firstWithValue(
        cache,          // Try cache first
        database,       // Then database
        external        // Finally external
    );
}

// Practical: Fastest API wins
public Mono<Weather> getWeather(String city) {
    Mono<Weather> api1 = weatherApi1.get(city);
    Mono<Weather> api2 = weatherApi2.get(city);
    Mono<Weather> api3 = weatherApi3.get(city);
    
    return Mono.firstWithValue(api1, api2, api3)
        .timeout(Duration.ofSeconds(2))
        .onErrorResume(e -> getFallbackWeather(city));
}

// firstWithValue vs first
// first - Returns first to emit (including empty)
Mono.first(emptyMono, justMono)
    .subscribe(); // May get empty

// firstWithValue - Returns first with a value
Mono.firstWithValue(emptyMono, justMono)
    .subscribe(); // Skips empty

// Practical: Multiple database shards
public Mono<User> findUser(String id) {
    Mono<User> shard1 = shard1Repo.findById(id);
    Mono<User> shard2 = shard2Repo.findById(id);
    Mono<User> shard3 = shard3Repo.findById(id);
    
    return Mono.firstWithValue(shard1, shard2, shard3)
        .switchIfEmpty(Mono.error(new UserNotFoundException(id)));
}

// firstWithValue with timeouts
public Mono<Order> getOrder(String id) {
    return Mono.firstWithValue(
        orderCache.get(id).timeout(Duration.ofMillis(100)),
        orderDatabase.find(id).timeout(Duration.ofSeconds(1)),
        orderBackup.find(id).timeout(Duration.ofSeconds(5))
    ).onErrorResume(e -> orderArchive.find(id));
}`,note:`firstWithValue() is excellent for implementing fast-fallback strategies and caching.`},{id:52,topic:`Combination & Aggregation Operators`,question:`Explain the reduce() and scan() operators with examples.`,answer:`reduce(): Accumulates values into a single result. Emits only final result.

scan(): Accumulates values, emits each intermediate result.

Use reduce() for final aggregation, scan() for incremental processing.`,example:`// reduce() - Final result only
Flux.range(1, 5)
    .reduce(0, (acc, val) -> acc + val)
    .subscribe(System.out::println);
// Output: 15 (only final sum)

// scan() - Each intermediate result
Flux.range(1, 5)
    .scan(0, (acc, val) -> acc + val)
    .subscribe(System.out::println);
// Output: 0, 1, 3, 6, 10, 15 (each step)

// Practical: Running total
public Flux<Transaction> processTransactions(Flux<Transaction> transactions) {
    return transactions
        .scan(new Transaction(0, 0), (acc, tx) -> {
            acc.setBalance(acc.getBalance() + tx.getAmount());
            acc.setCount(acc.getCount() + 1);
            return acc;
        });
}

// Practical: Complex aggregation
public Mono<OrderStats> getOrderStats(Flux<Order> orders) {
    return orders
        .reduce(
            new OrderStats(),
            (stats, order) -> {
                stats.setTotalOrders(stats.getTotalOrders() + 1);
                stats.setTotalRevenue(stats.getTotalRevenue() + order.getAmount());
                if (order.getAmount() > stats.getMaxOrder()) {
                    stats.setMaxOrder(order.getAmount());
                }
                return stats;
            }
        );
}

// Practical: Running average with scan
public Flux<Double> getRunningAverage(Flux<Double> numbers) {
    return numbers
        .scan(
            new double[]{0, 0}, // [sum, count]
            (state, val) -> new double[]{state[0] + val, state[1] + 1}
        )
        .skip(1) // Skip initial state
        .map(state -> state[0] / state[1]);
}

// reduce vs collectList
Flux.range(1, 5)
    .reduce((a, b) -> a * b) // Product

Flux.range(1, 5)
    .collectList() // Collect all to list

// Performance: reduce vs scan
// reduce - O(1) memory, emits once
Flux.range(1, 1000000)
    .reduce(0, Integer::sum) // Memory efficient

// scan - O(1) memory, emits N times
Flux.range(1, 1000000)
    .scan(0, Integer::sum) // Memory efficient but more emissions`,note:`reduce() for final result, scan() for incremental progress.`},{id:53,topic:`Combination & Aggregation Operators`,question:`What is the collect() operator and how is it different from collectList()?`,answer:`collect(): Collects elements into a custom container using a supplier and accumulator.

collectList(): Specialized version for collecting into a List.

Use collect() for custom collections, collectList() for simple lists.`,example:`// collectList() - Simple list
Flux.range(1, 5)
    .collectList()
    .subscribe(System.out::println);
// Output: [1, 2, 3, 4, 5]

// collect() - Custom container
Flux.range(1, 5)
    .collect(
        HashSet::new, // Supplier
        (set, item) -> set.add(item) // Accumulator
    )
    .subscribe(System.out::println);
// Output: [1, 2, 3, 4, 5]

// collect() - More complex aggregation
Flux.just("A", "B", "C", "A", "B")
    .collect(
        HashMap<String, Integer>::new,
        (map, item) -> map.merge(item, 1, Integer::sum)
    )
    .subscribe(System.out::println);
// Output: {A=2, B=2, C=1}

// Practical: Custom object aggregation
public Mono<Map<String, Double>> sumByCategory(Flux<Transaction> transactions) {
    return transactions
        .collect(
            HashMap<String, Double>::new,
            (map, tx) -> map.merge(tx.getCategory(), tx.getAmount(), Double::sum)
        );
}

// Practical: Group by with collect
public Mono<Map<String, List<User>>> groupUsersByRole(Flux<User> users) {
    return users
        .collect(
            () -> new HashMap<String, List<User>>(),
            (map, user) -> {
                map.computeIfAbsent(user.getRole(), k -> new ArrayList<>())
                    .add(user);
            }
        );
}

// collect vs collectList performance
// collectList - Simpler but less flexible
Flux.range(1, 1000)
    .collectList();

// collect - More flexible but requires more code
Flux.range(1, 1000)
    .collect(
        ArrayList::new,
        List::add
    );

// collect with grouping
public Mono<Map<Category, Stats>> getCategoryStats(Flux<Product> products) {
    return products
        .collect(
            HashMap::new,
            (map, product) -> {
                map.computeIfAbsent(product.getCategory(), 
                    k -> new Stats())
                    .add(product);
            }
        );
}`,note:`collect() for custom containers, collectList() for simple lists.`},{id:54,topic:`Combination & Aggregation Operators`,question:`How does mergeSequential() differ from merge()?`,answer:`mergeSequential(): Merges publishers but preserves order. Waits for each publisher to complete before moving to next.

merge(): Emits as soon as data arrives, order not guaranteed.

Use mergeSequential() when order matters but you still want some concurrency.`,example:`// merge() - Interleaved, unordered
Flux<String> flux1 = Flux.just("A", "B").delayElements(Duration.ofMillis(100));
Flux<String> flux2 = Flux.just("C", "D").delayElements(Duration.ofMillis(100));
Flux.merge(flux1, flux2)
    .subscribe(System.out::println);
// Output: A, C, B, D (interleaved)

// mergeSequential() - Ordered
Flux.mergeSequential(flux1, flux2)
    .subscribe(System.out::println);
// Output: A, B, C, D (preserves order)

// Practical: Processing logs in order
public Flux<LogEntry> processLogs(Flux<LogEntry>... logStreams) {
    return Flux.mergeSequential(logStreams)
        .map(this::enrich)
        .onBackpressureBuffer();
}

// Practical: Sequential file processing
public Flux<String> processFiles(Flux<String> fileStreams) {
    return Flux.mergeSequential(
        fileStreams.map(file -> processFile(file))
    );
}

// Performance comparison
// merge() - Faster, no order guarantee
Flux.merge(
    Flux.just(1, 2, 3).delayElements(Duration.ofMillis(50)),
    Flux.just(4, 5, 6).delayElements(Duration.ofMillis(50))
);

// mergeSequential() - Slower, order guaranteed
Flux.mergeSequential(
    Flux.just(1, 2, 3).delayElements(Duration.ofMillis(50)),
    Flux.just(4, 5, 6).delayElements(Duration.ofMillis(50))
);

// With varying sizes
Flux<String> shortStream = Flux.just("Short: A", "Short: B");
Flux<String> longStream = Flux.just("Long: 1", "Long: 2")
    .delayElements(Duration.ofMillis(100));

// mergeSequential waits for long to complete
Flux.mergeSequential(shortStream, longStream)
    .subscribe();

// merge doesn't wait
Flux.merge(shortStream, longStream)
    .subscribe();`,note:`mergeSequential() for ordered merges, merge() for speed when order doesn't matter.`},{id:55,topic:`Combination & Aggregation Operators`,question:`Explain the join() and groupJoin() operators (if using Reactor with advanced features).`,answer:`join(): Combines elements from two publishers based on time windows.

groupJoin(): Similar to join but with grouping.

These are advanced operators used for time-based correlation of streams. Less common in typical applications.`,example:`// join() - Time-based correlation
Flux<String> left = Flux.just("A", "B").delayElements(Duration.ofSeconds(1));
Flux<Integer> right = Flux.just(1, 2).delayElements(Duration.ofSeconds(1));

left.join(
    right,
    s -> Mono.delay(Duration.ofSeconds(2)), // Left window
    r -> Mono.delay(Duration.ofSeconds(2)), // Right window
    (s, r) -> s + r
).subscribe(System.out::println);
// Output: A1, A2, B1, B2 (within time windows)

// groupJoin() - Grouped time-based correlation
left.groupJoin(
    right,
    s -> Mono.delay(Duration.ofSeconds(2)),
    r -> Mono.delay(Duration.ofSeconds(2)),
    (s, rightStream) -> 
        rightStream.map(r -> s + r)
)
.flatMap(flux -> flux)
.subscribe(System.out::println);
// Output: A1, A2, B1, B2

// Practical: Correlating events
public Flux<String> correlateEvents(
    Flux<Event> mainEvents,
    Flux<Event> secondaryEvents
) {
    return mainEvents.join(
        secondaryEvents,
        event -> Mono.delay(Duration.ofSeconds(5)), // 5s window
        event -> Mono.delay(Duration.ofSeconds(5)),
        (main, secondary) -> 
            main.getId() + ":" + secondary.getId()
    );
}

// Practical: Session correlation
public Flux<SessionData> correlateSessions(
    Flux<Login> logins,
    Flux<Activity> activities
) {
    return logins.groupJoin(
        activities,
        login -> Mono.delay(Duration.ofMinutes(30)), // Session timeout
        activity -> Mono.delay(Duration.ofMinutes(30)),
        (login, activityStream) -> 
            activityStream.map(activity -> 
                new SessionData(login, activity)
            )
    ).flatMap(flux -> flux);
}`,note:`join() and groupJoin() are for complex time-based correlations. Rarely needed in typical applications.`},{id:56,topic:`Error Management Strategies`,question:`What are the different error handling operators in Reactor? Categorize and explain them.`,answer:`Error handling operators in Reactor:

1. Recover: onErrorReturn, onErrorResume, onErrorMap
2. Continue: onErrorContinue
3. Fallback: switchIfEmpty, defaultIfEmpty
4. Retry: retry, retryWhen
5. Notification: doOnError, onErrorStop

Each serves different recovery strategies.`,example:`// 1. Recover with onErrorReturn
Flux.just(1, 2, 3)
    .concatWith(Flux.error(new RuntimeException("Error")))
    .onErrorReturn(0)
    .subscribe(System.out::println);
// Output: 1, 2, 3, 0

// 2. Recover with onErrorResume
Flux.just(1, 2)
    .concatWith(Flux.error(new RuntimeException("Error")))
    .onErrorResume(e -> Flux.just(3, 4))
    .subscribe(System.out::println);
// Output: 1, 2, 3, 4

// 3. Recover with onErrorMap
Flux.just(1)
    .concatWith(Flux.error(new RuntimeException("Original")))
    .onErrorMap(e -> new BusinessException("Business error", e))
    .subscribe();

// 4. Continue with onErrorContinue
Flux.just(1, 2, 3, 4)
    .map(i -> {
        if (i == 2) throw new RuntimeException("Error on 2");
        return i * 2;
    })
    .onErrorContinue((e, item) -> {
        log.warn("Failed on item: {}", item);
    })
    .subscribe(System.out::println);
// Output: 2, 6, 8 (skips 2)

// 5. Fallback with switchIfEmpty
Mono.empty()
    .switchIfEmpty(Mono.just("Fallback"))
    .subscribe();

// 6. Retry with retry
Flux.just("A", "B", "C")
    .concatWith(Flux.error(new RuntimeException("Error")))
    .retry(2) // Retry 2 times
    .subscribe();

// 7. Retry with retryWhen
Flux.just("A")
    .concatWith(Flux.error(new RuntimeException("Error")))
    .retryWhen(Retry.backoff(3, Duration.ofSeconds(1)))
    .subscribe();

// 8. doOnError - Side effect
Flux.just(1)
    .concatWith(Flux.error(new RuntimeException("Error")))
    .doOnError(e -> log.error("Error occurred", e))
    .onErrorReturn(0)
    .subscribe();`,note:`Choose error operator based on recovery strategy: return value, alternative stream, or retry.`},{id:57,topic:`Error Management Strategies`,question:`Explain the difference between onErrorReturn(), onErrorResume(), onErrorMap(), and onErrorContinue().`,answer:`onErrorReturn(): Replaces error with a default value.

onErrorResume(): Replaces error with another publisher.

onErrorMap(): Transforms the error to a different exception.

onErrorContinue(): Continues processing, skipping the failed item.`,example:`// onErrorReturn() - Return default value
Flux.just(1, 2, 3)
    .concatWith(Flux.error(new RuntimeException("Error")))
    .onErrorReturn(0)
    .subscribe(System.out::println);
// Output: 1, 2, 3, 0

// onErrorResume() - Return alternative stream
Flux.just(1, 2)
    .concatWith(Flux.error(new RuntimeException("Error")))
    .onErrorResume(e -> Flux.just(3, 4))
    .subscribe(System.out::println);
// Output: 1, 2, 3, 4

// onErrorMap() - Transform error
Flux.just(1)
    .concatWith(Flux.error(new RuntimeException("DB Error")))
    .onErrorMap(e -> new ServiceException("Service failed", e))
    .subscribe();

// onErrorContinue() - Skip failed item
Flux.just(1, 2, 3)
    .map(i -> {
        if (i == 2) throw new RuntimeException("Invalid");
        return i * 2;
    })
    .onErrorContinue((e, item) -> {
        log.warn("Skipping item {}: {}", item, e.getMessage());
    })
    .subscribe(System.out::println);
// Output: 2, 6 (skips item 2)

// Practical: Different strategies
public class ErrorHandlingService {
    // Simple fallback
    public Mono<String> getWithDefault(String id) {
        return repository.findById(id)
            .map(User::getName)
            .onErrorReturn("Default User");
    }
    
    // Alternative stream
    public Flux<Order> getOrders(String userId) {
        return cache.getOrders(userId)
            .onErrorResume(e -> {
                log.warn("Cache failed, falling back to DB");
                return database.getOrders(userId);
            });
    }
    
    // Error transformation
    public Mono<Void> saveUser(User user) {
        return repository.save(user)
            .onErrorMap(e -> new DataValidationException("Invalid user", e))
            .then();
    }
    
    // Skip invalid
    public Flux<Processed> processBatch(Flux<Data> data) {
        return data
            .map(this::transform)
            .onErrorContinue((e, item) -> {
                metrics.increment("skip", item.toString());
                log.warn("Skipping invalid item", e);
            });
    }
}`,note:`Choose based on recovery need: value, stream, transform, or skip.`},{id:58,topic:`Error Management Strategies`,question:`What is the difference between onExceptionResumeNext() and onErrorResume()?`,answer:`onErrorResume(): Handles any error (Throwable).

onExceptionResumeNext(): Only handles exceptions (non-Error). Does NOT handle fatal errors.

Use onExceptionResumeNext() when you want to continue on business errors but not on JVM errors.`,example:`// onErrorResume() - Handles all Throwable
Mono.just("Data")
    .map(s -> {
        if (true) throw new RuntimeException("Error");
        return s;
    })
    .onErrorResume(e -> Mono.just("Fallback"))
    .subscribe();
// Works for all errors

// onExceptionResumeNext() - Only handles Exception
Mono.just("Data")
    .map(s -> {
        throw new RuntimeException("Runtime error");
    })
    .onExceptionResumeNext(e -> Mono.just("Fallback"))
    .subscribe();
// Catches RuntimeException

// Does NOT handle Error
Mono.just("Data")
    .map(s -> {
        throw new OutOfMemoryError("JVM Error");
    })
    .onExceptionResumeNext(e -> Mono.just("Fallback"))
    .subscribe(); // Falls through!

// Practical: Safe error handling
public Mono<User> getUsers(String id) {
    return repository.findById(id)
        .onExceptionResumeNext(e -> {
            // Only catches business exceptions
            if (e instanceof DataAccessException) {
                return repository.findByBackup(id);
            }
            // Let JVM errors propagate
            return Mono.error(e);
        });
}

// onExceptionResumeNext vs onErrorResume
// onErrorResume - Catch all
Mono.error(new RuntimeException())
    .onErrorResume(e -> Mono.just("Caught"));

// onExceptionResumeNext - Catch exceptions only
Mono.error(new OutOfMemoryError())
    .onExceptionResumeNext(e -> Mono.just("Not caught"));`,note:`onExceptionResumeNext() only handles Exception, not Error. Use for business errors.`},{id:59,topic:`Error Management Strategies`,question:`How do you implement retry logic in Reactor? Explain retry(), retryWhen(), and Retry class.`,answer:`retry(): Simple retry with fixed attempts.

retryWhen(): Advanced retry with custom logic (backoff, conditions).

Retry class: Builder for retry specifications.`,example:`// retry() - Simple fixed retry
Flux.just(1, 2, 3)
    .concatWith(Flux.error(new RuntimeException("Error")))
    .retry(2) // Retry 2 times
    .subscribe(
        System.out::println,
        err -> System.out.println("Failed after retries")
    );
// Output: 1, 2, 3, 1, 2, 3, 1, 2, 3, Failed after retries

// retryWhen() - Custom retry with backoff
Flux.just(1)
    .concatWith(Flux.error(new RuntimeException("Error")))
    .retryWhen(Retry.backoff(3, Duration.ofSeconds(1)))
    .subscribe();

// Retry with exponential backoff
Retry retrySpec = Retry.backoff(5, Duration.ofSeconds(1))
    .maxBackoff(Duration.ofSeconds(10))
    .jitter(0.2)
    .filter(throwable -> throwable instanceof TimeoutException);

Flux.just("Data")
    .flatMap(this::callExternal)
    .retryWhen(retrySpec)
    .subscribe();

// Practical: API with retry
public Mono<Response> callWithRetry() {
    return webClient.get()
        .uri("/api/data")
        .retrieve()
        .bodyToMono(Response.class)
        .retryWhen(Retry.backoff(3, Duration.ofSeconds(1))
            .maxBackoff(Duration.ofSeconds(5))
            .filter(throwable -> 
                throwable instanceof TimeoutException ||
                throwable instanceof ServiceUnavailableException
            )
            .doBeforeRetry(rs -> 
                log.warn("Retrying attempt: {}", rs.totalRetries())
            )
        );
}

// Custom retry logic
public Mono<String> customRetry() {
    return Mono.defer(() -> callService())
        .retryWhen(Retry.from(companion -> 
            companion
                .doOnNext(retrySignal -> 
                    log.info("Retry {}: {}", 
                        retrySignal.totalRetries(), 
                        retrySignal.failure()
                    )
                )
                .flatMap(retrySignal -> 
                    Mono.delay(Duration.ofSeconds(Math.pow(2, retrySignal.totalRetries())))
                )
        ));
}`,note:`Use retryWhen() for advanced retry with backoff, filtering, and conditions.`},{id:60,topic:`Error Management Strategies`,question:`Implement exponential backoff with jitter using retryWhen().`,answer:`Exponential backoff: Doubles delay with each retry.

Jitter: Adds randomness to prevent thundering herd.

Use exponential backoff with jitter to gracefully handle transient failures.`,example:`// Exponential backoff with jitter
public Mono<String> callWithExponentialBackoff() {
    return Mono.defer(() -> externalService.call())
        .retryWhen(Retry
            .backoff(5, Duration.ofMillis(100))
            .maxBackoff(Duration.ofSeconds(5))
            .jitter(0.2) // 20% jitter
            .filter(throwable -> throwable instanceof TimeoutException)
            .doBeforeRetry(rs -> {
                long backoffMs = (long) (100 * Math.pow(2, rs.totalRetries()) 
                    * (1 + 0.2 * Math.random()));
                log.info("Retry {} after {} ms", 
                    rs.totalRetries() + 1, backoffMs);
            })
        );
}

// Custom implementation
public Mono<String> customBackoffRetry() {
    return Mono.defer(() -> callService())
        .retryWhen(Retry.from(companion -> 
            companion
                .zipWith(Flux.range(1, 5), 
                    (signal, attempt) -> attempt
                )
                .flatMap(attempt -> {
                    long delay = (long) (Math.pow(2, attempt - 1) * 1000 
                        + (Math.random() * 200));
                    log.info("Retry attempt {} after {}ms", attempt, delay);
                    return Mono.delay(Duration.ofMillis(delay));
                })
        ));
}

// Practical: Database connection retry
public Mono<Connection> getDatabaseConnection() {
    return Mono.defer(() -> 
        connectionPool.getConnection()
    ).retryWhen(Retry
        .backoff(10, Duration.ofMillis(100))
        .maxBackoff(Duration.ofSeconds(10))
        .jitter(0.3)
        .filter(throwable -> 
            throwable instanceof SQLException &&
            ((SQLException) throwable).getSQLState().startsWith("08") // Connection errors
        )
        .doBeforeRetry(rs -> 
            log.warn("DB connection retry {}", rs.totalRetries() + 1)
        )
    );
}

// Retry with different backoff per error type
public Mono<Response> smartRetry() {
    return Mono.defer(() -> callAPI())
        .retryWhen(Retry.from(companion ->
            companion
                .flatMap(signal -> {
                    Throwable error = signal.failure();
                    int attempt = signal.totalRetries() + 1;
                    
                    if (error instanceof RateLimitException) {
                        return Mono.delay(Duration.ofSeconds(attempt * 10));
                    } else if (error instanceof TimeoutException) {
                        return Mono.delay(Duration.ofMillis(100 * attempt));
                    } else {
                        return Mono.error(error);
                    }
                })
        ));
}`,note:`Exponential backoff with jitter is essential for resilient systems.`},{id:61,topic:`Error Management Strategies`,question:`What is the difference between error handling in a flatMap() vs at the stream level?`,answer:`Within flatMap(): Error is scoped to the inner publisher. Can continue processing other items.

At stream level: Error affects the entire stream. Processing stops on error.

Choose based on whether failure of one item should affect others.`,example:`// Stream-level error - Stops on first error
Flux.just(1, 2, 3)
    .flatMap(i -> {
        if (i == 2) throw new RuntimeException("Error");
        return Mono.just(i * 2);
    })
    .onErrorReturn(-1)
    .subscribe(System.out::println);
// Output: 2, -1 (stops on 2)

// Inside flatMap - Continues processing
Flux.just(1, 2, 3)
    .flatMap(i -> 
        Mono.fromCallable(() -> {
            if (i == 2) throw new RuntimeException("Error");
            return i * 2;
        })
        .onErrorResume(e -> Mono.just(-1))
    )
    .subscribe(System.out::println);
// Output: 2, -1, 6 (continues all items)

// Practical: Batch processing with errors
public class BatchProcessor {
    public Flux<Result> processAll(Flux<Item> items) {
        // Stream-level error - fails entire batch
        return items
            .flatMap(this::processItem)
            .onErrorResume(e -> Mono.just(Result.failed()));
    }
    
    public Flux<Result> processWithPerItemError(Flux<Item> items) {
        // Per-item error - continues processing
        return items
            .flatMap(item -> 
                processItem(item)
                    .onErrorResume(e -> {
                        log.warn("Item {} failed: {}", item.getId(), e.getMessage());
                        return Mono.just(Result.skipped(item.getId()));
                    })
            );
    }
}

// Multiple error handling strategies
public Flux<Data> processWithMixedErrors(Flux<Data> input) {
    return input
        .flatMap(data -> 
            validate(data) // Inner error handling
                .flatMap(this::enrich)
                .onErrorResume(ValidationException.class, 
                    e -> Mono.just(getDefaultData()))
                .doOnError(IOException.class, 
                    e -> log.error("IO error on data: {}", data))
        )
        .onErrorResume(throwable -> 
            // Stream-level fallback for catastrophic errors
            Flux.just(Data.EMERGENCY_FALLBACK)
        );
}`,note:`Inner flatMap error handling for per-item resilience, stream-level for overall fallback.`},{id:62,topic:`Error Management Strategies`,question:`How do you handle errors differently in Mono vs Flux?`,answer:`Mono and Flux handle errors similarly but with some differences:

Mono: Single value, error terminates the stream.

Flux: Multiple values, can continue after error using onErrorContinue.

Both support retry, fallback, and error transformation.`,example:`// Mono error handling
Mono.just("Data")
    .map(s -> {
        throw new RuntimeException("Error");
    })
    .onErrorReturn("Fallback")
    .subscribe(System.out::println);
// Output: Fallback

// Mono with flatMap error
Mono.just("Data")
    .flatMap(s -> 
        Mono.error(new RuntimeException("Error"))
    )
    .onErrorResume(e -> Mono.just("Recovered"))
    .subscribe();

// Flux error handling - Stops on error by default
Flux.just(1, 2, 3, 4)
    .map(i -> {
        if (i == 2) throw new RuntimeException("Error");
        return i;
    })
    .onErrorReturn(0)
    .subscribe(System.out::println);
// Output: 1, 0 (stops on 2)

// Flux with onErrorContinue - Continues
Flux.just(1, 2, 3, 4)
    .map(i -> {
        if (i == 2) throw new RuntimeException("Error");
        return i;
    })
    .onErrorContinue((e, item) -> 
        log.warn("Error on item: {}", item))
    .subscribe(System.out::println);
// Output: 1, 3, 4 (skips 2)

// Practical: Flux error handling in batch processing
public class FluxErrorHandling {
    // Stream stops on error
    public Flux<Result> processBatch1(Flux<Item> items) {
        return items
            .map(this::transform)
            .onErrorResume(e -> Flux.just(Result.ERROR));
    }
    
    // Continue processing on error
    public Flux<Result> processBatch2(Flux<Item> items) {
        return items
            .map(this::transform)
            .onErrorContinue((e, item) -> {
                log.error("Failed to process: {}", item);
                errorMetrics.increment();
            });
    }
    
    // Different error strategies per error type
    public Flux<Result> processBatch3(Flux<Item> items) {
        return items
            .flatMap(item -> 
                transform(item)
                    .onErrorResume(ValidationException.class, 
                        e -> Mono.just(Result.invalid()))
                    .onErrorResume(RetryableException.class,
                        e -> Mono.just(Result.retryLater()))
                    .doOnError(IOException.class,
                        e -> log.error("IO Error on item: {}", item))
            )
            .onErrorResume(CriticalException.class,
                e -> Flux.error(new SystemException(e))
            );
    }
}`,note:`Use onErrorContinue for Flux to skip failed items, onErrorReturn for simple fallback.`},{id:63,topic:`Error Management Strategies`,question:`What is the doOnError() operator and how is it different from onErrorResume()?`,answer:`doOnError(): Side-effect operator that executes when an error occurs but doesn't consume/handle the error.

onErrorResume(): Handles the error by providing an alternative publisher.

Use doOnError() for logging/metrics, onErrorResume() for recovery.`,example:`// doOnError() - Side effect only
Flux.just(1, 2)
    .concatWith(Flux.error(new RuntimeException("Error")))
    .doOnError(e -> System.out.println("Logging: " + e.getMessage()))
    .subscribe(
        System.out::println,
        e -> System.out.println("Error propagated: " + e)
    );
// Output: 1, 2, Logging: Error, Error propagated: Error

// onErrorResume() - Handles error
Flux.just(1, 2)
    .concatWith(Flux.error(new RuntimeException("Error")))
    .onErrorResume(e -> {
        System.out.println("Recovering from: " + e);
        return Flux.just(3, 4);
    })
    .subscribe(System.out::println);
// Output: 1, 2, Recovering from: Error, 3, 4

// doOnError() for monitoring
public Mono<User> getUserWithMetrics(String id) {
    return userRepo.findById(id)
        .doOnError(e -> {
            metrics.increment("user.get.error");
            log.error("Failed to get user: {}", id, e);
        })
        .onErrorResume(e -> {
            // Still need to handle the error
            return userCache.get(id)
                .switchIfEmpty(Mono.error(e));
        });
}

// Multiple doOnError
Mono.just("Data")
    .map(s -> {
        throw new RuntimeException("Error");
    })
    .doOnError(e -> System.out.println("First handler"))
    .doOnError(e -> System.out.println("Second handler"))
    .onErrorReturn("Fallback")
    .subscribe();

// doOnError vs onErrorResume
// doOnError - Side effect, doesn't change error
Mono.error(new RuntimeException())
    .doOnError(e -> log.info("Error occurred", e))
    .subscribe(); // Still fails

// onErrorResume - Handles error
Mono.error(new RuntimeException())
    .onErrorResume(e -> {
        log.info("Error occurred", e);
        return Mono.just("Recovered");
    })
    .subscribe(); // Success

// Practical: Monitoring and recovery
public class Service {
    public Mono<Response> process(Request request) {
        return callExternal(request)
            .doOnError(e -> 
                errorCounter.increment()
            )
            .doOnError(e -> 
                log.error("External call failed", e)
            )
            .doOnError(TimeoutException.class, 
                e -> timeoutCounter.increment()
            )
            .onErrorResume(TimeoutException.class,
                e -> retryWithBackoff(request)
            )
            .onErrorResume(e -> 
                // Fallback for any remaining errors
                cache.get(request.getId())
            );
    }
}`,note:`doOnError() for side effects (logging, metrics), onErrorResume() for recovery.`},{id:64,topic:`Threading & Concurrency Management`,question:`What are Schedulers in Reactor? Explain the built-in schedulers.`,answer:`Schedulers control threading in Reactor. Built-in schedulers:

1. immediate(): Current thread (no context switch)
2. single(): Single reusable thread
3. parallel(): Fixed pool (CPU cores)
4. boundedElastic(): Elastic pool (I/O operations)
5. newParallel(): New parallel pool
6. newSingle(): New single thread`,example:`// Schedulers.immediate() - Execute on current thread
Flux.range(1, 3)
    .publishOn(Schedulers.immediate())
    .subscribeOn(Schedulers.immediate())
    .subscribe();
// Runs on main thread

// Schedulers.single() - Single reusable thread
Flux.range(1, 3)
    .subscribeOn(Schedulers.single())
    .subscribe();
// All on same thread

// Schedulers.parallel() - CPU-bound work
Flux.range(1, 100)
    .parallel(4)
    .runOn(Schedulers.parallel())
    .map(i -> heavyComputation(i))
    .sequential()
    .subscribe();

// Schedulers.boundedElastic() - I/O operations
Mono.fromCallable(() -> {
    // Blocking I/O operation
    return dbCall();
})
.subscribeOn(Schedulers.boundedElastic())
.subscribe();

// Schedulers.newParallel() - Custom parallel
Scheduler customParallel = Schedulers.newParallel("custom-pool", 10);

// Practical: Choosing the right scheduler
public class SchedulerChooser {
    // CPU-bound work
    public Flux<Integer> cpuIntensive(Flux<Integer> input) {
        return input
            .parallel()
            .runOn(Schedulers.parallel())
            .map(this::compute)
            .sequential();
    }
    
    // I/O-bound work
    public Mono<String> ioIntensive() {
        return Mono.fromCallable(this::blockingIO)
            .subscribeOn(Schedulers.boundedElastic());
    }
    
    // Real-time processing
    public Flux<Event> realTime(Flux<Event> events) {
        return events
            .publishOn(Schedulers.single())
            .map(this::processInOrder);
    }
}`,note:`Choose scheduler based on workload: parallel for CPU, boundedElastic for I/O.`},{id:65,topic:`Threading & Concurrency Management`,question:`When to use boundedElastic() vs parallel() vs single()? Provide scenarios.`,answer:`boundedElastic(): I/O operations, blocking calls, database queries

parallel(): CPU-intensive operations, computations

single(): Ordered processing, event loops, UI updates

Choose based on operation type and requirements.`,example:`// boundedElastic() - I/O operations
public Mono<User> fetchUser(String id) {
    return Mono.fromCallable(() -> 
        // Blocking JDBC call
        jdbcTemplate.queryForObject("SELECT * FROM users WHERE id = ?", id)
    )
    .subscribeOn(Schedulers.boundedElastic());
}

// parallel() - CPU-intensive
public Flux<Integer> processLargeDataset(Flux<Integer> data) {
    return data
        .parallel(4) // Use 4 threads
        .runOn(Schedulers.parallel())
        .map(this::complexCalculation) // CPU-bound
        .sequential();
}

// single() - Ordered processing
public Flux<Event> processEvents(Flux<Event> events) {
    return events
        .publishOn(Schedulers.single())
        .map(this::processInOrder)
        .doOnNext(event -> updateUI(event));
}

// Practical: Mixed workloads
public class WorkloadManager {
    public Mono<Result> process(Request request) {
        // I/O: Fetch data
        Mono<Data> data = Mono.fromCallable(() -> 
            database.fetch(request)
        ).subscribeOn(Schedulers.boundedElastic());
        
        // CPU: Process data
        Mono<Processed> processed = data
            .publishOn(Schedulers.parallel())
            .map(this::processData);
        
        // I/O: Save and return
        return processed
            .flatMap(p -> 
                Mono.fromCallable(() -> 
                    database.save(p)
                ).subscribeOn(Schedulers.boundedElastic())
            )
            .publishOn(Schedulers.single())
            .map(result -> new Result(result));
    }
}

// Performance comparison
public void benchmarkSchedulers() {
    // I/O bound: boundedElastic wins
    long ioStart = System.currentTimeMillis();
    Flux.range(1, 1000)
        .flatMap(i -> Mono.fromCallable(() -> sleep(100))
            .subscribeOn(Schedulers.boundedElastic()))
        .blockLast();
    System.out.println("I/O time: " + (System.currentTimeMillis() - ioStart));
    
    // CPU bound: parallel wins
    long cpuStart = System.currentTimeMillis();
    Flux.range(1, 1000)
        .parallel()
        .runOn(Schedulers.parallel())
        .map(i -> fib(i))
        .sequential()
        .blockLast();
    System.out.println("CPU time: " + (System.currentTimeMillis() - cpuStart));
}`,note:`Match scheduler to workload type for optimal performance.`},{id:66,topic:`Threading & Concurrency Management`,question:`Explain the critical difference between subscribeOn() and publishOn() with diagrams and code.`,answer:`subscribeOn(): Affects the subscription execution context (where subscribe runs).

publishOn(): Affects the execution context for downstream operators.

subscribeOn applies once (nearest upstream), publishOn applies to everything after it.`,example:`// subscribeOn() - Execution context for whole stream
Flux.just(1, 2, 3)
    .subscribeOn(Schedulers.boundedElastic())
    .map(i -> i * 2)
    .subscribe();
// All operations run on boundedElastic

// publishOn() - Changes downstream context
Flux.just(1, 2, 3)
    .publishOn(Schedulers.boundedElastic())
    .map(i -> i * 2) // Runs on boundedElastic
    .publishOn(Schedulers.parallel())
    .map(i -> i + 1) // Runs on parallel
    .subscribe();

// subscribeOn with multiple
Flux.just(1, 2, 3)
    .subscribeOn(Schedulers.boundedElastic())
    .map(i -> i * 2)
    .subscribeOn(Schedulers.parallel()) // Ignored!
    .subscribe();

// Practical: Proper scheduler usage
public class SchedulerExample {
    public Mono<String> process() {
        return Mono.fromCallable(() -> {
            // I/O operation
            return fetchData();
        })
        .subscribeOn(Schedulers.boundedElastic()) // I/O thread
        .map(data -> {
            // CPU operation
            return transformData(data);
        })
        .publishOn(Schedulers.parallel()) // CPU thread
        .map(result -> {
            // Another CPU operation
            return enrichResult(result);
        })
        .publishOn(Schedulers.single()) // Single thread for final
        .map(result -> formatResult(result));
    }
}

// subscribeOn() - Only affects initial subscription
Flux.range(1, 10)
    .subscribeOn(Schedulers.boundedElastic())
    .map(i -> Thread.currentThread().getName())
    .publishOn(Schedulers.parallel())
    .map(name -> "Parallel: " + name)
    .subscribe(System.out::println);`,note:`subscribeOn controls where subscription happens, publishOn controls where operators run.`},{id:67,topic:`Threading & Concurrency Management`,question:`What happens when you chain multiple subscribeOn() operators?`,answer:`Only the first subscribeOn() before the publisher matters. Subsequent subscribeOn() calls are ignored. This is because subscribeOn affects the subscription at the source.`,example:`// Multiple subscribeOn - Only first matters
Flux.just(1, 2, 3)
    .subscribeOn(Schedulers.boundedElastic())
    .map(i -> {
        System.out.println("Map 1: " + Thread.currentThread().getName());
        return i * 2;
    })
    .subscribeOn(Schedulers.parallel()) // This is IGNORED
    .map(i -> {
        System.out.println("Map 2: " + Thread.currentThread().getName());
        return i + 1;
    })
    .subscribeOn(Schedulers.single()) // This is also IGNORED
    .subscribe();
// Both maps run on boundedElastic

// publishOn can override downstream
Flux.just(1, 2, 3)
    .subscribeOn(Schedulers.boundedElastic())
    .map(i -> Thread.currentThread().getName())
    .publishOn(Schedulers.parallel()) // Override downstream
    .map(name -> "Parallel: " + name)
    .publishOn(Schedulers.single()) // Override further
    .map(name -> "Single: " + name)
    .subscribe();

// Practical: When to use multiple subscribeOn
public Mono<String> processData() {
    return Mono.fromCallable(() -> {
        // This runs on boundedElastic
        return fetchData();
    })
    .subscribeOn(Schedulers.boundedElastic())
    .flatMap(data -> 
        Mono.fromCallable(() -> {
            // This still runs on boundedElastic
            return transformData(data);
        })
        .subscribeOn(Schedulers.parallel()) // Ignored
    )
    .map(result -> 
        // Still on boundedElastic
        formatResult(result)
    );
}

// Multiple subscribeOn with different sources
Mono<String> source1 = Mono.fromCallable(() -> "Source1")
    .subscribeOn(Schedulers.boundedElastic());

Mono<String> source2 = Mono.fromCallable(() -> "Source2")
    .subscribeOn(Schedulers.parallel());

Flux.concat(source1, source2)
    .subscribe(); // Both maintain their own schedulers`,note:`Only first subscribeOn matters. Use publishOn for downstream context changes.`},{id:68,topic:`Threading & Concurrency Management`,question:`How does the parallel() operator work? When should you use it?`,answer:`parallel() converts a Flux into a ParallelFlux, which can run operations on multiple threads. Use parallel() for CPU-intensive tasks that can be processed independently.`,example:`// parallel() - Basic usage
Flux.range(1, 20)
    .parallel(4) // 4 parallel rails
    .runOn(Schedulers.parallel())
    .map(i -> {
        System.out.println("Processing: " + i + " on " + 
            Thread.currentThread().getName());
        return i * 2;
    })
    .sequential() // Back to normal Flux
    .subscribe(System.out::println);

// parallel() for heavy computation
public Flux<Result> processData(Flux<Data> data) {
    return data
        .parallel(4)
        .runOn(Schedulers.parallel())
        .map(this::complexCalculation)
        .sequential()
        .doOnComplete(() -> log.info("Processing complete"));
}

// parallel() vs flatMap
// parallel() - Better for CPU-bound work
Flux.range(1, 1000)
    .parallel(8)
    .runOn(Schedulers.parallel())
    .map(this::cpuIntensive)
    .sequential();

// flatMap() - Better for I/O-bound work
Flux.range(1, 1000)
    .flatMap(i -> 
        Mono.fromCallable(() -> ioIntensive(i))
            .subscribeOn(Schedulers.boundedElastic())
    , 8); // 8 concurrent

// Practical: Parallel processing of large dataset
public class ParallelProcessor {
    public Flux<Processed> processLargeDataset(Flux<Record> records) {
        return records
            .parallel(4)
            .runOn(Schedulers.parallel())
            .map(record -> {
                // Heavy CPU work
                return processRecord(record);
            })
            .sequential()
            .onErrorContinue((e, item) -> {
                log.error("Failed to process record: {}", item, e);
            });
    }
}

// parallel() with grouping
Flux.range(1, 100)
    .parallel(4)
    .runOn(Schedulers.parallel())
    .filter(i -> i % 2 == 0)
    .map(i -> i * 10)
    .sequential()
    .subscribe();
// Note: filter and map run in parallel`,note:`Use parallel() for CPU-bound work. Use flatMap() with concurrency for I/O-bound work.`},{id:69,topic:`Threading & Concurrency Management`,question:`Demonstrate how to use Schedulers for CPU-intensive vs I/O-bound operations.`,answer:`CPU-intensive: Use parallel() scheduler for maximum CPU utilization.

I/O-bound: Use boundedElastic() scheduler for many concurrent I/O operations.

Mixed: Combine both for optimal performance.`,example:`// CPU-intensive operations
public Flux<Integer> cpuIntensiveWork(Flux<Integer> input) {
    return input
        .parallel(4) // Number of CPU cores
        .runOn(Schedulers.parallel())
        .map(this::heavyComputation)
        .sequential()
        .doOnComplete(() -> log.info("CPU work complete"));
}

// I/O-bound operations
public Flux<String> ioIntensiveWork(Flux<String> input) {
    return input
        .flatMap(item -> 
            Mono.fromCallable(() -> {
                // Blocking I/O
                Thread.sleep(100);
                return item.toUpperCase();
            })
            .subscribeOn(Schedulers.boundedElastic())
        );
}

// Mixed operations
public Mono<Result> mixedWorkload(Request request) {
    // Step 1: I/O - Fetch data
    Mono<Data> data = Mono.fromCallable(() -> 
        database.fetch(request)
    )
    .subscribeOn(Schedulers.boundedElastic());
    
    // Step 2: CPU - Process data
    Mono<Processed> processed = data
        .publishOn(Schedulers.parallel())
        .map(this::processData);
    
    // Step 3: I/O - Save result
    return processed
        .flatMap(result -> 
            Mono.fromCallable(() -> 
                database.save(result)
            )
            .subscribeOn(Schedulers.boundedElastic())
        );
}

// Practical: Web controller with mixed workloads
@RestController
public class MixedWorkloadController {
    
    @GetMapping("/data/{id}")
    public Mono<Response> getData(@PathVariable String id) {
        // I/O: Database
        Mono<Record> record = Mono.fromCallable(() -> 
            repository.findById(id)
        ).subscribeOn(Schedulers.boundedElastic());
        
        // CPU: Processing
        Mono<Processed> processed = record
            .publishOn(Schedulers.parallel())
            .map(this::enrichData);
        
        // I/O: External API
        return processed
            .flatMap(p -> 
                webClient.post()
                    .uri("/api/enrich")
                    .bodyValue(p)
                    .retrieve()
                    .bodyToMono(Response.class)
                    .subscribeOn(Schedulers.boundedElastic())
            );
    }
}

// Performance monitoring
public class SchedulerMonitor {
    public void logSchedulerInfo() {
        log.info("Parallel threads: {}", 
            Schedulers.parallel().schedule(() -> {})
        );
        log.info("BoundedElastic threads: {}", 
            Schedulers.boundedElastic().schedule(() -> {})
        );
    }
}`,note:`Use parallel() for CPU, boundedElastic() for I/O, and switch between them for mixed workloads.`},{id:70,topic:`Threading & Concurrency Management`,question:`What is Schedulers.fromExecutor() and when would you use it?`,answer:`Schedulers.fromExecutor() creates a Reactor Scheduler from an existing Executor. Use it to integrate with existing thread pools, maintain thread affinity, or use custom thread configurations.`,example:`// Creating scheduler from existing executor
Executor executor = Executors.newFixedThreadPool(10);
Scheduler scheduler = Schedulers.fromExecutor(executor);

Flux.range(1, 5)
    .subscribeOn(scheduler)
    .subscribe();

// From ExecutorService
ExecutorService executorService = Executors.newCachedThreadPool();
Scheduler customScheduler = Schedulers.fromExecutorService(executorService);

// Custom thread factory
ThreadFactory threadFactory = new ThreadFactory() {
    private final AtomicInteger counter = new AtomicInteger(0);
    
    @Override
    public Thread newThread(Runnable r) {
        Thread thread = new Thread(r);
        thread.setName("custom-pool-" + counter.incrementAndGet());
        thread.setDaemon(true);
        thread.setPriority(Thread.NORM_PRIORITY);
        return thread;
    }
};

ExecutorService customExecutor = Executors.newFixedThreadPool(
    10, 
    threadFactory
);
Scheduler customPool = Schedulers.fromExecutor(customExecutor);

// Practical: Integrating with existing thread pool
@Service
public class LegacyIntegrationService {
    private final ExecutorService legacyExecutor = 
        Executors.newFixedThreadPool(20);
    
    private final Scheduler legacyScheduler = 
        Schedulers.fromExecutor(legacyExecutor);
    
    public Mono<String> callLegacySystem(String input) {
        return Mono.fromCallable(() -> 
            legacySystem.process(input)
        )
        .subscribeOn(legacyScheduler);
    }
}

// Practical: Custom thread pool for specific workload
public class CustomSchedulerConfig {
    public Scheduler taskScheduler() {
        ThreadFactory threadFactory = new ThreadFactoryBuilder()
            .setNameFormat("task-pool-%d")
            .setDaemon(true)
            .setPriority(Thread.MAX_PRIORITY)
            .setUncaughtExceptionHandler((t, e) -> 
                log.error("Uncaught in thread: {}", t.getName(), e)
            )
            .build();
            
        ExecutorService executor = Executors.newFixedThreadPool(
            20, 
            threadFactory
        );
        
        return Schedulers.fromExecutor(executor);
    }
}`,note:`Use fromExecutor() to integrate Reactor with existing thread pools.`},{id:71,topic:`Threading & Concurrency Management`,question:`Explain thread affinity in reactive programming.`,answer:`Thread affinity means certain operations are guaranteed to run on the same thread. In Reactor, this is important for:

1. Thread-local variables (e.g., security context)
2. Database connections
3. Event ordering
4. UI updates`,example:`// Thread-local variables with affinity
public class ThreadLocalExample {
    private static final ThreadLocal<String> context = new ThreadLocal<>();
    
    public Mono<String> process() {
        return Mono.fromCallable(() -> {
            // This runs on the same thread
            context.set("user-context");
            return "Processing";
        })
        .subscribeOn(Schedulers.single()) // Same thread for all
        .map(result -> {
            String user = context.get(); // Still on same thread
            return user + ": " + result;
        });
    }
}

// Ensuring thread affinity with publishOn
public class AffinityExample {
    // Database connection affinity
    public Mono<Result> withConnectionAffinity() {
        Connection connection = getConnection();
        return Mono.fromCallable(() -> 
            connection.execute("SELECT * FROM users")
        )
        .subscribeOn(Schedulers.single()) // Same thread for connection
        .map(result -> new Result(result))
        .doFinally(signal -> {
            // Cleanup on same thread
            connection.close();
        });
    }
    
    // Event ordering with thread affinity
    public void eventOrdering(Flux<Event> events) {
        events
            .publishOn(Schedulers.single()) // Single thread preserves order
            .subscribe(event -> {
                // Events processed in order on same thread
                processEvent(event);
            });
    }
}

// Practical: Security context propagation
public class SecurityAffinity {
    public Mono<User> getCurrentUser() {
        return Mono.fromCallable(() -> {
            // SecurityContextHolder relies on thread-local
            return SecurityContextHolder.getContext().getAuthentication();
        })
        .subscribeOn(Schedulers.boundedElastic()) // Same thread
        .map(auth -> (User) auth.getPrincipal());
    }
}

// Managing thread affinity with context
public class ContextPropagation {
    public Mono<Void> withContext(String user) {
        return Mono.subscriberContext()
            .flatMap(ctx -> {
                String currentUser = ctx.get("user");
                return Mono.fromCallable(() -> 
                    processWithUser(currentUser)
                );
            })
            .subscribeOn(Schedulers.single())
            .then();
    }
}`,note:`Thread affinity is important for thread-local data but can limit scalability.`},{id:72,topic:`Threading & Concurrency Management`,question:`How do you measure and optimize thread usage in a reactive application?`,answer:`Measure thread usage using:
1. JMX monitoring
2. Thread dumps
3. Metrics (Micrometer)
4. Custom counters

Optimize by:
1. Choosing correct scheduler
2. Limiting concurrency
3. Using bounded queues
4. Monitoring thread pools`,example:`// Monitoring thread usage
public class ThreadMonitor {
    private final MeterRegistry registry;
    
    public void monitorScheduler(Scheduler scheduler, String name) {
        registry.gauge("scheduler.active.threads", 
            Tags.of("scheduler", name), 
            scheduler,
            s -> s.metrics().orElseThrow().activeThreads()
        );
        
        registry.gauge("scheduler.available.threads",
            Tags.of("scheduler", name),
            scheduler,
            s -> s.metrics().orElseThrow().availableThreads()
        );
    }
}

// Measuring scheduler performance
public class SchedulerMetrics {
    public Mono<Void> measureExecution(Scheduler scheduler) {
        return Mono.just("Start")
            .doOnSubscribe(s -> {
                long start = System.currentTimeMillis();
                scheduler.schedule(() -> {
                    // Execute task
                    long duration = System.currentTimeMillis() - start;
                    recordMetric("execution.time", duration);
                });
            })
            .then();
    }
}

// Optimizing concurrency
public class ConcurrencyOptimizer {
    // Limit concurrent requests
    public Flux<Result> processWithConcurrencyLimit(Flux<Request> requests) {
        return requests
            .flatMap(request -> 
                process(request)
                    .limitRate(10) // Limit concurrency
                    .subscribeOn(Schedulers.boundedElastic())
            );
    }
    
    // Custom thread pool with monitoring
    public Scheduler createMonitoredScheduler() {
        ThreadFactory threadFactory = new ThreadFactoryBuilder()
            .setNameFormat("optimized-pool-%d")
            .setDaemon(true)
            .setUncaughtExceptionHandler((t, e) -> {
                log.error("Thread {} failed", t.getName(), e);
                counter.increment("thread.failures");
            })
            .build();
            
        return Schedulers.fromExecutorService(
            Executors.newFixedThreadPool(20, threadFactory)
        );
    }
}

// Performance testing
public class SchedulerBenchmark {
    @Test
    public void benchmarkSchedulers() {
        // Test boundedElastic
        long start1 = System.currentTimeMillis();
        Flux.range(1, 1000)
            .flatMap(i -> 
                Mono.fromCallable(() -> simulateIO())
                    .subscribeOn(Schedulers.boundedElastic())
            )
            .blockLast();
        long time1 = System.currentTimeMillis() - start1;
        
        // Test parallel
        long start2 = System.currentTimeMillis();
        Flux.range(1, 1000)
            .parallel(8)
            .runOn(Schedulers.parallel())
            .map(i -> simulateCPU())
            .sequential()
            .blockLast();
        long time2 = System.currentTimeMillis() - start2;
        
        log.info("I/O time: {}ms, CPU time: {}ms", time1, time2);
    }
}`,note:`Regular monitoring and tuning of schedulers is essential for performance.`},{id:73,topic:`Threading & Concurrency Management`,question:`What is the impact of using the wrong scheduler on performance?`,answer:`Wrong scheduler can cause:
1. Bottlenecks (too few threads)
2. Resource waste (too many threads)
3. Thread contention
4. Inefficient CPU usage
5. Deadlocks`,example:`// Wrong: Using parallel for I/O
public Flux<String> badIoWork(Flux<String> input) {
    return input
        .parallel(8)
        .runOn(Schedulers.parallel()) // CPU scheduler
        .flatMap(item -> 
            // I/O operation on CPU scheduler - bad!
            Mono.fromCallable(() -> blockingIO(item))
                .subscribeOn(Schedulers.parallel())
        )
        .sequential();
}

// Right: Using boundedElastic for I/O
public Flux<String> goodIoWork(Flux<String> input) {
    return input
        .flatMap(item -> 
            Mono.fromCallable(() -> blockingIO(item))
                .subscribeOn(Schedulers.boundedElastic())
        );
}

// Wrong: Using boundedElastic for CPU
public Flux<Integer> badCpuWork(Flux<Integer> input) {
    return input
        .flatMap(i -> 
            Mono.fromCallable(() -> heavyComputation(i))
                .subscribeOn(Schedulers.boundedElastic()) // Too many threads
        );
}

// Right: Using parallel for CPU
public Flux<Integer> goodCpuWork(Flux<Integer> input) {
    return input
        .parallel(4)
        .runOn(Schedulers.parallel())
        .map(this::heavyComputation)
        .sequential();
}

// Wrong scheduler with blocking calls
public class SchedulerImpact {
    // BAD: Blocking call on parallel scheduler
    public Mono<String> badBlockingOnParallel() {
        return Mono.fromCallable(() -> {
            // Blocking JDBC call
            Thread.sleep(1000);
            return "Result";
        })
        .subscribeOn(Schedulers.parallel()); // Limited threads!
    }
    
    // GOOD: Blocking call on boundedElastic
    public Mono<String> goodBlockingOnElastic() {
        return Mono.fromCallable(() -> {
            Thread.sleep(1000);
            return "Result";
        })
        .subscribeOn(Schedulers.boundedElastic()); // Many threads
    }
    
    // Performance test
    public void demonstrateImpact() {
        long start1 = System.currentTimeMillis();
        Flux.range(1, 100)
            .flatMap(i -> badBlockingOnParallel())
            .blockLast();
        long time1 = System.currentTimeMillis() - start1;
        
        long start2 = System.currentTimeMillis();
        Flux.range(1, 100)
            .flatMap(i -> goodBlockingOnElastic())
            .blockLast();
        long time2 = System.currentTimeMillis() - start2;
        
        // Bad: 10000ms (limited threads)
        // Good: 1000ms (many threads)
        log.info("Bad: {}ms, Good: {}ms", time1, time2);
    }
}`,note:`Always use the right scheduler for the workload to avoid performance issues.`},{id:74,topic:`Reactive Web Applications`,question:`What is Spring WebFlux and how does it differ from Spring MVC?`,answer:`Spring WebFlux is a reactive web framework that supports non-blocking, asynchronous request handling. Key differences:

Spring MVC:
- Blocking I/O
- Servlet API
- Tomcat/Jetty
- Per-request threads

Spring WebFlux:
- Non-blocking I/O
- Reactive Streams
- Netty/Undertow
- Event-loop threads`,example:`// Spring MVC (Blocking)
@RestController
@RequestMapping("/mvc")
public class MvcController {
    @GetMapping("/user/{id}")
    public User getUser(@PathVariable String id) {
        // Blocking call - thread waits
        return userService.getUser(id);
    }
}

// Spring WebFlux (Non-blocking)
@RestController
@RequestMapping("/webflux")
public class WebFluxController {
    @GetMapping("/user/{id}")
    public Mono<User> getUser(@PathVariable String id) {
        // Non-blocking - returns immediately
        return userService.getUser(id)
            .subscribeOn(Schedulers.boundedElastic());
    }
}

// WebFlux with multiple operations
@RestController
public class ReactiveController {
    @GetMapping("/dashboard/{userId}")
    public Mono<Dashboard> getDashboard(@PathVariable String userId) {
        return Mono.zip(
            userService.getUser(userId),
            orderService.getOrders(userId),
            analyticsService.getStats(userId)
        ).map(tuple -> new Dashboard(
            tuple.getT1(),
            tuple.getT2(),
            tuple.getT3()
        ))
        .timeout(Duration.ofSeconds(5))
        .onErrorResume(e -> Mono.just(Dashboard.EMPTY));
    }
}

// Configuration comparison
@Configuration
public class WebFluxConfig {
    // WebFlux uses Netty by default
    @Bean
    public WebClient webClient() {
        return WebClient.builder()
            .clientConnector(new ReactorClientHttpConnector(
                HttpClient.create()
                    .option(ChannelOption.CONNECT_TIMEOUT_MILLIS, 1000)
                    .runOn(LoopResources.create("webclient", 4, true))
            ))
            .build();
    }
}`,note:`WebFlux is better for I/O-bound, high-concurrency applications. MVC is simpler for CPU-bound workloads.`},{id:75,topic:`Reactive Web Applications`,question:`Explain Netty vs Tomcat/Undertow in the context of reactive applications.`,answer:`Netty: Event-driven, non-blocking I/O. Default for WebFlux.

Tomcat: Servlet-based, blocking I/O. Can work with WebFlux but not optimal.

Undertow: Supports both blocking and non-blocking. Good alternative to Netty.`,example:`// Using Netty (Default)
@SpringBootApplication
public class NettyApp {
    public static void main(String[] args) {
        SpringApplication.run(NettyApp.class, args);
        // Uses Netty by default
    }
}

// Using Undertow
@Configuration
public class UndertowConfig {
    @Bean
    public UndertowServletWebServerFactory webServerFactory() {
        UndertowServletWebServerFactory factory = 
            new UndertowServletWebServerFactory();
        factory.setPort(8080);
        factory.setIoThreads(4);
        factory.setWorkerThreads(20);
        return factory;
    }
}

// Custom Netty configuration
@Configuration
public class NettyConfig {
    @Bean
    public NettyReactiveWebServerFactory nettyFactory() {
        NettyReactiveWebServerFactory factory = 
            new NettyReactiveWebServerFactory();
        factory.addServerCustomizers(httpServer -> 
            httpServer
                .option(ChannelOption.SO_BACKLOG, 1024)
                .option(ChannelOption.SO_KEEPALIVE, true)
                .runOn(LoopResources.create("netty", 8, true))
        );
        return factory;
    }
}

// Performance comparison
public class ServerComparison {
    // Netty: handles 10,000 concurrent connections with few threads
    // Tomcat: requires 1 thread per connection (10,000 threads)
    
    public void compareThreadUsage() {
        // Netty - Event loop (8 threads)
        // Can handle 10,000 connections on 8 threads
        
        // Tomcat - Thread pool
        // Needs 10,000 threads for 10,000 connections
        
        log.info("Netty: {} threads for 10,000 connections", 8);
        log.info("Tomcat: {} threads for 10,000 connections", 10000);
    }
}`,note:`Netty is the default and best choice for reactive applications.`},{id:76,topic:`Reactive Web Applications`,question:`How do you create a reactive REST endpoint returning Mono<T> and Flux<T>?`,answer:`Return Mono for single objects, Flux for collections/streams. Use appropriate HTTP methods and response status codes.`,example:`// Single object (Mono)
@RestController
@RequestMapping("/api/users")
public class UserController {
    
    @GetMapping("/{id}")
    public Mono<User> getUser(@PathVariable String id) {
        return userService.findById(id)
            .switchIfEmpty(Mono.error(new NotFoundException()));
    }
    
    @PostMapping
    public Mono<User> createUser(@RequestBody User user) {
        return userService.save(user)
            .doOnSuccess(saved -> 
                log.info("User created: {}", saved.getId())
            );
    }
    
    // Collection (Flux)
    @GetMapping
    public Flux<User> getUsers() {
        return userService.findAll()
            .delayElements(Duration.ofMillis(100)); // Streaming
    }
    
    // With pagination
    @GetMapping("/page")
    public Flux<User> getUsersPage(
        @RequestParam int page,
        @RequestParam int size
    ) {
        return userService.findAll()
            .skip(page * size)
            .take(size);
    }
    
    // Custom response status
    @PostMapping("/with-status")
    public Mono<ResponseEntity<User>> createWithStatus(
        @RequestBody User user
    ) {
        return userService.save(user)
            .map(saved -> 
                ResponseEntity.status(HttpStatus.CREATED)
                    .body(saved)
            );
    }
}

// Streaming responses
@RestController
@RequestMapping("/api/stream")
public class StreamController {
    @GetMapping(value = "/events", 
        produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<Event> streamEvents() {
        return Flux.interval(Duration.ofSeconds(1))
            .map(i -> new Event("Event " + i));
    }
    
    @GetMapping(value = "/data", 
        produces = MediaType.APPLICATION_NDJSON_VALUE)
    public Flux<Data> streamData() {
        return repository.findAll()
            .delayElements(Duration.ofMillis(100));
    }
}`,note:`Use Mono for single results, Flux for multiple results. WebFlux handles streaming automatically.`},{id:77,topic:`Reactive Web Applications`,question:`What is WebClient and how is it better than RestTemplate? Provide a complete example.`,answer:`WebClient is a non-blocking HTTP client for reactive applications. Benefits:

1. Non-blocking I/O
2. Reactive streams support
3. Better error handling
4. Built-in retry and timeout
5. Reactive backpressure

RestTemplate is blocking and deprecated.`,example:`// WebClient configuration
@Configuration
public class WebClientConfig {
    @Bean
    public WebClient webClient() {
        return WebClient.builder()
            .baseUrl("https://api.example.com")
            .defaultHeader(HttpHeaders.CONTENT_TYPE, "application/json")
            .defaultCookie("cookie-name", "cookie-value")
            .defaultRequest(spec -> 
                spec.header("X-Request-Id", UUID.randomUUID().toString())
            )
            .clientConnector(new ReactorClientHttpConnector(
                HttpClient.create()
                    .option(ChannelOption.CONNECT_TIMEOUT_MILLIS, 5000)
                    .option(ChannelOption.SO_KEEPALIVE, true)
                    .runOn(LoopResources.create("webclient", 4, true))
            ))
            .filter(new LoggingFilter())
            .build();
    }
}

// WebClient usage
@Service
public class ApiClient {
    private final WebClient webClient;
    
    public Mono<User> getUser(String id) {
        return webClient.get()
            .uri("/users/{id}", id)
            .retrieve()
            .onStatus(HttpStatus::is4xxClientError, 
                response -> Mono.error(new ClientException("Client error")))
            .onStatus(HttpStatus::is5xxServerError,
                response -> Mono.error(new ServerException("Server error")))
            .bodyToMono(User.class)
            .timeout(Duration.ofSeconds(5))
            .retryWhen(Retry.backoff(3, Duration.ofSeconds(1)))
            .onErrorResume(e -> Mono.just(new User("fallback")));
    }
    
    public Flux<Order> getOrders(String userId) {
        return webClient.get()
            .uri("/users/{userId}/orders", userId)
            .retrieve()
            .bodyToFlux(Order.class);
    }
    
    public Mono<Void> sendData(Data data) {
        return webClient.post()
            .uri("/data")
            .bodyValue(data)
            .retrieve()
            .bodyToMono(Void.class);
    }
}

// RestTemplate vs WebClient
public class ClientComparison {
    // RestTemplate - Blocking
    public User getUserBlocking(String id) {
        return restTemplate.getForObject(
            "https://api.example.com/users/" + id,
            User.class
        );
    }
    
    // WebClient - Non-blocking
    public Mono<User> getUserNonBlocking(String id) {
        return webClient.get()
            .uri("/users/{id}", id)
            .retrieve()
            .bodyToMono(User.class);
    }
}`,note:`WebClient is preferred for all new reactive applications. RestTemplate is deprecated.`},{id:78,topic:`Reactive Web Applications`,question:`How do you handle timeouts, retries, and error handling in WebClient?`,answer:`WebClient supports:

Timeouts: Using timeout() operator

Retries: Using retryWhen() with Retry spec

Error Handling: Using onStatus() and onErrorResume()`,example:`// Comprehensive WebClient with error handling
@Service
public class ResilientApiClient {
    private final WebClient webClient;
    
    public Mono<Response> callApi(String id) {
        return webClient.get()
            .uri("/api/resource/{id}", id)
            .header("X-Request-Id", UUID.randomUUID().toString())
            .retrieve()
            .onStatus(HttpStatus::is4xxClientError, 
                response -> {
                    log.warn("Client error: {}", response.statusCode());
                    return Mono.error(new ClientException("Bad request"));
                })
            .onStatus(HttpStatus::is5xxServerError,
                response -> {
                    log.error("Server error: {}", response.statusCode());
                    return Mono.error(new ServerException("Server error"));
                })
            .onStatus(HttpStatus::isError,
                response -> Mono.error(new RuntimeException("Unknown error")))
            .bodyToMono(Response.class)
            .timeout(Duration.ofSeconds(5), 
                Mono.just(new Response("Timeout fallback")))
            .retryWhen(Retry.backoff(3, Duration.ofSeconds(1))
                .maxBackoff(Duration.ofSeconds(5))
                .filter(throwable -> throwable instanceof TimeoutException)
                .doBeforeRetry(rs -> 
                    log.warn("Retrying, attempt: {}", rs.totalRetries() + 1)
                )
                .onRetryExhaustedThrow((spec, rs) -> 
                    new RuntimeException("All retries exhausted", rs.failure())
                )
            )
            .onErrorResume(e -> {
                log.error("Final error: {}", e.getMessage());
                return Mono.just(new Response("Fallback response"));
            });
    }
    
    // With exchangeToMono for more control
    public Mono<Result> callWithExchange(String id) {
        return webClient.get()
            .uri("/api/resource/{id}", id)
            .exchangeToMono(response -> {
                if (response.statusCode().is2xxSuccessful()) {
                    return response.bodyToMono(Result.class);
                } else if (response.statusCode().is4xxClientError()) {
                    return response.bodyToMono(ErrorResponse.class)
                        .flatMap(error -> 
                            Mono.error(new ClientException(error.getMessage()))
                        );
                } else {
                    return Mono.error(new ServerException("Server error"));
                }
            })
            .timeout(Duration.ofSeconds(3))
            .retryWhen(Retry.backoff(2, Duration.ofSeconds(1)));
    }
}

// Global WebClient filters
@Configuration
public class WebClientFilters {
    @Bean
    public ExchangeFilterFunction loggingFilter() {
        return (request, next) -> {
            log.info("Request: {} {}", 
                request.method(), 
                request.url()
            );
            return next.exchange(request)
                .doOnNext(response -> 
                    log.info("Response: {}", response.statusCode())
                )
                .doOnError(e -> 
                    log.error("Request failed", e)
                );
        };
    }
    
    @Bean
    public ExchangeFilterFunction retryFilter() {
        return (request, next) -> 
            next.exchange(request)
                .retryWhen(Retry.backoff(3, Duration.ofSeconds(1)));
    }
}`,note:`Combine timeout, retry, and error handling for resilient API calls.`},{id:79,topic:`Reactive Web Applications`,question:`Explain the use of @RestController, @GetMapping, @PostMapping with reactive types.`,answer:`These annotations work similarly to Spring MVC but with reactive return types. @RestController marks class, @GetMapping/@PostMapping define endpoints that return Mono/Flux.`,example:`// Complete CRUD with reactive annotations
@RestController
@RequestMapping("/api/books")
public class BookController {
    
    private final BookService bookService;
    
    @GetMapping
    public Flux<Book> getAllBooks() {
        return bookService.findAll()
            .delayElements(Duration.ofMillis(100));
    }
    
    @GetMapping("/{id}")
    public Mono<Book> getBook(@PathVariable String id) {
        return bookService.findById(id)
            .switchIfEmpty(Mono.error(
                new ResponseStatusException(HttpStatus.NOT_FOUND, "Book not found")
            ));
    }
    
    @PostMapping
    public Mono<Book> createBook(@RequestBody Book book) {
        return bookService.save(book)
            .map(saved -> {
                // Additional processing
                return saved;
            });
    }
    
    @PutMapping("/{id}")
    public Mono<Book> updateBook(
        @PathVariable String id,
        @RequestBody Book book
    ) {
        return bookService.update(id, book)
            .onErrorResume(NotFoundException.class, 
                e -> Mono.error(new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Book not found"
                ))
            );
    }
    
    @DeleteMapping("/{id}")
    public Mono<ResponseEntity<Void>> deleteBook(@PathVariable String id) {
        return bookService.delete(id)
            .map(v -> ResponseEntity.noContent().build());
    }
    
    // Search with reactive types
    @GetMapping("/search")
    public Flux<Book> searchBooks(
        @RequestParam String query,
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int size
    ) {
        return bookService.search(query)
            .skip(page * size)
            .take(size);
    }
}

// Request validation
@RestController
@RequestMapping("/api/validate")
public class ValidationController {
    
    @PostMapping
    public Mono<ResponseEntity<ValidationResult>> validate(
        @Valid @RequestBody Request request
    ) {
        return Mono.just(request)
            .map(req -> new ValidationResult(true))
            .map(ResponseEntity::ok)
            .onErrorResume(e -> 
                Mono.just(ResponseEntity.badRequest().build())
            );
    }
}`,note:`Annotations work the same as MVC but with reactive return types.`},{id:80,topic:`Reactive Web Applications`,question:`What is the ServerResponse in functional endpoints? Compare with annotation-based controllers.`,answer:`ServerResponse is a functional alternative to annotations. Provides:

1. More control over response building
2. Router functions instead of annotations
3. Composable handlers
4. Better testability

Functional endpoints are more flexible but more verbose.`,example:`// Functional endpoint configuration
@Configuration
public class RouterConfig {
    
    @Bean
    public RouterFunction<ServerResponse> routes(
        UserHandler userHandler
    ) {
        return RouterFunctions
            .route(GET("/api/users"), userHandler::getAllUsers)
            .andRoute(GET("/api/users/{id}"), userHandler::getUser)
            .andRoute(POST("/api/users"), userHandler::createUser)
            .andRoute(PUT("/api/users/{id}"), userHandler::updateUser)
            .andRoute(DELETE("/api/users/{id}"), userHandler::deleteUser);
    }
}

// Handler with ServerResponse
@Component
public class UserHandler {
    private final UserService userService;
    
    public Mono<ServerResponse> getAllUsers(ServerRequest request) {
        return ServerResponse.ok()
            .contentType(MediaType.APPLICATION_JSON)
            .body(userService.findAll(), User.class);
    }
    
    public Mono<ServerResponse> getUser(ServerRequest request) {
        String id = request.pathVariable("id");
        return userService.findById(id)
            .flatMap(user -> ServerResponse.ok()
                .bodyValue(user))
            .switchIfEmpty(ServerResponse.notFound().build());
    }
    
    public Mono<ServerResponse> createUser(ServerRequest request) {
        return request.bodyToMono(User.class)
            .flatMap(userService::save)
            .flatMap(saved -> ServerResponse
                .status(HttpStatus.CREATED)
                .bodyValue(saved));
    }
    
    public Mono<ServerResponse> updateUser(ServerRequest request) {
        String id = request.pathVariable("id");
        return request.bodyToMono(User.class)
            .flatMap(user -> userService.update(id, user))
            .flatMap(updated -> ServerResponse.ok()
                .bodyValue(updated))
            .switchIfEmpty(ServerResponse.notFound().build());
    }
    
    public Mono<ServerResponse> deleteUser(ServerRequest request) {
        String id = request.pathVariable("id");
        return userService.delete(id)
            .then(ServerResponse.noContent().build());
    }
}

// Comparison
public class ControllerComparison {
    // Annotation-based (simpler)
    @RestController
    public class AnnotationController {
        @GetMapping("/users")
        public Flux<User> getUsers() {
            return userService.findAll();
        }
    }
    
    // Functional (more control)
    @Configuration
    public class FunctionalRouter {
        @Bean
        public RouterFunction<ServerResponse> routes() {
            return route(GET("/users"), req ->
                ServerResponse.ok()
                    .header("X-Custom-Header", "value")
                    .body(userService.findAll(), User.class)
            );
        }
    }
}`,note:`Choose functional endpoints for complex routing logic and annotation-based for simplicity.`},{id:81,topic:`Reactive Web Applications`,question:`What is the ExchangeFilterFunction in WebClient? Demonstrate with logging and authentication.`,answer:`ExchangeFilterFunction intercepts requests/responses in WebClient. Useful for:

1. Logging
2. Authentication
3. Error handling
4. Metrics
5. Request modification`,example:`// Logging filter
public class LoggingFilter {
    public ExchangeFilterFunction logRequest() {
        return ExchangeFilterFunction.ofRequestProcessor(request -> {
            log.info("Request: {} {}", 
                request.method(), 
                request.url()
            );
            request.headers().forEach((name, values) -> 
                log.info("Header: {} = {}", name, values)
            );
            return Mono.just(request);
        });
    }
    
    public ExchangeFilterFunction logResponse() {
        return ExchangeFilterFunction.ofResponseProcessor(response -> {
            log.info("Response: {}", response.statusCode());
            return Mono.just(response);
        });
    }
}

// Authentication filter
public class AuthFilter {
    private final String token;
    
    public ExchangeFilterFunction addBearerToken() {
        return ExchangeFilterFunction.ofRequestProcessor(request -> {
            return Mono.just(ClientRequest.from(request)
                .header("Authorization", "Bearer " + token)
                .build());
        });
    }
}

// Circuit breaker filter
public class CircuitBreakerFilter {
    private final CircuitBreaker circuitBreaker;
    
    public ExchangeFilterFunction circuitBreakerFilter() {
        return (request, next) -> 
            Mono.defer(() -> {
                if (circuitBreaker.isOpen()) {
                    return Mono.error(new CircuitBreakerOpenException());
                }
                return next.exchange(request);
            });
    }
}

// Complete configuration
@Configuration
public class WebClientConfig {
    
    @Bean
    public WebClient webClient() {
        return WebClient.builder()
            .baseUrl("https://api.example.com")
            .filter(logRequest())
            .filter(logResponse())
            .filter(addBearerToken())
            .filter(circuitBreakerFilter())
            .filter((request, next) -> 
                next.exchange(request)
                    .doOnSubscribe(s -> 
                        metrics.increment("http.requests")
                    )
                    .doOnSuccess(response -> 
                        metrics.increment("http.responses", 
                            response.statusCode().toString()
                        )
                    )
            )
            .build();
    }
}

// Custom filter with retry
public class CustomFilters {
    public ExchangeFilterFunction retryWithBackoff() {
        return (request, next) -> 
            next.exchange(request)
                .retryWhen(Retry.backoff(3, Duration.ofSeconds(1))
                    .filter(throwable -> 
                        throwable instanceof ConnectException
                    )
                );
    }
    
    public ExchangeFilterFunction handleErrors() {
        return (request, next) -> 
            next.exchange(request)
                .onErrorResume(ConnectException.class, 
                    e -> Mono.just(ClientResponse.create(
                        HttpStatus.SERVICE_UNAVAILABLE,
                        request
                    ).build())
                );
    }
}`,note:`ExchangeFilterFunction provides powerful interception capabilities for WebClient.`},{id:82,topic:`Reactive Web Applications`,question:`How do you implement Server-Sent Events (SSE) using Spring WebFlux?`,answer:`SSE allows pushing real-time updates from server to client. Spring WebFlux supports SSE using Flux with MediaType.TEXT_EVENT_STREAM_VALUE.`,example:`// SSE Controller
@RestController
@RequestMapping("/api/sse")
public class SseController {
    
    @GetMapping(value = "/events", 
        produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<ServerSentEvent<Event>> streamEvents() {
        return Flux.interval(Duration.ofSeconds(1))
            .map(i -> ServerSentEvent.builder(Event.builder()
                .id("" + i)
                .data("Event " + i)
                .timestamp(Instant.now())
                .build())
                .id("" + i)
                .event("custom-event")
                .retry(Duration.ofSeconds(5))
                .build()
            );
    }
    
    @GetMapping(value = "/notifications/{userId}",
        produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<ServerSentEvent<Notification>> userNotifications(
        @PathVariable String userId
    ) {
        return notificationService.getNotifications(userId)
            .map(notification -> 
                ServerSentEvent.builder(notification)
                    .event("notification")
                    .id(notification.getId())
                    .build()
            )
            .delayElements(Duration.ofMillis(100));
    }
}

// Service producing SSE events
@Service
public class NotificationService {
    private final EmitterProcessor<Notification> processor = 
        EmitterProcessor.create();
    private final FluxSink<Notification> sink = processor.sink();
    
    public Flux<Notification> getNotifications(String userId) {
        return processor
            .filter(notification -> 
                notification.getUserId().equals(userId)
            )
            .share(); // Share with multiple subscribers
    }
    
    public void sendNotification(Notification notification) {
        sink.next(notification);
    }
}

// WebClient consuming SSE
@Service
public class SseClient {
    private final WebClient webClient;
    
    public Flux<Event> consumeEvents() {
        return webClient.get()
            .uri("/api/sse/events")
            .accept(MediaType.TEXT_EVENT_STREAM)
            .retrieve()
            .bodyToFlux(ServerSentEvent.class)
            .map(ServerSentEvent::data)
            .doOnNext(event -> log.info("Received: {}", event))
            .retryWhen(Retry.backoff(3, Duration.ofSeconds(1)));
    }
}

// Testing SSE
@SpringBootTest
public class SseTest {
    @Test
    public void testSseStream() {
        WebTestClient client = WebTestClient.bindToController(
            new SseController()
        ).build();
        
        client.get()
            .uri("/api/sse/events")
            .accept(MediaType.TEXT_EVENT_STREAM)
            .exchange()
            .expectStatus().isOk()
            .expectHeader().contentType(MediaType.TEXT_EVENT_STREAM)
            .expectBody()
            .returnResult();
    }
}`,note:`SSE is great for real-time updates like notifications, stock prices, and live dashboards.`},{id:83,topic:`Database Access with R2DBC & MongoDB`,question:`What is R2DBC and how does it differ from JDBC?`,answer:`R2DBC (Reactive Relational Database Connectivity) is a reactive database driver specification. Differences:

JDBC: Blocking, thread-per-connection

R2DBC: Non-blocking, event-driven

R2DBC enables reactive streams with relational databases.`,example:`// JDBC (Blocking)
@Service
public class JdbcUserService {
    @Autowired
    private JdbcTemplate jdbcTemplate;
    
    public User getUser(String id) {
        // Blocks the thread
        return jdbcTemplate.queryForObject(
            "SELECT * FROM users WHERE id = ?",
            new Object[]{id},
            (rs, rowNum) -> new User(
                rs.getString("id"),
                rs.getString("name")
            )
        );
    }
}

// R2DBC (Non-blocking)
@Service
public class R2dbcUserService {
    @Autowired
    private DatabaseClient client;
    
    public Mono<User> getUser(String id) {
        return client.sql("SELECT * FROM users WHERE id = $1")
            .bind("$1", id)
            .fetch()
            .one()
            .map(row -> new User(
                row.get("id", String.class),
                row.get("name", String.class)
            ));
    }
}

// R2DBC configuration
@Configuration
public class R2dbcConfig {
    @Bean
    public ConnectionFactory connectionFactory() {
        return ConnectionFactories.get(
            "r2dbc:postgresql://localhost:5432/testdb?user=user&password=pass"
        );
    }
    
    @Bean
    public DatabaseClient databaseClient(
        ConnectionFactory connectionFactory
    ) {
        return DatabaseClient.create(connectionFactory);
    }
}`,note:`R2DBC enables reactive programming with relational databases. Use for non-blocking database access.`},{id:84,topic:`Database Access with R2DBC & MongoDB`,question:`How do you implement reactive CRUD operations using Spring Data R2DBC?`,answer:`Spring Data R2DBC provides ReactiveCrudRepository for CRUD operations. Return Mono/Flux for non-blocking database access.`,example:`// Entity
@Table("users")
@Data
public class User {
    @Id
    private Long id;
    private String name;
    private String email;
    @Column("created_at")
    private LocalDateTime createdAt;
}

// Repository
public interface UserRepository 
    extends ReactiveCrudRepository<User, Long> {
    
    // Custom queries
    @Query("SELECT * FROM users WHERE email = $1")
    Mono<User> findByEmail(String email);
    
    @Query("SELECT * FROM users WHERE name LIKE $1")
    Flux<User> findByNameLike(String name);
    
    // Derived queries
    Flux<User> findByAgeGreaterThan(int age);
    
    @Query("SELECT * FROM users WHERE age BETWEEN $1 AND $2")
    Flux<User> findByAgeBetween(int minAge, int maxAge);
}

// Service with CRUD
@Service
public class UserService {
    @Autowired
    private UserRepository repository;
    
    public Flux<User> getAllUsers() {
        return repository.findAll()
            .delayElements(Duration.ofMillis(100));
    }
    
    public Mono<User> getUser(Long id) {
        return repository.findById(id)
            .switchIfEmpty(Mono.error(
                new ResponseStatusException(HttpStatus.NOT_FOUND)
            ));
    }
    
    public Mono<User> createUser(User user) {
        user.setCreatedAt(LocalDateTime.now());
        return repository.save(user);
    }
    
    public Mono<User> updateUser(Long id, User user) {
        return repository.findById(id)
            .flatMap(existing -> {
                existing.setName(user.getName());
                existing.setEmail(user.getEmail());
                return repository.save(existing);
            });
    }
    
    public Mono<Void> deleteUser(Long id) {
        return repository.deleteById(id);
    }
}

// Transactions with R2DBC
@Service
public class TransactionService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private OrderRepository orderRepository;
    
    @Transactional
    public Mono<Void> createUserWithOrders(User user, List<Order> orders) {
        return userRepository.save(user)
            .flatMap(saved -> 
                Flux.fromIterable(orders)
                    .map(order -> {
                        order.setUserId(saved.getId());
                        return order;
                    })
                    .flatMap(orderRepository::save)
                    .then()
            );
    }
}`,note:`ReactiveCrudRepository provides non-blocking CRUD operations with R2DBC.`},{id:85,topic:`Database Access with R2DBC & MongoDB`,question:`Explain ReactiveCrudRepository, ReactiveMongoRepository, and their methods.`,answer:`ReactiveCrudRepository: Base interface for reactive CRUD operations with relational databases.

ReactiveMongoRepository: MongoDB-specific interface with additional MongoDB operations.

Both provide non-blocking methods returning Mono/Flux.`,example:`// ReactiveCrudRepository - R2DBC
public interface R2dbcUserRepo 
    extends ReactiveCrudRepository<User, Long> {
    
    // CRUD methods
    // Mono<User> save(User entity)
    // Mono<User> findById(ID id)
    // Flux<User> findAll()
    // Mono<Boolean> existsById(ID id)
    // Mono<Long> count()
    // Mono<Void> deleteById(ID id)
    // Mono<Void> deleteAll()
    
    // Custom queries
    @Query("SELECT * FROM users WHERE age > $1")
    Flux<User> findByAgeGreaterThan(int age);
}

// ReactiveMongoRepository - MongoDB
@Repository
public interface MongoUserRepo 
    extends ReactiveMongoRepository<User, String> {
    
    // MongoDB-specific methods
    Flux<User> findByName(String name);
    
    // MongoDB geospatial queries
    Flux<User> findByLocationNear(Point point, Distance distance);
    
    // MongoDB aggregation
    @Aggregation(pipeline = {
        "{ $match: { age: { $gte: 18 } } }",
        "{ $group: { _id: '$city', count: { $sum: 1 } } }"
    })
    Flux<UserStats> aggregateUserStats();
    
    // MongoDB updates
    @Update("{ $set: { status: 'ACTIVE' } }")
    Mono<Void> updateStatus(String id);
    
    // Custom methods
    Flux<User> findByAgeBetween(int minAge, int maxAge);
    Mono<User> findFirstByNameOrderByAgeDesc(String name);
}

// Comparing repositories
public class RepositoryComparison {
    // R2DBC - Relational
    public interface RelationalRepo 
        extends ReactiveCrudRepository<Entity, Long> {
        // SQL specific queries
    }
    
    // MongoDB - Document
    public interface DocumentRepo 
        extends ReactiveMongoRepository<Document, String> {
        // MongoDB specific queries
    }
    
    // Both support reactive methods
    public Mono<Entity> saveEntity(Entity entity) {
        return relationalRepo.save(entity);
    }
}`,note:`Choose repository based on database: ReactiveCrudRepository for SQL, ReactiveMongoRepository for MongoDB.`},{id:86,topic:`Database Access with R2DBC & MongoDB`,question:`How do you handle transactions in a reactive environment using R2DBC?`,answer:`Reactive transactions in R2DBC use TransactionalOperator and annotation-based @Transactional. They're non-blocking and work with reactive streams.`,example:`// TransactionalOperator approach
@Service
public class TransactionalService {
    private final TransactionalOperator transactionalOperator;
    private final UserRepository userRepository;
    private final OrderRepository orderRepository;
    
    public TransactionalService(
        R2dbcTransactionManager transactionManager,
        UserRepository userRepository,
        OrderRepository orderRepository
    ) {
        this.transactionalOperator = TransactionalOperator.create(
            transactionManager
        );
        this.userRepository = userRepository;
        this.orderRepository = orderRepository;
    }
    
    public Mono<Void> createOrderWithUser(User user, Order order) {
        return userRepository.save(user)
            .flatMap(savedUser -> {
                order.setUserId(savedUser.getId());
                return orderRepository.save(order);
            })
            .as(transactionalOperator::transactional);
    }
}

// @Transactional approach
@Service
@Transactional
public class TransactionalService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private OrderRepository orderRepository;
    
    public Mono<Void> createOrderWithUser(User user, Order order) {
        return userRepository.save(user)
            .flatMap(savedUser -> {
                order.setUserId(savedUser.getId());
                return orderRepository.save(order);
            })
            .then();
    }
    
    @Transactional(rollbackFor = Exception.class)
    public Mono<Void> complexTransaction(User user, List<Order> orders) {
        return userRepository.save(user)
            .flatMap(savedUser -> 
                Flux.fromIterable(orders)
                    .map(order -> {
                        order.setUserId(savedUser.getId());
                        return order;
                    })
                    .flatMap(orderRepository::save)
                    .collectList()
            )
            .then();
    }
}

// Transaction with error handling
@Service
public class TransactionErrorHandling {
    public Mono<Void> safeTransaction(User user) {
        return Mono.defer(() -> 
            userRepository.save(user)
                .flatMap(saved -> {
                    if (saved.getAge() < 18) {
                        return Mono.error(
                            new IllegalArgumentException("User must be 18+")
                        );
                    }
                    return orderRepository.save(
                        Order.createDefault(saved.getId())
                    );
                })
                .onErrorResume(e -> {
                    log.error("Transaction failed, rolling back", e);
                    return Mono.error(e);
                })
        ).as(transactionalOperator::transactional);
    }
}

// Programmatic transaction
@Service
public class ProgrammaticTransaction {
    private final R2dbcTransactionManager tm;
    
    public Mono<Void> programmaticTx() {
        return Mono.usingWhen(
            tm.getReactiveTransaction(),
            tx -> {
                // Execute in transaction
                return userRepository.save(new User())
                    .then(orderRepository.save(new Order()))
                    .then(tm.commit(tx));
            },
            (tx, signal) -> tm.rollback(tx).then()
        );
    }
}`,note:`Use @Transactional or TransactionalOperator for reactive transactions.`},{id:87,topic:`Database Access with R2DBC & MongoDB`,question:`What is the difference between reactive and blocking database drivers? Performance implications.`,answer:`Blocking drivers: Thread blocks during I/O. Needs many threads for concurrency. High overhead.

Reactive drivers: Non-blocking I/O. Few threads handle many connections. Lower overhead, better scalability.`,example:`// Blocking JDBC driver
public class BlockingExample {
    public List<User> getUsersBlocking() {
        // Blocks thread for each query
        return jdbcTemplate.query(
            "SELECT * FROM users",
            (rs, rowNum) -> new User(
                rs.getString("id"),
                rs.getString("name")
            )
        );
    }
    
    public void performanceIssue() {
        // 1000 concurrent users = 1000 threads
        for (int i = 0; i < 1000; i++) {
            new Thread(() -> {
                // Each thread blocks on JDBC
                getUsersBlocking();
            }).start();
        }
    }
}

// Reactive R2DBC driver
@Service
public class ReactiveExample {
    public Flux<User> getUsersReactive() {
        // Non-blocking, returns immediately
        return client.sql("SELECT * FROM users")
            .fetch()
            .all()
            .map(row -> new User(
                row.get("id", String.class),
                row.get("name", String.class)
            ));
    }
    
    public void performanceAdvantage() {
        // 1000 concurrent users = few threads
        return client.sql("SELECT * FROM users")
            .fetch()
            .all()
            .map(row -> new User(...))
            .subscribeOn(Schedulers.boundedElastic());
    }
}

// Performance comparison
public class DriverPerformance {
    public void comparePerformance() {
        // Blocking driver
        long start1 = System.currentTimeMillis();
        IntStream.range(0, 100)
            .parallel()
            .forEach(i -> blockingQuery());
        long time1 = System.currentTimeMillis() - start1;
        
        // Reactive driver
        long start2 = System.currentTimeMillis();
        Flux.range(0, 100)
            .flatMap(i -> reactiveQuery())
            .blockLast();
        long time2 = System.currentTimeMillis() - start2;
        
        log.info("Blocking: {}ms, Reactive: {}ms", time1, time2);
        // Reactive is faster under load
    }
}`,note:`Reactive drivers scale better with many concurrent connections.`},{id:88,topic:`Database Access with R2DBC & MongoDB`,question:`Implement reactive pagination using Pageable in reactive repositories.`,answer:`Reactive pagination uses Pageable with reactive repositories. Returns Flux for content and Mono for page metadata.`,example:`// Repository with pagination
public interface UserRepository 
    extends ReactiveCrudRepository<User, Long> {
    
    @Query("SELECT * FROM users ORDER BY name OFFSET $1 ROWS FETCH NEXT $2 ROWS ONLY")
    Flux<User> findUsersPageable(int offset, int limit);
    
    // With Pageable
    Flux<User> findByNameContaining(String name, Pageable pageable);
}

// Pagination service
@Service
public class PaginationService {
    @Autowired
    private UserRepository userRepository;
    
    public Flux<User> getUsersPage(int page, int size) {
        return userRepository.findUsersPageable(
            page * size,
            size
        );
    }
    
    public Mono<Page<User>> getUsersPageWithMetadata(
        int page,
        int size
    ) {
        return Mono.zip(
            userRepository.count(),
            userRepository.findUsersPageable(
                page * size,
                size
            ).collectList()
        ).map(tuple -> {
            Long total = tuple.getT1();
            List<User> users = tuple.getT2();
            return new PageImpl<>(
                users,
                PageRequest.of(page, size),
                total
            );
        });
    }
}

// Custom pagination implementation
@Service
public class CustomPagination {
    private final DatabaseClient client;
    
    public Mono<Page<User>> customPagination(
        int page,
        int size,
        String sortField,
        Sort.Direction sortDirection
    ) {
        int offset = page * size;
        String orderBy = sortDirection.isAscending() ? 
            sortField + " ASC" : sortField + " DESC";
        
        return Mono.zip(
            client.sql("SELECT COUNT(*) FROM users")
                .fetch()
                .one()
                .map(row -> row.get("count", Long.class)),
            client.sql("SELECT * FROM users ORDER BY " + orderBy + 
                       " OFFSET $1 ROWS FETCH NEXT $2 ROWS ONLY")
                .bind("$1", offset)
                .bind("$2", size)
                .fetch()
                .all()
                .map(row -> new User(
                    row.get("id", Long.class),
                    row.get("name", String.class)
                ))
                .collectList()
        ).map(tuple -> {
            Long total = tuple.getT1();
            List<User> users = tuple.getT2();
            return new PageImpl<>(
                users,
                PageRequest.of(page, size),
                total
            );
        });
    }
}

// Controller with pagination
@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private PaginationService paginationService;
    
    @GetMapping
    public Mono<Page<User>> getUsers(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int size
    ) {
        return paginationService.getUsersPageWithMetadata(page, size);
    }
}`,note:`Reactive pagination combines Flux for content and Mono for page metadata.`},{id:89,topic:`Subjects, Multicasting & Advanced Processing`,question:`What are Subjects in Reactor? Explain the different types.`,answer:`Subjects are processors that can act as both publisher and subscriber. Types:

1. DirectProcessor: Simple processor, no backpressure
2. UnicastProcessor: Single subscriber only
3. EmitterProcessor: Multiple subscribers with backpressure
4. ReplayProcessor: Replays previous elements to new subscribers`,example:`// DirectProcessor - No backpressure
DirectProcessor<String> direct = DirectProcessor.create();
direct.subscribe(data -> log.info("Direct: {}", data));
direct.onNext("Hello");
direct.onNext("World");
direct.onComplete();

// UnicastProcessor - Single subscriber
UnicastProcessor<String> unicast = UnicastProcessor.create();
unicast.subscribe(data -> log.info("Unicast: {}", data));
unicast.onNext("Only");
unicast.onNext("One");
unicast.onComplete();

// EmitterProcessor - Multiple subscribers with backpressure
EmitterProcessor<String> emitter = EmitterProcessor.create();
emitter.subscribe(data -> log.info("Emitter1: {}", data));
emitter.subscribe(data -> log.info("Emitter2: {}", data));
emitter.onNext("Shared");
emitter.onNext("Data");
emitter.onComplete();

// ReplayProcessor - Replays history
ReplayProcessor<Integer> replay = ReplayProcessor.create(3);
replay.onNext(1);
replay.onNext(2);
replay.onNext(3);
replay.onNext(4);

// New subscriber gets last 3 elements
replay.subscribe(data -> log.info("Replay: {}", data));
// Output: 2, 3, 4

// Practical: Event bus using EmitterProcessor
@Component
public class EventBus {
    private final EmitterProcessor<Event> processor = 
        EmitterProcessor.create();
    private final FluxSink<Event> sink = processor.sink();
    
    public void publish(Event event) {
        sink.next(event);
    }
    
    public Flux<Event> subscribe() {
        return processor.share();
    }
    
    public Flux<Event> subscribeByType(EventType type) {
        return processor
            .filter(event -> event.getType() == type)
            .share();
    }
}`,note:`Choose subject based on requirements: EmitterProcessor for most cases, ReplayProcessor for caching.`},{id:90,topic:`Subjects, Multicasting & Advanced Processing`,question:`Compare and contrast PublishSubject (ReplayProcessor), BehaviorSubject, ReplaySubject, and AsyncSubject.`,answer:`PublishSubject (ReplayProcessor with size 0): Emits only current events.

BehaviorSubject: Emits current value or most recent value on subscription.

ReplaySubject: Emits all or some previous events.

AsyncSubject: Emits only last value on completion.`,example:`// PublishSubject - Only current events
ReplayProcessor<String> publish = ReplayProcessor.create(0);
publish.onNext("Old");
publish.subscribe(data -> log.info("Publish: {}", data));
publish.onNext("New");
// Output: New

// BehaviorSubject - Most recent value
BehaviorProcessor<String> behavior = BehaviorProcessor.create("Initial");
behavior.subscribe(data -> log.info("Behavior: {}", data));
behavior.onNext("Updated");
// Output: Initial (immediately), Updated

// ReplaySubject - All previous events
ReplayProcessor<String> replay = ReplayProcessor.cacheLast();
replay.onNext("Event1");
replay.onNext("Event2");
replay.subscribe(data -> log.info("Replay: {}", data));
// Output: Event1, Event2

// AsyncSubject - Only last value on complete
AsyncProcessor<String> async = AsyncProcessor.create();
async.onNext("Value1");
async.onNext("Value2");
async.subscribe(data -> log.info("Async: {}", data)); // No output yet
async.onComplete();
// Output: Value2

// Practical: Different use cases
public class SubjectUseCases {
    // PublishSubject - Live events only
    public ReplayProcessor<Event> liveEvents() {
        return ReplayProcessor.create(0);
    }
    
    // BehaviorSubject - State management
    public BehaviorProcessor<User> currentUser() {
        return BehaviorProcessor.create(User.GUEST);
    }
    
    // ReplaySubject - Caching
    public ReplayProcessor<Data> cache() {
        return ReplayProcessor.cacheLast();
    }
    
    // AsyncSubject - Single result
    public AsyncProcessor<Result> singleResult() {
        return AsyncProcessor.create();
    }
}`,note:`Choose subject type based on data delivery requirements.`},{id:91,topic:`Subjects, Multicasting & Advanced Processing`,question:`What is the difference between Flux.share() and Flux.publish().autoConnect()?`,answer:`Flux.share(): Hot publisher that shares subscription. Connects when first subscriber arrives, disconnects when last subscriber leaves.

Flux.publish().autoConnect(): Hot publisher that connects when specified number of subscribers arrive.

share() is simpler, autoConnect() gives more control.`,example:`// Flux.share() - Auto connect/disconnect
Flux<Long> shared = Flux.interval(Duration.ofSeconds(1))
    .share(); // Connects on first subscriber

shared.subscribe(data -> log.info("Sub1: {}", data));
Thread.sleep(2000);
shared.subscribe(data -> log.info("Sub2: {}", data));
// Both subscribers get the same stream

// Flux.publish().autoConnect() - Manual control
ConnectableFlux<Long> publish = Flux.interval(Duration.ofSeconds(1))
    .publish();

Flux<Long> autoConnect = publish.autoConnect(2); // Connect when 2 subscribers

autoConnect.subscribe(data -> log.info("Sub1: {}", data));
// No output yet (needs 2 subscribers)

Thread.sleep(1000);
autoConnect.subscribe(data -> log.info("Sub2: {}", data));
// Now both receive data

// Comparison
public class SharingComparison {
    // share() - Automatic
    public Flux<Integer> shareExample() {
        Flux<Integer> source = Flux.range(1, 10)
            .delayElements(Duration.ofMillis(100));
        
        return source.share(); // Auto manage
    }
    
    // publish().autoConnect() - Controlled
    public Flux<Integer> publishExample() {
        Flux<Integer> source = Flux.range(1, 10)
            .delayElements(Duration.ofMillis(100));
        
        return source.publish()
            .autoConnect(2); // Needs 2 subscribers
    }
}

// Practical: Cache with share()
@Service
public class CacheService {
    private final Flux<Data> cachedData = 
        fetchFromDB()
            .cache() // Caches result
            .share(); // Share with all subscribers
    
    public Flux<Data> getData() {
        return cachedData;
    }
    
    private Flux<Data> fetchFromDB() {
        return client.sql("SELECT * FROM data")
            .fetch()
            .all()
            .map(row -> new Data(row));
    }
}`,note:`share() for simple sharing, autoConnect() for control over connection.`},{id:92,topic:`Subjects, Multicasting & Advanced Processing`,question:`How do you implement a reactive event bus using processors?`,answer:`Event bus using EmitterProcessor for publishing and subscribing to events. Supports filtering, transformation, and error handling.`,example:`// Event bus implementation
@Component
public class ReactiveEventBus {
    private final EmitterProcessor<Event> processor = 
        EmitterProcessor.create();
    private final FluxSink<Event> sink = processor.sink();
    private final Map<Class<?>, List<EventHandler<?>>> handlers = 
        new ConcurrentHashMap<>();
    
    // Publish event
    public void publish(Event event) {
        sink.next(event);
    }
    
    // Subscribe to all events
    public Flux<Event> subscribe() {
        return processor.share();
    }
    
    // Subscribe to specific event type
    public <T extends Event> Flux<T> subscribe(Class<T> eventType) {
        return processor
            .filter(eventType::isInstance)
            .map(eventType::cast)
            .share();
    }
    
    // Register handler
    public <T extends Event> void register(
        Class<T> eventType,
        EventHandler<T> handler
    ) {
        subscribe(eventType)
            .subscribe(event -> handler.handle(event));
    }
}

// Event types
@Data
@AllArgsConstructor
public abstract class Event {
    private String id;
    private LocalDateTime timestamp;
    private String userId;
}

class UserCreatedEvent extends Event {
    private String username;
    private String email;
}

class OrderPlacedEvent extends Event {
    private String orderId;
    private BigDecimal amount;
}

// Event handlers
@Component
public class EventHandlers {
    @Autowired
    private ReactiveEventBus eventBus;
    
    @PostConstruct
    public void init() {
        // Handle user creation
        eventBus.register(UserCreatedEvent.class, event -> {
            log.info("User created: {}", event.getUsername());
            sendWelcomeEmail(event);
        });
        
        // Handle order placement
        eventBus.register(OrderPlacedEvent.class, event -> {
            log.info("Order placed: {}", event.getOrderId());
            updateInventory(event);
            sendOrderConfirmation(event);
        });
    }
}

// Using event bus
@Service
public class OrderService {
    @Autowired
    private ReactiveEventBus eventBus;
    
    public Mono<Order> placeOrder(Order order) {
        return orderRepository.save(order)
            .doOnSuccess(saved -> {
                eventBus.publish(new OrderPlacedEvent(
                    saved.getId(),
                    saved.getAmount()
                ));
            });
    }
}

// Advanced event bus with backpressure
@Component
public class AdvancedEventBus {
    private final EmitterProcessor<Event> processor = 
        EmitterProcessor.create(false);
    private final FluxSink<Event> sink = processor.sink();
    
    public AdvancedEventBus() {
        // Set up error handling
        sink.onDispose(() -> log.info("Event bus disposed"));
    }
    
    public void publish(Event event) {
        if (sink.requestedFromDownstream() == 0) {
            log.warn("Backpressure: No demand");
        }
        sink.next(event);
    }
    
    public Flux<Event> subscribe(String userId) {
        return processor
            .filter(event -> event.getUserId().equals(userId))
            .onBackpressureBuffer(1000)
            .share();
    }
}`,note:`Event bus enables loose coupling between components in reactive applications.`},{id:93,topic:`Subjects, Multicasting & Advanced Processing`,question:`What is the difference between Flux.cache() and Flux.replay()?`,answer:`Flux.cache(): Caches the entire sequence and replays to all subscribers. Equivalent to replay().autoConnect().

Flux.replay(): Replays previous elements to new subscribers. Can limit the number of elements replayed.

Both create hot publishers but with different caching behaviors.`,example:`// Flux.cache() - Caches everything
Flux<Integer> cached = Flux.range(1, 5)
    .delayElements(Duration.ofMillis(100))
    .cache(); // Caches all values

cached.subscribe(data -> log.info("Sub1: {}", data));
Thread.sleep(500);
cached.subscribe(data -> log.info("Sub2: {}", data));
// Sub2 gets all values replayed (1-5)

// Flux.replay() - Configurable replay
Flux<Integer> replayed = Flux.range(1, 5)
    .delayElements(Duration.ofMillis(100))
    .replay(2) // Replay only last 2
    .autoConnect();

replayed.subscribe(data -> log.info("Sub1: {}", data));
Thread.sleep(500);
replayed.subscribe(data -> log.info("Sub2: {}", data));
// Sub2 gets only last 2 values (4,5)

// cache() with size
Flux<Integer> limitedCache = Flux.range(1, 10)
    .cache(5); // Cache only 5 elements

// replay() with time
Flux<Integer> timeReplay = Flux.range(1, 10)
    .replay(Duration.ofSeconds(2))
    .autoConnect();

// Practical: API caching
@Service
public class ApiCacheService {
    private final Flux<Data> cachedData = 
        webClient.get()
            .uri("/api/data")
            .retrieve()
            .bodyToFlux(Data.class)
            .cache(Duration.ofMinutes(5)) // Cache for 5 minutes
            .share();
    
    public Flux<Data> getData() {
        return cachedData;
    }
}

// Caching with expiration
public class CacheWithExpiration {
    public Flux<Data> cacheWithTtl(Flux<Data> source, Duration ttl) {
        return source
            .replay(ttl)
            .autoConnect()
            .cache(ttl);
    }
}`,note:`cache() for full caching, replay() for configurable replay.`},{id:94,topic:`Testing Strategies`,question:`What is StepVerifier and how do you use it for testing Flux and Mono?`,answer:`StepVerifier is a testing utility for reactive streams. It allows you to test the behavior of Flux/Mono by expecting specific signals.

Features:
1. Expect values, errors, completion
2. Test backpressure
3. Virtual time testing
4. Assertions on elements`,example:`// Basic StepVerifier usage
@Test
public void testFlux() {
    Flux<Integer> flux = Flux.range(1, 5)
        .map(i -> i * 2);
    
    StepVerifier.create(flux)
        .expectNext(2, 4, 6, 8, 10)
        .verifyComplete();
}

// Testing error scenarios
@Test
public void testError() {
    Flux<Integer> flux = Flux.just(1, 2, 3)
        .concatWith(Flux.error(new RuntimeException("Error")));
    
    StepVerifier.create(flux)
        .expectNext(1, 2, 3)
        .expectError(RuntimeException.class)
        .verify();
}

// Testing with assertions
@Test
public void testWithAssertions() {
    Flux<User> flux = userService.getUsers();
    
    StepVerifier.create(flux)
        .assertNext(user -> {
            assertNotNull(user.getId());
            assertTrue(user.getAge() >= 18);
        })
        .assertNext(user -> 
            assertEquals("John", user.getName())
        )
        .expectNextCount(3)
        .verifyComplete();
}

// Testing backpressure
@Test
public void testBackpressure() {
    Flux<Integer> flux = Flux.range(1, 1000);
    
    StepVerifier.create(flux, 10) // Demand of 10
        .expectNextCount(10)
        .thenRequest(10) // Request 10 more
        .expectNextCount(10)
        .thenCancel()
        .verify();
}

// Testing completion
@Test
public void testCompletion() {
    Mono<Void> mono = Mono.fromRunnable(() -> 
        log.info("Task executed")
    );
    
    StepVerifier.create(mono)
        .verifyComplete();
}

// Testing with virtual time
@Test
public void testVirtualTime() {
    Flux<Long> flux = Flux.interval(Duration.ofSeconds(1))
        .take(5);
    
    StepVerifier.withVirtualTime(() -> flux)
        .expectSubscription()
        .thenAwait(Duration.ofSeconds(5))
        .expectNextCount(5)
        .verifyComplete();
}`,note:`StepVerifier is essential for testing reactive streams. Always test both success and error scenarios.`},{id:95,topic:`Testing Strategies`,question:`How do you test time-based operations using virtual time with StepVerifier.withVirtualTime()?`,answer:`Virtual time testing allows testing time-based operators without actually waiting. StepVerifier.withVirtualTime() lets you control the virtual clock.`,example:`// Testing delay operations
@Test
public void testDelay() {
    Mono<String> mono = Mono.just("Hello")
        .delayElement(Duration.ofSeconds(10));
    
    StepVerifier.withVirtualTime(() -> mono)
        .expectSubscription()
        .thenAwait(Duration.ofSeconds(10))
        .expectNext("Hello")
        .verifyComplete();
}

// Testing interval
@Test
public void testInterval() {
    Flux<Long> flux = Flux.interval(Duration.ofSeconds(1))
        .take(3);
    
    StepVerifier.withVirtualTime(() -> flux)
        .expectSubscription()
        .thenAwait(Duration.ofSeconds(3))
        .expectNext(0L, 1L, 2L)
        .verifyComplete();
}

// Testing timeout
@Test
public void testTimeout() {
    Mono<String> mono = Mono.just("Data")
        .delayElement(Duration.ofSeconds(5))
        .timeout(Duration.ofSeconds(2));
    
    StepVerifier.withVirtualTime(() -> mono)
        .expectSubscription()
        .thenAwait(Duration.ofSeconds(2))
        .expectError(TimeoutException.class)
        .verify();
}

// Testing with schedule
@Test
public void testSchedule() {
    Flux<Long> flux = Flux.interval(Duration.ofSeconds(1))
        .take(5);
    
    StepVerifier.withVirtualTime(() -> flux)
        .expectSubscription()
        .then(() -> {
            // Virtual clock advances as needed
        })
        .expectNext(0L)
        .thenAwait(Duration.ofSeconds(4))
        .expectNext(1L, 2L, 3L, 4L)
        .verifyComplete();
}

// Testing complex time operations
@Test
public void testComplexTiming() {
    Flux<String> flux = Flux.just("A", "B", "C")
        .delayElements(Duration.ofSeconds(2))
        .buffer(Duration.ofSeconds(5));
    
    StepVerifier.withVirtualTime(() -> flux)
        .expectSubscription()
        .thenAwait(Duration.ofSeconds(10))
        .expectNext(Arrays.asList("A", "B", "C"))
        .verifyComplete();
}

// Testing retry with delay
@Test
public void testRetryWithDelay() {
    AtomicInteger counter = new AtomicInteger(0);
    Mono<String> mono = Mono.defer(() -> {
        if (counter.incrementAndGet() < 3) {
            return Mono.error(new RuntimeException("Error"));
        }
        return Mono.just("Success");
    })
    .retryWhen(Retry.backoff(2, Duration.ofSeconds(1)));
    
    StepVerifier.withVirtualTime(() -> mono)
        .expectSubscription()
        .thenAwait(Duration.ofSeconds(3))
        .expectNext("Success")
        .verifyComplete();
}`,note:`Virtual time makes time-based testing fast and reliable.`},{id:96,topic:`Testing Strategies`,question:`What is TestPublisher and how is it useful for testing reactive streams?`,answer:`TestPublisher is a testing utility for creating controlled publishers. Useful for:

1. Simulating various publisher behaviors
2. Testing backpressure
3. Simulating errors
4. Testing edge cases

It provides full control over the publishing process.`,example:`// Basic TestPublisher usage
@Test
public void testTestPublisher() {
    TestPublisher<Integer> publisher = TestPublisher.create();
    
    Flux<Integer> flux = publisher.flux();
    
    StepVerifier.create(flux)
        .then(() -> {
            publisher.emit(1, 2, 3);
            publisher.complete();
        })
        .expectNext(1, 2, 3)
        .verifyComplete();
}

// Testing errors with TestPublisher
@Test
public void testWithError() {
    TestPublisher<String> publisher = TestPublisher.create();
    
    StepVerifier.create(publisher.flux())
        .then(() -> {
            publisher.emit("Hello");
            publisher.error(new RuntimeException("Test error"));
        })
        .expectNext("Hello")
        .expectError(RuntimeException.class)
        .verify();
}

// Testing backpressure
@Test
public void testBackpressureWithTestPublisher() {
    TestPublisher<Integer> publisher = TestPublisher.create();
    
    StepVerifier.create(publisher.flux(), 5)
        .then(() -> {
            publisher.emit(1, 2, 3, 4, 5);
        })
        .expectNext(1, 2, 3, 4, 5)
        .thenRequest(3)
        .then(() -> {
            publisher.emit(6, 7, 8);
        })
        .expectNext(6, 7, 8)
        .thenCancel()
        .verify();
}

// Testing late subscription
@Test
public void testLateSubscription() {
    TestPublisher<String> publisher = TestPublisher.create();
    publisher.emit("A", "B", "C");
    
    StepVerifier.create(publisher.flux())
        .then(() -> {
            // Subscriber joins after emissions
        })
        .expectNext("A", "B", "C")
        .verifyComplete();
}

// Testing conditional publishing
@Test
public void testConditionalPublishing() {
    TestPublisher<Integer> publisher = TestPublisher.create();
    AtomicInteger count = new AtomicInteger(0);
    
    StepVerifier.create(publisher.flux())
        .then(() -> {
            publisher.emit(1);
            if (count.get() > 0) {
                publisher.emit(2);
            }
        })
        .expectNext(1)
        .thenCancel()
        .verify();
}

// Testing with TestPublisher and VirtualTime
@Test
public void testWithVirtualTime() {
    TestPublisher<Long> publisher = TestPublisher.create();
    
    StepVerifier.withVirtualTime(() -> publisher.flux())
        .then(() -> {
            publisher.emit(1L);
            publisher.emit(2L);
            publisher.complete();
        })
        .expectNext(1L, 2L)
        .verifyComplete();
}`,note:`TestPublisher gives full control for testing edge cases and error scenarios.`},{id:97,topic:`Performance Tuning & Best Practices`,question:`How do you measure and improve throughput in reactive applications?`,answer:`Measure throughput using metrics, monitoring, and load testing. Improve by:

1. Proper scheduler selection
2. Concurrency tuning
3. Backpressure optimization
4. Connection pooling
5. Caching strategies`,example:`// Monitoring throughput
@Service
public class ThroughputMonitor {
    private final MeterRegistry registry;
    private final Counter requestsCounter;
    private final Timer requestTimer;
    
    public ThroughputMonitor(MeterRegistry registry) {
        this.registry = registry;
        this.requestsCounter = Counter.builder("http.requests")
            .register(registry);
        this.requestTimer = Timer.builder("http.request.duration")
            .register(registry);
    }
    
    public <T> Mono<T> measure(Mono<T> mono) {
        return mono
            .doOnSubscribe(s -> requestsCounter.increment())
            .doOnSuccess(r -> requestTimer.record(
                System.currentTimeMillis() - startTime
            ))
            .doOnError(e -> {
                Counter.builder("http.errors")
                    .register(registry)
                    .increment();
            });
    }
}

// Optimizing throughput
public class ThroughputOptimizer {
    // 1. Parallel processing for CPU-bound
    public Flux<Result> parallelProcessing(Flux<Data> data) {
        return data
            .parallel(4)
            .runOn(Schedulers.parallel())
            .map(this::process)
            .sequential()
            .limitRate(128); // Backpressure control
    }
    
    // 2. Concurrency tuning for I/O
    public Flux<Result> ioProcessing(Flux<Data> data) {
        return data
            .flatMap(item -> 
                externalCall(item)
                    .subscribeOn(Schedulers.boundedElastic())
                    .timeout(Duration.ofSeconds(5))
            , 64); // Concurrency limit
    }
    
    // 3. Connection pooling
    @Bean
    public WebClient webClient() {
        ConnectionProvider provider = ConnectionProvider.builder("pool")
            .maxConnections(100)
            .pendingAcquireMaxCount(1000)
            .pendingAcquireTimeout(Duration.ofSeconds(30))
            .build();
            
        return WebClient.builder()
            .clientConnector(new ReactorClientHttpConnector(
                HttpClient.create(provider)
            ))
            .build();
    }
    
    // 4. Caching
    @Cacheable("data")
    public Mono<Data> getCachedData(String id) {
        return database.findById(id);
    }
    
    // 5. Benchmark
    public void benchmarkThroughput() {
        // Use Gatling or JMeter for load testing
        // Monitor metrics during test
        // Adjust parameters based on results
    }
}`,note:`Measure, identify bottlenecks, optimize, and measure again.`},{id:98,topic:`Performance Tuning & Best Practices`,question:`What are common performance pitfalls in reactive programming and how to avoid them?`,answer:`Common pitfalls:

1. Blocking calls on wrong scheduler
2. No backpressure handling
3. Too many threads
4. Memory leaks from subscriptions
5. Inefficient operator usage`,example:`// Pitfall 1: Blocking on wrong scheduler
// BAD
Flux.just(1, 2, 3)
    .publishOn(Schedulers.parallel())
    .map(i -> {
        Thread.sleep(100); // Blocking on parallel
        return i * 2;
    })
    .subscribe();

// GOOD
Flux.just(1, 2, 3)
    .subscribeOn(Schedulers.boundedElastic())
    .map(i -> {
        Thread.sleep(100); // Blocking on elastic
        return i * 2;
    })
    .subscribe();

// Pitfall 2: No backpressure
// BAD
Flux.interval(Duration.ofMillis(1))
    .subscribe(data -> {
        Thread.sleep(100); // Can't keep up
    });

// GOOD
Flux.interval(Duration.ofMillis(1))
    .onBackpressureBuffer(1000)
    .limitRate(100)
    .subscribe(data -> {
        Thread.sleep(100);
    });

// Pitfall 3: Subscription leak
// BAD
public void badExample() {
    Flux.interval(Duration.ofSeconds(1))
        .subscribe(); // Never cancelled
}

// GOOD
public void goodExample() {
    Disposable subscription = Flux.interval(Duration.ofSeconds(1))
        .take(10)
        .subscribe();
    
    // Clean up
    subscription.dispose();
}

// Pitfall 4: Inefficient operators
// BAD - Multiple passes
Flux.range(1, 1000)
    .filter(i -> i % 2 == 0)
    .map(i -> i * 2)
    .filter(i -> i > 100)
    .map(i -> i.toString())
    .subscribe();

// GOOD - Combine operations
Flux.range(1, 1000)
    .map(i -> {
        if (i % 2 != 0) return null;
        int doubled = i * 2;
        if (doubled <= 100) return null;
        return String.valueOf(doubled);
    })
    .filter(Objects::nonNull)
    .subscribe();

// Pitfall 5: Excessive flatMap
// BAD - Too much concurrency
Flux.range(1, 1000)
    .flatMap(i -> externalCall(i))
    .subscribe(); // Overwhelms system

// GOOD - Limited concurrency
Flux.range(1, 1000)
    .flatMap(i -> externalCall(i), 64)
    .subscribe(); // Limits concurrent calls

// Pitfall 6: Memory issues
// BAD - Collects everything in memory
Flux.range(1, 1000000)
    .collectList()
    .subscribe();

// GOOD - Streams processing
Flux.range(1, 1000000)
    .buffer(1000)
    .flatMap(list -> processBatch(list))
    .subscribe();`,note:`Avoid common pitfalls through proper scheduler choice, backpressure handling, and efficient operators.`},{id:99,topic:`Performance Tuning & Best Practices`,question:`How do you handle memory leaks in reactive applications (subscription leaks)?`,answer:`Subscription leaks occur when subscriptions aren't properly cancelled. Prevent by:

1. Using take() operators
2. Properly disposing subscriptions
3. Using doFinally() for cleanup
4. Using bounded processors
5. Monitoring subscriptions`,example:`// Subscription leak detection
@Service
public class LeakDetection {
    private final List<Disposable> subscriptions = 
        Collections.synchronizedList(new ArrayList<>());
    
    public void monitorSubscriptions() {
        // Regular monitoring
        ScheduledExecutorService scheduler = 
            Executors.newSingleThreadScheduledExecutor();
        scheduler.scheduleAtFixedRate(() -> {
            int count = subscriptions.size();
            if (count > 100) {
                log.warn("Potential subscription leak: {} subscriptions", count);
            }
        }, 1, 1, TimeUnit.MINUTES);
    }
}

// Proper subscription management
public class SubscriptionManagement {
    // 1. Using take() - Auto completes
    public void withTake() {
        Flux.interval(Duration.ofSeconds(1))
            .take(10) // Auto completes
            .subscribe();
    }
    
    // 2. Manual disposal
    public void withDisposable() {
        Disposable subscription = Flux.interval(Duration.ofSeconds(1))
            .subscribe();
        
        // Later
        subscription.dispose();
    }
    
    // 3. Using doFinally for cleanup
    public void withCleanup() {
        Flux.interval(Duration.ofSeconds(1))
            .doFinally(signal -> {
                // Cleanup on complete, error, or cancel
                log.info("Cleaning up resources");
            })
            .take(10)
            .subscribe();
    }
    
    // 4. Using CompositeDisposable
    public void withComposite() {
        CompositeDisposable composite = new CompositeDisposable();
        
        composite.add(
            Flux.interval(Duration.ofSeconds(1))
                .subscribe()
        );
        composite.add(
            Flux.just("A", "B")
                .subscribe()
        );
        
        // Dispose all
        composite.dispose();
    }
}

// Prevents leaks in WebFlux controllers
@RestController
public class ControllerWithoutLeak {
    @GetMapping("/stream")
    public Flux<Event> streamEvents() {
        return eventService.getEvents()
            .take(Duration.ofMinutes(5)) // Auto complete after 5 minutes
            .timeout(Duration.ofSeconds(30)) // Auto error on timeout
            .doFinally(s -> log.info("Stream closed"));
    }
}

// Monitoring with metrics
public class SubscriptionMetrics {
    private final MeterRegistry registry;
    
    public void measureSubscriptions() {
        Gauge.builder("active.subscriptions", 
            () -> subscriptionCount()
        ).register(registry);
        
        Counter.builder("subscription.created")
            .register(registry);
        
        Counter.builder("subscription.disposed")
            .register(registry);
    }
}`,note:`Always clean up subscriptions to prevent memory leaks. Use take(), doFinally(), or manual disposal.`},{id:100,topic:`Performance Tuning & Best Practices`,question:`What are the best practices for production-ready reactive applications?`,answer:`Best practices:

1. Proper error handling
2. Monitoring and metrics
3. Backpressure strategies
4. Thread pool tuning
5. Circuit breakers
6. Distributed tracing
7. Graceful shutdown
8. Configuration management`,example:`// 1. Production-ready configuration
@Configuration
public class ProductionConfig {
    @Bean
    public Scheduler customScheduler() {
        return Schedulers.boundedElastic()
            .as(new ScheduledExecutorService() {
                // Custom configuration
            });
    }
    
    @Bean
    public WebClient webClient() {
        return WebClient.builder()
            .filter(new LoggingFilter())
            .filter(new CircuitBreakerFilter())
            .clientConnector(new ReactorClientHttpConnector(
                HttpClient.create()
                    .option(ChannelOption.CONNECT_TIMEOUT_MILLIS, 5000)
                    .option(ChannelOption.SO_KEEPALIVE, true)
            ))
            .build();
    }
}

// 2. Production service with all best practices
@Service
public class ProductionService {
    private final MeterRegistry metrics;
    private final CircuitBreaker circuitBreaker;
    
    public Mono<Result> process(Request request) {
        return Mono.fromCallable(() -> validate(request))
            .subscribeOn(Schedulers.boundedElastic())
            .flatMap(this::processWithCircuitBreaker)
            .retryWhen(Retry.backoff(3, Duration.ofSeconds(1)))
            .timeout(Duration.ofSeconds(5))
            .doOnSuccess(r -> metrics.counter("success").increment())
            .doOnError(e -> {
                metrics.counter("error").increment();
                log.error("Processing failed", e);
            })
            .onErrorResume(e -> {
                return cache.get(request.getId())
                    .switchIfEmpty(Mono.just(Result.defaultResult()));
            });
    }
    
    private Mono<Result> processWithCircuitBreaker(Request request) {
        return Mono.defer(() -> {
            if (circuitBreaker.isOpen()) {
                return Mono.just(Result.circuitBreakerOpen());
            }
            return externalService.call(request);
        });
    }
}

// 3. Graceful shutdown
@SpringBootApplication
public class ReactiveApplication {
    public static void main(String[] args) {
        SpringApplication.run(ReactiveApplication.class, args);
    }
    
    @Bean
    public GracefulShutdown gracefulShutdown() {
        return new GracefulShutdown();
    }
}

class GracefulShutdown {
    public void shutdown() {
        // 1. Stop accepting new requests
        // 2. Complete in-flight requests
        // 3. Clean up resources
        // 4. Shutdown thread pools
        // 5. Close connections
    }
}

// 4. Production monitoring
@Configuration
public class MonitoringConfig {
    @Bean
    public MeterRegistry meterRegistry() {
        return new CompositeMeterRegistry();
    }
    
    @Bean
    public HealthIndicator healthIndicator() {
        return new HealthIndicator() {
            @Override
            public Health health() {
                return Health.up()
                    .withDetail("threads", Thread.activeCount())
                    .withDetail("scheduler", schedulerStatus())
                    .build();
            }
        };
    }
}`,note:`Production applications need monitoring, circuit breakers, and proper error handling.`}],s=r(),c=e=>{let t=document.createElement(`textarea`);return t.textContent=e,t.innerHTML},l=(e,t)=>{try{return t||=`java`,i.highlight(e,{language:t,ignoreIllegals:!0}).value}catch(n){return console.warn(`Highlight.js error for language '${t}':`,n),c(e)}},u=e=>{let t=[];return e.answer&&t.push({type:`text`,content:e.answer}),e.example&&t.push({type:`code`,content:e.example,language:`java`}),e.note&&t.push({type:`note`,content:e.note}),t},d=new Map;o.forEach(e=>{d.has(e.topic)||d.set(e.topic,[]),d.get(e.topic).push({id:String(e.id),question:e.question,response:u(e)})});var f=Array.from(d,([e,t])=>({name:e,questions:t})),p=o.length;function m(){let[e,t]=(0,a.useState)(null),r=n=>{t(e===n?null:n)};return(0,s.jsxs)(`div`,{className:`spring-boot-interview-page reactive-interview-page`,children:[(0,s.jsx)(`section`,{className:`interview-header`,children:(0,s.jsxs)(`div`,{className:`interview-header-content`,children:[(0,s.jsx)(n,{to:`/reactive-programming`,className:`back-button`,children:`← Back to Reactive Programming`}),(0,s.jsx)(`h1`,{className:`interview-title`,children:`Reactive Programming Interview Questions`}),(0,s.jsx)(`p`,{className:`interview-subtitle`,children:`Master Reactive Programming interview questions with detailed answers and code examples`}),(0,s.jsxs)(`div`,{className:`interview-stats`,children:[(0,s.jsxs)(`div`,{className:`interview-stat`,children:[(0,s.jsxs)(`span`,{className:`stat-number`,children:[p,`+`]}),(0,s.jsx)(`span`,{className:`stat-label`,children:`Questions`})]}),(0,s.jsxs)(`div`,{className:`interview-stat`,children:[(0,s.jsx)(`span`,{className:`stat-number`,children:f.length}),(0,s.jsx)(`span`,{className:`stat-label`,children:`Categories`})]}),(0,s.jsxs)(`div`,{className:`interview-stat`,children:[(0,s.jsx)(`span`,{className:`stat-number`,children:`100%`}),(0,s.jsx)(`span`,{className:`stat-label`,children:`Free`})]})]})]})}),(0,s.jsx)(`section`,{className:`questions-section`,children:(0,s.jsx)(`div`,{className:`questions-container`,children:(0,s.jsx)(`div`,{className:`questions-list`,children:f.map((t,n)=>(0,s.jsxs)(`div`,{className:`category-section`,children:[(0,s.jsx)(`h2`,{className:`category-title`,children:t.name}),(0,s.jsx)(`div`,{className:`questions-vertical`,children:t.questions.map(t=>(0,s.jsxs)(`div`,{className:`question-item-vertical ${e===t.id?`active`:``}`,children:[(0,s.jsxs)(`div`,{className:`question-item-header`,onClick:()=>r(t.id),children:[(0,s.jsxs)(`span`,{className:`q-number`,children:[`Q`,t.id]}),(0,s.jsx)(`p`,{className:`q-text`,children:t.question}),(0,s.jsx)(`span`,{className:`expand-arrow ${e===t.id?`expanded`:``}`,children:`▼`})]}),e===t.id&&(0,s.jsx)(`div`,{className:`question-item-content`,children:(0,s.jsx)(`div`,{className:`question-card`,children:(0,s.jsxs)(`div`,{className:`question-answer`,children:[(0,s.jsx)(`h3`,{className:`answer-title`,children:`Answer:`}),t.response.map((e,t)=>e.type===`code`?(0,s.jsxs)(`div`,{className:`code-block`,children:[(0,s.jsx)(`div`,{className:`code-header`,children:(0,s.jsx)(`span`,{className:`code-language`,children:e.language||`java`})}),(0,s.jsx)(`pre`,{className:`language-${e.language||`java`}`,children:(0,s.jsx)(`code`,{className:`language-${e.language||`java`}`,dangerouslySetInnerHTML:{__html:l(e.content,e.language)}})})]},t):e.type===`example`?(0,s.jsxs)(`p`,{className:`answer-text answer-${e.type}`,style:{whiteSpace:`pre-wrap`},children:[`📘 `,e.content]},t):e.type===`note`?(0,s.jsxs)(`p`,{className:`answer-text answer-${e.type}`,style:{whiteSpace:`pre-wrap`},children:[`💡 `,e.content]},t):(0,s.jsx)(`p`,{className:`answer-text answer-${e.type}`,style:{whiteSpace:`pre-wrap`},children:e.content},t))]})})})]},t.id))})]},n))})})})]})}export{m as default};