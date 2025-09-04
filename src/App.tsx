import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";

import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";
import GeneralPrimaryCare from "./pages/GeneralPrimaryCare";
import MindBehavior from "./pages/MindBehavior";
import HeartCirculatory from "./pages/HeartCirculatory";
import BonesMusclesMovement from "./pages/BonesMusclesMovement";
import EyesEarsNoseThroat from "./pages/eyes";
import SkinHairAppearance from "./pages/skin";
import HormonesMetabolism from "./pages/hormones";
import TeethAndMouth from "./pages/teeth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/general-primary-care" element={<GeneralPrimaryCare />} />
            <Route path="/mind-behavior" element={<MindBehavior />} />
            <Route path="/heart-circulatory" element={<HeartCirculatory />} />
            <Route path="/bones-muscles-movement" element={<BonesMusclesMovement />} />
            <Route path="/eyes" element={<EyesEarsNoseThroat />} />
            <Route path="/skin" element={<SkinHairAppearance />} />
            <Route path="/hormones" element={<HormonesMetabolism />} />
            <Route path="/teeth" element={<TeethAndMouth />} />
            {/* catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;