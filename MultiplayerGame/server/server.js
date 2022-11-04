const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require("socket.io")(server, {
    cors: {
      origin: "http://localhost",
      methods: ["GET", "POST"],
      allowedHeaders: ["my-custom-header"],
      transports: ['websocket', 'polling'],
      credentials: true
    },
    allowEIO3: true
  });

const { createGameState, gameLoop, getUpdatedPos } = require('./game');
const { FRAME_RATE } = require('./constants');


io.on('connection', client => {
    const state = createGameState();

    client.on("keydown", handleKeyDown);

    function handleKeyDown(map) {
        getUpdatedPos(map, state);
    }

    startGameInterval(client, state);
});

function startGameInterval(client, state){
    const intervalId = setInterval(() => {
        const winner = gameLoop(state);

        if(!winner){
            client.emit('gameState', JSON.stringify(state))
        }else{
            client.emit('gameOver');
            clearInterval(intervalId);
        }

    }, 1000 / FRAME_RATE);
}



io.listen(3000);