import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate, useParams, Outlet } from "react-router-dom";
import { LanguageProvider, useLanguage, isSupportedLangCode, detectBrowserLanguage } from "@/contexts/LanguageContext";
import { useEffect } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const DEFAULT_LANG = "en" as const;

function detectPreferredLang(): string {
  const saved = localStorage.getItem("preferred-language");
  if (isSupportedLangCode(saved)) return saved;
  const detected = detectBrowserLanguage();
  if (isSupportedLangCode(detected)) return detected;
  return DEFAULT_LANG;
}

function RootRedirect() {
  const navigate = useNavigate();
  useEffect(() => {
    const target = detectPreferredLang();
    navigate(`/${target}`, { replace: true });
  }, [navigate]);
  return null;
}

function LangLayout() {
  const params = useParams();
  const langParam = params.lang;
  const { language, setLanguage } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isSupportedLangCode(langParam)) {
      const target = detectPreferredLang();
      navigate(`/${target}`, { replace: true });
      return;
    }
    if (language !== langParam) {
      setLanguage(langParam);
    }
  }, [langParam, language, setLanguage, navigate]);

  return <Outlet />;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<RootRedirect />} />
            <Route path=":lang/*" element={<LangLayout />}>
              <Route index element={<Index />} />
              <Route path="*" element={<NotFound />} />
            </Route>
            <Route path="*" element={<RootRedirect />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
