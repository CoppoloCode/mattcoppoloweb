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

io.users = [];

io.on('connection', socket => {

    socket.on('join-room', (lobbyId, userId) =>{
        io.users.push(userId);
        socket.join(lobbyId);
        socket.to(lobbyId).emit('user-connected', userId);
        socket.on('disconnect', () => {
            socket.to(lobbyId).emit('user-disconnected', userId);
            for(i = 0; i < io.users.length; i++){
                if(io.users[i] == userId){
                    io.users.splice(i, 1);
                }
            }
            
        })
        

    })

    


    

})

server.listen(3000);

