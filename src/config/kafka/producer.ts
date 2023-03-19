// import { producer } from ".";

// producer.on("ready", function () {
//   console.log("Kafka Producer is connected and ready.");
// });

// producer.on("error", function (error) {
//   console.error(error);
// });

// const KafkaService = {
//   // @ts-ignore
//   sendRecord: ({ type, userId, sessionId, data }, callback = () => {}) => {
//     if (!userId) {
//       // return callback(() => {});
//     }

//     const event = {
//       timestamp: Date.now(),
//       userId: userId,
//       sessionId: sessionId,
//       type: type,
//       data: data,
//     };
//     // @ts-ignore
//     const buffer = new Buffer.from(JSON.stringify(event));

//     // Create a new payload
//     const record = [
//       {
//         topic: "webevents.dev",
//         messages: buffer,
//         attributes: 1 /* Use GZip compression for the payload */,
//       },
//     ];

//     //Send record to Kafka and log result/error
//     producer.send(record, callback);
//   },
// };

// console.log("producer....");

// const payloads = [
//   { topic: "update-location", messages: ["Hello from the other side!!!!"] },
// ];

// export const sendmsg = () => {
//   try {
//     producer.send(payloads, (err, data) => {
//       if (err) {
//         console.error("Failed to send message", err);
//         // res.status(500).send('Failed to send message');
//       } else {
//         console.log("Message sent successfully", data);
//         // res.send('Message sent successfully');
//       }
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };
