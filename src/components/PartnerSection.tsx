import { Card } from "@/components/ui/card";
import { Shield, BarChart3, Clock, Lightbulb } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const PartnerSection = () => {
  const { t } = useLanguage();
  
  const benefits = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: t('partner.monitoring.title'),
      description: t('partner.monitoring.desc')
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: t('partner.analytics.title'),
      description: t('partner.analytics.desc')
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: t('partner.efficiency.title'),
      description: t('partner.efficiency.desc')
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: t('partner.innovation.title'),
      description: t('partner.innovation.desc')
    }
  ];

  return (
    <section className="py-20 px-4 bg-muted/20">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground whitespace-pre-line md:whitespace-normal">
            {t('partner.title')}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto whitespace-pre-line md:whitespace-normal">
            {t('partner.subtitle')}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
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
    </section>
  );
};

export default PartnerSection;