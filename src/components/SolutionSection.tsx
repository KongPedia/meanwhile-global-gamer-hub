import { Card } from "@/components/ui/card";
import { Brain, Clock, TrendingUp } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

const SolutionSection = () => {
  const { t } = useLanguage();
  const [solutionsEmblaRef] = useEmblaCarousel(
    { loop: true, align: 'center' },
    [Autoplay({ delay: 4500, stopOnInteraction: false })]
  );
  
  const solutions = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: t('solution.ai.title'),
      description: t('solution.ai.desc'),
      gradient: "bg-gradient-primary"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: t('solution.timeline.title'),
      description: t('solution.timeline.desc'),
      gradient: "bg-gradient-secondary"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: t('solution.trends.title'),
      description: t('solution.trends.desc'),
      gradient: "bg-gradient-primary"
    }
  ];

  return (
    <section id="solution" className="py-16 md:py-24 overflow-hidden bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground whitespace-pre-line md:whitespace-normal">
            {t('solution.title')}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto whitespace-pre-line md:whitespace-normal">
            {t('solution.subtitle')}
          </p>
        </div>
        <div className="max-w-5xl mx-auto">
          {/* Mobile Carousel */}
          <div className="md:hidden">
            <div ref={solutionsEmblaRef}>
              <div className="flex -ml-4">
                {solutions.map((solution, index) => (
                  <div key={index} className="flex-[0_0_95%] min-w-0 px-4">
                    <Card className="p-6 bg-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-neon group h-full">
                      <div className="text-center">
                        <div className={`inline-flex p-3 rounded-xl ${solution.gradient} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                          <div className="text-white">
                            <div className="w-8 h-8">{solution.icon}</div>
                          </div>
                        </div>
                        <h3 className="text-lg font-bold mb-3 text-foreground">
                          {solution.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {solution.description}
                        </p>
                      </div>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:grid lg:grid-cols-3 gap-8">
            {solutions.map((solution, index) => (
              <Card 
                key={index}
                className="p-8 bg-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-neon group animate-fade-in-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="text-center">
                  <div className={`inline-flex p-4 rounded-2xl ${solution.gradient} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <div className="text-white">
                      {solution.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-foreground whitespace-pre-line">
                    {solution.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                    {solution.description}
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

export default SolutionSection;