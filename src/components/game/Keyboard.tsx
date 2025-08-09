import React from "react";

const rows: string[][] = [
  "QWERTYUIOP".split(""),
  "ASDFGHJKL".split(""),
  ["ENTER", ..."ZXCVBNM".split(""), "BACKSPACE"],
];

type KeyState = "correct" | "present" | "absent" | undefined;

export default function Keyboard({ onKey, keyStatuses = {} as Record<string, KeyState> }: { onKey?: (k: string) => void; keyStatuses?: Record<string, KeyState> }) {
  function keyClass(k: string) {
    const state = keyStatuses[k];
    const base = "min-w-10 px-3 py-2 rounded-md border transition-colors text-sm font-medium select-none";
    if (state === "correct") return `${base} bg-primary text-primary-foreground border-transparent`;
    if (state === "present") return `${base} bg-accent text-accent-foreground border-transparent`;
    if (state === "absent") return `${base} bg-muted text-muted-foreground`;
    return `${base} bg-muted/30 hover:bg-muted`;
  }

  const label = (k: string) => (k === "BACKSPACE" ? "⌫" : k);

  return (
    <div className="mt-6 space-y-2" aria-label="On-screen keyboard">
      {rows.map((r, i) => (
        <div key={i} className="flex justify-center gap-2">
          {r.map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => onKey?.(k)}
              className={keyClass(k)}
              aria-label={k}
            >
              {label(k)}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}
