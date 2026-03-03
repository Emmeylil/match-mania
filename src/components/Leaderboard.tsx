import React, { useEffect, useState } from "react";
import { ScoreEntry, subscribeToLeaderboard } from "@/services/leaderboardService";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Trophy, Medal, User } from "lucide-react";

const Leaderboard: React.FC = () => {
    const [scores, setScores] = useState<ScoreEntry[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = subscribeToLeaderboard((data) => {
            setScores(data);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    return (
        <Card className="w-full max-w-2xl mx-auto border-primary/20 bg-white/80 backdrop-blur-sm shadow-xl animate-scale-in">
            <CardHeader className="text-center pb-2">
                <div className="flex justify-center mb-2">
                    <Trophy className="w-12 h-12 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold text-gray-800">Global Leaderboard</CardTitle>
                <p className="text-sm text-gray-500">Real-time rankings of top players</p>
            </CardHeader>
            <CardContent>
                {loading ? (
                    <div className="flex justify-center p-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                    </div>
                ) : scores.length === 0 ? (
                    <div className="text-center py-12 text-gray-500 italic">
                        No scores recorded yet. Be the first!
                    </div>
                ) : (
                    <div className="space-y-3 mt-4">
                        {scores.map((entry, index) => (
                            <div
                                key={entry.id}
                                className={`flex items-center justify-between p-4 rounded-xl transition-all hover:bg-white hover:shadow-md border border-transparent hover:border-primary/10 ${index < 3 ? 'bg-primary/5' : 'bg-gray-50'
                                    }`}
                            >
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center justify-center w-10 h-10 font-black text-lg">
                                        {index === 0 ? <Medal className="text-yellow-500 w-8 h-8" /> :
                                            index === 1 ? <Medal className="text-gray-400 w-8 h-8" /> :
                                                index === 2 ? <Medal className="text-orange-600 w-8 h-8" /> :
                                                    <span className="text-gray-400">#{index + 1}</span>}
                                    </div>
                                    <div>
                                        <div className="font-bold text-gray-800 flex items-center gap-2">
                                            {entry.name}
                                            {index === 0 && <span className="bg-primary/10 text-primary text-[10px] uppercase px-2 py-0.5 rounded-full font-black">Top 1</span>}
                                        </div>
                                        <div className="text-xs text-gray-500 uppercase tracking-tighter">{entry.difficulty} mode</div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-black text-primary">{entry.score.toLocaleString()}</div>
                                    <div className="text-[10px] text-gray-400 italic">
                                        {entry.timestamp ? new Date(entry.timestamp.seconds * 1000).toLocaleDateString() : 'Just now'}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default Leaderboard;
