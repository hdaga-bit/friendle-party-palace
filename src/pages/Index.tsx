import AppHeader from "@/components/layout/AppHeader";
import { Button } from "@/components/ui/button";
import HeroBlob from "@/components/HeroBlob";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const navigate = useNavigate();

  function go(mode: "duel" | "battle") {
    if (!name) return;
    navigate(`/${mode}?name=${encodeURIComponent(name)}`);
  }

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <main className="relative max-w-6xl mx-auto px-4 pt-20 pb-24 text-center animate-enter">
        <HeroBlob />
        <h1 className="font-display text-6xl md:text-7xl font-bold tracking-tight">FriendlePlus</h1>
        <p className="mt-2 text-lg text-muted-foreground">Wordle with more than 2 Friends</p>

        <div className="mt-10 mx-auto max-w-md space-y-4 relative">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="hero" size="xl" className="w-full">Play 1v1</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="font-display">Play 1v1</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label>Your Name</Label>
                  <Input value={name} onChange={(e)=>setName(e.target.value)} placeholder="Enter name" />
                </div>
                <div className="grid gap-2">
                  <Label>Join Room (optional)</Label>
                  <Input value={room} onChange={(e)=>setRoom(e.target.value.toUpperCase())} placeholder="ROOMID" />
                </div>
                <div className="flex gap-3">
                  <Button className="flex-1" onClick={()=>go("duel")}>Create Room</Button>
                  <Button variant="secondary" className="flex-1" onClick={()=> room && navigate(`/duel/lobby/${room}?name=${encodeURIComponent(name)}`)} disabled={!name || !room}>Join Room</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="hero" size="xl" className="w-full">Play Battle Royale</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="font-display">Battle Royale</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label>Your Name</Label>
                  <Input value={name} onChange={(e)=>setName(e.target.value)} placeholder="Enter name" />
                </div>
                <div className="grid gap-2">
                  <Label>Join Room (optional)</Label>
                  <Input value={room} onChange={(e)=>setRoom(e.target.value.toUpperCase())} placeholder="ROOMID" />
                </div>
                <div className="flex gap-3">
                  <Button className="flex-1" onClick={()=>go("battle")}>Create Room</Button>
                  <Button variant="secondary" className="flex-1" onClick={()=> room && navigate(`/battle/lobby/${room}?name=${encodeURIComponent(name)}`)} disabled={!name || !room}>Join Room</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </main>
    </div>
  );
};

export default Index;
