import { useEffect } from 'react';
import './App.css';
import Board from './components/Board';
import Difficulty from './components/Difficulty';
import Score from './components/Score';
import { useGame } from './context/gameContext';
import cat from "./images/cat.avif";

const App = () => {
  const { gameOver, score, setNewGame } = useGame();
  
  useEffect(() => {
    const handleGameOver = () => {
      alert("Oyun bitti! Toplam puan: " + score);
      const playAgain = window.confirm("Yeni bir oyun oynamak ister misin?");
      if (playAgain) {
        setNewGame(true);
      }
    };

    if (gameOver) {
      handleGameOver();
    }
  }, [gameOver, score, setNewGame]);

  return (
    <div className='container m-auto'>
      <div className="grid place-items-center my-4">
        <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          Kediciği Kurtar
        </h1>
      </div>
      <div className='flex justify-between'>
        <Difficulty />
        <Score />
      </div>
      <Board />
      <img src={cat} width={50} alt="cat" className='mx-auto my-4' />
    </div>
  );
};

export default App;
