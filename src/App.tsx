import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Layout from "@/components/layout/Layout";
import { lazy, Suspense } from "react";

const Index = lazy(() => import("./pages/Index"));
const ServicesPage = lazy(() => import("./pages/Services"));
const ProjectsPage = lazy(() => import("./pages/Projects"));
const AboutPage = lazy(() => import("./pages/About"));
const ContactPage = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));
const AdminPanel = lazy(() => import("@/pages/AdminPanel"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<div className="min-h-screen bg-[#080B14]" />}>
          <Routes>
            <Route path="/admin" element={<AdminPanel />} />
            <Route element={<Layout />}>
              <Route path="/" element={<Index />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />

              {/* ✅ Redirect capital-letter URLs that Google crawled */}
              <Route path="/About" element={<Navigate to="/about" replace />} />
              <Route path="/Contact" element={<Navigate to="/contact" replace />} />
              <Route path="/Services" element={<Navigate to="/services" replace />} />
              <Route path="/Projects" element={<Navigate to="/projects" replace />} />

              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;