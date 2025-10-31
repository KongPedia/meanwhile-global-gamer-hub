import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const DISCORD_INVITE_LINK = import.meta.env.VITE_DISCORD_INVITE_LINK;

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="py-12 px-4 border-t border-border">
      <div className="container mx-auto">
        <div className="text-center">
          <div className="mb-8">
            <h3 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
              {t('common.footer.title')}
            </h3>
            <p className="text-muted-foreground">
              {t('common.footer.subtitle')}
            </p>
          </div>
          <div className="flex justify-center mb-8">
            <Button 
              variant="discord" 
              size="lg"
              className="animate-pulse-neon text-lg px-8 py-4"
              onClick={() => window.open(DISCORD_INVITE_LINK, '_blank')}
            >
              {t('common.footer.discord')}
            </Button>
          </div>
          
          <div className="text-sm text-muted-foreground">
            <p>{t('common.footer.copyright')}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;