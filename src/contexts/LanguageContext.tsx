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
    'hero.title': '전 세계 게이머들의\n목소리를 한 곳에서',
    'hero.subtitle': 'MeanWhile은 글로벌 게임 커뮤니티 데이터를 AI로 요약·번역해 Discord에서 공유합니다.',
    'hero.cta.discord': 'Discord 커뮤니티 합류하기',
    'hero.cta.learn': '더 알아보기',
    
    // Problem Section
    'problem.title': '게이머들이 마주하는 현실',
    'problem.subtitle': '전 세계 게임 커뮤니티에서 일어나는 일들을 놓치고 계신가요?',
    'problem.fragmentation.title': '정보 파편화',
    'problem.fragmentation.desc': '각 플랫폼마다 흩어진 정보들로 인해 중요한 소식을 놓치게 됩니다',
    'problem.language.title': '언어 장벽',
    'problem.language.desc': '다양한 언어로 작성된 글로벌 커뮤니티의 정보를 이해하기 어렵습니다',
    'problem.toxic.title': '독성 문화',
    'problem.toxic.desc': '건전하지 못한 커뮤니티 문화로 인해 참여를 꺼리게 됩니다',
    
    // Solution Section
    'solution.title': 'AI가 제공하는 혁신적 해결책',
    'solution.subtitle': 'MeanWhile의 AI 기술로 글로벌 게임 커뮤니티를 새롭게 경험하세요',
    'solution.ai.title': 'AI 요약 & 번역',
    'solution.ai.desc': '여러 언어의 게임 커뮤니티 글을 AI가 실시간으로 요약하고 번역합니다',
    'solution.timeline.title': '통합 게임 타임라인',
    'solution.timeline.desc': '흩어진 게임 정보들을 하나의 타임라인으로 정리해 한눈에 확인하세요',
    'solution.trends.title': '실시간 트렌드 감지',
    'solution.trends.desc': '게임 커뮤니티의 최신 이슈와 트렌드를 AI가 실시간으로 분석합니다',
    
    // Benefits Section
    'benefits.title': '새로운 게이밍 커뮤니티 경험',
    'benefits.subtitle': '눈팅 유저도 글로벌 게이머가 될 수 있습니다',
    'benefits.search.title': '빠른 탐색',
    'benefits.search.desc': 'AI 요약으로 원하는 정보를 빠르게 찾아보세요',
    'benefits.translation.title': '번역 지원',
    'benefits.translation.desc': '언어 장벽 없이 전 세계 게이머들과 소통하세요',
    'benefits.community.title': '커뮤니티 연결',
    'benefits.community.desc': '관심사가 같은 글로벌 게이머들과 연결되세요',
    'benefits.culture.title': '건전한 문화',
    'benefits.culture.desc': 'AI 모더레이션으로 건전한 커뮤니티를 만들어갑니다',
    
    // Partner Section
    'partner.title': '게임사를 위한 특별한 혜택',
    'partner.subtitle': 'MeanWhile과 함께하면 더 나은 게임 운영이 가능합니다',
    'partner.monitoring.title': '실시간 모니터링',
    'partner.monitoring.desc': '게임 관련 버그나 이슈를 조기에 감지하여 빠른 대응이 가능합니다',
    'partner.analytics.title': '심층 분석',
    'partner.analytics.desc': '플레이어들의 의견과 피드백을 체계적으로 분석하여 인사이트를 제공합니다',
    'partner.efficiency.title': '운영 효율성',
    'partner.efficiency.desc': '커뮤니티 관리 비용을 절감하고 운영 효율성을 크게 향상시킵니다',
    'partner.innovation.title': '혁신적 솔루션',
    'partner.innovation.desc': '게임 커뮤니티 관리의 새로운 표준을 제시합니다',
    
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
    'community.subtitle': '전 세계 게임 커뮤니티의 데이터를 실시간으로 분석합니다',
    'community.stats.totalPosts': '총 게시물',
    'community.stats.totalCommunities': '커뮤니티',
    'community.stats.totalProjects': '등록된 게임',
    'community.stats.etc': '기타',
    'game.clairobscur33': '33 원정대',
    'game.deltaforce': '델타포스',
    'game.stellarblade': '스텔라 블레이드',
    'community.cta': 'Discord 참여하기',
    'community.discord.title': 'Discord 미리보기',
    'community.discord.subtitle': '이미 수백 명의 게이머가 함께하고 있습니다',
    'community.discord.footer': 'Meanwhile Global Gamer Hub',
    'community.discord.view': 'Discord에서 보기',
    'community.posts.title': '해외 여러 게임 커뮤니티를 여러분의 언어로 경험하세요',
    'community.posts.subtitle': 'MeanWhile은 글로벌 게임 커뮤니티 데이터를 AI로 요약·번역해 Discord에서 공유합니다.',
    
    // Game Names
    'game.all': '전체 게임',
    
    // Footer
    'footer.title': 'MeanWhile',
    'footer.subtitle': '전 세계 게이머들의 목소리를 한 곳에서',
    'footer.copyright': ' 2024 MeanWhile. All rights reserved.',
    'footer.made': 'Made with ❤️ for global gaming community'
  },
  en: {
    // Hero Section
    'hero.title': 'Global Gamers\' Voices\nin One Place',
    'hero.subtitle': 'MeanWhile summarizes and translates global gaming community data with AI, sharing it on Discord.',
    'hero.cta.discord': 'Join Discord Community',
    'hero.cta.learn': 'Learn More',
    
    // Problem Section
    'problem.title': 'Challenges Gamers Face',
    'problem.subtitle': 'Are you missing out on what\'s happening in global gaming communities?',
    'problem.fragmentation.title': 'Information Fragmentation',
    'problem.fragmentation.desc': 'Important news gets lost due to scattered information across platforms',
    'problem.language.title': 'Language Barriers',
    'problem.language.desc': 'It\'s difficult to understand global community information written in various languages',
    'problem.toxic.title': 'Toxic Culture',
    'problem.toxic.desc': 'Unhealthy community culture discourages participation',
    
    // Solution Section
    'solution.title': 'AI-Powered Innovation',
    'solution.subtitle': 'Experience global gaming communities in a new way with MeanWhile\'s AI technology',
    'solution.ai.title': 'AI Summary & Translation',
    'solution.ai.desc': 'AI summarizes and translates gaming community posts in multiple languages in real-time',
    'solution.timeline.title': 'Unified Game Timeline',
    'solution.timeline.desc': 'View scattered game information organized in a single timeline at a glance',
    'solution.trends.title': 'Real-time Trend Detection',
    'solution.trends.desc': 'AI analyzes the latest issues and trends in gaming communities in real-time',
    
    // Benefits Section
    'benefits.title': 'New Gaming Community Experience',
    'benefits.subtitle': 'Even lurkers can become global gamers',
    'benefits.search.title': 'Fast Search',
    'benefits.search.desc': 'Find the information you want quickly with AI summaries',
    'benefits.translation.title': 'Translation Support',
    'benefits.translation.desc': 'Communicate with gamers worldwide without language barriers',
    'benefits.community.title': 'Community Connection',
    'benefits.community.desc': 'Connect with global gamers who share your interests',
    'benefits.culture.title': 'Healthy Culture',
    'benefits.culture.desc': 'Build a healthy community with AI moderation',
    
    // Partner Section
    'partner.title': 'Special Benefits for Game Companies',
    'partner.subtitle': 'Better game operations are possible with MeanWhile',
    'partner.monitoring.title': 'Real-time Monitoring',
    'partner.monitoring.desc': 'Early detection of game-related bugs or issues enables quick response',
    'partner.analytics.title': 'Deep Analysis',
    'partner.analytics.desc': 'Systematic analysis of player opinions and feedback provides insights',
    'partner.efficiency.title': 'Operational Efficiency',
    'partner.efficiency.desc': 'Reduce community management costs and significantly improve operational efficiency',
    'partner.innovation.title': 'Innovative Solutions',
    'partner.innovation.desc': 'Set new standards for game community management using cutting-edge AI technology',
    
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
    'community.title': 'Meet us on Discord!',
    'community.subtitle': 'Real-time analysis of global gaming community data',
    'community.stats.totalPosts': 'Total Posts',
    'community.stats.totalCommunities': 'Communities',
    'community.stats.totalProjects': 'Registered Games',
    'community.stats.etc': 'ETC',
    'game.clairobscur33': 'Clair Obscur: 33',
    'game.deltaforce': 'Delta Force',
    'game.stellarblade': 'Stellar Blade',
    'community.cta': 'Join Discord',
    'community.posts.title': 'Experience Global Gaming Communities in Your Language',
    'community.posts.subtitle': 'MeanWhile summarizes and translates global gaming community data with AI, sharing it on Discord.',
    'community.discord.title': 'Discord Preview',
    'community.discord.subtitle': 'Hundreds of gamers are already here together',
    'community.discord.footer': 'Meanwhile Global Gamer Hub',
    'community.discord.view': 'View on Discord',

    // Game Names
    'game.all': 'All Games',

    // Footer
    'footer.title': 'MeanWhile',
    'footer.subtitle': 'Global gamers\' voices in one place',
    'footer.copyright': ' 2024 MeanWhile. All rights reserved.',
    'footer.made': 'Made with ❤️ for global gaming community'
  },
  ja: {
    // Hero Section
    'hero.title': '世界中のゲーマーの\n声を一つの場所で',
    'hero.subtitle': 'MeanWhileはAIでグローバルゲームコミュニティのデータを要約・翻訳し、Discordで共有します。',
    'hero.cta.discord': 'Discordコミュニティに参加',
    'hero.cta.learn': '詳しく見る',
    
    // Problem Section
    'problem.title': 'ゲーマーが直面する現実',
    'problem.subtitle': '世界のゲームコミュニティで起こっていることを見逃していませんか？',
    'problem.fragmentation.title': '情報の断片化',
    'problem.fragmentation.desc': '各プラットフォームに散らばった情報により重要なニュースを見逃してしまいます',
    'problem.language.title': '言語の壁',
    'problem.language.desc': '様々な言語で書かれたグローバルコミュニティの情報を理解するのは困難です',
    'problem.toxic.title': '有害な文化',
    'problem.toxic.desc': '健全でないコミュニティ文化により参加を躊躇してしまいます',
    
    // Solution Section
    'solution.title': 'AIが提供する革新的な解決策',
    'solution.subtitle': 'MeanWhileのAI技術でグローバルゲームコミュニティを新しく体験してください',
    'solution.ai.title': 'AI要約・翻訳',
    'solution.ai.desc': '複数言語のゲームコミュニティ投稿をAIがリアルタイムで要約・翻訳します',
    'solution.timeline.title': '統合ゲームタイムライン',
    'solution.timeline.desc': '散らばったゲーム情報を一つのタイムラインで一目で確認',
    'solution.trends.title': 'リアルタイムトレンド検出',
    'solution.trends.desc': 'ゲームコミュニティの最新の問題とトレンドをAIがリアルタイムで分析',
    
    // Benefits Section
    'benefits.title': '新しいゲーミングコミュニティ体験',
    'benefits.subtitle': 'ROMユーザーもグローバルゲーマーになれます',
    'benefits.search.title': '高速検索',
    'benefits.search.desc': 'AI要約で欲しい情報を素早く見つけましょう',
    'benefits.translation.title': '翻訳サポート',
    'benefits.translation.desc': '言語の壁なく世界中のゲーマーとコミュニケーション',
    'benefits.community.title': 'コミュニティ接続',
    'benefits.community.desc': '同じ興味を持つグローバルゲーマーと繋がりましょう',
    'benefits.culture.title': '健全な文化',
    'benefits.culture.desc': 'AIモデレーションで健全なコミュニティを作ります',
    
    // Partner Section
    'partner.title': 'ゲーム会社向け特別なメリット',
    'partner.subtitle': 'MeanWhileと一緒により良いゲーム運営が可能です',
    'partner.monitoring.title': 'リアルタイムモニタリング',
    'partner.monitoring.desc': 'ゲーム関連のバグや問題を早期発見し迅速な対応が可能',
    'partner.analytics.title': '深層分析',
    'partner.analytics.desc': 'プレイヤーの意見とフィードバックを体系的に分析しインサイトを提供',
    'partner.efficiency.title': '運営効率性',
    'partner.efficiency.desc': 'コミュニティ管理コストを削減し運営効率を大幅向上',
    'partner.innovation.title': '革新的ソリューション',
    'partner.innovation.desc': 'ゲームコミュニティ管理の新基準を提示',
    
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
    'community.title': 'Discordで会いましょう！',
    'community.subtitle': '世界のゲームコミュニティデータをリアルタイムで分析',
    'community.stats.totalPosts': '総投稿数',
    'community.stats.totalCommunities': 'コミュニティ',
    'community.stats.totalProjects': '登録済みゲーム',
    'community.stats.etc': 'その他',
    'game.clairobscur33': 'クレアオブスキュア: 33',
    'game.deltaforce': 'デルタフォース',
    'game.stellarblade': 'ステラブレード',
    'community.cta': 'Discord参加',
    'community.posts.subtitle': 'MeanWhileはグローバルゲームコミュニティデータをAIで要約・翻訳し、Discordで共有します。',
    'community.discord.title': 'Discordプレビュー',
    'community.discord.subtitle': 'すでに数百人のゲーマーが参加しています',
    'community.discord.footer': 'Meanwhile Global Gamer Hub',
    'community.discord.view': 'Discordで見る',
    
    // Footer
    'footer.title': 'MeanWhile',
    'footer.subtitle': '世界中のゲーマーの声を一つの場所で',
    'footer.copyright': ' 2024 MeanWhile. All rights reserved.',
    'footer.made': 'グローバルゲーミングコミュニティのために❤️で作られました'
  },
  zh: {
    // Hero Section
    'hero.title': '全球玩家的声音\n汇聚一处',
    'hero.subtitle': 'MeanWhile使用AI总结和翻译全球游戏社区数据，并在Discord上分享。',
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
    
    // Community Section
    'community.title': '在Discord相见！',
    'community.subtitle': '已有数百名玩家加入',
    'community.stats.members': '活跃成员',
    'community.stats.messages': '日均消息',
    'community.stats.rating': '满意度',
    'community.cta': '加入Discord',
    'community.posts.title': '通过真实数据体验游戏社区',
    'community.posts.subtitle': 'MeanWhile使用AI总结和翻译全球游戏社区数据，并在Discord上分享。',
    'community.discord.title': 'Discord预览',
    'community.discord.subtitle': '已有数百名玩家在这里',
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
    'footer.copyright': '© 2024 MeanWhile. 保留所有权利。',
    'footer.made': '为全球游戏社区用❤️制作'
  },
  es: {
    // Hero Section
    'hero.title': 'Las Voces de Gamers\nGlobales en Un Lugar',
    'hero.subtitle': 'MeanWhile resume y traduce datos de comunidades gaming globales con IA, compartiendo en Discord.',
    'hero.cta.discord': 'Unirse a la Comunidad Discord',
    'hero.cta.learn': 'Saber Más',
    
    // Problem Section
    'problem.title': 'Desafíos que Enfrentan los Gamers',
    'problem.subtitle': '¿Te estás perdiendo lo que pasa en las comunidades gaming globales?',
    'problem.fragmentation.title': 'Fragmentación de Información',
    'problem.fragmentation.desc': 'Las noticias importantes se pierden debido a información dispersa en las plataformas',
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
    'partner.innovation.desc': 'Establece nuevos estándares para gestión de comunidades gaming usando tecnología IA de vanguardia',
    
    // Community Section
    'community.title': '¡Encuéntranos en Discord!',
    'community.subtitle': 'Cientos de gamers ya están aquí',
    'community.stats.members': 'Miembros Activos',
    'community.stats.messages': 'Mensajes Diarios',
    'community.stats.rating': 'Satisfacción',
    'community.discord.title': 'Vista Previa de Discord',
    'community.discord.general': 'chat-general',
    'community.discord.game': 'discusión-juegos',
    'community.discord.trends': 'alertas-tendencias',
    'community.discord.user1': 'KimGamer',
    'community.discord.user2': 'GameMaster',
    'community.discord.user3': 'TrendBot',
    'community.discord.msg1': '¡Salió información del nuevo parche!',
    'community.discord.msg2': '¿Qué piensan de esta actualización?',
    'community.discord.msg3': '🔥 Tendencia en tiempo real: La discusión sobre el nuevo campeón está aumentando',
    'community.cta': 'Unirse a Discord',
    
    // Footer
    'footer.title': 'MeanWhile',
    'footer.subtitle': 'Las voces de gamers globales en un lugar',
    'footer.copyright': '© 2024 MeanWhile. Todos los derechos reservados.',
    'footer.made': 'Hecho con ❤️ para la comunidad gaming global'
  }
};