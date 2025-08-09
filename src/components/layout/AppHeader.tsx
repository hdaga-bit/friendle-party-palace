import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";
import { Link } from "react-router-dom";

export default function AppHeader() {
  return (
    <header className="w-full sticky top-0 z-30 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Left: Donate */}
        <div className="flex items-center gap-3">
          <Button asChild variant="accent" size="lg" className="rounded-full">
            <a href="#donate" aria-label="Donate to support FriendlePlus">Donate</a>
          </Button>
        </div>
        {/* Right: Logo */}
        <Link to="/" className="hover-scale" aria-label="FriendlePlus Home">
          <Logo />
        </Link>
      </div>
    </header>
  );
}
