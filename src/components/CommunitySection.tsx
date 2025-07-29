import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Users, MessageCircle, Star } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const CommunitySection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-20 px-4 bg-gradient-hero">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
            {t('community.title')}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('community.subtitle')}
          </p>
        </div>
        
        {/* Community Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            { icon: <Users className="w-6 h-6" />, number: "500+", label: t('community.stats.members') },
            { icon: <MessageCircle className="w-6 h-6" />, number: "1,000+", label: t('community.stats.messages') },
            { icon: <Star className="w-6 h-6" />, number: "4.9", label: t('community.stats.rating') }
          ].map((stat, index) => (
            <Card 
              key={index}
              className="p-6 bg-card/30 border-border text-center animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-primary mb-2 flex justify-center">
                {stat.icon}
              </div>
              <div className="text-2xl font-bold text-foreground mb-1">
                {stat.number}
              </div>
              <div className="text-sm text-muted-foreground">
                {stat.label}
              </div>
            </Card>
          ))}
        </div>
        
        {/* Discord Preview */}
        <Card className="p-8 bg-card/50 border-border max-w-2xl mx-auto animate-scale-in">
          <div className="text-center">
            <div className="bg-discord/20 rounded-lg p-6 mb-6">
              <h3 className="text-xl font-bold text-foreground mb-4">
                {t('community.discord.title')}
              </h3>
              <div className="space-y-3 text-left">
                <div className="bg-muted/30 rounded p-3">
                  <span className="text-sm text-primary font-medium">{t('community.discord.user3')}</span>
                  <p className="text-sm text-muted-foreground mt-1">
                    {t('community.discord.msg3')}
                  </p>
                </div>
                <div className="bg-muted/30 rounded p-3">
                  <span className="text-sm text-secondary font-medium">{t('community.discord.user1')}</span>
                  <p className="text-sm text-muted-foreground mt-1">
                    {t('community.discord.msg1')}
                  </p>
                </div>
                <div className="bg-muted/30 rounded p-3">
                  <span className="text-sm text-accent font-medium">{t('community.discord.user2')}</span>
                  <p className="text-sm text-muted-foreground mt-1">
                    {t('community.discord.msg2')}
                  </p>
                </div>
              </div>
            </div>
            
            <Button 
              variant="discord" 
              size="lg"
              className="text-xl px-10 py-4 animate-pulse-neon whitespace-nowrap"
            >
              {t('community.cta')}
            </Button>
            
            <p className="text-sm text-muted-foreground mt-4">
              무료로 시작하고, 언제든지 나갈 수 있습니다
            </p>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default CommunitySection;