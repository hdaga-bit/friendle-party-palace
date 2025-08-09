import AppHeader from "@/components/layout/AppHeader";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Results() {
  return (
    <div className="min-h-screen">
      <AppHeader />
      <main className="max-w-3xl mx-auto px-4 py-16 text-center animate-enter">
        <h1 className="font-display text-5xl">Winner!</h1>
        <p className="mt-2 text-muted-foreground">Congrats to the champion. Play again?</p>
        <div className="mt-6 flex gap-3 justify-center">
          <Button asChild variant="hero" size="xl"><Link to="/">Back Home</Link></Button>
          <Button asChild variant="secondary" size="lg"><Link to="/battle">New Battle</Link></Button>
        </div>
      </main>
    </div>
  );
}
