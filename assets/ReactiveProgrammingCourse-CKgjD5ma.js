import{r as e}from"./rolldown-runtime-QTnfLwEv.js";import{t}from"./react-CZI7_Jkm.js";import{r as n,s as r}from"./index-yz2jrTMK.js";import{t as i}from"./atom-one-dark-CL0A0LnX.js";/* empty css                      */var a=e(t(),1),o=[{id:1,title:`What is Reactive Programming?`,category:`basics`,level:`beginner`,description:`Reactive programming is a paradigm for building non-blocking, asynchronous applications that handle data streams with backpressure support. In Spring, it's implemented via Project Reactor and WebFlux.`,why:`To handle high concurrency with fewer threads, improve resource utilization, and build resilient systems.`,when:`High-load APIs, microservices, I/O-intensive applications, real-time streaming.`,code:`// Maven pom.xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-webflux</artifactId>
</dependency>

// ✅ Reactive (Spring WebFlux)
@GetMapping("/user/{id}")
public Mono<User> getUser(@PathVariable Long id) {
    return userService.findById(id); // Non-blocking!
}`},{id:2,title:`WebFlux vs Spring MVC`,category:`basics`,level:`beginner`,description:`Spring MVC is blocking (one thread per request). WebFlux is non-blocking with event-loop model, handling many requests with few threads.`,why:`WebFlux scales better under high load by not wasting threads on I/O waits.`,when:`Choose WebFlux for high-concurrency I/O apps; MVC for simpler blocking apps.`,code:`// Spring MVC - Blocking
public List<User> getUsers() {
    return userRepository.findAll(); // Blocks thread
}

// Spring WebFlux - Non-blocking
public Flux<User> getUsers() {
    return userRepository.findAll(); // Never blocks
}`},{id:3,title:`Project Reactor`,category:`reactor`,level:`beginner`,description:`Project Reactor is the reactive library powering Spring WebFlux. It implements Reactive Streams specification and provides Mono and Flux types.`,why:`Reactor is the foundation of all reactive programming in Spring.`,when:`Always needed for WebFlux or R2DBC.`,code:`// Maven dependency
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-webflux</artifactId>
</dependency>

// Reactor provides two core types:
// Mono<T> - 0 or 1 element
// Flux<T> - 0 to N elements`},{id:4,title:`Mono<T> (0-1 Element)`,category:`reactor`,level:`beginner`,description:`Mono represents a stream of 0 or 1 element. Used for single results like findById, save, or void operations.`,why:`To represent async single-value responses.`,when:`GET by ID, POST create, DELETE operations.`,code:`import reactor.core.publisher.Mono;

// Create Mono
Mono<String> mono = Mono.just("Hello");
Mono<User> userMono = Mono.fromCallable(() -> fetchUser());

// Use in Controller
@GetMapping("/user/{id}")
public Mono<User> getUser(@PathVariable Long id) {
    return userRepository.findById(id);
}

// Void operation
public Mono<Void> deleteUser(Long id) {
    return userRepository.deleteById(id);
}`},{id:5,title:`Flux<T> (0-N Elements)`,category:`reactor`,level:`beginner`,description:`Flux represents a stream of 0 to N elements. Used for collections, streaming, or real-time data.`,why:`To represent async streams of multiple values.`,when:`GET all, streaming data, real-time events.`,code:`import reactor.core.publisher.Flux;

// Create Flux
Flux<Integer> numbers = Flux.range(1, 10);
Flux<String> names = Flux.just("Alice", "Bob", "Charlie");

// Use in Controller
@GetMapping("/users")
public Flux<User> getUsers() {
    return userRepository.findAll();
}

// Streaming with Server-Sent Events
@GetMapping(value = "/stream", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
public Flux<Event> streamEvents() {
    return eventService.stream();
}`},{id:6,title:`Core Operators (map, flatMap, filter)`,category:`reactor`,level:`beginner`,description:`Operators transform reactive streams. map (synchronous), flatMap (asynchronous), filter (predicate-based).`,why:`To transform and process data reactively.`,when:`Data transformation, filtering, mapping responses.`,code:`import reactor.core.publisher.Mono;
import reactor.core.publisher.Flux;

// map - synchronous transformation
Mono<User> userMono = userRepository.findById(1L)
    .map(user -> {
        user.setName(user.getName().toUpperCase());
        return user;
    });

// flatMap - asynchronous transformation
Mono<Order> orderMono = userRepository.findById(1L)
    .flatMap(user -> orderService.getOrdersByUser(user.getId()));

// filter - conditional
Flux<User> adults = userRepository.findAll()
    .filter(user -> user.getAge() >= 18);`},{id:7,title:`Spring Boot WebFlux Starter`,category:`webflux`,level:`beginner`,description:`The spring-boot-starter-webflux dependency includes everything needed for reactive web applications.`,why:`One dependency gives you WebFlux, Reactor, and Netty server.`,when:`Every reactive Spring Boot project.`,code:`// pom.xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-webflux</artifactId>
</dependency>

<dependency>
    <groupId>io.projectreactor</groupId>
    <artifactId>reactor-test</artifactId>
    <scope>test</scope>
</dependency>

// application.yml
spring:
  web-application-type: reactive`},{id:8,title:`Reactive Controller (@RestController)`,category:`webflux`,level:`beginner`,description:`Reactive controllers are similar to MVC controllers but return Mono/Flux instead of objects.`,why:`To build non-blocking REST APIs.`,when:`All REST endpoints in reactive applications.`,code:`@RestController
@RequestMapping("/api/products")
public class ProductController {
    private final ProductRepository repository;

    public ProductController(ProductRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public Flux<Product> getAll() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public Mono<ResponseEntity<Product>> getById(@PathVariable Long id) {
        return repository.findById(id)
            .map(ResponseEntity::ok)
            .defaultIfEmpty(ResponseEntity.notFound().build());
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Mono<Product> create(@RequestBody Mono<Product> productMono) {
        return productMono.flatMap(repository::save);
    }
}`},{id:9,title:`Functional Endpoints (Router & Handler)`,category:`webflux`,level:`beginner`,description:`Functional programming alternative to annotations. Uses RouterFunction and HandlerFunction.`,why:`Alternative to annotations for more functional style.`,when:`Programmatic routing, testing, or annotation-based approach not suitable.`,code:`// Handler
@Component
public class ProductHandler {
    public Mono<ServerResponse> getAll(ServerRequest request) {
        return ServerResponse.ok()
            .body(repository.findAll(), Product.class);
    }

    public Mono<ServerResponse> getById(ServerRequest request) {
        Long id = Long.parseLong(request.pathVariable("id"));
        return repository.findById(id)
            .flatMap(product -> ServerResponse.ok().bodyValue(product))
            .switchIfEmpty(ServerResponse.notFound().build());
    }
}

// Router
@Configuration
public class ProductRouter {
    @Bean
    public RouterFunction<ServerResponse> routes(ProductHandler handler) {
        return RouterFunctions.route()
            .GET("/api/products", handler::getAll)
            .GET("/api/products/{id}", handler::getById)
            .build();
    }
}`},{id:10,title:`R2DBC Repository`,category:`r2dbc`,level:`beginner`,description:`Reactive relational database access using R2DBC. Extends ReactiveCrudRepository to return Mono/Flux.`,why:`Non-blocking database access for relational databases.`,when:`PostgreSQL, MySQL, H2 with reactive drivers.`,code:`// pom.xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-r2dbc</artifactId>
</dependency>
<dependency>
    <groupId>org.postgresql</groupId>
    <artifactId>r2dbc-postgresql</artifactId>
</dependency>

// Entity
@Table("products")
public class Product {
    @Id
    private Long id;
    private String name;
    private BigDecimal price;
}

// Repository
public interface ProductRepository
    extends ReactiveCrudRepository<Product, Long> {

    Flux<Product> findByNameContaining(String name);
}`},{id:11,title:`R2DBC Configuration`,category:`r2dbc`,level:`beginner`,description:`Configuring R2DBC with connection pool and properties.`,why:`Proper configuration ensures reactive database connectivity.`,when:`Setting up R2DBC in any project.`,code:`// application.yml
spring:
  r2dbc:
    url: r2dbc:postgresql://localhost:5432/mydb
    username: admin
    password: admin
    pool:
      max-size: 10
      initial-size: 5
      max-idle-time: 30m

// Schema initialization
@Configuration
public class DatabaseConfig {
    @Bean
    public ConnectionFactoryInitializer initializer(ConnectionFactory connectionFactory) {
        ConnectionFactoryInitializer initializer = new ConnectionFactoryInitializer();
        initializer.setConnectionFactory(connectionFactory);
        initializer.setDatabasePopulator(new ResourceDatabasePopulator(
            new ClassPathResource("schema.sql")
        ));
        return initializer;
    }
}`},{id:12,title:`Reactive Service Layer`,category:`reactor`,level:`beginner`,description:`Services in reactive applications return Mono/Flux and handle business logic reactively.`,why:`Business logic stays non-blocking end-to-end.`,when:`All service-layer operations.`,code:`@Service
public class UserService {
    private final UserRepository repository;

    public Mono<User> createUser(CreateUserRequest request) {
        return repository.findByEmail(request.getEmail())
            .flatMap(existing -> Mono.<User>error(new DuplicateEmailException()))
            .switchIfEmpty(Mono.defer(() -> {
                User user = new User();
                user.setName(request.getName());
                user.setEmail(request.getEmail());
                return repository.save(user);
            }));
    }

    public Flux<User> getActiveUsers() {
        return repository.findByActiveTrue();
    }
}`},{id:13,title:`Error Handling (onErrorResume, onErrorReturn)`,category:`reactor`,level:`intermediate`,description:`Handle errors gracefully in reactive streams.`,why:`To handle failures gracefully and provide meaningful error responses.`,when:`Any operation that can fail.`,code:`@Service
public class ProductService {
    public Mono<Product> getProduct(Long id) {
        return repository.findById(id)
            .switchIfEmpty(Mono.error(new ProductNotFoundException(id)))
            .onErrorResume(ProductNotFoundException.class, e ->
                Mono.just(new Product()))
            .onErrorResume(DatabaseException.class, e ->
                Mono.error(new ServiceUnavailableException("Database unavailable")))
            .timeout(Duration.ofSeconds(5))
            .onErrorReturn(TimeoutException.class, new Product());
    }
}`},{id:14,title:`Backpressure`,category:`reactor`,level:`intermediate`,description:`Backpressure allows consumers to control the rate of data production to prevent overload.`,why:`To prevent system overload when producer is faster than consumer.`,when:`Streaming, real-time data, high-throughput scenarios.`,code:`// Backpressure strategies
// 1. Buffer - collect excess
Flux.range(1, 1000)
    .onBackpressureBuffer(100)
    .subscribe();

// 2. Drop - discard excess
Flux.range(1, 1000)
    .onBackpressureDrop()
    .subscribe();

// 3. Latest - keep only latest
Flux.range(1, 1000)
    .onBackpressureLatest()
    .subscribe();

// In controller
@GetMapping(value = "/stream", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
public Flux<Event> streamEvents() {
    return eventService.stream()
        .onBackpressureBuffer(1000, BufferOverflowStrategy.DROP_OLDEST);
}`},{id:15,title:`WebClient (Reactive HTTP Client)`,category:`webflux`,level:`intermediate`,description:`WebClient is the reactive alternative to RestTemplate for making non-blocking HTTP calls.`,why:`For reactive, non-blocking HTTP calls to external services.`,when:`Any inter-service communication.`,code:`import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class WebClientConfig {
    @Bean
    public WebClient webClient() {
        return WebClient.builder()
            .baseUrl("http://user-service")
            .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
            .build();
    }
}

@Service
public class OrderService {
    private final WebClient webClient;

    public Mono<User> getUser(Long userId) {
        return webClient.get()
            .uri("/api/users/{id}", userId)
            .retrieve()
            .bodyToMono(User.class)
            .timeout(Duration.ofSeconds(3))
            .onErrorResume(WebClientResponseException.NotFound.class,
                e -> Mono.empty());
    }
}`},{id:16,title:`WebClient with Load Balancing`,category:`microservices`,level:`intermediate`,description:`Use @LoadBalanced with WebClient.Builder for client-side load balancing.`,why:`Distribute requests across multiple service instances.`,when:`Service-to-service communication in microservices.`,code:`// pom.xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-loadbalancer</artifactId>
</dependency>

// Configuration
@Configuration
public class WebClientConfig {
    @Bean
    @LoadBalanced
    public WebClient.Builder loadBalancedWebClientBuilder() {
        return WebClient.builder();
    }
}

@Service
public class OrderService {
    private final WebClient.Builder webClientBuilder;

    public Mono<User> getUser(Long id) {
        return webClientBuilder.build()
            .get()
            .uri("http://user-service/api/users/{id}", id)
            .retrieve()
            .bodyToMono(User.class);
    }
}`},{id:17,title:`Service Discovery with Eureka`,category:`microservices`,level:`intermediate`,description:`Eureka provides service discovery for reactive microservices. Use @EnableDiscoveryClient.`,why:`For dynamic service discovery and registration.`,when:`Microservices architecture with service registry.`,code:`// pom.xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
</dependency>

// Main application
@SpringBootApplication
@EnableDiscoveryClient
public class ProductServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(ProductServiceApplication.class, args);
    }
}

// application.yml
eureka:
  client:
    service-url:
      defaultZone: http://eureka-server:8761/eureka/
  instance:
    prefer-ip-address: true

spring:
  application:
    name: product-service`},{id:18,title:`Spring Cloud Gateway`,category:`gateway`,level:`intermediate`,description:`API Gateway built on Spring WebFlux for routing, filtering, and load balancing.`,why:`Single entry point for all client requests.`,when:`Microservices architecture needs a gateway.`,code:`// pom.xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-gateway</artifactId>
</dependency>

// application.yml
spring:
  cloud:
    gateway:
      routes:
        - id: product-service
          uri: lb://product-service
          predicates:
            - Path=/api/products/**
          filters:
            - name: CircuitBreaker
              args:
                name: productService
                fallbackUri: forward:/fallback

@Component
public class LoggingFilter implements GlobalFilter {
    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        log.info("Request: {} {}",
            exchange.getRequest().getMethod(),
            exchange.getRequest().getPath());
        return chain.filter(exchange);
    }
}`},{id:19,title:`Circuit Breaker (Resilience4J)`,category:`microservices`,level:`intermediate`,description:`Circuit breaker pattern prevents cascading failures. Use Resilience4J with reactive support.`,why:`To prevent cascading failures and improve resilience.`,when:`Any external service call that can fail.`,code:`// pom.xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-circuitbreaker-reactor-resilience4j</artifactId>
</dependency>

// application.yml
resilience4j.circuitbreaker:
  instances:
    productService:
      failureRateThreshold: 50
      waitDurationInOpenState: 5s
      ringBufferSizeInHalfOpenState: 10

@Service
public class OrderService {
    private final ReactiveCircuitBreakerFactory circuitBreakerFactory;

    public Mono<Order> getOrder(Long id) {
        return circuitBreakerFactory.create("productService")
            .run(
                repository.findById(id),
                throwable -> Mono.just(new Order())
            );
    }
}`},{id:20,title:`Reactive Kafka (Reactor Kafka)`,category:`microservices`,level:`intermediate`,description:`Reactive Kafka integration for event-driven microservices with backpressure support.`,why:`For event-driven, reactive microservices with Kafka.`,when:`Event-driven architecture, real-time processing.`,code:`// pom.xml
<dependency>
    <groupId>io.projectreactor.kafka</groupId>
    <artifactId>reactor-kafka</artifactId>
</dependency>

@Configuration
public class KafkaConfig {
    @Bean
    public KafkaSender<Integer, String> kafkaSender() {
        Map<String, Object> props = new HashMap<>();
        props.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:9092");
        props.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, IntegerSerializer.class);
        props.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, StringSerializer.class);

        SenderOptions<Integer, String> options = SenderOptions.create(props);
        return KafkaSender.create(options);
    }
}`},{id:21,title:`Reactive Kafka Consumer`,category:`microservices`,level:`intermediate`,description:`Reactive Kafka consumer with backpressure and error handling.`,why:`To process Kafka messages reactively with backpressure.`,when:`Event-driven microservices using Kafka.`,code:`@Configuration
public class KafkaConsumerConfig {
    @Bean
    public KafkaReceiver<Integer, String> kafkaReceiver() {
        Map<String, Object> props = new HashMap<>();
        props.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:9092");
        props.put(ConsumerConfig.GROUP_ID_CONFIG, "order-consumer-group");
        props.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, IntegerDeserializer.class);
        props.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class);

        ReceiverOptions<Integer, String> options = ReceiverOptions.create(props)
            .subscription(List.of("order-events"));
        return KafkaReceiver.create(options);
    }
}

@Service
public class OrderEventConsumer {
    private final KafkaReceiver<Integer, String> receiver;

    @PostConstruct
    public void consume() {
        receiver.receive()
            .concatMap(record -> orderService.processOrder(record.value())
                .doOnSuccess(v -> record.receiverOffset().acknowledge())
                .onErrorResume(e -> Mono.empty()))
            .subscribe();
    }
}`},{id:22,title:`Server-Sent Events (SSE)`,category:`webflux`,level:`intermediate`,description:`Push real-time events from server to client using Server-Sent Events.`,why:`For real-time server-to-client push notifications.`,when:`Live updates, notifications, dashboards.`,code:`@RestController
@RequestMapping("/api/events")
public class EventController {
    private final Sinks.Many<Event> sink = Sinks.many()
        .multicast().onBackpressureBuffer();

    @GetMapping(produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<ServerSentEvent<Event>> stream() {
        return sink.asFlux()
            .map(event -> ServerSentEvent.<Event>builder()
                .id(event.getId())
                .event("order-update")
                .data(event)
                .build());
    }
}`},{id:23,title:`Reactive WebSocket`,category:`webflux`,level:`intermediate`,description:`WebSocket support with reactive handlers for bidirectional communication.`,why:`For real-time bidirectional communication.`,when:`Chat, collaborative apps, real-time games.`,code:`// WebSocket Handler
@Component
public class ChatWebSocketHandler implements WebSocketHandler {
    private final Sinks.Many<String> sink = Sinks.many()
        .multicast().onBackpressureBuffer();

    @Override
    public Mono<Void> handle(WebSocketSession session) {
        Flux<WebSocketMessage> out = sink.asFlux()
            .map(session::textMessage);

        Flux<WebSocketMessage> in = session.receive()
            .map(WebSocketMessage::getPayloadAsText)
            .doOnNext(sink::tryEmitNext);

        return session.send(out).and(session.receive().then());
    }
}`},{id:24,title:`Reactive Security (Spring Security)`,category:`webflux`,level:`intermediate`,description:`Spring Security with reactive WebFlux support for authentication and authorization.`,why:`To secure reactive endpoints.`,when:`Authentication and authorization needed.`,code:`// pom.xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>

@Configuration
@EnableWebFluxSecurity
public class SecurityConfig {
    @Bean
    public SecurityWebFilterChain securityFilterChain(ServerHttpSecurity http) {
        return http
            .csrf(csrf -> csrf.disable())
            .authorizeExchange(exchange -> exchange
                .pathMatchers("/api/auth/**").permitAll()
                .pathMatchers("/actuator/**").permitAll()
                .anyExchange().authenticated()
            )
            .oauth2ResourceServer(oauth2 -> oauth2.jwt())
            .build();
    }
}`},{id:25,title:`Reactive Transaction Management`,category:`r2dbc`,level:`intermediate`,description:`Reactive transactions with R2DBC using @Transactional annotation.`,why:`To ensure data consistency across multiple operations.`,when:`Multiple DB operations that need atomicity.`,code:`@Service
public class OrderService {
    private final OrderRepository orderRepository;
    private final PaymentService paymentService;

    @Transactional
    public Mono<Order> createOrder(OrderRequest request) {
        return Mono.defer(() -> {
            Order order = new Order();
            order.setAmount(request.getAmount());
            order.setUserId(request.getUserId());

            return orderRepository.save(order)
                .flatMap(saved -> paymentService.processPayment(saved)
                    .thenReturn(saved));
        });
    }
}`},{id:26,title:`Context Propagation (MDC)`,category:`advanced`,level:`intermediate`,description:`Propagate context like MDC, authentication across reactive streams.`,why:`For distributed tracing and logging correlation.`,when:`Distributed systems, microservices logging.`,code:`@RestController
public class UserController {
    @GetMapping("/user")
    public Mono<User> getUser() {
        return Mono.deferContextual(ctx -> {
            String traceId = ctx.getOrDefault("traceId", "unknown");
            log.info("Trace ID: {}", traceId);
            return userService.findById(1L);
        });
    }
}`},{id:27,title:`Mono.fromRunnable & Mono.defer`,category:`reactor`,level:`intermediate`,description:`fromRunnable converts Runnable to Mono. defer defers execution until subscription.`,why:`To control execution timing and handle side effects.`,when:`Lazy initialization, logging, side effects.`,code:`public Mono<Void> logAction(String action) {
    return Mono.fromRunnable(() -> {
        log.info("Action: {}", action);
    });
}

public Mono<User> getUser(Long id) {
    return Mono.defer(() -> {
        if (id < 0) {
            return Mono.error(new InvalidIdException());
        }
        return repository.findById(id);
    });
}`},{id:28,title:`Testing Reactive Applications`,category:`basics`,level:`intermediate`,description:`Testing WebFlux controllers and reactive services using WebTestClient.`,why:`To ensure reactive code works correctly.`,when:`Every reactive project!`,code:`import org.springframework.test.web.reactive.server.WebTestClient;

@WebFluxTest(UserController.class)
public class UserControllerTest {
    @Autowired
    private WebTestClient webTestClient;

    @Test
    public void testGetUser() {
        User user = new User(1L, "Alice");
        when(userService.findById(1L)).thenReturn(Mono.just(user));

        webTestClient.get()
            .uri("/api/users/1")
            .exchange()
            .expectStatus().isOk()
            .expectBody(User.class)
            .isEqualTo(user);
    }
}`},{id:29,title:`RSocket (Reactive Socket)`,category:`advanced`,level:`advanced`,description:`RSocket is a binary protocol for reactive, bi-directional streaming communication.`,why:`For high-performance, reactive inter-service communication.`,when:`Complex microservices with streaming needs.`,code:`// pom.xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-rsocket</artifactId>
</dependency>

@Controller
public class RSocketController {
    @MessageMapping("user.{id}")
    public Mono<User> getUser(@DestinationVariable Long id) {
        return userRepository.findById(id);
    }

    @MessageMapping("users")
    public Flux<User> getUsers() {
        return userRepository.findAll();
    }
}`},{id:30,title:`Reactive MongoDB`,category:`r2dbc`,level:`advanced`,description:`Reactive MongoDB support with ReactiveMongoRepository.`,why:`Non-blocking NoSQL database access.`,when:`Using MongoDB in reactive applications.`,code:`// pom.xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-mongodb-reactive</artifactId>
</dependency>

@Document(collection = "users")
public class User {
    @Id
    private String id;
    private String name;
    private String email;
}

public interface UserRepository
    extends ReactiveMongoRepository<User, String> {

    Mono<User> findByEmail(String email);
}`},{id:31,title:`Reactive Redis (Lettuce)`,category:`advanced`,level:`advanced`,description:`Reactive Redis client using Lettuce for non-blocking caching.`,why:`For reactive caching and real-time data.`,when:`Caching, rate limiting, session storage.`,code:`// pom.xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis-reactive</artifactId>
</dependency>

@Service
public class CachedUserService {
    private final ReactiveRedisTemplate<String, User> redisTemplate;
    private final UserRepository repository;

    public Mono<User> getUser(Long id) {
        String key = "user:" + id;
        return redisTemplate.opsForValue().get(key)
            .switchIfEmpty(repository.findById(id)
                .flatMap(user -> redisTemplate.opsForValue()
                    .set(key, user)
                    .thenReturn(user)));
    }
}`},{id:32,title:`Distributed Tracing (Micrometer & Tempo)`,category:`observability`,level:`advanced`,description:`Distributed tracing for reactive microservices with Micrometer and Tempo.`,why:`To trace requests across multiple services.`,when:`Distributed systems debugging and monitoring.`,code:`// pom.xml
<dependency>
    <groupId>io.micrometer</groupId>
    <artifactId>micrometer-tracing-bridge-brave</artifactId>
</dependency>

// application.yml
management:
  tracing:
    sampling:
      probability: 1.0
  zipkin:
    tracing:
      endpoint: http://tempo:9411/api/v2/spans`},{id:33,title:`Monitoring (Prometheus & Grafana)`,category:`observability`,level:`advanced`,description:`Monitor reactive microservices with Prometheus metrics and Grafana dashboards.`,why:`To monitor system health and performance.`,when:`Production systems, capacity planning.`,code:`// pom.xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
<dependency>
    <groupId>io.micrometer</groupId>
    <artifactId>micrometer-registry-prometheus</artifactId>
</dependency>

@RestController
public class OrderController {
    private final Counter orderCounter = Counter.builder("orders.created")
        .description("Number of orders created")
        .register(Metrics.globalRegistry);
}`},{id:34,title:`Rate Limiting (Resilience4J)`,category:`gateway`,level:`advanced`,description:`Rate limiting to protect services from overload.`,why:`To prevent abuse and protect system resources.`,when:`Public APIs, external service integration.`,code:`resilience4j.ratelimiter:
  instances:
    apiRateLimiter:
      limitForPeriod: 10
      limitRefreshPeriod: 1s
      timeoutDuration: 0s

@Service
public class ApiService {
    private final RateLimiter rateLimiter;

    public Mono<Response> callApi() {
        return Mono.defer(() -> {
            if (rateLimiter.acquirePermission()) {
                return externalApi.call();
            }
            return Mono.error(new RateLimitExceededException());
        });
    }
}`},{id:35,title:`Retry Pattern (Reactive)`,category:`microservices`,level:`advanced`,description:`Retry failed operations with reactive backoff.`,why:`To handle transient failures gracefully.`,when:`Network calls, database operations, API integration.`,code:`import reactor.util.retry.Retry;

public Mono<Data> fetchData() {
    return webClient.get()
        .uri("/api/data")
        .retrieve()
        .bodyToMono(Data.class)
        .retryWhen(Retry.backoff(3, Duration.ofSeconds(1))
            .maxBackoff(Duration.ofSeconds(10))
            .filter(throwable -> throwable instanceof TimeoutException))
        .timeout(Duration.ofSeconds(5));
}`},{id:36,title:`Bulkhead Pattern`,category:`microservices`,level:`advanced`,description:`Isolate failures by limiting concurrent calls.`,why:`To prevent one service from exhausting resources.`,when:`Shared resource pools, limited capacity services.`,code:`resilience4j.bulkhead:
  instances:
    productService:
      maxConcurrentCalls: 10
      maxWaitDuration: 10ms

@Service
public class ProductService {
    private final Bulkhead bulkhead;

    public Mono<Product> getProduct(Long id) {
        return Mono.fromSupplier(() -> {
            try {
                return bulkhead.executeCallable(() -> repository.findById(id));
            } catch (BulkheadFullException e) {
                throw new ServiceUnavailableException("Service busy");
            }
        });
    }
}`},{id:37,title:`Event Sourcing with Reactive`,category:`microservices`,level:`advanced`,description:`Store state changes as events, rebuild state from event stream.`,why:`For audit trails, historical data, and complex state machines.`,when:`Financial systems, order management, audit requirements.`,code:`@Service
public class EventSourcingService {
    public Mono<Void> createOrder(Order order) {
        return Mono.defer(() -> {
            OrderCreatedEvent event = new OrderCreatedEvent(order);
            return eventRepository.save(event)
                .then(kafkaSender.publish(event))
                .then();
        });
    }

    public Mono<Order> rebuildOrder(String orderId) {
        return eventRepository.findByOrderId(orderId)
            .reduce(new Order(), (order, event) -> {
                event.apply(order);
                return order;
            });
    }
}`},{id:38,title:`CQRS with Reactive`,category:`microservices`,level:`advanced`,description:`Separate command and query responsibilities with reactive streams.`,why:`To optimize reads and writes independently.`,when:`High-volume systems with different read/write patterns.`,code:`@Service
public class CqrsService {
    private final CommandRepository commandRepo;
    private final QueryRepository queryRepo;

    public Mono<String> createOrder(CreateOrderCommand cmd) {
        return commandRepo.save(new OrderAggregate(cmd))
            .map(OrderAggregate::getId);
    }

    public Mono<OrderSummary> getOrderSummary(String id) {
        return queryRepo.findSummary(id);
    }
}`},{id:39,title:`Docker Compose with Reactive Services`,category:`microservices`,level:`advanced`,description:`Run all reactive microservices with Docker Compose.`,why:`For easy development and deployment of microservices.`,when:`Local development, CI/CD, production deployment.`,code:`version: '3.8'
services:
  postgres:
    image: postgres:16
    environment:
      POSTGRES_DB: reactive_db
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: admin
    ports: ["5432:5432"]

  product-service:
    build: ./product-service
    ports: ["8080:8080"]
    depends_on: [postgres, kafka, eureka]`},{id:40,title:`Reactive Actuator`,category:`observability`,level:`advanced`,description:`Spring Boot Actuator for reactive applications.`,why:`For monitoring and managing reactive applications.`,when:`Every production application!`,code:`management:
  endpoints:
    web:
      exposure:
        include: health,info,prometheus,metrics

@Component
public class DatabaseHealthIndicator implements ReactiveHealthIndicator {
    @Override
    public Mono<Health> health() {
        return Mono.fromRunnable(() -> {
            // Check database health
            return Health.up().build();
        }).onErrorResume(e -> Mono.just(Health.down(e).build()));
    }
}`},{id:41,title:`Reactive Integration Tests`,category:`basics`,level:`advanced`,description:`Integration testing with reactive containers and TestContainers.`,why:`To ensure reactive services work end-to-end.`,when:`Comprehensive testing strategy.`,code:`import org.testcontainers.containers.PostgreSQLContainer;

@SpringBootTest
@Testcontainers
public class OrderServiceIntegrationTest {
    @Container
    static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:16")
        .withDatabaseName("testdb")
        .withUsername("test")
        .withPassword("test");
}`},{id:42,title:`Virtual Threads with Reactive`,category:`advanced`,level:`advanced`,description:`Combine Virtual Threads (Project Loom) with reactive programming.`,why:`To handle blocking operations without blocking platform threads.`,when:`Migrating legacy code to reactive with minimal changes.`,code:`// Java 21 with Virtual Threads
spring:
  threads:
    virtual:
      enabled: true

public Mono<Response> fetchData() {
    return Mono.fromCallable(() -> {
        return blockingService.getData();
    }).subscribeOn(Schedulers.boundedElastic());
}`},{id:43,title:`GraalVM Native Image`,category:`advanced`,level:`expert`,description:`Compile reactive Spring Boot applications to native images.`,why:`For ultra-fast startup and low memory footprint.`,when:`Serverless, cloud-native applications.`,code:`// pom.xml
<plugin>
    <groupId>org.graalvm.buildtools</groupId>
    <artifactId>native-maven-plugin</artifactId>
</plugin>

// Run: mvn native:compile`},{id:44,title:`Custom Reactor Operators`,category:`reactor`,level:`expert`,description:`Build custom operators for domain-specific transformations.`,why:`For specialized transformations and cross-cutting concerns.`,when:`Metrics, logging, custom data processing.`,code:`public class MetricsOperator<T> implements Operator<T, T> {
    private final Timer timer;

    @Override
    public CoreSubscriber<? super T> subscribe(CoreSubscriber<? super T> subscriber) {
        return new MetricsSubscriber(subscriber, timer);
    }
}`},{id:45,title:`Reactive RabbitMQ`,category:`microservices`,level:`expert`,description:`Reactive RabbitMQ messaging with Spring's reactive support.`,why:`For reactive messaging with RabbitMQ.`,when:`Event-driven microservices using RabbitMQ.`,code:`// pom.xml
<dependency>
    <groupId>io.projectreactor.rabbitmq</groupId>
    <artifactId>reactor-rabbitmq</artifactId>
</dependency>

@Service
public class MessagePublisher {
    private final ReactiveRabbitTemplate template;

    public Mono<Void> publish(String exchange, String routingKey, Object message) {
        return template.send(exchange, routingKey,
            MessageBuilder.withBody(JSON.toJSONBytes(message)).build())
            .then();
    }
}`},{id:46,title:`Reactive Feign Clients`,category:`microservices`,level:`expert`,description:`Reactive HTTP clients with declarative Feign-style interfaces.`,why:`For declarative reactive HTTP clients.`,when:`Service-to-service communication with Feign.`,code:`// pom.xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-openfeign</artifactId>
</dependency>

@FeignClient(name = "user-service")
public interface UserClient {
    @GetMapping("/api/users/{id}")
    Mono<User> getUser(@PathVariable("id") Long id);
}`},{id:47,title:`Reactive Caching (Caffeine)`,category:`advanced`,level:`expert`,description:`Reactive caching with Caffeine for high-performance in-memory cache.`,why:`To reduce database load and improve response times.`,when:`Frequently accessed data, expensive queries.`,code:`@Configuration
public class CacheConfig {
    @Bean
    public Cache<String, User> userCache() {
        return Caffeine.newBuilder()
            .maximumSize(10000)
            .expireAfterWrite(Duration.ofMinutes(5))
            .recordStats()
            .build();
    }
}`},{id:48,title:`Reactive API Versioning`,category:`webflux`,level:`expert`,description:`Versioning reactive REST APIs with path or header strategies.`,why:`To evolve APIs without breaking clients.`,when:`Public APIs, long-term support services.`,code:`@RestController
public class UserControllerV1 {
    @GetMapping("/v1/users/{id}")
    public Mono<UserV1> getUserV1(@PathVariable Long id) {
        return userService.findById(id)
            .map(user -> new UserV1(user));
    }
}`},{id:49,title:`Reactive GraphQL`,category:`advanced`,level:`expert`,description:`GraphQL with reactive support for flexible API queries.`,why:`For flexible APIs where clients need specific data.`,when:`Complex APIs, mobile backends, microservices.`,code:`// pom.xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-graphql</artifactId>
</dependency>

@Controller
public class UserGraphQLController {
    @QueryMapping
    public Mono<User> user(@Argument Long id) {
        return userService.findById(id);
    }
}`},{id:50,title:`Reactive OAuth2 with Keycloak`,category:`webflux`,level:`expert`,description:`Secure reactive microservices with OAuth2 and Keycloak.`,why:`For enterprise-grade security with SSO.`,when:`Production microservices with authentication.`,code:`// pom.xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-oauth2-resource-server</artifactId>
</dependency>

spring:
  security:
    oauth2:
      resourceserver:
        jwt:
          jwk-set-uri: http://keycloak:8080/realms/app/protocol/openid-connect/certs`},{id:51,title:`Reactive OpenAPI/Swagger`,category:`webflux`,level:`expert`,description:`Document reactive APIs with OpenAPI 3 and Swagger.`,why:`For API documentation and testing.`,when:`Every REST API!`,code:`// pom.xml
<dependency>
    <groupId>org.springdoc</groupId>
    <artifactId>springdoc-openapi-starter-webflux-ui</artifactId>
</dependency>

@RestController
@Tag(name = "User API")
public class UserController {
    @Operation(summary = "Get user by ID")
    @GetMapping("/{id}")
    public Mono<User> getUser(@PathVariable Long id) {
        return userService.findById(id);
    }
}`},{id:52,title:`Reactive Data Validation`,category:`webflux`,level:`expert`,description:`Validate request data reactively with Bean Validation.`,why:`To ensure data integrity and security.`,when:`Any endpoint receiving user input.`,code:`@RestController
public class UserController {
    @PostMapping("/users")
    public Mono<ResponseEntity<User>> createUser(
            @Valid @RequestBody Mono<User> userMono) {
        return userMono
            .flatMap(userService::create)
            .map(ResponseEntity::ok);
    }
}`},{id:53,title:`RSocket Streaming`,category:`advanced`,level:`expert`,description:`Real-time streaming with RSocket for reactive microservices.`,why:`For high-performance, real-time streaming between services.`,when:`Real-time data processing, IoT, gaming.`,code:`@Service
public class RSocketService {
    private final RSocketRequester requester;

    public Mono<Order> sendOrder(Order order) {
        return requester.route("order.receive")
            .data(order)
            .retrieveMono(Order.class);
    }

    public Flux<Order> streamOrders() {
        return requester.route("order.stream")
            .retrieveFlux(Order.class);
    }
}`},{id:54,title:`Reactive Data Partitioning`,category:`advanced`,level:`expert`,description:`Partition reactive data streams for parallel processing.`,why:`To process large data streams efficiently.`,when:`Batch processing, ETL pipelines, data analytics.`,code:`@Service
public class PartitionedProcessor {
    public Flux<Result> processData(Flux<Data> dataStream) {
        return dataStream
            .groupBy(Data::getPartitionKey)
            .flatMap(group -> group.buffer(100)
                .concatMap(this::processBatch))
            .parallel()
            .runOn(Schedulers.parallel())
            .sequential();
    }
}`},{id:55,title:`Saga Pattern (Reactive)`,category:`microservices`,level:`expert`,description:`Distributed transaction management with Saga pattern.`,why:`For distributed transactions across multiple services.`,when:`Complex business workflows, distributed transactions.`,code:`@Service
public class OrderSaga {
    public Mono<Order> createOrder(Order order) {
        return orderRepository.save(order)
            .flatMap(saved -> paymentService.processPayment(saved)
                .flatMap(payment -> inventoryService.reserveItems(saved))
                .flatMap(inventory -> shippingService.scheduleDelivery(saved))
                .doOnError(e -> compensate(saved))
            );
    }

    private Mono<Void> compensate(Order order) {
        return paymentService.refund(order)
            .then(inventoryService.releaseItems(order))
            .then(orderRepository.updateStatus(order.getId(), "CANCELLED"))
            .then();
    }
}`},{id:56,title:`Reactive Health Check`,category:`observability`,level:`expert`,description:`Custom reactive health checks for service dependencies.`,why:`To monitor service dependencies and readiness.`,when:`Kubernetes liveness/readiness probes, monitoring.`,code:`@Component
public class KafkaHealthIndicator implements ReactiveHealthIndicator {
    private final KafkaSender<String, String> kafkaSender;

    @Override
    public Mono<Health> health() {
        return kafkaSender.send(Flux.just(
            SenderRecord.create(new ProducerRecord<>("health", "ping"))
        ))
        .collectList()
        .map(list -> Health.up().withDetail("kafka", "available").build())
        .onErrorResume(e -> Mono.just(Health.down().withDetail("kafka", e.getMessage()).build()));
    }
}`},{id:57,title:`Reactive CORS Configuration`,category:`webflux`,level:`expert`,description:`Configure CORS for reactive APIs to allow cross-origin requests.`,why:`To allow frontend applications to consume the API.`,when:`APIs consumed from browsers.`,code:`@Configuration
public class CorsConfig {
    @Bean
    public CorsWebFilter corsWebFilter() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
        config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE"));
        config.setAllowedHeaders(Arrays.asList("*"));
        config.setAllowCredentials(true);
        config.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return new CorsWebFilter(source);
    }
}`},{id:58,title:`Reactive Application Events`,category:`advanced`,level:`expert`,description:`Application events with reactive support for loose coupling.`,why:`For decoupled, event-driven architecture within the application.`,when:`Cross-cutting concerns, logging, auditing.`,code:`@Component
public class OrderEventListener {
    @Async
    @EventListener
    public Mono<Void> handleOrderCreated(OrderCreatedEvent event) {
        return Mono.fromRunnable(() -> {
            log.info("Order created: {}", event.getOrder().getId());
        });
    }
}`},{id:59,title:`Reactive Migration Guide`,category:`basics`,level:`expert`,description:`Migrating from blocking to reactive applications.`,why:`To adopt reactive programming incrementally.`,when:`Modernizing existing applications.`,code:`// Migration steps:
// 1. Replace RestTemplate with WebClient
// 2. Add spring-boot-starter-webflux
// 3. Convert endpoints to return Mono/Flux
// 4. Replace JPA with R2DBC

public Mono<User> findUser(Long id) {
    return Mono.fromCallable(() -> repository.findById(id))
        .subscribeOn(Schedulers.boundedElastic());
}`},{id:60,title:`Reactive Best Practices`,category:`basics`,level:`expert`,description:`Best practices for reactive Spring Boot applications.`,why:`To build maintainable, performant reactive applications.`,when:`Every reactive project!`,code:`// 1. Always use generics: Mono<T>, Flux<T>
public Mono<User> getUser(Long id) { ... }

// 2. Use flatMap for async operations
repository.findById(id)
    .flatMap(user -> orderService.getOrders(user.getId()));

// 3. Handle errors explicitly
repository.findById(id)
    .switchIfEmpty(Mono.error(new NotFoundException()))
    .onErrorResume(e -> Mono.just(new User()));

// 4. Use Schedulers for blocking code
Mono.fromCallable(() -> blockingCall())
    .subscribeOn(Schedulers.boundedElastic());

// 5. Always unsubscribe when done
private final CompositeDisposable disposables = new CompositeDisposable();`}],s=n(),c=10,l=[`all`,...new Set(o.map(e=>e.category))],u=e=>i.highlight(e,{language:`java`,ignoreIllegals:!0}).value;function d(){let[e,t]=(0,a.useState)(1),[n,i]=(0,a.useState)(0),[d,f]=(0,a.useState)(``),[p,m]=(0,a.useState)(`all`),[h,g]=(0,a.useState)(!0),_=(0,a.useMemo)(()=>{let e=d.trim().toLowerCase();return o.filter(t=>{let n=p===`all`||t.category===p,r=!e||`${t.title} ${t.description} ${t.category}`.toLowerCase().includes(e);return n&&r})},[p,d]),v=Math.max(1,Math.ceil(_.length/c)),y=Math.min(n,v-1),b=_.slice(y*c,y*c+c),x=_.find(t=>t.id===e)||b[0]||o[0],S=e=>{m(e),i(0)},C=e=>{if(!e)return;t(e.id),g(!1);let n=Math.floor(_.findIndex(t=>t.id===e.id)/c);n>=0&&i(n)};return(0,s.jsxs)(`div`,{className:`react-course-page reactive-course-page`,children:[(0,s.jsxs)(`section`,{className:`react-course-hero`,children:[(0,s.jsx)(r,{to:`/reactive-programming`,className:`react-course-back`,children:`← Back to Reactive Programming`}),(0,s.jsx)(`div`,{className:`react-course-kicker`,children:`Reactive Spring Boot learning path`}),(0,s.jsx)(`h1`,{children:`Reactive Programming with Spring Boot`}),(0,s.jsx)(`p`,{children:`60 essential concepts covering Project Reactor, WebFlux, R2DBC, backpressure, reactive microservices, observability, and resilient event-driven architecture.`}),(0,s.jsxs)(`div`,{className:`react-course-stats`,children:[(0,s.jsxs)(`span`,{children:[(0,s.jsx)(`strong`,{children:o.length}),` concepts`]}),(0,s.jsxs)(`span`,{children:[(0,s.jsx)(`strong`,{children:l.length-1}),` learning areas`]}),(0,s.jsxs)(`span`,{children:[(0,s.jsx)(`strong`,{children:`4`}),` levels`]})]})]}),(0,s.jsxs)(`section`,{className:`react-course-workspace`,children:[(0,s.jsx)(`button`,{type:`button`,className:`react-course-mobile-toggle`,"aria-label":h?`Hide course concepts`:`Show course concepts`,"aria-expanded":h,onClick:()=>g(e=>!e),children:h?`←`:`→`}),(0,s.jsxs)(`aside`,{className:`react-course-sidebar${h?``:` is-mobile-collapsed`}`,"aria-label":`Reactive programming course navigation`,children:[(0,s.jsxs)(`div`,{className:`react-course-sidebar-top`,children:[(0,s.jsx)(`label`,{htmlFor:`reactive-course-search`,children:`Find a concept`}),(0,s.jsx)(`input`,{id:`reactive-course-search`,value:d,onChange:e=>{f(e.target.value),i(0)},placeholder:`Search concepts`})]}),(0,s.jsx)(`div`,{className:`react-course-filters`,"aria-label":`Filter concepts`,children:l.map(e=>(0,s.jsx)(`button`,{type:`button`,className:p===e?`active`:``,onClick:()=>S(e),children:e},e))}),(0,s.jsxs)(`div`,{className:`react-course-list`,children:[b.map(e=>(0,s.jsxs)(`button`,{type:`button`,className:`react-course-nav-item ${x?.id===e.id?`selected`:``}`,onClick:()=>C(e),children:[(0,s.jsx)(`span`,{children:String(e.id).padStart(2,`0`)}),(0,s.jsx)(`strong`,{children:e.title}),(0,s.jsx)(`small`,{children:e.level})]},e.id)),!b.length&&(0,s.jsx)(`p`,{className:`react-course-empty`,children:`No concepts match that search.`})]}),(0,s.jsxs)(`div`,{className:`react-course-pagination`,children:[(0,s.jsx)(`button`,{type:`button`,disabled:y===0,onClick:()=>i(e=>Math.max(0,e-1)),children:`Previous`}),(0,s.jsxs)(`span`,{children:[y+1,` / `,v]}),(0,s.jsx)(`button`,{type:`button`,disabled:y===v-1,onClick:()=>i(e=>Math.min(v-1,e+1)),children:`Next`})]})]}),(0,s.jsxs)(`main`,{className:`react-course-detail`,"aria-live":`polite`,children:[(0,s.jsxs)(`div`,{className:`react-course-detail-top`,children:[(0,s.jsx)(`span`,{className:`react-course-level level-${x.level}`,children:x.level}),(0,s.jsx)(`span`,{className:`react-course-category`,children:x.category}),(0,s.jsxs)(`span`,{className:`react-course-number`,children:[`Concept `,x.id,` of`,` `,o.length]})]}),(0,s.jsx)(`h2`,{children:x.title}),(0,s.jsx)(`p`,{className:`react-course-description`,children:x.description}),(0,s.jsxs)(`div`,{className:`react-course-explain-grid`,children:[(0,s.jsxs)(`section`,{children:[(0,s.jsx)(`h3`,{children:`Why:`}),(0,s.jsx)(`p`,{children:x.why})]}),(0,s.jsxs)(`section`,{children:[(0,s.jsx)(`h3`,{children:`When:`}),(0,s.jsx)(`p`,{children:x.when})]})]}),(0,s.jsxs)(`section`,{className:`react-course-example`,children:[(0,s.jsxs)(`div`,{className:`react-course-example-heading`,children:[(0,s.jsx)(`h3`,{children:`Example:`}),(0,s.jsx)(`span`,{children:`Java / Spring Boot`})]}),(0,s.jsx)(`pre`,{children:(0,s.jsx)(`code`,{className:`hljs language-java`,dangerouslySetInnerHTML:{__html:u(x.code)}})})]}),(0,s.jsxs)(`div`,{className:`react-course-detail-nav`,children:[(0,s.jsx)(`button`,{type:`button`,disabled:x.id===1,onClick:()=>C(o[x.id-2]),children:`← Previous concept`}),(0,s.jsx)(`button`,{type:`button`,disabled:x.id===o.length,onClick:()=>C(o[x.id]),children:`Next concept →`})]})]})]})]})}export{d as default};