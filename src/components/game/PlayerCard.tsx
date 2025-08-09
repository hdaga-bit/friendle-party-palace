import React from "react";

interface PlayerCardProps {
  name: string;
  rating?: number;
  isHost?: boolean;
  progress?: string;
}

export default function PlayerCard({ name, rating = 1000, isHost, progress }: PlayerCardProps) {
  return (
    <div className="rounded-lg border bg-card p-4">
      <div className="flex items-center justify-between">
        <div className="font-semibold">{name} {isHost && <span className="text-sm text-muted-foreground">(Host)</span>}</div>
        {progress && <div className="text-sm text-muted-foreground">{progress}</div>}
      </div>
      <div className="text-sm text-muted-foreground">Rating: <b className="text-foreground">{rating}</b></div>
    </div>
  );
}
