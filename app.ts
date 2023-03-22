import db from "./src/config/database";
import makeApp from "./index";

const httpServer = makeApp(db);

// server
const port = 3000;
httpServer.listen(port, () => {
  console.log(`Listening on port http://localhost:${port}`);
});
