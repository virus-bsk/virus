import{r as e}from"./rolldown-runtime-QTnfLwEv.js";import{h as t,r as n,u as r}from"./index-Dka5w6n9.js";import{t as i}from"./atom-one-dark-C84iCW6D.js";var a=e(t(),1),o=n(),s=(e,t)=>{try{return t||=`java`,i.highlight(e,{language:t,ignoreIllegals:!0}).value}catch(n){return console.warn(`Highlight.js error for language '${t}':`,n),e.replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`).replace(/'/g,`&#x27;`)}},c=(e=>{let t=[],n=e.split(`
`),r=null,i=null,a=!1,o=[],s=``;for(let e=0;e<n.length;e++){let c=n[e],l=c.trim();if(l.startsWith("```")){if(!a)a=!0,s=l.replace(/```/g,``).trim()||`java`,o=[];else{if(a=!1,i&&o.length>0){let e=o.join(`
`).split(`
`),t=Math.min(...e.filter(e=>e.trim()).map(e=>e.match(/^\s*/)[0].length)),n=e.map(e=>e.slice(t)).join(`
`).trim();i.response.push({type:`code`,content:n,language:s})}o=[]}continue}if(a){o.push(c);continue}let u=c.match(/^###\s+(.+)/);if(u){r={name:u[1],questions:[]},t.push(r),i=null;continue}let d=c.match(/^(\d+)\.\s*\*\*(.+?)\*\*/);if(d)i={id:d[1],question:d[2],response:[]},r&&r.questions.push(i);else if(i&&c.trim().startsWith(`- **Response**:`)){let e=c.replace(`- **Response**:`,``).trim();e&&i.response.push({type:`text`,content:e.replace(/\*\*(.+?)\*\*/g,`$1`).replace(/`([^`]+)`/g,`$1`)})}else if(i&&c.trim()&&!c.trim().startsWith(`#`)){let e=c.trim(),t=e.replace(/^-\s*/,``).replace(/\*\*(.+?)\*\*/g,`$1`).replace(/`([^`]+)`/g,`$1`).trim();if(/^[\w\s'/&()-]{1,45}:$/.test(t))continue;if(e&&e.length>1&&!e.match(/^[-*]\s*$/)&&!e.match(/^[a-zA-Z]$/)&&!e.match(/^[0-9]$/)){let t=e.replace(/^\s*[-*]\s+/,``).replace(/\*\*(.+?)\*\*/g,`$1`).replace(/`([^`]+)`/g,`$1`);i.response.push({type:`text`,content:t})}}}return t})(`## Microservices Interview Questions

### Microservices Fundamentals

1. **Design an E-Commerce Order Management System using Microservices.**
   - **Response**: An e-commerce application has modules like Order, Payment, Inventory, Notification, and User. Instead of putting everything into one application, split them into independent services.
   - **Example**: The microservices include Order Service, Payment Service, Inventory Service, User Service, Notification Service, API Gateway, Service Registry (Eureka), and Config Server.
   - **Flow**: Client → API Gateway → Order Service → Payment / Inventory / Notification.
   - **Why**: Independent deployment, better scalability, easy maintenance, and fault isolation.
   - **Spring Boot Example**:
     \`\`\`java
     @RestController
     @RequestMapping("/orders")
     public class OrderController {

         @PostMapping
         public String createOrder() {
             return "Order Created";
         }
     }
     \`\`\`
   - **Interview Tip**: Mention database-per-service and asynchronous communication using Kafka.

2. **Your Order Service calls Payment Service and Inventory Service. Payment succeeds but Inventory fails. How will you maintain consistency?**
   - **Response**: Never use distributed transactions (2PC) in microservices. Use the Saga Pattern.
   - **Flow**: Order Created → Payment Success → Inventory Failed → Compensating Transaction → Refund Payment.
   - **Solution**: 1. Create Order 2. Call Payment 3. Payment Success 4. Call Inventory 5. Inventory Failed 6. Refund Payment 7. Cancel Order.
   - **Best Practice**: Use Kafka for communication.

3. **How would you split a monolithic banking application into microservices?**
   - **Response**: Suppose a Bank Application has Customer, Account, Loan, Card, Transaction, and Notification. Split into Customer Service, Account Service, Loan Service, Card Service, Transaction Service, and Notification Service.
   - **Best Practice**: Each service owns its own database. Never share tables between services.

4. **A microservice becomes too large after one year. How do you decide whether to split it?**
   - **Response**: Split when multiple teams work on it, there are different deployment cycles, different scalability needs, or different business domains.
   - **Example**: Order Service → Split into Cart Service, Checkout Service, Order Service.
   - **Best Practice**: Avoid splitting just because the codebase is large; split based on business capability.

5. **Design a Notification Service supporting Email, SMS, and Push Notifications.**
   - **Response**: Order Service → Kafka Topic → Notification Service → Email / SMS / Push.
   - **Advantages**: Loose coupling, easy to add WhatsApp or Slack later, retry failed notifications independently.
   - **Spring Boot Kafka Consumer**:
     \`\`\`java
     @KafkaListener(topics = "notification-topic")
     public void consume(String message) {
         System.out.println(message);
     }
     \`\`\`

6. **Your API Gateway becomes a bottleneck. How would you improve it?**
   - **Response**: Possible reasons include heavy authentication, too many requests, no caching, or slow downstream services.
   - **Solutions**: Multiple Gateway instances, Load Balancer, Redis caching, Rate Limiting, Circuit Breaker, Kubernetes Horizontal Pod Autoscaler (HPA).
   - **Best Practice**: Never keep business logic inside the API Gateway.

7. **How do you avoid cyclic dependencies between microservices?**
   - **Response**: Order → Payment → Inventory → Order creates a circular dependency. Use events instead.
   - **Example**: Order → Kafka → Inventory → Kafka → Payment.
   - **Best Practice**: Services should communicate through events where appropriate instead of directly depending on each other.

8. **Design a Customer Profile Service used by multiple applications.**
   - **Response**: Consumers include Mobile App, Internet Banking, Admin Portal, and CRM. All access the same Customer Profile Service.
   - **Architecture**: Apps → API Gateway → Customer Service → Customer Database.
   - **Example**: GET /customers/{id}, PUT /customers/{id}.
   - **Best Practice**: Expose only required APIs. Never allow direct database access from other services.

9. **How would you implement Service Discovery in Spring Boot?**
   - **Response**: Using Eureka Server. Order Service registers with Eureka, and Payment Service discovers Order Service.
   - **Configuration**:
     \`\`\`properties
     eureka.client.service-url.defaultZone=http://localhost:8761/eureka
     \`\`\`
   - **Example**: Call another service using its service name instead of a hardcoded URL: http://PAYMENT-SERVICE/payments.
   - **Benefits**: Improves scalability and fault tolerance.

10. **Explain how you would migrate a monolith to microservices without downtime.**
    - **Response**: Use the Strangler Fig Pattern. Gradually extract modules one by one — User Service first, then Order Service, then Payment Service, etc.
    - **Benefits**: No downtime, lower migration risk, easier testing, and incremental deployment.

### Communication (REST, WebClient, Kafka)

11. **When would you choose REST over Kafka? Explain with a real-time example.**
    - **Response**: Use REST when immediate response is required (Request/Response communication). Use Kafka when response is not required immediately and services should be loosely coupled.
    - **Example**: Order Service → REST → Payment Service (immediate). Order Service → Kafka → Email/Analytics/Inventory (async).
    - **Spring Boot REST Example**:
      \`\`\`java
      @FeignClient(name = "payment-service")
      public interface PaymentClient {

          @PostMapping("/payments")
          PaymentResponse pay(PaymentRequest request);
      }
      \`\`\`
    - **Kafka Example**:
      \`\`\`java
      kafkaTemplate.send("order-topic", order);
      \`\`\`
    - **Best Practice**: Payment → REST, Notification → Kafka. REST is synchronous, Kafka is asynchronous.

12. **When would you use WebClient instead of Feign Client?**
    - **Response**: Feign Client is blocking and simple for CRUD APIs. WebClient is non-blocking, reactive, and better for high concurrent applications.
    - **Feign Example**:
      \`\`\`java
      @FeignClient("inventory-service")
      public interface InventoryClient {

          @GetMapping("/inventory/{id}")
          Inventory getInventory(@PathVariable Long id);
      }
      \`\`\`
    - **WebClient Example**:
      \`\`\`java
      WebClient webClient = WebClient.create();

      Mono<Product> product = webClient.get()
          .uri("/products/1")
          .retrieve()
          .bodyToMono(Product.class);
      \`\`\`
    - **When to choose**: Feign for internal CRUD APIs, WebClient for high concurrent and reactive microservices.

13. **How do you implement asynchronous communication using Kafka?**
    - **Response**: When Order Created, publish an event to Kafka. Inventory, Notification, and Analytics consume the event independently.
    - **Producer**:
      \`\`\`java
      kafkaTemplate.send("orders", order);
      \`\`\`
    - **Consumer**:
      \`\`\`java
      @KafkaListener(topics = "orders")
      public void consume(Order order) {

      }
      \`\`\`
    - **Advantages**: Loose coupling, better scalability, easy retry, event-driven.

14. **A downstream service is slow. How do you prevent cascading failures?**
    - **Response**: When Inventory becomes slow, Payment waits, Order waits, and the whole application hangs. Solution: Use Timeout, Retry, Circuit Breaker, and Bulkhead.
    - **Resilience4j Example**:
      \`\`\`java
      @CircuitBreaker(name = "inventory")
      public Inventory getInventory() {

      }
      \`\`\`
    - **Benefit**: If Inventory is down, fallback method runs and the application continues.

15. **How do you implement request timeout and retry?**
    - **Response**: Timeout prevents waiting forever. Retry handles temporary failures.
    - **Spring Retry Example**:
      \`\`\`java
      @Retry(name = "payment")
      public PaymentResponse pay() {

      }
      \`\`\`
    - **Timeout Configuration**:
      \`\`\`properties
      spring.webclient.connect-timeout=5s
      \`\`\`
    - **Best Practice**: Retry only for network issues or temporary server issues. Never retry after a payment is already successful to avoid double payment.

16. **How do you correlate logs across multiple microservices?**
    - **Response**: Use a Correlation ID. The API Gateway generates X-Correlation-ID and every service passes the same header so logs can be filtered.
    - **Spring Filter**:
      \`\`\`java
      MDC.put("correlationId", id);
      \`\`\`
    - **Benefit**: All logs across services contain the same ID, making debugging easier.

17. **Design an Event-Driven Order Processing System.**
    - **Response**: Architecture: Order → Kafka → Payment → Inventory → Notification → Analytics.
    - **Producer**:
      \`\`\`java
      kafkaTemplate.send("order-created", order);
      \`\`\`
    - **Consumers**: Inventory, Notification, and Analytics each independently consume the event.
    - **Advantages**: Loose coupling, high scalability, independent deployment.

18. **REST vs gRPC. Which one will you choose?**
    - **Response**: REST uses JSON and is easy with browser support. gRPC uses HTTP/2 and binary protocol with faster performance and less payload.
    - **Choose REST** for external APIs and mobile apps. **Choose gRPC** for internal high-performance communication between services.
    - **Example**: Mobile App → REST → API Gateway. Inventory → gRPC → Pricing → Recommendation.

19. **How do you version APIs without affecting existing clients?**
    - **Response**: Use URI versioning: /v1/customers, /v2/customers. Or header versioning: Accept-Version:2.
    - **Best Practice**: Never break existing APIs. Maintain backward compatibility.

20. **How do you handle duplicate Kafka messages?**
    - **Response**: Kafka guarantees at-least-once delivery, so consumers may receive the same event twice. Solution: Idempotency — store EventId in the database and check before processing.
    - **Example**:
      \`\`\`java
      if (repository.existsByEventId(id)) {
          return;
      }
      \`\`\`
    - **Best Practice**: Always make Kafka consumers idempotent.

### Database & Transactions

21. **How do you implement the Saga Pattern for an Order-Payment-Inventory flow?**
    - **Response**: Saga Pattern handles distributed transactions. If payment succeeds but inventory fails, use a compensating transaction to refund payment and cancel order.
    - **Choreography Saga**: Each service publishes an event: Order Created → Payment Completed → Inventory Reserved.
    - **Orchestration Saga**: A Saga Orchestrator controls the flow: Order → Payment → Inventory.
    - **Best Practice**: Use Kafka. Every step must have a compensating action. Never use distributed DB transactions.

22. **Explain the Transactional Outbox Pattern.**
    - **Response**: Problem: Order saved in DB, but Kafka publish fails, so Inventory never receives the event. Solution: Save the event into an Outbox table in the same transaction, then a background worker publishes it to Kafka.
    - **Spring Boot Example**:
      \`\`\`java
      @Transactional
      public void createOrder(Order order) {

          orderRepository.save(order);

          outboxRepository.save(
              new OutboxEvent("ORDER_CREATED")
          );
      }
      \`\`\`
    - **Advantages**: No data loss, reliable event publishing, eventual consistency.

23. **Shared Database vs Database-per-Service. Which one do you choose?**
    - **Response**: Shared Database causes tight coupling, schema conflicts, and difficult deployment. Database-per-Service gives loose coupling, independent deployment, independent scaling, and better security.
    - **Best Practice**: Always prefer Database-per-Service.

24. **How do you maintain data consistency without distributed transactions?**
    - **Response**: Use Saga Pattern, Event-Driven Architecture, Kafka, and Transactional Outbox. Each service updates its own database and consistency becomes eventual.

25. **Explain CQRS with a real-time example.**
    - **Response**: CQRS (Command Query Responsibility Segregation) separates write and read operations.
    - **Example**: Bank Account — Deposit Money writes to Write DB, Balance Inquiry reads from Read DB.
    - **Architecture**: Commands → Write DB → Kafka → Read DB → Queries.
    - **Advantages**: Faster reads, independent scaling, better performance. Use CQRS only for systems with heavy read traffic.

26. **Explain Event Sourcing with a Banking example.**
    - **Response**: Instead of storing only the current balance, store every event: Account Created, Deposit 500, Withdraw 200, Deposit 1000. Current balance is computed by replaying all events.
    - **Advantages**: Complete audit trail, easy debugging, full history available. Used in banking, insurance, and trading.

27. **How do you handle database schema changes in production?**
    - **Response**: Never directly change production tables. Use migration tools like Flyway or Liquibase.
    - **Steps**: 1. Add new column 2. Deploy application 3. Migrate data 4. Remove old column later.
    - **Best Practice**: Never rename or delete columns immediately, otherwise old application versions fail.

28. **How do you implement idempotency for Payment APIs?**
    - **Response**: Problem: Client sends Pay ₹1000, network timeout, client retries, payment happens twice. Solution: Client sends an Idempotency-Key header. The server stores the key and returns the previous response for duplicate requests.
    - **Spring Boot Example**:
      \`\`\`java
      if (repository.existsByKey(key)) {
          return existingResponse;
      }
      \`\`\`
    - **Best Practice**: Mandatory for payments, refunds, and money transfers.

29. **Optimistic Locking vs Pessimistic Locking.**
    - **Response**: Optimistic Locking assumes conflict is rare and uses a version column. If the version changes, the update fails.
    - **Spring Boot**:
      \`\`\`java
      @Version
      private Long version;
      \`\`\`
    - **Pessimistic Locking** locks the record immediately using SELECT ... FOR UPDATE.
    - **Choose**: Optimistic for high-read systems, Pessimistic for banking transactions.

30. **How do you recover from partial transaction failures?**
    - **Response**: Example: Order → Payment Success → Inventory Failed. Recovery: Refund Payment → Cancel Order → Notify Customer.
    - **Techniques**: Saga Pattern, Retry, Dead Letter Queue (DLQ), Manual Compensation, Monitoring Alerts.
    - **Best Practice**: Every distributed transaction should have retry policy, compensation logic, audit logs, monitoring, and alerting.

### Resilience & Performance

31. **How do you implement Circuit Breaker using Resilience4j?**
    - **Response**: When Payment Service is down, thousands of requests wait and cause thread exhaustion. Circuit Breaker blocks requests before they reach the failing service.
    - **States**: Closed (normal), Open (requests blocked), Half-Open (tests service recovery).
    - **Spring Boot**:
      \`\`\`java
      @CircuitBreaker(name = "paymentService",
          fallbackMethod = "fallback")
      public PaymentResponse pay(PaymentRequest request) {
          return paymentClient.pay(request);
      }

      public PaymentResponse fallback(PaymentRequest request,
          Exception ex) {
          return new PaymentResponse("Payment Service Unavailable");
      }
      \`\`\`
    - **Best Practice**: Configure failure threshold and wait duration. Always provide a fallback method.

32. **Retry vs Circuit Breaker. When do you use each?**
    - **Response**: Retry retries temporary failures (e.g., 503 Service Unavailable). Circuit Breaker stops unnecessary requests when a service is down.
    - **Spring Boot Retry**:
      \`\`\`java
      @Retry(name = "payment")
      \`\`\`
    - **Use Retry** for network issues, temporary DB issues, and temporary server issues.
    - **Best Practice**: Use Retry + Circuit Breaker together.

33. **How do you implement API Rate Limiting?**
    - **Response**: Limit requests per client. Example: 100 requests/minute, the 101st request gets 429 Too Many Requests.
    - **Technologies**: API Gateway, Redis, Bucket4j.
    - **Example**:
      \`\`\`java
      Bucket bucket = Bucket.builder()
          .addLimit(Bandwidth.simple(100,
              Duration.ofMinutes(1)))
          .build();
      \`\`\`
    - **Best Practice**: Apply rate limiting at the API Gateway.

34. **Explain the Bulkhead Pattern.**
    - **Response**: Like a ship with compartments — if one compartment floods, others remain safe. In microservices, separate thread pools for each service.
    - **Example**: Order Pool, Payment Pool, Inventory Pool. If Inventory hangs, Payment continues.
    - **Spring Boot**:
      \`\`\`java
      @Bulkhead(name = "inventory")
      \`\`\`
    - **Advantages**: Fault isolation, better stability, prevents thread exhaustion.

35. **Design a Redis caching strategy.**
    - **Response**: Without cache every request hits the DB. With Redis: Client → Redis → Database (only on cache miss).
    - **Spring Boot**:
      \`\`\`java
      @Cacheable("products")
      public Product getProduct(Long id) {
          return repository.findById(id).get();
      }
      \`\`\`
    - **Cache**: Product details, user profile, country list, configuration.
    - **Don't cache**: Payment, bank balance, OTP.

36. **How do you avoid cache inconsistency?**
    - **Response**: Use the Cache Aside Pattern. For reads: Redis → cache miss → Database → update cache. For writes: Update DB first, then delete the cache so the next request reloads it.
    - **Best Practice**: Never update cache first. Always update the database first.

37. **How would you optimize a microservice handling 1 million requests/day?**
    - **Response**: Enable Redis Cache, database indexing, connection pooling, horizontal scaling, Kafka for async tasks, pagination, compression, and CDN for static files.
    - **Architecture**: Load Balancer → API Gateway → 3 Order Pods → Redis → Database.
    - **Interview Tip**: Always identify the bottleneck before optimizing.

38. **Your API response time suddenly increases. How do you debug it?**
    - **Response**: Check Database Query (EXPLAIN), Thread Dump (jstack), Heap Dump (jmap), logs, CPU usage, memory usage, Kafka lag, Redis, external APIs, and network latency.
    - **Tools**: Grafana, Prometheus, Zipkin, Kibana.
    - **Best Practice**: Never assume. Collect metrics first.

39. **How do you improve database performance in a microservice?**
    - **Response**: Create indexes, use pagination, connection pool, Redis cache, read replicas, query optimization, and batch processing.
    - **Wrong**: SELECT * FROM orders;
    - **Correct**: SELECT id, status FROM orders LIMIT 20;
    - **Spring Boot**:
      \`\`\`java
      Page<Order> findAll(Pageable pageable);
      \`\`\`

40. **Explain Horizontal Scaling vs Vertical Scaling.**
    - **Response**: Vertical Scaling increases server resources (4GB RAM → 16GB RAM) — simple but limited and has downtime. Horizontal Scaling increases server instances behind a load balancer — better availability, scalability, and no single point of failure.
    - **Interview Tip**: Modern cloud-native microservices prefer horizontal scaling.

### Security

41. **How do you implement JWT Authentication in Spring Boot Microservices?**
    - **Response**: Client logs in → Authentication Service generates a JWT → Client stores the token and sends it in every request.
    - **Flow**: Client → Login → Authentication Service → JWT Token → Client → API Gateway → Order Service → Payment Service.
    - **Generate Token**:
      \`\`\`java
      String token = Jwts.builder()
          .setSubject(username)
          .setIssuedAt(new Date())
          .setExpiration(new Date(System.currentTimeMillis() + 3600000))
          .signWith(SignatureAlgorithm.HS256, secretKey)
          .compact();
      \`\`\`
    - **Validate Token**:
      \`\`\`java
      Jwts.parser()
          .setSigningKey(secretKey)
          .parseClaimsJws(token);
      \`\`\`
    - **Best Practice**: Set expiry time, use HTTPS only, use a strong secret key, short-lived access tokens.

42. **OAuth2 Authorization Code Flow vs Client Credentials Flow.**
    - **Response**: Authorization Code Flow is used when a human user logs in (e.g., Google Login, Facebook). Client Credentials Flow is machine-to-machine communication between services.
    - **Best Practice**: Authorization Code → User Login, Client Credentials → Service-to-Service.

43. **How do you secure service-to-service communication?**
    - **Response**: Never expose internal services publicly. Use OAuth2, JWT, mTLS, and API Gateway.
    - **Example**: Gateway → Order Service → OAuth Token → Payment Service.
    - **Additional Security**: HTTPS, firewall, Kubernetes Network Policy.

44. **How do you implement Role-Based Access Control (RBAC)?**
    - **Response**: Assign roles like ADMIN, CUSTOMER, MANAGER.
    - **Spring Security**:
      \`\`\`java
      @PreAuthorize("hasRole('ADMIN')")
      public void deleteUser() {

      }
      \`\`\`
    - **Best Practice**: Never hardcode roles. Store them in the database.

45. **How do you securely store secrets in Kubernetes?**
    - **Response**: Never store passwords like password=admin123 in GitHub. Use Kubernetes Secrets, HashiCorp Vault, or AWS Secrets Manager.
    - **Example**:
      \`\`\`yaml
      apiVersion: v1
      kind: Secret
      metadata:
        name: db-secret
      \`\`\`
    - **Best Practice**: Rotate secrets regularly.

46. **How do you prevent Replay Attacks?**
    - **Response**: A replay attack captures a request and sends it again, causing double payment. Solutions: JWT expiry, nonce, timestamp, and idempotency keys.
    - **Best Practice**: Payments should always use idempotency keys.

47. **How do you secure Kafka communication?**
    - **Response**: Use SSL/TLS, SASL Authentication, and ACLs.
    - **Configuration**:
      \`\`\`properties
      security.protocol=SASL_SSL
      \`\`\`
    - **Best Practice**: Never expose Kafka publicly.

48. **How do you implement API Rate Limiting for security?**
    - **Response**: Bot sends 100,000 requests → server crash. Solution: API Gateway + Redis counter + limit to 100 requests/minute. Response: 429 Too Many Requests.
    - **Benefits**: Prevent DDoS, prevent brute force, protect APIs.

49. **Explain Refresh Token Flow using JWT.**
    - **Response**: Access Token expires → user requests a new token using Refresh Token → Authentication Server issues a new Access Token.
    - **Best Practice**: Access Token 15 minutes, Refresh Token 7 days.

50. **How do you secure Public APIs in Production?**
    - **Response**: Use HTTPS, JWT, OAuth2, API Gateway, Rate Limiting, WAF, input validation, SQL injection prevention, XSS protection, CORS, logging, and monitoring.
    - **Architecture**: Client → WAF → API Gateway → Authentication → Microservices.
    - **Best Practice**: Never expose Database, Kafka, Redis, or internal services. Only expose the API Gateway.

### Production, Docker & Kubernetes

51. **How do you Dockerize a Spring Boot Microservice?**
    - **Response**: Package the Spring Boot application into a Docker image so it runs consistently on any environment.
    - **Dockerfile**:
      \`\`\`dockerfile
      FROM eclipse-temurin:17-jdk

      WORKDIR /app

      COPY target/order-service.jar app.jar

      EXPOSE 8080

      ENTRYPOINT ["java","-jar","app.jar"]
      \`\`\`
    - **Build**: docker build -t order-service .
    - **Run**: docker run -p 8080:8080 order-service
    - **Best Practice**: Use lightweight base images, don't run as root, keep images small.

52. **How do you deploy multiple Spring Boot Microservices in Kubernetes?**
    - **Response**: Deploy each service as a separate Deployment.
    - **Deployment YAML**:
      \`\`\`yaml
      apiVersion: apps/v1
      kind: Deployment

      metadata:
        name: order-service

      spec:
        replicas: 3
      \`\`\`
    - **Service YAML**:
      \`\`\`yaml
      kind: Service

      spec:
        type: ClusterIP
      \`\`\`
    - **Benefits**: High availability, auto healing, easy scaling.

53. **Rolling Update vs Blue-Green vs Canary Deployment.**
    - **Response**: Rolling Update replaces pods gradually with zero downtime. Blue-Green runs two versions and switches traffic with instant rollback. Canary sends traffic gradually (5% → 20% → 50% → 100%) to a few users first.
    - **Best Practice**: Canary is best for production deployments.

54. **How do you implement centralized logging?**
    - **Response**: 100 microservices with separate logs are difficult to debug. Use the ELK Stack: Microservices → Logstash → Elasticsearch → Kibana.
    - **Benefits**: Search logs, filter logs, error analysis, dashboards.
    - **Best Practice**: Always include Correlation ID, Request ID, Timestamp, and Service Name.

55. **Explain Distributed Tracing using Zipkin/OpenTelemetry.**
    - **Response**: One request travels across Gateway → Order → Payment → Inventory → Notification. Distributed tracing shows where time is spent.
    - **Spring Boot**:
      \`\`\`properties
      management.tracing.enabled=true
      \`\`\`
    - **Benefits**: Identify slow services, end-to-end tracing, better debugging.

56. **How do you monitor Microservices using Prometheus and Grafana?**
    - **Response**: Prometheus collects metrics, Grafana displays dashboards. Architecture: Spring Boot → Prometheus → Grafana.
    - **Metrics**: CPU, memory, heap, JVM threads, response time, error rate.
    - **Spring Boot**:
      \`\`\`properties
      management.endpoints.web.exposure.include=*
      \`\`\`
    - **Best Practice**: Create alerts for CPU > 80%, Memory > 80%, Response Time > 2 seconds.

57. **A production issue occurs where one microservice fails intermittently. How do you troubleshoot it?**
    - **Response**: Check Logs (ELK), Metrics (Grafana), Trace (Zipkin), Database, Redis, Kafka, External APIs, Thread Dump (jstack), and Heap Dump (jmap).
    - **Best Practice**: Never restart immediately. First identify the root cause.

58. **A Kubernetes Pod keeps restarting. How do you troubleshoot it?**
    - **Response**: Check Pods (kubectl get pods), Describe Pod (kubectl describe pod), View Logs (kubectl logs).
    - **Common Reasons**: CrashLoopBackOff, OutOfMemory, wrong environment variables, database down, failed health check, image pull error.
    - **Best Practice**: Always configure Liveness Probe and Readiness Probe.

59. **Design a CI/CD Pipeline for Spring Boot Microservices.**
    - **Response**: Pipeline: Developer → GitHub → Jenkins → Build → JUnit → SonarQube → Docker Build → Docker Hub → Kubernetes Deployment.
    - **Stages**: 1. Checkout Code 2. Compile 3. Unit Test 4. Sonar Scan 5. Docker Build 6. Push Docker Image 7. Deploy Kubernetes 8. Smoke Test.
    - **Benefits**: Automated deployment, faster delivery, reduced human errors.

60. **Design a Production-Ready Banking Payment System using Spring Boot Microservices.**
    - **Response**: Microservices: API Gateway, Authentication Service, Customer Service, Account Service, Payment Service, Transaction Service, Notification Service.
    - **Architecture**: Client → API Gateway → Auth / Customer / Account / Payment / Transaction → Kafka → Notification Service → Redis, MySQL, Kubernetes.
    - **Technology Stack**: Java 17, Spring Boot 3, Spring Security, OAuth2 & JWT, Spring Cloud Gateway, Eureka, OpenFeign/WebClient, Kafka, Redis, MySQL/PostgreSQL, Docker, Kubernetes, Jenkins, Prometheus, Grafana, Zipkin, ELK Stack.
    - **Security**: JWT Authentication, OAuth2, HTTPS, RBAC, Rate Limiting, mTLS, Secrets Management.
    - **Performance**: Redis Cache, Horizontal Scaling, Load Balancer, Connection Pooling, Kafka for async.
    - **Reliability**: Circuit Breaker, Retry, Bulkhead, Saga Pattern, Transactional Outbox, Dead Letter Queue.
    - **Monitoring**: ELK for Logs, Zipkin for Tracing, Prometheus for Metrics, Grafana Dashboards.
    - **Best Practices**: One database per microservice, stateless services, externalized configuration, health checks, correlation IDs, API versioning, idempotent APIs, graceful shutdown, zero-downtime deployments.
    - **Interview Tip**: Explain requirements, microservices, database strategy, communication, security, resilience, scalability, monitoring, deployment, and production best practices.`),l=c.reduce((e,t)=>e+t.questions.length,0);function u(){let[e,t]=(0,a.useState)(null),n=n=>{t(e===n?null:n)};return(0,o.jsxs)(`div`,{className:`interview-page`,children:[(0,o.jsx)(`section`,{className:`interview-header`,children:(0,o.jsxs)(`div`,{className:`interview-header-content`,children:[(0,o.jsx)(r,{to:`/microservices`,className:`back-button`,children:`← Back to Microservices`}),(0,o.jsx)(`h1`,{className:`interview-title`,children:`Microservices Interview Questions`}),(0,o.jsx)(`p`,{className:`interview-subtitle`,children:`Master Microservices interview questions with detailed answers and code examples`}),(0,o.jsxs)(`div`,{className:`interview-stats`,children:[(0,o.jsxs)(`div`,{className:`interview-stat`,children:[(0,o.jsxs)(`span`,{className:`stat-number`,children:[l,`+`]}),(0,o.jsx)(`span`,{className:`stat-label`,children:`Questions`})]}),(0,o.jsxs)(`div`,{className:`interview-stat`,children:[(0,o.jsx)(`span`,{className:`stat-number`,children:c.length}),(0,o.jsx)(`span`,{className:`stat-label`,children:`Categories`})]}),(0,o.jsxs)(`div`,{className:`interview-stat`,children:[(0,o.jsx)(`span`,{className:`stat-number`,children:`100%`}),(0,o.jsx)(`span`,{className:`stat-label`,children:`Free`})]})]})]})}),(0,o.jsx)(`section`,{className:`questions-section`,children:(0,o.jsx)(`div`,{className:`questions-container`,children:(0,o.jsx)(`div`,{className:`questions-list`,children:c.map((t,r)=>(0,o.jsxs)(`div`,{className:`category-section`,children:[(0,o.jsx)(`h2`,{className:`category-title`,children:t.name}),(0,o.jsx)(`div`,{className:`questions-vertical`,children:t.questions.map(t=>(0,o.jsxs)(`div`,{className:`question-item-vertical ${e===t.id?`active`:``}`,children:[(0,o.jsxs)(`div`,{className:`question-item-header`,onClick:()=>n(t.id),children:[(0,o.jsxs)(`span`,{className:`q-number`,children:[`Q`,t.id]}),(0,o.jsx)(`p`,{className:`q-text`,children:t.question}),(0,o.jsx)(`span`,{className:`expand-arrow ${e===t.id?`expanded`:``}`,children:`▼`})]}),e===t.id&&(0,o.jsx)(`div`,{className:`question-item-content`,children:(0,o.jsx)(`div`,{className:`question-card`,children:(0,o.jsxs)(`div`,{className:`question-answer`,children:[(0,o.jsx)(`h3`,{className:`answer-title`,children:`Answer:`}),t.response.map((e,t)=>e.type===`code`?(0,o.jsxs)(`div`,{className:`code-block`,children:[(0,o.jsx)(`div`,{className:`code-header`,children:(0,o.jsx)(`span`,{className:`code-language`,children:e.language||`java`})}),(0,o.jsx)(`pre`,{className:`language-${e.language||`java`}`,children:(0,o.jsx)(`code`,{className:`language-${e.language||`java`}`,dangerouslySetInnerHTML:{__html:s(e.content,e.language)}})})]},t):(0,o.jsx)(`p`,{className:`answer-text answer-${e.type}`,children:e.content},t))]})})})]},t.id))})]},r))})})})]})}export{u as default};