let Gameboard = {
  boardArr: ["", "", "", "", "", "", "", "", ""],

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
      squareDiv.dataset.index = i;
      squareDiv.textContent = Gameboard.boardArr[i];
      boardWrapper.appendChild(squareDiv);
    }
  },
};

const PlayerFactory = (name, symbol) => {
  const makeMove = () => {
    let moved = false;
    let boardSquares = document.querySelectorAll(".square");
    boardSquares.forEach((square) => {
      square.addEventListener("click", () => {
        if (Gameboard.boardArr[square.dataset.index] === "") {
          square.textContent = symbol;
          Gameboard.boardArr[square.dataset.index] = symbol;
          Gameboard.clearBoard();
          Gameboard.renderBoard();
          moved = true;
        }
      });
    });
    return moved;
  };
  return { name, symbol, makeMove };
};

const Game = (() => {
  let end = false;
  let triple = false;
  let tied = false;
  let winner = "";
  let round = 0;
  const checkRow = () => {
    for (let i = 0; i < 7; i += 2) {
      if (Gameboard.boardArr[i] !== "") {
        if (
          Gameboard.boardArr[i] === Gameboard.boardArr[i + 1] &&
          Gameboard.boardArr[i + 1] === Gameboard.boardArr[i + 2]
        ) {
          if (Gameboard.boardArr[0] === "x") {
            winner = player1.name;
          } else winner = player2.name;
          triple = true;
        }
      }
    }
  };
  const checkCol = () => {
    for (let i = 0; i < 3; i++) {
      if (Gameboard.boardArr[i] !== "") {
        if (
          Gameboard.boardArr[i] === Gameboard.boardArr[i + 3] &&
          Gameboard.boardArr[i + 3] === Gameboard.boardArr[i + 6]
        ) {
          if (Gameboard.boardArr[0] === "x") {
            winner = player1.name;
          } else winner = player2.name;
          triple = true;
        }
      }
    }
  };
  const checkDiag = () => {
    if (Gameboard.boardArr[0] !== "") {
      if (
        Gameboard.boardArr[0] === Gameboard.boardArr[4] &&
        Gameboard.boardArr[4] === Gameboard.boardArr[8]
      ) {
        if (Gameboard.boardArr[0] === "x") {
          winner = player1.name;
        } else winner = player2.name;
        triple = true;
      }
    }
    if (Gameboard.boardArr[2] !== "") {
      if (
        Gameboard.boardArr[2] === Gameboard.boardArr[4] &&
        Gameboard.boardArr[4] === Gameboard.boardArr[6]
      ) {
        if (Gameboard.boardArr[2] === "x") {
          winner = player1.name;
        } else winner = player2.name;
        triple = true;
      }
    }
  };
  const checkTie = () => {
    let filled = 0;
    for (let i = 0; i < 9; i++) {
      if (Gameboard.boardArr[i] !== "") {
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
    round = 0;
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
    while (round < 10) {
      if (round % 2 == 0) {
        if (player1.makeMove) {
          round++;
        }
        //player1.makeMove();
        //doChecks();
        //round++;
      } else {
        if (player2.makeMove()) {
          round++;
        }
        //doChecks();
        //round++;
      }
    }
  };
  return { play };
})();

player1 = PlayerFactory("Gamer 1", "x");
player2 = PlayerFactory("Gamer 2", "o");

Game.play();
