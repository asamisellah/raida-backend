import express, { Request, Response, Router } from "express";
import PassangerRoutes from "./src/api/routes/passangersRoute";
import DriverRoutes from "./src/api/routes/driversRoute";
import RideRoutes from "./src/api/routes/ridesRoute";
import db from "./src/config/database";
import socketioConfig from "./src/config/socket.io";
import cors from "cors";

const app = express();

app.use(cors());

app.use(express.json());
app.use("/users", PassangerRoutes);
app.use("/rides", RideRoutes);
app.use("/drivers", DriverRoutes);

main().catch((err) => console.log(err));

async function main() {
  await db;
}

app.get("/", (request: Request, response: Response) => {
  response.sendFile(__dirname + "/frontend/socket.io.html");
});

const httpServer = socketioConfig(app);

const port = 3000;
httpServer.listen(port, () => {
  console.log(`Listening on port http://localhost:${port}`);
});
