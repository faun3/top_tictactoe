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

player1 = PlayerFactory("Gamer 1", "x");
player2 = PlayerFactory("Gamer 2", "o");

Gameboard.renderBoard();

player1.makeMove();
player2.makeMove();
