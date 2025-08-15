import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Player = "X" | "O";
type CellValue = Player | null;
type WinnerType = Player | "Draw" | null;

const WIN_LINES: number[][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

interface AuthImagePatternProps {
  title: string;
  subtitle: string;
}

export default function AuthImagePattern({
  title,
  subtitle,
}: AuthImagePatternProps) {
  const initialOrder = Array.from({ length: 9 }, (_, i) => i);
  const [order, setOrder] = useState<number[]>(initialOrder);
  const [board, setBoard] = useState<CellValue[]>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<Player>("X");
  const [winner, setWinner] = useState<WinnerType>(null);
  const [winLine, setWinLine] = useState<number[] | null>(null);

  /** Fisher-Yates shuffle with safeguard */
  const shuffle = (arr: number[]): number[] => {
    const newArr = [...arr];
    for (let i = newArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
  };

  /** Check for winner */
  const checkWinner = (
    b: CellValue[],
  ): { player: Player; line: number[] } | null => {
    for (const line of WIN_LINES) {
      const [a, b2, c] = line;
      if (b[a] && b[a] === b[b2] && b[a] === b[c]) {
        return { player: b[a] as Player, line };
      }
    }
    return null;
  };

  /** Handle click on cell (logical position) */
  const handleClick = (logicalIndex: number) => {
    if (board[logicalIndex] || winner) return;

    const newBoard = [...board];
    newBoard[logicalIndex] = currentPlayer;
    setBoard(newBoard);

    const winCheck = checkWinner(newBoard);
    if (winCheck) {
      setWinner(winCheck.player);
      setWinLine(winCheck.line);
      return;
    }

    if (newBoard.every((cell) => cell !== null)) {
      setWinner("Draw");
      return;
    }

    setCurrentPlayer((prev) => (prev === "X" ? "O" : "X"));
  };

  /** Shuffle every 5 seconds only if game not finished */
  useEffect(() => {
    if (winner) return;
    const interval = setInterval(() => {
      setOrder((prev) => shuffle(prev));
    }, 5000);
    return () => clearInterval(interval);
  }, [winner]);

  /** Reset game */
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer("X");
    setWinner(null);
    setWinLine(null);
    setOrder(initialOrder);
  };

  return (
    <div className="bg-base-200 flex min-h-screen items-center justify-center p-6">
      <div className="animate-fadeIn w-full max-w-md text-center">
        {/* Board */}
        <div className="mb-8 flex justify-center">
          <div
            className="grid grid-cols-3 gap-3"
            style={{ width: "max-content" }}
          >
            <AnimatePresence>
              {order.map((logicalIndex) => {
                const isWinningCell = winLine?.includes(logicalIndex) ?? false;
                return (
                  <motion.div
                    key={logicalIndex}
                    layout
                    onClick={() => handleClick(logicalIndex)}
                    transition={{
                      type: "spring",
                      stiffness: 50,
                      damping: 18,
                    }}
                    initial={{ scale: 1, opacity: 1 }}
                    animate={
                      isWinningCell && winner !== "Draw"
                        ? { scale: [1, 1.4, 0], opacity: [1, 0.8, 0] }
                        : { scale: 1, opacity: 1 }
                    }
                    className={`flex aspect-square w-20 cursor-pointer items-center justify-center rounded-2xl bg-gradient-to-br from-blue-900 via-blue-950 to-black text-2xl font-bold text-white shadow-[0_0_15px_rgba(59,130,246,0.4)] transition-transform duration-300 select-none ${logicalIndex % 2 === 0 ? "animate-pulse" : "opacity-80"}`}
                  >
                    {board[logicalIndex]}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* Title */}
        <h2 className="animate-slideUp mb-3 text-3xl font-extrabold tracking-tight text-blue-100">
          {title}
        </h2>
        <p className="text-base-content/70 animate-fadeInSlow leading-relaxed">
          {subtitle}
        </p>

        {/* Game Status */}
        {winner ? (
          <div className="mt-4">
            <p className="text-lg font-semibold">
              {winner === "Draw" ? "It's a Draw!" : `${winner} Wins!`}
            </p>
            <button
              onClick={resetGame}
              className="mt-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
            >
              Restart Game
            </button>
          </div>
        ) : (
          <p className="mt-4 text-lg">Current Player: {currentPlayer}</p>
        )}
      </div>
    </div>
  );
}
