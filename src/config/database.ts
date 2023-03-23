import mongoose from "mongoose";

const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;

class Database {
  constructor() {
    this._connect();
  }

  _connect() {
    mongoose
      .connect(
        `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`
      )
      .then(() => {
        console.log("Database connection successful");
      })
      .catch((err) => {
        console.error(`Database connection error: ${err}`);
      });
  }
}

export default new Database();
