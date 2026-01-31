// @ts-nocheck
// React and standard libs
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";

// BVX Standard Components
import { Layout } from './components/Layout';
import { Scripts } from './components/Scripts';
import { SEO } from './components/SEO';

// Lovable Generated Pages
import Index from "./pages/Index";
import Articles from "./pages/Articles";
import ArticleDetail from "./pages/ArticleDetail";
import Search from "./pages/Search";
import Tools from "./pages/Tools";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Sitemap from "./pages/Sitemap";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <TooltipProvider>
        <Toaster />
        <Scripts />
        <SEO title="Intern Action Functions" description="Intern Action Functions" image="/og-image.png" />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/artigos" element={<Articles />} />
          <Route path="/artigo/:slug" element={<ArticleDetail />} />
          <Route path="/busca" element={<Search />} />
          <Route path="/ferramentas" element={<Tools />} />
          <Route path="/privacidade" element={<Privacy />} />
          <Route path="/termos" element={<Terms />} />
          <Route path="/sobre" element={<About />} />
          <Route path="/contato" element={<Contact />} />
          <Route path="/sitemap" element={<Sitemap />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;