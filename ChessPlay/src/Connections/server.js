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


getGamesFromDB();


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

            let determineColor = Math.floor(Math.random()*2);
            challenger = determineColor+'.'+challenger;
            if(determineColor == 0){
                determineColor++;
            }else{
                determineColor--;
            }
           
            io.to(challengedId).emit('challengeAccepted', gameRoomId, challenger);
            io.to(challengerId).emit('challengeAccepted', gameRoomId, challenged); 

            challenged = determineColor+'.'+challenged;
            addGametoDB(gameRoomId, challenger, challenged, "new", `[['wp1',0],['bp1',0],['wp2',0],['bp2',0],['wp3',0],['bp3',0],['wp4',0],['bp4',0],['wp5',0],['bp5',0],['wp6',0],['bp6',0],['wp7',0],['bp7',0],['wp8',0],['bp8',0]]`);
            getGamesFromDB();

        })

        socket.on('join-game' , (gameRoomId, user) =>{
            
            gameId = parseInt(gameRoomId);
            socket.leave(1);
            removeUserFromLobby(user);
            sendLobbyList(lobbyId);
            socket.join(gameId);
            socket.to(gameId).emit('join-game-message', gameId);
            io.to(gameId).emit('game-data', gameId, io.ongoingGames.get(gameId));

        })

        socket.on('send-message', (message, gameRoomId) =>{
            socket.to(parseInt(gameRoomId)).emit('recieve-message', message);
           
        })

        socket.on('user-moved', (user, board)=>{
            io.to(io.users.get(user)).emit('opponent-moved', board);
        })

        socket.on('update-game', (gameId, board, pawnsMoved) =>{
            io.ongoingGames.set(gameId,[io.ongoingGames.get(gameId)[0],io.ongoingGames.get(gameId)[1],board,pawnsMoved]);
        })

        socket.on('leave-game', gameId =>{
            socket.leave(parseInt(gameId));
        })

        socket.on('resign', (gameId, opponent) => {

            removeGameFromDB(gameId);
            io.to(io.users.get(opponent)).emit('opponent-resign');

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

 function sendGameList  (userName){

    let userId = io.users.get(userName);
    let games = [...io.ongoingGames.values()];
    let gameIds = [...io.ongoingGames.keys()];
    let gameList = [];
    let opponents = [];

    for(i = 0; i < games.length; i++){
        if(games[i][0].includes(userName)){
            gameList.push(gameIds[i]);
            opponents.push(games[i][1]);
        }
        else if(games[i][1].includes(userName)){
            gameList.push(gameIds[i]);
            opponents.push(games[i][0]);
        }
    }

    io.to(userId).emit('get-ongoingGames', gameList, opponents);
}

function getGamesFromDB () {

    return con.query('SELECT * FROM games', (err,rows) => {
        if(err) throw err;
    
        if(rows.length > 0){
            for(i = 0; i < rows.length; i++){
                io.ongoingGames.set(rows[i]['id'], [rows[i]['challenger'], rows[i]['challenged'], rows[i]['positions'], rows[i]['pawnsMoved']]);
            }
            
        }
        console.log(io.ongoingGames);
        
    });


}

function addGametoDB(gameRoomId, challenger, challenged, gameState, pawnsMoved){

    let sql = 'INSERT INTO games (id, challenger, challenged, positions, pawnsMoved) VALUES (?,?,?,?,?)';
    let values = [parseInt(gameRoomId), challenger, challenged, gameState, pawnsMoved];
    io.ongoingGames.set(gameRoomId, [challenger, challenged, gameState, pawnsMoved]);

    con.query(sql, values, (err,rows) => {
        if(err) throw err;
    
        console.log("added game to db");
    
    });


}

function removeGameFromDB(gameId){

    let sql = 'DELETE FROM games WHERE id = ?';
    let values = [gameId];
    io.ongoingGames.delete(gameId);

    con.query(sql, values, (err,rows) => {
        if(err) throw err;
    
        console.log("game removed from db");
    
    });

}



server.listen(3000);


