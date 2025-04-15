import { useState } from 'react';

export default function Player({ name, symbol, isActive, onChangeName }) {
  const [playerName, setPlayerName] = useState(name);
  const [isEditing, setIsEditing] = useState(false);

  function handleClick() {
    setIsEditing((value) => !value);
  }

  function handleChange(event) {
    setPlayerName(event.target.value);
    if (isEditing) {
      onChangeName(symbol, playerName);
    }
  }

  let playerSpan = <span className='player-name'>{playerName}</span>;
  if (isEditing) {
    playerSpan = (
      <input
        type='text'
        requeried
        value={playerName}
        onChange={handleChange}
      />
    );
  }

  return (
    <li className={isActive ? 'active' : ''}>
      <span className='player-info'>
        {playerSpan}
        <span className='player-symbol'>{symbol}</span>
        <button onClick={handleClick}>{isEditing ? 'Save' : 'Edit'}</button>
      </span>
    </li>
  );
}
