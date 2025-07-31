import { Card } from "@/components/ui/card";
import { Zap, Users, Search, Heart } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

const BenefitsSection = () => {
  const { t } = useLanguage();
  const [benefitsEmblaRef] = useEmblaCarousel(
    { loop: true, align: 'center' },
    [Autoplay({ delay: 3500, stopOnInteraction: false })]
  );
  
  const benefits = [
    {
      icon: <Search className="w-8 h-8" />,
      title: t('benefits.search.title'),
      description: t('benefits.search.desc')
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: t('benefits.translation.title'),
      description: t('benefits.translation.desc')
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: t('benefits.community.title'),
      description: t('benefits.community.desc')
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: t('benefits.culture.title'),
      description: t('benefits.culture.desc')
    }
  ];

  return (
    <section id="benefits" className="py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground whitespace-pre-line md:whitespace-normal">
            {t('benefits.title')}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto whitespace-pre-line md:whitespace-normal">
            {t('benefits.subtitle')}
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          {/* Mobile Carousel */}
          <div className="md:hidden">
            <div className="overflow-hidden" ref={benefitsEmblaRef}>
              <div className="flex -ml-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex-[0_0_80%] min-w-0 px-4">
                    <Card className="p-5 bg-card/50 border-border hover:border-primary/50 transition-all duration-300 hover:shadow-gaming h-full">
                      <div className="text-center">
                        <div className="mb-3 text-primary flex justify-center">
                          {benefit.icon}
                        </div>
                        <h3 className="text-base font-bold mb-2 text-foreground">
                          {benefit.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line md:whitespace-normal">
                          {benefit.description}
                        </p>
                      </div>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <Card 
                key={index}
                className="p-6 bg-card/50 border-border hover:border-primary/50 transition-all duration-300 hover:shadow-gaming hover:-translate-y-2 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-center">
                  <div className="mb-4 text-primary flex justify-center">
                    {benefit.icon}
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-foreground whitespace-pre-line md:whitespace-normal">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                    {benefit.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;