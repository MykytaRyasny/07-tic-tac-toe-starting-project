import { useState } from 'react';
import GameBoard from './assets/components/GameBoard';
import GameOver from './assets/components/GameOver';
import Log from './assets/components/Log';
import Player from './assets/components/Player';
import { WINNING_COMBINATIONS } from './assets/winning-combinations';

const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2',
};

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveWinner(gameBoard, players) {
  let winner = null;
  for (const combinations of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combinations[0].row][combinations[0].column];
    const secondSquareSymbol =
      gameBoard[combinations[1].row][combinations[1].column];
    const thirdSquareSymbol =
      gameBoard[combinations[2].row][combinations[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
    }
  }

  return winner;
}
function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X';

  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }

  return currentPlayer;
}

function deriveGameBoard(gameTurns) {
  let gameBoard = [...initialGameBoard.map((array) => [...array])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }

  return gameBoard;
}

function App() {
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);
  const hasDraw = gameTurns.length === 9 && !winner;

  function handleRematch() {
    setGameTurns([]);
  }

  function handleChangePlayerName(symbol, newName) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      };
    });
  }

  function handleSelectSqlare(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);
      const updatedTurns = [
        {
          square: {
            row: rowIndex,
            col: colIndex,
          },
          player: currentPlayer,
        },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  }

  return (
    <main>
      <div id='game-container'>
        <ol
          id='players'
          className='highlight-player'
        >
          <Player
            name={PLAYERS.X}
            symbol='X'
            isActive={activePlayer === 'X'}
            onChangeName={handleChangePlayerName}
          ></Player>
          <Player
            name={PLAYERS.O}
            symbol='O'
            isActive={activePlayer === 'O'}
            onChangeName={handleChangePlayerName}
          ></Player>
        </ol>
        {(winner || hasDraw) && (
          <GameOver
            winner={winner}
            onReset={handleRematch}
          />
        )}
        <GameBoard
          onSelectSquare={handleSelectSqlare}
          activePlayerSymbol={activePlayer}
          board={gameBoard}
        />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
