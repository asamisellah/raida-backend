import { createServer } from "http";
import { Server } from "socket.io";

let io: Server;

function socketioConfig(app: any) {
  const httpServer = createServer(app);
  io = new Server(httpServer, {
    /* options */
    cors: {},
  });

  return httpServer;
}

export { io };

export default socketioConfig;
