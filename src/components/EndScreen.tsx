import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { submitScore } from "@/services/leaderboardService";
import Leaderboard from "./Leaderboard";
import { Button } from "@/components/ui/button";

interface EndScreenProps {
  isWon: boolean;
  reward: string | null;
  score: number;
  flips: number;
  difficulty: string;
  onReplay: () => void;
  dailyPlaysLeft: number;
}

const EndScreen = ({ isWon, reward, score, flips, difficulty, onReplay, dailyPlaysLeft }: EndScreenProps) => {
  const { user } = useAuth();
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (isWon && user && !submitted) {
      submitScore(user.name, user.email, score, difficulty);
      setSubmitted(true);
    }
  }, [isWon, user, score, difficulty, submitted]);

  if (showLeaderboard) {
    return (
      <div className="flex flex-col items-center gap-6 w-full max-w-2xl px-4">
        <Leaderboard />
        <Button
          onClick={() => setShowLeaderboard(false)}
          className="bg-primary hover:bg-primary/90 text-white font-bold py-6 text-lg rounded-xl shadow-md w-full max-w-sm"
        >
          Back to Results
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6 animate-scale-in w-full max-w-sm mx-auto px-4 text-center">
      <div className="text-6xl mb-2">
        {isWon ? "🏆" : "⌛"}
      </div>

      <div className="space-y-2">
        <h2 className="text-4xl font-bold text-gray-800">
          {isWon ? "Nicely Done!" : "Time's Over!"}
        </h2>
        <p className="text-gray-500 font-medium">
          {isWon
            ? `Fantastic! You cleared ${difficulty} mode in ${flips} flips.`
            : "Don't give up! Every match counts towards the top spot."}
        </p>
      </div>

      {/* Score */}
      <div className="bg-white border-2 border-primary/20 rounded-3xl p-8 w-full shadow-lg transform rotate-1">
        <p className="text-12 text-gray-400 font-bold uppercase tracking-widest mb-1">Your Score</p>
        <p className="text-6xl font-black text-primary drop-shadow-sm">{score.toLocaleString()}</p>
      </div>

      {reward && (
        <div className="bg-primary/5 border-2 border-primary/20 border-dashed rounded-3xl p-6 w-full transform -rotate-1">
          <p className="text-primary font-bold text-xl mb-1">{reward}</p>
          <p className="text-xs text-gray-500 font-medium">Claim this reward in your Jumia account!</p>
        </div>
      )}

      <div className="flex flex-col gap-3 w-full">
        <Button
          onClick={onReplay}
          className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-8 text-xl rounded-2xl shadow-xl transition-all active:scale-[0.98] hover:scale-[1.02]"
        >
          {dailyPlaysLeft > 0 ? "Play Again" : "Return home"}
        </Button>

        <Button
          variant="outline"
          onClick={() => setShowLeaderboard(true)}
          className="w-full border-primary text-primary hover:bg-primary/10 font-bold py-6 text-lg rounded-2xl"
        >
          View Leaderboard
        </Button>
      </div>

      <p className="text-sm font-bold text-gray-400">
        {dailyPlaysLeft > 0
          ? `${dailyPlaysLeft} play${dailyPlaysLeft !== 1 ? "s" : ""} left for today`
          : "You've reached your limit - see you tomorrow!"}
      </p>
    </div>
  );
};

export default EndScreen;
