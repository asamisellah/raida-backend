import mongoose from "mongoose";


// env variables
const atlasServer = "41.80.114.50/32";
const server = "127.0.0.1:27017";
const database = "raida";
const user = "admin";
const password = "adCd84bJmcsGcY7e";

const atlasConn = `mongodb://${user}:${password}@${atlasServer}/${database}`;
const localConn = `mongodb://${server}/${database}`;


class Database {

  constructor() {
    this._connect();
  }

  _connect() {
    mongoose
      .connect(localConn)
      .then(() => {
        console.log("Database connection successful");
      })
      .catch((err) => {
        console.error(`Database connection error: ${err}`);
      });
  }
}

export default new Database();
