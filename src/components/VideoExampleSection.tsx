import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const VideoExampleSection = () => {
  const { t } = useLanguage();

  const videoData = {
    thumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    duration: "18:45"
  };

  const parts = [
    {
      title: t('videoExample.part1.title'),
      content: t('videoExample.part1.content'),
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      title: t('videoExample.part2.title'),
      content: t('videoExample.part2.content'),
      image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      title: t('videoExample.part3.title'),
      content: t('videoExample.part3.content'),
      image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    }
  ];

  return (
    <section className="py-20 px-4 bg-background">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
            {t('videoExample.title')}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('videoExample.subtitle')}
          </p>
        </div>

        {/* Main Content Layout */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Side - Original Video */}
          <div className="lg:col-span-1">
            <Card className="p-6 bg-card border-border hover:border-primary/50 transition-all duration-300 animate-fade-in-up">
              <div className="text-center mb-6">
                <Badge variant="secondary" className="mb-4">
                  {t('videoExample.original')}
                </Badge>
              </div>
              
              <div className="relative mb-6">
                <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                  <img 
                    src={videoData.thumbnail} 
                    alt="Gaming video thumbnail"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="bg-primary/90 rounded-full p-4">
                      <Play className="w-8 h-8 text-white fill-white" />
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-sm">
                  {videoData.duration}
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-foreground line-clamp-2">
                  {t('videoExample.videoTitle')}
                </h4>
              </div>
            </Card>
          </div>

          {/* Right Side - Analysis Result with Structured Content */}
          <div className="lg:col-span-2">
            <Card className="p-6 bg-card border-border hover:border-primary/50 transition-all duration-300 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="mb-6">
                <Badge variant="default" className="mb-4 bg-gradient-primary">
                  {t('videoExample.analyzed')}
                </Badge>
              </div>

              {/* Summary */}
              <div className="bg-muted/30 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-foreground mb-2">
                  {t('videoExample.videoTitle')}
                </h4>

                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-medium text-foreground mb-2">Summary:</h4>
                  <p className="text-sm text-muted-foreground">
                    {t('videoExample.summary')}
                  </p>
                </div>
              </div>

              {/* Structured Content Parts */}
              <div className="space-y-4">

                
                {parts.map((part, index) => (
                  <div 
                    key={index}
                    className="bg-muted/20 rounded-lg p-4 hover:bg-muted/30 transition-all duration-300 animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex-shrink-0">
                        <img 
                          src={part.image} 
                          alt={`Part ${index + 1}`}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="bg-primary/10 rounded-full w-6 h-6 flex items-center justify-center">
                            <span className="text-primary font-bold text-xs">
                              {index + 1}
                            </span>
                          </div>
                          <h5 className="text-base font-semibold text-foreground">
                            {part.title}
                          </h5>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {part.content}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoExampleSection;
