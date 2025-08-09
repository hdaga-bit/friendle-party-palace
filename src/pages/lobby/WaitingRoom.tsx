import AppHeader from "@/components/layout/AppHeader";
import PlayerCard from "@/components/game/PlayerCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function WaitingRoom() {
  const { mode, roomId } = useParams<{ mode: string; roomId: string }>();
  const [params] = useSearchParams();
  const name = params.get("name") || "Player";
  const [secret, setSecret] = useState("");
  const [hostWord, setHostWord] = useState("");
  const navigate = useNavigate();

  const players = [
    { id: "1", name, isHost: true },
    { id: "2", name: "Opponent" },
  ];

  return (
    <div className="min-h-screen">
      <AppHeader />
      <main className="max-w-6xl mx-auto px-4 py-8 animate-enter">
        <div className="flex items-center justify-between">
          <h1 className="font-display text-3xl">Room {roomId}</h1>
          <span className="text-muted-foreground capitalize">Mode: {mode}</span>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <section className="md:col-span-2 space-y-3">
            <h2 className="font-semibold">Players</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {players.map((p) => (
                <PlayerCard key={p.id} name={p.name} isHost={p.isHost} rating={1000} />
              ))}
            </div>
          </section>

          <aside className="space-y-4">
            {mode === "duel" ? (
              <div className="grid gap-2 rounded-lg border p-4">
                <Label>Your Secret Word</Label>
                <Input value={secret} onChange={(e)=>setSecret(e.target.value)} maxLength={5} placeholder="5 letters" />
                <Button onClick={()=>navigate(`/duel/game/${roomId}`)}>Set & Continue</Button>
              </div>
            ) : (
              <div className="grid gap-2 rounded-lg border p-4">
                <Label>Host Secret Word</Label>
                <Input value={hostWord} onChange={(e)=>setHostWord(e.target.value)} maxLength={5} placeholder="5 letters" />
                <Button onClick={()=>navigate(`/battle/game/${roomId}`)}>Start Battle</Button>
              </div>
            )}
          </aside>
        </div>
      </main>
    </div>
  );
}
