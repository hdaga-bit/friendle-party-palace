import AppHeader from "@/components/layout/AppHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function BattleSetup() {
  const [nameParam] = useSearchParams();
  const [name, setName] = useState(nameParam.get("name") || "");
  const [roomId, setRoomId] = useState("");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <AppHeader />
      <main className="max-w-3xl mx-auto px-4 py-8 animate-enter">
        <h1 className="font-display text-4xl">Battle Royale — Create or Join</h1>
        <p className="text-muted-foreground">Host sets a secret word. First to guess wins.</p>
        <div className="mt-6 grid gap-4 max-w-md">
          <div className="grid gap-2">
            <Label>Your Name</Label>
            <Input value={name} onChange={(e)=>setName(e.target.value)} placeholder="Name" />
          </div>
          <div className="grid gap-2">
            <Label>Room ID</Label>
            <Input value={roomId} onChange={(e)=>setRoomId(e.target.value.toUpperCase())} placeholder="ROOMID" />
          </div>
          <div className="flex gap-3">
            <Button className="flex-1" onClick={()=>navigate(`/battle/lobby/NEW-${Math.random().toString(36).slice(2,7).toUpperCase()}?name=${encodeURIComponent(name)}`)} disabled={!name}>Create Room</Button>
            <Button variant="secondary" className="flex-1" disabled={!name || !roomId} onClick={()=>navigate(`/battle/lobby/${roomId}?name=${encodeURIComponent(name)}`)}>Join</Button>
          </div>
        </div>
      </main>
    </div>
  );
}
