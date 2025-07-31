import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowRight, Users } from "lucide-react";

const DISCORD_INVITE_LINK = import.meta.env.VITE_DISCORD_INVITE_LINK;

const CTASection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-4xl text-center">
        <div className="bg-gradient-to-r from-accent/10 to-primary/10 rounded-2xl p-8 md:p-12">
          <h2 className="text-2xl md:text-4xl font-bold mb-4 text-foreground">
            {t('cta.title')}
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            {t('cta.subtitle')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg"
              onClick={() => window.open(DISCORD_INVITE_LINK, '_blank')}
              className="w-full sm:w-auto text-base px-8 py-3 h-auto"
            >
              <Users className="mr-2 h-4 w-4" />
              {t('cta.discord')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="mt-6 text-muted-foreground text-sm">
            {t('cta.note')}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;