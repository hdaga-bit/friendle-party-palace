import AppHeader from "@/components/layout/AppHeader";
import GuessGrid from "@/components/game/GuessGrid";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function DuelGame() {
  const { roomId } = useParams();
  const [guess, setGuess] = useState("");
  const [guesses, setGuesses] = useState<string[]>([]);

  return (
    <div className="min-h-screen">
      <AppHeader />
      <main className="max-w-5xl mx-auto px-4 py-8 animate-enter">
        <h1 className="font-display text-3xl mb-6">1v1 — Room {roomId}</h1>
        <div className="grid gap-8 md:grid-cols-2">
          <section>
            <h2 className="font-semibold mb-2">Your Guesses</h2>
            <GuessGrid guesses={guesses} />
            <div className="mt-4 flex gap-2">
              <Input value={guess} onChange={(e)=>setGuess(e.target.value)} maxLength={5} placeholder="Guess" />
              <Button onClick={()=>{ setGuesses((prev)=>[...prev, guess]); setGuess(""); }}>Guess</Button>
            </div>
          </section>
          <section>
            <h2 className="font-semibold mb-2">Opponent</h2>
            <GuessGrid />
          </section>
        </div>
      </main>
    </div>
  );
}
