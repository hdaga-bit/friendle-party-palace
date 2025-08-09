import React from "react";

interface GuessGridProps {
  rows?: number;
  cols?: number;
  guesses?: string[];
}

export default function GuessGrid({ rows = 6, cols = 5, guesses = [] }: GuessGridProps) {
  const grid = Array.from({ length: rows }, (_, r) =>
    Array.from({ length: cols }, (_, c) => guesses[r]?.[c] ?? "")
  );

  return (
    <div className="grid gap-2" style={{gridTemplateColumns: `repeat(${cols}, minmax(44px, 1fr))`}}>
      {grid.flatMap((row, rIdx) =>
        row.map((ch, cIdx) => (
          <div
            key={`${rIdx}-${cIdx}`}
            className="aspect-square rounded-md border bg-muted/40 flex items-center justify-center text-xl font-semibold text-foreground"
          >
            {ch.toUpperCase()}
          </div>
        ))
      )}
    </div>
  );
}
