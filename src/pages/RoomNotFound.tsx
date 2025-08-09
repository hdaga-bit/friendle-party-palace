import AppHeader from "@/components/layout/AppHeader";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function RoomNotFound() {
  return (
    <div className="min-h-screen">
      <AppHeader />
      <main className="max-w-3xl mx-auto px-4 py-24 text-center animate-enter">
        <h1 className="font-display text-5xl mb-2">Room not found</h1>
        <p className="text-muted-foreground">The room ID is invalid or expired.</p>
        <div className="mt-6">
          <Button asChild><Link to="/">Return Home</Link></Button>
        </div>
      </main>
    </div>
  );
}
