import React from 'react';
import { useGame } from '../context/gameContext';

const Score: React.FC = () => {
  const { score, gameOver, setNewGame, helperMessage } = useGame();

  return (
    <div className='flex items-center'>
      <div>{helperMessage}</div>
      <div className='mx-5'>
        Puan: <span className='text-xl'>{score}</span> 
      </div>
      {gameOver && <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => setNewGame(true)}>Yeni Oyun</button>}
    </div>
  );
};

export default Score;