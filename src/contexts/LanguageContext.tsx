import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'ko' | 'en' | 'ja' | 'zh' | 'es';

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
  children: React.ReactNode;
}

const detectBrowserLanguage = (): Language => {
  if (typeof navigator === 'undefined') return 'en';
  
  const browserLang = navigator.language || navigator.languages?.[0] || 'en';
  const langCode = browserLang.toLowerCase().split('-')[0];
  const supportedLanguages: Language[] = ['ko', 'en', 'ja', 'zh', 'es'];
  
  if (supportedLanguages.includes(langCode as Language)) {
    return langCode as Language;
  }
  
  return 'en';
};

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('preferred-language') as Language;
    if (savedLanguage && ['ko', 'en', 'ja', 'zh', 'es'].includes(savedLanguage)) {
      return savedLanguage;
    }
    return detectBrowserLanguage();
  });
  
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
  en: {
    'nav.features': 'Features',
    'nav.demo': 'Demo',
    'nav.community': 'Community',
    'nav.joinDiscord': 'Join Discord',
    'hero.badge': '🎮 AI-Powered Gaming Intelligence',
    'hero.headline': 'Global Gaming Community Intelligence Hub',
    'hero.subheadline': 'Discover, understand, and engage with gaming communities worldwide through AI-powered summaries and real-time translations.',
    'hero.cta.discord': 'Join Discord Community',
    'hero.cta.demo': 'Watch Demo',
    'hero.socialProof': 'Join 500+ gamers already using MeanWhile',
    'features.title': 'Everything You Need',
    'features.subtitle': 'Powerful tools to connect global gaming communities',
    'features.search.title': 'Smart Search',
    'features.search.desc': 'Find relevant gaming discussions across multiple platforms instantly',
    'features.translate.title': 'Auto Translation',
    'features.translate.desc': 'Break language barriers with real-time AI translations',
    'features.realtime.title': 'Real-time Updates',
    'features.realtime.desc': 'Stay updated with the latest gaming trends and discussions',
    'features.community.title': 'Community Hub',
    'features.community.desc': 'Connect with gamers worldwide in one unified platform',
    'demo.title': 'See It In Action',
    'demo.subtitle': 'Experience how MeanWhile transforms global gaming communication',
    'demo.step1.title': 'Collect',
    'demo.step1.desc': 'AI gathers gaming discussions from worldwide communities',
    'demo.step2.title': 'Analyze',
    'demo.step2.desc': 'Smart algorithms identify trends and key insights',
    'demo.step3.title': 'Share',
    'demo.step3.desc': 'Translated summaries delivered to your Discord',
    'demo.cta': 'Try Demo',
    'cta.title': 'Ready to Connect Global Gaming Communities?',
    'cta.subtitle': 'Join thousands of gamers who are already bridging language barriers and discovering new gaming insights.',
    'cta.discord': 'Join Our Discord',
    'cta.note': 'Free to join • No credit card required',
    'footer.description': 'Global gaming community intelligence platform powered by AI',
    'footer.contact': 'Contact',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.rights': '2024 MeanWhile. All rights reserved.'
  },
  ko: {
    'nav.features': '기능',
    'nav.demo': '데모',
    'nav.community': '커뮤니티',
    'nav.joinDiscord': 'Discord 참여',
    'hero.badge': '🎮 AI 기반 게이밍 인텔리전스',
    'hero.headline': '글로벌 게이밍 커뮤니티 인텔리전스 허브',
    'hero.subheadline': 'AI 요약과 실시간 번역을 통해 전 세계 게이밍 커뮤니티를 발견하고, 이해하고, 참여하세요.',
    'hero.cta.discord': 'Discord 커뮤니티 참여',
    'hero.cta.demo': '데모 보기',
    'hero.socialProof': '이미 500명 이상의 게이머가 MeanWhile을 사용 중',
    'features.title': '필요한 모든 기능',
    'features.subtitle': '글로벌 게이밍 커뮤니티를 연결하는 강력한 도구',
    'features.search.title': '스마트 검색',
    'features.search.desc': '여러 플랫폼의 관련 게임 토론을 즉시 찾아보세요',
    'features.translate.title': '자동 번역',
    'features.translate.desc': '실시간 AI 번역으로 언어 장벽을 허물어보세요',
    'features.realtime.title': '실시간 업데이트',
    'features.realtime.desc': '최신 게임 트렌드와 토론을 실시간으로 확인하세요',
    'features.community.title': '커뮤니티 허브',
    'features.community.desc': '하나의 통합 플랫폼에서 전 세계 게이머들과 연결하세요',
    'demo.title': '실제 작동 방식 확인',
    'demo.subtitle': 'MeanWhile이 글로벌 게임 커뮤니케이션을 어떻게 변화시키는지 경험해보세요',
    'demo.step1.title': '수집',
    'demo.step1.desc': 'AI가 전 세계 커뮤니티의 게임 토론을 수집합니다',
    'demo.step2.title': '분석',
    'demo.step2.desc': '스마트 알고리즘이 트렌드와 핵심 인사이트를 식별합니다',
    'demo.step3.title': '공유',
    'demo.step3.desc': '번역된 요약이 Discord로 전달됩니다',
    'demo.cta': '데모 체험',
    'cta.title': '글로벌 게이밍 커뮤니티 연결 준비 완료?',
    'cta.subtitle': '이미 언어 장벽을 허물고 새로운 게임 인사이트를 발견하고 있는 수천 명의 게이머들과 함께하세요.',
    'cta.discord': 'Discord 참여하기',
    'cta.note': '무료 참여 • 신용카드 불필요',
    'footer.description': 'AI 기반 글로벌 게이밍 커뮤니티 인텔리전스 플랫폼',
    'footer.contact': '문의',
    'footer.privacy': '개인정보처리방침',
    'footer.terms': '이용약관',
    'footer.rights': '2024 MeanWhile. 모든 권리 보유.'
  },
  ja: {
    'nav.features': '機能',
    'nav.demo': 'デモ',
    'nav.community': 'コミュニティ',
    'nav.joinDiscord': 'Discord参加',
    'hero.badge': '🎮 AI搭載ゲーミングインテリジェンス',
    'hero.headline': 'グローバルゲーミングコミュニティインテリジェンスハブ',
    'hero.subheadline': 'AI搭載要約とリアルタイム翻訳で世界中のゲーミングコミュニティを発見、理解、参加しよう。',
    'hero.cta.discord': 'Discordコミュニティに参加',
    'hero.cta.demo': 'デモを見る',
    'hero.socialProof': 'すでに500人以上のゲーマーがMeanWhileを使用中',
    'features.title': '必要なすべての機能',
    'features.subtitle': 'グローバルゲーミングコミュニティを繋ぐ強力なツール',
    'features.search.title': 'スマート検索',
    'features.search.desc': '複数プラットフォームの関連ゲーム議論を瞬時に見つける',
    'features.translate.title': '自動翻訳',
    'features.translate.desc': 'リアルタイムAI翻訳で言語の壁を打破',
    'features.realtime.title': 'リアルタイム更新',
    'features.realtime.desc': '最新のゲーミングトレンドと議論をリアルタイムで確認',
    'features.community.title': 'コミュニティハブ',
    'features.community.desc': '統一プラットフォームで世界中のゲーマーと繋がる',
    'demo.title': '実際の動作を確認',
    'demo.subtitle': 'MeanWhileがグローバルゲーミングコミュニケーションをどう変革するかを体験',
    'demo.step1.title': '収集',
    'demo.step1.desc': 'AIが世界中のコミュニティからゲーミング議論を収集',
    'demo.step2.title': '分析',
    'demo.step2.desc': 'スマートアルゴリズムがトレンドと重要なインサイトを特定',
    'demo.step3.title': '共有',
    'demo.step3.desc': '翻訳された要約をDiscordに配信',
    'demo.cta': 'デモを試す',
    'cta.title': 'グローバルゲーミングコミュニティと繋がる準備はできましたか？',
    'cta.subtitle': 'すでに言語の壁を越えて新しいゲーミングインサイトを発見している数千人のゲーマーと一緒に参加しよう。',
    'cta.discord': 'Discordに参加',
    'cta.note': '無料参加 • クレジットカード不要',
    'footer.description': 'AI搭載グローバルゲーミングコミュニティインテリジェンスプラットフォーム',
    'footer.contact': 'お問い合わせ',
    'footer.privacy': 'プライバシーポリシー',
    'footer.terms': '利用規約',
    'footer.rights': '2024 MeanWhile. すべての権利予約。'
  },
  zh: {
    'nav.features': '功能',
    'nav.demo': '演示',
    'nav.community': '社区',
    'nav.joinDiscord': '加入Discord',
    'hero.badge': '🎮 AI驱动的游戏智能',
    'hero.headline': '全球游戏社区智能中心',
    'hero.subheadline': '通过AI驱动的摘要和实时翻译，发现、理解并参与全球游戏社区。',
    'hero.cta.discord': '加入Discord社区',
    'hero.cta.demo': '观看演示',
    'hero.socialProof': '已有500多名玩家在使用MeanWhile',
    'features.title': '您需要的一切',
    'features.subtitle': '连接全球游戏社区的强大工具',
    'features.search.title': '智能搜索',
    'features.search.desc': '即时查找跨多个平台的相关游戏讨论',
    'features.translate.title': '自动翻译',
    'features.translate.desc': '通过实时AI翻译打破语言障碍',
    'features.realtime.title': '实时更新',
    'features.realtime.desc': '实时了解最新的游戏趋势和讨论',
    'features.community.title': '社区中心',
    'features.community.desc': '在一个统一平台与全球玩家连接',
    'demo.title': '实际操作演示',
    'demo.subtitle': '体验MeanWhile如何改变全球游戏交流',
    'demo.step1.title': '收集',
    'demo.step1.desc': 'AI从全球社区收集游戏讨论',
    'demo.step2.title': '分析',
    'demo.step2.desc': '智能算法识别趋势和关键洞察',
    'demo.step3.title': '分享',
    'demo.step3.desc': '翻译后的摘要发送到您的Discord',
    'demo.cta': '试用演示',
    'cta.title': '准备连接全球游戏社区了吗？',
    'cta.subtitle': '加入已经在打破语言障碍并发现新游戏洞察的数千名玩家。',
    'cta.discord': '加入我们的Discord',
    'cta.note': '免费加入 • 无需信用卡',
    'footer.description': 'AI驱动的全球游戏社区智能平台',
    'footer.contact': '联系我们',
    'footer.privacy': '隐私政策',
    'footer.terms': '服务条款',
    'footer.rights': '2024 MeanWhile. 保留所有权利。'
  },
  es: {
    'nav.features': 'Características',
    'nav.demo': 'Demo',
    'nav.community': 'Comunidad',
    'nav.joinDiscord': 'Unirse a Discord',
    'hero.badge': '🎮 Inteligencia Gaming Impulsada por IA',
    'hero.headline': 'Centro de Inteligencia de Comunidad Gaming Global',
    'hero.subheadline': 'Descubre, comprende y participa en comunidades gaming de todo el mundo a través de resúmenes impulsados por IA y traducciones en tiempo real.',
    'hero.cta.discord': 'Unirse a la Comunidad Discord',
    'hero.cta.demo': 'Ver Demo',
    'hero.socialProof': 'Únete a más de 500 gamers que ya usan MeanWhile',
    'features.title': 'Todo lo que Necesitas',
    'features.subtitle': 'Herramientas poderosas para conectar comunidades gaming globales',
    'features.search.title': 'Búsqueda Inteligente',
    'features.search.desc': 'Encuentra discusiones gaming relevantes en múltiples plataformas al instante',
    'features.translate.title': 'Traducción Automática',
    'features.translate.desc': 'Rompe las barreras idiomáticas con traducciones IA en tiempo real',
    'features.realtime.title': 'Actualizaciones en Tiempo Real',
    'features.realtime.desc': 'Mantente actualizado con las últimas tendencias y discusiones gaming',
    'features.community.title': 'Centro Comunitario',
    'features.community.desc': 'Conecta con gamers de todo el mundo en una plataforma unificada',
    'demo.title': 'Velo en Acción',
    'demo.subtitle': 'Experimenta cómo MeanWhile transforma la comunicación gaming global',
    'demo.step1.title': 'Recopilar',
    'demo.step1.desc': 'IA recopila discusiones gaming de comunidades mundiales',
    'demo.step2.title': 'Analizar',
    'demo.step2.desc': 'Algoritmos inteligentes identifican tendencias e ideas clave',
    'demo.step3.title': 'Compartir',
    'demo.step3.desc': 'Resúmenes traducidos entregados a tu Discord',
    'demo.cta': 'Probar Demo',
    'cta.title': '¿Listo para Conectar Comunidades Gaming Globales?',
    'cta.subtitle': 'Únete a miles de gamers que ya están rompiendo barreras idiomáticas y descubriendo nuevas perspectivas gaming.',
    'cta.discord': 'Únete a Nuestro Discord',
    'cta.note': 'Gratis para unirse • No se requiere tarjeta de crédito',
    'footer.description': 'Plataforma de inteligencia de comunidad gaming global impulsada por IA',
    'footer.contact': 'Contacto',
    'footer.privacy': 'Política de Privacidad',
    'footer.terms': 'Términos de Servicio',
    'footer.rights': '2024 MeanWhile. Todos los derechos reservados.'
  }
};