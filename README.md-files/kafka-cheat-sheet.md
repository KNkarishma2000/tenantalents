
✅ Verify Kafka (KRaft) Is Running
bash
Copy
Edit
# View active processes
ps aux | grep kafka

# Check Kafka port (default 9092)
netstat -tuln | grep 9092
🔍 List All Topics
bash
Copy
Edit
kafka-topics.sh --bootstrap-server localhost:9092 --list
If kafka-topics.sh is not in your PATH:

bash
Copy
Edit
# Navigate to Kafka bin directory (adjust version)
cd ~/kafka_*/bin

# Then list topics
./kafka-topics.sh --bootstrap-server localhost:9092 --list
🧪 Create a Topic
Only if the topic doesn't already exist (you defined them in kafka-topics.ts)

bash
Copy
Edit
./kafka-topics.sh --bootstrap-server localhost:9092 \
  --create --topic order.created --partitions 1 --replication-factor 1
➡️ Repeat for each topic from your KAFKA_TOPICS file (like email.user.created, payment.success, etc.).

❗ Check if a Topic Exists
bash
Copy
Edit
./kafka-topics.sh --bootstrap-server localhost:9092 --describe --topic order.created
🧼 Delete a Topic (only in dev/test)
bash
Copy
Edit
./kafka-topics.sh --bootstrap-server localhost:9092 --delete --topic order.created
🔁 Produce a Message (manual test)
bash
Copy
Edit
./kafka-console-producer.sh --broker-list localhost:9092 --topic order.created
Then type JSON input manually:

json
Copy
Edit
{"orderId": "123", "userId": "abc", "createdAt": "2025-07-23T10:00:00Z"}
📥 Consume Messages
bash
Copy
Edit
./kafka-console-consumer.sh --bootstrap-server localhost:9092 \
  --topic order.created --from-beginning --group test-group
🧪 Test End-to-End in App (KafkaJS)
In your app:

ts
Copy
Edit
await produceKafkaEvent({
  topic: KAFKA_TOPICS.ORDER.CREATED,
  messages: [
    {
      key: 'order123',
      value: JSON.stringify({
        orderId: 'order123',
        userId: 'user789',
        createdAt: new Date().toISOString(),
      }),
    },
  ],
});
🛠️ Fix Common Errors
Command Not Found: Navigate to Kafka bin directory or add it to PATH.

Topic Doesn’t Exist: Create it using --create or enable auto.create.topics.enable=true (not recommended for prod).

"Property 'USER_CREATED' does not exist": Use KAFKA_TOPICS.EMAIL.USER_CREATED, not KAFKA_TOPICS.USER_CREATED.

📁 Optional: Add a Script for Topic Creation
Create a shell script to create all topics at once:

bash
Copy
Edit
# scripts/kafka-create-topics.sh
#!/bin/bash

BROKER=localhost:9092

topics=(
  "analytics.user.behavior"
  "cart.updated"
  "cart.checkedout"
  "email.user.created"
  "email.order.created"
  "email.payment.success"
  "invoice.generate"
  "invoice.generated"
  "invoice.failed"
  "notification.sent"
  "order.created"
  "order.status.updated"
  "order.cancelled"
  "payment.initiated"
  "payment.success"
  "payment.failed"
  "product.created"
  "product.updated"
  "product.deleted"
  "product.rated"
  "search.sync.product"
  "user.created"
  "user.updated"
  "user.deleted"
  "user.registered"
)

for topic in "${topics[@]}"
do
  ./kafka-topics.sh --bootstrap-server $BROKER \
    --create --if-not-exists --topic $topic \
    --partitions 1 --replication-factor 1
done
Make it executable:

bash
Copy
Edit
chmod +x scripts/kafka-create-topics.sh
Then run:

bash
Copy
Edit
./scripts/kafka-create-topics.sh