import { Card } from "@/components/ui/card";
import { Brain, Clock, TrendingUp } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const SolutionSection = () => {
  const { t } = useLanguage();
  
  const solutions = [
    {
      icon: <Brain className="w-10 h-10" />,
      title: t('solution.ai.title'),
      description: t('solution.ai.desc'),
      gradient: "bg-gradient-primary"
    },
    {
      icon: <Clock className="w-10 h-10" />,
      title: t('solution.timeline.title'),
      description: t('solution.timeline.desc'),
      gradient: "bg-gradient-secondary"
    },
    {
      icon: <TrendingUp className="w-10 h-10" />,
      title: t('solution.trends.title'),
      description: t('solution.trends.desc'),
      gradient: "bg-gradient-primary"
    }
  ];

  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground whitespace-pre-line md:whitespace-normal">
            {t('solution.title')}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto whitespace-pre-line md:whitespace-normal">
            {t('solution.subtitle')}
          </p>
        </div>
        <div className="grid lg:grid-cols-3 gap-8">
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
    </section>
  );
};

export default SolutionSection;