import express, { Request, Response, Router } from "express";
import PassangerRoutes from "./src/api/routes/passangersRoute";
import DriverRoutes from "./src/api/routes/driversRoute";
import RideRoutes from "./src/api/routes/ridesRoute";
import socketioConfig from "./src/config/socket.io";
import cors from "cors";

export default function makeApp(database: any) {
  // express app
  const app = express();

  const db = database;

  // cors
  app.use(cors());

  // body parser
  app.use(express.json());

  // routes
  app.use("/users", PassangerRoutes);
  app.use("/rides", RideRoutes);
  app.use("/drivers", DriverRoutes);

  // socket.io
  const httpServer = socketioConfig(app);

  return httpServer;
}
