interface MemoryCardProps {
  icon: string;
  isFlipped: boolean;
  isMatched: boolean;
  animState: "idle" | "shake" | "match";
  onClick: () => void;
}

const MemoryCard = ({ icon, isFlipped, isMatched, animState, onClick }: MemoryCardProps) => {
  const animClass =
    animState === "shake" ? "animate-shake" :
      animState === "match" ? "animate-match-pop" : "";

  return (
    <button
      onClick={onClick}
      disabled={isFlipped || isMatched}
      className={`card-flip aspect-square w-full transition-transform active:scale-95 ${isMatched ? "opacity-60" : ""}`}
      aria-label={isFlipped ? `Card showing ${icon}` : "Face-down card"}
    >
      <div className={`card-inner relative w-full h-full ${isFlipped || isMatched ? "flipped" : ""}`}>
        {/* Back of card */}
        <div className="card-back absolute inset-0 rounded-2xl bg-primary flex items-center justify-center border-4 border-white shadow-xl cursor-pointer">
          <div className="absolute inset-2 rounded-xl border-2 border-white/20" />
          <div className="text-white font-black text-4xl opacity-40 select-none">M</div>
        </div>

        {/* Front of card */}
        <div
          className={`card-front absolute inset-0 rounded-2xl flex items-center justify-center border-4 shadow-xl transition-all ${isMatched
              ? "bg-white border-green-500 scale-95"
              : "bg-white border-primary/20"
            } ${animClass}`}
        >
          <span className="text-4xl sm:text-5xl select-none drop-shadow-sm">{icon}</span>
          {isMatched && (
            <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full p-1 shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          )}
        </div>
      </div>
    </button>
  );
};

export default MemoryCard;
