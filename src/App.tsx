import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "next-themes";
import Index from "./pages/Index";
import AuthPage from "./pages/AuthPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import Dashboard from "./pages/Dashboard";
import VenturePacksPage from "./pages/VenturePacksPage";
import VentureDetailsPage from "./pages/VentureDetailsPage";
import BookingsPage from "./pages/BookingsPage";
import ProfilePage from "./pages/ProfilePage";
import BookingPage from "./pages/BookingPage";
import PlanBuilderPage from "./pages/PlanBuilderPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange={false}
    >
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <div className="transition-all duration-500 ease-in-out">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/home" element={<Index />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/signin" element={<SignInPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/venture-packs" element={<VenturePacksPage />} />
                <Route path="/venture-packs/:id" element={<VentureDetailsPage />} />
                <Route path="/booking" element={<BookingPage />} />
                <Route path="/plan" element={<PlanBuilderPage />} />
                <Route path="/bookings" element={<BookingsPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
