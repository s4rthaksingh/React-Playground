const express = require('express');
const http = require('http');

const app = new express();
const server = http.createServer(app);
const PORT = 3000;

app.get('/', (req,res) => {
    res.send("Hello World!")
})

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`)
})