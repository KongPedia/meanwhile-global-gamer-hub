import { Button } from "@/components/ui/button";
import LanguageSelector from "@/components/LanguageSelector";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState, useEffect } from "react";

const DISCORD_INVITE_LINK = import.meta.env.VITE_DISCORD_INVITE_LINK;

const Navigation = () => {
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-background/95 backdrop-blur-md border-b border-border' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="font-bold text-lg text-foreground">
          MeanWhile
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <button 
            onClick={() => scrollToSection('features')}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            {t('nav.features')}
          </button>
          <button 
            onClick={() => scrollToSection('demo')}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            {t('nav.demo')}
          </button>
          <button 
            onClick={() => scrollToSection('community')}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            {t('nav.community')}
          </button>
        </div>

        <div className="flex items-center space-x-3">
          <LanguageSelector />
          <Button 
            variant="default" 
            size="sm"
            onClick={() => window.open(DISCORD_INVITE_LINK, '_blank')}
            className="hidden sm:inline-flex"
          >
            {t('nav.joinDiscord')}
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;