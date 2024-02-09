import React from 'react';
import { useGame } from '../context/gameContext';

const Difficulty: React.FC = () => {
  const { difficulty, setDifficulty } = useGame();
  const difficulties = ["easy", "medium", "hard"];

  return (
    <div>
      <h2>Zorluk Seviyesi</h2>
      {difficulties.map((level) => (
        <label key={level} className='mr-4'>
          <input
            type="radio"
            value={level}
            className='mr-1'
            checked={difficulty === level}
            onChange={() => setDifficulty(level)}
          />
          {level.charAt(0).toUpperCase() + level.slice(1)}
        </label>
      ))}
    </div>
  );
};

export default Difficulty;