const socket = io('/');
const myPeer = new Peer(undefined,{
    host: '/',
    port: '3001'
})
const userName = "" + window.location.href.split('/')[3];

myPeer.on('open', id => {
    socket.emit('join-room', LOBBY_ID, id, userName);
})


socket.on('user-connected', userId => {
    console.log("User connected: " + userId);
})

socket.on('send-users', userList => {
    console.log(userList);
    document.getElementById('room').innerHTML = ``;
    document.getElementById('room').innerHTML += `<h1>` + userList + `</h1>`;
    
    
})

socket.on('user-disconnected', userId => {
    console.log('user: ' + userId +   ' disconnected');
})

function getUsers() {

    socket.emit('get-users');

}