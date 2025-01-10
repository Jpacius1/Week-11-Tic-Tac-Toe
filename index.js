
    const gameGrid = document.getElementById('gameGrid');
    const turnDisplay = document.getElementById('turn');
    const restartButton = document.getElementById('restartButton');
    const gameResult = document.getElementById('gameResult');

    let currentPlayer = 'X';
    let gameBoard = Array(9).fill(null);
    let gameActive = true;

    // Winning combinations
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    // Handle cell click
    gameGrid.addEventListener('click', (e) => {
        const cell = e.target;
        const index = cell.getAttribute('data-index');

        if (cell.classList.contains('played') || !gameActive) return;

        // Update the board
        cell.textContent = currentPlayer;
        cell.classList.add('played');
        gameBoard[index] = currentPlayer;

        //Check for winner
        if (checkWinner()) {
            gameResult.textContent = `${currentPlayer} Wins!`;
            gameResult.classList.remove(`d-none`);
            gameActive = false;
            return;
        }

        //Check for draw
        if (!gameBoard.includes(null)) {
            gameResult.textContent = `It's a Draw!`;
            gameResult.classList.remove('d-none');
            gameActive = false;
            return;
        }

        // Switch turns
        currentPlayer = currentPlayer === 'X' ? '0' : 'X';
        turnDisplay.textContent = `${currentPlayer}'s Turn`;
    });

    // Check for winner
    function checkWinner() {
        return winningCombinations.some(combination => {
            const [a, b, c] = combination;
            return (
                gameBoard[a] &&
                gameBoard[a] === gameBoard[b] &&
                gameBoard[a] === gameBoard[c]
            );
        });
    }

    // Restart the game 
    restartButton.addEventListener('click', () => {
        gameBoard.fill(null);
        currentPlayer = 'X';
        gameActive = true;
        turnDisplay.textContent = `X's Turn`;
        gameResult.classList.add('d-none');
        document.querySelectorAll('.cell').forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('played');
        });
    });
