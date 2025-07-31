:

📨 Shared Kafka Library (@shared/kafka)
Centralized, typed, and scalable Kafka integration for the HKTVmall-style MVP E-Commerce Platform. Built using Nx Monorepo architecture, this library ensures consistent, reusable, and reliable Kafka messaging across microservices.

📦 Features
✅ Centralized Kafka topic management (kafka-topics.ts)

✅ Strong TypeScript typings for all Kafka events

✅ Reusable Kafka producer and consumer clients

✅ Events organized by domain (e.g., Order, User, Payment)

✅ Lifecycle-safe: graceful startup & shutdown

✅ Ready for observability (Prometheus, Jaeger, Grafana)

📁 Folder Structure
bash
Copy
Edit
libs/shared/kafka/
├── events/ # Event contracts grouped by domain
│ ├── AnalyticsEvents/
│ ├── CartEvents/
│ ├── EmailEvents/
│ ├── InvoiceEvents/
│ ├── NotificationEvents/
│ ├── OrderEvents/
│ ├── PaymentEvents/
│ ├── ProductEvents/
│ ├── RatingEvents/
│ ├── SearchEvents/
│ └── UserEvents/
├── kafka-client.ts # Low-level KafkaJS client setup
├── kafka-config.ts # Kafka broker connection settings
├── kafka-consumer.ts # High-level consumer logic
├── kafka-producer.ts # High-level producer logic
├── kafka-topics.ts # All Kafka topic constants
├── kafka-types.ts # Shared Kafka event types and interfaces
└── kafka.ts # Generic event config types
🗂️ Topic Naming Convention
Domain Prefix Example
User user. user.created
Product product. product.updated
Order order. order.status.updated
Payment payment. payment.success
Email email. email.order.created
Cart cart. cart.checkedout
Search search. search.sync.product
Analytics analytics. analytics.user.behavior
Invoice invoice. invoice.generated
Notification notification. notification.sent

📦 Topics are exported from:

ts
Copy
Edit
import { KAFKA_TOPICS } from '@shared/kafka';
🧪 Event Typing Example
File: events/UserEvents/UserCreatedEvent.ts

ts
Copy
Edit
export interface UserCreatedEvent {
userId: string;
email: string;
name: string;
role: 'user' | 'admin';
createdAt: string;
}
Mapped like:

ts
Copy
Edit
export type KafkaTopicMap = {
[KAFKA_TOPICS.USER.CREATED]: UserCreatedEvent;
};
✨ How to Use in Microservices
🔽 Kafka Consumer Setup
ts
Copy
Edit
import { connectKafkaConsumer, KAFKA_TOPICS } from '@shared/kafka';

await connectKafkaConsumer(
{
groupId: 'order-service',
topics: [KAFKA_TOPICS.ORDER.CREATED],
},
async (message) => {
const event = JSON.parse(message); // Strong typing recommended
// Handle the ORDER_CREATED event
}
);
🔼 Kafka Producer Usage
ts
Copy
Edit
import { produceKafkaEvent, KAFKA_TOPICS } from '@shared/kafka';

await produceKafkaEvent({
topic: KAFKA_TOPICS.PAYMENT.SUCCESS,
messages: [
{
key: 'payment-123',
value: JSON.stringify({
paymentId: '123',
orderId: '456',
amount: 99.99,
paidAt: new Date().toISOString(),
}),
},
],
});
🧹 Graceful Shutdown
ts
Copy
Edit
import { disconnectKafkaConsumer, disconnectKafkaProducer } from '@shared/kafka';

process.on('SIGINT', async () => {
await disconnectKafkaConsumer();
await disconnectKafkaProducer();
process.exit(0);
});
🔁 Nx Integration
This shared Kafka library is used by multiple microservices:

user-service

product-service

order-service

invoice-service

analytics-service

email-service

✅ Import via:

ts
Copy
Edit
import { produceKafkaEvent, connectKafkaConsumer, KAFKA_TOPICS } from '@shared/kafka';
📈 Observability
Integrated with @shared/logger

Ready for monitoring with Prometheus, Grafana, Loki

Tracing-ready via Kafka logs → Jaeger

✅ TODOs
Retry & backoff mechanism

Dead Letter Topic (DLT) support

Schema validation (JSON Schema / Avro)

Message versioning support

🧠 For Beginners (New Learners)
Kafka is a tool used to send messages between microservices. This library hides the hard parts and gives you:

✅ Easy way to publish messages (produceKafkaEvent)

✅ Easy way to receive messages (connectKafkaConsumer)

✅ Type-safe events (each message is a known structure)

✅ Reusable code across all services

If you're new:

Find your topic in kafka-topics.ts

Find or create an event interface (like OrderCreatedEvent)

Use produceKafkaEvent() to publish, or connectKafkaConsumer() to receive
