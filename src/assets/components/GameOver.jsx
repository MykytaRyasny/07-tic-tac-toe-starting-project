export default function GameOver({ winner, onReset }) {
  return (
    <div id='game-over'>
      <h2>Game Over!</h2>
      {winner && <p>{winner} won</p>}
      {!winner && <p>It's draw!</p>}
      <button onClick={onReset}>Rematch!</button>
    </div>
  );
}
