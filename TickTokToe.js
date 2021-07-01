var boxes = document.getElementsByClassName("box");
var gameboard = document.getElementById("gameboard");
const O_text = "O";
const X_text = "X";
let currentPlayer = O_text;
const spaces = [null, null, null, null, null, null, null, null, null]
const resetB = document.getElementById("reset");

const drawBoard = () => {
    for (var index = 0; index < boxes.length; index++) {
        let styleString = "";
      if (index < 3) {
        styleString += `border-bottom: 3px solid var(--main-color);`;
      }
      if (index % 3 === 0) {
        styleString += `border-right: 3px solid var(--main-color);`;
      }
      if (index % 3 === 2) {
        styleString += `border-left: 3px solid var(--main-color);`;
      }
      if (index > 5) {
        styleString += `border-top: 3px solid var(--main-color);`;
      }
      boxes[index].style = styleString;
      boxes[index].addEventListener("click", boxClicked);
    }
  };

drawBoard();
function boxClicked(e) {
    const id = e.target.id
    if(!spaces[id]) {
        spaces[id] = currentPlayer;
        e.target.innerText = currentPlayer;
    }
    if(playerHasWon(currentPlayer, e)) {
        playText.innerHTML = `${currentPlayer} has won`;
        gameboard.style = `pointer-events: none`;
        return;
    }
    currentPlayer === O_text ? currentPlayer = X_text : currentPlayer = O_text;
}

const playerHasWon = (player) => {
    //from top left, check across, down, and diagonal
    if (spaces[0] === player) {
      if (spaces[1] === player && spaces[2] === player) {
        console.log(`${player} wins up top`);
        return true;
      }
      if (spaces[3] === player && spaces[6] === player) {
        console.log(`${player} wins on the left`);
        return true;
      }
      if (spaces[4] === player && spaces[8] === player) {
        console.log(`${player} wins on the diagonal`);
        return true;
      }
    }
    //from bottom check up and across
    if (spaces[8] === player) {
      if (spaces[2] === player && spaces[5] === player) {
        console.log(`${player} wins on the right`);
        return true;
      }
      if (spaces[7] === player && spaces[6] === player) {
        console.log(`${player} wins on the bottom`);
        return true;
      }
    }
    //from middle check middle vertical and middle horizontal
    if (spaces[4] === player) {
      if (spaces[3] === player && spaces[5] === player) {
        console.log(`${player} wins on the middle horizontal`);
        return true;
      }
      if (spaces[1] === player && spaces[7] === player) {
        console.log(`${player} wins on the middle vertical`);
        return true;
      }
    }
  };
resetB.addEventListener("click", reset);

function reset() {
    spaces.forEach((space, index) => {
        spaces[index] = null;
      });
      for (var index = 0; index < boxes.length; index++) {
          boxes[index].innerText = "";
      }

      playText.innerHTML = `Let's Play!!`;
    
      currentPlayer = O_text;
      gameboard.style = `    pointer-events: auto;`;
}