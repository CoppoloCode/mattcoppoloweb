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

io.userIds = [];
io.userNames = [];
io.guestIds = new Set();

io.on('connection', socket => {

    
    socket.on('join-room', (lobbyId, userId, userName) =>{

        if(userName.includes("guest")){

            let isUnique = false;
            do{
                let randomId = Math.floor(Math.random() * 1000);
                if(io.guestIds.add(randomId)){
                    isUnique = true;
                    userName = userName + '-' + randomId;
                }
                
            }while(!isUnique);

            socket.emit("guest", userName);
        }

        io.userIds.push(userId);
        io.userNames.push(userName);

        socket.join(lobbyId);
        socket.to(lobbyId).emit('user-connected', userName);

        io.in(lobbyId).emit('send-users', io.userNames);

        socket.on('disconnect', () => {
            socket.to(lobbyId).emit('user-disconnected', userId);

            for(i = 0; i < io.userIds.length; i++){
                if(io.userIds[i] === userId){
                    io.userIds.splice(i,1);
                    if(io.userNames[i].includes("guest")){
                        let guestId = parseInt(io.userNames[i].split('-')[1]);
                        io.guestIds.delete(guestId);
                    }
                    io.userNames.splice(i,1);
                }
            }
           
            io.in(lobbyId).emit('send-users', io.userNames);
        })
        
        socket.on('get-users', () =>{
            socket.emit('send-users', io.userNames);
        })

        socket.on('challenge', (user, opponent) =>{
            let opponentId;
            for(i = 0; i < io.userNames.length; i++){
                if(opponent == io.userNames[i]){
                    opponentId = io.userIds[i];
                    break;
                }
            }
            
            io.to(opponentId).emit('incomingChallenge' , user);
            
        })

        socket.on('acceptChallenge', (challenger, challenged) =>{

            let challengerId;
            let challengedId;
            for(i = 0; i < io.userNames.length; i++){
                if(challenger == io.userNames[i]){
                    challengerId = io.userIds[i];
                    
                }
                if(challenged == io.userNames[i]){
                    challengedId = io.userIds[i];
                }
            }
            
            io.to(challengerId).emit('challengeAccepted');
            io.to(challengedId).emit('challengeAccepted');
            
        })

        
       
    })
    

})



server.listen(3000);

