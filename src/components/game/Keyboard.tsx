import React from "react";

const rows = [
  "QWERTYUIOP".split(""),
  "ASDFGHJKL".split(""),
  ["Z","X","C","V","B","N","M"],
];

export default function Keyboard({ onKey }: { onKey?: (k: string) => void }) {
  return (
    <div className="mt-6 space-y-2">
      {rows.map((r, i) => (
        <div key={i} className="flex justify-center gap-2">
          {r.map((k) => (
            <button
              key={k}
              onClick={() => onKey?.(k)}
              className="min-w-10 px-3 py-2 rounded-md border bg-muted/30 hover:bg-muted transition-colors text-sm font-medium"
            >
              {k}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}
