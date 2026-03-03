import MemoryCard from "./MemoryCard";
import type { Difficulty } from "@/hooks/useMemoryGame";

interface Card {
  id: number;
  icon: string;
  isFlipped: boolean;
  isMatched: boolean;
  animState: "idle" | "shake" | "match";
}

interface GameBoardProps {
  cards: Card[];
  difficulty: Difficulty;
  flips: number;
  score: number;
  timeLeft: number;
  matchedPairs: number;
  totalPairs: number;
  onFlip: (id: number) => void;
  onBack: () => void;
}

const gridClass: Record<Difficulty, string> = {
  easy: "grid-cols-3",
  medium: "grid-cols-4",
  hard: "grid-cols-4",
};

const GameBoard = ({
  cards, difficulty, flips, score, timeLeft,
  matchedPairs, totalPairs, onFlip, onBack,
}: GameBoardProps) => {
  const timeWarning = timeLeft <= 10;

  return (
    <div className="flex flex-col gap-6 w-full max-w-sm mx-auto px-4 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="text-gray-400 hover:text-primary transition-colors text-sm font-black uppercase tracking-widest flex items-center gap-1"
        >
          <span className="text-xl">←</span> Exit
        </button>
        <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter">
          {matchedPairs} / {totalPairs} Cleared
        </div>
      </div>

      {/* Score display */}
      <div className="text-center py-2">
        <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Current Score</p>
        <p className="text-5xl font-black text-primary tracking-tighter drop-shadow-sm">{score.toLocaleString()}</p>
      </div>

      {/* Grid */}
      <div className={`grid ${gridClass[difficulty]} gap-2 sm:gap-4 p-2 bg-white/30 backdrop-blur-md rounded-3xl border border-white/50 shadow-inner`}>
        {cards.map((card) => (
          <MemoryCard
            key={card.id}
            icon={card.icon}
            isFlipped={card.isFlipped}
            isMatched={card.isMatched}
            animState={card.animState}
            onClick={() => onFlip(card.id)}
          />
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl p-4 border border-primary/10 shadow-sm flex flex-col items-center justify-center">
          <p className={`text-2xl font-black ${timeWarning ? "text-red-500 animate-pulse" : "text-gray-800"}`}>
            {timeLeft}s
          </p>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Time</p>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-primary/10 shadow-sm flex flex-col items-center justify-center">
          <p className="text-2xl font-black text-gray-800">
            {flips}
          </p>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Flips</p>
        </div>
      </div>
    </div>
  );
};

export default GameBoard;
