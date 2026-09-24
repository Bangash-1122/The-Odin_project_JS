const player = (name, mark) => {
    return {
        name,
        mark
    };
};

// Game Board Module
const GameBoard = (() => {
    const board = ["", "", "", "", "", "", "", "", ""];

    const getBoard = () => board;

    const reset = () => {
        board.fill("");
    };

    const placeMark = (index, mark) => {
        if (board[index] === "") {
            board[index] = mark;
            return true;
        }
        return false;
    };

    return {
        getBoard,
        reset,
        placeMark,
    };
})();

// Game controller Module
const GameController = (() => {
    let player1;
    let player2;
    let currentPlayer;
    let isGameOver = false;

    const winningPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    const startGame = (name1, name2) => {
        player1 = player(name1, "X");
        player2 = player(name2, "O");
        currentPlayer = player1;
        isGameOver = false;
        GameBoard.reset();
        DisplayController.render();
        DisplayController.message(`${currentPlayer.name}'s turn`);
    };

    const playRound = (index) => {
        if (isGameOver || !currentPlayer) return;

        if (!GameBoard.placeMark(index, currentPlayer.mark)) return;

        DisplayController.render();

        if (checkWinner()) {
            DisplayController.message(`${currentPlayer.name} wins!`);
            isGameOver = true;
            return;
        }

        if (GameBoard.getBoard().every(cell => cell !== "")) {
            DisplayController.message("It's a draw!");
            isGameOver = true;
            return;
        }

        switchPlayer();
        DisplayController.message(`${currentPlayer.name}'s turn`);
    };

    const switchPlayer = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    };

    const checkWinner = () => {
        return winningPatterns.some(pattern =>
            pattern.every((index) => GameBoard.getBoard()[index] === currentPlayer.mark)
        );
    };

    return {
        startGame,
        playRound,
    };
})();

// Display controller Module
const DisplayController = (() => {
    const msg = document.querySelector("#message");
    const cells = document.querySelectorAll(".cell");

    cells.forEach(cell => {
        cell.addEventListener("click", () => {
            GameController.playRound(cell.dataset.index);
        });
    });

    const render = () => {
        cells.forEach((cell, index) => {
            cell.textContent = GameBoard.getBoard()[index];
        });
    };

    const message = (text) => {
        msg.textContent = text;
    };

    return {
        render,
        message,
    };
})();

// Helper to get player names from inputs
const getPlayerNames = () => {
    const p1 = document.querySelector("#playerOne").value.trim() || "Player X";
    const p2 = document.querySelector("#playerTwo").value.trim() || "Player O";
    return { p1, p2 };
};

// Button events
document.querySelector("#startBtn")
    .addEventListener("click", () => {
        const { p1, p2 } = getPlayerNames();
        GameController.startGame(p1, p2);
    });

document.querySelector("#restartBtn")
    .addEventListener("click", () => {
        const { p1, p2 } = getPlayerNames();
        GameController.startGame(p1, p2);
    });

// Initialize game on load
GameController.startGame("Player X", "Player O");
