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

io.on("connection", (socket) => {
    console.log("A new socket connected : ", socket.id);
    io.emit("newUser", socket.id)
})

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`)
})