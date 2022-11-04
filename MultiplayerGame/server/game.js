const { GRID_SIZE } = require('./constants');

module.exports = {
    createGameState,
    gameLoop,
    getUpdatedPos,
}

function createGameState(){
    return {
        player:{
            pos:{
                x:3,
                y:10,
            },
            attributes: {
                health: 100,
                mana: 100,
                dmg: 1,
            }
        },
        food: {
            x: 7,
            y: 7,
        },
        gridsize: GRID_SIZE,
    };
}

function gameLoop(state){
    if(!state) {
        return;
    }

    const playerOne = state.player;
   

    if(playerOne.pos.x < 0 || playerOne.pos.x > GRID_SIZE || playerOne.pos.y < 0 || playerOne.pos.y > GRID_SIZE){
        return 2;
    }
    if(state.food.x === playerOne.pos.x && state.food.y === playerOne.pos.y){
        if(playerOne.attributes.health > 75){
            playerOne.attributes.health = 100;
        }else{
            playerOne.attributes.health += 25;
        }
        randomFood(state);
    }

    return false;
}

function randomFood(state){
    food={
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
    }
    
    if(state.player.pos.x === food.x && state.player.pos.y === food.y){
        return randomFood(state);
    }
    
    state.food = food;
}

function getUpdatedPos(keyCodes, state){
    console.log(keyCodes);
        if(keyCodes['w'] == true){
            state.player.pos.y -= .1; //up
        }
        if(keyCodes['a'] == true){
            state.player.pos.x -= .1; //left
        }
        if(keyCodes['s'] == true){ 
            state.player.pos.y += .1; //down
        }
        if(keyCodes['d'] == true){
            state.player.pos.x += .1; //right
        }
       
    
}