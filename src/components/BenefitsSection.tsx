import { Card } from "@/components/ui/card";
import { Zap, Users, Search, Heart } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const BenefitsSection = () => {
  const { t } = useLanguage();
  
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
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
            {t('benefits.title')}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('benefits.subtitle')}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                <h3 className="text-lg font-bold mb-2 text-foreground">
                  {benefit.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;