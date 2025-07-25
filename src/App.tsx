
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Assessments from "./components/Assessments";
import AssessmentTest from "./pages/AssessmentTest";
import AssessmentReport from "./pages/AssessmentReport";
import MyReports from "./pages/MyReports";
import MySubscription from "./pages/MySubscription";
import Profile from "./pages/Profile";
import Support from "./pages/Support";
import DeleteAccount from "./pages/DeleteAccount";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/assessments" element={<Assessments />} />
          <Route path="/my-reports" element={<MyReports />} />
          <Route path="/my-subscription" element={<MySubscription />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/support" element={<Support />} />
        <Route path="/delete-account" element={<DeleteAccount />} />
        <Route path="/assessment/:assessmentId" element={<AssessmentTest />} />
        <Route path="/assessment/:assessmentId/report/:sessionId" element={<AssessmentReport />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
