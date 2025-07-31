import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { Zap, Globe, Search, Users } from "lucide-react";

const FeaturesSimple = () => {
  const { t } = useLanguage();
  
  const features = [
    {
      icon: <Search className="w-6 h-6" />,
      title: t('features.search.title'),
      description: t('features.search.desc')
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: t('features.translate.title'),
      description: t('features.translate.desc')
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: t('features.realtime.title'),
      description: t('features.realtime.desc')
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: t('features.community.title'),
      description: t('features.community.desc')
    }
  ];

  return (
    <section id="features" className="py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-4xl font-bold mb-4 text-foreground">
            {t('features.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('features.subtitle')}
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="p-6 border-border hover:border-accent/50 transition-all duration-300 hover:shadow-lg animate-fade-in-up group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-0 text-center">
                <div className="mb-4 text-accent flex justify-center group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2 text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSimple;