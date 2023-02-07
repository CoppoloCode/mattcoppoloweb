const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.set('view engine' , 'ejs');
app.use(express.static('public'));



//req.params.room
app.get('/:room', (req, res) => {
    res.render('room', {lobbyId: 1})
})

io.users = new Map();
io.usersInLobby = new Map();
io.ongoingGames = new Map();

io.on('connection',  socket => {

    socket.join('lobby');
    
    socket.on('join-room', (lobbyId, userId, userName) =>{

        while(io.users.has(userName)){
            userName = 'guest-' + Math.floor(Math.random() * 1000);
            io.to(userId).emit('new-guest-name', userName);
        }
        io.users.set(userName, userId);
        io.usersInLobby.set(userName, userId);
       

        socket.join(lobbyId);
        socket.to(lobbyId).emit('user-connected', userName);

        sendLobbyList(lobbyId);
        sendGameList(userName);

        socket.on('disconnect', () => {
            socket.to(lobbyId).emit('user-disconnected', userName);

            removeUsersFromServer(userName);
           
            sendLobbyList(lobbyId);
        })
        
        socket.on('get-users', () =>{
            sendLobbyList(lobbyId);
        })

        socket.on('challenge', (challenger, challenged) =>{

            let challengedId = io.usersInLobby.get(challenged);
           
            io.to(challengedId).emit('incomingChallenge' , challenger);
            
        })

        socket.on('acceptChallenge', (challenger , challenged) =>{

            let challengerId = io.usersInLobby.get(challenger);
            let challengedId = io.usersInLobby.get(challenged);
            
            let gameRoomId = Math.floor(Math.random() * 1000);
            while(io.ongoingGames.has(gameRoomId)){
                gameRoomId = Math.floor(Math.random() * 1000);
            }
            io.ongoingGames.set(gameRoomId,[challenger,challenged]);
            io.to(challengedId).emit('send-gameId', gameRoomId);
            io.to(challengerId).emit('challengeAccepted', gameRoomId, challenged);
        })

        socket.on('join-game' , (userName, gameRoomId) =>{
            
            socket.leave('lobby');
            removeUserFromLobby(userName);
            sendLobbyList(lobbyId);
            socket.join(gameRoomId);
            socket.to(gameRoomId).emit('join-game-message');

        })

        socket.on('send-message', (message, gameRoomId) =>{
            socket.to(gameRoomId).emit('recieve-message', message);
           
        })

       
    })



    

})

function removeUserFromLobby(userName){

    io.usersInLobby.delete(userName);
}

function removeUsersFromServer(userName){

    io.users.delete(userName);
    io.usersInLobby.delete(userName);  
    
}

function sendLobbyList(lobbyId){
    io.to(lobbyId).emit('send-users', [...io.usersInLobby.keys()]);
}

function sendGameList(userName){
    let userId = io.users.get(userName);
    let games = [...io.ongoingGames.values()];
    let gameIds = [...io.ongoingGames.keys()];
    let gameList = [];

    for(i = 0; i < games.length; i++){
        if(games[i][0] == userName || games[i][1] == userName){
            gameList.push(gameIds[i]);
        }
    }

    io.to(userId).emit('get-ongoingGames', gameList);
}

server.listen(3000);

