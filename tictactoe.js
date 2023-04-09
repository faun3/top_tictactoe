let Gameboard = {
  boardArr: ["x", "x", "o", "x", "o", "", "", "", ""],
  clearBoard: () => {
    const squares = document.querySelectorAll(".boardWrapper div");
    const boardWrapper = document.querySelector(".boardWrapper");
    for (let i = 0; i < 9; i++) {
      boardWrapper.removeChild(squares[i]);
    }
  },
  renderBoard: () => {
    let boardWrapper = document.querySelector(".boardWrapper");
    for (let i = 0; i < 9; i++) {
      let squareDiv = document.createElement("div");
      squareDiv.classList.add("square");
      squareDiv.textContent = Gameboard.boardArr[i];
      boardWrapper.appendChild(squareDiv);
    }
  },
};

const PlayerFactory = (name, symbol) => {
  const makeMove = () => {
    let boardSquares = document.querySelectorAll(".square");
    for (let i = 0; i < 9; i++) {
      boardSquares[i].addEventListener("click", () => {
        if (Gameboard.boardArr[i] === "") {
          boardSquares[i].textContent = symbol;
          Gameboard.boardArr[i] = symbol;
        }
        Gameboard.clearBoard();
        Gameboard.renderBoard();
        console.table(Gameboard.boardArr);
      });
    }
  };
  return { name, symbol, makeMove };
};

const Game = (() => {
  let end = false;
  let triple = false;
  let tied = false;
  let winner = "";
  const checkRow = () => {
    for (let i = 0; i < 7; i += 2) {
      if (
        boardArr[i] === boardArr[i + 1] &&
        boardArr[i + 1] === boardArr[i + 2]
      ) {
        if (boardArr[0] === "x") {
          winner = player1.name;
        } else winner = player2.name;
        triple = true;
      }
    }
  };
  const checkCol = () => {
    for (let i = 0; i < 3; i++) {
      if (
        boardArr[i] === boardArr[i + 3] &&
        boardArr[i + 3] === boardArr[i + 6]
      ) {
        if (boardArr[0] === "x") {
          winner = player1.name;
        } else winner = player2.name;
        triple = true;
      }
    }
  };
  const checkDiag = () => {
    if (boardArr[0] === boardArr[4] && boardArr[4] === boardArr[8]) {
      if (boardArr[0] === "x") {
        winner = player1.name;
      } else winner = player2.name;
      triple = true;
    }
    if (boardArr[2] === boardArr[4] && boardArr[4] === boardArr[6]) {
      if (boardArr[2] === "x") {
        winner = player1.name;
      } else winner = player2.name;
      triple = true;
    }
  };
  const checkTie = () => {
    let filled = 0;
    for (let i = 0; i < 9; i++) {
      if (boardArr[i] !== "") {
        filled++;
      }
    }
    if (filled === 9) {
      tied = true;
    }
  };
  const resetState = () => {
    boardArr = ["", "", "", "", "", "", "", "", ""];
    Gameboard.clearBoard();
    Gameboard.renderBoard();
    end = false;
    triple = false;
    tied = false;
    winner = "";
  };
  const doChecks = () => {
    checkCol();
    checkDiag();
    checkRow();
    checkTie();
    if (triple) {
      end = true;
      alert(`${winner} wins!`);
      resetState();
    }
    if (tied) {
      end = true;
    }
  };
  const play = () => {
    console.log("playing");
    Gameboard.renderBoard();
    while (!this.stop) {
      player1.makeMove();
      doChecks();
      player2.makeMove();
      doChecks();
    }
  };
  return { play };
})();

player1 = PlayerFactory("Gamer 1", "x");
player2 = PlayerFactory("Gamer 2", "o");

Game.play();
