class Game {
  constructor() {
    this.turn = "x";
    this.board = new Array(9).fill("");
  }

  nextTurn() {
    this.turn = this.turn === "x" ? "o" : "x";
  }

  makeMove(i) {
    //don't make a move if the game is over
    if (!this.isInProgress()) return;
    //don't make a move into an already filled spot on the board
    if (this.board[i]) return;
    this.board[i] = this.turn;
    //only move on to the next turn if the current turn did not result
    //in a win
    if (!this.findWinningCombination()) this.nextTurn();
  }

  findWinningCombination() {
    const winningCombinations = [
      //rows
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      //columns
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      //diagonals
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const combination of winningCombinations) {
      const [a, b, c] = combination;

      if (
        this.board[a] !== "" &&
        this.board[a] === this.board[b] &&
        this.board[a] === this.board[c]
      ) {
        return combination;
      }
    }
    return null;
  }

  isInProgress() {
    //for the game to be in progress we need there to be no
    //winning combination and we need empty spaces in our array
    return !this.findWinningCombination() && this.board.includes("");
  }
}

class GameView {
  constructor(root) {
    this.root = root;
    this.root.innerHTML = `
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

    //this.onTileClick = undefined;
    //this.onRestartClick = undefined;

    this.root.querySelectorAll(".boardTile").forEach((tile) => {
      tile.addEventListener("click", () => {
        if (this.onTileClick) {
          this.onTileClick(tile.dataset.index);
        }
      });
    });

    this.root.querySelector(".headerRestart").addEventListener("click", () => {
      if (this.onRestartClick) {
        this.onRestartClick();
      }
    });
  }

  onTileClick(i) {
    game.makeMove(i);
    gameView.update(game);
  }

  onRestartClick() {
    game = new Game();
    gameView.update(game);
  }

  update(game) {
    this.updateTurn(game);
    this.updateStatus(game);
    this.updateBoard(game);
  }

  updateTurn(game) {
    this.root.querySelector(".headerTurn").textContent = `${game.turn}'s turn`;
  }

  updateStatus(game) {
    let status = "In Progress";
    if (game.findWinningCombination()) {
      status = `${game.turn} is the Winner!`;
    } else if (!game.isInProgress()) {
      status = "It's a tie!";
    }

    this.root.querySelector(".headerStatus").textContent = status;
  }

  updateBoard(game) {
    for (let i = 0; i < game.board.length; i++) {
      const tile = this.root.querySelector(`.boardTile[data-index="${i}"]`);
      tile.textContent = game.board[i];
    }
  }
}

let game = new Game();
let gameView = new GameView(document.querySelector("#app"));

gameView.update(game);
