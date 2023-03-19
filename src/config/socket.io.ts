import { createServer } from "http";
import { Server } from "socket.io";

export default function socketioConfig(app: any) {
  const httpServer = createServer(app);

  const io = new Server(httpServer, {
    /* options */
    cors: {
      origin: "https://example.com",
    },
  });

  // @ts-ignore
  io.on("connection", (socket) => {
    console.log(socket.id);
    socket.on("chat message", (message) => {
      console.log(`Received message: ${message}`);
      // Handle incoming messages here...
    });
    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
    socket.disconnect();
  });

  return httpServer;
}
