import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Languages } from 'lucide-react';
import { useLanguage, Language } from '@/contexts/LanguageContext';

const languages = {
  ko: { name: '한국어', flag: '🇰🇷' },
  en: { name: 'English', flag: '🇺🇸' },
  ja: { name: '日本語', flag: '🇯🇵' },
  zh: { name: '中文', flag: '🇨🇳' },
  es: { name: 'Español', flag: '🇪🇸' }
};

const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageChange = (newLang: Language) => {
    setLanguage(newLang);
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
            {languages[language].flag} {languages[language].name}
          </span>
          <span className="sm:hidden text-sm">
            {languages[language].flag}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-44 bg-card/95 backdrop-blur-md border-border/50"
      >
        {Object.entries(languages).map(([code, lang]) => (
          <DropdownMenuItem
            key={code}
            onClick={() => handleLanguageChange(code as Language)}
            className={`cursor-pointer gap-3 px-3 py-2 text-sm transition-colors ${
              language === code 
                ? 'bg-primary/10 text-primary font-medium' 
                : 'hover:bg-muted/50'
            }`}
          >
            <span className="text-base">{lang.flag}</span>
            <span className="flex-1">{lang.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;