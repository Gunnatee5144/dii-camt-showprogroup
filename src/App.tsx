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
import Courses from "./pages/Courses";
import Schedule from "./pages/Schedule";
import Grades from "./pages/Grades";
import Activities from "./pages/Activities";
import Portfolio from "./pages/Portfolio";
import Internships from "./pages/Internships";
import Requests from "./pages/Requests";
import Messages from "./pages/Messages";
import Settings from "./pages/Settings";
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
              <Route path="/courses" element={<Courses />} />
              <Route path="/schedule" element={<Schedule />} />
              <Route path="/grades" element={<Grades />} />
              <Route path="/activities" element={<Activities />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/internships" element={<Internships />} />
              <Route path="/requests" element={<Requests />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/settings" element={<Settings />} />
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
