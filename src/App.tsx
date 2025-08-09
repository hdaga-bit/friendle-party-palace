import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import DuelSetup from "./pages/duel/Setup";
import BattleSetup from "./pages/battle/Setup";
import WaitingRoom from "./pages/lobby/WaitingRoom";
import DuelGame from "./pages/duel/Game";
import BattleGame from "./pages/battle/Game";
import Results from "./pages/Results";
import RoomNotFound from "./pages/RoomNotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/duel" element={<DuelSetup />} />
          <Route path="/battle" element={<BattleSetup />} />
          <Route path="/lobby/:mode/:roomId" element={<WaitingRoom />} />
          <Route path="/duel/lobby/:roomId" element={<WaitingRoom />} />
          <Route path="/battle/lobby/:roomId" element={<WaitingRoom />} />
          <Route path="/duel/game/:roomId" element={<DuelGame />} />
          <Route path="/battle/game/:roomId" element={<BattleGame />} />
          <Route path="/results" element={<Results />} />
          <Route path="/room-not-found" element={<RoomNotFound />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
