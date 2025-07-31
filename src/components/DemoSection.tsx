import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Play, MessageSquare, TrendingUp } from "lucide-react";

const DemoSection = () => {
  const { t } = useLanguage();

  return (
    <section id="demo" className="py-16 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-4xl font-bold mb-4 text-foreground">
            {t('demo.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('demo.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 border-border">
            <CardContent className="p-0">
              <div className="flex items-center mb-4">
                <MessageSquare className="w-5 h-5 text-accent mr-2" />
                <h3 className="font-semibold text-foreground">{t('demo.step1.title')}</h3>
              </div>
              <p className="text-muted-foreground text-sm">
                {t('demo.step1.desc')}
              </p>
            </CardContent>
          </Card>

          <Card className="p-6 border-border">
            <CardContent className="p-0">
              <div className="flex items-center mb-4">
                <TrendingUp className="w-5 h-5 text-accent mr-2" />
                <h3 className="font-semibold text-foreground">{t('demo.step2.title')}</h3>
              </div>
              <p className="text-muted-foreground text-sm">
                {t('demo.step2.desc')}
              </p>
            </CardContent>
          </Card>

          <Card className="p-6 border-border">
            <CardContent className="p-0">
              <div className="flex items-center mb-4">
                <Play className="w-5 h-5 text-accent mr-2" />
                <h3 className="font-semibold text-foreground">{t('demo.step3.title')}</h3>
              </div>
              <p className="text-muted-foreground text-sm">
                {t('demo.step3.desc')}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Button 
            size="lg"
            className="px-8 py-3 text-base"
          >
            <Play className="mr-2 h-4 w-4" />
            {t('demo.cta')}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;