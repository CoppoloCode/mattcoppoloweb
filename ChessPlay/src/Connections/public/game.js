let gameId;
let gameState;
let white;
let black;
let whiteBoard = [['br2','bk2','bb2','bqu','bki','bb1','bk1','br1'],
            ['bp8','bp7','bp6','bp5','bp4','bp3','bp2','bp1'],
            ['','','','','','','',''],
            ['','','','','','','',''],
            ['','','','','','','',''],
            ['','','','','','','',''],
            ['wp1','wp2','wp3','wp4','wp5','wp6','wp7','wp8'],
            ['wr1','wk1','wb1','wqu','wki','wb2','wk2','wr2']];

let blackBoard = [['wr2','wk2','wb2','wki','wqu','wb1','wk1','wr1'],
                ['wp8','wp7','wp6','wp5','wp4','wp3','wp2','wp1'],
                ['','','','','','','',''],
                ['','','','','','','',''],
                ['','','','','','','',''],
                ['','','','','','','',''],
                ['bp1','bp2','bp3','bp4','bp5','bp6','bp7','bp8'],
                ['br1','bk1','bb1','bki','bqu','bb2','bk2','br2']];






let whiteSquareNames = [['a8','b8','c8','d8','e8','f8','g8','h8'],
                        ['a7','b7','c7','d7','e7','f7','g7','h7'],
                        ['a6','b6','c6','d6','e6','f6','g6','h6'],
                        ['a5','b5','c5','d5','e5','f5','g5','h5'],
                        ['a4','b4','c4','d4','e4','f4','g4','h4'],
                        ['a3','b3','c3','d3','e3','f3','g3','h3'],
                        ['a2','b2','c2','d2','e2','f2','g2','h2'],
                        ['a1','b1','c1','d1','e1','f1','g1','h1']];

let blackSquareNames = [['h1','g1','f1','e1','d1','c1','b1','a1'],
                        ['h2','g2','f2','e2','d2','c2','b2','a2'],
                        ['h3','g3','f3','e3','d3','c3','b3','a3'],
                        ['h4','g4','f4','e4','d4','c4','b4','a4'],
                        ['h5','g5','f5','e5','d5','c5','b5','a5'],
                        ['h6','g6','f6','e6','d6','c6','b6','a6'],
                        ['h7','g7','f7','e7','d7','c7','b7','a7'],
                        ['h8','g8','f8','e8','d8','c8','b8','a8']];


let boardToUse;
let squareNamesToUse;
let pawnsMoved = new Map();

let images = new Map();

images.set('wp1','whitePawn.png');
images.set('wp2','whitePawn.png');
images.set('wp3','whitePawn.png');
images.set('wp4','whitePawn.png');
images.set('wp5','whitePawn.png');
images.set('wp6','whitePawn.png');
images.set('wp7','whitePawn.png');
images.set('wp8','whitePawn.png');
images.set('wr1','whiteRook.png');
images.set('wk1','whiteKnight.png');
images.set('wb1','whiteBishop.png');
images.set('wr2','whiteRook.png');
images.set('wk2','whiteKnight.png');
images.set('wb2','whiteBishop.png');
images.set('wqu','whiteQueen.png');
images.set('wki','whiteKing.png');

images.set('bp1','blackPawn.png');
images.set('bp2','blackPawn.png');
images.set('bp3','blackPawn.png');
images.set('bp4','blackPawn.png');
images.set('bp5','blackPawn.png');
images.set('bp6','blackPawn.png');
images.set('bp7','blackPawn.png');
images.set('bp8','blackPawn.png');
images.set('br1','blackRook.png');
images.set('bk1','blackKnight.png');
images.set('bb1','blackBishop.png');
images.set('br2','blackRook.png');
images.set('bk2','blackKnight.png');
images.set('bb2','blackBishop.png');
images.set('bqu','blackQueen.png');
images.set('bki','blackKing.png');

socket.on('game-data', (game, gameData) =>{

    gameId = game;
    gameState = gameData[2];
    if(gameData[0][0] == '0'){
        white = gameData[0];
        black = gameData[1];
    }else{
        white = gameData[1];
        black = gameData[0];
    }
    if(gameState == 'new'){
        setupNewBoard();
    }else{
        setupExistingBoard(gameData[2]);
    }
    

});


function setupNewBoard(){

    

    if(white.includes(userName)){


        for(i = 0; i < 8; i++){
            for(j = 0; j < 8; j++){
                document.getElementById("board").innerHTML += `<div class='square' id='`+whiteSquareNames[i][j]+`' ondrop="drop(event)" ondragover="allowDrop(event)"></div>`;
            }
        }
        for(i = 0; i < 8; i++){
            for(j = 0; j < 8; j++){
                let img;
                if(images.has(whiteBoard[i][j])){
                    img = "assets/images/" + images.get(whiteBoard[i][j]);
                    if(whiteBoard[i][j].includes('w')){
                        document.getElementById(whiteSquareNames[i][j]).innerHTML = `<img id="`+whiteBoard[i][j]+`"src="`+img+`" draggable="true" ondragstart="drag(event)" width='90px' height='90px'>`;
                    }else{
                        document.getElementById(whiteSquareNames[i][j]).innerHTML = `<img id="`+whiteBoard[i][j]+`"src="`+img+`" draggable="false" width='90px' height='90px'>`;

                    }
                    
                }
            }
        }
        
        boardToUse = whiteBoard;
        squareNamesToUse = whiteSquareNames;


    }else{

        for(i = 0; i < 8; i++){
            for(j = 0; j < 8; j++){
                document.getElementById("board").innerHTML += `<div class='square' id='`+blackSquareNames[i][j]+`' ondrop="drop(event)" ondragover="allowDrop(event)"></div>`;
            }
        }
        for(i = 0; i < 8; i++){
            for(j = 0; j < 8; j++){
                let img;
                if(images.has(blackBoard[i][j])){
                    img = "assets/images/" + images.get(blackBoard[i][j]);
                    if(!blackBoard[i][j].includes('w')){
                        document.getElementById(blackSquareNames[i][j]).innerHTML = `<img id="`+blackBoard[i][j]+`"src="`+img+`" draggable="true" ondragstart="drag(event)" width='90px' height='90px'>`;
                    }else{
                        document.getElementById(blackSquareNames[i][j]).innerHTML = `<img id="`+blackBoard[i][j]+`"src="`+img+`" draggable="false" width='90px' height='90px'>`;

                    }
                }
            }
        }
        
        boardToUse = blackBoard;
        squareNamesToUse = blackSquareNames;
    }
    
}

function setupExistingBoard(board){




}


function allowDrop(ev) {
    ev.preventDefault();
}
  
function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    let canMove = false;

    if(data.includes('p')){
        if(ev.target.id.length == 3){
            canMove = canPawnMove(data,ev.target.parentNode.id);
        }else{
            canMove = canPawnMove(data,ev.target.id);
        }
        
    }
    if(canMove){
        if(ev.target.id.length == 3){
             ev.target.parentNode.replaceChild(document.getElementById(data),ev.target);  
        }else{
            ev.target.appendChild(document.getElementById(data));
        }
       
    }
    
    
}

function canPawnMove(pawn,square){

    let color = pawn[0];
    let legalMoves = [];
    let legal = false;
    let from;
    let target;

    for(i = 0; i < boardToUse.length; i++){
        for(j = 0; j < boardToUse.length; j++){
            if(boardToUse[i][j] == pawn){
                from = [i,j];
                if(boardToUse[i-1][j] == '' && boardToUse[i-1][j] != undefined){
                    legalMoves.push([i-1,j]);
                    if(boardToUse[i-2][j] == '' && boardToUse[i-2][j] != undefined && !pawnsMoved.has(pawn)){
                        legalMoves.push([i-2,j]);
                    }
                }
                if(boardToUse[i-1][j-1] != '' && boardToUse[i-1][j-1] != undefined && boardToUse[i-1][j-1][0] != color ){
                    legalMoves.push([i-1,j-1]);
                }
                if(boardToUse[i-1][j+1] != '' && boardToUse[i-1][j+1] != undefined && boardToUse[i-1][j+1][0] != color){
                    legalMoves.push([i-1,j+1]);
                }

            }

        }
    }
    for(i = 0; i < squareNamesToUse.length; i++){
        for(j = 0; j < squareNamesToUse.length; j++){
            if(squareNamesToUse[i][j] == square){
                target = [i,j];
            }
        }
    }

    

    for(i = 0; i < legalMoves.length; i++){
        if(target[0] == legalMoves[i][0] && target[1] == legalMoves[i][1]){
            legal = true;
            pawnsMoved.set(pawn,true);
            boardToUse[target[0]][target[1]] = pawn;
            boardToUse[from[0]][from[1]] = '';
            break;
        }
    }

    console.log(legalMoves,target, legal);
    return legal;
}