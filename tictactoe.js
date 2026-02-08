(function () {
  const board = document.getElementById('board');
  const status = document.getElementById('status');
  const restartBtn = document.getElementById('restart');
  const scoreX = document.getElementById('score-x');
  const scoreO = document.getElementById('score-o');
  const scoreDraw = document.getElementById('score-draw');

  const WIN_COMBOS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  let cells;
  let currentPlayer = 'X';
  let gameBoard = Array(9).fill('');
  let gameOver = false;
  let scores = { X: 0, O: 0, draw: 0 };

  function init() {
    cells = document.querySelectorAll('.cell');
    cells.forEach(function (cell) {
      cell.textContent = '';
      cell.className = 'cell';
      cell.addEventListener('click', handleClick);
    });
    gameBoard = Array(9).fill('');
    currentPlayer = 'X';
    gameOver = false;
    status.textContent = 'Spelare X:s tur';
  }

  function handleClick(e) {
    var index = parseInt(e.target.dataset.index);
    if (gameBoard[index] !== '' || gameOver) return;

    gameBoard[index] = currentPlayer;
    e.target.textContent = currentPlayer;
    e.target.classList.add(currentPlayer.toLowerCase());

    var winCombo = checkWin(currentPlayer);
    if (winCombo) {
      gameOver = true;
      status.textContent = 'Spelare ' + currentPlayer + ' vinner!';
      scores[currentPlayer]++;
      updateScoreboard();
      highlightWin(winCombo);
      return;
    }

    if (gameBoard.every(function (cell) { return cell !== ''; })) {
      gameOver = true;
      status.textContent = 'Oavgjort!';
      scores.draw++;
      updateScoreboard();
      return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    status.textContent = 'Spelare ' + currentPlayer + ':s tur';
  }

  function checkWin(player) {
    for (var i = 0; i < WIN_COMBOS.length; i++) {
      var combo = WIN_COMBOS[i];
      if (
        gameBoard[combo[0]] === player &&
        gameBoard[combo[1]] === player &&
        gameBoard[combo[2]] === player
      ) {
        return combo;
      }
    }
    return null;
  }

  function highlightWin(combo) {
    combo.forEach(function (index) {
      cells[index].classList.add('win');
    });
  }

  function updateScoreboard() {
    scoreX.textContent = scores.X;
    scoreO.textContent = scores.O;
    scoreDraw.textContent = scores.draw;
  }

  restartBtn.addEventListener('click', init);
  init();
})();
