import express, { Request, Response, Router } from "express";
import PassangerRoutes from "./src/api/routes/passangersRoute";
import DriverRoutes from "./src/api/routes/driversRoute";
import RideRoutes from "./src/api/routes/ridesRoute";
import db from "./src/config/database";
import socketioConfig from "./src/config/socket.io";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

// express app
const app = express();

// env
dotenv.config({ path: path.resolve(__dirname, "./.env") });

// cors
app.use(cors());

// body parser
app.use(express.json());

// routes
app.use("/users", PassangerRoutes);
app.use("/rides", RideRoutes);
app.use("/drivers", DriverRoutes);

// db connection
main().catch((err) => console.log(err));
async function main() {
  await db;
}

// socket.io
const httpServer = socketioConfig(app);

// server
const port = 3000;
httpServer.listen(port, () => {
  console.log(`Listening on port http://localhost:${port}`);
});
