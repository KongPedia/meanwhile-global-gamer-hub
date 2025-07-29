import { MessageCircle, Github, Twitter } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

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
          
          <div className="flex justify-center space-x-6 mb-8">
            <a href="#" className="text-muted-foreground hover:text-discord transition-colors">
              <MessageCircle className="w-6 h-6" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Github className="w-6 h-6" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-secondary transition-colors">
              <Twitter className="w-6 h-6" />
            </a>
          </div>
          
          <div className="text-sm text-muted-foreground">
            <p>{t('footer.copyright')}</p>
            <p className="mt-2">{t('footer.made')}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;