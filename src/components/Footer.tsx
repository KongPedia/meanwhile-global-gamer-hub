import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-card/50 border-t border-border py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold mb-4 text-foreground">
              MeanWhile
            </h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              {t('footer.description')}
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Links</h4>
            <div className="space-y-2">
              <p className="text-muted-foreground text-sm cursor-pointer hover:text-foreground transition-colors">
                {t('footer.contact')}
              </p>
              <p className="text-muted-foreground text-sm cursor-pointer hover:text-foreground transition-colors">
                {t('footer.privacy')}
              </p>
              <p className="text-muted-foreground text-sm cursor-pointer hover:text-foreground transition-colors">
                {t('footer.terms')}
              </p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-muted-foreground text-sm">
            {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;