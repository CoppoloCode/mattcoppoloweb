const socket = io('/');
const myPeer = new Peer(undefined,{
    host: '/',
    port: '3001'
})

let userName = "" + window.location.href.split('/')[3];

myPeer.on('open',() => {
    socket.emit('join-room', LOBBY_ID, socket.id, userName);
})

socket.on("guest", guest =>{
    userName = guest;
})

socket.on('user-connected', user => {
    console.log("User connected: " + user);
})

socket.on('send-users', userList => {
    
    document.getElementById('list').innerHTML = ``;
    for(i = 0; i < userList.length; i++){
        
        if(userList[i] !== userName){
            document.getElementById('list').innerHTML += `<option>` + userList[i] + `</option>`;
        }
    }
})

socket.on('user-disconnected', userId => {
    console.log('user: ' + userId +   ' disconnected');
})

socket.on('incomingChallenge', user => {
    console.log(user + " has challenged you to a game.");
})

function getUsers() {

    socket.emit('get-users');

}

function challengeUser(){
    let opponent = $('#list').val();
    socket.emit('challenge', userName, opponent);

}