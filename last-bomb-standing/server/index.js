import { Server } from "socket.io";
import http from "http";

const server = http.createServer();
const io = new Server(server, { cors: { origin: "*" } });

const gameState = {
  players: [],
  bombHolder: null,
};

io.on("connection", (socket) => {
  gameState.players.push(socket.id);
  if (!gameState.bombHolder) gameState.bombHolder = socket.id;
  io.emit("state", gameState);

  socket.on("giveBomb", player => {
    if(gameState.bombHolder !== socket.id) return;
    gameState.bombHolder = player;
    io.emit("state", gameState);
  })

  socket.on("disconnect", () => {
    gameState.players = gameState.players.filter((p) => p != socket.id);
    if (gameState.bombHolder === socket.id) {
      if (gameState.players.length > 0)
        gameState.bombHolder = gameState.players[
            Math.floor(Math.random() * gameState.players.length)
          ];
      else gameState.bombHolder = null;
    }
    io.emit("state", gameState);
  });
});

server.listen(3000, () => console.log("Server running on port 3000"));
