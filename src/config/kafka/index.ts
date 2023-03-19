// // import { Kafka } from "kafkajs";

// const Kafka = require('kafkajs').Kafka;
// const { CompressionTypes } = require('kafkajs')
// // This creates a client instance that is configured to connect to the Kafka broker provided by
// // the environment variable KAFKA_BOOTSTRAP_SERVER
// const kafka = new Kafka({
//   clientId: "update-location",
//   brokers: ["localhost:9092"],
// });

// const topic = "update-location";

// const producer = kafka.producer();

// const consumer = kafka.consumer({ groupId: topic });

// const admin = kafka.admin()

// const sendMessage = () => {
//   return producer
//     .send({
//       topic,
//       compression: CompressionTypes.GZIP,
//       messages: [{
//         value: 'hello'
//       }],
//     })
//     .then(console.log)
//     .catch((e) => console.error(`[example/producer] ${e.message}`, e));
// };

// const run = async () => {
//   await admin.connect()

//   await producer.connect();

//   setInterval(sendMessage, 3000);

//   // await producer.disconnect();

//   await consumer.connect();
//   await consumer.subscribe({ topic: topic, fromBeginning: true });

//   // await consumer.run({
//   //   eachMessage: async ({ topic, partition, message }) => {
//   //     console.log({
//   //       value: message?.value?.toString(),
//   //     });
//   //   },
//   // });

// };

// run().catch(err => console.log("Kafka", err));
