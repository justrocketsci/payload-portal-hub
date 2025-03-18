
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Index from "./pages/Index";
import Guides from "./pages/Guides";
import GuideDetail from "./pages/GuideDetail";
import Submit from "./pages/Submit";
import NotFound from "./pages/NotFound";
import AuthModal from "./components/ui/AuthModal";

const queryClient = new QueryClient();

const App = () => {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authView, setAuthView] = useState<'login' | 'register'>('login');

  const openLoginModal = () => {
    setAuthView('login');
    setAuthModalOpen(true);
  };

  const openRegisterModal = () => {
    setAuthView('register');
    setAuthModalOpen(true);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/guides" element={<Guides />} />
            <Route path="/guides/:id" element={<GuideDetail />} />
            <Route path="/submit" element={<Submit />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          
          <AuthModal 
            isOpen={authModalOpen} 
            onClose={() => setAuthModalOpen(false)} 
            defaultView={authView}
          />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
