const socket = io('/');
const myPeer = new Peer(undefined,{
    host: '/',
    port: '3001'
})

let userName = "" + window.location.href.split('/')[3];
let inGame = false;
let gameRoomId;
let opponentName;

myPeer.on('open',() => {
    if(socket.id == null){
        location.assign('http://localhost:3000/'+ userName);
    }
    socket.emit('join-room', LOBBY_ID, socket.id, userName);
    setupLobby();
})

socket.on('user-connected', user => {
    console.log("User connected: " + user);
})

socket.on('new-guest-name', newName => {
    userName = newName;
    history.pushState(null,'','/'+userName);
})

socket.on('send-users', userList => {
    setupLobbyList(userList);
})

socket.on('get-ongoingGames', games => {
    setupGameList(games);
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

socket.on('challengeAccepted' , (gameId, opponentUserName) =>{
    opponentName = opponentUserName;
    setupGameRoom();
    inGame = true;
    gameRoomId = gameId;
    socket.emit('join-game', userName, gameRoomId);
    
})

socket.on('send-gameId', gameId => {
    socket.emit('join-game', userName, gameId);
    gameRoomId = gameId;
    setupGameRoom();
    inGame = true;
})

socket.on('join-game-message', ()=> {
    console.log('user connected to game');
})

socket.on('recieve-message', message =>{
    placeMessage(message, true);
})

function setupLobby(){
    document.getElementById('body').innerHTML = `<h1>Lobby</h1>
                                                <div id="room">
                                                    <select id="list"></select>
                                                </div>
                                                <div id="buttons">
                                                    <button onclick="getUsers()">Refresh</button>
                                                    <button onclick="challengeUser()">Challenge</button>
                                                </div>
                                                <div id="requests"></div>`
}

function setupLobbyList(userList){
    if(!inGame){
        document.getElementById('list').innerHTML = ``;
        for(i = 0; i < userList.length; i++){
            if(userList[i] !== userName){
                document.getElementById('list').innerHTML += `<option>` + userList[i] + `</option>`;
            }
        }
    }
}

function setupGameList(gameList){

    console.log(gameList);

}

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
    opponentName = challenger;
}

function decline(challenger){
    document.getElementById(challenger).outerHTML = "";
}

function setupGameRoom(){
    document.getElementById("body").innerHTML = "<div id='gameRoom'><div id='game'></div><div id='chat'><div id='messages'></div><input type='text' id='messageToSend'></input><button id='sendMessage' onclick='sendMessage()'>send</button></div></div>";
    input = document.getElementById('messageToSend');
    input.addEventListener("keypress", function(event) {
    
    if (event.key === "Enter") {
      event.preventDefault();
      document.getElementById("sendMessage").click();
    }
});
}

function sendMessage(){
    let message = document.getElementById('messageToSend').value;
    document.getElementById('messageToSend').value = "";
    socket.emit('send-message', message, gameRoomId);
    placeMessage(message , false);
}

function placeMessage(message, opponent){
    if(opponent == true){
        document.getElementById('messages').innerHTML += `<p id='opponentMessage'>`+ opponentName + `: ` + message + `</p>`;
    }else{
        document.getElementById('messages').innerHTML += `<p id='selfMessage'>`+ userName + `: ` + message + `</p>`;
    }
   
}
