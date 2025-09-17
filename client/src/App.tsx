import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import Home from "./pages/Home";
import Warning from "./pages/Warning";
import News from "./pages/News";
import SingleNews from "./pages/SingleNews";
import Contact from "./pages/Contact";
import APK from "./pages/APK";
import NotFound from "./pages/NotFound";
import ApiPage from "./pages/Api";
import Admin from "./pages/Admin/Adminpnael";
import TermsAndConditions from "./pages/Condition";
import Login from "./pages/Login";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/warning" element={<Warning />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:slug" element={<SingleNews />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/apk" element={<APK />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/Get API" element={<ApiPage />} />
          <Route path="/Rz7" element={<Admin/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/condition" element={<TermsAndConditions />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
