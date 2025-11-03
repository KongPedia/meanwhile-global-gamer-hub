import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, TrendingUp, AlertCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Newsletter } from "@/types/reports";
import { useNavigate } from "react-router-dom";
import { getLocalizedText } from "@/lib/i18n-utils";
import { useState, useEffect, useRef } from "react";
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

interface NewsletterSectionProps {
  newsletters: Newsletter[];
}

// Intersection Observer Hook for Lazy Loading
function useIntersectionObserver(options = {}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.1, ...options });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return [ref, isVisible] as const;
}

// Main Message Component with Lazy Loading
function MainMessageSection({ message, language }: { message: string; language: string }) {
  const [ref, isVisible] = useIntersectionObserver();

  return (
    <div 
      ref={ref}
      className={`p-8 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="prose prose-lg max-w-none">
        <div 
          className="text-base leading-relaxed text-foreground"
          dangerouslySetInnerHTML={{
            __html: message
              .split('\n')
              .map(paragraph => {
                if (paragraph.trim() === '') return '<br>';
                return `<p class="mb-4">${paragraph}</p>`;
              })
              .join('')
          }}
        />
      </div>
    </div>
  );
}

// Threads Section Component with Carousel (Desktop) and List (Mobile)
function ThreadsSection({ threads, language }: { threads: any[]; language: string }) {
  const [ref, isVisible] = useIntersectionObserver();
  const { t } = useLanguage();
  const [threadsEmblaRef] = useEmblaCarousel(
    { loop: true, align: 'start' },
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  );

  return (
    <div 
      ref={ref}
      className={`px-8 pb-8 transition-all duration-700 delay-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div>
        <hr className="border-border mb-6" />
        <h4 className="text-xl font-bold text-center text-foreground mb-6">
          {`🗣️ ${t('landing.newsletter.hotTopics')}`}
        </h4>
        
        {/* Mobile: List View */}
        <div className="md:hidden space-y-6">
          {threads.map((thread, index) => (
            <ThreadItem 
              key={index} 
              thread={thread} 
              index={index} 
              language={language} 
            />
          ))}
        </div>

        {/* Desktop: Carousel */}
        <div className="hidden md:block">
          <div ref={threadsEmblaRef} className="overflow-hidden">
            <div className="flex">
              {threads.map((thread, index) => (
                <div key={index} className="flex-[0_0_100%] min-w-0 px-2">
                  <ThreadItem 
                    thread={thread} 
                    index={index} 
                    language={language} 
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Individual Thread Item
function ThreadItem({ thread, index, language }: { thread: any; index: number; language: string }) {
  return (
    <div className="bg-card/80 backdrop-blur-sm rounded-xl p-6 border border-border/50 shadow-sm">
      <h5 className="text-lg font-bold mb-4 text-foreground flex items-center gap-2">
        <span className="text-xl">{index === 0 ? '🎯' : index === 1 ? '🔧' : '🎉'}</span>
        {getLocalizedText(thread.title, language as any)}
      </h5>
      <div 
        className="prose max-w-none text-muted-foreground"
        dangerouslySetInnerHTML={{
          __html: getLocalizedText(thread.content, language as any)
            .split('\n')
            .map(paragraph => {
              if (paragraph.trim() === '') return '<br>';
              return `<p class="mb-3 leading-relaxed">${paragraph}</p>`;
            })
            .join('')
        }}
      />
    </div>
  );
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
    <section className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <Badge variant="secondary" className="mb-4">
            {t('landing.newsletter.badge') || 'Weekly Newsletter'}
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground whitespace-pre-line">
            {t('landing.newsletter.title') || 'CM Lia\'s Daily Newsletter'}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto whitespace-pre-line">
            {t('landing.newsletter.subtitle') || 'Daily community insights delivered with a friendly voice'}
          </p>
        </div>

        {/* CM Lia's Newsletter */}
        {newsletters.length > 0 && newsletters[0].liaNote && (
          <div className="max-w-4xl mx-auto">
            <Card className="overflow-hidden bg-card/50 border-border transition-all duration-300 animate-fade-in-up">
              {/* Newsletter Header */}
              <div className="bg-gradient-to-r from-primary/90 to-accent/90 p-6 text-white">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <span className="text-2xl font-bold">L</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">💌 CM Lia's Daily Newsletter</h3>
                    <p className="text-white/80">Community Manager</p>
                    <p className="text-sm text-white/60">{newsletters[0].date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getMoodIcon(newsletters[0].communityMood)}
                  <span className="text-sm font-medium text-white/80">
                    {language === 'ko' ? '오늘의 분위기' : language === 'ja' ? '今日の雰囲気' : 'Today\'s Mood'}: {getMoodText(newsletters[0].communityMood)}
                  </span>
                </div>
              </div>

              {/* Main Message */}
              <MainMessageSection 
                message={getLocalizedText(newsletters[0].liaNote.main, language)}
                language={language}
              />

              {/* Thread Topics */}
              {newsletters[0].liaNote.threads && newsletters[0].liaNote.threads.length > 0 && (
                <ThreadsSection 
                  threads={newsletters[0].liaNote.threads}
                  language={language}
                />
              )}

              {/* Footer */}
              <div className="px-8 pb-8">
                <div className="pt-6 border-t border-border">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-3">
                      {language === 'ko' ? '💝 여러분의 소중한 의견을 기다리고 있어요!' : 
                       language === 'ja' ? '💝 皆さんの貴重なご意見をお待ちしています！' : 
                       '💝 We\'re waiting for your precious feedback!'}
                    </p>
                    <Badge variant="secondary" className="bg-muted text-muted-foreground border-border">
                      {language === 'ko' ? '📮 Discord에서 발행' : language === 'ja' ? '📮 Discordで発行' : '📮 Published on Discord'}
                    </Badge>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </section>
  );
}
