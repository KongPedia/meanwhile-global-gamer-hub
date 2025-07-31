import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowRight, Play } from "lucide-react";

const DISCORD_INVITE_LINK = import.meta.env.VITE_DISCORD_INVITE_LINK;

const HeroSimple = () => {
  const { t } = useLanguage();

  const scrollToDemo = () => {
    const element = document.getElementById('demo');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="pt-20 pb-16 px-4 min-h-[90vh] flex items-center">
      <div className="container mx-auto text-center max-w-4xl">
        {/* Badge */}
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6 animate-fade-in">
          {t('hero.badge')}
        </div>

        {/* Main Headline - 3 lines max */}
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground leading-tight animate-fade-in">
          {t('hero.headline')}
        </h1>
        
        {/* Sub-copy - Clear value proposition */}
        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed animate-fade-in">
          {t('hero.subheadline')}
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in">
          <Button 
            size="lg"
            onClick={() => window.open(DISCORD_INVITE_LINK, '_blank')}
            className="w-full sm:w-auto text-base px-8 py-3 h-auto"
          >
            {t('hero.cta.discord')}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          
          <Button 
            variant="outline"
            size="lg"
            onClick={scrollToDemo}
            className="w-full sm:w-auto text-base px-8 py-3 h-auto"
          >
            <Play className="mr-2 h-4 w-4" />
            {t('hero.cta.demo')}
          </Button>
        </div>

        {/* Social Proof */}
        <div className="mt-12 text-muted-foreground text-sm animate-fade-in">
          {t('hero.socialProof')}
        </div>
      </div>
    </section>
  );
};

export default HeroSimple;