import { Server } from "socket.io";
import http from "http";

const server = http.createServer();
const io = new Server(server, { cors: { origin: "*" } });

const gameState = {
  players: [],
  bombHolder: null,
  gameActive: false,
};

io.on("connection", (socket) => {
  
  io.emit("state", gameState);

  socket.on("joinGame", (playerName) => {
    const player = {id:socket.id, name:playerName}
    gameState.players.push(player);
    if (!gameState.bombHolder)
      {
        gameState.bombHolder = socket.id;
        gameState.leader = socket.id;
      }
    io.emit("state", gameState);
  })

  socket.on("startGame", () => {

  })


  socket.on("giveBomb", targetplayerID => {
    if(gameState.bombHolder !== socket.id) return;
    gameState.bombHolder = targetplayerID;
    io.emit("state", gameState);
  })

  socket.on("disconnect", () => {
    gameState.players = gameState.players.filter((p) => p.id != socket.id);
    if (gameState.bombHolder === socket.id) {
      if (gameState.players.length > 0)
        gameState.bombHolder = gameState.players[
            Math.floor(Math.random() * gameState.players.length)
          ].id;
      else gameState.bombHolder = null;
    }
    if (gameState.leader === socket.id) {
      if (gameState.players.length > 0)
        gameState.leader = gameState.players[
            Math.floor(Math.random() * gameState.players.length)
          ].id;
      else gameState.leader = null;
    }
    io.emit("state", gameState);
  });
});

server.listen(3000, () => console.log("Server running on port 3000"));
