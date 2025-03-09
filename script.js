
let popup = document.getElementById("popup");
let timerElement = document.getElementById("timer");
var candies = ["blue", "Orange", "Red", "Yellow"];
var board = [];
var row = 9;
var col = 9;
var currTile;
var otherTile;
var score = 0;
var timeleft = 30;
var timerInterval;
window.onload = function () {
    startGame();   
};
function startTimer() {   
  let timerElement = document.getElementById("timer");
  let warningElement = document.getElementById("warning");
  timerInterval = setInterval(() => {
      if (timeleft > 0) {
          timeleft--;
          timerElement.innerText = `Time left: ${timeleft}`;
       if(timeleft <= 5 ){
        timerElement.classList.add("warning");
        warningElement.style.display="block";
    }
      if (timeleft == 0){ 
        clearInterval(timerInterval);
           timerElement.classList.remove("warning");
             warningElement.style.display="none";
           openPopup(); 
     } 
    }
      else {
          clearInterval(timerInterval); 
                    openPopup();  
      }
  }, 1000);
} 
function openPopup() {
  let popup = document.getElementById("popup");
  popup.style.display = "block";  
  document.getElementById("finalScore").innerText = document.getElementById("score").innerText;
}
function closePopup() {
  document.getElementById("popup");
  popup.style.display = "none";
  resetGame();   
} 
 function endGame (){
  alert("Time is up ! Your final score is " + score);
  recordscore();
 }
 function recordscore(){  
  resetGame();
 }function startGamePlay() {
    clearInterval(timerInterval); 
    timeleft = 20; 
    document.getElementById("timer").innerText = `Time left: ${timeleft}`;
    score = 0; 
    document.getElementById("score").innerText = score;
    board = [];
    document.getElementById("board").innerHTML = "";
    startGame(); 
    startTimer();
    document.getElementById("popup").style.display = "none";}

function randomCandy() {
    return candies[Math.floor(Math.random() * candies.length)];
}
function startGame() {
    let boardDiv = document.getElementById("board");
    for (let r = 0; r < row; r++) {
        let rowArr = [];
        for (let c = 0; c < col; c++) {
            let candy = document.createElement("img");
            candy.id = r + "-" + c;
            candy.src = "./images/"+ randomCandy() + ".jpg"; 
            candy.setAttribute("draggable", "true");
            candy.addEventListener("dragstart", dragStart);
            candy.addEventListener("dragover", dragOver);
            candy.addEventListener("dragenter", dragEnter);
            candy.addEventListener("dragleave", dragLeave);
            candy.addEventListener("drop", dragDrop);
            candy.addEventListener("dragend", dragEnd);
            boardDiv.appendChild(candy);
            rowArr.push(candy);
        }
        board.push(rowArr);
    }
}
function dragStart() { currTile = this; }
function dragOver(e) { e.preventDefault(); }
function dragEnter(e) { e.preventDefault(); }
function dragLeave() {}
function dragDrop() { otherTile = this; }
function dragEnd() {
    let currCoords = currTile.id.split("-");
    let r = parseInt(currCoords[0]);
    let c = parseInt(currCoords[1]);
    let otherCoords = otherTile.id.split("-");
    let r2 = parseInt(otherCoords[0]);
    let c2 = parseInt(otherCoords[1]);
    let moveLeft = c2 == c-1  && r == r2;
    let moveRight = c2 == c+1 && r == r2;
    let moveUp = r2 == r-1 && c == c2;
    let moveDown = r2 == r+1 && c == c2;
    let isAdjacent = moveLeft || moveRight || moveUp || moveDown;
    
    if (isAdjacent) {
        let currImg = currTile.src;
        let otherImg = otherTile.src;
        currTile.src = otherImg;
        otherTile.src = currImg;
        let validmove = checktrue();
        if(!validmove){
          let currImg = currTile.src;
          let otherImg = otherTile.src;
          currTile.src = otherImg;
          otherTile.src = currImg;
        }
        else{
            crushCandy();
            applyGravity();
        }
    }
}

function crushCandy(){
    crushThree();
    morecandy();
    document.getElementById("score").innerText= score;
}

function crushThree(){
    for (let r = 0; r < row; r++){
        for (let c = 0; c < col - 2; c++){
            let candy1 = board[r][c];
            let candy2 = board[r][c+1];
            let candy3 = board[r][c+2];
            if(candy1 && candy2 && candy3 && 
                candy1.src == candy2.src && candy2.src == candy3.src && 
                !candy1.src.includes("blank")) {
                candy1.src = "./images/blank.jpg";
                candy2.src = "./images/blank.jpg";
                candy3.src = "./images/blank.jpg";
                score +=1;
            }
        }
    }

    for (let c = 0; c < col; c++){
        for (let r = 0; r < row - 2; r++){
            let candy1 = board[r][c];
            let candy2 = board[r+1][c];
            let candy3 = board[r+2][c];
            if(candy1 && candy2 && candy3 && 
                candy1.src == candy2.src && candy2.src == candy3.src && 
                !candy1.src.includes("blank")) {
                candy1.src = "./images/blank.jpg";
                candy2.src = "./images/blank.jpg";
                candy3.src = "./images/blank.jpg";
                score +=1;
            }
        }
    }
}function morecandy(){
  for (let c = 0; c < col; c++) {
     let emptySpaces = 0;
     for (let r = row - 1; r >= 0; r--) {
        if (board[r][c].src.includes("blank")) {
           emptySpaces++;
        } else if (emptySpaces > 0) {
           board[r + emptySpaces][c].src = board[r][c].src;
           board[r][c].src = "./images/blank.jpg";
        }
     }

     for (let r = 0; r < emptySpaces; r++) {
        board[r][c].src = "./images/" + randomCandy() + ".jpg";
     }
  }
}
function checktrue(){
  for (let r = 0; r < row; r++){
    for (let c = 0; c < col - 2; c++){
        let candy1 = board[r][c];
        let candy2 = board[r][c+1];
        let candy3 = board[r][c+2];
        if(candy1 && candy2 && candy3 && 
            candy1.src == candy2.src && candy2.src == candy3.src && 
            !candy1.src.includes("blank")) {
           return true;
        }
    }
}

for (let c = 0; c < col; c++){
    for (let r = 0; r < row - 2; r++){
        let candy1 = board[r][c];
        let candy2 = board[r+1][c];
        let candy3 = board[r+2][c];
        if(candy1 && candy2 && candy3 && 
            candy1.src == candy2.src && candy2.src == candy3.src && 
            !candy1.src.includes("blank")) {
          return true;
        }
    }
}
return false;
}

JS