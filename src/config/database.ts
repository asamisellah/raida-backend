import mongoose from "mongoose";

// env variables

class Database {
  constructor() {
    this._connect();
  }

  _connect() {
    mongoose
      .connect("mongodb://admin:root@127.0.0.1:27017/raida")
      .then(() => {
        console.log("Database connection successful");
      })
      .catch((err) => {
        console.error(`Database connection error: ${err}`);
      });
  }
}

export default new Database();
