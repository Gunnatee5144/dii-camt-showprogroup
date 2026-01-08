import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              {/* Placeholder routes - can be expanded later */}
              <Route path="/courses" element={<Dashboard />} />
              <Route path="/schedule" element={<Dashboard />} />
              <Route path="/grades" element={<Dashboard />} />
              <Route path="/activities" element={<Dashboard />} />
              <Route path="/portfolio" element={<Dashboard />} />
              <Route path="/internships" element={<Dashboard />} />
              <Route path="/requests" element={<Dashboard />} />
              <Route path="/messages" element={<Dashboard />} />
              <Route path="/settings" element={<Dashboard />} />
              <Route path="/students" element={<Dashboard />} />
              <Route path="/assignments" element={<Dashboard />} />
              <Route path="/appointments" element={<Dashboard />} />
              <Route path="/users" element={<Dashboard />} />
              <Route path="/reports" element={<Dashboard />} />
              <Route path="/notifications" element={<Dashboard />} />
              <Route path="/audit" element={<Dashboard />} />
              <Route path="/job-postings" element={<Dashboard />} />
              <Route path="/applicants" element={<Dashboard />} />
              <Route path="/student-profiles" element={<Dashboard />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
