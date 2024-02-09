import { ReactNode, createContext, useContext, useState } from 'react';

interface GameContextProps {
  gameOver: boolean;
  setGameOver: React.Dispatch<React.SetStateAction<boolean>>;
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  newGame: boolean;
  setNewGame: React.Dispatch<React.SetStateAction<boolean>>;
  difficulty: string;
  setDifficulty: React.Dispatch<React.SetStateAction<string>>;
  helperMessage: string;
  setHelperMessage: React.Dispatch<React.SetStateAction<string>>;
}

const GameContext = createContext<GameContextProps | undefined>(undefined);

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [newGame, setNewGame] = useState(false);
  const [difficulty, setDifficulty] = useState("easy");
  const [helperMessage, setHelperMessage] = useState("");

  return (
    <GameContext.Provider 
      value={{ gameOver, setGameOver, score, setScore, newGame, setNewGame, difficulty, setDifficulty, helperMessage, setHelperMessage }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
