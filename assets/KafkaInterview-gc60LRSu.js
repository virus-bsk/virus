import{r as e}from"./rolldown-runtime-QTnfLwEv.js";import{t}from"./react-CZI7_Jkm.js";import{r as n,s as r}from"./index-yz2jrTMK.js";import{t as i}from"./atom-one-dark-CL0A0LnX.js";/* empty css                            */var a=e(t(),1),o=`## Kafka Fundamentals\r
\r
### What is Apache Kafka?\r
\r
Think of Kafka as a giant, super-fast post office for data. Instead of sending messages directly from one app to another (which gets messy fast), apps send messages to Kafka, and other apps pick them up when they're ready. It's built to handle massive amounts of data flowing through it every second — we're talking millions of messages — without breaking a sweat.\r
\r
The cool part? It's not just a message queue. It stores messages permanently (like a log file), lets multiple apps read the same messages, and can even replay old messages if you need to.\r
\r
### Why do we use Kafka?\r
\r
Imagine you're running an online store. When someone places an order, a bunch of things need to happen: update inventory, send a confirmation email, notify the warehouse, update analytics. Without Kafka, your order system would need to talk to each of these directly — and if one goes down, orders get lost.\r
\r
With Kafka, your order system just shouts "new order!" into Kafka, and every other system listens and does its own thing. Nobody blocks nobody. If the email system goes down for a minute, messages just wait in Kafka until it's back up.\r
\r
The main reasons people pick Kafka:\r
- It handles insane amounts of data — millions of messages per second\r
- You can add more servers when you grow (horizontal scaling)\r
- Messages are saved to disk and copied across multiple machines, so you don't lose data\r
- If one server dies, another takes over automatically\r
- The sender and receiver don't need to know about each other at all\r
\r
### What are the main components of Kafka?\r
\r
Let's break it down with a real-world analogy. Think of Kafka as a library:\r
\r
- **Broker** = A librarian. Each broker is a server that stores messages and handles reading/writing. You have many librarians working together.\r
- **Cluster** = The whole library. A group of brokers working together.\r
- **Topic** = A section in the library (like "Fiction" or "Orders"). It's just a category name for messages.\r
- **Partition** = A shelf within that section. Each topic is split into partitions so many people can read at the same time.\r
- **Producer** = Someone who donates books. An app that sends messages to Kafka.\r
- **Consumer** = Someone who borrows books. An app that reads messages from Kafka.\r
- **Consumer Group** = A book club. A group of consumers working together — each person reads different books so the whole club gets through faster.\r
- **ZooKeeper/KRaft** = The library catalog system. Keeps track of which librarian is responsible for what.\r
\r
### What is a Kafka Broker?\r
\r
A broker is just a single Kafka server. Think of it as one worker in the Kafka factory. Each broker is responsible for storing some portion of the data and handling read/write requests. When you start Kafka, you typically run multiple brokers together (a cluster) so if one dies, the others keep going.\r
\r
### What is a Kafka Cluster?\r
\r
One broker alone is a single point of failure — if it dies, your whole system is down. So we run multiple brokers together as a cluster. This gives you:\r
- **More capacity**: Spread the data and workload across machines\r
- **Safety**: Data is copied to multiple brokers, so losing one doesn't mean losing data\r
- **No downtime**: If one broker dies, another takes over its work automatically\r
\r
Here's how you can spin up a local Kafka cluster with Docker to play around:\r
\r
\`\`\`bash\r
# docker-compose.yml\r
version: '3.8'\r
services:\r
  zookeeper:\r
    image: confluentinc/cp-zookeeper:latest\r
    environment:\r
      ZOOKEEPER_CLIENT_PORT: 2181\r
  kafka:\r
    image: confluentinc/cp-kafka:latest\r
    depends_on:\r
      - zookeeper\r
    ports:\r
      - "9092:9092"\r
    environment:\r
      KAFKA_BROKER_ID: 1\r
      KAFKA_ZOOKEEPER_CONNECT: zookeeper:2181\r
      KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://localhost:9092\r
      KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 1\r
\r
# Start the cluster\r
docker-compose up -d\r
\`\`\`\r
\r
### What is a Kafka Topic?\r
\r
A topic is just a name you give to a stream of messages — like a channel or a category. For example, you might have an "orders" topic for order events, a "payments" topic for payment events, and a "shipments" topic for shipping updates.\r
\r
Here's what makes topics special:\r
- Once a message is written, it can't be changed (immutable) — like writing in pen, not pencil\r
- Messages inside a partition are strictly ordered — first in, first out\r
- Messages don't disappear after being read — they stick around for a configurable amount of time (hours, days, or even forever)\r
\r
Here's how you create a topic:\r
\r
\`\`\`bash\r
kafka-topics.sh --create \\\r
  --bootstrap-server localhost:9092 \\\r
  --topic orders \\\r
  --partitions 3 \\\r
  --replication-factor 1\r
\`\`\`\r
\r
### What is a Kafka Partition?\r
\r
A single topic is split into partitions — think of them as lanes on a highway. If you have 3 partitions for your "orders" topic, you can have 3 consumers reading at the same time, each from a different partition. This is how Kafka scales.\r
\r
Each partition is an ordered list of messages. The order is guaranteed within a partition, but not across partitions. So if you need all messages for a specific customer to be in order, you'd use that customer's ID as a partition key (more on that later).\r
\r
Here's how you can see the partitions in a topic:\r
\r
\`\`\`bash\r
kafka-topics.sh --describe \\\r
  --bootstrap-server localhost:9092 \\\r
  --topic orders\r
\`\`\`\r
\r
### What is a Kafka Offset?\r
\r
An offset is just a number — a sequential ID given to each message in a partition. The first message is offset 0, the next is 1, then 2, 3, and so on. It's like page numbers in a book.\r
\r
Why does this matter? Because consumers use offsets to remember where they left off. If a consumer reads up to offset 50 and then crashes, when it comes back, it knows to start from offset 51. No need to re-read everything from the beginning.\r
\r
### What is a Kafka Producer?\r
\r
A producer is any application that sends messages to Kafka. It's the "writer" in the system. Your order service, your payment service, your mobile app — anything that needs to tell other systems "hey, something happened" — that's a producer.\r
\r
Here's the simplest way to send a message in Java:\r
\r
\`\`\`java\r
import org.apache.kafka.clients.producer.KafkaProducer;\r
import org.apache.kafka.clients.producer.ProducerRecord;\r
import org.apache.kafka.clients.producer.ProducerConfig;\r
import java.util.Properties;\r
\r
public class SimpleProducer {\r
    public static void main(String[] args) {\r
        Properties props = new Properties();\r
        props.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:9092");\r
        props.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG,\r
            "org.apache.kafka.common.serialization.StringSerializer");\r
        props.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG,\r
            "org.apache.kafka.common.serialization.StringSerializer");\r
\r
        try (KafkaProducer<String, String> producer = new KafkaProducer<>(props)) {\r
            ProducerRecord<String, String> record =\r
                new ProducerRecord<>("orders", "order-123", "{\\"product\\":\\"laptop\\",\\"qty\\":1}");\r
            producer.send(record);\r
            System.out.println("Message sent successfully");\r
        }\r
    }\r
}\r
\`\`\`\r
\r
### What is a Kafka Consumer?\r
\r
A consumer is any application that reads messages from Kafka. It's the "reader." Your email service, your analytics dashboard, your warehouse system — anything that needs to react to events — that's a consumer.\r
\r
Here's the simplest way to read messages in Java:\r
\r
\`\`\`java\r
import org.apache.kafka.clients.consumer.KafkaConsumer;\r
import org.apache.kafka.clients.consumer.ConsumerRecords;\r
import org.apache.kafka.clients.consumer.ConsumerRecord;\r
import org.apache.kafka.clients.consumer.ConsumerConfig;\r
import java.time.Duration;\r
import java.util.Properties;\r
import java.util.List;\r
\r
public class SimpleConsumer {\r
    public static void main(String[] args) {\r
        Properties props = new Properties();\r
        props.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:9092");\r
        props.put(ConsumerConfig.GROUP_ID_CONFIG, "order-consumer-group");\r
        props.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG,\r
            "org.apache.kafka.common.serialization.StringDeserializer");\r
        props.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG,\r
            "org.apache.kafka.common.serialization.StringDeserializer");\r
        props.put(ConsumerConfig.AUTO_OFFSET_RESET_CONFIG, "earliest");\r
\r
        try (KafkaConsumer<String, String> consumer = new KafkaConsumer<>(props)) {\r
            consumer.subscribe(List.of("orders"));\r
\r
            while (true) {\r
                ConsumerRecords<String, String> records = consumer.poll(Duration.ofMillis(100));\r
                for (ConsumerRecord<String, String> record : records) {\r
                    System.out.printf("Offset: %d, Key: %s, Value: %s%n",\r
                        record.offset(), record.key(), record.value());\r
                }\r
            }\r
        }\r
    }\r
}\r
\`\`\`\r
\r
### What is a Consumer Group?\r
\r
A consumer group is just a bunch of consumers working together to read from the same topic. Think of it like a team of people unloading a truck — each person takes a different box so the work gets done faster.\r
\r
Here's the key rule: Kafka assigns each partition to exactly one consumer in the group. So if you have 3 partitions and 3 consumers, each consumer reads from one partition. If you have 5 consumers but only 3 partitions, 2 consumers sit idle.\r
\r
This design gives you automatic load balancing. If one consumer dies, Kafka reassigns its partitions to the others. No manual work needed.\r
\r
Here's how you put two consumers in the same group — just give them the same group ID:\r
\r
\`\`\`java\r
// Consumer 1 - same group ID\r
props.put(ConsumerConfig.GROUP_ID_CONFIG, "order-group");\r
// Consumer 2 - same group ID\r
props.put(ConsumerConfig.GROUP_ID_CONFIG, "order-group");\r
\`\`\`\r
\r
### Why does Kafka use partitions?\r
\r
Partitions are the secret sauce behind Kafka's speed and scalability. Without partitions, a topic would be one giant queue that only one consumer could read at a time — like having one checkout lane in a supermarket.\r
\r
With partitions, you get:\r
- **Parallel reading**: Multiple consumers read from different partitions simultaneously\r
- **Spread across machines**: Different partitions live on different brokers, so you're not limited by one server's disk or network\r
- **Ordered where it matters**: Messages within a single partition are ordered, so if you need ordering for a specific entity (like a customer), you route all their messages to the same partition\r
\r
### How does Kafka achieve high throughput?\r
\r
Kafka is fast because of several smart design choices working together:\r
\r
- **Batching**: Instead of sending one message at a time (expensive network call after network call), the producer groups messages together and sends them in bulk — like sending one big package instead of many small envelopes\r
- **Compression**: Messages get squeezed down before sending (using snappy, gzip, lz4, or zstd), so less data travels over the network\r
- **Zero-copy**: Kafka uses a special OS feature that lets data go directly from disk to network without being copied around in memory — less work, more speed\r
- **Sequential writes**: Messages are just appended to the end of a file — no random seeking, which is how disks like to work\r
- **Multiple partitions**: Many consumers reading at once means the work gets divided\r
\r
### How does Kafka provide fault tolerance?\r
\r
Kafka doesn't lose data when machines die. Here's how it stays resilient:\r
\r
- **Replication**: Every partition has copies (replicas) stored on different brokers. If you have a replication factor of 3, your data exists on 3 separate machines\r
- **Leader election**: Each partition has one "leader" that handles reads/writes, and the others are "followers" that copy the data. If the leader dies, a follower automatically becomes the new leader — you don't even notice\r
- **ISR (In-Sync Replicas)**: Only replicas that are up-to-date with the leader are eligible to become the new leader. This prevents data loss from promoting a behind replica\r
- **Disk persistence**: Messages are written to disk, not just held in memory. So even if the whole cluster restarts, your data is still there\r
- **Offset tracking**: Consumer progress is saved in a special internal topic (\`__consumer_offsets\`), so consumers know exactly where to resume\r
\r
### Kafka vs RabbitMQ — what is the difference?\r
\r
| Feature            | Kafka                              | RabbitMQ                            |\r
| ------------------ | ---------------------------------- | ----------------------------------- |\r
| **Pattern**        | Distributed log/streaming platform | Traditional message queue           |\r
| **Ordering**       | Guaranteed within partition        | Not guaranteed across messages      |\r
| **Storage**        | Persistent, retains messages       | Typically deleted after consumption |\r
| **Throughput**     | Very high (millions/sec)           | Lower (tens thousands/sec)          |\r
| **Latency**        | Higher (optimized for throughput)  | Lower (optimized for low latency)   |\r
| **Replay**         | Supports replay of messages        | Not designed for replay             |\r
| **Consumer model** | Pull-based                         | Push-based                          |\r
| **Use cases**      | Event streaming, data pipelines    | Task distribution, RPC              |\r
\r
---\r
\r
## Topics, Partitions & Ordering\r
\r
### What is the difference between a Topic, Partition and Replica?\r
\r
Think of it like a filing system:\r
- **Topic** = The cabinet itself. It's the name of your data stream, like "orders" or "payments."\r
- **Partition** = A drawer in that cabinet. Each topic has multiple partitions so many people can access data at the same time.\r
- **Replica** = A backup copy of each drawer stored in a different cabinet (broker), so if one cabinet catches fire, your data is safe.\r
\r
### How does Kafka distribute messages among partitions?\r
\r
When a producer sends a message, Kafka needs to decide which partition to put it in. Here's how it decides:\r
\r
1. **If you provide a key** (like a customer ID): Kafka runs that key through a hash function and uses the result to pick a partition. Same key always goes to same partition — this is how you get ordering.\r
2. **If you don't provide a key**: Kafka just rotates through the partitions one by one (round-robin), spreading the load evenly.\r
3. **If you have special needs**: You can write your own partitioner with custom logic.\r
\r
Here's what the internal logic looks like (simplified):\r
\r
\`\`\`java\r
public int partition(String key, int numPartitions) {\r
    if (key == null) {\r
        // No key? Just rotate through partitions\r
        return counter++ % numPartitions;\r
    }\r
    // Has key? Hash it to pick a partition\r
    return Math.abs(key.hashCode()) % numPartitions;\r
}\r
\`\`\`\r
\r
### What is a partition key?\r
\r
A partition key is just a value you attach to your message that determines where it lands. Think of it like a zip code on a letter — all letters with the same zip code go to the same destination.\r
\r
The magic: all messages with the same key always go to the same partition. This means they're stored in order and read in order. So if you use "customer-123" as the key for all of that customer's orders, you'll always read them back in the order they were placed.\r
\r
### What happens when you send a message with a key?\r
\r
All messages with that key go to the same partition, preserving order. Here's an example:\r
\r
\`\`\`java\r
// All messages with key "customer-123" go to same partition\r
ProducerRecord<String, String> record =\r
    new ProducerRecord<>("orders", "customer-123", "{\\"product\\":\\"laptop\\"}");\r
\`\`\`\r
\r
This is how you guarantee that all events for a specific customer are processed in the order they happened.\r
\r
### What happens when you send a message without a key?\r
\r
Without a key, Kafka spreads messages across partitions using round-robin. You get even load balancing, but no ordering guarantee — message A might end up in partition 0 and message B in partition 1, and there's no guarantee which gets read first.\r
\r
This is fine for independent events where order doesn't matter (like sensor readings from different devices).\r
\r
### How do you ensure messages for the same customer go to the same partition?\r
\r
Just use the customer ID as the partition key:\r
\r
\`\`\`java\r
String customerId = record.getCustomerId();\r
ProducerRecord<String, String> record =\r
    new ProducerRecord<>("orders", customerId, jsonValue);\r
\`\`\`\r
\r
Now all orders for customer-123 go to partition 2 (or whichever partition the hash lands on), and they'll always be read in order.\r
\r
### Does Kafka guarantee message ordering?\r
\r
**Yes, but only within a single partition.** Messages in the same partition are consumed in the exact order they were written — first in, first out. But there's no ordering guarantee across different partitions.\r
\r
Think of it like multiple checkout lanes at a grocery store. Each lane has its own queue, and people in each lane are served in order. But there's no guarantee that the person in lane 1 gets served before the person in lane 2.\r
\r
### Does Kafka guarantee ordering across partitions?\r
\r
**No.** Once messages are in different partitions, there's no global ordering. If you need ordering for a group of related messages, make sure they all go to the same partition by using the same key.\r
\r
### How can you maintain ordering for a particular customer?\r
\r
Use the customer ID as the partition key — it's that simple:\r
\r
\`\`\`java\r
// All customer-123 orders go to same partition, preserving order\r
ProducerRecord<String, String> record =\r
    new ProducerRecord<>("orders", "customer-123", orderJson);\r
\`\`\`\r
\r
### What happens when you increase the number of partitions?\r
\r
This is a tricky operation. Here's what happens:\r
- Existing data stays where it is — it doesn't move\r
- New messages are distributed across all partitions (including the new ones)\r
- Consumers rebalance to pick up the new partitions\r
- **Important**: The hash function changes because the partition count changed. So a key that used to go to partition 2 might now go to partition 4. This can break ordering for existing keys.\r
\r
### Can you decrease the number of partitions?\r
\r
**No, Kafka doesn't support this.** Once you create a topic with N partitions, you can only increase that number, never decrease it. Why? Because existing messages are already scattered across those partitions, and Kafka has no way to merge them back together.\r
\r
The only workaround is to create a new topic with fewer partitions and copy the data over. This is why it's important to think carefully about partition count upfront.\r
\r
### What is a hot partition?\r
\r
Imagine 90% of your orders come from one giant customer (like Amazon). If you use customer ID as the partition key, all of Amazon's orders go to the same partition. That partition becomes a "hot partition" — it's getting hammered with traffic while the others sit idle.\r
\r
This causes real problems:\r
- The overloaded partition falls behind (consumer lag)\r
- One consumer is working overtime while others are bored\r
- Your whole pipeline slows down because of one bottleneck\r
\r
### What is partition skew?\r
\r
Partition skew is just a fancy term for "uneven distribution." Some partitions have way more data or traffic than others. It comes in three flavors:\r
- **Data skew**: One partition has 10x more messages than the others\r
- **Size skew**: Messages in one partition are much larger\r
- **Throughput skew**: One partition gets way more reads/writes (this is the hot partition problem)\r
\r
### How would you solve uneven partition distribution?\r
\r
Here are the practical fixes, from simplest to most complex:\r
\r
1. **Pick better keys**: If your current key creates hot spots, switch to something more evenly distributed. Instead of \`country\` (where most users might be from one country), use \`userId\` or \`orderId\`.\r
\r
2. **Add salting**: Take your key and add a random suffix to spread the load. For example, instead of just \`customer-123\`, use \`customer-123-0\`, \`customer-123-1\`, \`customer-123-2\` across three partitions. The tradeoff: you lose strict ordering for that customer.\r
\r
3. **Use a custom partitioner**: Write your own logic that's smarter about distributing messages. Here's an example that uses salting to avoid hot partitions:\r
\r
\`\`\`java\r
public class BalancedPartitioner implements Partitioner {\r
    @Override\r
    public int partition(String topic, Object key, byte[] keyBytes,\r
                         Object value, byte[] valueBytes, Cluster cluster) {\r
        List<PartitionInfo> partitions = cluster.partitionsForTopic(topic);\r
        int numPartitions = partitions.size();\r
\r
        if (key == null) {\r
            return stickyPartition;\r
        }\r
\r
        // Add a salt to spread hot keys across partitions\r
        String salt = getSaltForKey(key.toString());\r
        return Math.abs((key.toString() + salt).hashCode()) % numPartitions;\r
    }\r
}\r
\`\`\`\r
\r
4. **Increase partition count**: More partitions mean finer-grained distribution, which naturally reduces skew.\r
\r
---\r
\r
## Producer\r
\r
### How does a Kafka Producer work internally?\r
\r
When you call \`producer.send()\`, a lot happens behind the scenes before your message actually lands in Kafka. Here's the journey:\r
\r
\`\`\`\r
Producer → ProducerRecord → Serializer → Partitioner → Buffer → Sender → Kafka Broker\r
\`\`\`\r
\r
Let's walk through it step by step:\r
\r
1. You create a \`ProducerRecord\` with the topic, key, and value\r
2. **Serializer**: Your key and value (which might be strings or objects) get converted to raw bytes — because Kafka only deals in bytes\r
3. **Partitioner**: Kafka decides which partition this message goes to (based on your key, or round-robin if no key)\r
4. **Buffer**: The message doesn't go straight to the network — it sits in a memory buffer, waiting to be grouped with other messages into a batch\r
5. **Sender thread**: A separate thread picks up batches from the buffer and sends them to the right broker\r
6. **Acknowledgment**: The broker writes the message and sends back a confirmation (or an error)\r
\r
The key insight: sending is **asynchronous**. Your \`send()\` call just puts the message in the buffer and returns immediately. The actual network call happens in the background. This is a big part of why Kafka is so fast.\r
\r
### What happens when a producer sends a message?\r
\r
\`\`\`java\r
// The send() is asynchronous and returns a Future\r
Future<RecordMetadata> future = producer.send(record);\r
\r
// Or use callback for async handling\r
producer.send(record, (metadata, exception) -> {\r
    if (exception == null) {\r
        System.out.println("Offset: " + metadata.offset());\r
    } else {\r
        exception.printStackTrace();\r
    }\r
});\r
\`\`\`\r
\r
You have two choices: either call \`.get()\` on the Future to block until you get a confirmation, or provide a callback that runs when the confirmation arrives. In production, you'd typically use the callback so your application doesn't stall waiting for Kafka.\r
\r
### What is acks in Kafka?\r
\r
\`acks\` is one of the most important producer settings. It controls **how sure you want to be** that your message was actually saved before moving on. There are three levels:\r
\r
- **acks=0**: "Fire and forget." The producer doesn't wait for any confirmation. Fastest option, but if the broker crashes before writing your message, it's gone forever.\r
- **acks=1**: "Leader confirmed." The producer waits for the leader broker to say "got it." Better, but if the leader crashes before the followers copy the data, you can still lose messages.\r
- **acks=all**: "Everyone confirmed." The producer waits until all in-sync replicas have written the message. Slowest but safest — your data is safe as long as at least one replica survives.\r
\r
### Explain acks=0, acks=1, and acks=all\r
\r
| acks Value   | What it means                        | Risk                                         | Use Case                       |\r
| ------------ | ------------------------------------ | -------------------------------------------- | ------------------------------ |\r
| **acks=0**   | Fire and forget, no acknowledgment   | Data loss if broker fails                    | Metrics, logging, non-critical |\r
| **acks=1**   | Leader acknowledges                  | Data loss if leader fails before replication | General purpose                |\r
| **acks=all** | All ISR replicas acknowledge         | Highest durability, lower throughput         | Financial, critical data       |\r
\r
\`\`\`java\r
// Configuration examples\r
Properties props = new Properties();\r
\r
// acks=0 - highest throughput, no durability\r
props.put(ProducerConfig.ACKS_CONFIG, "0");\r
\r
// acks=1 - moderate durability (default for Kafka < 3.0)\r
props.put(ProducerConfig.ACKS_CONFIG, "1");\r
\r
// acks=all - strongest durability (default for Kafka >= 3.0)\r
props.put(ProducerConfig.ACKS_CONFIG, "all");\r
\`\`\`\r
\r
### Which acks configuration provides the strongest durability?\r
\r
**acks=all** (or \`acks=-1\`) is the strongest. Here's why it matters:\r
\r
- The message isn't considered "sent" until all in-sync replicas have written it to their disks\r
- If the leader suddenly dies, any of the followers has a complete copy — no data loss\r
- Combined with \`min.insync.replicas=2\`, you can survive the loss of one broker without losing any messages\r
\r
The tradeoff: it's slower because you're waiting for multiple brokers to respond instead of just one. For financial transactions or order processing, this tradeoff is worth it. For logging sensor data from thousands of IoT devices, acks=0 might be fine.\r
\r
### What is batch.size?\r
\r
\`batch.size\` is the maximum size (in bytes) of a batch before it gets sent to the broker. Think of it like a bus — the bus leaves when it's full (reaches batch.size) or when the timer goes off (linger.ms), whichever comes first.\r
\r
\`\`\`java\r
// Default: 16KB, increase for better throughput\r
props.put(ProducerConfig.BATCH_SIZE_CONFIG, 32768); // 32KB\r
\`\`\`\r
\r
A larger batch means fewer network requests and better compression, but it also means messages sit around waiting longer before being sent.\r
\r
### What is linger.ms?\r
\r
\`linger.ms\` is how long the producer waits for more messages to accumulate before sending the batch. It's the "patience" setting.\r
\r
\`\`\`java\r
// Default: 0 (send immediately)\r
props.put(ProducerConfig.LINGER_MS_CONFIG, 100); // Wait up to 100ms\r
\`\`\`\r
\r
Setting \`linger.ms=0\` means "send as soon as there's something to send" — lowest latency but worst throughput. Setting \`linger.ms=100\` means "wait up to 100ms to fill the batch" — better throughput but each message might wait up to 100ms before being sent.\r
\r
### What is producer batching?\r
\r
Instead of sending each message individually (expensive — each send is a network call), the producer groups messages into batches and sends them all at once. It's like sending one big package instead of many small envelopes.\r
\r
This improves:\r
- **Throughput**: One network call carries many messages\r
- **Efficiency**: Less overhead per message (headers, handshakes, etc.)\r
- **Latency trade-off**: Messages wait longer to be sent (because we're waiting for the batch to fill)\r
\r
\`\`\`java\r
// Batching configuration for high throughput\r
props.put(ProducerConfig.BATCH_SIZE_CONFIG, 65536); // 64KB batch\r
props.put(ProducerConfig.LINGER_MS_CONFIG, 50);    // Wait 50ms\r
props.put(ProducerConfig.COMPRESSION_TYPE_CONFIG, "snappy"); // Compress\r
\`\`\`\r
\r
### What is compression in Kafka?\r
\r
Compression squeezes your messages smaller before sending them over the network and storing them on disk. It's like zipping a file before emailing it.\r
\r
\`\`\`java\r
// Supported compression types\r
props.put(ProducerConfig.COMPRESSION_TYPE_CONFIG, "snappy");\r
// Others: "gzip", "lz4", "zstd" (most efficient)\r
\r
// With compression, batching and throughput increase\r
\`\`\`\r
\r
The options:\r
- **snappy**: Good balance of speed and compression ratio (Google's algorithm)\r
- **gzip**: Better compression but slower — good for when storage/bandwidth matters more than CPU\r
- **lz4**: Fastest compression, decent ratio\r
- **zstd**: Best compression ratio, reasonable speed (Facebook's algorithm)\r
\r
Compression works especially well with batching — you compress the whole batch as one unit, getting much better ratios than compressing individual messages.\r
\r
### What is buffer.memory?\r
\r
This is the total memory the producer can use for buffering messages waiting to be sent. Think of it as the size of the waiting room.\r
\r
\`\`\`java\r
// Default: 32MB\r
props.put(ProducerConfig.BUFFER_MEMORY_CONFIG, 67108864); // 64MB\r
\`\`\`\r
\r
### What happens when the producer buffer becomes full?\r
\r
If your producer is sending messages faster than the network can handle them, the buffer fills up. Then what?\r
\r
- \`send()\` blocks (waits for space to free up) — as long as it doesn't exceed \`max.block.ms\`\r
- If \`max.block.ms\` is exceeded, it throws a \`TimeoutException\`\r
- Your application needs to decide: retry? log the error? drop the message?\r
\r
\`\`\`java\r
try {\r
    producer.send(record).get(30, TimeUnit.SECONDS);\r
} catch (TimeoutException e) {\r
    System.err.println("Buffer full, message timed out");\r
    // Implement retry or fallback\r
}\r
\`\`\`\r
\r
### What is producer retry?\r
\r
Networks are flaky. Brokers restart. Things fail temporarily. Kafka's producer has a built-in retry mechanism for these transient errors.\r
\r
\`\`\`java\r
props.put(ProducerConfig.RETRIES_CONFIG, 3);              // Max retries\r
props.put(ProducerConfig.RETRY_BACKOFF_MS_CONFIG, 1000);  // Wait between retries\r
props.put(ProducerConfig.MAX_IN_FLIGHT_REQUESTS_PER_CONNECTION, 5);\r
// For ordering with retries, set to 1 or use idempotent producer\r
\`\`\`\r
\r
**Warning**: Retries can mess up message ordering. If message A fails and is retried, but message B succeeds immediately, B arrives before A. To prevent this, either set \`max.in.flight.requests.per.connection=1\` (only one request at a time) or use an idempotent producer.\r
\r
### What is an idempotent producer?\r
\r
An idempotent producer guarantees that even if messages are retried, they won't be written twice to the partition. It's "exactly-once" delivery within a single partition.\r
\r
How it works:\r
- Each message gets a unique sequence number\r
- The broker tracks the last sequence number it accepted from each producer\r
- If a retry arrives with a sequence number the broker has already seen, it's silently discarded — no duplicate\r
\r
\`\`\`java\r
props.put(ProducerConfig.ENABLE_IDEMPOTENCE_CONFIG, true);\r
// Enables exactly-once within a partition\r
// Automatically sets:\r
// - max.in.flight.requests.per.connection <= 5\r
// - retries > 0\r
// - acks = all\r
\`\`\`\r
\r
When you enable idempotence, Kafka automatically configures the other settings needed to make it work. You don't need to worry about ordering or retry settings — Kafka handles it for you.\r
\r
---\r
\r
## Consumer & Consumer Groups\r
\r
### How does a Kafka Consumer work?\r
\r
A consumer is an application that reads messages from Kafka. Here's what happens when it runs:\r
\r
\`\`\`\r
Consumer → poll() → Fetch messages → Deserialize → Process → Commit offsets\r
\`\`\`\r
\r
Let's walk through it:\r
\r
1. The consumer subscribes to one or more topics (or gets specific partitions assigned)\r
2. It calls \`poll()\` — this is the heartbeat of the consumer. It asks Kafka "do you have any new messages for me?"\r
3. Kafka sends back any new messages from the assigned partitions\r
4. The messages (which are raw bytes) get deserialized back into objects/strings\r
5. Your application does something with the messages (save to database, send email, etc.)\r
6. The consumer commits its offset — telling Kafka "I've processed up to here, don't give me these again"\r
\r
The \`poll()\` loop is critical — the consumer must keep calling \`poll()\` regularly or Kafka thinks it's dead and triggers a rebalance.\r
\r
### What is a Consumer Group?\r
\r
A consumer group is just a bunch of consumers working together to read from the same topic. Kafka's rule: each partition is assigned to exactly one consumer in the group. This means:\r
- If you have 3 partitions and 3 consumers, each consumer reads from one partition\r
- If you have 5 consumers but only 3 partitions, 2 consumers sit idle\r
- If one consumer dies, its partitions get reassigned to the survivors\r
\r
### Why do we need Consumer Groups?\r
\r
Without consumer groups, every consumer would read every message (like a broadcast). With consumer groups:\r
- **Parallel processing**: Multiple consumers share the work — each reads different partitions\r
- **Load balancing**: Kafka automatically distributes partitions across consumers\r
- **Fault tolerance**: If a consumer crashes, Kafka reassigns its partitions to the others\r
- **Scalability**: Need more throughput? Just add more consumers (up to the number of partitions)\r
\r
### Can two consumers in the same group consume the same partition?\r
\r
**No.** Within a single consumer group, each partition is assigned to exactly one consumer. This prevents duplicate processing — you don't want two consumers both handling the same order.\r
\r
### Can two consumers from different groups consume the same partition?\r
\r
**Yes!** Different consumer groups are completely independent. Each group maintains its own offset. So if you have a "email-service" group and an "analytics-service" group, both can read the same messages from the same partition. This is how you broadcast events to multiple systems.\r
\r
### What happens with 3 partitions and 5 consumers?\r
\r
- 3 consumers each get one partition\r
- 2 consumers sit idle with nothing to do\r
- **Lesson**: Don't have more consumers than partitions — you're wasting resources\r
\r
### What happens with 5 partitions and 3 consumers?\r
\r
Kafka distributes them as evenly as possible:\r
- Consumer A gets 2 partitions\r
- Consumer B gets 2 partitions\r
- Consumer C gets 1 partition\r
- Total: 2 + 2 + 1 = 5 partitions covered\r
\r
### What is consumer rebalancing?\r
\r
Imagine you have 3 consumers reading from 5 partitions. Suddenly one consumer crashes or a new one joins. Kafka needs to redistribute the partitions so everything is covered again. This redistribution is called **rebalancing**.\r
\r
During a rebalance:\r
- All consumers stop processing\r
- Kafka reassigns partitions to the remaining consumers\r
- Consumers resume with their new assignments\r
\r
This is necessary but disruptive — during the rebalance, no messages are being processed. Frequent rebalancing can hurt your throughput.\r
\r
You can hook into this process with a \`ConsumerRebalanceListener\`:\r
\r
\`\`\`java\r
consumer.subscribe(List.of("orders"), new ConsumerRebalanceListener() {\r
    @Override\r
    public void onPartitionsRevoked(Collection<TopicPartition> partitions) {\r
        // Called before rebalance — save your state here\r
        for (TopicPartition partition : partitions) {\r
            long offset = consumer.position(partition);\r
            saveOffsetToExternalStore(partition, offset);\r
        }\r
    }\r
\r
    @Override\r
    public void onPartitionsAssigned(Collection<TopicPartition> partitions) {\r
        // Called after rebalance — restore your state here\r
        for (TopicPartition partition : partitions) {\r
            long offset = loadOffsetFromExternalStore(partition);\r
            consumer.seek(partition, offset);\r
        }\r
    }\r
});\r
\`\`\`\r
\r
This is useful when you need to maintain state across rebalances — like saving your processing position to a database before giving up a partition, then loading it back when you get a new one.\r
\r
### When does Kafka trigger a rebalance?\r
\r
A rebalance happens whenever the group membership or assignment changes:\r
- A new consumer joins the group\r
- A consumer shuts down gracefully\r
- A consumer crashes (misses too many heartbeats)\r
- The number of partitions in a subscribed topic changes\r
- A consumer subscribes to different topics\r
\r
### What is consumer lag?\r
\r
Consumer lag is how far behind your consumer is. It's the difference between:\r
- The newest message in the partition (what the producer just wrote)\r
- The last message your consumer has processed\r
\r
Think of it like reading a book: if the author has written to page 150 but you're only on page 100, your "lag" is 50 pages.\r
\r
Here's how you check it:\r
\r
\`\`\`bash\r
kafka-consumer-groups.sh --bootstrap-server localhost:9092 \\\r
  --group order-group \\\r
  --describe\r
\r
# Output: TOPIC  PARTITION  CURRENT-OFFSET  LOG-END-OFFSET  LAG\r
# orders  0          100            150             50\r
\`\`\`\r
\r
In this example, the consumer is at offset 100 but the latest message is at 150 — so the lag is 50.\r
\r
### What causes consumer lag?\r
\r
Consumer lag happens when producers are writing faster than consumers can read. Common reasons:\r
- **Slow processing**: Each message takes too long to handle (complex logic, slow database calls)\r
- **Not enough consumers**: You have 2 consumers trying to handle the work of 5\r
- **Consumer is stuck**: Deadlock, long GC pause, waiting on something\r
- **Network issues**: Slow connection to Kafka or to downstream systems\r
\r
### How do you reduce consumer lag?\r
\r
The goal is to process messages faster than they arrive:\r
\r
1. **Add more consumers**: The most direct fix — more hands on deck (up to the number of partitions)\r
2. **Increase partitions**: More partitions means more consumers can work in parallel\r
3. **Speed up processing**: Optimize your code — batch database writes, reduce external calls, cache aggressively\r
4. **Process asynchronously**: Don't wait for each message to finish before starting the next\r
5. **Tune poll settings**: Get more messages per poll cycle\r
\r
\`\`\`java\r
// Optimize consumer for higher throughput\r
props.put(ConsumerConfig.MAX_POLL_RECORDS_CONFIG, 1000); // Get 1000 per poll\r
props.put(ConsumerConfig.MAX_POLL_INTERVAL_MS_CONFIG, 300000); // 5 minutes\r
\`\`\`\r
\r
### What is poll()?\r
\r
\`poll()\` is the method your consumer calls to ask Kafka for new messages. It's the heartbeat of your consumer — you must call it regularly or Kafka thinks you're dead.\r
\r
\`\`\`java\r
ConsumerRecords<String, String> records = consumer.poll(Duration.ofMillis(100));\r
// Returns up to max.poll.records messages\r
// Blocks for up to the specified duration (waiting for messages to arrive)\r
\`\`\`\r
\r
Think of it like checking your mailbox — you go to the box, wait a bit to see if anything arrives, then take whatever's there back to process.\r
\r
### What is max.poll.records?\r
\r
This controls how many messages you get in a single \`poll()\` call:\r
\r
\`\`\`java\r
props.put(ConsumerConfig.MAX_POLL_RECORDS_CONFIG, 500);\r
// Default: 500\r
\`\`\`\r
\r
More records per poll means fewer network calls and better throughput, but it also means more memory usage and potentially longer processing time before the next poll.\r
\r
### What is max.poll.interval.ms?\r
\r
This is the maximum time you can go between \`poll()\` calls before Kafka considers you dead:\r
\r
\`\`\`java\r
props.put(ConsumerConfig.MAX_POLL_INTERVAL_MS_CONFIG, 300000); // 5 minutes\r
// Default: 300000 (5 min)\r
// If processing takes longer, increase this value\r
\`\`\`\r
\r
If you grab a batch of messages and your processing takes longer than this, Kafka thinks you've died and triggers a rebalance — even though you're still working. If your processing is slow, increase this setting to avoid unnecessary rebalances.\r
\r
---\r
\r
## Offset & Delivery Semantics\r
\r
### What is a Kafka Offset?\r
\r
An offset is just a number — a sequential ID for each message in a partition. The first message is offset 0, the next is 1, then 2, 3, and so on. It's like page numbers in a book.\r
\r
Offsets are how consumers track their progress. If a consumer has committed offset 100, it means "I've processed everything up to and including message 100." If the consumer crashes and restarts, it picks up from offset 101.\r
\r
### Where are consumer offsets stored?\r
\r
Consumer offsets are stored in a special internal Kafka topic called \`__consumer_offsets\`. This is just a regular Kafka topic that Kafka uses behind the scenes to remember where each consumer group is.\r
\r
### What is \\_\\_consumer_offsets?\r
\r
\`__consumer_offsets\` is Kafka's internal topic for storing consumer group progress. It:\r
\r
- Stores the last committed offset for each partition/group combination\r
- Is compacted — Kafka only keeps the latest offset for each key (old values are discarded)\r
- Has 50 partitions by default (to handle many consumer groups)\r
- Is critical for rebalancing — when a new consumer takes over a partition, it reads the last committed offset from here and knows where to start\r
\r
### What is offset commit?\r
\r
Offset commit is how a consumer tells Kafka "I've processed up to this point." It's like bookmarking a page in a book — you're saying "I've read everything up to here, don't make me re-read it."\r
\r
When you commit offset 100, you're saying "messages 0-100 are done, I'll start from 101 next time."\r
\r
### What is auto commit?\r
\r
Auto commit is the "set it and forget it" approach. Kafka automatically commits offsets for you at regular intervals:\r
\r
\`\`\`java\r
props.put(ConsumerConfig.ENABLE_AUTO_COMMIT_CONFIG, true); // Default\r
props.put(ConsumerConfig.AUTO_COMMIT_INTERVAL_MS_CONFIG, 5000); // Every 5 seconds\r
\`\`\`\r
\r
**The risk**: If your consumer crashes 3 seconds after the last auto-commit, those 3 seconds of messages were processed but never committed. When the consumer restarts, it re-reads them from the last committed offset — you get duplicates.\r
\r
Auto commit is simple but gives you less control over when offsets are committed.\r
\r
### What is manual offset commit?\r
\r
Manual commit puts you in control. You decide exactly when to commit — typically right after successfully processing a batch of messages:\r
\r
\`\`\`java\r
// Synchronous commit (blocks until complete)\r
consumer.commitSync();\r
\r
// Asynchronous commit (faster, with callback)\r
consumer.commitAsync((offsets, exception) -> {\r
    if (exception != null) {\r
        System.err.println("Commit failed: " + exception.getMessage());\r
    }\r
});\r
\r
// Commit specific offsets\r
Map<TopicPartition, OffsetAndMetadata> offsets = new HashMap<>();\r
offsets.put(new TopicPartition("orders", 0), new OffsetAndMetadata(100L));\r
consumer.commitSync(offsets);\r
\`\`\`\r
\r
Manual commit is the recommended approach for most applications because it gives you exactly-once or at-least-once semantics (depending on when you commit).\r
\r
### What happens if a consumer crashes before committing the offset?\r
\r
Let's say your consumer processed messages up to offset 150 but only committed up to offset 100. If it crashes:\r
\r
- Kafka detects the consumer is dead (missed heartbeats)\r
- The consumer is removed from the group\r
- Its partitions are reassigned to other consumers\r
- The new consumer starts from offset 101 (the last committed offset)\r
- **Result**: Messages 101-150 get processed again — duplicates\r
\r
This is why committing after processing (not before) is important — you'd rather have duplicates than lose messages.\r
\r
### What happens if a consumer commits before processing the message?\r
\r
Let's say your consumer commits offset 150 but then crashes before actually processing messages 101-150:\r
\r
- The committed offset is 150\r
- When the consumer restarts, it starts from offset 151\r
- **Result**: Messages 101-150 are lost — they were never processed\r
\r
This is the opposite problem: you told Kafka you processed something you didn't. The solution is simple: **always commit after processing, never before**.\r
\r
### What is at-most-once delivery?\r
\r
At-most-once means: "I'll try to process this message, but if something goes wrong, I'm okay with losing it."\r
\r
\`\`\`java\r
// Commit first, then process\r
consumer.poll();\r
consumer.commitSync(); // Commit immediately\r
processMessages();     // If crash here, messages are lost\r
\`\`\`\r
\r
**The tradeoff**: No duplicates, but messages can be lost. This is acceptable for things like metrics or logging — losing a few data points doesn't matter. But for order processing or payments, losing messages is unacceptable.\r
\r
### What is at-least-once delivery?\r
\r
At-least-once means: "I will not lose this message, even if I have to process it twice."\r
\r
\`\`\`java\r
// Process first, then commit\r
consumer.poll();\r
processMessages();     // Process the messages\r
consumer.commitSync(); // Then commit\r
\`\`\`\r
\r
**The tradeoff**: No message loss, but you might get duplicates. If the consumer crashes after processing but before committing, those messages get reprocessed when the consumer restarts.\r
\r
This is the most common delivery guarantee. It's safe (no data loss) but your processing needs to be idempotent — able to handle the same message multiple times without causing problems.\r
\r
### What is exactly-once delivery?\r
\r
Exactly-once means: "Every message is processed exactly one time — no more, no less." This is the holy grail but also the hardest to achieve.\r
\r
**Implementation using idempotent producer + transactional consumer:**\r
\r
\`\`\`java\r
// Producer: Idempotent\r
props.put(ProducerConfig.ENABLE_IDEMPOTENCE_CONFIG, true);\r
props.put(ProducerConfig.TRANSACTIONAL_ID_CONFIG, "prod-1");\r
\r
// Consumer: Committing only after processing\r
consumer.poll();\r
processMessages();\r
// Commit offsets and produce results in a transaction\r
producer.beginTransaction();\r
producer.send(result);\r
consumer.commitSync(); // In transactional context\r
producer.commitTransaction();\r
\`\`\`\r
\r
Kafka achieves this through transactions — the offset commit and the output production happen atomically (both succeed or both fail). If anything goes wrong, the whole transaction is rolled back and retried.\r
\r
### How do you prevent duplicate message processing?\r
\r
Even with at-least-once delivery, you need to handle duplicates. Here are the common strategies:\r
\r
1. **Idempotent producer**: Prevents duplicates at the broker level (messages with the same sequence number are discarded)\r
\r
2. **Unique message IDs**: Each message has a unique ID. The consumer checks if it's already processed this ID:\r
\r
\`\`\`java\r
// Deduplication using Redis\r
public void processMessage(String messageId, Order order) {\r
    if (redis.exists(messageId)) {\r
        // Skip already processed message\r
        return;\r
    }\r
\r
    // Process the order\r
    processOrder(order);\r
\r
    // Store processed message ID\r
    redis.set(messageId, "processed");\r
}\r
\`\`\`\r
\r
3. **Idempotent processing**: Design your processing so that doing it twice has the same effect as doing it once. For example, "set status to PROCESSED" is idempotent — it doesn't matter how many times you run it.\r
\r
4. **Kafka transactions**: Use exactly-once semantics with transactional producers and consumers.\r
\r
---\r
\r
## Replication & Fault Tolerance\r
\r
### What is replication factor?\r
\r
Replication factor is how many copies of each partition you keep. If replication factor is 3, every partition exists on 3 different brokers. Think of it like having 3 backup copies of an important file on 3 different hard drives.\r
\r
\`\`\`bash\r
# Create topic with replication factor 3\r
kafka-topics.sh --create \\\r
  --bootstrap-server localhost:9092 \\\r
  --topic orders \\\r
  --partitions 3 \\\r
  --replication-factor 3\r
\`\`\`\r
\r
### Why does Kafka replicate partitions?\r
\r
Simple: so you don't lose data when machines die. If you have replication factor 3, you can lose 2 brokers and still have all your data on the remaining one. This gives you:\r
- **Fault tolerance**: The system keeps running even when brokers fail\r
- **High availability**: No downtime — if one broker dies, another takes over\r
- **Data durability**: Your data survives hardware failures\r
\r
### What is a partition leader?\r
\r
For each partition, one replica is the "leader" and the rest are "followers." The leader is the one that handles all reads and writes. When a producer sends a message, it goes to the leader. When a consumer reads, it reads from the leader.\r
\r
The followers just copy what the leader does — they stay in sync so they can take over if needed.\r
\r
### What is a follower replica?\r
\r
A follower is a backup copy of the partition. It:\r
- Constantly copies new messages from the leader\r
- Doesn't serve client requests (producers and consumers talk to the leader)\r
- Is ready to become the leader if the current leader dies\r
\r
### What is ISR (In-Sync Replica)?\r
\r
ISR stands for "In-Sync Replica" — it's the set of replicas that are fully caught up with the leader. If a replica is lagging behind (maybe it was catching up after a restart), it's not in the ISR.\r
\r
**Why it matters**: Only replicas in the ISR are eligible to become the new leader. This prevents data loss — you don't want to promote a replica that's missing the last 100 messages.\r
\r
\`\`\`bash\r
kafka-topics.sh --describe --bootstrap-server localhost:9092 --topic orders\r
# Output includes: ISR: 0,1,2 (replica IDs that are in-sync)\r
\`\`\`\r
\r
### What happens when a Kafka broker goes down?\r
\r
Let's say broker 2 dies. Here's what happens:\r
1. Kafka detects the broker is unreachable\r
2. For every partition where broker 2 was the leader, a new leader is elected from the ISR\r
3. The ISR shrinks (broker 2 is removed from it)\r
4. Producers and consumers are automatically redirected to the new leaders\r
5. The whole process is automatic — no manual intervention needed\r
\r
### What happens when a partition leader goes down?\r
\r
Same idea, just at the partition level:\r
1. Kafka notices the leader is gone\r
2. Picks a new leader from the ISR (the most up-to-date follower)\r
3. All requests automatically go to the new leader\r
4. Clients don't need to know — it's transparent\r
\r
### What is min.insync.replicas?\r
\r
This is a safety setting. It says: "Don't consider a write successful unless at least N replicas have acknowledged it."\r
\r
\`\`\`bash\r
# Configure at topic level\r
kafka-configs.sh --bootstrap-server localhost:9092 \\\r
  --entity-type topics \\\r
  --entity-name orders \\\r
  --alter \\\r
  --add-config min.insync.replicas=2\r
\`\`\`\r
\r
With replication factor 3 and \`min.insync.replicas=2\`, your data is written to at least 2 out of 3 replicas before the producer gets a success response. This means you can lose 1 broker without losing any acknowledged writes.\r
\r
### What is an unclean leader election?\r
\r
An unclean leader election happens when no in-sync replica is available, so Kafka is forced to promote an out-of-sync replica (one that's missing some messages).\r
\r
**The risk**: Data loss. The new leader doesn't have all the messages the old leader had. Those messages are gone forever.\r
\r
\`\`\`java\r
// Prevent unclean leader election (recommended for critical data)\r
unclean.leader.election.enable=false\r
\`\`\`\r
\r
With this setting, if no in-sync replica is available, the partition just goes offline rather than risk data loss. Better to be unavailable than to lose data.\r
\r
### How does Kafka prevent data loss?\r
\r
Kafka uses multiple layers of protection:\r
1. **Replication**: Multiple copies of each partition\r
2. **ISR**: Only up-to-date replicas can become leaders\r
3. **min.insync.replicas**: Ensures writes go to enough replicas\r
4. **acks=all**: Producer waits for all in-sync replicas to acknowledge\r
5. **Unclean leader election disabled**: Prevents promoting behind replicas\r
6. **Idempotent producers**: Prevents duplicate writes from retries\r
\r
---\r
\r
## Spring Boot + Kafka\r
\r
### How do you integrate Kafka with Spring Boot?\r
\r
**Add dependencies:**\r
\r
\`\`\`xml\r
<dependency>\r
    <groupId>org.springframework.kafka</groupId>\r
    <artifactId>spring-kafka</artifactId>\r
</dependency>\r
\`\`\`\r
\r
**Configure in application.yml:**\r
\r
\`\`\`yaml\r
spring:\r
  kafka:\r
    bootstrap-servers: localhost:9092\r
    producer:\r
      key-serializer: org.apache.kafka.common.serialization.StringSerializer\r
      value-serializer: org.springframework.kafka.support.serializer.JsonSerializer\r
    consumer:\r
      group-id: order-group\r
      key-deserializer: org.apache.kafka.common.serialization.StringDeserializer\r
      value-deserializer: org.springframework.kafka.support.serializer.JsonDeserializer\r
      properties:\r
        spring.json.trusted.packages: "*"\r
\`\`\`\r
\r
### What is KafkaTemplate?\r
\r
\`KafkaTemplate\` is Spring's wrapper for Kafka producer operations:\r
\r
\`\`\`java\r
@Service\r
public class KafkaProducerService {\r
    @Autowired\r
    private KafkaTemplate<String, Order> kafkaTemplate;\r
\r
    public void sendOrder(Order order) {\r
        // Send message\r
        kafkaTemplate.send("orders", order.getCustomerId(), order);\r
\r
        // Send with callback\r
        ListenableFuture<SendResult<String, Order>> future =\r
            kafkaTemplate.send("orders", order.getCustomerId(), order);\r
        future.addCallback(\r
            result -> System.out.println("Sent: " + result.getRecordMetadata().offset()),\r
            failure -> System.err.println("Failed: " + failure.getMessage())\r
        );\r
    }\r
}\r
\`\`\`\r
\r
### What is @KafkaListener?\r
\r
\`@KafkaListener\` is Spring's annotation for creating Kafka consumers:\r
\r
\`\`\`java\r
@Service\r
public class KafkaConsumerService {\r
    @KafkaListener(topics = "orders", groupId = "order-group")\r
    public void consume(Order order) {\r
        System.out.println("Received: " + order);\r
        // Process order\r
    }\r
\r
    // With metadata\r
    @KafkaListener(topics = "orders")\r
    public void consumeWithMetadata(\r
            @Payload Order order,\r
            @Headers MessageHeaders headers,\r
            @Header("kafka_offset") Long offset) {\r
        System.out.println("Order: " + order + ", Offset: " + offset);\r
    }\r
}\r
\`\`\`\r
\r
### How do you create a Kafka Producer using Spring Boot?\r
\r
\`\`\`java\r
@Configuration\r
public class KafkaProducerConfig {\r
    @Bean\r
    public ProducerFactory<String, Order> producerFactory() {\r
        Map<String, Object> props = new HashMap<>();\r
        props.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:9092");\r
        props.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class);\r
        props.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, JsonSerializer.class);\r
        props.put(ProducerConfig.ACKS_CONFIG, "all");\r
        props.put(ProducerConfig.RETRIES_CONFIG, 3);\r
        return new DefaultKafkaProducerFactory<>(props);\r
    }\r
\r
    @Bean\r
    public KafkaTemplate<String, Order> kafkaTemplate() {\r
        return new KafkaTemplate<>(producerFactory());\r
    }\r
}\r
\`\`\`\r
\r
### How do you create a Kafka Consumer using Spring Boot?\r
\r
\`\`\`java\r
@Configuration\r
public class KafkaConsumerConfig {\r
    @Bean\r
    public ConsumerFactory<String, Order> consumerFactory() {\r
        Map<String, Object> props = new HashMap<>();\r
        props.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:9092");\r
        props.put(ConsumerConfig.GROUP_ID_CONFIG, "order-group");\r
        props.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class);\r
        props.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, JsonDeserializer.class);\r
        props.put(JsonDeserializer.TRUSTED_PACKAGES, "*");\r
        props.put(ConsumerConfig.AUTO_OFFSET_RESET_CONFIG, "earliest");\r
        return new DefaultKafkaConsumerFactory<>(props);\r
    }\r
\r
    @Bean\r
    public ConcurrentKafkaListenerContainerFactory<String, Order>\r
            kafkaListenerContainerFactory() {\r
        ConcurrentKafkaListenerContainerFactory<String, Order> factory =\r
            new ConcurrentKafkaListenerContainerFactory<>();\r
        factory.setConsumerFactory(consumerFactory());\r
        factory.setConcurrency(3); // Consume with 3 threads\r
        return factory;\r
    }\r
}\r
\`\`\`\r
\r
### What is ConcurrentKafkaListenerContainerFactory?\r
\r
It's a factory that creates Kafka listener containers with concurrency support:\r
\r
- \`setConcurrency(3)\`: Creates 3 consumer threads\r
- Each thread consumes from different partitions (up to 3 partitions)\r
- Enables parallel processing\r
\r
### How do you configure Kafka Producer properties in Spring Boot?\r
\r
**application.yml approach:**\r
\r
\`\`\`yaml\r
spring:\r
  kafka:\r
    producer:\r
      bootstrap-servers: localhost:9092\r
      key-serializer: org.apache.kafka.common.serialization.StringSerializer\r
      value-serializer: org.springframework.kafka.support.serializer.JsonSerializer\r
      properties:\r
        acks: all\r
        retries: 3\r
        batch.size: 16384\r
        linger.ms: 100\r
        compression.type: snappy\r
\`\`\`\r
\r
**Java configuration approach:**\r
\r
\`\`\`java\r
@Bean\r
public ProducerFactory<String, Order> producerFactory() {\r
    Map<String, Object> props = new HashMap<>();\r
    props.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:9092");\r
    props.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class);\r
    props.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, JsonSerializer.class);\r
    props.put(ProducerConfig.ACKS_CONFIG, "all");\r
    props.put(ProducerConfig.RETRIES_CONFIG, 3);\r
    props.put(ProducerConfig.BATCH_SIZE_CONFIG, 16384);\r
    props.put(ProducerConfig.LINGER_MS_CONFIG, 100);\r
    props.put(ProducerConfig.COMPRESSION_TYPE_CONFIG, "snappy");\r
    return new DefaultKafkaProducerFactory<>(props);\r
}\r
\`\`\`\r
\r
### How do you configure Kafka Consumer properties?\r
\r
\`\`\`java\r
@Bean\r
public ConsumerFactory<String, Order> consumerFactory() {\r
    Map<String, Object> props = new HashMap<>();\r
    props.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:9092");\r
    props.put(ConsumerConfig.GROUP_ID_CONFIG, "order-group");\r
    props.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class);\r
    props.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, JsonDeserializer.class);\r
    props.put(JsonDeserializer.TRUSTED_PACKAGES, "*");\r
    props.put(ConsumerConfig.AUTO_OFFSET_RESET_CONFIG, "earliest");\r
    props.put(ConsumerConfig.ENABLE_AUTO_COMMIT_CONFIG, false); // Manual commit\r
    props.put(ConsumerConfig.MAX_POLL_RECORDS_CONFIG, 100);\r
    props.put(ConsumerConfig.MAX_POLL_INTERVAL_MS_CONFIG, 300000);\r
    return new DefaultKafkaConsumerFactory<>(props);\r
}\r
\`\`\`\r
\r
### How do you configure multiple Kafka consumers/concurrency?\r
\r
\`\`\`java\r
@Bean\r
public ConcurrentKafkaListenerContainerFactory<String, Order>\r
        kafkaListenerContainerFactory() {\r
    ConcurrentKafkaListenerContainerFactory<String, Order> factory =\r
        new ConcurrentKafkaListenerContainerFactory<>();\r
    factory.setConsumerFactory(consumerFactory());\r
    factory.setConcurrency(3); // 3 concurrent consumer threads\r
    factory.setAckMode(ContainerProperties.AckMode.MANUAL_IMMEDIATE);\r
    return factory;\r
}\r
\r
@Bean\r
public ConcurrentKafkaListenerContainerFactory<String, Order>\r
        highConcurrencyListenerContainerFactory() {\r
    ConcurrentKafkaListenerContainerFactory<String, Order> factory =\r
        new ConcurrentKafkaListenerContainerFactory<>();\r
    factory.setConsumerFactory(consumerFactory());\r
    factory.setConcurrency(10); // 10 concurrent consumer threads\r
    return factory;\r
}\r
\r
// Usage\r
@KafkaListener(topics = "orders", containerFactory = "highConcurrencyListenerContainerFactory")\r
public void consumeWithHighConcurrency(Order order) {\r
    // Process\r
}\r
\`\`\`\r
\r
### How do you handle exceptions in @KafkaListener?\r
\r
\`\`\`java\r
@Service\r
public class KafkaConsumerService {\r
    @KafkaListener(topics = "orders", groupId = "order-group")\r
    public void consume(Order order, Acknowledgment ack) {\r
        try {\r
            // Process order\r
            processOrder(order);\r
            ack.acknowledge(); // Manual commit after successful processing\r
        } catch (Exception e) {\r
            System.err.println("Failed to process: " + e.getMessage());\r
            // Option 1: Acknowledge (skip the message)\r
            // ack.acknowledge();\r
            // Option 2: Don't acknowledge (will retry)\r
            // Option 3: Send to Dead Letter Topic (DLT)\r
            sendToDlt(order, e);\r
            ack.acknowledge();\r
        }\r
    }\r
\r
    @KafkaListener(topics = "orders-dlt")\r
    public void consumeFromDlt(Order order) {\r
        System.err.println("Received from DLT: " + order);\r
        // Manual investigation of failed messages\r
    }\r
}\r
\`\`\`\r
\r
---\r
\r
## Real-World Kafka\r
\r
### How do you implement retry in Kafka?\r
\r
**Approach 1: Retry topics with increasing delays:**\r
\r
\`\`\`java\r
@Service\r
public class OrderProcessor {\r
    @KafkaListener(topics = "orders")\r
    public void processOrder(ConsumerRecord<String, String> record) {\r
        try {\r
            processOrderInternal(record.value());\r
        } catch (TransientException e) {\r
            int retryCount = getRetryCount(record);\r
            if (retryCount < 3) {\r
                // Send to retry topic\r
                sendToRetryTopic(record, retryCount + 1);\r
            } else {\r
                // Send to DLT after max retries\r
                sendToDlq(record, e);\r
            }\r
        } catch (PermanentException e) {\r
            // Send directly to DLT for permanent failures\r
            sendToDlq(record, e);\r
        }\r
    }\r
}\r
\`\`\`\r
\r
**Approach 2: Exponential backoff:**\r
\r
\`\`\`java\r
@Service\r
public class DelayedRetryConsumer {\r
    private static final Map<Integer, Long> RETRY_DELAYS = Map.of(\r
        1, 5000L,   // 5 seconds\r
        2, 30000L,  // 30 seconds\r
        3, 300000L  // 5 minutes\r
    );\r
\r
    @KafkaListener(topics = "orders-retry-1")\r
    public void processRetry1(ConsumerRecord<String, String> record) {\r
        processWithDelay(record, 1);\r
    }\r
\r
    @KafkaListener(topics = "orders-retry-2")\r
    public void processRetry2(ConsumerRecord<String, String> record) {\r
        processWithDelay(record, 2);\r
    }\r
}\r
\`\`\`\r
\r
### What is a Dead Letter Topic (DLT)?\r
\r
A Dead Letter Topic is a special topic where messages are sent when they cannot be processed successfully after all retry attempts.\r
\r
**Creating a DLT:**\r
\r
\`\`\`bash\r
kafka-topics.sh --create \\\r
  --bootstrap-server localhost:9092 \\\r
  --topic orders-dlt \\\r
  --partitions 3 \\\r
  --replication-factor 1\r
\`\`\`\r
\r
**Sending to DLT in Spring:**\r
\r
\`\`\`java\r
private void sendToDlq(ConsumerRecord<String, String> record, Exception e) {\r
    ProducerRecord<String, String> dlqRecord = new ProducerRecord<>(\r
        "orders-dlt",\r
        record.key(),\r
        record.value()\r
    );\r
    // Add diagnostic headers\r
    dlqRecord.headers()\r
        .add("dlq-reason", e.getMessage().getBytes())\r
        .add("exception-class", e.getClass().getName().getBytes())\r
        .add("original-topic", record.topic().getBytes())\r
        .add("timestamp", String.valueOf(System.currentTimeMillis()).getBytes());\r
\r
    kafkaTemplate.send(dlqRecord);\r
}\r
\`\`\`\r
\r
### What happens when a Kafka message repeatedly fails?\r
\r
1. Consumer attempts to process the message\r
2. If it fails, the consumer may retry (based on retry configuration)\r
3. After max retries, the message is sent to the DLT\r
4. The message is removed from the original topic (offset committed)\r
5. The DLT message can be manually investigated and replayed\r
6. The DLT can be consumed for monitoring and alerting\r
\r
### How do you handle duplicate messages in a payment/order system?\r
\r
**Approach 1: Idempotent processing:**\r
\r
\`\`\`java\r
@Service\r
public class PaymentProcessor {\r
    private final PaymentRepository paymentRepository;\r
    private final DeduplicationService dedupService;\r
\r
    @KafkaListener(topics = "payments")\r
    public void processPayment(PaymentEvent event) {\r
        // Check if already processed\r
        if (dedupService.isProcessed(event.getPaymentId())) {\r
            System.out.println("Duplicate payment, skipping: " + event.getPaymentId());\r
            return;\r
        }\r
\r
        try {\r
            // Process payment (idempotent)\r
            paymentRepository.save(event.toPayment());\r
            dedupService.markProcessed(event.getPaymentId());\r
        } catch (DuplicateKeyException e) {\r
            // Handle duplicate database insert\r
            dedupService.markProcessed(event.getPaymentId());\r
        }\r
    }\r
}\r
\`\`\`\r
\r
**Approach 2: Use idempotent producer:**\r
\r
\`\`\`java\r
props.put(ProducerConfig.ENABLE_IDEMPOTENCE_CONFIG, true);\r
props.put(ProducerConfig.TRANSACTIONAL_ID_CONFIG, "payment-service");\r
// Ensures exactly-once delivery within partitions\r
\`\`\`\r
\r
### How do you design Kafka communication between microservices?\r
\r
\`\`\`\r
Order Service → Kafka (orders topic) → Payment Service\r
Payment Service → Kafka (payments topic) → Notification Service\r
\`\`\`\r
\r
**Event-driven design:**\r
\r
\`\`\`java\r
// Order Service - publishes order events\r
@Service\r
public class OrderService {\r
    private final KafkaTemplate<String, OrderEvent> kafkaTemplate;\r
\r
    @Transactional\r
    public Order createOrder(Order order) {\r
        // Save order\r
        Order savedOrder = orderRepository.save(order);\r
\r
        // Publish event\r
        OrderEvent event = new OrderEvent(\r
            savedOrder.getId(),\r
            savedOrder.getCustomerId(),\r
            "ORDER_CREATED"\r
        );\r
        kafkaTemplate.send("orders", savedOrder.getCustomerId(), event);\r
\r
        return savedOrder;\r
    }\r
}\r
\r
// Payment Service - consumes order events, produces payment events\r
@Service\r
public class PaymentService {\r
    @KafkaListener(topics = "orders", groupId = "payment-group")\r
    public void handleOrderCreated(OrderEvent event) {\r
        // Process payment\r
        Payment payment = processPayment(event.getOrderId());\r
\r
        // Publish payment event\r
        PaymentEvent paymentEvent = new PaymentEvent(payment.getId(), "PAYMENT_COMPLETED");\r
        kafkaTemplate.send("payments", paymentEvent);\r
    }\r
}\r
\r
// Notification Service - consumes payment events\r
@Service\r
public class NotificationService {\r
    @KafkaListener(topics = "payments", groupId = "notification-group")\r
    public void handlePaymentCompleted(PaymentEvent event) {\r
        // Send notification\r
        sendNotification(event.getPaymentId(), "Payment completed");\r
    }\r
}\r
\`\`\`\r
\r
### Kafka vs REST — when would you use each?\r
\r
| Aspect         | Kafka (Event-Driven)                    | REST (Request-Response)     |\r
| -------------- | --------------------------------------- | --------------------------- |\r
| **Coupling**   | Loose (async)                           | Tight (sync)                |\r
| **Latency**    | Higher (async)                          | Lower (sync)                |\r
| **Throughput** | Very high                               | Limited by server           |\r
| **Ordering**   | Guaranteed per partition                | Not guaranteed              |\r
| **Delivery**   | At least once, exactly once             | Best effort                 |\r
| **Use cases**  | Event sourcing, streams, data pipelines | CRUD, APIs, direct requests |\r
\r
**Use Kafka when:**\r
\r
- Multiple consumers need the same data\r
- Asynchronous processing is acceptable\r
- High throughput is required\r
- Event replay is needed\r
- Decoupling services is important\r
\r
**Use REST when:**\r
\r
- Immediate response is needed\r
- Simple CRUD operations\r
- External API with request-response\r
- Low latency is critical\r
\r
### What is the Outbox Pattern and why is it needed?\r
\r
The Outbox Pattern ensures reliable communication between a database and Kafka when updating the database and publishing an event must be atomic .\r
\r
**The Problem:**\r
\r
\`\`\`java\r
@Transactional\r
public void createOrder(Order order) {\r
    orderRepository.save(order); // DB update\r
    // Risk: If Kafka publish fails, DB update succeeds -> inconsistency\r
    kafkaTemplate.send("orders", order);\r
}\r
\`\`\`\r
\r
**The Solution (Outbox Pattern):**\r
\r
\`\`\`java\r
@Transactional\r
public void createOrder(Order order) {\r
    orderRepository.save(order);\r
\r
    // Instead of publishing directly, save to outbox table\r
    OutboxEvent event = new OutboxEvent(\r
        "ORDER_CREATED",\r
        new ObjectMapper().writeValueAsString(order),\r
        Instant.now()\r
    );\r
    outboxRepository.save(event);\r
    // DB transaction commits both order and event atomically\r
}\r
\r
// Separate process polls outbox table and publishes to Kafka\r
@Component\r
public class OutboxPublisher {\r
    @Scheduled(fixedDelay = 1000)\r
    public void publishOutboxEvents() {\r
        List<OutboxEvent> events = outboxRepository.findByPublishedFalse();\r
        for (OutboxEvent event : events) {\r
            try {\r
                kafkaTemplate.send("orders", event.getPayload());\r
                event.setPublished(true);\r
                outboxRepository.save(event);\r
            } catch (Exception e) {\r
                // Retry on failure\r
                System.err.println("Failed to publish: " + e.getMessage());\r
                // Don't mark as published, retry later\r
            }\r
        }\r
    }\r
}\r
\`\`\`\r
\r
### What happens if the database update succeeds but Kafka publishing fails?\r
\r
- **Without Outbox**: Inconsistency (DB updated, event not published)\r
- **With Outbox**: Event saved in Outbox, retry mechanism publishes later\r
- The Outbox process continues retrying until successful\r
- No data loss, eventual consistency is achieved\r
\r
### What happens if Kafka processing succeeds but the application crashes before updating the database?\r
\r
**Scenario:**\r
\r
1. Consumer receives message\r
2. Processing succeeds\r
3. Offset is committed\r
4. Application crashes before updating DB\r
\r
**Solution: Idempotent processing:**\r
\r
\`\`\`java\r
@KafkaListener(topics = "orders")\r
public void processOrder(OrderEvent event, Acknowledgment ack) {\r
    // Check if already processed\r
    if (isProcessed(event.getOrderId())) {\r
        ack.acknowledge();\r
        return;\r
    }\r
\r
    try {\r
        // Process and update DB\r
        processOrderInternal(event);\r
        markProcessed(event.getOrderId());\r
        ack.acknowledge();\r
    } catch (Exception e) {\r
        // Don't commit, will retry\r
        throw e;\r
    }\r
}\r
\`\`\`\r
\r
### Design a real-world Order → Payment → Notification system using Kafka\r
\r
**Architecture:**\r
\r
\`\`\`\r
Order Service → [orders topic] → Payment Service → [payments topic] → Notification Service\r
                    ↑                   ↓\r
                 [orders-dlt]      [payments-dlt]\r
\`\`\`\r
\r
**Implementation:**\r
\r
\`\`\`java\r
// 1. Order Service\r
@Service\r
@Slf4j\r
public class OrderService {\r
    @Autowired\r
    private OrderRepository orderRepository;\r
    @Autowired\r
    private KafkaTemplate<String, OrderEvent> kafkaTemplate;\r
\r
    @Transactional\r
    public Order createOrder(CreateOrderRequest request) {\r
        // Save order\r
        Order order = new Order();\r
        order.setCustomerId(request.getCustomerId());\r
        order.setAmount(request.getAmount());\r
        order.setStatus("PENDING");\r
        order = orderRepository.save(order);\r
\r
        // Publish event\r
        OrderEvent event = new OrderEvent(\r
            order.getId(),\r
            order.getCustomerId(),\r
            order.getAmount(),\r
            "ORDER_CREATED"\r
        );\r
        kafkaTemplate.send("orders", order.getCustomerId(), event);\r
\r
        return order;\r
    }\r
}\r
\r
// 2. Payment Service\r
@Service\r
@Slf4j\r
public class PaymentService {\r
    @Autowired\r
    private PaymentRepository paymentRepository;\r
    @Autowired\r
    private KafkaTemplate<String, PaymentEvent> kafkaTemplate;\r
\r
    @KafkaListener(topics = "orders", groupId = "payment-group")\r
    @Retryable(value = {Exception.class}, maxAttempts = 3)\r
    public void handleOrderCreated(OrderEvent event, Acknowledgment ack) {\r
        try {\r
            // Process payment\r
            Payment payment = new Payment();\r
            payment.setOrderId(event.getOrderId());\r
            payment.setAmount(event.getAmount());\r
            payment.setStatus("COMPLETED");\r
            payment = paymentRepository.save(payment);\r
\r
            // Publish payment event\r
            PaymentEvent paymentEvent = new PaymentEvent(\r
                payment.getId(),\r
                event.getOrderId(),\r
                event.getCustomerId(),\r
                "PAYMENT_COMPLETED"\r
            );\r
            kafkaTemplate.send("payments", event.getCustomerId(), paymentEvent);\r
\r
            ack.acknowledge();\r
        } catch (Exception e) {\r
            log.error("Payment processing failed", e);\r
            // For transient errors, don't acknowledge (retry)\r
            // For permanent errors, send to DLT\r
            if (isPermanentError(e)) {\r
                sendToDlt(event, e);\r
                ack.acknowledge();\r
            }\r
            // Re-throw for retry\r
            throw e;\r
        }\r
    }\r
}\r
\r
// 3. Notification Service\r
@Service\r
@Slf4j\r
public class NotificationService {\r
    @Autowired\r
    private NotificationRepository notificationRepository;\r
    @Autowired\r
    private EmailService emailService;\r
\r
    @KafkaListener(topics = "payments", groupId = "notification-group")\r
    public void handlePaymentCompleted(PaymentEvent event, Acknowledgment ack) {\r
        try {\r
            // Create notification\r
            Notification notification = new Notification();\r
            notification.setCustomerId(event.getCustomerId());\r
            notification.setMessage("Payment " + event.getPaymentId() + " completed for order " + event.getOrderId());\r
            notification.setStatus("SENT");\r
            notification = notificationRepository.save(notification);\r
\r
            // Send email\r
            emailService.sendEmail(\r
                getCustomerEmail(event.getCustomerId()),\r
                "Payment Confirmation",\r
                notification.getMessage()\r
            );\r
\r
            ack.acknowledge();\r
        } catch (Exception e) {\r
            log.error("Notification failed", e);\r
            // Send to DLT for manual investigation\r
            sendToDlt(event, e);\r
            ack.acknowledge();\r
        }\r
    }\r
}\r
\r
// 4. Dead Letter Topic Handler\r
@Slf4j\r
@Service\r
public class DltHandler {\r
    @KafkaListener(topics = "orders-dlt")\r
    public void handleDltMessage(ConsumerRecord<String, OrderEvent> record) {\r
        log.error("DLT message: topic={}, offset={}, key={}, value={}",\r
            record.topic(), record.offset(), record.key(), record.value());\r
\r
        // Store in database for manual investigation\r
        FailedEvent failedEvent = new FailedEvent();\r
        failedEvent.setTopic(record.topic());\r
        failedEvent.setKey(record.key());\r
        failedEvent.setPayload(record.value().toString());\r
        failedEvent.setReason(new String(record.headers().lastHeader("dlq-reason").value()));\r
        failedEvent.setTimestamp(new Date());\r
        failedEventRepository.save(failedEvent);\r
\r
        // Send alert\r
        alertService.sendAlert("Message sent to DLT: " + record.value());\r
    }\r
}\r
\`\`\`\r
\r
**Testing the system:**\r
\r
\`\`\`bash\r
# 1. Create topics\r
kafka-topics.sh --create --bootstrap-server localhost:9092 --topic orders --partitions 3\r
kafka-topics.sh --create --bootstrap-server localhost:9092 --topic payments --partitions 3\r
kafka-topics.sh --create --bootstrap-server localhost:9092 --topic orders-dlt --partitions 3\r
\r
# 2. Start services\r
# Order Service on port 8080\r
# Payment Service on port 8081\r
# Notification Service on port 8082\r
\r
# 3. Create an order\r
curl -X POST http://localhost:8080/orders \\\r
  -H "Content-Type: application/json" \\\r
  -d '{"customerId":"123", "amount":100.00}'\r
\r
# 4. Verify consumers\r
kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic orders --from-beginning\r
kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic payments --from-beginning\r
\r
# 5. Monitor consumer lag\r
kafka-consumer-groups.sh --bootstrap-server localhost:9092 \\\r
  --group payment-group --describe\r
\`\`\`\r
\r
---\r
`,s=n(),c=(e,t)=>{try{return t||=`bash`,i.highlight(e,{language:t,ignoreIllegals:!0}).value}catch(n){return console.warn(`Highlight.js error for language '${t}':`,n),e.replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`).replace(/'/g,`&#x27;`)}},l=(e=>{let t=[],n=e.split(`
`),r=null,i=null,a=1,o=!1,s=[],c=``,l=e=>e.trim().replace(/\*\*(.*?)\*\*/g,`$1`).replace(/`([^`]+)`/g,`$1`).replace(/\*([^*]+)\*/g,`$1`),u=e=>{let t=l(e);t&&(/^(?:-{3,}|\*{3,}|_{3,})$/.test(t)||/^\|/.test(t)||/^\s*$/.test(t)||/^[\w\s'/&()-]{1,45}:$/.test(t)||i&&i.response.push({type:`text`,content:t}))},d=e=>{let t=l(e);if(t&&i){let e=i.response[i.response.length-1];e?.type===`list`?e.items.push(t):i.response.push({type:`list`,items:[t]})}},f=e=>{let t=e.split(`|`).slice(1,-1).map(e=>e.trim());return t.length>0&&t.every(e=>/^:?-{3,}:?$/.test(e))};for(let e=0;e<n.length;e++){let p=n[e],m=p.trim();if(m.startsWith("```")){if(!o)o=!0,c=m.replace(/```/g,``).trim()||`bash`,s=[];else{if(o=!1,i&&s.length>0){let e=s.join(`
`).split(`
`),t=Math.min(...e.filter(e=>e.trim()).map(e=>e.match(/^\s*/)[0].length)),n=e.map(e=>e.slice(t)).join(`
`).trim();i.response.push({type:`code`,content:n,language:c})}s=[]}continue}if(o){s.push(p);continue}let h=p.match(/^##\s+(.+)/);if(h){r={name:h[1],questions:[]},t.push(r),i=null;continue}let g=p.match(/^###\s+(.+)/);if(g){i={id:`${a}`,question:g[1],response:[]},r&&r.questions.push(i),a+=1;continue}if(i){if(m.startsWith(`**`)&&m.endsWith(`**`)&&m.length>4){u(m.slice(2,-2));continue}if(/^[-*]\s+/.test(m)){d(m.replace(/^[-*]\s+/,``));continue}if(/^\|/.test(m)){if(f(m))continue;let e=m.split(`|`).slice(1,-1).map(e=>l(e));if(e.length>0){(!i.response.length||i.response[i.response.length-1].type!==`table`)&&i.response.push({type:`table`,rows:[]});let t=i.response[i.response.length-1];t.type===`table`&&t.rows.push(e)}continue}if(/^\d+\./.test(m)){u(m.replace(/^\d+\.\s*/,``));continue}if(m.startsWith(`**`)&&m.endsWith(`**`)){u(m.replace(/^\*\*/g,``).replace(/\*\*$/g,``));continue}m&&!m.startsWith(`#`)&&u(m)}}return t})(o),u=l.reduce((e,t)=>e+t.questions.length,0);function d(){let[e,t]=(0,a.useState)(null),n=n=>{t(e===n?null:n)};return(0,s.jsxs)(`div`,{className:`spring-boot-interview-page`,children:[(0,s.jsx)(`section`,{className:`interview-header`,children:(0,s.jsxs)(`div`,{className:`interview-header-content`,children:[(0,s.jsx)(r,{to:`/kafka`,className:`back-button`,children:`← Back to Apache Kafka`}),(0,s.jsx)(`h1`,{className:`interview-title`,children:`Kafka Interview Questions`}),(0,s.jsx)(`p`,{className:`interview-subtitle`,children:`Master Kafka interview questions with detailed answers and code examples`}),(0,s.jsxs)(`div`,{className:`interview-stats`,children:[(0,s.jsxs)(`div`,{className:`interview-stat`,children:[(0,s.jsxs)(`span`,{className:`stat-number`,children:[u,`+`]}),(0,s.jsx)(`span`,{className:`stat-label`,children:`Questions`})]}),(0,s.jsxs)(`div`,{className:`interview-stat`,children:[(0,s.jsx)(`span`,{className:`stat-number`,children:l.length}),(0,s.jsx)(`span`,{className:`stat-label`,children:`Categories`})]}),(0,s.jsxs)(`div`,{className:`interview-stat`,children:[(0,s.jsx)(`span`,{className:`stat-number`,children:`100%`}),(0,s.jsx)(`span`,{className:`stat-label`,children:`Free`})]})]})]})}),(0,s.jsx)(`section`,{className:`questions-section`,children:(0,s.jsx)(`div`,{className:`questions-container`,children:(0,s.jsx)(`div`,{className:`questions-list`,children:l.map((t,r)=>(0,s.jsxs)(`div`,{className:`category-section`,children:[(0,s.jsx)(`h2`,{className:`category-title`,children:t.name}),(0,s.jsx)(`div`,{className:`questions-vertical`,children:t.questions.map(t=>(0,s.jsxs)(`div`,{className:`question-item-vertical ${e===t.id?`active`:``}`,children:[(0,s.jsxs)(`div`,{className:`question-item-header`,onClick:()=>n(t.id),children:[(0,s.jsxs)(`span`,{className:`q-number`,children:[`Q`,t.id]}),(0,s.jsx)(`p`,{className:`q-text`,children:t.question}),(0,s.jsx)(`span`,{className:`expand-arrow ${e===t.id?`expanded`:``}`,children:`▼`})]}),e===t.id&&(0,s.jsx)(`div`,{className:`question-item-content`,children:(0,s.jsx)(`div`,{className:`question-card`,children:(0,s.jsxs)(`div`,{className:`question-answer`,children:[(0,s.jsx)(`h3`,{className:`answer-title`,children:`Answer:`}),t.response.map((e,t)=>{if(e.type===`code`)return(0,s.jsxs)(`div`,{className:`code-block`,children:[(0,s.jsx)(`div`,{className:`code-header`,children:(0,s.jsx)(`span`,{className:`code-language`,children:e.language||`bash`})}),(0,s.jsx)(`pre`,{children:(0,s.jsx)(`code`,{dangerouslySetInnerHTML:{__html:c(e.content,e.language)}})})]},t);if(e.type===`list`)return(0,s.jsx)(`ul`,{className:`answer-list`,children:e.items.map((e,n)=>(0,s.jsx)(`li`,{className:`answer-list-item`,children:e},`${t}-${n}`))},t);if(e.type===`table`){let[n,...r]=e.rows;return(0,s.jsx)(`div`,{className:`answer-table-wrapper`,children:(0,s.jsxs)(`table`,{className:`answer-table`,children:[(0,s.jsx)(`thead`,{children:(0,s.jsx)(`tr`,{children:n.map((e,n)=>(0,s.jsx)(`th`,{children:e},`${t}-h-${n}`))})}),(0,s.jsx)(`tbody`,{children:r.map((e,n)=>(0,s.jsx)(`tr`,{children:e.map((e,r)=>(0,s.jsx)(`td`,{children:e},`${t}-c-${n}-${r}`))},`${t}-r-${n}`))})]})},t)}return(0,s.jsx)(`p`,{className:`answer-text answer-${e.type}`,children:e.content},t)})]})})})]},t.id))})]},r))})})})]})}export{d as default};