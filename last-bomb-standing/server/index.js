import { Server } from "socket.io";
import http from "http";

const server = http.createServer();
const io = new Server(server, {cors : { origin : "*" }});

const gameState = {
    players: [],
    bombHolder: null,
};

io.on('connection', socket => {
    
    gameState.players.push(socket.id);
    console.log(socket.id + " joined!");
    console.log(`Current players : ${gameState.players}`);
    io.emit("state", gameState);

    socket.on('disconnect', () => {
        console.log(socket.id + " disconnected");
        gameState.players = gameState.players.filter(p => p != socket.id);
        io.emit("state", gameState);
    })
})

server.listen(3000, () => console.log("Server running on port 3000"));