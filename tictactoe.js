//the func inside the iife is just a factory function whose return value
//is assigned to "game"
const gameFactory = () => {
  let turn = "x";
  let board = new Array(9).fill("");

  const nextTurn = () => {
    if (turn === "x") turn = "o";
    else turn = "x";
  };

  const isInProgress = () => {
    return !findWinningCombination() && board.includes("");
  };

  const findWinningCombination = () => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const combination of winningCombinations) {
      const [a, b, c] = combination;

      if (board[a] !== "" && board[a] === board[b] && board[a] === board[c]) {
        return combination;
      }
    }
    return null;
  };

  const makeMove = (pos) => {
    if (!isInProgress()) return;

    if (board[pos] !== "") return;

    board[pos] = turn;

    if (!findWinningCombination()) {
      nextTurn();
    }
  };
  return { turn, board, makeMove, findWinningCombination, isInProgress };
};

//passing root as an argument to the lambda expression is the same
//as calling gameView's constructor with the "root" argument
const gameView = ((root) => {
  root.innerHTML = `
        <div class="header">
            <div class="headerTurn">
            </div>
            <div class="headerStatus">
            </div>
            <button type="button" class="headerRestart">
                <span class="material-icons">
                    refresh
                </span>
            </button>
        </div>
        <div class="board">
          <div class="boardTile" data-index="0"></div>
          <div class="boardTile" data-index="1"></div>
          <div class="boardTile" data-index="2"></div>
          <div class="boardTile" data-index="3"></div>
          <div class="boardTile" data-index="4"></div>
          <div class="boardTile" data-index="5"></div>
          <div class="boardTile" data-index="6"></div>
          <div class="boardTile" data-index="7"></div>
          <div class="boardTile" data-index="8"></div>
        </div>
    `;

  root.querySelectorAll(".boardTile").forEach((tile) => {
    tile.addEventListener("click", () => {
      if (onTileClick) {
        onTileClick(tile.dataset.index);
      }
    });
  });

  root.querySelector(".headerRestart").addEventListener("click", () => {
    if (onRestartClick) {
      onRestartClick();
    }
  });

  const onTileClick = (i) => {
    game.makeMove(i);
    gameView.update(game);
  };

  const onRestartClick = () => {
    game = gameFactory();
    gameView.update(game);
  };

  const updateTurn = (game) => {
    root.querySelector(".headerTurn").textContent = `${game.turn}'s turn`;
  };

  updateStatus = (game) => {
    let status = "In Progress";
    if (game.findWinningCombination()) {
      status = `${game.turn} is the Winner!`;
    } else if (!game.isInProgress()) {
      status = "It's a tie!";
    }

    root.querySelector(".headerStatus").textContent = status;
  };

  const updateBoard = (game) => {
    for (let i = 0; i < game.board.length; i++) {
      const tile = root.querySelector(`.boardTile[data-index="${i}"]`);
      tile.textContent = game.board[i];
    }
  };

  const update = (game) => {
    updateTurn(game);
    updateStatus(game);
    updateBoard(game);
  };

  return { update, onTileClick, onRestartClick };
})(document.querySelector("#app"));

let game = gameFactory();
gameView.update(game);
