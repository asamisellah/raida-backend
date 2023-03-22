import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongodb: any;

// connect to db
const connect = async () => {
  mongodb = await MongoMemoryServer.create();
  const uri = mongodb.getUri();
  console.log(uri);
  // (global as any).__MONGOINSTANCE = mongodb;
  await mongoose
    .connect(`${uri}raida`)
    .then(() => {
      console.log("Connected to test db");
    })
    .catch((err) => {
      console.log(err);
    });
};

// disconnect and close connextion
const closeDatabase = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  mongodb.stop();
};

// clear db and remove all data
const clearDatabase = async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
};

export default { connect, closeDatabase, clearDatabase };
