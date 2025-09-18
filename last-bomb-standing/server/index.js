import { Server } from "socket.io";
import http from "http";

const server = http.createServer();
const io = new Server(server, {cors : { origin : "*" }});

const rooms = {};

io.on('connection', socket => {
    console.log(socket.id + " connected!");
})

server.listen(3000, () => console.log("Server running on port 3000"));