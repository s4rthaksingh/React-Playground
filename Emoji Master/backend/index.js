const express = require('express');
const http = require('http');
const { Server } = require('socket.io');


const app = new express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
      origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
      methods: ['GET', 'POST'],
      allowedHeaders: ['*'],
      credentials: true,
    },
  });

const PORT = 3000;

gameStates = {};

io.on("connection", (socket) => {
    console.log("A new socket connected : ", socket.id);
    io.emit("newUser", socket.id)

    socket.on("joinRoom", (roomID) => {
      socket.join(roomID);
      if(!gameStates[roomID]){ gameStates[roomID] = {"players":[socket.id]};
      gameStates[roomID].leader = socket.id
    }
      else gameStates[roomID]["players"].push(socket.id);
      console.log(gameStates)
      io.to(roomID).emit("roomMessage", `${socket.id} joined the room`);
      io.to(roomID).emit("updateGameState", gameStates[roomID]);
    })
})

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`)
})