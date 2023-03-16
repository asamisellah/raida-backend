import express from "express";
import passangersRoute from "./routes/passangersRoute";
import ridesRoute from "./routes/ridesRoute";
import driversRoute from "./routes/driversRoute";
import db from "./database";

const app = express();

app.use(express.json());
app.use("/users", passangersRoute);
app.use("/rides", ridesRoute);
app.use("/drivers", driversRoute);

main().catch((err) => console.log(err));

async function main() {
  await db;
}

const port = 3000;
app.listen(port, () => {
  console.log(`Listening on port http://localhost:${port}`);
});
