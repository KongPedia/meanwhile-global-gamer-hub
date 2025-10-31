import React, { useState, useEffect, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

import { BarChart, Globe, ExternalLink, MessageCircle, Hash, LayoutList } from "lucide-react";
import { formatNumber } from "@/lib/utils";
import statsData from '@/data/stats.json';
import { useLanguage } from "@/contexts/LanguageContext";
import { CommunityPost } from "@/types/post";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, TooltipProps } from 'recharts';
import { ValueType, NameType } from 'recharts/types/component/DefaultTooltipContent';

const CustomTooltip = ({ active, payload }: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-2 bg-background/90 border border-border rounded-lg shadow-lg backdrop-blur-sm">
        <p className="text-sm text-foreground">{`${payload[0].value?.toLocaleString()} posts`}</p>
      </div>
    );
  }
  return null;
};

const DEFAULT_PROJECT_ID = 'clairobscur33';
const DISCORD_INVITE_LINK = import.meta.env.VITE_DISCORD_INVITE_LINK;

const CommunitySection = () => {
  const { t, language } = useLanguage();
  const [selectedGame, setSelectedGame] = useState<string>(DEFAULT_PROJECT_ID);
  const [allPosts, setAllPosts] = useState<CommunityPost[]>([]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [bannerOpacity, setBannerOpacity] = useState(1);
  const [postsOpacity, setPostsOpacity] = useState(1);
  
  // Embla carousel for stats cards (mobile only)
  const [statsEmblaRef, statsEmblaApi] = useEmblaCarousel(
    { loop: true, align: 'center' },
    [Autoplay({ delay: 4000, stopOnInteraction: false })]
  );
  
  // Embla carousel for game filter buttons (mobile only)
  const [gameFilterEmblaRef, gameFilterEmblaApi] = useEmblaCarousel(
    { loop: false, align: 'start', containScroll: 'trimSnaps' }
  );
  
  // Embla carousel for community posts (mobile only)
  const [postsEmblaRef, postsEmblaApi] = useEmblaCarousel(
    { loop: true, align: 'center' },
    [Autoplay({ delay: 6000, stopOnInteraction: false })]
  );
  
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

  const platformFlags: { [key: string]: string } = {
    reddit: '🇺🇸',
    steam: '🎮',
    dcinside: '🇰🇷',
    jeuxvideo: '🇫🇷',
    inven: '🇰🇷',
    '5ch': '🇯🇵',
    etc: '🌐'
  };

  const renderCustomLegend = (props: { payload: Array<{ value: string; color: string }> }) => {
    const { payload } = props;
    return (
      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-muted-foreground mt-4">
        {payload.map((entry, index) => {
          const communityName = entry.value;
          const flag = platformFlags[communityName] || '🌐';
          return (
            <div key={`item-${index}`} className="flex items-center">
              <div style={{ width: 12, height: 12, backgroundColor: entry.color, marginRight: 8 }}></div>
              <span>{`${flag} ${communityName}`}</span>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <section id="community" className="py-20 px-0 bg-gradient-hero">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground whitespace-pre-line md:whitespace-normal">
            {t('landing.community.title')}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto whitespace-pre-line leading-tight">
            {t('landing.community.subtitle')}
          </p>
        </div>
        
        {/* Community Stats */}
        {/* Mobile Carousel */}
        <div className="md:hidden mb-12">
          <div className="overflow-hidden" ref={statsEmblaRef}>
            <div className="flex">
              {(() => {
                if (!statsData || !statsData.projects || !statsData.total_summary) {
                  console.error('Invalid stats data structure');
                  return null;
                }
                const { projects, total_summary } = statsData;
                const gameData = Object.values(projects)
                  .map(p => ({ name: p.project_id, count: p.total_count }))
                  .sort((a, b) => b.count - a.count);

                const platformDataRaw = Object.entries(total_summary.communities);
                const majorPlatforms = platformDataRaw
                  .filter(([, count]) => count >= 1000)
                  .map(([name, count]) => ({ name, count }));

                const etcCount = platformDataRaw
                  .filter(([, count]) => count < 1000)
                  .reduce((sum, [, count]) => sum + count, 0);

                const platformData = [...majorPlatforms];
                if (etcCount > 0) {
                  platformData.push({ name: 'etc', count: etcCount });
                }
                platformData.sort((a, b) => b.count - a.count);

                const COLORS = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#6b7280'];

                const StatCard = ({ icon, title, mainValue = null, items = null, delay }) => (
                  <div className="flex-[0_0_85%] min-w-0 pl-4">
                    <Card 
                      className="p-6 bg-card/30 border-border flex flex-col animate-fade-in-up h-full"
                      style={{ animationDelay: `${delay * 0.1}s` }}
                    >
                      <div className="flex items-center mb-4">
                        <div className="text-primary mr-3">{icon}</div>
                        <h4 className="text-lg font-semibold text-foreground">{title}</h4>
                      </div>
                      {mainValue ? (
                        <div className="text-5xl font-bold text-foreground my-auto text-center">{mainValue}</div>
                       ) : title === t('landing.community.stats.totalProjects') ? (
                        <div className="space-y-3 text-sm overflow-y-auto pr-2 flex-grow flex flex-col justify-center">
                          {items.slice(0, 3).map(item => {
                            const maxCount = Math.max(...items.map(i => i.count));
                            const barWidth = (item.count / maxCount) * 100;
                            return (
                              <div key={item.name} className="space-y-1">
                                <div className="flex justify-between items-center text-muted-foreground">
                                  <span>{(() => {
                                    const gameTranslations = {
                                      clairobscur33: t('game.clairobscur33'),
                                      deltaforce: t('game.deltaforce'),
                                      stellarblade: t('game.stellarblade')
                                    };
                                    return gameTranslations[item.name.toLowerCase()] || item.name;
                                  })()}</span>
                                  <span className="font-bold text-foreground">{formatNumber(item.count)}</span>
                                </div>
                                <div className="w-full bg-primary/10 rounded-full h-2">
                                  <div 
                                    className="bg-primary h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${barWidth}%` }}
                                  ></div>
                                </div>
                              </div>
                            );
                          })}
                          <div className="flex items-center justify-center p-3 mt-2 bg-muted/20 rounded-lg text-muted-foreground hover:bg-muted/30 transition-colors cursor-pointer group">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-medium">+ more games</span>
                              <div className="w-1 h-1 rounded-full bg-primary/50 group-hover:bg-primary transition-colors"></div>
                              <div className="w-1 h-1 rounded-full bg-primary/30 group-hover:bg-primary/70 transition-colors"></div>
                              <div className="w-1 h-1 rounded-full bg-primary/20 group-hover:bg-primary/50 transition-colors"></div>
                            </div>
                          </div>
                        </div>
                      ) : title === t('landing.community.stats.totalCommunities') ? (
                            <div className="h-64">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={platformData}
                                cx="50%"
                                cy="45%"
                                innerRadius={30}
                                outerRadius={60}
                                paddingAngle={2}
                                dataKey="count"
                                nameKey="name"
                              >
                                {platformData.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                              </Pie>
                              <Legend content={renderCustomLegend} />
                              <Tooltip
                                cursor={{ fill: 'hsl(var(--accent) / 0.1)' }}
                                content={<CustomTooltip />}
                              />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                      ) : (
                        <div className="space-y-3 text-sm overflow-y-auto pr-2 flex-grow">
                          {items.map(item => (
                            <div key={item.name} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                              <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                                <span className="font-medium">{item.name}</span>
                              </div>
                              <span className="font-bold text-foreground">{formatNumber(item.count)}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </Card>
                  </div>
                );

                return [
                  <StatCard
                    key="posts"
                    delay={0}
                    icon={<BarChart className="w-7 h-7" />}
                    title={t('landing.community.stats.totalPosts')}
                    mainValue={formatNumber(total_summary.total_count)}
                  />,
                  <StatCard
                    key="games"
                    delay={1}
                    icon={<LayoutList className="w-7 h-7" />}
                    title={t('landing.community.stats.totalProjects')}
                    items={gameData}
                  />,
                  <StatCard
                    key="platforms"
                    delay={2}
                    icon={<Globe className="w-7 h-7" />}
                    title={t('landing.community.stats.totalCommunities')}
                    items={platformData}
                  />
                ];
              })()
              }
            </div>
          </div>
        </div>
        
        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-5xl mx-auto">
          {(() => {
            if (!statsData || !statsData.projects || !statsData.total_summary) {
              console.error('Invalid stats data structure');
              return null; // or return a fallback UI
            }
            const { projects, total_summary } = statsData;
            const gameData = Object.values(projects)
              .map(p => ({ name: p.project_id, count: p.total_count }))
              .sort((a, b) => b.count - a.count);


            const platformDataRaw = Object.entries(total_summary.communities);
            const majorPlatforms = platformDataRaw
              .filter(([, count]) => count >= 1000)
              .map(([name, count]) => ({ name, count }));

            const etcCount = platformDataRaw
              .filter(([, count]) => count < 1000)
              .reduce((sum, [, count]) => sum + count, 0);

            const platformData = [...majorPlatforms];
            if (etcCount > 0) {
              platformData.push({ name: 'etc', count: etcCount });
            }
            platformData.sort((a, b) => b.count - a.count);

            const COLORS = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#6b7280'];

            const StatCard = ({ icon, title, mainValue = null, items = null, delay }) => (
              <Card 
                className="p-6 bg-card/30 border-border flex flex-col animate-fade-in-up h-full"
                style={{ animationDelay: `${delay * 0.1}s` }}
              >
                <div className="flex items-center mb-4">
                  <div className="text-primary mr-3">{icon}</div>
                  <h4 className="text-lg font-semibold text-foreground">{title}</h4>
                </div>
                {mainValue ? (
                  <div className="text-5xl font-bold text-foreground my-auto text-center">{mainValue}</div>
                 ) : title === t('landing.community.stats.totalProjects') ? (
                  <div className="space-y-3 text-sm overflow-y-auto pr-2 flex-grow flex flex-col justify-center">
                    {items.slice(0, 3).map(item => {
                      const maxCount = Math.max(...items.map(i => i.count));
                      const barWidth = (item.count / maxCount) * 100;
                      return (
                        <div key={item.name} className="space-y-1">
                          <div className="flex justify-between items-center text-muted-foreground">
                            <span>{(() => {
                              const gameTranslations = {
                                clairobscur33: t('game.clairobscur33'),
                                deltaforce: t('game.deltaforce'),
                                stellarblade: t('game.stellarblade')
                              };
                              return gameTranslations[item.name.toLowerCase()] || item.name;
                            })()}</span>
                            <span className="font-bold text-foreground">{formatNumber(item.count)}</span>
                          </div>
                          <div className="w-full bg-primary/10 rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full transition-all duration-300"
                              style={{ width: `${barWidth}%` }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                    {(
                      <div className="flex items-center justify-center p-3 mt-2 bg-muted/20 rounded-lg text-muted-foreground hover:bg-muted/30 transition-colors cursor-pointer group">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-medium">+ more games</span>
                          <div className="w-1 h-1 rounded-full bg-primary/50 group-hover:bg-primary transition-colors"></div>
                          <div className="w-1 h-1 rounded-full bg-primary/30 group-hover:bg-primary/70 transition-colors"></div>
                          <div className="w-1 h-1 rounded-full bg-primary/20 group-hover:bg-primary/50 transition-colors"></div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : title === t('landing.community.stats.totalCommunities') ? (
                      <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={platformData}
                          cx="50%"
                          cy="45%"
                          innerRadius={30}
                          outerRadius={60}
                          paddingAngle={2}
                          dataKey="count"
                          nameKey="name"
                        >
                          {platformData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Legend content={renderCustomLegend} />
                        <Tooltip
                          cursor={{ fill: 'hsl(var(--accent) / 0.1)' }}
                          content={<CustomTooltip />}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <div className="space-y-3 text-sm overflow-y-auto pr-2 flex-grow">
                    {items.map(item => (
                      <div key={item.name} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                          <span className="font-medium">{item.name}</span>
                        </div>
                        <span className="font-bold text-foreground">{formatNumber(item.count)}</span>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            );

            return [
              <StatCard
                key="posts"
                delay={0}
                icon={<BarChart className="w-7 h-7" />}
                title={t('landing.community.stats.totalPosts')}
                mainValue={formatNumber(total_summary.total_count)}
              />,
              <StatCard
                key="games"
                delay={1}
                icon={<LayoutList className="w-7 h-7" />}
                title={t('landing.community.stats.totalProjects')}
                items={gameData}
              />,
              <StatCard
                key="platforms"
                delay={2}
                icon={<Globe className="w-7 h-7" />}
                title={t('landing.community.stats.totalCommunities')}
                items={platformData}
              />
            ];
          })()}
        </div>
        
        {/* Community Posts Preview */}
        <div className="mb-12 max-w-5xl mx-auto">
          <h3 className="text-xl md:text-2xl font-bold text-center mb-6 md:mb-8 text-foreground whitespace-pre-line md:whitespace-normal">
            {t('landing.community.posts.title') || '최신 커뮤니티 게시글'}
          </h3>
          
          {/* Game Filter Buttons */}
          {/* Mobile Carousel */}
          <div className="md:hidden mb-4">
            <div className="overflow-hidden" ref={gameFilterEmblaRef}>
              <div className="flex gap-2">
                {gameOptions.slice(0, 3).map((game) => (
                  <div key={game.id} className="flex-[0_0_auto]">
                    <Button
                      variant={selectedGame === game.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleGameChange(game.id)}
                      className="transition-all duration-200 whitespace-nowrap"
                    >
                      {game.name}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Desktop Buttons */}
          <div className="hidden md:flex gap-2 mb-4 items-center overflow-x-auto pb-2">
            {gameOptions.slice(0, 3).map((game) => (
              <Button
                key={game.id}
                variant={selectedGame === game.id ? "default" : "outline"}
                size="sm"
                onClick={() => handleGameChange(game.id)}
                className="transition-all duration-200 flex-shrink-0"
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
                <h2 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4 text-center drop-shadow-lg whitespace-pre-line">
                  {gameOptions.find(game => game.id === selectedGame)?.name}
                </h2>
                <p className="text-base md:text-base opacity-90 text-center max-w-2xl px-4 drop-shadow-md whitespace-pre-line md:whitespace-normal">
                  {t('landing.community.posts.subtitle')}
                </p>
              </div>
            </div>
          </div>
          
          {/* Mobile Carousel for Posts */}
          <div className="md:hidden" style={{ opacity: postsOpacity, transition: 'opacity 0.3s ease-in-out' }}>
            <div className="overflow-hidden" ref={postsEmblaRef}>
              <div className="flex">
                {posts.map((post, index) => (
                  <div key={`${post.id}-${index}`} className="flex-[0_0_85%] min-w-0 pl-4">
                    <Card 
                      className="p-6 cursor-pointer hover:shadow-xl hover:shadow-primary/20 hover:scale-105 transition-all duration-200 transform group h-full"
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
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MessageCircle className="w-3 h-3" />
                          <span>{post.comments?.length || 0} comments</span>
                        </div>
                        <div className="flex items-center gap-1 text-discord">
                          <Hash className="w-3 h-3" />
                          <span>{t('landing.community.discord.view')}</span>
                        </div>
                      </div>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Desktop Grid for Posts */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6" style={{ opacity: postsOpacity, transition: 'opacity 0.3s ease-in-out' }}>
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
                    {post.comments.map((comment) => (
                      <div key={comment.id} className="bg-muted/50 rounded-lg p-3 text-xs">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-foreground">{comment.author}</span>
                          <span className="text-muted-foreground">{comment.timestamp}</span>
                        </div>
                        <p className="text-muted-foreground line-clamp-2">{comment.content}</p>
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MessageCircle className="w-3 h-3" />
                    <span>{post.comments?.length || 0} comments</span>
                  </div>
                  <div className="flex items-center gap-1 text-discord">
                    <Hash className="w-3 h-3" />
                    <span>{t('landing.community.discord.view')}</span>
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
                {t('landing.community.discord.title') || 'Discord 커뮤니티 참여하기'}
              </h3>
              <p className="text-muted-foreground whitespace-pre-line">
                {t('landing.community.discord.subtitle') || '실시간으로 전 세계 게이머들과 소통하고 최신 정보를 받아보세요'}
              </p>
            </div>
            
            <Button 
              variant="discord" 
              size="lg"
              className="text-lg px-8 py-4 animate-pulse-neon whitespace-nowrap mb-4"
              onClick={() => window.open(DISCORD_INVITE_LINK, '_blank')}
            >
              {t('landing.community.cta') || 'Discord 커뮤니티 합류하기'}
            </Button>
            
            <p className="text-sm text-muted-foreground">
              {t('landing.community.discord.footer') || '무료로 시작하고, 언제든지 나갈 수 있습니다'}
            </p>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default CommunitySection;