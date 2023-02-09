
let gameState;
let white;
let black;
let board = [['br1','bk1','bb1','bq','bki','bb2','bk2','br2'],
            ['bp','bp','bp','bp','bp','bp','bp','bp'],
            ['','','','','','','',''],
            ['','','','','','','',''],
            ['','','','','','','',''],
            ['','','','','','','',''],
            ['wp','wp','wp','wp','wp','wp','wp','wp'],
            ['wr1','wk1','wb1','wq','wki','wb2','wk2','wr2']];




socket.on('game-data', gameData =>{

    white = gameData[0];
    black = gameData[1];
    gameState = gameData[2];
    
    setupBoard();

});


function setupBoard(){

    if(gameState === 'new'){

        if(userName == white){

            for(i = 0; i < 8; i++){
                for(j = 0; j < 8; j++){
                    document.getElementById(""+i+""+j).innerHTML = `<div class='piece' id='piece-`+board[i][j]+`'></div>`;
                }
            }


        }else{


        }
        

    }else{

    }

}