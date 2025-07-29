import { Card } from "@/components/ui/card";
import { MessageSquareX, Globe, AlertTriangle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const ProblemSection = () => {
  const { t } = useLanguage();
  
  const problems = [
    {
      icon: <MessageSquareX className="w-8 h-8" />,
      title: t('problem.fragmentation.title'),
      description: t('problem.fragmentation.desc')
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: t('problem.language.title'),
      description: t('problem.language.desc')
    },
    {
      icon: <AlertTriangle className="w-8 h-8" />,
      title: t('problem.toxic.title'),
      description: t('problem.toxic.desc')
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
            {t('problem.title')}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('problem.subtitle')}
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
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
                <p className="text-muted-foreground leading-relaxed">
                  {problem.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;