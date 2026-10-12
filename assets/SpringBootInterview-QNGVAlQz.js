import{r as e}from"./rolldown-runtime-QTnfLwEv.js";import{t}from"./react-CZI7_Jkm.js";import{o as n,r}from"./index-DCg-4qgp.js";import{t as i}from"./atom-one-dark-CL0A0LnX.js";/* empty css                            */var a=e(t(),1),o=`## Spring Boot Interview Questions

### Basic Questions

1. **What is Spring Boot, and how is it different from the Spring Framework?**
   - **Answer**: Think of Spring as a box of car parts — you get everything you need to build a car, but you have to assemble it yourself. Spring Boot is like buying a pre-assembled car with the keys in the ignition — you just turn it on and drive.

   Spring is powerful but requires lots of setup: XML config files, deploying to a web server, wiring beans manually. Spring Boot takes all that away with sensible defaults and auto-configuration. You add a dependency, and Spring Boot says "oh, you want a web app? I'll set up Tomcat, configure the servlet, and wire up JSON for you."
   - **Example**:
     \`\`\`java
     @SpringBootApplication
     public class MyApplication {
         public static void main(String[] args) {
             SpringApplication.run(MyApplication.class, args);
         }
     }
     \`\`\`
   - **Note**: Unlike traditional Spring (XML config), Spring Boot auto-configures everything. No web.xml, no applicationContext.xml — just run the JAR.

2. **What are the advantages of using Spring Boot?**
   - **Answer**: Why do people love Spring Boot? Because it removes all the boring setup work and lets you focus on writing actual business logic. Here's what you get:

   - **No server setup**: Tomcat (or Jetty, or Undertow) is built right in — you just run the JAR like a normal Java program
   - **Auto-configuration**: Spring Boot looks at what's on your classpath and configures things automatically. Add a database driver? It sets up the connection pool. Add a web starter? It configures the web stack.
   - **Production-ready**: Built-in health checks, metrics, and monitoring endpoints (via Actuator) so you know if your app is healthy
   - **Opinionated defaults**: Instead of making you configure everything, Spring Boot picks sensible defaults. You only override what you need to.
   - **Example**:
     \`\`\`java
     // Just add spring-boot-starter-web and run as Java application
     // No need to deploy WAR — embedded Tomcat is auto-configured
     @RestController
     public class HelloController {
         @GetMapping("/hello")
         public String hello() { return "Hello, Boot!"; }
     }
     \`\`\`
   - **Note**: Also includes Actuator endpoints like /actuator/health for monitoring.

3. **How do you create a Spring Boot application?**
   - **Answer**: The easiest way is to go to start.spring.io (Spring Initializr) — it's like a quick-start wizard. Pick your Spring Boot version, add dependencies you need (like "Spring Web" for REST APIs or "Spring Data JPA" for databases), hit Generate, and you've got a ready-to-run project.

   You can also do it manually by adding the Spring Boot parent POM to your pom.xml and adding starter dependencies. Here's the minimal setup:
   - **Example**:
     \`\`\`xml
     <parent>
         <groupId>org.springframework.boot</groupId>
         <artifactId>spring-boot-starter-parent</artifactId>
         <version>3.3.0</version>
     </parent>
     <dependencies>
         <dependency>
             <groupId>org.springframework.boot</groupId>
             <artifactId>spring-boot-starter-web</artifactId>
         </dependency>
     </dependencies>
     \`\`\`
   - **Note**: Then create the main class with @SpringBootApplication and SpringApplication.run().

4. **What is a Spring Boot starter?**
   - **Answer**: A starter is like a "bundle deal" for dependencies. Instead of manually finding and adding 5-6 individual libraries (and hoping their versions are compatible), you add one starter and it pulls in everything you need.

   For example, spring-boot-starter-web gives you Spring MVC for handling HTTP requests, Jackson for JSON, Tomcat as the embedded server, and validation — all in one dependency. No version conflicts, no missing pieces.
   - **Example**:
     \`\`\`xml
     <dependency>
         <groupId>org.springframework.boot</groupId>
         <artifactId>spring-boot-starter-data-jpa</artifactId>
     </dependency>
     // This pulls in Hibernate, Spring Data JPA, and HikariCP
     \`\`\`

5. **What are Spring Boot starters and why are they useful?**
   - **Answer**: Starters solve a real pain point: dependency hell. Without starters, you'd need to figure out which versions of Spring MVC, Jackson, Tomcat, and validation work together — and update them all when you upgrade Spring Boot.

   Starters fix this by:
   - **Curated bundles**: Each starter is tested and known to work together
   - **Version management**: The Spring Boot parent POM handles all versions for you
   - **Less XML**: One dependency instead of five, all with compatible versions
   - **Example**: spring-boot-starter-web includes:
     \`\`\`text
     - spring-webmvc (Spring MVC)
     - jackson-databind (JSON serialization)
     - tomcat-embed-core (embedded server)
     - spring-boot-starter-validation (bean validation)
     \`\`\`

6. **Explain the concept of auto-configuration in Spring Boot.**
   - **Answer**: Auto-configuration is Spring Boot's "magic" — it looks at what's on your classpath and automatically sets up your application. No manual bean definitions needed.

   Here's how it works: when your app starts, Spring Boot checks what JARs are present. If it sees spring-boot-starter-web, it says "you're building a web app" and automatically configures the DispatcherServlet (the front controller), an embedded Tomcat server, and Jackson for JSON. If it sees a database driver, it sets up a DataSource and connection pool.

   The key is @ConditionalOnClass — Spring Boot only applies a configuration if the required classes are present. So if you don't include a database driver, it won't try to configure a database.
   - **Example**:
     \`\`\`java
     @ConditionalOnClass(DataSource.class)
     @ConditionalOnMissingBean(DataSource.class)
     @ConfigurationProperties(prefix = "spring.datasource")
     public class DataSourceAutoConfiguration {
         // Creates DataSource bean if not already defined
     }
     \`\`\`
   - **Note**: You can exclude auto-configurations using @EnableAutoConfiguration(exclude = {X.class}).

7. **How do you define properties in a Spring Boot application?**
   - **Answer**: Spring Boot reads configuration from application.properties or application.yml (both in src/main/resources). Think of these as your app's settings file — database URLs, server ports, logging levels, custom flags, etc.

   You can inject these values into your beans in two ways:
  - @Value: For simple one-off values like @Value("\${server.port}")
   - @ConfigurationProperties: For grouping related properties into a class (like all database settings in one place)
   - **Example**:
     \`\`\`properties
     server.port=9090
     app.name=MySpringApp
     spring.datasource.url=jdbc:mysql://localhost:3306/mydb
     \`\`\`
   - **Example**:
     \`\`\`java
     @Value("\${app.name}")
     private String appName;
     \`\`\`

8. **What is application.properties or application.yml in Spring Boot?**
   - **Answer**: These files let you configure your app without touching code. Want to change the database URL? Edit the file, restart the app — no recompilation needed.

   You can use either format:
   - **application.properties**: Simple key-value pairs, flat structure
   - **application.yml**: Hierarchical, uses indentation (like Python), cleaner for nested settings

   Spring Boot reads these automatically from src/main/resources. You can also override them with environment variables or command-line arguments.
   - **Example**:
     \`\`\`yaml
     server:
       port: 9090
     spring:
       datasource:
         url: jdbc:mysql://localhost:3306/mydb
         username: root
         password: secret
     \`\`\`

9. **What are profiles in Spring Boot?**
   - **Answer**: Profiles let you have different configurations for different environments. Your dev setup might use an in-memory H2 database and debug logging, while production uses a real MySQL database and minimal logging.

   You create profile-specific files like application-dev.properties and application-prod.properties. Spring Boot loads the base application.properties first, then overlays the active profile's settings on top. You activate a profile with spring.profiles.active=dev or via command line.
   - **Example**:
     \`\`\`properties
     # Via application.properties
     spring.profiles.active=dev

     # Via command line
     java -jar myapp.jar --spring.profiles.active=prod
     \`\`\`
   - **Example**:
     \`\`\`java
     @Profile("dev")
     @Bean
     public DataSource devDataSource() { ... }

     @Profile("prod")
     @Bean
     public DataSource prodDataSource() { ... }
     \`\`\`

10. **How do you implement exception handling in Spring Boot?**
    - **Answer**: Instead of writing try-catch blocks in every controller method, Spring Boot lets you handle exceptions in one central place using @ControllerAdvice. Think of it as a global safety net — any exception thrown by any controller gets caught here and converted into a proper HTTP response.

   You can handle specific exceptions (like ResourceNotFoundException returns 404) and have a catch-all for unexpected errors (returns 500). This keeps your controllers clean and your API responses consistent.
    - **Example**:
      \`\`\`java
      @ControllerAdvice
      public class GlobalExceptionHandler {
          @ExceptionHandler(ResourceNotFoundException.class)
          public ResponseEntity<ErrorResponse> handleNotFound(ResourceNotFoundException ex) {
              ErrorResponse error = new ErrorResponse("NOT_FOUND", ex.getMessage());
              return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
          }
      }
      \`\`\`
    - **Example**:
      \`\`\`java
      @ResponseStatus(HttpStatus.NOT_FOUND)
      public class ResourceNotFoundException extends RuntimeException {
          public ResourceNotFoundException(String message) { super(message); }
      }
      \`\`\`

### Configuration and Setup

11. **How do you configure a DataSource in Spring Boot?**
    - **Answer**: Spring Boot makes database configuration almost trivial. Just add the database URL, username, and password to your application.properties, include the JDBC driver dependency, and Spring Boot automatically creates a DataSource bean with a connection pool (HikariCP by default — the fastest connection pool available).

   No need to manually configure connection pool settings, though you can override them if needed. Spring Boot even auto-configures JPA and the EntityManager if you include spring-boot-starter-data-jpa.
    - **Example**:
      \`\`\`properties
      spring.datasource.url=jdbc:postgresql://localhost:5432/mydb
      spring.datasource.username=admin
      spring.datasource.password=secret
      spring.datasource.hikari.maximum-pool-size=10
      \`\`\`
    - **Example**:
      \`\`\`java
      @Bean
      @ConfigurationProperties(prefix = "spring.datasource")
      public DataSource dataSource() {
          return DataSourceBuilder.create().build();
      }
      \`\`\`

12. **What are the different ways to configure Spring Boot properties?**
    - **Answer**: Spring Boot gives you many ways to configure your app, and they all follow a clear priority order (later ones override earlier ones):

   - **application.properties / application.yml**: The default config files in src/main/resources
   - **Command-line arguments**: Override anything at startup with --server.port=8081
   - **Environment variables**: Useful for Docker/Kubernetes deployments (SERVER_PORT=8081)
   - **@PropertySource**: Load custom properties files from anywhere on classpath

   This flexibility means you can develop with one set of settings locally, override them in production with environment variables, and never change your code.
    - **Example**:
      \`\`\`java
      @Configuration
      @PropertySource("classpath:custom.properties")
      public class AppConfig { ... }
      \`\`\`

13. **How can you enable HTTPS in a Spring Boot application?**
    - **Answer**: Enabling HTTPS in Spring Boot is surprisingly simple. You need a certificate (stored in a keystore file), and then you just add a few lines to your application.properties. Spring Boot automatically configures the server to use HTTPS on the specified port.

   You can generate a self-signed certificate for development using keytool (included with Java). For production, you'd use a certificate from a trusted authority like Let's Encrypt.
    - **Example**:
      \`\`\`properties
      server.port=8443
      server.ssl.key-store=classpath:keystore.p12
      server.ssl.key-store-password=changeit
      server.ssl.keyStoreType=PKCS12
      server.ssl.keyAlias=tomcat
      \`\`\`
    - **Note**: Generate keystore: keytool -genkey -alias tomcat -storetype PKCS12 -keyalg RSA -keystore keystore.p12

14. **How do you configure logging in Spring Boot?**
    - **Answer**: Spring Boot uses Logback by default, and you can configure it in two ways:

   - **application.properties**: Quick and simple — set log levels, output file, and pattern without any XML
   - **logback.xml**: For advanced configuration like custom appenders, rolling policies, or different log formats for different packages

   You can control logging at different levels — turn on DEBUG for your own code while keeping Spring Framework at INFO to avoid noise.
    - **Example**:
      \`\`\`properties
      logging.level.org.springframework=DEBUG
      logging.level.com.myapp=TRACE
      logging.file.name=app.log
      logging.pattern.console=%d{yyyy-MM-dd HH:mm:ss} - %msg%n
      \`\`\`
    - **Example**:
      \`\`\`xml
      <configuration>
          <appender name="FILE" class="ch.qos.logback.core.FileAppender">
              <file>myapp.log</file>
          </appender>
          <root level="INFO">
              <appender-ref ref="FILE" />
          </root>
      </configuration>
      \`\`\`

15. **What is @SpringBootApplication annotation?**
    - **Answer**: @SpringBootApplication is a shortcut that combines three annotations into one:
   - @Configuration: This class has bean definitions
   - @EnableAutoConfiguration: Spring Boot should guess what you need based on your dependencies
   - @ComponentScan: Look in this package (and sub-packages) for Spring components

   Instead of writing three annotations, you just write one. It goes on your main class — the one with the main() method.
    - **Example**:
      \`\`\`java
      @Configuration
      @EnableAutoConfiguration
      @ComponentScan(basePackages = "com.myapp")
      public class MyApplication { ... }
      \`\`\`
    - **Note**: It auto-detects components and enables auto-configuration.

16. **What is the purpose of @EnableAutoConfiguration annotation?**
    - **Answer**: @EnableAutoConfiguration is the engine behind Spring Boot's "magic." It tells Spring Boot to look at your classpath and automatically configure beans for you.

   For example, if you have spring-boot-starter-data-jpa on your classpath, it automatically creates a DataSource and EntityManager. If you have spring-boot-starter-web, it sets up a DispatcherServlet and embedded Tomcat. If you have spring-boot-starter-security, it secures all your endpoints.

   The smart part: it only adds beans that don't already exist. If you've defined your own DataSource, Spring Boot backs off and uses yours. You can also exclude specific auto-configurations if they don't fit your needs.
    - **Example**: It auto-configures:
      \`\`\`text
      - DataSource if spring-boot-starter-data-jpa is present
      - DispatcherServlet if spring-boot-starter-web is present
      - Security filter chain if spring-boot-starter-security is present
      \`\`\`
    - **Note**: You can exclude specific auto-configurations: @EnableAutoConfiguration(exclude = {DataSourceAutoConfiguration.class})

17. **How do you externalize configuration in Spring Boot?**
    - **Answer**: Externalizing configuration means keeping settings outside your compiled code, so you can change them without rebuilding. Spring Boot supports multiple sources:

   - **Properties/YAML files**: The default application.properties or application.yml
   - **Environment variables**: Perfect for Docker and Kubernetes (e.g., SPRING_DATASOURCE_URL)
   - **Command-line arguments**: Override anything at startup (--server.port=8081)
   - **@PropertySource**: Load custom properties files from the classpath

   Spring Boot has a well-defined priority order: command-line args override environment variables, which override properties files. This lets you set defaults in code and override them in production.
    - **Example**: Order of precedence (highest to lowest):
      \`\`\`text
      1. Command line arguments (--server.port=8081)
      2. OS environment variables (SERVER_PORT=8081)
      3. application-{profile}.properties
      4. application.properties
      5. @PropertySource annotations
      \`\`\`

18. **What is a CommandLineRunner in Spring Boot?**
    - **Answer**: CommandLineRunner is a simple interface that lets you run code right after Spring Boot finishes starting up. Think of it as a "startup hook" — once the application context is loaded and everything is ready, Spring calls your run() method.

   Common use cases: loading initial data into the database, validating configuration, warming up caches, or printing a startup banner. You can have multiple CommandLineRunner beans and control their execution order with @Order.
    - **Example**:
      \`\`\`java
      @Component
      public class AppStartupRunner implements CommandLineRunner {
          @Override
          public void run(String... args) throws Exception {
              System.out.println("Application started with args: " + Arrays.toString(args));
          }
      }
      \`\`\`
    - **Note**: You can also use @Order to control execution order.

19. **How do you configure multiple data sources in Spring Boot?**
    - **Answer**: Sometimes you need to talk to multiple databases — maybe your app data lives in PostgreSQL but your audit logs go to MongoDB. Spring Boot can handle this, but you need to be explicit about it.

   The approach: define multiple DataSource beans and mark one as @Primary (the default). Each DataSource needs its own EntityManagerFactory and TransactionManager so JPA knows which database to use for which operations.

   The tricky part: Spring Boot's auto-configuration gets confused when it sees multiple DataSources. You typically need to disable the default DataSource auto-configuration and set everything up manually.
    - **Example**:
      \`\`\`java
      @Bean(name = "primaryDataSource")
      @Primary
      @ConfigurationProperties(prefix = "spring.datasource.primary")
      public DataSource primaryDataSource() {
          return DataSourceBuilder.create().build();
      }

      @Bean(name = "secondaryDataSource")
      @ConfigurationProperties(prefix = "spring.datasource.secondary")
      public DataSource secondaryDataSource() {
          return DataSourceBuilder.create().build();
      }
      \`\`\`
    - **Note**: Also configure separate EntityManagerFactory and TransactionManager for each.

20. **What is the difference between application.properties and bootstrap.properties?**
    - **Answer**: bootstrap.properties is a special configuration file that loads before application.properties. It's used for the bootstrap context — the context that knows how to fetch configuration from external sources like Spring Cloud Config Server.

   Think of it this way: application.properties contains your app's settings, but bootstrap.properties contains the settings needed to fetch those settings (like the Config Server URL and app name). Without bootstrap.properties, your app wouldn't know where to get its configuration from.

   Note: In newer versions of Spring Cloud (2020.0+), bootstrap.properties is deprecated in favor of using spring.config.import with the configserver: prefix.
    - **Example**:
      \`\`\`properties
      spring.cloud.config.uri=http://config-server:8888
      spring.application.name=myapp
      \`\`\`
    - **Note**: application.properties is for application-specific config.

### Dependency Injection and Beans

21. **What is dependency injection in Spring Boot?**
    - **Answer**: Dependency injection is a fancy term for a simple idea: instead of creating your own dependencies (like 'new UserRepository()'), you declare what you need and Spring provides it for you.

   Think of it like a restaurant: instead of you going to the kitchen to cook your own food (creating dependencies), you tell the waiter what you want (declare dependencies), and the kitchen prepares and brings it to you (Spring injects them).

   This makes your code more testable (you can easily swap in mock dependencies) and loosely coupled (your class doesn't need to know how to create its dependencies).
    - **Example**:
      \`\`\`java
      @Service
      public class UserService {
          private final UserRepository userRepository;
          
          public UserService(UserRepository userRepository) {
              this.userRepository = userRepository;
          }
      }
      \`\`\`
    // Note: Spring automatically wires dependencies — no @Autowired needed on constructor.

22. **What are Spring Beans, and how are they managed in Spring Boot?**
// Answer: A Spring Bean is just a regular Java object that Spring creates and manages for you. Instead of you calling \`new MyService()\`, Spring creates the object, wires up its dependencies, and keeps track of it in the "IoC container" (the application context).
    - **Answer**: A Spring Bean is just a regular Java object that Spring creates and manages for you. Instead of you calling \`new MyService()\`, Spring creates the object, wires up its dependencies, and keeps track of it in the "IoC container" (the application context).

   Think of the IoC container as a registry or a pool of objects. When you ask for a UserService, Spring gives you the one it created and configured. You don't need to worry about creating or destroying it — Spring handles the lifecycle.

   Beans have different scopes: singleton (one instance for the whole app — the default), prototype (new instance every time), request (one per HTTP request), and session (one per user session).
    - **Example**: Bean scopes:
      \`\`\`text
      - Singleton (default): one instance per container
      - Prototype: new instance each time
      - Request: one per HTTP request (web)
      - Session: one per HTTP session (web)
      \`\`\`
    - **Example**:
      \`\`\`java
      @Scope("prototype")
      @Component
      public class MyPrototypeBean { ... }
      \`\`\`

23. **How do you define a Spring Bean?**
    // Answer: There are two main ways to create Spring Beans:

   - **Component scanning**: Annotate your class with @Component, @Service, @Repository, or @Controller and Spring automatically detects and registers it during component scan
   - **Factory methods**: Use @Bean on a method inside a @Configuration class when you need to configure the bean yourself (like setting properties on a DataSource or RestTemplate)

   Use @Component for generic services, @Service for business logic, @Repository for database access, and @Controller for web endpoints. The functionality is the same — they're just semantic markers that tell you what the class does.
    - **Example**:
      \`\`\`java
      @Configuration
      public class AppConfig {
          @Bean
          public RestTemplate restTemplate() {
              return new RestTemplate();
          }
      }
      \`\`\`
    - **Note**: Bean name defaults to method name, can be overridden with @Bean("customName").

24. **What is the role of the @Autowired annotation?**
    - **Answer**: @Autowired tells Spring "I need this dependency — please find a matching bean and inject it for me." You can put it on a field (simplest), a constructor (recommended), or a setter method.

   The recommended approach is constructor injection: you declare the dependency as a final field, add it as a constructor parameter, and Spring automatically passes the bean when creating your class. This makes your dependencies explicit, your class immutable, and testing easy (you can pass mock dependencies in your tests).

   Field injection (putting @Autowired directly on a field) is simpler but harder to test and hides dependencies. Most teams prefer constructor injection.
    - **Example**:
      \`\`\`java
      @Autowired
      private UserService userService;
      \`\`\`
    - **Note**: Constructor injection is preferred for immutability and testability.

25. **How do you create a custom Spring Boot starter?**
    - **Answer**: Creating a custom starter is like packaging your own "bundle deal" that others can include in their projects. It's useful when you have a common setup (like a database connection pool + health check + metrics) that multiple teams in your company need.

   The basic structure:
   - Create a library project with your auto-configuration classes
   - Use @ConditionalOnClass and @ConditionalOnMissingBean so your starter only activates when needed
   - Include a spring.factories file that tells Spring Boot where to find your auto-configuration

   When someone adds your starter to their project, Spring Boot automatically configures everything — just like the official starters.
    - **Example**:
      \`\`\`java
      @Configuration
      @ConditionalOnClass(MyService.class)
      @EnableConfigurationProperties(MyProperties.class)
      public class MyServiceAutoConfiguration {
          @Bean
          @ConditionalOnMissingBean
          public MyService myService(MyProperties properties) {
              return new MyService(properties.getPrefix());
          }
      }
      \`\`\`
    - **Example**:
      \`\`\`properties
      org.springframework.boot.autoconfigure.EnableAutoConfiguration=\\
      com.example.MyServiceAutoConfiguration
      \`\`\`

26. **What is the difference between @Component, @Service, @Repository, and @Controller?**
    - **Answer**: Think of these as name tags that tell you what a class does. Under the hood, they all do the same thing — they tell Spring "please manage this class as a bean." But they communicate intent:

    - **@Component**: The generic one. Use it when the class doesn't fit into any specific category.
    - **@Service**: For business logic — the "brain" of your application. Like a UserService that handles user registration, login, etc.
    - **@Repository**: For database access — the "hands" that talk to the database. It has a bonus feature: it automatically translates database-specific exceptions (like SQLException) into Spring's unified DataAccessException, so you don't have to worry about which database you're using.
    - **@Controller**: For handling HTTP requests — the "face" of your app that receives requests and sends responses.

    Use the right annotation for the right layer — it makes your code self-documenting.
    - **Example**:
      \`\`\`text
      @Component – generic stereotype (any Spring-managed bean)
      @Service – service layer (business logic)
      @Repository – DAO layer (data access, converts persistence exceptions)
      @Controller – web layer (MVC controller, handles HTTP requests)
      \`\`\`
    - **Note**: @Repository adds translation of persistence exceptions to Spring's DataAccessException hierarchy.

27. **How do you create a custom annotation in Spring Boot?**
    - **Answer**: Sometimes you need your own annotation to add behavior to methods or classes. For example, you might want a @LogExecutionTime annotation that automatically logs how long a method takes to run.

    Creating one is simple: define it with @interface, specify where it can go (@Target) and when it's available (@Retention). Then you write an aspect (using AOP) that intercepts methods with your annotation and adds the behavior.
    - **Example**:
      \`\`\`java
      @Target(ElementType.METHOD)
      @Retention(RetentionPolicy.RUNTIME)
      public @interface LogExecutionTime {
          String value() default "";
      }
      \`\`\`
    - **Example**:
      \`\`\`java
      @Around("@annotation(LogExecutionTime)")
      public Object logTime(ProceedingJoinPoint joinPoint) throws Throwable {
          long start = System.currentTimeMillis();
          Object result = joinPoint.proceed();
          long elapsed = System.currentTimeMillis() - start;
          System.out.println("Execution time: " + elapsed + "ms");
          return result;
      }
      \`\`\`

28. **What is the use of @Configuration annotation?**
    - **Answer**: @Configuration tells Spring "this class is a source of bean definitions." Instead of writing XML config files (the old way), you write Java methods that create and configure your beans.

    Think of it as a recipe book: each @Bean method is a recipe that tells Spring how to create an object. Spring calls these methods and registers the returned objects as beans in the application context.
    - **Example**:
      \`\`\`java
      @Configuration
      public class AppConfig {
          @Bean
          public DataSource dataSource() {
              return DataSourceBuilder.create()
                  .url("jdbc:h2:mem:test")
                  .username("sa")
                  .password("")
                  .build();
          }
      }
      \`\`\`
    - **Note**: It's a replacement for XML configuration.

29. **How do you use @Bean annotation?**
    - **Answer**: @Bean goes on a method inside a @Configuration class, and it tells Spring "call this method and register the return value as a bean." You use it when you need to configure a bean yourself — like setting up an ObjectMapper with specific settings.

    The bean's name defaults to the method name, but you can customize it with @Bean("customName").
    - **Example**:
      \`\`\`java
      @Configuration
      public class AppConfig {
          @Bean
          public ObjectMapper objectMapper() {
              return new ObjectMapper()
                  .registerModule(new JavaTimeModule())
                  .disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
          }
      }
      \`\`\`
    - **Note**: Bean name defaults to method name, can be customized: @Bean("customMapper")

30. **Explain the difference between @Primary and @Qualifier annotations.**
    - **Answer**: Both solve the same problem: what happens when there are multiple beans of the same type? For example, two DataSource beans — one for the main database and one for a reporting database.

    - **@Primary**: Sets the default. When Spring needs a DataSource and you haven't specified which one, it picks the @Primary one. Think of it as the "default choice."
    - **@Qualifier**: Picks a specific one. When you know exactly which bean you want, you use @Qualifier with the bean's name to say "this one, not the other one."

    Use @Primary for the main/default bean, and @Qualifier when you need a specific alternative.
    - **Example**:
      \`\`\`java
      @Bean
      @Primary
      public DataSource primaryDataSource() { ... }

      @Bean
      @Qualifier("secondary")
      public DataSource secondaryDataSource() { ... }

      // Usage
      @Autowired
      @Qualifier("secondary")
      private DataSource dataSource;
      \`\`\`

### REST and Web Development

31. **How do you create a RESTful web service in Spring Boot?**
    - **Answer**: Creating a REST API in Spring Boot is surprisingly simple. You annotate a class with @RestController (which says "this class handles HTTP requests and returns data, not HTML pages") and @RequestMapping (which sets the base URL path). Then each method handles a specific HTTP operation — GET for reading, POST for creating, PUT for updating, DELETE for deleting.

    Spring Boot handles all the heavy lifting: converting your Java objects to JSON, parsing request bodies, mapping URLs to methods, and managing HTTP status codes. You just write the business logic.
    - **Example**:
      \`\`\`java
      @RestController
      @RequestMapping("/api/v1/users")
      public class UserController {
          @Autowired
          private UserService userService;
          
          @GetMapping
          public List<User> getAllUsers() {
              return userService.findAll();
          }
          
          @GetMapping("/{id}")
          public ResponseEntity<User> getUserById(@PathVariable Long id) {
              return userService.findById(id)
                  .map(ResponseEntity::ok)
                  .orElse(ResponseEntity.notFound().build());
          }
          
          @PostMapping
          @ResponseStatus(HttpStatus.CREATED)
          public User createUser(@Valid @RequestBody User user) {
              return userService.save(user);
          }
      }
      \`\`\`

32. **What is @RestController annotation?**
    - **Answer**: @RestController is a shortcut that combines two annotations: @Controller (which marks the class as a web controller) and @ResponseBody (which says "don't look for an HTML view, just return the data directly"). When you return a Java object from a method, Spring Boot automatically converts it to JSON and sends it in the HTTP response. No extra configuration needed.
    - **Example**:
      \`\`\`java
      @Controller
      @ResponseBody
      public class MyController { ... }

      // vs
      @RestController
      public class MyController { ... }
      \`\`\`

33. **What are the HTTP methods supported by Spring Boot?**
    - **Answer**: Spring Boot supports all the standard HTTP methods you'd expect in a REST API. Each one has a dedicated annotation that makes your code clean and readable:
    - **Example**:
      \`\`\`text
      @GetMapping    - GET
      @PostMapping   - POST
      @PutMapping    - PUT
      @DeleteMapping - DELETE
      @PatchMapping  - PATCH
      @RequestMapping(method = RequestMethod.OPTIONS) - OPTIONS
      @RequestMapping(method = RequestMethod.HEAD)    - HEAD
      \`\`\`

34. **How do you handle exceptions in a Spring Boot RESTful service?**
    - **Answer**: Instead of writing try-catch blocks in every controller method, Spring Boot lets you handle exceptions in one central place using @ControllerAdvice. Think of it as a global safety net — any exception thrown by any controller gets caught here and converted into a proper HTTP response.

    You can handle specific exceptions (like ResourceNotFoundException returns 404) and have a catch-all for unexpected errors (returns 500). This keeps your controllers clean and your API responses consistent.
    - **Example**:
      \`\`\`java
      @ControllerAdvice
      public class RestExceptionHandler {
          @ExceptionHandler(MethodArgumentNotValidException.class)
          public ResponseEntity<ErrorResponse> handleValidationExceptions(MethodArgumentNotValidException ex) {
              List<String> errors = ex.getBindingResult()
                  .getFieldErrors()
                  .stream()
                  .map(FieldError::getDefaultMessage)
                  .collect(Collectors.toList());
              ErrorResponse errorResponse = new ErrorResponse("VALIDATION_FAILED", errors);
              return ResponseEntity.badRequest().body(errorResponse);
          }
      }
      \`\`\`

35. **What is the difference between @RequestBody and @ResponseBody?**
    - **Answer**: These two annotations handle opposite directions of data flow:

    - **@RequestBody**: Takes the JSON/XML from the incoming HTTP request and converts it into a Java object that your method can use. It's like unpacking a box that was sent to you.
    - **@ResponseBody**: Takes the Java object your method returns and converts it into JSON/XML for the HTTP response. It's like packing a box to send back.

    In @RestController, @ResponseBody is implicit — every method automatically serializes its return value. So you mostly use @RequestBody for incoming data.
    - **Example**:
      \`\`\`java
      @PostMapping("/users")
      public ResponseEntity<User> createUser(@RequestBody User user) {
          User saved = userService.save(user);
          return ResponseEntity.ok(saved); // @ResponseBody implicit in @RestController
      }
      \`\`\`

36. **How do you validate a request in Spring Boot?**
    - **Answer**: Spring Boot makes input validation almost effortless. You add validation annotations (like @NotNull, @Size, @Email) directly on your model fields, then put @Valid on the method parameter in your controller. If the incoming data doesn't meet the rules, Spring Boot automatically throws a MethodArgumentNotValidException — which you can handle in your @ControllerAdvice to return a clean error response.

    No manual if-else checks needed. The framework does the validation for you.
    - **Example**:
      \`\`\`java
      public class User {
          @NotNull(message = "ID cannot be null")
          private Long id;
          
          @NotBlank(message = "Name is required")
          @Size(min = 2, max = 50)
          private String name;
          
          @Email(message = "Invalid email format")
          private String email;
      }

      @PostMapping("/users")
      public ResponseEntity<User> createUser(@Valid @RequestBody User user) {
          // If validation fails, MethodArgumentNotValidException is thrown
          return ResponseEntity.ok(userService.save(user));
      }
      \`\`\`

37. **What is @PathVariable annotation?**
    - **Answer**: @PathVariable grabs values directly from the URL path. For example, if your URL is \`/users/123/orders/456\`, you can extract \`123\` and \`456\` by putting \`{userId}\` and \`{orderId}\` in your mapping and using @PathVariable on the method parameters. It's like pulling variables out of the URL itself.
    - **Example**:
      \`\`\`java
      @GetMapping("/users/{userId}/orders/{orderId}")
      public Order getOrder(@PathVariable Long userId, @PathVariable Long orderId) {
          return orderService.findByUserAndOrder(userId, orderId);
      }
      \`\`\`
    - **Note**: If parameter name differs, specify: @PathVariable("userId") Long id

38. **What is @RequestParam annotation?**
    - **Answer**: @RequestParam grabs query parameters from the URL — the stuff after the \`?\` in a URL like \`/search?name=john&page=1\`. You can make parameters required or optional (with default values), and Spring Boot automatically converts them to the right type. It's how you handle filters, search terms, pagination — anything that modifies what the endpoint returns.
    - **Example**:
      \`\`\`java
      @GetMapping("/search")
      public List<User> searchUsers(
          @RequestParam String name,
          @RequestParam(required = false, defaultValue = "0") int page,
          @RequestParam(required = false, defaultValue = "20") int size) {
          return userService.searchByName(name, PageRequest.of(page, size));
      }
      // URL: /search?name=john&page=1&size=10
      \`\`\`

39. **How do you implement pagination in Spring Boot?**
    - **Answer**: Pagination is how you avoid returning 10 million records in one API call. Spring Data makes this stupid easy — you just add a \`Pageable\` parameter to your repository method, and it handles the \`LIMIT\` and \`OFFSET\` (or keyset pagination) for you. The response includes the data plus metadata like total pages, total elements, and whether there's a next page.
    - **Example**:
      \`\`\`java
      // Repository
      public interface UserRepository extends JpaRepository<User, Long> {
          Page<User> findByStatus(String status, Pageable pageable);
      }

      // Controller
      @GetMapping("/users")
      public Page<User> getUsers(
          @RequestParam(defaultValue = "0") int page,
          @RequestParam(defaultValue = "20") int size,
          @RequestParam(defaultValue = "id,asc") String sort) {
          Pageable pageable = PageRequest.of(page, size, Sort.by(sort.split(",")));
          return userRepository.findAll(pageable);
      }
      \`\`\`

40. **How do you handle CORS in Spring Boot?**
    - **Answer**: CORS (Cross-Origin Resource Sharing) is a browser security feature that blocks requests from one domain to another unless the server explicitly allows it. If your frontend runs on \`localhost:3000\` and your backend on \`localhost:8080\`, the browser will block API calls unless you configure CORS. Spring Boot lets you do this per-controller with \`@CrossOrigin\` or globally with a \`CorsConfig\` class.
    - **Example**:
      \`\`\`java
      @RestController
      @CrossOrigin(origins = "http://localhost:3000")
      public class MyController { ... }
      \`\`\`
    - **Example**:
      \`\`\`java
      @Configuration
      public class CorsConfig implements WebMvcConfigurer {
          @Override
          public void addCorsMappings(CorsRegistry registry) {
              registry.addMapping("/api/**")
                  .allowedOrigins("http://localhost:3000")
                  .allowedMethods("GET", "POST", "PUT", "DELETE")
                  .allowedHeaders("*")
                  .allowCredentials(true);
          }
      }
      \`\`\`

### Spring Data and JPA

41. **What is Spring Data JPA?**
    - **Answer**: Spring Data JPA is the layer that sits on top of JPA and makes database work almost boringly easy. Instead of writing the same CRUD code over and over (find by ID, save, delete, find all), you just create an interface that extends \`JpaRepository\` and Spring Boot gives you all of that for free. Even better — you can write query methods just by naming them correctly (\`findByLastName\`, \`findByEmailAndActive\`) and Spring figures out the SQL automatically.
    - **Example**:
      \`\`\`java
      public interface UserRepository extends JpaRepository<User, Long> {
          // Query method
          List<User> findByLastName(String lastName);
          
          // Custom query
          @Query("SELECT u FROM User u WHERE u.email = ?1")
          Optional<User> findByEmail(String email);
      }
      \`\`\`

42. **How do you configure JPA in Spring Boot?**
    - **Answer**: You tell Spring Boot about your database through \`application.properties\` (or \`application.yml\`): the JDBC URL, username, password, and how you want Hibernate to behave. The \`spring.jpa.hibernate.ddl-auto\` setting is the important one — \`update\` adds new columns without dropping data (good for dev), \`validate\` just checks that your entities match the table structure (good for production), and \`create-drop\` wipes everything on shutdown (good for testing).
    - **Example**:
      \`\`\`properties
      spring.datasource.url=jdbc:mysql://localhost:3306/mydb
      spring.datasource.username=root
      spring.datasource.password=secret
      spring.jpa.hibernate.ddl-auto=update
      spring.jpa.show-sql=true
      spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect
      spring.jpa.properties.hibernate.format_sql=true
      \`\`\`

43. **What is a repository in Spring Data JPA?**
    - **Answer**: A repository is a database access layer — but instead of writing a class with all the SQL, you just write an interface. You extend \`JpaRepository<Entity, ID>\` and suddenly you have \`save()\`, \`findById()\`, \`findAll()\`, \`deleteById()\`, and a bunch of other methods ready to go. Spring Boot creates the implementation at runtime — you don't write it. For custom queries, you either name your method in a way Spring understands (\`findByLastNameAndActive\`) or write the SQL yourself with \`@Query\`.
    - **Example**:
      \`\`\`java
      @Repository
      public interface ProductRepository extends JpaRepository<Product, Long> {
          List<Product> findByCategory(String category);
          Page<Product> findByPriceBetween(Double min, Double max, Pageable pageable);
      }
      \`\`\`

44. **What is the difference between CrudRepository, JpaRepository, and PagingAndSortingRepository?**
    - **Answer**: These are three levels of repository interfaces, each adding more features. \`CrudRepository\` gives you basic CRUD (save, findById, delete, count). \`PagingAndSortingRepository\` adds pagination and sorting on top of that. \`JpaRepository\` is the full package — it includes everything plus JPA-specific stuff like \`flush()\` (force-write to database), \`saveAndFlush()\`, batch deletes, and \`deleteInBatch()\`. In practice, most people just use \`JpaRepository\` because it has everything you'll ever need.
    - **Example**:
      \`\`\`text
      CrudRepository - basic CRUD (save, findById, delete)
      PagingAndSortingRepository - extends Crud, adds pagination/sorting
      JpaRepository - extends PagingAndSorting, adds JPA-specific methods (flush, saveAndFlush, deleteInBatch)
      \`\`\`

45. **How do you define a custom query in Spring Data JPA?**
    - **Answer**: When the method-naming convention isn't enough (like complex joins, aggregations, or subqueries), you write the query yourself with \`@Query\`. You can use JPQL (which works with entity names and fields, not database tables) or native SQL (which lets you use database-specific features). JPQL is preferred because it's database-agnostic — if you switch from MySQL to PostgreSQL, your queries still work.
    - **Example**:
      \`\`\`java
      @Query("SELECT u FROM User u WHERE u.age >= ?1 AND u.city = ?2")
      List<User> findUsersByAgeAndCity(int age, String city);

      @Query(value = "SELECT * FROM users WHERE status = ?1", nativeQuery = true)
      List<User> findUsersByStatusNative(String status);
      \`\`\`

46. **What is the purpose of the @Query annotation?**
    - **Answer**: \`@Query\` is how you take control of the SQL when Spring Data's automatic method naming isn't enough. You put it on a repository method and write the query in JPQL (entity-based) or native SQL (table-based). It's also useful for performance — you can write a query that fetches only the columns you need instead of loading entire entities.
    - **Example**:
      \`\`\`java
      @Query("SELECT u FROM User u WHERE u.active = true")
      Page<User> findActiveUsers(Pageable pageable);
      \`\`\`

47. **How do you handle transactions in Spring Boot?**
    - **Answer**: A transaction is a way to say "either all of these database operations succeed, or none of them do." You put \`@Transactional\` on a method, and Spring Boot wraps it in a transaction automatically. If the method completes successfully, the changes are committed. If an exception is thrown, everything is rolled back — it's like nothing ever happened. This is critical for operations like transferring money between accounts, where you can't have one side succeed and the other fail.
    - **Example**:
      \`\`\`java
      @Service
      public class UserService {
          @Transactional
          public User createUser(User user) {
              // If exception occurs, transaction rolls back automatically
              return userRepository.save(user);
          }
          
          @Transactional(propagation = Propagation.REQUIRES_NEW)
          public void updateUser(User user) {
              // Runs in a new transaction
          }
      }
      \`\`\`

48. **What is the role of the @Entity annotation?**
    - **Answer**: \`@Entity\` is how you tell JPA "this Java class represents a database table." Each instance of the class is a row in that table. By default, the table name matches the class name, and the fields match the column names — but you can customize both with \`@Table\` and \`@Column\`. Without this annotation, JPA has no idea your class is something that should be stored in the database.
    - **Example**:
      \`\`\`java
      @Entity
      @Table(name = "users")
      public class User {
          @Id
          @GeneratedValue(strategy = GenerationType.IDENTITY)
          private Long id;
          
          @Column(nullable = false, length = 50)
          private String name;
          
          @Column(unique = true)
          private String email;
      }
      \`\`\`

49. **What is the difference between @Table and @Entity?**
    - **Answer**: \`@Entity\` is mandatory — without it, JPA ignores your class entirely. \`@Table\` is optional and only needed when your table name differs from your class name, or when you need to specify schema, constraints, or indexes. If your class is \`User\` and your table is also \`users\`, you can skip \`@Table\` and let JPA use its default naming strategy.
    - **Example**:
      \`\`\`java
      @Entity  // Required
      @Table(name = "users", schema = "public", uniqueConstraints = @UniqueConstraint(columnNames = "email"))
      public class User { ... }
      \`\`\`

50. **How do you perform CRUD operations in Spring Data JPA?**
    - **Answer**: CRUD stands for Create, Read, Update, Delete — the four basic operations you do on any data. With Spring Data JPA, you don't write any of this code yourself. Your repository interface extends \`JpaRepository\`, and you instantly get \`save()\` (create/update), \`findById()\` (read one), \`findAll()\` (read all), \`deleteById()\` (delete), plus a bunch more. Your service class just autowires the repository and calls these methods.
    - **Example**:
      \`\`\`java
      @Service
      public class UserService {
          @Autowired
          private UserRepository userRepository;
          
          public User save(User user) { return userRepository.save(user); }
          public Optional<User> findById(Long id) { return userRepository.findById(id); }
          public List<User> findAll() { return userRepository.findAll(); }
          public void delete(Long id) { userRepository.deleteById(id); }
          public User update(User user) { return userRepository.save(user); }
      }
      \`\`\`

`,s=`### Security

51. **What is Spring Security, and how does it integrate with Spring Boot?**

    - **Answer**: Spring Security is like a bouncer for your application — it decides who gets in (authentication) and what they're allowed to do once inside (authorization). It protects your app from common attacks like session fixation, clickjacking, and cross-site request forgery.

    The beauty of Spring Boot integration? You just add one dependency, and Spring Boot auto-configures security for you out of the box. Suddenly, every endpoint is protected with HTTP Basic auth, and you get a default user with a random password printed in the console.

    \`\`\`xml
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-security</artifactId>
    </dependency>
    \`\`\`

    That's it. One line in your pom.xml, and your entire app is now secured. Of course, you'll want to customize it (the default is just a starting point), but the integration is seamless.

52. **How do you secure a Spring Boot application?**

    - **Answer**: You create a security configuration class that tells Spring Security which endpoints are public, which require login, and which require specific roles. Think of it as writing the rules for your bouncer: "Anyone can see the homepage, only logged-in users can see their profile, and only admins can access the dashboard."

    \`\`\`java
    @Configuration
    @EnableWebSecurity
    public class SecurityConfig extends WebSecurityConfigurerAdapter {
        @Override
        protected void configure(HttpSecurity http) throws Exception {
            http
                .authorizeRequests()
                    .antMatchers("/public/**").permitAll()   // anyone can access
                    .antMatchers("/admin/**").hasRole("ADMIN") // only admins
                    .anyRequest().authenticated()             // everything else needs login
                .and()
                .formLogin()
                    .loginPage("/login").permitAll()          // custom login page
                .and()
                .logout().permitAll();                        // allow logout
        }
    }
    \`\`\`

53. **What is @EnableWebSecurity annotation?**

    - **Answer**: This annotation is like flipping the switch to turn on Spring Security's web security features. Without it, your security config class is just a regular class that Spring ignores. With it, Spring knows "this is where the security rules live" and starts applying them to incoming requests.

    \`\`\`java
    @Configuration
    @EnableWebSecurity
    public class SecurityConfig { ... }
    \`\`\`

    You need this annotation on your security configuration class — it's what makes the whole thing work.

54. **How do you implement OAuth2 in Spring Boot?**

    - **Answer**: OAuth2 lets users log in using their existing accounts from Google, GitHub, Facebook, etc. Instead of creating yet another username and password, they click "Sign in with Google" and you trust Google to verify their identity.

    Spring Boot makes this ridiculously easy. You just add the OAuth2 client starter and put your client credentials in the properties file:

    \`\`\`yaml
    spring:
      security:
        oauth2:
          client:
            registration:
              google:
                client-id: your-client-id
                client-secret: your-client-secret
                scope:
                  - email
                  - profile
    \`\`\`

    Spring Boot handles the entire OAuth2 flow behind the scenes — redirecting to Google, receiving the callback, exchanging the code for a token, and fetching the user's profile. You just configure it and it works.

55. **How do you handle authentication and authorization in Spring Boot?**

    - **Answer**: Authentication is "who are you?" and authorization is "what are you allowed to do?" In Spring Boot, you handle authentication by implementing \`UserDetailsService\` — a simple interface that says "given a username, load the user from your database." You handle authorization by configuring which roles can access which endpoints.

    \`\`\`java
    @Service
    public class CustomUserDetailsService implements UserDetailsService {
        @Autowired
        private UserRepository userRepository;
        
        @Override
        public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
            User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
            
            return org.springframework.security.core.userdetails.User
                .withUsername(user.getUsername())
                .password(user.getPassword())
                .roles(user.getRole())
                .build();
        }
    }
    \`\`\`

    This is the bridge between your user database and Spring Security. When someone tries to log in, Spring Security calls this service to load the user and check their password.

56. **What is the role of the SecurityConfigurerAdapter class?**
    - **Answer**: SecurityConfigurerAdapter used to be the starting point for Spring Security configuration in Spring Boot 2.x and earlier. Think of it as a template class where you would override methods to define which URLs need authentication and which are public.

But in Spring Boot 3+, it is deprecated. The new approach is SecurityFilterChain. Instead of extending a class, you create a bean method that returns a SecurityFilterChain. It is the same power, just a cleaner, more functional style.
    - **Example**:
      \`\`\`java
      @Bean
      public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
          http
              .authorizeHttpRequests((requests) -> requests
                  .requestMatchers("/public/**").permitAll()
                  .anyRequest().authenticated()
              )
              .formLogin(withDefaults());
          return http.build();
      }
      \`\`\`

57. **How do you implement JWT authentication in Spring Boot?**
    - **Answer**: JWT authentication in Spring Boot means you intercept incoming requests, pull out the JWT token from the Authorization header, validate it, and if its good, tell Spring Security this person is authenticated. The magic happens in a custom filter.
    - **Example**:
      \`\`\`java
      @Component
      public class JwtAuthenticationFilter extends OncePerRequestFilter {
          @Override
          protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, 
                                        FilterChain filterChain) throws ServletException, IOException {
              String token = extractToken(request);
              if (token != null && validateToken(token)) {
                  Authentication auth = new UsernamePasswordAuthenticationToken(
                      getUsername(token), null, getAuthorities(token));
                  SecurityContextHolder.getContext().setAuthentication(auth);
              }
              filterChain.doFilter(request, response);
          }
      }
      \`\`\`

58. **How do you configure CORS in Spring Security?**
    - **Answer**: CORS (Cross-Origin Resource Sharing) in Spring Security is about telling the browser its OK to let your frontend (say, localhost:3000) talk to your backend (localhost:8080). Without this, the browser blocks cross-origin requests as a security measure. In Spring Security, you enable and configure CORS right inside your SecurityFilterChain via HttpSecurity.cors(), then provide a CorsConfigurationSource bean that says which origins, methods, and headers are allowed.
    - **Example**:
      \`\`\`java
      @Configuration
      public class SecurityConfig {
          @Bean
          public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
              http
                  .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                  .csrf(csrf -> csrf.disable())
                  .authorizeHttpRequests(auth -> auth.anyRequest().authenticated());
              return http.build();
          }
          
          @Bean
          public CorsConfigurationSource corsConfigurationSource() {
              CorsConfiguration config = new CorsConfiguration();
              config.setAllowedOrigins(List.of("http://localhost:3000"));
              config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE"));
              UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
              source.registerCorsConfiguration("/**", config);
              return source;
          }
      }
      \`\`\`

59. **What are security filters in Spring Boot?**
    - **Answer**: Security filters are like guards at checkpoints in a tunnel. Every request must pass through them in order. Spring Security has a built-in filter chain — each filter handles one job like authentication or authorization. Here are the common ones you should know:
    - **Example**:
      \`\`\`text
      - UsernamePasswordAuthenticationFilter - processes form login
      - BasicAuthenticationFilter - processes HTTP Basic auth
      - JwtAuthenticationFilter - custom JWT validation
      - CorsFilter - handles CORS
      \`\`\`
    - **Note**: Filters are ordered: first authentication, then authorization.

60. **How do you encrypt passwords in Spring Boot?**
    - **Answer**: Passwords should never be stored in plain text. PasswordEncoder is Spring Security's tool for hashing passwords safely. BCrypt is the recommended choice because it automatically adds a random salt to each password and uses a work factor (how hard it is to crack), so even if two users have the same password, they get different hashes. This makes it much harder for attackers to crack stolen password databases using rainbow tables or brute force.
    - **Example**:
      \`\`\`java
      @Bean
      public PasswordEncoder passwordEncoder() {
          return new BCryptPasswordEncoder();
      }

      // Usage
      @Autowired
      private PasswordEncoder passwordEncoder;

      public void createUser(User user) {
          user.setPassword(passwordEncoder.encode(user.getPassword()));
          userRepository.save(user);
      }
      \`\`\`

### Testing

61. **How do you write unit tests in Spring Boot?**
    - **Answer**: Use JUnit 5 with Mockito for mocking dependencies.
    - **Example**:
      \`\`\`java
      @ExtendWith(MockitoExtension.class)
      class UserServiceTest {
          @Mock
          private UserRepository userRepository;
          
          @InjectMocks
          private UserService userService;
          
          @Test
          void shouldFindUserById() {
              User mockUser = new User(1L, "John");
              when(userRepository.findById(1L)).thenReturn(Optional.of(mockUser));
              
              User result = userService.findById(1L);
              
              assertNotNull(result);
              assertEquals("John", result.getName());
          }
      }
      \`\`\`

62. **What is the role of @SpringBootTest annotation?**
    - **Answer**: Loads the full application context for integration testing.
    - **Example**:
      \`\`\`java
      @SpringBootTest
      @AutoConfigureMockMvc
      class ApplicationIntegrationTest {
          @Autowired
          private MockMvc mockMvc;
          
          @Test
          void shouldReturnHelloWorld() throws Exception {
              mockMvc.perform(get("/hello"))
                  .andExpect(status().isOk())
                  .andExpect(content().string("Hello, World!"));
          }
      }
      \`\`\`

63. **How do you test RESTful web services in Spring Boot?**
    - **Answer**: Use @WebMvcTest with MockMvc.
    - **Example**:
      \`\`\`java
      @WebMvcTest(UserController.class)
      class UserControllerTest {
          @Autowired
          private MockMvc mockMvc;
          
          @MockBean
          private UserService userService;
          
          @Test
          void shouldGetUser() throws Exception {
              User user = new User(1L, "John");
              when(userService.findById(1L)).thenReturn(Optional.of(user));
              
              mockMvc.perform(get("/api/v1/users/1"))
                  .andExpect(status().isOk())
                  .andExpect(jsonPath("$.name").value("John"));
          }
      }
      \`\`\`

64. **What is the use of MockMvc in Spring Boot testing?**
    - **Answer**: MockMvc simulates HTTP requests without starting a full server, enabling fast controller testing.
    - **Example**:
      \`\`\`java
      mockMvc.perform(post("/api/users")
          .contentType(MediaType.APPLICATION_JSON)
          .content("{"name":"Jane"}"))
          .andExpect(status().isCreated())
          .andExpect(jsonPath("$.id").exists());
      \`\`\`

65. **How do you perform integration testing in Spring Boot?**
    - **Answer**: Use @SpringBootTest with TestRestTemplate or WebTestClient.
    - **Example**:
      \`\`\`java
      @SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
      class UserIntegrationTest {
          @LocalServerPort
          private int port;
          
          @Autowired
          private TestRestTemplate restTemplate;
          
          @Test
          void shouldCreateAndRetrieveUser() {
              User user = new User("Alice");
              User created = restTemplate.postForObject("/api/users", user, User.class);
              assertNotNull(created.getId());
              
              User retrieved = restTemplate.getForObject("/api/users/" + created.getId(), User.class);
              assertEquals("Alice", retrieved.getName());
          }
      }
      \`\`\`

66. **What are @MockBean and @SpyBean annotations?**
    - **Answer**: @MockBean creates a Mockito mock. @SpyBean creates a spy (partial mock).
    - **Example**:
      \`\`\`java
      @SpringBootTest
      class ServiceTest {
          @MockBean
          private UserRepository userRepository;
          
          @SpyBean
          private UserService userService;
          
          @Test
          void testService() {
              when(userRepository.save(any())).thenReturn(new User());
              userService.createUser(new User());
              verify(userRepository).save(any());
          }
      }
      \`\`\`

67. **How do you test a Spring Data JPA repository?**
    - **Answer**: Use @DataJpaTest which configures an in-memory database.
    - **Example**:
      \`\`\`java
      @DataJpaTest
      @AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
      class UserRepositoryTest {
          @Autowired
          private UserRepository userRepository;
          
          @Test
          void shouldSaveAndFindUser() {
              User user = new User("John", "john@mail.com");
              User saved = userRepository.save(user);
              
              Optional<User> found = userRepository.findById(saved.getId());
              assertTrue(found.isPresent());
              assertEquals("john@mail.com", found.get().getEmail());
          }
      }
      \`\`\`

68. **How do you test Spring Boot services?**
    - **Answer**: Use @MockBean for dependencies and test business logic.
    - **Example**:
      \`\`\`java
      @ExtendWith(MockitoExtension.class)
      class UserServiceTest {
          @Mock
          private UserRepository userRepository;
          
          @InjectMocks
          private UserService userService;
          
          @Test
          void shouldCreateUser() {
              User input = new User("Alice");
              User saved = new User(1L, "Alice");
              when(userRepository.save(any(User.class))).thenReturn(saved);
              
              User result = userService.createUser(input);
              assertEquals(1L, result.getId());
              assertEquals("Alice", result.getName());
          }
      }
      \`\`\`

69. **What is @DataJpaTest annotation?**
    - **Answer**: @DataJpaTest configures only JPA-related components for repository testing.
    - **Example**:
      \`\`\`text
      - Sets up an in-memory database (H2 by default)
      - Configures @Entity and @Repository beans
      - Disables full auto-configuration for speed
      \`\`\`

70. **How do you write a test for a Spring Boot controller?**
    - **Answer**: Use @WebMvcTest with MockMvc.
    - **Example**:
      \`\`\`java
      @WebMvcTest(UserController.class)
      class UserControllerTest {
          @Autowired
          private MockMvc mockMvc;
          
          @MockBean
          private UserService userService;
          
          @Test
          void shouldGetAllUsers() throws Exception {
              List<User> users = List.of(new User(1L, "John"), new User(2L, "Jane"));
              when(userService.findAll()).thenReturn(users);
              
              mockMvc.perform(get("/api/users"))
                  .andExpect(status().isOk())
                  .andExpect(jsonPath("$").isArray())
                  .andExpect(jsonPath("$[0].name").value("John"));
          }
      }
      \`\`\`

### Microservices and Cloud

71. **What is Spring Cloud, and how does it relate to Spring Boot?**
    - **Answer**: If Spring Boot is a car, Spring Cloud is the GPS, the traffic monitoring, and the roadside assistance all rolled into one. Spring Boot gets a single service up and running quickly. Spring Cloud helps dozens of those services work together in the real world — finding each other on the network, sharing configuration, handling failures gracefully, and routing requests intelligently.

    It builds on top of Spring Boot, so you get the same ease of use but for distributed systems concerns. You add a starter dependency, and suddenly your service can register itself with a service discovery server, fetch its config from a central repository, or circuit-break calls to a failing downstream service.
    - **Example**: Common Spring Cloud starters:
      \`\`\`text
      - spring-cloud-starter-netflix-eureka-client - service discovery
      - spring-cloud-starter-config - external configuration
      - spring-cloud-starter-gateway - API gateway
      - spring-cloud-starter-circuitbreaker-resilience4j - fault tolerance
      \`\`\`

72. **How do you create a microservice using Spring Boot?**
    - **Answer**: Creating a microservice in Spring Boot is surprisingly simple. You start with a Spring Boot project, add the web starter (which gives you an embedded Tomcat server and Spring MVC), define your REST endpoints with annotations, and you're done. Each microservice is a standalone JAR that runs on its own, communicates over HTTP, and owns its own data.
    - **Example**:
      \`\`\`java
      @SpringBootApplication
      @RestController
      public class ProductServiceApplication {
          @GetMapping("/products/{id}")
          public Product getProduct(@PathVariable Long id) {
              return new Product(id, "Laptop", 999.99);
          }
          
          public static void main(String[] args) {
              SpringApplication.run(ProductServiceApplication.class, args);
          }
      }
      \`\`\`

73. **What is service discovery, and how do you implement it in Spring Boot?**
    - **Answer**: In a microservices world, services are constantly being created, destroyed, and moved around. Service discovery is like a phone book for your services — instead of hardcoding URLs (which break the moment a service moves), services look up "hey, where's the product service right now?" and get back its current address.

    The most common way to do this in Spring Boot is with Netflix Eureka. You run a Eureka server (the phone book), and each microservice registers itself with Eureka on startup. When one service wants to call another, it asks Eureka for the address.
    - **Example**:
      \`\`\`java
      @SpringBootApplication
      @EnableEurekaServer
      public class DiscoveryServiceApplication {
          public static void main(String[] args) {
              SpringApplication.run(DiscoveryServiceApplication.class, args);
          }
      }
      \`\`\`

74. **What is the role of Eureka in Spring Cloud?**
    - **Answer**: Eureka is the service registry — the central phone book that all your microservices talk to. When a service starts up, it tells Eureka "I'm here, here's my address." Every few seconds, it sends a heartbeat to say "I'm still alive." If Eureka stops hearing from a service, it removes it from the registry so other services stop trying to call a dead instance.

    The magic is client-side load balancing: when your service asks Eureka for the product service, Eureka gives back a list of all healthy instances, and your client picks one (round-robin). No single point of failure, no external load balancer needed.
    - **Example**:
      \`\`\`properties
      # Eureka Server
      eureka.client.register-with-eureka=false
      eureka.client.fetch-registry=false

      # Eureka Client
      eureka.client.service-url.defaultZone=http://localhost:8761/eureka
      eureka.instance.prefer-ip-address=true
      \`\`\`

75. **How do you configure load balancing in Spring Boot?**
    - **Answer**: When you have multiple instances of a service running (for scalability), you need a way to spread requests across them. Spring Cloud LoadBalancer is the modern way to do this — it replaced the older Netflix Ribbon. You just annotate your RestTemplate bean with \`@LoadBalanced\`, and from then on, when you call \`http://product-service/products/1\`, Spring automatically resolves "product-service" to an actual instance (using service discovery) and distributes calls across them.
    - **Example**:
      \`\`\`java
      @Configuration
      public class AppConfig {
          @Bean
          @LoadBalanced
          public RestTemplate restTemplate() {
              return new RestTemplate();
          }
      }

      // Usage
      @Service
      public class OrderService {
          @Autowired
          private RestTemplate restTemplate;
          
          public Product getProduct(Long id) {
              return restTemplate.getForObject(
                  "http://product-service/products/" + id, Product.class);
          }
      }
      \`\`\`

76. **What is Spring Cloud Config?**
    - **Answer**: Imagine you have 20 microservices and you need to change a database URL. Without a config server, you'd have to update 20 property files, rebuild 20 services, and redeploy them all. Spring Cloud Config solves this by having one central config server that serves configuration to all your services.

    You store your properties in a Git repository (so you get version control for free), and each service fetches its config from the server on startup. Need to change something? Update Git, and services can refresh without restarting. It's like having a single control panel for your entire microservices architecture.
    - **Example**:
      \`\`\`java
      @SpringBootApplication
      @EnableConfigServer
      public class ConfigServerApplication {
          public static void main(String[] args) {
              SpringApplication.run(ConfigServerApplication.class, args);
          }
      }
      \`\`\`

77. **How do you handle distributed tracing in Spring Boot?**
    - **Answer**: In a microservices world, a single user request might bounce through 5 different services. When something goes slow or breaks, how you figure out which service caused the problem? That's where distributed tracing comes in.

    Spring Cloud Sleuth automatically adds a unique "trace ID" to every request as it flows through your services — like a tracking number for your package. Zipkin then collects all those traces and shows you a timeline: "the request spent 5ms in the gateway, 200ms in the order service, and 2 seconds in the database call." Now you know exactly where to look.
    - **Example**:
      \`\`\`xml
      <dependency>
          <groupId>org.springframework.cloud</groupId>
          <artifactId>spring-cloud-starter-sleuth</artifactId>
      </dependency>
      <dependency>
          <groupId>org.springframework.cloud</groupId>
          <artifactId>spring-cloud-starter-zipkin</artifactId>
      </dependency>
      \`\`\`
    - **Note**: Sleuth adds trace and span IDs, Zipkin sends data to a Zipkin server.

78. **What is the use of Spring Cloud Gateway?**
    - **Answer**: Think of Spring Cloud Gateway as the front door to your microservices architecture. Instead of clients calling services directly (which would mean exposing every service to the internet), they all call the gateway. The gateway then routes each request to the right service, like a receptionist directing visitors to the right department.

    But it does more than just route. It can add security headers, limit how many requests a user can make (rate limiting), log everything for monitoring, and even break the circuit if a downstream service is struggling. All in one place, without cluttering your individual services.
    - **Example**:
      \`\`\`yaml
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
      \`\`\`

79. **How do you implement API Gateway in Spring Boot?**
    - **Answer**: You set up Spring Cloud Gateway as a separate Spring Boot application that acts as the single entry point for all your clients. You define routing rules that say "any request starting with /api/products/** goes to the product service" and "any request starting with /api/users/** goes to the user service."

    The gateway uses service discovery (like Eureka) to find the actual instances, so you don't hardcode URLs. You can also add filters — like adding an authentication header, logging the request, or applying rate limiting — without touching the actual services.
    - **Example**:
      \`\`\`yaml
      spring:
        cloud:
          gateway:
            routes:
              - id: user-service
                uri: lb://user-service
                predicates:
                  - Path=/users/**
                filters:
                  - AddRequestHeader=X-Request-Id, 123
      \`\`\`

80. **What is Hystrix, and how does it work in Spring Boot?**
    - **Answer**: Imagine you're calling the product service, and it's down. Without a circuit breaker, your order service keeps waiting and timing out — wasting threads and slowing everything down. With a circuit breaker (Hystrix was the original, now Resilience4j is the modern choice), after a few failures, the circuit "opens" and your fallback runs immediately instead of waiting.

    It's like a fuse in your house — when there's a surge, the fuse blows to protect the rest of the circuit. The circuit breaker watches for failures, opens the circuit when things go bad, periodically tests if the service is back, and closes the circuit when it's healthy again. Your users get a graceful fallback instead of a timeout error.
    - **Example**:
      \`\`\`java
      @Service
      public class ProductService {
          @CircuitBreaker(name = "productService", fallbackMethod = "fallback")
          public Product getProduct(Long id) {
              return restTemplate.getForObject("http://product-service/products/" + id, Product.class);
          }
          
          public Product fallback(Long id, Throwable throwable) {
              return new Product(id, "Fallback Product", 0.0);
          }
      }
      \`\`\`

### Miscellaneous

81. **What are the key components of a Spring Boot application?**
    - **Answer**: A Spring Boot app is made up of a few key pieces that work together: the main class with \`@SpringBootApplication\` (the entry point), the configuration files (\`application.properties\` or \`application.yml\`), the embedded server (Tomcat by default — no need to deploy to an external server), auto-configuration (Spring Boot guessing what you need based on your dependencies), and starter dependencies (curated bundles that pull in everything you need for a specific task).
    - **Example**:
      \`\`\`text
      - @SpringBootApplication (main class)
      - application.properties/yml (configuration)
      - Embedded server (Tomcat/Jetty)
      - Auto-configuration
      - Starter dependencies
      - Actuator endpoints (monitoring)
      \`\`\`

82. **How does Spring Boot handle application properties and configuration?**
    - **Answer**: Spring Boot uses \`application.properties\` or \`application.yml\` as its configuration file — one place to set your database URL, server port, logging levels, and any custom settings. You can inject values directly with \`@Value("\${app.name}")\` for quick access, or use \`@ConfigurationProperties\` to bind a whole group of related properties to a Java object (like having a \`DatabaseConfig\` class that automatically gets \`spring.datasource.url\`, \`spring.datasource.username\`, etc. populated).
    - **Example**:
      \`\`\`java
      @ConfigurationProperties(prefix = "app")
      @Component
      public class AppProperties {
          private String name;
          private String version;
          private Map<String, String> endpoints;
          // getters/setters
      }
      \`\`\`

83. **What are actuators in Spring Boot, and why are they important?**
    - **Answer**: Actuators are like the dashboard of a car — they tell you what's happening under the hood without opening the engine. Spring Boot Actuator adds a set of built-in HTTP endpoints that expose health info, metrics, environment properties, logging configuration, and more. Instead of guessing why your app is slow, you can hit \`/actuator/health\` to see if it's up, \`/actuator/metrics\` to see memory usage and request counts, and \`/actuator/loggers\` to change logging levels on the fly without restarting.
    - **Example**: Key endpoints:
      \`\`\`text
      /actuator/health - application health
      /actuator/info - application info
      /actuator/metrics - application metrics
      /actuator/loggers - logging configuration
      /actuator/env - environment properties
      \`\`\`

84. **How do you monitor a Spring Boot application?**
    - **Answer**: Monitoring a Spring Boot app is a three-layer approach. First, Actuator gives you the raw endpoints — health, metrics, environment info. Second, Micrometer acts as a metrics facade that exports those metrics in a standard format. Third, you plug in a monitoring system like Prometheus (which scrapes and stores the metrics) and Grafana (which turns them into beautiful dashboards). The result: you can see request rates, error counts, JVM memory, and database connection pools all in one place, with alerts when something goes wrong.
    - **Example**:
      \`\`\`xml
      <dependency>
          <groupId>io.micrometer</groupId>
          <artifactId>micrometer-registry-prometheus</artifactId>
      </dependency>

      management.endpoints.web.exposure.include=health,info,prometheus
      \`\`\`
    - **Note**: Prometheus scrapes metrics, Grafana visualizes them.

85. **What is Spring Boot Admin?**
    - **Answer**: Spring Boot Admin is a community project that gives you a visual dashboard for all your Spring Boot services. Instead of hitting actuator endpoints with curl, you get a nice web UI where you can see all your applications at a glance — which ones are up, which are down, their health status, memory usage, logging levels, and more. It's like mission control for your microservices: one screen showing the status of everything.
    - **Example**:
      \`\`\`java
      @SpringBootApplication
      @EnableAdminServer
      public class AdminServerApplication {
          public static void main(String[] args) {
              SpringApplication.run(AdminServerApplication.class, args);
          }
      }
      \`\`\`

86. **What is the role of @SpringBootApplication annotation?**
    - **Answer**: \`@SpringBootApplication\` is actually three annotations in one, and that's why it's so powerful. It combines \`@Configuration\` (marks this class as a source of bean definitions), \`@EnableAutoConfiguration\` (tells Spring Boot to start guessing what you need based on your dependencies — "oh, you added JPA? I'll set up a DataSource and EntityManager"), and \`@ComponentScan\` (tells Spring to look in this package and subpackages for other components, services, and controllers to register). One annotation replaces what used to be a whole configuration class.
    - **Example**:
      \`\`\`java
      @Configuration
      @EnableAutoConfiguration
      @ComponentScan(basePackages = "com.myapp")
      public class MyApp { ... }
      \`\`\`

87. **How do you deploy a Spring Boot application?**
    - **Answer**: The simplest way is as a standalone JAR — Spring Boot packages everything (including the embedded Tomcat server) into one executable file. You just run \`java -jar myapp.jar\` and your app is up. No need to install a separate web server or configure a servlet container. You can also deploy to cloud platforms like AWS, Azure, or Google Cloud, or containerize it with Docker for Kubernetes deployments.
    - **Example**:
      \`\`\`bash
      mvn clean package
      java -jar target/myapp.jar --server.port=8081
      \`\`\`
    - **Example**:
      \`\`\`dockerfile
      FROM eclipse-temurin:17
      COPY target/myapp.jar app.jar
      ENTRYPOINT ["java", "-jar", "/app.jar"]
      \`\`\`

88. **What are the different ways to package a Spring Boot application?**
    - **Answer**: Spring Boot supports two main packaging formats. The default is a JAR (Java Archive) — a standalone executable that includes the embedded server. You just run \`java -jar app.jar\` and it works. This is the most common approach for microservices. The second option is a WAR (Web Archive) — this is for when you need to deploy to an external servlet container like Tomcat, Jetty, or a traditional application server. WAR packaging is more common in enterprise environments that already have a standardized deployment infrastructure.
    - **Example**:
      \`\`\`text
      JAR - standalone executable with embedded server (default)
      WAR - deployable to external servlet containers (Tomcat, Jetty)
      \`\`\`

89. **What is the role of SpringApplication class?**
    - **Answer**: \`SpringApplication\` is the engine that starts your Spring Boot app. When you call \`SpringApplication.run(MyApp.class, args)\`, it does a lot behind the scenes: it creates the Spring application context (the container that manages all your beans), sets up the embedded server (Tomcat by default), triggers auto-configuration, and starts listening for requests. You can also customize it before running — like turning off the banner, setting active profiles, or adding custom listeners for startup events.
    - **Example**:
      \`\`\`java
      SpringApplication app = new SpringApplication(MyApp.class);
      app.setBannerMode(Banner.Mode.OFF);
      app.setAdditionalProfiles("dev");
      app.run(args);
      \`\`\`

90. **How do you handle application migrations in Spring Boot?**
    - **Answer**: Database migrations are how you version-control your database schema — instead of manually running SQL scripts, you let a tool like Flyway or Liquibase manage it. You put SQL files in a special folder (\`src/main/resources/db/migration/\` for Flyway), and on startup, the tool checks which migrations have already run and applies the new ones. It's like Git for your database: every change is tracked, reversible, and applied consistently across all environments.
    - **Example**:
      \`\`\`xml
      <dependency>
          <groupId>org.flywaydb</groupId>
          <artifactId>flyway-core</artifactId>
      </dependency>

      # SQL scripts in db/migration/V1__init.sql
      # Flyway runs automatically on startup
      \`\`\`

### Advanced Topics

91. **What is Spring Boot DevTools, and how do you use it?**
    - **Answer**: DevTools is a developer productivity tool that makes the "change code → restart → check result" cycle much faster. When you change a file in your project, DevTools automatically restarts your application (much faster than a cold start because it uses a clever classloader trick). It also supports live reload — refreshing your browser automatically when static files change. And it disables certain production features (like template caching) that slow down development. Just add the dependency and it works — no configuration needed.
    - **Example**:
      \`\`\`xml
      <dependency>
          <groupId>org.springframework.boot</groupId>
          <artifactId>spring-boot-devtools</artifactId>
          <scope>runtime</scope>
          <optional>true</optional>
      </dependency>
      \`\`\`
    - **Note**: Classpath changes trigger automatic restart. Live Reload works with browser plugins.

92. **How do you handle versioning in a Spring Boot REST API?**
    - **Answer**: When your API is used by multiple clients and you need to make breaking changes, versioning keeps everyone happy. You can version via the URI (\`/api/v1/users\` → \`/api/v2/users\`), query parameters (\`/api/users?version=1\`), custom headers (\`X-API-Version=1\`), or content negotiation (\`Accept: application/vnd.myapp.v1+json\`). URI versioning is the most common and easiest to understand — anyone can see which version they're using just by looking at the URL.
    - **Example**:
      \`\`\`text
      URI versioning: /api/v1/users, /api/v2/users
      Parameter versioning: /api/users?version=1
      Header versioning: X-API-Version=1
      Content negotiation: Accept: application/vnd.myapp.v1+json
      \`\`\`

93. **What are the common pitfalls in Spring Boot development?**
    - **Answer**: Spring Boot makes things so easy that it's easy to get tripped up. Common mistakes include: relying on auto-configuration without understanding what it's doing (so when something breaks, you have no idea why), ignoring security (leaving default passwords or forgetting CSRF protection), not handling exceptions globally (so users see ugly stack traces), bloating your JAR with unused dependencies, and not using profiles (so your dev config accidentally goes to production). The fix for most of these is simple: understand what Boot is doing for you, and don't skip the basics.
    - **Example**:
      \`\`\`text
      - Over-reliance on auto-configuration without understanding
      - Ignoring security best practices (default passwords, missing CSRF)
      - Poor exception handling (no global handler)
      - Large JAR sizes (unused dependencies)
      - Not using profiles for different environments
      - Blocking operations in WebFlux
      \`\`\`

94. **How do you optimize the performance of a Spring Boot application?**
    - **Answer**: Performance optimization in Spring Boot is about smart defaults and targeted tuning. Make sure you're using connection pooling (HikariCP is the default — it's fast). Enable caching for frequently accessed data with \`@Cacheable\`. Optimize your database queries — add indexes, use fetch joins to avoid N+1 queries. Use \`@Async\` for non-blocking operations. Enable HTTP compression to reduce payload sizes. Tune your JVM heap and garbage collection for your workload. And always paginate large responses — returning 100,000 records at once is never a good idea.
    - **Example**:
      \`\`\`text
      - Use connection pooling (HikariCP default)
      - Enable caching (@EnableCaching)
      - Optimize database queries (indexes, fetch joins)
      - Use async processing (@Async)
      - Configure HTTP compression (server.compression.enabled=true)
      - Tune JVM heap and GC
      - Use response pagination
      \`\`\`

95. **What are the best practices for Spring Boot development?**
    - **Answer**: The key best practices boil down to: use constructor injection (it makes your dependencies explicit and your code testable), follow a clear package structure (controllers handle HTTP, services contain business logic, repositories talk to the database), externalize your configuration (no hardcoded URLs or passwords), write real tests (unit tests for logic, integration tests for endpoints), use profiles to separate dev/test/prod settings, enable structured logging, monitor with Actuator and Micrometer, use DTOs for API responses (don't expose your database entities directly), and always implement global exception handling so clients get meaningful errors.
    - **Example**:
      \`\`\`text
      - Use constructor injection over field injection
      - Follow package structure (controller, service, repository)
      - Externalize configuration
      - Write comprehensive tests (unit, integration)
      - Use profiles for environments
      - Enable logging with structured format
      - Monitor with Actuator/Micrometer
      - Use DTOs for API contracts
      - Implement global exception handling
      \`\`\`

96. **How do you use Liquibase or Flyway with Spring Boot?**
    - **Answer**: Add dependency and create migration scripts.
    - **Example**:
      \`\`\`sql
      -- src/main/resources/db/migration/V1_0_0__create_users.sql
      CREATE TABLE users (
          id BIGINT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(100) NOT NULL,
          email VARCHAR(100) UNIQUE NOT NULL
      );
      \`\`\`

97. **How do you configure caching in Spring Boot?**
    - **Answer**: Enable caching and use annotations.
    - **Example**:
      \`\`\`java
      @Configuration
      @EnableCaching
      public class CacheConfig { ... }

      @Service
      public class ProductService {
          @Cacheable(value = "products", key = "#id")
          public Product getProduct(Long id) {
              // expensive operation
              return productRepository.findById(id);
          }
          
          @CacheEvict(value = "products", key = "#id")
          public void updateProduct(Long id, Product product) { ... }
      }
      \`\`\`

98. **What is Spring Session, and how do you use it?**
    - **Answer**: Spring Session manages user sessions in distributed environments, storing sessions in Redis, JDBC, or Hazelcast.
    - **Example**:
      \`\`\`xml
      <dependency>
          <groupId>org.springframework.session</groupId>
          <artifactId>spring-session-data-redis</artifactId>
      </dependency>

      # application.properties
      spring.session.store-type=redis
      spring.redis.host=localhost
      spring.redis.port=6379
      \`\`\`

99. **How do you handle file uploads in Spring Boot?**
    - **Answer**: Use MultipartFile in controller.
    - **Example**:
      \`\`\`java
      @PostMapping("/upload")
      public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {
          String fileName = file.getOriginalFilename();
          Path path = Paths.get("/uploads/" + fileName);
          Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);
          return ResponseEntity.ok("File uploaded: " + fileName);
      }

      # application.properties
      spring.servlet.multipart.max-file-size=10MB
      spring.servlet.multipart.max-request-size=10MB
      \`\`\`

100. **What are the new features introduced in the latest versions of Spring Boot?**
    - **Answer**: Spring Boot 3.x features include:
    - **Example**:
      \`\`\`text
      - Java 17 baseline
      - Jakarta EE 10 support (javax → jakarta)
      - GraalVM native images support (Spring Native)
      - Improved Docker Compose support
      - Enhanced observability (Micrometer tracing)
      - Problem Details support (RFC 7807)
      - Updated autoconfiguration for Spring 6
      \`\`\`
    - **Note**: Check the Spring Boot release notes for details.`,c=r(),l=o+s,u=(e,t)=>{try{return t||=`java`,i.highlight(e,{language:t,ignoreIllegals:!0}).value}catch(n){return console.warn(`Highlight.js error for language '${t}':`,n),e.replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`).replace(/'/g,`&#x27;`)}},d=(e=>{let t=[],n=e.split(`
`),r=null,i=null,a=!1,o=[],s=``;for(let e=0;e<n.length;e++){let c=n[e],l=c.trim();if(l.startsWith("```")){if(!a)a=!0,s=l.replace(/```/g,``).trim()||`java`,o=[];else{if(a=!1,i&&o.length>0){let e=o.join(`
`).split(`
`),t=Math.min(...e.filter(e=>e.trim()).map(e=>e.match(/^\s*/)[0].length)),n=e.map(e=>e.slice(t)).join(`
`).trim();i.response.push({type:`code`,content:n,language:s})}o=[]}continue}if(a){o.push(c);continue}let u=c.match(/^###\s+(.+)/);if(u){r={name:u[1],questions:[]},t.push(r),i=null;continue}let d=c.match(/^(\d+)\.\s*\*\*(.+?)\*\*/);if(d)i={id:d[1],question:d[2],response:[]},r&&r.questions.push(i);else if(i&&c.trim().startsWith(`- **Answer**:`)){let e=c.replace(`- **Answer**:`,``).trim();e&&i.response.push({type:`text`,content:e.replace(/\*\*(.+?)\*\*/g,`$1`).replace(/`([^`]+)`/g,`$1`)})}else if(i&&c.trim().startsWith(`- **Example**:`)){let e=c.replace(`- **Example**:`,``).trim();e&&i.response.push({type:`example`,content:e.replace(/\*\*(.+?)\*\*/g,`$1`).replace(/`([^`]+)`/g,`$1`)})}else if(i&&c.trim().startsWith(`- **Note**:`)){let e=c.replace(`- **Note**:`,``).trim();e&&i.response.push({type:`note`,content:e.replace(/\*\*(.+?)\*\*/g,`$1`).replace(/`([^`]+)`/g,`$1`)})}else if(i&&c.trim()&&!c.trim().startsWith(`#`)){let e=c.trim(),t=e.replace(/^-\s*/,``).replace(/\*\*(.+?)\*\*/g,`$1`).replace(/`([^`]+)`/g,`$1`).trim();if(/^[\w\s'/&()-]{1,45}:$/.test(t))continue;if(e&&e.length>1&&!e.match(/^[-*]\s*$/)&&!e.match(/^[a-zA-Z]$/)&&!e.match(/^[0-9]$/)){let t=e.replace(/^\s*[-*]\s+/,``).replace(/\*\*(.+?)\*\*/g,`$1`).replace(/`([^`]+)`/g,`$1`);i.response.push({type:`text`,content:t})}}}return t})(l),f=d.reduce((e,t)=>e+t.questions.length,0);function p(){let[e,t]=(0,a.useState)(null),r=n=>{t(e===n?null:n)};return(0,c.jsxs)(`div`,{className:`spring-boot-interview-page`,children:[(0,c.jsx)(`section`,{className:`interview-header`,children:(0,c.jsxs)(`div`,{className:`interview-header-content`,children:[(0,c.jsx)(n,{to:`/spring-boot`,className:`back-button`,children:`← Back to Spring Boot`}),(0,c.jsx)(`h1`,{className:`interview-title`,children:`Spring Boot Interview Questions`}),(0,c.jsx)(`p`,{className:`interview-subtitle`,children:`Master Spring Boot interview questions with detailed answers and code examples`}),(0,c.jsxs)(`div`,{className:`interview-stats`,children:[(0,c.jsxs)(`div`,{className:`interview-stat`,children:[(0,c.jsxs)(`span`,{className:`stat-number`,children:[f,`+`]}),(0,c.jsx)(`span`,{className:`stat-label`,children:`Questions`})]}),(0,c.jsxs)(`div`,{className:`interview-stat`,children:[(0,c.jsx)(`span`,{className:`stat-number`,children:d.length}),(0,c.jsx)(`span`,{className:`stat-label`,children:`Categories`})]}),(0,c.jsxs)(`div`,{className:`interview-stat`,children:[(0,c.jsx)(`span`,{className:`stat-number`,children:`100%`}),(0,c.jsx)(`span`,{className:`stat-label`,children:`Free`})]})]})]})}),(0,c.jsx)(`section`,{className:`questions-section`,children:(0,c.jsx)(`div`,{className:`questions-container`,children:(0,c.jsx)(`div`,{className:`questions-list`,children:d.map((t,n)=>(0,c.jsxs)(`div`,{className:`category-section`,children:[(0,c.jsx)(`h2`,{className:`category-title`,children:t.name}),(0,c.jsx)(`div`,{className:`questions-vertical`,children:t.questions.map(t=>(0,c.jsxs)(`div`,{className:`question-item-vertical ${e===t.id?`active`:``}`,children:[(0,c.jsxs)(`div`,{className:`question-item-header`,onClick:()=>r(t.id),children:[(0,c.jsxs)(`span`,{className:`q-number`,children:[`Q`,t.id]}),(0,c.jsx)(`p`,{className:`q-text`,children:t.question}),(0,c.jsx)(`span`,{className:`expand-arrow ${e===t.id?`expanded`:``}`,children:`▼`})]}),e===t.id&&(0,c.jsx)(`div`,{className:`question-item-content`,children:(0,c.jsx)(`div`,{className:`question-card`,children:(0,c.jsxs)(`div`,{className:`question-answer`,children:[(0,c.jsx)(`h3`,{className:`answer-title`,children:`Answer:`}),t.response.map((e,t)=>e.type===`code`?(0,c.jsxs)(`div`,{className:`code-block`,children:[(0,c.jsx)(`div`,{className:`code-header`,children:(0,c.jsx)(`span`,{className:`code-language`,children:e.language||`java`})}),(0,c.jsx)(`pre`,{className:`language-${e.language||`java`}`,children:(0,c.jsx)(`code`,{className:`language-${e.language||`java`}`,dangerouslySetInnerHTML:{__html:u(e.content,e.language)}})})]},t):e.type===`example`?(0,c.jsxs)(`p`,{className:`answer-text answer-${e.type}`,children:[`📘 `,e.content]},t):e.type===`note`?(0,c.jsxs)(`p`,{className:`answer-text answer-${e.type}`,children:[`💡 `,e.content]},t):(0,c.jsx)(`p`,{className:`answer-text answer-${e.type}`,children:e.content},t))]})})})]},t.id))})]},n))})})})]})}export{p as default};