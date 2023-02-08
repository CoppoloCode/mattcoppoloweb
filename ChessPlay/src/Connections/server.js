const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const mysql = require('mysql');
const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'chessplay'
});

con.connect((err) => {
    if (err) throw err;
    console.log('Connected!');
});



app.set('view engine' , 'ejs');
app.use(express.static('public'));



//req.params.room
app.get('/:room', (req, res) => {
    res.render('room', {lobbyId: 1})
})

io.users = new Map();
io.usersInLobby = new Map();
io.ongoingGames = new Map();

io.on('connection', socket => {

    socket.on('connected', (lobbyId, userId, userName) =>{

        while(io.users.has(userName)){
            userName = 'guest-' + Math.floor(Math.random() * 1000);
            io.to(userId).emit('new-guest-name', userName);
        }
        io.users.set(userName, userId);

        socket.on('join-lobby', (userName, userId) => {
            socket.join(lobbyId);
            io.usersInLobby.set(userName, userId);
            socket.to(lobbyId).emit('user-connected', userName);
            sendLobbyList(lobbyId);
            sendGameList(userName);

        })
       
        
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

            io.to(challengedId).emit('challengeAccepted', gameRoomId, challenger);
            io.to(challengerId).emit('challengeAccepted', gameRoomId, challenged);

        })

        socket.on('join-game' , (gameRoomId, user) =>{
            
            gameId = parseInt(gameRoomId);
            socket.leave(1);
            removeUserFromLobby(user);
            sendLobbyList(lobbyId);
            socket.join(gameId);
            socket.to(gameId).emit('join-game-message', gameId);

        })

        socket.on('send-message', (message, gameRoomId) =>{
            socket.to(parseInt(gameRoomId)).emit('recieve-message', message);
           
        })

        socket.on('leave-game', gameId =>{
            socket.leave(parseInt(gameId));
        })

        socket.on('get-opponent-name', (gameId, user) => {
            
            let names = io.ongoingGames.get(parseInt(gameId));
            if(names[0] === user){
                io.to(socket.id).emit('get-opponent-name', names[1]);
            }else{
                io.to(socket.id).emit('get-opponent-name', names[0]);
            }
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

con.query('SELECT * FROM users', (err,rows) => {
    if(err) throw err;
  
    console.log('Data received from Db:');
    console.log(rows);
});

server.listen(3000);


