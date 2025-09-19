import { Server } from "socket.io";
import http from "http";

const server = http.createServer();
const io = new Server(server, { cors: { origin: "*" } });

const rooms = {};

io.on("connection", (socket) => {
  console.log("Connected:", socket.id);
});

server.listen(3000, () => console.log("Server running on 3000"));
