import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Users, MessageCircle, Star, ExternalLink, Hash } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { CommunityPost } from "@/types/post";

const DEFAULT_PROJECT_ID = 'clairobscur33';
const DISCORD_INVITE_LINK = import.meta.env.VITE_DISCORD_INVITE_LINK;

const CommunitySection = () => {
  const { t, language } = useLanguage();
  const [selectedGame, setSelectedGame] = useState<string>(DEFAULT_PROJECT_ID);
  const [allPosts, setAllPosts] = useState<CommunityPost[]>([]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [bannerOpacity, setBannerOpacity] = useState(1);
  const [postsOpacity, setPostsOpacity] = useState(1);
  
  // Load posts based on current language
  useEffect(() => {
    const loadPosts = async () => {
      try {
        let postsData: CommunityPost[];
        switch (language) {
          case 'en':
            postsData = (await import(`@/data/${language}.posts.json`)).default;
            break;
          case 'ja':
            postsData = (await import(`@/data/${language}.posts.json`)).default;
            break;
          case 'ko':
          default:
            postsData = (await import(`@/data/${language}.posts.json`)).default;
            break;
        }
        setAllPosts(postsData);
      } catch (error) {
        console.error('Failed to load posts:', error);
        // Fallback to English posts
        const fallbackPosts = (await import('@/data/en.posts.json')).default;
        setAllPosts(fallbackPosts);
      }
    };
    
    loadPosts();
    // Reset game filter when language changes
    setSelectedGame(DEFAULT_PROJECT_ID);
  }, [language]);
  
  // Filter posts by selected game
  const posts = allPosts.filter(post => post.projectId === selectedGame);
  
  const gameOptions = [
    { id: 'clairobscur33', name: t('game.clairobscur33') },
    { id: 'stellarblade', name: t('game.stellarblade') },
    { id: 'deltaforce', name: t('game.deltaforce') }
  ];

  const handleGameChange = (gameId: string) => {
    if (gameId === selectedGame || isTransitioning) return;
    
    setIsTransitioning(true);
    
    // Fade out
    setBannerOpacity(0);
    setPostsOpacity(0);
    
    // Change game after fade out
    setTimeout(() => {
      setSelectedGame(gameId);
      
      // Fade in
      setTimeout(() => {
        setBannerOpacity(1);
        setPostsOpacity(1);
        setIsTransitioning(false);
      }, 100);
    }, 300);
  };
  
  // Get background image for selected game
  const getGameBackground = (gameId: string) => {
    const backgrounds = {
      clairobscur33: new URL('../assets/clairobscur33.webp', import.meta.url).href,
      stellarblade: new URL('../assets/stellarblade.jpg', import.meta.url).href,
      deltaforce: new URL('../assets/deltaforce.jpg', import.meta.url).href
    };
    return backgrounds[gameId as keyof typeof backgrounds] || backgrounds.stellarblade;
  };
  
  const getCommunityIcon = (communityId: string) => {
    const icons: { [key: string]: string } = {
      reddit: "🔴",
      steam: "🎮",
      "5ch": "🇯🇵",
    };
    return icons[communityId] || "🌐";
  };
  
  const handlePostClick = (post: CommunityPost) => {
    window.open(post.discordURL, '_blank');
  };
  
  const handleSourceClick = (e: React.MouseEvent, sourceURL: string) => {
    e.stopPropagation();
    window.open(sourceURL, '_blank');
  };

  return (
    <section id="community" className="py-20 px-4 bg-gradient-hero">
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
              style={{ animationDelay: `${index * 1}s` }}
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
        
        

        {/* Community Posts Preview */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-center mb-8 text-foreground">
            {t('community.posts.title') || '최신 커뮤니티 게시글'}
          </h3>
          
          {/* Game Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {gameOptions.map((game) => (
              <Button
                key={game.id}
                variant={selectedGame === game.id ? "default" : "outline"}
                onClick={() => handleGameChange(game.id)}
                className={`hover:scale-105 ${
                  selectedGame === game.id 
                    ? 'animate-pulse shadow-lg shadow-primary/50' 
                    : ''
                }`}
              >
                {game.name}
              </Button>
            ))}
          </div>
          {/* Dynamic Game Background Banner */}
        <div className="relative mb-12 overflow-hidden rounded-2xl">
          <div 
            className="h-64 bg-cover bg-center bg-no-repeat transition-all duration-200 ease-in-out relative"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(${getGameBackground(selectedGame)})`,
              opacity: bannerOpacity,
              transition: 'opacity 0.3s ease-in-out'
            }}
          >
            <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
              <h2 className="text-4xl font-bold mb-4 text-center drop-shadow-lg">
                {gameOptions.find(game => game.id === selectedGame)?.name}
              </h2>
              <p className="text-lg opacity-90 text-center max-w-2xl px-4 drop-shadow-md">
                {t('community.posts.subtitle')}
              </p>
            </div>
          </div>
        </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" style={{ opacity: postsOpacity, transition: 'opacity 0.3s ease-in-out' }}>
            {posts.map((post, index) => (
              <Card 
                key={`${post.id}-${index}`}
                className="p-6 cursor-pointer hover:shadow-xl hover:shadow-primary/20 hover:scale-105 transition-all duration-200 transform group"
                onClick={() => handlePostClick(post)}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{getCommunityIcon(post.communityId)}</span>
                    <span className="text-xs text-muted-foreground uppercase font-medium">
                      {post.communityId}
                    </span>
                  </div>
                  <button
                    onClick={(e) => handleSourceClick(e, post.sourceURL)}
                    className="text-muted-foreground hover:text-primary transition-colors p-1"
                    title="원본 게시글 보기"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
                
                <h4 className="font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h4>
                
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                  {post.content}
                </p>
                
                {/* Display some comments */}
                {post.comments && post.comments.length > 0 && (
                  <div className="mb-4 space-y-2">
                    {post.comments.slice(0, 2).map((comment) => (
                      <div key={comment.id} className="bg-muted/50 rounded-lg p-3 text-xs">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-foreground">{comment.author}</span>
                          <span className="text-muted-foreground">{comment.timestamp}</span>
                        </div>
                        <p className="text-muted-foreground line-clamp-2">{comment.content}</p>
                      </div>
                    ))}
                    {post.comments.length > 2 && (
                      <p className="text-xs text-muted-foreground text-center">
                        +{post.comments.length - 2} more comments
                      </p>
                    )}
                  </div>
                )}
                
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MessageCircle className="w-3 h-3" />
                    <span>{post.comments?.length || 0} comments</span>
                  </div>
                  <div className="flex items-center gap-1 text-discord">
                    <Hash className="w-3 h-3" />
                    <span>{t('community.discord.view')}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Discord CTA */}
        <Card className="p-8 bg-gradient-to-r from-discord/20 to-primary/20 border-discord/30 max-w-2xl mx-auto animate-scale-in">
          <div className="text-center">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                {t('community.discord.title') || 'Discord 커뮤니티 참여하기'}
              </h3>
              <p className="text-muted-foreground">
                {t('community.discord.subtitle') || '실시간으로 전 세계 게이머들과 소통하고 최신 정보를 받아보세요'}
              </p>
            </div>
            
            <Button 
              variant="discord" 
              size="lg"
              className="text-xl px-10 py-4 animate-pulse-neon whitespace-nowrap mb-4"
              onClick={() => window.open(DISCORD_INVITE_LINK, '_blank')}
            >
              {t('community.cta') || 'Discord 커뮤니티 합류하기'}
            </Button>
            
            <p className="text-sm text-muted-foreground">
              {t('community.discord.footer') || '무료로 시작하고, 언제든지 나갈 수 있습니다'}
            </p>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default CommunitySection;