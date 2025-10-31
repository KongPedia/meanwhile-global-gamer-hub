import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, TrendingUp, AlertCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Newsletter } from "@/types/reports";
import { useNavigate } from "react-router-dom";

interface NewsletterSectionProps {
  newsletters: Newsletter[];
}

export default function NewsletterSection({ newsletters }: NewsletterSectionProps) {
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  const getMoodIcon = (mood: string) => {
    switch (mood) {
      case 'excited':
        return <Heart className="w-5 h-5 text-green-600" />;
      case 'concerned':
        return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      case 'mixed':
        return <TrendingUp className="w-5 h-5 text-blue-600" />;
      default:
        return <TrendingUp className="w-5 h-5 text-gray-600" />;
    }
  };

  const getMoodText = (mood: string) => {
    const moodMap: Record<string, Record<string, string>> = {
      excited: { ko: '긍정적', en: 'Excited', ja: 'ポジティブ' },
      concerned: { ko: '우려', en: 'Concerned', ja: '懸念' },
      mixed: { ko: '복합적', en: 'Mixed', ja: '複雑' },
      neutral: { ko: '중립', en: 'Neutral', ja: '中立' }
    };
    return moodMap[mood]?.[language] || mood;
  };

  return (
    <section className="py-20 px-4 bg-muted/20">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <Badge variant="secondary" className="mb-4">
            {t('newsletter.badge') || 'Weekly Newsletter'}
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
            {t('newsletter.title') || 'CM Lia\'s Weekly Pulse'}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('newsletter.subtitle') || 'Weekly community insights delivered with a friendly voice'}
          </p>
        </div>

        {/* Newsletter Cards */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {newsletters.map((newsletter, index) => (
            <Card
              key={newsletter.id}
              className="p-6 bg-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-gaming animate-fade-in-up cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => navigate(`/${language}/newsletter/${newsletter.gameId}/${newsletter.date}`)}
            >
              {/* Header */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline" className="text-xs">
                    Week {newsletter.weekNumber}
                  </Badge>
                  <div className="flex items-center gap-2">
                    {getMoodIcon(newsletter.communityMood)}
                    <span className="text-sm font-medium">
                      {getMoodText(newsletter.communityMood)}
                    </span>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">{newsletter.title}</h3>
                <p className="text-sm text-muted-foreground">{newsletter.gameName} • {newsletter.date}</p>
              </div>

              {/* Summary */}
              <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                {newsletter.summary}
              </p>

              {/* Key Metrics */}
              <div className="grid grid-cols-3 gap-4 mb-4 p-4 bg-muted/30 rounded-lg">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">{newsletter.keyMetrics.totalPosts}</p>
                  <p className="text-xs text-muted-foreground">Posts</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">{newsletter.keyMetrics.activeUsers}</p>
                  <p className="text-xs text-muted-foreground">Users</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">{newsletter.keyMetrics.sentimentScore}</p>
                  <p className="text-xs text-muted-foreground">Sentiment</p>
                </div>
              </div>

              {/* Lia's Note */}
              {newsletter.liaNote && (
                <div className="border-l-4 border-primary pl-4 py-2 bg-primary/5 rounded-r">
                  <p className="text-sm font-medium mb-1">💚 Lia's Note</p>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {newsletter.liaNote}
                  </p>
                </div>
              )}

              {/* Read More */}
              <Button variant="ghost" className="w-full mt-4">
                {t('newsletter.readMore') || 'Read Full Newsletter →'}
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
