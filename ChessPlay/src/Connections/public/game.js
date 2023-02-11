let gameId;
let gameState;
let white;
let black;
let defaultBoard = [['br2','bk2','bb2','bqu','bki','bb1','bk1','br1'],
            ['bp8','bp7','bp6','bp5','bp4','bp3','bp2','bp1'],
            ['','','','','','','',''],
            ['','','','','','','',''],
            ['','','','','','','',''],
            ['','','','','','','',''],
            ['wp1','wp2','wp3','wp4','wp5','wp6','wp7','wp8'],
            ['wr1','wk1','wb1','wqu','wki','wb2','wk2','wr2']];



let squareNames = [['a8','b8','c8','d8','e8','f8','g8','h8'],
                        ['a7','b7','c7','d7','e7','f7','g7','h7'],
                        ['a6','b6','c6','d6','e6','f6','g6','h6'],
                        ['a5','b5','c5','d5','e5','f5','g5','h5'],
                        ['a4','b4','c4','d4','e4','f4','g4','h4'],
                        ['a3','b3','c3','d3','e3','f3','g3','h3'],
                        ['a2','b2','c2','d2','e2','f2','g2','h2'],
                        ['a1','b1','c1','d1','e1','f1','g1','h1']];


let boardToUse = [['br2','bk2','bb2','bqu','bki','bb1','bk1','br1'],
                ['bp8','bp7','bp6','bp5','bp4','bp3','bp2','bp1'],
                ['','','','','','','',''],
                ['','','','','','','',''],
                ['','','','','','','',''],
                ['','','','','','','',''],
                ['wp1','wp2','wp3','wp4','wp5','wp6','wp7','wp8'],
                ['wr1','wk1','wb1','wqu','wki','wb2','wk2','wr2']];

let squareNamesToUse = [['a8','b8','c8','d8','e8','f8','g8','h8'],
                        ['a7','b7','c7','d7','e7','f7','g7','h7'],
                        ['a6','b6','c6','d6','e6','f6','g6','h6'],
                        ['a5','b5','c5','d5','e5','f5','g5','h5'],
                        ['a4','b4','c4','d4','e4','f4','g4','h4'],
                        ['a3','b3','c3','d3','e3','f3','g3','h3'],
                        ['a2','b2','c2','d2','e2','f2','g2','h2'],
                        ['a1','b1','c1','d1','e1','f1','g1','h1']];

let beforeMove = [['br2','bk2','bb2','bqu','bki','bb1','bk1','br1'],
                    ['bp8','bp7','bp6','bp5','bp4','bp3','bp2','bp1'],
                    ['','','','','','','',''],
                    ['','','','','','','',''],
                    ['','','','','','','',''],
                    ['','','','','','','',''],
                    ['wp1','wp2','wp3','wp4','wp5','wp6','wp7','wp8'],
                    ['wr1','wk1','wb1','wqu','wki','wb2','wk2','wr2']];

let boardToSend =  [['br2','bk2','bb2','bqu','bki','bb1','bk1','br1'],
                    ['bp8','bp7','bp6','bp5','bp4','bp3','bp2','bp1'],
                    ['','','','','','','',''],
                    ['','','','','','','',''],
                    ['','','','','','','',''],
                    ['','','','','','','',''],
                    ['wp1','wp2','wp3','wp4','wp5','wp6','wp7','wp8'],
                    ['wr1','wk1','wb1','wqu','wki','wb2','wk2','wr2']];

let pawnsMoved = new Map();
let images = new Map();
let moved = false;
let pieceMoved;
let confirmedMove = false;
let yourTurn = false;
let inCheck = false;
let extraQueens = 0;
let extraRooks = 2;
let extraBishops = 2;
let extraKnights = 2;

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
    
    gameData[3] = gameData[3].toString();
    gameData[3] = gameData[3].replaceAll('[','');
    gameData[3] = gameData[3].replaceAll(']','');
    gameData[3] = gameData[3].split(",");
    let pm = [];
    for(i = 1; i < 32; i+=2){
        pm.push(gameData[3][i])
    }
    console.log(pm);
    let j = 1;
    for(i = 0; i < 16; i+=2){
        pawnsMoved.set('wp'+j, parseInt(pm[i]));
        j++;
    }
    j = 1;
    for(i = 1; i < 16; i+=2){
        pawnsMoved.set('bp'+j, parseInt(pm[i]));
        j++;
    }

    if(gameData[0][0] == '0'){
        white = gameData[0].split('.')[1];
        black = gameData[1].split('.')[1];
    }else{
        white = gameData[1].split('.')[1];
        black = gameData[0].split('.')[1];
    }
    if(gameState == 'new'){
        setupNewBoard();
    }else{
        setupExistingBoard(gameData[2]);
    }
    

});

socket.on('opponent-moved', board =>{
    yourTurn = true;
    confirmedMove = false;
    moved = false;
    updateBoard(board);
})


function setupNewBoard(){

    

    if(white.includes(userName)){

       
        for(i = 0; i < 8; i++){
            boardToUse[i] = [...defaultBoard[i]];
            squareNamesToUse[i] = [...squareNames[i]];
        }

        yourTurn = true;

        setSquares();
        displayBoard();
        
        
    }else{

        defaultBoard.reverse();
        squareNames.reverse();
        for(i = 0; i < 8; i++){
            defaultBoard[i].reverse();
            squareNames[i].reverse();
        }
        for(i = 0; i < 8; i++){
            boardToUse[i] = [...defaultBoard[i]];
            squareNamesToUse[i] = [...squareNames[i]];
        }

        yourTurn = false;

        setSquares();
        displayBoard();
    }
    
}

function setupExistingBoard(board){

    

    if(white == userName){
        for(i = 0; i < board.length; i++){
            boardToUse[i] = [...board[i]];
        }
    }else{
        board.reverse();
        for(i = 0; i < board.length; i++){
            board[i].reverse();
        }
        for(i = 0; i < board.length; i++){
            boardToUse[i] = [...board[i]];
        }
    }

    setSquares();
    displayBoard();


}

function setSquares(){
    for(i = 0; i < 8; i++){
        for(j = 0; j < 8; j++){
            document.getElementById("board").innerHTML += `<div class='square' id='`+squareNamesToUse[i][j]+`' ondrop="drop(event)" ondragover="allowDrop(event)"></div>`;
        }
    }
}

function updateBoard(board){

    board.reverse();
    for(i = 0; i < board.length; i++){
        board[i].reverse();
    }
    for(i = 0; i < 8; i++){
        boardToUse[i] = [...board[i]];
    }
    
    clearBoard();
    displayBoard();
}

function clearBoard(){

    for(i = 0; i < 8; i++){
        for(j = 0; j < 8; j++){
            document.getElementById(squareNamesToUse[i][j]).innerHTML = ``;
        }
    }


}

function displayBoard(){

    for(i = 0; i < 8; i++){
        for(j = 0; j < 8; j++){
            let img;
            if(images.has(boardToUse[i][j])){
                img = "assets/images/" + images.get(boardToUse[i][j]);
                if(boardToUse[i][j].includes('w') && userName == white){
                    document.getElementById(squareNamesToUse[i][j]).innerHTML = `<img id="`+boardToUse[i][j]+`"src="`+img+`" draggable="true" ondragstart="drag(event)" width='90px' height='90px'>`;
                }else if(!boardToUse[i][j].includes('w') && userName == white){
                    document.getElementById(squareNamesToUse[i][j]).innerHTML = `<img id="`+boardToUse[i][j]+`"src="`+img+`" draggable="false" width='90px' height='90px'>`;
                }else if(boardToUse[i][j].includes('w') && userName == black){
                    document.getElementById(squareNamesToUse[i][j]).innerHTML = `<img id="`+boardToUse[i][j]+`"src="`+img+`" draggable="false" width='90px' height='90px'>`;
                }else if(!boardToUse[i][j].includes('w') && userName == black){
                    document.getElementById(squareNamesToUse[i][j]).innerHTML = `<img id="`+boardToUse[i][j]+`"src="`+img+`" draggable="true" ondragstart="drag(event)" width='90px' height='90px'>`;
                }
                
            }
        }
    }


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
    
    if(!moved){
        if(data.includes('p')){
            if(ev.target.id.length == 3){
                canMove = canPawnMove(data,ev.target.parentNode.id);
            }else{
                canMove = canPawnMove(data,ev.target.id);
            }
        }
        if(canMove && yourTurn){
            if(ev.target.id.length == 3){
                ev.target.parentNode.replaceChild(document.getElementById(data),ev.target);
            }else{
                ev.target.appendChild(document.getElementById(data));
            }
            yourTurn = false;
            moved = true;
            pieceMoved = data;
        }
    }
    
    
}

function confirmMove(){
    confirmedMove = true;
    if(moved){
        socket.emit('user-moved', Opponents.get(gameId).split('.')[1], boardToUse);
        
        if(userName == white){
            socket.emit('update-game', gameId, boardToUse,[...pawnsMoved.entries()]);
        }else{
            for(i = 0; i < boardToUse.length; i++){
                boardToSend[i] = [...boardToUse[i]];
                boardToSend[i].reverse();
            }
            boardToSend.reverse();
            socket.emit('update-game', gameId, boardToSend , [...pawnsMoved.entries()]);
        }
        
    }else{
        alert('make a move!');
    }
    
}

function revertMove(){

    if(!confirmedMove && moved){
        yourTurn = true;
        moved = false;
        
        pawnsMoved.set(pieceMoved, pawnsMoved.get(pieceMoved)-1);
        
        for(i = 0; i < 8; i++){
            boardToUse[i] = [...beforeMove[i]];
        }
        clearBoard();
        displayBoard();
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
                if(i != 0){
                    if(boardToUse[i-1][j] != undefined && boardToUse[i-1][j] == ''){
                        legalMoves.push([i-1,j]);
                        if(i>1){
                            if(boardToUse[i-2][j] != undefined && boardToUse[i-2][j] == '' &&  pawnsMoved.get(pawn) == 0){
                                legalMoves.push([i-2,j]);
                            }
                        }
                    }
                    if(boardToUse[i-1][j-1] != undefined && boardToUse[i-1][j-1] != '' && boardToUse[i-1][j-1][0] != color ){
                        legalMoves.push([i-1,j-1]);
                    }
                    if(boardToUse[i-1][j+1] != undefined && boardToUse[i-1][j+1] != '' && boardToUse[i-1][j+1][0] != color){
                        legalMoves.push([i-1,j+1]);
                    }
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
            pawnsMoved.set(pawn,pawnsMoved.get(pawn)+1);
            for(i = 0; i < 8; i++){
                beforeMove[i] = [...boardToUse[i]];
            }
            boardToUse[target[0]][target[1]] = pawn;
            boardToUse[from[0]][from[1]] = '';
            break;
        }
    }
    

    return legal;
}


function pawnUpgrade(pawn){
    let upgradePawnElement = `<div id="upgradePawn"> <h2> Pawn Upgrade </h2> <select id="selectUpgrade"><option>Queen</option><option>Rook</option><option>Bishop</option><option>Knight</option></select><button onclick="setUpgrade('`+pawn+`')">Upgrade</button></div>`

    document.getElementById('body').innerHTML += upgradePawnElement;

}

function setUpgrade(pawn){

    let selected = $('#selectUpgrade').val();

    if(selected == 'Queen'){
        extraQueens++;
        selected = pawn[0] + 'q' + extraQueens;
        if(pawn[0] == 'w'){
            images.set(selected,'whiteQueen.png')
        }else{
            images.set(selected,'blackQueen.png')
        }
        
    }else if(selected == 'Rook'){
        extraRooks++;
        selected = pawn[0] + 'r' + extraRooks;
        if(pawn[0] == 'w'){
            images.set(selected,'whiteRook.png')
        }else{
            images.set(selected,'blackRook.png')
        }
    }else if(selected == 'Bishop'){
        extraBishops++;
        selected = pawn[0] + 'b' + extraBishops;
        if(pawn[0] == 'w'){
            images.set(selected,'whiteBishop.png')
        }else{
            images.set(selected,'blackBishop.png')
        }
    }else if(selected == 'Knight'){
        extraKnights++;
        selected = pawn[0] + 'k' + extraKnights;
        if(pawn[0] == 'w'){
            images.set(selected,'whiteKnight.png')
        }else{
            images.set(selected,'blackKnight.png')
        }
    }

    
    let img = "assets/images/" + images.get(selected);

    document.getElementById(pawn).outerHTML = `<img id="`+selected+`"src="`+img+`" draggable="true" ondragstart="drag(event)" width='90px' height='90px'>`;
    document.getElementById('upgradePawn').outerHTML = '';
    for(i = 0; i < boardToUse.length; i++){
        for(j = 0; j < boardToUse.length; j++){
            if(boardToUse[i][j] == pawn){
                boardToUse[i][j] = selected;
            }

        }
    }

}