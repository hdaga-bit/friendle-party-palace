import AppHeader from "@/components/layout/AppHeader";
import GuessGrid from "@/components/game/GuessGrid";
import Keyboard from "@/components/game/Keyboard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

function evaluateGuess(guess: string, answer: string) {
  const res: ("correct" | "present" | "absent")[] = Array(guess.length).fill("absent");
  const a = answer.toUpperCase();
  const g = guess.toUpperCase();
  const counts: Record<string, number> = {};
  for (let i = 0; i < a.length; i++) counts[a[i]] = (counts[a[i]] || 0) + 1;
  for (let i = 0; i < g.length; i++) if (g[i] === a[i]) { res[i] = "correct"; counts[g[i]]!--; }
  for (let i = 0; i < g.length; i++) if (res[i] !== "correct") { const ch = g[i]; if (counts[ch] > 0) { res[i] = "present"; counts[ch]!--; } }
  return res;
}

export default function DuelGame() {
  const { roomId } = useParams();
  const [guess, setGuess] = useState("");
  const [guesses, setGuesses] = useState<string[]>([]);

  // Temporary local answer to enable Wordle coloring in UI (replace with server evaluation when wired)
  const ANSWER = "CRANE";

  const keyStatuses = useMemo(() => {
    const status: Record<string, "correct" | "present" | "absent"> = {};
    for (const g of guesses) {
      const evals = evaluateGuess(g, ANSWER);
      for (let i = 0; i < g.length; i++) {
        const ch = g[i].toUpperCase();
        const prev = status[ch];
        const cur = evals[i];
        if (cur === "correct" || (cur === "present" && prev !== "correct") || (!prev && cur === "absent")) {
          status[ch] = cur;
        }
      }
    }
    return status;
  }, [guesses]);

  function onVirtualKey(k: string) {
    const key = k.toUpperCase();
    if (key === "ENTER") return onEnter();
    if (key === "BACKSPACE") return setGuess((s) => s.slice(0, -1));
    if (/^[A-Z]$/.test(key) && guess.length < 5) setGuess((s) => s + key);
  }

  function onEnter() {
    if (guess.length === 5) {
      setGuesses((prev) => [...prev, guess.toUpperCase()]);
      setGuess("");
    }
  }

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;
      if (key === "Enter") return onEnter();
      if (key === "Backspace") return setGuess((s) => s.slice(0, -1));
      const ch = key.toUpperCase();
      if (/^[A-Z]$/.test(ch) && ch.length === 1 && guess.length < 5) setGuess((s) => s + ch);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [guess]);

  return (
    <div className="min-h-screen">
      <AppHeader />
      <main className="max-w-5xl mx-auto px-4 py-8 animate-enter">
        <h1 className="font-display text-3xl mb-6">1v1 — Room {roomId}</h1>
        <div className="grid gap-8 md:grid-cols-2">
          <section>
            <h2 className="font-semibold mb-2">Your Guesses</h2>
            <GuessGrid guesses={guesses} currentGuess={guess} solution={ANSWER} />
            <div className="mt-4 flex gap-2">
              <Input value={guess} onChange={(e)=>setGuess(e.target.value.toUpperCase())} maxLength={5} placeholder="Guess" />
              <Button onClick={onEnter} disabled={guess.length!==5}>Guess</Button>
            </div>
            <Keyboard onKey={onVirtualKey} keyStatuses={keyStatuses} />
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
