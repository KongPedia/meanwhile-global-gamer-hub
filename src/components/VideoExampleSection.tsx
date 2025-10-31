import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

const VideoExampleSection = () => {
  const { t } = useLanguage();
  
  // Embla carousel for video parts (mobile only)
  const [partsEmblaRef, partsEmblaApi] = useEmblaCarousel(
    { loop: true, align: 'center' },
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  );

  const videoData = {
    thumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    duration: "18:45"
  };

  const parts = [
    {
      title: t('landing.videoExample.part1.title'),
      content: t('landing.videoExample.part1.content'),
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      title: t('landing.videoExample.part2.title'),
      content: t('landing.videoExample.part2.content'),
      image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      title: t('landing.videoExample.part3.title'),
      content: t('landing.videoExample.part3.content'),
      image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    }
  ];

  return (
    <section className="py-20 px-4 bg-background">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground whitespace-pre-line">
            {t('landing.videoExample.title')}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto whitespace-pre-line">
            {t('landing.videoExample.subtitle')}
          </p>
        </div>

        {/* Main Content Layout */}
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Left Side - Original Video */}
            <div className="lg:col-span-1">
              <Card className="p-4 md:p-6 bg-card border-border hover:border-primary/50 transition-all duration-300 animate-fade-in-up">
                <div className="text-center mb-4 md:mb-6">
                  <Badge variant="secondary" className="mb-2 md:mb-4 text-xs md:text-sm">
                    {t('landing.videoExample.original')}
                  </Badge>
                </div>
                
                <div className="relative mb-4 md:mb-6">
                  <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                    <img 
                      src={videoData.thumbnail} 
                      alt="Gaming video thumbnail"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <div className="bg-primary/90 rounded-full p-2 md:p-4">
                        <Play className="w-6 h-6 md:w-8 md:h-8 text-white fill-white" />
                      </div>
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs md:text-sm">
                    {videoData.duration}
                  </div>
                </div>

                <div className="space-y-2 md:space-y-3">
                  <h4 className="font-semibold text-foreground line-clamp-2 text-sm md:text-base">
                    {t('landing.videoExample.videoTitle')}
                  </h4>
                </div>
              </Card>
            </div>

            {/* Right Side - Analysis Result with Structured Content */}
            <div className="lg:col-span-2">
              <Card className="p-4 md:p-6 bg-card border-border hover:border-primary/50 transition-all duration-300 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <div className="mb-4 md:mb-6">
                  <Badge variant="default" className="mb-2 md:mb-4 bg-gradient-primary text-xs md:text-sm">
                    {t('landing.videoExample.analyzed')}
                  </Badge>
                </div>

                {/* Summary */}
                <div className="bg-muted/30 rounded-lg p-3 md:p-4 mb-4 md:mb-6">
                  <h4 className="font-semibold text-foreground mb-2 text-sm md:text-base">
                    {t('landing.videoExample.videoTitle')}
                  </h4>

                  <div className="border-l-4 border-primary pl-3 md:pl-4">
                    <h4 className="font-medium text-foreground mb-2 text-sm md:text-base">Summary:</h4>
                    <p className="text-xs md:text-sm text-muted-foreground">
                      {t('landing.videoExample.summary')}
                    </p>
                  </div>
                </div>

                {/* Structured Content Parts */}
                {/* Mobile Carousel */}
                <div className="md:hidden">
                  <div className="overflow-hidden" ref={partsEmblaRef}>
                    <div className="flex">
                      {parts.map((part, index) => (
                        <div key={index} className="flex-[0_0_90%] min-w-0 pl-4">
                          <div className="bg-muted/20 rounded-lg p-4 hover:bg-muted/30 transition-all duration-300 animate-fade-in-up h-full">
                            <div className="flex flex-col gap-4">
                              <div className="flex items-center gap-3">
                                <div className="flex-shrink-0">
                                  <img 
                                    src={part.image} 
                                    alt={`Part ${index + 1}`}
                                    className="w-16 h-16 rounded-lg object-cover"
                                  />
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="bg-primary/10 rounded-full w-6 h-6 flex items-center justify-center">
                                    <span className="text-primary font-bold text-xs">
                                      {index + 1}
                                    </span>
                                  </div>
                                  <h5 className="text-base font-semibold text-foreground">
                                    {part.title}
                                  </h5>
                                </div>
                              </div>
                              <p className="text-sm text-muted-foreground leading-relaxed">
                                {part.content}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Desktop List */}
                <div className="hidden md:block space-y-4">
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
      </div>
    </section>
  );
};

export default VideoExampleSection;
