
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import { useEffect } from "react";
import { useSupabase } from "./hooks/useSupabase";
import { toast } from "sonner";
import AuthWrapper from "./components/auth/AuthWrapper";

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
      
      // Add a more visible error message for development
      console.error(
        "%c⚠️ Supabase Configuration Missing ⚠️",
        "background: #ff5555; color: white; font-size: 14px; padding: 5px;",
        "\nTo use authentication and database features, you need to connect to Supabase:",
        "\n1. Create a Supabase project at https://supabase.com",
        "\n2. Get your project URL and anon key from the project settings",
        "\n3. Add them to your environment variables as VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY"
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
          <Route path="/" element={<AuthWrapper requireAuth={false}><Index /></AuthWrapper>} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
