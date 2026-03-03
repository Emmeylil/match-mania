import { type Difficulty } from "@/hooks/useMemoryGame";

interface LevelSelectProps {
  onSelect: (difficulty: Difficulty) => void;
  dailyPlaysLeft: number;
}

const levels: { key: Difficulty; label: string; desc: string; cards: number }[] = [
  { key: "easy", label: "Easy", desc: "3×2 Grid", cards: 6 },
  { key: "medium", label: "Medium", desc: "4×3 Grid", cards: 12 },
  { key: "hard", label: "Hard", desc: "4×4 Grid", cards: 16 },
];

const LevelSelect = ({ onSelect, dailyPlaysLeft }: LevelSelectProps) => {
  const noPlays = dailyPlaysLeft <= 0;

  return (
    <div className="flex flex-col items-center gap-8 animate-fade-in w-full max-w-sm mx-auto px-4">
      <div className="text-center space-y-3">
        <div className="flex justify-center mb-2">
          <div className="bg-primary text-white px-4 py-2 rounded-xl font-black text-3xl tracking-tighter shadow-xl transform -rotate-1">
            JUMIA
          </div>
        </div>
        <h1 className="text-4xl font-black text-gray-800 tracking-tight">
          Match<span className="text-primary">Mania</span>
        </h1>
        <p className="text-gray-500 font-medium">Flip the cards to win exclusive rewards!</p>
      </div>

      {noPlays ? (
        <div className="text-center space-y-4 bg-white rounded-3xl p-8 border-2 border-primary/20 shadow-xl">
          <div className="text-5xl mb-2">⏰</div>
          <p className="text-2xl font-black text-gray-800">Come back later!</p>
          <p className="text-gray-500 font-medium leading-relaxed">You've reached your daily limit. Fresh rewards await you tomorrow!</p>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-4 w-full">
            {levels.map((level) => (
              <button
                key={level.key}
                onClick={() => onSelect(level.key)}
                className="group relative bg-white hover:bg-primary/5 border-2 border-primary/10 hover:border-primary/30 rounded-2xl p-5 text-left transition-all active:scale-[0.98] shadow-sm hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-black text-xl text-gray-800 group-hover:text-primary transition-colors">
                      {level.label}
                    </h3>
                    <p className="text-sm text-gray-500 font-medium">{level.desc} · {level.cards} Items</p>
                  </div>
                  <div className="bg-primary/10 p-3 rounded-xl transform group-hover:scale-110 group-hover:rotate-6 transition-all">
                    <span className="text-2xl">
                      {level.key === "easy" ? "🎁" : level.key === "medium" ? "🚀" : "💎"}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="bg-white/50 backdrop-blur-sm px-6 py-2 rounded-full border border-primary/10 shadow-sm">
            <p className="text-sm font-black text-primary uppercase tracking-widest">
              {dailyPlaysLeft} plays left today
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default LevelSelect;
