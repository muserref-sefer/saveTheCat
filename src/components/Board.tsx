import { useEffect, useRef, useState } from "react";
import { useGame } from "../context/gameContext";
import { findNearestMineDistance } from "../helpers/boardHelpers";

const Board: React.FC = () => {
  const [board, setBoard] = useState<boolean[]>([]);
  const [heroPosition, setHeroPosition] = useState(0);
  const [mines, setMines] = useState<number[]>([]);
  const boardRef = useRef<HTMLDivElement | null>(null);
  const { gameOver, setGameOver, setScore, newGame, setNewGame, difficulty, setHelperMessage } = useGame();

  const initializeBoard = () => {
    const newBoard = Array(500).fill(false);
    const newMines: number[] = [];
    let mineCount = 30;

    if (difficulty === "medium") mineCount = 50;
    else if (difficulty === "hard") mineCount = 70;

    for (let i = 0; i < mineCount; i++) {
      const mineIndex = Math.floor(Math.random() * 500);

      if (heroPosition !== mineIndex) newMines.push(mineIndex);
      newBoard[mineIndex] = true;
    }

    setBoard(newBoard);
    setMines(newMines);
    setHeroPosition(0);
    setHelperMessage("");
    setGameOver(false);
    setScore(0);
    setNewGame(false);
  };

  useEffect(() => {
    initializeBoard();
    if (boardRef.current) {
      boardRef.current.focus();
    }
  }, [newGame, difficulty]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!gameOver) {
      let newPosition = heroPosition;

      switch (e.key) {
        case "ArrowLeft":
          newPosition = heroPosition % 20 !== 0 ? heroPosition - 1 : heroPosition;
          break;
        case "ArrowRight":
          newPosition = (heroPosition + 1) % 20 !== 0 ? heroPosition + 1 : heroPosition;
          break;
        case "ArrowUp":
          newPosition = heroPosition >= 20 ? heroPosition - 20 : heroPosition;
          break;
        case "ArrowDown":
          newPosition = heroPosition < 480 ? heroPosition + 20 : heroPosition;
          break;
        default:
          break;
      }

      setHeroPosition(newPosition);

      if (mines.includes(newPosition)) {
        setGameOver(true);
        setHelperMessage("Mayına bastınız! Oyun bitti.");
      } else {
        const distanceToMine = findNearestMineDistance(newPosition, mines);
        setHelperMessage(`Yardımcı: ${distanceToMine} kare uzaklıkta`);
        setScore((prevScore) => prevScore + 1);

        if (newPosition >= 480) {
          setGameOver(true);
          setHelperMessage("Tebrikler! Oyunu başarıyla tamamladınız.");
        }
      }
    }
  };

  const handleCellClick = (index: number) => {
    if (gameOver) {
      return;
    }

    if (mines.includes(index)) {
      setGameOver(true);
      setHelperMessage("Mayına bastınız! Oyun bitti.");
    } else {
      setHeroPosition(index);

      const distanceToNearestMine = findNearestMineDistance(index, mines);

      setHelperMessage(`Yardımcı: ${distanceToNearestMine} kare uzaklıkta`);
      setScore((prevScore) => prevScore + 1);

      if (index >= 480) {
        setGameOver(true);
        setHelperMessage("Tebrikler! Oyunu başarıyla tamamladınız.");
      }
    }
  };

  return (
    <div>
      <div
        className="board"
        ref={boardRef}
        tabIndex={0}
        onKeyDown={handleKeyPress}
      >
        {board.map((cell, index) => (
          <div
            key={index}
            className={`cell ${heroPosition === index ? "hero" : ""} ${
              mines.includes(index) && gameOver ? "mine" : ""
            }`}
            onClick={() => handleCellClick(index)}
          >
          </div>
        ))}
      </div>
    </div>
  );
};

export default Board;
