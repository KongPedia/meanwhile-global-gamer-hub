// @refresh reset
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'ko' | 'en' | 'ja' | 'zh' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

// Function to detect browser language
const detectBrowserLanguage = (): Language => {
  // Get browser language preferences
  const browserLang = navigator.language || navigator.languages?.[0] || 'en';
  
  // Extract language code (e.g., 'ko-KR' -> 'ko')
  const langCode = browserLang.toLowerCase().split('-')[0];
  // Map to supported languages
  const supportedLanguages: Language[] = ['en', 'ja', 'zh', 'es'];
  
  // Check if detected language is supported
  if (supportedLanguages.includes(langCode as Language)) {
    console.log(langCode)
    return langCode as Language;
  }
  
  // Fallback logic based on region
  const region = browserLang.toLowerCase().split('-')[1];
  
  if (region) {
    // Asian regions default to appropriate languages
    if (['kr', 'kp'].includes(region)) return 'ko';
    if (['jp'].includes(region)) return 'ja';
    if (['cn', 'tw', 'hk', 'mo'].includes(region)) return 'zh';
    if (['es', 'mx', 'ar', 'co', 've', 'pe', 'cl', 'ec', 'gt', 'cu', 'bo', 'do', 'hn', 'py', 'sv', 'ni', 'cr', 'pa', 'uy', 'gq'].includes(region)) return 'es';
  }
  
  // Default to English for unsupported languages
  return 'en';
};

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguage] = useState<Language>(() => {
    // Try to get saved language from localStorage first
    const savedLanguage = localStorage.getItem('preferred-language') as Language;
    if (savedLanguage && ['ko', 'en', 'ja', 'zh', 'es'].includes(savedLanguage)) {
      return savedLanguage;
    }
    // Otherwise detect from browser
    return detectBrowserLanguage();
  });
  
  // Save language preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('preferred-language', language);
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key] || translations['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

const translations = {
  ko: {
    // Hero Section
    'hero.title': '글로벌 게이머의\n목소리를 한 곳에',
    'hero.subtitle': 'MeanWhile은 글로벌 게임 커뮤니티 데이터를\nAI가 요약하고 번역하여 Discord에서 공유합니다',
    'hero.cta.discord': 'Discord 커뮤니티 합류하기',
    'hero.cta.learn': '더 알아보기',
    
    // Problem Section
    'problem.title': '게이머들이\n마주하는 현실',
    'problem.subtitle': '전 세계 게임 커뮤니티에서\n일어나는 일들을 놓치고 계신가요?',
    'problem.fragmentation.title': '정보 파편화',
    'problem.fragmentation.desc': '각 플랫폼마다\n흩어진 정보들로 인해\n중요한 소식을 놓치게 됩니다',
    'problem.language.title': '언어 장벽',
    'problem.language.desc': '다양한 언어로 작성된\n글로벌 커뮤니티의 정보를\n이해하기 어렵습니다',
    'problem.toxic.title': '독성 문화',
    'problem.toxic.desc': '건전하지 못한\n커뮤니티 문화로 인해\n참여를 꺼리게 됩니다',
    
    // Solution Section
    'solution.title': 'AI가 제공하는\n혁신적 해결책',
    'solution.subtitle': 'MeanWhile의 AI 기술로\n글로벌 게임 커뮤니티를\n새롭게 경험하세요',
    'solution.ai.title': 'AI 요약 & 번역',
    'solution.ai.desc': '여러 언어의 게임 커뮤니티 글을\nAI가 실시간으로\n요약하고 번역합니다',
    'solution.timeline.title': '통합 게임 타임라인',
    'solution.timeline.desc': '흩어진 게임 정보들을\n하나의 타임라인으로 정리해\n한눈에 확인하세요',
    'solution.trends.title': '실시간 트렌드 감지',
    'solution.trends.desc': '게임 커뮤니티의\n최신 이슈와 트렌드를\nAI가 실시간으로 분석합니다',
    
    // Benefits Section
    'benefits.title': '새로운 게이밍\n커뮤니티 경험',
    'benefits.subtitle': '눈팅 유저도\n글로벌 게이머가 될 수 있습니다',
    'benefits.search.title': '빠른 탐색',
    'benefits.search.desc': 'AI 요약으로 원하는 정보를\n빠르게 찾아보세요',
    'benefits.translation.title': '번역 지원',
    'benefits.translation.desc': '언어 장벽 없이\n전 세계 게이머들과 소통하세요',
    'benefits.community.title': '커뮤니티 연결',
    'benefits.community.desc': '관심사가 같은\n글로벌 게이머들과 연결되세요',
    'benefits.culture.title': '건전한 문화',
    'benefits.culture.desc': 'AI 모더레이션으로\n건전한 커뮤니티를 만들어갑니다',
    
    // Partner Section
    'partner.title': '게임사를 위한\n특별한 혜택',
    'partner.subtitle': 'MeanWhile과 함께하면\n더 나은 게임 운영이 가능합니다',
    'partner.monitoring.title': '실시간 모니터링',
    'partner.monitoring.desc': '게임 관련 버그나 이슈를\n조기에 감지하여\n빠른 대응이 가능합니다',
    'partner.analytics.title': '심층 분석',
    'partner.analytics.desc': '플레이어들의 의견과 피드백을\n체계적으로 분석하여\n인사이트를 제공합니다',
    'partner.efficiency.title': '운영 효율성',
    'partner.efficiency.desc': '커뮤니티 관리 비용을\n절감하고 운영 효율성을 크게 향상시킵니다',
    'partner.innovation.title': '혁신적 솔루션',
    'partner.innovation.desc': '게임 커뮤니티 관리의\n새로운 표준을 제시합니다',
    
    // Video Example Section
    'videoExample.title': '동영상 요약',
    'videoExample.subtitle': '긴 동영상의 핵심만 빠르게 파악하세요.',
    'videoExample.original': '원본 영상',
    'videoExample.analyzed': '주요 내용',
    'videoExample.videoTitle': "ex) 신작 '크로노스케이프 보이저' 플레이 영상",
    'videoExample.summary': "시간 여행을 테마로 한 오픈월드 RPG, '크로노스케이프 보이저'의 주요 특징과 초반 공략을 담았습니다.",
    'videoExample.part1.title': '시간 조작 능력 활용법',
    'videoExample.part1.content': "주인공의 핵심 능력인 '시간 되감기'와 '미래 예지'를 전투와 퍼즐에서 어떻게 활용하는지 보여줍니다.",
    'videoExample.part2.title': '고대와 미래를 넘나드는 모험',
    'videoExample.part2.content': '고대 문명 유적부터 초현대적 미래 도시까지, 다양한 시간대를 탐험하며 겪는 주요 퀘스트 라인을 소개합니다.',
    'videoExample.part3.title': '동료 영입과 파티 조합',
    'videoExample.part3.content': '각기 다른 시간대에서 온 동료들의 특징과 추천 파티 조합, 그리고 강력한 연계 스킬을 알아봅니다.',
    
    // Community Section
    'community.title': 'Discord에서 만나요!',
    'community.subtitle': '전 세계 게임 커뮤니티의 데이터를\n실시간으로 분석합니다',
    'community.stats.totalPosts': '총 게시물',
    'community.stats.totalCommunities': '커뮤니티 게시물',
    'community.stats.totalProjects': '등록된 게임 게시물',
    'community.stats.etc': '기타',
    'game.clairobscur33': '33 원정대',
    'game.deltaforce': '델타포스',
    'game.stellarblade': '스텔라 블레이드',
    'community.cta': 'Discord 합류하기',
    'community.posts.title': '해외 여러 게임 커뮤니티를\n여러분의 언어로 경험하세요',
    'community.posts.subtitle': 'MeanWhile은\n글로벌 게임 커뮤니티 데이터를\nAI가 요약하고 번역하여\nDiscord에서 공유합니다',
    'community.discord.title': 'Discord',
    'community.discord.subtitle': '이미 수백 명의 게이머가\n함께하고 있습니다',
    'community.discord.footer': 'Meanwhile Global Gamer Hub',
    'community.discord.view': 'Discord에서 보기',
    
    // Game Names
    'game.all': '전체 게임',
    
    // Report Section
    'report.badge': '새로운 기능',
    'report.title': '게임 인사이트 리포트',
    'report.subtitle': '커뮤니티에서가장 활발하게\n논의되는 주제들을 분석하여\n한눈에 볼 수 있는\n인사이트 리포트를 제공합니다.',
    'report.example.title': 'ex) Mystic Legends 핫이슈 리포트 ',
    'report.example.period': '2025-01-15 09:00 ~ 18:00',
    'report.example.summary': '신작 RPG \'Mystic Legends\' 커뮤니티에서 새로운 업데이트에 대한 논의가 활발합니다. 특히 새로운 던전의 난이도와 보상 시스템에 대한 의견이 분분합니다.',
    'report.example.hotTopic.title': '새 던전 난이도 논란',
    'report.example.hotTopic.sentimentLabel': '부정적',
    'report.example.hotTopic.timeRange': '14:30 ~ 17:45',
    'report.example.hotTopic.post1.title': '새 던전이 너무 어려워요',
    'report.example.hotTopic.post1.content': '일반 유저들이 클리어하기 어려운 난이도에 대한 불만',
    'report.example.hotTopic.post2.title': '보상이 너무 짜다',
    'report.example.hotTopic.post2.content': '어려운 던전에 비해 보상이 부족하다는 의견',
    'report.stats.mentions': '총 언급',
    'report.stats.active': '활발한 시간',
    'report.relatedPosts': '관련 게시물:',
    'report.features.title': '인사이트 리포트',
    'report.features.subtitle': '게임 커뮤니티의 트렌드를 한눈에',
    'report.features.trending.title': '핫토픽 분석',
    'report.features.trending.description': '많이 언급되는 주제와 트렌드를\n실시간으로 파악',
    'report.features.sentiment.title': '감정 분석',
    'report.features.sentiment.description': '커뮤니티 반응의 긍정/부정 지수를\n수치화하여 제공',
    'report.features.realtime.title': '실시간 모니터링',
    'report.features.realtime.description': '특정 시간대별\n활발한 논의 시점을 추적',
    'report.features.insights.title': '깊이 있는 인사이트',
    'report.features.insights.description': '단순한 데이터를 넘어 의미 있는\n통찰력 제공',
    
    // Footer
    'footer.title': 'MeanWhile',
    'footer.subtitle': '전 세계 게이머들의 목소리를 한 곳에서',
    'footer.discord': 'Discord 참여하기',
  },
  en: {
    // Hero Section
    'hero.title': 'Global Gamers\' Voices\nin One Place',
    'hero.subtitle': 'MeanWhile summarizes\nglobal community data on Discord.',
    'hero.cta.discord': 'Join Discord Community',
    'hero.cta.learn': 'Learn More',
    
    // Problem Section
    'problem.title': 'Challenges Gamers Face',
    'problem.subtitle': 'Are you missing out on\nwhat\'s happening in global\ngaming communities?',
    'problem.fragmentation.title': 'Information Fragmentation',
    'problem.fragmentation.desc': 'Important news gets lost\ndue to scattered information across platforms',
    'problem.language.title': 'Language Barriers',
    'problem.language.desc': 'Difficulty understanding global information\nwritten in various languages',
    'problem.toxic.title': 'Toxic Culture',
    'problem.toxic.desc': 'Unhealthy community culture\nmakes participation difficult',
    
    // Solution Section
    'solution.title': 'AI-Powered\nInnovative Solutions',
    'solution.subtitle': 'Experience global gaming communities\nin a new way with MeanWhile\'s AI technology',
    'solution.ai.title': 'AI Summary & Translation',
    'solution.ai.desc': 'AI summarizes and translates game community posts\nin multiple languages\nin real-time',
    'solution.timeline.title': 'Unified Game Timeline',
    'solution.timeline.desc': 'Organize scattered game info\ninto a timeline for easy viewing',
    'solution.trends.title': 'Real-time Trend Detection',
    'solution.trends.desc': 'Analyzes latest issues & trends\nin communities in real-time',
    
    // Benefits Section
    'benefits.title': 'A New Gaming\nCommunity Experience',
    'benefits.subtitle': 'Even lurkers can become\nglobal gamers',
    'benefits.search.title': 'Fast Search',
    'benefits.search.desc': 'Find desired information quickly\nwith AI summaries',
    'benefits.translation.title': 'Translation Support',
    'benefits.translation.desc': 'Communicate with global gamers\nwithout language barriers',
    'benefits.community.title': 'Community Connection',
    'benefits.community.desc': 'Connect with global gamers\nwho share your interests',
    'benefits.culture.title': 'Healthy Culture',
    'benefits.culture.desc': 'Build healthy communities\nwith AI moderation',
    
    // Partner Section
    'partner.title': 'Special Benefits\nfor Game Companies',
    'partner.subtitle': 'Better game operations are possible\nwith MeanWhile',
    'partner.monitoring.title': 'Real-time Monitoring',
    'partner.monitoring.desc': 'Detect game-related bugs or issues\nearly for quick response',
    'partner.analytics.title': 'Deep Analysis',
    'partner.analytics.desc': 'Systematically analyze player feedback\nand opinions to provide insights',
    'partner.efficiency.title': 'Operational Efficiency',
    'partner.efficiency.desc': 'Reduce community management costs\nand greatly improve operational efficiency',
    'partner.innovation.title': 'Innovative Solutions',
    'partner.innovation.desc': 'Present new standards\nfor game community management',
    
    // Video Example Section
    'videoExample.title': 'Video Summary',
    'videoExample.subtitle': 'Quickly grasp the key points of long videos.',
    'videoExample.original': 'Original Video',
    'videoExample.analyzed': 'Key Content',
    'videoExample.videoTitle': "ex) New Game 'Chronoscape Voyagers' Gameplay Video",
    'videoExample.summary': "This video covers the main features and early-game strategies for 'Chronoscape Voyagers', an open-world RPG with a time-travel theme.",
    'videoExample.part1.title': 'How to Use Time Manipulation Abilities',
    'videoExample.part1.content': "Shows how to use the protagonist's core abilities, 'Time Rewind' and 'Future Sight', in combat and puzzles.",
    'videoExample.part2.title': 'Adventures Across Ancient and Future Eras',
    'videoExample.part2.content': 'Introduces the main questline, exploring various timelines from ancient ruins to hyper-modern future cities.',
    'videoExample.part3.title': 'Companion Recruitment and Party Composition',
    'videoExample.part3.content': 'Explores the characteristics of companions from different timelines, recommended party compositions, and powerful combo skills.',
    
    // Community Section
    'community.title': 'See You\non Discord!',
    'community.subtitle': 'Real-time analysis of\nglobal gaming community data',
    'community.stats.totalPosts': 'Total Posts',
    'community.stats.totalCommunities': 'Community Posts',
    'community.stats.totalProjects': 'Game Posts',
    'community.stats.etc': 'ETC',
    'game.clairobscur33': 'Clair Obscur: 33',
    'game.deltaforce': 'Delta Force',
    'game.stellarblade': 'Stellar Blade',
    'community.cta': 'Join Discord',
    'community.posts.title': 'Experience Global Communities\nin Your Language',
    'community.posts.subtitle': 'MeanWhile summarizes\nglobal community data\nwith AI, sharing it on Discord',
    'community.discord.title': 'Discord Preview',
    'community.discord.subtitle': 'Hundreds of gamers are\nalready here together',
    'community.discord.footer': 'Meanwhile Global Gamer Hub',
    'community.discord.view': 'View on Discord',

    // Game Names
    'game.all': 'All Games',
    
    // Report Section
    'report.badge': 'New Feature',
    'report.title': 'Gaming Community\nInsight Reports',
    'report.subtitle': 'Analyze the most actively discussed topics\nin gaming communities and provide insight reports\nat a glance',
    'report.example.title': 'ex) Mystic Legends Hot Issue Report',
    'report.example.period': '2025-01-15 09:00 ~ 18:00',
    'report.example.summary': 'Active discussions about the new update in the \'Mystic Legends\' RPG community. Opinions are divided on the difficulty of new dungeons and the reward system.',
    'report.example.hotTopic.title': 'New Dungeon Difficulty Controversy',
    'report.example.hotTopic.sentimentLabel': 'Negative',
    'report.example.hotTopic.timeRange': '14:30 ~ 17:45',
    'report.example.hotTopic.post1.title': 'New dungeon is too difficult',
    'report.example.hotTopic.post1.content': 'Complaints about difficulty level that\'s hard for casual players to clear',
    'report.example.hotTopic.post2.title': 'Rewards are too stingy',
    'report.example.hotTopic.post2.content': 'Opinion that rewards are insufficient compared to difficult dungeons',
    'report.stats.mentions': 'Total Mentions',
    'report.stats.active': 'Active Hours',
    'report.relatedPosts': 'Related Posts:',
    'report.features.title': 'Insight Reports',
    'report.features.subtitle': 'Gaming community trends at a glance',
    'report.features.trending.title': 'Hot Topic Analysis',
    'report.features.trending.description': 'Identify the most mentioned topics and trends\nin real-time',
    'report.features.sentiment.title': 'Sentiment Analysis',
    'report.features.sentiment.description': 'Quantify positive/negative sentiment\nof community reactions',
    'report.features.realtime.title': 'Real-time Monitoring',
    'report.features.realtime.description': 'Track active discussion points\nby specific time periods',
    'report.features.insights.title': 'Deep Insights',
    'report.features.insights.description': 'Provide meaningful insights\nbeyond simple data',

    // Footer
    'footer.title': 'MeanWhile',
    'footer.subtitle': 'Global gamers\' voices in one place',
    'footer.copyright': ' 2025 MeanWhile. All rights reserved.',
    'footer.discord': 'Join Discord'
  },
  ja: {
    // Hero Section
    'hero.title': 'グローバルゲーマーの声を\n一か所に',
    'hero.subtitle': 'MeanWhileは\nグローバルゲームコミュニティデータを\nAIで要約・翻訳しDiscordで共有します',
    'hero.cta.discord': 'Discordコミュニティに参加',
    'hero.cta.learn': '詳しく見る',
    
    // Problem Section
    'problem.title': 'ゲーマーが直面する現実',
    'problem.subtitle': '世界のゲームコミュニティで\n起こっていることを\n見逃していませんか？',
    'problem.fragmentation.title': '情報の断片化',
    'problem.fragmentation.desc': '情報が散らばっていて\n大事なニュースを\n見逃してしまうことがあります',
    'problem.language.title': '言語の壁',
    'problem.language.desc': '様々な言語で\n書かれたコミュニティの情報を\n理解するのは困難です',
    'problem.toxic.title': '有害な文化',
    'problem.toxic.desc': '健全でないコミュニティ文化により\n参加を躊躇してしまいます',
    
    // Solution Section
    'solution.title': 'AIが提供する\n革新的な解決策',
    'solution.subtitle': 'MeanWhileのAI技術で\nグローバルゲームコミュニティを\n新しく体験してください',
    'solution.ai.title': 'AI要約・翻訳',
    'solution.ai.desc': '複数言語のコミュニティ投稿を\nAIがリアルタイムで要約・翻訳します',
    'solution.timeline.title': '統合タイムライン',
    'solution.timeline.desc': '散らばったコミュニティ情報を\n一つのタイムラインで一目で確認',
    'solution.trends.title': 'リアルタイムトレンド検出',
    'solution.trends.desc': 'ゲームの最新の問題とトレンドを\nAIがリアルタイムで分析',

    'benefits.title': 'グローバルのための\n新しいコミュニティ体験',
    'benefits.subtitle': 'ROM ユーザーも\nグローバルゲーマーになれます',
    'benefits.search.title': '高速検索',
    'benefits.search.desc': 'AI要約で\n欲しい情報を素早く見つける',
    'benefits.translation.title': '翻訳サポート',
    'benefits.translation.desc': '言語の壁なく世界中のゲーマーと\nコミュニケーション',
    'benefits.community.title': 'コミュニティ接続',
    'benefits.community.desc': '同じ興味を持つ\nグローバルゲーマーと\n繋がりましょう',
    'benefits.culture.title': '健全な文化',
    'benefits.culture.desc': 'AIモデレーションで\n健全なコミュニティを作ります',
    
    // Partner Section
    'partner.title': 'ゲーム会社向け\n特別なメリット',
    'partner.subtitle': 'MeanWhileと一緒により\n良いゲーム運営が可能です',
    'partner.monitoring.title': 'リアルタイムモニタリング',
    'partner.monitoring.desc': 'ゲーム関連のバグや問題を\n早期発見し迅速な対応が可能',
    'partner.analytics.title': '深層分析',
    'partner.analytics.desc': 'ユーザーの意見とフィードバックを\n体系的に分析しインサイトを提供',
    'partner.efficiency.title': '運営効率性',
    'partner.efficiency.desc': 'コミュニティ管理コストを削減し\n運営効率を大幅向上',
    'partner.innovation.title': '革新的ソリューション',
    'partner.innovation.desc': 'ゲームコミュニティ管理の\n新基準を提示',
    
    // Video Example Section
    'videoExample.title': '動画要約',
    'videoExample.subtitle': '長い動画の要点を素早く把握します。',
    'videoExample.original': '元の動画',
    'videoExample.analyzed': '主な内容',
    'videoExample.videoTitle': '新作「クロノスケープ・ボイジャー」プレイ動画',
    'videoExample.summary': '時間旅行をテーマにしたオープンワールドRPG「クロノスケープ・ボイジャー」の主な特徴と序盤の攻略を収録しました。',
    'videoExample.part1.title': '時間操作能力の活用法',
    'videoExample.part1.content': '主人公の核心能力である「時間巻き戻し」と「未来予知」を戦闘とパズルでどう活用するかを見せます。',
    'videoExample.part2.title': '古代と未来を行き来する冒険',
    'videoExample.part2.content': '古代文明の遺跡から超現代的な未来都市まで、様々な時間帯を探検しながら経験する主なクエストラインを紹介します。',
    'videoExample.part3.title': '仲間集めとパーティ編成',
    'videoExample.part3.content': 'それぞれ異なる時代から来た仲間の特徴と推奨パーティ編成、そして強力な連携スキルを解説します。',
    
    // Community Section
    'community.title': 'Discordで\n会いましょう！',
    'community.subtitle': '世界のゲームコミュニティデータを\nリアルタイムで分析',
    'community.stats.totalPosts': '総投稿数',
    'community.stats.totalCommunities': 'コミュニティ投稿',
    'community.stats.totalProjects': '登録済みゲームの投稿',
    'community.stats.etc': 'その他',
    'game.clairobscur33': 'クレアオブスキュア: 33',
    'game.deltaforce': 'デルタフォース',
    'game.stellarblade': 'ステラブレード',
    'community.cta': 'Discord参加',
    'community.posts.title': 'グローバルゲームコミュニティを\nあなたの言語で体験してみてください',
    'community.posts.subtitle': 'MeanWhileは\nグローバルゲームコミュニティデータを\nAIで要約・翻訳しDiscordで共有します',
    'community.discord.title': 'Discordプレビュー',
    'community.discord.subtitle': 'すでに数百人のゲーマーが\n参加しています',
    'community.discord.footer': 'Meanwhile Global Gamer Hub',
    'community.discord.view': 'Discordで見る',
    
    // Game Names
    'game.all': '全てのゲーム',
    
    // Report Section
    'report.badge': '新機能',
    'report.title': 'コミュニティ \nインサイトレポート',
    'report.subtitle': 'ゲームコミュニティで最も活発に\n議論されているトピックをAIが分析し、\n一目でわかるレポートを提供します。',
    'report.example.title': 'ex) Mystic Legends\nレポート',
    'report.example.period': '2025-01-15\n09:00~18:00',
    'report.example.summary': '新作RPG「Mystic Legends」コミュニティで新しいアップデートについての議論が活発です。特に新しいダンジョンの難易度と報酬システムについて意見が分かれています。',
    'report.example.hotTopic.title': '新ダンジョン難易度論争',
    'report.example.hotTopic.sentimentLabel': 'ネガティブ',
    'report.example.hotTopic.timeRange': '14:30 ~ 17:45',
    'report.example.hotTopic.post1.title': '新ダンジョンが難しすぎる',
    'report.example.hotTopic.post1.content': '一般ユーザーがクリアするには難しい難易度への不満',
    'report.example.hotTopic.post2.title': '報酬が少なすぎる',
    'report.example.hotTopic.post2.content': '難しいダンジョンに比べて報酬が不足しているという意見',
    'report.stats.mentions': '総言及数',
    'report.stats.active': 'アクティブな時間',
    'report.relatedPosts': '関連投稿:',
    'report.features.title': 'インサイトレポート',
    'report.features.subtitle': 'ゲームコミュニティのトレンドを一目で',
    'report.features.trending.title': 'ホットトピック分析',
    'report.features.trending.description': '最も多く言及されるトピックを\nリアルタイムで把握',
    'report.features.sentiment.title': '感情分析',
    'report.features.sentiment.description': 'コミュニティ反応の\nポジティブ/ネガティブ指数を\n数値化して提供',
    'report.features.realtime.title': 'リアルタイムモニタリング',
    'report.features.realtime.description': '特定時間帯別の\n活発な議論時点を追跡',
    'report.features.insights.title': '深いインサイト',
    'report.features.insights.description': '単純なデータを超えた,意味のある\n洞察力を提供',
    
    // Footer
    'footer.title': 'MeanWhile',
    'footer.subtitle': 'グローバルゲーマーの声を\n一か所に',
    'footer.discord': 'Discordコミュニティに参加'
  },
  zh: {
    // Hero Section
    'hero.title': '全球玩家的声音\n汇聚一处',
    'hero.subtitle': 'MeanWhile通过AI总结和翻译全球游戏社区数据，\n并在Discord上分享',
    'hero.cta.discord': '加入Discord社区',
    'hero.cta.learn': '了解更多',
    
    // Problem Section
    'problem.title': '玩家面临的现实',
    'problem.subtitle': '您是否错过了全球游戏社区中正在发生的事情？',
    'problem.fragmentation.title': '信息碎片化',
    'problem.fragmentation.desc': '由于各平台信息分散，导致错过重要新闻',
    'problem.language.title': '语言障碍',
    'problem.language.desc': '难以理解用各种语言编写的全球社区信息',
    'problem.toxic.title': '有毒文化',
    'problem.toxic.desc': '不健康的社区文化使人不愿参与',
    
    // Solution Section
    'solution.title': 'AI提供的创新解决方案',
    'solution.subtitle': '通过MeanWhile的AI技术以全新方式体验全球游戏社区',
    'solution.ai.title': 'AI总结与翻译',
    'solution.ai.desc': 'AI实时总结和翻译多语言游戏社区帖子',
    'solution.timeline.title': '统一游戏时间线',
    'solution.timeline.desc': '将分散的游戏信息整理在单个时间线中一目了然',
    'solution.trends.title': '实时趋势检测',
    'solution.trends.desc': 'AI实时分析游戏社区的最新问题和趋势',
    
    // Benefits Section
    'benefits.title': '全新游戏社区体验',
    'benefits.subtitle': '即使是潜水用户也能成为全球玩家',
    'benefits.search.title': '快速搜索',
    'benefits.search.desc': '通过AI摘要快速找到您想要的信息',
    'benefits.translation.title': '翻译支持',
    'benefits.translation.desc': '无语言障碍地与全球玩家交流',
    'benefits.community.title': '社区连接',
    'benefits.community.desc': '与兴趣相同的全球玩家建立联系',
    'benefits.culture.title': '健康文化',
    'benefits.culture.desc': '通过AI审核建设健康社区',
    
    // Partner Section
    'partner.title': '游戏公司的特殊福利',
    'partner.subtitle': 'MeanWhile让更好的游戏运营成为可能',
    'partner.monitoring.title': '实时监控',
    'partner.monitoring.desc': '早期发现游戏相关错误或问题，实现快速响应',
    'partner.analytics.title': '深度分析',
    'partner.analytics.desc': '系统性分析玩家意见和反馈，提供洞察',
    'partner.efficiency.title': '运营效率',
    'partner.efficiency.desc': '降低社区管理成本，显著提高运营效率',
    'partner.innovation.title': '创新解决方案',
    'partner.innovation.desc': '利用最新AI技术为游戏社区管理设立新标准',
    
    // Video Example Section
    'videoExample.title': '视频摘要',
    'videoExample.subtitle': '快速掌握长视频的要点。',
    'videoExample.original': '原始视频',
    'videoExample.analyzed': '主要内容',
    'videoExample.videoTitle': "示例) 新游戏 '时空航行者' 游戏视频",
    'videoExample.summary': "本视频介绍了以时间旅行为主题的开放世界RPG游戏'时空航行者'的主要特色和前期攻略。",
    'videoExample.part1.title': '时间操控能力使用技巧',
    'videoExample.part1.content': "展示如何在战斗和解谜中使用主角的核心能力'时间回溯'和'未来预知'。",
    'videoExample.part2.title': '穿越古代与未来的冒险',
    'videoExample.part2.content': '介绍主线任务，探索从古代遗迹到超现代未来城市的各种时间线。',
    'videoExample.part3.title': '伙伴招募与队伍组合',
    'videoExample.part3.content': '探索来自不同时间线的伙伴特性、推荐队伍组合和强力连击技能。',
    
    // Community Section
    'community.title': '在Discord相见！',
    'community.subtitle': '实时分析全球游戏社区数据',
    'community.stats.totalPosts': '总帖子数',
    'community.stats.totalCommunities': '社区帖子',
    'community.stats.totalProjects': '已注册游戏帖子',
    'community.stats.etc': '其他',
    'community.cta': '加入Discord',
    'community.discord.title': 'Discord预览',
    'community.discord.subtitle': '已有数百名玩家在这里',
    'community.discord.footer': 'Meanwhile Global Gamer Hub',
    'community.discord.view': '在Discord上查看',
    'community.posts.title': '体验全球游戏社区',
    'community.posts.subtitle': 'MeanWhile通过AI总结和翻译全球游戏社区数据，\n并在Discord上分享',
    'community.discord.general': '常规聊天',
    'community.discord.game': '游戏讨论',
    'community.discord.trends': '趋势通知',
    'community.discord.user1': '金玩家',
    'community.discord.user2': 'GameMaster',
    'community.discord.user3': 'TrendBot',
    'community.discord.msg1': '新补丁信息发布了！',
    'community.discord.msg2': '您对这次更新有什么看法？',
    'community.discord.msg3': '🔥 实时趋势：新英雄相关讨论激增',
    
    // Footer
    'footer.title': 'MeanWhile',
    'footer.subtitle': '全球玩家的声音汇聚一处',
    'footer.discord': '加入Discord',
    
    // Report Section
    'report.badge': '新功能',
    'report.title': '游戏社区热点报告',
    'report.subtitle': 'AI分析特定时间段游戏社区最活跃讨论的话题，提供一目了然的热点洞察报告。',
    'report.example.title': '示例) Mystic Legends 热点报告',
    'report.example.period': '2025-01-15 09:00 ~ 18:00',
    'report.example.summary': 'RPG游戏\'Mystic Legends\'社区正在积极讨论新更新。特别是新地下城的难度和奖励系统意见分歧较大。',
    'report.example.hotTopic.title': '新地下城难度争议',
    'report.example.hotTopic.sentimentLabel': '负面',
    'report.example.hotTopic.timeRange': '14:30 ~ 17:45',
    'report.example.hotTopic.post1.title': '新地下城太难了',
    'report.example.hotTopic.post1.content': '休闲玩家难以通关的难度引发抱怨',
    'report.example.hotTopic.post2.title': '奖励太少',
    'report.example.hotTopic.post2.content': '与难度地下城相比奖励不足的意见',
    'report.stats.mentions': '总提及',
    'report.relatedPosts': '相关帖子:',
    'report.features.title': '洞察报告',
    'report.features.subtitle': '游戏社区趋势一目了然',
    'report.features.trending.title': '热点分析',
    'report.features.trending.description': '实时识别最热门的话题和趋势',
    'report.features.sentiment.title': '情感分析',
    'report.features.sentiment.description': '量化社区反应的正负面情感指数',
    'report.features.realtime.title': '实时监控',
    'report.features.realtime.description': '按特定时间段追踪活跃讨论时间点',
    'report.features.insights.title': '深度洞察',
    'report.features.insights.description': '提供超越数据的深度洞察'
  },
  es: {
    // Hero Section
    'hero.title': 'Las Voces de Gamers\nGlobales en Un Lugar',
    'hero.subtitle': 'MeanWhile recopila datos de comunidades gaming globales,\nIA los resume y traduce para compartirlos en Discord.',
    'hero.cta.discord': 'Unirse a la Comunidad Discord',
    'hero.cta.learn': 'Saber Más',
    
    // Problem Section
    'problem.title': 'Desafíos que Enfrentan los Gamers',
    'problem.subtitle': '¿Te estás perdiendo lo que pasa en las comunidades gaming globales?',
    'problem.fragmentation.title': 'Fragmentación de Información',
    'problem.fragmentation.desc': 'Information scattered across platforms\ncauses important news to be missed,rden debido a información dispersa en las plataformas',
    'problem.language.title': 'Barreras Idiomáticas',
    'problem.language.desc': 'Es difícil entender información de comunidades globales escrita en varios idiomas',
    'problem.toxic.title': 'Cultura Tóxica',
    'problem.toxic.desc': 'La cultura comunitaria no saludable desalienta la participación',
    
    // Solution Section
    'solution.title': 'Innovación Impulsada por IA',
    'solution.subtitle': 'Experimenta las comunidades gaming globales de una nueva manera con la tecnología IA de MeanWhile',
    'solution.ai.title': 'Resumen y Traducción IA',
    'solution.ai.desc': 'La IA resume y traduce publicaciones de comunidades gaming en múltiples idiomas en tiempo real',
    'solution.timeline.title': 'Línea de Tiempo Unificada',
    'solution.timeline.desc': 'Ve información dispersa de juegos organizada en una sola línea de tiempo de un vistazo',
    'solution.trends.title': 'Detección de Tendencias en Tiempo Real',
    'solution.trends.desc': 'La IA analiza los últimos problemas y tendencias en comunidades gaming en tiempo real',
    
    // Benefits Section
    'benefits.title': 'Nueva Experiencia de Comunidad Gaming',
    'benefits.subtitle': 'Incluso los observadores pueden convertirse en gamers globales',
    'benefits.search.title': 'Búsqueda Rápida',
    'benefits.search.desc': 'Encuentra la información que quieres rápidamente con resúmenes IA',
    'benefits.translation.title': 'Soporte de Traducción',
    'benefits.translation.desc': 'Comunícate con gamers de todo el mundo sin barreras idiomáticas',
    'benefits.community.title': 'Conexión Comunitaria',
    'benefits.community.desc': 'Conecta con gamers globales que comparten tus intereses',
    'benefits.culture.title': 'Cultura Saludable',
    'benefits.culture.desc': 'Construye una comunidad saludable con moderación IA',
    
    // Partner Section
    'partner.title': 'Beneficios Especiales para Empresas de Juegos',
    'partner.subtitle': 'Mejores operaciones de juegos son posibles con MeanWhile',
    'partner.monitoring.title': 'Monitoreo en Tiempo Real',
    'partner.monitoring.desc': 'Detección temprana de bugs o problemas relacionados con juegos permite respuesta rápida',
    'partner.analytics.title': 'Análisis Profundo',
    'partner.analytics.desc': 'Análisis sistemático de opiniones y comentarios de jugadores proporciona insights',
    'partner.efficiency.title': 'Eficiencia Operacional',
    'partner.efficiency.desc': 'Reduce costos de gestión comunitaria y mejora significativamente la eficiencia operacional',
    'partner.innovation.title': 'Soluciones Innovadoras',
    'partner.innovation.desc': 'Establece nuevos estándares para la gestión de comunidades gaming usando tecnología IA de vanguardia',
    
    // Video Example Section
    'videoExample.title': 'Resumen de Video',
    'videoExample.subtitle': 'Comprende rápidamente los puntos clave de videos largos.',
    'videoExample.original': 'Video Original',
    'videoExample.analyzed': 'Contenido Principal',
    'videoExample.videoTitle': "ej) Video de Gameplay del Nuevo Juego 'Chronoscape Voyagers'",
    'videoExample.summary': "Este video cubre las características principales y estrategias tempranas del juego para 'Chronoscape Voyagers', un RPG de mundo abierto con tema de viaje temporal.",
    'videoExample.part1.title': 'Cómo Usar las Habilidades de Manipulación Temporal',
    'videoExample.part1.content': "Muestra cómo usar las habilidades principales del protagonista, 'Rebobinar Tiempo' y 'Visión Futura', en combate y acertijos.",
    'videoExample.part2.title': 'Aventuras a Través de Eras Antiguas y Futuras',
    'videoExample.part2.content': 'Presenta la línea principal de misiones, explorando varias líneas temporales desde ruinas antiguas hasta ciudades futuras hipermodernas.',
    'videoExample.part3.title': 'Reclutamiento de Compañeros y Composición de Grupo',
    'videoExample.part3.content': 'Explora las características de compañeros de diferentes líneas temporales, composiciones de grupo recomendadas, y habilidades de combo poderosas.',
    
    // Community Section
    'community.title': '¡Encuéntranos en Discord!',
    'community.subtitle': 'Análisis en tiempo real de datos de comunidades gaming globales',
    'community.stats.totalPosts': 'Total de Publicaciones',
    'community.stats.totalCommunities': 'Publicaciones de la Comunidad',
    'community.stats.totalProjects': 'Publicaciones de Juegos Registrados',
    'community.stats.etc': 'ETC',
    'community.cta': 'Unirse a Discord',
    'community.discord.title': 'Vista Previa de Discord',
    'community.discord.subtitle': 'Cientos de jugadores ya están aquí',
    'community.discord.footer': 'Meanwhile Global Gamer Hub',
    'community.discord.view': 'Ver en Discord',
    'community.posts.title': 'Experimenta comunidades gaming globales en tu idioma',
    'community.posts.subtitle': 'MeanWhile recopila datos de comunidades gaming globales,\nla IA los resume y traduce para compartirlos en Discord.',
    
    // Footer
    'footer.title': 'MeanWhile',
    'footer.subtitle': 'Las voces de gamers globales en un lugar',
    'footer.discord': 'Unirse a Discord',
    
    // Report Section
    'report.badge': 'Nueva Función',
    'report.title': 'Informes de Temas Candentes de Comunidades Gaming',
    'report.subtitle': 'La IA analiza los temas más discutidos activamente en comunidades gaming durante períodos específicos, proporcionando informes de perspectivas integrales de un vistazo.',
    'report.example.title': 'ej) Informe de Temas Candentes de Mystic Legends',
    'report.example.period': '2025-01-15 09:00 ~ 18:00',
    'report.example.summary': 'Discusiones activas sobre la nueva actualización en la comunidad del RPG \'Mystic Legends\'. Las opiniones están divididas sobre la dificultad de las nuevas mazmorras y el sistema de recompensas.',
    'report.example.hotTopic.title': 'Controversia sobre la Dificultad de Nueva Mazmorra',
    'report.example.hotTopic.sentimentLabel': 'Negativo',
    'report.example.hotTopic.timeRange': '14:30 ~ 17:45',
    'report.example.hotTopic.post1.title': 'La nueva mazmorra es muy difícil',
    'report.example.hotTopic.post1.content': 'Quejas sobre el nivel de dificultad que es difícil de superar para jugadores casuales',
    'report.example.hotTopic.post2.title': 'Las recompensas son muy escasas',
    'report.example.hotTopic.post2.content': 'Opinión de que las recompensas son insuficientes en comparación con mazmorras difíciles',
    'report.stats.mentions': 'Menciones Totales',
    'report.relatedPosts': 'Publicaciones Relacionadas:',
    'report.features.title': 'Informes de Perspectivas',
    'report.features.subtitle': 'Tendencias de comunidades gaming a un vistazo',
    'report.features.trending.title': 'Análisis de Temas Candentes',
    'report.features.trending.description': 'Identificación en tiempo real de los temas y tendencias más mencionados',
    'report.features.sentiment.title': 'Análisis de Sentimiento',
    'report.features.sentiment.description': 'Índices de sentimiento positivo/negativo cuantificados de las reacciones de la comunidad',
    'report.features.realtime.title': 'Monitoreo en Tiempo Real',
    'report.features.realtime.description': 'Seguimiento de períodos de discusión activa por rangos de tiempo específicos',
    'report.features.insights.title': 'Perspectivas Profundas',
    'report.features.insights.description': 'Proporciona perspectivas significativas más allá de los datos simples'
  }
};