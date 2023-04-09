let Gameboard = {
  boardArr: ["x", "x", "o", "", "o", "", "x", "", "o"],
  renderBoard: () => {
    let boardWrapper = document.querySelector(".boardWrapper");
    for (let i = 0; i < 9; i++) {
      let squareDiv = document.createElement("div");
      let divP = document.createElement("p");
      divP.textContent = Gameboard.boardArr[i];
      squareDiv.appendChild(divP);
      boardWrapper.appendChild(squareDiv);
    }
  },
};

const PlayerFactory = (name) => {
  return { name };
};

Gameboard.renderBoard();
