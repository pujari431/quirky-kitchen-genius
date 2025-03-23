
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { useEffect } from "react";
import { useSupabase } from "./hooks/useSupabase";
import { toast } from "sonner";

const queryClient = new QueryClient();

const SupabaseConfigCheck = () => {
  const { isSupabaseConfigured } = useSupabase();

  useEffect(() => {
    if (!isSupabaseConfigured) {
      toast.warning(
        "Supabase is not configured correctly",
        {
          description: "Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your environment variables.",
          duration: 10000,
          id: "supabase-config-warning"
        }
      );
    }
  }, [isSupabaseConfigured]);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <SupabaseConfigCheck />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
