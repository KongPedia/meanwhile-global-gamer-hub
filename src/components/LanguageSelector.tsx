import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Languages } from 'lucide-react';
import { useLanguage, Language, getSupportedLanguageCodes } from '@/contexts/LanguageContext';

const LANGUAGE_LABELS: Record<Language, { name: string; flag: string }> = {
  ko: { name: '한국어', flag: '🇰🇷' },
  en: { name: 'English', flag: '🇺🇸' },
  ja: { name: '日本語', flag: '🇯🇵' },
  zh: { name: '中文', flag: '🇨🇳' },
  es: { name: 'Español', flag: '🇪🇸' }
};

const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageChange = (newLang: Language) => {
    setLanguage(newLang);
    // replace first path segment with the new language, preserving rest
    const currentPath = location.pathname;
    const segments = currentPath.split('/').filter(Boolean);
    if (segments.length === 0) {
      navigate(`/${newLang}`, { replace: true });
    } else {
      segments[0] = newLang;
      const nextPath = `/${segments.join('/')}${location.search}${location.hash}`;
      navigate(nextPath, { replace: true });
    }
    setIsOpen(false);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="gap-2 min-w-0 px-3 py-2 h-auto bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/80 transition-all duration-200"
        >
          <Languages className="h-4 w-4 flex-shrink-0" />
          <span className="hidden sm:inline text-sm font-medium">
            {LANGUAGE_LABELS[language].flag} {LANGUAGE_LABELS[language].name}
          </span>
          <span className="sm:hidden text-sm">
            {LANGUAGE_LABELS[language].flag}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-44 bg-card/95 backdrop-blur-md border-border/50"
      >
        {getSupportedLanguageCodes().map((code) => (
          <DropdownMenuItem
            key={code}
            onClick={() => handleLanguageChange(code as Language)}
            className={`cursor-pointer gap-3 px-3 py-2 text-sm transition-colors ${
              language === code 
                ? 'bg-primary/10 text-primary font-medium' 
                : 'hover:bg-muted/50'
            }`}
          >
            <span className="text-base">{LANGUAGE_LABELS[code as Language].flag}</span>
            <span className="flex-1">{LANGUAGE_LABELS[code as Language].name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;