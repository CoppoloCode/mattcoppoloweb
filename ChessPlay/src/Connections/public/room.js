const socket = io('/');
const myPeer = new Peer(undefined,{
    host: '/',
    port: '3001'
})

let userName = "" + window.location.href.split('/')[3];
let inGame = false;

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
    if(!inGame){
        document.getElementById('list').innerHTML = ``;
        for(i = 0; i < userList.length; i++){
            
            if(userList[i] !== userName){
                document.getElementById('list').innerHTML += `<option>` + userList[i] + `</option>`;
            }
        }
    }
    
})

socket.on('user-disconnected', userId => {
    console.log('user: ' + userId +   ' disconnected');
})

socket.on('incomingChallenge', user => {
    if(!inGame){
        if(!document.getElementById(user)){
            document.getElementById("requests").innerHTML += '<div id="' + user +'"><p>' + user + ' has challenged you to a game. </p><button onclick="accept(this.parentNode.id)">Accept</button><button onclick="decline(this.parentNode.id)">Decline</button> </div>';
        }
    }
    
})

socket.on('challengeAccepted' , () =>{

    document.getElementById("body").innerHTML = "<div id='game'></div>";
    inGame = true;
    
})



function getUsers() {

    socket.emit('get-users');

}

function challengeUser(){
    let opponent = $('#list').val();
    socket.emit('challenge', userName, opponent);

}

function accept(challenger){
    document.getElementById(challenger).outerHTML = "";
    socket.emit('acceptChallenge', challenger, userName);
}

function decline(challenger){
    document.getElementById(challenger).outerHTML = "";
}