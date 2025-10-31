import { Card } from "@/components/ui/card";
import { Shield, BarChart3, Clock, Lightbulb } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

const PartnerSection = () => {
  const { t } = useLanguage();
  const [partnersEmblaRef] = useEmblaCarousel(
    { loop: true, align: 'center' },
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  );
  
  const benefits = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: t('landing.partner.monitoring.title'),
      description: t('landing.partner.monitoring.desc')
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: t('landing.partner.analytics.title'),
      description: t('landing.partner.analytics.desc')
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: t('landing.partner.efficiency.title'),
      description: t('landing.partner.efficiency.desc')
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: t('landing.partner.innovation.title'),
      description: t('landing.partner.innovation.desc')
    }
  ];

  return (
    <section id="partners" className="py-16 md:py-24 bg-muted/20 overflow-hidden">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground whitespace-pre-line md:whitespace-normal">
            {t('landing.partner.title')}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto whitespace-pre-line md:whitespace-normal">
            {t('landing.partner.subtitle')}
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          {/* Mobile Carousel */}
          <div className="md:hidden">
            <div className="overflow-hidden" ref={partnersEmblaRef}>
              <div className="flex items-center -ml-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex-[0_0_85%] min-w-0 px-4">
                    <Card className="p-6 bg-card border-border hover:border-accent/50 transition-all duration-300 hover:shadow-gaming h-full">
                      <div className="flex flex-col items-center text-center">
                        <div className="text-accent mb-4">
                          {benefit.icon}
                        </div>
                        <div>
                          <h3 className="text-lg font-bold mb-3 text-foreground">
                            {benefit.title}
                          </h3>
                          <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line md:whitespace-normal">
                            {benefit.description}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {benefits.map((benefit, index) => (
              <Card 
                key={index}
                className="p-8 bg-card border-border hover:border-accent/50 transition-all duration-300 hover:shadow-gaming animate-fade-in-up"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="flex items-start space-x-4">
                  <div className="text-accent flex-shrink-0 mt-1">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3 text-foreground">
                      {benefit.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnerSection;