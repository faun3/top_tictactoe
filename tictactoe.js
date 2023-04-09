let Gameboard = {
  boardArr: ["x", "x", "o", "", "o", "", "x", "", "o"],
};

const PlayerFactory = (name) => {
  return { name };
};

const renderBoard = function (boardArr) {
  let boardWrapper = document.querySelector(".boardWrapper");
  for (let i = 0; i < boardArr.length; i++) {
    let squareDiv = document.createElement("div");
    squareDiv.textContent = boardArr[i];
    boardWrapper.appendChild(squareDiv);
  }
};

renderBoard();
