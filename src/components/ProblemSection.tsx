import { Card } from "@/components/ui/card";
import { MessageSquareX, Clock, Settings } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

const ProblemSection = () => {
  const { t } = useLanguage();
  const [problemsEmblaRef] = useEmblaCarousel(
    { loop: true, align: 'center' },
    [Autoplay({ delay: 4000, stopOnInteraction: false })]
  );
  
  const problems = [
    {
      icon: <MessageSquareX className="w-8 h-8" />,
      title: t('landing.problem.fragmentation.title'),
      description: t('landing.problem.fragmentation.desc')
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: t('landing.problem.delay.title'),
      description: t('landing.problem.delay.desc')
    },
    {
      icon: <Settings className="w-8 h-8" />,
      title: t('landing.problem.manual.title'),
      description: t('landing.problem.manual.desc')
    }
  ];

  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-2xl md:text-4xl font-bold mb-6 text-foreground whitespace-pre-line">
            {t('landing.problem.title')}
          </h2>
          <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto whitespace-pre-line">
            {t('landing.problem.subtitle')}
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          {/* Mobile Carousel */}
          <div className="md:hidden -mx-4">
            <div className="overflow-hidden" ref={problemsEmblaRef}>
              <div className="flex">
                {problems.map((problem, index) => (
                  <div key={index} className="flex-[0_0_85%] min-w-0 px-4">
                    <Card className="p-6 bg-card/50 border-border hover:border-primary/50 transition-all duration-300 hover:shadow-gaming h-full">
                      <div className="text-center">
                        <div className="mb-4 text-secondary flex justify-center">
                          {problem.icon}
                        </div>
                        <h3 className="text-lg font-bold mb-3 text-foreground">
                          {problem.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                          {problem.description}
                        </p>
                      </div>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:grid md:grid-cols-3 gap-8">
            {problems.map((problem, index) => (
              <Card 
                key={index}
                className="p-8 bg-card/50 border-border hover:border-primary/50 transition-all duration-300 hover:shadow-gaming animate-fade-in-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="text-center">
                  <div className="mb-6 text-secondary flex justify-center">
                    {problem.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-foreground">
                    {problem.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                    {problem.description}
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

export default ProblemSection;