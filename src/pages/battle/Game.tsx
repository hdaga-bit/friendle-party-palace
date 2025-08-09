import AppHeader from "@/components/layout/AppHeader";
import GuessGrid from "@/components/game/GuessGrid";
import Keyboard from "@/components/game/Keyboard";
import PlayerCard from "@/components/game/PlayerCard";
import { useParams } from "react-router-dom";
import { useState } from "react";

export default function BattleGame() {
  const { roomId } = useParams();
  const [guesses, setGuesses] = useState<string[]>([]);
  const [current, setCurrent] = useState("");
  const players = [
    { id: '1', name: 'You', progress: `${guesses.length}/6` },
    { id: '2', name: 'Rival', progress: '2/6' },
  ];

  function onKey(k: string) {
    if (/[A-Z]/.test(k) && current.length < 5) setCurrent((s) => s + k);
  }

  return (
    <div className="min-h-screen">
      <AppHeader />
      <main className="max-w-6xl mx-auto px-4 py-8 animate-enter">
        <div className="flex items-center justify-between">
          <h1 className="font-display text-3xl">Battle Royale — Room {roomId}</h1>
          <div className="text-sm text-muted-foreground">Fewest guesses wins</div>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mt-6">
          <section className="md:col-span-2">
            <GuessGrid guesses={[...guesses, current]} />
            <Keyboard onKey={onKey} />
          </section>
          <aside className="space-y-3">
            <h2 className="font-semibold">Leaderboard</h2>
            {players.map((p) => (
              <PlayerCard key={p.id} name={p.name} progress={p.progress} />
            ))}
          </aside>
        </div>
      </main>
    </div>
  );
}
