import { Server } from "socket.io";
import http from "http";

const server = http.createServer();
const io = new Server(server, { cors: { origin: "*" } });

const rooms = {};

io.on("connection", (socket) => {
  console.log("Connected:", socket.id);

  io.on("move", (mover, position) => {
    io.emit("move", (mover, position));
  })

});

server.listen(3000, () => console.log("Server running on 3000"));
