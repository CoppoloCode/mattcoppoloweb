const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const {v4: uuidV4} = require('uuid');


app.set('view engine' , 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.redirect(`./${uuidV4()}`);
})

//req.params.room
app.get('/:room', (req, res) => {
    res.render('room', {lobbyId: 1})
})

io.userIds = [];
io.userNames = [];

io.on('connection', socket => {

    socket.on('join-room', (lobbyId, userId, userName) =>{

        io.userIds.push(userId);
        io.userNames.push(userName);

        socket.join(lobbyId);
        socket.to(lobbyId).emit('user-connected', userId);

        io.in(lobbyId).emit('send-users', io.userNames);

        socket.on('disconnect', () => {
            socket.to(lobbyId).emit('user-disconnected', userId);

            for(i = 0; i < io.userIds.length; i++){
                if(io.userIds[i] == userId){
                    console.log(io.userIds[i], userId);
                    io.userIds.splice(i,1);
                    io.userNames.splice(i,1);
                    
                }
            }
            console.log(io.userIds, io.userNames);
           
            io.in(lobbyId).emit('send-users', io.userNames);
        })
        
        socket.on('get-users', () =>{
            socket.emit('send-users', io.users);
        })
    })
        


    

})



server.listen(3000);

