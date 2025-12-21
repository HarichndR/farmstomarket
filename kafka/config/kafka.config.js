const { Kafka } = require("kafkajs");

// Initialize Kafka
const kafka = new Kafka({
  clientId: "E-farm",
  brokers: ["broker1:9092"], // Ensure this address is correct
});

console.log("✅ Kafka connection initialized");

const producer = kafka.producer({
  allowAutoTopicCreation: true,
  transactionTimeout: 300000,
});

// Function to check Kafka connection and send a test message
const testKafkaConnection = async () => {
  try {
    await producer.connect();
    console.log("✅ Producer successfully connected to Kafka");

    // Send a test message to verify Kafka is working
    await producer.send({
      topic: "test",
      messages: [{ key: "1", value: "Kafka connection test message" }],
    });

    console.log("✅ Test message sent successfully!");

    await producer.disconnect();
    console.log("✅ Producer disconnected successfully");
  } catch (error) {
    console.error("❌ Kafka connection failed:", error.message);
  }
};
const consumer= kafka.consumer({groupId:'my-group'});

const consumertest=async()=>{
    await consumer.connect();
    console.log('consumer connected successfully');
    await consumer.subscribe({topics:['test'],fromBeginning: true});
    await consumer.run({
        eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
            console.log({
                key: message.key.toString(),
                value: message.value.toString(),
                headers: message.headers,
                partition:partition
            })
        },
    })
    
}
consumer.disconnect();
// Run the connection test
testKafkaConnection();
consumertest()
module.exports = kafka;
