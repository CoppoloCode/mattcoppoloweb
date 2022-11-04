const gameScreen = document.getElementById('gameScreen');
const BG_COLOR = '#231f20';
const PLAYER_COLOUR = '#c2c2c2';
const FOOD_COLOUR = '#e66926';

const socket = io('http://localhost:3000', {transports: ['websocket']});

socket.on("connect_error", (err) => {
    console.log(`connect_error due to ${err.message}`);
  });

socket.on('init' , handleInit);
socket.on('gameState' , handleGameState);

let canvas, ctx, foodImg;
let keysPressed = {};

init();

function init(){

    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    canvas.width = canvas.height = 600;

    ctx.fillStyle = BG_COLOR;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    foodImg = document.getElementById("apple");

    
    document.addEventListener("keydown", (event) =>{
        keydown(event);
        document.addEventListener('keyup', (event) => {
            delete keysPressed[event.key];
        });
    });
    
}

function keydown(event){

    keysPressed[event.key] = true;

    console.log(event.keyCode);
    
    socket.emit('keydown', keysPressed);
    
    
}


function paintGame(state){
    ctx.fillStyle = BG_COLOR;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const food = state.food;
    const gridsize = state.gridsize;
    const size = canvas.width / gridsize;

    ctx.fillStyle = FOOD_COLOUR;
    ctx.drawImage(foodImg, food.x * size, food.y * size, size, size);
    paintPlayer(state.player, size, PLAYER_COLOUR);
}

function paintPlayer(playerState, size, colour){

    const player = playerState;
    ctx.fillStyle = colour;
    ctx.fillRect(player.pos.x * size, player.pos.y * size, size, size);

}

function handleInit(msg){
    console.log(msg);
}

function handleGameState(gameState){
    gameState = JSON.parse(gameState);
    requestAnimationFrame(() => paintGame(gameState));
}