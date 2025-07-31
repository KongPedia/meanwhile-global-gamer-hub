import { MessageCircle } from "lucide-react";
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
              {t('footer.title')}
            </h3>
            <p className="text-muted-foreground">
              {t('footer.subtitle')}
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 mb-8">
            <a href={DISCORD_INVITE_LINK} className="text-discord hover:text-discord-foreground transition-colors">
              <MessageCircle className="w-6 h-6" />
            </a>
            <p className="text-sm text-white">Discord</p>
          </div>
          
          <div className="text-sm text-muted-foreground">
            <p>{t('footer.copyright')}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;