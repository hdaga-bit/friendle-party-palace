import React from "react";

export type CellState = "correct" | "present" | "absent" | "empty";

interface GuessGridProps {
  rows?: number;
  cols?: number;
  guesses?: string[]; // submitted guesses
  currentGuess?: string; // in-progress guess
  solution?: string; // optional, used to compute states client-side
  evaluations?: CellState[][]; // optional states from server (preferred if provided)
}

function evaluateGuess(guess: string, answer: string): CellState[] {
  const res: CellState[] = Array(guess.length).fill("absent");
  const a = answer.toUpperCase();
  const g = guess.toUpperCase();
  const counts: Record<string, number> = {};
  for (let i = 0; i < a.length; i++) counts[a[i]] = (counts[a[i]] || 0) + 1;
  // First pass: correct
  for (let i = 0; i < g.length; i++) {
    if (g[i] === a[i]) {
      res[i] = "correct";
      counts[g[i]]!--;
    }
  }
  // Second pass: present
  for (let i = 0; i < g.length; i++) {
    if (res[i] === "correct") continue;
    const ch = g[i];
    if (counts[ch] > 0) {
      res[i] = "present";
      counts[ch]!--;
    } else {
      res[i] = "absent";
    }
  }
  return res;
}

export default function GuessGrid({ rows = 6, cols = 5, guesses = [], currentGuess = "", solution, evaluations }: GuessGridProps) {
  const submitted = guesses.slice(0, rows).map((g, idx) => {
    const evalRow = evaluations?.[idx];
    if (evalRow && evalRow.length === cols) return { word: g, states: evalRow };
    if (solution && solution.length === cols) return { word: g, states: evaluateGuess(g, solution) };
    return { word: g, states: Array(cols).fill("empty") as CellState[] };
  });

  const currentRow = currentGuess ? [{ word: currentGuess, states: Array(cols).fill("empty") as CellState[] }] : [];
  const totalRows = [...submitted, ...currentRow];
  while (totalRows.length < rows) totalRows.push({ word: "", states: Array(cols).fill("empty") as CellState[] });

  function cellClasses(state: CellState) {
    const base = "aspect-square rounded-md border flex items-center justify-center text-xl font-semibold transition-colors";
    switch (state) {
      case "correct":
        return `${base} bg-primary text-primary-foreground border-transparent`;
      case "present":
        return `${base} bg-accent text-accent-foreground border-transparent`;
      case "absent":
        return `${base} bg-muted text-muted-foreground`;
      default:
        return `${base} bg-muted/40 text-foreground`;
    }
  }

  return (
    <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${cols}, minmax(44px, 1fr))` }}>
      {totalRows.flatMap((row, rIdx) =>
        Array.from({ length: cols }).map((_, cIdx) => {
          const ch = row.word?.[cIdx]?.toUpperCase() ?? "";
          const state = row.states?.[cIdx] ?? "empty";
          return (
            <div key={`${rIdx}-${cIdx}`} className={cellClasses(state)} aria-label={`r${rIdx + 1}c${cIdx + 1} ${state}`}>
              {ch}
            </div>
          );
        })
      )}
    </div>
  );
}
