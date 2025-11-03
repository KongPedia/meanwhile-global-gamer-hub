import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate, useParams, Outlet, useLocation } from "react-router-dom";
import { LanguageProvider, useLanguage, isSupportedLangCode, detectBrowserLanguage } from "@/contexts/LanguageContext";
import { HelmetProvider } from "react-helmet-async";
import { useEffect } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import DailyReportPage from "./pages/reports/DailyReportPage";
import MilestoneReportPage from "./pages/reports/MilestoneReportPage";

import { getSupportedLanguageCodes } from "@/contexts/LanguageContext";
import { updateI18nSeo } from "@/lib/seo";

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
  const location = useLocation();

  useEffect(() => {
    if (!isSupportedLangCode(langParam)) {
      const target = detectPreferredLang();
      navigate(`/${target}`, { replace: true });
      return;
    }

    // Check if user has a saved language preference
    const savedLang = localStorage.getItem("preferred-language");
    
    // If saved language exists and differs from URL, redirect to saved language
    if (isSupportedLangCode(savedLang) && savedLang !== langParam) {
      const newPath = location.pathname.replace(`/${langParam}`, `/${savedLang}`);
      navigate(`${newPath}${location.search}${location.hash}`, { replace: true });
      return;
    }

    // Sync context language with URL parameter
    if (language !== langParam) {
      setLanguage(langParam);
    }

    // Update SEO tags when language or path changes
    updateI18nSeo({
      currentLang: langParam!,
      supportedLangs: getSupportedLanguageCodes(),
      defaultLang: DEFAULT_LANG,
      siteUrl: import.meta.env.VITE_SITE_URL,
      pathname: location.pathname,
      search: location.search,
      hash: location.hash,
    });
  }, [langParam, language, setLanguage, navigate, location.pathname, location.search, location.hash]);

  return <Outlet />;
}

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<RootRedirect />} />
              <Route path=":lang" element={<LangLayout />}>
                <Route index element={<Index />} />
                <Route path="reports/daily/:game/:date" element={<DailyReportPage />} />
                <Route path="reports/milestone/:game/:milestoneId" element={<MilestoneReportPage />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
